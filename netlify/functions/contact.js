const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

exports.handler = async (event) => {
  // get data from body
  const { firstname, lastname, email, message, reason, website } = JSON.parse(event.body);

  // check Honeypot field
  // if (website !== "Deine Webseite")
  //  return {
  //    statusCode: 400,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ msg: "Ungültige Anfrage" }),
  // };


  // set API key
  sgMail.setApiKey(SENDGRID_API_KEY);

  // setup data for email
  // NOTE: THIS IS NOT SECURE. YOU NEED TO SANITIZE THE INPUTS
  const data = {
    to: "carsten_hof@web.de", // Change to your recipient (your email in this case)
    from: "info@alpinedata.de", // Change to your verified sender
    subject: `${reason} über ADV Webseite: Neue Nachricht von ${firstname} ${lastname}`,
    html: `${firstname} ${lastname} (${email}) schreibt: <br> <br> <p>${message}</p>`,
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
