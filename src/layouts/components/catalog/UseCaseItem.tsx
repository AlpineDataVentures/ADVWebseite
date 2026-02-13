import { Badge } from "./ui/badge";
import { CheckCircle2 } from "lucide-react";
import type { UseCase } from "../data/useCases";
import { cn } from "../lib/utils";
import { getIntentIcon } from "../lib/iconMap";

interface UseCaseItemProps {
  useCase: UseCase;
  isActive?: boolean;
  onSelect: () => void;
}

const intentLabels: Record<string, string> = {
  transparency: "Transparenz",
  automation: "Automatisierung",
  insights: "Insights",
  compliance: "Compliance",
  scale: "Skalierung"
};

const complexityLabels: Record<string, string> = {
  xs: "XS", s: "S", m: "M", l: "L"
};

/**
 * Use Case Item — premium list item for Finder Panel.
 * No .card class (avoids same-level bg on panel). Uses transparent bg + border.
 * Active = subtle green left border + faint tint. Hover = lift + border.
 */
export function UseCaseItem({ useCase, isActive = false, onSelect }: UseCaseItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full text-left rounded-xl p-3.5 transition-all duration-150",
        "border border-transparent",
        // Elevation + hover
        "hover:bg-body/60 dark:hover:bg-darkmode-body/60",
        "hover:border-border dark:hover:border-darkmode-border",
        "hover:shadow-sm",
        // Active state: subtle left accent, faint tint
        isActive
          ? "border-border dark:border-darkmode-border bg-body/80 dark:bg-darkmode-body/60 shadow-sm ring-1 ring-inset ring-green-600/15 dark:ring-green-400/15"
          : ""
      )}
    >
      {/* Title + complexity */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className={cn(
          "font-medium text-sm leading-snug line-clamp-2 flex-1",
          isActive
            ? "text-text-dark dark:text-darkmode-text-dark"
            : "text-text dark:text-darkmode-text"
        )}>
          {useCase.title}
        </h3>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0 mt-0.5">
          {complexityLabels[useCase.tags.complexity] || useCase.tags.complexity}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-xs text-text-light dark:text-darkmode-text-light line-clamp-2 leading-relaxed mb-2">
        {useCase.short}
      </p>

      {/* Intent badges */}
      <div className="flex flex-wrap items-center gap-1">
        {useCase.tags.intent.slice(0, 2).map((intent) => {
          const Icon = getIntentIcon(intent);
          return (
            <span
              key={intent}
              className="inline-flex items-center gap-1 text-[10px] text-text-light dark:text-darkmode-text-light"
            >
              <Icon className="h-3 w-3" />
              {intentLabels[intent] || intent}
            </span>
          );
        })}
      </div>

      {/* Active indicator bar */}
      {isActive && (
        <div className="mt-2.5 pt-2 border-t border-green-600/15 dark:border-green-400/15">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400">Ausgewählt</span>
          </div>
        </div>
      )}
    </button>
  );
}
