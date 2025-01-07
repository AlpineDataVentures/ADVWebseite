import { atom, map, type MapStore } from "nanostores";

export const currentStep = atom(1);

export const isSubscriptionTimeMonthly = atom(true);

export type AddonType = {
  title: string;
  description: string;
  dollarPerMonth: number;
};

export const assessItems: AssessItemType[] = [
  {
    question: "Wie werden Daten in Ihrem Unternehmen aktuell erfasst?",
    answers: ["Wir erfassen Daten überwiegend manuell, z.B. händisch in Tabellen oder auf Papier",
      "Einige Daten werden automatisch erfasst, aber ohne feste oder standardisierte Abläufe",
      "Die meisten Daten werden automatisiert und nach klar definierten, standardisierten Prozessen erfasst"],
  },
  {
    question: "Wie wird die Datenqualität in Ihrem Unternehmen sichergestellt?",
    answers: ["Wir kontrollieren unsere Daten kaum oder gar nicht", "Wir prüfen unsere Daten manchmal, aber nicht regelmäßig",
      "Wir haben klare und regelmäßige Prozesse, um sicherzustellen, dass unsere Daten korrekt und vollständig sind"]
  }
];

export const addonData: AddonType[] = [
  {
    title: "Online service",
    description: "Access to multiplayer games",
    dollarPerMonth: 1,
  },

  {
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    dollarPerMonth: 2,
  },
  {
    title: "Customizable profile",
    description: "Custom theme on your profile",
    dollarPerMonth: 2,
  },
];

export type AssessItemType = {
  question: string;
  answers: string[];
};

export type PlanType = {
  title: string;
  dollarPerMonth: number;
};

export const planData: PlanType[] = [
  {
    title: "Arcade",
    dollarPerMonth: 9,
  },
  {
    title: "Advanced",
    dollarPerMonth: 12,
  },
  {
    title: "Pro",
    dollarPerMonth: 15,
  },
];



export const subscriptionPlan = atom<PlanType>(planData[0]);

export const addons = atom<AddonType[]>([]);

export const user = map<Record<string, string | null>>({
  name: null,
  email: null,
  phone: null,
});

type AnswersStore = {
  [questionId: number]: string; // Frage-ID als Key, Antwort als String
};

export const answersStore: MapStore<AnswersStore> = map<AnswersStore>({});
