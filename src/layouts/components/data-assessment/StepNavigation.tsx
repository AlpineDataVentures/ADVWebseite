import type { CSSProperties } from "react";
import { useStore } from "@nanostores/react";
import { assessItems, currentStep, user } from "./StepProvider";
import React from "react";

const maxSteps = assessItems.length + 3;

function StepNavigation() {
  const $currentStep = useStore(currentStep);
  const $user = useStore(user);

  function handleBack() {
    if ($currentStep > 1) currentStep.set(currentStep.get() - 1);
  }

  function handleNext() {
    if ($currentStep <= maxSteps) currentStep.set(currentStep.get() + 1);
    if ($currentStep === maxSteps - 1) {
      // here we need to send the info to the netlify function!
      // TODO !!!
    }
  }

  const isNextButtonDisabled = Object.values($user).some(
    (x) => x === "" || x === null
  );

  const backStyle: CSSProperties =
    $currentStep === 1 || $currentStep === maxSteps
      ? { visibility: "hidden" }
      : {};
  const nextStyle: CSSProperties =
    $currentStep === maxSteps ? { visibility: "hidden" } : {};

  return (
    <div className="navigation-buttons">
      <button className="back" style={backStyle} onClick={handleBack}>
        Zurück
      </button>
      <button
        className={`next${$currentStep === maxSteps - 1 ? " final" : ""}`}
        style={nextStyle}
        onClick={handleNext}
        disabled={false} //{isNextButtonDisabled}
      >
        {$currentStep === maxSteps - 1 ? "Abschicken" : "Weiter"}
      </button>
    </div>
  );
}

export default StepNavigation;
