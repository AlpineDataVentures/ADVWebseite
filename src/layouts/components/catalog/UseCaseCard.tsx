import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";
import type { UseCase } from "../data/useCases";
import { getDeliverableById } from "../data/deliverables";
import { getBundleForUseCase } from "../data/recommendations";
import { useConfigStore } from "../stores/configStore";

interface UseCaseCardProps {
  useCase: UseCase;
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
 * Einzelne Use Case Card
 * Zeigt Titel, Beschreibung, Tags und typische Outputs
 */
export function UseCaseCard({ useCase, onSelect }: UseCaseCardProps) {
  // Hole Recommendations für typische Outputs
  const recommendations = getBundleForUseCase(useCase.id);
  const deliverablesList = recommendations
    .slice(0, 3) // Nur erste 3 für Preview
    .map(rec => getDeliverableById(rec.deliverableId))
    .filter((d): d is NonNullable<typeof d> => d !== undefined);

  const setActiveUseCase = useConfigStore((state) => state.setActiveUseCase);
  
  const handleSelect = () => {
    // Set active use case in store
    setActiveUseCase(useCase.id);
    // Use onSelect callback if provided (for DemoApp), otherwise navigate
    if (onSelect) {
      onSelect(useCase.id);
    } else {
      window.location.href = `/configure?useCase=${useCase.id}`;
    }
  };

  // Domain Label
  const domainLabels: Record<string, string> = {
    general_mgmt: "General Management",
    it_data: "IT & Data",
    finance: "Finance",
    sales_marketing: "Sales & Marketing",
    procurement: "Procurement",
    production: "Production",
    logistics: "Logistics",
    hr: "HR",
    rnd: "Research & Development",
    risk_compliance: "Risk & Compliance"
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        {/* Domain Header */}
        <div className="mb-3">
          <Badge variant="outline" className="text-xs">
            {domainLabels[useCase.domain] || useCase.domain}
          </Badge>
        </div>

        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-xl">{useCase.title}</CardTitle>
        </div>

        {/* Intent Badges (2-3) */}
        <div className="flex flex-wrap gap-2 mb-3">
          {useCase.tags.intent.slice(0, 3).map((intent) => (
            <Badge key={intent} variant="secondary" className="text-xs">
              {intentLabels[intent] || intent}
            </Badge>
          ))}
        </div>

        {/* Komplexität Badge */}
        <div className="mb-3">
          <Badge variant="outline" className="text-xs">
            Komplexität: {complexityLabels[useCase.tags.complexity] || useCase.tags.complexity}
          </Badge>
        </div>

        <CardDescription className="text-base leading-relaxed">
          {useCase.short}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Typische Outputs */}
        {deliverablesList.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-[hsl(var(--muted))]">
              Typische Outputs:
            </p>
            <ul className="space-y-1.5">
              {deliverablesList.map((deliverable) => (
                <li key={deliverable.id} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--accent))] mt-0.5 shrink-0" />
                  <span className="text-[hsl(var(--muted))]">{deliverable.name}</span>
                </li>
              ))}
              {recommendations.length > 3 && (
                <li className="text-xs text-[hsl(var(--muted))] pl-6">
                  + {recommendations.length - 3} weitere
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Details Accordion */}
        <Accordion type="single" collapsible className="border-t border-[hsl(var(--border))] pt-4">
          <AccordionItem value="details" className="border-0">
            <AccordionTrigger className="text-sm py-2 hover:no-underline">
              <span className="flex items-center gap-1">
                Details
                <ChevronDown className="h-3 w-3" />
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 space-y-3">
              {/* Outputs (max 3) */}
              {useCase.outputs.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[hsl(var(--text))] mb-2 uppercase">
                    Typische Outputs
                  </h4>
                  <ul className="space-y-1.5">
                    {useCase.outputs.slice(0, 3).map((output, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[hsl(var(--muted))]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--accent))] mt-0.5 shrink-0" />
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags Chips */}
              <div>
                <h4 className="text-xs font-semibold text-[hsl(var(--text))] mb-2 uppercase">
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

        {/* CTA Button */}
        <Button 
          onClick={handleSelect}
          className="w-full"
          size="lg"
        >
          Bundle vorschlagen
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
