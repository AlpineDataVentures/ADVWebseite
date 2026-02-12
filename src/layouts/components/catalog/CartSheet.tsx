import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useConfigStore } from "../stores/configStore";
import { formatPrice } from "../lib/pricing";
import { ShoppingCart, Trash2, ChevronDown, Copy, Check } from "lucide-react";
import { useState } from "react";
import { getParameterByKey } from "../data/parameters";
import { getDeliverableIcon } from "../lib/iconMap";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoToConfig?: () => void;
}

/**
 * Cart Sheet - Drawer mit Warenkorb-Inhalt
 */
export function CartSheet({ open, onOpenChange, onGoToConfig }: CartSheetProps) {
  const cartWithPrices = useConfigStore((state) => state.getCartWithPrices());
  const totalPrice = useConfigStore((state) => state.getTotalPrice());
  const toggleDeliverable = useConfigStore((state) => state.toggleDeliverable);
  const [copied, setCopied] = useState(false);

  const handleRemove = (deliverableId: string) => {
    toggleDeliverable(deliverableId, false);
  };

  const handleCopyConfiguration = () => {
    const config = useConfigStore.getState();
    const configJson = JSON.stringify({
      selectedUseCases: config.selectedUseCases,
      selectedDeliverables: config.selectedDeliverables,
      totalPrice: totalPrice
    }, null, 2);

    navigator.clipboard.writeText(configJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Get selected params as tags (2-4 key params)
  const getSelectedParamsTags = (params: Record<string, any>) => {
    const tags: Array<{ key: string; label: string; value: string }> = [];
    const keyParams = ['companySize', 'speed', 'dataSources', 'deployment', 'reportComplexity'];

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

    return tags.slice(0, 4); // Max 4 tags
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-96 p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SheetTitle>Warenkorb</SheetTitle>
              {cartWithPrices.length > 0 && (
                <Badge variant="default" className="text-xs">
                  {cartWithPrices.length} {cartWithPrices.length === 1 ? 'Position' : 'Positionen'}
                </Badge>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartWithPrices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-text-light dark:text-darkmode-text-light mb-4" />
              <p className="text-sm font-medium text-text dark:text-darkmode-text mb-2">
                Warenkorb ist leer
              </p>
              <p className="text-xs text-text-light dark:text-darkmode-text-light">
                Wählen Sie einen Use Case aus, um mit der Konfiguration zu beginnen.
              </p>
            </div>
          ) : (
            <Accordion type="multiple" className="space-y-2">
              {cartWithPrices.map((item) => {
                if (!item.deliverable) return null;

                const selectedParamsTags = getSelectedParamsTags(item.parameters || {});
                const Icon = getDeliverableIcon(item.deliverableId);

                return (
                  <AccordionItem key={item.deliverableId} value={item.deliverableId} className="border-0">
                    <div className="card p-3 space-y-2">
                      {/* Item Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <Icon className="h-4 w-4 text-text dark:text-darkmode-text mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-text dark:text-darkmode-text truncate">
                              {item.deliverable.name}
                            </h4>
                            <p className="text-xs font-semibold text-green-500 mt-0.5">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0"
                          onClick={() => handleRemove(item.deliverableId)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-text-light dark:text-darkmode-text-light" />
                        </Button>
                      </div>

                      {/* Expand Caret */}
                      <AccordionTrigger className="py-1 text-xs hover:no-underline">
                        <span className="flex items-center gap-1">
                          Details
                          <ChevronDown className="h-3 w-3" />
                        </span>
                      </AccordionTrigger>

                      {/* Accordion Content: Mini Breakdown + Selected Params */}
                      <AccordionContent className="pt-2 space-y-3">
                        {/* Selected Params Tags */}
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

                        {/* Mini Breakdown */}
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
                            <span>{formatPrice(item.breakdown.total)}</span>
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

        {/* Footer - Fixed */}
        {cartWithPrices.length > 0 && (
          <div className="flex-shrink-0 pt-4 border-t border-border bg-green-500/5 px-6 pb-6 space-y-3">
            {/* Gesamtsumme */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text dark:text-darkmode-text">Gesamtsumme</span>
              <span className="font-bold text-xl text-green-500">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2">
              {onGoToConfig && (
                <Button
                  onClick={() => {
                    onGoToConfig();
                    onOpenChange(false);
                  }}
                  className="w-full btn-primary"
                  size="lg"
                >
                  Zur Konfiguration
                </Button>
              )}
              <Button
                variant="outline"
                onClick={handleCopyConfiguration}
                className="w-full"
                size="sm"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Kopiert!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Konfiguration kopieren
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
