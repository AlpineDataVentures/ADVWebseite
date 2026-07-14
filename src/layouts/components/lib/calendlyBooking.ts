import type { InquiryPayload } from "./inquiry";
import { formatPrice, formatPriceLabel } from "./pricing";

/** Calendly-Custom-Questions: a1–a10 (Reihenfolge = Fragen im Event-Typ). */
export const CALENDLY_CUSTOM_ANSWER_KEYS = ["a1", "a2", "a3", "a4", "a5"] as const;

/** Praktische Obergrenze für Browser-URLs (Query-String inkl.). */
export const CALENDLY_MAX_URL_LENGTH = 7500;

/** Pro Calendly-Feld (laut Doku bis zu 10 Fragen). */
const CALENDLY_MAX_FIELD_LENGTH = 2000;

const CATALOG_FOOTER =
  "Hinweis: Auswahl über den ADV-Produktkatalog.";

const EMPTY_CART_NOTICE =
  "Keine Bausteine im Warenkorb – individuelle Anfrage / Beratung gewünscht.";

const TRUNCATION_NOTICE =
  "Hinweis: Gekürzte Zusammenfassung. Vollständige Details per E-Mail-Anfrage möglich.";

export interface CalendlyBookingResult {
  url: string;
  summary: string;
  truncated: boolean;
  /** Welche a-Parameter gesetzt wurden (z. B. a1, a2). */
  usedAnswerKeys: string[];
  /** Warenkorb war leer – individuelle Anfrage. */
  isIndividualInquiry: boolean;
}

function formatDeliverablePrice(price: number, pricePeriod?: string): string {
  return pricePeriod ? formatPriceLabel(price, pricePeriod) : formatPrice(price);
}

function formatParameterHint(
  params: InquiryPayload["deliverables"][number]["selectedParameters"]
): string {
  if (params.length === 0) return "Standard";
  return params.map((p) => `${p.label}: ${p.value}`).join("; ");
}

/** Kompakte, informative Zusammenfassung für Calendly (Standardformat). */
export function buildCalendlyConfigurationSummary(payload: InquiryPayload): string {
  const lines: string[] = [`Produkt: ${payload.productTitle}`];

  if (payload.deliverables.length === 0) {
    lines.push("");
    lines.push(EMPTY_CART_NOTICE);
    lines.push("");
    lines.push(CATALOG_FOOTER);
    return lines.join("\n");
  }

  lines.push("", "Bausteine:");

  payload.deliverables.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.name} | ${formatParameterHint(item.selectedParameters)} | ${formatDeliverablePrice(item.price, item.pricePeriod)}`
    );
  });

  if (typeof payload.estimatedTotalPrice === "number" && payload.estimatedTotalPrice > 0) {
    const hasMonthly = payload.deliverables.some((d) => d.pricePeriod);
    const totalLabel = hasMonthly ? "Gesamt (Einmal; Retainer/Monat separat)" : "Gesamt";
    lines.push("", `${totalLabel}: ${formatPrice(payload.estimatedTotalPrice)}`);
  }

  lines.push("", CATALOG_FOOTER);
  return lines.join("\n");
}

function splitIntoChunks(text: string, maxChunks: number): string[] {
  if (text.length <= CALENDLY_MAX_FIELD_LENGTH) {
    return [text];
  }

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0 && chunks.length < maxChunks) {
    if (remaining.length <= CALENDLY_MAX_FIELD_LENGTH) {
      chunks.push(remaining);
      break;
    }

    let splitAt = remaining.lastIndexOf("\n\n", CALENDLY_MAX_FIELD_LENGTH);
    if (splitAt < CALENDLY_MAX_FIELD_LENGTH * 0.4) {
      splitAt = remaining.lastIndexOf("\n", CALENDLY_MAX_FIELD_LENGTH);
    }
    if (splitAt < CALENDLY_MAX_FIELD_LENGTH * 0.25) {
      splitAt = CALENDLY_MAX_FIELD_LENGTH;
    }

    chunks.push(remaining.slice(0, splitAt).trimEnd());
    remaining = remaining.slice(splitAt).trimStart();
  }

  if (remaining.length > 0 && chunks.length > 0) {
    chunks[chunks.length - 1] = `${chunks[chunks.length - 1]}\n\n[… gekürzt]`;
  }

  return chunks;
}

function buildUrlWithAnswers(
  baseUrl: string,
  answers: Record<string, string>
): string {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(answers)) {
    if (value.trim()) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

/**
 * Erzeugt die Calendly-Buchungs-URL mit vorausgefüllter Konfiguration.
 *
 * Calendly-Event `adv-bestellung` benötigt mindestens eine Custom Question (→ a1).
 * Optional bis a3 für längere Konfigurationen (Reihenfolge der Fragen im Event).
 */
export function buildCalendlyBookingUrl(
  baseUrl: string,
  payload: InquiryPayload
): CalendlyBookingResult {
  const isIndividualInquiry = payload.deliverables.length === 0;
  let truncated = false;
  let summary = buildCalendlyConfigurationSummary(payload);

  const buildResult = (
    url: string,
    text: string,
    keys: string[],
    wasTruncated: boolean
  ): CalendlyBookingResult => ({
    url,
    summary: text,
    truncated: wasTruncated,
    usedAnswerKeys: keys,
    isIndividualInquiry,
  });

  const tryAssign = (text: string, wasTruncated = false): CalendlyBookingResult | null => {
    const chunks = splitIntoChunks(text, CALENDLY_CUSTOM_ANSWER_KEYS.length);
    const answers: Record<string, string> = {};
    chunks.forEach((chunk, index) => {
      answers[CALENDLY_CUSTOM_ANSWER_KEYS[index]] = chunk;
    });
    const url = buildUrlWithAnswers(baseUrl, answers);
    if (url.length <= CALENDLY_MAX_URL_LENGTH) {
      return buildResult(
        url,
        text,
        chunks.map((_, i) => CALENDLY_CUSTOM_ANSWER_KEYS[i]),
        wasTruncated
      );
    }
    return null;
  };

  const fullResult = tryAssign(summary);
  if (fullResult) {
    return fullResult;
  }

  truncated = true;
  // Fallback: nur Name + Preis je Baustein
  const minimalLines = [
    `Produkt: ${payload.productTitle}`,
    "",
    ...(payload.deliverables.length === 0
      ? [EMPTY_CART_NOTICE]
      : payload.deliverables.map(
          (item, i) =>
            `${i + 1}. ${item.name} – ${formatDeliverablePrice(item.price, item.pricePeriod)}`
        )),
    "",
    TRUNCATION_NOTICE,
    CATALOG_FOOTER,
  ];
  summary = minimalLines.join("\n");

  const minimalResult = tryAssign(summary, true);
  if (minimalResult) {
    console.warn("[Calendly] Kompakte Fallback-Zusammenfassung verwendet.");
    return minimalResult;
  }

  console.error("[Calendly] Prefill nicht möglich – URL zu lang. Öffne Basis-URL.");
  return {
    url: baseUrl,
    summary,
    truncated: true,
    usedAnswerKeys: [],
    isIndividualInquiry,
  };
}
