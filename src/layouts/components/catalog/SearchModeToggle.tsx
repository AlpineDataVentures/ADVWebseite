import { Search, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";

export type SearchMode = "standard" | "ki";

interface SearchModeToggleProps {
  value: SearchMode;
  onChange: (value: SearchMode) => void;
}

/** Umschalter Standardsuche/KI-Suche – beide Modi sind jederzeit direkt wählbar. */
export function SearchModeToggle({ value, onChange }: SearchModeToggleProps) {
  return (
    <div
      className="inline-flex rounded-lg border border-border p-0.5 bg-light dark:bg-darkmode-light shrink-0"
      role="group"
      aria-label="Suchmodus wählen"
    >
      <button
        type="button"
        aria-pressed={value === "standard"}
        onClick={() => onChange("standard")}
        className={cn(
          "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          value === "standard"
            ? "bg-body dark:bg-darkmode-body text-text dark:text-darkmode-text shadow-sm"
            : "text-text-light dark:text-darkmode-text-light"
        )}
      >
        <Search className="h-4 w-4" /> Standard
      </button>
      <button
        type="button"
        aria-pressed={value === "ki"}
        onClick={() => onChange("ki")}
        className={cn(
          "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          value === "ki"
            ? "bg-body dark:bg-darkmode-body text-text dark:text-darkmode-text shadow-sm"
            : "text-text-light dark:text-darkmode-text-light"
        )}
      >
        <Sparkles className="h-4 w-4" /> KI-Suche
      </button>
    </div>
  );
}
