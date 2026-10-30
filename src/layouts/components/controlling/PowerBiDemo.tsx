import { Fragment, useState } from "react";
import {
  costCenters,
  ebitBridge,
  months,
  revenueActual,
  revenuePlan,
} from "./demoData";

const fmt = (n: number) => Math.round(n).toLocaleString("de-DE");

// Kosten: positive Abweichung ist schlecht, bei Erlösen/EBIT umgekehrt
function Delta({ value, isCost = false }: { value: number; isCost?: boolean }) {
  const bad = isCost ? value > 0 : value < 0;
  const color =
    value === 0 ? "" : bad ? "text-[#ff8a7a]" : "text-[#00CE7E]";
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return (
    <span className={color}>
      {sign}
      {fmt(Math.abs(value))}
    </span>
  );
}

function CostCenterTable() {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (name: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(name)) next.add(name);
      return next;
    });

  return (
    <>
      <div>
        <table className="w-full table-fixed border-collapse text-xs sm:text-[0.94rem]">
          <thead>
            <tr className="text-[#b4afb6]">
              <th className="w-[40%] border-b border-[#3a3a3a] p-1 text-left font-medium sm:p-2">
                Kostenstelle
              </th>
              {["Ist", "Plan", "Abw."].map((h) => (
                <th
                  key={h}
                  className="w-[20%] border-b border-[#3a3a3a] p-1 text-right font-medium sm:p-2"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {costCenters.map((cc) => {
              const isOpen = open.has(cc.name);
              return (
                <Fragment key={cc.name}>
                  <tr
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onClick={() => toggle(cc.name)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(cc.name);
                      }
                    }}
                    className="cursor-pointer font-semibold hover:bg-[#262626]"
                  >
                    <td className="wrap-break-word border-b border-[#3a3a3a] p-1 text-left sm:p-2.5">
                      <span
                        className="inline-block w-3 text-[#00CE7E] sm:w-4.5"
                        aria-hidden="true"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                      <span className="wrap-break-word">{cc.name}</span>
                    </td>
                    <td className="border-b border-[#3a3a3a] p-1 text-right sm:p-2.5">
                      {fmt(cc.actual)}
                    </td>
                    <td className="border-b border-[#3a3a3a] p-1 text-right sm:p-2.5">
                      {fmt(cc.plan)}
                    </td>
                    <td className="border-b border-[#3a3a3a] p-1 text-right sm:p-2.5">
                      <Delta value={cc.actual - cc.plan} isCost />
                    </td>
                  </tr>
                  {isOpen &&
                    cc.accounts.map((acc) => (
                      <tr
                        key={acc.name}
                        className="text-xs text-[#b4afb6] sm:text-sm"
                      >
                        <td className="wrap-break-word border-b border-[#3a3a3a] p-1 pl-4 text-left sm:p-2 sm:pl-7">
                          {acc.name}
                        </td>
                        <td className="border-b border-[#3a3a3a] p-1 text-right sm:p-2">
                          {fmt(acc.actual)}
                        </td>
                        <td className="border-b border-[#3a3a3a] p-1 text-right sm:p-2">
                          {fmt(acc.plan)}
                        </td>
                        <td className="border-b border-[#3a3a3a] p-1 text-right sm:p-2">
                          <Delta value={acc.actual - acc.plan} isCost />
                        </td>
                      </tr>
                    ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-[#b4afb6]">
        Klicken Sie auf eine Kostenstelle, um die Konten aufzuklappen.
      </p>
    </>
  );
}

const BAR_SCALE_MAX = 5000;
const BAR_LABEL_SPACE = "50px";

function RevenueChart() {
  const pct = (v: number) => `calc((100% - ${BAR_LABEL_SPACE}) * ${v / BAR_SCALE_MAX})`;
  return (
    <>
      <div className="flex h-62.5 gap-3.5">
        {months.map((m, i) => (
          <div key={m} className="relative min-w-0 flex-1">
            <i
              className="absolute left-[20%] right-[20%] rounded-t-xs bg-[#00CE7E]"
              style={{ bottom: "26px", height: pct(revenueActual[i]) }}
            />
            <u
              className="absolute left-[8%] right-[8%] h-0.75 bg-white no-underline"
              style={{ bottom: `calc(26px + ${pct(revenuePlan[i])})` }}
            />
            <em
              className="absolute left-0 right-0 text-center text-xs not-italic tabular-nums"
              style={{
                bottom: `calc(32px + ${pct(
                  Math.max(revenueActual[i], revenuePlan[i]),
                )})`,
              }}
            >
              {fmt(revenueActual[i])}
            </em>
            <span className="absolute bottom-0 left-0 right-0 text-center text-sm text-[#b4afb6]">
              {m}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-[#b4afb6]">
        Balken: Ist. Weiße Linie: Plan. Skala ab null.
      </p>
    </>
  );
}

const BRIDGE_SCALE_MAX = 900;

function EbitBridge() {
  return (
    <>
      <div className="grid gap-2.5">
        {ebitBridge.map((step) => {
          const delta = step.to - step.from;
          const left = (Math.min(step.from, step.to) / BRIDGE_SCALE_MAX) * 100;
          const width = (Math.abs(delta) / BRIDGE_SCALE_MAX) * 100;
          const color = !step.isDelta
            ? "bg-[#b4afb6]"
            : delta < 0
              ? "bg-[#ff8a7a]"
              : "bg-[#00CE7E]";
          return (
            <div
              key={step.label}
              className="grid grid-cols-[92px_1fr_52px] items-center gap-3 text-[0.94rem] sm:grid-cols-[130px_1fr_64px]"
            >
              <span>{step.label}</span>
              <span className="relative h-5.5 border-l border-[#3a3a3a]">
                <b
                  className={`absolute bottom-0 top-0 rounded-xs ${color}`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                />
              </span>
              <span className="text-right tabular-nums">
                {step.isDelta ? <Delta value={delta} /> : fmt(step.to)}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-[#b4afb6]">
        Von Plan-EBIT 600 zu Ist-EBIT 750: welche Position wie viel beiträgt.
      </p>
    </>
  );
}

const views = [
  { name: "Kostenstellen", Component: CostCenterTable },
  { name: "Umsatz", Component: RevenueChart },
  { name: "EBIT-Brücke", Component: EbitBridge },
];

export default function PowerBiDemo() {
  const [active, setActive] = useState(views[0].name);
  const ActiveView = views.find((v) => v.name === active)!.Component;

  return (
    <div className="overflow-hidden rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] font-secondary text-white">
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 bg-[#121212] px-5 py-3 text-sm text-[#b4afb6]">
        <span>Power-BI-Demo, Beispieldaten in T€</span>
        <div role="tablist" aria-label="Berichtsseiten" className="flex flex-wrap gap-1.5">
          {views.map((v) => (
            <button
              key={v.name}
              type="button"
              role="tab"
              aria-selected={v.name === active}
              onClick={() => setActive(v.name)}
              className={`rounded border px-3.5 py-1.5 text-sm transition ${v.name === active
                  ? "border-[#00CE7E] bg-[#00CE7E] font-semibold text-black"
                  : "border-[#3a3a3a] text-[#b4afb6] hover:text-white"
                }`}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-75 px-5 py-7 md:px-6">
        <ActiveView />
      </div>
    </div>
  );
}
