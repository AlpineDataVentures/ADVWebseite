import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  // get data from body
  const { firstname, lastname, email, message, reason, website, phone } = JSON.parse(event.body);

  // Honeypot prüfen
  if (website !== "Deine Webseite") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Ungültige Anfrage.' }),
    };
  }

  // Pflichtfelder prüfen
  if (!firstname || !lastname || !email || !message || !reason) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Alle Felder außer Telefonnummer sind Pflichtfelder.' }),
    };
  }

  // Mail zusammenbauen
  try {
    const { error } = await resend.emails.send({
      from: 'Alpine Data <info@alpinedata.de>', // deine verifizierte Absenderadresse
      to: ['info@alpinedata.de'],
      cc: ['andreas.klostermann@alpinedata.de'],
      subject: `${reason} über ADV Webseite: Neue Nachricht von ${firstname} ${lastname}`,
      html: `
        <p><strong>Von:</strong> ${firstname} ${lastname}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Keine Angabe'}</p>
        <p><strong>Nachricht:</strong><br>${message}</p>
      `,
    });

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'E-Mail-Versand fehlgeschlagen.', details: error }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: "Nachricht erfolgreich versendet." }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unbekannter Fehler beim E-Mail-Versand.', details: err.message }),
    };
  }
};
