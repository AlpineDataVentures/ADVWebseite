export type DeliverableFamily =
  | "Data Strategy"
  | "Governance & Culture"
  | "AI & Data Science"
  | "BI & Analytics"
  | "Data Architecture"
  | "Enterprise Architecture"
  | "Data Knowledge"
  | "Data Operations";

export type DeliverableTypeTag = "setup" | "workshop" | "build" | "enablement" | "blueprint" | "run";
export type MaturityTag = "start" | "stabilize" | "scale";
export type ImpactTag = "quickwin" | "foundation" | "compliance" | "performance" | "adoption";
export type CoverageTag = "bi_layer" | "semantic_layer" | "data_layer" | "operations";

export interface Deliverable {
  key: string;
  family: DeliverableFamily;
  name: string;
  shortDescription: string;
  longDescription: string;
  basePrice: number;
  active: boolean;
  tags: {
    type: DeliverableTypeTag[];
    maturity: MaturityTag[];
    impact: ImpactTag[];
    coverage: CoverageTag[];
  };
  estimatedDuration: string;
  /** Optional: Suffix für Preisanzeige, z. B. „pro Monat“ */
  pricePeriod?: string;
  deliverablesOutput: string[];
  assumptions: string[];
  outOfScope: string[];
  parameters?: string[]; // nur wenn active=true
}

