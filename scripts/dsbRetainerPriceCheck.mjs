/** Prüft alle 6 DSB-Retainer-Preiskombinationen gegen Zielwerte. */

const PRICE_ESTIMATE_BUFFER = 1.1;

function roundToNearest100(amount) {
  return Math.round(amount / 100) * 100;
}

function applyPriceEstimateBuffer(amount) {
  return roundToNearest100(amount * PRICE_ESTIMATE_BUFFER);
}

function calculateTotal(base, companyMult, careMult) {
  return applyPriceEstimateBuffer(base * companyMult * careMult);
}

const base = 600;
const companyMults = {
  SMB: 10 / 11,
  Mid: 100 / 33,
  Enterprise: 200 / 33,
};
const careMults = {
  basis: 1.0,
  intensive: 2.0,
};

const targets = {
  SMB: { basis: 600, intensive: 1200 },
  Mid: { basis: 2000, intensive: 4000 },
  Enterprise: { basis: 4000, intensive: 8000 },
};

let failed = 0;

for (const [size, careTargets] of Object.entries(targets)) {
  for (const [care, target] of Object.entries(careTargets)) {
    const total = calculateTotal(base, companyMults[size], careMults[care]);
    const ok = total === target;
    if (!ok) failed += 1;
    console.log(
      `${ok ? "✓" : "✗"} ${size} + ${care}: ${total} € (Ziel: ${target} €)`
    );
  }
}

if (failed > 0) {
  console.error(`\n${failed} Kombination(en) weichen ab.`);
  process.exit(1);
}

console.log("\nAlle 6 Kombinationen stimmen mit den Zielwerten überein.");
