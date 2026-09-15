/**
 * Erzeugt den Text-Korpus für die LLM-Produktsuche aus den echten TS-Datenmodulen
 * (via tsx, ohne vollen Build – siehe scripts/calendlyIntegrationCheck.mjs).
 * Wird von "npm run generate-json" vor astro dev/build ausgeführt, damit die
 * Netlify Function (netlify/functions/catalog-llm-search.ts) ein statisches,
 * bereits fertiges JSON importieren kann statt die TS-Module selbst zu laden.
 *
 * Ausführung: npx tsx scripts/generateCatalogSearchCorpus.mjs
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { products } from "../src/layouts/components/data/useCases.ts";
import {
  getProductLLMCorpusEntry,
  getDeliverableLLMCorpusEntry,
} from "../src/layouts/components/data/catalogSearch.ts";
import { getDeliverableById } from "../src/layouts/components/data/deliverables.ts";

const JSON_FOLDER = "./.json";
const OUTPUT_FILE = path.join(JSON_FOLDER, "catalogSearchCorpus.json");

function buildCorpus() {
  const productEntries = products.map((product) => getProductLLMCorpusEntry(product));

  const deliverableIds = new Set();
  for (const entry of productEntries) {
    for (const id of entry.deliverableIds) deliverableIds.add(id);
  }

  const deliverableGlossary = {};
  for (const id of deliverableIds) {
    const deliverable = getDeliverableById(id);
    if (!deliverable) continue;
    const { name, text } = getDeliverableLLMCorpusEntry(deliverable);
    deliverableGlossary[id] = { name, text };
  }

  return {
    generatedAt: new Date().toISOString(),
    products: productEntries,
    deliverables: deliverableGlossary,
  };
}

function main() {
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER, { recursive: true });
  }

  const corpus = buildCorpus();
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(corpus));
  console.log(
    `[generateCatalogSearchCorpus] ${corpus.products.length} Produkte, ${Object.keys(corpus.deliverables).length} Bausteine → ${OUTPUT_FILE}`
  );
}

main();
