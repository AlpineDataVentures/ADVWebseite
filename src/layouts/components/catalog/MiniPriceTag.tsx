import { Badge } from "./ui/badge";
import { formatPrice, getMinimumPrice, calculateDeliverablePrice } from "../lib/pricing";
import type { Deliverable, DeliverableParameters } from "../data/models";

interface MiniPriceTagProps {
  deliverable: Deliverable;
  parameters?: DeliverableParameters;
  showFrom?: boolean;
  className?: string;
}

/**
 * Kompakte Preis-Anzeige für Cards
 * Zeigt "ab X €" wenn keine Parameter übergeben werden,
 * oder den aktuellen Preis basierend auf Parametern
 */
export function MiniPriceTag({ 
  deliverable, 
  parameters, 
  showFrom = true,
  className 
}: MiniPriceTagProps) {
  let price: number;
  let label: string;

  if (parameters) {
    // Aktuelle Konfiguration: Berechne exakten Preis
    const calculation = calculateDeliverablePrice(deliverable, parameters);
    price = calculation.total;
    label = formatPrice(price);
  } else {
    // Keine Parameter: Zeige Minimalpreis
    price = getMinimumPrice(deliverable);
    label = showFrom ? `ab ${formatPrice(price)}` : formatPrice(price);
  }

  return (
    <Badge 
      variant="default" 
      className={`text-base font-semibold px-3 py-1.5 ${className || ''}`}
    >
      {label}
    </Badge>
  );
}

/**
 * Kompakte Version für Listen
 */
export function MiniPriceTagCompact({ 
  deliverable, 
  parameters 
}: { 
  deliverable: Deliverable; 
  parameters?: DeliverableParameters;
}) {
  let price: number;

  if (parameters) {
    const calculation = calculateDeliverablePrice(deliverable, parameters);
    price = calculation.total;
  } else {
    price = getMinimumPrice(deliverable);
  }

  return (
    <span className="text-sm font-semibold text-primary">
      {parameters ? formatPrice(price) : `ab ${formatPrice(price)}`}
    </span>
  );
}
