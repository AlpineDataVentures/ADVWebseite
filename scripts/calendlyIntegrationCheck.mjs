/**
 * Integrationstest gegen die echten TypeScript-Module (via tsx).
 * Ausführung: npx tsx scripts/calendlyIntegrationCheck.mjs
 */
import { buildInquiryPayloadFromCart } from "../src/layouts/components/lib/inquiry.ts";
import {
  buildCalendlyBookingUrl,
  buildCalendlyConfigurationSummary,
} from "../src/layouts/components/lib/calendlyBooking.ts";

const BASE = "https://calendly.com/andreas-klostermann-alpinedata/adv-bestellung";

const multi = buildInquiryPayloadFromCart({
  productTitle: "Management Dashboard",
  estimatedTotalPrice: 24400,
  items: [
    {
      deliverableId: "kpi_workshop",
      deliverableName: "KPI-Workshop und Kennzahlenkonzept",
      price: 9900,
      parameters: { companySize: "MidMarket" },
    },
    {
      deliverableId: "bi_fix_fertig",
      deliverableName: "BI Fix & Fertig Setup",
      price: 10900,
      parameters: { sourceSystemCount: "3-5" },
    },
    {
      deliverableId: "first_mgmt_report",
      deliverableName: "Erster Management-Bericht",
      price: 3600,
      parameters: { reportComplexity: "basic" },
    },
  ],
});
const multiUrl = buildCalendlyBookingUrl(BASE, multi);
console.log("Fall B:", multi.deliverables.length, "Bausteine, truncated:", multiUrl.truncated);

const retainer = buildInquiryPayloadFromCart({
  productTitle: "Externer Datenschutzbeauftragter",
  estimatedTotalPrice: 8000,
  items: [
    {
      deliverableId: "dsb_retainer",
      deliverableName: "Externer Datenschutzbeauftragter – Retainer",
      price: 8000,
      pricePeriod: "pro Monat",
      parameters: { dsbCompanySize: "Enterprise", dsbCareScope: "Intensive" },
    },
  ],
});
const retainerSummary = buildCalendlyConfigurationSummary(retainer);
console.log("Fall C pro Monat:", retainerSummary.includes("pro Monat"));

const special = buildCalendlyConfigurationSummary(
  buildInquiryPayloadFromCart({
    productTitle: "Compliance & Datenschutz (Müller/Söhne)",
    estimatedTotalPrice: 1200,
    items: [
      {
        deliverableId: "dsb_retainer",
        deliverableName: "Externer Datenschutzbeauftragter – Retainer",
        price: 1200,
        pricePeriod: "pro Monat",
        parameters: { dsbCareScope: "Intensive" },
      },
    ],
  })
);
console.log("Fall D Umlaut/Euro/&:", special.includes("Müller"), special.includes("€"), special.includes("&"));

const manyItems = Array.from({ length: 12 }, (_, i) => ({
  deliverableId: "kpi_workshop",
  deliverableName: `Baustein ${i + 1} – Test & Analyse/Konfig`,
  price: 7600 + i * 100,
  parameters: { companySize: "MidMarket", speed: "Standard" },
}));
const long = buildCalendlyBookingUrl(
  BASE,
  buildInquiryPayloadFromCart({
    productTitle: "Große Konfiguration",
    estimatedTotalPrice: 95000,
    items: manyItems,
  })
);
console.log("Fall E URL-Länge:", long.url.length, "truncated:", long.truncated, "keys:", long.usedAnswerKeys.join(","));

console.log("\nBeispiel-Zusammenfassung (Fall A):");
const single = buildCalendlyConfigurationSummary(
  buildInquiryPayloadFromCart({
    productTitle: "Management Dashboard",
    estimatedTotalPrice: 7600,
    items: [
      {
        deliverableId: "kpi_workshop",
        deliverableName: "KPI-Workshop und Kennzahlenkonzept",
        price: 7600,
        parameters: { companySize: "SMB", speed: "Standard" },
      },
    ],
  })
);
console.log(single);
