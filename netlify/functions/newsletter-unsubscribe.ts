import {
  escapeHtml,
  findHubspotContactByUnsubscribeToken,
  htmlResponse,
  setHubspotNewsletterSubscription,
  upsertHubspotContact,
} from "./lib/whitepaper";

function isValidToken(token: string): boolean {
  return /^[A-Za-z0-9_-]{40,50}$/.test(token);
}

function confirmationForm(token: string) {
  return `<p>Möchten Sie sich wirklich vom Alpine-Data-Newsletter abmelden?</p><form method="post"><input type="hidden" name="token" value="${escapeHtml(token)}"><button type="submit" style="border:0;border-radius:4px;background:#00ce7e;padding:.75rem 1rem;font-weight:700;cursor:pointer">Jetzt abmelden</button></form>`;
}

export default async (request: Request) => {
  const url = new URL(request.url);
  let token = url.searchParams.get("token") ?? "";

  if (request.method === "POST") {
    try {
      const form = await request.formData();
      const submittedToken = form.get("token");
      token = typeof submittedToken === "string" ? submittedToken : "";
    } catch {
      return htmlResponse(400, "Ungültige Anfrage", "<p>Bitte öffnen Sie den Abmeldelink aus Ihrer E-Mail erneut.</p>");
    }
  } else if (request.method !== "GET") {
    return htmlResponse(405, "Methode nicht erlaubt", "<p>Bitte verwenden Sie den Link aus Ihrer E-Mail.</p>");
  }

  if (!isValidToken(token)) {
    return htmlResponse(400, "Link ungültig", "<p>Der Abmeldelink ist ungültig. Bitte kontaktieren Sie uns.</p>");
  }

  try {
    const contact = await findHubspotContactByUnsubscribeToken(token);
    if (!contact) {
      return htmlResponse(404, "Link nicht gefunden", "<p>Der Link ist nicht mehr gültig. Bitte kontaktieren Sie uns.</p>");
    }

    if (request.method === "GET") {
      if (contact.doiStatus === "unsubscribed") {
        return htmlResponse(200, "Bereits abgemeldet", "<p>Ihre E-Mail-Adresse ist bereits vom Newsletter abgemeldet.</p>");
      }
      if (contact.doiStatus !== "confirmed") {
        return htmlResponse(200, "Keine aktive Anmeldung", "<p>Für diese E-Mail-Adresse ist derzeit kein bestätigtes Newsletter-Abonnement aktiv.</p>");
      }
      return htmlResponse(200, "Newsletter-Abmeldung", confirmationForm(token));
    }

    if (contact.doiStatus === "unsubscribed") {
      return htmlResponse(200, "Bereits abgemeldet", "<p>Ihre E-Mail-Adresse ist bereits vom Newsletter abgemeldet.</p>");
    }
    if (contact.doiStatus !== "confirmed") {
      return htmlResponse(200, "Keine aktive Anmeldung", "<p>Für diese E-Mail-Adresse ist derzeit kein bestätigtes Newsletter-Abonnement aktiv.</p>");
    }

    await setHubspotNewsletterSubscription(contact.email, "UNSUBSCRIBED");
    await upsertHubspotContact(contact.email, {
      doi_status: "unsubscribed",
      newsletter_unsubscribed_at: String(Date.now()),
    });

    return htmlResponse(200, "Erfolgreich abgemeldet", "<p>Sie wurden vom Alpine-Data-Newsletter abgemeldet. Sie erhalten künftig keine Newsletter-E-Mails mehr.</p>");
  } catch (error) {
    console.error("newsletter-unsubscribe failed", error);
    return htmlResponse(500, "Abmeldung fehlgeschlagen", "<p>Die Abmeldung konnte gerade nicht verarbeitet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns.</p>");
  }
};
