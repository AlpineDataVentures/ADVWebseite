/**
 * Kosten-Schutz für die LLM-Produktsuche: Pro-IP-Limit + globales Tageslimit.
 * Zählerstände liegen in Netlify Blobs (im Netlify-Plan enthalten, kein
 * zusätzlicher Dienst nötig) – Netlify Functions selbst sind zustandslos.
 *
 * Ausfallverhalten bewusst "fail-open": Ein Blob-Fehler blockiert die Suche
 * NICHT (sonst würde eine Storage-Störung die komplette KI-Suche lahmlegen).
 * Das harte Kosten-Backstop bleibt das Spend-Limit im Anthropic-Konto.
 */
import { getStore } from "@netlify/blobs";

const PER_IP_WINDOW_MS = 60_000;
const PER_IP_MAX_REQUESTS = 5;
const DAILY_MAX_REQUESTS = 7;

interface IpWindowRecord {
  count: number;
  windowStart: number;
}

/**
 * Auf manchen Netlify-Sites (bekanntes Netlify-Problem, siehe Netlify-Docs
 * "Netlify Blobs" > manuelle Konfiguration) erkennt getStore() die Umgebung
 * nicht automatisch und wirft MissingBlobsEnvironmentError. Fallback: siteID
 * (automatisch als NETLIFY_SITE_ID vorhanden) + Personal Access Token
 * (NETLIFY_BLOBS_TOKEN, manuell in den Site-Settings zu hinterlegen) explizit
 * übergeben. Fehlt der Token, bleibt es beim (aktuell fehlschlagenden, aber
 * dank try/catch harmlosen) Auto-Modus.
 */
function getManualBlobsOptions(): { siteID: string; token: string } | undefined {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  return siteID && token ? { siteID, token } : undefined;
}

function getIpStore() {
  const manual = getManualBlobsOptions();
  return manual
    ? getStore({ name: "catalog-llm-search-rate-limit-ip", ...manual })
    : getStore("catalog-llm-search-rate-limit-ip");
}

function getDailyStore() {
  const manual = getManualBlobsOptions();
  return manual
    ? getStore({ name: "catalog-llm-search-rate-limit-daily", ...manual })
    : getStore("catalog-llm-search-rate-limit-daily");
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

export interface IpRateLimitResult {
  allowed: boolean;
  /** Nur gesetzt, wenn allowed === false. */
  retryAfterSeconds?: number;
  /** TEMPORÄR zu Diagnosezwecken – siehe getBlobsDebugInfo(). */
  debugError?: string;
}

export interface DailyLimitResult {
  ok: boolean;
  /** TEMPORÄR zu Diagnosezwecken – siehe getBlobsDebugInfo(). */
  debugError?: string;
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/**
 * TEMPORÄRE Diagnosehilfe (siehe catalog-llm-search.ts _debug-Feld): zeigt nur,
 * OB die Env-Variablen für die manuelle Blobs-Konfiguration gesetzt sind –
 * niemals den Token-Wert selbst. Wieder entfernen, sobald das Limit bestätigt
 * funktioniert.
 */
export function getBlobsDebugInfo() {
  return {
    hasSiteId: Boolean(process.env.NETLIFY_SITE_ID),
    hasToken: Boolean(process.env.NETLIFY_BLOBS_TOKEN),
  };
}

/** Max. PER_IP_MAX_REQUESTS Anfragen pro IP innerhalb von PER_IP_WINDOW_MS (fixes Zeitfenster). */
export async function checkIpRateLimit(ip: string): Promise<IpRateLimitResult> {
  // getStore() kann synchron werfen (z.B. MissingBlobsEnvironmentError) – deshalb
  // muss der komplette Block inkl. getIpStore() im try/catch stehen, sonst greift
  // das gewollte Fail-Open nicht und die Function crasht ungefangen (502).
  try {
    const store = getIpStore();
    const key = `ip:${ip}`;
    const now = Date.now();

    const record = (await store.get(key, { type: "json" })) as IpWindowRecord | null;

    if (!record || now - record.windowStart >= PER_IP_WINDOW_MS) {
      await store.setJSON(key, { count: 1, windowStart: now } satisfies IpWindowRecord);
      return { allowed: true };
    }

    if (record.count < PER_IP_MAX_REQUESTS) {
      await store.setJSON(key, { count: record.count + 1, windowStart: record.windowStart } satisfies IpWindowRecord);
      return { allowed: true };
    }

    const retryAfterSeconds = Math.max(1, Math.ceil((record.windowStart + PER_IP_WINDOW_MS - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  } catch (err) {
    console.error("[rateLimiter] IP-Limit-Check fehlgeschlagen, erlaube Anfrage:", err);
    return { allowed: true, debugError: errorMessage(err) };
  }
}

/** Max. DAILY_MAX_REQUESTS Anfragen insgesamt pro Kalendertag (UTC), IP-unabhängig. */
export async function checkAndIncrementDailyLimit(): Promise<DailyLimitResult> {
  try {
    const store = getDailyStore();
    const key = todayKey();

    const count = ((await store.get(key, { type: "json" })) as number | null) ?? 0;
    if (count >= DAILY_MAX_REQUESTS) {
      return { ok: false };
    }
    await store.setJSON(key, count + 1);
    return { ok: true };
  } catch (err) {
    console.error("[rateLimiter] Tageslimit-Check fehlgeschlagen, erlaube Anfrage:", err);
    return { ok: true, debugError: errorMessage(err) };
  }
}
