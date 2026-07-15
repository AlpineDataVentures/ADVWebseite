import {
  TrendingUp,
  Banknote,
  Server,
  ShoppingCart,
  Factory,
  Truck,
  Users,
  FlaskConical,
  ShieldCheck,
  LayoutDashboard,
  BarChart3,
  Bot,
  LineChart,
  Shield,
  PlugZap,
  Target,
  Layers,
  Database,
  Network,
  BookOpen,
  GraduationCap,
  Code2,
  GitBranch,
  Sparkles,
  ClipboardCheck,
  Route,
  Wrench,
  FileKey,
  ScanSearch,
  type LucideIcon
} from 'lucide-react';

/**
 * Icon Mapping für Domains, Intents und Deliverables
 * Verwendet lucide-react Icons für konsistente Darstellung
 */

// Domain Icons (support both formats: domain IDs and useCase.domain values)
export const domainIcons: Record<string, LucideIcon> = {
  // Domain IDs (from domains.ts)
  'sales-marketing': TrendingUp,
  'finance': Banknote,
  'it-data': Server,
  'procurement': ShoppingCart,
  'production': Factory,
  'logistics': Truck,
  'hr': Users,
  'rnd': FlaskConical,
  'risk-compliance': ShieldCheck,
  'general-mgmt': LayoutDashboard,
  // UseCase domain values (for backward compatibility)
  'sales_marketing': TrendingUp,
  'it_data': Server,
  'risk_compliance': ShieldCheck,
  'general_mgmt': LayoutDashboard,
};

// Intent Icons
export const intentIcons: Record<string, LucideIcon> = {
  transparency: BarChart3,
  automation: Bot,
  insights: LineChart,
  compliance: Shield,
};

// Deliverable Icons
export const deliverableIcons: Record<string, LucideIcon> = {
  bi_setup: PlugZap,
  kpi_ws: Target,
  mgmt_report_1: LayoutDashboard,
  reporting_standards: Layers,
  dwh_starter: Database,
  source_integration_review: Network,
  glossary_sprint: BookOpen,
  pbi_training_user: GraduationCap,
  api_integration: Code2,
  etl_pipeline: GitBranch,
  data_modeling: Database,
  data_migration: Route,
  data_quality: ScanSearch,
  automation_pilot: Wrench,
  automation_rollout: Wrench,
  semantic_layer: Layers,
  self_service_enablement: GraduationCap,
  rag_foundation: BookOpen,
  ai_agent_dev: Bot,
  ai_review: ClipboardCheck,
  ai_use_case_sprint: Sparkles,
  maturity_assessment: BarChart3,
  compliance_package: ShieldCheck,
  privacy_package: FileKey,
  architecture_workshop: Layers,
  change_enablement: Users,
  data_catalog_setup: Database,
  security_access_review: Shield,
  finops_review: Banknote,
  process_discovery: Target,
  // Fallback für unbekannte Deliverables
  default: Sparkles,
};

/**
 * Get Icon für Domain
 */
export function getDomainIcon(domainKey: string): LucideIcon {
  return domainIcons[domainKey] || LayoutDashboard;
}

/**
 * Get Icon für Intent
 */
export function getIntentIcon(intent: string): LucideIcon {
  return intentIcons[intent] || BarChart3;
}

/**
 * Get Icon für Deliverable
 */
export function getDeliverableIcon(deliverableId: string): LucideIcon {
  return deliverableIcons[deliverableId] || deliverableIcons.default;
}
