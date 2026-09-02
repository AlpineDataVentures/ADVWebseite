import { Search, Sparkles, LayoutGrid } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchModeToggle, type SearchMode } from "./SearchModeToggle";
import { uiClusterLabels, type UiClusterId } from "../data/useCases";

interface CatalogToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchMode: SearchMode;
  onSearchModeChange: (mode: SearchMode) => void;
  kiQuery: string;
  onKiQueryChange: (query: string) => void;
  onSearchSubmit: () => void;
  activeCluster: UiClusterId | null;
  onOpenDomains: () => void;
}

export function CatalogToolbar({
  searchQuery,
  onSearchChange,
  searchMode,
  onSearchModeChange,
  kiQuery,
  onKiQueryChange,
  onSearchSubmit,
  activeCluster,
  onOpenDomains,
}: CatalogToolbarProps) {
  return (
    <div className="catalog-toolbar border-b border-border dark:border-darkmode-border bg-body dark:bg-darkmode-body shadow-[0_1px_0_0_var(--color-border)] dark:shadow-[0_1px_0_0_var(--color-darkmode-border)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Button
            type="button"
            variant="outline"
            className="shrink-0 justify-center sm:justify-start gap-2 h-11 px-4 font-medium"
            onClick={onOpenDomains}
          >
            <LayoutGrid className="h-4 w-4" />
            Alle Domänen
          </Button>

          {searchMode === "standard" ? (
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light dark:text-darkmode-text-light pointer-events-none" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Produkte, Bausteine, Themen durchsuchen…"
                className="h-11 pl-10 bg-light dark:bg-darkmode-light border-border/80"
                aria-label="Produktkatalog durchsuchen (Standardsuche)"
              />
            </div>
          ) : (
            <form
              className="relative flex-1 min-w-0"
              onSubmit={(e) => {
                e.preventDefault();
                onSearchSubmit();
              }}
            >
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light dark:text-darkmode-text-light pointer-events-none" />
              <Input
                type="search"
                value={kiQuery}
                onChange={(e) => onKiQueryChange(e.target.value)}
                placeholder="Frei formulieren und Enter drücken…"
                className="h-11 pl-10 bg-light dark:bg-darkmode-light border-border/80"
                aria-label="Produktkatalog mit KI durchsuchen"
              />
            </form>
          )}

          <SearchModeToggle value={searchMode} onChange={onSearchModeChange} />
        </div>

        {activeCluster && (
          <p className="mt-3 text-sm text-text-light dark:text-darkmode-text-light">
            Bereich:{" "}
            <span className="font-medium text-text dark:text-darkmode-text">
              {uiClusterLabels[activeCluster]}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
