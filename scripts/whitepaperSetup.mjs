/**
 * Einmalige Einrichtung für das Whitepaper (Double-Opt-in):
 *
 *   node scripts/whitepaperSetup.mjs properties
 *     Legt die HubSpot-Kontakteigenschaften an (Token: NewsletterADVWebseite,
 *     Scope crm.schemas.contacts.write nötig).
 *
 *   node scripts/whitepaperSetup.mjs subscriptions
 *     Zeigt die Newsletter-Abonnementstypen und ihre IDs (Scope
 *     communication_preferences.read nötig).
 *
 *   node scripts/whitepaperSetup.mjs upload <pfad-zur.pdf>
 *     Lädt die PDF in den privaten Netlify-Blob-Store "whitepapers"
 *     (NETLIFY_SITE_ID und NETLIFY_BLOBS_TOKEN = Personal Access Token nötig).
 */
import { readFile } from "node:fs/promises";
import { getStore } from "@netlify/blobs";

const FILE_KEY = "controlling-whitepaper.pdf";
const PROPERTIES = [
  { name: "whitepaper_name", label: "Whitepaper Name", type: "string", fieldType: "text" },
  { name: "whitepaper_consent_at", label: "Whitepaper Einwilligung am", type: "datetime", fieldType: "date" },
  { name: "doi_status", label: "Double-Opt-in Status", type: "string", fieldType: "text" },
  { name: "doi_confirmed_at", label: "Double-Opt-in bestätigt am", type: "datetime", fieldType: "date" },
  { name: "newsletter_unsubscribe_token", label: "Newsletter Abmeldetoken", type: "string", fieldType: "text" },
  { name: "newsletter_unsubscribed_at", label: "Newsletter abgemeldet am", type: "datetime", fieldType: "date" },
];

const [command, arg] = process.argv.slice(2);

if (command === "properties") {
  const token = process.env.NewsletterADVWebseite;
  if (!token) throw new Error("Umgebungsvariable NewsletterADVWebseite fehlt.");
  for (const prop of PROPERTIES) {
    const res = await fetch("https://api.hubapi.com/crm/v3/properties/contacts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ ...prop, groupName: "contactinformation" }),
    });
    if (res.status === 409) {
      console.log(prop.name, "existiert bereits");
    } else if (res.ok) {
      console.log(prop.name, "angelegt");
    } else {
      throw new Error(`Property ${prop.name}: HubSpot ${res.status}: ${await res.text()}`);
    }
  }
} else if (command === "subscriptions") {
  const token = process.env.NewsletterADVWebseite;
  if (!token) throw new Error("Umgebungsvariable NewsletterADVWebseite fehlt.");
  const res = await fetch("https://api.hubapi.com/communication-preferences/v4/definitions", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`HubSpot subscription definitions ${res.status}: ${await res.text()}`);
  const data = await res.json();
  for (const subscription of data.results ?? []) {
    console.log(`${subscription.id}\t${subscription.name}\t${subscription.communicationMethod}\t${subscription.isActive ? "aktiv" : "inaktiv"}`);
  }
} else if (command === "upload" && arg) {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  if (!siteID || !token) throw new Error("NETLIFY_SITE_ID und NETLIFY_BLOBS_TOKEN müssen gesetzt sein.");
  const data = await readFile(arg);
  await getStore({ name: "whitepapers", siteID, token }).set(FILE_KEY, data);
  console.log(`${FILE_KEY} hochgeladen (${data.length} Bytes).`);
} else {
  console.log("Aufruf: node scripts/whitepaperSetup.mjs properties | subscriptions | upload <pdf>");
  process.exit(1);
}
