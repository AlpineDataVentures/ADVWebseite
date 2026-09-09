import { Document, Page, View, Text, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import { loadImageAsDataUrl } from "../../lib/imageDataUrl";

export interface ProjectSheetPdfItem {
  name: string;
  family: string;
  priceLabel: string;
  shortDescription: string;
  paramSummary: Array<{ label: string; value: string }>;
  deliverablesOutput: string[];
  assumptions: string[];
  outOfScope: string[];
}

export interface ProjectSheetPdfData {
  product: {
    title: string;
    short: string;
    problem: string;
    typicalResult: string;
  } | null;
  items: ProjectSheetPdfItem[];
  totalPriceLabel: string;
}

const GREEN = "#16a34a";
const TEXT = "#1f2937";
const TEXT_LIGHT = "#6b7280";
const BORDER = "#e5e7eb";

const styles = StyleSheet.create({
  page: {
    paddingTop: 96,
    paddingBottom: 72,
    paddingHorizontal: 40,
    fontSize: 9.5,
    color: TEXT,
    fontFamily: "Helvetica",
  },
  header: {
    position: "absolute",
    top: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 12,
  },
  logo: { width: 130, height: 33 },
  headerAddress: { textAlign: "right" },
  headerAddressText: { fontSize: 8, color: TEXT_LIGHT, lineHeight: 1.4 },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 8,
  },
  footerText: { fontSize: 7, color: TEXT_LIGHT, lineHeight: 1.4 },
  pageNumber: { position: "absolute", bottom: 24, right: 40, fontSize: 7, color: TEXT_LIGHT },
  titleBlock: { marginBottom: 16 },
  title: { fontSize: 20, fontFamily: "Helvetica-Bold", color: TEXT },
  subtitle: { fontSize: 13, marginTop: 2, color: TEXT },
  meta: { fontSize: 8, marginTop: 4, color: TEXT_LIGHT },
  paragraph: { fontSize: 9.5, lineHeight: 1.5, marginBottom: 16, color: TEXT },
  paragraphSmall: { fontSize: 9, lineHeight: 1.45, color: TEXT_LIGHT, marginBottom: 6 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 12, fontFamily: "Helvetica-Bold", color: TEXT, marginBottom: 6 },
  card: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 4,
    padding: 12,
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  costRowBorder: { borderTopWidth: 1, borderTopColor: BORDER },
  costName: { fontSize: 9.5, color: TEXT },
  costPrice: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: TEXT },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: BORDER,
    marginTop: 4,
    paddingTop: 8,
  },
  totalLabel: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: TEXT },
  totalValue: { fontSize: 12, fontFamily: "Helvetica-Bold", color: GREEN },
  disclaimer: { fontSize: 7.5, color: TEXT_LIGHT, marginTop: 8, lineHeight: 1.4 },
  projectTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", color: TEXT, marginBottom: 4 },
  twoCol: { flexDirection: "row", gap: 16, marginTop: 8, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 8 },
  threeCol: { flexDirection: "row", gap: 14, marginTop: 8 },
  col: { flex: 1 },
  label: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: TEXT_LIGHT, marginBottom: 3, textTransform: "uppercase" },
  value: { fontSize: 9, color: TEXT, lineHeight: 1.4 },
  itemCard: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
  },
  itemName: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: TEXT },
  itemFamily: { fontSize: 7.5, color: TEXT_LIGHT, marginTop: 1, marginBottom: 6 },
  bullet: { fontSize: 8, color: TEXT, lineHeight: 1.4, marginBottom: 2 },
  paramBadgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 4 },
  paramBadge: {
    fontSize: 7.5,
    color: TEXT,
    backgroundColor: "#f3f4f6",
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  contactCard: { flexDirection: "row", gap: 14, alignItems: "center" },
  contactPhoto: { width: 64, height: 64, borderRadius: 32, objectFit: "cover" },
  contactName: { fontSize: 11, fontFamily: "Helvetica-Bold", color: TEXT },
  contactRole: { fontSize: 8.5, color: TEXT_LIGHT, marginBottom: 4 },
  contactDetail: { fontSize: 8.5, color: TEXT, marginBottom: 1 },
  contactNote: { fontSize: 8.5, color: TEXT_LIGHT, marginTop: 6, lineHeight: 1.4 },
});

