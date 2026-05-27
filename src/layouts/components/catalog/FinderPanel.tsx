import { useCases } from "../data/useCases";
import { UseCaseItem } from "./UseCaseItem";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { getUiClusterForUseCase, uiClusterLabels, type UiClusterId } from "../data/useCases";

interface FinderPanelProps {
  activeCluster: UiClusterId | null;
  activeUseCaseId: string | null;
  onSelectUseCase: (useCaseId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

/**
 * Finder Panel - Zeigt Use Cases für aktive Domain
 * Mit ausfahrbaren Details
 */
export function FinderPanel({
  activeCluster,
  activeUseCaseId,
  onSelectUseCase,
  searchQuery = '',
  onSearchChange
}: FinderPanelProps) {
  const clusteredUseCases = useCases.filter((uc) => {
    if (!activeCluster) return false;
    return getUiClusterForUseCase(uc) === activeCluster;
  });

  // Filter by search query
  const filteredUseCases = searchQuery.trim()
    ? clusteredUseCases.filter((uc) => {
      const query = searchQuery.toLowerCase();
      return (
        uc.title.toLowerCase().includes(query) ||
        uc.short.toLowerCase().includes(query) ||
        uc.tags.intent.some((intent) => intent.toLowerCase().includes(query))
      );
    })
    : clusteredUseCases;
  const sortedUseCases = [...filteredUseCases].sort((a, b) => {
    const aPriority = a.priority === 'green' ? 1 : 0;
    const bPriority = b.priority === 'green' ? 1 : 0;
    if (aPriority !== bPriority) return bPriority - aPriority;
    return a.title.localeCompare(b.title, 'de');
  });

  if (!activeCluster) {
    return (
      <div className="flex flex-col h-full min-h-0 bg-light dark:bg-darkmode-light rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="space-y-2">
            <p className="text-sm font-medium text-text dark:text-darkmode-text">
              Wählen Sie zuerst einen Themenbereich aus.
            </p>
            <p className="text-xs text-text-light dark:text-darkmode-text-light">
              Danach sehen Sie links die passenden Use Cases.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0 bg-light dark:bg-darkmode-light rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="shrink-0 p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-text dark:text-darkmode-text mb-1 line-clamp-1">
          Use Cases in {activeCluster ? uiClusterLabels[activeCluster] : "diesem Bereich"}
        </h2>
        <p className="text-xs text-text-light dark:text-darkmode-text-light mb-3">
          {filteredUseCases.length} passende {filteredUseCases.length === 1 ? 'Use Case' : 'Use Cases'}
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-light dark:text-darkmode-text-light" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Use Cases im aktuellen Bereich suchen..."
            className="h-8 pl-8 text-xs"
          />
        </div>
      </div>

      {/* Use Case List - Scrollable */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredUseCases.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-text-light dark:text-darkmode-text-light">
              {searchQuery ? 'Keine Use Cases gefunden.' : 'Keine Use Cases für diesen Cluster verfügbar.'}
            </p>
          </div>
        ) : (
          sortedUseCases.map((useCase) => (
            <UseCaseItem
              key={useCase.key}
              useCase={useCase}
              isActive={activeUseCaseId === useCase.key}
              onSelect={() => onSelectUseCase(useCase.key)}
            />
          ))
        )}
      </div>
    </div>
  );
}
