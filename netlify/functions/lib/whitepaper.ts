/**
 * Gemeinsame Helfer für Whitepaper-/Newsletter-Anmeldung (Double-Opt-in):
 * HubSpot-Kontakt-API, Token-Speicher (Netlify Blobs) und kleine Utilities.
 */
import { getStore } from "@netlify/blobs";
import { randomBytes, createHash } from "node:crypto";

export const WHITEPAPER_NAME = "controlling-whitepaper";
export const WHITEPAPER_FILE = "controlling-whitepaper.pdf";
export const DOI_TOKEN_TTL_MS = 48 * 60 * 60 * 1000;
export const DOWNLOAD_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60_000;

const HUBSPOT_API = "https://api.hubapi.com";

export interface TokenRecord {
  type: "doi" | "download";
  email: string;
  expiresAt: number;
}

export function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export function htmlResponse(status: number, title: string, bodyHtml: string) {
  const page = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(title)}</title></head><body style="font-family:system-ui,sans-serif;max-width:560px;margin:15vh auto;padding:0 1rem;line-height:1.5"><h1>${escapeHtml(title)}</h1>${bodyHtml}<p><a href="/controlling/">Zurück zur Seite</a></p></body></html>`;
  return new Response(page, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Siehe rateLimiter.ts: manche Netlify-Sites erkennen die Blobs-Umgebung nicht automatisch.
export function blobStore(name: string) {
  const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID || process.env.NETLIFY_BLOBS_SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  return siteID && token ? getStore({ name, siteID, token }) : getStore(name);
}

export const tokenStore = () => blobStore("whitepaper-tokens");
export const fileStore = () => blobStore("whitepapers");

export async function createToken(type: TokenRecord["type"], email: string, ttlMs: number): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const record: TokenRecord = { type, email, expiresAt: Date.now() + ttlMs };
  await tokenStore().setJSON(`token-${token}`, record);
  return token;
}

export async function readToken(token: string, type: TokenRecord["type"]): Promise<TokenRecord | null> {
  if (!/^[A-Za-z0-9_-]{20,100}$/.test(token)) return null;
  const record = (await tokenStore().get(`token-${token}`, { type: "json" })) as TokenRecord | null;
  if (!record || record.type !== type || record.expiresAt < Date.now()) return null;
  return record;
}

/** Verhindert Mail-Flooding an fremde Adressen: höchstens eine Mail pro Adresse und Minute. */
export async function isOnCooldown(email: string): Promise<boolean> {
  const key = `cooldown-${createHash("sha256").update(email).digest("hex")}`;
  const store = tokenStore();
  const last = (await store.get(key, { type: "json" })) as { at: number } | null;
  if (last && Date.now() - last.at < RESEND_COOLDOWN_MS) return true;
  await store.setJSON(key, { at: Date.now() });
  return false;
}

function hubspotHeaders() {
  const token = process.env.NewsletterADVWebseite;
  if (!token) throw new Error("Umgebungsvariable NewsletterADVWebseite fehlt.");
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export async function getHubspotDoiStatus(email: string): Promise<string | null> {
  const res = await fetch(
    `${HUBSPOT_API}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=doi_status`,
    { headers: hubspotHeaders() },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HubSpot GET ${res.status}`);
  const data = (await res.json()) as { properties?: { doi_status?: string } };
  return data.properties?.doi_status ?? "";
}

/** Legt den Kontakt an oder aktualisiert ihn (Upsert über die E-Mail-Adresse). */
export async function upsertHubspotContact(email: string, properties: Record<string, string>) {
  const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts/batch/upsert`, {
    method: "POST",
    headers: hubspotHeaders(),
    body: JSON.stringify({ inputs: [{ id: email, idProperty: "email", properties: { email, ...properties } }] }),
  });
  if (!res.ok) throw new Error(`HubSpot upsert ${res.status}: ${await res.text()}`);
}
