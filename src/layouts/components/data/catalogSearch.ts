import type { Product } from "./useCases";
import { products } from "./useCases";
import type { Deliverable } from "./deliverables";
import { deliverables } from "./deliverables";
import { getBundleForProduct } from "./recommendations";
import { getDeliverableById } from "./deliverables";
import { isFeaturedProduct, sortProductsForCatalog } from "./catalogStrategy";

const intentLabels: Record<string, string> = {
  transparency: "Transparenz",
  automation: "Automatisierung",
  insights: "Insights",
  compliance: "Compliance",
  scale: "Skalierung",
};

const dataScopeLabels: Record<string, string> = {
  single_source: "Einzelquelle",
  multi_source: "Mehrere Quellen",
  enterprise_wide: "Unternehmensweit",
};

const techHintLabels: Record<string, string> = {
  bi: "Business Intelligence",
  dwh: "Data Warehouse",
  integration: "Integration Schnittstelle",
  ai: "Künstliche Intelligenz KI",
  governance: "Governance Datenschutz",
};

/** Deutsche Suchbegriffe → zusätzliche Treffer-Keywords */
const searchSynonyms: Record<string, string[]> = {
  schnittstelle: ["integration", "api", "schnittstellen"],
  schnittstellen: ["integration", "api"],
  migration: ["datenmigration", "excel"],
  forecast: ["forecasting", "prognose"],
  prognose: ["forecast", "forecasting"],
  datenschutz: ["dsgvo", "privacy", "governance"],
  dsgvo: ["datenschutz", "privacy"],
  rag: ["retrieval", "wissensmanagement", "literaturrecherche"],
  wissensmanagement: ["rag", "wissen", "glossar"],
  automatisierung: ["automation", "pilot", "workflow"],
  qualität: ["quality", "qa", "validierung"],
  stammdaten: ["mdm", "master data", "glossar"],
  warehouse: ["dwh", "datenlager"],
  controlling: ["finance", "kpi", "reporting"],
  churn: ["abwanderung", "kundenbindung"],
  agent: ["agentic", "ki-agent"],
  dashboard: ["bi", "reporting", "management"],
  ki: ["ai", "künstliche intelligenz"],
};

function safeStrings(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return values.filter((v): v is string => typeof v === "string" && v.length > 0);
}

function flattenDeliverableTags(tags: Deliverable["tags"] | undefined): string[] {
  if (!tags || typeof tags !== "object") return [];
  return [
    ...safeStrings(tags.type),
    ...safeStrings(tags.maturity),
    ...safeStrings(tags.impact),
    ...safeStrings(tags.coverage),
  ];
}

function expandQueryTerms(query: string): string[] {
  const base = query.trim().toLowerCase();
  if (!base) return [];
  const terms = new Set(base.split(/\s+/).filter(Boolean));
  for (const word of [...terms]) {
    const extras = searchSynonyms[word];
    if (extras) extras.forEach((e) => terms.add(e));
  }
  return [...terms];
}

