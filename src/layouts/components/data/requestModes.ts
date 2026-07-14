/**
 * Anfrage-Modus je Produkt (Produktkatalog)
 * =========================================
 *
 * Steuert, ob ein Produkt über konfigurierbare Produktbausteine ("standard"),
 * eine individuelle Anfrage ("custom") oder beides ("hybrid") angefragt wird.
 *
 * Phase 4 erweitert: hybrid als Standard, wenn Bausteine sinnvoll sind,
 * Projekte aber meist individuell erweitert werden.
 * Default = "standard" nur für klar standardisierbare BI-/Dashboard-Produkte.
 */

export type RequestMode = "standard" | "custom" | "hybrid";

/** Optionale produktspezifische Texte für Hybrid-Anfragen */
export type HybridInquiryCopy = {
  hintText?: string;
  accordionTriggerLabel?: string;
  submitButtonLabel?: string;
};

const hybridInquiryCopyByProductId: Record<string, HybridInquiryCopy> = {
  "externer-datenschutzbeauftragter": {
    hintText:
      "Der monatliche Betreuungsumfang richtet sich nach Unternehmensgröße, Risikoprofil und gewünschter Betreuungsintensität. Gerne erstellen wir Ihnen ein individuelles Angebot.",
    accordionTriggerLabel: "Individuelle Anfrage per E-Mail senden",
    submitButtonLabel: "Individuelle Anfrage per E-Mail senden",
  },
};

export function getHybridInquiryCopy(productId: string): HybridInquiryCopy | undefined {
  return hybridInquiryCopyByProductId[productId];
}

const requestModeById: Record<string, RequestMode> = {
  // ── Strategie & Leadership ──
  "datenstrategie": "hybrid",
  "ki-strategie": "hybrid",
  "maturity-assessment": "hybrid",
  "data-ai-leadership": "hybrid",
  "data-mesh-organisation": "hybrid",
  "innovationsresearch": "hybrid",

  // ── Architektur & Plattform ──
  "dwh": "hybrid",
  "data-lake": "hybrid",
  "dataops": "hybrid",
  "enterprise-architecture-management": "hybrid",
  "ai-architektur-infrastruktur": "hybrid",
  "souveraene-datenarchitektur": "hybrid",
  "souveraene-ki-infrastruktur": "hybrid",
  "data-catalog": "hybrid",
  "master-data-management": "hybrid",
  "wartung-support": "hybrid",

  // ── Compliance & Security ──
  "dsgvo-dsb": "hybrid",
  "externer-datenschutzbeauftragter": "hybrid",
  "iam": "hybrid",
  "nis2": "hybrid",
  "isms-isb-bestellung": "hybrid",
  "cybersicherheit-dashboard": "hybrid",

  // ── KI & Analytics (nicht reine BI-Dashboards) ──
  "churn-prevention-algo": "hybrid",
  "financial-forecasting": "hybrid",
  "predictive-maintenance": "hybrid",
  "anomaly-detection": "hybrid",
  "ai-video-qualitaetsanalyse": "hybrid",
  "rag-literaturrecherche": "hybrid",
  "agentic-coding": "hybrid",
  "sales-forecast": "hybrid",
  "sales-reporting": "hybrid",
  "lead-scoring": "hybrid",
  "customer-lifetime-value": "hybrid",
  "dynamic-pricing": "hybrid",
  "objekterkennung": "hybrid",

  // ── Automatisierung ──
  "automatisierte-rechnungsverarbeitung": "hybrid",
  "automatisierte-bestellverarbeitung": "hybrid",
  "helpdesk-automation": "hybrid",
  "automatisierung-customer-success": "hybrid",
  "ausschreibungsautomatisierung": "hybrid",
  "spendmanagement-automatisieren": "hybrid",
  "esg-datenerhebung-automatisiert": "hybrid",
  "tourenplanung-automatisiert": "hybrid",
  "sales-chatbot-webseite": "hybrid",

  // ── Finance / Controlling (komplex, oft individuell) ──
  "excel-to-bi-migration": "hybrid",
  "controlling-via-bi": "hybrid",
  "liquiditaetsplanung-bi": "hybrid",
  "financial-planning": "hybrid",
  "working-capital-analyse": "hybrid",
  "investitionscontrolling-capex": "hybrid",

  // ── Sales (Top-Produkte) ──
  "sales-dashboard": "hybrid",

  // ── HR / Produktion (Fachspezifisch) ──
  "personal-controlling": "hybrid",
  "oee-analyse": "hybrid",
  "durchlaufzeit-bottleneck-analyse": "hybrid",

  // ── BI-Plattform (Basis standardisierbar, Ausbau individuell) ──
  "setup-bi": "hybrid",
  "data-driven-marketing": "hybrid",
  "itsm-analytics": "hybrid",
  "prozesseffizienz-analyse": "hybrid",
  "cloud-cost-observability": "hybrid",
  "reklamations-analyse": "hybrid",
  "lieferantenscoring": "hybrid",
  "einkaufs-forecast": "hybrid",
  "budget-controlling": "hybrid",
  "deckungsbeitragsrechnung": "hybrid",
  "kostenstruktur-gemeinkosten-monitoring": "hybrid",
  "lageroptimierung": "hybrid",
  "lagerbestandsverwaltung": "hybrid",
  "alarm-system": "hybrid",

  // ── Wieder aktive Spezialprodukte ──
  "api-management": "hybrid",
  "adf-aufsetzen": "hybrid",
  "bedarfsanalyse": "hybrid",
  "potentialanalyse": "hybrid",
  "produktionsplanung": "hybrid",
  "kyc-automatisierung": "hybrid",
};

export function getRequestMode(productId: string): RequestMode {
  return requestModeById[productId] ?? "standard";
}
