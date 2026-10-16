// Texte und Konfiguration der Controlling-Landingpage (src/pages/controlling.astro)

export const CALENDLY_URL =
  "https://calendly.com/andreas-klostermann-alpinedata/ersttermin";

// false: Preise ausblenden, stattdessen "Preis im Erstgespräch"
export const SHOW_PRICES = true;

// Sichtbare Markierung für Inhalte, die vor dem Livegang ersetzt werden müssen
export const placeholderClass =
  "rounded border border-dashed border-[#c0392b] px-2 py-0.5 text-sm text-[#c0392b] dark:border-[#ff8a7a] dark:text-[#ff8a7a]";

export const placeholder = (text: string) =>
  `<span class="${placeholderClass}">${text}</span>`;

export const navLinks = [
  { label: "Rechner", href: "#rechner" },
  { label: "Demo", href: "#demo" },
  { label: "Quick-Start", href: "#einstieg" },
  { label: "Whitepaper", href: "#whitepaper" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  eyebrow: "Für Leiter Controlling und CFOs im Mittelstand",
  title: "Monatsreporting ohne Copy‑and‑paste",
  lead: "Jeden Monat dieselben Exporte, Verknüpfungen und Abstimmungsrunden. In zwei Wochen sehen Sie Ihren wichtigsten Bericht als Prototyp in Power BI, mit Ihren eigenen Zahlen und zum Fixpreis.",
  primaryCta: "Erstgespräch vereinbaren",
  secondaryCta: "Kurz durchrechnen",
};

export type TimelineSegment = {
  label: string;
  span: number;
  kind: "hand" | "done" | "free";
};

export const timeline = {
  title: "Monatsabschluss nach Arbeitstagen",
  badge: "Beispiel",
  ariaLabel:
    "Beispielhafter Monatsabschluss: heute acht Arbeitstage manueller Aufwand, mit Power BI liegt der Bericht am ersten Arbeitstag vor",
  days: ["AT 1", "2", "3", "4", "5", "6", "7", "8"],
  before: {
    title: "Heute in Excel",
    segments: [
      { label: "Exporte ziehen", span: 2, kind: "hand" },
      { label: "Dateien zusammenführen", span: 3, kind: "hand" },
      { label: "Zahlen abstimmen", span: 2, kind: "hand" },
      { label: "Fertig", span: 1, kind: "done" },
    ] satisfies TimelineSegment[],
  },
  after: {
    title: "Mit Power BI",
    segments: [
      { label: "Fertig", span: 1, kind: "done" },
      {
        label: "Zeit für Abweichungsanalyse und Forecast",
        span: 7,
        kind: "free",
      },
    ] satisfies TimelineSegment[],
  },
  note: "Wie viele Tage es bei Ihnen sind, zeigt die Bestandsaufnahme im Quick-Start.",
};

export const painPoints = {
  eyebrow: "Kommt Ihnen bekannt vor",
  title: "Drei Zeichen, dass Excel Ihr Reporting bremst",
  items: [
    {
      code: "#BEZUG!",
      title: "Der Bericht hängt an einer Datei",
      text: "Ein verschobener Zellbezug oder eine überschriebene Formel, und die Summen stimmen nicht mehr. Den Fehler findet nur, wer die Datei gebaut hat.",
    },
    {
      code: "#NV",
      title: "Zwei Abteilungen, zwei Umsätze",
      text: "ERP, Buchhaltung und Vertrieb liefern unterschiedliche Stände. Vor jeder Besprechung steht der Abgleich.",
    },
    {
      code: "#WERT!",
      title: "Der Bericht kommt zu spät",
      text: "Bis alles zusammengetragen ist, ist der Monat schon alt. Für die Ursachenanalyse bleibt kaum Zeit.",
    },
  ],
};

export const calculator = {
  eyebrow: "Rechner",
  title: "Was manuelles Reporting Sie pro Jahr kostet",
  lead: "Drei Angaben, und Sie sehen, wie viel Zeit Ihr Team pro Jahr ins Zusammentragen von Zahlen steckt.",
};

export const demo = {
  eyebrow: "Live-Demo",
  title: "So sieht Ihr Monatsbericht in Power BI aus",
  lead: "Wechseln Sie die Seiten, klappen Sie Kostenstellen auf und folgen Sie der Abweichung vom Plan-EBIT bis zum Konto.",
  after: "Im Quick-Start bauen wir diese Ansicht mit einem Ihrer Berichte.",
  afterCta: "Zum Quick-Start",
};

export const quickStart = {
  eyebrow: "Einstieg",
  title: "Quick-Start: in zwei Wochen zum ersten Bericht mit Ihren Daten",
  steps: [
    {
      when: "Tag 0",
      title: "Erstgespräch",
      text: "30 Minuten per Video mit Julian Koller. Wir sprechen über Ihre Ausgangslage, danach entscheiden Sie, ob der Quick-Start für Sie passt.",
    },
    {
      when: "Woche 1",
      title: "Workshop und Bestandsaufnahme",
      text: "Ein halber Tag remote zu Monatsabschluss, Standardberichten und Zeitfressern. Anschließend erfassen wir Berichte, Quellen und manuelle Schritte.",
    },
    {
      when: "Woche 2",
      title: "Prototyp in Power BI",
      text: "Eine Berichtsseite aus Ihrem wichtigsten Bericht, gebaut auf einem Datenexport oder einer Ihrer Quellen.",
    },
    {
      when: "Ende Woche 2",
      title: "Ergebnis und Fahrplan",
      text: "Sie erhalten den Prototyp und die Reihenfolge der nächsten Schritte. Die Entscheidung über die Umsetzung liegt bei Ihnen.",
    },
    {
      when: "Danach",
      title: "Umsetzung, wenn Sie wollen",
      text: `Aus dem Prototyp wird Ihr vollständiges Monatsreporting, in der Regel in 1 bis 4 Wochen${SHOW_PRICES ? " und ab 1490 €" : ""
        }. Umfang und Fixpreis stehen im Fahrplan, bevor Sie entscheiden.`,
    },
  ],
  note: "Alles läuft in Ihrer Microsoft-Umgebung. Excel bleibt für Ad-hoc-Analysen Ihr Werkzeug, Power BI übernimmt die wiederkehrenden Berichte.",
  offer: {
    price: SHOW_PRICES ? "2990 €" : "Fixpreis",
    priceNote: SHOW_PRICES
      ? "Fixpreis zzgl. MwSt., etwa zwei Wochen"
      : "Etwa zwei Wochen, Preis im Erstgespräch",
    receiveTitle: "Das erhalten Sie",
    receive: [
      "Inventarliste Ihrer Berichte und Datenquellen",
      "Priorisierung nach Aufwand und Nutzen",
      "Power-BI-Prototyp mit Ihren Echtdaten",
      "Fahrplan mit Zielbild als PDF",
    ],
    needTitle: "Das brauchen wir",
    need: [
      "Einen Beispielbericht mit Excel-Datei",
      "Einen Datenexport oder Zugriff auf eine Quelle",
      "Einen halben Tag Ihrer Zeit",
    ],
    cta: "Erstgespräch vereinbaren",
    person: {
      name: "Julian Koller",
      image: "/images/authors/JulianKoller.jpg",
      text: "Leitet Ihren Workshop. Über acht Jahre Erfahrung in Business Intelligence, Geschäftsführer bei Alpine Data Ventures.",
    },
  },
  fixedPrice: {
    label: "Fixpreis",
    title: "Sie kennen die Kosten, bevor wir anfangen",
    text: "Den Umfang legen wir gemeinsam fest, den Preis nennen wir vor dem Start. Mehraufwand innerhalb dieses Umfangs tragen wir. Das gilt für den Quick-Start genauso wie für die Umsetzung danach.",
    hint: "Annahme: bitte prüfen",
  },
};

export const caseExample = {
  eyebrow: "Projektbeispiel",
  title: "Vom Excel-Bericht zum gemeinsamen Zahlenstand",
  hint: "Platzhalter: Kunde, Text und Zahlen nach Freigabe",
  story: [
    {
      title: "Ausgangslage",
      text: "Der Monatsbericht entstand aus mehreren Exporten, von Hand in Excel zusammengeführt. Jede Einheit rechnete mit eigenem Stand.",
    },
    {
      title: "Umsetzung",
      text: "Power-BI-Lösung mit gemeinsamem Kennzahlenmodell und automatischem Datenabruf aus den bestehenden Quellen.",
    },
    {
      title: "Ergebnis",
      text: "Der Bericht entsteht ohne manuelle Zusammenführung und steht allen Beteiligten gleichzeitig zur Verfügung.",
    },
  ],
  kpis: [
    { value: "3", label: "Arbeitstage früher liegt der Monatsbericht vor" },
    { value: "24 h", label: "weniger manueller Aufwand pro Monat" },
    { value: "8", label: "Excel-Dateien abgelöst" },
  ],
  logosTitle: "Weitere Referenzen",
  logoSlots: ["Logo 1", "Logo 2", "Logo 3", "Logo 4"],
};

export const whitepaper = {
  coverLabel: "Whitepaper",
  coverTitle: "Von Excel zu Power BI im Controlling",
  coverFoot: "Alpine Data Ventures, 10 Seiten",
  eyebrow: "Zum Mitnehmen",
  title: "Der Leitfaden für die Umstellung, bevor Sie mit jemandem sprechen",
  lead: "Zehn Seiten aus unseren Controlling-Projekten. Für alle, die das Thema erst intern vorbereiten wollen.",
  hint: "Platzhalter: Titel und Inhalte nach eurem Whitepaper",
  bullets: [
    "Welche Berichte sich zuerst lohnen und welche in Excel bleiben dürfen",
    "Der Ablauf einer Umstellung in vier Schritten, mit Aufwand je Schritt",
    "Fünf Stolpersteine aus Projekten und wie Sie sie umgehen",
  ],
  form: {
    label: "Newsletter abonnieren, Whitepaper gleich mitnehmen",
    placeholder: "name@unternehmen.de",
    submit: "Newsletter abonnieren",
    privacy:
      "Sie melden sich für unseren Newsletter an: gelegentlich Neues aus unseren Controlling-Projekten. Sobald Sie Ihre Anmeldung per E-Mail bestätigt haben, erhalten Sie das Whitepaper. Abmelden mit einem Klick.",
    privacyLink: "Datenschutzhinweise",
    notActive:
      "Die Newsletter-Anmeldung ist noch nicht aktiv. Bitte vereinbaren Sie ein Erstgespräch oder versuchen Sie es in Kürze erneut.",
  },
};

export const faq = {
  title: "Häufige Fragen",
  items: [
    {
      question: "Müssen wir unsere Kennzahlen neu definieren?",
      answer_short: "Nein.",
      answer_long:
        "Wir übernehmen Ihre bestehende Logik, dokumentieren sie und bereinigen nur widersprüchliche Definitionen.",
    },
    {
      question: "Was bedeutet Fixpreis bei Ihnen?",
      answer_short: "Umfang und Preis stehen vor dem Start fest.",
      answer_long:
        "Dauert etwas innerhalb dieses Umfangs länger als geplant, ist das unser Risiko. Kommen neue Anforderungen hinzu, sprechen wir vorher darüber.",
    },
    {
      question: "Funktioniert das mit unserem ERP und unserer Buchhaltung?",
      answer_short:
        "Power BI liest aus den gängigen ERP- und Finanzsystemen sowie aus Excel- und CSV-Exporten.",
      answer_long: `Angebunden haben wir bisher unter anderem ${placeholder("Platzhalter: eure Systeme")}. Ob Ihr System dabei ist, klären wir im Erstgespräch.`,
    },
    {
      question: "Brauchen wir neue Lizenzen?",
      answer_short: "Power BI läuft über Ihren Microsoft-Vertrag.",
      answer_long: `Welche Lizenzen vorhanden sind und ob etwas fehlt, klären wir vor dem Start. ${placeholder("Annahme: bitte prüfen")}`,
    },
    {
      question: "Wo liegen unsere Daten?",
      answer_short:
        "Die fertige Lösung läuft in Ihrer eigenen Microsoft-Umgebung.",
      answer_long: `Für den Prototyp arbeiten wir mit einem Datenexport, den Sie uns auf einem gesicherten Weg bereitstellen. Vertraulichkeit und Auftragsverarbeitung regeln wir vor dem Start schriftlich. ${placeholder("Annahme: bitte prüfen")}`,
    },
    {
      question: "Was passiert nach dem Quick-Start?",
      answer_short:
        "Aus dem Prototyp wird auf Wunsch Ihr vollständiges Monatsreporting.",
      answer_long: `Den Umfang legen wir anhand der Bestandsaufnahme fest, ebenfalls zum Fixpreis.${SHOW_PRICES
        ? " Die Umsetzung liegt je nach Zahl der Berichte und Quellen zwischen 1290€ und 4900€ pro Bericht."
        : ""
        }`,
    },
    {
      question: "Wer pflegt die Berichte danach?",
      answer_short: "Ihr Team.",
      answer_long:
        "Wir schulen Ihre Controller, damit sie Berichte selbst anpassen und erweitern.",
    },
  ],
};

export const finalCta = {
  title: "Starten Sie mit einem Gespräch",
  text: "Im Erstgespräch klären wir, ob der Quick-Start zu Ihrer Ausgangslage passt.",
  primary: "Erstgespräch vereinbaren",
  secondary: "Erst das Whitepaper lesen",
};
