import { getProductById } from './useCases';
import { getDeliverableById } from './deliverables';

export type Recommendation = {
  deliverableId: string;
  defaultEnabled: boolean;
  reason: string; // 1 Satz: warum vorgeschlagen
};

export type ProductBundle = {
  productId: string;
  recommendations: Recommendation[];
};

// Hard Overrides für MVP Products
const hardOverrides: Record<string, Recommendation[]> = {
  // Sales Dashboard (Sales & Marketing)
  "sales-dashboard": [
    {
      deliverableId: "bi_setup",
      defaultEnabled: true,
      reason: "BI-System als Basis für Sales-Dashboards"
    },
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Definition der wichtigsten Sales-KPIs"
    },
    {
      deliverableId: "semantic_layer",
      defaultEnabled: true,
      reason: "Einheitliche Kennzahlenlogik im Dashboard"
    },
    {
      deliverableId: "mgmt_report_1",
      defaultEnabled: false,
      reason: "Ergänzender Management-Report zum Dashboard (optional)"
    },
    {
      deliverableId: "glossary_sprint",
      defaultEnabled: false,
      reason: "Gemeinsames Verständnis von Sales-Begriffen (optional)"
    },
    {
      deliverableId: "pbi_training_user",
      defaultEnabled: false,
      reason: "Schulung für Sales-Team (optional)"
    }
  ],

  // Sales Reporting (Sales & Marketing)
  "sales-reporting": [
    {
      deliverableId: "reporting_standards",
      defaultEnabled: true,
      reason: "Einheitliche Reporting-Struktur für Sales-Berichte"
    },
    {
      deliverableId: "mgmt_report_1",
      defaultEnabled: true,
      reason: "Regelmäßiger Sales-Bericht für Management und Vertrieb"
    },
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Definition der Kennzahlen für konsistente Sales-Reports"
    },
    {
      deliverableId: "bi_setup",
      defaultEnabled: false,
      reason: "BI-Basis, falls noch kein Reporting-System vorhanden"
    },
    {
      deliverableId: "self_service_enablement",
      defaultEnabled: false,
      reason: "Sales-Team kann Berichte selbst pflegen (optional)"
    }
  ],

  // Management Dashboard (General Management)
  "management-dashboard": [
    {
      deliverableId: "bi_setup",
      defaultEnabled: true,
      reason: "Stabile BI-Basis für bereichsübergreifende Management-Steuerung"
    },
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Abgestimmte Management-KPIs als Grundlage für Entscheidungsfähigkeit"
    },
    {
      deliverableId: "semantic_layer",
      defaultEnabled: true,
      reason: "Einheitliche Kennzahlen über alle Management-Reports"
    },
    {
      deliverableId: "mgmt_report_1",
      defaultEnabled: true,
      reason: "Schneller Einstieg mit einem steuerungsrelevanten Management-Report"
    },
    {
      deliverableId: "self_service_enablement",
      defaultEnabled: false,
      reason: "Bereichsverantwortliche für eigenes Reporting befähigen"
    }
  ],

  // Controlling via BI (Finance)
  "controlling-via-bi": [
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Definition der Controlling-KPIs"
    },
    {
      deliverableId: "semantic_layer",
      defaultEnabled: true,
      reason: "Konsistente Kennzahlenlogik für Finance-Reports"
    },
    {
      deliverableId: "reporting_standards",
      defaultEnabled: true,
      reason: "Einheitliche Reporting-Struktur für Finance"
    },
    {
      deliverableId: "mgmt_report_1",
      defaultEnabled: true,
      reason: "Controlling-Bericht für Management"
    },
    {
      deliverableId: "dwh_starter",
      defaultEnabled: false,
      reason: "Zentrale Datenablage, falls noch nicht vorhanden"
    }
  ],

  // Setup BI (IT & Data)
  "setup-bi": [
    {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Datenquellen und Integrationsfähigkeit als Startpunkt klären"
    },
    {
      deliverableId: "bi_setup",
      defaultEnabled: true,
      reason: "Komplettes BI-System Setup"
    },
    {
      deliverableId: "semantic_layer",
      defaultEnabled: true,
      reason: "Einheitliches Kennzahlenmodell für alle Reports"
    },
    {
      deliverableId: "etl_pipeline",
      defaultEnabled: false,
      reason: "Stabile Datenpipelines für regelmäßige Aktualisierung"
    },
    {
      deliverableId: "self_service_enablement",
      defaultEnabled: false,
      reason: "Fachbereiche für eigenständiges Reporting befähigen"
    }
  ],

  // Excel to BI Migration (Finance)
  "excel-to-bi-migration": [
    {
      deliverableId: "bi_setup",
      defaultEnabled: true,
      reason: "Excel-Reports in ein professionelles BI-System überführen"
    },
    {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Bestehende Excel- und Quelldaten für die Migration analysieren"
    },
    {
      deliverableId: "data_migration",
      defaultEnabled: true,
      reason: "Strukturierte Migration der Report- und Quelldaten"
    },
    {
      deliverableId: "data_quality",
      defaultEnabled: false,
      reason: "Datenqualität vor und während der Migration absichern"
    },
    {
      deliverableId: "reporting_standards",
      defaultEnabled: false,
      reason: "Einheitliche Report-Logik nach der Migration"
    },
    {
      deliverableId: "pbi_training_user",
      defaultEnabled: false,
      reason: "Enablement für Fachbereiche nach Go-Live"
    }
  ],

  // Sales Forecast (Sales & Marketing)
  "sales-forecast": [
    {
      deliverableId: "bi_setup",
      defaultEnabled: true,
      reason: "Belastbare BI-Basis fuer Forecasting-Dashboards"
    },
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Saubere KPI-Definition als Grundlage fuer Prognosen"
    },
    {
      deliverableId: "mgmt_report_1",
      defaultEnabled: true,
      reason: "Management-Reporting fuer Forecast-Ergebnisse"
    },
    {
      deliverableId: "forecast_model",
      defaultEnabled: false,
      reason: "KI-gestütztes Forecasting als nächster Ausbau"
    }
  ],

  // Churn Prevention (Sales & Marketing)
  "churn-prevention-algo": [
    {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Kunden- und Verhaltensdaten für das Modell integrieren"
    },
    {
      deliverableId: "glossary_sprint",
      defaultEnabled: true,
      reason: "Einheitliche Definition von Churn- und Risiko-KPIs"
    },
    {
      deliverableId: "churn_model",
      defaultEnabled: true,
      reason: "KI-Modell zur Früherkennung von Abwanderungsrisiken"
    },
    {
      deliverableId: "ai_review",
      defaultEnabled: false,
      reason: "Modellqualität und Einsatzreife vor Rollout prüfen"
    },
    {
      deliverableId: "bi_setup",
      defaultEnabled: false,
      reason: "Dashboard zur Nutzung der Modellergebnisse im Vertrieb"
    }
  ],

  // Predictive Maintenance (Production)
  "predictive-maintenance": [
    {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Bewertung und Anbindung von Maschinen- und Sensordaten"
    },
    {
      deliverableId: "predictive_maintenance",
      defaultEnabled: true,
      reason: "KI-Modell für vorausschauende Wartung"
    },
    {
      deliverableId: "dwh_starter",
      defaultEnabled: false,
      reason: "Zentrale Datenbasis, falls noch nicht vorhanden"
    },
    {
      deliverableId: "monitoring_ops",
      defaultEnabled: false,
      reason: "Betriebsüberwachung des Modells im laufenden Betrieb"
    }
  ],

  // Anomaly Detection (IT & Data)
  "anomaly-detection": [
    {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Fundierte Analyse der Datenquellen für Anomalie-Use-Cases"
    },
    {
      deliverableId: "anomaly_detection",
      defaultEnabled: true,
      reason: "Automatisierte Erkennung auffälliger Muster und Risiken"
    },
    {
      deliverableId: "mgmt_report_1",
      defaultEnabled: false,
      reason: "Management-Sicht auf Auffälligkeiten und Risiken"
    }
  ],

  // Datenstrategie (General Management)
  "datenstrategie": [
    {
      deliverableId: "strategy_sprint",
      defaultEnabled: true,
      reason: "Strategischer Rahmen und priorisierte Dateninitiativen"
    },
    {
      deliverableId: "roadmap",
      defaultEnabled: true,
      reason: "Umsetzungsroadmap mit Meilensteinen und Abhängigkeiten"
    },
    {
      deliverableId: "change_enablement",
      defaultEnabled: true,
      reason: "Adoption und organisatorische Umsetzung begleiten"
    },
    {
      deliverableId: "maturity_assessment",
      defaultEnabled: false,
      reason: "Reifegrad als Ergänzung zur Strategieentwicklung"
    }
  ],

  // KI Strategie (General Management)
  "ki-strategie": [
    {
      deliverableId: "ai_use_case_sprint",
      defaultEnabled: true,
      reason: "KI-Use-Cases priorisieren und konkretisieren"
    },
    {
      deliverableId: "strategy_sprint",
      defaultEnabled: true,
      reason: "KI-Zielbild und strategische Leitplanken"
    },
    {
      deliverableId: "roadmap",
      defaultEnabled: true,
      reason: "Priorisierte KI-Roadmap mit Use-Case-Fokus"
    },
    {
      deliverableId: "change_enablement",
      defaultEnabled: false,
      reason: "Organisatorische Adoption der KI-Initiative begleiten"
    }
  ],

  // Maturity Assessment (General Management)
  "maturity-assessment": [
    {
      deliverableId: "maturity_assessment",
      defaultEnabled: true,
      reason: "Strukturierte Reifegradanalyse als eigenständiger Assessment-Baustein"
    },
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Bewertungsrahmen und Reifegradkriterien"
    },
    {
      deliverableId: "roadmap",
      defaultEnabled: true,
      reason: "Priorisierte Maßnahmen nach dem Assessment"
    }
  ],

  // Data Mesh Organisation (General Management)
  "data-mesh-organisation": [
    {
      deliverableId: "governance_starter",
      defaultEnabled: true,
      reason: "Rollen und Föderationsmodell für Data Mesh"
    },
    {
      deliverableId: "target_architecture",
      defaultEnabled: true,
      reason: "Zielbild für Data Products und Domänenarchitektur"
    },
    {
      deliverableId: "architecture_workshop",
      defaultEnabled: true,
      reason: "Data-Mesh-Optionen und Domänenstrategie strukturieren"
    },
    {
      deliverableId: "change_enablement",
      defaultEnabled: false,
      reason: "Organisatorische Einführung des Föderationsmodells begleiten"
    },
    {
      deliverableId: "source_integration_review",
      defaultEnabled: false,
      reason: "Domänenfähigkeit und Datenquellen vertiefen"
    }
  ],

  // Data Catalog (General Management)
  "data-catalog": [
    {
      deliverableId: "glossary_sprint",
      defaultEnabled: true,
      reason: "Glossar als Kernbestandteil eines Data Catalogs"
    },
    {
      deliverableId: "governance_starter",
      defaultEnabled: true,
      reason: "Ownership und Governance-Strukturen für den Catalog"
    },
    {
      deliverableId: "data_catalog_setup",
      defaultEnabled: true,
      reason: "Technisches und fachliches Catalog-Setup"
    }
  ],

  // Data & AI Leadership (General Management)
  "data-ai-leadership": [
    {
      deliverableId: "change_enablement",
      defaultEnabled: true,
      reason: "Leadership- und Adoption-Begleitung für Data & AI"
    },
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Führungsrelevante KPI- und Steuerungslogik festlegen"
    },
    {
      deliverableId: "strategy_sprint",
      defaultEnabled: true,
      reason: "Leadership-Rahmen für Data & AI ausarbeiten"
    },
    {
      deliverableId: "roadmap",
      defaultEnabled: true,
      reason: "Transformation in klare Schritte übersetzen"
    }
  ],

  // DWH (IT & Data)
  "dwh": [
    {
      deliverableId: "dwh_starter",
      defaultEnabled: true,
      reason: "Direkter Aufbau einer zentralen Datenablage"
    },
    {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Integrationsfähigkeit und Quellenqualität absichern"
    },
    {
      deliverableId: "data_modeling",
      defaultEnabled: true,
      reason: "Belastbares Datenmodell als Architekturgrundlage"
    },
    {
      deliverableId: "etl_pipeline",
      defaultEnabled: true,
      reason: "Pipelines für regelmäßige Datenaktualisierung"
    },
    {
      deliverableId: "data_migration",
      defaultEnabled: false,
      reason: "Geplante Migration bestehender Daten in die Zielplattform"
    },
    {
      deliverableId: "reporting_standards",
      defaultEnabled: false,
      reason: "Reporting auf der neuen Datenbasis standardisieren"
    }
  ],

  // Data Lake (IT & Data)
  "data-lake": [
    {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Quellenanalyse und Ingestion-Plan als Startpunkt"
    },
    {
      deliverableId: "architecture_workshop",
      defaultEnabled: true,
      reason: "Lake- vs. Lakehouse-Optionen und Zielbild klären"
    },
    {
      deliverableId: "dwh_starter",
      defaultEnabled: true,
      reason: "Lakehouse-nahe Basisarchitektur pragmatisch etablieren"
    },
    {
      deliverableId: "data_modeling",
      defaultEnabled: false,
      reason: "Datenmodell für Lake-/Lakehouse-Schichten"
    },
    {
      deliverableId: "target_architecture",
      defaultEnabled: false,
      reason: "Detailliertes Zielbild für skalierbare Lake-Architektur"
    }
  ],

  // Enterprise Architecture Management (IT & Data)
  "enterprise-architecture-management": [
    {
      deliverableId: "architecture_workshop",
      defaultEnabled: true,
      reason: "Schnelle Klarheit über Architekturoptionen und nächste Schritte"
    },
    {
      deliverableId: "target_architecture",
      defaultEnabled: true,
      reason: "EAM-Zielbild und Prinzipien definieren"
    },
    {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Ist-Landschaft als Basis für Architekturentscheidungen"
    },
    {
      deliverableId: "roadmap",
      defaultEnabled: false,
      reason: "EAM-Maßnahmen priorisiert einplanen"
    }
  ],

  // AI Architektur & Infrastruktur (IT & Data)
  "ai-architektur-infrastruktur": [
    {
      deliverableId: "architecture_workshop",
      defaultEnabled: true,
      reason: "Architekturentscheidungen für KI-Workloads strukturieren"
    },
    {
      deliverableId: "ai_review",
      defaultEnabled: true,
      reason: "Governance und Betriebsreife von KI-Lösungen prüfen"
    },
    {
      deliverableId: "dwh_starter",
      defaultEnabled: false,
      reason: "Datenfundament für KI-Modelle bereitstellen"
    },
    {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Relevante Quellsysteme für AI identifizieren und bewerten"
    }
  ],

  // Souveraene KI Infrastruktur (IT & Data)
  "souveraene-ki-infrastruktur": [
    {
      deliverableId: "architecture_workshop",
      defaultEnabled: true,
      reason: "Souveräne KI-Architekturoptionen strukturieren"
    },
    {
      deliverableId: "security_access_review",
      defaultEnabled: true,
      reason: "Zugriffe und Sicherheitsrisiken für KI-Betrieb prüfen"
    },
    {
      deliverableId: "target_architecture",
      defaultEnabled: false,
      reason: "Detailliertes souveränes Architekturzielbild"
    },
    {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Daten- und Systemlandschaft für souveräne Umsetzung bewerten"
    }
  ],

  // Souveraene Datenarchitektur (IT & Data)
  "souveraene-datenarchitektur": [
    {
      deliverableId: "architecture_workshop",
      defaultEnabled: true,
      reason: "Souveräne Datenplattform-Optionen und Zielbild klären"
    },
    {
      deliverableId: "security_access_review",
      defaultEnabled: true,
      reason: "Zugriffs- und Sicherheitsanforderungen bewerten"
    },
    {
      deliverableId: "dwh_starter",
      defaultEnabled: false,
      reason: "Kontrollierbares Datenfundament für Kernprozesse"
    },
    {
      deliverableId: "iam_concept",
      defaultEnabled: false,
      reason: "Datenzugriffe governance-konform steuern"
    }
  ],

  // DataOps (IT & Data)
  "dataops": [
    {
      deliverableId: "monitoring_ops",
      defaultEnabled: true,
      reason: "Monitoring, Betrieb und Incident-Ablauf etablieren"
    },
    {
      deliverableId: "etl_pipeline",
      defaultEnabled: true,
      reason: "Stabile Pipelines als Betriebsgrundlage"
    },
    {
      deliverableId: "api_integration",
      defaultEnabled: false,
      reason: "Pipeline- und System-Schnittstellen für DataOps"
    },
    {
      deliverableId: "bi_factory",
      defaultEnabled: false,
      reason: "Standardisierte Build-Prozesse für Datenprodukte"
    },
    {
      deliverableId: "source_integration_review",
      defaultEnabled: false,
      reason: "Technische Voraussetzungen vertiefen, falls noch nicht erfolgt"
    }
  ],

  // Wartung & Support (IT & Data)
  "wartung-support": [
    {
      deliverableId: "retainer",
      defaultEnabled: true,
      reason: "Laufendes Betreuungs- und Supportmodell"
    },
    {
      deliverableId: "monitoring_ops",
      defaultEnabled: true,
      reason: "Proaktives Monitoring der Dateninfrastruktur"
    },
    {
      deliverableId: "reporting_standards",
      defaultEnabled: false,
      reason: "Betriebsreporting und SLA-Transparenz"
    }
  ],

  // Master Data Management (IT & Data)
  "master-data-management": [
    {
      deliverableId: "governance_starter",
      defaultEnabled: true,
      reason: "Stammdaten-Governance und Verantwortlichkeiten"
    },
    {
      deliverableId: "data_quality",
      defaultEnabled: true,
      reason: "Bereinigung und Validierung kritischer Stammdaten"
    },
    {
      deliverableId: "glossary_sprint",
      defaultEnabled: true,
      reason: "Einheitliche Begriffe und Kerndefinitionen"
    },
    {
      deliverableId: "source_integration_review",
      defaultEnabled: false,
      reason: "Stammdatenquellen und Integrationslücken vertiefen"
    }
  ],

  // NIS2 (Risk & Compliance)
  "nis2": [
    {
      deliverableId: "compliance_package",
      defaultEnabled: true,
      reason: "Gebündeltes Compliance-Paket für NIS2-Anforderungen"
    },
    {
      deliverableId: "governance_starter",
      defaultEnabled: true,
      reason: "Governance-Rahmen für operative Umsetzung"
    },
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Messbare Security- und Compliance-Kennzahlen definieren"
    },
    {
      deliverableId: "iam_concept",
      defaultEnabled: false,
      reason: "Zugriffs- und Rollenmodell als Sicherheitsgrundlage"
    }
  ],

  // DSGVO (+ DSB) (Risk & Compliance)
  "dsgvo-dsb": [
    {
      deliverableId: "privacy_package",
      defaultEnabled: true,
      reason: "Praxisnahes DSGVO-Paket mit Governance und Maßnahmenplan"
    },
    {
      deliverableId: "governance_starter",
      defaultEnabled: true,
      reason: "Datenschutz-Governance mit Rollen und Prozessen aufsetzen"
    },
    {
      deliverableId: "security_access_review",
      defaultEnabled: false,
      reason: "Zugriffe auf personenbezogene Daten prüfen"
    },
    {
      deliverableId: "glossary_sprint",
      defaultEnabled: false,
      reason: "Begriffe und Datenobjekte für DSGVO-konforme Kommunikation"
    },
    {
      deliverableId: "iam_concept",
      defaultEnabled: false,
      reason: "Zugriffssteuerung für personenbezogene Daten absichern"
    }
  ],

  // Externer Datenschutzbeauftragter (Risk & Compliance)
  "externer-datenschutzbeauftragter": [
    {
      deliverableId: "dsb_retainer",
      defaultEnabled: true,
      reason: "Laufende Betreuung durch einen TÜV-zertifizierten externen Datenschutzbeauftragter im monatlichen Retainer"
    },
    {
      deliverableId: "governance_starter",
      defaultEnabled: false,
      reason: "Governance-Grundlagen für Datenschutzprozesse und Verantwortlichkeiten"
    },
    {
      deliverableId: "security_access_review",
      defaultEnabled: false,
      reason: "Prüfung von Zugriffen auf personenbezogene Daten"
    },
    {
      deliverableId: "privacy_package",
      defaultEnabled: false,
      reason: "Ergänzendes Datenschutzpaket bei projektbezogenen DSGVO-Aufgaben (optional)"
    }
  ],

  // ISMS & ISB Bestellung (Risk & Compliance)
  "isms-isb-bestellung": [
    {
      deliverableId: "compliance_package",
      defaultEnabled: true,
      reason: "Gebündeltes Compliance-Paket für ISMS-Anforderungen"
    },
    {
      deliverableId: "governance_starter",
      defaultEnabled: true,
      reason: "ISMS-nahe Governance-Struktur schaffen"
    },
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Sicherheitskennzahlen und Steuerungsmechanik definieren"
    },
    {
      deliverableId: "iam_concept",
      defaultEnabled: false,
      reason: "ISMS-relevante Zugriffskontrollen konzipieren"
    }
  ],

  // IAM (Risk & Compliance)
  "iam": [
    {
      deliverableId: "iam_concept",
      defaultEnabled: true,
      reason: "IAM-Zielbild und Rollenmodell strukturieren"
    },
    {
      deliverableId: "security_access_review",
      defaultEnabled: true,
      reason: "Ist-Zugriffe und Berechtigungsrisiken bewerten"
    },
    {
      deliverableId: "api_integration",
      defaultEnabled: false,
      reason: "Technische Anbindung von Identitäts- und Berechtigungssystemen"
    },
    {
      deliverableId: "roles_rights_impl",
      defaultEnabled: false,
      reason: "Technische Umsetzung von Rollen und Rechten"
    }
  ],

  // Block 2: Insights & Analytics
  "alarm-system": [
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Kritische Schwellenwerte und Frühwarn-KPIs definieren" },
    { deliverableId: "semantic_layer", defaultEnabled: true, reason: "Konsistente Alarm- und Schwellenlogik" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Management-Sicht auf kritische Abweichungen" },
    { deliverableId: "anomaly_detection", defaultEnabled: false, reason: "KI-gestützte Früherkennung auffälliger Muster" }
  ],
  "liquiditaetsplanung-bi": [
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Cashflow-, Bestand- und Engpass-KPIs klar definieren" },
    { deliverableId: "semantic_layer", defaultEnabled: true, reason: "Einheitliche Liquiditätskennzahlen über alle Reports" },
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Liquiditätssteuerung auf stabiler BI-Basis abbilden" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Steuerungsreport für Finanzleitung bereitstellen" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "KI-gestützte Liquiditätsprognose als Ausbau" }
  ],
  "budget-controlling": [
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Budget- und Abweichungskennzahlen konsistent festlegen" },
    { deliverableId: "reporting_standards", defaultEnabled: true, reason: "Einheitliche Budgetberichte ueber Bereiche sichern" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Regelmaessiges Budget-Reporting fuer Management etablieren" }
  ],
  "deckungsbeitragsrechnung": [
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Margenanalysen transparent im BI-System abbilden" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "DB-Kennzahlen und Berechnungslogik sauber abstimmen" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Deckungsbeitraege als Management-Entscheidungsgrundlage aufbereiten" }
  ],
  "working-capital-analyse": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Finanz- und Bestandsquellen fuer Working Capital zusammenfuehren" },
    { deliverableId: "dwh_starter", defaultEnabled: true, reason: "Zentrale Datenbasis fuer Forderungen, Verbindlichkeiten und Bestand schaffen" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Working-Capital-Entwicklung fuer Management steuerbar machen" }
  ],
  "kostenstruktur-gemeinkosten-monitoring": [
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Kostenstrukturen in einem konsistenten BI-Cockpit visualisieren" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Kosten- und Gemeinkostenmetriken unternehmensweit vereinheitlichen" },
    { deliverableId: "reporting_standards", defaultEnabled: true, reason: "Vergleichbare Kostenberichte und Drilldowns etablieren" }
  ],
  "investitionscontrolling-capex": [
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "CAPEX-Portfolios und Fortschritte transparent darstellen" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Investitionskennzahlen und Nutzenlogik definieren" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Management-Reporting fuer Investitionsentscheidungen bereitstellen" }
  ],
  "customer-lifetime-value": [
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Kundenwertanalyse in zentrale Vertriebsdashboards integrieren" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "CLV-Definitionen und Segmentierung abstimmen" },
    { deliverableId: "semantic_layer", defaultEnabled: true, reason: "Einheitliche CLV-Logik über Reports hinweg" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "Prognose der Kundenwertentwicklung" }
  ],
  "lead-scoring": [
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Lead-Pipeline und Qualität transparent im BI abbilden" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Scoring-Kriterien und Conversion-KPIs definieren" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "Prädiktive Lead-Bewertung als KI-Ausbau" },
    { deliverableId: "semantic_layer", defaultEnabled: false, reason: "Einheitliche Scoring-Logik im Semantic Layer" }
  ],
  "data-driven-marketing": [
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Kanaluebergreifende Marketingdaten zentral auswerten" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Marketing-KPIs und Attribution einheitlich festlegen" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Performance-Bericht fuer Marketing- und Vertriebssteuerung erzeugen" }
  ],
  "sales-funnel-analyse": [
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Funnel-Stufen und Conversion-Raten zentral visualisieren" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Einheitliche Definition der Funnel-Kennzahlen sichern" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Massnahmenorientiertes Funnel-Reporting fuer Management erstellen" }
  ],
  "reklamations-analyse": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Service-, Qualitaets- und Kundendaten fuer Reklamationen verknuepfen" },
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Reklamationsursachen und Trends im Dashboard sichtbar machen" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Regelbericht fuer Qualitaets- und Serviceverbesserung bereitstellen" }
  ],
  "einkaufs-forecast": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Bedarfs-, Bestands- und Lieferdaten für Forecasting zusammenführen" },
    { deliverableId: "semantic_layer", defaultEnabled: true, reason: "Einheitliche Beschaffungskennzahlen und Forecast-Logik" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "KI-gestützte Bestellzeitpunktprognose" },
    { deliverableId: "dwh_starter", defaultEnabled: false, reason: "Zentrale Beschaffungsdatenbasis, falls noch nicht vorhanden" }
  ],
  "best-price-purchase": [
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Preisentwicklung und Abweichungen transparent monitoren" },
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Lieferanten- und Preisdaten fuer Vergleichbarkeit harmonisieren" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Beschaffungskostenbericht fuer Steuerung und Verhandlung bereitstellen" }
  ],
  "lieferantenscoring": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Lieferantenleistung ueber Systeme hinweg konsolidieren" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Scoring-Logik fuer Preis, Qualitaet und Liefertreue festlegen" },
    { deliverableId: "reporting_standards", defaultEnabled: true, reason: "Einheitliche Scorecards fuer Einkauf und Management etablieren" }
  ],
  "lageroptimierung": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Lagerbewegungen und Materialflussdaten integrierbar machen" },
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Lagerplatzauslastung und Wege transparent darstellen" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Regelreport fuer Lagerperformance und Effizienz erzeugen" }
  ],
  "quality-assurance-ai": [
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Qualitaets- und Ausschussdaten zentral visualisieren" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Fehler- und Ausschusskennzahlen einheitlich definieren" },
    { deliverableId: "qa_ai", defaultEnabled: false, reason: "Automatisierte Qualitaetspruefung als naechster Ausbauschritt (Coming Soon)" }
  ],
  "lagerbestandsverwaltung": [
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Lagerplaetze und Bestandsbewegungen digital sichtbar machen" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Kennzahlen fuer Bestand, Reichweite und Umschlag festlegen" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Steuerungsreport fuer Lagerflaechen und Verfuegbarkeit bereitstellen" }
  ],
  "oee-analyse": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Maschinen-, Qualitaets- und Stillstandsdaten integrieren" },
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "OEE-Treiber in interaktiven Dashboards abbilden" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "OEE-Reporting fuer operative und strategische Steuerung etablieren" }
  ],
  "durchlaufzeit-bottleneck-analyse": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Prozessketten- und Auftragsdaten fuer Engpassanalyse verknuepfen" },
    { deliverableId: "dwh_starter", defaultEnabled: true, reason: "Durchlaufzeitdaten stabil und historisiert bereitstellen" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Regelreport fuer Engpaesse und Taktverbesserung bereitstellen" }
  ],
  "itsm-analytics": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Ticket- und Betriebsdaten aus ITSM-Systemen konsolidieren" },
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "SLA-, Volumen- und Loesungszeitmetriken transparent auswerten" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "IT-Service-Reporting fuer Leitung und Operations bereitstellen" }
  ],
  "cloud-cost-observability": [
    { deliverableId: "finops_review", defaultEnabled: true, reason: "Kostentreiber analysieren und Einsparhebel identifizieren" },
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Cloud-Billing- und Nutzungsdaten integrieren" },
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "FinOps-Dashboard für laufende Steuerung" },
    { deliverableId: "mgmt_report_1", defaultEnabled: false, reason: "Management-Reporting für Architektur- und FinOps-Entscheidungen" }
  ],
  "cybersicherheit-dashboard": [
    { deliverableId: "security_access_review", defaultEnabled: true, reason: "Zugriffs- und Sicherheitslage strukturiert bewerten" },
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Security-Ereignisse aus SIEM, IAM und Endpoints zusammenführen" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Sicherheitskennzahlen und Risikoschwellen definieren" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Managementfähige Sicht auf Sicherheitslage und Trends" }
  ],
  "prozesseffizienz-analyse": [
    { deliverableId: "process_discovery", defaultEnabled: true, reason: "Prozesshebel und Engpässe strukturiert identifizieren" },
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Prozess- und Aufwandsdaten über Systeme vereinheitlichen" },
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Effizienzkennzahlen und Durchlaufzeiten monitoren" },
    { deliverableId: "automation_pilot", defaultEnabled: false, reason: "Ersten Automatisierungshebel als PoC umsetzen" }
  ],

  // Block 3: Automatisierung & KI
  "automatisierung-customer-success": [
    { deliverableId: "process_discovery", defaultEnabled: true, reason: "Customer-Success-Prozesse und Automatisierungspotenzial klären" },
    { deliverableId: "automation_pilot", defaultEnabled: true, reason: "PoC für Service-Automatisierung und Entlastung" },
    { deliverableId: "churn_model", defaultEnabled: false, reason: "KI-gestützte Priorisierung kritischer Kundenfälle" },
    { deliverableId: "automation_rollout", defaultEnabled: false, reason: "Erfolgreichen Pilot skalieren" }
  ],
  "automatisierung-bestelldaten": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Bestellkanaele und ERP-Schnittstellen fuer Automatisierung harmonisieren" },
    { deliverableId: "reporting_standards", defaultEnabled: true, reason: "Durchlaufzeiten und Fehlerquoten standardisiert steuerbar machen" },
    { deliverableId: "monitoring_ops", defaultEnabled: false, reason: "Operatives Monitoring fuer stabile Bestellprozesse vorbereiten (Coming Soon)" }
  ],
  "helpdesk-automation": [
    { deliverableId: "process_discovery", defaultEnabled: true, reason: "Helpdesk-Prozess und Automatisierungspotenzial analysieren" },
    { deliverableId: "automation_pilot", defaultEnabled: true, reason: "PoC für Ticket-Routing und Entlastung" },
    { deliverableId: "api_integration", defaultEnabled: false, reason: "Schnittstellen zu ITSM- und Wissenssystemen" },
    { deliverableId: "automation_rollout", defaultEnabled: false, reason: "Erfolgreichen Pilot in den Regelbetrieb überführen" }
  ],
  "financial-forecasting": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Zahlungs-, Forderungs- und Planungsdaten für Prognosen integrieren" },
    { deliverableId: "forecast_model", defaultEnabled: true, reason: "KI-gestützte Cashflow- und Prognosemodelle" },
    { deliverableId: "dwh_starter", defaultEnabled: false, reason: "Historisierte Datenbasis, falls noch nicht vorhanden" },
    { deliverableId: "mgmt_report_1", defaultEnabled: false, reason: "Management-Reporting auf Basis der Prognosen" }
  ],
  "sales-chatbot-webseite": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Website-, CRM- und Kampagnendaten fuer Chatbot-Logik anbinden" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Lead- und Conversion-KPIs fuer Chatbot-Erfolg verbindlich definieren" },
    { deliverableId: "churn_model", defaultEnabled: false, reason: "Praediktive Dialogpriorisierung und Personalisierung als Ausbau (Coming Soon)" }
  ],
  "dynamic-pricing": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Preis-, Nachfrage- und Wettbewerbsdaten fuer Automatisierung konsolidieren" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Margen- und Preisleitplanken fuer dynamische Steuerung festlegen" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "Prognosebasierte Preisanpassung als naechster Schritt vorbereiten (Coming Soon)" }
  ],
  "ausschreibungsautomatisierung": [
    { deliverableId: "process_discovery", defaultEnabled: true, reason: "Vergabeprozess und Automatisierungspotenzial analysieren" },
    { deliverableId: "automation_pilot", defaultEnabled: true, reason: "PoC für automatisierte Ausschreibungsabläufe" },
    { deliverableId: "governance_starter", defaultEnabled: true, reason: "Regelwerk und Verantwortlichkeiten für Vergaben" },
    { deliverableId: "automation_rollout", defaultEnabled: false, reason: "Validierten Workflow produktiv ausrollen" }
  ],
  "automatisierte-rechnungsverarbeitung": [
    { deliverableId: "process_discovery", defaultEnabled: true, reason: "Rechnungsprozess und Automatisierungshebel analysieren" },
    { deliverableId: "automation_pilot", defaultEnabled: true, reason: "PoC für automatisierte Rechnungsverarbeitung" },
    { deliverableId: "api_integration", defaultEnabled: false, reason: "Schnittstellen zwischen Eingang, ERP und Freigabe" },
    { deliverableId: "automation_rollout", defaultEnabled: false, reason: "Pilot produktiv skalieren" }
  ],
  "ai-helpdeskassistent": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Wissensbasis und Ticketdaten fuer Assistenzfunktionen anbinden" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Qualitaets- und Loesungskennzahlen fuer Assistentenleistung definieren" },
    { deliverableId: "monitoring_ops", defaultEnabled: false, reason: "Nutzungs- und Antwortqualitaet im Betrieb kontinuierlich ueberwachen (Coming Soon)" }
  ],
  "agentic-coding": [
    { deliverableId: "ai_agent_dev", defaultEnabled: true, reason: "Fokussierter KI-Agent für Coding- und Entwicklungsaufgaben" },
    { deliverableId: "ai_review", defaultEnabled: true, reason: "Governance, Qualität und Leitplanken des Agenten absichern" },
    { deliverableId: "kpi_ws", defaultEnabled: false, reason: "Metriken für Agentenleistung und Durchsatz definieren" },
    { deliverableId: "retainer", defaultEnabled: false, reason: "Kontinuierliche Betriebs- und Verbesserungsunterstützung" }
  ],
  "self-service-helpdesk": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Servicekatalog, Wissensbasis und Ticketlogik konsistent verknuepfen" },
    { deliverableId: "reporting_standards", defaultEnabled: true, reason: "Self-Service-Nutzung und Ticketentlastung transparent messen" },
    { deliverableId: "monitoring_ops", defaultEnabled: false, reason: "Betriebsqualitaet und Deflection-Rate laufend ueberwachen (Coming Soon)" }
  ],
  "ki-preisueberwachung": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Preisquellen und Lieferantendaten fuer KI-Ueberwachung zusammenfuehren" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "Praediktive Preistrends und Warnlogik als Ausbau vorbereiten (Coming Soon)" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Managementsicht auf Preisrisiken und Handlungsbedarf bereitstellen" }
  ],
  "automatisierte-bestellverarbeitung": [
    { deliverableId: "process_discovery", defaultEnabled: true, reason: "Bestellprozess und Medienbrüche analysieren" },
    { deliverableId: "automation_pilot", defaultEnabled: true, reason: "PoC für automatisierte Bestell- und Freigabeprozesse" },
    { deliverableId: "api_integration", defaultEnabled: false, reason: "ERP- und Bestellkanal-Schnittstellen implementieren" },
    { deliverableId: "automation_rollout", defaultEnabled: false, reason: "Validierten Workflow produktiv ausrollen" }
  ],
  "spendmanagement-automatisieren": [
    { deliverableId: "process_discovery", defaultEnabled: true, reason: "Spend-Prozesse und Klassifikationslogik analysieren" },
    { deliverableId: "automation_pilot", defaultEnabled: true, reason: "PoC für automatisierte Spend-Klassifikation" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Spend-KPIs und Einsparziele festlegen" },
    { deliverableId: "mgmt_report_1", defaultEnabled: false, reason: "Transparente Steuerung von Einsparhebeln" }
  ],
  "kyc-automatisierung": [
    { deliverableId: "compliance_package", defaultEnabled: true, reason: "Regulatorischen KYC-Rahmen und Maßnahmen strukturieren" },
    { deliverableId: "process_discovery", defaultEnabled: true, reason: "KYC-Prozess und Automatisierungshebel analysieren" },
    { deliverableId: "automation_pilot", defaultEnabled: false, reason: "PoC für automatisierte KYC-Prüfungen" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Risikoorientierte KYC-Kennzahlen für Priorisierung" }
  ],
  "esg-datenerhebung-automatisiert": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "ESG-Datenquellen aus Fachbereichen zusammenführen" },
    { deliverableId: "data_quality", defaultEnabled: true, reason: "ESG-Datenqualität und Validierung sicherstellen" },
    { deliverableId: "governance_starter", defaultEnabled: true, reason: "Verantwortlichkeiten und Datenqualitätsregeln etablieren" },
    { deliverableId: "reporting_standards", defaultEnabled: false, reason: "Einheitliche ESG-Berichtslogik" }
  ],
  "ai-oberflaechenanalyse": [
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Usability- und Conversion-Kennzahlen fuer KI-Analysen verbindlich festlegen" },
    { deliverableId: "reporting_standards", defaultEnabled: true, reason: "Vergleichbare UI-Analyseberichte fuer Produktteams bereitstellen" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "Prognosen zu UX-Effekten geplanter Aenderungen vorbereiten (Coming Soon)" }
  ],
  "ai-produktentwicklung": [
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Innovations- und Time-to-Market-KPIs fuer KI-gestuetzte Entwicklung definieren" },
    { deliverableId: "roadmap", defaultEnabled: false, reason: "Skalierungsroadmap fuer KI in der Produktentwicklung strukturieren (Coming Soon)" },
    { deliverableId: "retainer", defaultEnabled: false, reason: "Kontinuierliche Begleitung fuer iterative KI-Produktentwicklung vorsehen (Coming Soon)" }
  ],
  "rag-literaturrecherche": [
    { deliverableId: "rag_foundation", defaultEnabled: true, reason: "RAG-Basis für belastbare Wissensrecherche aufbauen" },
    { deliverableId: "glossary_sprint", defaultEnabled: true, reason: "Fachbegriffe und Quellenstrukturen standardisieren" },
    { deliverableId: "source_integration_review", defaultEnabled: false, reason: "Dokumentenquellen und Retrieval-Qualität vertiefen" },
    { deliverableId: "ai_review", defaultEnabled: false, reason: "Qualität und Governance der RAG-Lösung prüfen" }
  ],
  "ai-video-qualitaetsanalyse": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Video- und Produktionsdaten für KI-Qualitätsprüfung integrieren" },
    { deliverableId: "qa_ai", defaultEnabled: true, reason: "KI-gestützte Qualitätsprüfung auf Basis von Bild-/Videodaten" },
    { deliverableId: "ai_review", defaultEnabled: true, reason: "Modellqualität und Betriebsreife vor Go-Live prüfen" },
    { deliverableId: "monitoring_ops", defaultEnabled: false, reason: "Laufendes Monitoring der Modellqualität im Betrieb" }
  ],
  "ki-warenausgangs-scanning": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Scan-, Auftrags- und Versanddaten fuer Warenausgangspruefung verknuepfen" },
    { deliverableId: "reporting_standards", defaultEnabled: true, reason: "Qualitaetskennzahlen fuer Versandpruefungen standardisieren" },
    { deliverableId: "anomaly_detection", defaultEnabled: false, reason: "Anomalieerkennung im Warenausgang als Ausbau vorbereiten (Coming Soon)" }
  ],
  "tourenplanung-automatisiert": [
    { deliverableId: "process_discovery", defaultEnabled: true, reason: "Touren- und Dispositionsprozesse analysieren" },
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Routen-, Auftrags- und Telematikdaten konsolidieren" },
    { deliverableId: "automation_pilot", defaultEnabled: true, reason: "PoC für automatisierte Tourenplanung" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "Dynamische Routenprognosen für adaptive Planung" }
  ],
  "personal-controlling": [
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "HR- und Personal-KPIs einheitlich definieren" },
    { deliverableId: "semantic_layer", defaultEnabled: true, reason: "Konsistente Kennzahlenlogik für Personal-Reports" },
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Personal-Cockpit auf stabiler BI-Basis" },
    { deliverableId: "mgmt_report_1", defaultEnabled: false, reason: "Management-Report für Personalsteuerung" }
  ],
  "financial-planning": [
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Planungskennzahlen und Szenariologik definieren" },
    { deliverableId: "semantic_layer", defaultEnabled: true, reason: "Einheitliche Finanzplanungs-Metriken" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "KI-gestützte Planungs- und Szenariomodelle" },
    { deliverableId: "mgmt_report_1", defaultEnabled: true, reason: "Management-Sicht auf Planung und Abweichungen" }
  ],
  "api-management": [
    { deliverableId: "architecture_workshop", defaultEnabled: true, reason: "API-Strategie und Plattformoptionen klären" },
    { deliverableId: "api_integration", defaultEnabled: true, reason: "Zentrale API-Anbindungen und Schnittstellen" },
    { deliverableId: "security_access_review", defaultEnabled: true, reason: "Zugriffe und API-Sicherheit bewerten" },
    { deliverableId: "governance_starter", defaultEnabled: false, reason: "API-Governance und Verantwortlichkeiten" }
  ],
  "adf-aufsetzen": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Quellen und Integrationsanforderungen für ADF klären" },
    { deliverableId: "etl_pipeline", defaultEnabled: true, reason: "Azure Data Factory Pipelines aufsetzen" },
    { deliverableId: "monitoring_ops", defaultEnabled: true, reason: "Monitoring und Alerting für Datenflüsse" },
    { deliverableId: "data_modeling", defaultEnabled: false, reason: "Datenmodell für Pipeline-Ziele" }
  ],
  "bedarfsanalyse": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Beschaffungs- und Verbrauchsdaten konsolidieren" },
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Bedarfs- und Einsparpotenzial-KPIs definieren" },
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Bedarfsanalyse im BI-Cockpit abbilden" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "Prognosebasierte Bedarfsplanung" }
  ],
  "potentialanalyse": [
    { deliverableId: "kpi_ws", defaultEnabled: true, reason: "Potenzial- und Segmentierungskennzahlen festlegen" },
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Vertriebspotenziale transparent darstellen" },
    { deliverableId: "semantic_layer", defaultEnabled: true, reason: "Einheitliche Potenzial-Logik über Reports" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "KI-gestützte Potenzialprognose" }
  ],
  "produktionsplanung": [
    { deliverableId: "process_discovery", defaultEnabled: true, reason: "Planungsprozess und Engpässe analysieren" },
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Produktions- und Auftragsdaten integrieren" },
    { deliverableId: "bi_setup", defaultEnabled: true, reason: "Planungssicht und Auslastung visualisieren" },
    { deliverableId: "forecast_model", defaultEnabled: false, reason: "Prognosebasierte Produktionsplanung" }
  ],
  "innovationsresearch": [
    { deliverableId: "ai_use_case_sprint", defaultEnabled: true, reason: "Innovations- und KI-Potenziale strukturiert bewerten" },
    { deliverableId: "strategy_sprint", defaultEnabled: true, reason: "Innovationsrahmen und Prioritäten festlegen" },
    { deliverableId: "roadmap", defaultEnabled: false, reason: "Umsetzungsroadmap für priorisierte Innovationen" },
    { deliverableId: "rag_foundation", defaultEnabled: false, reason: "Wissens-RAG für Research und Scanning" }
  ],
  "objekterkennung": [
    { deliverableId: "source_integration_review", defaultEnabled: true, reason: "Bild- und Prozessdaten fuer robuste Objekterkennung zusammenfuehren" },
    { deliverableId: "qa_ai", defaultEnabled: false, reason: "KI-basierte Klassifikation und Qualitaetskontrolle als Ausbau aufsetzen (Coming Soon)" },
    { deliverableId: "monitoring_ops", defaultEnabled: false, reason: "Betriebsueberwachung fuer Modellguete und Drift vorbereiten (Coming Soon)" }
  ]
};

