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

export function createOpaqueToken(): string {
  return randomBytes(32).toString("base64url");
}

export function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export function htmlResponse(status: number, title: string, bodyHtml: string) {
  const css = `
@font-face{font-family:Outfit;font-weight:700;font-display:swap;src:url(/fonts/outfit-latin-700-normal.woff2) format("woff2")}
@font-face{font-family:Manrope;font-weight:400;font-display:swap;src:url(/fonts/manrope-latin-400-normal.woff2) format("woff2")}
@font-face{font-family:Manrope;font-weight:700;font-display:swap;src:url(/fonts/manrope-latin-700-normal.woff2) format("woff2")}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;flex-direction:column;background:#f6f6f6;color:#040404;font-family:Manrope,system-ui,sans-serif;line-height:1.6}
header{background:#fff;border-bottom:1px solid #eaeaea;padding:1rem 1.5rem}
header img{display:block;height:44px;width:auto}
main{flex:1;display:flex;align-items:flex-start;justify-content:center;padding:3rem 1rem}
.card{background:#fff;border:1px solid #eaeaea;border-top:4px solid #00ce7e;border-radius:8px;max-width:560px;width:100%;padding:2rem;box-shadow:0 4px 16px rgba(0,0,0,.06)}
h1{font-family:Outfit,system-ui,sans-serif;font-weight:700;font-size:1.75rem;line-height:1.2;margin:0 0 1rem}
p{margin:0 0 1rem}
a{color:#008000}
.btn,button{display:inline-block;background:#008000;color:#fff!important;border:0;border-radius:6px;padding:.75rem 1.5rem;font:700 1rem Manrope,system-ui,sans-serif;text-decoration:none;cursor:pointer}
.btn:hover,button:hover{background:#009000}
.back{margin:1.5rem 0 0;font-size:.9rem}
footer{padding:1.25rem;text-align:center;font-size:.85rem;color:#555}
footer a{color:#555}`;
  const page = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(title)} | Alpine Data Ventures</title><style>${css}</style></head><body><header><a href="/"><img src="/logos/logo.png" alt="Alpine Data Ventures" width="170" height="44"></a></header><main><div class="card"><h1>${escapeHtml(title)}</h1>${bodyHtml}<p class="back"><a href="/controlling/">Zurück zur Seite</a></p></div></main><footer>© Alpine Data Ventures GmbH · <a href="/impressum/">Impressum</a> · <a href="/datenschutz/">Datenschutz</a></footer></body></html>`;
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
export function blobStore(name: string, consistency?: "strong" | "eventual") {
  const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID || process.env.NETLIFY_BLOBS_SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  return siteID && token ? getStore({ name, siteID, token, consistency }) : getStore({ name, consistency });
}

// Strong, damit ein bereits eingelöstes Token sofort nicht mehr gelesen wird.
export const tokenStore = () => blobStore("whitepaper-tokens", "strong");
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

export async function deleteToken(token: string): Promise<void> {
  if (!/^[A-Za-z0-9_-]{20,100}$/.test(token)) return;
  await tokenStore().delete(`token-${token}`);
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

export async function getHubspotContact(email: string): Promise<{
  doiStatus: string;
  unsubscribeToken: string;
} | null> {
  const res = await fetch(
    `${HUBSPOT_API}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=doi_status%2Cnewsletter_unsubscribe_token`,
    { headers: hubspotHeaders() },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HubSpot GET ${res.status}`);
  const data = (await res.json()) as {
    properties?: { doi_status?: string; newsletter_unsubscribe_token?: string };
  };
  return {
    doiStatus: data.properties?.doi_status ?? "",
    unsubscribeToken: data.properties?.newsletter_unsubscribe_token ?? "",
  };
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

export async function setHubspotNewsletterSubscription(
  email: string,
  statusState: "SUBSCRIBED" | "UNSUBSCRIBED",
) {
  const subscriptionId = process.env.HUBSPOT_NEWSLETTER_SUBSCRIPTION_ID;
  if (!subscriptionId || !/^\d+$/.test(subscriptionId)) {
    throw new Error("HUBSPOT_NEWSLETTER_SUBSCRIPTION_ID fehlt oder ist ungültig.");
  }
  const res = await fetch(
    `${HUBSPOT_API}/communication-preferences/v4/statuses/${encodeURIComponent(email)}`,
    {
      method: "POST",
      headers: hubspotHeaders(),
      body: JSON.stringify({
        subscriptionId: Number(subscriptionId),
        statusState,
        channel: "EMAIL",
        legalBasis: "CONSENT_WITH_NOTICE",
        legalBasisExplanation:
          statusState === "SUBSCRIBED"
            ? "Kontakt hat das Double-Opt-in für den Newsletter nach ausdrücklicher Einwilligung bestätigt."
            : "Kontakt hat die Abmeldung vom Newsletter angefordert.",
      }),
    },
  );
  if (!res.ok) throw new Error(`HubSpot subscription ${statusState} ${res.status}: ${await res.text()}`);
}

export async function findHubspotContactByUnsubscribeToken(
  token: string,
): Promise<{ email: string; doiStatus: string } | null> {
  const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts/search`, {
    method: "POST",
    headers: hubspotHeaders(),
    body: JSON.stringify({
      filterGroups: [{
        filters: [{
          propertyName: "newsletter_unsubscribe_token",
          operator: "EQ",
          value: token,
        }],
      }],
      properties: ["email", "doi_status"],
      limit: 1,
    }),
  });
  if (!res.ok) throw new Error(`HubSpot contact search ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as {
    results?: Array<{ properties?: { email?: string; doi_status?: string } }>;
  };
  const contact = data.results?.[0]?.properties;
  if (!contact?.email) return null;
  return { email: contact.email, doiStatus: contact.doi_status ?? "" };
}
