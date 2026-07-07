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
 * Varianten → Zielprodukt. Alte URLs leiten weiter; Datensätze bleiben erhalten.
 */
export const PRODUCT_CATALOG_ALIAS_MAP: Record<string, string> = {
  // Helpdesk-Varianten
  "ai-helpdeskassistent": "helpdesk-automation",
  "self-service-helpdesk": "helpdesk-automation",
  "sales-chatbot-webseite": "helpdesk-automation",
  // Bestell-/Beschaffungsvarianten
  "automatisierung-bestelldaten": "automatisierte-bestellverarbeitung",
  // IAM / Governance-Varianten
  "iam-konzept": "iam",
  "data-governance-konzept": "data-catalog",
  "governance-schulungen": "data-catalog",
  "umsetzung-rechte-rollenkonzepte": "iam",
  // Strategie-Varianten
  "datenstrategie-erstellung": "datenstrategie",
  "change-begleitung": "data-ai-leadership",
  "ai-produktentwicklung": "ki-strategie",
  // Data Mesh / DWH / Infrastruktur
  "data-mesh-einfuehrung": "data-mesh-organisation",
  "data-mesh-skalierung": "data-mesh-organisation",
  "data-warehouse-implementierung": "dwh",
  "setup-data-infrastructure": "setup-bi",
  // BI / Sales-Varianten
  "bereichs-reports": "management-dashboard",
  "ki-preisueberwachung": "best-price-purchase",
  // Qualität / Vision-Varianten
  "quality-assurance-ai": "ai-video-qualitaetsanalyse",
  "objekterkennung": "ai-video-qualitaetsanalyse",
  "ki-wissensmanagement": "rag-literaturrecherche",
  // HR-Varianten
  "strategische-personalplanung": "personal-controlling",
  "operative-personaleinsatzplanung": "personal-controlling",
  "ki-warenausgangs-scanning": "lagerbestandsverwaltung",
};

/** Aus Domänen-/Standardlisten ausgeblendet – weiter unter „Alle Produkte“ und Suche. */
export const SECONDARY_PRODUCT_IDS = new Set(Object.keys(PRODUCT_CATALOG_ALIAS_MAP));

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
