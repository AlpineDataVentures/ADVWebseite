import { useId, useState } from "react";
import { REPORTING_CHECK_PRICE } from "./content";

const fmt = (n: number) => Math.round(n).toLocaleString("de-DE");
const fmtMonths = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmtPrice = (n: number) => `${n.toLocaleString("de-DE")} €`;

const inputClass =
  "w-full rounded border border-border bg-body px-3 py-2.5 font-secondary text-base text-text-dark tabular-nums focus:border-[#00CE7E] focus:ring-[#00CE7E] dark:border-darkmode-border dark:bg-darkmode-body dark:text-darkmode-text-dark";

export default function SavingsCalculator() {
  const id = useId();
  const [hoursPerMonth, setHoursPerMonth] = useState(40);
  const [ratePerHour, setRatePerHour] = useState(65);
  const [automatable, setAutomatable] = useState(60);

  const hoursSaved = hoursPerMonth * 12 * (automatable / 100);
  const results = [
    { label: "Eingesparte Zeit pro Jahr", value: `${fmt(hoursSaved)} Stunden` },
    { label: "Das entspricht", value: `${fmt(hoursSaved / 8)} eingesparten Arbeitstagen` },
    {
      label: "Kostenreduktion pro Jahr",
      value: `${fmt(hoursSaved * ratePerHour)} €`,
    },
  ];

  const yearlyValue = hoursSaved * ratePerHour;
  // Auf eine Nachkommastelle gerundet, kleinster angezeigter Wert: 0,1 Monate
  const months = Math.max(
    0.1,
    Math.round((REPORTING_CHECK_PRICE / (yearlyValue / 12)) * 10) / 10,
  );

  return (
    <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
      <div className="grid min-w-0 gap-6 font-secondary">
        <label
          htmlFor={`${id}-h`}
          className="grid gap-2 font-semibold text-text-dark dark:text-darkmode-text-dark"
        >
          Stunden pro Monat für manuelles Reporting
          <input
            id={`${id}-h`}
            type="number"
            min={0}
            value={hoursPerMonth}
            onChange={(e) => setHoursPerMonth(Number(e.target.value) || 0)}
            className={inputClass}
          />
        </label>
        <label
          htmlFor={`${id}-r`}
          className="grid gap-2 font-semibold text-text-dark dark:text-darkmode-text-dark"
        >
          Interne Kosten pro Stunde in €
          <input
            id={`${id}-r`}
            type="number"
            min={0}
            value={ratePerHour}
            onChange={(e) => setRatePerHour(Number(e.target.value) || 0)}
            className={inputClass}
          />
        </label>
        <label
          htmlFor={`${id}-a`}
          className="grid gap-2 font-semibold text-text-dark dark:text-darkmode-text-dark"
        >
          <span>
            Davon automatisierbar:{" "}
            <span className="tabular-nums text-[#008a55] dark:text-[#00CE7E]">
              {automatable} %
            </span>
          </span>
          <input
            id={`${id}-a`}
            type="range"
            min={10}
            max={90}
            step={5}
            value={automatable}
            onChange={(e) => setAutomatable(Number(e.target.value))}
            className="w-full accent-[#00CE7E]"
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="min-w-0 rounded-lg bg-[#1c1c1c] p-7 text-white md:p-8"
      >
        <dl className="grid gap-5">
          {results.map((r) => (
            <div key={r.label}>
              <dt className="font-secondary text-sm text-[#b4afb6]">
                {r.label}
              </dt>
              <dd className="font-primary text-3xl font-bold tabular-nums text-[#00CE7E]">
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 font-secondary text-sm text-[#b4afb6]">
          {yearlyValue > REPORTING_CHECK_PRICE ? (
            <>
              Der Reporting-Check für{" "}
              <b className="text-white">{fmtPrice(REPORTING_CHECK_PRICE)}</b>{" "}
              entspricht {fmtMonths(months)} Monaten dieses Aufwands.
            </>
          ) : (
            "Bei diesem Aufwand lohnt sich ein Gespräch, bevor Sie investieren."
          )}
        </p>
        <a
          href="#preise"
          className="mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-[#00CE7E] bg-[#00CE7E] px-6 py-3 font-secondary text-base font-bold text-black transition hover:opacity-90"
        >
          Preise ansehen →
        </a>
      </div>
    </div>
  );
}
