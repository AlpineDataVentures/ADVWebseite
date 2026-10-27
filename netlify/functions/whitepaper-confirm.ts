import { Resend } from "resend";
import {
  DOWNLOAD_TOKEN_TTL_MS,
  createToken,
  htmlResponse,
  readToken,
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

    await upsertHubspotContact(record.email, {
      doi_status: "confirmed",
      doi_confirmed_at: new Date().toISOString(),
    });

    const downloadToken = await createToken("download", record.email, DOWNLOAD_TOKEN_TTL_MS);
    const link = `${new URL(request.url).origin}/.netlify/functions/whitepaper-download?token=${downloadToken}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Alpine Data <info@alpinedata.de>",
      to: [record.email],
      subject: "Ihr Whitepaper von Alpine Data",
      html: `<p>Danke für die Bestätigung! Hier ist Ihr Whitepaper:</p><p><a href="${link}">Whitepaper herunterladen</a></p><p>Der Link ist 7 Tage gültig.</p>`,
    });
    if (error) console.error("whitepaper-confirm: Mailversand fehlgeschlagen", error);

    return htmlResponse(
      200,
      "Anmeldung bestätigt",
      `<p>Vielen Dank! Hier können Sie das Whitepaper direkt herunterladen:</p><p><a href="${link}">Whitepaper herunterladen</a></p><p>Den Link haben wir Ihnen zusätzlich per E-Mail geschickt.</p>`,
    );
  } catch (err) {
    console.error("whitepaper-confirm failed", err);
    return htmlResponse(500, "Fehler", "<p>Die Bestätigung ist leider fehlgeschlagen. Bitte versuchen Sie es später erneut.</p>");
  }
};
