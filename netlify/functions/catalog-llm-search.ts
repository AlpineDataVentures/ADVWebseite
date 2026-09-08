import type { Config, Context } from "@netlify/functions";
import corpus from "../../.json/catalogSearchCorpus.json";
import { getLlmSearchProvider } from "./lib/llmSearchProvider";
import { checkIpRateLimit, checkAndIncrementDailyLimit } from "./lib/rateLimiter";

const MAX_QUERY_LENGTH = 1000;
const FUNCTION_PATH = "/.netlify/functions/catalog-llm-search";

/** Erlaubte Herkunft für Origin/Referer – eigene Domain + alle Netlify-Deploy-Subdomains. */
const ALLOWED_HOST_SUFFIXES = ["alpinedata.de", "netlify.app"];

function jsonResponse(statusCode: number, body: unknown, extraHeaders?: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

/**
 * Einfache Hürde gegen naive Skripte/Scraper – kein echter Sicherheitsschutz
 * (Header sind fälschbar), blockt aber Aufrufe, die nicht von unserer eigenen
 * Seite kommen (kein Origin/Referer, oder eine fremde Domain).
 */
function isAllowedOrigin(request: Request): boolean {
  const originHeader = request.headers.get("origin") || request.headers.get("referer");
  if (!originHeader) return false;

  let hostname: string;
  try {
    hostname = new URL(originHeader).hostname;
  } catch {
    return false;
  }

  return ALLOWED_HOST_SUFFIXES.some((suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`));
}

// v2-Function (Request/Response-Signatur) statt klassischem exports.handler –
// nur damit unterstützt Netlify das native, plattformseitige Rate-Limiting
// unten in `config` (zusätzliche, von Blobs unabhängige Schutzebene).
export default async (request: Request, context: Context) => {
  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Nur POST erlaubt." });
  }

  if (!isAllowedOrigin(request)) {
    return jsonResponse(403, { error: "Anfrage nicht erlaubt." });
  }

  let query: string;
  try {
    const parsed = await request.json();
    query = typeof parsed?.query === "string" ? parsed.query.trim() : "";
  } catch {
    return jsonResponse(400, { error: "Ungültiger Request-Body." });
  }

  if (!query || query.length > MAX_QUERY_LENGTH) {
    return jsonResponse(400, { error: "Suchanfrage fehlt oder ist zu lang." });
  }

  const ip = context.ip || "unknown";
  const ipLimit = await checkIpRateLimit(ip);
  if (!ipLimit.allowed) {
    return jsonResponse(
      429,
      { error: "rate_limited_ip", retryAfterSeconds: ipLimit.retryAfterSeconds },
      { "Retry-After": String(ipLimit.retryAfterSeconds ?? 60) }
    );
  }

  const dailyOk = await checkAndIncrementDailyLimit();
  if (!dailyOk) {
    return jsonResponse(503, { error: "daily_limit_reached" });
  }

  const provider = getLlmSearchProvider();
  if (!provider) {
    return jsonResponse(500, { error: "Kein LLM-Suchprovider konfiguriert." });
  }

  try {
    const productIds = await provider.rankProducts(query, corpus);
    return jsonResponse(200, { productIds });
  } catch (err) {
    console.error("[catalog-llm-search] LLM-Suche fehlgeschlagen:", err);
    return jsonResponse(502, { error: "LLM-Suche derzeit nicht verfügbar." });
  }
};

export const config: Config = {
  path: FUNCTION_PATH,
  rateLimit: {
    windowLimit: 10,
    windowSize: 60,
    aggregateBy: ["ip"],
  },
};
