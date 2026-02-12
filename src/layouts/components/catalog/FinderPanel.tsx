import { getUseCasesForDomain } from "../data/domains";
import { UseCaseItem } from "./UseCaseItem";
import { cn } from "../lib/utils";

interface FinderPanelProps {
  activeDomainId: string | null;
  activeUseCaseId: string | null;
  onSelectUseCase: (useCaseId: string) => void;
  searchQuery?: string;
}

/**
 * Finder Panel - Zeigt Use Cases für aktive Domain
 * Mit ausfahrbaren Details
 */
export function FinderPanel({
  activeDomainId,
  activeUseCaseId,
  onSelectUseCase,
  searchQuery = ''
}: FinderPanelProps) {
  const useCases = activeDomainId ? getUseCasesForDomain(activeDomainId) : [];

  // Filter by search query
  const filteredUseCases = searchQuery.trim()
    ? useCases.filter((uc) => {
      const query = searchQuery.toLowerCase();
      return (
        uc.title.toLowerCase().includes(query) ||
        uc.short.toLowerCase().includes(query) ||
        uc.tags.intent.some((intent) => intent.toLowerCase().includes(query))
      );
    })
    : useCases;

  if (!activeDomainId) {
    return (
      <div className="flex flex-col h-full min-h-0 bg-light dark:bg-darkmode-light rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="space-y-2">
            <p className="text-sm font-medium text-text dark:text-darkmode-text">
              Domäne wählen
            </p>
            <p className="text-xs text-text-light dark:text-darkmode-text-light">
              Wählen Sie oben eine Domäne aus, um Use Cases zu sehen.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0 bg-light dark:bg-darkmode-light rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-text dark:text-darkmode-text mb-1">
          Use Cases
        </h2>
        <p className="text-xs text-text-light dark:text-darkmode-text-light">
          {filteredUseCases.length} {filteredUseCases.length === 1 ? 'Use Case' : 'Use Cases'} gefunden
        </p>
      </div>

      {/* Use Case List - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredUseCases.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-text-light dark:text-darkmode-text-light">
              {searchQuery ? 'Keine Use Cases gefunden.' : 'Keine Use Cases für diese Domäne verfügbar.'}
            </p>
          </div>
        ) : (
          filteredUseCases.map((useCase) => (
            <UseCaseItem
              key={useCase.id}
              useCase={useCase}
              isActive={activeUseCaseId === useCase.id}
              onSelect={() => onSelectUseCase(useCase.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
