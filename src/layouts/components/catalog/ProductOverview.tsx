import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle2, Layers } from "lucide-react";
import { getProductById } from "../data/useCases";
import { getRequestMode } from "../data/requestModes";
import { getProductDetailViewModel } from "../data/productDetailMeta";
import { CustomRequestForm } from "./CustomRequestForm";
import { CatalogFlowSteps } from "./CatalogFlowSteps";
import { getBundleForProduct } from "../data/recommendations";

interface ProductOverviewProps {
  productId: string | null;
  onNext: () => void;
  onBack: () => void;
}

/**
 * Erster Schritt der Journey: nur das ausgewählte Produkt, vollständig
 * ausgeklappt (keine Accordions). Führt anschließend zur Bausteinauswahl
 * oder – bei individuell zu planenden Produkten – direkt zur Anfrage.
 */
export function ProductOverview({ productId, onNext, onBack }: ProductOverviewProps) {
  const product = productId ? getProductById(productId) : null;

  if (!product) {
    return null;
  }

  const mode = getRequestMode(product.id);
  const recommendations = getBundleForProduct(product.id);
  const details = getProductDetailViewModel(product);
  const hasModules = mode !== "custom" && recommendations.length > 0;

  const modeBadgeLabel =
    mode === "custom" ? "Individuelle Anfrage" : mode === "hybrid" ? "Hybrid" : "Standardpaket";

  return (
    <div className="space-y-7">
      <CatalogFlowSteps current="browse" />

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
            <p className="text-sm text-text-light dark:text-darkmode-text-light leading-snug max-w-3xl">
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
            <p className="text-xs text-text dark:text-darkmode-text leading-snug">{details.problem}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-light dark:text-darkmode-text-light">
              Ergebnis
            </p>
            <p className="text-xs text-text dark:text-darkmode-text leading-snug">{details.typicalResult}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-light dark:text-darkmode-text-light">
              Für wen
            </p>
            <p className="text-xs text-text dark:text-darkmode-text leading-snug">
              {details.bestFor.join(" · ")}
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

        <div className="pt-3 border-t border-border/60 space-y-3">
          <p className="text-xs font-semibold text-text-light dark:text-darkmode-text-light">
            Projektablauf & Rahmen
          </p>
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
                    Standard-Bausteine nicht passen – Sie können im nächsten Schritt zusätzlich eine
                    individuelle Anfrage stellen.
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
        </div>
      </div>

      {hasModules ? (
        <div className="rounded-xl border border-green-600/25 dark:border-green-400/20 bg-green-500/6 dark:bg-green-500/10 px-5 py-5 space-y-4">
          <div className="flex items-start gap-3">
            <Layers className="h-5 w-5 text-green-700 dark:text-green-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-text dark:text-darkmode-text">
                Nächster Schritt: Produktbausteine wählen
              </h3>
              <p className="text-sm text-text-light dark:text-darkmode-text-light leading-relaxed">
                Bausteine sind die einzelnen Projektphasen, die für die Umsetzung dieses Produkts nötig sind. Sie
                wählen frei, welche Sie brauchen – zum Beispiel, wenn Sie einzelne Schritte bereits selbst
                erledigt haben.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={onNext} size="lg">
              Bausteine wählen
            </Button>
          </div>
        </div>
      ) : (
        <CustomRequestForm productTitle={product.title} productId={product.id} prominent />
      )}
    </div>
  );
}
