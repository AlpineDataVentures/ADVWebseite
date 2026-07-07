import { cn } from "../lib/utils";

type FlowStep = "browse" | "product" | "modules" | "config" | "inquiry";

const steps: { id: FlowStep; label: string }[] = [
  { id: "browse", label: "Produkt wählen" },
  { id: "modules", label: "Bausteine" },
  { id: "config", label: "Konfiguration" },
  { id: "inquiry", label: "Anfrage" },
];

interface CatalogFlowStepsProps {
  current: FlowStep;
  className?: string;
}

/**
 * Dezente Prozess-Orientierung: Produkt → Bausteine → Konfiguration → Anfrage.
 */
export function CatalogFlowSteps({ current, className }: CatalogFlowStepsProps) {
  const currentIndex = steps.findIndex((s) => s.id === current || (current === "product" && s.id === "modules"));

  return (
    <nav aria-label="Katalog-Fortschritt" className={cn("w-full", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-xs text-text-light dark:text-darkmode-text-light">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isDone = index < currentIndex;

          return (
            <li key={step.id} className="flex items-center gap-1">
              {index > 0 && <span className="text-border px-0.5" aria-hidden>›</span>}
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 transition-colors",
                  isActive && "bg-green-600/10 text-green-800 dark:text-green-300 font-medium",
                  isDone && !isActive && "text-text dark:text-darkmode-text",
                  !isActive && !isDone && "opacity-60"
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
