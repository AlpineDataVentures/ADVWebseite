// Texte und Konfiguration der Controlling-Landingpage (src/pages/controlling.astro)

export const CALENDLY_URL =
  "https://calendly.com/andreas-klostermann-alpinedata/ersttermin";

export const REPORTING_CHECK_PRICE = 2900;

// Sichtbare Markierung für Inhalte, die vor dem Livegang ersetzt werden müssen
export const placeholderClass =
  "rounded border border-dashed border-[#c0392b] px-2 py-0.5 text-sm text-[#c0392b] dark:border-[#ff8a7a] dark:text-[#ff8a7a]";

export const placeholder = (text: string) =>
  `<span class="${placeholderClass}">${text}</span>`;

export const navLinks = [
  { label: "Rechner", href: "#rechner" },
  { label: "Demo", href: "#demo" },
  { label: "Preise", href: "#preise" },
  { label: "Whitepaper", href: "#whitepaper" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  eyebrow: "Für Leiter Controlling und CFOs im Mittelstand",
  title: "Monatsreporting ohne Copy-and-paste",
  lead: "Jeden Monat dieselben Exporte, Verknüpfungen und Abstimmungsrunden. Wir automatisieren Ihr Reporting in Power BI, in Ihrer Microsoft-Umgebung und zum Fixpreis. Der Einstieg ist ein Reporting-Check für 2.900 €.",
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
  note: "Wie viele Tage Sie einsparen, zeigt die Bestandsaufnahme im Quick-Start.",
};

export const painPoints = {
  eyebrow: "Kommt Ihnen das bekannt vor",
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
  lead: "Wechseln Sie mit einem Klick von Kostenstellen zu Umsatz oder EBIT. Analysieren Sie Kostenstellen auf Abweichung vom Plan-EBIT bis zum Konto.",
  after: "Im Quick-Start bauen wir diese Ansicht mit einem Ihrer Berichte.",
  afterCta: "Zu den Preisen",
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
      text: "Aus dem Prototyp wird Ihr vollständiges Monatsreporting, in der Regel in 1 bis 4 Wochen und ab 1490 €. Umfang und Fixpreis stehen im Fahrplan, bevor Sie entscheiden.",
    },
  ],
  note: "Alles läuft in Ihrer Microsoft-Umgebung. Excel bleibt für Ad-hoc-Analysen Ihr Werkzeug, Power BI übernimmt die wiederkehrenden Berichte.",
  offer: {
    price: "2990 €",
    priceNote: "Fixpreis zzgl. MwSt., etwa zwei Wochen",
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
    text: "Den Umfang legen wir gemeinsam fest, den Preis nennen wir vor dem Start. Mehraufwand innerhalb dieses Umfangs tragen wir. Das gilt für den Quick-Start genauso wie für die Umsetzung danach."
  },
};

export type PricingTier = {
  step: string;
  duration: string;
  title: string;
  sub: string;
  prefix?: string;
  price: string;
  priceNote: string;
  items: string[];
  cta: string;
  href: string;
  highlight?: boolean;
  badge?: string;
};

