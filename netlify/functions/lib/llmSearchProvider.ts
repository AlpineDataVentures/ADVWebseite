/**
 * Provider-Schnittstelle für die LLM-Produktsuche.
 * Ziel: der Aufrufer (catalog-llm-search.ts) kennt keine Provider-Details –
 * ein neuer Anbieter muss nur dieses Interface implementieren und in
 * getLlmSearchProvider() ergänzt werden.
 */
import { ClaudeSearchProvider } from "./claudeSearchProvider";

export interface CatalogCorpusProductEntry {
  id: string;
  title: string;
  text: string;
  deliverableIds: string[];
}

export interface CatalogCorpusDeliverableEntry {
  name: string;
  text: string;
}

export interface CatalogCorpus {
  products: CatalogCorpusProductEntry[];
  deliverables: Record<string, CatalogCorpusDeliverableEntry>;
}

export interface LlmSearchProvider {
  /** Liefert relevante Produkt-IDs, nach Relevanz sortiert (leeres Array = keine Treffer). */
  rankProducts(query: string, corpus: CatalogCorpus): Promise<string[]>;
}

/**
 * Liest den gewünschten Provider aus LLM_SEARCH_PROVIDER (Default: "claude").
 * Gibt null zurück, wenn kein Provider konfiguriert/verfügbar ist – der Aufrufer
 * muss diesen Fall behandeln und darf nicht crashen (Client fällt dann lokal zurück).
 */
export function getLlmSearchProvider(): LlmSearchProvider | null {
  const providerName = process.env.LLM_SEARCH_PROVIDER ?? "claude";

  switch (providerName) {
    case "claude":
      return new ClaudeSearchProvider();
    default:
      console.error(`[llmSearchProvider] Unbekannter LLM_SEARCH_PROVIDER: "${providerName}"`);
      return null;
  }
}
