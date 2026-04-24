/**
 * Beispiel-Verwendung der Preisengine
 * 
 * Diese Datei zeigt, wie die Preisberechnung verwendet wird.
 */

import { calculateDeliverablePrice, formatPrice, getMinimumPrice } from './pricing';
import { deliverables } from '../data/seed';

// Beispiel 1: Minimaler Preis
const deliverable = deliverables[0]; // BI Fix & Fertig Setup
const minPrice = getMinimumPrice(deliverable);
console.log(`Minimaler Preis: ${formatPrice(minPrice)}`);

// Beispiel 2: Preis mit Parametern
const parameters = {
  companySize: 'Enterprise',
  speed: 'FastTrack',
  deployment: 'On-Prem'
};

const calculation = calculateDeliverablePrice(deliverable, parameters);

console.log('Preisberechnung:');
console.log(`Basispreis: ${formatPrice(calculation.base)}`);
console.log(`Multiplikatoren:`);
calculation.multipliers.forEach(m => {
  console.log(`  ${m.label}: ×${m.factor.toFixed(2)} (${formatPrice(m.amountImpact)})`);
});
console.log(`Add-ons:`);
calculation.addons.forEach(a => {
  console.log(`  ${a.label}: +${formatPrice(a.amount)}`);
});
console.log(`Gesamtpreis: ${formatPrice(calculation.total)}`);

// Beispiel 3: Breakdown-Lines für UI
console.log('\nBreakdown für UI:');
calculation.breakdownLines.forEach(line => {
  console.log(`${line.label}: ${formatPrice(line.amount)} ${line.details || ''}`);
});
