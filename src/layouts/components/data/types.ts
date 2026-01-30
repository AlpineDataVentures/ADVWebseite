export interface UseCase {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  recommendedProducts: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  unit: string;
  options?: ProductOption[];
  dependencies?: string[];
  conflicts?: string[];
}

export interface ProductOption {
  id: string;
  name: string;
  priceModifier: number;
  description?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedOptions: string[];
}

export interface Configuration {
  useCaseId: string | null;
  cartItems: CartItem[];
  customizations: Record<string, any>;
}
