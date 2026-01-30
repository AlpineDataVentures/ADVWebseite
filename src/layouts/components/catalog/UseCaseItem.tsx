import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import type { UseCase } from "../data/useCases";
import { cn } from "../lib/utils";
import { getIntentIcon } from "../lib/iconMap";

interface UseCaseItemProps {
  useCase: UseCase;
  isActive?: boolean;
  onSelect: () => void;
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
 * Use Case Item für Finder Panel
 * Mit ausfahrbaren Details (Accordion)
 */
export function UseCaseItem({ useCase, isActive = false, onSelect }: UseCaseItemProps) {
  return (
    <div
      className={cn(
        "card p-4 cursor-pointer transition-all duration-200",
        "hover:shadow-lg hover:shadow-accent/10 hover:border-accent/30",
        isActive && "border-accent bg-accent/5 shadow-accent/15"
      )}
      onClick={onSelect}
    >
      {/* Title */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2 flex-1">
          {useCase.title}
        </h3>
        <button
          type="button"
          className={cn(
            "px-3 py-1 text-xs font-medium rounded-lg transition-colors",
            "bg-accent text-background hover:bg-accent/90",
            "shrink-0"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          Bundle anzeigen
        </button>
      </div>

      {/* Short Description */}
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
        {useCase.short}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {/* Intent Badges (max 2) */}
        {useCase.tags.intent.slice(0, 2).map((intent) => {
          const Icon = getIntentIcon(intent);
          return (
            <Badge key={intent} variant="secondary" className="text-xs px-1.5 py-0.5 flex items-center gap-1">
              <Icon className="h-3 w-3" />
              {intentLabels[intent] || intent}
            </Badge>
          );
        })}
        
        {/* Complexity Chip */}
        <Badge variant="outline" className="text-xs px-1.5 py-0.5 ml-auto">
          {complexityLabels[useCase.tags.complexity] || useCase.tags.complexity}
        </Badge>
      </div>

      {/* Details Accordion */}
      <Accordion type="single" collapsible className="border-t border-border pt-3">
        <AccordionItem value="details" className="border-0">
          <AccordionTrigger className="text-xs py-2 hover:no-underline">
            <span className="flex items-center gap-1">
              Details
              <ChevronDown className="h-3 w-3" />
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 space-y-3">
            {/* Outputs (max 3) */}
            {useCase.outputs.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 uppercase">
                  Typische Outputs
                </h4>
                <ul className="space-y-1.5">
                  {useCase.outputs.slice(0, 3).map((output, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{output}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-2 uppercase">
                Tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {useCase.tags.intent.map((intent) => (
                  <Badge key={intent} variant="secondary" className="text-xs px-1.5 py-0">
                    {intentLabels[intent] || intent}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-xs px-1.5 py-0">
                  Komplexität: {complexityLabels[useCase.tags.complexity] || useCase.tags.complexity}
                </Badge>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
