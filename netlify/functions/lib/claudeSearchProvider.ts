import Anthropic from "@anthropic-ai/sdk";
import type { CatalogCorpus, LlmSearchProvider } from "./llmSearchProvider";

const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const REQUEST_TIMEOUT_MS = 12_000;
const MAX_OUTPUT_TOKENS = 1024;

const RANK_TOOL_NAME = "return_ranked_products";

const SYSTEM_PROMPT = `Du bist die Relevanz-Filter-Engine für den Produktkatalog einer
deutschsprachigen Daten- und KI-Beratung (B2B). Du bekommst eine Liste von Produkten
(mit Titel, Beschreibungstext und den IDs zugehöriger Produktbausteine) sowie ein
Glossar der Produktbausteine (Name + Beschreibungstext), und eine Suchanfrage eines
Nutzers auf der Katalogseite.

Deine Aufgabe: Gib die IDs der Produkte zurück, die inhaltlich zur Suchanfrage passen –
auch wenn die Anfrage die Begriffe aus dem Produkttext nicht wörtlich verwendet
(z. B. eine Problem- oder Zielbeschreibung statt eines Fachbegriffs). Berücksichtige dabei
auch die Texte der über deliverableIds referenzierten Bausteine aus dem Glossar.

Gib NUR Produkte zurück, die tatsächlich thematisch relevant sind – kein vollständiges
Ranking aller Produkte. Sortiere absteigend nach Relevanz. Wenn kein Produkt passt,
gib ein leeres Array zurück.`;

const RANK_TOOL = {
  name: RANK_TOOL_NAME,
  description:
    "Gibt die IDs der für die Suchanfrage relevanten Produkte zurück, absteigend nach Relevanz sortiert.",
  input_schema: {
    type: "object" as const,
    properties: {
      productIds: {
        type: "array" as const,
        items: { type: "string" as const },
        description: "IDs relevanter Produkte aus dem Katalog, relevantestes zuerst.",
      },
    },
    required: ["productIds"],
    additionalProperties: false,
  },
};

function buildCorpusBlock(corpus: CatalogCorpus): string {
  return JSON.stringify({
    produkte: corpus.products.map((p) => ({
      id: p.id,
      titel: p.title,
      text: p.text,
      bausteinIds: p.deliverableIds,
    })),
    bausteinGlossar: corpus.deliverables,
  });
}

export class ClaudeSearchProvider implements LlmSearchProvider {
  private readonly client: Anthropic;
  private readonly model: string;

  constructor() {
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    this.model = process.env.LLM_SEARCH_MODEL ?? DEFAULT_MODEL;
  }

  async rankProducts(query: string, corpus: CatalogCorpus): Promise<string[]> {
    const validProductIds = new Set(corpus.products.map((p) => p.id));

    const response = await this.client.messages.create(
      {
        model: this.model,
        max_tokens: MAX_OUTPUT_TOKENS,
        temperature: 0,
        system: SYSTEM_PROMPT,
        tools: [RANK_TOOL],
        tool_choice: { type: "tool", name: RANK_TOOL_NAME },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: buildCorpusBlock(corpus),
                cache_control: { type: "ephemeral" },
              },
              {
                type: "text",
                text: `Suchanfrage: "${query}"`,
              },
            ],
          },
        ],
      },
      { timeout: REQUEST_TIMEOUT_MS }
    );

    const toolUseBlock = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use" && block.name === RANK_TOOL_NAME
    );

    if (!toolUseBlock) {
      throw new Error("Claude hat keinen gültigen tool_use-Block zurückgegeben.");
    }

    const input = toolUseBlock.input as { productIds?: unknown };
    if (!Array.isArray(input.productIds)) {
      throw new Error("Claude-Antwort enthält kein productIds-Array.");
    }

    return input.productIds.filter((id): id is string => typeof id === "string" && validProductIds.has(id));
  }
}
