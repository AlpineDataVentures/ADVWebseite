import { useCases } from './useCases';
import generatedDomains from './domains.generated.json';

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
 * Verfügbare Domänen (build-time generiert aus Strapi)
 */
export const domains: Domain[] = generatedDomains as Domain[];

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
