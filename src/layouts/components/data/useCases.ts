export type UseCaseDomain = 
  | "general_mgmt"
  | "it_data"
  | "finance"
  | "sales_marketing"
  | "procurement"
  | "production"
  | "logistics"
  | "hr"
  | "rnd"
  | "risk_compliance";

export type IntentTag = "transparency" | "automation" | "insights" | "compliance" | "scale";
export type DataScopeTag = "single_source" | "multi_source" | "enterprise_wide";
export type ComplexityTag = "xs" | "s" | "m" | "l";
export type MaturityHintTag = "start" | "stabilize" | "scale";
export type TechHintTag = "bi" | "dwh" | "integration" | "ai" | "governance";

export interface UseCase {
  id: string;
  domain: UseCaseDomain;
  title: string;
  short: string; // 1–2 Zeilen, kundenverständlich
  tags: {
    intent: IntentTag[];
    data_scope: DataScopeTag;
    complexity: ComplexityTag;
    maturity_hint: MaturityHintTag;
    tech_hint: TechHintTag[];
  };
  outputs: string[]; // 3 bullets
}

export const useCases: UseCase[] = [
  // General Management
  {
    id: "management-dashboard",
    domain: "general_mgmt",
    title: "Management Dashboard",
    short: "Zentrale Übersicht aller wichtigen Kennzahlen für die Geschäftsführung. Schnelle Entscheidungen basierend auf aktuellen Daten.",
    tags: {
      intent: ["transparency"],
      data_scope: "enterprise_wide",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["bi"]
    },
    outputs: [
      "Interaktives Management-Dashboard mit allen KPIs",
      "Automatisierte Datenaktualisierung (täglich/wöchentlich)",
      "PDF-Export für Präsentationen"
    ]
  },
  {
    id: "bereichs-reports",
    domain: "general_mgmt",
    title: "Bereichs-Reports",
    short: "Einheitliche Berichte für alle Abteilungen. Konsistente Datenbasis und vergleichbare Kennzahlen.",
    tags: {
      intent: ["transparency"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["bi"]
    },
    outputs: [
      "Standardisierte Report-Vorlagen für alle Bereiche",
      "Zentrale Datenquelle für konsistente Berichte",
      "Automatisierte Verteilung an Verantwortliche"
    ]
  },
  {
    id: "alarm-system",
    domain: "general_mgmt",
    title: "Alarm-System",
    short: "Automatische Benachrichtigungen bei kritischen Abweichungen. Rechtzeitige Reaktion auf Probleme.",
    tags: {
      intent: ["automation", "transparency"],
      data_scope: "multi_source",
      complexity: "s",
      maturity_hint: "stabilize",
      tech_hint: ["bi", "integration"]
    },
    outputs: [
      "Konfigurierbare Schwellenwerte für Alarme",
      "E-Mail- und App-Benachrichtigungen",
      "Dashboard mit aktuellen Alarmen"
    ]
  },
  {
    id: "governance-schulungen",
    domain: "general_mgmt",
    title: "Governance Schulungen",
    short: "Schulungen für den verantwortungsvollen Umgang mit Daten. Sicherstellung von Qualität und Compliance.",
    tags: {
      intent: ["compliance"],
      data_scope: "enterprise_wide",
      complexity: "xs",
      maturity_hint: "start",
      tech_hint: ["governance"]
    },
    outputs: [
      "Schulungsunterlagen zu Datenqualität und -sicherheit",
      "Praktische Übungen und Best Practices",
      "Zertifikat für Teilnehmer"
    ]
  },
  {
    id: "change-begleitung",
    domain: "general_mgmt",
    title: "Change-Begleitung",
    short: "Professionelle Unterstützung bei der Einführung neuer Datenprozesse. Geringere Widerstände, höhere Akzeptanz.",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["governance"]
    },
    outputs: [
      "Change-Management-Plan für Datenprojekte",
      "Schulungen und Workshops für betroffene Teams",
      "Begleitung während der Einführungsphase"
    ]
  },
  {
    id: "datenstrategie-erstellung",
    domain: "general_mgmt",
    title: "Datenstrategie Erstellung",
    short: "Entwicklung einer klaren Strategie für den Umgang mit Daten. Roadmap für die nächsten Jahre.",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      maturity_hint: "start",
      tech_hint: ["governance"]
    },
    outputs: [
      "Dokumentierte Datenstrategie mit Zielen und Maßnahmen",
      "Roadmap für die Umsetzung",
      "Empfehlungen für Technologie und Prozesse"
    ]
  },
  {
    id: "data-mesh-einfuehrung",
    domain: "general_mgmt",
    title: "Data Mesh Einführung",
    short: "Einführung einer dezentralen Datenarchitektur. Datenverantwortung liegt bei den Fachbereichen.",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      maturity_hint: "start",
      tech_hint: ["governance", "dwh"]
    },
    outputs: [
      "Konzept für Data Mesh Architektur",
      "Pilot-Implementierung in einem Bereich",
      "Leitfaden für die Skalierung"
    ]
  },
  {
    id: "data-mesh-skalierung",
    domain: "general_mgmt",
    title: "Data Mesh Skalierung",
    short: "Ausweitung der Data Mesh Architektur auf das gesamte Unternehmen. Konsistente Standards und Prozesse.",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["governance", "dwh", "integration"]
    },
    outputs: [
      "Skalierungsplan für alle Bereiche",
      "Zentrale Governance-Struktur",
      "Schulungen für Data Product Owner"
    ]
  },

  // IT & Data
  {
    id: "setup-data-infrastructure",
    domain: "it_data",
    title: "Setup Data Infrastructure",
    short: "Aufbau einer zentralen Dateninfrastruktur. Solide Basis für alle Analytics-Projekte.",
    tags: {
      intent: ["scale"],
      data_scope: "multi_source",
      complexity: "l",
      maturity_hint: "start",
      tech_hint: ["dwh", "integration"]
    },
    outputs: [
      "Installierte und konfigurierte Dateninfrastruktur",
      "Anbindung an wichtige Datenquellen",
      "Dokumentation und Schulung für Administratoren"
    ]
  },
  {
    id: "setup-bi",
    domain: "it_data",
    title: "Setup BI",
    short: "Komplettes Business Intelligence Setup mit Dashboards und erster Datenanbindung. Sofort einsatzbereit.",
    tags: {
      intent: ["transparency"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "start",
      tech_hint: ["bi"]
    },
    outputs: [
      "Installiertes und konfiguriertes BI-System",
      "Anbindung an 1-3 Datenquellen",
      "3-5 Basis-Dashboards nach Ihren Anforderungen"
    ]
  },
  {
    id: "helpdesk-automation",
    domain: "it_data",
    title: "Helpdesk Automation",
    short: "Automatisierung von Helpdesk-Prozessen. Schnellere Bearbeitung, weniger manuelle Arbeit.",
    tags: {
      intent: ["automation"],
      data_scope: "single_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["integration", "ai"]
    },
    outputs: [
      "Automatisierte Ticket-Kategorisierung",
      "Workflow-Automatisierung für Standardfälle",
      "Dashboard für Helpdesk-Metriken"
    ]
  },
  {
    id: "anomaly-detection",
    domain: "it_data",
    title: "Anomaly Detection",
    short: "Automatische Erkennung von Anomalien in Daten. Früherkennung von Problemen und Betrug.",
    tags: {
      intent: ["insights", "automation"],
      data_scope: "multi_source",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "ML-Modell für Anomalie-Erkennung",
      "Dashboard mit erkannten Anomalien",
      "Automatische Benachrichtigungen bei Auffälligkeiten"
    ]
  },
  {
    id: "api-management",
    domain: "it_data",
    title: "API-Management",
    short: "Zentrale Verwaltung aller APIs. Sicherer und kontrollierter Datenzugriff.",
    tags: {
      intent: ["scale"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["integration", "governance"]
    },
    outputs: [
      "API-Gateway mit Authentifizierung",
      "Dokumentation aller verfügbaren APIs",
      "Monitoring und Logging-System"
    ]
  },
  {
    id: "data-warehouse-implementierung",
    domain: "it_data",
    title: "Data Warehouse Implementierung",
    short: "Aufbau eines zentralen Data Warehouses. Alle Daten an einem Ort, konsistent und aktuell.",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      maturity_hint: "start",
      tech_hint: ["dwh", "integration"]
    },
    outputs: [
      "Implementiertes Data Warehouse",
      "ETL-Prozesse für regelmäßige Datenaktualisierung",
      "Datenmodell für Kernbereiche"
    ]
  },
  {
    id: "adf-aufsetzen",
    domain: "it_data",
    title: "ADF Aufsetzen",
    short: "Einrichtung von Azure Data Factory für Datenintegration. Automatisierte Datenflüsse zwischen Systemen.",
    tags: {
      intent: ["automation", "scale"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["integration", "dwh"]
    },
    outputs: [
      "Konfigurierte Azure Data Factory",
      "Erste Datenpipelines für wichtige Quellen",
      "Monitoring und Fehlerbehandlung"
    ]
  },

  // Finance
  {
    id: "excel-to-bi-migration",
    domain: "finance",
    title: "Excel to BI Migration",
    short: "Umstellung von Excel-Berichten auf moderne BI-Lösungen. Weniger Fehler, mehr Automatisierung.",
    tags: {
      intent: ["automation", "transparency"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["bi"]
    },
    outputs: [
      "Migrierte Berichte in BI-System",
      "Automatisierte Datenaktualisierung",
      "Schulung für Finanzteam"
    ]
  },
  {
    id: "financial-forecasting",
    domain: "finance",
    title: "Financial Forecasting",
    short: "Vorhersage von Finanzergebnissen basierend auf historischen Daten. Bessere Planung und Entscheidungen.",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Forecasting-Modell für Finanzergebnisse",
      "Dashboard mit Prognosen und Szenarien",
      "Automatisierte Aktualisierung der Vorhersagen"
    ]
  },
  {
    id: "controlling-via-bi",
    domain: "finance",
    title: "Controlling via BI",
    short: "Moderne Controlling-Berichte in BI. Echtzeit-Übersicht über Kosten, Budgets und Abweichungen.",
    tags: {
      intent: ["transparency"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["bi"]
    },
    outputs: [
      "Controlling-Dashboard mit allen Kennzahlen",
      "Budget- vs. Ist-Vergleiche",
      "Automatisierte Abweichungsanalysen"
    ]
  },
  {
    id: "financial-planning",
    domain: "finance",
    title: "Financial Planning",
    short: "Unterstützung bei der Finanzplanung mit Datenanalysen. Realistischere Prognosen und bessere Entscheidungen.",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["bi", "ai"]
    },
    outputs: [
      "Planungsmodelle basierend auf historischen Daten",
      "Szenario-Analysen für verschiedene Planungsvarianten",
      "Dashboard für Plan-Ist-Vergleiche"
    ]
  },

  // Sales & Marketing
  {
    id: "sales-dashboard",
    domain: "sales_marketing",
    title: "Sales Dashboard",
    short: "Echtzeit-Übersicht über Verkäufe, Pipeline und Performance. Schnelle Entscheidungen basierend auf aktuellen Daten.",
    tags: {
      intent: ["transparency"],
      data_scope: "single_source",
      complexity: "s",
      maturity_hint: "start",
      tech_hint: ["bi"]
    },
    outputs: [
      "Interaktives Sales-Dashboard",
      "Pipeline-Übersicht mit Wahrscheinlichkeiten",
      "Automatisierte Aktualisierung aus CRM"
    ]
  },
  {
    id: "sales-reporting",
    domain: "sales_marketing",
    title: "Sales Reporting",
    short: "Automatisierte Sales-Reports für Management und Vertrieb. Konsistente Datenbasis, weniger manuelle Arbeit.",
    tags: {
      intent: ["automation", "transparency"],
      data_scope: "single_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["bi"]
    },
    outputs: [
      "Standardisierte Sales-Reports",
      "Automatisierte Verteilung an Verantwortliche",
      "Vergleichsanalysen (Monat, Quartal, Jahr)"
    ]
  },
  {
    id: "sales-forecast",
    domain: "sales_marketing",
    title: "Sales Forecast",
    short: "Vorhersage von Verkaufsergebnissen mit KI. Realistischere Prognosen für Planung und Budgetierung.",
    tags: {
      intent: ["insights"],
      data_scope: "single_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Forecasting-Modell für Verkäufe",
      "Dashboard mit Prognosen und Konfidenzintervallen",
      "Automatisierte Aktualisierung basierend auf Pipeline"
    ]
  },
  {
    id: "potentialanalyse",
    domain: "sales_marketing",
    title: "Potentialanalyse",
    short: "Identifikation von Verkaufspotenzialen mit Datenanalysen. Fokus auf die vielversprechendsten Kunden und Märkte.",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "scale",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Analyse-Modell für Verkaufspotenziale",
      "Dashboard mit identifizierten Chancen",
      "Priorisierte Liste für Vertriebsteam"
    ]
  },
  {
    id: "churn-prevention-algo",
    domain: "sales_marketing",
    title: "Churn Prevention Algo",
    short: "Früherkennung von Kunden mit Abwanderungsrisiko. Rechtzeitige Maßnahmen zur Kundenbindung.",
    tags: {
      intent: ["insights", "automation"],
      data_scope: "multi_source",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "ML-Modell zur Churn-Vorhersage",
      "Dashboard mit Risiko-Kunden",
      "Automatische Benachrichtigungen bei hohem Risiko"
    ]
  },
  {
    id: "data-driven-marketing",
    domain: "sales_marketing",
    title: "Data Driven Marketing",
    short: "Marketing-Entscheidungen basierend auf Datenanalysen. Höhere ROI durch zielgerichtete Kampagnen.",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "scale",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Analyse-Tools für Marketing-Performance",
      "Segmentierungsmodelle für Zielgruppen",
      "Dashboard für Kampagnen-Erfolg"
    ]
  },
  {
    id: "automatisierung-customer-success",
    domain: "sales_marketing",
    title: "Automatisierung Customer Success",
    short: "Automatisierung von Customer Success Prozessen. Proaktive Betreuung, weniger manuelle Arbeit.",
    tags: {
      intent: ["automation"],
      data_scope: "single_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["integration", "ai"]
    },
    outputs: [
      "Automatisierte Workflows für Customer Success",
      "Dashboard mit Kunden-Gesundheits-Score",
      "Automatische Benachrichtigungen bei Auffälligkeiten"
    ]
  },

  // Procurement
  {
    id: "einkaufs-forecast",
    domain: "procurement",
    title: "Einkaufs-Forecast",
    short: "Vorhersage von Einkaufsbedarfen basierend auf historischen Daten. Optimierte Bestellplanung.",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Forecasting-Modell für Einkaufsbedarfe",
      "Dashboard mit Prognosen und Bestellvorschlägen",
      "Automatisierte Aktualisierung basierend auf Verbrauch"
    ]
  },
  {
    id: "best-price-purchase",
    domain: "procurement",
    title: "Best price purchase",
    short: "Automatische Identifikation der besten Preise und Lieferanten. Kostenoptimierung beim Einkauf.",
    tags: {
      intent: ["insights", "automation"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "scale",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Analyse-Tool für Lieferanten-Preise",
      "Dashboard mit Preisvergleichen",
      "Automatische Empfehlungen für Bestellungen"
    ]
  },
  {
    id: "bedarfsanalyse",
    domain: "procurement",
    title: "Bedarfsanalyse",
    short: "Systematische Analyse von Einkaufsbedarfen. Identifikation von Einsparpotenzialen und Optimierungen.",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["bi"]
    },
    outputs: [
      "Analyse-Dashboard für Einkaufsbedarfe",
      "Identifikation von Einsparpotenzialen",
      "Empfehlungen für Bestelloptimierung"
    ]
  },
  {
    id: "automatisierung-bestelldaten",
    domain: "procurement",
    title: "Automatisierung Bestelldaten",
    short: "Automatisierung der Erfassung und Verarbeitung von Bestelldaten. Weniger manuelle Arbeit, weniger Fehler.",
    tags: {
      intent: ["automation"],
      data_scope: "single_source",
      complexity: "s",
      maturity_hint: "stabilize",
      tech_hint: ["integration"]
    },
    outputs: [
      "Automatisierte Erfassung von Bestelldaten",
      "Integration mit Einkaufssystemen",
      "Dashboard für Bestellübersicht"
    ]
  },

  // Production
  {
    id: "produktionsplanung",
    domain: "production",
    title: "Produktionsplanung",
    short: "Optimierte Produktionsplanung basierend auf Datenanalysen. Höhere Auslastung, weniger Stillstände.",
    tags: {
      intent: ["insights", "automation"],
      data_scope: "multi_source",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Optimierungsmodell für Produktionsplanung",
      "Dashboard mit aktueller Auslastung",
      "Automatische Planungsvorschläge"
    ]
  },
  {
    id: "digital-twin",
    domain: "production",
    title: "Digital Twin",
    short: "Digitaler Zwilling Ihrer Produktionsanlagen. Simulation und Optimierung vor der Umsetzung.",
    tags: {
      intent: ["insights", "scale"],
      data_scope: "multi_source",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["ai", "integration"]
    },
    outputs: [
      "Digitales Modell der Produktionsanlagen",
      "Simulations-Tool für Szenarien",
      "Dashboard mit Echtzeit-Daten und Prognosen"
    ]
  },
  {
    id: "predictive-maintenance",
    domain: "production",
    title: "Predictive Maintenance",
    short: "Vorhersage von Wartungsbedarfen mit KI. Wartung genau dann, wenn nötig – nicht zu früh, nicht zu spät.",
    tags: {
      intent: ["insights", "automation"],
      data_scope: "multi_source",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "ML-Modell für Wartungsvorhersage",
      "Dashboard mit Wartungsempfehlungen",
      "Automatische Benachrichtigungen bei Bedarf"
    ]
  },
  {
    id: "quality-assurance-ai",
    domain: "production",
    title: "Quality Assurance AI",
    short: "Automatische Qualitätsprüfung mit KI. Früherkennung von Fehlern, weniger Ausschuss.",
    tags: {
      intent: ["automation", "insights"],
      data_scope: "single_source",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["ai"]
    },
    outputs: [
      "KI-Modell für Qualitätsprüfung",
      "Dashboard mit Qualitätsmetriken",
      "Automatische Alarme bei Qualitätsproblemen"
    ]
  },

  // Logistics
  {
    id: "lagerbestandsverwaltung",
    domain: "logistics",
    title: "Lagerbestandsverwaltung",
    short: "Echtzeit-Übersicht über Lagerbestände. Optimierte Bestellmengen, weniger Überbestände.",
    tags: {
      intent: ["transparency"],
      data_scope: "single_source",
      complexity: "s",
      maturity_hint: "stabilize",
      tech_hint: ["bi"]
    },
    outputs: [
      "Dashboard mit aktuellen Lagerbeständen",
      "Automatische Bestellvorschläge",
      "Warnungen bei niedrigen Beständen"
    ]
  },
  {
    id: "lageroptimierung",
    domain: "logistics",
    title: "Lageroptimierung",
    short: "Optimierung der Lagerstruktur und -prozesse. Höhere Effizienz, niedrigere Kosten.",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "scale",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Optimierungsmodell für Lagerstruktur",
      "Dashboard mit Lager-Metriken",
      "Empfehlungen für Prozessverbesserungen"
    ]
  },
  {
    id: "tourenplanung-automatisiert",
    domain: "logistics",
    title: "Tourenplanung automatisiert",
    short: "Automatische Optimierung von Lieferrouten. Kürzere Wege, weniger Kosten, pünktlichere Lieferungen.",
    tags: {
      intent: ["automation", "insights"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["ai", "integration"]
    },
    outputs: [
      "Optimierungsmodell für Tourenplanung",
      "Dashboard mit geplanten Routen",
      "Automatische Anpassung bei Änderungen"
    ]
  },

  // HR
  {
    id: "personal-controlling",
    domain: "hr",
    title: "Personal-Controlling",
    short: "Übersicht über Personalkosten, Auslastung und Performance. Datenbasierte Entscheidungen im HR-Bereich.",
    tags: {
      intent: ["transparency"],
      data_scope: "multi_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["bi"]
    },
    outputs: [
      "Dashboard mit Personalkennzahlen",
      "Kostenanalysen nach Abteilungen",
      "Automatisierte Reports für Management"
    ]
  },
  {
    id: "strategische-personalplanung",
    domain: "hr",
    title: "Strategische Personalplanung",
    short: "Langfristige Personalplanung basierend auf Datenanalysen. Rechtzeitige Reaktion auf Bedarfsänderungen.",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Planungsmodell für Personalbedarf",
      "Dashboard mit Prognosen und Szenarien",
      "Empfehlungen für Personalentwicklung"
    ]
  },
  {
    id: "operative-personaleinsatzplanung",
    domain: "hr",
    title: "Operative Personaleinsatzplanung",
    short: "Optimierte Schicht- und Einsatzplanung. Höhere Auslastung, zufriedenere Mitarbeiter.",
    tags: {
      intent: ["automation", "insights"],
      data_scope: "single_source",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Optimierungsmodell für Einsatzplanung",
      "Dashboard mit aktuellen Plänen",
      "Automatische Vorschläge für Schichtpläne"
    ]
  },

  // Research & Development
  {
    id: "simulierung-experimente",
    domain: "rnd",
    title: "Simulierung von Experimenten",
    short: "Virtuelle Durchführung von Experimenten vor der Realität. Schnellere Entwicklung, weniger Kosten.",
    tags: {
      intent: ["insights", "scale"],
      data_scope: "multi_source",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["ai"]
    },
    outputs: [
      "Simulationsmodell für Experimente",
      "Dashboard mit Simulationsergebnissen",
      "Empfehlungen für reale Experimente"
    ]
  },
  {
    id: "innovationsresearch",
    domain: "rnd",
    title: "Innovationsresearch",
    short: "Datenbasierte Identifikation von Innovationschancen. Fokus auf vielversprechende Technologien und Trends.",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "l",
      maturity_hint: "scale",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Analyse-Tool für Innovationschancen",
      "Dashboard mit identifizierten Trends",
      "Priorisierte Liste für Forschungsteam"
    ]
  },

  // Risk & Compliance
  {
    id: "data-governance-konzept",
    domain: "risk_compliance",
    title: "Data Governance Konzept",
    short: "Entwicklung eines Konzepts für den verantwortungsvollen Umgang mit Daten. Sicherstellung von Qualität und Compliance.",
    tags: {
      intent: ["compliance", "scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      maturity_hint: "start",
      tech_hint: ["governance"]
    },
    outputs: [
      "Dokumentiertes Data Governance Konzept",
      "Rollen und Verantwortlichkeiten",
      "Prozesse für Datenqualität und -sicherheit"
    ]
  },
  {
    id: "iam-konzept",
    domain: "risk_compliance",
    title: "IAM Konzept",
    short: "Konzept für Identity und Access Management. Sicherer und kontrollierter Zugriff auf Daten und Systeme.",
    tags: {
      intent: ["compliance"],
      data_scope: "enterprise_wide",
      complexity: "m",
      maturity_hint: "start",
      tech_hint: ["governance"]
    },
    outputs: [
      "Dokumentiertes IAM-Konzept",
      "Rollen- und Rechte-Modell",
      "Empfehlungen für technische Umsetzung"
    ]
  },
  {
    id: "umsetzung-rechte-rollenkonzepte",
    domain: "risk_compliance",
    title: "Umsetzung von Rechte- & Rollenkonzepten",
    short: "Technische Umsetzung von Zugriffsrechten und Rollen. Sicherer Datenzugriff nach dem Prinzip der geringsten Rechte.",
    tags: {
      intent: ["compliance"],
      data_scope: "enterprise_wide",
      complexity: "m",
      maturity_hint: "stabilize",
      tech_hint: ["governance", "integration"]
    },
    outputs: [
      "Implementiertes Rechte- und Rollensystem",
      "Zugriffskontrollen für alle Systeme",
      "Dokumentation und Schulung"
    ]
  }
];

// Helper-Funktionen
export function getUseCaseById(id: string): UseCase | undefined {
  return useCases.find(uc => uc.id === id);
}

export function getUseCasesByDomain(domain: UseCaseDomain): UseCase[] {
  return useCases.filter(uc => uc.domain === domain);
}

export function getAllDomains(): UseCaseDomain[] {
  return Array.from(new Set(useCases.map(uc => uc.domain)));
}
