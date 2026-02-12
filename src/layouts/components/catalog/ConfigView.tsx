import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { Select } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { CheckCircle2, XCircle } from "lucide-react";
import { useConfigStore } from "../stores/configStore";
import { getDeliverableById } from "../data/deliverables";
import { getParametersForDeliverable } from "../data/parameters";
import { calculateDeliverablePrice, formatPrice } from "../lib/pricing";
import type { DeliverableParameters } from "../data/models";
import { getDeliverableIcon } from "../lib/iconMap";

interface ConfigViewProps {
  useCaseId: string | null;
  onBack: () => void;
}

// Helper Text für Parameter
const parameterHelperText: Record<string, string> = {
  companySize: "Größere Unternehmen benötigen mehr Ressourcen und komplexere Lösungen.",
  speed: "FastTrack bedeutet beschleunigte Umsetzung mit höherer Priorität.",
  dataSources: "Mehr Datenquellen erfordern zusätzliche Integrationsarbeit.",
  deployment: "On-Premise Installation erfordert vor-Ort Setup und Wartung.",
  securityLevel: "Erweiterte Sicherheit umfasst zusätzliche Compliance-Maßnahmen.",
  trainingParticipants: "Jeder zusätzliche Teilnehmer erhöht den Schulungsaufwand.",
  reportComplexity: "Komplexere Berichte benötigen mehr Entwicklungszeit."
};

/**
 * Config View - Zeigt Konfiguration für alle aktivierten Deliverables
 */
