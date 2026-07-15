// Central target for all product-catalog CTAs.
// Hinweis: Die Site nutzt trailingSlash "always" -> URL mit abschließendem Slash.
export const PRODUCT_CATALOG_URL = "/produktkatalog/";
/** Erstgespräch / allgemeine Beratung (Marketing, Produktseiten). */
export const PRODUCT_CATALOG_MEETING_URL =
  "https://calendly.com/andreas-klostermann-alpinedata/ersttermin";
/** Termin nach Katalog-Anfrage / Bestellbesprechung. */
export const PRODUCT_CATALOG_ORDER_MEETING_URL =
  "https://calendly.com/andreas-klostermann-alpinedata/adv-bestellung";
export const PRODUCT_CATALOG_ORDER_MEETING_TITLE =
  "Besprechung Bestellung – Andreas Klostermann";
export const PRODUCT_CATALOG_INQUIRY_EMAIL = "info@alpinedata.de";

/** Direktlink auf ein Katalog-Produkt (für Marketing-CTAs). */
export function getProductCatalogProductUrl(productId: string): string {
  const id = productId.replace(/^\/+|\/+$/g, "");
  return `${PRODUCT_CATALOG_URL}${id}/`;
}
