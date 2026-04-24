import type { Deliverable, UseCase } from './models';

// Deliverables (kaufbare Produktpakete)
export const deliverables: Deliverable[] = [
  // BI & Analytics
  {
    id: 'del-1',
    name: 'BI Fix & Fertig Setup',
    family: 'BI & Analytics',
    shortDescription: 'Komplettes Business Intelligence Setup mit Power BI, Dashboards und erster Datenanbindung. Sofort einsatzbereit.',
    longDescription: 'Wir richten Ihr komplettes BI-System ein: Power BI Installation, erste Datenquellen-Anbindung, Basis-Dashboards und eine zentrale Berichtsstruktur. Sie erhalten ein sofort einsatzfähiges System mit Best Practices und können direkt loslegen. Ideal für Unternehmen, die schnell erste Einblicke in ihre Daten gewinnen möchten.',
    basePrice: 9900,
    parameters: ['companySize', 'speed', 'deployment'],
    tags: ['Quick Win', 'Foundation'],
    estimatedDuration: '3–5 Tage',
    deliverablesOutput: [
      'Installiertes und konfiguriertes Power BI System',
      'Anbindung an 1-3 Datenquellen (z.B. Excel, SQL, CRM)',
      '3-5 Basis-Dashboards nach Ihren Anforderungen',
      'Dokumentation der Architektur und Best Practices',
      'Kurze Einführung für Ihr Team (2 Stunden)'
    ],
    assumptions: 'Sie haben bereits Datenquellen identifiziert und Zugriff darauf. Power BI Lizenzen sind vorhanden oder werden separat beschafft.',
    outOfScope: 'Komplexe Datenmodellierung, ETL-Entwicklung, umfangreiche Schulungen (>2h), On-Premise Installation (gegen Aufpreis möglich)'
  },
  {
    id: 'del-2',
    name: 'KPI Definition Workshop',
    family: 'BI & Analytics',
    shortDescription: 'Gemeinsame Definition Ihrer wichtigsten Kennzahlen und Erfolgsmessung. Klarheit über das, was wirklich zählt.',
    longDescription: 'In diesem Workshop erarbeiten wir gemeinsam die für Ihr Unternehmen relevanten Kennzahlen (KPIs). Wir analysieren Ihre Geschäftsziele, identifizieren die wichtigsten Metriken und definieren klare Messgrößen. Sie erhalten ein strukturiertes KPI-Framework, das als Grundlage für alle zukünftigen Berichte und Analysen dient.',
    basePrice: 6900,
    parameters: ['companySize', 'speed'],
    tags: ['Foundation'],
    estimatedDuration: '2–3 Tage',
    deliverablesOutput: [
      'KPI-Katalog mit Definitionen und Berechnungsformeln',
      'Priorisierte Liste der wichtigsten Kennzahlen',
      'Dokumentation der Geschäftslogik und Datenquellen',
      'Empfehlungen für Reporting-Struktur',
      'Workshop-Dokumentation und Präsentation'
    ],
    assumptions: 'Geschäftsführung oder Fachabteilungen sind für Workshops verfügbar. Grundlegende Geschäftsziele sind definiert.',
    outOfScope: 'Technische Umsetzung der KPIs, Datenqualitätsprüfung, umfangreiche Datenanalyse'
  },
  {
    id: 'del-3',
    name: 'Erster Management-Bericht',
    family: 'BI & Analytics',
    shortDescription: 'Professioneller Management-Bericht mit den wichtigsten Kennzahlen. Übersichtlich, verständlich, handlungsorientiert.',
    longDescription: 'Wir erstellen Ihren ersten maßgeschneiderten Management-Bericht mit den wichtigsten Kennzahlen für die Geschäftsführung. Der Bericht ist übersichtlich gestaltet, zeigt Trends auf und hilft bei strategischen Entscheidungen. Sie erhalten sowohl eine interaktive Power BI Version als auch ein druckbares PDF-Format.',
    basePrice: 12900,
    parameters: ['companySize', 'speed', 'reportComplexity'],
    tags: ['Quick Win'],
    estimatedDuration: '5–7 Tage',
    deliverablesOutput: [
      'Interaktiver Management-Bericht in Power BI',
      'PDF-Version für Präsentationen',
      'Automatisierte Datenaktualisierung (täglich/wöchentlich)',
      'Dokumentation der Kennzahlen und Berechnungen',
      'Schulung für Nutzer (1 Stunde)'
    ],
    assumptions: 'KPIs sind bereits definiert (empfohlen: KPI Definition Workshop). Datenquellen sind verfügbar und zugänglich.',
    outOfScope: 'KPI-Definition, Datenqualitätsprüfung, komplexe Datenmodellierung, mehrere Berichtsvarianten'
  },
  {
    id: 'del-4',
    name: 'Reporting-Struktur (Templates & Standards)',
    family: 'BI & Analytics',
    shortDescription: 'Einheitliche Berichtsvorlagen und Standards für Ihr gesamtes Unternehmen. Konsistenz und Effizienz.',
    longDescription: 'Wir entwickeln eine einheitliche Reporting-Struktur mit wiederverwendbaren Vorlagen, Design-Standards und Best Practices. Alle zukünftigen Berichte folgen diesem Framework, was Konsistenz, Wartbarkeit und schnelle Erstellung neuer Reports ermöglicht. Ideal für Unternehmen, die mehrere Abteilungen und Berichte haben.',
    basePrice: 7900,
    parameters: ['companySize', 'speed', 'reportComplexity'],
    tags: ['Foundation'],
    estimatedDuration: '4–6 Tage',
    deliverablesOutput: [
      'Bibliothek mit Berichtsvorlagen (5-10 Templates)',
      'Design-Standards und Style Guide',
      'Dokumentation der Reporting-Struktur',
      'Beispielberichte für verschiedene Anwendungsfälle',
      'Schulungsmaterial für Berichtsersteller'
    ],
    assumptions: 'Power BI ist bereits im Einsatz. Grundlegende Anforderungen an Berichte sind bekannt.',
    outOfScope: 'Erstellung individueller Berichte, Datenmodellierung, umfangreiche Schulungen'
  },

  // Data Architecture
  {
    id: 'del-5',
    name: 'Zentrale Datenablage Starter (DWH/Lakehouse Light)',
    family: 'Data Architecture',
    shortDescription: 'Grundlegende zentrale Datenablage für strukturierte und unstrukturierte Daten. Solide Basis für Analytics.',
    longDescription: 'Wir richten eine zentrale Datenablage ein, die als Single Source of Truth für Ihre Daten dient. Dies kann ein Data Warehouse oder ein moderner Lakehouse-Ansatz sein, je nach Ihren Anforderungen. Die Lösung ist skalierbar und bildet die Grundlage für alle zukünftigen Analytics-Projekte.',
    basePrice: 19900,
    parameters: ['companySize', 'speed', 'dataSources', 'deployment', 'securityLevel'],
    tags: ['Foundation'],
    estimatedDuration: '10–15 Tage',
    deliverablesOutput: [
      'Installierte und konfigurierte Datenablage (Cloud oder On-Premise)',
      'Anbindung an Ihre wichtigsten Datenquellen',
      'Datenmodell für Kernbereiche (z.B. Sales, Finance)',
      'ETL-Prozesse für regelmäßige Datenaktualisierung',
      'Dokumentation der Architektur und Datenflüsse',
      'Schulung für Administratoren (4 Stunden)'
    ],
    assumptions: 'Datenquellen sind identifiziert und zugänglich. Infrastruktur-Anforderungen (Cloud/On-Premise) sind geklärt.',
    outOfScope: 'Umfangreiche Datenbereinigung, komplexe Datenmodellierung, Migration historischer Daten, 24/7 Support'
  },
  {
    id: 'del-6',
    name: 'Datenquellen- & Integrationsanalyse',
    family: 'Data Architecture',
    shortDescription: 'Systematische Analyse Ihrer Datenquellen und Empfehlungen für Integration. Klarheit über Ihre Datenlandschaft.',
    longDescription: 'Wir analysieren alle Ihre Datenquellen, identifizieren Herausforderungen bei der Integration und entwickeln einen Plan für die zentrale Datenablage. Sie erhalten eine vollständige Übersicht Ihrer Datenlandschaft mit Empfehlungen für die beste Integrationsstrategie.',
    basePrice: 8900,
    parameters: ['companySize', 'speed', 'dataSources', 'securityLevel'],
    tags: ['Foundation'],
    estimatedDuration: '5–7 Tage',
    deliverablesOutput: [
      'Inventar aller Datenquellen mit Metadaten',
      'Bewertung der Datenqualität und Integrationsfähigkeit',
      'Empfehlungen für Integrationsstrategie',
      'Roadmap für schrittweise Integration',
      'Dokumentation der Datenlandschaft',
      'Präsentation der Ergebnisse'
    ],
    assumptions: 'Zugang zu allen relevanten Datenquellen und Systemen. Fachabteilungen sind für Interviews verfügbar.',
    outOfScope: 'Technische Umsetzung der Integration, Datenbereinigung, Setup der zentralen Datenablage'
  },

  // Data Knowledge
  {
    id: 'del-7',
    name: 'KPI & Daten-Glossar Sprint',
    family: 'Data Knowledge',
    shortDescription: 'Zentrales Glossar mit allen Kennzahlen, Datenfeldern und Definitionen. Gemeinsames Verständnis im Unternehmen.',
    longDescription: 'Wir erstellen ein umfassendes Glossar mit allen wichtigen Kennzahlen, Datenfeldern und Fachbegriffen. Dies schafft Klarheit und ein gemeinsames Verständnis im gesamten Unternehmen. Das Glossar wird in einem zugänglichen Format bereitgestellt und kann kontinuierlich erweitert werden.',
    basePrice: 5900,
    parameters: ['companySize', 'speed'],
    tags: ['Quick Win', 'Foundation'],
    estimatedDuration: '3–4 Tage',
    deliverablesOutput: [
      'Digitales Glossar mit allen KPIs und Datenfeldern',
      'Definitionen, Berechnungsformeln und Datenquellen',
      'Suchfunktion und Kategorisierung',
      'Dokumentation der Erstellungsprozesse',
      'Schulung für Nutzer (1 Stunde)'
    ],
    assumptions: 'KPIs sind bereits definiert oder werden parallel im Workshop erarbeitet. Fachabteilungen sind für Interviews verfügbar.',
    outOfScope: 'KPI-Definition (empfohlen: KPI Definition Workshop), technische Integration in Systeme, umfangreiche Datenanalyse'
  },
  {
    id: 'del-8',
    name: 'Power BI Anwender-Schulung',
    family: 'Data Knowledge',
    shortDescription: 'Praktische Schulung für Ihre Mitarbeiter. Selbstständig Berichte erstellen und Daten analysieren.',
    longDescription: 'Ihre Mitarbeiter lernen, wie sie selbstständig Berichte in Power BI erstellen, Daten analysieren und Dashboards nutzen. Die Schulung ist praxisorientiert und verwendet Ihre eigenen Daten. Nach der Schulung können Ihre Teams eigenständig arbeiten und sind nicht mehr auf externe Unterstützung angewiesen.',
    basePrice: 4900,
    parameters: ['companySize', 'speed', 'trainingParticipants'],
    tags: ['Quick Win'],
    estimatedDuration: '1–2 Tage',
    deliverablesOutput: [
      'Schulungsunterlagen und Übungsdateien',
      'Zertifikat für Teilnehmer',
      'Zugang zu Online-Ressourcen und Video-Tutorials',
      'Nachbetreuung: 2 Stunden Q&A Session (optional)',
      'Dokumentation häufiger Aufgaben und Lösungen'
    ],
    assumptions: 'Power BI ist installiert und lizenziert. Teilnehmer haben Grundkenntnisse in Excel oder ähnlichen Tools.',
    outOfScope: 'Power BI Installation, Datenmodellierung, Entwicklung komplexer Berichte, individuelle Beratung pro Teilnehmer'
  }
];

