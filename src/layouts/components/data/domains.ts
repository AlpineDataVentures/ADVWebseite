import { useCases } from './useCases';

/**
 * Domänen-Definitionen
 */
export interface Domain {
  key: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

/**
 * Verfügbare Domänen (basierend auf useCases.ts)
 */
export const domains: Domain[] = [
  {
    key: 'sales-marketing',
    name: 'Sales & Marketing',
    description: 'Vertriebs- und Marketinganalysen, Dashboards und Reporting',
    icon: 'TrendingUp',
    enabled: true
  },
  {
    key: 'finance',
    name: 'Finance',
    description: 'Finanzreporting, Automatisierung und Compliance',
    icon: 'Landmark',
    enabled: true
  },
  {
    key: 'it-data',
    name: 'IT & Data',
    description: 'Datenarchitektur, BI-Setup und Datenmanagement',
    icon: 'Server',
    enabled: true
  },
  {
    key: 'general-mgmt',
    name: 'General Management',
    description: 'Strategische Analysen und Management-Dashboards',
    icon: 'Briefcase',
    enabled: true
  },
  {
    key: 'procurement',
    name: 'Procurement',
    description: 'Einkauf und Beschaffung optimieren',
    icon: 'ShoppingCart',
    enabled: true
  },
  {
    key: 'production',
    name: 'Production',
    description: 'Produktionsplanung und -optimierung',
    icon: 'Factory',
    enabled: true
  },
  {
    key: 'logistics',
    name: 'Logistics',
    description: 'Lager- und Logistikoptimierung',
    icon: 'Package',
    enabled: true
  },
  {
    key: 'hr',
    name: 'HR',
    description: 'Personalanalysen und HR-Reporting',
    icon: 'Users',
    enabled: true
  },
  {
    key: 'rnd',
    name: 'Research & Development',
    description: 'Forschung und Entwicklung',
    icon: 'FlaskConical',
    enabled: true
  },
  {
    key: 'risk-compliance',
    name: 'Risk & Compliance',
    description: 'Risikomanagement und Compliance',
    icon: 'Shield',
    enabled: true
  }
];

/**
 * Gibt eine Domäne nach Key zurück
 */
export function getDomainByKey(key: string): Domain | undefined {
  return domains.find(d => d.key === key);
}

/**
 * Gibt alle aktivierten Domänen zurück
 */
export function getEnabledDomains(): Domain[] {
  return domains.filter(d => d.enabled);
}

/**
 * Gibt Use Cases für eine Domäne zurück
 * Mappt domain Key zu useCase.domain
 */
export function getUseCasesForDomain(domainKey: string) {
  // Mappe domain Keys zu useCase.domain Werten
  const domainMapping: Record<string, string> = {
    'sales-marketing': 'sales_marketing',
    'finance': 'finance',
    'it-data': 'it_data',
    'general-mgmt': 'general_mgmt',
    'procurement': 'procurement',
    'production': 'production',
    'logistics': 'logistics',
    'hr': 'hr',
    'rnd': 'rnd',
    'risk-compliance': 'risk_compliance'
  };

  const mappedDomain = domainMapping[domainKey];
  if (!mappedDomain) return [];

  return useCases.filter(uc => uc.domain === mappedDomain);
}
