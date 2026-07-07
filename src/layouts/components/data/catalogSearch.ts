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

function collectProductSearchText(product: Product): string {
  const tags = product.tags;
  const parts = [
    product.title ?? "",
    product.short ?? "",
    ...safeStrings(product.outputs),
    product.details?.problem ?? "",
    product.details?.typicalResult ?? "",
    ...safeStrings(product.details?.bestFor),
    ...safeStrings(product.details?.typicalDeliverables),
    ...safeStrings(tags?.intent).map((i) => intentLabels[i as keyof typeof intentLabels] ?? i),
    dataScopeLabels[tags?.data_scope as keyof typeof dataScopeLabels] ?? tags?.data_scope ?? "",
    ...safeStrings(tags?.tech_hint).map((t) => techHintLabels[t as keyof typeof techHintLabels] ?? t),
  ];

  try {
    const bundle = getBundleForProduct(product.id);
    for (const rec of bundle) {
      const d = getDeliverableById(rec.deliverableId);
      if (!d) continue;
      parts.push(
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

  return parts.filter(Boolean).join(" ");
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
    try {
      return getBundleForProduct(product.id).some((rec) =>
        matchingDeliverableIds.has(rec.deliverableId)
      );
    } catch {
      return false;
    }
  });
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