export function ConfigView({ useCaseId, onBack }: ConfigViewProps) {
  const selectedDeliverables = useConfigStore((state) => state.selectedDeliverables);
  const updateDeliverableParam = useConfigStore((state) => state.updateDeliverableParam);

  const enabledDeliverables = Object.entries(selectedDeliverables)
    .filter(([_, state]) => state.enabled)
    .map(([id, state]) => {
      const deliverable = getDeliverableById(id);
      return deliverable ? { id, deliverable, params: state.params } : null;
    })
    .filter((item): item is { id: string; deliverable: NonNullable<ReturnType<typeof getDeliverableById>>; params: DeliverableParameters } =>
      item !== null
    );

  if (enabledDeliverables.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-text-light dark:text-darkmode-text-light mb-2">Keine Deliverables aktiviert</p>
        <p className="text-sm text-text-light dark:text-darkmode-text-light mb-4">
          Bitte aktivieren Sie mindestens ein Deliverable im Schritt "Empfehlung"
        </p>
        <Button variant="outline" onClick={onBack} size="lg">
          ← Zurück zur Empfehlung
        </Button>
      </div>
    );
  }

  const handleParamChange = (deliverableId: string, paramKey: string, value: string | number | boolean) => {
    updateDeliverableParam(deliverableId, paramKey, value);
  };

  const handleCopyConfig = () => {
    const config = useConfigStore.getState();
    const configJson = JSON.stringify({
      selectedUseCases: config.selectedUseCases,
      selectedDeliverables: config.selectedDeliverables,
      totalPrice: useConfigStore.getState().getTotalPrice()
    }, null, 2);

    navigator.clipboard.writeText(configJson).then(() => {
      // Toast würde hier kommen, für MVP: console
      console.log('Konfiguration kopiert!');
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text dark:text-darkmode-text mb-2">
            Konfiguration
          </h2>
          <p className="text-sm text-text-light dark:text-darkmode-text-light">
            Passen Sie die Parameter für Ihre Deliverables an. Der Preis wird automatisch aktualisiert.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Zurück zur Empfehlung
        </Button>
      </div>

      {/* Accordion für jedes Deliverable */}
      <Accordion type="multiple" className="space-y-3">
        {enabledDeliverables.map(({ id, deliverable, params }) => {
          const applicableParameters = getParametersForDeliverable(id);
          const priceCalculation = calculateDeliverablePrice(deliverable, params);
          const Icon = getDeliverableIcon(id);

          return (
            <AccordionItem
              key={id}
              value={id}
              className="card border-border rounded-2xl overflow-hidden"
            >
              {/* Accordion Header */}
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Icon className="h-5 w-5 text-accent shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-foreground text-left truncate">
                        {deliverable.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <Badge variant="outline" className="text-xs shrink-0">
                          {deliverable.family}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {/* Aktueller Preis (live) */}
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-semibold text-lg text-accent">
                      {formatPrice(priceCalculation.total)}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              {/* Accordion Content */}
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                  {/* Left: Parameter Controls */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-text dark:text-darkmode-text mb-4">
                        Parameter
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {applicableParameters.length === 0 ? (
                          <p className="text-sm text-text-light dark:text-darkmode-text-light col-span-2">
                            Keine konfigurierbaren Parameter für dieses Deliverable.
                          </p>
                        ) : (
                          applicableParameters.map((param) => {
                            const currentValue = params[param.key] ?? param.default;
                            const helperText = parameterHelperText[param.key];

                            return (
                              <div key={param.key} className="space-y-2">
                                <Label htmlFor={`${id}-${param.key}`} className="text-sm font-medium">
                                  {param.label}
                                </Label>

                                {param.type === 'radio' ? (
                                  <>
                                    <RadioGroup
                                      value={String(currentValue)}
                                      onValueChange={(value) => handleParamChange(id, param.key, value)}
                                    >
                                      {param.options?.map((option) => (
                                        <RadioGroupItem
                                          key={option.value}
                                          value={option.value}
                                          id={`${id}-${param.key}-${option.value}`}
                                        >
                                          {option.label}
                                        </RadioGroupItem>
                                      ))}
                                    </RadioGroup>
                                    {helperText && (
                                      <p className="text-xs text-text-light dark:text-darkmode-text-light mt-1">
                                        {helperText}
                                      </p>
                                    )}
                                  </>
                                ) : param.type === 'select' ? (
                                  <>
                                    <Select
                                      id={`${id}-${param.key}`}
                                      value={String(currentValue)}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        handleParamChange(id, param.key, value);
                                      }}
                                      className="h-10"
                                    >
                                      {param.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </Select>
                                    {helperText && (
                                      <p className="text-xs text-text-light dark:text-darkmode-text-light mt-1">
                                        {helperText}
                                      </p>
                                    )}
                                  </>
                                ) : param.type === 'number' ? (
                                  <>
                                    <Input
                                      id={`${id}-${param.key}`}
                                      type="number"
                                      value={Number(currentValue)}
                                      onChange={(e) => handleParamChange(id, param.key, Number(e.target.value) || Number(param.default))}
                                      className="h-10"
                                      min={1}
                                      max={50}
                                    />
                                    {helperText && (
                                      <p className="text-xs text-text-light dark:text-darkmode-text-light">
                                        {helperText}
                                      </p>
                                    )}
                                  </>
                                ) : null}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Scope & Deliverables */}
                    <div className="mt-6">
                      <Accordion type="single" collapsible className="border border-border rounded-lg">
                        <AccordionItem value={`scope-${id}`} className="border-0">
                          <AccordionTrigger className="px-4 py-3 text-sm font-medium">
                            Scope & Deliverables
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 space-y-4">
                            {/* Output Bullets */}
                            {deliverable.deliverablesOutput.length > 0 && (
                              <div>
                                <h5 className="text-xs font-semibold text-text dark:text-darkmode-text mb-2 uppercase">
                                  Lieferumfang
                                </h5>
                                <ul className="space-y-1.5">
                                  {deliverable.deliverablesOutput.map((output, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-text-light dark:text-darkmode-text-light">
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
                              {deliverable.assumptions.length > 0 && (
                                <div>
                                  <h5 className="text-xs font-semibold text-text dark:text-darkmode-text mb-2 uppercase">
                                    Voraussetzungen
                                  </h5>
                                  <ul className="space-y-1">
                                    {deliverable.assumptions.map((assumption, idx) => (
                                      <li key={idx} className="flex items-start gap-1.5 text-xs text-text-light dark:text-darkmode-text-light">
                                        <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                        <span>{assumption}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {deliverable.outOfScope.length > 0 && (
                                <div>
                                  <h5 className="text-xs font-semibold text-text dark:text-darkmode-text mb-2 uppercase">
                                    Nicht enthalten
                                  </h5>
                                  <ul className="space-y-1">
                                    {deliverable.outOfScope.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-1.5 text-xs text-text-light dark:text-darkmode-text-light">
                                        <XCircle className="h-3 w-3 text-red-500 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>

                  {/* Right: PriceBreakdown */}
                  <div className="lg:col-span-1">
                    <div className="card p-4 sticky top-6">
                      <h4 className="text-sm font-semibold text-foreground mb-4">
                        Preisaufschlüsselung
                      </h4>
                      <div className="space-y-3">
                        {/* Base */}
                        <div className="flex justify-between text-sm">
                          <span className="text-text-light dark:text-darkmode-text-light">Basispreis</span>
                          <span className="font-medium">{formatPrice(priceCalculation.base)}</span>
                        </div>

                        {/* Multipliers */}
                        {priceCalculation.multipliers.length > 0 && (
                          <>
                            <Separator />
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-text-light dark:text-darkmode-text-light uppercase">
                                Multiplikatoren
                              </p>
                              {priceCalculation.multipliers.map((mult, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="text-text-light dark:text-darkmode-text-light">{mult.label}</span>
                                    <Badge variant="outline" className="text-xs">
                                      ×{mult.factor.toFixed(2)}
                                    </Badge>
                                  </div>
                                  <span className="font-medium">
                                    {mult.amountImpact >= 0 ? '+' : ''}{formatPrice(mult.amountImpact)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {/* Add-ons */}
                        {priceCalculation.addons.length > 0 && (
                          <>
                            <Separator />
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-text-light dark:text-darkmode-text-light uppercase">
                                Zusatzkosten
                              </p>
                              {priceCalculation.addons.map((addon, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                  <span className="text-text-light dark:text-darkmode-text-light">{addon.label}</span>
                                  <span className="font-medium">+{formatPrice(addon.amount)}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        <Separator />

                        {/* Total */}
                        <div className="flex justify-between items-center pt-2">
                          <span className="font-semibold text-base text-text dark:text-darkmode-text">Gesamt</span>
                          <span className="font-bold text-lg text-green-500">
                            {formatPrice(priceCalculation.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* CTA Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-border">
        <Button variant="outline" onClick={handleCopyConfig} size="lg">
          Konfiguration kopieren
        </Button>
        <Button onClick={onBack} size="lg" className="btn-primary">
          Zurück zur Empfehlung
        </Button>
      </div>
    </div>
  );
}
