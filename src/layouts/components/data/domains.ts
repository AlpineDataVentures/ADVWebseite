import { useCases } from './useCases';

/**
 * Domänen-Definitionen
 */
export interface Domain {
  id: string;
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
    id: 'sales-marketing',
    name: 'Sales & Marketing',
    description: 'Vertriebs- und Marketinganalysen, Dashboards und Reporting',
    icon: 'TrendingUp',
    enabled: true
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Finanzreporting, Automatisierung und Compliance',
    icon: 'Landmark',
    enabled: true
  },
  {
    id: 'it-data',
    name: 'IT & Data',
    description: 'Datenarchitektur, BI-Setup und Datenmanagement',
    icon: 'Server',
    enabled: true
  },
  {
    id: 'general-mgmt',
    name: 'General Management',
    description: 'Strategische Analysen und Management-Dashboards',
    icon: 'Briefcase',
    enabled: true
  },
  {
    id: 'procurement',
    name: 'Procurement',
    description: 'Einkauf und Beschaffung optimieren',
    icon: 'ShoppingCart',
    enabled: true
  },
  {
    id: 'production',
    name: 'Production',
    description: 'Produktionsplanung und -optimierung',
    icon: 'Factory',
    enabled: true
  },
  {
    id: 'logistics',
    name: 'Logistics',
    description: 'Lager- und Logistikoptimierung',
    icon: 'Package',
    enabled: true
  },
  {
    id: 'hr',
    name: 'HR',
    description: 'Personalanalysen und HR-Reporting',
    icon: 'Users',
    enabled: true
  },
  {
    id: 'rnd',
    name: 'Research & Development',
    description: 'Forschung und Entwicklung',
    icon: 'FlaskConical',
    enabled: true
  },
  {
    id: 'risk-compliance',
    name: 'Risk & Compliance',
    description: 'Risikomanagement und Compliance',
    icon: 'Shield',
    enabled: true
  }
];

/**
 * Gibt eine Domäne nach ID zurück
 */
export function getDomainById(id: string): Domain | undefined {
  return domains.find(d => d.id === id);
}

/**
 * Gibt alle aktivierten Domänen zurück
 */
export function getEnabledDomains(): Domain[] {
  return domains.filter(d => d.enabled);
}

/**
 * Gibt Use Cases für eine Domäne zurück
 * Mappt domain ID zu useCase.domain
 */
export function getUseCasesForDomain(domainId: string) {
  // Mappe domain IDs zu useCase.domain Werten
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
  
  const mappedDomain = domainMapping[domainId];
  if (!mappedDomain) return [];
  
  return useCases.filter(uc => uc.domain === mappedDomain);
}
