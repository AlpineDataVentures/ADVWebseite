import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  firstname: z.string().nonempty({ message: "Vorname ist erforderlich" }),
  lastname: z.string().nonempty({ message: "Nachname ist erforderlich" }),
  email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
  message: z.string().nonempty({ message: "Nachricht ist erforderlich" }),
  reason: z.enum(["Kennenlerntermin", "Projektanfrage", "Bewerbung", "Kooperationsanfrage", "Sonstiges"]),
  website: z.string().optional(), // Honeypot-Feld
  consent: z.boolean().refine(val => val === true, { message: "Zustimmung erforderlich" })
});

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data, event) => {
    console.log("OnSubmit ContactForm.jsx called");

    // Prevent default form submission
    event.preventDefault();

    // Convert form data to URL encoded string
    const formData = new URLSearchParams(data).toString();

    // Use fetch API to send data to Netlify function
    try {
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData
      });

      if (response.ok) {
        console.log("Form successfully submitted");
        // Show success message to user
        document.getElementById("feedback").classList.remove("hidden");
      } else {
        console.error("Form submission error");
        // Show error message to user
      }
    } catch (error) {
      console.error("Form submission error", error);
      // Show error message to user
    }
  };

  return (
    <section className="section-sm">
      <div className="container">
        <div className="row">
          <div className="mx-auto md:col-10 lg:col-6">
            <form id="contact_new" name="contact_new" method="POST" onSubmit={handleSubmit(onSubmit)} data-netlify="true" netlify-honeypot="website">
              <input type="hidden" name="form-name" value="contact_new" />

              <div className="mb-6">
                <label htmlFor="firstname" className="form-label">Vorname <span className="text-red-500">*</span></label>
                <input id="firstname"
                  className="form-input"
                  placeholder="Erika"
                  type="text"
                  required
                  {...register("firstname")} />
                {errors.firstname && <p>{errors.firstname.message}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="lastname" className="form-label">Nachname <span className="text-red-500">*</span></label>
                <input id="lastname"
                  name="lastname"
                  className="form-input"
                  placeholder="Mustermann"
                  type="text"
                  required {...register("lastname")} />
                {errors.lastname && <p>{errors.lastname.message}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="reason" className="form-label">Ihr Anliegen <span className="text-red-500">*</span></label>
                <select id="reason" className="form-input" required {...register("reason")}>
                  <option value="" disabled>Bitte auswählen</option>
                  <option value="Kennenlerntermin">Kennenlerntermin</option>
                  <option value="Projektanfrage">Projektanfrage</option>
                  <option value="Bewerbung">Bewerbung</option>
                  <option value="Kooperationsanfrage">Kooperationsanfrage</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
                {errors.reason && <p>{errors.reason.message}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="form-label">E-Mail-Adresse <span className="text-red-500">*</span></label>
                <input id="email"
                  name="email"
                  className="form-input"
                  placeholder="erika.mustermann@email.com"
                  type="email"
                  required {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="form-label">Nachricht <span className="text-red-500">*</span></label>
                <textarea id="message"
                  name="message"
                  className="form-input"
                  placeholder="Ihre Nachricht..."
                  required
                  {...register("message")} rows="8"></textarea>
                {errors.message && <p>{errors.message.message}</p>}
              </div>
              <div style={{ display: 'none' }}>
                <label htmlFor="website">Website</label>
                <input id="website" {...register("website")} />
              </div>
              <div className="mb-6 flex items-start">
                <input id="consent"
                  name="consent"
                  className="form-checkbox mr-2"
                  required type="checkbox" {...register("consent")} />
                <label htmlFor="consent" className="form-label inline text-sm">Ich willige ein, dass meine Daten verarbeitet werden und einzig zur Kontaktaufnahme durch die ADV verwendet werden.</label>
                {errors.consent && <p>{errors.consent.message}</p>}
              </div>

              <button type="submit" className="btn btn-primary">Absenden</button>

            </form>
            <div id="feedback" className="hidden mt-4 text-green-500">
              Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
