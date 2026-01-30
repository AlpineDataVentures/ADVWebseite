import { Badge } from "./ui/badge";
import { Info } from "lucide-react";
import type { UseCase } from "../data/useCases";
import { cn } from "../lib/utils";
import { useConfigStore } from "../stores/configStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface UseCaseCardCompactProps {
  useCase: UseCase;
  isActive?: boolean;
  onSelect: (useCaseId: string) => void;
}

// Mapping für Intent-Tags zu deutschen Labels
const intentLabels: Record<string, string> = {
  transparency: "Transparenz",
  automation: "Automatisierung",
  insights: "Insights",
  compliance: "Compliance",
  scale: "Skalierung"
};

// Mapping für Komplexität
const complexityLabels: Record<string, string> = {
  xs: "XS",
  s: "S",
  m: "M",
  l: "L"
};

/**
 * Kompakte Use Case Card für Finder Panel
 * Title, 1-liner short, 2-3 badges (intent), complexity chip, hover glow
 */
export function UseCaseCardCompact({ useCase, isActive = false, onSelect }: UseCaseCardCompactProps) {
  const setActiveUseCase = useConfigStore((state) => state.setActiveUseCase);
  
  const handleClick = () => {
    // In DemoApp: use onSelect callback
    // In standalone pages: navigate to /configure
    if (onSelect) {
      setActiveUseCase(useCase.id);
      onSelect(useCase.id);
    } else {
      // Fallback: navigate directly
      setActiveUseCase(useCase.id);
      window.location.href = `/configure?useCase=${useCase.id}`;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "card p-4 cursor-pointer transition-all duration-200 relative",
        "hover:shadow-glow hover:border-[hsl(var(--accent)/0.4)]",
        {
          "border-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.05)] shadow-[hsl(var(--accent)/0.15)]": isActive,
        }
      )}
    >
      {/* Title + Info Icon */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sm text-[hsl(var(--text))] leading-tight line-clamp-2">
          {useCase.title}
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="shrink-0 p-1 hover:bg-[hsl(var(--surface2))] rounded relative"
              >
                <Info className="h-3.5 w-3.5 text-[hsl(var(--muted))]" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-xs mb-2 font-medium">{useCase.title}</p>
              <p className="text-xs text-[hsl(var(--muted))]">{useCase.short}</p>
              <div className="mt-2 pt-2 border-t border-[hsl(var(--border))]">
                <p className="text-xs font-medium mb-1">Typische Outputs:</p>
                <ul className="text-xs text-[hsl(var(--muted))] space-y-0.5">
                  {useCase.outputs.slice(0, 3).map((output, idx) => (
                    <li key={idx}>• {output}</li>
                  ))}
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* 1-liner short */}
      <p className="text-xs text-[hsl(var(--muted))] line-clamp-2 mb-3 leading-relaxed">
        {useCase.short}
      </p>

      {/* Badges Row - Max 3 badges */}
      <div className="flex flex-wrap items-center gap-1.5">
        {/* Intent Badges (max 2) */}
        {useCase.tags.intent.slice(0, 2).map((intent) => (
          <Badge key={intent} variant="secondary" className="text-xs px-1.5 py-0">
            {intentLabels[intent] || intent}
          </Badge>
        ))}
        
        {/* Complexity Chip (3rd badge) */}
        <Badge variant="outline" className="text-xs px-1.5 py-0 ml-auto">
          {complexityLabels[useCase.tags.complexity] || useCase.tags.complexity}
        </Badge>
      </div>
    </div>
  );
}
