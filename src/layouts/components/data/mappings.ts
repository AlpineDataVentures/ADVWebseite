import type { UseCase } from './models';
import { useCases, deliverables } from './seed';

/**
 * Mapping: Use Case -> Empfohlene Deliverables (Bundle)
 * Ein Deliverable kann in mehreren Bundles vorkommen.
 */

// Use Case zu Deliverable Bundle Mapping
export const useCaseToDeliverableMapping: Record<string, {
  required: string[];
  optional?: Array<{ deliverableId: string; defaultSelected: boolean }>;
}> = {
  'uc-sales-dashboard': {
    required: ['del-1', 'del-2', 'del-3'],
    optional: [
      { deliverableId: 'del-7', defaultSelected: true },
      { deliverableId: 'del-8', defaultSelected: false }
    ]
  },
  'uc-finance-reporting': {
    required: ['del-2', 'del-4', 'del-5', 'del-3']
  },
  'uc-it-data-setup': {
    required: ['del-1', 'del-5', 'del-6', 'del-4']
  }
};

/**
 * Gibt alle empfohlenen Deliverables für einen Use Case zurück
 */
export function getRecommendedDeliverablesForUseCase(useCaseId: string): string[] {
  const useCase = useCases.find(uc => uc.id === useCaseId);
  if (!useCase) return [];
  
  const required = useCase.recommendedDeliverableIds;
  const optional = useCase.optionalDeliverableIds
    ?.filter(opt => opt.defaultSelected)
    .map(opt => opt.deliverableId) || [];
  
  return [...required, ...optional];
}

/**
 * Gibt optionale Deliverables für einen Use Case zurück
 */
export function getOptionalDeliverablesForUseCase(useCaseId: string): Array<{
  deliverableId: string;
  defaultSelected: boolean;
}> {
  const useCase = useCases.find(uc => uc.id === useCaseId);
  return useCase?.optionalDeliverableIds || [];
}

/**
 * Prüft, ob ein Deliverable für einen Use Case empfohlen ist
 */
export function isDeliverableRecommendedForUseCase(
  deliverableId: string,
  useCaseId: string
): boolean {
  const useCase = useCases.find(uc => uc.id === useCaseId);
  if (!useCase) return false;
  
  return useCase.recommendedDeliverableIds.includes(deliverableId) ||
         useCase.optionalDeliverableIds?.some(opt => opt.deliverableId === deliverableId) ||
         false;
}

/**
 * Gibt alle Use Cases zurück, die ein bestimmtes Deliverable empfehlen
 */
export function getUseCasesForDeliverable(deliverableId: string): UseCase[] {
  return useCases.filter(uc => 
    uc.recommendedDeliverableIds.includes(deliverableId) ||
    uc.optionalDeliverableIds?.some(opt => opt.deliverableId === deliverableId)
  );
}
