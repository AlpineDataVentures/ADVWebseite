import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import { currentStep } from "./StepProvider";
import React from "react";

const indicator = {
  active: {
    backgroundColor: "var(--nice-green)",
    color: "var(--marine-blue)",
  },
  inactive: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "rgba(255,255,255,1)",
  },
};

function StepIndicator() {
  const $currentStep = useStore(currentStep);

  return (
    <ul>
      <li className={`step-indicator`}>
        <motion.span
          animate={$currentStep <= 3 ? "active" : "inactive"}
          variants={indicator}
        >
          1
        </motion.span>
        <div>
          <p>Bereich</p>
          <h2>Grundlagen</h2>
        </div>
      </li>

      <li className={`step-indicator`}>
        <motion.span
          animate={$currentStep > 3 && $currentStep <= 6 ? "active" : "inactive"}
          variants={indicator}
        >
          2
        </motion.span>
        <div>
          <p>Bereich</p>
          <h2>Organisation</h2>
        </div>
      </li>
      <li className={`step-indicator`}>
        <motion.span
          animate={$currentStep > 6 && $currentStep <= 8 ? "active" : "inactive"}
          variants={indicator}
        >
          3
        </motion.span>
        <div>
          <p>Bereich</p>
          <h2>Governance</h2>
        </div>
      </li>
      <li className={`step-indicator`}>
        <motion.span
          animate={$currentStep > 8 && $currentStep <= 13 ? "active" : "inactive"}
          variants={indicator}
        >
          4
        </motion.span>
        <div>
          <p>Bereich</p>
          <h2>Daten-Kultur</h2>
        </div>
      </li>
      <li className={`step-indicator`}>
        <motion.span
          animate={$currentStep > 13 && $currentStep <= 15 ? "active" : "inactive"}
          variants={indicator}
        >
          5
        </motion.span>
        <div>
          <p>Bereich</p>
          <h2>Daten-Strategie</h2>
        </div>
      </li>
      <li className={`step-indicator`}>
        <motion.span
          animate={$currentStep > 15 ? "active" : "inactive"}
          variants={indicator}
        >
          6
        </motion.span>
        <div>
          <p>Bereich</p>
          <h2>Abschluss</h2>
        </div>
      </li>
    </ul>
  );
}

export default StepIndicator;
