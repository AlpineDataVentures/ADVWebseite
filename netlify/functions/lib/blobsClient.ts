/**
 * Gemeinsame Netlify-Blobs-Helper für alle Functions. Auf manchen Netlify-Sites
 * erkennt getStore() die Umgebung nicht automatisch (bekanntes Netlify-Problem)
 * und wirft MissingBlobsEnvironmentError. Fallback: siteID + Personal Access
 * Token (NETLIFY_BLOBS_TOKEN) explizit übergeben.
 */
import { getStore } from "@netlify/blobs";

function resolveSiteId(): string | undefined {
  return process.env.NETLIFY_SITE_ID || process.env.SITE_ID || process.env.NETLIFY_BLOBS_SITE_ID;
}

function getManualBlobsOptions(): { siteID: string; token: string } | undefined {
  const siteID = resolveSiteId();
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  return siteID && token ? { siteID, token } : undefined;
}

export function getNamedStore(name: string) {
  const manual = getManualBlobsOptions();
  return manual ? getStore({ name, ...manual }) : getStore(name);
}
