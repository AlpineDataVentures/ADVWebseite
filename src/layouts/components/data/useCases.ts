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
export type TechHintTag = "bi" | "dwh" | "integration" | "ai" | "governance";
export type PortfolioAreaTag = "solutions" | "automation_ai";
export type SolutionClusterTag =
  | "orientation_prioritization"
  | "data_mgmt_architecture"
  | "insights_general_mgmt"
  | "insights_finance"
  | "insights_sales_marketing"
  | "insights_procurement"
  | "insights_production_logistics"
  | "insights_it_ops"
  | "automation_sales_marketing"
  | "automation_finance"
  | "automation_it_ops"
  | "automation_procurement"
  | "automation_risk_compliance"
  | "automation_cross_domain"
  | "automation_rnd"
  | "automation_production_logistics";

/**
 * UseCase = aktuelles Produktmodell des Produktkatalogs.
 *
 * Feld-Klassifikation (Stand Phase 2, siehe MIGRATION_NOTES.md):
 *  - ZWINGEND:      id, domain, title, short, solution_cluster, outputs, tags.intent
 *  - UX-RELEVANT:   priority, tags.data_scope, details.problem/typicalResult/bestFor
 *  - STRAPI/SEO:    slug
 *  - REDUNDANT/LEGACY (nur von entferntem Alt-Flow genutzt -> kann später entfallen):
 *                   portfolio_area, tags.complexity, tags.tech_hint,
 *                   tags.maturity_hint, details.typicalDeliverables
 *
 * Hinweis: Legacy-Felder bleiben vorerst im Interface (optional bzw. tolerant),
 * damit die ~100 bestehenden Datensätze ohne riskanten Massen-Edit weiter valide sind.
 * Beim Schritt UseCase -> Product (productModel.ts) werden sie nicht übernommen.
 */
export interface UseCase {
  key: string;
  domain: UseCaseDomain;
  /** ZWINGEND – Anzeigetitel */
  title: string;
  /** ZWINGEND – Kurzbeschreibung (1–2 Zeilen, kundenverständlich) */
  short: string;
  /** @deprecated LEGACY – nur vom alten Portfolio-Flow genutzt, kann später entfallen */
  portfolio_area?: PortfolioAreaTag;
  /** ZWINGEND (faktisch) – primäres Cluster für Navigation/Empfehlung */
  solution_cluster?: SolutionClusterTag;
  /** UX-RELEVANT – hebt Fokus-/Featured-Use-Cases hervor */
  priority?: "green" | "normal";
  tags: {
    /** ZWINGEND – treibt Suche + Rule-Engine */
    intent: IntentTag[];
    /** UX-/LOGIK-RELEVANT – treibt Architektur-Empfehlungen */
    data_scope: DataScopeTag;
    /** @deprecated LEGACY – nur Badge im alten Flow, kann später entfallen */
    complexity: ComplexityTag;
    tech_hint: TechHintTag[];
  };
  /** ZWINGEND – Ergebnis-Bullets (im Paket-View gerendert) */
  outputs: string[];
  details?: {
    /** UX-RELEVANT */
    problem: string;
    /** UX-RELEVANT */
    typicalResult: string;
    /** @deprecated LEGACY – im aktiven Flow ungenutzt (Bausteine kommen aus recommendations.ts) */
    typicalDeliverables: string[];
    /** UX-RELEVANT */
    bestFor: string[];
  };
}

