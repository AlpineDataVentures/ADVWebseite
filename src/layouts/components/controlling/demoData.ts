// Beispieldaten (T€) für die Power-BI-Demo

export const months = ["Apr", "Mai", "Jun", "Jul", "Aug", "Sep"];
export const revenueActual = [4310, 4520, 4690, 4380, 4610, 4820];
export const revenuePlan = [4400, 4450, 4550, 4500, 4550, 4600];

export type BridgeStep = {
  label: string;
  from: number;
  to: number;
  isDelta: boolean;
};

export const ebitBridge: BridgeStep[] = [
  { label: "Plan-EBIT", from: 0, to: 600, isDelta: false },
  { label: "Umsatz", from: 600, to: 820, isDelta: true },
  { label: "Material", from: 820, to: 760, isDelta: true },
  { label: "Personal", from: 760, to: 730, isDelta: true },
  { label: "Sonstige Kosten", from: 730, to: 750, isDelta: true },
  { label: "Ist-EBIT", from: 0, to: 750, isDelta: false },
];

export type CostAccount = { name: string; actual: number; plan: number };
export type CostCenter = CostAccount & { accounts: CostAccount[] };

export const costCenters: CostCenter[] = [
  {
    name: "Produktion",
    actual: 1820,
    plan: 1760,
    accounts: [
      { name: "Fertigungslöhne", actual: 980, plan: 950 },
      { name: "Energie", actual: 410, plan: 380 },
      { name: "Instandhaltung", actual: 430, plan: 430 },
    ],
  },
  {
    name: "Vertrieb",
    actual: 640,
    plan: 660,
    accounts: [
      { name: "Provisionen", actual: 290, plan: 300 },
      { name: "Reisekosten", actual: 120, plan: 140 },
      { name: "Marketing", actual: 230, plan: 220 },
    ],
  },
  {
    name: "Verwaltung",
    actual: 520,
    plan: 540,
    accounts: [
      { name: "Personal", actual: 340, plan: 350 },
      { name: "IT-Lizenzen", actual: 110, plan: 120 },
      { name: "Beratung", actual: 70, plan: 70 },
    ],
  },
  {
    name: "Logistik",
    actual: 380,
    plan: 350,
    accounts: [
      { name: "Fracht", actual: 250, plan: 220 },
      { name: "Lager", actual: 130, plan: 130 },
    ],
  },
];
