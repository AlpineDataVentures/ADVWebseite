/**
 * Preis-Konsistenzcheck für Produktbausteine.
 * Spiegelt calculateDeliverablePrice ohne Runtime-Puffer.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "../src/layouts/components/data");

function read(name) {
  return readFileSync(join(dataDir, name), "utf8");
}

function roundToNearest100(amount) {
  return Math.round(amount / 100) * 100;
}

function parseFractionValue(raw) {
  const trimmed = raw.trim().replace(/,$/, "");
  if (trimmed.includes("/")) {
    const [a, b] = trimmed.split("/").map((x) => Number(x.trim()));
    return a / b;
  }
  return Number(trimmed.replace(/['"]/g, ""));
}

function parseParameters(src) {
  const params = new Map();
  const blocks = [...src.matchAll(/{\s*\n\s*key:\s*'([^']+)'([\s\S]*?)\n\s*},?\n/g)];

  for (const [, key, body] of blocks) {
    const defaultMatch = body.match(/default:\s*('([^']*)'|(\d+))/);
    const typeMatch = body.match(/pricingEffect:\s*\{[\s\S]*?type:\s*'(multiplier|additive)'/);
    const valuesBlock = body.match(/pricingEffect:\s*\{[\s\S]*?values:\s*\{([\s\S]*?)\n\s*\}\s*\n\s*\}/)?.[1] ?? "";
    const values = {};
    for (const line of valuesBlock.split("\n")) {
      const m = line.match(/'([^']+)':\s*(.+)/);
      if (!m) continue;
      values[m[1]] = parseFractionValue(m[2]);
    }
    params.set(key, {
      key,
      default: defaultMatch?.[2] ?? defaultMatch?.[3] ?? "",
      pricingType: typeMatch?.[1] ?? "multiplier",
      values,
    });
  }
  return params;
}

function parseDeliverables(src) {
  const items = [];
  const blocks = [...src.matchAll(/\{\s*key:\s*"([^"]+)"([\s\S]*?)\n  \}/g)];
  for (const [, key, body] of blocks) {
    const basePrice = Number(body.match(/basePrice:\s*(\d+)/)?.[1] ?? 0);
    const active = body.includes("active: true");
    const paramsMatch = body.match(/parameters:\s*\[([^\]]*)\]/);
    const parameters = paramsMatch
      ? [...paramsMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
      : [];
    items.push({ key, basePrice, active, parameters });
  }
  return items;
}

function getDefaultParams(deliverable, paramMap) {
  const selected = {};
  for (const paramKey of deliverable.parameters) {
    const param = paramMap.get(paramKey);
    if (!param) continue;
    selected[paramKey] = param.default;
  }
  return selected;
}

function calculatePrice(deliverable, selectedParams, paramMap) {
  let current = deliverable.basePrice;
  const multipliers = [];

  for (const paramKey of deliverable.parameters) {
    const param = paramMap.get(paramKey);
    if (!param) continue;
    const value = String(selectedParams[paramKey] ?? param.default);
    const effect = param.values[value];
    if (effect === undefined) continue;

    if (param.pricingType === "multiplier") {
      const before = current;
      current *= effect;
      multipliers.push({ key: paramKey, factor: effect, impact: current - before });
    } else if (effect > 0) {
      current += effect;
    }
  }

  return {
    total: roundToNearest100(current),
    multipliers,
  };
}

const paramMap = parseParameters(read("parameters.ts"));
const deliverables = parseDeliverables(read("deliverables.ts")).filter((d) => d.active);

const standardPriceIssues = [];
const multiplierIssues = [];
const retainerTargets = {
  SMB: { basis: 600, intensive: 1200 },
  Mid: { basis: 2000, intensive: 4000 },
  Enterprise: { basis: 4000, intensive: 8000 },
};
const retainerIssues = [];

for (const deliverable of deliverables) {
  const defaults = getDefaultParams(deliverable, paramMap);
  const result = calculatePrice(deliverable, defaults, paramMap);

  if (result.total !== deliverable.basePrice) {
    standardPriceIssues.push({
      id: deliverable.key,
      basePrice: deliverable.basePrice,
      standardTotal: result.total,
    });
  }

  for (const paramKey of deliverable.parameters) {
    const param = paramMap.get(paramKey);
    if (!param) continue;
    const defaultValue = String(defaults[paramKey] ?? param.default);
    const effect = param.values[defaultValue];
    if (param.pricingType === "multiplier" && effect < 1) {
      multiplierIssues.push({ deliverable: deliverable.key, param: paramKey, factor: effect });
    }
    if (param.pricingType === "additive" && effect < 0) {
      multiplierIssues.push({ deliverable: deliverable.key, param: paramKey, addon: effect });
    }
  }

  if (deliverable.key === "dsb_retainer") {
    const companyMults = { SMB: 1.0, Mid: 10 / 3, Enterprise: 20 / 3 };
    const careMults = { basis: 1.0, intensive: 2.0 };
    for (const [size, careMap] of Object.entries(retainerTargets)) {
      for (const [care, target] of Object.entries(careMap)) {
        const total = roundToNearest100(
          deliverable.basePrice * companyMults[size] * careMults[care]
        );
        if (total !== target) {
          retainerIssues.push({ size, care, total, target });
        }
      }
    }
  }
}

let errorCount = 0;

console.log("=== Preis-Konsistenzcheck ===\n");

if (standardPriceIssues.length === 0) {
  console.log(`✓ Standardpreis = Basispreis: ${deliverables.length} aktive Bausteine`);
} else {
  errorCount += standardPriceIssues.length;
  console.log(`✗ Standardpreis ≠ Basispreis: ${standardPriceIssues.length}`);
  standardPriceIssues.slice(0, 10).forEach((item) =>
    console.log(`    - ${item.id}: Basis ${item.basePrice} €, Standard ${item.standardTotal} €`)
  );
}

if (multiplierIssues.length === 0) {
  console.log("✓ Keine Standard-Multiplikatoren < 1,00 oder negative Zuschläge");
} else {
  errorCount += multiplierIssues.length;
  console.log(`✗ Ungültige Standard-Parameter: ${multiplierIssues.length}`);
  multiplierIssues.forEach((item) => console.log(`    - ${item.deliverable} / ${item.param}`));
}

if (retainerIssues.length === 0) {
  console.log("✓ DSB-Retainer: alle 6 Zielpreise");
} else {
  errorCount += retainerIssues.length;
  console.log(`✗ DSB-Retainer Zielpreise: ${retainerIssues.length}`);
  retainerIssues.forEach((item) =>
    console.log(`    - ${item.size}/${item.care}: ${item.total} € (Ziel ${item.target} €)`)
  );
}

console.log(`\nPreis-Check Befunde: ${errorCount}`);
process.exit(errorCount > 0 ? 1 : 0);
