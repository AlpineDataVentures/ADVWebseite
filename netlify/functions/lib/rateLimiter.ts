/**
 * Kosten-Schutz für kostenpflichtige/missbrauchsanfällige Endpoints: Pro-IP-Limit
 * + optionales globales Tageslimit. Zählerstände liegen in Netlify Blobs (im
 * Netlify-Plan enthalten, kein zusätzlicher Dienst nötig) – Netlify Functions
 * selbst sind zustandslos.
 *
 * Ausfallverhalten bewusst "fail-open": Ein Blob-Fehler blockiert die Anfrage
 * NICHT (sonst würde eine Storage-Störung die Funktion lahmlegen).
 */
import { getNamedStore } from "./blobsClient";

const DAILY_MAX_REQUESTS = 100;

interface IpWindowRecord {
  count: number;
  windowStart: number;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

export interface IpRateLimitOptions {
  /** Eigener Blobs-Store-Name pro Endpoint, damit Zähler sich nicht überschneiden. */
  storeName: string;
  windowMs: number;
  maxRequests: number;
}

export interface IpRateLimitResult {
  allowed: boolean;
  /** Nur gesetzt, wenn allowed === false. */
  retryAfterSeconds?: number;
}

/** Max. maxRequests Anfragen pro IP innerhalb von windowMs (fixes Zeitfenster). */
export async function checkIpRateLimit(ip: string, options: IpRateLimitOptions): Promise<IpRateLimitResult> {
  // getNamedStore() kann synchron werfen (z.B. MissingBlobsEnvironmentError) –
  // deshalb muss der komplette Block im try/catch stehen, sonst greift das
  // gewollte Fail-Open nicht und die Function crasht ungefangen (502).
  try {
    const store = getNamedStore(options.storeName);
    const key = `ip:${ip}`;
    const now = Date.now();

    const record = (await store.get(key, { type: "json" })) as IpWindowRecord | null;

    if (!record || now - record.windowStart >= options.windowMs) {
      await store.setJSON(key, { count: 1, windowStart: now } satisfies IpWindowRecord);
      return { allowed: true };
    }

    if (record.count < options.maxRequests) {
      await store.setJSON(key, { count: record.count + 1, windowStart: record.windowStart } satisfies IpWindowRecord);
      return { allowed: true };
    }

    const retryAfterSeconds = Math.max(1, Math.ceil((record.windowStart + options.windowMs - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  } catch (err) {
    console.error(`[rateLimiter] IP-Limit-Check (${options.storeName}) fehlgeschlagen, erlaube Anfrage:`, err);
    return { allowed: true };
  }
}

/** Max. DAILY_MAX_REQUESTS Anfragen insgesamt pro Kalendertag (UTC), IP-unabhängig. */
export async function checkAndIncrementDailyLimit(): Promise<boolean> {
  try {
    const store = getNamedStore("catalog-llm-search-rate-limit-daily");
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