function textMatchesTerms(haystack: string, terms: string[]): boolean {
  if (!haystack || terms.length === 0) return terms.length === 0;
  const normalized = haystack.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function normalizeText(value: string | undefined | null): string {
  return (value ?? "").toLowerCase().trim();
}

function tokenize(value: string | undefined | null): string[] {
  return normalizeText(value)
    .split(/[^a-z0-9äöüß]+/i)
    .filter(Boolean);
}

function includesAnyTerm(text: string, terms: string[]): boolean {
  return terms.some((term) => textHasTerm(text, term));
}

function textHasTerm(text: string, term: string): boolean {
  const normalized = normalizeText(text);
  const normalizedTerm = normalizeText(term);
  if (!normalized || !normalizedTerm) return false;

  if (normalizedTerm.includes(" ")) {
    return normalized.includes(normalizedTerm);
  }

  const tokens = tokenize(text);
  if (normalizedTerm.length <= 2) {
    return tokens.some((token) => token === normalizedTerm);
  }

  return tokens.some((token) => token === normalizedTerm || token.startsWith(normalizedTerm));
}

function getQueryVariants(query: string): { rawTerms: string[]; expandedTerms: string[]; synonymTerms: string[] } {
  const rawTerms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const expandedTerms = expandQueryTerms(query);
  const rawSet = new Set(rawTerms);
  return {
    rawTerms,
    expandedTerms,
    synonymTerms: expandedTerms.filter((term) => !rawSet.has(term)),
  };
}

type SearchableProductSections = {
  title: string;
  short: string;
  keywords: string[];
  problem: string;
  result: string;
  tags: string[];
  bundleTexts: string[];
};

function getProductSearchSections(product: Product): SearchableProductSections {
  const tags = product.tags;
  const keywords = [
    ...safeStrings(product.outputs),
    ...safeStrings(product.details?.bestFor),
    ...safeStrings(product.details?.typicalDeliverables),
  ];
  const tagTexts = [
    ...safeStrings(tags?.intent).map((i) => intentLabels[i as keyof typeof intentLabels] ?? i),
    dataScopeLabels[tags?.data_scope as keyof typeof dataScopeLabels] ?? tags?.data_scope ?? "",
    ...safeStrings(tags?.tech_hint).map((t) => techHintLabels[t as keyof typeof techHintLabels] ?? t),
  ].filter(Boolean);

  const bundleTexts: string[] = [];
  try {
    const bundle = getBundleForProduct(product.id);
    for (const rec of bundle) {
      const d = getDeliverableById(rec.deliverableId);
      if (!d) continue;
      bundleTexts.push(
        d.name ?? "",
        d.shortDescription ?? "",
        d.longDescription ?? "",
        d.family ?? "",
        ...flattenDeliverableTags(d.tags),
        ...safeStrings(d.deliverablesOutput)
      );
    }
  } catch {
    // Bundle-Lookup darf Suche nicht abbrechen
  }

  return {
    title: product.title ?? "",
    short: product.short ?? "",
    keywords,
    problem: product.details?.problem ?? "",
    result: product.details?.typicalResult ?? "",
    tags: tagTexts,
    bundleTexts: bundleTexts.filter(Boolean),
  };
}

type ProductSearchRank = {
  titleExact: number;
  titleStarts: number;
  keywordScore: number;
  shortScore: number;
  detailScore: number;
  bundleScore: number;
  tagScore: number;
  deliverableScore: number;
  featuredBonus: number;
};

function getBestTitleScore(title: string, terms: string[], mode: "exact" | "starts"): number {
  const normalizedTitle = normalizeText(title);
  if (!normalizedTitle) return 0;

  const titleTokens = tokenize(title);
  let best = 0;

  for (const term of terms) {
    if (!term) continue;

    if (mode === "exact") {
      if (normalizedTitle === term) best = Math.max(best, 4);
      if (textHasTerm(title, term)) best = Math.max(best, 3);
      const exactIndex = titleTokens.findIndex((token) => token === term);
      if (exactIndex >= 0) best = Math.max(best, Math.max(1, 3 - exactIndex * 0.4));
      continue;
    }

    if (normalizedTitle.startsWith(term)) best = Math.max(best, 4);
    const startIndex = titleTokens.findIndex((token) => token.startsWith(term));
    if (startIndex >= 0) best = Math.max(best, Math.max(1, 3 - startIndex * 0.4));
  }

  return best;
}

function scoreTextMatches(texts: string[], terms: string[], weight: number): number {
  if (terms.length === 0) return 0;
  let matches = 0;
  for (const term of terms) {
    if (texts.some((text) => textHasTerm(text, term))) matches += 1;
  }
  return matches * weight;
}

function getProductSearchRank(product: Product, query: string): ProductSearchRank {
  const { rawTerms, synonymTerms } = getQueryVariants(query);
  const sections = getProductSearchSections(product);

  const titleExactRaw = getBestTitleScore(sections.title, rawTerms, "exact");
  const titleStartsRaw = getBestTitleScore(sections.title, rawTerms, "starts");
  const titleExactSynonym = getBestTitleScore(sections.title, synonymTerms, "exact");
  const titleStartsSynonym = getBestTitleScore(sections.title, synonymTerms, "starts");

  const keywordTexts = sections.keywords;
  const detailTexts = [sections.problem, sections.result].filter(Boolean);

  return {
    titleExact: titleExactRaw,
    titleStarts: titleStartsRaw,
    keywordScore:
      titleExactSynonym * 4 +
      titleStartsSynonym * 3 +
      scoreTextMatches(keywordTexts, rawTerms, 18) +
      scoreTextMatches(keywordTexts, synonymTerms, 12),
    shortScore:
      scoreTextMatches([sections.short], rawTerms, 22) +
      scoreTextMatches([sections.short], synonymTerms, 12),
    detailScore:
      scoreTextMatches(detailTexts, rawTerms, 14) +
      scoreTextMatches(detailTexts, synonymTerms, 8),
    bundleScore:
      scoreTextMatches(sections.bundleTexts, rawTerms, 10) +
      scoreTextMatches(sections.bundleTexts, synonymTerms, 6),
    tagScore:
      scoreTextMatches(sections.tags, rawTerms, 8) +
      scoreTextMatches(sections.tags, synonymTerms, 5),
    deliverableScore: scoreTextMatches(sections.bundleTexts, rawTerms, 4),
    featuredBonus: isFeaturedProduct(product.id) ? 1 : 0,
  };
}

function compareProductSearchRank(a: Product, b: Product, query: string): number {
  const rankA = getProductSearchRank(a, query);
  const rankB = getProductSearchRank(b, query);
  const titleSignalA = rankA.titleExact + rankA.titleStarts + Math.min(rankA.keywordScore, 12);
  const titleSignalB = rankB.titleExact + rankB.titleStarts + Math.min(rankB.keywordScore, 12);
  const indirectFactorA = titleSignalA > 0 ? 1 : 0.35;
  const indirectFactorB = titleSignalB > 0 ? 1 : 0.35;

  const totalA =
    rankA.titleExact * 8 +
    rankA.titleStarts * 7 +
    rankA.keywordScore * 1.4 +
    rankA.shortScore * 1.2 * indirectFactorA +
    rankA.detailScore * indirectFactorA +
    rankA.bundleScore * 0.8 * indirectFactorA +
    rankA.tagScore * 0.6 * indirectFactorA +
    rankA.deliverableScore * 0.4 * indirectFactorA +
    rankA.featuredBonus * 6;
  const totalB =
    rankB.titleExact * 8 +
    rankB.titleStarts * 7 +
    rankB.keywordScore * 1.4 +
    rankB.shortScore * 1.2 * indirectFactorB +
    rankB.detailScore * indirectFactorB +
    rankB.bundleScore * 0.8 * indirectFactorB +
    rankB.tagScore * 0.6 * indirectFactorB +
    rankB.deliverableScore * 0.4 * indirectFactorB +
    rankB.featuredBonus * 6;

  if (totalB !== totalA) return totalB - totalA;

  const deltas = [
    rankB.titleExact - rankA.titleExact,
    rankB.titleStarts - rankA.titleStarts,
    rankB.keywordScore - rankA.keywordScore,
    rankB.shortScore - rankA.shortScore,
    rankB.detailScore - rankA.detailScore,
    rankB.bundleScore - rankA.bundleScore,
    rankB.tagScore - rankA.tagScore,
    rankB.deliverableScore - rankA.deliverableScore,
    rankB.featuredBonus - rankA.featuredBonus,
  ];
  const firstDiff = deltas.find((delta) => delta !== 0);
  if (firstDiff) return firstDiff;

  return sortProductsForCatalog([a, b])[0].id === a.id
    ? -1
    : a.title.localeCompare(b.title, "de");
}

function collectProductSearchText(product: Product): string {
  const sections = getProductSearchSections(product);
  return [
    sections.title,
    sections.short,
    ...sections.keywords,
    sections.problem,
    sections.result,
    ...sections.tags,
    ...sections.bundleTexts,
  ]
    .filter(Boolean)
    .join(" ");
}

function collectDeliverableSearchText(deliverable: Deliverable): string {
  return [
    deliverable.name ?? "",
    deliverable.shortDescription ?? "",
    deliverable.longDescription ?? "",
    deliverable.family ?? "",
    ...flattenDeliverableTags(deliverable.tags),
    ...safeStrings(deliverable.deliverablesOutput),
    ...safeStrings(deliverable.assumptions),
  ]
    .filter(Boolean)
    .join(" ");
}

export function productMatchesSearch(product: Product, query: string): boolean {
  try {
    const terms = expandQueryTerms(query);
    if (terms.length === 0) return true;
    return textMatchesTerms(collectProductSearchText(product), terms);
  } catch {
    return false;
  }
}

export function deliverableMatchesSearch(deliverable: Deliverable, query: string): boolean {
  try {
    const terms = expandQueryTerms(query);
    if (terms.length === 0) return true;
    return textMatchesTerms(collectDeliverableSearchText(deliverable), terms);
  } catch {
    return false;
  }
}

export function searchProducts(query: string, pool: Product[] = products): Product[] {
  const terms = expandQueryTerms(query);
  if (terms.length === 0) return pool;
  return pool
    .filter((p) => productMatchesSearch(p, query))
    .sort((a, b) => compareProductSearchRank(a, b, query));
}

export function searchDeliverables(query: string): Deliverable[] {
  const active = deliverables.filter((d) => d.active);
  const terms = expandQueryTerms(query);
  if (terms.length === 0) return active;
  return active.filter((d) => deliverableMatchesSearch(d, query));
}

/** Produkte, die einen passenden Baustein im Bundle haben (zusätzliche Treffer). */
export function findProductsByDeliverableMatch(query: string, pool: Product[] = products): Product[] {
  const terms = expandQueryTerms(query);
  if (terms.length === 0) return [];

  const matchingDeliverableIds = new Set(
    deliverables
      .filter((d) => d.active && deliverableMatchesSearch(d, query))
      .map((d) => d.key)
  );

  if (matchingDeliverableIds.size === 0) return [];

  return pool
    .filter((product) => {
      if (productMatchesSearch(product, query)) return false;
      try {
        return getBundleForProduct(product.id).some((rec) =>
          matchingDeliverableIds.has(rec.deliverableId)
        );
      } catch {
        return false;
      }
    })
    .sort((a, b) => compareProductSearchRank(a, b, query));
}

export interface CatalogSearchResult {
  products: Product[];
  deliverables: Deliverable[];
  productsViaDeliverable: Product[];
}

export function searchCatalog(query: string, productPool: Product[] = products): CatalogSearchResult {
  try {
    const productsDirect = searchProducts(query, productPool);
    const directIds = new Set(productsDirect.map((p) => p.id));
    const productsViaDeliverable = findProductsByDeliverableMatch(query, productPool).filter(
      (p) => !directIds.has(p.id)
    );

    return {
      products: productsDirect,
      deliverables: searchDeliverables(query),
      productsViaDeliverable,
    };
  } catch {
    return { products: [], deliverables: [], productsViaDeliverable: [] };
  }
}
