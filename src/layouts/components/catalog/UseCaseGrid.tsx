import { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { UseCaseCardCompact } from "./UseCaseCardCompact";
import { getUseCasesForDomain } from "../data/domains";
import type { UseCase, IntentTag, ComplexityTag } from "../data/useCases";
import { cn } from "../lib/utils";

interface UseCaseGridProps {
  domainId: string | null;
  activeUseCaseId: string | null;
  onSelectUseCase: (useCaseId: string) => void;
  searchQuery?: string;
}

// Intent Labels
const intentLabels: Record<string, string> = {
  transparency: "Transparenz",
  automation: "Automatisierung",
  insights: "Insights",
  compliance: "Compliance",
  scale: "Skalierung"
};

// Complexity Labels
const complexityLabels: Record<string, string> = {
  xs: "XS",
  s: "S",
  m: "M",
  l: "L"
};

/**
 * Use Case Grid mit Search und Filter
 * 1 Spalte im Panel (oder 2 auf breiteren Screens)
 */
export function UseCaseGrid({ domainId, activeUseCaseId, onSelectUseCase, searchQuery: globalSearchQuery }: UseCaseGridProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [selectedIntents, setSelectedIntents] = useState<IntentTag[]>([]);
  const [selectedComplexities, setSelectedComplexities] = useState<ComplexityTag[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Use global search query if provided, otherwise use local
  const searchQuery = globalSearchQuery || localSearchQuery;

  // Hole Use Cases für Domain
  const allUseCases = domainId ? getUseCasesForDomain(domainId) : [];

  // Filter Use Cases
  const filteredUseCases = useMemo(() => {
    let filtered = [...allUseCases];

    // Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((uc) => {
        const titleMatch = uc.title.toLowerCase().includes(query);
        const shortMatch = uc.short.toLowerCase().includes(query);
        const intentMatch = uc.tags.intent.some((intent) =>
          intentLabels[intent]?.toLowerCase().includes(query)
        );
        return titleMatch || shortMatch || intentMatch;
      });
    }

    // Intent Filter
    if (selectedIntents.length > 0) {
      filtered = filtered.filter((uc) =>
        uc.tags.intent.some((intent) => selectedIntents.includes(intent))
      );
    }

    // Complexity Filter
    if (selectedComplexities.length > 0) {
      filtered = filtered.filter((uc) =>
        selectedComplexities.includes(uc.tags.complexity)
      );
    }

    return filtered;
  }, [allUseCases, searchQuery, selectedIntents, selectedComplexities]);

  // Get unique intents and complexities from all use cases
  const availableIntents = useMemo(() => {
    const intents = new Set<IntentTag>();
    allUseCases.forEach((uc) => {
      uc.tags.intent.forEach((intent) => intents.add(intent));
    });
    return Array.from(intents);
  }, [allUseCases]);

  const availableComplexities = useMemo(() => {
    const complexities = new Set<ComplexityTag>();
    allUseCases.forEach((uc) => {
      complexities.add(uc.tags.complexity);
    });
    return Array.from(complexities).sort();
  }, [allUseCases]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedIntents.length > 0 ||
    selectedComplexities.length > 0;

  const clearFilters = () => {
    setLocalSearchQuery("");
    setSelectedIntents([]);
    setSelectedComplexities([]);
  };

  // Pagination: Show first 12, then "Show more"
  const ITEMS_PER_PAGE = 12;
  const displayedUseCases = showAll 
    ? filteredUseCases 
    : filteredUseCases.slice(0, ITEMS_PER_PAGE);
  const hasMore = filteredUseCases.length > ITEMS_PER_PAGE;

  const toggleIntent = (intent: IntentTag) => {
    setSelectedIntents((prev) =>
      prev.includes(intent)
        ? prev.filter((i) => i !== intent)
        : [...prev, intent]
    );
  };

  const toggleComplexity = (complexity: ComplexityTag) => {
    setSelectedComplexities((prev) =>
      prev.includes(complexity)
        ? prev.filter((c) => c !== complexity)
        : [...prev, complexity]
    );
  };

  if (!domainId) {
    return (
      <div className="flex items-center justify-center h-64 text-[hsl(var(--muted))] text-sm">
        Wählen Sie eine Domäne aus
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Input (only if no global search) */}
      {!globalSearchQuery && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted))]" />
          <Input
            type="search"
            placeholder="Use Cases durchsuchen..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
      )}

      {/* Filter Chips */}
      <div className="space-y-2">
        {/* Intent Filters */}
        {availableIntents.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {availableIntents.map((intent) => (
              <button
                key={intent}
                type="button"
                onClick={() => toggleIntent(intent)}
                className={cn(
                  "chip text-xs",
                  selectedIntents.includes(intent) && "chip-active"
                )}
              >
                {intentLabels[intent] || intent}
              </button>
            ))}
          </div>
        )}

        {/* Complexity Filters */}
        {availableComplexities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {availableComplexities.map((complexity) => (
              <button
                key={complexity}
                type="button"
                onClick={() => toggleComplexity(complexity)}
                className={cn(
                  "chip text-xs",
                  selectedComplexities.includes(complexity) && "chip-active"
                )}
              >
                {complexityLabels[complexity] || complexity}
              </button>
            ))}
          </div>
        )}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-7 text-xs text-[hsl(var(--muted))] hover:text-[hsl(var(--text))]"
          >
            <X className="h-3 w-3 mr-1" />
            Filter zurücksetzen
          </Button>
        )}
      </div>

      {/* Use Case Grid - 1 Spalte im Panel, 2 auf breiteren Screens */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-3">
        {displayedUseCases.length === 0 ? (
          <div className="col-span-full text-center py-8 text-sm text-[hsl(var(--muted))]">
            {hasActiveFilters
              ? "Keine Use Cases gefunden. Versuchen Sie andere Filter."
              : "Keine Use Cases für diese Domäne verfügbar."}
          </div>
        ) : (
          displayedUseCases.map((useCase) => (
            <UseCaseCardCompact
              key={useCase.id}
              useCase={useCase}
              isActive={activeUseCaseId === useCase.id}
              onSelect={onSelectUseCase}
            />
          ))
        )}
      </div>

      {/* Show More Button */}
      {hasMore && !showAll && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(true)}
            className="text-xs"
          >
            Weitere {filteredUseCases.length - ITEMS_PER_PAGE} anzeigen
          </Button>
        </div>
      )}

      {/* Results Count */}
      {hasActiveFilters && filteredUseCases.length > 0 && (
        <p className="text-xs text-[hsl(var(--muted))] text-center">
          {filteredUseCases.length} von {allUseCases.length} Use Cases
        </p>
      )}
    </div>
  );
}
