import { LayoutGrid, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { uiClusterLabels, type UiClusterId } from "../data/useCases";

interface CatalogToolbarProps {
  activeCluster: UiClusterId | null;
  onOpenDomains: () => void;
  onBackToKiSearch: () => void;
}

/**
 * Leiste für die klassische Browsing-Ansicht ("Alle Produkte"/Domänen).
 * Bewusst OHNE Sucheingabe: die manuelle Textsuche existiert nur noch im
 * KI-Suchfeld auf der Landing-Seite (das bei Bedarf automatisch auf die
 * lokale Standardsuche umschaltet) – hier gibt es nur Domänen-Navigation
 * und den Rückweg zur KI-Suche.
 */
export function CatalogToolbar({ activeCluster, onOpenDomains, onBackToKiSearch }: CatalogToolbarProps) {
  return (
    <div className="catalog-toolbar border-b border-border dark:border-darkmode-border bg-body dark:bg-darkmode-body shadow-[0_1px_0_0_var(--color-border)] dark:shadow-[0_1px_0_0_var(--color-darkmode-border)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            className="shrink-0 gap-2 h-11 px-4 font-medium"
            onClick={onOpenDomains}
          >
            <LayoutGrid className="h-4 w-4" />
            Alle Domänen
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="shrink-0 gap-2 h-11 px-4 font-medium"
            onClick={onBackToKiSearch}
          >
            <Sparkles className="h-4 w-4" />
            Zurück zur KI-Suche
          </Button>
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
