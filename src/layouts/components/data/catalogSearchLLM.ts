import type { Product } from "./useCases";
import { getProductById } from "./useCases";
import { searchCatalog } from "./catalogSearch";

const LLM_SEARCH_ENDPOINT = "/.netlify/functions/catalog-llm-search";
const REQUEST_TIMEOUT_MS = 15_000;
const DEFAULT_RETRY_AFTER_SECONDS = 60;

export type LLMSearchOutcome = "success" | "error" | "daily_limit" | "rate_limited";

export interface LLMSearchResult {
  outcome: LLMSearchOutcome;
  products: Product[];
  /** Nur bei outcome "rate_limited" gesetzt. */
  retryAfterSeconds?: number;
}

/**
 * Fallback-Inhalt bei Fehler/Tageslimit: exakt dieselbe lokale Logik wie im
 * Standard-Suchmodus. Exportiert, damit die KI-Landing-Ansicht nach einem
 * erkannten Tageslimit weitere Anfragen direkt lokal beantworten kann, ohne
 * jedes Mal erneut (erfolglos) die Function aufzurufen.
 */
export function localFallbackProducts(query: string): Product[] {
  const local = searchCatalog(query);
  return [...local.products, ...local.productsViaDeliverable];
}

/**
 * LLM-gestützte Produktsuche. Rankt ausschließlich Produkte (siehe catalog-llm-search.ts).
 * Fällt bei Fehlern/Tageslimit transparent auf die bestehende lokale Keyword-Suche zurück;
 * beim Pro-IP-Limit wird bewusst NICHT zurückgefallen, sondern der Nutzer informiert
 * (siehe retryAfterSeconds) – das Limit soll ja gerade weitere Anfragen bremsen.
 */
export async function searchCatalogWithLLM(query: string): Promise<LLMSearchResult> {
  const trimmed = query.trim();
  if (!trimmed) return { outcome: "success", products: [] };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(LLM_SEARCH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: trimmed }),
      signal: controller.signal,
    });

    if (response.status === 429) {
      const data: { retryAfterSeconds?: number } = await response.json().catch(() => ({}));
      return {
        outcome: "rate_limited",
        products: [],
        retryAfterSeconds: data.retryAfterSeconds ?? DEFAULT_RETRY_AFTER_SECONDS,
      };
    }

    if (response.status === 503) {
      const data: { error?: string } = await response.json().catch(() => ({}));
      if (data.error === "daily_limit_reached") {
        return { outcome: "daily_limit", products: localFallbackProducts(trimmed) };
      }
      return { outcome: "error", products: localFallbackProducts(trimmed) };
    }

    if (!response.ok) {
      return { outcome: "error", products: localFallbackProducts(trimmed) };
    }

    const data: { productIds?: unknown } = await response.json();
    if (!Array.isArray(data.productIds)) {
      return { outcome: "error", products: localFallbackProducts(trimmed) };
    }

    const products = data.productIds
      .filter((id): id is string => typeof id === "string")
      .map((id) => getProductById(id))
      .filter((p): p is Product => Boolean(p));

    return { outcome: "success", products };
  } catch {
    return { outcome: "error", products: localFallbackProducts(trimmed) };
  } finally {
    clearTimeout(timeout);
  }
}