// Prioritätsreihenfolge für Deduplizierung
const priorityOrder: string[] = [
  // Core BI & Analytics (höchste Priorität)
  "bi_setup",
  "kpi_ws",
  "mgmt_report_1",
  "reporting_standards",

  // Data Architecture
  "dwh_starter",
  "source_integration_review",

  // Data Knowledge
  "glossary_sprint",
  "pbi_training_user",
  "pbi_training_dev",

  // Strategy & Governance
  "strategy_sprint",
  "roadmap",
  "maturity_assessment",
  "governance_starter",
  "compliance_package",
  "privacy_package",
  "iam_concept",
  "roles_rights_impl",

  // Architecture & Integration
  "architecture_workshop",
  "target_architecture",
  "api_integration",
  "etl_pipeline",
  "data_modeling",
  "data_migration",
  "data_quality",
  "data_catalog_setup",
  "process_discovery",
  "automation_pilot",
  "automation_rollout",
  "semantic_layer",
  "self_service_enablement",
  "ai_use_case_sprint",
  "change_enablement",
  "security_access_review",
  "finops_review",

  // AI Models & Agents
  "forecast_model",
  "churn_model",
  "anomaly_detection",
  "predictive_maintenance",
  "qa_ai",
  "rag_foundation",
  "ai_agent_dev",
  "ai_review",

  // Operations
  "bi_factory",
  "monitoring_ops",
  "retainer"
];