const rawUseCases: UseCase[] = [
  // General Management
  {
    id: "datenstrategie",
    domain: "general_mgmt",
    title: "Datenstrategie",
    short: "Entwicklung einer klaren Datenstrategie mit Prioritäten, Rollen und Roadmap für die nächsten 12-24 Monate.",
    portfolio_area: "solutions",
    solution_cluster: "orientation_prioritization",
    priority: "green",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "m",
      tech_hint: ["governance"]
    },
    outputs: [
      "Zielbild & Strategiepapier",
      "Priorisierte Roadmap",
      "Rollen- und Governance-Modell"
    ]
  },
  {
    id: "ki-strategie",
    domain: "general_mgmt",
    title: "KI Strategie",
    short: "Definition einer pragmatischen KI-Strategie mit priorisierten Anwendungsfällen, Risiken und klarer Umsetzungsplanung.",
    portfolio_area: "solutions",
    solution_cluster: "orientation_prioritization",
    priority: "green",
    tags: {
      intent: ["scale", "insights"],
      data_scope: "enterprise_wide",
      complexity: "m",
      tech_hint: ["ai", "governance"]
    },
    outputs: [
      "Zielbild & Strategiepapier",
      "Priorisierte Maßnahmenliste",
      "Priorisierte Roadmap"
    ]
  },
  {
    id: "maturity-assessment",
    domain: "general_mgmt",
    title: "Maturity Assessment",
    short: "Bewertung des aktuellen Reifegrads von Daten, Analytics und KI als Grundlage für eine belastbare Priorisierung.",
    portfolio_area: "solutions",
    solution_cluster: "orientation_prioritization",
    priority: "green",
    tags: {
      intent: ["transparency"],
      data_scope: "enterprise_wide",
      complexity: "s",
      tech_hint: ["governance", "bi"]
    },
    outputs: [
      "Gap- und Reifegradanalyse",
      "Priorisierte Maßnahmenliste",
      "Zielbild & Strategiepapier"
    ]
  },
  {
    id: "data-mesh-organisation",
    domain: "general_mgmt",
    title: "Data Mesh Organisation",
    short: "Aufbau einer Data-Mesh-Organisation mit klaren Verantwortungen in Domänen und Governance auf Unternehmensebene.",
    portfolio_area: "solutions",
    solution_cluster: "orientation_prioritization",
    priority: "green",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      tech_hint: ["governance", "dwh"]
    },
    outputs: [
      "KI-Modell (Pilot)",
      "Rollen- und Governance-Modell",
      "Priorisierte Roadmap"
    ]
  },
  {
    key: "data-catalog",
    domain: "general_mgmt",
    title: "Data Catalog",
    short: "Einführung eines Data Catalogs für Transparenz über Datenobjekte, Verantwortliche und Definitionen.",
    portfolio_area: "solutions",
    solution_cluster: "orientation_prioritization",
    priority: "green",
    tags: {
      intent: ["transparency", "compliance"],
      data_scope: "enterprise_wide",
      complexity: "m",
      tech_hint: ["governance"]
    },
    outputs: [
      "Data Catalog & Glossar",
      "Zielbild & Strategiepapier",
      "Priorisierte Roadmap"
    ],
    details: {
      problem: "Begriffe, Datenobjekte und Verantwortlichkeiten sind verteilt oder uneinheitlich dokumentiert.",
      typicalResult: "Ein zentraler, gepflegter Katalog mit klaren Definitionen und eindeutigen Verantwortlichkeiten.",
      typicalDeliverables: ["KPI & Daten-Glossar Sprint", "Datenquellen- & Integrationsanalyse"],
      bestFor: ["Führungsteams mit Governance-Fokus", "Fachbereiche mit Abstimmungsbedarf", "Organisationen mit Compliance-Anforderungen"]
    }
  },
  {
    id: "data-ai-leadership",
    domain: "general_mgmt",
    title: "Data & AI Leadership",
    short: "Stärkung von Führung, Entscheidungsstrukturen und Steuerung für daten- und KI-getriebene Transformation.",
    portfolio_area: "solutions",
    solution_cluster: "orientation_prioritization",
    priority: "green",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "m",
      tech_hint: ["governance", "ai"]
    },
    outputs: [
      "Zielbild & Strategiepapier",
      "Rollen- und Governance-Modell",
      "Priorisierte Roadmap"
    ]
  },
  {
    key: "management-dashboard",
    domain: "general_mgmt",
    title: "Management Dashboard",
    short: "Zentrale Übersicht aller wichtigen Kennzahlen für die Geschäftsführung. Schnelle Entscheidungen basierend auf aktuellen Daten.",
    portfolio_area: "solutions",
    solution_cluster: "insights_general_mgmt",
    priority: "green",
    tags: {
      intent: ["transparency"],
      data_scope: "enterprise_wide",
      complexity: "m",
      tech_hint: ["bi"]
    },
    outputs: [
      "KPI-Definition & Kennzahlenkatalog",
      "Automatisierter Workflow",
      "Fachbereichs-Reporting"
    ],
    details: {
      problem: "Management-Entscheidungen basieren auf verstreuten Reports und verspäteten Kennzahlen.",
      typicalResult: "Ein zentrales Steuerungsdashboard mit konsistenten KPIs und schneller Entscheidungsgrundlage.",
      typicalDeliverables: ["BI Fix & Fertig Setup", "KPI Definition Workshop", "Erster Management-Bericht"],
      bestFor: ["Geschäftsführung", "Bereichsleitungen", "Organisationen mit mehreren Steuerungsbereichen"]
    }
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
      tech_hint: ["bi"]
    },
    outputs: [
      "Fachbereichs-Reporting",
      "Rollen- und Governance-Modell",
      "Zielbild & Strategiepapier"
    ]
  },
  {
    id: "alarm-system",
    domain: "general_mgmt",
    title: "Frühwarnsystem",
    short: "Früherkennung kritischer KPI-Abweichungen mit automatischen Warnungen für Management und Fachbereiche.",
    portfolio_area: "solutions",
    solution_cluster: "insights_general_mgmt",
    priority: "green",
    tags: {
      intent: ["automation", "transparency"],
      data_scope: "multi_source",
      complexity: "s",
      tech_hint: ["bi", "integration"]
    },
    outputs: [
      "Monitoring- & Alerting-Setup",
      "Management-Dashboard",
      "Zielbild & Strategiepapier"
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
      tech_hint: ["governance"]
    },
    outputs: [
      "Schulungs- und Enablement-Paket",
      "Handlungs- und Entscheidungsempfehlungen",
      "Zielbild & Strategiepapier"
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
      tech_hint: ["governance"]
    },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "Schulungs- und Enablement-Paket",
      "Zielbild & Strategiepapier"
    ]
  },
  {
    id: "datenstrategie-erstellung",
    domain: "general_mgmt",
    title: "Datenstrategie Erstellung",
    short: "Datenstrategie mit stärkerem Fokus auf initiale Dokumentation und strategische Grundsatzarbeit.",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      tech_hint: ["governance"]
    },
    outputs: [
      "Zielbild & Strategiepapier",
      "Priorisierte Roadmap",
      "Handlungs- und Entscheidungsempfehlungen"
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
      tech_hint: ["governance", "dwh"]
    },
    outputs: [
      "Zielarchitektur & Datenmodell",
      "Handlungs- und Entscheidungsempfehlungen",
      "Zielbild & Strategiepapier"
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
      tech_hint: ["governance", "dwh", "integration"]
    },
    outputs: [
      "Priorisierte Roadmap",
      "Rollen- und Governance-Modell",
      "Schulungs- und Enablement-Paket"
    ]
  },

  // IT & Data
  {
    id: "dwh",
    domain: "it_data",
    title: "DWH",
    short: "Konzeption und Umsetzung eines Data Warehouses als verlässliche Grundlage für Reporting und Analytics.",
    portfolio_area: "solutions",
    solution_cluster: "data_mgmt_architecture",
    priority: "green",
    tags: {
      intent: ["scale", "transparency"],
      data_scope: "enterprise_wide",
      complexity: "l",
      tech_hint: ["dwh", "integration"]
    },
    outputs: [
      "Zielarchitektur & Datenmodell",
      "Handlungs- und Entscheidungsempfehlungen",
      "Datenpipeline- und Integrationssetup"
    ]
  },
  {
    id: "data-lake",
    domain: "it_data",
    title: "Data Lake",
    short: "Aufbau eines Data Lakes für flexible Speicherung und Verarbeitung strukturierter und unstrukturierter Daten.",
    portfolio_area: "solutions",
    solution_cluster: "data_mgmt_architecture",
    priority: "green",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      tech_hint: ["dwh", "integration"]
    },
    outputs: [
      "Zielarchitektur & Datenmodell",
      "Rollen- und Governance-Modell",
      "Datenpipeline- und Integrationssetup"
    ]
  },
  {
    id: "enterprise-architecture-management",
    domain: "it_data",
    title: "Enterprise Architecture Management",
    short: "Etablierung eines EAM-Rahmens zur Ausrichtung von Daten-, Applikations- und Technologiearchitektur.",
    portfolio_area: "solutions",
    solution_cluster: "data_mgmt_architecture",
    priority: "green",
    tags: {
      intent: ["scale", "compliance"],
      data_scope: "enterprise_wide",
      complexity: "l",
      tech_hint: ["governance", "integration"]
    },
    outputs: [
      "Zielbild & Strategiepapier",
      "Handlungs- und Entscheidungsempfehlungen",
      "Priorisierte Roadmap"
    ]
  },
  {
    id: "ai-architektur-infrastruktur",
    domain: "it_data",
    title: "AI Architektur & Infrastruktur",
    short: "Aufbau einer tragfähigen AI-Architektur inklusive Daten-, Modell- und Betriebsinfrastruktur.",
    portfolio_area: "solutions",
    solution_cluster: "data_mgmt_architecture",
    priority: "green",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      tech_hint: ["ai", "dwh", "integration"]
    },
    outputs: [
      "Zielarchitektur & Datenmodell",
      "Betriebs- und Supportmodell",
      "Priorisierte Roadmap"
    ]
  },
  {
    id: "souveraene-ki-infrastruktur",
    domain: "it_data",
    title: "Souveräne KI Infrastruktur",
    short: "Konzeption einer souveränen KI-Infrastruktur mit Fokus auf Kontrolle, Sicherheit und regulatorische Anforderungen.",
    portfolio_area: "solutions",
    solution_cluster: "data_mgmt_architecture",
    priority: "green",
    tags: {
      intent: ["compliance", "scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      tech_hint: ["ai", "governance"]
    },
    outputs: [
      "Betriebs- und Supportmodell",
      "Zielarchitektur & Datenmodell",
      "Risiko- und Maßnahmenkatalog"
    ]
  },
  {
    id: "souveraene-datenarchitektur",
    domain: "it_data",
    title: "Souveräne Datenarchitektur",
    short: "Aufbau einer souveränen Datenarchitektur für kontrollierte Datenhaltung, Zugriff und Verarbeitung.",
    portfolio_area: "solutions",
    solution_cluster: "data_mgmt_architecture",
    priority: "green",
    tags: {
      intent: ["compliance", "scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      tech_hint: ["governance", "dwh"]
    },
    outputs: [
      "Zielarchitektur & Datenmodell",
      "Sicherheits- und Zugriffskonzept",
      "Priorisierte Roadmap"
    ]
  },
  {
    id: "dataops",
    domain: "it_data",
    title: "DataOps",
    short: "Einführung von DataOps-Prozessen für schnellere, stabilere und nachvollziehbare Datenbereitstellung.",
    portfolio_area: "solutions",
    solution_cluster: "data_mgmt_architecture",
    priority: "green",
    tags: {
      intent: ["automation", "scale"],
      data_scope: "multi_source",
      complexity: "m",
      tech_hint: ["integration", "governance"]
    },
    outputs: [
      "KI-Modell (Pilot)",
      "Handlungs- und Entscheidungsempfehlungen",
      "Monitoring- & Alerting-Setup"
    ]
  },
  {
    id: "wartung-support",
    domain: "it_data",
    title: "Wartung & Support",
    short: "Strukturierter Betrieb mit Wartung und Support für stabile Datenplattformen und BI-Lösungen.",
    portfolio_area: "solutions",
    solution_cluster: "data_mgmt_architecture",
    priority: "green",
    tags: {
      intent: ["automation", "scale"],
      data_scope: "enterprise_wide",
      complexity: "m",
      tech_hint: ["integration", "governance"]
    },
    outputs: [
      "Betriebs- und Supportmodell",
      "Zielarchitektur & Datenmodell",
      "Datenpipeline- und Integrationssetup"
    ]
  },
  {
    id: "master-data-management",
    domain: "it_data",
    title: "Master Data Management",
    short: "Einführung von MDM zur Sicherstellung konsistenter, verlässlicher Stamm- und Referenzdaten.",
    portfolio_area: "solutions",
    solution_cluster: "data_mgmt_architecture",
    priority: "green",
    tags: {
      intent: ["compliance", "transparency"],
      data_scope: "enterprise_wide",
      complexity: "l",
      tech_hint: ["governance", "integration"]
    },
    outputs: [
      "Zielbild & Strategiepapier",
      "Rollen- und Governance-Modell",
      "Priorisierte Roadmap"
    ]
  },
  {
    id: "setup-data-infrastructure",
    domain: "it_data",
    title: "Setup Data Infrastructure",
    short: "Initiales Plattform-Setup und technische Inbetriebnahme der Dateninfrastruktur.",
    tags: {
      intent: ["scale"],
      data_scope: "multi_source",
      complexity: "l",
      tech_hint: ["dwh", "integration"]
    },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "Datenpipeline- und Integrationssetup",
      "Dokumentations- und Nachweispaket"
    ]
  },
  {
    id: "setup-bi",
    domain: "it_data",
    title: "Setup BI",
    short: "Komplettes Business Intelligence Setup mit Dashboards und erster Datenanbindung. Sofort einsatzbereit.",
    portfolio_area: "solutions",
    solution_cluster: "data_mgmt_architecture",
    priority: "green",
    tags: {
      intent: ["transparency"],
      data_scope: "multi_source",
      complexity: "m",
      tech_hint: ["bi"]
    },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "Datenpipeline- und Integrationssetup",
      "Management-Dashboard"
    ]
  },
  {
    id: "helpdesk-automation",
    domain: "it_data",
    title: "Intelligentes Ticket-Routing",
    short: "Automatische Priorisierung und Verteilung von Tickets auf passende Teams.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_it_ops",
    priority: "green",
    tags: {
      intent: ["automation"],
      data_scope: "single_source",
      complexity: "m",
      tech_hint: ["integration", "ai"]
    },
    outputs: [
      "Automatisierter Workflow",
      "Management-Dashboard",
      "Zielarchitektur & Datenmodell"
    ]
  },
  {
    id: "anomaly-detection",
    domain: "it_data",
    title: "Anomaly Detection",
    short: "Automatische Erkennung von Anomalien in Daten. Früherkennung von Problemen und Betrug.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_cross_domain",
    priority: "green",
    tags: {
      intent: ["insights", "automation"],
      data_scope: "multi_source",
      complexity: "l",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Anomalieerkennung",
      "Management-Dashboard",
      "Monitoring- & Alerting-Setup"
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
      tech_hint: ["integration", "governance"]
    },
    outputs: [
      "Sicherheits- und Zugriffskonzept",
      "Dokumentations- und Nachweispaket",
      "Monitoring- & Alerting-Setup"
    ]
  },
  {
    id: "data-warehouse-implementierung",
    domain: "it_data",
    title: "Data Warehouse Implementierung",
    short: "Technische DWH-Implementierung inkl. ETL und operativer Datenbereitstellung.",
    tags: {
      intent: ["scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      tech_hint: ["dwh", "integration"]
    },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "Datenpipeline- und Integrationssetup",
      "Zielarchitektur & Datenmodell"
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
      tech_hint: ["integration", "dwh"]
    },
    outputs: [
      "Datenpipeline- und Integrationssetup",
      "Monitoring- & Alerting-Setup",
      "Zielarchitektur & Datenmodell"
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
      tech_hint: ["bi"]
    },
    outputs: [
      "Fachbereichs-Reporting",
      "Automatisierter Workflow",
      "Schulungs- und Enablement-Paket"
    ]
  },
  {
    id: "financial-forecasting",
    domain: "finance",
    title: "KI-basierte Cash-Flow-Prognose",
    short: "KI-gestützte Prognose von Ein- und Auszahlungen für belastbare Liquiditätsplanung und Frühwarnung.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_finance",
    priority: "green",
    tags: {
      intent: ["insights", "automation"],
      data_scope: "multi_source",
      complexity: "l",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Forecasting-Modell",
      "Management-Dashboard",
      "KPI-Definition & Kennzahlenkatalog"
    ]
  },
  {
    key: "controlling-via-bi",
    domain: "finance",
    title: "Controlling via BI",
    short: "Moderne Controlling-Berichte in BI. Echtzeit-Übersicht über Kosten, Budgets und Abweichungen.",
    portfolio_area: "solutions",
    solution_cluster: "insights_finance",
    priority: "green",
    tags: {
      intent: ["transparency"],
      data_scope: "multi_source",
      complexity: "m",
      tech_hint: ["bi"]
    },
    outputs: [
      "KPI-Definition & Kennzahlenkatalog",
      "Handlungs- und Entscheidungsempfehlungen",
      "Automatisierter Workflow"
    ],
    details: {
      problem: "Controlling benötigt zu viel manuelle Aufbereitung und liefert keine aktuelle Sicht auf Abweichungen.",
      typicalResult: "Transparente BI-Controlling-Sicht mit automatisierten Budget-Ist-Vergleichen.",
      typicalDeliverables: ["KPI Definition Workshop", "Reporting-Struktur (Templates & Standards)", "Erster Management-Bericht"],
      bestFor: ["Finance-Teams", "Controlling-Leitung", "Unternehmen mit mehreren Kostenstellen"]
    }
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
      tech_hint: ["bi", "ai"]
    },
    outputs: [
      "KI-Modell (Pilot)",
      "Szenario- und Simulationsanalyse",
      "Management-Dashboard"
    ]
  },

  // Sales & Marketing
  {
    key: "sales-dashboard",
    domain: "sales_marketing",
    title: "Sales Dashboard",
    short: "Echtzeit-Übersicht über Verkäufe, Pipeline und Performance. Schnelle Entscheidungen basierend auf aktuellen Daten.",
    portfolio_area: "solutions",
    solution_cluster: "insights_sales_marketing",
    priority: "green",
    tags: {
      intent: ["transparency"],
      data_scope: "single_source",
      complexity: "s",
      tech_hint: ["bi"]
    },
    outputs: [
      "Management-Dashboard",
      "Datenpipeline- und Integrationssetup",
      "Automatisierter Workflow"
    ],
    details: {
      problem: "Vertrieb und Management haben keine einheitliche, aktuelle Sicht auf Pipeline und Performance.",
      typicalResult: "Ein Sales-Dashboard mit klaren KPIs, Pipeline-Transparenz und automatischen Updates.",
      typicalDeliverables: ["BI Fix & Fertig Setup", "KPI Definition Workshop", "KPI & Daten-Glossar Sprint"],
      bestFor: ["Sales-Leitung", "Vertriebsteams", "Unternehmen mit CRM-basierter Pipeline-Steuerung"]
    }
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
      tech_hint: ["bi"]
    },
    outputs: [
      "Fachbereichs-Reporting",
      "Rollen- und Governance-Modell",
      "Handlungs- und Entscheidungsempfehlungen"
    ]
  },
  {
    id: "sales-forecast",
    domain: "sales_marketing",
    title: "Sales Forecast",
    short: "Vorhersage von Verkaufsergebnissen mit KI. Realistischere Prognosen für Planung und Budgetierung.",
    portfolio_area: "solutions",
    solution_cluster: "insights_sales_marketing",
    priority: "green",
    tags: {
      intent: ["insights"],
      data_scope: "single_source",
      complexity: "m",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Forecasting-Modell",
      "Management-Dashboard",
      "Datenpipeline- und Integrationssetup"
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
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "KI-Modell (Pilot)",
      "Management-Dashboard",
      "Priorisierte Maßnahmenliste"
    ]
  },
  {
    id: "churn-prevention-algo",
    domain: "sales_marketing",
    title: "Churn Prevention Algo",
    short: "Früherkennung von Kunden mit Abwanderungsrisiko. Rechtzeitige Maßnahmen zur Kundenbindung.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_sales_marketing",
    priority: "green",
    tags: {
      intent: ["insights", "automation"],
      data_scope: "multi_source",
      complexity: "l",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Forecasting-Modell",
      "Management-Dashboard",
      "Monitoring- & Alerting-Setup"
    ]
  },
  {
    id: "data-driven-marketing",
    domain: "sales_marketing",
    title: "Data Driven Marketing Dashboard",
    short: "Zentrale Marketing-Steuerung über kanalübergreifende Performance-, Budget- und Conversion-Kennzahlen.",
    portfolio_area: "solutions",
    solution_cluster: "insights_sales_marketing",
    priority: "green",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "m",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "KI-Modell (Pilot)",
      "Management-Dashboard"
    ]
  },
  {
    id: "automatisierung-customer-success",
    domain: "sales_marketing",
    title: "Customer Support Automatisierung",
    short: "Automatisierte Service- und Supportprozesse für schnellere Reaktionszeiten und konsistente Kundenkommunikation.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_sales_marketing",
    priority: "green",
    tags: {
      intent: ["automation"],
      data_scope: "single_source",
      complexity: "m",
      tech_hint: ["integration", "ai"]
    },
    outputs: [
      "Automatisierter Workflow",
      "Management-Dashboard",
      "Monitoring- & Alerting-Setup"
    ]
  },

  // Procurement
  {
    id: "einkaufs-forecast",
    domain: "procurement",
    title: "Bestellzeitpunkt-Forecast",
    short: "Vorhersage optimaler Bestellzeitpunkte auf Basis von Verbrauch, Lieferzeit und Bestandsentwicklung.",
    portfolio_area: "solutions",
    solution_cluster: "insights_procurement",
    priority: "green",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "m",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Forecasting-Modell",
      "Management-Dashboard",
      "Automatisierter Workflow"
    ]
  },
  {
    id: "best-price-purchase",
    domain: "procurement",
    title: "Preisentwicklungsanalyse",
    short: "Analyse von Preisverläufen und Beschaffungskosten zur frühzeitigen Erkennung von Kostenrisiken.",
    portfolio_area: "solutions",
    solution_cluster: "insights_procurement",
    priority: "green",
    tags: {
      intent: ["insights", "automation"],
      data_scope: "multi_source",
      complexity: "m",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "Management-Dashboard",
      "Optimierungsmodell"
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
      tech_hint: ["bi"]
    },
    outputs: [
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen",
      "Optimierungsmodell"
    ]
  },
  {
    id: "automatisierung-bestelldaten",
    domain: "procurement",
    title: "Bestelleingangsbearbeitung",
    short: "Automatisierte Erfassung und Validierung eingehender Bestellungen zur Reduktion manueller Aufwände.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_procurement",
    priority: "green",
    tags: {
      intent: ["automation"],
      data_scope: "single_source",
      complexity: "s",
      tech_hint: ["integration"]
    },
    outputs: [
      "Automatisierter Workflow",
      "Datenpipeline- und Integrationssetup",
      "Management-Dashboard"
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
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Optimierungsmodell",
      "Betriebs- und Supportmodell",
      "Handlungs- und Entscheidungsempfehlungen"
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
      tech_hint: ["ai", "integration"]
    },
    outputs: [
      "KI-Modell (Pilot)",
      "Szenario- und Simulationsanalyse",
      "Management-Dashboard"
    ]
  },
  {
    id: "predictive-maintenance",
    domain: "production",
    title: "Predictive Maintenance",
    short: "Vorhersage von Wartungsbedarfen mit KI. Wartung genau dann, wenn nötig – nicht zu früh, nicht zu spät.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_production_logistics",
    priority: "green",
    tags: {
      intent: ["insights", "automation"],
      data_scope: "multi_source",
      complexity: "l",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Betriebs- und Supportmodell",
      "Monitoring- & Alerting-Setup",
      "Optimierungsmodell"
    ]
  },
  {
    id: "quality-assurance-ai",
    domain: "production",
    title: "Ausschuss- und Qualitätscontrolling",
    short: "KI-gestützte Qualitätsautomatisierung mit Fokus auf Ausschussreduktion im Produktionsablauf.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_production_logistics",
    priority: "green",
    tags: {
      intent: ["automation", "insights"],
      data_scope: "single_source",
      complexity: "l",
      tech_hint: ["ai"]
    },
    outputs: [
      "KI-Modell (Pilot)",
      "Management-Dashboard",
      "Monitoring- & Alerting-Setup"
    ]
  },

  // Logistics
  {
    id: "lagerbestandsverwaltung",
    domain: "logistics",
    title: "Digitale Lagerplatzverwaltung",
    short: "Digitale Transparenz über Lagerplätze, Bestände und Bewegungen für eine effizientere Flächensteuerung.",
    portfolio_area: "solutions",
    solution_cluster: "insights_production_logistics",
    priority: "green",
    tags: {
      intent: ["transparency"],
      data_scope: "single_source",
      complexity: "s",
      tech_hint: ["bi"]
    },
    outputs: [
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen",
      "Monitoring- & Alerting-Setup"
    ]
  },
  {
    id: "lageroptimierung",
    domain: "logistics",
    title: "Lagerplatzoptimierung",
    short: "Datenbasierte Optimierung von Lagerzonen und Wegeführung zur Reduktion von Such- und Greifzeiten.",
    portfolio_area: "solutions",
    solution_cluster: "insights_production_logistics",
    priority: "green",
    tags: {
      intent: ["insights"],
      data_scope: "multi_source",
      complexity: "m",
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Optimierungsmodell",
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen"
    ]
  },
  {
    id: "tourenplanung-automatisiert",
    domain: "logistics",
    title: "KI-Routenoptimierung",
    short: "KI-basierte Optimierung von Touren in Echtzeit zur Senkung von Transportkosten und Verspätungen.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_production_logistics",
    priority: "green",
    tags: {
      intent: ["automation", "insights"],
      data_scope: "multi_source",
      complexity: "m",
      tech_hint: ["ai", "integration"]
    },
    outputs: [
      "Optimierungsmodell",
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen"
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
      tech_hint: ["bi"]
    },
    outputs: [
      "KPI-Definition & Kennzahlenkatalog",
      "Handlungs- und Entscheidungsempfehlungen",
      "Fachbereichs-Reporting"
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
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "KI-Modell (Pilot)",
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen"
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
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Optimierungsmodell",
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen"
    ]
  },

  // Research & Development
  {
    key: "simulation-experimente",
    domain: "rnd",
    title: "Simulation von Experimenten",
    short: "Virtuelle Durchführung von Experimenten vor der Realität. Schnellere Entwicklung, weniger Kosten.",
    tags: {
      intent: ["insights", "scale"],
      data_scope: "multi_source",
      complexity: "l",
      tech_hint: ["ai"]
    },
    outputs: [
      "KI-Modell (Pilot)",
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen"
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
      tech_hint: ["ai", "bi"]
    },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "Management-Dashboard",
      "Priorisierte Maßnahmenliste"
    ]
  },

  // Risk & Compliance
  {
    id: "nis2",
    domain: "risk_compliance",
    title: "NIS2",
    short: "Unterstützung bei der NIS2-Umsetzung mit strukturiertem Maßnahmenplan für Governance, Prozesse und Nachweisfähigkeit.",
    portfolio_area: "solutions",
    solution_cluster: "orientation_prioritization",
    priority: "green",
    tags: {
      intent: ["compliance"],
      data_scope: "enterprise_wide",
      complexity: "m",
      tech_hint: ["governance"]
    },
    outputs: [
      "Gap- und Reifegradanalyse",
      "Priorisierte Maßnahmenliste",
      "Dokumentations- und Nachweispaket"
    ]
  },
  {
    id: "dsgvo-dsb",
    domain: "risk_compliance",
    title: "DSGVO (+ DSB)",
    short: "Praxisnahe Umsetzung von DSGVO-Anforderungen inklusive Datenschutzorganisation und DSB-Einbindung.",
    portfolio_area: "solutions",
    solution_cluster: "orientation_prioritization",
    priority: "green",
    tags: {
      intent: ["compliance"],
      data_scope: "enterprise_wide",
      complexity: "m",
      tech_hint: ["governance"]
    },
    outputs: [
      "Priorisierte Roadmap",
      "Rollen- und Governance-Modell",
      "Dokumentations- und Nachweispaket"
    ]
  },
  {
    id: "isms-isb-bestellung",
    domain: "risk_compliance",
    title: "ISMS & ISB Bestellung",
    short: "Aufbau eines ISMS-Rahmens inklusive Vorbereitung und Etablierung der ISB-Rolle im Unternehmen.",
    portfolio_area: "solutions",
    solution_cluster: "orientation_prioritization",
    priority: "green",
    tags: {
      intent: ["compliance", "scale"],
      data_scope: "enterprise_wide",
      complexity: "m",
      tech_hint: ["governance"]
    },
    outputs: [
      "Compliance-Umsetzungsplan",
      "Rollen- und Governance-Modell",
      "Priorisierte Roadmap"
    ]
  },
  {
    id: "iam",
    domain: "risk_compliance",
    title: "IAM",
    short: "Konzeption eines IAM-Zielbilds für rollenbasierten, sicheren und auditierbaren Zugriff auf Systeme und Daten.",
    portfolio_area: "solutions",
    solution_cluster: "orientation_prioritization",
    priority: "green",
    tags: {
      intent: ["compliance"],
      data_scope: "enterprise_wide",
      complexity: "m",
      tech_hint: ["governance", "integration"]
    },
    outputs: [
      "Sicherheits- und Zugriffskonzept",
      "Rollen- und Governance-Modell",
      "Handlungs- und Entscheidungsempfehlungen"
    ]
  },
  {
    id: "data-governance-konzept",
    domain: "risk_compliance",
    title: "Data Governance Konzept",
    short: "Entwicklung eines Konzepts für den verantwortungsvollen Umgang mit Daten. Sicherstellung von Qualität und Compliance.",
    tags: {
      intent: ["compliance", "scale"],
      data_scope: "enterprise_wide",
      complexity: "l",
      tech_hint: ["governance"]
    },
    outputs: [
      "Rollen- und Governance-Modell",
      "Sicherheits- und Zugriffskonzept",
      "Compliance-Umsetzungsplan"
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
      tech_hint: ["governance"]
    },
    outputs: [
      "Sicherheits- und Zugriffskonzept",
      "Rollen- und Governance-Modell",
      "Handlungs- und Entscheidungsempfehlungen"
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
      tech_hint: ["governance", "integration"]
    },
    outputs: [
      "Rollen- und Governance-Modell",
      "Dokumentations- und Nachweispaket",
      "Compliance-Umsetzungsplan"
    ]
  },

  // Block 2: Insights & Analytics Fokus-Use-Cases
  {
    id: "liquiditaetsplanung-bi",
    domain: "finance",
    title: "Liquiditätsplanung mit BI",
    short: "Vorausschauende Steuerung von Zahlungsströmen und Liquiditätsengpässen auf Basis integrierter Finanzdaten.",
    portfolio_area: "solutions",
    solution_cluster: "insights_finance",
    priority: "green",
    tags: { intent: ["insights", "transparency"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi"] },
    outputs: [
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen",
      "Monitoring- & Alerting-Setup"
    ]
  },
  {
    id: "budget-controlling",
    domain: "finance",
    title: "Budget-Controlling",
    short: "Transparente Steuerung von Budget, Ist-Kosten und Abweichungen über Bereiche und Zeiträume hinweg.",
    portfolio_area: "solutions",
    solution_cluster: "insights_finance",
    priority: "green",
    tags: { intent: ["transparency"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi"] },
    outputs: [
      "KPI-Definition & Kennzahlenkatalog",
      "Handlungs- und Entscheidungsempfehlungen",
      "Fachbereichs-Reporting"
    ]
  },
  {
    id: "deckungsbeitragsrechnung",
    domain: "finance",
    title: "Deckungsbeitragsrechnung",
    short: "Analyse von Margen und Deckungsbeiträgen nach Produkten, Kunden und Segmenten für bessere Steuerungsentscheidungen.",
    portfolio_area: "solutions",
    solution_cluster: "insights_finance",
    priority: "green",
    tags: { intent: ["insights"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi"] },
    outputs: [
      "Fachbereichs-Reporting",
      "Handlungs- und Entscheidungsempfehlungen",
      "KPI-Definition & Kennzahlenkatalog"
    ]
  },
  {
    id: "working-capital-analyse",
    domain: "finance",
    title: "Working Capital Analyse",
    short: "Analyse von Forderungen, Verbindlichkeiten und Vorräten zur gezielten Reduktion der Kapitalbindung.",
    portfolio_area: "solutions",
    solution_cluster: "insights_finance",
    priority: "green",
    tags: { intent: ["insights", "transparency"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi"] },
    outputs: [
      "KPI-Definition & Kennzahlenkatalog",
      "Priorisierte Maßnahmenliste",
      "Forecasting-Modell"
    ]
  },
  {
    id: "kostenstruktur-gemeinkosten-monitoring",
    domain: "finance",
    title: "Kostenstruktur- und Gemeinkosten-Monitoring",
    short: "Kontinuierliches Monitoring von Fix-, Variabel- und Gemeinkosten zur frühzeitigen Erkennung von Kostentreibern.",
    portfolio_area: "solutions",
    solution_cluster: "insights_finance",
    priority: "green",
    tags: { intent: ["transparency", "insights"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi"] },
    outputs: [
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen",
      "Monitoring- & Alerting-Setup"
    ]
  },
  {
    id: "investitionscontrolling-capex",
    domain: "finance",
    title: "Investitionscontrolling / CAPEX",
    short: "Steuerung von CAPEX-Projekten mit transparenter Budget-, Fortschritts- und Nutzenkontrolle.",
    portfolio_area: "solutions",
    solution_cluster: "insights_finance",
    priority: "green",
    tags: { intent: ["transparency", "insights"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi"] },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "KPI-Definition & Kennzahlenkatalog",
      "Forecasting-Modell"
    ]
  },
  {
    id: "customer-lifetime-value",
    domain: "sales_marketing",
    title: "Customer Lifetime Value",
    short: "Berechnung und Visualisierung des Kundenwerts zur besseren Priorisierung von Vertriebs- und Marketingmaßnahmen.",
    portfolio_area: "solutions",
    solution_cluster: "insights_sales_marketing",
    priority: "green",
    tags: { intent: ["insights"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi", "ai"] },
    outputs: [
      "KI-Modell (Pilot)",
      "Management-Dashboard",
      "Priorisierte Maßnahmenliste"
    ]
  },
  {
    id: "lead-scoring",
    domain: "sales_marketing",
    title: "Lead Scoring",
    short: "Bewertung eingehender Leads nach Abschlusswahrscheinlichkeit für effizientere Vertriebssteuerung.",
    portfolio_area: "solutions",
    solution_cluster: "insights_sales_marketing",
    priority: "green",
    tags: { intent: ["insights", "automation"], data_scope: "multi_source", complexity: "m", tech_hint: ["ai", "bi"] },
    outputs: [
      "KI-Modell (Pilot)",
      "Datenpipeline- und Integrationssetup",
      "Handlungs- und Entscheidungsempfehlungen"
    ]
  },
  {
    id: "sales-funnel-analyse",
    domain: "sales_marketing",
    title: "Sales Funnel Analyse",
    short: "Analyse von Funnel-Stufen und Conversion-Raten zur gezielten Optimierung von Vertrieb und Marketing.",
    portfolio_area: "solutions",
    solution_cluster: "insights_sales_marketing",
    priority: "green",
    tags: { intent: ["insights", "transparency"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi"] },
    outputs: [
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen",
      "Optimierungsmodell"
    ]
  },
  {
    id: "reklamations-analyse",
    domain: "sales_marketing",
    title: "Reklamations-Analyse",
    short: "Transparenz über Reklamationsursachen, Häufigkeiten und Kosten zur nachhaltigen Qualitätsverbesserung.",
    portfolio_area: "solutions",
    solution_cluster: "insights_sales_marketing",
    priority: "green",
    tags: { intent: ["insights", "transparency"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi"] },
    outputs: [
      "KPI-Definition & Kennzahlenkatalog",
      "Handlungs- und Entscheidungsempfehlungen",
      "Priorisierte Maßnahmenliste"
    ]
  },
  {
    id: "lieferantenscoring",
    domain: "procurement",
    title: "Lieferantenscoring",
    short: "Bewertung von Lieferanten nach Preis, Qualität und Lieferperformance für bessere Beschaffungsentscheidungen.",
    portfolio_area: "solutions",
    solution_cluster: "insights_procurement",
    priority: "green",
    tags: { intent: ["insights", "transparency"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi"] },
    outputs: [
      "KPI-Definition & Kennzahlenkatalog",
      "Handlungs- und Entscheidungsempfehlungen",
      "Risiko- und Maßnahmenkatalog"
    ]
  },
  {
    id: "oee-analyse",
    domain: "production",
    title: "OEE-Analyse",
    short: "Auswertung von Verfügbarkeit, Leistung und Qualität zur transparenten Steuerung der Gesamtanlageneffektivität.",
    portfolio_area: "solutions",
    solution_cluster: "insights_production_logistics",
    priority: "green",
    tags: { intent: ["insights", "transparency"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi"] },
    outputs: [
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen",
      "Priorisierte Maßnahmenliste"
    ]
  },
  {
    id: "durchlaufzeit-bottleneck-analyse",
    domain: "production",
    title: "Durchlaufzeit- und Bottleneck-Analyse",
    short: "Identifikation von Engpässen und Verzögerungen entlang der Prozesskette zur Steigerung des Materialflusses.",
    portfolio_area: "solutions",
    solution_cluster: "insights_production_logistics",
    priority: "green",
    tags: { intent: ["insights"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi", "integration"] },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "Optimierungsmodell",
      "Monitoring- & Alerting-Setup"
    ]
  },
  {
    id: "itsm-analytics",
    domain: "it_data",
    title: "ITSM Analytics",
    short: "Analyse von Tickets, SLA-Einhaltung und Servicequalität zur datenbasierten Steuerung des IT-Betriebs.",
    portfolio_area: "solutions",
    solution_cluster: "insights_it_ops",
    priority: "green",
    tags: { intent: ["insights", "transparency"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi", "integration"] },
    outputs: [
      "Betriebs- und Supportmodell",
      "Ticket- und Service-Automatisierung",
      "Optimierungsmodell"
    ]
  },
  {
    id: "cloud-cost-observability",
    domain: "it_data",
    title: "Cloud-Cost-Observability",
    short: "Transparenz über Cloud-Kosten und Ressourcennutzung zur kontinuierlichen Kosten- und Effizienzoptimierung.",
    portfolio_area: "solutions",
    solution_cluster: "insights_it_ops",
    priority: "green",
    tags: { intent: ["transparency", "insights"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi", "integration"] },
    outputs: [
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen",
      "Optimierungsmodell"
    ]
  },
  {
    id: "cybersicherheit-dashboard",
    domain: "it_data",
    title: "Cybersicherheit-Dashboard",
    short: "Zentrale Sicht auf Sicherheitslage, Vorfälle und Reaktionsfähigkeit für ein belastbares Security-Controlling.",
    portfolio_area: "solutions",
    solution_cluster: "insights_it_ops",
    priority: "green",
    tags: { intent: ["transparency", "compliance"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi", "governance"] },
    outputs: [
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen",
      "Betriebs- und Supportmodell"
    ]
  },
  {
    id: "prozesseffizienz-analyse",
    domain: "it_data",
    title: "Prozesseffizienz-Analyse",
    short: "Messung und Vergleich von Prozesslaufzeiten, Aufwänden und Qualitätskennzahlen zur gezielten Effizienzsteigerung.",
    portfolio_area: "solutions",
    solution_cluster: "insights_it_ops",
    priority: "green",
    tags: { intent: ["insights", "automation"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi", "integration"] },
    outputs: [
      "Management-Dashboard",
      "Handlungs- und Entscheidungsempfehlungen",
      "Priorisierte Maßnahmenliste"
    ]
  },

  // Block 3: Automatisierung & KI Fokus-Use-Cases
  {
    id: "sales-chatbot-webseite",
    domain: "sales_marketing",
    title: "Sales-Chatbot Webseite",
    short: "Automatisierter Web-Chatbot zur Lead-Qualifizierung und Übergabe qualifizierter Anfragen an den Vertrieb.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_sales_marketing",
    priority: "green",
    tags: { intent: ["automation", "insights"], data_scope: "single_source", complexity: "m", tech_hint: ["ai", "integration"] },
    outputs: [
      "KI-Modell (Pilot)",
      "Monitoring- & Alerting-Setup",
      "Handlungs- und Entscheidungsempfehlungen"
    ]
  },
  {
    id: "dynamic-pricing",
    domain: "sales_marketing",
    title: "Dynamic Pricing",
    short: "Dynamische Preissteuerung auf Basis von Nachfrage, Wettbewerb und Margenzielen.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_sales_marketing",
    priority: "green",
    tags: { intent: ["automation", "insights"], data_scope: "multi_source", complexity: "l", tech_hint: ["ai", "bi"] },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "Monitoring- & Alerting-Setup",
      "KPI-Definition & Kennzahlenkatalog"
    ]
  },
  {
    id: "ausschreibungsautomatisierung",
    domain: "procurement",
    title: "Ausschreibungsautomatisierung",
    short: "Automatisierte Erstellung, Auswertung und Dokumentation von Ausschreibungen für schnellere Beschaffungszyklen.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_procurement",
    priority: "green",
    tags: { intent: ["automation"], data_scope: "multi_source", complexity: "m", tech_hint: ["integration", "ai"] },
    outputs: [
      "Automatisierter Workflow",
      "Handlungs- und Entscheidungsempfehlungen",
      "Optimierungsmodell"
    ]
  },
  {
    id: "automatisierte-rechnungsverarbeitung",
    domain: "finance",
    title: "Automatisierte Rechnungsverarbeitung",
    short: "Automatische Extraktion, Prüfung und Verbuchung von Eingangsrechnungen zur Beschleunigung des Finanzprozesses.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_finance",
    priority: "green",
    tags: { intent: ["automation"], data_scope: "multi_source", complexity: "m", tech_hint: ["ai", "integration"] },
    outputs: [
      "Automatisierter Workflow",
      "Handlungs- und Entscheidungsempfehlungen",
      "KPI-Definition & Kennzahlenkatalog"
    ]
  },
  {
    id: "ai-helpdeskassistent",
    domain: "it_data",
    title: "AI-Helpdeskassistent",
    short: "KI-Assistenz im Agentenarbeitsplatz mit Lösungsvorschlägen für wiederkehrende IT-Anfragen.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_it_ops",
    priority: "green",
    tags: { intent: ["automation", "insights"], data_scope: "single_source", complexity: "m", tech_hint: ["ai"] },
    outputs: [
      "Ticket- und Service-Automatisierung",
      "Handlungs- und Entscheidungsempfehlungen",
      "Zielarchitektur & Datenmodell"
    ]
  },
  {
    id: "agentic-coding",
    domain: "it_data",
    title: "Agentic-Coding",
    short: "Einsatz autonomer Coding-Agents zur Beschleunigung von Entwicklungsaufgaben mit kontrollierten Qualitätsleitplanken.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_it_ops",
    priority: "green",
    tags: { intent: ["automation", "scale"], data_scope: "single_source", complexity: "l", tech_hint: ["ai"] },
    outputs: [
      "KI-Modell (Pilot)",
      "Zielbild & Strategiepapier",
      "Monitoring- & Alerting-Setup"
    ]
  },
  {
    id: "self-service-helpdesk",
    domain: "it_data",
    title: "Self-Service Helpdesk",
    short: "Nutzerseitige Selbsthilfe über Portal und automatisierte Lösungspfade.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_it_ops",
    priority: "green",
    tags: { intent: ["automation"], data_scope: "single_source", complexity: "m", tech_hint: ["integration", "ai"] },
    outputs: [
      "Automatisierter Workflow",
      "Ticket- und Service-Automatisierung",
      "Zielarchitektur & Datenmodell"
    ]
  },
  {
    id: "ki-preisueberwachung",
    domain: "procurement",
    title: "KI-Preisüberwachung",
    short: "Kontinuierliche KI-gestützte Überwachung von Preisänderungen und Beschaffungsrisiken über Lieferanten hinweg.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_procurement",
    priority: "green",
    tags: { intent: ["automation", "insights"], data_scope: "multi_source", complexity: "m", tech_hint: ["ai", "bi"] },
    outputs: [
      "Monitoring- & Alerting-Setup",
      "Anomalieerkennung",
      "Handlungs- und Entscheidungsempfehlungen"
    ]
  },
  {
    id: "automatisierte-bestellverarbeitung",
    domain: "procurement",
    title: "Automatisierte Bestellverarbeitung",
    short: "Durchgängige Automatisierung von Bestellprozessen von der Anlage bis zur Statusrückmeldung.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_procurement",
    priority: "green",
    tags: { intent: ["automation"], data_scope: "multi_source", complexity: "m", tech_hint: ["integration"] },
    outputs: [
      "Automatisierter Workflow",
      "Handlungs- und Entscheidungsempfehlungen",
      "Optimierungsmodell"
    ]
  },
  {
    id: "spendmanagement-automatisieren",
    domain: "procurement",
    title: "Spendmanagement automatisieren",
    short: "Automatisierte Auswertung von Ausgabenstrukturen zur Identifikation von Einsparpotenzialen und Maverick Buying.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_procurement",
    priority: "green",
    tags: { intent: ["automation", "insights"], data_scope: "multi_source", complexity: "m", tech_hint: ["bi", "ai"] },
    outputs: [
      "KI-Modell (Pilot)",
      "Anomalieerkennung",
      "Priorisierte Maßnahmenliste"
    ]
  },
  {
    id: "kyc-automatisierung",
    domain: "risk_compliance",
    title: "KYC-Automatisierung",
    short: "Automatisierte KYC-Prüfprozesse mit risikobasierter Priorisierung für schnellere und sichere Onboarding-Abläufe.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_risk_compliance",
    priority: "green",
    tags: { intent: ["automation", "compliance"], data_scope: "multi_source", complexity: "m", tech_hint: ["ai", "governance"] },
    outputs: [
      "Automatisierter Workflow",
      "Risiko- und Maßnahmenkatalog",
      "Dokumentations- und Nachweispaket"
    ]
  },
  {
    id: "esg-datenerhebung-automatisiert",
    domain: "risk_compliance",
    title: "Automatisierte ESG-Datenerhebung",
    short: "Automatisierte Sammlung und Aufbereitung von ESG-Daten für konsistente Nachhaltigkeitsberichterstattung.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_risk_compliance",
    priority: "green",
    tags: { intent: ["automation", "compliance"], data_scope: "enterprise_wide", complexity: "m", tech_hint: ["integration", "governance"] },
    outputs: [
      "Datenpipeline- und Integrationssetup",
      "Automatisierter Workflow",
      "KPI-Definition & Kennzahlenkatalog"
    ]
  },
  {
    id: "ai-oberflaechenanalyse",
    domain: "it_data",
    title: "AI-Oberflächenanalyse",
    short: "KI-gestützte Analyse digitaler Oberflächen zur Erkennung von Usability-Hürden und Optimierungspotenzialen.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_it_ops",
    priority: "green",
    tags: { intent: ["automation", "insights"], data_scope: "single_source", complexity: "m", tech_hint: ["ai"] },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "Priorisierte Maßnahmenliste",
      "Zielarchitektur & Datenmodell"
    ]
  },
  {
    id: "ai-produktentwicklung",
    domain: "rnd",
    title: "AI-Produktentwicklung",
    short: "Beschleunigte Produktentwicklung durch KI-gestützte Ideation, Prototyping und Validierung.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_rnd",
    priority: "green",
    tags: { intent: ["automation", "scale"], data_scope: "multi_source", complexity: "l", tech_hint: ["ai"] },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "Szenario- und Simulationsanalyse",
      "KI-Modell (Pilot)"
    ]
  },
  {
    id: "rag-literaturrecherche",
    domain: "rnd",
    title: "RAG-Literaturrecherche",
    short: "Recherche-Assistenz mit Retrieval-Augmented Generation für schnellere Auswertung wissenschaftlicher Quellen.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_rnd",
    priority: "green",
    tags: { intent: ["automation", "insights"], data_scope: "multi_source", complexity: "m", tech_hint: ["ai"] },
    outputs: [
      "KI-Modell (Pilot)",
      "Handlungs- und Entscheidungsempfehlungen",
      "Szenario- und Simulationsanalyse"
    ]
  },
  {
    id: "ai-video-qualitaetsanalyse",
    domain: "production",
    title: "AI-Video-Qualitätsanalyse",
    short: "Qualitätsautomatisierung mit Schwerpunkt auf visueller Inspektion per Video- und Bilddaten.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_production_logistics",
    priority: "green",
    tags: { intent: ["automation", "insights"], data_scope: "single_source", complexity: "l", tech_hint: ["ai"] },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "KI-Modell (Pilot)",
      "Monitoring- & Alerting-Setup"
    ]
  },
  {
    id: "ki-warenausgangs-scanning",
    domain: "logistics",
    title: "KI-Warenausgangs-Scanning",
    short: "KI-gestütztes Scanning im Warenausgang zur automatischen Vollständigkeits- und Qualitätskontrolle vor Versand.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_production_logistics",
    priority: "green",
    tags: { intent: ["automation"], data_scope: "single_source", complexity: "m", tech_hint: ["ai", "integration"] },
    outputs: [
      "Handlungs- und Entscheidungsempfehlungen",
      "Dokumentations- und Nachweispaket",
      "Optimierungsmodell"
    ]
  },
  {
    id: "objekterkennung",
    domain: "production",
    title: "Objekterkennung",
    short: "Generische Computer-Vision-Erkennung als Baustein für Qualitäts- und Logistikprozesse.",
    portfolio_area: "automation_ai",
    solution_cluster: "automation_production_logistics",
    priority: "green",
    tags: { intent: ["automation", "insights"], data_scope: "single_source", complexity: "l", tech_hint: ["ai"] },
    outputs: [
      "KI-Modell (Pilot)",
      "Monitoring- & Alerting-Setup",
      "KPI-Definition & Kennzahlenkatalog"
    ]
  }
];

const defaultClusterByDomain: Record<UseCaseDomain, SolutionClusterTag> = {
  general_mgmt: "orientation_prioritization",
  it_data: "data_mgmt_architecture",
  finance: "insights_finance",
  sales_marketing: "insights_sales_marketing",
  procurement: "insights_procurement",
  production: "insights_production_logistics",
  logistics: "insights_production_logistics",
  hr: "automation_cross_domain",
  rnd: "automation_rnd",
  risk_compliance: "automation_risk_compliance",
};

const defaultBestForByDomain: Record<UseCaseDomain, string[]> = {
  general_mgmt: ["Geschäftsführung", "Bereichsleitungen"],
  it_data: ["IT-Leitung", "Data-Teams"],
  finance: ["Finance", "Controlling"],
  sales_marketing: ["Sales", "Marketing"],
  procurement: ["Beschaffung", "Einkauf"],
  production: ["Produktion", "Operations"],
  logistics: ["Logistik", "Operations"],
  hr: ["HR", "People & Culture"],
  rnd: ["R&D", "Innovationsteams"],
  risk_compliance: ["Risk", "Compliance"],
};

const curatedUseCaseData: Record<string, { details: NonNullable<UseCase["details"]> }> = {
  "data-ai-leadership": {
    details: {
      problem: "Führungsteams treiben Data- und KI-Initiativen ohne einheitliche Steuerungslogik und klare Verantwortungen.",
      typicalResult: "Ein belastbares Führungsmodell mit klaren Entscheidungswegen, KPIs und Verantwortlichkeiten.",
      typicalDeliverables: ["KPI Definition Workshop", "Datenstrategie Sprint", "Management Reporting Setup"],
      bestFor: ["Geschäftsführung", "Transformation Office", "Bereichsleitungen"],
    },
  },
  "data-catalog": {
    details: {
      problem: "Begriffe, Datenobjekte und Verantwortlichkeiten sind verteilt oder uneinheitlich dokumentiert.",
      typicalResult: "Ein zentraler, gepflegter Katalog mit klaren Definitionen und eindeutigen Verantwortlichkeiten.",
      typicalDeliverables: ["KPI & Daten-Glossar Sprint", "Datenquellen- & Integrationsanalyse", "Governance Starter"],
      bestFor: ["Führungsteams mit Governance-Fokus", "Fachbereiche mit Abstimmungsbedarf", "Organisationen mit Compliance-Anforderungen"],
    },
  },
  "data-mesh-organisation": {
    details: {
      problem: "Domänen arbeiten mit Daten, aber Ownership, Standards und Verantwortung sind nicht klar geregelt.",
      typicalResult: "Ein Data-Mesh-Betriebsmodell mit klaren Rollen, Verantwortungen und Umsetzungsfahrplan.",
      typicalDeliverables: ["Data Governance Starter", "Target Architecture", "Domain Enablement Plan"],
      bestFor: ["Data-Leads", "Domänenverantwortliche", "IT-Architektur"],
    },
  },
  "datenstrategie": {
    details: {
      problem: "Es fehlen priorisierte Dateninitiativen, ein klares Zielbild und eine umsetzbare Reihenfolge.",
      typicalResult: "Eine abgestimmte Datenstrategie mit priorisierter Roadmap und messbaren Business-Zielen.",
      typicalDeliverables: ["Datenstrategie Sprint", "Roadmap", "KPI Definition Workshop"],
      bestFor: ["Geschäftsführung", "Strategieteams", "Data-Verantwortliche"],
    },
  },
  "dsgvo-dsb": {
    details: {
      problem: "Datenschutzanforderungen sind verteilt umgesetzt und im Alltag schwer auditierbar nachweisbar.",
      typicalResult: "Ein praktikables DSGVO-Setup mit klaren Rollen, Nachweisen und definierten Prozessen.",
      typicalDeliverables: ["Data Governance Starter", "KPI & Daten-Glossar Sprint", "IAM Konzept"],
      bestFor: ["Datenschutzbeauftragte", "Compliance", "Fachbereiche mit personenbezogenen Daten"],
    },
  },
  iam: {
    details: {
      problem: "Zugriffsrechte sind historisch gewachsen, inkonsistent und nur eingeschränkt auditierbar.",
      typicalResult: "Ein strukturiertes IAM-Zielbild mit rollenbasierten Rechten und klaren Governance-Prozessen.",
      typicalDeliverables: ["IAM Konzept", "Rollen- und Rechte-Blueprint", "Integrationsanalyse"],
      bestFor: ["IT-Security", "Compliance", "IT-Operations"],
    },
  },
  dwh: {
    details: {
      problem: "Reporting basiert auf fragmentierten Quellen, manuellen Extracts und uneinheitlicher Datenlogik.",
      typicalResult: "Ein stabiles Data-Warehouse-Fundament als Single Source of Truth für Analytics und Reporting.",
      typicalDeliverables: ["DWH Starter", "Source Integration Review", "Reporting Standards"],
      bestFor: ["Data Engineering", "BI-Teams", "Finance & Controlling"],
    },
  },
  "data-lake": {
    details: {
      problem: "Unstrukturierte und strukturierte Daten sind nicht zentral nutzbar und schwer governbar.",
      typicalResult: "Ein skalierbares Data-Lake/Lakehouse-Fundament mit klaren Ingestion- und Governance-Regeln.",
      typicalDeliverables: ["Source Integration Review", "DWH/Lakehouse Starter", "Target Architecture"],
      bestFor: ["Data Platform Teams", "IT-Architektur", "Analytics-Teams"],
    },
  },
  "management-dashboard": {
    details: {
      problem: "Management-Entscheidungen basieren auf verstreuten Reports und verspäteten Kennzahlen.",
      typicalResult: "Ein zentrales Steuerungsdashboard mit konsistenten KPIs und schneller Entscheidungsgrundlage.",
      typicalDeliverables: ["BI Fix & Fertig Setup", "KPI Definition Workshop", "Erster Management-Bericht"],
      bestFor: ["Geschäftsführung", "Bereichsleitungen", "Organisationen mit mehreren Steuerungsbereichen"],
    },
  },
  "sales-dashboard": {
    details: {
      problem: "Vertrieb und Management haben keine einheitliche, aktuelle Sicht auf Pipeline und Performance.",
      typicalResult: "Ein Sales-Dashboard mit klaren KPIs, Pipeline-Transparenz und automatischen Updates.",
      typicalDeliverables: ["BI Fix & Fertig Setup", "KPI Definition Workshop", "KPI & Daten-Glossar Sprint"],
      bestFor: ["Sales-Leitung", "Vertriebsteams", "Unternehmen mit CRM-basierter Pipeline-Steuerung"],
    },
  },
  "itsm-analytics": {
    details: {
      problem: "Servicequalität und SLA-Erfüllung werden mit isolierten Reports statt übergreifender Transparenz gesteuert.",
      typicalResult: "Ein ITSM-Cockpit mit Ticket-, SLA- und Ursachenanalysen für datenbasierte Steuerung.",
      typicalDeliverables: ["Source Integration Review", "BI Setup", "Management Bericht ITSM"],
      bestFor: ["IT-Operations", "Service Management", "IT-Leitung"],
    },
  },
  "ai-helpdeskassistent": {
    details: {
      problem: "Support-Teams bearbeiten wiederkehrende Anfragen manuell und verlieren Zeit bei Erstlösungen.",
      typicalResult: "Ein KI-Assistent unterstützt Agenten mit Lösungsvorschlägen und reduziert Bearbeitungszeiten.",
      typicalDeliverables: ["Integrationsanalyse Ticket-/Wissensdaten", "KPI-Set für Assistenzqualität", "Betriebsmonitoring"],
      bestFor: ["Helpdesk-Teams", "IT-Operations", "Service-Owner"],
    },
  },
  "helpdesk-automation": {
    details: {
      problem: "Tickets landen häufig im falschen Team und verursachen unnötige Weiterleitungen und SLA-Risiken.",
      typicalResult: "Automatisiertes Routing mit klarer Priorisierung und transparenter SLA-Steuerung.",
      typicalDeliverables: ["Ticketdaten-Integrationsanalyse", "Routing-Regelwerk", "Service-Reporting-Standards"],
      bestFor: ["IT-Operations", "Service Desk", "Prozessverantwortliche"],
    },
  },
  "automatisierte-rechnungsverarbeitung": {
    details: {
      problem: "Rechnungsprüfung und Freigaben sind manuell, fehleranfällig und verursachen lange Durchlaufzeiten.",
      typicalResult: "Ein automatisierter Rechnungseingangsprozess mit transparentem Status und kürzeren Bearbeitungszeiten.",
      typicalDeliverables: ["Source Integration Review", "Workflow-/Freigabe-Design", "Prozess-KPI-Reporting"],
      bestFor: ["Finance", "Shared Services", "Accounting Operations"],
    },
  },
  "ki-preisueberwachung": {
    details: {
      problem: "Preisänderungen und Beschaffungsrisiken werden zu spät erkannt und nur manuell ausgewertet.",
      typicalResult: "Kontinuierliche Preisüberwachung mit Frühwarnungen und klaren Handlungsempfehlungen.",
      typicalDeliverables: ["Preis- und Lieferantendatenanalyse", "Warnlogik für Abweichungen", "Management-Report"],
      bestFor: ["Einkauf", "Category Management", "Finanzsteuerung"],
    },
  },
  "ai-video-qualitaetsanalyse": {
    details: {
      problem: "Visuelle Qualitätsprüfungen sind personalintensiv und Inkonsistenzen werden zu spät erkannt.",
      typicalResult: "KI-gestützte Videoanalyse erkennt Qualitätsabweichungen frühzeitig und reduziert Ausschuss.",
      typicalDeliverables: ["Integrationsanalyse für Bild-/Videodaten", "KI-Qualitätsmodell (Pilot)", "Monitoring der Modellgüte"],
      bestFor: ["Produktion", "Qualitätssicherung", "Werksleitung"],
    },
  },
};

export const useCases: UseCase[] = rawUseCases.map((useCase) => {
  const resolvedCluster = useCase.solution_cluster ?? defaultClusterByDomain[useCase.domain];
  const resolvedPortfolio =
    useCase.portfolio_area ?? (resolvedCluster.startsWith("automation_") ? "automation_ai" : "solutions");
  const details = useCase.details ?? {
    problem: useCase.short,
    typicalResult: useCase.outputs[0] ?? "Messbarer Mehrwert durch ein klar priorisiertes Produkt.",
    typicalDeliverables: useCase.outputs.slice(0, 3),
    bestFor: defaultBestForByDomain[useCase.domain],
  };

  const curated = curatedUseCaseData[useCase.id];
  return {
    ...useCase,
    solution_cluster: resolvedCluster,
    portfolio_area: resolvedPortfolio,
    priority: useCase.priority ?? "normal",
    details: curated?.details ?? details,
  };
});

export type UiClusterId =
  | "orientation_prioritization"
  | "data_mgmt_architecture"
  | "insights_analytics"
  | "general_management"
  | "finance"
  | "sales_marketing"
  | "procurement"
  | "it_ops"
  | "production_logistics"
  | "risk_compliance"
  | "rnd"
  | "cross_domain_automation";

export const uiClusterOrder: UiClusterId[] = [
  "orientation_prioritization",
  "data_mgmt_architecture",
  "insights_analytics",
  "general_management",
  "finance",
  "sales_marketing",
  "procurement",
  "it_ops",
  "production_logistics",
  "risk_compliance",
  "rnd",
  "cross_domain_automation",
];

export const uiClusterLabels: Record<UiClusterId, string> = {
  orientation_prioritization: "Orientierung & Priorisierung",
  data_mgmt_architecture: "Datenmanagement & Architektur",
  insights_analytics: "Insights & Analytics",
  general_management: "General Management",
  finance: "Finance",
  sales_marketing: "Sales & Marketing",
  procurement: "Beschaffung",
  it_ops: "IT & Operations",
  production_logistics: "Produktion & Logistik",
  risk_compliance: "Risiko & Compliance",
  rnd: "Research & Development",
  cross_domain_automation: "Bereichsübergreifende Automatisierung",
};

export function getUiClusterForUseCase(useCase: UseCase): UiClusterId {
  if (useCase.solution_cluster === "orientation_prioritization") return "orientation_prioritization";
  if (useCase.solution_cluster === "data_mgmt_architecture") return "data_mgmt_architecture";

  if (useCase.solution_cluster === "insights_general_mgmt") return "insights_analytics";

  if (useCase.domain === "finance") return "finance";
  if (useCase.domain === "sales_marketing") return "sales_marketing";
  if (useCase.domain === "procurement") return "procurement";
  if (useCase.domain === "it_data") return "it_ops";
  if (useCase.domain === "production" || useCase.domain === "logistics") return "production_logistics";
  if (useCase.domain === "risk_compliance") return "risk_compliance";
  if (useCase.domain === "rnd") return "rnd";
  if (useCase.domain === "hr" || useCase.solution_cluster === "automation_cross_domain") return "cross_domain_automation";
  if (useCase.domain === "general_mgmt") return "general_management";

  return "insights_analytics";
}

export function getUseCasesForUiCluster(clusterId: UiClusterId): UseCase[] {
  return useCases.filter((uc) => getUiClusterForUseCase(uc) === clusterId);
}

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
