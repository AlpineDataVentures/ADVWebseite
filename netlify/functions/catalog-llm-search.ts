import corpus from "../../.json/catalogSearchCorpus.json";
import { getLlmSearchProvider } from "./lib/llmSearchProvider";
import { checkIpRateLimit, checkAndIncrementDailyLimit, getBlobsDebugInfo } from "./lib/rateLimiter";

const MAX_QUERY_LENGTH = 1000;

/** Erlaubte Herkunft für Origin/Referer – eigene Domain + alle Netlify-Deploy-Subdomains. */
const ALLOWED_HOST_SUFFIXES = ["alpinedata.de", "netlify.app"];

interface NetlifyFunctionEvent {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string | undefined>;
}

function jsonResponse(statusCode: number, body: unknown, extraHeaders?: Record<string, string>) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...extraHeaders },
    body: JSON.stringify(body),
  };
}

function getClientIp(event: NetlifyFunctionEvent): string {
  const nfIp = event.headers["x-nf-client-connection-ip"];
  if (nfIp) return nfIp;
  const forwarded = event.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

/**
 * Einfache Hürde gegen naive Skripte/Scraper – kein echter Sicherheitsschutz
 * (Header sind fälschbar), blockt aber Aufrufe, die nicht von unserer eigenen
 * Seite kommen (kein Origin/Referer, oder eine fremde Domain).
 */
function isAllowedOrigin(event: NetlifyFunctionEvent): boolean {
  const originHeader = event.headers["origin"] || event.headers["referer"];
  if (!originHeader) return false;

  let hostname: string;
  try {
    hostname = new URL(originHeader).hostname;
  } catch {
    return false;
  }

  return ALLOWED_HOST_SUFFIXES.some((suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`));
}

export const handler = async (event: NetlifyFunctionEvent) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Nur POST erlaubt." });
  }

  if (!isAllowedOrigin(event)) {
    return jsonResponse(403, { error: "Anfrage nicht erlaubt." });
  }

  let query: string;
  try {
    const parsed = JSON.parse(event.body ?? "{}");
    query = typeof parsed.query === "string" ? parsed.query.trim() : "";
  } catch {
    return jsonResponse(400, { error: "Ungültiger Request-Body." });
  }

  if (!query || query.length > MAX_QUERY_LENGTH) {
    return jsonResponse(400, { error: "Suchanfrage fehlt oder ist zu lang." });
  }

  const ip = getClientIp(event);
  const ipLimit = await checkIpRateLimit(ip);
  // TEMPORÄR zur Diagnose des Blobs-Problems – siehe rateLimiter.ts getBlobsDebugInfo().
  const _debug = { ...getBlobsDebugInfo(), ipDebugError: ipLimit.debugError };

  if (!ipLimit.allowed) {
    return jsonResponse(
      429,
      { error: "rate_limited_ip", retryAfterSeconds: ipLimit.retryAfterSeconds, _debug },
      { "Retry-After": String(ipLimit.retryAfterSeconds ?? 60) }
    );
  }

  const daily = await checkAndIncrementDailyLimit();
  if (!daily.ok) {
    return jsonResponse(503, { error: "daily_limit_reached", _debug });
  }

  const provider = getLlmSearchProvider();
  if (!provider) {
    return jsonResponse(500, { error: "Kein LLM-Suchprovider konfiguriert.", _debug });
  }

  try {
    const productIds = await provider.rankProducts(query, corpus);
    return jsonResponse(200, { productIds, _debug: { ..._debug, dailyDebugError: daily.debugError } });
  } catch (err) {
    console.error("[catalog-llm-search] LLM-Suche fehlgeschlagen:", err);
    return jsonResponse(502, { error: "LLM-Suche derzeit nicht verfügbar." });
  }
};
