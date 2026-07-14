import { formatPrice, formatPriceLabel, getDeliverableById } from "./pricing";
import { getParameterByKey } from "../data/parameters";

export interface InquiryDeliverableItem {
  name: string;
  price: number;
  /** z. B. „pro Monat“ für Retainer-Bausteine */
  pricePeriod?: string;
  selectedParameters: Array<{ label: string; value: string }>;
}

export interface InquiryPayload {
  productTitle: string;
  deliverables: InquiryDeliverableItem[];
  estimatedTotalPrice?: number;
}

export interface CartInquirySourceItem {
  deliverableId: string;
  deliverableName: string;
  price: number;
  pricePeriod?: string;
  parameters: Record<string, string | number>;
}

/** Löst Parameter-Labels für Anfrage/Calendly auf (nur relevante Baustein-Parameter). */
export function resolveInquiryParameters(
  deliverableId: string,
  parameters: Record<string, string | number>
): Array<{ label: string; value: string }> {
  const deliverable = getDeliverableById(deliverableId);
  const paramKeys =
    deliverable?.parameters && deliverable.parameters.length > 0
      ? deliverable.parameters
      : Object.keys(parameters);

  return paramKeys
    .filter((key) => {
      const rawValue = parameters[key];
      return rawValue !== undefined && rawValue !== null && String(rawValue).trim() !== "";
    })
    .map((key) => {
      const parameter = getParameterByKey(key);
      const rawValue = parameters[key];
      const optionLabel = parameter?.options?.find((opt) => opt.value === String(rawValue))?.label;
      return {
        label: parameter?.label ?? key,
        value: optionLabel ?? String(rawValue),
      };
    });
}

/** Gemeinsame Payload für E-Mail-Anfrage und Calendly (eine Datenquelle). */
export function buildInquiryPayloadFromCart(options: {
  productTitle: string;
  items: CartInquirySourceItem[];
  estimatedTotalPrice?: number;
}): InquiryPayload {
  return {
    productTitle: options.productTitle,
    deliverables: options.items.map((item) => ({
      name: item.deliverableName,
      price: item.price,
      pricePeriod: item.pricePeriod,
      selectedParameters: resolveInquiryParameters(item.deliverableId, item.parameters),
    })),
    estimatedTotalPrice: options.estimatedTotalPrice,
  };
}

function formatDeliverablePriceForInquiry(price: number, pricePeriod?: string): string {
  return pricePeriod ? formatPriceLabel(price, pricePeriod) : formatPrice(price);
}

export function buildInquirySubject(productTitle: string): string {
  return `Anfrage Produktkatalog – ${productTitle}`;
}

export function buildInquiryText(payload: InquiryPayload): string {
  const lines: string[] = [];
  lines.push("Guten Tag,");
  lines.push("");
  lines.push("ich möchte eine Anfrage zu folgender Konfiguration aus dem Produktkatalog stellen:");
  lines.push("");
  lines.push(`Produkt: ${payload.productTitle}`);
  lines.push("");
  lines.push("Ausgewählte Produktbausteine:");

  payload.deliverables.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.name} (${formatDeliverablePriceForInquiry(item.price, item.pricePeriod)})`
    );
    if (item.selectedParameters.length > 0) {
      lines.push("   Konfigurationsparameter:");
      item.selectedParameters.forEach((param) => {
        lines.push(`   - ${param.label}: ${param.value}`);
      });
    } else {
      lines.push("   Konfigurationsparameter: Standard");
    }
  });

  lines.push("");
  if (typeof payload.estimatedTotalPrice === "number" && payload.estimatedTotalPrice > 0) {
    lines.push(`Geschätzter Gesamtpreis (aktuelle Konfiguration): ${formatPrice(payload.estimatedTotalPrice)}`);
  } else {
    lines.push("Geschätzter Gesamtpreis: aktuell nicht verfügbar");
  }
  lines.push("");
  lines.push("Bitte melden Sie sich für ein Beratungsgespräch.");
  lines.push("");
  lines.push("Vielen Dank.");

  return lines.join("\n");
}

export function buildMailtoLink(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export interface CustomInquiryFields {
  companySize: string;
  situation: string;
  goal: string;
  systems: string;
  notes: string;
}

/** Freitext-Anfrage für custom/hybrid-Produkte (individuelle Anfrage). */
export function buildCustomInquiryText(
  productTitle: string,
  fields: CustomInquiryFields,
  isAddon = false
): string {
  const lines: string[] = [];
  lines.push("Guten Tag,");
  lines.push("");
  lines.push(
    isAddon
      ? `ich interessiere mich für „${productTitle}“ und möchte eine individuelle Ergänzung anfragen:`
      : `ich möchte eine individuelle Anfrage zu „${productTitle}“ stellen:`
  );
  lines.push("");
  lines.push(`Unternehmensgröße: ${fields.companySize || "—"}`);
  lines.push(`Ausgangssituation: ${fields.situation || "—"}`);
  lines.push(`Ziel / gewünschtes Ergebnis: ${fields.goal || "—"}`);
  lines.push(`Vorhandene Systeme / Datenquellen: ${fields.systems || "—"}`);
  lines.push(`Weitere Anforderungen: ${fields.notes || "—"}`);
  lines.push("");
  lines.push("Bitte melden Sie sich für ein Beratungsgespräch.");
  lines.push("");
  lines.push("Vielen Dank.");
  return lines.join("\n");
}
