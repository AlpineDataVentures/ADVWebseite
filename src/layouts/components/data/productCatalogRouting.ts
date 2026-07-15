import { PRODUCT_CATALOG_URL } from "@/config/products";
import { PRODUCT_CATALOG_ALIAS_MAP } from "./catalogStrategy";
import { products } from "./useCases";

/** Marketing-Slugs (/products/…) → Katalog-Produkt-ID */
export const productCatalogMarketingMap = {
  "ai-architecture-infrastructure": "ai-architektur-infrastruktur",
  "business-intelligence": "setup-bi",
  "churn-prevention": "churn-prevention-algo",
  "data-strategy": "datenstrategie",
  "automated-order-intake": "automatisierte-bestellverarbeitung",
  "automated-production-planning": "produktionsplanung",
  "automated-visual-inspection": "ai-video-qualitaetsanalyse",
  "automatische-rechnungsverarbeitung": "automatisierte-rechnungsverarbeitung",
  "dsgvo-compliance": "dsgvo-dsb",
  "identity-and-access-management": "iam",
  "customer-lifetime-value": "customer-lifetime-value",
  "data-ai-leadership": "data-ai-leadership",
  "data-catalog": "data-catalog",
  "data-lake": "data-lake",
  "data-mesh": "data-mesh-organisation",
  "data-warehouse": "dwh",
  "digital-warehouse-management": "lagerbestandsverwaltung",
  "department-reporting": "management-dashboard",
  "isb-isms": "isms-isb-bestellung",
  "know-your-customer": "kyc-automatisierung",
  "management-dashboard": "management-dashboard",
  "master-data-management": "master-data-management",
  "needs-assessment": "bedarfsanalyse",
  "nis2": "nis2",
  "oee-analysis": "oee-analyse",
  "predictive-maintenance": "predictive-maintenance",
  "rag-research": "rag-literaturrecherche",
  "sales-funnel-analysis": "sales-funnel-analyse",
  "ai-strategy": "ki-strategie",
  "ai-produktentwicklung": "ki-strategie",
  "agentic-coding": "agentic-coding",
} as const;

export type ProductCatalogMarketingSlug = keyof typeof productCatalogMarketingMap;

const productIds = new Set(products.map((product) => product.id));
const marketingAliases = new Set(Object.keys(productCatalogMarketingMap));
const catalogAliases = new Set(Object.keys(PRODUCT_CATALOG_ALIAS_MAP));

export function resolveProductAlias(productOrAlias: string): string | null {
  if (PRODUCT_CATALOG_ALIAS_MAP[productOrAlias]) {
    return PRODUCT_CATALOG_ALIAS_MAP[productOrAlias];
  }
  if (productOrAlias in productCatalogMarketingMap) {
    return productCatalogMarketingMap[productOrAlias as ProductCatalogMarketingSlug];
  }
  return null;
}

export function getCanonicalProductId(productOrAlias: string | null | undefined): string | null {
  if (!productOrAlias) return null;

  if (productIds.has(productOrAlias)) {
    const aliasTarget = PRODUCT_CATALOG_ALIAS_MAP[productOrAlias];
    return aliasTarget ?? productOrAlias;
  }

  return resolveProductAlias(productOrAlias);
}

export function isKnownProductCatalogPath(productOrAlias: string | null | undefined): boolean {
  if (!productOrAlias) return false;
  return productIds.has(productOrAlias) || marketingAliases.has(productOrAlias) || catalogAliases.has(productOrAlias);
}

export function buildProductCatalogUrl(productId?: string | null): string {
  if (!productId) return PRODUCT_CATALOG_URL;
  return `${PRODUCT_CATALOG_URL}${productId}/`;
}

/** Alle Alias-Pfade, die auf ein kanonisches Produkt weiterleiten (301). */
export function getCatalogAliasRedirects(): Array<{ alias: string; target: string }> {
  const entries: Array<{ alias: string; target: string }> = [];

  for (const [alias, target] of Object.entries(PRODUCT_CATALOG_ALIAS_MAP)) {
    entries.push({ alias, target });
  }

  for (const [alias, target] of Object.entries(productCatalogMarketingMap)) {
    if (!productIds.has(alias)) {
      entries.push({ alias, target });
    }
  }

  return entries;
}
