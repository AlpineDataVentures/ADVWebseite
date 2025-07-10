import { Resend } from 'resend';

// API-Key aus Umgebungsvariablen laden
const resend = new Resend(process.env.RESEND_API_KEY);

// Async-Funktion zum Senden der E-Mail
async function sendTestEmail() {
  const { data, error } = await resend.emails.send({
    from: 'Alpine Data <info@alpinedata.de>', // Verifizierter Absender
    to: ['carsten.hof@alpinedata.de'],               // Empfänger
    subject: 'Testnachricht über Resend API',
    html: '<strong>Hallo Carsten!</strong> <br> Diese E-Mail wurde erfolgreich über Resend verschickt.<br> Viele Grüße Carsten',
  });

  if (error) {
    console.error('❌ Fehler beim Senden:', error);
  } else {
    console.log('✅ E-Mail erfolgreich gesendet:', data);
  }
}

// Funktion ausführen
sendTestEmail();
