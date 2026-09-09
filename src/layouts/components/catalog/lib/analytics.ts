/**
 * Anonyme Funnel-Analytics für den Produktkatalog (KI-Suche bis Checkout).
 *
 * Datenschutz-Design: die sessionId lebt NUR im JS-Speicher dieses Modul-
 * Singletons – kein Cookie, kein localStorage/sessionStorage. Sie dient
 * ausschließlich dazu, die Schritte EINES Katalog-Besuchs serverseitig für
 * die Funnel-Auswertung zu verknüpfen; ein Neuladen der Seite erzeugt eine
 * neue, unverknüpfbare ID. Es werden nirgends Name, E-Mail oder IP erfasst.
 */

let sessionId: string | null = null;

function getSessionId(): string {
  if (!sessionId) {
    sessionId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }
  return sessionId;
}

const ANALYTICS_ENDPOINT = "/.netlify/functions/catalog-analytics";

export type CatalogAnalyticsEvent =
  | { event: "step_product_overview"; properties: { productId: string; entry: "ki_search" | "browse" | "direct_link" } }
  | { event: "step_modules"; properties: { productId: string } }
  | { event: "step_config"; properties: { productId: string } }
  | { event: "step_project_sheet"; properties: { productId: string } }
  | {
      event: "checkout_action";
      properties: { productId: string; method: "pdf_download" | "email_inquiry" | "calendly_booking" };
    }
  | { event: "custom_inquiry_sent"; properties: { productId: string; mode: "custom" | "hybrid_addon" } }
  | { event: "ki_search"; properties: { query: string; outcome: string; resultCount: number } };

/** Feuert ein anonymes Funnel-Event. Darf die Nutzung nie beeinträchtigen. */
export function trackCatalogEvent(input: CatalogAnalyticsEvent): void {
  if (typeof window === "undefined" || typeof fetch === "undefined") return;

  try {
    const body = JSON.stringify({
      sessionId: getSessionId(),
      event: input.event,
      properties: input.properties,
    });

    void fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics darf die eigentliche Nutzung nie stören.
  }
}
