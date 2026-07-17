import type { Product } from "../data/useCases";
import { products } from "../data/useCases";
import { getProductDetailViewModel, type ProductDetailViewModel } from "../data/productDetailMeta";

export const META_DESCRIPTION_MIN_LENGTH = 110;
export const META_DESCRIPTION_MAX_LENGTH = 160;
export const META_DESCRIPTION_IDEAL_LENGTH = 145;

/** Meta Description der Katalog-Hauptseite `/produktkatalog/`. */
export const CATALOG_INDEX_META_DESCRIPTION =
  "Finden Sie Daten-, BI- und KI-Projekte im Katalog, konfigurieren Sie Bausteine und erhalten Sie eine transparente Preiseinschätzung – dann Anfrage oder Termin.";

/**
 * Explizite SEO-Beschreibungen (Priorität 1).
 * Nur setzen, wenn die automatische Generierung nicht ausreicht.
 */
const EXPLICIT_PRODUCT_META_DESCRIPTIONS: Record<string, string> = {
  "externer-datenschutzbeauftragter":
    "Als externer Datenschutzbeauftragter begleiten wir Sie bei laufender Beratung, Betroffenenanfragen und der Umsetzung datenschutzrelevanter Prozesse.",
};

const DANGLING_ENDING =
  /\b(mit|und|oder|für|im|am|zur|zum|von|bei|als|sowie|inkl|u\. a)\.$/i;

function toLowerFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function ensurePeriod(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  return trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
}

