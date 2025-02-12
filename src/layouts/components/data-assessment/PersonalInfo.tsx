import { useStore } from "@nanostores/react";
import { user } from "./StepProvider";
import React from "react";

function PersonalInfo() {
  const $user = useStore(user);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    user.setKey(e.target.name, e.target.value);
  }

  return (

    <form id="assessment_contact" name="assessment_contact">
      <h1>Fast geschafft!</h1>
      <p className="description">
        Danke für die Beantwortung aller Fragen. Damit wir Ihnen die Auswertung zusenden können brauchen wir noch ein paar Daten von Ihnen:
      </p>
      <div>
        <label>
          Titel Vorname Name<span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={$user.name ?? ""}
          onChange={handleChange}
          placeholder="z.B. Dr. Michaela Schmidt"
          autoComplete="name"
          required
          className={$user.name === "" ? "error" : ""}
        />
      </div>

      <div>
        <label>
          E-Mail-Adresse<span className="text-red-500">*</span>
        </label>
        <input
          name="email"
          type="text"
          value={$user.email ?? ""}
          onChange={handleChange}
          placeholder="michaelaschmidt@digital.de"
          autoComplete="email"
          required
          className={$user.email === "" ? "error" : ""}
        />
      </div>

      <div>
        <label>
          Unternehmen
        </label>
        <input
          id="unternehmen"
          name="unternehmen"
          type="text"
          value={$user.unternehmen ?? ""}
          onChange={handleChange}
          placeholder="Michaela Schmidt Digital GmbH"
          autoComplete="organization"
          className={$user.unternehmen === "" ? "error" : ""}
        />
      </div>

      <div>
        <label>
          Telefonnummer<span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={$user.phone ?? ""}
          onChange={handleChange}
          placeholder="+1 234 567 890"
          required
          className={$user.phone === "" ? "error" : ""}
        />
      </div>
      <div className="hidden">
        <label>Website</label>
        <input
          type="text"
          id="website"
          name="website"
          onChange={handleChange}
          value={$user.webseite ?? ""}
          autoComplete="off"
        />
      </div>
    </form>
  );
}

export default PersonalInfo;