function ItemCard({ item }: { item: ProjectSheetPdfItem }) {
  return (
    <View style={styles.itemCard} wrap={false}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemFamily}>{item.family}</Text>
      <Text style={styles.paragraphSmall}>{item.shortDescription}</Text>

      {item.paramSummary.length > 0 && (
        <View style={{ marginBottom: 6 }}>
          <Text style={styles.label}>Ausgewählte Konfiguration</Text>
          <View style={styles.paramBadgeRow}>
            {item.paramSummary.map((param) => (
              <Text key={param.label} style={styles.paramBadge}>
                {param.label}: {param.value}
              </Text>
            ))}
          </View>
        </View>
      )}

      <View style={styles.threeCol}>
        {item.deliverablesOutput.length > 0 && (
          <View style={styles.col}>
            <Text style={styles.label}>Lieferumfang</Text>
            {item.deliverablesOutput.map((output) => (
              <Text key={output} style={styles.bullet}>
                • {output}
              </Text>
            ))}
          </View>
        )}
        {item.assumptions.length > 0 && (
          <View style={styles.col}>
            <Text style={styles.label}>Voraussetzungen</Text>
            {item.assumptions.map((assumption) => (
              <Text key={assumption} style={styles.bullet}>
                • {assumption}
              </Text>
            ))}
          </View>
        )}
        {item.outOfScope.length > 0 && (
          <View style={styles.col}>
            <Text style={styles.label}>Nicht enthalten</Text>
            {item.outOfScope.map((scopeItem) => (
              <Text key={scopeItem} style={styles.bullet}>
                • {scopeItem}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

function ProjectSheetDocument({
  data,
  logoDataUrl,
  contactPhotoDataUrl,
  generatedAt,
}: {
  data: ProjectSheetPdfData;
  logoDataUrl: string;
  contactPhotoDataUrl: string | null;
  generatedAt: string;
}) {
  const { product, items, totalPriceLabel } = data;

  return (
    <Document title={`Projekt-Sheet${product ? ` – ${product.title}` : ""}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Image src={logoDataUrl} style={styles.logo} />
          <View style={styles.headerAddress}>
            <Text style={styles.headerAddressText}>Alpine Data Ventures GmbH</Text>
            <Text style={styles.headerAddressText}>Leopoldstraße 31 · 80802 München</Text>
            <Text style={styles.headerAddressText}>info@alpinedata.de · alpinedata.de</Text>
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>Projekt-Sheet</Text>
          {product && <Text style={styles.subtitle}>{product.title}</Text>}
          <Text style={styles.meta}>Erstellt am {generatedAt}</Text>
        </View>

        <Text style={styles.paragraph}>
          Diese Übersicht fasst die im Alpine Data Ventures Produktkatalog konfigurierten
          Produktbausteine{product ? ` für „${product.title}“` : ""} sowie die geschätzten Kosten
          zusammen. Sie dient als Grundlage für Ihre Projektplanung, eine Anfrage oder ein
          persönliches Gespräch.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Übersicht der Kosten</Text>
          <View style={styles.card}>
            {items.map((item, idx) => (
              <View key={item.name} style={idx > 0 ? [styles.costRow, styles.costRowBorder] : styles.costRow}>
                <Text style={styles.costName}>{item.name}</Text>
                <Text style={styles.costPrice}>{item.priceLabel}</Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Geschätzte Gesamtsumme</Text>
              <Text style={styles.totalValue}>{totalPriceLabel}</Text>
            </View>
            <Text style={styles.disclaimer}>
              Diese Summe ist eine Schätzung der Fixpreise – final abgestimmt werden sie im
              persönlichen Gespräch mit uns.
            </Text>
          </View>
        </View>

        {product && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projekt</Text>
            <View style={styles.card}>
              <Text style={styles.projectTitle}>{product.title}</Text>
              <Text style={styles.paragraphSmall}>{product.short}</Text>
              <View style={styles.twoCol}>
                <View style={styles.col}>
                  <Text style={styles.label}>Problem</Text>
                  <Text style={styles.value}>{product.problem}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Ergebnis</Text>
                  <Text style={styles.value}>{product.typicalResult}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Details zu den Produktbausteinen</Text>
            {items[0] && <ItemCard item={items[0]} />}
          </View>
          {items.slice(1).map((item) => (
            <ItemCard key={item.name} item={item} />
          ))}
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Ihr Ansprechpartner</Text>
          <View style={[styles.card, styles.contactCard]}>
            {contactPhotoDataUrl && <Image src={contactPhotoDataUrl} style={styles.contactPhoto} />}
            <View style={{ flex: 1 }}>
              <Text style={styles.contactName}>Andreas Klostermann</Text>
              <Text style={styles.contactRole}>Geschäftsführer</Text>
              <Text style={styles.contactDetail}>E-Mail: andreas.klostermann@alpinedata.de</Text>
              <Text style={styles.contactDetail}>Telefon (Zentrale): +49 160 8014 812</Text>
              <Text style={styles.contactNote}>
                Für Rückfragen zu diesem Projekt-Sheet stehe ich Ihnen gerne persönlich zur Verfügung.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Alpine Data Ventures GmbH · Leopoldstraße 31 · 80802 München · Telefon: +49 160 8014 812 ·
            info@alpinedata.de
          </Text>
          <Text style={styles.footerText}>
            Geschäftsführer: Benjamin Diez, Dr. Carsten Hof, Andreas Klostermann, Julian Koller ·
            Amtsgericht München, HRB 300287 · USt-IdNr. DE453880543
          </Text>
        </View>
        <Text
          style={styles.pageNumber}
          fixed
          render={({ pageNumber, totalPages }) => `Seite ${pageNumber} von ${totalPages}`}
        />
      </Page>
    </Document>
  );
}

/**
 * Erstellt das Projekt-Sheet-PDF und gibt es als Blob zurück. Lädt Logo und
 * Kontaktfoto client-seitig als (verkleinerte) Data-URLs, damit die Datei
 * nicht unnötig groß wird.
 */
export async function generateProjectSheetPdfBlob(data: ProjectSheetPdfData): Promise<Blob> {
  const [logoDataUrl, contactPhotoDataUrl] = await Promise.all([
    loadImageAsDataUrl("/images/logo.png", { maxWidth: 700, format: "image/png" }),
    loadImageAsDataUrl("/images/about/gf_andreas.jpg", { maxWidth: 240, maxHeight: 320, format: "image/jpeg", quality: 0.85 }).catch(
      () => null
    ),
  ]);

  const generatedAt = new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date());

  const doc = (
    <ProjectSheetDocument
      data={data}
      logoDataUrl={logoDataUrl}
      contactPhotoDataUrl={contactPhotoDataUrl}
      generatedAt={generatedAt}
    />
  );

  return pdf(doc).toBlob();
}
