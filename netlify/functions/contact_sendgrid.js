const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

exports.handler = async (event) => {
  // get data from body
  const { firstname, lastname, email, message, reason, website, phone } = JSON.parse(event.body);

  // check Honeypot field
  if (website !== "Deine Webseite") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Ungültige Anfrage.' }),
    };
  }

  // Validate that fields are not empty
  if (!firstname || !lastname || !email || !message || !reason) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Alle Felder außer Telefonnummer sind Pflichtfelder.' }),
    };
  }

  // set API key
  sgMail.setApiKey(SENDGRID_API_KEY);

  // setup data for email
  const data = {
    to: "info@alpinedata.de",
    from: "info@alpinedata.de",
    cc: "andreas.klostermann@alpinedata.de",
    subject: `${reason} über ADV Webseite: Neue Nachricht von ${firstname} ${lastname}`,
    html: `${firstname} ${lastname} (E-Mail: ${email} Telefon: ${phone}) schreibt: <br> <br> <p>${message}</p>`,
  };

  try {
    await sgMail.send(data);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: "Message sent successfully",
      }),
    };
  } catch (err) {
    return {
      statusCode: err.code,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
