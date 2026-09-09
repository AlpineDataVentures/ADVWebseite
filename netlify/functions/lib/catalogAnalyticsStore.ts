/**
 * Speicherung & Auswertung der anonymen Produktkatalog-Funnel-Analytics.
 *
 * Bewusstes Datenschutz-Design: es wird nirgends eine IP, ein Name oder eine
 * E-Mail-Adresse gespeichert. Die einzige Kennung ist eine pro Browser-Tab
 * zufällig erzeugte sessionId, die NICHT auf dem Endgerät gespeichert wird
 * (nur im JS-Speicher der laufenden Seite) und rein dazu dient, mehrere
 * Schritte EINES Katalog-Besuchs für die Funnel-Auswertung zu verknüpfen.
 * Jeder Reload erzeugt eine neue sessionId.
 *
 * Speicherung: ein Blob pro Event unter einem datumsgeprefixten Key, damit
 * Schreibzugriffe nie kollidieren (kein Read-Modify-Write nötig) und die
 * Auswertung tageweise gelesen werden kann.
 */
import { getNamedStore } from "./blobsClient";

const STORE_NAME = "catalog-analytics-events";
const SESSION_ID_PATTERN = /^[a-zA-Z0-9-]{8,64}$/;
const MAX_STRING_LENGTH = 300;

export const CATALOG_ANALYTICS_EVENTS = [
  "step_product_overview",
  "step_modules",
  "step_config",
  "step_project_sheet",
  "checkout_action",
  "custom_inquiry_sent",
  "ki_search",
] as const;

export type CatalogAnalyticsEventName = (typeof CATALOG_ANALYTICS_EVENTS)[number];

export interface CatalogAnalyticsRecord {
  event: CatalogAnalyticsEventName;
  sessionId: string;
  receivedAt: string;
  properties: Record<string, string | number>;
}

function truncate(value: unknown): string {
  return String(value).trim().slice(0, MAX_STRING_LENGTH);
}

function isOneOf<T extends string>(value: unknown, allowed: readonly T[]): value is T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

/**
 * Validiert & normalisiert einen eingehenden Event-Payload streng nach
 * Allow-Liste. Gibt null zurück, wenn irgendetwas nicht passt (kein Best-
 * Effort-Parsing – lieber ein Event verwerfen als Datenmüll speichern).
 */
export function validateCatalogAnalyticsPayload(
  raw: unknown
): { sessionId: string; event: CatalogAnalyticsEventName; properties: Record<string, string | number> } | null {
  if (!raw || typeof raw !== "object") return null;
  const body = raw as Record<string, unknown>;

  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  if (!SESSION_ID_PATTERN.test(sessionId)) return null;

  if (!isOneOf(body.event, CATALOG_ANALYTICS_EVENTS)) return null;
  const event = body.event;

  const rawProps = (body.properties && typeof body.properties === "object" ? body.properties : {}) as Record<
    string,
    unknown
  >;

  switch (event) {
    case "step_product_overview": {
      const productId = typeof rawProps.productId === "string" ? truncate(rawProps.productId) : "";
      if (!productId) return null;
      const entry = isOneOf(rawProps.entry, ["ki_search", "browse", "direct_link"] as const)
        ? rawProps.entry
        : "direct_link";
      return { sessionId, event, properties: { productId, entry } };
    }
    case "step_modules":
    case "step_config":
    case "step_project_sheet": {
      const productId = typeof rawProps.productId === "string" ? truncate(rawProps.productId) : "";
      if (!productId) return null;
      return { sessionId, event, properties: { productId } };
    }
    case "checkout_action": {
      const productId = typeof rawProps.productId === "string" ? truncate(rawProps.productId) : "";
      if (!productId) return null;
      if (!isOneOf(rawProps.method, ["pdf_download", "email_inquiry", "calendly_booking"] as const)) return null;
      return { sessionId, event, properties: { productId, method: rawProps.method } };
    }
    case "custom_inquiry_sent": {
      const productId = typeof rawProps.productId === "string" ? truncate(rawProps.productId) : "unbekannt";
      if (!isOneOf(rawProps.mode, ["custom", "hybrid_addon"] as const)) return null;
      return { sessionId, event, properties: { productId, mode: rawProps.mode } };
    }
    case "ki_search": {
      const query = typeof rawProps.query === "string" ? truncate(rawProps.query) : "";
      if (!query) return null;
      if (!isOneOf(rawProps.outcome, ["success", "error", "rate_limited", "daily_limit"] as const)) return null;
      const resultCount =
        typeof rawProps.resultCount === "number" && Number.isFinite(rawProps.resultCount)
          ? Math.max(0, Math.min(999, Math.round(rawProps.resultCount)))
          : 0;
      return { sessionId, event, properties: { query, outcome: rawProps.outcome, resultCount } };
    }
    default:
      return null;
  }
}

