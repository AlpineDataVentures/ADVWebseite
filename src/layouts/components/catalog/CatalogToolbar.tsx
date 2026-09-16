import { LayoutGrid, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { uiClusterLabels, type UiClusterId } from "../data/useCases";

interface CatalogToolbarProps {
  activeCluster: UiClusterId | null;
  onOpenDomains: () => void;
  /** "browse" (Standard): klassische Browsing-Ansicht mit Rückweg zur KI-Suche.
   *  "ki-landing": KI-Such-Startseite, rechter Button führt stattdessen zu "Alle Produkte". */
  mode?: "browse" | "ki-landing";
  onBackToKiSearch?: () => void;
  onShowAll?: () => void;
}

/**
 * Leiste über der Katalog-Ansicht (klassisches Browsing ODER KI-Such-
 * Startseite). Bewusst OHNE Sucheingabe: die manuelle Textsuche existiert nur
 * noch im KI-Suchfeld auf der Landing-Seite (das bei Bedarf automatisch auf
 * die lokale Standardsuche umschaltet) – hier gibt es nur Domänen-Navigation
 * und, je nach Ansicht, den Rückweg zur KI-Suche oder zu "Alle Produkte".
 */
export function CatalogToolbar({
  activeCluster,
  onOpenDomains,
  mode = "browse",
  onBackToKiSearch,
  onShowAll,
}: CatalogToolbarProps) {
  return (
    <div className="catalog-toolbar border-b border-border dark:border-darkmode-border bg-body dark:bg-darkmode-body shadow-[0_1px_0_0_var(--color-border)] dark:shadow-[0_1px_0_0_var(--color-darkmode-border)]">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="shrink-0 gap-2 h-11 px-4 font-medium justify-self-start md:min-w-52"
            onClick={onOpenDomains}
          >
            <LayoutGrid className="h-4 w-4" />
            Alle Domänen
          </Button>

          <p className="order-3 md:order-0 col-span-2 md:col-span-1 mx-auto max-w-2xl px-8 md:px-2 lg:px-10 text-center text-sm md:text-base font-bold text-text dark:text-darkmode-text">
            Unsere Produkte sind Fixpreisprojekte, klar kalkuliert, ohne Time & Material und
            ohne nachträgliche Scope-Erweiterung. Das Risiko tragen wir, nicht Sie.
          </p>

          {mode === "browse" ? (
            <Button
              type="button"
              variant="ghost"
              className="shrink-0 gap-2 h-11 px-4 font-medium justify-self-end md:min-w-52"
              onClick={onBackToKiSearch}
            >
              <Sparkles className="h-4 w-4" />
              Zurück zur KI-Suche
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="shrink-0 h-11 px-4 font-medium order-2 md:order-0 justify-self-end md:min-w-52"
              onClick={onShowAll}
            >
              Alle Produkte
            </Button>
          )}
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
