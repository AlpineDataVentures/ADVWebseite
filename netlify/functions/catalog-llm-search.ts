import corpus from "../../.json/catalogSearchCorpus.json";
import { getLlmSearchProvider } from "./lib/llmSearchProvider";

const MAX_QUERY_LENGTH = 1000;

interface NetlifyFunctionEvent {
  httpMethod: string;
  body: string | null;
}

function jsonResponse(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export const handler = async (event: NetlifyFunctionEvent) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Nur POST erlaubt." });
  }

  let query: string;
  try {
    const parsed = JSON.parse(event.body ?? "{}");
    query = typeof parsed.query === "string" ? parsed.query.trim() : "";
  } catch {
    return jsonResponse(400, { error: "Ungültiger Request-Body." });
  }

  if (!query || query.length > MAX_QUERY_LENGTH) {
    return jsonResponse(400, { error: "Suchanfrage fehlt oder ist zu lang." });
  }

  const provider = getLlmSearchProvider();
  if (!provider) {
    return jsonResponse(500, { error: "Kein LLM-Suchprovider konfiguriert." });
  }

  try {
    const productIds = await provider.rankProducts(query, corpus);
    return jsonResponse(200, { productIds });
  } catch (err) {
    console.error("[catalog-llm-search] LLM-Suche fehlgeschlagen:", err);
    return jsonResponse(502, { error: "LLM-Suche derzeit nicht verfügbar." });
  }
};