function dateKeyOf(date: Date): string {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

export async function recordCatalogAnalyticsEvent(input: {
  sessionId: string;
  event: CatalogAnalyticsEventName;
  properties: Record<string, string | number>;
}): Promise<void> {
  const store = getNamedStore(STORE_NAME);
  const now = new Date();
  const randomSuffix = Math.random().toString(36).slice(2, 8);
  const key = `events/${dateKeyOf(now)}/${now.getTime()}-${randomSuffix}.json`;

  const record: CatalogAnalyticsRecord = {
    event: input.event,
    sessionId: input.sessionId,
    receivedAt: now.toISOString(),
    properties: input.properties,
  };

  await store.setJSON(key, record);
}

function enumerateDateKeys(fromDate: Date, toDate: Date): string[] {
  const keys: string[] = [];
  const cursor = new Date(Date.UTC(fromDate.getUTCFullYear(), fromDate.getUTCMonth(), fromDate.getUTCDate()));
  const end = new Date(Date.UTC(toDate.getUTCFullYear(), toDate.getUTCMonth(), toDate.getUTCDate()));
  while (cursor <= end) {
    keys.push(dateKeyOf(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return keys;
}

const MAX_EVENTS_PER_QUERY = 20_000;

/** Liest alle Event-Blobs für den Zeitraum [fromDate, toDate] (inklusive, UTC-Tage). */
export async function readCatalogAnalyticsEvents(fromDate: Date, toDate: Date): Promise<CatalogAnalyticsRecord[]> {
  const store = getNamedStore(STORE_NAME);
  const dateKeys = enumerateDateKeys(fromDate, toDate);

  const allKeys: string[] = [];
  for (const dateKey of dateKeys) {
    for await (const page of store.list({ prefix: `events/${dateKey}/`, paginate: true })) {
      for (const blob of page.blobs) {
        allKeys.push(blob.key);
      }
      if (allKeys.length >= MAX_EVENTS_PER_QUERY) break;
    }
    if (allKeys.length >= MAX_EVENTS_PER_QUERY) break;
  }

  const limitedKeys = allKeys.slice(0, MAX_EVENTS_PER_QUERY);
  const records = await Promise.all(
    limitedKeys.map(async (key) => {
      try {
        return (await store.get(key, { type: "json" })) as CatalogAnalyticsRecord | null;
      } catch {
        return null;
      }
    })
  );

  return records.filter((record): record is CatalogAnalyticsRecord => Boolean(record));
}

/** Löscht alle Event-Blobs, deren Datums-Ordner älter als der Stichtag ist. */
export async function deleteCatalogAnalyticsEventsBefore(cutoffDate: Date): Promise<number> {
  const store = getNamedStore(STORE_NAME);
  const cutoffKey = dateKeyOf(cutoffDate);
  let deleted = 0;

  for await (const page of store.list({ prefix: "events/", paginate: true, directories: true })) {
    for (const dir of page.directories ?? []) {
      const segments = dir.split("/").filter(Boolean);
      const dateKey = segments[segments.length - 1] ?? "";
      if (dateKey && dateKey < cutoffKey) {
        for await (const eventPage of store.list({ prefix: `events/${dateKey}/`, paginate: true })) {
          for (const blob of eventPage.blobs) {
            await store.delete(blob.key);
            deleted += 1;
          }
        }
      }
    }
  }

  return deleted;
}

export interface CatalogAnalyticsSummary {
  funnel: Array<{ step: CatalogAnalyticsEventName; label: string; sessions: number }>;
  entryModes: Array<{ entry: string; sessions: number }>;
  checkout: Array<{ method: string; actions: number; sessions: number }>;
  customInquiries: { total: number; sessions: number };
  topProducts: Array<{ productId: string; sessions: number }>;
  kiSearch: {
    total: number;
    byOutcome: Array<{ outcome: string; count: number }>;
    recent: Array<{ query: string; outcome: string; resultCount: number; receivedAt: string }>;
  };
  totalEvents: number;
}

const FUNNEL_STEPS: Array<{ step: CatalogAnalyticsEventName; label: string }> = [
  { step: "step_product_overview", label: "Produktbeschreibung" },
  { step: "step_modules", label: "Bausteine" },
  { step: "step_config", label: "Konfiguration" },
  { step: "step_project_sheet", label: "Projekt-Sheet" },
  { step: "checkout_action", label: "Checkout-Aktion" },
];

/** Reine Aggregationsfunktion (kein I/O) – separat testbar von der Blob-Lese-Logik. */
export function aggregateCatalogAnalytics(records: CatalogAnalyticsRecord[]): CatalogAnalyticsSummary {
  const sessionsByStep = new Map<CatalogAnalyticsEventName, Set<string>>();
  const entrySessions = new Map<string, Set<string>>();
  const checkoutActionsByMethod = new Map<string, number>();
  const checkoutSessionsByMethod = new Map<string, Set<string>>();
  const customInquirySessions = new Set<string>();
  let customInquiryTotal = 0;
  const productSessions = new Map<string, Set<string>>();
  const kiSearchByOutcome = new Map<string, number>();
  const kiSearchRecent: CatalogAnalyticsSummary["kiSearch"]["recent"] = [];
  let kiSearchTotal = 0;

  for (const record of records) {
    switch (record.event) {
      case "step_product_overview":
      case "step_modules":
      case "step_config":
      case "step_project_sheet":
      case "checkout_action": {
        if (!sessionsByStep.has(record.event)) sessionsByStep.set(record.event, new Set());
        sessionsByStep.get(record.event)!.add(record.sessionId);

        const productId = record.properties.productId;
        if (typeof productId === "string" && productId) {
          if (!productSessions.has(productId)) productSessions.set(productId, new Set());
          productSessions.get(productId)!.add(record.sessionId);
        }

        if (record.event === "step_product_overview") {
          const entry = String(record.properties.entry ?? "direct_link");
          if (!entrySessions.has(entry)) entrySessions.set(entry, new Set());
          entrySessions.get(entry)!.add(record.sessionId);
        }

        if (record.event === "checkout_action") {
          const method = String(record.properties.method ?? "unbekannt");
          checkoutActionsByMethod.set(method, (checkoutActionsByMethod.get(method) ?? 0) + 1);
          if (!checkoutSessionsByMethod.has(method)) checkoutSessionsByMethod.set(method, new Set());
          checkoutSessionsByMethod.get(method)!.add(record.sessionId);
        }
        break;
      }
      case "custom_inquiry_sent": {
        customInquiryTotal += 1;
        customInquirySessions.add(record.sessionId);
        break;
      }
      case "ki_search": {
        kiSearchTotal += 1;
        const outcome = String(record.properties.outcome ?? "unbekannt");
        kiSearchByOutcome.set(outcome, (kiSearchByOutcome.get(outcome) ?? 0) + 1);
        kiSearchRecent.push({
          query: String(record.properties.query ?? ""),
          outcome,
          resultCount: Number(record.properties.resultCount ?? 0),
          receivedAt: record.receivedAt,
        });
        break;
      }
    }
  }

  kiSearchRecent.sort((a, b) => (a.receivedAt < b.receivedAt ? 1 : -1));

  return {
    funnel: FUNNEL_STEPS.map(({ step, label }) => ({
      step,
      label,
      sessions: sessionsByStep.get(step)?.size ?? 0,
    })),
    entryModes: Array.from(entrySessions.entries()).map(([entry, sessions]) => ({
      entry,
      sessions: sessions.size,
    })),
    checkout: Array.from(checkoutActionsByMethod.entries()).map(([method, actions]) => ({
      method,
      actions,
      sessions: checkoutSessionsByMethod.get(method)?.size ?? 0,
    })),
    customInquiries: { total: customInquiryTotal, sessions: customInquirySessions.size },
    topProducts: Array.from(productSessions.entries())
      .map(([productId, sessions]) => ({ productId, sessions: sessions.size }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 20),
    kiSearch: {
      total: kiSearchTotal,
      byOutcome: Array.from(kiSearchByOutcome.entries()).map(([outcome, count]) => ({ outcome, count })),
      recent: kiSearchRecent.slice(0, 500),
    },
    totalEvents: records.length,
  };
}
