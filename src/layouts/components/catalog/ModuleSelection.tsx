import { Button } from "./ui/button";
import { Mail, Layers, ArrowRight } from "lucide-react";
import { useConfigStore } from "../stores/configStore";
import { getProductById } from "../data/useCases";
import { getDeliverableById } from "../data/deliverables";
import { getBundleForProduct } from "../data/recommendations";
import { getRequestMode, getHybridInquiryCopy } from "../data/requestModes";
import { DeliverableCard } from "./DeliverableCard";
import { CustomRequestForm } from "./CustomRequestForm";
import { CatalogFlowSteps } from "./CatalogFlowSteps";
import { Separator } from "./ui/separator";

interface ModuleSelectionProps {
  productId: string | null;
  onNext: () => void;
  onBack: () => void;
}

/**
 * Zweiter Schritt der Journey: nur die Bausteine, als flache Liste ohne
 * Kern-/Optional-Trennung, ohne Preis und ohne "Konfigurieren"-Button –
 * hier wird nur ausgewählt, konfiguriert wird im nächsten Schritt. Immer als
 * Kacheln dargestellt (keine Listen-/Kachel-Umschaltung).
 */
export function ModuleSelection({ productId, onNext, onBack }: ModuleSelectionProps) {
  const product = productId ? getProductById(productId) : null;
  const selectedDeliverables = useConfigStore((state) => state.selectedDeliverables);
  const toggleDeliverable = useConfigStore((state) => state.toggleDeliverable);
  const setBundleFromProduct = useConfigStore((state) => state.setBundleFromProduct);

  if (!product) {
    return null;
  }

  const mode = getRequestMode(product.id);
  const hybridInquiryCopy = getHybridInquiryCopy(product.id);
  const recommendations = getBundleForProduct(product.id);

  const items = recommendations
    .map((recommendation) => {
      const deliverable = getDeliverableById(recommendation.deliverableId);
      if (!deliverable?.active) return null;
      return { recommendation, deliverable };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const enabledCount = items.filter(
    ({ deliverable }) => selectedDeliverables[deliverable.key]?.enabled || false
  ).length;

  const handleToggle = (deliverableId: string, enabled: boolean) => {
    toggleDeliverable(deliverableId, enabled);
  };

  const handleResetBundle = () => {
    setBundleFromProduct(product.id, { force: true, resetSelection: true });
  };

  return (
    <div className="space-y-7">
      <CatalogFlowSteps current="modules" />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-text-light dark:text-darkmode-text-light">
            Produktbausteine für
          </p>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-text dark:text-darkmode-text truncate">
            {product.title}
          </h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onBack} className="shrink-0">
          ← Zurück
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-2 md:gap-2.5">
        {items.map(({ recommendation, deliverable }) => (
          <DeliverableCard
            key={deliverable.key}
            deliverable={deliverable}
            recommendation={recommendation}
            isEnabled={selectedDeliverables[deliverable.key]?.enabled || false}
            onToggle={(enabled) => handleToggle(deliverable.key, enabled)}
            layout="grid"
            simple
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
        <p className="text-sm text-text-light dark:text-darkmode-text-light text-center sm:text-right">
          {enabledCount} von {items.length} ausgewählt
        </p>
        <Button variant="outline" onClick={handleResetBundle} size="lg">
          Auswahl zurücksetzen
        </Button>
      </div>

      <Separator />

      <div className="rounded-xl border border-green-600/30 dark:border-green-400/25 bg-green-500/8 dark:bg-green-500/10 shadow-sm px-5 py-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 dark:bg-green-500 text-white shrink-0">
            <Layers className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
              Nächster Schritt
            </p>
            <h3 className="text-base md:text-lg font-semibold text-text dark:text-darkmode-text">
              Bausteine konfigurieren
            </h3>
            <p className="text-sm text-text-light dark:text-darkmode-text-light leading-relaxed">
              Im nächsten Schritt konfigurieren Sie einzelne Bausteine, damit wir besser die Fixkosten
              abschätzen können.
            </p>
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <Button
            onClick={onNext}
            size="lg"
            disabled={enabledCount === 0}
            className="gap-2 h-12 px-8 text-base font-bold min-w-72 justify-center"
          >
            Bausteine konfigurieren
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {mode === "hybrid" && (
        <section className="pt-2">
          <div className="rounded-xl border border-border bg-light dark:bg-darkmode-light px-4 py-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Mail className="h-4 w-4 text-text-light dark:text-darkmode-text-light shrink-0" />
              <h4 className="text-sm font-semibold text-text dark:text-darkmode-text">
                Individuelle Anfrage möglich
              </h4>
            </div>
            <p className="text-sm text-text-light dark:text-darkmode-text-light leading-relaxed">
              {hybridInquiryCopy?.hintText ??
                "Die Bausteine oben sind unser Standardangebot. Wenn Ihr Bedarf darüber hinausgeht, beschreiben Sie ihn – wir erstellen ein passendes Angebot."}
            </p>
            <CustomRequestForm
              productTitle={product.title}
              productId={product.id}
              isAddon
              embedded
              variant="outline"
              submitButtonLabel={hybridInquiryCopy?.submitButtonLabel}
            />
          </div>
        </section>
      )}
    </div>
  );
}
