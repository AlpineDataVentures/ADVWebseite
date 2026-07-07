import type { Product } from "./useCases";

const defaultBestForByDomain: Record<string, string[]> = {
  general_mgmt: ["Geschäftsführung", "Bereichsleitungen"],
  finance: ["Finance", "Controlling"],
  sales_marketing: ["Sales", "Marketing"],
  it_data: ["IT", "Data-Teams"],
  procurement: ["Beschaffung", "Einkauf"],
  production: ["Produktion", "Operations"],
  logistics: ["Logistik", "Operations"],
  hr: ["HR", "People & Culture"],
  rnd: ["R&D", "Innovationsteams"],
  risk_compliance: ["Risk", "Compliance"],
};

const projectScopeByComplexity: Record<string, string> = {
  xs: "Kompakt – typisch 2–4 Wochen",
  s: "Standard – typisch 4–8 Wochen",
  m: "Mittlerer Umfang – typisch 2–3 Monate",
  l: "Umfangreich – typisch 3+ Monate",
};

export interface ProductDetailViewModel {
  problem: string;
  typicalResult: string;
  bestFor: string[];
  outputs: string[];
  projectScope: string | null;
  projectFlow: string[];
}

export function getProductDetailViewModel(product: Product): ProductDetailViewModel {
  const fallbackDetails = {
    problem: product.short,
    typicalResult: product.outputs[0] ?? "Klarer erster Umsetzungsschritt mit messbarem Nutzen.",
    bestFor: defaultBestForByDomain[product.domain] ?? ["Fachbereiche mit konkretem Entscheidungsbedarf"],
  };
  const details = product.details ?? fallbackDetails;

  return {
    problem: details.problem,
    typicalResult: details.typicalResult,
    bestFor: details.bestFor ?? fallbackDetails.bestFor,
    outputs: product.outputs.slice(0, 4),
    projectScope: projectScopeByComplexity[product.tags.complexity] ?? null,
    projectFlow: [
      "Ziel und Scope gemeinsam abstimmen",
      "Passende Produktbausteine auswählen und konfigurieren",
      "Umsetzung mit klaren Deliverables und Meilensteinen",
    ],
  };
}
