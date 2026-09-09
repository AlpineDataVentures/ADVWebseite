import { useMemo, useState, type ReactNode } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { CheckCircle2, XCircle, Download, Loader2, Mail, CalendarClock } from "lucide-react";
import {
  useConfigStore,
  getCartWithPricesFromSelectedDeliverables,
  getTotalPriceFromSelectedDeliverables,
} from "../stores/configStore";
import { formatPrice, formatPriceLabel } from "../lib/pricing";
import { getDeliverableIcon } from "../lib/iconMap";
import { getProductById } from "../data/useCases";
import { getProductDetailViewModel } from "../data/productDetailMeta";
import { getParametersForDeliverable } from "../data/parameters";
import type { DeliverableParameters } from "../data/models";
import type { ProjectSheetPdfData } from "./lib/projectSheetPdf";
import { trackCatalogEvent } from "./lib/analytics";
import { CatalogFlowSteps } from "./CatalogFlowSteps";
import {
  buildInquiryPayloadFromCart,
  buildInquirySubject,
  buildInquiryText,
  buildMailtoLink,
} from "../lib/inquiry";
import { buildCalendlyBookingUrl } from "../lib/calendlyBooking";
import {
  PRODUCT_CATALOG_INQUIRY_EMAIL,
  PRODUCT_CATALOG_ORDER_MEETING_TITLE,
  PRODUCT_CATALOG_ORDER_MEETING_URL,
} from "@/config/products";

interface ProjectSheetProps {
  productId: string | null;
  onBack: () => void;
}

/**
 * Vierter Schritt der Journey: das Projekt-Sheet – Kostenübersicht, Details
 * zu Produkt und Bausteinen (inkl. Lieferumfang/Nicht enthalten) sowie die
 * drei Wege, wie es weitergeht. Die Checkout-Aktionen stehen bewusst am
 * Anfang UND am Ende der Seite.
 */
