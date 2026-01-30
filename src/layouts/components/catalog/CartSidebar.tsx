import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useConfigStore } from "../stores/configStore";
import { formatPrice } from "../lib/pricing";
import { ShoppingCart, Trash2, X, ChevronDown, Copy, Check } from "lucide-react";
import { useState } from "react";
import { getParameterByKey } from "../data/parameters";
import { cn } from "../lib/utils";
import { getDeliverableIcon } from "../lib/iconMap";

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout?: () => void;
  variant?: 'desktop' | 'mobile';
}

/**
 * Cart Sidebar - Desktop: Sticky Panel, Mobile: Sheet
 * Zeigt aktivierte Deliverables mit Preis, Breakdown und Parametern
 */
export function CartSidebar({ open, onOpenChange, onCheckout, variant = 'mobile' }: CartSidebarProps) {
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

  // Desktop Panel Content
  const CartContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 pb-4 border-b border-[hsl(var(--border))]">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-base text-[hsl(var(--text))]">
            Warenkorb
          </h3>
          {cartWithPrices.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {cartWithPrices.length}
            </Badge>
          )}
        </div>
      </div>

      {/* Items - Scrollable */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {cartWithPrices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="h-12 w-12 text-[hsl(var(--muted))] mb-4" />
            <p className="text-sm font-medium text-[hsl(var(--text))] mb-2">
              Warenkorb ist leer
            </p>
            <p className="text-xs text-[hsl(var(--muted))] mb-4">
              Wählen Sie einen Use Case aus, um mit der Konfiguration zu beginnen.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onOpenChange(false);
                // Navigate to use cases - this would need to be handled by parent
              }}
            >
              Use Case auswählen
            </Button>
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
                        <Icon className="h-4 w-4 text-[hsl(var(--accent))] mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-[hsl(var(--text))] truncate">
                            {item.deliverable.name}
                          </h4>
                          <p className="text-xs font-semibold text-[hsl(var(--accent))] mt-0.5">
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
                        <Trash2 className="h-3.5 w-3.5 text-[hsl(var(--muted))]" />
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
                          <p className="text-xs font-medium text-[hsl(var(--muted))] mb-1.5">
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
                      <div className="space-y-1.5 text-xs border-t border-[hsl(var(--border))] pt-2">
                        <div className="flex justify-between">
                          <span className="text-[hsl(var(--muted))]">Basispreis</span>
                          <span className="font-medium">{formatPrice(item.breakdown.base)}</span>
                        </div>

                        {item.breakdown.multipliers.length > 0 && (
                          <>
                            {item.breakdown.multipliers.map((mult, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span className="text-[hsl(var(--muted))]">
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
                                <span className="text-[hsl(var(--muted))]">{addon.label}</span>
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
        <div className="flex-shrink-0 pt-4 border-t border-[hsl(var(--border))] space-y-3">
          {/* Gesamtsumme */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[hsl(var(--text))]">Gesamtsumme</span>
            <span className="font-bold text-xl text-[hsl(var(--accent))]">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2">
            {onCheckout && (
              <Button
                onClick={onCheckout}
                className="w-full btn-primary"
                size="lg"
              >
                Zur Zusammenfassung
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
    </div>
  );

  // Desktop: Sticky Panel
  if (variant === 'desktop') {
    return (
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-6">
          <div className="card p-4 h-[calc(100vh-8rem)] flex flex-col">
            <CartContent />
          </div>
        </div>
      </aside>
    );
  }

  // Mobile: Sheet
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:w-96 p-0 flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-[hsl(var(--border))]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SheetTitle>Warenkorb</SheetTitle>
                {cartWithPrices.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {cartWithPrices.length}
                  </Badge>
                )}
              </div>
              <SheetClose onClose={() => onOpenChange(false)} />
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <CartContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

/**
 * Floating Cart Button für Mobile
 */
export function CartFloatingButton({ onClick }: { onClick: () => void }) {
  const cartWithPrices = useConfigStore((state) => state.getCartWithPrices());
  const cartCount = cartWithPrices.length;
  const getTotalPrice = useConfigStore((state) => state.getTotalPrice());

  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[hsl(var(--accent))] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      aria-label="Warenkorb öffnen"
    >
      <ShoppingCart className="h-6 w-6" />
      {cartCount > 0 && (
        <>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
          <div className="absolute -bottom-12 right-0 bg-[hsl(var(--surface))] text-[hsl(var(--text))] text-xs font-semibold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {formatPrice(getTotalPrice())}
          </div>
        </>
      )}
    </button>
  );
}
