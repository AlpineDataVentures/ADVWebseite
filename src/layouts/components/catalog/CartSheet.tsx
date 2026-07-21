import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useConfigStore } from "../stores/configStore";
import { getCartWithPricesFromSelectedDeliverables, getTotalPriceFromSelectedDeliverables } from "../stores/configStore";
import { formatPrice, formatPriceLabel } from "../lib/pricing";
import { ShoppingCart, Trash2, ChevronDown } from "lucide-react";
import { useMemo } from "react";
import { getParameterByKey } from "../data/parameters";
import { getDeliverableIcon } from "../lib/iconMap";
import { getProductById } from "../data/useCases";
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

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoToConfig?: () => void;
}

/**
 * Cart Sheet - Drawer mit Warenkorb-Inhalt
 */
export function CartSheet({ open, onOpenChange, onGoToConfig }: CartSheetProps) {
  const selectedDeliverables = useConfigStore((state) => state.selectedDeliverables);
  const toggleDeliverable = useConfigStore((state) => state.toggleDeliverable);
  const cartWithPrices = useMemo(
    () => getCartWithPricesFromSelectedDeliverables(selectedDeliverables),
    [selectedDeliverables]
  );
  const totalPrice = useMemo(
    () => getTotalPriceFromSelectedDeliverables(selectedDeliverables),
    [selectedDeliverables]
  );

  const hasCartItems = cartWithPrices.length > 0;

  const getSourceProductTitle = (deliverableId: string) => {
    const productId = selectedDeliverables[deliverableId]?.sourceProductId;
    if (!productId) return null;
    return getProductById(productId)?.title ?? productId;
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

  const inquirySubject = useMemo(() => {
    return buildInquirySubject(inquiryPayload.productTitle);
  }, [inquiryPayload.productTitle]);

  const inquiryText = useMemo(() => buildInquiryText(inquiryPayload), [inquiryPayload]);

  const calendlyBooking = useMemo(
    () => buildCalendlyBookingUrl(PRODUCT_CATALOG_ORDER_MEETING_URL, inquiryPayload),
    [inquiryPayload]
  );

  const handleSendInquiryEmail = () => {
    const mailtoHref = buildMailtoLink(PRODUCT_CATALOG_INQUIRY_EMAIL, inquirySubject, inquiryText);
    window.location.href = mailtoHref;
  };

  const handleOpenCalendlyBooking = () => {
    window.open(calendlyBooking.url, "_blank", "noopener,noreferrer");
  };

  const handleRemove = (deliverableId: string) => {
    toggleDeliverable(deliverableId, false);
  };

  const getSelectedParamsTags = (params: Record<string, any>) => {
    const tags: Array<{ key: string; label: string; value: string }> = [];
    const keyParams = ['companySize', 'speed', 'reportCount', 'sourceSystemCount', 'strategyHorizonMonths', 'deployment', 'reportComplexity'];

    keyParams.forEach(key => {
      if (params[key] !== undefined) {
        const param = getParameterByKey(key);
        if (param) {
          const option = param.options?.find(opt => opt.value === String(params[key]));
          if (option) {
            tags.push({ key, label: param.label, value: option.label });
          }
        }
      }
    });

    return tags.slice(0, 4);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-105 p-0 flex flex-col bg-body dark:bg-darkmode-body">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border dark:border-darkmode-border bg-light dark:bg-darkmode-light">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SheetTitle className="text-text dark:text-darkmode-text">Warenkorb</SheetTitle>
              {cartWithPrices.length > 0 && (
                <Badge variant="default" className="text-xs">
                  {cartWithPrices.length} {cartWithPrices.length === 1 ? 'Position' : 'Positionen'}
                </Badge>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartWithPrices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-text-light dark:text-darkmode-text-light mb-4" />
              <p className="text-sm font-medium text-text dark:text-darkmode-text mb-2">
                Warenkorb ist leer
              </p>
              <p className="text-xs text-text-light dark:text-darkmode-text-light">
                Wählen Sie ein Produkt aus, um mit der Konfiguration zu beginnen – oder buchen Sie
                unten direkt einen Beratungstermin für eine individuelle Anfrage.
              </p>
            </div>
          ) : (
            <Accordion type="multiple" className="space-y-3">
              {cartWithPrices.map((item) => {
                if (!item.deliverable) return null;

                const selectedParamsTags = getSelectedParamsTags(item.parameters || {});
                const Icon = getDeliverableIcon(item.deliverableId);
                const sourceProductTitle = getSourceProductTitle(item.deliverableId);

                return (
                  <AccordionItem key={item.deliverableId} value={item.deliverableId} className="border-0">
                    <div className="rounded-xl p-4 space-y-2 bg-light dark:bg-darkmode-light border border-border dark:border-darkmode-border">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <Icon className="h-4 w-4 text-text dark:text-darkmode-text mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-text dark:text-darkmode-text truncate">
                              {item.deliverable.name}
                            </h4>
                            {sourceProductTitle && (
                              <p className="text-xs text-text-light dark:text-darkmode-text-light mt-0.5 truncate">
                                Produkt: {sourceProductTitle}
                              </p>
                            )}
                            <p className="text-xs font-semibold text-text dark:text-darkmode-text mt-0.5">
                              {formatPriceLabel(item.price, item.deliverable.pricePeriod)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0"
                          onClick={() => handleRemove(item.deliverableId)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-text dark:text-darkmode-text" />
                        </Button>
                      </div>

                      <AccordionTrigger className="py-1 text-xs hover:no-underline">
                        <span className="flex items-center gap-1">
                          Details
                          <ChevronDown className="h-3 w-3 text-text-light dark:text-darkmode-text-light" />
                        </span>
                      </AccordionTrigger>

                      <AccordionContent className="pt-2 space-y-3">
                        {selectedParamsTags.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-text-light dark:text-darkmode-text-light mb-1.5">
                              Ausgewählte Parameter:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedParamsTags.map((tag) => (
                                <Badge key={tag.key} variant="outline" className="text-xs px-1.5 py-0">
                                  {tag.label}: {tag.value}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-1.5 text-xs border-t border-border pt-2">
                          <div className="flex justify-between">
                            <span className="text-text-light dark:text-darkmode-text-light">Basispreis</span>
                            <span className="font-medium">{formatPrice(item.breakdown.base)}</span>
                          </div>

                          {item.breakdown.multipliers.length > 0 && (
                            <>
                              {item.breakdown.multipliers.map((mult, idx) => (
                                <div key={idx} className="flex justify-between">
                                  <span className="text-text-light dark:text-darkmode-text-light">
                                    {mult.label} (×{mult.factor.toFixed(2)})
                                  </span>
                                  <span className="font-medium">
                                    {mult.amountImpact >= 0 ? '+' : ''}{formatPrice(mult.amountImpact)}
                                  </span>
                                </div>
                              ))}
                            </>
                          )}

                          {item.breakdown.addons.length > 0 && (
                            <>
                              {item.breakdown.addons.map((addon, idx) => (
                                <div key={idx} className="flex justify-between">
                                  <span className="text-text-light dark:text-darkmode-text-light">{addon.label}</span>
                                  <span className="font-medium">+{formatPrice(addon.amount)}</span>
                                </div>
                              ))}
                            </>
                          )}

                          <Separator className="my-1.5" />
                          <div className="flex justify-between font-semibold">
                            <span>Gesamt</span>
                            <span>{formatPriceLabel(item.breakdown.total, item.deliverable.pricePeriod)}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>

        <div className="shrink-0 pt-4 border-t border-border dark:border-darkmode-border bg-light dark:bg-darkmode-light px-5 pb-6 space-y-3">
          {hasCartItems && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text dark:text-darkmode-text">Gesamtsumme</span>
              <span className="font-bold text-xl text-green-600 dark:text-green-400">
                {formatPrice(totalPrice)}
              </span>
            </div>
          )}
          <div className="space-y-3">
            {hasCartItems && onGoToConfig && (
              <Button
                variant="outline"
                onClick={() => {
                  onGoToConfig();
                  onOpenChange(false);
                }}
                className="w-full"
                size="lg"
              >
                Konfiguration prüfen oder bearbeiten
              </Button>
            )}
            <p className="text-xs sm:text-sm text-text-light dark:text-darkmode-text-light leading-relaxed text-balance">
              {hasCartItems
                ? "Vielen Dank für Ihr Interesse. Prüfen Sie bei Bedarf Ihre Konfiguration und senden Sie die Anfrage per E-Mail oder buchen Sie direkt einen Termin."
                : "Noch keine Bausteine ausgewählt? Sie können trotzdem einen Termin für eine individuelle Beratung oder Anfrage vereinbaren."}
            </p>
            {calendlyBooking.truncated && hasCartItems && (
              <p className="text-xs text-text-light dark:text-darkmode-text-light leading-relaxed">
                Die wichtigsten Angaben werden an die Terminbuchung übergeben. Die vollständige
                Konfiguration wird zusätzlich in Ihrer Anfrage berücksichtigt.
              </p>
            )}
            {hasCartItems && (
              <Button
                variant="default"
                onClick={handleSendInquiryEmail}
                className="w-full min-h-[44px]"
                size="lg"
              >
                Anfrage per E-Mail senden
              </Button>
            )}
            <Button
              variant="order"
              className="w-full min-h-[44px]"
              size="lg"
              onClick={handleOpenCalendlyBooking}
              title={PRODUCT_CATALOG_ORDER_MEETING_TITLE}
            >
              Besprechung zur Bestellung vereinbaren
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
