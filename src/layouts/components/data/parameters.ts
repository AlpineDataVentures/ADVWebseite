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
    applicableTo: ['del-5', 'del-6'] // Nur für Data Architecture Deliverables
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
    applicableTo: ['del-1', 'del-5'] // BI Setup und DWH
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
    applicableTo: ['del-5', 'del-6'] // Data Architecture
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
    applicableTo: ['del-8'] // Power BI Schulung
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
    applicableTo: ['del-3', 'del-4'] // Management-Bericht und Reporting-Struktur
  }
];

// Alle Parameter zusammen
export const allParameters: Parameter[] = [...globalParameters, ...productParameters];

// Helper: Parameter nach Key finden
export function getParameterByKey(key: string): Parameter | undefined {
  return allParameters.find(p => p.key === key);
}

// Helper: Parameter für ein Deliverable
export function getParametersForDeliverable(deliverableId: string): Parameter[] {
  return allParameters.filter(p => 
    !p.applicableTo || p.applicableTo.includes(deliverableId)
  );
}
