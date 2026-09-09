import type { Config } from "@netlify/functions";
import { deleteCatalogAnalyticsEventsBefore } from "./lib/catalogAnalyticsStore";

const RETENTION_DAYS = 365;

/**
 * Läuft täglich und löscht anonyme Analytics-Rohdaten, die älter als
 * RETENTION_DAYS sind (Datensparsamkeit, Art. 5 Abs. 1 lit. e DSGVO – auch
 * wenn die Daten selbst anonym und damit nicht DSGVO-pflichtig sind).
 */
export default async () => {
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - RETENTION_DAYS);

  try {
    const deleted = await deleteCatalogAnalyticsEventsBefore(cutoff);
    console.log(`[catalog-analytics-cleanup] ${deleted} alte Events gelöscht (Stichtag ${cutoff.toISOString()}).`);
    return new Response(JSON.stringify({ deleted }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[catalog-analytics-cleanup] Aufräumen fehlgeschlagen:", err);
    return new Response(JSON.stringify({ error: "cleanup_failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config: Config = {
  schedule: "@daily",
};
