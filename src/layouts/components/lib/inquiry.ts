import { formatPrice } from "./pricing";

export interface InquiryDeliverableItem {
  name: string;
  price: number;
  selectedParameters: Array<{ label: string; value: string }>;
}

export interface InquiryPayload {
  useCaseTitle: string;
  deliverables: InquiryDeliverableItem[];
  estimatedTotalPrice?: number;
}

export function buildInquirySubject(useCaseTitle: string): string {
  return `Anfrage Produktkatalog – ${useCaseTitle}`;
}

export function buildInquiryText(payload: InquiryPayload): string {
  const lines: string[] = [];
  lines.push("Guten Tag,");
  lines.push("");
  lines.push("ich möchte eine Anfrage zu folgender Konfiguration aus dem Produktkatalog stellen:");
  lines.push("");
  lines.push(`Use Case: ${payload.useCaseTitle}`);
  lines.push("");
  lines.push("Ausgewählte Bausteine:");

  payload.deliverables.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name} (${formatPrice(item.price)})`);
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
