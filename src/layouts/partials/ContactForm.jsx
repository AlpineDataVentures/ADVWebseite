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

  const onSubmit = data => {
    // Submit your data to Netlify or another service
    console.log(data);
    var xhr = new XMLHttpRequest();
    // Set POST request method to our netlify function
    const res = xhr.open("POST", "/.netlify/functions/contact");

    // Set the request headers
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    // Send the data as JSON to our netlify function
    xhr.send(JSON.stringify(data));

    xhr.onload = function () {
      const response = JSON.parse(xhr.responseText);

      if (xhr.status === 200) {
        // The request was successful
        // show feedback message


      } else {
        // The request failed

      }
    };
  };

  return (

    <section class="section-sm">
      <div class="container">
        <div class="row">
          <div class="mx-auto md:col-10 lg:col-6">
            <form id="contact_new" name="contact_new" method="GET" onSubmit={handleSubmit(onSubmit)}>

              <div class="mb-6">
                <label htmlFor="firstname" class="form-label">Vorname <span class="text-red-500">*</span></label>
                <input id="firstname"
                  class="form-input"
                  placeholder="Erika"
                  type="text"
                  required
                  {...register("firstname")} />
                {errors.firstname && <p>{errors.firstname.message}</p>}
              </div>
              <div class="mb-6">
                <label htmlFor="lastname" class="form-label">Nachname <span class="text-red-500">*</span></label>
                <input id="lastname"
                  name="lastname"
                  class="form-input"
                  placeholder="Mustermann"
                  type="text"
                  required{...register("lastname")} />
                {errors.lastname && <p>{errors.lastname.message}</p>}
              </div>
              <div class="mb-6">
                <label htmlFor="reason" class="form-label" >Ihr Anliegen <span class="text-red-500">*</span></label>
                <select id="reason" class="form-input" required {...register("reason")}>
                  <option value="" disabled>Bitte auswählen</option>
                  <option value="Kennenlerntermin">Kennenlerntermin</option>
                  <option value="Projektanfrage">Projektanfrage</option>
                  <option value="Bewerbung">Bewerbung</option>
                  <option value="Kooperationsanfrage">Kooperationsanfrage</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
                {errors.reason && <p>{errors.reason.message}</p>}
              </div>
              <div class="mb-6">
                <label htmlFor="email" class="form-label">E-Mail-Adresse <span class="text-red-500">*</span></label>
                <input id="email"
                  name="email"
                  class="form-input"
                  placeholder="erika.mustermann@email.com"
                  type="email"
                  required {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div class="mb-6">
                <label htmlFor="message" class="form-label">Nachricht <span class="text-red-500">*</span></label>
                <textarea id="message"
                  name="message"
                  class="form-input"
                  placeholder="Ihre Nachricht..."
                  required
                  {...register("message")} rows="8"></textarea>
                {errors.message && <p>{errors.message.message}</p>}
              </div>
              <div style={{ display: 'none' }}>
                <label htmlFor="website">Website</label>
                <input id="website" {...register("website")} />
              </div>
              <div class="mb-6 flex items-start">
                <input id="consent"
                  name="consent"
                  class="form-checkbox mr-2"
                  required type="checkbox" {...register("consent")} />
                <label htmlFor="consent" class="form-label inline text-sm">Ich willige ein, dass meine Daten verarbeitet werden und einzig zur Kontaktaufnahme durch die ADV verwendet werden.</label>
                {errors.consent && <p>{errors.consent.message}</p>}
              </div>

              <button type="submit" class="btn btn-primary">Absenden</button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
