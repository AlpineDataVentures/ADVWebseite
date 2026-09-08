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
const DAILY_MAX_REQUESTS = 100;

interface IpWindowRecord {
  count: number;
  windowStart: number;
}

/**
 * Auf manchen Netlify-Sites (bekanntes Netlify-Problem, siehe Netlify-Docs
 * "Netlify Blobs" > manuelle Konfiguration) erkennt getStore() die Umgebung
 * nicht automatisch und wirft MissingBlobsEnvironmentError. Fallback: siteID
 * + Personal Access Token (NETLIFY_BLOBS_TOKEN, manuell in den Site-Settings
 * zu hinterlegen) explizit übergeben.
 *
 * Die Site-ID wird normalerweise automatisch als NETLIFY_SITE_ID bereitgestellt –
 * bei uns war das (Stand Diagnose) nicht der Fall. Daher zusätzlich Fallback auf
 * die ältere Variable SITE_ID, und als letzte Stufe auf eine manuell gesetzte
 * NETLIFY_BLOBS_SITE_ID (Wert = "Site ID"/"Project ID" aus Site configuration →
 * General → Site details).
 */
function resolveSiteId(): string | undefined {
  return process.env.NETLIFY_SITE_ID || process.env.SITE_ID || process.env.NETLIFY_BLOBS_SITE_ID;
}

function getManualBlobsOptions(): { siteID: string; token: string } | undefined {
  const siteID = resolveSiteId();
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
    return { allowed: true };
  }
}

/** Max. DAILY_MAX_REQUESTS Anfragen insgesamt pro Kalendertag (UTC), IP-unabhängig. */
export async function checkAndIncrementDailyLimit(): Promise<boolean> {
  try {
    const store = getDailyStore();
    const key = todayKey();

    const count = ((await store.get(key, { type: "json" })) as number | null) ?? 0;
    if (count >= DAILY_MAX_REQUESTS) {
      return false;
    }
    await store.setJSON(key, count + 1);
    return true;
  } catch (err) {
    console.error("[rateLimiter] Tageslimit-Check fehlgeschlagen, erlaube Anfrage:", err);
    return true;
  }
}
