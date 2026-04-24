import { useCases, getUseCaseById } from './useCases';
import { deliverables, getDeliverableById } from './deliverables';

export type Recommendation = {
  deliverableId: string;
  defaultEnabled: boolean;
  reason: string; // 1 Satz: warum vorgeschlagen
};

export type UseCaseBundle = {
  useCaseId: string;
  recommendations: Recommendation[];
};

// Hard Overrides für MVP Use Cases
const hardOverrides: Record<string, Recommendation[]> = {
  // Sales Dashboard (Sales & Marketing)
  "sales-dashboard": [
    {
      deliverableId: "bi_setup",
      defaultEnabled: true,
      reason: "BI-System als Basis für Sales-Dashboards"
    },
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Definition der wichtigsten Sales-KPIs"
    },
    {
      deliverableId: "mgmt_report_1",
      defaultEnabled: true,
      reason: "Erster Sales-Bericht für Management"
    },
    {
      deliverableId: "glossary_sprint",
      defaultEnabled: true,
      reason: "Gemeinsames Verständnis von Sales-Begriffen"
    },
    {
      deliverableId: "pbi_training_user",
      defaultEnabled: false,
      reason: "Schulung für Sales-Team (optional)"
    }
  ],

  // Controlling via BI (Finance)
  "controlling-via-bi": [
    {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Definition der Controlling-KPIs"
    },
    {
      deliverableId: "reporting_standards",
      defaultEnabled: true,
      reason: "Einheitliche Reporting-Struktur für Finance"
    },
    {
      deliverableId: "dwh_starter",
      defaultEnabled: true,
      reason: "Zentrale Datenablage für Finanzdaten"
    },
    {
      deliverableId: "mgmt_report_1",
      defaultEnabled: true,
      reason: "Controlling-Bericht für Management"
    }
  ],

  // Setup BI (IT & Data)
  "setup-bi": [
    {
      deliverableId: "bi_setup",
      defaultEnabled: true,
      reason: "Komplettes BI-System Setup"
    },
    {
      deliverableId: "dwh_starter",
      defaultEnabled: true,
      reason: "Zentrale Datenablage als Basis"
    },
    {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Analyse der Datenquellen für Integration"
    },
    {
      deliverableId: "reporting_standards",
      defaultEnabled: true,
      reason: "Standards für zukünftige Berichte"
    }
  ]
};

// Prioritätsreihenfolge für Deduplizierung
const priorityOrder: string[] = [
  // Core BI & Analytics (höchste Priorität)
  "bi_setup",
  "kpi_ws",
  "mgmt_report_1",
  "reporting_standards",
  
  // Data Architecture
  "dwh_starter",
  "source_integration_review",
  
  // Data Knowledge
  "glossary_sprint",
  "pbi_training_user",
  "pbi_training_dev",
  
  // Coming Soon (niedrigste Priorität)
  "forecast_model",
  "churn_model",
  "anomaly_detection",
  "predictive_maintenance",
  "qa_ai",
  "governance_starter",
  "iam_concept",
  "roles_rights_impl",
  "strategy_sprint",
  "roadmap",
  "target_architecture",
  "bi_factory",
  "monitoring_ops",
  "retainer"
];

/**
 * Fallback Rule Engine
 * Generiert Recommendations basierend auf Use Case Tags
 */
