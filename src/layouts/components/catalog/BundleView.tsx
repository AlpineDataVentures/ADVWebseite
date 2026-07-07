import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Mail, CheckCircle2 } from "lucide-react";
import { useConfigStore } from "../stores/configStore";
import { getProductById } from "../data/useCases";
import { getDeliverableById } from "../data/deliverables";
import { getBundleForProduct } from "../data/recommendations";
import { getRequestMode } from "../data/requestModes";
import { getProductDetailViewModel } from "../data/productDetailMeta";
import { DeliverableCard } from "./DeliverableCard";
import { CustomRequestForm } from "./CustomRequestForm";
import { CatalogFlowSteps } from "./CatalogFlowSteps";
import { ViewToggle, type ViewLayout } from "./ViewToggle";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { cn } from "../lib/utils";

interface BundleViewProps {
  productId: string | null;
  onNext: () => void;
  onBack: () => void;
  viewLayout: ViewLayout;
  onViewLayoutChange: (layout: ViewLayout) => void;
}

function DeliverableSection({
  title,
  subtitle,
  recommendations,
  selectedDeliverables,
  onToggle,
  onConfigure,
  layout,
}: {
  title: string;
  subtitle?: string;
  recommendations: ReturnType<typeof getBundleForProduct>;
  selectedDeliverables: ReturnType<typeof useConfigStore.getState>["selectedDeliverables"];
  onToggle: (id: string, enabled: boolean) => void;
  onConfigure: () => void;
  layout: ViewLayout;
}) {
  const items = recommendations
    .map((recommendation) => {
      const deliverable = getDeliverableById(recommendation.deliverableId);
      if (!deliverable?.active) return null;
      return { recommendation, deliverable };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  const renderCard = (recommendation: (typeof items)[0]["recommendation"], deliverable: (typeof items)[0]["deliverable"]) => (
    <DeliverableCard
      key={deliverable.key}
      deliverable={deliverable}
      recommendation={recommendation}
      isEnabled={selectedDeliverables[deliverable.key]?.enabled || false}
      onToggle={(enabled) => onToggle(deliverable.key, enabled)}
      onConfigure={onConfigure}
      layout={layout}
      showCoreBadge={recommendation.defaultEnabled}
    />
  );

  return (
    <section className="space-y-2.5">
      <h4 className="text-sm font-semibold text-text dark:text-darkmode-text">{title}</h4>
      {subtitle && (
        <p className="text-xs text-text-light dark:text-darkmode-text-light leading-snug">{subtitle}</p>
      )}
      {layout === "grid" ? (
        <div className="grid grid-cols-1 gap-2 md:gap-2.5">
          {items.map(({ recommendation, deliverable }) => renderCard(recommendation, deliverable))}
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border overflow-hidden">
          {items.map(({ recommendation, deliverable }) => renderCard(recommendation, deliverable))}
        </ul>
      )}
    </section>
  );
}

/**
 * Produktdetailansicht – Produktbausteine und individuelle Anfrage.
 */
export function BundleView({ productId, onNext, onBack, viewLayout, onViewLayoutChange }: BundleViewProps) {
  const product = productId ? getProductById(productId) : null;
  const selectedDeliverables = useConfigStore((state) => state.selectedDeliverables);
  const toggleDeliverable = useConfigStore((state) => state.toggleDeliverable);
  const setBundleFromProduct = useConfigStore((state) => state.setBundleFromProduct);

  if (!product) {
    return null;
  }

  const mode = getRequestMode(product.id);
  const recommendations = getBundleForProduct(product.id);
  const activeCount = recommendations.filter((rec) => getDeliverableById(rec.deliverableId)?.active).length;
  const details = getProductDetailViewModel(product);

  const coreDeliverables = recommendations.filter((rec) => {
    if (!rec.defaultEnabled) return false;
    return Boolean(getDeliverableById(rec.deliverableId)?.active);
  });
  const optionalDeliverables = recommendations.filter((rec) => {
    if (rec.defaultEnabled) return false;
    return Boolean(getDeliverableById(rec.deliverableId)?.active);
  });

  const enabledCount = recommendations.filter((rec) => {
    const deliverable = getDeliverableById(rec.deliverableId);
    if (!deliverable) return false;
    return selectedDeliverables[deliverable.key]?.enabled || false;
  }).length;

  const handleToggle = (deliverableId: string, enabled: boolean) => {
    toggleDeliverable(deliverableId, enabled);
  };

  const handleResetBundle = () => {
    setBundleFromProduct(product.id, { force: true, resetSelection: true });
  };

  const hasModules = recommendations.length > 0 && mode !== "custom";

  const modeBadgeLabel =
    mode === "custom" ? "Individuelle Anfrage" : mode === "hybrid" ? "Hybrid" : "Standardpaket";

  return (
    <div className="space-y-7">
      <CatalogFlowSteps current="modules" />

      {/* Produkt-Kontext */}
      <div className="rounded-2xl border border-border bg-light dark:bg-darkmode-light px-5 py-4 md:px-6 md:py-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-text-light dark:text-darkmode-text-light">
                Produkt
              </p>
              <Badge variant={mode === "custom" ? "default" : "secondary"} className="text-[11px] px-2 py-0">
                {modeBadgeLabel}
              </Badge>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-text dark:text-darkmode-text">
              {product.title}
            </h2>
            <p className="text-sm text-text-light dark:text-darkmode-text-light leading-snug max-w-3xl line-clamp-2">
              {product.short}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack} className="shrink-0">
            ← Zurück
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-light dark:text-darkmode-text-light">
              Problem
            </p>
            <p className="text-xs text-text dark:text-darkmode-text leading-snug line-clamp-3">{details.problem}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-light dark:text-darkmode-text-light">
              Ergebnis
            </p>
            <p className="text-xs text-text dark:text-darkmode-text leading-snug line-clamp-3">{details.typicalResult}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-light dark:text-darkmode-text-light">
              Für wen
            </p>
            <p className="text-xs text-text dark:text-darkmode-text leading-snug line-clamp-2">
              {details.bestFor.slice(0, 3).join(" · ")}
            </p>
          </div>
        </div>

        {details.outputs.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-border/60">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-light dark:text-darkmode-text-light">
              Was Sie erhalten
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
              {details.outputs.map((output) => (
                <li key={output} className="flex items-start gap-2 text-sm text-text dark:text-darkmode-text leading-snug">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600/80 dark:text-green-400/80 mt-0.5 shrink-0" />
                  <span>{output}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Accordion type="single" className="border-t border-border/60 pt-0.5">
          <AccordionItem value="more-details" className="border-0">
            <AccordionTrigger className="py-2 text-xs text-text-light dark:text-darkmode-text-light hover:no-underline">
              Projektablauf & Rahmen
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text dark:text-darkmode-text">Typischer Ablauf</p>
                  <ol className="space-y-1.5 list-decimal list-inside text-sm text-text-light dark:text-darkmode-text-light">
                    {details.projectFlow.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="space-y-2">
                  {details.projectScope && (
                    <>
                      <p className="text-xs font-semibold text-text dark:text-darkmode-text">Typische Projektgröße</p>
                      <p className="text-sm text-text-light dark:text-darkmode-text-light">{details.projectScope}</p>
                    </>
                  )}
                  {mode === "hybrid" && (
                    <>
                      <p className="text-xs font-semibold text-text dark:text-darkmode-text mt-3">
                        Wann individuelle Anfrage?
                      </p>
                      <p className="text-sm text-text-light dark:text-darkmode-text-light leading-relaxed">
                        Wenn Ihr Umfeld besondere Anforderungen hat, mehrere Standorte betroffen sind oder die
                        Standard-Bausteine nicht passen – ergänzen Sie unten eine individuelle Anfrage.
                      </p>
                    </>
                  )}
                  {mode === "custom" && (
                    <p className="text-sm text-text-light dark:text-darkmode-text-light leading-relaxed">
                      Dieses Produkt wird projektspezifisch geplant. Beschreiben Sie Ihre Situation – wir erstellen
                      ein passendes Angebot.
                    </p>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* custom: nur individuelle Anfrage */}
      {mode === "custom" ? (
        <CustomRequestForm productTitle={product.title} prominent />
      ) : recommendations.length === 0 ? (
        <CustomRequestForm productTitle={product.title} prominent />
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-text dark:text-darkmode-text">
                Produktbausteine
              </h3>
              {coreDeliverables.length > 0 && (
                <span className="inline-flex items-center rounded-full bg-green-600/10 dark:bg-green-500/15 px-2.5 py-1 text-xs font-medium text-green-800 dark:text-green-300">
                  Kernbausteine sind bereits vorausgewählt.
                </span>
              )}
            </div>
            <ViewToggle value={viewLayout} onChange={onViewLayoutChange} />
          </div>

          <DeliverableSection
            title="Empfohlene Kernbausteine"
            recommendations={coreDeliverables}
            selectedDeliverables={selectedDeliverables}
            onToggle={handleToggle}
            onConfigure={onNext}
            layout={viewLayout}
          />

          {optionalDeliverables.length > 0 && (
            <DeliverableSection
              title="Optionale Erweiterungen"
              recommendations={optionalDeliverables}
              selectedDeliverables={selectedDeliverables}
              onToggle={handleToggle}
              onConfigure={onNext}
              layout={viewLayout}
            />
          )}

          {mode === "hybrid" && (
            <section className={cn("pt-4", hasModules && "border-t border-border")}>
              <div className="rounded-xl border border-green-600/25 dark:border-green-400/20 bg-green-500/6 dark:bg-green-500/10 px-4 py-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Mail className="h-4 w-4 text-green-700 dark:text-green-400 shrink-0" />
                  <h4 className="text-sm font-semibold text-text dark:text-darkmode-text">
                    Individuelle Anfrage möglich
                  </h4>
                </div>
                <p className="text-sm text-text-light dark:text-darkmode-text-light leading-relaxed">
                  Die Bausteine oben sind unser Standardangebot. Wenn Ihr Bedarf darüber hinausgeht, beschreiben Sie
                  ihn – wir erstellen ein passendes Angebot.
                </p>
                <Accordion type="single" className="space-y-0">
                  <AccordionItem
                    value="custom-request"
                    className="rounded-lg border border-green-600/20 dark:border-green-400/15 bg-body dark:bg-darkmode-body overflow-hidden"
                  >
                    <AccordionTrigger className="py-3.5 px-4 hover:no-underline hover:bg-green-500/5 group">
                      <span className="flex items-center gap-2 text-sm font-semibold text-text dark:text-darkmode-text min-w-0">
                        <Mail className="h-4 w-4 text-green-700 dark:text-green-400 shrink-0" />
                        <span className="whitespace-nowrap">Individuelle Anfrage senden</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <CustomRequestForm productTitle={product.title} isAddon embedded />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>
          )}
        </div>
      )}

      {mode !== "custom" && recommendations.length > 0 && (
        <>
          <Separator />
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <Button variant="outline" onClick={handleResetBundle} size="lg">
              Auswahl zurücksetzen
            </Button>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <p className="text-sm text-text-light dark:text-darkmode-text-light text-center sm:text-right">
                {enabledCount} von {activeCount} ausgewählt
              </p>
              <Button onClick={onNext} size="lg" disabled={enabledCount === 0}>
                Weiter zur Konfiguration
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
