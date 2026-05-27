import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useConfigStore } from "../stores/configStore";
import { getUseCaseByKey } from "../data/useCases";
import { getDeliverableById } from "../data/deliverables";
import { getBundleForUseCase } from "../data/recommendations";
import { DeliverableCard } from "./DeliverableCard";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface BundleViewProps {
  useCaseId: string | null;
  onNext: () => void;
  onBack: () => void;
}

/**
 * Bundle View - Zeigt Use Case Header + Recommended Deliverables
 */
export function BundleView({ useCaseId, onNext, onBack }: BundleViewProps) {
  const useCase = useCaseId ? getUseCaseByKey(useCaseId) : null;
  const selectedDeliverables = useConfigStore((state) => state.selectedDeliverables);
  const toggleDeliverable = useConfigStore((state) => state.toggleDeliverable);
  const setBundleFromUseCase = useConfigStore((state) => state.setBundleFromUseCase);

  if (!useCase) {
    return null;
  }

  // Hole Recommendations
  const recommendations = getBundleForUseCase(useCase.key);

  // Filter: Core (defaultEnabled=true) vs Optional (defaultEnabled=false)
  const coreDeliverables = recommendations.filter((rec) => {
    if (!rec.defaultEnabled) return false;
    const deliverable = getDeliverableById(rec.deliverableId);
    return Boolean(deliverable?.active);
  });
  const optionalDeliverables = recommendations.filter((rec) => {
    if (rec.defaultEnabled) return false;
    const deliverable = getDeliverableById(rec.deliverableId);
    return Boolean(deliverable?.active);
  });
  const enabledCount = recommendations.filter(rec => {
    const deliverable = getDeliverableById(rec.deliverableId);
    if (!deliverable) return false;
    return selectedDeliverables[deliverable.id]?.enabled || false;
  }).length;

  const handleToggle = (deliverableId: string, enabled: boolean) => {
    toggleDeliverable(deliverableId, enabled);
  };

  const handleResetBundle = () => {
    setBundleFromUseCase(useCase.key);
  };
  const defaultBestForByDomain: Record<string, string[]> = {
    general_mgmt: ["Geschäftsführung", "Bereichsleitungen"],
    finance: ["Finance", "Controlling"],
    sales_marketing: ["Sales", "Marketing"],
    it_data: ["IT", "Data-Teams"],
    procurement: ["Beschaffung", "Einkauf"],
    production: ["Produktion", "Operations"],
    logistics: ["Logistik", "Operations"],
    hr: ["HR", "People & Culture"],
    rnd: ["R&D", "Innovationsteams"],
    risk_compliance: ["Risk", "Compliance"],
  };
  const fallbackDetails = {
    problem: useCase.short,
    typicalResult: useCase.outputs[0] ?? "Klarer erster Umsetzungsschritt mit messbarem Nutzen.",
    typicalDeliverables: recommendations
      .map((rec) => getDeliverableById(rec.deliverableId)?.name)
      .filter((name): name is string => Boolean(name))
      .slice(0, 3),
    bestFor: defaultBestForByDomain[useCase.domain] ?? ["Fachbereiche mit konkretem Entscheidungsbedarf"],
  };
  const details = useCase.details ?? fallbackDetails;
  const useCaseHref = `/use-cases/${useCase.slug ?? useCase.key}`;

  return (
    <div className="space-y-6">
      {/* Compact Use-Case Context */}
      <div className="rounded-lg border border-border bg-light/60 dark:bg-darkmode-light/60 px-4 py-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-text-light dark:text-darkmode-text-light mb-1">Ausgewählter Use Case</p>
            <h2 className="text-base font-semibold text-text dark:text-darkmode-text line-clamp-1">{useCase.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="h-8">
              <a href={useCaseHref}>Zur Use-Case-Seite</a>
            </Button>
            <Button variant="ghost" size="sm" onClick={onBack}>
              ← Wechseln
            </Button>
          </div>
        </div>
        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="use-case-details" className="border-0">
            <AccordionTrigger className="py-2 text-xs text-text-light dark:text-darkmode-text-light hover:no-underline">
              Use-Case-Details kompakt
            </AccordionTrigger>
            <AccordionContent className="pt-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-text-light dark:text-darkmode-text-light mb-1">Problem</p>
                  <p className="text-xs text-text-light dark:text-darkmode-text-light leading-relaxed">{details.problem}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-text-light dark:text-darkmode-text-light mb-1">Ergebnis</p>
                  <p className="text-xs text-text-light dark:text-darkmode-text-light leading-relaxed">{details.typicalResult}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-text-light dark:text-darkmode-text-light mb-1">Für wen geeignet</p>
                  <p className="text-xs text-text-light dark:text-darkmode-text-light leading-relaxed">{details.bestFor.slice(0, 3).join(", ")}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Recommended Bundle Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text dark:text-darkmode-text">
            Empfohlenes Paket für diesen Use Case
          </h3>
          {recommendations.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {recommendations.length} Bausteine
            </Badge>
          )}
        </div>
        {useCase.outputs.length > 0 && (
          <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-1">
            {useCase.outputs.slice(0, 2).map((output, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-xs text-text-light dark:text-darkmode-text-light">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600/80 dark:text-green-400/80 mt-0.5 shrink-0" />
                <span className="line-clamp-1">{output}</span>
              </li>
            ))}
          </ul>
        )}

        {recommendations.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-text-light dark:text-darkmode-text-light mb-2">
              Keine Empfehlungen für diesen Use Case verfügbar.
            </p>
            <p className="text-sm text-text-light dark:text-darkmode-text-light">
              Bitte wählen Sie einen anderen Use Case aus.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-text dark:text-darkmode-text">
                  Jetzt verfügbar
                </h4>
                <p className="text-xs text-text-light dark:text-darkmode-text-light">
                  Direkt konfigurierbar
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Core Deliverables */}
                {coreDeliverables.map((recommendation) => {
                  const deliverable = getDeliverableById(recommendation.deliverableId);
                  if (!deliverable) return null;
                  const isEnabled = selectedDeliverables[deliverable.id]?.enabled || false;

                  return (
                    <DeliverableCard
                      key={deliverable.id}
                      deliverable={deliverable}
                      recommendation={recommendation}
                      isEnabled={isEnabled}
                      onToggle={(enabled) => handleToggle(deliverable.id, enabled)}
                      onConfigure={onNext}
                    />
                  );
                })}

              </div>
            </section>

            {optionalDeliverables.length > 0 && (
              <section className="space-y-4">
                <Accordion type="single" collapsible defaultValue="optional">
                  <AccordionItem value="optional" className="rounded-lg border border-border px-4">
                    <AccordionTrigger className="py-3 hover:no-underline">
                      <div className="text-left">
                        <h4 className="text-sm font-semibold text-text-light dark:text-darkmode-text-light">
                          Weitere empfohlene Bausteine
                        </h4>
                        <p className="text-xs text-text-light dark:text-darkmode-text-light">
                          {optionalDeliverables.length} optionale Erweiterungen
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {optionalDeliverables.map((recommendation) => {
                          const deliverable = getDeliverableById(recommendation.deliverableId);
                          if (!deliverable) return null;
                          const isEnabled = selectedDeliverables[deliverable.id]?.enabled || false;

                          return (
                            <DeliverableCard
                              key={deliverable.id}
                              deliverable={deliverable}
                              recommendation={recommendation}
                              isEnabled={isEnabled}
                              onToggle={(enabled) => handleToggle(deliverable.id, enabled)}
                              onConfigure={onNext}
                            />
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            )}
          </div>
        )}
      </div>

      <Separator />

      {/* CTA Buttons */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleResetBundle}
          size="lg"
        >
          Auswahl zurücksetzen
        </Button>

        <div className="flex items-center gap-4">
          <p className="text-sm text-text-light dark:text-darkmode-text-light">
            {enabledCount} von {recommendations.filter(r => getDeliverableById(r.deliverableId)?.active).length} aktiviert
          </p>
          <Button
            onClick={onNext}
            size="lg"
            variant="default"
            disabled={enabledCount === 0}
          >
            Paket konfigurieren
          </Button>
        </div>
      </div>
    </div>
  );
}
