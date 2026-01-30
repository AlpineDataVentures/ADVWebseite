// Produktfamilien (Katalog)
export type ProductFamily = 'BI & Analytics' | 'Data Architecture' | 'Data Knowledge';

// Parameter-Typen
export type ParameterType = 'select' | 'number' | 'radio';

export type CompanySize = 'SMB' | 'Mid' | 'Enterprise';
export type Speed = 'Standard' | 'FastTrack';
export type DataSourcesRange = '1-3' | '4-8' | '9-15';
export type Deployment = 'Cloud' | 'On-Prem';
export type SecurityLevel = 'Basic' | 'Advanced';
export type ReportComplexity = 'Basic' | 'Medium' | 'Advanced';

// Parameter-Definition
export interface Parameter {
  key: string;
  label: string;
  type: ParameterType;
  options?: Array<{ value: string; label: string }>;
  default: string | number;
  pricingEffect: {
    type: 'multiplier' | 'additive';
    values: Record<string, number>; // value -> factor oder add-on
  };
  applicableTo?: string[]; // deliverable IDs, wenn leer dann für alle
}

// Deliverable (kaufbares Produktpaket)
export interface Deliverable {
  id: string;
  name: string;
  family: ProductFamily;
  shortDescription: string;
  longDescription: string; // Für Accordion
  basePrice: number;
  parameters: string[]; // Parameter-Keys, die für dieses Deliverable gelten
  tags: string[];
  estimatedDuration: string;
  deliverablesOutput: string[]; // Artefakte als Bullet-List
  assumptions: string;
  outOfScope: string;
}

// Use Case nach Domäne
export interface UseCase {
  id: string;
  title: string;
  description: string;
  domain: string; // "Sales & Marketing", "Finance", "IT & Data"
  recommendedDeliverableIds: string[]; // Bundle
  optionalDeliverableIds?: Array<{
    deliverableId: string;
    defaultSelected: boolean;
  }>;
}

// Parameter-Werte für ein Deliverable im Warenkorb
export interface DeliverableParameters {
  companySize?: CompanySize;
  speed?: Speed;
  dataSources?: DataSourcesRange;
  deployment?: Deployment;
  securityLevel?: SecurityLevel;
  trainingParticipants?: number;
  reportComplexity?: ReportComplexity;
  [key: string]: string | number | undefined;
}

// Warenkorb-Item
export interface CartItem {
  deliverableId: string;
  quantity: number;
  parameters: DeliverableParameters;
}

// Konfiguration
export interface Configuration {
  useCaseId: string | null;
  cartItems: CartItem[];
  customizations: Record<string, any>;
}

// Preis-Breakdown für Transparenz
export interface PriceBreakdown {
  basePrice: number;
  multipliers: Array<{ label: string; factor: number; value: string }>;
  addOns: Array<{ label: string; amount: number; value: string }>;
  subtotal: number;
  finalPrice: number;
}
