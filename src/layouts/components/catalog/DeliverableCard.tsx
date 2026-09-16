import { useState } from "react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { CheckCircle2, ChevronDown, XCircle } from "lucide-react";
import type { Deliverable } from "../data/deliverables";
import type { Recommendation } from "../data/recommendations";
import { getMinimumPrice, formatPriceLabel } from "../lib/pricing";
import { cn } from "../lib/utils";
import { getDeliverableIcon } from "../lib/iconMap";

interface DeliverableCardProps {
  deliverable: Deliverable;
  recommendation: Recommendation;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  onConfigure?: () => void;
  layout?: "grid" | "list";
  showCoreBadge?: boolean;
  /**
   * Vereinfachte Darstellung für die reine Bausteinauswahl: kein Preis, kein
   * "Konfigurieren"-Button (nur Auswahl-Toggle) und Details ohne Accordion
   * immer sichtbar.
   */
  simple?: boolean;
}

/**
 * Kompakte Produktbaustein-Karte für die Produktdetailansicht.
 * Geschlossen: Name, Kategorie, Preis, Auswahl, CTA.
 * Aufgeklappt: Lieferumfang, Voraussetzungen, Details.
 */
export function DeliverableCard({
  deliverable,
  recommendation,
  isEnabled,
  onToggle,
  onConfigure,
  layout = "grid",
  showCoreBadge = false,
  simple = false,
}: DeliverableCardProps) {
  const isActive = deliverable.active;
  const isDisabled = !isActive;
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const Icon = getDeliverableIcon(deliverable.key);
  const limitedOutputs = deliverable.deliverablesOutput.slice(0, 5);
  const limitedAssumptions = deliverable.assumptions.slice(0, 3);
  const limitedOutOfScope = deliverable.outOfScope.slice(0, 3);
  const minPrice = getMinimumPrice(deliverable);

  const actionCluster = isActive ? (
    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
      {!simple && minPrice > 0 && (
        <span className="text-xs sm:text-sm text-text-light dark:text-darkmode-text-light whitespace-nowrap tabular-nums">
          ab <span className="font-semibold text-text dark:text-darkmode-text">{formatPriceLabel(minPrice, deliverable.pricePeriod)}</span>
        </span>
      )}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-sm font-semibold whitespace-nowrap",
            isEnabled ? "text-green-700 dark:text-green-400" : "text-text dark:text-darkmode-text"
          )}
        >
          {isEnabled ? "Ausgewählt" : "Auswählen"}
        </span>
        <Switch
          checked={isEnabled}
          onChange={(e) => onToggle(e.target.checked)}
          disabled={isDisabled}
          className="scale-110"
        />
      </div>
      {!simple && (
        <Button
          type="button"
          size="sm"
          variant="default"
          className="shrink-0 whitespace-nowrap h-8 px-3 text-xs"
          onClick={(e) => {
            e.currentTarget.blur();
            onToggle(true);
            onConfigure?.();
          }}
        >
          Konfigurieren
        </Button>
      )}
    </div>
  ) : null;

  const summaryContent = (
    <>
      <p className="text-xs text-text-light dark:text-darkmode-text-light leading-relaxed">
        {deliverable.shortDescription}
      </p>
      <p className="text-xs text-text-light dark:text-darkmode-text-light italic">
        <span className="font-medium text-text dark:text-darkmode-text not-italic">Warum empfohlen?</span>{" "}
        {recommendation.reason}
      </p>

      {deliverable.longDescription && (
        <div className="space-y-1">
          <h4 className="font-semibold text-xs text-text dark:text-darkmode-text">Beschreibung</h4>
          <p className="text-xs text-text-light dark:text-darkmode-text-light leading-relaxed">
            {deliverable.longDescription}
          </p>
        </div>
      )}
    </>
  );

  const extraContent = (
    <>
      {limitedOutputs.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="font-semibold text-xs text-text dark:text-darkmode-text">Lieferumfang</h4>
          <ul className="space-y-1">
            {limitedOutputs.map((output, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-xs text-text-light dark:text-darkmode-text-light">
                <CheckCircle2 className="h-3 w-3 text-green-600/70 dark:text-green-400/70 mt-0.5 shrink-0" />
                <span>{output}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(limitedAssumptions.length > 0 || limitedOutOfScope.length > 0) && (
        <>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {limitedAssumptions.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="font-semibold text-xs text-text dark:text-darkmode-text">Voraussetzungen</h4>
                <ul className="space-y-1">
                  {limitedAssumptions.map((assumption, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-xs text-text-light dark:text-darkmode-text-light">
                      <CheckCircle2 className="h-3 w-3 text-green-600/70 dark:text-green-400/70 mt-0.5 shrink-0" />
                      <span>{assumption}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {limitedOutOfScope.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="font-semibold text-xs text-text dark:text-darkmode-text">Nicht enthalten</h4>
                <ul className="space-y-1">
                  {limitedOutOfScope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-xs text-text-light dark:text-darkmode-text-light">
                      <XCircle className="h-3 w-3 text-red-500/80 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );

  const hasExtraContent =
    limitedOutputs.length > 0 || limitedAssumptions.length > 0 || limitedOutOfScope.length > 0;

  const detailsAccordion = (
    <div className="pt-1.5 space-y-3">
      {summaryContent}
      {isDetailsOpen && hasExtraContent && <div className="space-y-4">{extraContent}</div>}
      {hasExtraContent && (
        <button
          type="button"
          onClick={() => setIsDetailsOpen((open) => !open)}
          aria-expanded={isDetailsOpen}
          aria-label={`Details zu ${deliverable.name} ein- oder ausklappen`}
          className="flex w-full items-center justify-center gap-1 text-[11px] text-text-light dark:text-darkmode-text-light hover:text-text dark:hover:text-darkmode-text"
        >
          {isDetailsOpen ? "Weniger Details" : "Mehr Details"}
          <ChevronDown
            className={cn("h-3 w-3 transition-transform duration-200", isDetailsOpen && "rotate-180")}
          />
        </button>
      )}
    </div>
  );

  const titleBlock = (
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-1.5 flex-wrap">
        <h3 className="text-sm font-semibold text-text dark:text-darkmode-text leading-tight line-clamp-1">
          {deliverable.name}
        </h3>
        {showCoreBadge && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
            Kern
          </Badge>
        )}
      </div>
      <p className="text-[11px] text-text-light dark:text-darkmode-text-light leading-tight mt-0.5 line-clamp-1">
        {deliverable.family}
      </p>
    </div>
  );

  if (layout === "list") {
    return (
      <li
        className={cn(
          "border-l-4 border-l-transparent bg-light dark:bg-darkmode-light hover:bg-body dark:hover:bg-darkmode-body transition-colors",
          isEnabled && isActive && "border-l-green-600 dark:border-l-green-400 bg-green-500/5 dark:bg-green-500/8",
          isDisabled && "opacity-60"
        )}
      >
        <div className="flex flex-col gap-2 px-3.5 py-2.5 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                isEnabled && isActive
                  ? "text-green-600 dark:text-green-400"
                  : "text-text-light dark:text-darkmode-text-light"
              )}
            />
            {titleBlock}
          </div>
          {actionCluster}
        </div>
        <div className="px-3.5 pb-1.5 pt-0">{detailsAccordion}</div>
      </li>
    );
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-colors duration-200 rounded-xl",
        isEnabled && isActive && "bg-green-500/5 dark:bg-green-500/8",
        isDisabled && "opacity-60"
      )}
    >
      {isEnabled && isActive && (
        <div className="absolute inset-y-0 left-0 w-1 bg-green-600 dark:bg-green-500" aria-hidden="true" />
      )}
      <div className="px-3.5 py-2.5 space-y-1.5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                isEnabled && isActive
                  ? "text-green-600 dark:text-green-400"
                  : "text-text-light dark:text-darkmode-text-light"
              )}
            />
            {titleBlock}
          </div>
          {actionCluster}
        </div>
        {detailsAccordion}
      </div>
    </Card>
  );
}
