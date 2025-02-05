import type { CSSProperties } from "react";
import { useStore } from "@nanostores/react";
import { answersStore, assessItems, currentStep, user } from "./StepProvider";
import React from "react";

const maxSteps = assessItems.length + 2;


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
      // Daten sammeln, misusing lastname for handover of company
      const payload = {
        firstname: $user.name,
        lastname: $user.unternehmen,
        email: $user.email,
        // message: Object.entries($answers)
        //   .map(([questionId, answer]) => `${questionId}: ${assessItems[Number(questionId) - 1].question}<br/>   ${answer} <br/>`)
        //   .join('')
        message: Object.entries($answers)
          .map(([questionId, answer]) => {
            const numericQuestionId = Number(questionId) - 1; // Offset: 1-basiert zu 0-basiert
            const assessItem = assessItems[numericQuestionId]; // Passendes assessItem holen

            // Finde die Position der Antwort in der answers-Liste
            const answerIndex = assessItem.answers.findIndex(a => a === answer);

            // Formatierte Antwort mit Position (1-basiert)
            const formattedAnswer = answerIndex >= 0
              ? `   Antwort ${answerIndex + 1}. ${answer}`
              : answer; // Fallback: Wenn Antwort nicht gefunden wird

            return `${numericQuestionId + 1}: ${assessItem?.question || 'Frage nicht gefunden'}<br/> ${formattedAnswer} <br/>`;
          })
          .join(''),
        reason: "Data Assessment",
        website: $user.webseite,
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
          alert('Beim Senden der Daten ist ein Fehler aufgetreten. ' + response.statusText);
          return;
        }
      } catch (error) {
        console.error('Netzwerkfehler:', error);
        alert('Ein Netzwerkfehler ist aufgetreten. Bitte versuchen Sie es später erneut. ' + error);
      }
    }
    if ($currentStep <= maxSteps) currentStep.set(currentStep.get() + 1);
  }

  const backStyle: CSSProperties =
    $currentStep === 1 || $currentStep === maxSteps
      ? { visibility: "hidden" }
      : {};

  const nextStyle: CSSProperties =
    $currentStep <= maxSteps - 2
      ? $answers[$currentStep] === null || $answers[$currentStep] === ""
        ? { visibility: "hidden" }
        : {}
      : $currentStep === maxSteps - 1
        ? $user === null || $user.name === null || $user.name === "" || $user.phone === null
          || $user.phone === "" || $user.email === null || $user.email === ""
          ? { visibility: "hidden" }
          : {}
        : $currentStep === maxSteps
          ? { visibility: "hidden" }
          : {};

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
