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

  function handleNext() {
    if ($currentStep <= maxSteps) currentStep.set(currentStep.get() + 1);
    if ($currentStep === maxSteps - 1) {
      // here we need to send the info to the netlify function!
      // TODO !!!
    }
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