export const pricing = {
  eyebrow: "Preise",
  title: "Klein anfangen, Stufe für Stufe ausbauen",
  lead: "Jede Stufe hat einen festen Umfang und einen Fixpreis, den Sie vor dem Start kennen. Nach jeder Stufe entscheiden Sie, ob es weitergeht.",
  tiers: [
    {
      step: "Stufe 1",
      duration: "1 Tag",
      title: "Reporting-Check",
      sub: "Wo Ihr Monatsreporting Zeit verliert und was sich zuerst lohnt.",
      price: "2.900 €",
      priceNote: "Fixpreis zzgl. MwSt.",
      items: [
        "Workshop zu Monatsabschluss, Standardberichten und Zeitfressern",
        "Inventar Ihrer Berichte, Quellen und manuellen Schritte",
        "Ergebnisbericht mit drei priorisierten Use Cases",
        "Fahrplan mit Fixpreis für die nächste Stufe",
      ],
      cta: "Check anfragen",
      href: CALENDLY_URL,
      highlight: true,
      badge: "Einstieg",
    },
    {
      step: "Stufe 2",
      duration: "2 Wochen",
      title: "Quick-Start",
      sub: "Ihr wichtigster Bericht live in Power BI, als Proof of Concept.",
      prefix: "ab",
      price: "9.900 €",
      priceNote: "Fixpreis nach dem Check",
      items: [
        "Ein Use Case live, z. B. Ihre GuV oder der Kostenstellenbericht",
        "Gebaut auf Ihren Echtdaten aus einer Quelle",
        "Abnahme mit Ihrem Team",
        "Entscheidungsvorlage für den Rollout",
      ],
      cta: "Erstgespräch vereinbaren",
      href: CALENDLY_URL,
    },
    {
      step: "Stufe 3",
      duration: "6–10 Wochen",
      title: "Rollout",
      sub: "Ihr vollständiges Monatsreporting, automatisch und abgestimmt.",
      prefix: "ab",
      price: "20.000 €",
      priceNote: "Fixpreis nach dem Quick-Start",
      items: [
        "Anbindung an ERP und Buchhaltung über ein Data Warehouse",
        "3 bis 5 Berichte auf einem gemeinsamen Kennzahlenmodell",
        "Automatische Aktualisierung",
        "Schulung Ihrer Controller:innen",
      ],
      cta: "Erstgespräch vereinbaren",
      href: CALENDLY_URL,
    },
    {
      step: "Individuell",
      duration: "nach Umfang",
      title: "Enterprise BI",
      sub: "Unternehmensweites Reporting über Controlling hinaus.",
      price: "Auf Anfrage",
      priceNote: "Angebot nach Workshop",
      items: [
        "Mehrere Gesellschaften, Bereiche oder Standorte",
        "Datenplattform und Governance für alle Fachbereiche",
        "Self-Service BI mit Rollen und Berechtigungen",
        "Konzernkonsolidierung und Planung",
      ],
      cta: "Individuelles Angebot anfragen",
      href: CALENDLY_URL,
    },
  ] satisfies PricingTier[],
  run: {
    title: "Betrieb und Weiterentwicklung",
    text: "Nach jeder Stufe möglich: Monitoring der Datenaktualisierung, Anpassungen an Ihren Berichten und ein fester Ansprechpartner.",
    price: "ab 990 € / Monat",
    cta: "Mehr erfahren",
  },
  guarantees: [
    {
      title: "Fixpreis heißt Fixpreis",
      text: "Den Umfang legen wir gemeinsam fest, den Preis nennen wir vor dem Start. Mehraufwand innerhalb dieses Umfangs tragen wir.",
    },
    {
      title: "Der Check wird angerechnet",
      text: "Beauftragen Sie innerhalb von 60 Tagen den Quick-Start, ziehen wir die 2.900 € vom Preis ab.",
    },
    {
      title: "Alles in Ihrer Umgebung",
      text: "Power BI läuft über Ihren Microsoft-Vertrag. Excel bleibt Ihr Werkzeug für Ad-hoc-Analysen.",
    },
  ] as { title: string; text: string; hint?: string }[],
};

