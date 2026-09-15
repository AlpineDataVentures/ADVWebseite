import type { Parameter } from './models';

// Globale Parameter (für alle Deliverables)
export const globalParameters: Parameter[] = [
  {
    key: 'companySize',
    label: 'Unternehmensgröße',
    type: 'radio',
    options: [
      { value: 'SMB', label: 'Klein & Mittelstand (bis 250 MA)' },
      { value: 'Mid', label: 'Mittelgroß (250-1000 MA)' },
      { value: 'Enterprise', label: 'Großunternehmen (1000+ MA)' }
    ],
    default: 'SMB',
    pricingEffect: {
      type: 'multiplier',
      values: {
        'SMB': 1.0,
        'Mid': 1.2,
        'Enterprise': 1.5
      }
    }
  },
  {
    key: 'speed',
    label: 'Geschwindigkeit',
    type: 'radio',
    options: [
      { value: 'Standard', label: 'Standard (normale Bearbeitungszeit)' },
      { value: 'FastTrack', label: 'FastTrack (beschleunigte Umsetzung)' }
    ],
    default: 'Standard',
    pricingEffect: {
      type: 'multiplier',
      values: {
        'Standard': 1.0,
        'FastTrack': 1.2
      }
    }
  }
];

// Produktspezifische Parameter
export const productParameters: Parameter[] = [
  {
    key: 'reportCount',
    label: 'Anzahl Reports',
    type: 'radio',
    options: [
      { value: '1-3', label: '1-3 Reports' },
      { value: '4-8', label: '4-8 Reports' },
      { value: '9-15', label: '9-15 Reports' }
    ],
    default: '1-3',
    pricingEffect: {
      type: 'multiplier',
      values: {
        '1-3': 1.0,
        '4-8': 1.25,
        '9-15': 1.5
      }
    },
    applicableTo: ['mgmt_report_1']
  },
  {
    key: 'sourceSystemCount',
    label: 'Anzahl Quellsysteme',
    type: 'radio',
    options: [
      { value: '1-2', label: '1-2 Quellsysteme' },
      { value: '3-5', label: '3-5 Quellsysteme' },
      { value: '6+', label: '6+ Quellsysteme' }
    ],
    default: '1-2',
    pricingEffect: {
      type: 'multiplier',
      values: {
        '1-2': 1.0,
        '3-5': 1.2,
        '6+': 1.4
      }
    },
    applicableTo: ['bi_setup', 'dwh_starter']
  },
  {
    key: 'strategyHorizonMonths',
    label: 'Strategie-Zeitraum',
    type: 'radio',
    options: [
      { value: '6', label: '6 Monate' },
      { value: '12', label: '12 Monate' },
      { value: '24', label: '24 Monate' }
    ],
    default: '12',
    pricingEffect: {
      type: 'multiplier',
      values: {
        '6': 1.0,
        '12': 1.15,
        '24': 1.35
      }
    },
    applicableTo: ['dwh_starter']
  },
  {
    key: 'dataSources',
    label: 'Anzahl Datenquellen',
    type: 'radio',
    options: [
      { value: '1-3', label: '1-3 Datenquellen' },
      { value: '4-8', label: '4-8 Datenquellen' },
      { value: '9-15', label: '9-15 Datenquellen' }
    ],
    default: '1-3',
    pricingEffect: {
      type: 'multiplier',
      values: {
        '1-3': 1.0,
        '4-8': 1.25,
        '9-15': 1.5
      }
    },
    applicableTo: ['dwh_starter', 'source_integration_review'] // Nur für Data Architecture Deliverables
  },
  {
    key: 'deployment',
    label: 'Bereitstellung',
    type: 'radio',
    options: [
      { value: 'Cloud', label: 'Cloud' },
      { value: 'On-Prem', label: 'On-Premise (vor Ort)' }
    ],
    default: 'Cloud',
    pricingEffect: {
      type: 'multiplier',
      values: {
        'Cloud': 1.0,
        'On-Prem': 1.2
      }
    },
    applicableTo: ['bi_setup', 'dwh_starter'] // BI Setup und DWH
  },
  {
    key: 'securityLevel',
    label: 'Sicherheitslevel',
    type: 'radio',
    options: [
      { value: 'Basic', label: 'Basis' },
      { value: 'Advanced', label: 'Erweitert' }
    ],
    default: 'Basic',
    pricingEffect: {
      type: 'multiplier',
      values: {
        'Basic': 1.0,
        'Advanced': 1.15
      }
    },
    applicableTo: ['dwh_starter', 'source_integration_review'] // Data Architecture
  },
  {
    key: 'trainingParticipants',
    label: 'Anzahl Schulungsteilnehmer',
    type: 'number',
    default: 6,
    pricingEffect: {
      type: 'additive',
      values: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 900,
        '8': 900,
        '9': 900,
        '10': 900,
        '11': 900,
        '12': 900,
        '13': 1900,
        '14': 1900,
        '15': 1900,
        '16': 1900,
        '17': 1900,
        '18': 1900,
        '19': 1900,
        '20': 1900
      }
    },
    applicableTo: ['pbi_training_user', 'pbi_training_dev'] // Power BI Schulung
  },
  {
    key: 'reportComplexity',
    label: 'Komplexität der Berichte',
    type: 'radio',
    options: [
      { value: 'Basic', label: 'Basis (einfache Tabellen und Diagramme)' },
      { value: 'Medium', label: 'Mittel (interaktive Dashboards)' },
      { value: 'Advanced', label: 'Erweitert (komplexe Analysen und Vorhersagen)' }
    ],
    default: 'Basic',
    pricingEffect: {
      type: 'multiplier',
      values: {
        'Basic': 1.0,
        'Medium': 1.25,
        'Advanced': 1.6
      }
    },
    applicableTo: ['mgmt_report_1', 'reporting_standards'] // Management-Bericht und Reporting-Struktur
  },
  {
    key: 'dsbCompanySize',
    label: 'Unternehmensgröße',
    type: 'radio',
    options: [
      { value: 'SMB', label: 'Klein & Mittelstand (bis 250 MA)' },
      { value: 'Mid', label: 'Mittelgroß (250-1000 MA)' },
      { value: 'Enterprise', label: 'Großunternehmen (1000+ MA)' }
    ],
    default: 'SMB',
    pricingEffect: {
      type: 'multiplier',
      values: {
        'SMB': 1.0,
        'Mid': 10 / 3,
        'Enterprise': 20 / 3
      }
    },
    applicableTo: ['dsb_retainer']
  },
  {
    key: 'dsbCareScope',
    label: 'Betreuungsumfang',
    type: 'radio',
    options: [
      { value: 'basis', label: 'Basisbetreuung' },
      { value: 'intensive', label: 'Intensive Betreuung' }
    ],
    default: 'basis',
    pricingEffect: {
      type: 'multiplier',
      values: {
        'basis': 1.0,
        'intensive': 2.0
      }
    },
    applicableTo: ['dsb_retainer']
  },

  // ── Bausteingruppe: KI Integration ──
  {
    key: 'aiProcessScope',
    label: 'Prozessumfang',
    type: 'radio',
    options: [
      { value: '1', label: '1 Prozess' },
      { value: '2', label: '2 Prozesse' },
      { value: '3', label: '3 Prozesse' }
    ],
    default: '1',
    pricingEffect: { type: 'multiplier', values: { '1': 1.0, '2': 1.2, '3': 1.4 } },
    applicableTo: ['ki_solution_design']
  },
  {
    key: 'aiStakeholderCount',
    label: 'Stakeholder',
    type: 'radio',
    options: [
      { value: '1', label: '1 Fachbereich' },
      { value: '2', label: '2 Fachbereiche' },
      { value: '3', label: '3 Fachbereiche' }
    ],
    default: '1',
    pricingEffect: { type: 'multiplier', values: { '1': 1.0, '2': 1.15, '3': 1.3 } },
    applicableTo: ['ki_solution_design']
  },
  {
    key: 'aiDataSourceCount',
    label: 'Anzahl Datenquellen',
    type: 'radio',
    options: [
      { value: '1-2', label: '1–2 Datenquellen' },
      { value: '3-4', label: '3–4 Datenquellen' },
      { value: '4-5', label: '4–5 Datenquellen' }
    ],
    default: '1-2',
    pricingEffect: { type: 'multiplier', values: { '1-2': 1.0, '3-4': 1.2, '4-5': 1.4 } },
    applicableTo: ['ki_data_knowledge_analysis']
  },
  {
    key: 'aiDataComplexity',
    label: 'Datenkomplexität',
    type: 'radio',
    options: [
      { value: 'homogen', label: 'Homogen / strukturiert' },
      { value: 'gemischt', label: 'Gemischt' },
      { value: 'heterogen', label: 'Stark heterogen / geringe Qualität' }
    ],
    default: 'homogen',
    pricingEffect: { type: 'multiplier', values: { homogen: 1.0, gemischt: 1.2, heterogen: 1.4 } },
    applicableTo: ['ki_data_knowledge_analysis']
  },
  {
    key: 'aiLogicType',
    label: 'KI-Logik',
    type: 'radio',
    options: [
      { value: 'standard', label: 'Standard LLM / Prompting' },
      { value: 'rag', label: 'RAG / Wissenszugriff' },
      { value: 'agentic', label: 'Agentisch / mehrstufig' }
    ],
    default: 'standard',
    pricingEffect: { type: 'multiplier', values: { standard: 1.0, rag: 1.5, agentic: 2.25 } },
    applicableTo: ['ki_logic_prototyping']
  },
  {
    key: 'aiOperatingModel',
    label: 'Betriebsmodell',
    type: 'radio',
    options: [
      { value: 'api', label: 'Nutzung einer LLM-API' },
      { value: 'private_cloud', label: 'Private Cloud / eigener Tenant' },
      { value: 'onprem', label: 'On-Premise / Open Source LLM' }
    ],
    default: 'api',
    pricingEffect: { type: 'multiplier', values: { api: 1.0, private_cloud: 1.15, onprem: 1.5 } },
    applicableTo: ['ki_logic_prototyping']
  },
  {
    key: 'aiIntegrationSystemCount',
    label: 'Anzahl Systeme',
    type: 'radio',
    options: [
      { value: '1', label: '1 System' },
      { value: '2-3', label: '2–3 Systeme' },
      { value: '3-4', label: '3–4 Systeme' }
    ],
    default: '1',
    pricingEffect: { type: 'multiplier', values: { '1': 1.0, '2-3': 1.25, '3-4': 1.5 } },
    applicableTo: ['ki_system_integration']
  },
  {
    key: 'aiIntegrationInterface',
    label: 'Schnittstellen',
    type: 'radio',
    options: [
      { value: 'standard_api', label: 'Standard API' },
      { value: 'individual_api', label: 'Individuelle API' },
      { value: 'legacy', label: 'Legacy / keine API' }
    ],
    default: 'standard_api',
    pricingEffect: { type: 'multiplier', values: { standard_api: 1.0, individual_api: 1.2, legacy: 1.4 } },
    applicableTo: ['ki_system_integration']
  },
  {
    key: 'aiIntegrationDepth',
    label: 'Integrationstiefe',
    type: 'radio',
    options: [
      { value: 'read', label: 'Lesen' },
      { value: 'read_write', label: 'Lesen & Schreiben' },
      { value: 'process', label: 'Prozessaktionen' }
    ],
    default: 'read',
    pricingEffect: { type: 'multiplier', values: { read: 1.0, read_write: 1.15, process: 1.3 } },
    applicableTo: ['ki_system_integration']
  },
  {
    key: 'aiUiScope',
    label: 'UI-Umfang',
    type: 'radio',
    options: [
      { value: 'existing_ui', label: 'Integration in bestehende UI' },
      { value: 'simple_webui', label: 'Eigenständige einfache Web-UI' },
      { value: 'multi_view', label: 'Mehrere Ansichten / Rollen' }
    ],
    default: 'existing_ui',
    pricingEffect: { type: 'multiplier', values: { existing_ui: 1.0, simple_webui: 1.5, multi_view: 1.8 } },
    applicableTo: ['ki_user_interface']
  },
  {
    key: 'aiUiDesignComplexity',
    label: 'Designanforderung',
    type: 'radio',
    options: [
      { value: 'standard', label: 'Standard' },
      { value: 'custom', label: 'Komplexes kundenspezifisches Design' }
    ],
    default: 'standard',
    pricingEffect: { type: 'multiplier', values: { standard: 1.0, custom: 1.2 } },
    applicableTo: ['ki_user_interface']
  },
  {
    key: 'aiTestScope',
    label: 'Testumfang',
    type: 'radio',
    options: [
      { value: 'standard', label: 'Standard' },
      { value: 'extended', label: 'Erweitert' },
      { value: 'comprehensive', label: 'Umfangreiche fachliche Evaluation' }
    ],
    default: 'standard',
    pricingEffect: { type: 'multiplier', values: { standard: 1.0, extended: 1.2, comprehensive: 1.4 } },
    applicableTo: ['ki_testing_qa']
  },
  {
    key: 'aiTestCriticality',
    label: 'Einsatzkritikalität',
    type: 'radio',
    options: [
      { value: 'internal', label: 'Interne Unterstützung' },
      { value: 'business_critical', label: 'Kunden-/geschäftskritisch' },
      { value: 'regulated', label: 'Stark reguliert / hohe Kritikalität' }
    ],
    default: 'internal',
    pricingEffect: { type: 'multiplier', values: { internal: 1.0, business_critical: 1.2, regulated: 2.0 } },
    applicableTo: ['ki_testing_qa']
  },
  {
    key: 'aiHandoverEnvironment',
    label: 'Betriebsumgebung',
    type: 'radio',
    options: [
      { value: 'cloud', label: 'Standard Cloud' },
      { value: 'onprem', label: 'On-Premise' }
    ],
    default: 'cloud',
    pricingEffect: { type: 'multiplier', values: { cloud: 1.0, onprem: 1.4 } },
    applicableTo: ['ki_productive_handover']
  },

  // ── Bausteingruppe: KI Entwicklung ──
  {
    key: 'aiDevUseCaseScope',
    label: 'Use-Case-Umfang',
    type: 'radio',
    options: [
      { value: '1', label: '1 Zielgröße' },
      { value: '2-3', label: '2–3 Zielgrößen' },
      { value: '3-5', label: '3–5 Zielgrößen' }
    ],
    default: '1',
    pricingEffect: { type: 'multiplier', values: { '1': 1.0, '2-3': 1.2, '3-5': 1.4 } },
    applicableTo: ['ki_dev_requirements']
  },
  {
    key: 'aiDevStakeholderCount',
    label: 'Fachbereiche',
    type: 'radio',
    options: [
      { value: '1', label: '1 Fachbereich' },
      { value: '2', label: '2 Fachbereiche' },
      { value: '3', label: '3 Fachbereiche' }
    ],
    default: '1',
    pricingEffect: { type: 'multiplier', values: { '1': 1.0, '2': 1.3, '3': 1.5 } },
    applicableTo: ['ki_dev_requirements']
  },
  {
    key: 'aiDevDataSourceCount',
    label: 'Datenquellen',
    type: 'radio',
    options: [
      { value: '1-2', label: '1–2 Datenquellen' },
      { value: '3-5', label: '3–5 Datenquellen' },
      { value: '6-8', label: '6–8 Datenquellen' }
    ],
    default: '1-2',
    pricingEffect: { type: 'multiplier', values: { '1-2': 1.0, '3-5': 1.2, '6-8': 1.4 } },
    applicableTo: ['ki_dev_data_prep']
  },
  {
    key: 'aiDevDataQuality',
    label: 'Datenqualität',
    type: 'radio',
    options: [
      { value: 'good', label: 'Gut' },
      { value: 'medium', label: 'Mittlerer Aufbereitungsbedarf' },
      { value: 'high_effort', label: 'Hoher Aufbereitungsbedarf' }
    ],
    default: 'good',
    pricingEffect: { type: 'multiplier', values: { good: 1.0, medium: 1.25, high_effort: 1.5 } },
    applicableTo: ['ki_dev_data_prep']
  },
  {
    key: 'aiDevLabelingScope',
    label: 'Labeling',
    type: 'radio',
    options: [
      { value: 'not_needed', label: 'Vorhanden / nicht erforderlich' },
      { value: 'partial', label: 'Teilweise erforderlich' },
      { value: 'extensive', label: 'Umfangreich erforderlich' }
    ],
    default: 'not_needed',
    pricingEffect: { type: 'multiplier', values: { not_needed: 1.0, partial: 1.2, extensive: 1.4 } },
    applicableTo: ['ki_dev_data_prep']
  },
  {
    key: 'aiDevMethodComplexity',
    label: 'Methodenkomplexität',
    type: 'radio',
    options: [
      { value: 'standard_ml', label: 'Standard ML / Forecasting' },
      { value: 'deep_learning', label: 'Deep Learning' },
      { value: 'complex', label: 'Komplex / multimodal' }
    ],
    default: 'standard_ml',
    pricingEffect: { type: 'multiplier', values: { standard_ml: 1.0, deep_learning: 1.2, complex: 1.4 } },
    applicableTo: ['ki_dev_model_concept']
  },
  {
    key: 'aiDevModelVariantCount',
    label: 'Modellvarianten',
    type: 'radio',
    options: [
      { value: '1-2', label: '1–2 Varianten' },
      { value: '3-4', label: '3–4 Varianten' },
      { value: '5-6', label: '5–6 Varianten' }
    ],
    default: '1-2',
    pricingEffect: { type: 'multiplier', values: { '1-2': 1.0, '3-4': 1.15, '5-6': 1.3 } },
    applicableTo: ['ki_dev_model_concept']
  },
  {
    key: 'aiDevModelComplexity',
    label: 'Modellkomplexität',
    type: 'radio',
    options: [
      { value: 'standard_ml', label: 'Standard ML / Forecasting' },
      { value: 'deep_learning_cv', label: 'Deep Learning / Computer Vision' },
      { value: 'complex', label: 'Komplex / multimodal' }
    ],
    default: 'standard_ml',
    pricingEffect: { type: 'multiplier', values: { standard_ml: 1.0, deep_learning_cv: 1.3, complex: 1.6 } },
    applicableTo: ['ki_dev_model_training']
  },
  {
    key: 'aiDevOptimizationScope',
    label: 'Optimierungsumfang',
    type: 'radio',
    options: [
      { value: 'standard', label: 'Standard' },
      { value: 'extended', label: 'Erweitert' },
      { value: 'comprehensive', label: 'Umfangreich' }
    ],
    default: 'standard',
    pricingEffect: { type: 'multiplier', values: { standard: 1.0, extended: 1.2, comprehensive: 1.4 } },
    applicableTo: ['ki_dev_model_training']
  },
  {
    key: 'aiDevValidationScope',
    label: 'Validierungsumfang',
    type: 'radio',
    options: [
      { value: 'standard', label: 'Standard' },
      { value: 'multi_scenario', label: 'Mehrere Segmente / Szenarien' },
      { value: 'robustness', label: 'Umfangreiche Robustheitsanalyse' }
    ],
    default: 'standard',
    pricingEffect: { type: 'multiplier', values: { standard: 1.0, multi_scenario: 1.2, robustness: 1.4 } },
    applicableTo: ['ki_dev_model_validation']
  },
  {
    key: 'aiDevTargetSystemCount',
    label: 'Zielsysteme',
    type: 'radio',
    options: [
      { value: '1', label: '1 System' },
      { value: '2-3', label: '2–3 Systeme' },
      { value: '4-5', label: '4–5 Systeme' }
    ],
    default: '1',
    pricingEffect: { type: 'multiplier', values: { '1': 1.0, '2-3': 1.25, '4-5': 1.5 } },
    applicableTo: ['ki_dev_model_integration']
  },
  {
    key: 'aiDevProcessingMode',
    label: 'Verarbeitung',
    type: 'radio',
    options: [
      { value: 'batch', label: 'Batch' },
      { value: 'near_realtime', label: 'Near-Realtime' },
      { value: 'realtime', label: 'Realtime / hohe Verfügbarkeit' }
    ],
    default: 'batch',
    pricingEffect: { type: 'multiplier', values: { batch: 1.0, near_realtime: 1.15, realtime: 1.35 } },
    applicableTo: ['ki_dev_model_integration']
  },
  {
    key: 'aiDevDeploymentMode',
    label: 'Deployment',
    type: 'radio',
    options: [
      { value: 'cloud', label: 'Standard Cloud' },
      { value: 'edge_onprem', label: 'Edge / On-Premise' }
    ],
    default: 'cloud',
    pricingEffect: { type: 'multiplier', values: { cloud: 1.0, edge_onprem: 1.5 } },
    applicableTo: ['ki_dev_mlops']
  },
  {
    key: 'aiDevRetrainingMode',
    label: 'Retraining',
    type: 'radio',
    options: [
      { value: 'manual', label: 'Manuell' },
      { value: 'planned', label: 'Geplant / halbautomatisch' },
      { value: 'automated', label: 'Automatisierte Pipeline' }
    ],
    default: 'manual',
    pricingEffect: { type: 'multiplier', values: { manual: 1.0, planned: 1.5, automated: 2.0 } },
    applicableTo: ['ki_dev_mlops']
  },
  {
    key: 'aiDevMonitoringScope',
    label: 'Monitoring',
    type: 'radio',
    options: [
      { value: 'basic', label: 'Basis' },
      { value: 'extended', label: 'Erweitert' }
    ],
    default: 'basic',
    pricingEffect: { type: 'multiplier', values: { basic: 1.0, extended: 1.2 } },
    applicableTo: ['ki_dev_mlops']
  }
];

// Alle Parameter zusammen
export const allParameters: Parameter[] = [...globalParameters, ...productParameters];

// Helper: Parameter nach Key finden
export function getParameterByKey(key: string): Parameter | undefined {
  return allParameters.find(p => p.key === key);
}

// Helper: Parameter für ein Deliverable
export function getParametersForDeliverable(deliverableId: string, parameterKeys?: string[]): Parameter[] {
  if (parameterKeys && parameterKeys.length > 0) {
    return parameterKeys
      .map((key) => getParameterByKey(key))
      .filter((p): p is Parameter => p !== undefined);
  }

  return allParameters.filter(
    (p) => !p.applicableTo || p.applicableTo.includes(deliverableId)
  );
}
