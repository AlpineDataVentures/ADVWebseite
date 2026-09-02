import type { Product } from "./useCases";
import { getProductById } from "./useCases";
import { searchCatalog } from "./catalogSearch";

const LLM_SEARCH_ENDPOINT = "/.netlify/functions/catalog-llm-search";
const REQUEST_TIMEOUT_MS = 15_000;

export interface LLMSearchResult {
  products: Product[];
  /** true, wenn die KI-Suche fehlgeschlagen ist und stattdessen lokal (Standardsuche) gesucht wurde. */
  failed: boolean;
}

/** Fallback bei Fehler/Timeout: exakt dieselbe lokale Logik wie im Standard-Suchmodus. */
function localFallback(query: string): LLMSearchResult {
  const local = searchCatalog(query);
  return { products: [...local.products, ...local.productsViaDeliverable], failed: true };
}

/**
 * LLM-gestützte Produktsuche. Rankt ausschließlich Produkte (siehe catalog-llm-search.ts).
 * Fällt bei jedem Fehler (Netzwerk, Timeout, Server-Fehler) transparent auf die
 * bestehende lokale Keyword-Suche zurück – die KI-Suche ist eine reine Ergänzung.
 */
export async function searchCatalogWithLLM(query: string): Promise<LLMSearchResult> {
  const trimmed = query.trim();
  if (!trimmed) return { products: [], failed: false };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(LLM_SEARCH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: trimmed }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return localFallback(trimmed);
    }

    const data: { productIds?: unknown } = await response.json();
    if (!Array.isArray(data.productIds)) {
      return localFallback(trimmed);
    }

    const products = data.productIds
      .filter((id): id is string => typeof id === "string")
      .map((id) => getProductById(id))
      .filter((p): p is Product => Boolean(p));

    return { products, failed: false };
  } catch {
    return localFallback(trimmed);
  } finally {
    clearTimeout(timeout);
  }
}
