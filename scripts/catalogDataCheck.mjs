/**
 * Einmaliger Datenqualitäts-Check für den Produktkatalog.
 * Liest die TS-Quelldateien per Regex (kein TS-Runtime nötig).
 *
 * Ausführung: node scripts/catalogDataCheck.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "../src/layouts/components/data");

function read(name) {
  return readFileSync(join(dataDir, name), "utf8");
}

// --- Use Cases parsen ---
const useCasesSrc = read("useCases.ts");
const useCaseBlocks = [...useCasesSrc.matchAll(/\{\s*id:\s*"([^"]+)"([\s\S]*?)\n  \}/g)];

const useCases = useCaseBlocks.map((m) => {
  const block = m[0];
  const id = m[1];
  const title = block.match(/title:\s*"([^"]*)"/)?.[1] ?? "";
  const short = block.match(/short:\s*"([^"]*)"/)?.[1] ?? "";
  const slug = block.match(/slug:\s*"([^"]*)"/)?.[1] ?? "";
  const domain = block.match(/domain:\s*"([^"]*)"/)?.[1] ?? "";
  return { id, title, short, slug, domain };
});

// --- Deliverables parsen ---
const deliverablesSrc = read("deliverables.ts");
const deliverableIds = [...deliverablesSrc.matchAll(/key:\s*"([^"]+)"/g)].map((m) => m[1]);
const deliverableSet = new Set(deliverableIds);

const deliverableBlocks = [...deliverablesSrc.matchAll(/\{\s*key:\s*"([^"]+)"([\s\S]*?)\n  \}/g)];
const deliverables = deliverableBlocks.map((m) => {
  const block = m[0];
  const id = m[1];
  const name = block.match(/name:\s*"([^"]*)"/)?.[1] ?? "";
  const shortDescription = block.match(/shortDescription:\s*"([^"]*)"/)?.[1] ?? "";
  const basePrice = block.match(/basePrice:\s*(\d+)/)?.[1] ?? "0";
  const active = block.includes("active: true");
  return { id, name, shortDescription, basePrice: Number(basePrice), active };
});

// --- Recommendations: deliverableId-Referenzen ---
const recSrc = read("recommendations.ts");
const recDeliverableIds = [...recSrc.matchAll(/deliverableId:\s*"([^"]+)"/g)].map((m) => m[1]);
const brokenRecs = [...new Set(recDeliverableIds)].filter((id) => !deliverableSet.has(id));

// --- requestModes ---
const reqSrc = read("requestModes.ts");
const requestModeIds = [...reqSrc.matchAll(/"([^"]+)":\s*"(standard|custom|hybrid)"/g)].map((m) => m[1]);

// --- catalogStrategy (Phase 3) ---
let featuredIds = [];
let archivedIds = [];
let aliasIds = [];
try {
  const strategySrc = read("catalogStrategy.ts");
  const featuredBlock = strategySrc.match(/FEATURED_PRODUCT_IDS = \[([\s\S]*?)\] as const/)?.[1] ?? "";
  featuredIds = [...featuredBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);

  const archivedBlock = strategySrc.match(/ARCHIVED_PRODUCT_IDS = new Set\(\[([\s\S]*?)\]\)/)?.[1] ?? "";
  archivedIds = [...archivedBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);

  const aliasBlock = strategySrc.match(/PRODUCT_CATALOG_ALIAS_MAP: Record<string, string> = \{([\s\S]*?)\};/)?.[1] ?? "";
  aliasIds = [...aliasBlock.matchAll(/"([^"]+)":/g)].map((m) => m[1]);
} catch {
  // optional
}

// --- getBundleForUseCase: Hard-Override-Keys ---
const hardOverrideIds = [...recSrc.matchAll(/^\s*"([^"]+)":\s*\[/gm)]
  .map((m) => m[1])
  .filter((id) => useCases.some((uc) => uc.id === id) || recSrc.includes(`"${id}":`));

const useCaseIds = new Set(useCases.map((u) => u.id));

const issues = {
  productsMissingTitle: useCases.filter((u) => !u.title.trim()),
  productsMissingShort: useCases.filter((u) => !u.short.trim()),
  // slug ist optional – Fallback ist `id` (siehe productModel.ts / useCaseToProduct)
  productsMissingExplicitSlug: useCases.filter((u) => !u.slug.trim()),
  productsMissingDomain: useCases.filter((u) => !u.domain.trim()),
  deliverablesMissingName: deliverables.filter((d) => !d.name.trim()),
  deliverablesMissingDesc: deliverables.filter((d) => !d.shortDescription.trim()),
  deliverablesMissingPrice: deliverables.filter((d) => d.active && d.basePrice <= 0),
  brokenRecommendations: brokenRecs,
  requestModeUnknownIds: requestModeIds.filter((id) => !useCaseIds.has(id)),
  featuredUnknownIds: featuredIds.filter((id) => !useCaseIds.has(id)),
  aliasUnknownTargets: aliasIds
    .map((alias) => {
      const aliasBlock = read("catalogStrategy.ts").match(
        /PRODUCT_CATALOG_ALIAS_MAP: Record<string, string> = \{([\s\S]*?)\};/
      )?.[1] ?? "";
      const target = aliasBlock.match(new RegExp(`"${alias}":\\s*"([^"]+)"`))?.[1];
      return target ? { alias, target } : null;
    })
    .filter(Boolean)
    .filter(({ target }) => !useCaseIds.has(target)),
};

// Produkte ohne sinnvollen Pfad (vereinfacht: custom ohne Formular-Pfad = ok in UI;
// standard ohne aktive Empfehlungen = Warnung)
const productsWithoutActiveRecs = [];
for (const uc of useCases) {
  const modeMatch = reqSrc.match(new RegExp(`"${uc.id}":\\s*"(standard|custom|hybrid)"`));
  const mode = modeMatch?.[1] ?? "standard";
  const hasRecs = recSrc.includes(`"${uc.id}":`) || recSrc.includes(`generateRecommendationsFromRules("${uc.id}")`);
  // Prüfe ob Hard-Override existiert
  const hasHardOverride = recSrc.includes(`"${uc.id}": [`);
  if (mode === "standard" && !hasHardOverride) {
    // Rule-Engine-Fallback – nicht als Fehler werten
  }
  if (mode !== "custom") {
    const block = recSrc.match(new RegExp(`"${uc.id}":\\s*\\[([\\s\\S]*?)\\]`, "m"));
    const idsInBlock = block ? [...block[1].matchAll(/deliverableId:\s*"([^"]+)"/g)].map((x) => x[1]) : [];
    const activeInBlock = idsInBlock.filter((id) => {
      const d = deliverables.find((x) => x.id === id);
      return d?.active;
    });
    if (activeInBlock.length === 0 && mode === "standard") {
      productsWithoutActiveRecs.push({ id: uc.id, title: uc.title, mode, note: "Kein Hard-Override mit aktiven Bausteinen (Rule-Engine-Fallback)" });
    }
  }
}

console.log("=== Produktkatalog Datenqualitäts-Check ===\n");
console.log(`Produkte: ${useCases.length}`);
console.log(`Produktbausteine: ${deliverables.length} (${deliverables.filter((d) => d.active).length} aktiv)`);
console.log(`requestMode-Overrides: ${requestModeIds.length}`);
if (featuredIds.length > 0) {
  console.log(`Featured (Top-Produkte): ${featuredIds.length}`);
  console.log(`Katalog-Aliase: ${aliasIds.length}`);
  console.log(`Archiviert (zurückgestuft): ${archivedIds.length}`);
}
console.log("");

const sections = [
  ["Produkte ohne Titel", issues.productsMissingTitle],
  ["Produkte ohne Kurzbeschreibung", issues.productsMissingShort],
  ["Produkte ohne expliziten Slug (Info: Fallback = id)", issues.productsMissingExplicitSlug],
  ["Produkte ohne Domäne", issues.productsMissingDomain],
  ["Bausteine ohne Name", issues.deliverablesMissingName],
  ["Bausteine ohne Kurzbeschreibung", issues.deliverablesMissingDesc],
  ["Aktive Bausteine ohne basePrice", issues.deliverablesMissingPrice],
  ["Empfehlungen auf nicht existierende Bausteine", issues.brokenRecommendations.map((id) => ({ id }))],
  ["requestMode auf unbekannte Produkt-IDs", issues.requestModeUnknownIds.map((id) => ({ id }))],
  ["Featured-IDs ohne Produkt", issues.featuredUnknownIds.map((id) => ({ id }))],
  ["Alias-Ziele ohne Produkt", issues.aliasUnknownTargets],
];

let errorCount = 0;
for (const [label, items] of sections) {
  const isInfo = label.includes("(Info:");
  if (items.length === 0) {
    console.log(`✓ ${label}: 0`);
  } else if (isInfo) {
    console.log(`ℹ ${label}: ${items.length}`);
    items.slice(0, 5).forEach((item) => console.log(`    - ${item.id ?? item}${item.title ? ` (${item.title})` : ""}`));
    if (items.length > 5) console.log(`    … und ${items.length - 5} weitere`);
  } else {
    errorCount += items.length;
    console.log(`✗ ${label}: ${items.length}`);
    items.slice(0, 10).forEach((item) => console.log(`    - ${item.id ?? item}${item.title ? ` (${item.title})` : ""}`));
    if (items.length > 10) console.log(`    … und ${items.length - 10} weitere`);
  }
}

console.log(`\nStandard-Produkte ohne Hard-Override-Bausteine (Info, Rule-Engine-Fallback): ${productsWithoutActiveRecs.length}`);

// --- Aktive Browse-Produkte & Top-Produkt-Audit (Phase 5) ---
const browseActiveCount = useCases.filter(
  (uc) => !aliasIds.includes(uc.id) && !archivedIds.includes(uc.id)
).length;

const TOP_PRODUCT_IDS = [
  "datenstrategie",
  "data-ai-leadership",
  "setup-bi",
  "excel-to-bi-migration",
  "dwh",
  "data-catalog",
  "master-data-management",
  "sales-dashboard",
  "sales-reporting",
  "controlling-via-bi",
  "liquiditaetsplanung-bi",
  "automatisierte-rechnungsverarbeitung",
  "dsgvo-dsb",
  "iam",
  "ki-strategie",
  "data-mesh-organisation",
  "churn-prevention-algo",
  "ai-video-qualitaetsanalyse",
  "wartung-support",
  "maturity-assessment",
];

function getBundleActiveDeliverables(productId) {
  const block = recSrc.match(new RegExp(`"${productId}":\\s*\\[([\\s\\S]*?)\\]`, "m"));
  const idsInBlock = block ? [...block[1].matchAll(/deliverableId:\s*"([^"]+)"/g)].map((x) => x[1]) : [];
  return idsInBlock.filter((id) => deliverables.find((d) => d.id === id)?.active);
}

const topProductIssues = [];
for (const id of TOP_PRODUCT_IDS) {
  const uc = useCases.find((u) => u.id === id);
  if (!uc) {
    topProductIssues.push({ id, issue: "Produkt nicht gefunden" });
    continue;
  }
  const modeMatch = reqSrc.match(new RegExp(`"${id}":\\s*"(standard|custom|hybrid)"`));
  const mode = modeMatch?.[1] ?? "standard";
  const activeInBundle = getBundleActiveDeliverables(id);
  if (mode === "custom") continue;
  if (activeInBundle.length < 2) {
    topProductIssues.push({
      id,
      issue: `Nur ${activeInBundle.length} aktive Bausteine im Bundle`,
    });
  }
  if (mode === "standard" && activeInBundle.length >= 2) {
    topProductIssues.push({
      id,
      issue: "requestMode noch standard (hybrid empfohlen)",
    });
  }
}

console.log(`\nAktive Browse-Produkte (ohne Alias/Archiv): ${browseActiveCount}`);
console.log(`Top-Produkt-Audit (${TOP_PRODUCT_IDS.length}): ${topProductIssues.length} Hinweise`);
topProductIssues.slice(0, 15).forEach((item) => console.log(`    - ${item.id}: ${item.issue}`));
if (topProductIssues.length > 15) console.log(`    … und ${topProductIssues.length - 15} weitere`);

// --- Marketing-Slug-Map & Archiv/Featured (Phase 6) ---
let marketingMapIssues = [];
try {
  const routingSrc = readFileSync(join(dataDir, "productCatalogRouting.ts"), "utf8");
  const mapBlock = routingSrc.match(/productCatalogMarketingMap = \{([\s\S]*?)\} as const/)?.[1] ?? "";
  const marketingEntries = [...mapBlock.matchAll(/"([^"]+)":\s*"([^"]+)"/g)];
  marketingMapIssues = marketingEntries
    .filter((match) => !useCaseIds.has(match[2]))
    .map((match) => ({ slug: match[1], target: match[2], issue: "Marketing-Ziel ohne Produkt" }));
} catch {
  // optional
}

const archivedInFeatured = featuredIds.filter((id) => archivedIds.includes(id));
const aliasInFeatured = featuredIds.filter((id) => aliasIds.includes(id));

console.log(`\nMarketing-Slug-Ziele ungültig: ${marketingMapIssues.length}`);
marketingMapIssues.slice(0, 5).forEach((item) => console.log(`    - ${item.slug} → ${item.target}: ${item.issue}`));

if (archivedInFeatured.length > 0) {
  console.log(`✗ Archivierte Produkte in Featured: ${archivedInFeatured.length}`);
  archivedInFeatured.forEach((id) => console.log(`    - ${id}`));
  errorCount += archivedInFeatured.length;
} else {
  console.log(`✓ Archivierte Produkte in Featured: 0`);
}

if (aliasInFeatured.length > 0) {
  console.log(`ℹ Alias-Produkte in Featured (prüfen): ${aliasInFeatured.length}`);
} else {
  console.log(`✓ Alias-Produkte in Featured: 0`);
}

console.log(`\nGesamt kritische Befunde: ${errorCount}`);
process.exit(errorCount > 0 ? 1 : 0);
