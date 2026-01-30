import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Separator } from "./ui/separator";
import { CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import type { Deliverable } from "../data/deliverables";
import type { Recommendation } from "../data/recommendations";
import { getMinimumPrice, formatPrice } from "../lib/pricing";
import { cn } from "../lib/utils";
import { getDeliverableIcon } from "../lib/iconMap";

interface DeliverableCardProps {
  deliverable: Deliverable;
  recommendation: Recommendation;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

// Mapping für Impact-Tags zu deutschen Labels
const impactLabels: Record<string, string> = {
  quickwin: "Quick Win",
  foundation: "Foundation",
  compliance: "Compliance",
  performance: "Performance",
  adoption: "Adoption"
};

/**
 * Deliverable Card für Recommendation Step
 * Name + Family tag, Short description, Badges, Preis, Toggle, Details Accordion
 */
export function DeliverableCard({ 
  deliverable, 
  recommendation, 
  isEnabled, 
  onToggle 
}: DeliverableCardProps) {
  const isActive = deliverable.active;
  const isDisabled = !isActive;

  const Icon = getDeliverableIcon(deliverable.id);

  return (
    <Card className={cn(
      "card transition-all duration-200",
      isEnabled && isActive && "card-selected border-accent bg-accent/5",
      isDisabled && "opacity-70"
    )}>
      <CardHeader className="pb-3">
        {/* Icon + Name + Family Tag */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-start gap-3 flex-1">
            <Icon className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-foreground mb-1 line-clamp-2">
                {deliverable.name}
              </h3>
              <Badge variant="outline" className="text-xs">
                {deliverable.family}
              </Badge>
            </div>
          </div>
        </div>

        {/* Short Description (max 1-2 lines) */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
          {deliverable.shortDescription}
        </p>

        {/* Badges: Impact (max 3) */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {deliverable.tags.impact.slice(0, 3).map((impact) => (
            <Badge key={impact} variant="secondary" className="text-xs px-1.5 py-0">
              {impactLabels[impact] || impact}
            </Badge>
          ))}
        </div>

        {/* Preis + Toggle Row */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex-1">
            {isActive ? (
              <div>
                <p className="font-semibold text-lg text-accent">
                  ab {formatPrice(getMinimumPrice(deliverable))}
                </p>
              </div>
            ) : (
              <Badge variant="outline" className="text-xs">
                Coming soon
              </Badge>
            )}
          </div>
          
          {isActive && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Im Paket</span>
              <Switch
                checked={isEnabled}
                onChange={(e) => onToggle(e.target.checked)}
                disabled={isDisabled}
              />
            </div>
          )}
        </div>

        {/* "Warum empfohlen?" Text */}
        <p className="text-xs text-muted-foreground mt-3 italic">
          <span className="font-medium">Warum empfohlen?</span> {recommendation.reason}
        </p>
      </CardHeader>

          <CardContent className="pt-0 px-6 pb-6">
        {/* Details Accordion */}
        <Accordion type="single" collapsible>
          <AccordionItem value={`details-${deliverable.id}`} className="border-0">
            <AccordionTrigger className="text-xs py-2 hover:no-underline">
              <span className="flex items-center gap-1">
                Details
                <ChevronDown className="h-3 w-3" />
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 space-y-4">
              {/* Long Description */}
              <div>
                <h4 className="font-medium text-sm mb-2 text-foreground">Beschreibung</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {deliverable.longDescription}
                </p>
              </div>

              <Separator />

              {/* Deliverables Output */}
              {deliverable.deliverablesOutput.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2 text-foreground">Lieferumfang</h4>
                  <ul className="space-y-1.5">
                    {deliverable.deliverablesOutput.map((output, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Separator />

              {/* Assumptions & Out of Scope */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-xs mb-2 text-foreground">Voraussetzungen</h4>
                  <ul className="space-y-1">
                    {deliverable.assumptions.map((assumption, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                        <span>{assumption}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-xs mb-2 text-foreground">Nicht enthalten</h4>
                  <ul className="space-y-1">
                    {deliverable.outOfScope.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <XCircle className="h-3 w-3 text-red-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
