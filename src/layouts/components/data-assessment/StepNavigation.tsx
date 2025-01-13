import type { CSSProperties } from "react";
import { useStore } from "@nanostores/react";
import { answersStore, assessItems, currentStep, user } from "./StepProvider";
import React from "react";

const maxSteps = assessItems.length + 3;


function StepNavigation() {
  const $currentStep = useStore(currentStep);
  const $user = useStore(user);
  const $answers = useStore(answersStore);

  function handleBack() {
    if ($currentStep > 1) currentStep.set(currentStep.get() - 1);
  }

  async function handleNext() {
    // we do have all information: let's send it to netlify function!
    if ($currentStep === maxSteps - 1) {
      // Daten sammeln
      const payload = {
        firstname: $user.name,
        lastname: "Test",
        email: $user.email,
        message: Object.entries($answers)
          .map(([questionId, answer]) => `${questionId}: ${answer} <br/>`)
          .join(''),
        reason: "Data Assessment",
        website: "Deine Webseite",
        phone: $user.phone,
      };

      try {
        // POST-Request an die Netlify Function
        const response = await fetch('/.netlify/functions/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error('Fehler beim Senden der Daten:', response.statusText);
          alert('Beim Senden der Daten ist ein Fehler aufgetreten.');
          return;
        }

        console.log('Daten erfolgreich gesendet');
        alert('Vielen Dank! Ihre Daten wurden erfolgreich übermittelt.');
        // Zum nächsten Schritt weitergehen
      } catch (error) {
        console.error('Netzwerkfehler:', error);
        alert('Ein Netzwerkfehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      }
    }
    if ($currentStep <= maxSteps) currentStep.set(currentStep.get() + 1);
    console.log("New Step :" + currentStep.get());
  }

  const backStyle: CSSProperties =
    $currentStep === 1 || $currentStep === maxSteps
      ? { visibility: "hidden" }
      : {};

  const nextStyle: CSSProperties =
    $currentStep <= maxSteps - 3
      ? $answers[$currentStep] === null || $answers[$currentStep] === ""
        ? { visibility: "hidden" }
        : {}
      : $currentStep === maxSteps - 2
        ? $user === null || $user.name === "" || $user.email === ""
          ? { visibility: "hidden" }
          : {}
        : $currentStep === maxSteps - 1
          ? {}
          : { visibility: "hidden" };

  return (
    <div className="navigation-buttons">
      <button className="back" style={backStyle} onClick={handleBack}>
        Zurück
      </button>
      <button
        className={`next${$currentStep === maxSteps - 1 ? " final" : ""}`}
        style={nextStyle}
        onClick={handleNext}
        disabled={false}
      >
        {$currentStep === maxSteps - 1 ? "Abschicken" : "Weiter"}
      </button>
    </div>
  );
}

export default StepNavigation;
