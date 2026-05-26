import type { PortfolioAreaTag, SolutionClusterTag } from "./useCases";

export const portfolioAreaLabels: Record<PortfolioAreaTag, string> = {
  solutions: "Lösungen",
  automation_ai: "Automatisierung & KI",
};

export const solutionClusterLabels: Record<SolutionClusterTag, string> = {
  orientation_prioritization: "Orientierung & Priorisierung",
  data_mgmt_architecture: "Datenmanagement & Architektur",
  insights_general_mgmt: "General Management",
  insights_finance: "Finance",
  insights_sales_marketing: "Sales & Marketing",
  insights_procurement: "Beschaffung",
  insights_production_logistics: "Produktion & Logistik",
  insights_it_ops: "IT & Operations",
  automation_sales_marketing: "Sales & Marketing",
  automation_finance: "Finance",
  automation_it_ops: "IT & Operations",
  automation_procurement: "Beschaffung",
  automation_risk_compliance: "Risiko & Compliance",
  automation_cross_domain: "Bereichsübergreifende Automatisierung",
  automation_rnd: "Research & Development",
  automation_production_logistics: "Produktion & Logistik",
};

export const priorityLabels: Record<"green" | "normal", string> = {
  green: "Priorisiert / Fokus-Use-Case",
  normal: "Standard",
};
