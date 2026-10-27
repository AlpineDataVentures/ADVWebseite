import { Resend } from "resend";
import {
  DOI_TOKEN_TTL_MS,
  DOWNLOAD_TOKEN_TTL_MS,
  WHITEPAPER_NAME,
  createToken,
  escapeHtml,
  getHubspotDoiStatus,
  isOnCooldown,
  isValidEmail,
  jsonResponse,
  upsertHubspotContact,
} from "./lib/whitepaper";

const FROM = "Alpine Data <info@alpinedata.de>";
const OK_MESSAGE =
  "Fast geschafft: Wir haben Ihnen eine E-Mail geschickt. Bitte bestätigen Sie Ihre Anmeldung über den Link darin, dann erhalten Sie das Whitepaper.";

// Schritt 1 des Double-Opt-in: Kontakt in HubSpot als "pending" speichern und Bestätigungsmail senden.
export default async (request: Request) => {
  if (request.method !== "POST") return jsonResponse(405, { error: "Nur POST erlaubt." });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: "Ungültiger Request-Body." });
  }

  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const email = str(body.email, 254).toLowerCase();
  const firstname = str(body.firstname, 100);
  const lastname = str(body.lastname, 100);
  const company = str(body.company, 200);

  // Honeypot: Menschen lassen das Feld leer. Bots bekommen eine unauffällige Erfolgsantwort.
  if (str(body.website, 200)) return jsonResponse(200, { msg: OK_MESSAGE });

  if (!isValidEmail(email)) return jsonResponse(400, { error: "Bitte geben Sie eine gültige E-Mail-Adresse an." });
  if (!firstname || !lastname || !company) {
    return jsonResponse(400, { error: "Bitte geben Sie Vorname, Nachname und Firma an." });
  }
  if (body.consent !== true) {
    return jsonResponse(400, { error: "Bitte stimmen Sie der Newsletter-Anmeldung zu." });
  }

  try {
    if (await isOnCooldown(email)) return jsonResponse(200, { msg: OK_MESSAGE });

    const origin = new URL(request.url).origin;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const existingStatus = await getHubspotDoiStatus(email);

    // Bereits bestätigte Abonnenten bekommen nur einen neuen Download-Link; der Status bleibt unverändert.
    if (existingStatus === "confirmed") {
      const token = await createToken("download", email, DOWNLOAD_TOKEN_TTL_MS);
      const { error } = await resend.emails.send({
        from: FROM,
        to: [email],
        subject: "Ihr Whitepaper von Alpine Data",
        html: `<p>Hier ist Ihr Whitepaper:</p><p><a href="${origin}/.netlify/functions/whitepaper-download?token=${token}">Whitepaper herunterladen</a></p><p>Der Link ist 7 Tage gültig.</p>`,
      });
      if (error) throw new Error(`Resend: ${error.message}`);
      return jsonResponse(200, { msg: OK_MESSAGE });
    }

    const now = new Date().toISOString();
    await upsertHubspotContact(email, {
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
      company,
      whitepaper_name: WHITEPAPER_NAME,
      whitepaper_consent_at: now,
      doi_status: "pending",
    });

    const token = await createToken("doi", email, DOI_TOKEN_TTL_MS);
    const link = `${origin}/.netlify/functions/whitepaper-confirm?token=${token}`;
    const greeting = firstname ? `Hallo ${escapeHtml(firstname)},` : "Guten Tag,";
    const { error } = await resend.emails.send({
      from: FROM,
      to: [email],
      subject: "Bitte bestätigen Sie Ihre Anmeldung",
      html: `<p>${greeting}</p><p>Sie haben sich auf alpinedata.de für unseren Newsletter angemeldet und das Whitepaper angefordert. Bitte bestätigen Sie Ihre Anmeldung:</p><p><a href="${link}">Anmeldung bestätigen</a></p><p>Der Link ist 48 Stunden gültig. Wenn Sie sich nicht angemeldet haben, ignorieren Sie diese E-Mail einfach; es passiert nichts weiter.</p>`,
    });
    if (error) throw new Error(`Resend: ${error.message}`);

    return jsonResponse(200, { msg: OK_MESSAGE });
  } catch (err) {
    console.error("whitepaper-request failed", err);
    return jsonResponse(500, { error: "Die Anmeldung ist leider fehlgeschlagen. Bitte versuchen Sie es später erneut." });
  }
};
