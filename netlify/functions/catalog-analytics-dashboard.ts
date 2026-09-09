import { timingSafeEqual } from "node:crypto";
import type { Context } from "@netlify/functions";
import { checkIpRateLimit } from "./lib/rateLimiter";
import { readCatalogAnalyticsEvents, aggregateCatalogAnalytics } from "./lib/catalogAnalyticsStore";

const MAX_RANGE_DAYS = 366;

function jsonResponse(statusCode: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

function isValidPassword(candidate: string): boolean {
  const expected = process.env.ANALYTICS_DASHBOARD_PASSWORD;
  if (!expected || !candidate) return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function parseDate(value: unknown, fallback: Date): Date {
  if (typeof value !== "string") return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

/**
 * Liefert die aggregierte, anonyme Funnel-/KI-Suche-Auswertung für das interne
 * Dashboard. Passwortgeschützt (geteiltes Geheimnis in ANALYTICS_DASHBOARD_PASSWORD),
 * kein Nutzer-Login-System nötig, da es sich um ein rein internes Tool handelt.
 */
export default async (request: Request, context: Context) => {
  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Nur POST erlaubt." });
  }

  const ip = context.ip || "unknown";
  const ipLimit = await checkIpRateLimit(ip, {
    storeName: "catalog-analytics-dashboard-rate-limit-ip",
    windowMs: 60_000,
    maxRequests: 10,
  });
  if (!ipLimit.allowed) {
    return jsonResponse(429, { error: "Zu viele Versuche. Bitte kurz warten." });
  }

  let body: { password?: unknown; from?: unknown; to?: unknown };
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: "Ungültiger Request-Body." });
  }

  if (!process.env.ANALYTICS_DASHBOARD_PASSWORD) {
    console.error("[catalog-analytics-dashboard] ANALYTICS_DASHBOARD_PASSWORD ist nicht gesetzt.");
    return jsonResponse(500, { error: "Dashboard ist nicht konfiguriert." });
  }

  if (typeof body.password !== "string" || !isValidPassword(body.password)) {
    return jsonResponse(401, { error: "Falsches Passwort." });
  }

  const now = new Date();
  const defaultFrom = new Date(now);
  defaultFrom.setUTCDate(defaultFrom.getUTCDate() - 30);

  const fromDate = parseDate(body.from, defaultFrom);
  const toDate = parseDate(body.to, now);

  const rangeDays = Math.abs((toDate.getTime() - fromDate.getTime()) / (24 * 60 * 60 * 1000));
  if (rangeDays > MAX_RANGE_DAYS) {
    return jsonResponse(400, { error: `Zeitraum darf höchstens ${MAX_RANGE_DAYS} Tage umfassen.` });
  }

  try {
    const records = await readCatalogAnalyticsEvents(fromDate, toDate);
    const summary = aggregateCatalogAnalytics(records);
    return jsonResponse(200, { summary, from: fromDate.toISOString(), to: toDate.toISOString() });
  } catch (err) {
    console.error("[catalog-analytics-dashboard] Auswertung fehlgeschlagen:", err);
    return jsonResponse(500, { error: "Auswertung fehlgeschlagen." });
  }
};
