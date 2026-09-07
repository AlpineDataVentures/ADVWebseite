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

function getIpStore() {
  return getStore("catalog-llm-search-rate-limit-ip");
}

function getDailyStore() {
  return getStore("catalog-llm-search-rate-limit-daily");
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
  const store = getIpStore();
  const key = `ip:${ip}`;
  const now = Date.now();

  try {
    const record = await store.get(key, { type: "json" }) as IpWindowRecord | null;

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
  const store = getDailyStore();
  const key = todayKey();

  try {
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