/**
 * Fallback Rule Engine
 * Generiert Recommendations basierend auf Product-Tags
 */
function generateRecommendationsFromRules(productId: string): Recommendation[] {
  const product = getProductById(productId);
  if (!product) return [];

  const recommendations: Recommendation[] = [];
  const seen = new Set<string>();

  // Rule 1: transparency → Core BI Setup
  if (product.tags.intent.includes("transparency")) {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "bi_setup",
      defaultEnabled: true,
      reason: "BI-System für transparente Datenvisualisierung"
    });
    addIfNotSeen(recommendations, seen, {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Definition der relevanten KPIs für Transparenz"
    });
    addIfNotSeen(recommendations, seen, {
      deliverableId: "mgmt_report_1",
      defaultEnabled: true,
      reason: "Management-Bericht für Transparenz"
    });
  }

  // Rule 2: automation → Reporting Standards
  if (product.tags.intent.includes("automation")) {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "reporting_standards",
      defaultEnabled: true,
      reason: "Standards für automatisierte Berichte"
    });
  }

  // Rule 3: multi_source → Data Architecture
  if (product.tags.data_scope === "multi_source" || product.tags.data_scope === "enterprise_wide") {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Analyse der Datenquellen für Integration"
    });
    addIfNotSeen(recommendations, seen, {
      deliverableId: "dwh_starter",
      defaultEnabled: true,
      reason: "Zentrale Datenablage für mehrere Quellen"
    });
  }

  // Rule 4: compliance → Governance
  if (product.tags.intent.includes("compliance")) {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "glossary_sprint",
      defaultEnabled: true,
      reason: "Glossar für Compliance und Governance"
    });
    addIfNotSeen(recommendations, seen, {
      deliverableId: "governance_starter",
      defaultEnabled: false,
      reason: "Data Governance Konzept (Coming Soon)"
    });
  }

  // Rule 5: insights → Forecasting + Management Report
  if (product.tags.intent.includes("insights")) {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "forecast_model",
      defaultEnabled: false,
      reason: "Forecasting-Modell für Insights (Coming Soon)"
    });
    addIfNotSeen(recommendations, seen, {
      deliverableId: "mgmt_report_1",
      defaultEnabled: true,
      reason: "Management-Bericht mit Insights"
    });
  }

  // Rule 6: Optional Upsell - Training
  if (product.tags.intent.includes("transparency") || product.tags.intent.includes("automation")) {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "pbi_training_user",
      defaultEnabled: false,
      reason: "Schulung für selbstständige Berichtserstellung (optional)"
    });
  }

  return recommendations;
}

