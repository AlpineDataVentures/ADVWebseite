import { useStore } from "@nanostores/react";
import {
  currentStep,
  isSubscriptionTimeMonthly,
  subscriptionPlan,
  addons,
  answersStore,
} from "./StepProvider";
import React from "react";

//
// CheckoutList holt die Zustände aus dem Store und stellt diese in einer Übersicht dar
//

function CheckoutList() {
  const $isSubscriptionTimeMonthly = useStore(isSubscriptionTimeMonthly);
  const $subscriptionPlan = useStore(subscriptionPlan);
  const $addons = useStore(addons);
  const $answers = useStore(answersStore);

  const totalCost = $addons.reduce(
    (total, addon) => total + addon.dollarPerMonth,
    $subscriptionPlan.dollarPerMonth
  );

  const totalCostText = `+$${$isSubscriptionTimeMonthly ? totalCost : totalCost * 10
    }/${$isSubscriptionTimeMonthly ? "mo" : "yr"}`;

  return (
    <ul className="finishing-up">
      <li>
        <div className="base-cost">
          <strong>
            Arcade ({$isSubscriptionTimeMonthly ? "Monthly" : "Yearly"})
          </strong>
          <button onClick={() => currentStep.set(2)}>Change</button>
        </div>
        <strong>
          $
          {$isSubscriptionTimeMonthly
            ? $subscriptionPlan.dollarPerMonth
            : $subscriptionPlan.dollarPerMonth * 10}
          /{$isSubscriptionTimeMonthly ? "mo" : "yr"}
        </strong>
      </li>
      <hr />
      {$addons.map((addon) => {
        const addonCost = $isSubscriptionTimeMonthly
          ? addon.dollarPerMonth
          : addon.dollarPerMonth * 10;
        return (
          <li key={addon.title}>
            <p>{addon.title}</p>
            <span>
              +${addonCost}/{$isSubscriptionTimeMonthly ? "mo" : "yr"}
            </span>
          </li>
        );
      })}
      <li className="total-cost">
        <p>Total (per {$isSubscriptionTimeMonthly ? "month" : "year"})</p>
        <strong>{totalCostText}</strong>
      </li>
      {Object.entries($answers).map(([questionId, answer]) => (
        <li key={questionId}>
          <strong>Frage {questionId}:</strong> {answer}
        </li>
      ))}
    </ul>
  );
}

export default CheckoutList;