export const deliverables: Deliverable[] = [
  // ========== MVP ACTIVE DELIVERABLES ==========

  // BI & Analytics
  {
    key: "bi_setup",
    family: "BI & Analytics",
    name: "BI Fix & Fertig Setup",
    shortDescription: "Komplettes Business Intelligence Setup mit Power BI, Dashboards und erster Datenanbindung. Sofort einsatzbereit.",
    longDescription: "Wir richten Ihr komplettes BI-System ein: Power BI Installation, erste Datenquellen-Anbindung, Basis-Dashboards und eine zentrale Berichtsstruktur. Sie erhalten ein sofort einsatzfähiges System mit Best Practices und können direkt loslegen. Ideal für Unternehmen, die schnell erste Einblicke in ihre Daten gewinnen möchten.",
    basePrice: 9900,
    active: true,
    tags: {
      type: ["setup", "build"],
      maturity: ["start"],
      impact: ["quickwin", "foundation"],
      coverage: ["bi_layer", "semantic_layer"]
    },
    estimatedDuration: "3–5 Tage",
    deliverablesOutput: [
      "Installiertes und konfiguriertes Power BI System",
      "Anbindung an 1-3 Datenquellen (z.B. Excel, SQL, CRM)",
      "3-5 Basis-Dashboards nach Ihren Anforderungen",
      "Dokumentation der Architektur und Best Practices",
      "Kurze Einführung für Ihr Team (2 Stunden)"
    ],
    assumptions: [
      "Sie haben bereits Datenquellen identifiziert und Zugriff darauf",
      "Power BI Lizenzen sind vorhanden oder werden separat beschafft"
    ],
    outOfScope: [
      "Komplexe Datenmodellierung",
      "ETL-Entwicklung",
      "Umfangreiche Schulungen (>2h)",
      "On-Premise Installation (gegen Aufpreis möglich)"
    ],
    parameters: ["companySize", "speed", "deployment", "sourceSystemCount"]
  },
  {
    key: "kpi_ws",
    family: "BI & Analytics",
    name: "KPI-Workshop und Kennzahlenkonzept",
    shortDescription: "Gemeinsame Definition Ihrer wichtigsten Kennzahlen – einheitlich, nachvollziehbar und steuerungsrelevant.",
    longDescription: "In diesem Workshop erarbeiten wir gemeinsam die für Ihr Unternehmen relevanten Kennzahlen (KPIs). Wir analysieren Ihre Geschäftsziele, identifizieren die wichtigsten Metriken und definieren klare Messgrößen. Sie erhalten ein strukturiertes KPI-Framework, das als Grundlage für alle zukünftigen Berichte und Analysen dient.",
    basePrice: 6900,
    active: true,
    tags: {
      type: ["workshop", "blueprint"],
      maturity: ["start"],
      impact: ["foundation"],
      coverage: ["semantic_layer"]
    },
    estimatedDuration: "2–3 Tage",
    deliverablesOutput: [
      "KPI-Katalog mit Definitionen und Berechnungsformeln",
      "Priorisierte Liste der wichtigsten Kennzahlen",
      "Dokumentation der Geschäftslogik und Datenquellen",
      "Empfehlungen für Reporting-Struktur",
      "Workshop-Dokumentation und Präsentation"
    ],
    assumptions: [
      "Geschäftsführung oder Fachabteilungen sind für Workshops verfügbar",
      "Grundlegende Geschäftsziele sind definiert"
    ],
    outOfScope: [
      "Technische Umsetzung der KPIs",
      "Datenqualitätsprüfung",
      "Umfangreiche Datenanalyse"
    ],
    parameters: ["companySize", "speed"]
  },
  {
    key: "mgmt_report_1",
    family: "BI & Analytics",
    name: "Erster Management-Bericht",
    shortDescription: "Professioneller Management-Bericht mit den wichtigsten Kennzahlen. Übersichtlich, verständlich, handlungsorientiert.",
    longDescription: "Wir erstellen Ihren ersten maßgeschneiderten Management-Bericht mit den wichtigsten Kennzahlen für die Geschäftsführung. Der Bericht ist übersichtlich gestaltet, zeigt Trends auf und hilft bei strategischen Entscheidungen. Sie erhalten sowohl eine interaktive Power BI Version als auch ein druckbares PDF-Format.",
    basePrice: 12900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["start", "stabilize"],
      impact: ["quickwin"],
      coverage: ["bi_layer"]
    },
    estimatedDuration: "5–7 Tage",
    deliverablesOutput: [
      "Interaktiver Management-Bericht in Power BI",
      "PDF-Version für Präsentationen",
      "Automatisierte Datenaktualisierung (täglich/wöchentlich)",
      "Dokumentation der Kennzahlen und Berechnungen",
      "Schulung für Nutzer (1 Stunde)"
    ],
    assumptions: [
      "KPIs sind bereits definiert (empfohlen: KPI Definition Workshop)",
      "Datenquellen sind verfügbar und zugänglich"
    ],
    outOfScope: [
      "KPI-Definition",
      "Datenqualitätsprüfung",
      "Komplexe Datenmodellierung",
      "Mehrere Berichtsvarianten"
    ],
    parameters: ["companySize", "speed", "reportComplexity", "reportCount"]
  },
  {
    key: "reporting_standards",
    family: "BI & Analytics",
    name: "Reporting-Struktur (Templates & Standards)",
    shortDescription: "Einheitliche Berichtsvorlagen und Standards für Ihr gesamtes Unternehmen. Konsistenz und Effizienz.",
    longDescription: "Wir entwickeln eine einheitliche Reporting-Struktur mit wiederverwendbaren Vorlagen, Design-Standards und Best Practices. Alle zukünftigen Berichte folgen diesem Framework, was Konsistenz, Wartbarkeit und schnelle Erstellung neuer Reports ermöglicht. Ideal für Unternehmen, die mehrere Abteilungen und Berichte haben.",
    basePrice: 7900,
    active: true,
    tags: {
      type: ["blueprint", "build"],
      maturity: ["stabilize"],
      impact: ["foundation", "adoption"],
      coverage: ["bi_layer", "semantic_layer"]
    },
    estimatedDuration: "4–6 Tage",
    deliverablesOutput: [
      "Bibliothek mit Berichtsvorlagen (5-10 Templates)",
      "Design-Standards und Style Guide",
      "Dokumentation der Reporting-Struktur",
      "Beispielberichte für verschiedene Anwendungsfälle",
      "Schulungsmaterial für Berichtsersteller"
    ],
    assumptions: [
      "Power BI ist bereits im Einsatz",
      "Grundlegende Anforderungen an Berichte sind bekannt"
    ],
    outOfScope: [
      "Erstellung individueller Berichte",
      "Datenmodellierung",
      "Umfangreiche Schulungen"
    ],
    parameters: ["companySize", "speed", "reportComplexity"]
  },

  // Data Architecture
  {
    key: "dwh_starter",
    family: "Data Architecture",
    name: "Zentrale Datenablage Starter (DWH/Lakehouse Light)",
    shortDescription: "Grundlegende zentrale Datenablage für strukturierte und unstrukturierte Daten. Solide Basis für Analytics.",
    longDescription: "Wir richten eine zentrale Datenablage ein, die als Single Source of Truth für Ihre Daten dient. Dies kann ein Data Warehouse oder ein moderner Lakehouse-Ansatz sein, je nach Ihren Anforderungen. Die Lösung ist skalierbar und bildet die Grundlage für alle zukünftigen Analytics-Projekte.",
    basePrice: 19900,
    active: true,
    tags: {
      type: ["setup", "build"],
      maturity: ["start"],
      impact: ["foundation"],
      coverage: ["data_layer"]
    },
    estimatedDuration: "10–15 Tage",
    deliverablesOutput: [
      "Installierte und konfigurierte Datenablage (Cloud oder On-Premise)",
      "Anbindung an Ihre wichtigsten Datenquellen",
      "Datenmodell für Kernbereiche (z.B. Sales, Finance)",
      "ETL-Prozesse für regelmäßige Datenaktualisierung",
      "Dokumentation der Architektur und Datenflüsse",
      "Schulung für Administratoren (4 Stunden)"
    ],
    assumptions: [
      "Datenquellen sind identifiziert und zugänglich",
      "Infrastruktur-Anforderungen (Cloud/On-Premise) sind geklärt"
    ],
    outOfScope: [
      "Umfangreiche Datenbereinigung",
      "Komplexe Datenmodellierung",
      "Migration historischer Daten",
      "24/7 Support"
    ],
    parameters: ["companySize", "speed", "deployment", "securityLevel", "sourceSystemCount", "strategyHorizonMonths"]
  },
  {
    key: "source_integration_review",
    family: "Data Architecture",
    name: "Analyse Ihrer Datenquellen und Schnittstellen",
    shortDescription: "Systematische Bestandsaufnahme Ihrer Datenquellen, Schnittstellen und Integrationsoptionen.",
    longDescription: "Wir analysieren alle Ihre Datenquellen, identifizieren Herausforderungen bei der Integration und entwickeln einen Plan für die zentrale Datenablage. Sie erhalten eine vollständige Übersicht Ihrer Datenlandschaft mit Empfehlungen für die beste Integrationsstrategie.",
    basePrice: 8900,
    active: true,
    tags: {
      type: ["workshop", "blueprint"],
      maturity: ["start"],
      impact: ["foundation"],
      coverage: ["data_layer"]
    },
    estimatedDuration: "5–7 Tage",
    deliverablesOutput: [
      "Inventar aller Datenquellen mit Metadaten",
      "Bewertung der Datenqualität und Integrationsfähigkeit",
      "Empfehlungen für Integrationsstrategie",
      "Roadmap für schrittweise Integration",
      "Dokumentation der Datenlandschaft",
      "Präsentation der Ergebnisse"
    ],
    assumptions: [
      "Zugang zu allen relevanten Datenquellen und Systemen",
      "Fachabteilungen sind für Interviews verfügbar"
    ],
    outOfScope: [
      "Technische Umsetzung der Integration",
      "Datenbereinigung",
      "Setup der zentralen Datenablage"
    ],
    parameters: ["companySize", "speed", "dataSources", "securityLevel"]
  },

  // Data Knowledge
  {
    key: "glossary_sprint",
    family: "Data Knowledge",
    name: "KPI & Daten-Glossar Sprint",
    shortDescription: "Zentrales Glossar mit allen Kennzahlen, Datenfeldern und Definitionen. Gemeinsames Verständnis im Unternehmen.",
    longDescription: "Wir erstellen ein umfassendes Glossar mit allen wichtigen Kennzahlen, Datenfeldern und Fachbegriffen. Dies schafft Klarheit und ein gemeinsames Verständnis im gesamten Unternehmen. Das Glossar wird in einem zugänglichen Format bereitgestellt und kann kontinuierlich erweitert werden.",
    basePrice: 5900,
    active: true,
    tags: {
      type: ["workshop", "build"],
      maturity: ["start"],
      impact: ["quickwin", "foundation", "adoption"],
      coverage: ["semantic_layer"]
    },
    estimatedDuration: "3–4 Tage",
    deliverablesOutput: [
      "Digitales Glossar mit allen KPIs und Datenfeldern",
      "Definitionen, Berechnungsformeln und Datenquellen",
      "Suchfunktion und Kategorisierung",
      "Dokumentation der Erstellungsprozesse",
      "Schulung für Nutzer (1 Stunde)"
    ],
    assumptions: [
      "KPIs sind bereits definiert oder werden parallel im Workshop erarbeitet",
      "Fachabteilungen sind für Interviews verfügbar"
    ],
    outOfScope: [
      "KPI-Definition (empfohlen: KPI Definition Workshop)",
      "Technische Integration in Systeme",
      "Umfangreiche Datenanalyse"
    ],
    parameters: ["companySize", "speed"]
  },
  {
    key: "pbi_training_user",
    family: "Data Knowledge",
    name: "Power BI Anwender-Schulung",
    shortDescription: "Praktische Schulung für Ihre Mitarbeiter. Selbstständig Berichte erstellen und Daten analysieren.",
    longDescription: "Ihre Mitarbeiter lernen, wie sie selbstständig Berichte in Power BI erstellen, Daten analysieren und Dashboards nutzen. Die Schulung ist praxisorientiert und verwendet Ihre eigenen Daten. Nach der Schulung können Ihre Teams eigenständig arbeiten und sind nicht mehr auf externe Unterstützung angewiesen.",
    basePrice: 4900,
    active: true,
    tags: {
      type: ["enablement"],
      maturity: ["start", "stabilize"],
      impact: ["adoption"],
      coverage: ["bi_layer"]
    },
    estimatedDuration: "1–2 Tage",
    deliverablesOutput: [
      "Schulungsunterlagen und Übungsdateien",
      "Zertifikat für Teilnehmer",
      "Zugang zu Online-Ressourcen und Video-Tutorials",
      "Nachbetreuung: 2 Stunden Q&A Session (optional)",
      "Dokumentation häufiger Aufgaben und Lösungen"
    ],
    assumptions: [
      "Power BI ist installiert und lizenziert",
      "Teilnehmer haben Grundkenntnisse in Excel oder ähnlichen Tools"
    ],
    outOfScope: [
      "Power BI Installation",
      "Datenmodellierung",
      "Entwicklung komplexer Berichte",
      "Individuelle Beratung pro Teilnehmer"
    ],
    parameters: ["companySize", "speed", "trainingParticipants"]
  },
  {
    key: "pbi_training_dev",
    family: "Data Knowledge",
    name: "Power BI Entwickler-Schulung",
    shortDescription: "Fortgeschrittene Schulung für Power BI Entwickler. Datenmodellierung, DAX und komplexe Berichte.",
    longDescription: "Ihre Entwickler lernen fortgeschrittene Techniken für Power BI: Datenmodellierung, DAX-Formeln, Performance-Optimierung und komplexe Visualisierungen. Die Schulung ist praxisorientiert und vermittelt Best Practices für professionelle BI-Lösungen.",
    basePrice: 6900,
    active: true,
    tags: {
      type: ["enablement"],
      maturity: ["stabilize", "scale"],
      impact: ["adoption", "performance"],
      coverage: ["bi_layer", "semantic_layer"]
    },
    estimatedDuration: "2–3 Tage",
    deliverablesOutput: [
      "Schulungsunterlagen zu Datenmodellierung und DAX",
      "Praktische Übungen mit komplexen Szenarien",
      "Zertifikat für Teilnehmer",
      "Best Practices und Performance-Tipps",
      "Nachbetreuung: 2 Stunden Q&A Session (optional)"
    ],
    assumptions: [
      "Power BI ist installiert und lizenziert",
      "Teilnehmer haben bereits Grundkenntnisse in Power BI"
    ],
    outOfScope: [
      "Power BI Installation",
      "Grundlagen-Schulung",
      "Individuelle Beratung pro Teilnehmer"
    ],
    parameters: ["companySize", "speed", "trainingParticipants"]
  },

  // ========== COMING SOON DELIVERABLES ==========

  // Data Strategy
  {
    key: "strategy_sprint",
    family: "Data Strategy",
    name: "Datenstrategie Sprint",
    shortDescription: "Entwicklung einer klaren Strategie für den Umgang mit Daten. Roadmap für die nächsten Jahre.",
    longDescription: "In einem intensiven Sprint entwickeln wir gemeinsam Ihre Datenstrategie. Wir analysieren Ihre Geschäftsziele, identifizieren Datenbedarfe und erstellen eine Roadmap für die nächsten Jahre. Sie erhalten ein klares Konzept, wie Daten Ihr Unternehmen voranbringen können.",
    basePrice: 14900,
    active: true,
    tags: {
      type: ["workshop", "blueprint"],
      maturity: ["start"],
      impact: ["foundation", "performance"],
      coverage: ["operations"]
    },
    estimatedDuration: "5–7 Tage",
    deliverablesOutput: [
      "Dokumentierte Datenstrategie mit Zielen und Maßnahmen",
      "Roadmap für die Umsetzung (1-3 Jahre)",
      "Empfehlungen für Technologie und Prozesse",
      "Priorisierte Liste von Initiativen",
      "Präsentation für Management"
    ],
    assumptions: [
      "Geschäftsführung ist für Workshops verfügbar",
      "Grundlegende Geschäftsziele sind definiert"
    ],
    outOfScope: [
      "Technische Umsetzung",
      "Detaillierte Architektur-Planung"
    ],
    parameters: ["companySize", "speed"]
  },
  {
    key: "roadmap",
    family: "Data Strategy",
    name: "Daten-Roadmap",
    shortDescription: "Detaillierte Roadmap für Ihre Dateninitiativen. Klare Prioritäten und Meilensteine.",
    longDescription: "Wir erstellen eine detaillierte Roadmap für alle geplanten Dateninitiativen. Mit klaren Prioritäten, Meilensteinen und Abhängigkeiten können Sie Ihre Datenprojekte strukturiert angehen und Ressourcen optimal einsetzen.",
    basePrice: 9900,
    active: true,
    tags: {
      type: ["blueprint"],
      maturity: ["start", "stabilize"],
      impact: ["foundation", "performance"],
      coverage: ["operations"]
    },
    estimatedDuration: "3–5 Tage",
    deliverablesOutput: [
      "Detaillierte Roadmap mit Meilensteinen",
      "Priorisierte Liste aller Initiativen",
      "Ressourcen- und Budget-Schätzungen",
      "Abhängigkeitsanalyse",
      "Präsentation für Stakeholder"
    ],
    assumptions: [
      "Datenstrategie ist bereits definiert",
      "Geschäftsziele sind bekannt"
    ],
    outOfScope: [
      "Strategie-Entwicklung",
      "Technische Umsetzung"
    ],
    parameters: ["companySize", "speed"]
  },

  // Governance & Culture
  {
    key: "governance_starter",
    family: "Governance & Culture",
    name: "Data Governance Starter",
    shortDescription: "Grundlegende Data Governance Struktur. Verantwortlichkeiten, Prozesse und Standards.",
    longDescription: "Wir richten eine grundlegende Data Governance Struktur ein: Rollen und Verantwortlichkeiten, Prozesse für Datenqualität und Standards für den Umgang mit Daten. Sie erhalten ein solides Fundament für den verantwortungsvollen Umgang mit Daten in Ihrem Unternehmen.",
    basePrice: 13900,
    active: true,
    tags: {
      type: ["setup", "blueprint"],
      maturity: ["start"],
      impact: ["foundation", "compliance"],
      coverage: ["operations"]
    },
    estimatedDuration: "5–7 Tage",
    deliverablesOutput: [
      "Data Governance Konzept",
      "Rollen- und Verantwortlichkeits-Matrix",
      "Prozesse für Datenqualität",
      "Standards und Richtlinien",
      "Schulungsmaterial für Mitarbeiter"
    ],
    assumptions: [
      "Geschäftsführung unterstützt Data Governance",
      "Fachabteilungen sind für Workshops verfügbar"
    ],
    outOfScope: [
      "Technische Umsetzung von Tools",
      "Umfangreiche Schulungen"
    ],
    parameters: ["companySize", "speed", "securityLevel"]
  },
  {
    key: "iam_concept",
    family: "Governance & Culture",
    name: "IAM Konzept",
    shortDescription: "Konzept für Identity und Access Management. Sicherer und kontrollierter Zugriff auf Daten und Systeme.",
    longDescription: "Wir entwickeln ein Konzept für Identity und Access Management (IAM) in Ihrem Unternehmen. Mit klaren Rollen, Rechten und Prozessen stellen wir sicher, dass nur berechtigte Personen Zugriff auf die richtigen Daten haben.",
    basePrice: 11900,
    active: true,
    tags: {
      type: ["blueprint"],
      maturity: ["start"],
      impact: ["compliance", "foundation"],
      coverage: ["operations"]
    },
    estimatedDuration: "4–6 Tage",
    deliverablesOutput: [
      "Dokumentiertes IAM-Konzept",
      "Rollen- und Rechte-Modell",
      "Prozesse für Zugriffsverwaltung",
      "Empfehlungen für technische Umsetzung",
      "Präsentation für IT und Management"
    ],
    assumptions: [
      "IT-Abteilung ist für Workshops verfügbar",
      "Grundlegende Systeme sind identifiziert"
    ],
    outOfScope: [
      "Technische Implementierung",
      "Integration in alle Systeme"
    ],
    parameters: ["companySize", "speed", "securityLevel"]
  },
  {
    key: "roles_rights_impl",
    family: "Governance & Culture",
    name: "Umsetzung von Rechte- & Rollenkonzepten",
    shortDescription: "Technische Umsetzung von Zugriffsrechten und Rollen. Sicherer Datenzugriff nach dem Prinzip der geringsten Rechte.",
    longDescription: "Wir setzen Ihr Rechte- und Rollenkonzept technisch um. Mit automatisierten Prozessen und klaren Regeln stellen wir sicher, dass jeder Mitarbeiter nur Zugriff auf die Daten hat, die er für seine Arbeit benötigt.",
    basePrice: 18900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["stabilize"],
      impact: ["compliance"],
      coverage: ["operations"]
    },
    estimatedDuration: "10–15 Tage",
    deliverablesOutput: [
      "Implementiertes Rechte- und Rollensystem",
      "Zugriffskontrollen für alle Systeme",
      "Automatisierte Prozesse für Rollenverwaltung",
      "Dokumentation und Schulung",
      "Monitoring und Reporting"
    ],
    assumptions: [
      "IAM-Konzept ist bereits definiert",
      "Zugriff auf alle relevanten Systeme"
    ],
    outOfScope: [
      "Konzept-Entwicklung",
      "Integration in Legacy-Systeme ohne API"
    ],
    parameters: ["companySize", "speed", "securityLevel", "deployment"]
  },

  // AI & Data Science
  {
    key: "forecast_model",
    family: "AI & Data Science",
    name: "Forecasting-Modell",
    shortDescription: "Vorhersagemodell für Ihre Geschäftskennzahlen. Realistischere Prognosen für Planung und Budgetierung.",
    longDescription: "Wir entwickeln ein Forecasting-Modell für Ihre wichtigsten Geschäftskennzahlen. Basierend auf historischen Daten und Trends können Sie realistischere Prognosen erstellen und bessere Entscheidungen treffen. Das Modell wird kontinuierlich verbessert und passt sich an neue Entwicklungen an.",
    basePrice: 21900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["stabilize", "scale"],
      impact: ["performance", "adoption"],
      coverage: ["semantic_layer"]
    },
    estimatedDuration: "10–15 Tage",
    deliverablesOutput: [
      "Trainiertes Forecasting-Modell",
      "Dashboard mit Prognosen und Konfidenzintervallen",
      "Automatisierte Aktualisierung der Vorhersagen",
      "Dokumentation des Modells und der Methodik",
      "Schulung für Nutzer"
    ],
    assumptions: [
      "Historische Daten sind verfügbar (mindestens 12 Monate)",
      "Datenqualität ist ausreichend für Modellierung"
    ],
    outOfScope: [
      "Datenbereinigung",
      "Komplexe Zeitreihenanalyse",
      "Mehrere Modelle für verschiedene Szenarien"
    ],
    parameters: ["companySize", "speed", "dataSources"]
  },
  {
    key: "churn_model",
    family: "AI & Data Science",
    name: "Churn Prevention Modell",
    shortDescription: "Früherkennung von Kunden mit Abwanderungsrisiko. Rechtzeitige Maßnahmen zur Kundenbindung.",
    longDescription: "Wir entwickeln ein Machine Learning Modell zur Vorhersage von Kundenabwanderung. Basierend auf Verhaltensdaten und Transaktionshistorie identifiziert das Modell Kunden mit hohem Abwanderungsrisiko, sodass Sie rechtzeitig Maßnahmen zur Kundenbindung ergreifen können.",
    basePrice: 23900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["scale"],
      impact: ["performance", "adoption"],
      coverage: ["semantic_layer"]
    },
    estimatedDuration: "15–20 Tage",
    deliverablesOutput: [
      "Trainiertes Churn-Prediction-Modell",
      "Dashboard mit Risiko-Kunden und Scores",
      "Automatische Benachrichtigungen bei hohem Risiko",
      "Empfehlungen für Kundenbindungsmaßnahmen",
      "Dokumentation und Schulung"
    ],
    assumptions: [
      "Kundendaten sind verfügbar und von ausreichender Qualität",
      "Historische Abwanderungsdaten sind vorhanden"
    ],
    outOfScope: [
      "Datenbereinigung",
      "Umsetzung von Kundenbindungsmaßnahmen",
      "Integration in CRM-Systeme"
    ],
    parameters: ["companySize", "speed", "dataSources"]
  },
  {
    key: "anomaly_detection",
    family: "AI & Data Science",
    name: "Anomalieerkennung (KI)",
    shortDescription: "Automatische Erkennung ungewöhnlicher Muster in Daten – für Frühwarnung, Qualität und Betrugserkennung.",
    longDescription: "Wir entwickeln ein System zur automatischen Erkennung von Anomalien in Ihren Daten. Das System lernt normale Muster und erkennt Abweichungen, die auf Probleme, Betrug oder interessante Entwicklungen hinweisen können. Ideal für Qualitätssicherung, Betrugserkennung oder Prozessoptimierung.",
    basePrice: 22900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["scale"],
      impact: ["performance", "adoption"],
      coverage: ["data_layer", "semantic_layer"]
    },
    estimatedDuration: "15–20 Tage",
    deliverablesOutput: [
      "Trainiertes Anomalie-Erkennungsmodell",
      "Dashboard mit erkannten Anomalien",
      "Automatische Benachrichtigungen bei Auffälligkeiten",
      "Konfigurierbare Schwellenwerte",
      "Dokumentation und Schulung"
    ],
    assumptions: [
      "Historische Daten sind verfügbar",
      "Normale Muster können identifiziert werden"
    ],
    outOfScope: [
      "Datenbereinigung",
      "Umsetzung von Maßnahmen bei Anomalien",
      "Echtzeit-Verarbeitung (gegen Aufpreis möglich)"
    ],
    parameters: ["companySize", "speed", "dataSources"]
  },
  {
    key: "predictive_maintenance",
    family: "AI & Data Science",
    name: "Predictive Maintenance",
    shortDescription: "Vorhersage von Wartungsbedarfen mit KI. Wartung genau dann, wenn nötig – nicht zu früh, nicht zu spät.",
    longDescription: "Wir entwickeln ein Predictive Maintenance System, das Wartungsbedarfe für Ihre Maschinen und Anlagen vorhersagt. Basierend auf Sensordaten und historischen Wartungsdaten sagt das Modell voraus, wann Wartung nötig ist, sodass Sie Ausfälle vermeiden und Wartungskosten optimieren können.",
    basePrice: 26900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["scale"],
      impact: ["performance", "adoption"],
      coverage: ["data_layer", "semantic_layer"]
    },
    estimatedDuration: "20–25 Tage",
    deliverablesOutput: [
      "Trainiertes Predictive Maintenance Modell",
      "Dashboard mit Wartungsempfehlungen",
      "Automatische Benachrichtigungen bei Bedarf",
      "Integration mit Wartungssystemen",
      "Dokumentation und Schulung"
    ],
    assumptions: [
      "Sensordaten sind verfügbar",
      "Historische Wartungsdaten sind vorhanden"
    ],
    outOfScope: [
      "Sensor-Installation",
      "Integration in Legacy-Systeme",
      "24/7 Monitoring (gegen Aufpreis möglich)"
    ],
    parameters: ["companySize", "speed", "dataSources"]
  },
  {
    key: "qa_ai",
    family: "AI & Data Science",
    name: "KI-gestützte Qualitätsprüfung",
    shortDescription: "Automatische Qualitätsprüfung mit KI – z. B. für Bild-, Video- oder Prozessdaten.",
    longDescription: "Wir entwickeln ein KI-System zur automatischen Qualitätsprüfung Ihrer Produkte. Basierend auf Bildern, Sensordaten oder anderen Messwerten erkennt das System Fehler und Qualitätsprobleme frühzeitig, sodass Sie Ausschuss reduzieren und Qualität verbessern können.",
    basePrice: 24900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["scale"],
      impact: ["performance"],
      coverage: ["data_layer"]
    },
    estimatedDuration: "20–25 Tage",
    deliverablesOutput: [
      "Trainiertes Qualitätsprüfungsmodell",
      "Dashboard mit Qualitätsmetriken",
      "Automatische Alarme bei Qualitätsproblemen",
      "Integration mit Produktionssystemen",
      "Dokumentation und Schulung"
    ],
    assumptions: [
      "Qualitätsdaten oder Bilder sind verfügbar",
      "Historische Fehlerdaten sind vorhanden"
    ],
    outOfScope: [
      "Sensor- oder Kamera-Installation",
      "Integration in Legacy-Systeme",
      "Echtzeit-Verarbeitung (gegen Aufpreis möglich)"
    ],
    parameters: ["companySize", "speed", "dataSources"]
  },

  // Enterprise Architecture
  {
    key: "target_architecture",
    family: "Enterprise Architecture",
    name: "Zielarchitektur für Daten & Analytics",
    shortDescription: "Zielbild für Ihre Daten- und Analytics-Landschaft – klar, umsetzbar und abgestimmt mit dem Business.",
    longDescription: "Wir entwickeln eine Zielarchitektur für Ihre gesamte Datenlandschaft. Mit klaren Prinzipien, Technologie-Empfehlungen und einem Migrationspfad haben Sie eine Roadmap, wie Ihre Dateninfrastruktur in Zukunft aussehen soll.",
    basePrice: 17900,
    active: true,
    tags: {
      type: ["blueprint"],
      maturity: ["start", "stabilize"],
      impact: ["foundation", "performance"],
      coverage: ["data_layer", "operations"]
    },
    estimatedDuration: "10–15 Tage",
    deliverablesOutput: [
      "Dokumentierte Zielarchitektur",
      "Technologie-Empfehlungen",
      "Migrationspfad von aktueller zu Zielarchitektur",
      "Prinzipien und Standards",
      "Präsentation für Management und IT"
    ],
    assumptions: [
      "Aktuelle Architektur ist dokumentiert",
      "IT-Abteilung ist für Workshops verfügbar"
    ],
    outOfScope: [
      "Technische Umsetzung",
      "Detaillierte Implementierungsplanung"
    ],
    parameters: ["companySize", "speed", "deployment", "securityLevel"]
  },

  // Data Operations
  {
    key: "bi_factory",
    family: "Data Operations",
    name: "BI Factory",
    shortDescription: "Skalierbare Prozesse für die Erstellung von BI-Lösungen. Schnellere Entwicklung, höhere Qualität.",
    longDescription: "Wir richten eine BI Factory ein: standardisierte Prozesse, wiederverwendbare Komponenten und automatisierte Qualitätssicherung. Mit diesem Ansatz können Sie BI-Lösungen schneller entwickeln, bei höherer Qualität und konsistenten Standards.",
    basePrice: 21900,
    active: true,
    tags: {
      type: ["setup", "build"],
      maturity: ["stabilize", "scale"],
      impact: ["performance", "adoption"],
      coverage: ["bi_layer", "operations"]
    },
    estimatedDuration: "15–20 Tage",
    deliverablesOutput: [
      "Standardisierte Entwicklungsprozesse",
      "Bibliothek wiederverwendbarer Komponenten",
      "Automatisierte Qualitätssicherung",
      "Schulungen für Entwicklungsteam",
      "Dokumentation und Best Practices"
    ],
    assumptions: [
      "BI-Team ist vorhanden",
      "Grundlegende BI-Infrastruktur ist vorhanden"
    ],
    outOfScope: [
      "BI-Infrastruktur Setup",
      "Individuelle Beratung pro Entwickler"
    ],
    parameters: ["companySize", "speed", "reportComplexity"]
  },
  {
    key: "monitoring_ops",
    family: "Data Operations",
    name: "Monitoring & Betrieb",
    shortDescription: "Proaktives Monitoring Ihrer Datenplattform und Analytics-Lösungen im laufenden Betrieb.",
    longDescription: "Wir richten ein umfassendes Monitoring-System für Ihre Dateninfrastruktur ein. Mit automatisierten Checks, Alarmen und Dashboards erkennen Sie Probleme frühzeitig und können proaktiv reagieren. Höhere Verfügbarkeit, weniger Ausfälle.",
    basePrice: 16900,
    active: true,
    tags: {
      type: ["setup", "run"],
      maturity: ["stabilize", "scale"],
      impact: ["performance"],
      coverage: ["operations"]
    },
    estimatedDuration: "10–15 Tage",
    deliverablesOutput: [
      "Konfiguriertes Monitoring-System",
      "Dashboard mit System- und Datenqualitäts-Metriken",
      "Automatische Alarme bei Problemen",
      "Dokumentation und Runbooks",
      "Schulung für Operations-Team"
    ],
    assumptions: [
      "Dateninfrastruktur ist bereits vorhanden",
      "Operations-Team ist verfügbar"
    ],
    outOfScope: [
      "Infrastruktur-Setup",
      "24/7 Support (gegen Aufpreis möglich)"
    ],
    parameters: ["companySize", "speed", "securityLevel", "deployment"]
  },
  {
    key: "retainer",
    family: "Data Operations",
    name: "Data Operations Retainer",
    shortDescription: "Laufende Unterstützung für Ihre Dateninfrastruktur. Kontinuierliche Optimierung und schnelle Reaktion auf Probleme.",
    longDescription: "Mit einem Data Operations Retainer erhalten Sie laufende Unterstützung für Ihre Dateninfrastruktur. Wir optimieren kontinuierlich, reagieren schnell auf Probleme und helfen bei der Weiterentwicklung. Ideal für Unternehmen, die keine eigene Data Operations Abteilung haben.",
    basePrice: 12900,
    active: true,
    tags: {
      type: ["run"],
      maturity: ["stabilize", "scale"],
      impact: ["performance"],
      coverage: ["operations"]
    },
    estimatedDuration: "Laufend",
    deliverablesOutput: [
      "Regelmäßige Reviews und Optimierungen",
      "Schnelle Reaktion auf Probleme (SLA)",
      "Unterstützung bei Weiterentwicklung",
      "Monatliche Reports und Empfehlungen",
      "Zugang zu Experten-Wissen"
    ],
    assumptions: [
      "Dateninfrastruktur ist bereits vorhanden",
      "Grundlegende Dokumentation ist vorhanden"
    ],
    outOfScope: [
      "Große Neuentwicklungen",
      "24/7 Support (gegen Aufpreis möglich)"
    ],
    parameters: ["companySize", "speed"]
  },

  // ========== PHASE 4 ERWEITERT – NEUE PRODUKTBAUSTEINE ==========

  {
    key: "api_integration",
    family: "Data Architecture",
    name: "API- & Schnittstellenentwicklung",
    shortDescription: "Entwicklung und Anbindung von APIs und Schnittstellen zwischen Systemen. Stabile Datenflüsse für Automatisierung und Integration.",
    longDescription: "Wir entwickeln und implementieren APIs und Schnittstellen zwischen Ihren Geschäftssystemen – z. B. ERP, CRM, Helpdesk oder Fachanwendungen. Sie erhalten dokumentierte, wartbare Integrationen als Grundlage für Automatisierung, BI und KI-Use-Cases.",
    basePrice: 15900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["stabilize", "scale"],
      impact: ["foundation", "performance"],
      coverage: ["data_layer", "operations"]
    },
    estimatedDuration: "8–12 Tage",
    deliverablesOutput: [
      "Implementierte API- oder Schnittstellenanbindung (1–2 Kernintegrationen)",
      "Technische Dokumentation und Fehlerbehandlung",
      "Test- und Abnahmekonzept",
      "Empfehlungen für Monitoring und Weiterentwicklung",
      "Übergabe an Ihr IT- oder Betriebsteam"
    ],
    assumptions: [
      "Zugang zu beteiligten Systemen und Testumgebungen",
      "Ansprechpartner für Fachlogik und Freigaben sind verfügbar"
    ],
    outOfScope: [
      "Umfangreiche Legacy-Migration",
      "24/7 Betrieb nach Go-Live",
      "Mehr als zwei komplexe End-to-End-Integrationen ohne Zusatzscope"
    ],
    parameters: ["companySize", "speed", "sourceSystemCount", "securityLevel"]
  },
  {
    key: "data_modeling",
    family: "Data Architecture",
    name: "Datenmodellierung",
    shortDescription: "Strukturiertes Datenmodell für Reporting, Analytics und zentrale Datenablage. Konsistente Semantik über Systeme hinweg.",
    longDescription: "Wir modellieren Ihre Kerndatenbereiche – z. B. Vertrieb, Finanzen oder Stammdaten – in einem belastbaren logischen und technischen Datenmodell. Das Modell bildet die Basis für DWH, BI, Self-Service und spätere KI-Anwendungen.",
    basePrice: 12900,
    active: true,
    tags: {
      type: ["build", "blueprint"],
      maturity: ["start", "stabilize"],
      impact: ["foundation"],
      coverage: ["data_layer", "semantic_layer"]
    },
    estimatedDuration: "6–10 Tage",
    deliverablesOutput: [
      "Logisches und technisches Datenmodell für definierte Kernbereiche",
      "Entity-Relationship-Dokumentation",
      "Benennungs- und Modellierungsstandards",
      "Abstimmung mit Fachbereich und IT",
      "Empfehlungen für nächste Ausbaustufen"
    ],
    assumptions: [
      "Relevante Datenquellen sind bekannt oder werden parallel analysiert",
      "Fachliche Ansprechpartner für Modell-Reviews sind verfügbar"
    ],
    outOfScope: [
      "Vollständige DWH-Implementierung",
      "Historisierung und komplexe ETL-Entwicklung",
      "Stammdatenbereinigung in Quellsystemen"
    ],
    parameters: ["companySize", "speed", "sourceSystemCount"]
  },
  {
    key: "data_migration",
    family: "Data Architecture",
    name: "Datenmigration",
    shortDescription: "Geplante Migration von Daten in neue Systeme oder Plattformen. Strukturiert, nachvollziehbar und mit Qualitätssicherung.",
    longDescription: "Wir migrieren Ihre Daten kontrolliert in Zielsysteme – z. B. beim Wechsel von Excel zu BI, DWH-Aufbau oder Systemkonsolidierung. Mit Migrationsplan, Mapping, Testläufen und Abnahme stellen wir sicher, dass Ihre Daten im Ziel belastbar ankommen.",
    basePrice: 14900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["stabilize"],
      impact: ["foundation", "performance"],
      coverage: ["data_layer"]
    },
    estimatedDuration: "8–15 Tage",
    deliverablesOutput: [
      "Migrationsplan mit Mapping und Schnittstellenlogik",
      "Testmigration und Validierungsergebnisse",
      "Produktive Migration der vereinbarten Datenbereiche",
      "Rollback- und Abnahmedokumentation",
      "Übergabe an Betrieb oder Weiterentwicklungsteam"
    ],
    assumptions: [
      "Quell- und Zielsysteme sind zugänglich",
      "Migrationsumfang ist vor Start abgestimmt"
    ],
    outOfScope: [
      "Unbegrenzte historische Vollmigration ohne Scope-Freeze",
      "Anwendungsentwicklung im Zielsystem",
      "Paralleler 24/7-Betrieb während der Migration"
    ],
    parameters: ["companySize", "speed", "sourceSystemCount", "dataSources"]
  },
  {
    key: "data_quality",
    family: "Data Architecture",
    name: "Datenbereinigung & Validierung",
    shortDescription: "Systematische Bereinigung und Validierung Ihrer Daten. Höhere Datenqualität für Reporting, Stammdaten und Automatisierung.",
    longDescription: "Wir analysieren Datenqualitätsprobleme, bereinigen kritische Datenbestände und richten Validierungsregeln ein. Ideal vor DWH-/MDM-Projekten, BI-Rollouts oder Automatisierungsinitiativen, wenn belastbare Daten die Grundlage sein müssen.",
    basePrice: 11900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["start", "stabilize"],
      impact: ["foundation", "performance"],
      coverage: ["data_layer", "semantic_layer"]
    },
    estimatedDuration: "6–10 Tage",
    deliverablesOutput: [
      "Datenqualitätsanalyse mit priorisierten Befunden",
      "Bereinigung definierter Datenbereiche",
      "Validierungsregeln und Qualitätskennzahlen",
      "Dokumentation der Regeln und Verantwortlichkeiten",
      "Empfehlungen für dauerhafte Datenqualitätssicherung"
    ],
    assumptions: [
      "Zugriff auf relevante Quell- und Zieldaten",
      "Fachliche Entscheidungen zu Dubletten und Ausnahmen sind zeitnah möglich"
    ],
    outOfScope: [
      "Dauerhafte MDM-Plattform als Vollprojekt",
      "Manuelle Pflege aller historischen Datensätze ohne Priorisierung",
      "Vollautomatische Stammdaten-Governance ohne Prozessdesign"
    ],
    parameters: ["companySize", "speed", "dataSources"]
  },
  {
    key: "automation_pilot",
    family: "Data Operations",
    name: "Automatisierungs-Pilot",
    shortDescription: "Kompakter Proof of Concept für Prozessautomatisierung. Schnell validieren, ob Automatisierung sich lohnt – ohne BI-Zwang.",
    longDescription: "In einem fokussierten Pilot automatisieren wir einen klar abgegrenzten Geschäftsprozess – z. B. Rechnungseingang, Bestellfreigabe oder Ticket-Routing. Sie erhalten einen funktionsfähigen PoC mit Messgrößen und einer Empfehlung für Skalierung oder Produktivbetrieb.",
    basePrice: 9900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["start"],
      impact: ["quickwin", "performance"],
      coverage: ["operations"]
    },
    estimatedDuration: "5–8 Tage",
    deliverablesOutput: [
      "Abgestimmter Pilot-Scope und Erfolgskriterien",
      "Funktionsfähiger Automatisierungs-PoC",
      "Dokumentation der Prozesslogik",
      "Messgrößen zu Durchlaufzeit, Fehlerquote oder Entlastung",
      "Empfehlung für Rollout oder nächste Ausbaustufe"
    ],
    assumptions: [
      "Ein klar abgrenzbarer Prozess ist vorhanden",
      "Systemzugänge und Testdaten stehen zur Verfügung"
    ],
    outOfScope: [
      "Unternehmensweite Prozessautomatisierung",
      "Komplexe KI-Modelle im Pilot ohne separaten Scope",
      "Langfristiger Betrieb nach Pilotende"
    ],
    parameters: ["companySize", "speed", "sourceSystemCount"]
  },
  {
    key: "rag_foundation",
    family: "AI & Data Science",
    name: "RAG-Grundlagen-Setup",
    shortDescription: "Aufbau einer Retrieval-Augmented-Generation-Basis für Wissensrecherche und interne Assistenzsysteme.",
    longDescription: "Wir richten eine belastbare RAG-Grundlage ein: Dokumentenaufbereitung, Wissensindex, Retrieval-Pipeline und erste Assistenzfunktion. Ideal für Literaturrecherche, internes Wissensmanagement oder fachliche Q&A-Assistenten.",
    basePrice: 16900,
    active: true,
    tags: {
      type: ["setup", "build"],
      maturity: ["start", "stabilize"],
      impact: ["foundation", "adoption"],
      coverage: ["semantic_layer", "operations"]
    },
    estimatedDuration: "8–12 Tage",
    deliverablesOutput: [
      "Aufbereitete Wissensbasis und Indexierung",
      "RAG-Pipeline mit konfigurierbarem Retrieval",
      "Erster fachlicher Assistenz-Use-Case",
      "Qualitäts- und Halluzinations-Checks",
      "Betriebs- und Erweiterungsempfehlungen"
    ],
    assumptions: [
      "Relevante Dokumente und Wissensquellen sind verfügbar",
      "Datenschutz- und Zugriffsanforderungen sind geklärt"
    ],
    outOfScope: [
      "Unternehmensweites Wissensmanagement ohne Scope",
      "Vollständige Integration in alle Fachsysteme",
      "24/7 Managed Service für LLM-Betrieb"
    ],
    parameters: ["companySize", "speed", "securityLevel", "dataSources"]
  },
  {
    key: "ai_agent_dev",
    family: "AI & Data Science",
    name: "AI-Agent Entwicklung",
    shortDescription: "Entwicklung eines fokussierten KI-Agenten für klar definierte Aufgaben – z. B. Coding, Recherche oder Prozessunterstützung.",
    longDescription: "Wir entwickeln einen KI-Agenten für einen abgegrenzten Use-Case mit klaren Leitplanken, Tool-Anbindungen und Qualitätschecks. Der Agent ist auf Ihre Daten, Systeme und Governance-Anforderungen zugeschnitten – nicht als generische Demo, sondern als belastbarer Prototyp oder erste Produktivversion.",
    basePrice: 19900,
    active: true,
    tags: {
      type: ["build"],
      maturity: ["stabilize", "scale"],
      impact: ["performance", "adoption"],
      coverage: ["operations", "semantic_layer"]
    },
    estimatedDuration: "10–15 Tage",
    deliverablesOutput: [
      "Definierter Agenten-Use-Case und Leitplanken",
      "Implementierter KI-Agent mit Tool-/Schnittstellenanbindung",
      "Testfälle und Qualitätsmetriken",
      "Dokumentation für Betrieb und Weiterentwicklung",
      "Empfehlung für Skalierung oder Produktivbetrieb"
    ],
    assumptions: [
      "Use-Case und Erfolgskriterien sind vor Projektstart abgestimmt",
      "Benötigte Schnittstellen und Datenquellen sind zugänglich"
    ],
    outOfScope: [
      "Unkontrollierte Agenten-Autonomie ohne Governance",
      "Vollständige Unternehmens-Rollout-Automatisierung",
      "Langfristiger Managed Agent-Betrieb ohne Retainer"
    ],
    parameters: ["companySize", "speed", "securityLevel", "sourceSystemCount"]
  },
  {
    key: "ai_review",
    family: "AI & Data Science",
    name: "AI Review & Qualitätskontrolle",
    shortDescription: "Unabhängige Prüfung von KI-Modellen, Architektur und Betriebsreife. Risiken erkennen, Qualität absichern.",
    longDescription: "Wir prüfen bestehende oder geplante KI-Lösungen auf Modellqualität, Datenbasis, Governance, Sicherheit und Betriebsfähigkeit. Sie erhalten eine strukturierte Bewertung mit priorisierten Maßnahmen – ideal vor Go-Live, nach Piloten oder bei Architekturentscheidungen.",
    basePrice: 9900,
    active: true,
    tags: {
      type: ["workshop", "blueprint"],
      maturity: ["stabilize", "scale"],
      impact: ["compliance", "performance"],
      coverage: ["operations", "semantic_layer"]
    },
    estimatedDuration: "4–6 Tage",
    deliverablesOutput: [
      "Review-Bericht mit Befunden und Risikoeinstufung",
      "Bewertung von Daten, Modell und Architektur",
      "Governance- und Sicherheitsempfehlungen",
      "Priorisierte Maßnahmenliste",
      "Management-Präsentation der Ergebnisse"
    ],
    assumptions: [
      "Zugang zu Modell, Dokumentation und relevanten Stakeholdern",
      "Projektziele und Rahmenbedingungen sind bekannt"
    ],
    outOfScope: [
      "Vollständige Modell-Neuentwicklung",
      "Penetrationstests oder formale Zertifizierung",
      "Dauerhafter Modellbetrieb"
    ],
    parameters: ["companySize", "speed", "securityLevel"]
  },
  {
    key: "maturity_assessment",
    family: "Data Strategy",
    name: "Data & Analytics Maturity Assessment",
    shortDescription: "Strukturierte Reifegradanalyse für Daten, Analytics und KI. Klarheit über Stärken, Lücken und nächste Schritte.",
    longDescription: "Wir bewerten Ihre Data-&-Analytics-Reife entlang definierter Dimensionen – z. B. Strategie, Governance, Architektur, Analytics und KI. Sie erhalten einen belastbaren Reifegradbericht mit Handlungsfeldern und priorisierten Empfehlungen.",
    basePrice: 12900,
    active: true,
    tags: {
      type: ["workshop", "blueprint"],
      maturity: ["start"],
      impact: ["foundation", "performance"],
      coverage: ["operations"]
    },
    estimatedDuration: "5–7 Tage",
    deliverablesOutput: [
      "Reifegradmodell und Bewertungsmatrix",
      "Analyseergebnis je Dimension",
      "Heatmap und Gap-Analyse",
      "Priorisierte Maßnahmenempfehlungen",
      "Management-Präsentation"
    ],
    assumptions: [
      "Interviews mit Fach-, IT- und Management-Stakeholdern sind möglich",
      "Grundlegende Informationen zur Ist-Situation sind verfügbar"
    ],
    outOfScope: [
      "Vollständige technische Umsetzung der Empfehlungen",
      "Externe Audits oder Zertifizierungen",
      "Strategieentwicklung ohne separaten Sprint"
    ],
    parameters: ["companySize", "speed"]
  },
  {
    key: "compliance_package",
    family: "Governance & Culture",
    name: "Compliance-Paket",
    shortDescription: "Gebündeltes Paket für regulatorische Anforderungen – Governance, Kennzahlen und Umsetzungsroadmap.",
    longDescription: "Wir strukturieren Ihre Compliance-Anforderungen – z. B. NIS2, ISMS oder branchenspezifische Vorgaben – in ein umsetzbares Paket aus Governance-Rahmen, KPIs und priorisierten Maßnahmen. Ideal als Einstieg, wenn Reporting und Verantwortlichkeiten noch nicht klar sind.",
    basePrice: 14900,
    active: true,
    tags: {
      type: ["blueprint", "setup"],
      maturity: ["start", "stabilize"],
      impact: ["compliance", "foundation"],
      coverage: ["operations"]
    },
    estimatedDuration: "6–9 Tage",
    deliverablesOutput: [
      "Compliance-Gap-Analyse",
      "Governance- und Verantwortlichkeitsrahmen",
      "KPI-Set für Compliance-Steuerung",
      "Priorisierte Maßnahmen- und Umsetzungsplan",
      "Management-Präsentation"
    ],
    assumptions: [
      "Relevante regulatorische Anforderungen sind benannt",
      "Ansprechpartner aus IT, Security und Fachbereich sind verfügbar"
    ],
    outOfScope: [
      "Formale Zertifizierung oder Audit-Begleitung",
      "Technische Vollimplementierung aller Controls",
      "Externe Rechtsberatung"
    ],
    parameters: ["companySize", "speed", "securityLevel"]
  },
  {
    key: "privacy_package",
    family: "Governance & Culture",
    name: "Datenschutzpaket (DSGVO)",
    shortDescription: "Praxisnahes DSGVO-Paket mit Governance, Dateninventar und Maßnahmenplan. Fundament für datenschutzkonforme Datenarbeit.",
    longDescription: "Wir erstellen ein umsetzbares Datenschutzpaket für Ihre Daten- und Analytics-Initiativen: Verarbeitungsübersicht, Rollen, Governance-Strukturen und priorisierte Maßnahmen. Das Paket schafft die Basis für DSGVO-konforme BI-, KI- und Automatisierungsprojekte.",
    basePrice: 13900,
    active: true,
    tags: {
      type: ["blueprint", "setup"],
      maturity: ["start", "stabilize"],
      impact: ["compliance", "foundation"],
      coverage: ["operations"]
    },
    estimatedDuration: "6–9 Tage",
    deliverablesOutput: [
      "Datenschutz-Governance-Rahmen",
      "Übersicht relevanter Verarbeitungstätigkeiten",
      "Rollen- und Verantwortlichkeitsmodell",
      "Maßnahmenplan mit Prioritäten",
      "Abstimmung mit Datenschutzbeauftragtem / Management"
    ],
    assumptions: [
      "Grundlegende Informationen zu Systemen und Datenflüssen sind verfügbar",
      "Datenschutzbeauftragter oder Verantwortlicher ist einbindbar"
    ],
    outOfScope: [
      "Rechtsverbindliche Datenschutzberatung",
      "Vollständige TOM-Implementierung in allen Systemen",
      "Externe Audits durch Aufsichtsbehörden"
    ],
    parameters: ["companySize", "speed", "securityLevel"]
  },
  {
    key: "architecture_workshop",
    family: "Enterprise Architecture",
    name: "Architektur-Workshop",
    shortDescription: "Kompakter Workshop für Architekturentscheidungen. Schnelle Klarheit über Zielbild, Optionen und nächste Schritte.",
    longDescription: "In einem fokussierten Architektur-Workshop klären wir Ihr Zielbild, bewerten Optionen und leiten konkrete nächste Schritte ab – z. B. für Datenplattform, Integration, KI-Infrastruktur oder Data Mesh. Kürzer und operativer als ein vollständiges Target-Architecture-Projekt.",
    basePrice: 8900,
    active: true,
    tags: {
      type: ["workshop", "blueprint"],
      maturity: ["start"],
      impact: ["foundation", "quickwin"],
      coverage: ["data_layer", "operations"]
    },
    estimatedDuration: "2–4 Tage",
    deliverablesOutput: [
      "Workshop-Ergebnisdokument mit Architekturoptionen",
      "Bewertung von Vor- und Nachteilen",
      "Empfohlene Zielrichtung",
      "Nächste Schritte und Abhängigkeiten",
      "Präsentation für IT und Management"
    ],
    assumptions: [
      "Relevante Stakeholder aus IT und Fachbereich nehmen teil",
      "Grundlegende Ist-Informationen liegen vor oder werden im Workshop erhoben"
    ],
    outOfScope: [
      "Detaillierte Migrationsplanung",
      "Technische Implementierung",
      "Umfangreiche Tool-Auswahlstudien ohne Vorarbeit"
    ],
    parameters: ["companySize", "speed", "deployment"]
  },

  // ========== PHASE 4b – MODULARE PRODUKTPAKETE ==========

  {
    key: "etl_pipeline",
    family: "Data Architecture",
    name: "ETL/ELT Pipeline Setup",
    shortDescription: "Aufbau stabiler Datenpipelines für regelmäßige Datenaktualisierung. Brücke zwischen Quellen, DWH und BI.",
    longDescription: "Wir implementieren ETL- oder ELT-Pipelines für Ihre Kernprozesse – von der Quelle bis zur konsumierbaren Datenschicht. Die Pipelines sind dokumentiert, überwachbar und erweiterbar. Ideal als Baustein zwischen Integrationsanalyse, DWH und Reporting.",
    basePrice: 17900,
    active: true,
    tags: {
      type: ["build", "setup"],
      maturity: ["stabilize"],
      impact: ["foundation", "performance"],
      coverage: ["data_layer", "operations"]
    },
    estimatedDuration: "10–14 Tage",
    deliverablesOutput: [
      "Implementierte Pipelines für vereinbarte Datenbereiche",
      "Fehlerbehandlung und Wiederanlaufkonzept",
      "Dokumentation der Datenflüsse und Abhängigkeiten",
      "Monitoring-Hooks für DataOps",
      "Übergabe an Betrieb oder Weiterentwicklungsteam"
    ],
    assumptions: [
      "Quell- und Zielsysteme sind definiert und zugänglich",
      "Datenmodell oder Integrationskonzept liegt vor oder wird parallel erstellt"
    ],
    outOfScope: [
      "Unbegrenzte Pipeline-Anzahl ohne Scope-Freeze",
      "Komplexe Streaming-Architekturen ohne Vorarbeit",
      "24/7 Managed Operations ohne Retainer"
    ],
    parameters: ["companySize", "speed", "sourceSystemCount", "deployment"]
  },
  {
    key: "process_discovery",
    family: "Data Operations",
    name: "Prozessanalyse Workshop",
    shortDescription: "Strukturierte Analyse eines Geschäftsprozesses vor Automatisierung oder Optimierung. Klarer Scope, messbare Hebel.",
    longDescription: "Wir analysieren einen fokussierten Geschäftsprozess gemeinsam mit Fachbereich und IT: Ist-Ablauf, Medienbrüche, Datenquellen und Automatisierungspotenzial. Das Ergebnis ist ein belastbarer Umsetzungs-Scope – ideal vor Automatisierungs-Pilot oder Rollout.",
    basePrice: 7900,
    active: true,
    tags: {
      type: ["workshop", "blueprint"],
      maturity: ["start"],
      impact: ["quickwin", "foundation"],
      coverage: ["operations"]
    },
    estimatedDuration: "2–4 Tage",
    deliverablesOutput: [
      "Prozesslandkarte und Schwachstellenanalyse",
      "Daten- und Systembezug je Prozessschritt",
      "Automatisierungs- und Integrationshebel",
      "Priorisierte Empfehlungen und Aufwandseinschätzung",
      "Workshop-Dokumentation für Entscheider"
    ],
    assumptions: [
      "Fachliche Prozessverantwortliche nehmen am Workshop teil",
      "Ein klar abgrenzbarer Prozess ist vorgegeben"
    ],
    outOfScope: [
      "Technische Implementierung im Workshop",
      "Organisationsweite Prozessreorganisation",
      "Vollständige BPM-Modellierung aller Nebenprozesse"
    ],
    parameters: ["companySize", "speed"]
  },
  {
    key: "automation_rollout",
    family: "Data Operations",
    name: "Automatisierungs-Rollout",
    shortDescription: "Skalierung eines validierten Automatisierungs-PoC in den produktiven Betrieb. Stabil, dokumentiert, überwachbar.",
    longDescription: "Nach einem erfolgreichen Pilot überführen wir die Automatisierung in den Regelbetrieb: Produktivierung, Fehlerpfade, Freigaben und Monitoring. Der Baustein schließt an Automatisierungs-Pilot und API-Integration an.",
    basePrice: 14900,
    active: true,
    tags: {
      type: ["build", "run"],
      maturity: ["stabilize", "scale"],
      impact: ["performance", "adoption"],
      coverage: ["operations"]
    },
    estimatedDuration: "8–12 Tage",
    deliverablesOutput: [
      "Produktive Automatisierung mit Abnahme",
      "Betriebs- und Eskalationshandbuch",
      "Monitoring und Alerting für kritische Fehlerpfade",
      "Übergabe an Fachbereich und IT-Betrieb",
      "Empfehlungen für nächste Automatisierungsschritte"
    ],
    assumptions: [
      "Erfolgreicher Pilot oder klar dokumentierter Scope liegt vor",
      "Produktivumgebungen und Freigaben sind verfügbar"
    ],
    outOfScope: [
      "Pilot ohne vorherige Validierung",
      "Parallele Automatisierung weiterer Prozesse ohne Zusatzscope",
      "Langfristiger 24/7-Support ohne Retainer"
    ],
    parameters: ["companySize", "speed", "sourceSystemCount"]
  },
  {
    key: "semantic_layer",
    family: "BI & Analytics",
    name: "Semantic Layer & Kennzahlenmodell",
    shortDescription: "Einheitliches Kennzahlen- und Semantikmodell für BI und Self-Service. Eine Wahrheit, viele Reports.",
    longDescription: "Wir bauen einen Semantic Layer auf Ihrer Datenbasis: zentrale Metriken, Dimensionen und Berechnungslogik. Damit werden Reports konsistent, Wartung einfacher und Self-Service belastbar – der natürliche Baustein nach KPI-Workshop und vor Management-Reports.",
    basePrice: 11900,
    active: true,
    tags: {
      type: ["build", "blueprint"],
      maturity: ["stabilize"],
      impact: ["foundation", "adoption"],
      coverage: ["semantic_layer", "bi_layer"]
    },
    estimatedDuration: "6–10 Tage",
    deliverablesOutput: [
      "Semantikmodell mit Kernkennzahlen und Dimensionen",
      "Dokumentierte Berechnungslogik",
      "Anbindung an BI-/Reporting-Schicht",
      "Naming- und Pflegestandards",
      "Empfehlungen für Self-Service und Erweiterung"
    ],
    assumptions: [
      "KPIs sind definiert oder werden parallel im Workshop erarbeitet",
      "Datenquelle oder DWH/BI-Basis ist vorhanden oder wird parallel aufgebaut"
    ],
    outOfScope: [
      "Vollständiges DWH-Projekt",
      "Unternehmensweite Harmonisierung aller historischen Reports ohne Priorisierung",
      "Komplexe ML-Features im Semantic Layer"
    ],
    parameters: ["companySize", "speed", "reportComplexity"]
  },
  {
    key: "self_service_enablement",
    family: "Data Knowledge",
    name: "Self-Service BI Enablement",
    shortDescription: "Befähigung von Fachbereichen zu eigenständigem Reporting. Governance, Templates und Schulung im Paket.",
    longDescription: "Wir etablieren Self-Service BI für Ihre Fachbereiche: Berechtigungsmodell, Report-Templates, Kurzschulung und Leitplanken. Der Baustein ergänzt BI-Setup und Semantic Layer – für nachhaltige Adoption statt Einzelberichte.",
    basePrice: 8900,
    active: true,
    tags: {
      type: ["enablement", "setup"],
      maturity: ["stabilize"],
      impact: ["adoption"],
      coverage: ["bi_layer", "semantic_layer"]
    },
    estimatedDuration: "4–6 Tage",
    deliverablesOutput: [
      "Self-Service-Rahmen mit Rollen und Leitplanken",
      "Template-Bibliothek für Fachbereichsreports",
      "Kurzschulung für Key User (halber bis ganzer Tag)",
      "Pflege- und Freigabeprozess",
      "Dokumentation für IT und Fachbereich"
    ],
    assumptions: [
      "Power BI oder vergleichbare Plattform ist im Einsatz",
      "Key User aus Fachbereichen sind benannt"
    ],
    outOfScope: [
      "BI-Grundinstallation",
      "Umfangreiche Entwickler-Schulung",
      "Individuelle Beratung pro Key User über den Rahmen hinaus"
    ],
    parameters: ["companySize", "speed", "trainingParticipants"]
  },
  {
    key: "ai_use_case_sprint",
    family: "Data Strategy",
    name: "KI Use-Case Sprint",
    shortDescription: "Priorisierung und Konkretisierung von KI-Use-Cases. Von der Idee zum umsetzbaren ersten Schritt.",
    longDescription: "In einem kompakten Sprint identifizieren und priorisieren wir KI-Use-Cases mit Business Value, Datenverfügbarkeit und Umsetzbarkeit. Sie erhalten eine belastbare Shortlist und Empfehlungen für Pilot, Agent, RAG oder Modellprojekt.",
    basePrice: 10900,
    active: true,
    tags: {
      type: ["workshop", "blueprint"],
      maturity: ["start"],
      impact: ["foundation", "quickwin"],
      coverage: ["operations", "semantic_layer"]
    },
    estimatedDuration: "3–5 Tage",
    deliverablesOutput: [
      "Longlist und priorisierte Shortlist von KI-Use-Cases",
      "Bewertung nach Nutzen, Daten und Machbarkeit",
      "Empfohlene Umsetzungsbausteine pro Use-Case",
      "Grobe Roadmap für die nächsten 6–12 Monate",
      "Management-Präsentation"
    ],
    assumptions: [
      "Fach- und IT-Stakeholder sind für Workshops verfügbar",
      "Grundlegende Geschäftsziele sind bekannt"
    ],
    outOfScope: [
      "Technische Modellentwicklung im Sprint",
      "Vollständige KI-Strategie ohne separaten Sprint",
      "Produktive Implementierung"
    ],
    parameters: ["companySize", "speed"]
  },
  {
    key: "change_enablement",
    family: "Governance & Culture",
    name: "Change & Adoption Begleitung",
    shortDescription: "Begleitung von Daten-, BI- und KI-Initiativen bei Menschen und Organisation. Adoption sicherstellen.",
    longDescription: "Wir begleiten die organisatorische Seite Ihrer Dateninitiative: Stakeholder, Kommunikation, Rollenklärung und Adoption-Maßnahmen. Ideal ergänzend zu Strategie-, Leadership- und Technikbausteinen – damit Projekte im Alltag ankommen.",
    basePrice: 9900,
    active: true,
    tags: {
      type: ["workshop", "enablement"],
      maturity: ["start", "stabilize"],
      impact: ["adoption", "foundation"],
      coverage: ["operations"]
    },
    estimatedDuration: "4–6 Tage",
    deliverablesOutput: [
      "Stakeholder- und Kommunikationsplan",
      "Rollen- und Verantwortlichkeitsklärung für Adoption",
      "Maßnahmenplan für Schulung und Kommunikation",
      "Erfolgskriterien für Adoption",
      "Begleitung der ersten Management- und Team-Sessions"
    ],
    assumptions: [
      "Sponsorship aus Geschäftsführung oder Bereichsleitung ist vorhanden",
      "Projektziele und Zeitrahmen sind definiert"
    ],
    outOfScope: [
      "Klassisches Projektmanagement der Technikumsetzung",
      "HR-Organisationsentwicklung ohne Datenbezug",
      "Dauerhaftes Change-Management über 3 Monate ohne Retainer"
    ],
    parameters: ["companySize", "speed"]
  },
  {
    key: "data_catalog_setup",
    family: "Data Architecture",
    name: "Data Catalog Einrichtung",
    shortDescription: "Technisches und fachliches Setup eines Data Catalogs – Metadaten, Ownership und Auffindbarkeit.",
    longDescription: "Wir richten einen Data Catalog für Ihre wichtigsten Datenobjekte ein: Metadaten, Ownership, Glossar-Anbindung und Suchfunktion. Der Baustein vervollständigt Governance- und Glossar-Arbeit zu einem nutzbaren Katalog-Produkt.",
    basePrice: 14900,
    active: true,
    tags: {
      type: ["setup", "build"],
      maturity: ["stabilize"],
      impact: ["foundation", "adoption"],
      coverage: ["semantic_layer", "operations"]
    },
    estimatedDuration: "8–12 Tage",
    deliverablesOutput: [
      "Konfigurierter Data Catalog für Kern-Datenobjekte",
      "Metadaten- und Ownership-Struktur",
      "Anbindung an Glossar und Datenquellen",
      "Such- und Navigationskonzept",
      "Schulung für Data Stewards und Nutzer"
    ],
    assumptions: [
      "Governance-Rollen oder Glossar-Basis liegen vor oder werden parallel aufgebaut",
      "Relevante Datenquellen sind identifiziert"
    ],
    outOfScope: [
      "Enterprise-weite Vollabdeckung aller Systeme ohne Priorisierung",
      "Kommerzielle Tool-Lizenzbeschaffung",
      "Vollautomatische Lineage für alle Legacy-Systeme"
    ],
    parameters: ["companySize", "speed", "sourceSystemCount"]
  },
  {
    key: "security_access_review",
    family: "Governance & Culture",
    name: "Security & Access Review",
    shortDescription: "Prüfung von Zugriffen, Berechtigungen und Sicherheitsrisiken in der Datenlandschaft.",
    longDescription: "Wir prüfen Zugriffswege, Berechtigungsmodelle und Sicherheitsrisiken rund um Ihre Datenplattform und Fachsysteme. Das Ergebnis ist ein priorisierter Maßnahmenplan – ideal vor IAM-Rollout, Security-Dashboards oder Compliance-Paketen.",
    basePrice: 11900,
    active: true,
    tags: {
      type: ["workshop", "blueprint"],
      maturity: ["stabilize"],
      impact: ["compliance", "foundation"],
      coverage: ["operations"]
    },
    estimatedDuration: "5–7 Tage",
    deliverablesOutput: [
      "Review-Bericht zu Zugriffen und Berechtigungen",
      "Risikobewertung kritischer Datenpfade",
      "Empfehlungen für IAM- und Monitoring-Maßnahmen",
      "Priorisierte Maßnahmenliste",
      "Präsentation für IT-Security und Management"
    ],
    assumptions: [
      "Zugang zu relevanten Systemen, Rollenmodellen oder Dokumentation",
      "IT-Security oder verantwortliche Ansprechpartner sind einbindbar"
    ],
    outOfScope: [
      "Penetrationstest oder formale Zertifizierung",
      "Technische IAM-Vollimplementierung",
      "Forensische Incident-Analyse"
    ],
    parameters: ["companySize", "speed", "securityLevel"]
  },
  {
    key: "finops_review",
    family: "Data Operations",
    name: "FinOps Review",
    shortDescription: "Analyse von Cloud- und Plattformkosten mit konkreten Einspar- und Steuerungshebeln.",
    longDescription: "Wir analysieren Ihre Cloud- und Datenplattformkosten, identifizieren Treiber und leiten konkrete Optimierungsmaßnahmen ab. Der Baustein ist der Einstieg vor FinOps-Dashboards und laufendem Kostenmonitoring.",
    basePrice: 9900,
    active: true,
    tags: {
      type: ["workshop", "blueprint"],
      maturity: ["stabilize"],
      impact: ["performance", "quickwin"],
      coverage: ["operations"]
    },
    estimatedDuration: "4–6 Tage",
    deliverablesOutput: [
      "Kostenanalyse nach Services, Umgebungen und Treibern",
      "Quick-Wins und strukturelle Optimierungshebel",
      "Empfehlungen für Tagging, Budgets und Verantwortlichkeiten",
      "KPI-Set für laufendes FinOps-Monitoring",
      "Management-Präsentation"
    ],
    assumptions: [
      "Zugriff auf Billing-, Cloud- oder Plattformkostendaten",
      "Ansprechpartner aus IT und Finance sind verfügbar"
    ],
    outOfScope: [
      "Verhandlung mit Cloud-Anbietern",
      "Technische Rightsizing-Umsetzung aller Ressourcen",
      "Dauerhaftes FinOps ohne Monitoring-Baustein"
    ],
    parameters: ["companySize", "speed", "deployment"]
  },
  {
    key: "dsb_retainer",
    family: "Governance & Culture",
    name: "Externer Datenschutzbeauftragter – Retainer",
    shortDescription:
      "Laufende Betreuung durch einen TÜV-zertifizierten externen Datenschutzbeauftragter auf monatlicher Retainer-Basis – ab ca. 500 € pro Monat, skalierbar nach Unternehmensgröße und Betreuungsintensität.",
    longDescription:
      "Ein TÜV-zertifizierter externer Datenschutzbeauftragter begleitet Ihr Unternehmen dauerhaft als Ansprechpartner für Datenschutzfragen. Im monatlichen Retainer sind Beratung, Abstimmung und definiertes Kontingent enthalten – keine einmalige Projektumsetzung, sondern laufende Unterstützung im operativen Datenschutzalltag. Bei Großunternehmen (1000+ MA) oder erhöhtem Bedarf ist eine individuelle Kalkulation erforderlich.",
    basePrice: 500,
    active: true,
    pricePeriod: "pro Monat",
    tags: {
      type: ["run"],
      maturity: ["stabilize", "scale"],
      impact: ["compliance"],
      coverage: ["operations"]
    },
    estimatedDuration: "Laufend (monatlicher Retainer)",
    deliverablesOutput: [
      "TÜV-zertifizierter externer Datenschutzbeauftragter",
      "Laufender Ansprechpartner für Datenschutzfragen",
      "Definiertes monatliches Beratungskontingent",
      "Regelmäßige Abstimmung",
      "Fachliche Unterstützung bei Datenschutzfragen",
      "Unterstützung bei Betroffenenanfragen",
      "Begleitung organisatorischer Datenschutzmaßnahmen",
      "Dokumentierte Handlungsempfehlungen"
    ],
    assumptions: [
      "Benannte interne Ansprechperson",
      "Zugang zu relevanten Informationen und Prozessen",
      "Klare Kommunikationswege"
    ],
    outOfScope: [
      "Umfassende Rechtsberatung außerhalb des Datenschutzkontexts",
      "Unbegrenztes Beratungskontingent",
      "Vollständige operative Umsetzung aller Maßnahmen",
      "Zusätzliche Audits oder Großprojekte ohne separate Beauftragung"
    ],
    parameters: ["companySize", "dsbCareIntensity", "dsbMonthlyQuota"]
  }
];

// Helper-Funktionen
export function getDeliverableById(key: string): Deliverable | undefined {
  return deliverables.find(d => d.key === key);
}

export function getDeliverablesByFamily(family: DeliverableFamily): Deliverable[] {
  return deliverables.filter(d => d.family === family);
}

export function getActiveDeliverables(): Deliverable[] {
  return deliverables.filter(d => d.active);
}

export function getComingSoonDeliverables(): Deliverable[] {
  return deliverables.filter(d => !d.active);
}
