/**
 * Manueller Test der LLM-Produktsuche gegen den echten Korpus (via tsx, ohne HTTP-Layer).
 * Voraussetzung: `npm run generate-json` wurde ausgeführt (erzeugt .json/catalogSearchCorpus.json)
 * und eine lokale .env mit ANTHROPIC_API_KEY existiert (siehe .env.example).
 *
 * Ausführung (lädt .env automatisch, Node 20.6+):
 *   node --env-file=.env --import tsx test/catalog-llm-search-test.mjs
 *
 * Alternative ohne .env-Datei – Key nur für diese eine Ausführung im Terminal setzen:
 *   Bash:       ANTHROPIC_API_KEY=sk-... npx tsx test/catalog-llm-search-test.mjs
 *   PowerShell: $env:ANTHROPIC_API_KEY="sk-..."; npx tsx test/catalog-llm-search-test.mjs
 */
import { ClaudeSearchProvider } from "../netlify/functions/lib/claudeSearchProvider.ts";
import corpus from "../.json/catalogSearchCorpus.json" with { type: "json" };

const QUERIES = [
  "Wir wollen weg von Excel-Tabellen",
  "Wir brauchen einen externen Datenschutzbeauftragter",
  "Wie erkennen wir Ausschuss in der Produktion automatisch?",
  "Ich will eine KI die mir hilft besser mit dem existierenden Wissen meiens Unternhemens umzugehen",
  "Ich produziere Waschbecken. Sie haben oft defekte. Ich will, dass Defekte Waschbecken bei der Produktion autoatisch identifiziert werden, ohne dass ich dafür Mitarbeiterzeit verschwenden muss."
];

async function main() {
  const provider = new ClaudeSearchProvider();
  const titleById = new Map(corpus.products.map((p) => [p.id, p.title]));

  for (const query of QUERIES) {
    const productIds = await provider.rankProducts(query, corpus);
    console.log(`\nQuery: "${query}"`);
    if (productIds.length === 0) {
      console.log("  (keine Treffer)");
      continue;
    }
    for (const id of productIds) {
      console.log(`  - ${id}: ${titleById.get(id) ?? "?"}`);
    }
  }
}

main().catch((err) => {
  console.error("Fehler beim Testen der LLM-Suche:", err);
  process.exitCode = 1;
});
