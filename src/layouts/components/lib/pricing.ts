import type { DeliverableParameters, CartItem } from '../data/models';
import type { Deliverable } from '../data/deliverables';
import { deliverables } from '../data/deliverables';
import { allParameters, getParameterByKey } from '../data/parameters';

/**
 * Rundet auf die nächsten 100 EUR
 */
export function roundToNearest100(amount: number): number {
  return Math.round(amount / 100) * 100;
}

/**
 * Multiplier-Information für UI
 */
export interface MultiplierInfo {
  label: string;
  factor: number;
  amountImpact: number; // Betrag, um den sich der Preis ändert
  value: string;
}

/**
 * Add-on Information für UI
 */
export interface AddOnInfo {
  label: string;
  amount: number;
  value: string;
}

/**
 * Breakdown-Line für detaillierte UI-Anzeige
 */
export interface BreakdownLine {
  label: string;
  amount: number;
  type: 'base' | 'multiplier' | 'addon' | 'subtotal' | 'total';
  details?: string;
}

/**
 * Preis-Breakdown Ergebnis
 */
export interface PriceCalculationResult {
  total: number;
  base: number;
  multipliers: MultiplierInfo[];
  addons: AddOnInfo[];
  breakdownLines: BreakdownLine[];
}

/**
 * Berechnet den Preis für ein Deliverable mit Parametern
 */
export function calculateDeliverablePrice(
  deliverable: Deliverable,
  selectedParams: DeliverableParameters
): PriceCalculationResult {
  const base = deliverable.basePrice;
  const multipliers: MultiplierInfo[] = [];
  const addons: AddOnInfo[] = [];
  const breakdownLines: BreakdownLine[] = [];
  
  // Base-Preis als erste Line
  breakdownLines.push({
    label: 'Basispreis',
    amount: base,
    type: 'base'
  });
  
  let currentAmount = base;
  
  // Alle Parameter durchgehen, die für dieses Deliverable gelten
  deliverable.parameters.forEach(paramKey => {
    const param = getParameterByKey(paramKey);
    if (!param) return;
    
    const paramValue = selectedParams[paramKey];
    const valueToUse = paramValue !== undefined 
      ? String(paramValue)
      : (typeof param.default === 'string' ? param.default : String(param.default));
    
    const effect = param.pricingEffect.values[valueToUse];
    if (effect === undefined) return;
    
    if (param.pricingEffect.type === 'multiplier') {
      // Multiplier: Berechne Impact
      const amountBefore = currentAmount;
      currentAmount *= effect;
      const amountImpact = currentAmount - amountBefore;
      
      // Finde Label für den Wert
      const optionLabel = param.options?.find(opt => opt.value === valueToUse)?.label || valueToUse;
      
      multipliers.push({
        label: param.label,
        factor: effect,
        amountImpact: roundToNearest100(amountImpact),
        value: valueToUse
      });
      
      breakdownLines.push({
        label: `${param.label}: ${optionLabel}`,
        amount: roundToNearest100(amountImpact),
        type: 'multiplier',
        details: `×${effect.toFixed(2)}`
      });
    } else {
      // Additive: spezielle Behandlung für trainingParticipants
      let addOnAmount = 0;
      let addOnLabel = param.label;
      
      if (paramKey === 'trainingParticipants') {
        const participants = Number(valueToUse);
        if (participants >= 13 && participants <= 20) {
          addOnAmount = 1900;
        } else if (participants >= 7 && participants <= 12) {
          addOnAmount = 900;
        }
        if (addOnAmount > 0) {
          addOnLabel = `${param.label} (${participants} Teilnehmer)`;
        }
      } else {
        addOnAmount = effect;
      }
      
      if (addOnAmount > 0) {
        currentAmount += addOnAmount;
        
        addons.push({
          label: addOnLabel,
          amount: addOnAmount,
          value: valueToUse
        });
        
        breakdownLines.push({
          label: addOnLabel,
          amount: addOnAmount,
          type: 'addon'
        });
      }
    }
  });
  
  // Subtotal (vor Rundung)
  breakdownLines.push({
    label: 'Zwischensumme',
    amount: roundToNearest100(currentAmount),
    type: 'subtotal'
  });
  
  // Finaler Preis (gerundet)
  const total = roundToNearest100(currentAmount);
  
  breakdownLines.push({
    label: 'Gesamtpreis',
    amount: total,
    type: 'total'
  });
  
  return {
    total,
    base,
    multipliers,
    addons,
    breakdownLines
  };
}

/**
 * Berechnet den Preis für ein Cart-Item
 */
export function calculateCartItemPrice(cartItem: CartItem): PriceCalculationResult {
  const deliverable = deliverables.find(d => d.id === cartItem.deliverableId);
  if (!deliverable) {
    return {
      total: 0,
      base: 0,
      multipliers: [],
      addons: [],
      breakdownLines: []
    };
  }
  
  const breakdown = calculateDeliverablePrice(deliverable, cartItem.parameters);
  
  // Bei quantity > 1: Preis multiplizieren
  if (cartItem.quantity > 1) {
    return {
      ...breakdown,
      total: breakdown.total * cartItem.quantity,
      base: breakdown.base * cartItem.quantity,
      multipliers: breakdown.multipliers.map(m => ({
        ...m,
        amountImpact: m.amountImpact * cartItem.quantity
      })),
      addons: breakdown.addons.map(a => ({
        ...a,
        amount: a.amount * cartItem.quantity
      })),
      breakdownLines: breakdown.breakdownLines.map(line => ({
        ...line,
        amount: line.amount * cartItem.quantity
      }))
    };
  }
  
  return breakdown;
}

/**
 * Berechnet den Gesamtpreis aller Cart-Items
 */
export function calculateTotalPrice(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => {
    const breakdown = calculateCartItemPrice(item);
    return total + breakdown.total;
  }, 0);
}

/**
 * Formatiert einen Preis als deutsche Währung
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Gibt ein Deliverable nach ID zurück
 */
export function getDeliverableById(deliverableId: string): Deliverable | undefined {
  return deliverables.find(d => d.id === deliverableId);
}

/**
 * Berechnet den minimalen Preis für ein Deliverable (mit Standard-Parametern)
 */
export function getMinimumPrice(deliverable: Deliverable): number {
  if (!deliverable.active || !deliverable.basePrice) {
    return 0;
  }

  const defaultParams: DeliverableParameters = {};
  if (deliverable.parameters) {
    deliverable.parameters.forEach(paramKey => {
      const param = getParameterByKey(paramKey);
      if (param) {
        defaultParams[param.key] = typeof param.default === 'string' 
          ? param.default 
          : param.default;
      }
    });
  }
  
  const result = calculateDeliverablePrice(deliverable, defaultParams);
  return result.total;
}
