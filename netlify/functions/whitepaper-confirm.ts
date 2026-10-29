import { Resend } from "resend";
import {
  DOWNLOAD_TOKEN_TTL_MS,
  EMAIL_FOOTER,
  createToken,
  createOpaqueToken,
  deleteToken,
  getHubspotContact,
  htmlResponse,
  readToken,
  setHubspotNewsletterSubscription,
  upsertHubspotContact,
} from "./lib/whitepaper";

// Schritt 2 des Double-Opt-in: Bestätigung in HubSpot speichern und Download-Link bereitstellen.
export default async (request: Request) => {
  const token = new URL(request.url).searchParams.get("token") ?? "";

  try {
    const record = await readToken(token, "doi");
    if (!record) {
      return htmlResponse(
        400,
        "Link ungültig oder abgelaufen",
        "<p>Bitte melden Sie sich auf der Seite erneut an.</p>",
      );
    }

    const contact = await getHubspotContact(record.email);

    // Mehrfaches Aufrufen des Links (Reload, Linkscanner, zweiter Klick): keine weitere Mail, kein neuer Status.
    if (contact?.doiStatus === "confirmed") {
      await deleteToken(token);
      return htmlResponse(
        200,
        "Anmeldung bereits bestätigt",
        "<p>Ihre Anmeldung wurde bereits bestätigt. Den Download-Link für das Whitepaper haben wir Ihnen per E-Mail geschickt. Bitte prüfen Sie auch Ihren Spam-Ordner.</p>",
      );
    }
    if (contact?.doiStatus === "unsubscribed") {
      await deleteToken(token);
      return htmlResponse(
        400,
        "Link ungültig",
        "<p>Dieser Link ist nicht mehr gültig. Bitte melden Sie sich auf der Seite erneut an.</p>",
      );
    }

    const unsubscribeToken = contact?.unsubscribeToken || createOpaqueToken();
    if (!contact?.unsubscribeToken) {
      await upsertHubspotContact(record.email, {
        newsletter_unsubscribe_token: unsubscribeToken,
      });
    }

    // Token zuerst entwerten, damit parallele oder wiederholte Aufrufe keine zweite Mail auslösen.
    await deleteToken(token);
    await setHubspotNewsletterSubscription(record.email, "SUBSCRIBED");
    await upsertHubspotContact(record.email, {
      doi_status: "confirmed",
      doi_confirmed_at: String(Date.now()),
    });

    const downloadToken = await createToken("download", record.email, DOWNLOAD_TOKEN_TTL_MS);
    const link = `${new URL(request.url).origin}/.netlify/functions/whitepaper-download?token=${downloadToken}`;
    const unsubscribeLink = `${new URL(request.url).origin}/.netlify/functions/newsletter-unsubscribe?token=${unsubscribeToken}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Alpine Data <info@alpinedata.de>",
      to: [record.email],
      subject: "Ihr Whitepaper von Alpine Data",
      html: `<p>Danke für die Bestätigung! Hier ist Ihr Whitepaper:</p><p><a href="${link}">Whitepaper herunterladen</a></p><p>Der Link ist 7 Tage gültig.</p><hr><p>Sie können sich jederzeit <a href="${unsubscribeLink}">vom Newsletter abmelden</a>.</p>${EMAIL_FOOTER}`,
    });
    if (error) console.error("whitepaper-confirm: Mailversand fehlgeschlagen", error);

    return htmlResponse(
      200,
      "Anmeldung bestätigt",
      `<p>Vielen Dank! Hier können Sie das Whitepaper direkt herunterladen:</p><p><a class="btn" href="${link}">Whitepaper herunterladen</a></p><p>Den Link haben wir Ihnen zusätzlich per E-Mail geschickt.</p>`,
    );
  } catch (err) {
    console.error("whitepaper-confirm failed", err);
    return htmlResponse(500, "Fehler", "<p>Die Bestätigung ist leider fehlgeschlagen. Bitte versuchen Sie es später erneut.</p>");
  }
};
