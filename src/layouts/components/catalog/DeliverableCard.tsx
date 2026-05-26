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
  onConfigure?: () => void;
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
  onToggle,
  onConfigure
}: DeliverableCardProps) {
  const isActive = deliverable.active;
  const isDisabled = !isActive;

  const Icon = getDeliverableIcon(deliverable.id);
  const quickOutputs = deliverable.deliverablesOutput.slice(0, 2);
  const limitedOutputs = deliverable.deliverablesOutput.slice(0, 5);
  const limitedAssumptions = deliverable.assumptions.slice(0, 3);
  const limitedOutOfScope = deliverable.outOfScope.slice(0, 3);

  return (
    <Card className={cn(
      "transition-all duration-200",
      isEnabled && isActive && "border-green-600/30 dark:border-green-400/20 ring-1 ring-green-600/10 dark:ring-green-400/10",
      isDisabled && "opacity-70"
    )}>
      <CardHeader className="pb-3 px-6 pt-6">
        {/* Icon + Name + Family Tag */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-start gap-3 flex-1">
            <Icon
              className={cn(
                "h-5 w-5 mt-0.5 shrink-0",
                isEnabled && isActive
                  ? "text-green-600 dark:text-green-400"
                  : "text-text dark:text-darkmode-text"
              )}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-text dark:text-darkmode-text mb-1 line-clamp-2">
                {deliverable.name}
              </h3>
              <Badge variant="outline" className="text-xs">
                {deliverable.family}
              </Badge>
            </div>
          </div>
        </div>

        {/* Short Description (max 1-2 lines) */}
        <p className="text-sm text-text-light dark:text-darkmode-text-light line-clamp-2 leading-relaxed mb-3">
          {deliverable.shortDescription}
        </p>

        {/* Badges: Impact (max 2) */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {deliverable.tags.impact.slice(0, 2).map((impact) => (
            <Badge key={impact} variant="secondary" className="text-xs px-1.5 py-0">
              {impactLabels[impact] || impact}
            </Badge>
          ))}
        </div>

        {/* Quick scope preview, so details are visible without extra click */}
        {quickOutputs.length > 0 && (
          <ul className="space-y-1 mb-3">
            {quickOutputs.map((output, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-xs text-text-light dark:text-darkmode-text-light line-clamp-1">
                <CheckCircle2 className="h-3 w-3 text-green-600/80 dark:text-green-400/80 mt-0.5 shrink-0" />
                <span>{output}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Preis + Toggle Row - neutral price, not green */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex-1">
            {isActive ? (
              <div>
                <p className="font-semibold text-lg text-text dark:text-darkmode-text">
                  ab {formatPrice(getMinimumPrice(deliverable))}
                </p>
              </div>
            ) : (
              <Badge variant="outline" className="text-xs">
                Roadmap-Baustein
              </Badge>
            )}
          </div>

          {isActive && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-light dark:text-darkmode-text-light whitespace-nowrap">Im Paket</span>
              <Switch
                checked={isEnabled}
                onChange={(e) => onToggle(e.target.checked)}
                disabled={isDisabled}
              />
            </div>
          )}
        </div>

        {isActive && (
          <div className="mt-2">
            <Button
              size="sm"
              variant={isEnabled ? "default" : "outline"}
              onClick={() => {
                onToggle(true);
                onConfigure?.();
              }}
              className="w-full"
            >
              Baustein konfigurieren
            </Button>
          </div>
        )}

        {/* "Warum empfohlen?" Text */}
        <p className="text-xs text-text-light dark:text-darkmode-text-light mt-3 italic">
          <span className="font-medium text-text dark:text-darkmode-text">Warum empfohlen?</span> {recommendation.reason}
        </p>
      </CardHeader>

      <CardContent className="pt-0 px-6 pb-6">
        {/* Details Accordion */}
        <Accordion type="single" collapsible>
          <AccordionItem value={`details-${deliverable.id}`} className="border-0">
            <AccordionTrigger
              className="text-xs py-2 hover:no-underline"
              aria-label={`Details zu ${deliverable.name} ein- oder ausklappen`}
            >
              <span className="flex items-center gap-1">
                Details
                <ChevronDown className="h-3 w-3 text-text-light dark:text-darkmode-text-light" />
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-3 space-y-5">
              {/* Long Description */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-text dark:text-darkmode-text">Beschreibung</h4>
                <p className="text-sm text-text-light dark:text-darkmode-text-light leading-6 line-clamp-4">
                  {deliverable.longDescription}
                </p>
              </div>

              <Separator />

              {/* Deliverables Output */}
              {limitedOutputs.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-text dark:text-darkmode-text">Lieferumfang</h4>
                  <ul className="space-y-2">
                    {limitedOutputs.map((output, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-text-light dark:text-darkmode-text-light leading-6">
                        <CheckCircle2 className="h-3 w-3 text-green-600/70 dark:text-green-400/70 mt-1.5 shrink-0" />
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Separator />

              {/* Assumptions & Out of Scope */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-text dark:text-darkmode-text">Voraussetzungen</h4>
                  <ul className="space-y-2">
                    {limitedAssumptions.map((assumption, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-text-light dark:text-darkmode-text-light leading-6">
                        <CheckCircle2 className="h-3 w-3 text-green-600/70 dark:text-green-400/70 mt-1.5 shrink-0" />
                        <span>{assumption}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-text dark:text-darkmode-text">Nicht enthalten</h4>
                  <ul className="space-y-2">
                    {limitedOutOfScope.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-text-light dark:text-darkmode-text-light leading-6">
                        <XCircle className="h-3 w-3 text-red-500/80 mt-1.5 shrink-0" />
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
