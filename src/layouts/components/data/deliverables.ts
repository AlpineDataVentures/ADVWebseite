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
  id: string;
  family: DeliverableFamily;
  name: string;
  shortDescription: string;
  longDescription: string;
  basePrice?: number; // nur wenn active=true
  active: boolean; // MVP active nur für BI&Analytics, Data Architecture, Data Knowledge
  tags: {
    type: DeliverableTypeTag[];
    maturity: MaturityTag[];
    impact: ImpactTag[];
    coverage: CoverageTag[];
  };
  estimatedDuration: string;
  deliverablesOutput: string[];
  assumptions: string[];
  outOfScope: string[];
  parameters?: string[]; // nur wenn active=true
}

export const deliverables: Deliverable[] = [
  // ========== MVP ACTIVE DELIVERABLES ==========
  
  // BI & Analytics
  {
    id: "bi_setup",
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
    parameters: ["companySize", "speed", "deployment"]
  },
  {
    id: "kpi_ws",
    family: "BI & Analytics",
    name: "KPI Definition Workshop",
    shortDescription: "Gemeinsame Definition Ihrer wichtigsten Kennzahlen und Erfolgsmessung. Klarheit über das, was wirklich zählt.",
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
    id: "mgmt_report_1",
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
    parameters: ["companySize", "speed", "reportComplexity"]
  },
  {
    id: "reporting_standards",
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
    id: "dwh_starter",
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
    parameters: ["companySize", "speed", "dataSources", "deployment", "securityLevel"]
  },
  {
    id: "source_integration_review",
    family: "Data Architecture",
    name: "Datenquellen- & Integrationsanalyse",
    shortDescription: "Systematische Analyse Ihrer Datenquellen und Empfehlungen für Integration. Klarheit über Ihre Datenlandschaft.",
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
    id: "glossary_sprint",
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
    id: "pbi_training_user",
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
    id: "pbi_training_dev",
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
    id: "strategy_sprint",
    family: "Data Strategy",
    name: "Datenstrategie Sprint",
    shortDescription: "Entwicklung einer klaren Strategie für den Umgang mit Daten. Roadmap für die nächsten Jahre.",
    longDescription: "In einem intensiven Sprint entwickeln wir gemeinsam Ihre Datenstrategie. Wir analysieren Ihre Geschäftsziele, identifizieren Datenbedarfe und erstellen eine Roadmap für die nächsten Jahre. Sie erhalten ein klares Konzept, wie Daten Ihr Unternehmen voranbringen können.",
    active: false,
    tags: {
      type: ["workshop", "blueprint"],
      maturity: ["start"],
      impact: ["foundation", "scale"],
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
    ]
  },
  {
    id: "roadmap",
    family: "Data Strategy",
    name: "Daten-Roadmap",
    shortDescription: "Detaillierte Roadmap für Ihre Dateninitiativen. Klare Prioritäten und Meilensteine.",
    longDescription: "Wir erstellen eine detaillierte Roadmap für alle geplanten Dateninitiativen. Mit klaren Prioritäten, Meilensteinen und Abhängigkeiten können Sie Ihre Datenprojekte strukturiert angehen und Ressourcen optimal einsetzen.",
    active: false,
    tags: {
      type: ["blueprint"],
      maturity: ["start", "stabilize"],
      impact: ["foundation", "scale"],
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
    ]
  },

  // Governance & Culture
  {
    id: "governance_starter",
    family: "Governance & Culture",
    name: "Data Governance Starter",
    shortDescription: "Grundlegende Data Governance Struktur. Verantwortlichkeiten, Prozesse und Standards.",
    longDescription: "Wir richten eine grundlegende Data Governance Struktur ein: Rollen und Verantwortlichkeiten, Prozesse für Datenqualität und Standards für den Umgang mit Daten. Sie erhalten ein solides Fundament für den verantwortungsvollen Umgang mit Daten in Ihrem Unternehmen.",
    active: false,
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
    ]
  },
  {
    id: "iam_concept",
    family: "Governance & Culture",
    name: "IAM Konzept",
    shortDescription: "Konzept für Identity und Access Management. Sicherer und kontrollierter Zugriff auf Daten und Systeme.",
    longDescription: "Wir entwickeln ein Konzept für Identity und Access Management (IAM) in Ihrem Unternehmen. Mit klaren Rollen, Rechten und Prozessen stellen wir sicher, dass nur berechtigte Personen Zugriff auf die richtigen Daten haben.",
    active: false,
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
    ]
  },
  {
    id: "roles_rights_impl",
    family: "Governance & Culture",
    name: "Umsetzung von Rechte- & Rollenkonzepten",
    shortDescription: "Technische Umsetzung von Zugriffsrechten und Rollen. Sicherer Datenzugriff nach dem Prinzip der geringsten Rechte.",
    longDescription: "Wir setzen Ihr Rechte- und Rollenkonzept technisch um. Mit automatisierten Prozessen und klaren Regeln stellen wir sicher, dass jeder Mitarbeiter nur Zugriff auf die Daten hat, die er für seine Arbeit benötigt.",
    active: false,
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
    ]
  },

  // AI & Data Science
  {
    id: "forecast_model",
    family: "AI & Data Science",
    name: "Forecasting-Modell",
    shortDescription: "Vorhersagemodell für Ihre Geschäftskennzahlen. Realistischere Prognosen für Planung und Budgetierung.",
    longDescription: "Wir entwickeln ein Forecasting-Modell für Ihre wichtigsten Geschäftskennzahlen. Basierend auf historischen Daten und Trends können Sie realistischere Prognosen erstellen und bessere Entscheidungen treffen. Das Modell wird kontinuierlich verbessert und passt sich an neue Entwicklungen an.",
    active: false,
    tags: {
      type: ["build"],
      maturity: ["stabilize", "scale"],
      impact: ["insights", "performance"],
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
    ]
  },
  {
    id: "churn_model",
    family: "AI & Data Science",
    name: "Churn Prevention Modell",
    shortDescription: "Früherkennung von Kunden mit Abwanderungsrisiko. Rechtzeitige Maßnahmen zur Kundenbindung.",
    longDescription: "Wir entwickeln ein Machine Learning Modell zur Vorhersage von Kundenabwanderung. Basierend auf Verhaltensdaten und Transaktionshistorie identifiziert das Modell Kunden mit hohem Abwanderungsrisiko, sodass Sie rechtzeitig Maßnahmen zur Kundenbindung ergreifen können.",
    active: false,
    tags: {
      type: ["build"],
      maturity: ["scale"],
      impact: ["insights", "performance"],
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
    ]
  },
  {
    id: "anomaly_detection",
    family: "AI & Data Science",
    name: "Anomaly Detection",
    shortDescription: "Automatische Erkennung von Anomalien in Daten. Früherkennung von Problemen und Betrug.",
    longDescription: "Wir entwickeln ein System zur automatischen Erkennung von Anomalien in Ihren Daten. Das System lernt normale Muster und erkennt Abweichungen, die auf Probleme, Betrug oder interessante Entwicklungen hinweisen können. Ideal für Qualitätssicherung, Betrugserkennung oder Prozessoptimierung.",
    active: false,
    tags: {
      type: ["build"],
      maturity: ["scale"],
      impact: ["insights", "performance"],
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
    ]
  },
  {
    id: "predictive_maintenance",
    family: "AI & Data Science",
    name: "Predictive Maintenance",
    shortDescription: "Vorhersage von Wartungsbedarfen mit KI. Wartung genau dann, wenn nötig – nicht zu früh, nicht zu spät.",
    longDescription: "Wir entwickeln ein Predictive Maintenance System, das Wartungsbedarfe für Ihre Maschinen und Anlagen vorhersagt. Basierend auf Sensordaten und historischen Wartungsdaten sagt das Modell voraus, wann Wartung nötig ist, sodass Sie Ausfälle vermeiden und Wartungskosten optimieren können.",
    active: false,
    tags: {
      type: ["build"],
      maturity: ["scale"],
      impact: ["performance", "insights"],
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
    ]
  },
  {
    id: "qa_ai",
    family: "AI & Data Science",
    name: "Quality Assurance AI",
    shortDescription: "Automatische Qualitätsprüfung mit KI. Früherkennung von Fehlern, weniger Ausschuss.",
    longDescription: "Wir entwickeln ein KI-System zur automatischen Qualitätsprüfung Ihrer Produkte. Basierend auf Bildern, Sensordaten oder anderen Messwerten erkennt das System Fehler und Qualitätsprobleme frühzeitig, sodass Sie Ausschuss reduzieren und Qualität verbessern können.",
    active: false,
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
    ]
  },

  // Enterprise Architecture
  {
    id: "target_architecture",
    family: "Enterprise Architecture",
    name: "Target Architecture",
    shortDescription: "Zielarchitektur für Ihre Datenlandschaft. Klare Vision für die Zukunft.",
    longDescription: "Wir entwickeln eine Zielarchitektur für Ihre gesamte Datenlandschaft. Mit klaren Prinzipien, Technologie-Empfehlungen und einem Migrationspfad haben Sie eine Roadmap, wie Ihre Dateninfrastruktur in Zukunft aussehen soll.",
    active: false,
    tags: {
      type: ["blueprint"],
      maturity: ["start", "stabilize"],
      impact: ["foundation", "scale"],
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
    ]
  },

  // Data Operations
  {
    id: "bi_factory",
    family: "Data Operations",
    name: "BI Factory",
    shortDescription: "Skalierbare Prozesse für die Erstellung von BI-Lösungen. Schnellere Entwicklung, höhere Qualität.",
    longDescription: "Wir richten eine BI Factory ein: standardisierte Prozesse, wiederverwendbare Komponenten und automatisierte Qualitätssicherung. Mit diesem Ansatz können Sie BI-Lösungen schneller entwickeln, bei höherer Qualität und konsistenten Standards.",
    active: false,
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
    ]
  },
  {
    id: "monitoring_ops",
    family: "Data Operations",
    name: "Monitoring & Operations",
    shortDescription: "Umfassendes Monitoring für Ihre Dateninfrastruktur. Proaktive Fehlererkennung, höhere Verfügbarkeit.",
    longDescription: "Wir richten ein umfassendes Monitoring-System für Ihre Dateninfrastruktur ein. Mit automatisierten Checks, Alarmen und Dashboards erkennen Sie Probleme frühzeitig und können proaktiv reagieren. Höhere Verfügbarkeit, weniger Ausfälle.",
    active: false,
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
    ]
  },
  {
    id: "retainer",
    family: "Data Operations",
    name: "Data Operations Retainer",
    shortDescription: "Laufende Unterstützung für Ihre Dateninfrastruktur. Kontinuierliche Optimierung und schnelle Reaktion auf Probleme.",
    longDescription: "Mit einem Data Operations Retainer erhalten Sie laufende Unterstützung für Ihre Dateninfrastruktur. Wir optimieren kontinuierlich, reagieren schnell auf Probleme und helfen bei der Weiterentwicklung. Ideal für Unternehmen, die keine eigene Data Operations Abteilung haben.",
    active: false,
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
    ]
  }
];

// Helper-Funktionen
export function getDeliverableById(id: string): Deliverable | undefined {
  return deliverables.find(d => d.id === id);
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
