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
    area: "Grundlagen",
    question: "Wie werden Daten in Ihrem Unternehmen aktuell erfasst?",
    answers: [
      "Wir erfassen Daten überwiegend manuell, z.B. händisch in Tabellen oder auf Papier",
      "Einige Daten werden automatisch erfasst, aber ohne feste oder standardisierte Abläufe",
      "Die meisten Daten werden automatisiert und nach klar definierten, standardisierten Prozessen erfasst"
    ]
  },
  {
    area: "Grundlagen",
    question: "Wie wird die Datenqualität in Ihrem Unternehmen sichergestellt?",
    answers: [
      "Wir kontrollieren unsere Daten kaum oder gar nicht",
      "Wir prüfen unsere Daten manchmal, aber nicht regelmäßig",
      "Wir haben klare und regelmäßige Prozesse, um sicherzustellen, dass unsere Daten korrekt und vollständig sind"
    ]
  },
  {
    area: "Grundlagen",
    question: "Wie sind Ihre Daten organisiert und zugänglich?",
    answers: [
      "Unsere Daten sind über verschiedene Systeme verstreut und schwer zu finden",
      "Einige unserer Daten sind an einem Ort gespeichert, aber es ist nicht immer einfach, darauf zuzugreifen",
      "Unsere Daten sind zentral gespeichert, und es ist einfach, sie zu finden und zu nutzen"
    ]
  },
  {
    area: "Organisation",
    question: "Wie geht Ihr Unternehmen mit der Speicherung und Archivierung von Daten um?",
    answers: [
      "Wir speichern Daten nur bei Bedarf, ohne feste Pläne oder Strukturen",
      "Wir haben einige Vorgaben zur Speicherung, aber nicht alles ist zentral geregelt",
      "Wir speichern und archivieren unsere Daten systematisch und nach festen Regeln"
    ]
  },
  {
    area: "Organisation",
    question: "In welchem Ausmaß wird der Datenschutz in Ihrem Unternehmen berücksichtigt?",
    answers: [
      "Datenschutz ist selten ein Thema und wird nur im Notfall behandelt",
      "Es gibt einige Datenschutzmaßnahmen, aber sie werden nicht durchgängig angewendet",
      "Datenschutz ist ein zentraler Bestandteil unserer Datenstrategien und es gibt klare Regelungen"
    ]
  },
  {
    area: "Organisation",
    question: "Welche Maßnahmen hat Ihr Unternehmen zur Datensicherheitsprüfung und -überwachung?",
    answers: [
      "Datensicherheit wird kaum überwacht, es gibt nur minimale Kontrollen",
      "Es gibt einige Sicherheitsmaßnahmen, aber sie werden nicht regelmäßig geprüft",
      "Wir haben ein systematisches Sicherheitskonzept und führen regelmäßige Überprüfungen durch"
    ]
  },
  {
    area: "Governance",
    question: "Verfügt Ihr Unternehmen über Data Governance-Richtlinien?",
    answers: [
      "Wir haben keine festen Regeln, wie mit Daten umgegangen werden soll",
      "Wir haben einige Regeln, aber sie werden nicht immer befolgt oder sind nicht sehr umfangreich",
      "Wir haben klare, festgelegte Regeln, wie wir mit Daten umgehen, und halten uns daran"
    ]
  },
  {
    area: "Governance",
    question: "Verfügt Ihr Unternehmen über eine klare Rollenverteilung und Verantwortlichkeiten im Umgang mit Daten?",
    answers: [
      "Es gibt keine festgelegten Rollen für den Umgang mit Daten",
      "Einige Verantwortlichkeiten sind definiert, aber es herrscht Unklarheit, wer für welche Daten zuständig ist",
      "Es gibt klar definierte Rollen und Verantwortlichkeiten, und jeder weiß, wie er mit den jeweiligen Daten umgehen muss"
    ]
  },
  {
    area: "Daten-Kultur",
    question: "Verfügt Ihr Unternehmen über spezifische Tools für Datenanalyse?",
    answers: [
      "Wir nutzen keine speziellen Werkzeuge; die Analysen werden manuell gemacht",
      "Wir haben einige Werkzeuge, aber wir nutzen sie nur selten",
      "Wir haben fortschrittliche Werkzeuge, die regelmäßig für unsere Analysen genutzt werden"
    ]
  },
  {
    area: "Daten-Kultur",
    question: "Wie häufig nutzt Ihr Unternehmen innovative Technologien wie künstliche Intelligenz und Machine Learning zur Datenanalyse?",
    answers: [
      "Wir nutzen kaum oder keine innovativen Technologien zur Datenanalyse",
      "Wir experimentieren gelegentlich mit neuen Technologien, aber ohne festgelegte Prozesse",
      "Innovative Technologien sind ein fester Bestandteil unserer Datenanalysen und werden regelmäßig eingesetzt"
    ]
  },
  {
    area: "Daten-Kultur",
    question: "Werden Entscheidungen in Ihrem Unternehmen datenbasiert getroffen?",
    answers: [
      "Wir nutzen Daten selten oder gar nicht für Entscheidungen",
      "Manchmal basieren Entscheidungen auf Daten, aber oft verlassen wir uns auf unser Bauchgefühl",
      "Wir treffen regelmäßig Entscheidungen, die stark auf Datenanalysen beruhen"
    ]
  },
  {
    area: "Daten-Kultur",
    question: "Wie sieht die Zusammenarbeit zwischen den verschiedenen Abteilungen in Bezug auf Daten aus?",
    answers: [
      "Es gibt kaum oder keinen Austausch von Daten zwischen den Abteilungen",
      "Ab und zu werden Daten geteilt, aber ohne klare Vorgehensweise",
      "Unsere Abteilungen tauschen regelmäßig Daten aus und haben dafür klare Prozesse"
    ]
  },
  {
    area: "Daten-Kultur",
    question: "Wie wird die Nutzung von Daten in Ihrer Unternehmenskultur verankert?",
    answers: [
      "Daten spielen in unserer Unternehmenskultur kaum eine Rolle",
      "Einige Mitarbeiter nutzen Daten, aber es gibt keine unternehmensweite Nutzung",
      "Daten sind ein wichtiger Teil unserer Unternehmenskultur, und wir fördern ihre Nutzung aktiv"
    ]
  },
  {
    area: "Daten-Strategie",
    question: "Verfügt Ihr Unternehmen über eine klar definierte Datenstrategie?",
    answers: [
      "Es gibt keine festgelegte Datenstrategie",
      "Es gibt Ansätze für eine Datenstrategie, aber sie sind nicht vollständig definiert oder umgesetzt",
      "Wir haben eine umfassende, klar formulierte Datenstrategie, die regelmäßig überprüft und an die Unternehmensziele angepasst wird"
    ]
  },
  {
    area: "Daten-Strategie",
    question: "Wie integriert ist die Datenstrategie in die Gesamtstrategie Ihres Unternehmens?",
    answers: [
      "Unsere Datenstrategie ist nicht klar definiert und spielt in der Unternehmensstrategie kaum eine Rolle",
      "Es gibt eine Datenstrategie, die aber nicht konsequent mit der Unternehmensstrategie verknüpft ist",
      "Unsere Datenstrategie ist eng mit der Gesamtstrategie verzahnt und wird in der Planung berücksichtigt"
    ]
  },
  {
    area: "Enablement",
    question: "Wie gut sind die Mitarbeiter in Ihrem Unternehmen im Umgang mit Daten geschult?",
    answers: [
      "Es gibt kaum Schulungen oder Weiterbildungen im Bereich Datenkompetenz",
      "Einige Mitarbeiter haben Datenkompetenzen, aber es gibt keine systematische Förderung",
      "Datenkompetenz wird systematisch gefördert und regelmäßige Schulungen stehen zur Verfügung"
    ]
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
  area: string;
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
// Initialisiere den Store mit allen Fragen und leeren Antworten
const initialAnswers: AnswersStore = {};
assessItems.forEach((item, index) => {
  initialAnswers[index + 1] = ''; // Initialisiere jede Frage-ID mit leerem String
});

export const answersStore: MapStore<AnswersStore> = map<AnswersStore>(initialAnswers);