// Use Cases nach Domänen
export const useCases: UseCase[] = [
  {
    id: 'uc-sales-dashboard',
    title: 'Sales Dashboard',
    description: 'Echtzeit-Übersicht über Verkäufe, Pipeline und Performance. Schnelle Entscheidungen basierend auf aktuellen Daten.',
    domain: 'Sales & Marketing',
    recommendedDeliverableIds: ['del-1', 'del-2', 'del-3', 'del-7', 'del-8'],
    optionalDeliverableIds: [
      { deliverableId: 'del-7', defaultSelected: true }, // KPI Glossar standardmäßig aktiviert
      { deliverableId: 'del-8', defaultSelected: false } // Schulung optional
    ]
  },
  {
    id: 'uc-finance-reporting',
    title: 'Monatsreporting automatisieren',
    description: 'Automatisierung des monatlichen Finanzreportings. Zeit sparen und Fehler reduzieren durch konsistente, aktuelle Berichte.',
    domain: 'Finance',
    recommendedDeliverableIds: ['del-2', 'del-4', 'del-5', 'del-3']
  },
  {
    id: 'uc-it-data-setup',
    title: 'BI Setup + zentrale Datenablage',
    description: 'Komplettes BI-System mit zentraler Datenablage. Solide Basis für alle zukünftigen Analytics-Projekte.',
    domain: 'IT & Data',
    recommendedDeliverableIds: ['del-1', 'del-5', 'del-6', 'del-4']
  }
];

// Helper: Deliverable nach ID finden
export function getDeliverableById(id: string): Deliverable | undefined {
  return deliverables.find(d => d.id === id);
}

// Helper: Use Case nach ID finden
export function getUseCaseById(id: string): UseCase | undefined {
  return useCases.find(uc => uc.id === id);
}

// Helper: Deliverables nach Familie
export function getDeliverablesByFamily(family: string): Deliverable[] {
  return deliverables.filter(d => d.family === family);
}

// Compat alias for legacy ProductConfigurator/RecommendedBundle
// Alte Komponenten erwarten weiterhin einen `products`-Export aus diesem Modul.
export const products = deliverables;
