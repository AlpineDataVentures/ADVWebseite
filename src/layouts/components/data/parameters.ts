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
    default: 'Mid',
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
        // Kalibriert auf Basispreis 600 € inkl. 10-%-Puffer → Zielwerte 600–8.000 €/Monat
        'SMB': 10 / 11,
        'Mid': 100 / 33,
        'Enterprise': 200 / 33
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
