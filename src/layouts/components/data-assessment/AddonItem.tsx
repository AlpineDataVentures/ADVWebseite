import { useStore } from "@nanostores/react";
import type { AddonType } from "./StepProvider";
import { addons, isSubscriptionTimeMonthly } from "./StepProvider";
import React from "react";

type Props = {
  addon: AddonType;
};

function AddonItem({ addon }: Props) {
  const $isSubscriptionTimeMonthly = useStore(isSubscriptionTimeMonthly);
  const $addons = useStore(addons);

  const itemCost = $isSubscriptionTimeMonthly
    ? addon.dollarPerMonth
    : addon.dollarPerMonth * 10;

  const lowerCaseTitle = addon.title.toLowerCase();

  function handleAddonChange(e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.checked === true) {
      addons.set([...addons.get(), addon]);
    } else {
      addons.set($addons.filter((a) => a.title !== addon.title));
    }
  }

  return (
    <>
      <input
        id={`addon-${lowerCaseTitle.replace(" ", "-")}`}
        type="checkbox"
        name="addon"
        checked={$addons.find((a) => a.title === addon.title) !== undefined}
        value={addon.title}
        onChange={handleAddonChange}
      />
      <label htmlFor={`addon-${lowerCaseTitle.replace(" ", "-")}`}>
        <span className="checkmark"></span>
        <div className="input-info">
          <h3>{addon.title}</h3>
          <p>{addon.description}</p>
        </div>
        <p className="extra-price">
          +${itemCost}/{$isSubscriptionTimeMonthly ? "mo" : "yr"}
        </p>
      </label>
    </>
  );
}

export default AddonItem;