export function ProjectSheet({ productId, onBack }: ProjectSheetProps) {
  const selectedDeliverables = useConfigStore((state) => state.selectedDeliverables);
  const product = productId ? getProductById(productId) : null;
  const productDetails = product ? getProductDetailViewModel(product) : null;

  const cartWithPrices = useMemo(
    () => getCartWithPricesFromSelectedDeliverables(selectedDeliverables),
    [selectedDeliverables]
  );
  const totalPrice = useMemo(
    () => getTotalPriceFromSelectedDeliverables(selectedDeliverables),
    [selectedDeliverables]
  );

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const getSourceProductTitle = (deliverableId: string) => {
    const sourceProductId = selectedDeliverables[deliverableId]?.sourceProductId;
    if (!sourceProductId) return null;
    return getProductById(sourceProductId)?.title ?? sourceProductId;
  };

  const getSelectedParamSummary = (
    deliverableId: string,
    parameterKeys: string[] | undefined,
    params: DeliverableParameters
  ) => {
    return getParametersForDeliverable(deliverableId, parameterKeys).map((param) => {
      const rawValue = params[param.key] ?? param.default;
      const option = param.options?.find((opt) => opt.value === String(rawValue));
      return { key: param.key, label: param.label, value: option?.label ?? String(rawValue) };
    });
  };

  const sanitizeInquiryParameters = (parameters: Record<string, string | number | undefined>) => {
    return Object.fromEntries(
      Object.entries(parameters).filter(([, value]) => value !== undefined)
    ) as Record<string, string | number>;
  };

  const inquiryPayload = useMemo(() => {
    return buildInquiryPayloadFromCart({
      items: cartWithPrices
        .filter((item) => Boolean(item.deliverable))
        .map((item) => ({
          deliverableId: item.deliverableId,
          deliverableName: item.deliverable?.name ?? item.deliverableId,
          price: item.price,
          pricePeriod: item.deliverable?.pricePeriod,
          parameters: sanitizeInquiryParameters(item.parameters ?? {}),
          sourceProductId: item.sourceProductId ?? selectedDeliverables[item.deliverableId]?.sourceProductId ?? null,
        })),
      estimatedTotalPrice: totalPrice > 0 ? totalPrice : undefined,
    });
  }, [cartWithPrices, totalPrice, selectedDeliverables]);

  const inquirySubject = useMemo(
    () => buildInquirySubject(inquiryPayload.productTitle),
    [inquiryPayload.productTitle]
  );
  const inquiryText = useMemo(() => buildInquiryText(inquiryPayload), [inquiryPayload]);
  const calendlyBooking = useMemo(
    () => buildCalendlyBookingUrl(PRODUCT_CATALOG_ORDER_MEETING_URL, inquiryPayload),
    [inquiryPayload]
  );

  const handleSendInquiryEmail = () => {
    const mailtoHref = buildMailtoLink(PRODUCT_CATALOG_INQUIRY_EMAIL, inquirySubject, inquiryText);
    window.location.href = mailtoHref;
    trackCatalogEvent({
      event: "checkout_action",
      properties: { productId: productId ?? "unbekannt", method: "email_inquiry" },
    });
  };

  const handleOpenCalendlyBooking = () => {
    window.open(calendlyBooking.url, "_blank", "noopener,noreferrer");
    trackCatalogEvent({
      event: "checkout_action",
      properties: { productId: productId ?? "unbekannt", method: "calendly_booking" },
    });
  };

  const handleDownloadPdf = async () => {
    setPdfError(null);
    setIsGeneratingPdf(true);
    try {
      const { generateProjectSheetPdfBlob } = await import("./lib/projectSheetPdf");

      const pdfData: ProjectSheetPdfData = {
        product:
          product && productDetails
            ? {
                title: product.title,
                short: product.short,
                problem: productDetails.problem,
                typicalResult: productDetails.typicalResult,
              }
            : null,
        items: cartWithPrices
          .filter((item): item is typeof item & { deliverable: NonNullable<typeof item.deliverable> } =>
            Boolean(item.deliverable)
          )
          .map((item) => ({
            name: item.deliverable.name,
            family: item.deliverable.family,
            priceLabel: formatPriceLabel(item.price, item.deliverable.pricePeriod),
            shortDescription: item.deliverable.shortDescription,
            paramSummary: getSelectedParamSummary(item.deliverableId, item.deliverable.parameters, item.parameters ?? {}),
            deliverablesOutput: item.deliverable.deliverablesOutput,
            assumptions: item.deliverable.assumptions,
            outOfScope: item.deliverable.outOfScope,
          })),
        totalPriceLabel: formatPrice(totalPrice),
      };

      const blob = await generateProjectSheetPdfBlob(pdfData);
      const url = URL.createObjectURL(blob);
      const safeTitle = (product?.title ?? "ADV").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
      const link = document.createElement("a");
      link.href = url;
      link.download = `Projekt-Sheet-${safeTitle || "ADV"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      trackCatalogEvent({
        event: "checkout_action",
        properties: { productId: productId ?? "unbekannt", method: "pdf_download" },
      });
    } catch (error) {
      console.error("PDF-Erstellung fehlgeschlagen", error);
      setPdfError("Das PDF konnte nicht erstellt werden. Bitte versuchen Sie es erneut.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (cartWithPrices.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-text-light dark:text-darkmode-text-light mb-2">Keine Produktbausteine ausgewählt</p>
        <Button variant="outline" onClick={onBack} size="lg">
          ← Zurück zur Konfiguration
        </Button>
      </div>
    );
  }

  const renderCheckoutActions = (): ReactNode => (
    <div className="space-y-3">
      <p className="text-sm text-text-light dark:text-darkmode-text-light text-center sm:text-left">
        Wie möchten Sie fortfahren?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
        >
          {isGeneratingPdf ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {isGeneratingPdf ? "PDF wird erstellt…" : "PDF mit Projekt-Sheet herunterladen"}
        </Button>
        <Button variant="default" size="lg" className="w-full" onClick={handleSendInquiryEmail}>
          <Mail className="h-4 w-4 mr-2" />
          Rückfrage an ADV stellen
        </Button>
        <Button
          variant="order"
          size="lg"
          className="w-full"
          onClick={handleOpenCalendlyBooking}
          title={PRODUCT_CATALOG_ORDER_MEETING_TITLE}
        >
          <CalendarClock className="h-4 w-4 mr-2" />
          Besprechung zum Projekt vereinbaren
        </Button>
      </div>
      {calendlyBooking.truncated && (
        <p className="text-xs text-text-light dark:text-darkmode-text-light leading-relaxed">
          Die wichtigsten Angaben werden an die Terminbuchung übergeben. Die vollständige
          Konfiguration wird zusätzlich in Ihrer Anfrage berücksichtigt.
        </p>
      )}
      {pdfError && (
        <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed">{pdfError}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <CatalogFlowSteps current="inquiry" />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text dark:text-darkmode-text mb-1.5">Projekt-Sheet</h2>
          <p className="text-sm text-text-light dark:text-darkmode-text-light max-w-xl">
            Zusammenfassung Ihrer Auswahl – als Grundlage für Ihre Anfrage oder ein persönliches Gespräch.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onBack} className="shrink-0 whitespace-nowrap">
          ← Zurück zur Konfiguration
        </Button>
      </div>

      {renderCheckoutActions()}

      <div className="card p-5 md:p-6 space-y-4">
        <h3 className="text-lg font-semibold text-text dark:text-darkmode-text">Übersicht der Kosten</h3>
        <ul className="divide-y divide-border">
          {cartWithPrices.map((item) => {
            if (!item.deliverable) return null;
            const Icon = getDeliverableIcon(item.deliverableId);
            const sourceProductTitle = getSourceProductTitle(item.deliverableId);

            return (
              <li key={item.deliverableId} className="flex items-start justify-between gap-3 py-3">
                <div className="flex items-start gap-2 min-w-0">
                  <Icon className="h-4 w-4 text-text dark:text-darkmode-text mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text dark:text-darkmode-text truncate">
                      {item.deliverable.name}
                    </p>
                    {sourceProductTitle && (
                      <p className="text-xs text-text-light dark:text-darkmode-text-light truncate">
                        Produkt: {sourceProductTitle}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-sm font-semibold text-text dark:text-darkmode-text whitespace-nowrap">
                  {formatPriceLabel(item.price, item.deliverable.pricePeriod)}
                </span>
              </li>
            );
          })}
        </ul>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-text dark:text-darkmode-text">
            Geschätzte Gesamtsumme
          </span>
          <span className="font-bold text-xl text-green-600 dark:text-green-400">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <p className="text-xs text-text-light dark:text-darkmode-text-light leading-relaxed">
          Diese Summe ist eine Schätzung Ihres Fixpreises – final abgestimmt wird er im persönlichen
          Gespräch mit uns.
        </p>
      </div>

      {product && productDetails && (
        <div className="card p-5 md:p-6 space-y-3">
          <h3 className="text-lg font-semibold text-text dark:text-darkmode-text">Projekt</h3>
          <p className="text-base font-medium text-text dark:text-darkmode-text">{product.title}</p>
          <p className="text-sm text-text-light dark:text-darkmode-text-light leading-relaxed">
            {product.short}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/60">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-text-light dark:text-darkmode-text-light">
                Problem
              </p>
              <p className="text-sm text-text dark:text-darkmode-text leading-snug">{productDetails.problem}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-text-light dark:text-darkmode-text-light">
                Ergebnis
              </p>
              <p className="text-sm text-text dark:text-darkmode-text leading-snug">
                {productDetails.typicalResult}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text dark:text-darkmode-text">Details zu den Produktbausteinen</h3>
        {cartWithPrices.map((item) => {
          if (!item.deliverable) return null;
          const Icon = getDeliverableIcon(item.deliverableId);
          const paramSummary = getSelectedParamSummary(
            item.deliverableId,
            item.deliverable.parameters,
            item.parameters ?? {}
          );

          return (
            <div key={item.deliverableId} className="card p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-green-600/90 dark:text-green-400/90 shrink-0" />
                <h4 className="font-semibold text-text dark:text-darkmode-text">{item.deliverable.name}</h4>
              </div>

              <p className="text-sm text-text-light dark:text-darkmode-text-light leading-relaxed">
                {item.deliverable.shortDescription}
              </p>

              {paramSummary.length > 0 && (
                <div>
                  <h5 className="text-xs font-semibold text-text dark:text-darkmode-text mb-2 uppercase">
                    Ausgewählte Konfiguration
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {paramSummary.map((param) => (
                      <Badge key={param.key} variant="outline" className="text-xs">
                        {param.label}: {param.value}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {item.deliverable.deliverablesOutput.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-text dark:text-darkmode-text mb-2 uppercase">
                      Lieferumfang
                    </h5>
                    <ul className="space-y-1">
                      {item.deliverable.deliverablesOutput.map((output, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-text-light dark:text-darkmode-text-light">
                          <CheckCircle2 className="h-3 w-3 text-green-600/80 dark:text-green-400/80 mt-0.5 shrink-0" />
                          <span>{output}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.deliverable.assumptions.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-text dark:text-darkmode-text mb-2 uppercase">
                      Voraussetzungen
                    </h5>
                    <ul className="space-y-1">
                      {item.deliverable.assumptions.map((assumption, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-text-light dark:text-darkmode-text-light">
                          <CheckCircle2 className="h-3 w-3 text-green-600/80 dark:text-green-400/80 mt-0.5 shrink-0" />
                          <span>{assumption}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.deliverable.outOfScope.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-text dark:text-darkmode-text mb-2 uppercase">
                      Nicht enthalten
                    </h5>
                    <ul className="space-y-1">
                      {item.deliverable.outOfScope.map((scopeItem, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-text-light dark:text-darkmode-text-light">
                          <XCircle className="h-3 w-3 text-red-500 mt-0.5 shrink-0" />
                          <span>{scopeItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Separator />

      {renderCheckoutActions()}
    </div>
  );
}
