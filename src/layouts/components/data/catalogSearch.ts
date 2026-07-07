import type { Product } from "./useCases";
import { products } from "./useCases";
import type { Deliverable } from "./deliverables";
import { deliverables } from "./deliverables";
import { getBundleForProduct } from "./recommendations";
import { getDeliverableById } from "./deliverables";

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
};

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

function expandQueryTerms(query: string): string[] {
  const base = normalizeQuery(query);
  if (!base) return [];
  const terms = new Set(base.split(/\s+/).filter(Boolean));
  for (const word of [...terms]) {
    const extras = searchSynonyms[word];
    if (extras) extras.forEach((e) => terms.add(e));
  }
  return [...terms];
}

function textMatchesTerms(haystack: string, terms: string[]): boolean {
  const normalized = haystack.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function collectProductSearchText(product: Product): string {
  const parts = [
    product.title,
    product.short,
    ...product.outputs,
    product.details?.problem ?? "",
    product.details?.typicalResult ?? "",
    ...(product.details?.bestFor ?? []),
    ...(product.details?.typicalDeliverables ?? []),
    ...product.tags.intent.map((i) => intentLabels[i] ?? i),
    dataScopeLabels[product.tags.data_scope] ?? product.tags.data_scope,
    ...product.tags.tech_hint.map((t) => techHintLabels[t] ?? t),
  ];

  const bundle = getBundleForProduct(product.id);
  for (const rec of bundle) {
    const d = getDeliverableById(rec.deliverableId);
    if (d) {
      parts.push(d.name, d.shortDescription, d.longDescription, d.family, ...d.tags);
      parts.push(...d.deliverablesOutput);
    }
  }

  return parts.join(" ");
}

function collectDeliverableSearchText(deliverable: Deliverable): string {
  return [
    deliverable.name,
    deliverable.shortDescription,
    deliverable.longDescription,
    deliverable.family,
    ...deliverable.tags,
    ...deliverable.deliverablesOutput,
    ...deliverable.assumptions,
  ].join(" ");
}

export function productMatchesSearch(product: Product, query: string): boolean {
  const terms = expandQueryTerms(query);
  if (terms.length === 0) return true;
  const text = collectProductSearchText(product);
  return textMatchesTerms(text, terms);
}

export function deliverableMatchesSearch(deliverable: Deliverable, query: string): boolean {
  const terms = expandQueryTerms(query);
  if (terms.length === 0) return true;
  return textMatchesTerms(collectDeliverableSearchText(deliverable), terms);
}

export function searchProducts(query: string, pool: Product[] = products): Product[] {
  const terms = expandQueryTerms(query);
  if (terms.length === 0) return pool;
  return pool.filter((p) => productMatchesSearch(p, query));
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

  return pool.filter((product) => {
    if (productMatchesSearch(product, query)) return false;
    return getBundleForProduct(product.id).some((rec) =>
      matchingDeliverableIds.has(rec.deliverableId)
    );
  });
}

export interface CatalogSearchResult {
  products: Product[];
  deliverables: Deliverable[];
  productsViaDeliverable: Product[];
}

export function searchCatalog(query: string, productPool: Product[] = products): CatalogSearchResult {
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
}