/**
 * Hilfsfunktion: Fügt Recommendation hinzu, wenn noch nicht vorhanden
 */
function addIfNotSeen(
  recommendations: Recommendation[],
  seen: Set<string>,
  recommendation: Recommendation
) {
  if (!seen.has(recommendation.deliverableId)) {
    recommendations.push(recommendation);
    seen.add(recommendation.deliverableId);
  }
}

/**
 * Dedupliziert und priorisiert Recommendations
 */
function deduplicateAndPrioritize(recommendations: Recommendation[]): Recommendation[] {
  // Gruppiere nach deliverableId (behalte erste, wenn dupliziert)
  const unique = new Map<string, Recommendation>();
  for (const rec of recommendations) {
    if (!unique.has(rec.deliverableId)) {
      unique.set(rec.deliverableId, rec);
    }
  }

  // Sortiere nach Prioritätsreihenfolge
  const sorted = Array.from(unique.values()).sort((a, b) => {
    const indexA = priorityOrder.indexOf(a.deliverableId);
    const indexB = priorityOrder.indexOf(b.deliverableId);

    // Wenn nicht in priorityOrder, ans Ende
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  // Gruppiere nach Familie für bessere Lesbarkeit
  const grouped: Recommendation[] = [];

  // Core BI & Analytics zuerst
  const core = sorted.filter(r =>
    ["bi_setup", "kpi_ws", "mgmt_report_1", "reporting_standards"].includes(r.deliverableId)
  );
  grouped.push(...core);

  // Data Architecture
  const dataArch = sorted.filter(r =>
    ["dwh_starter", "source_integration_review"].includes(r.deliverableId)
  );
  grouped.push(...dataArch);

  // Data Knowledge
  const dataKnow = sorted.filter(r =>
    ["glossary_sprint", "pbi_training_user", "pbi_training_dev"].includes(r.deliverableId)
  );
  grouped.push(...dataKnow);

  // Coming Soon (alle anderen)
  const comingSoon = sorted.filter(r =>
    !core.includes(r) && !dataArch.includes(r) && !dataKnow.includes(r)
  );
  grouped.push(...comingSoon);

  return grouped;
}

/**
 * Nur aktive Bausteine; „Coming Soon“ aus Begründungstext entfernen.
 */
function toActiveRecommendations(recommendations: Recommendation[]): Recommendation[] {
  return recommendations
    .filter((rec) => Boolean(getDeliverableById(rec.deliverableId)?.active))
    .map((rec) => ({
      ...rec,
      reason: rec.reason.replace(/\s*\(Coming Soon\)/gi, "").trim(),
    }));
}

/**
 * Hauptfunktion: Gibt Bundle für Product zurück
 */
export function getBundleForProduct(productId: string): Recommendation[] {
  const fallbackBundle: Recommendation[] = [
    {
      deliverableId: "bi_setup",
      defaultEnabled: true,
      reason: "Schneller Einstieg mit einem direkt konfigurierbaren BI-Baustein",
    },
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Messbare KPIs als belastbare Entscheidungsgrundlage",
    },
    {
      deliverableId: "mgmt_report_1",
      defaultEnabled: true,
      reason: "Konkreter Bericht für schnelle Management-Transparenz",
    },
  ];

  // Prüfe Hard Override
  if (hardOverrides[productId]) {
    const recommendations = toActiveRecommendations(
      deduplicateAndPrioritize(hardOverrides[productId])
    ).slice(0, 6);
    return recommendations.length > 0 ? recommendations : toActiveRecommendations(fallbackBundle);
  }

  // Fallback: Rule Engine
  const recommendations = toActiveRecommendations(
    deduplicateAndPrioritize(generateRecommendationsFromRules(productId))
  ).slice(0, 6);
  return recommendations.length > 0 ? recommendations : toActiveRecommendations(fallbackBundle);
}

/**
 * Gibt alle Hard Override Bundles zurück
 */
export function getHardOverrideBundles(): ProductBundle[] {
  return Object.entries(hardOverrides).map(([productId, recommendations]) => ({
    productId,
    recommendations: deduplicateAndPrioritize(recommendations)
  }));
}

/**
 * Prüft, ob Product einen Hard Override hat
 */
export function hasHardOverride(productId: string): boolean {
  return productId in hardOverrides;
}
