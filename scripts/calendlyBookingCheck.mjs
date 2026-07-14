/**
 * Smoke-Tests für Calendly-Buchungs-URLs (Encoding, Mehrfach-Bausteine, Retainer, Sonderzeichen).
 * Ausführung: node scripts/calendlyBookingCheck.mjs
 */

const BASE_URL = "https://calendly.com/andreas-klostermann-alpinedata/adv-bestellung";
const MAX_URL = 7500;

function formatPrice(price) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function buildSummary(payload) {
  const lines = [`Produkt: ${payload.productTitle}`];
  if (payload.deliverables.length === 0) {
    lines.push("", "Keine Bausteine im Warenkorb – individuelle Anfrage / Beratung gewünscht.", "", "Hinweis: Auswahl über den ADV-Produktkatalog.");
    return lines.join("\n");
  }
  lines.push("", "Bausteine:");
  payload.deliverables.forEach((item, index) => {
    const paramHint =
      item.selectedParameters?.length > 0
        ? item.selectedParameters.map((p) => `${p.label}: ${p.value}`).join("; ")
        : "Standard";
    const priceText = item.pricePeriod
      ? `${formatPrice(item.price)} ${item.pricePeriod}`
      : formatPrice(item.price);
    lines.push(`${index + 1}. ${item.name} | ${paramHint} | ${priceText}`);
  });
  lines.push("", `Gesamt: ${formatPrice(payload.estimatedTotalPrice)}`, "", "Hinweis: Auswahl über den ADV-Produktkatalog.");
  return lines.join("\n");
}

function buildUrl(summary) {
  const url = new URL(BASE_URL);
  url.searchParams.set("a4", summary);
  return url.toString();
}

const tests = [
  {
    name: "Fall A – ein Baustein (KPI-Workshop)",
    payload: {
      productTitle: "Management Dashboard",
      estimatedTotalPrice: 7600,
      deliverables: [
        {
          name: "KPI-Workshop und Kennzahlenkonzept",
          price: 7600,
          selectedParameters: [
            { label: "Unternehmensgröße", value: "Klein & Mittelstand (bis 250 MA)" },
            { label: "Geschwindigkeit", value: "Standard (normale Bearbeitungszeit)" },
          ],
        },
      ],
    },
  },
  {
    name: "Fall B – drei Bausteine",
    payload: {
      productTitle: "Management Dashboard",
      estimatedTotalPrice: 24400,
      deliverables: [
        {
          name: "KPI-Workshop und Kennzahlenkonzept",
          price: 7600,
          selectedParameters: [{ label: "Unternehmensgröße", value: "Mittelgroß (250-1000 MA)" }],
        },
        {
          name: "BI Fix & Fertig Setup",
          price: 10900,
          selectedParameters: [{ label: "Anzahl Quellsysteme", value: "3-5 Quellsysteme" }],
        },
        {
          name: "Erster Management-Bericht",
          price: 5900,
          selectedParameters: [{ label: "Komplexität der Berichte", value: "Basis" }],
        },
      ],
    },
  },
  {
    name: "Fall C – Retainer",
    payload: {
      productTitle: "Externer Datenschutzbeauftragter",
      estimatedTotalPrice: 8000,
      deliverables: [
        {
          name: "Externer Datenschutzbeauftragter – Retainer",
          price: 8000,
          pricePeriod: "pro Monat",
          selectedParameters: [
            { label: "Unternehmensgröße", value: "Großunternehmen (1000+ MA)" },
            { label: "Betreuungsumfang", value: "Intensive Betreuung" },
          ],
        },
      ],
    },
  },
  {
    name: "Fall D – Sonderzeichen",
    payload: {
      productTitle: "Compliance & Datenschutz (Müller & Söhne)",
      estimatedTotalPrice: 1200,
      deliverables: [
        {
          name: "Externer Datenschutzbeauftragter – Retainer",
          price: 1200,
          pricePeriod: "pro Monat",
          selectedParameters: [
            { label: "Betreuungsumfang", value: "Intensive Betreuung / 24×7" },
          ],
        },
      ],
    },
  },
];

let failed = 0;

for (const test of tests) {
  const summary = buildSummary({
    ...test.payload,
    deliverables: test.payload.deliverables.map((d) => ({
      ...d,
      selectedParameters: d.selectedParameters ?? [],
    })),
  });
  const url = buildUrl(summary);
  const decoded = new URL(url).searchParams.get("a4") ?? "";
  const ok =
    url.startsWith(BASE_URL) &&
    url.length <= MAX_URL &&
    url.includes("a4=") &&
    decoded.includes("€") &&
    !decoded.includes("<") &&
    test.payload.deliverables.every((d) => decoded.includes(d.name));

  console.log(`${ok ? "✓" : "✗"} ${test.name}`);
  console.log(`   URL-Länge: ${url.length}`);
  if (!ok) failed += 1;
}

// Fall E – viele Bausteine
const manyDeliverables = Array.from({ length: 8 }, (_, i) => ({
  name: `Produktbaustein ${i + 1} – Test & Analyse`,
  price: 7600 + i * 100,
  selectedParameters: [
    { label: "Unternehmensgröße", value: "Mittelgroß (250-1000 MA)" },
    { label: "Geschwindigkeit", value: "Standard" },
  ],
}));
const longSummary = buildSummary({
  productTitle: "Große Konfiguration",
  estimatedTotalPrice: 65000,
  deliverables: manyDeliverables,
});
const longUrl = buildUrl(longSummary);
const longOk = longUrl.length <= MAX_URL;
console.log(`${longOk ? "✓" : "✗"} Fall E – lange Konfiguration (URL-Länge ${longUrl.length})`);
if (!longOk) failed += 1;

if (failed > 0) {
  console.error(`\n${failed} Test(s) fehlgeschlagen.`);
  process.exit(1);
}

console.log("\nAlle Calendly-URL-Smoke-Tests bestanden.");
console.log("\nBeispiel-URL (Fall A, gekürzt):");
const exampleUrl = buildUrl(tests[0].payload.deliverables.length ? buildSummary(tests[0].payload) : "");
console.log(exampleUrl.slice(0, 120) + "…");