function generateRecommendationsFromRules(useCaseId: string): Recommendation[] {
  const useCase = getUseCaseById(useCaseId);
  if (!useCase) return [];

  const recommendations: Recommendation[] = [];
  const seen = new Set<string>();

  // Rule 1: transparency → Core BI Setup
  if (useCase.tags.intent.includes("transparency")) {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "bi_setup",
      defaultEnabled: true,
      reason: "BI-System für transparente Datenvisualisierung"
    });
    addIfNotSeen(recommendations, seen, {
      deliverableId: "kpi_ws",
      defaultEnabled: true,
      reason: "Definition der relevanten KPIs für Transparenz"
    });
    addIfNotSeen(recommendations, seen, {
      deliverableId: "mgmt_report_1",
      defaultEnabled: true,
      reason: "Management-Bericht für Transparenz"
    });
  }

  // Rule 2: automation → Reporting Standards
  if (useCase.tags.intent.includes("automation")) {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "reporting_standards",
      defaultEnabled: true,
      reason: "Standards für automatisierte Berichte"
    });
  }

  // Rule 3: multi_source → Data Architecture
  if (useCase.tags.data_scope === "multi_source" || useCase.tags.data_scope === "enterprise_wide") {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "source_integration_review",
      defaultEnabled: true,
      reason: "Analyse der Datenquellen für Integration"
    });
    addIfNotSeen(recommendations, seen, {
      deliverableId: "dwh_starter",
      defaultEnabled: true,
      reason: "Zentrale Datenablage für mehrere Quellen"
    });
  }

  // Rule 4: compliance → Governance
  if (useCase.tags.intent.includes("compliance")) {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "glossary_sprint",
      defaultEnabled: true,
      reason: "Glossar für Compliance und Governance"
    });
    addIfNotSeen(recommendations, seen, {
      deliverableId: "governance_starter",
      defaultEnabled: false,
      reason: "Data Governance Konzept (Coming Soon)"
    });
  }

  // Rule 5: insights → Forecasting + Management Report
  if (useCase.tags.intent.includes("insights")) {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "forecast_model",
      defaultEnabled: false,
      reason: "Forecasting-Modell für Insights (Coming Soon)"
    });
    addIfNotSeen(recommendations, seen, {
      deliverableId: "mgmt_report_1",
      defaultEnabled: true,
      reason: "Management-Bericht mit Insights"
    });
  }

  // Rule 6: Optional Upsell - Training
  if (useCase.tags.intent.includes("transparency") || useCase.tags.intent.includes("automation")) {
    addIfNotSeen(recommendations, seen, {
      deliverableId: "pbi_training_user",
      defaultEnabled: false,
      reason: "Schulung für selbstständige Berichtserstellung (optional)"
    });
  }

  return recommendations;
}

/**
 * Hilfsfunktion: Fügt Recommendation hinzu, wenn noch nicht vorhanden
 */
function addIfNotSeen(
  recommendations: Recommendation[],
  seen: Set<string>,
  recommendation: Recommendation
) {
  if (!seen.has(recommendation.deliverableId)) {
    recommendations.push(recommendation);
    seen.add(recommendation.deliverableId);
  }
}

/**
 * Dedupliziert und priorisiert Recommendations
 */
function deduplicateAndPrioritize(recommendations: Recommendation[]): Recommendation[] {
  // Gruppiere nach deliverableId (behalte erste, wenn dupliziert)
  const unique = new Map<string, Recommendation>();
  for (const rec of recommendations) {
    if (!unique.has(rec.deliverableId)) {
      unique.set(rec.deliverableId, rec);
    }
  }

  // Sortiere nach Prioritätsreihenfolge
  const sorted = Array.from(unique.values()).sort((a, b) => {
    const indexA = priorityOrder.indexOf(a.deliverableId);
    const indexB = priorityOrder.indexOf(b.deliverableId);
    
    // Wenn nicht in priorityOrder, ans Ende
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    
    return indexA - indexB;
  });

  // Gruppiere nach Familie für bessere Lesbarkeit
  const grouped: Recommendation[] = [];
  
  // Core BI & Analytics zuerst
  const core = sorted.filter(r => 
    ["bi_setup", "kpi_ws", "mgmt_report_1", "reporting_standards"].includes(r.deliverableId)
  );
  grouped.push(...core);
  
  // Data Architecture
  const dataArch = sorted.filter(r => 
    ["dwh_starter", "source_integration_review"].includes(r.deliverableId)
  );
  grouped.push(...dataArch);
  
  // Data Knowledge
  const dataKnow = sorted.filter(r => 
    ["glossary_sprint", "pbi_training_user", "pbi_training_dev"].includes(r.deliverableId)
  );
  grouped.push(...dataKnow);
  
  // Coming Soon (alle anderen)
  const comingSoon = sorted.filter(r => 
    !core.includes(r) && !dataArch.includes(r) && !dataKnow.includes(r)
  );
  grouped.push(...comingSoon);

  return grouped;
}

/**
 * Hauptfunktion: Gibt Bundle für Use Case zurück
 */
export function getBundleForUseCase(useCaseId: string): Recommendation[] {
  // Prüfe Hard Override
  if (hardOverrides[useCaseId]) {
    return deduplicateAndPrioritize(hardOverrides[useCaseId]);
  }

  // Fallback: Rule Engine
  const recommendations = generateRecommendationsFromRules(useCaseId);
  return deduplicateAndPrioritize(recommendations);
}

/**
 * Gibt alle Hard Override Bundles zurück
 */
export function getHardOverrideBundles(): UseCaseBundle[] {
  return Object.entries(hardOverrides).map(([useCaseId, recommendations]) => ({
    useCaseId,
    recommendations: deduplicateAndPrioritize(recommendations)
  }));
}

/**
 * Prüft, ob Use Case einen Hard Override hat
 */
export function hasHardOverride(useCaseId: string): boolean {
  return useCaseId in hardOverrides;
}
