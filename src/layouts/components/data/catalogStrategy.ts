import type { Product } from "./useCases";
import { getProductsForUiCluster, type UiClusterId } from "./useCases";

/**
 * Produktkatalog-Strategie (Phase 4 erweitert).
 * Ziel: ca. 65–75 aktive Produkte im Browse-Pool (99 gesamt, keine Löschungen).
 * Nur echte Doppelungen → Alias; schwache Nischen → Archiv.
 * Schwerpunkt: Produktbausteine als kaufbarer Kern des Angebots.
 */

/** Kuratierte Einstiege – Reihenfolge = Anzeige (nicht alphabetisch). */
export const FEATURED_PRODUCT_IDS = [
  // Gängige Einstiegsangebote
  "datenstrategie",
  "data-ai-leadership",
  "maturity-assessment",
  "management-dashboard",
  "setup-bi",
  "excel-to-bi-migration",
  "dwh",
  "data-catalog",
  "master-data-management",
  "controlling-via-bi",
  "liquiditaetsplanung-bi",
  "sales-dashboard",
  "sales-reporting",
  "sales-funnel-analyse",
  "automatisierte-rechnungsverarbeitung",
  "churn-prevention-algo",
  "dsgvo-dsb",
  "iam",
  "ki-strategie",
  "data-mesh-organisation",
  // KI / Automatisierung
  "rag-literaturrecherche",
  "ai-video-qualitaetsanalyse",
  "agentic-coding",
  "predictive-maintenance",
  "helpdesk-automation",
  "automatisierte-bestellverarbeitung",
  "ausschreibungsautomatisierung",
  "produktionsplanung",
  "oee-analyse",
  "bedarfsanalyse",
  // Architektur / Plattform / Add-ons
  "data-lake",
  "dataops",
  "enterprise-architecture-management",
  "api-management",
  "adf-aufsetzen",
  "nis2",
  "financial-forecasting",
  "financial-planning",
  "wartung-support",
] as const;

export type FeaturedProductId = (typeof FEATURED_PRODUCT_IDS)[number];

/**
 * Keine produktinternen Alias-Slugs mehr: Jede Produkt-ID steht für genau eine Seite.
 */
export const SECONDARY_PRODUCT_IDS = new Set<string>();

/**
 * Nur wenige klare Duplikate/Nischen – bewusst klein gehalten.
 * Nicht gelöscht, nur zurückgestuft.
 */
export const ARCHIVED_PRODUCT_IDS = new Set([
  "simulation-experimente",
  "digital-twin",
  "ai-oberflaechenanalyse",
]);

/** Weniger prominent (z. B. Add-on / Betrieb), aber weiter auffindbar. */
export const LOW_PROFILE_PRODUCT_IDS = new Set(["wartung-support"]);

const featuredSet = new Set<string>(FEATURED_PRODUCT_IDS);

export function isFeaturedProduct(productId: string): boolean {
  return featuredSet.has(productId);
}

export function isSecondaryProduct(productId: string): boolean {
  return SECONDARY_PRODUCT_IDS.has(productId);
}

export function isArchivedProduct(productId: string): boolean {
  return ARCHIVED_PRODUCT_IDS.has(productId);
}

export function isLowProfileProduct(productId: string): boolean {
  return LOW_PROFILE_PRODUCT_IDS.has(productId);
}

/** Für Domänen-Navigation und Standard-Pool (ohne Varianten/Archiv). */
export function isBrowsableInCatalog(productId: string): boolean {
  return !isSecondaryProduct(productId) && !isArchivedProduct(productId);
}

/** Alphabetische Sortierung für „Alle Produkte“. */
export function sortProductsAlphabetically(products: Product[]): Product[] {
  return [...products].sort((a, b) => a.title.localeCompare(b.title, "de"));
}

export function sortProductsForCatalog(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const score = (id: string) => {
      if (isArchivedProduct(id)) return 0;
      if (isSecondaryProduct(id)) return 1;
      if (isLowProfileProduct(id)) return 2;
      if (isFeaturedProduct(id)) return 4;
      if (products.find((p) => p.id === id)?.priority === "green") return 3;
      return 2;
    };

    const diff = score(b.id) - score(a.id);
    if (diff !== 0) return diff;
    return a.title.localeCompare(b.title, "de");
  });
}

export function getFeaturedProducts(allProducts: Product[]): Product[] {
  return FEATURED_PRODUCT_IDS.map((id) => allProducts.find((p) => p.id === id)).filter(
    (p): p is Product => Boolean(p)
  );
}

export function getProductsForClusterBrowse(clusterId: UiClusterId): Product[] {
  return sortProductsForCatalog(
    getProductsForUiCluster(clusterId).filter((p) => isBrowsableInCatalog(p.id))
  );
}

export function getDefaultBrowsePool(allProducts: Product[]): Product[] {
  return sortProductsForCatalog(allProducts.filter((p) => isBrowsableInCatalog(p.id)));
}

/** Aktive Produkte im Standard-Browse (ohne Alias-Varianten und Archiv). */
export function getActiveCatalogProductCount(allProducts: Product[]): number {
  return allProducts.filter((p) => isBrowsableInCatalog(p.id)).length;
}
