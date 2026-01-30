import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { useConfigStore } from "../stores/configStore";
import { formatPrice, calculateCartItemPrice, getDeliverableById, calculateTotalPrice } from "../lib/pricing";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export interface PriceBreakdownProps {
  deliverableId?: string;
  parameters?: Record<string, any>;
  showDetails?: boolean;
  className?: string;
}

/**
 * Detaillierte Preisaufschlüsselung für ein einzelnes Deliverable
 */
function SingleDeliverableBreakdown({ 
  deliverableId, 
  parameters, 
  showDetails = true 
}: { 
  deliverableId: string; 
  parameters: Record<string, any>;
  showDetails: boolean;
}) {
  const deliverable = getDeliverableById(deliverableId);
  if (!deliverable) return null;

  const calculation = calculateCartItemPrice({
    deliverableId,
    quantity: 1,
    parameters: parameters as any
  });

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="font-medium text-sm">{deliverable.name}</p>
          {showDetails && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1"
            >
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              Preisaufschlüsselung {expanded ? 'ausblenden' : 'anzeigen'}
            </button>
          )}
        </div>
        <p className="font-semibold text-lg">{formatPrice(calculation.total)}</p>
      </div>

      {expanded && showDetails && (
        <div className="pl-4 border-l-2 border-muted space-y-2 text-sm">
          {/* Base */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Basispreis</span>
            <span className="font-medium">{formatPrice(calculation.base)}</span>
          </div>

          {/* Multipliers */}
          {calculation.multipliers.length > 0 && (
            <>
              <Separator className="my-2" />
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase">Multiplikatoren</p>
                {calculation.multipliers.map((mult, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{mult.label}</span>
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
          {calculation.addons.length > 0 && (
            <>
              <Separator className="my-2" />
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase">Zusatzkosten</p>
                {calculation.addons.map((addon, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-muted-foreground">{addon.label}</span>
                    <span className="font-medium">+{formatPrice(addon.amount)}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Total */}
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold text-base">
            <span>Gesamtpreis</span>
            <span>{formatPrice(calculation.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Hauptkomponente: Preisübersicht für Warenkorb oder einzelnes Deliverable
 */
export function PriceBreakdown({ 
  deliverableId, 
  parameters, 
  showDetails = true,
  className 
}: PriceBreakdownProps) {
  const cart = useConfigStore((state) => state.getCart());
  const total = calculateTotalPrice(cart);

  // Wenn deliverableId und parameters übergeben werden, zeige einzelnes Deliverable
  if (deliverableId && parameters) {
    const hasCardWrapper = !className?.includes('border-0') && !className?.includes('shadow-none');
    
    if (hasCardWrapper) {
      return (
        <Card className={className}>
          <CardHeader>
            <CardTitle className="text-lg">Preisaufschlüsselung</CardTitle>
          </CardHeader>
          <CardContent>
            <SingleDeliverableBreakdown 
              deliverableId={deliverableId} 
              parameters={parameters}
              showDetails={showDetails}
            />
          </CardContent>
        </Card>
      );
    } else {
      // Ohne Card-Wrapper
      return (
        <div className={className}>
          <h4 className="font-medium mb-3">Preisaufschlüsselung</h4>
          <SingleDeliverableBreakdown 
            deliverableId={deliverableId} 
            parameters={parameters}
            showDetails={showDetails}
          />
        </div>
      );
    }
  }

  // Warenkorb-Ansicht
  return (
    <Card className={`sticky top-4 ${className || ''}`}>
      <CardHeader>
        <CardTitle>Preisübersicht</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cart.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Fügen Sie Produkte hinzu, um die Preisübersicht zu sehen
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => {
                const deliverable = getDeliverableById(item.deliverableId);
                if (!deliverable) return null;

                const calculation = calculateCartItemPrice(item);

                return (
                  <div key={item.deliverableId} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{deliverable.name}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} × {formatPrice(calculation.total / item.quantity)}
                          </p>
                        )}
                      </div>
                      <p className="font-semibold ml-4">{formatPrice(calculation.total)}</p>
                    </div>

                    {showDetails && (
                      <div className="pl-4 border-l-2 border-muted space-y-1.5 text-xs">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Basispreis</span>
                          <span>{formatPrice(calculation.base)}</span>
                        </div>
                        
                        {calculation.multipliers.length > 0 && (
                          <>
                            {calculation.multipliers.map((mult, idx) => (
                              <div key={idx} className="flex justify-between text-muted-foreground">
                                <span>{mult.label}</span>
                                <span>×{mult.factor.toFixed(2)}</span>
                              </div>
                            ))}
                          </>
                        )}
                        
                        {calculation.addons.length > 0 && (
                          <>
                            {calculation.addons.map((addon, idx) => (
                              <div key={idx} className="flex justify-between text-muted-foreground">
                                <span>{addon.label}</span>
                                <span>+{formatPrice(addon.amount)}</span>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xl font-bold pt-2">
              <span>Gesamtpreis</span>
              <span>{formatPrice(total)}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
