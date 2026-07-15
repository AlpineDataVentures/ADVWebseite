/** Prüft alle 6 DSB-Retainer-Preiskombinationen gegen Zielwerte (ohne Runtime-Puffer). */

function roundToNearest100(amount) {
  return Math.round(amount / 100) * 100;
}

function calculateTotal(base, companyMult, careMult) {
  return roundToNearest100(base * companyMult * careMult);
}

const base = 600;
const companyMults = {
  SMB: 1.0,
  Mid: 10 / 3,
  Enterprise: 20 / 3,
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
