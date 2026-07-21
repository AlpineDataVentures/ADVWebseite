import type { InquiryPayload } from "./inquiry";
import { formatPrice, formatPriceLabel } from "./pricing";

/**
 * Calendly Custom Questions im Event `adv-bestellung` (Reihenfolge im Event):
 * a1 – Wann wollen Sie mit dem Projekt starten?
 * a2 – Welche Stakeholder sind von dem Projekt betroffen?
 * a3 – Bis wann soll das Projekt abgeschlossen sein?
 * a4 – Projekt-/Bestellkonfiguration aus dem ADV-Produktkatalog  ← Prefill-Ziel
 */
export const CALENDLY_CONFIGURATION_ANSWER_KEY = "a4";

/** Keys für Aufteilung sehr langer Konfigurationen (nur a4, sofern keine weiteren Freitextfragen). */
export const CALENDLY_CONFIG_ANSWER_KEYS = ["a4"] as const;

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
  /** Welche a-Parameter gesetzt wurden (z. B. a4). */
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

function formatDeliverableLine(
  item: InquiryPayload["deliverables"][number],
  index: number
): string {
  const productPrefix = item.productTitle ? `[${item.productTitle}] ` : "";
  return `${index + 1}. ${productPrefix}${item.name} | ${formatParameterHint(item.selectedParameters)} | ${formatDeliverablePrice(item.price, item.pricePeriod)}`;
}

function buildSummaryHeader(payload: InquiryPayload): string {
  if (payload.deliverables.length === 0) {
    return `Produkt: ${payload.productTitle}`;
  }
  const titles = [
    ...new Set(payload.deliverables.map((item) => item.productTitle).filter(Boolean)),
  ] as string[];
  if (titles.length <= 1) {
    return `Produkt: ${titles[0] ?? payload.productTitle}`;
  }
  return `Produkte: ${titles.join(", ")}`;
}

/** Kompakte, informative Zusammenfassung für Calendly (Standardformat). */
export function buildCalendlyConfigurationSummary(payload: InquiryPayload): string {
  const lines: string[] = [buildSummaryHeader(payload)];

  if (payload.deliverables.length === 0) {
    lines.push("");
    lines.push(EMPTY_CART_NOTICE);
    lines.push("");
    lines.push(CATALOG_FOOTER);
    return lines.join("\n");
  }

  lines.push("", "Bausteine:");

  payload.deliverables.forEach((item, index) => {
    lines.push(formatDeliverableLine(item, index));
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
 * Erzeugt die Calendly-Buchungs-URL mit vorausgefüllter Konfiguration in a4.
 * a1–a3 bleiben frei für die Angaben des Nutzers (Start, Stakeholder, Deadline).
 */
export function buildCalendlyBookingUrl(
  baseUrl: string,
  payload: InquiryPayload
): CalendlyBookingResult {
  const isIndividualInquiry = payload.deliverables.length === 0;
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
    const chunks = splitIntoChunks(text, CALENDLY_CONFIG_ANSWER_KEYS.length);
    const answers: Record<string, string> = {};
    chunks.forEach((chunk, index) => {
      answers[CALENDLY_CONFIG_ANSWER_KEYS[index]] = chunk;
    });
    const url = buildUrlWithAnswers(baseUrl, answers);
    if (url.length <= CALENDLY_MAX_URL_LENGTH) {
      return buildResult(
        url,
        text,
        chunks.map((_, i) => CALENDLY_CONFIG_ANSWER_KEYS[i]),
        wasTruncated
      );
    }
    return null;
  };

  const fullResult = tryAssign(summary);
  if (fullResult) {
    return fullResult;
  }

  // Fallback: nur Name + Preis je Baustein
  const minimalLines = [
    buildSummaryHeader(payload),
    "",
    ...(payload.deliverables.length === 0
      ? [EMPTY_CART_NOTICE]
      : payload.deliverables.map((item, i) => {
        const productPrefix = item.productTitle ? `[${item.productTitle}] ` : "";
        return `${i + 1}. ${productPrefix}${item.name} – ${formatDeliverablePrice(item.price, item.pricePeriod)}`;
      })),
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