export const caseExample = {
  eyebrow: "Projektbeispiel",
  title: "Vom Excel-Bericht zum gemeinsamen Zahlenstand",
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

export const reportingCheck = {
  eyebrow: "Reporting-Check online",
  title: "Wie reif ist Ihr Monatsreporting?",
  lead: "Fünf Fragen, zwei Minuten. Sie sehen Ihr Ergebnis sofort und bekommen auf Wunsch eine Auswertung mit drei konkreten Ansatzpunkten per E-Mail.",
  steps: [
    "Fünf Fragen zu Abschluss, Quellen und Werkzeugen beantworten",
    "Reifegrad und Empfehlung sofort ansehen",
    "Auswertung per E-Mail erhalten, ohne Verpflichtung",
  ],
  questions: [
    {
      q: "Wann liegt Ihr Monatsbericht vor?",
      options: [
        { label: "Am 1. bis 2. Arbeitstag", points: 3 },
        { label: "Am 3. bis 5. Arbeitstag", points: 2 },
        { label: "Am 6. bis 8. Arbeitstag", points: 1 },
        { label: "Später", points: 0 },
      ],
    },
    {
      q: "Aus wie vielen Quellen führen Sie Zahlen von Hand zusammen?",
      options: [
        { label: "Keine, das läuft automatisch", points: 3 },
        { label: "Aus 2 bis 3", points: 2 },
        { label: "Aus 4 bis 6", points: 1 },
        { label: "Aus mehr als 6", points: 0 },
      ],
    },
    {
      q: "Gibt es eine gemeinsame Definition Ihrer Kennzahlen?",
      options: [
        { label: "Ja, dokumentiert", points: 3 },
        { label: "Teilweise", points: 1 },
        { label: "Nein", points: 0 },
      ],
    },
    {
      q: "Wer kann den Bericht erstellen, wenn die zuständige Person ausfällt?",
      options: [
        { label: "Mehrere Kolleg:innen", points: 3 },
        { label: "Eine weitere Person", points: 1 },
        { label: "Niemand", points: 0 },
      ],
    },
    {
      q: "Welche Werkzeuge nutzen Sie heute?",
      options: [
        { label: "Power BI im Regelbetrieb", points: 3 },
        { label: "Power BI vorhanden, kaum genutzt", points: 1 },
        { label: "Nur Excel", points: 0 },
      ],
    },
  ],
  maxScore: 15,
  results: [
    {
      min: 0,
      level: 1,
      title: "Hoher Hebel",
      text: "Ihr Reporting hängt an manueller Arbeit und an einzelnen Personen.",
      recommendation: "Empfehlung: Reporting-Check",
      why: "In einem Tag sehen Sie, welche Berichte sich zuerst lohnen und was der Quick-Start kostet.",
    },
    {
      min: 6,
      level: 2,
      title: "Ausbaufähig",
      text: "Die Grundlagen stehen, aber jeder Abschluss kostet noch zu viel Handarbeit.",
      recommendation: "Empfehlung: Reporting-Check, danach Quick-Start",
      why: "Wir priorisieren Ihre Berichte und bringen den wichtigsten in zwei Wochen live.",
    },
    {
      min: 11,
      level: 3,
      title: "Gut aufgestellt",
      text: "Ihr Reporting ist weitgehend automatisiert.",
      recommendation: "Empfehlung: Rollout oder Enterprise BI",
      why: "Der nächste Schritt ist ein gemeinsames Modell für weitere Bereiche und Self-Service.",
    },
  ],
  labels: {
    question: "Frage",
    of: "von",
    duration: "ca. 2 Minuten",
    back: "← Zurück",
    restart: "Neu starten",
    result: "Ihr Ergebnis",
    points: "von 15 Punkten",
    formTitle: "Auswertung mit drei Ansatzpunkten per E-Mail",
    namePlaceholder: "Name",
    emailPlaceholder: "name@unternehmen.de",
    submit: "Auswertung erhalten →",
    privacy: "Kein Newsletter, nur Ihre Auswertung.",
    privacyLink: "Datenschutzhinweise",
    talk: "Lieber direkt sprechen →",
    success: "Danke, wir melden uns mit Ihrer Auswertung.",
    error: "Das Senden hat leider nicht geklappt. Bitte versuchen Sie es später erneut.",
  },
};

export const whitepaper = {
  coverLabel: "Whitepaper",
  coverTitle: "Von Excel zu Power BI im Controlling",
  coverFoot: "Alpine Data Ventures, 10 Seiten",
  eyebrow: "Zum Mitnehmen",
  title: "Der Leitfaden für die Umstellung, bevor Sie mit jemandem sprechen",
  lead: "Zehn Seiten aus unseren Controlling-Projekten. Für alle, die das Thema erst intern vorbereiten wollen.",

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
      "Sie melden sich für unseren Newsletter an: gelegentlich Neues aus unseren Controlling-Projekten. Sobald Sie Ihre Anmeldung per E-Mail bestätigt haben, erhalten Sie das Whitepaper. Sie können sich jederzeit über den Abmeldelink in einer Newsletter-E-Mail abmelden.",
    privacyLink: "Datenschutzhinweise",
    firstnamePlaceholder: "Vorname",
    lastnamePlaceholder: "Nachname",
    companyPlaceholder: "Firma",
    consent:
      "Ich möchte den Newsletter der Alpine Data Ventures erhalten und das Whitepaper per E-Mail bekommen. Meine Einwilligung kann ich jederzeit widerrufen.",
    error: "Die Anmeldung ist leider fehlgeschlagen. Bitte versuchen Sie es später erneut.",
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
      answer_long: "Ob Ihr System dabei ist, klären wir im Erstgespräch.",
    },
    {
      question: "Brauchen wir neue Lizenzen?",
      answer_short: "Power BI läuft über Ihren Microsoft-Vertrag.",
      answer_long: "Welche Lizenzen vorhanden sind und ob etwas fehlt, klären wir vor dem Start.",
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
      answer_long:
        "Den Umfang legen wir anhand der Bestandsaufnahme fest, ebenfalls zum Fixpreis. Die Umsetzung liegt je nach Zahl der Berichte und Quellen zwischen 1290€ und 4900€ pro Bericht.",
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

export const contact = {
  eyebrow: "Kontakt",
  title: "Wie möchten Sie starten?",
  lead: "Buchen Sie direkt einen Termin oder schreiben Sie uns kurz. Wir melden uns innerhalb eines Werktags.",
  booking: {
    title: "Termin direkt buchen",
    cta: "Termin im Kalender wählen →",
    points: [
      "30 Minuten per Video",
      "Ihre Ausgangslage und welche Stufe passt",
      "Kein Angebot ohne Ihren Wunsch",
    ],
    people: [
      {
        name: "Andreas Klostermann",
        role: "Ihr Ansprechpartner für das Erstgespräch",
        image: "/images/about/gf_andreas.jpg",
      },
      {
        name: "Julian Koller",
        role: "Leitet Ihren Reporting-Check. Über acht Jahre Erfahrung in Business Intelligence, Geschäftsführer.",
        image: "/images/about/gf_julian.jpg",
      },
    ],
  },
  form: {
    title: "Anfrage senden",
    typeLegend: "Worum geht es?",
    types: [
      { value: "rueckruf", label: "Rückruf", submit: "Rückruf anfordern →" },
      { value: "check", label: "Reporting-Check", submit: "Reporting-Check anfragen →" },
      { value: "demo", label: "Live-Demo", submit: "Live-Demo anfragen →" },
      { value: "individuell", label: "Individuelles Angebot", submit: "Angebot anfragen →" },
    ],
    name: "Name",
    company: "Unternehmen",
    email: "E-Mail",
    phone: "Telefon",
    phoneHint: "für den Rückruf",
    when: "Wann passt es Ihnen?",
    whenOptions: ["Vormittags", "Mittags", "Nachmittags"],
    message: "Nachricht",
    optional: "optional",
    messagePlaceholder:
      "z. B. Wir erstellen den Monatsbericht aus SAP-Exporten und drei Excel-Dateien.",
    privacy: "Wir nutzen Ihre Angaben nur zur Bearbeitung dieser Anfrage.",
    privacyLink: "Datenschutzhinweise",
    successTitle: "Danke, Ihre Anfrage ist da.",
    success: "Wir melden uns innerhalb eines Werktags.",
    error: "Das Senden hat leider nicht geklappt. Bitte versuchen Sie es später erneut.",
    sending: "Wird gesendet …",
  },
};
