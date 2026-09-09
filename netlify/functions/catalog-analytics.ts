import type { Context } from "@netlify/functions";
import { checkIpRateLimit } from "./lib/rateLimiter";
import { validateCatalogAnalyticsPayload, recordCatalogAnalyticsEvent } from "./lib/catalogAnalyticsStore";

/** Erlaubte Herkunft für Origin/Referer – eigene Domain + alle Netlify-Deploy-Subdomains. */
const ALLOWED_HOST_SUFFIXES = ["alpinedata.de", "netlify.app"];

function jsonResponse(statusCode: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

/** 204 darf laut Fetch-Spec keinen Body haben (sonst TypeError beim Response-Konstruktor). */
function noContentResponse() {
  return new Response(null, { status: 204 });
}

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

/**
 * Nimmt anonyme Produktkatalog-Funnel-Events entgegen (siehe
 * lib/catalogAnalyticsStore.ts für das Datenmodell und die
 * Datenschutz-Begründung). Es wird bewusst weder IP noch User-Agent
 * gespeichert – die IP wird hier nur transient fürs Rate-Limit genutzt.
 */
export default async (request: Request, context: Context) => {
  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Nur POST erlaubt." });
  }

  if (!isAllowedOrigin(request)) {
    return jsonResponse(403, { error: "Anfrage nicht erlaubt." });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return jsonResponse(400, { error: "Ungültiger Request-Body." });
  }

  const payload = validateCatalogAnalyticsPayload(raw);
  if (!payload) {
    return jsonResponse(400, { error: "Ungültiges Event." });
  }

  const ip = context.ip || "unknown";
  const ipLimit = await checkIpRateLimit(ip, {
    storeName: "catalog-analytics-rate-limit-ip",
    windowMs: 60_000,
    maxRequests: 60,
  });
  if (!ipLimit.allowed) {
    return jsonResponse(429, { error: "rate_limited" });
  }

  try {
    await recordCatalogAnalyticsEvent(payload);
    return noContentResponse();
  } catch (err) {
    console.error("[catalog-analytics] Event konnte nicht gespeichert werden:", err);
    // Bewusst 204 statt 500: Analytics-Ausfälle dürfen dem Client nicht auffallen.
    return noContentResponse();
  }
};