function joinAudience(bestFor: string[]): string {
  const items = bestFor.filter(Boolean).slice(0, 2);
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items[0]} und ${items[1]}`;
}

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text.trim();
}

function rephraseShortAsAction(short: string, title: string): string {
  const base = short.replace(/\.$/, "").trim();
  if (base.toLowerCase().startsWith("wir ")) {
    return ensurePeriod(base);
  }
  if (
    /^(Entwicklung|Definition|Aufbau|Einführung|Konzeption|Umstellung|Bewertung|Stärkung|Schulung|Unterstützung|Etablierung|Einrichtung|Automatische|Zentrale|Moderne|Vorhersage|Echtzeit|TÜV|Komplettes|Professionelle)/i.test(
      base
    )
  ) {
    return ensurePeriod(`Wir realisieren ${toLowerFirst(base)}`);
  }
  if (base.length >= META_DESCRIPTION_MIN_LENGTH - 20) {
    return ensurePeriod(base);
  }
  return ensurePeriod(`Für ${title}: ${toLowerFirst(base)}`);
}

function buildCandidates(product: Product, details: ProductDetailViewModel): string[] {
  const short = normalizeWhitespace(product.short);
  const shortLead = normalizeWhitespace(firstSentence(short));
  const problem = normalizeWhitespace(details.problem).replace(/\.$/, "");
  const result = normalizeWhitespace(details.typicalResult).replace(/\.$/, "");
  const output = normalizeWhitespace(product.outputs[0] ?? "").replace(/\.$/, "");
  const secondOutput = normalizeWhitespace(product.outputs[1] ?? "").replace(/\.$/, "");
  const audience = joinAudience(details.bestFor);
  const actionShort = rephraseShortAsAction(short, product.title);

  const candidates = new Set<string>();

  if (
    shortLead.length >= META_DESCRIPTION_MIN_LENGTH &&
    shortLead.length <= META_DESCRIPTION_MAX_LENGTH
  ) {
    candidates.add(shortLead);
  }

  if (actionShort.length <= META_DESCRIPTION_MAX_LENGTH) {
    candidates.add(actionShort);
  }

  if (audience && result) {
    candidates.add(
      ensurePeriod(`Wir unterstützen ${audience} dabei, ${toLowerFirst(result)}`)
    );
  }

  if (problem && result) {
    candidates.add(
      ensurePeriod(
        `Wir adressieren ${toLowerFirst(problem)} und ermöglichen, dass ${toLowerFirst(result)}`
      )
    );
  }

  if (audience && output) {
    candidates.add(
      ensurePeriod(
        `${product.title} mit Fokus auf ${toLowerFirst(output)}. Geeignet für ${audience}`
      )
    );
  }

  if (output && result) {
    candidates.add(
      ensurePeriod(
        `${product.title}: ${toLowerFirst(output)}. Ziel ist ${toLowerFirst(result)}`
      )
    );
  }

  if (output && secondOutput) {
    candidates.add(
      ensurePeriod(
        `Wir liefern ${toLowerFirst(output)} und ${toLowerFirst(secondOutput)} im Rahmen von ${product.title}`
      )
    );
  }

  if (actionShort.length <= META_DESCRIPTION_MAX_LENGTH && audience) {
    candidates.add(
      ensurePeriod(`${actionShort.replace(/\.$/, "")}. Geeignet für ${audience}`)
    );
  }

  if (short.length > META_DESCRIPTION_MAX_LENGTH && audience && output) {
    candidates.add(
      ensurePeriod(
        `${product.title} als Retainer: ${toLowerFirst(output)} und Begleitung für ${audience}`
      )
    );
  }

  return [...candidates].map(normalizeWhitespace);
}

function scoreLength(length: number): number {
  return Math.abs(length - META_DESCRIPTION_IDEAL_LENGTH);
}

function pickBestCandidate(candidates: string[]): string {
  const inRange = candidates.filter(
    (c) => c.length >= META_DESCRIPTION_MIN_LENGTH && c.length <= META_DESCRIPTION_MAX_LENGTH
  );
  if (inRange.length === 0) {
    return candidates.sort((a, b) => scoreLength(a.length) - scoreLength(b.length))[0] ?? "";
  }
  return inRange.sort((a, b) => scoreLength(a.length) - scoreLength(b.length))[0];
}

function removeTrailingClauses(text: string): string {
  let result = text.trim();
  const clauses = [
    /\s+Geeignet für[^.]*\.?$/,
    /\s+Lieferumfang u\. a\.:[^.]*\.?$/,
    /\s+So erreichen Sie[^.]*\.?$/,
    /\s+Für [^.]*\.?$/,
  ];
  for (const pattern of clauses) {
    if (result.length > META_DESCRIPTION_MAX_LENGTH) {
      result = result.replace(pattern, ".").trim();
    }
  }
  return ensurePeriod(result);
}

function trimAtSentenceBoundary(text: string, maxLength: number): string {
  let result = text.trim();
  while (result.length > maxLength && result.includes(". ")) {
    const lastSentenceBreak = result.lastIndexOf(". ");
    if (lastSentenceBreak < META_DESCRIPTION_MIN_LENGTH - 20) break;
    result = result.slice(0, lastSentenceBreak + 1).trim();
  }
  return result;
}

function hasDanglingEnding(text: string): boolean {
  return DANGLING_ENDING.test(text.trim());
}

function fitToRange(text: string, product: Product, details: ProductDetailViewModel): string {
  let result = normalizeWhitespace(ensurePeriod(text));

  result = trimAtSentenceBoundary(result, META_DESCRIPTION_MAX_LENGTH);
  result = removeTrailingClauses(result);
  result = trimAtSentenceBoundary(result, META_DESCRIPTION_MAX_LENGTH);

  const audience = joinAudience(details.bestFor);
  if (result.length < META_DESCRIPTION_MIN_LENGTH && audience) {
    result = ensurePeriod(`${result.replace(/\.$/, "")}. Geeignet für ${audience}`);
  }

  const resultText = normalizeWhitespace(details.typicalResult).replace(/\.$/, "");
  if (result.length < META_DESCRIPTION_MIN_LENGTH && resultText) {
    result = ensurePeriod(`${result.replace(/\.$/, "")}. Ziel: ${toLowerFirst(resultText)}`);
  }

  const output = normalizeWhitespace(product.outputs[0] ?? "").replace(/\.$/, "");
  if (result.length < META_DESCRIPTION_MIN_LENGTH && output) {
    result = ensurePeriod(`${result.replace(/\.$/, "")}. Inkl. ${toLowerFirst(output)}`);
  }

  if (result.length > META_DESCRIPTION_MAX_LENGTH || hasDanglingEnding(result)) {
    result = trimAtSentenceBoundary(result, META_DESCRIPTION_MAX_LENGTH);
  }

  if (result.length > META_DESCRIPTION_MAX_LENGTH) {
    const rebuilt = pickBestCandidate(buildCandidates(product, details));
    if (rebuilt && rebuilt.length >= META_DESCRIPTION_MIN_LENGTH && rebuilt.length <= META_DESCRIPTION_MAX_LENGTH) {
      result = rebuilt;
    }
  }

  return result;
}

/** Erzeugt eine Meta Description für eine Produktkatalog-Produktseite. */
export function buildProductCatalogMetaDescription(product: Product): string {
  const explicit = EXPLICIT_PRODUCT_META_DESCRIPTIONS[product.id]?.trim();
  if (explicit) {
    return fitToRange(explicit, product, getProductDetailViewModel(product));
  }

  const details = getProductDetailViewModel(product);
  const candidates = buildCandidates(product, details);
  const best = pickBestCandidate(candidates);
  return fitToRange(best || firstSentence(product.short), product, details);
}

/** Stellt sicher, dass alle Produkt-Meta-Descriptions eindeutig sind. */
export function ensureUniqueProductMetaDescriptions(
  entries: Array<{ id: string; description: string; product: Product }>
): Map<string, string> {
  const result = new Map<string, string>();
  const used = new Map<string, string[]>();

  for (const entry of entries) {
    let description = entry.description;
    const existing = used.get(description) ?? [];

    if (existing.length > 0) {
      const suffix = ` – ${entry.product.title}`;
      const withTitle = normalizeWhitespace(`${description.replace(/\.$/, "")}${suffix}.`);
      if (
        withTitle.length >= META_DESCRIPTION_MIN_LENGTH &&
        withTitle.length <= META_DESCRIPTION_MAX_LENGTH
      ) {
        description = withTitle;
      } else {
        description = fitToRange(
          `${description.replace(/\.$/, "")}. Schwerpunkt: ${entry.product.title}`,
          entry.product,
          getProductDetailViewModel(entry.product)
        );
      }
    }

    result.set(entry.id, description);
    used.set(description, [...(used.get(description) ?? []), entry.id]);
  }

  return result;
}

export function validateMetaDescription(description: string): string[] {
  const issues: string[] = [];
  if (!description.trim()) issues.push("fehlend");
  if (description.length < META_DESCRIPTION_MIN_LENGTH) issues.push("zu kurz");
  if (description.length > META_DESCRIPTION_MAX_LENGTH) issues.push("zu lang");
  if (description.endsWith("...")) issues.push("abgeschnitten");
  if (hasDanglingEnding(description)) issues.push("unvollständig");
  return issues;
}

let cachedProductMetaDescriptions: Map<string, string> | null = null;

/** Alle Produkt-Meta-Descriptions (mit Eindeutigkeits-Sicherung). */
export function getAllProductCatalogMetaDescriptions(): Map<string, string> {
  if (cachedProductMetaDescriptions) return cachedProductMetaDescriptions;

  const entries = products.map((product) => ({
    id: product.id,
    description: buildProductCatalogMetaDescription(product),
    product,
  }));

  cachedProductMetaDescriptions = ensureUniqueProductMetaDescriptions(entries);
  return cachedProductMetaDescriptions;
}

export function getProductCatalogMetaDescriptionForProduct(product: Product): string {
  return getAllProductCatalogMetaDescriptions().get(product.id) ?? buildProductCatalogMetaDescription(product);
}
