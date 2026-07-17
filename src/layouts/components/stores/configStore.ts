import { create } from 'zustand';
import type { DeliverableParameters, CartItem } from '../data/models';
import { getParameterByKey } from '../data/parameters';
import { getBundleForProduct } from '../data/recommendations';
import { getDeliverableById, calculateCartItemPrice } from '../lib/pricing';

/**
 * Deliverable State
 */
interface DeliverableState {
  enabled: boolean;
  params: DeliverableParameters;
  /** Produkt, aus dem der Baustein in den Warenkorb gelegt wurde */
  sourceProductId?: string | null;
}

/**
 * Store State
 */
interface ConfigState {
  // State
  selectedProducts: string[];
  selectedDeliverables: Record<string, DeliverableState>;
  persistEnabled: boolean;
  activeProduct: string | null;
  wizardStep: 1 | 2; // 1 = Recommendation, 2 = Configuration
  hasBundleLoadedForProduct: string | null; // Track which product has bundle loaded
  /** Zuletzt ausgewählter/geöffneter Baustein (Sortierung in ConfigView) */
  lastFocusedDeliverableId: string | null;

  // Actions
  selectProduct: (id: string) => void;
  deselectProduct: (id: string) => void;
  setActiveProduct: (id: string | null) => void;
  setBundleFromProduct: (productId: string, options?: { force?: boolean; resetSelection?: boolean }) => void;
  setWizardStep: (step: 1 | 2) => void;
  toggleDeliverable: (id: string, enabled: boolean) => void;
  configureSingleDeliverable: (id: string) => void;
  updateDeliverableParam: (id: string, key: string, value: string | number) => void;
  resetAll: () => void;
  setPersistEnabled: (enabled: boolean) => void;

  // Getters (computed)
  getCart: () => CartItem[];
  getCartWithPrices: () => Array<CartItem & { deliverable: ReturnType<typeof getDeliverableById>; price: number; breakdown: ReturnType<typeof calculateCartItemPrice> }>;
  getTotalPrice: () => number;
}

export function getCartFromSelectedDeliverables(
  selectedDeliverables: Record<string, DeliverableState>
): CartItem[] {
  return Object.entries(selectedDeliverables)
    .filter(([, deliverableState]) => deliverableState.enabled)
    .map(([deliverableId, deliverableState]) => ({
      deliverableId,
      quantity: 1,
      parameters: deliverableState.params,
      sourceProductId: deliverableState.sourceProductId ?? null,
    }));
}

export function getCartWithPricesFromSelectedDeliverables(
  selectedDeliverables: Record<string, DeliverableState>
) {
  const cart = getCartFromSelectedDeliverables(selectedDeliverables);
  return cart.map(item => {
    const calculation = calculateCartItemPrice(item);
    const deliverable = getDeliverableById(item.deliverableId);
    return {
      ...item,
      deliverable,
      price: calculation.total,
      breakdown: calculation
    };
  });
}

export function getTotalPriceFromSelectedDeliverables(
  selectedDeliverables: Record<string, DeliverableState>
): number {
  return getCartFromSelectedDeliverables(selectedDeliverables).reduce((total, item) => {
    const calculation = calculateCartItemPrice(item);
    return total + calculation.total;
  }, 0);
}

function getDefaultParametersForDeliverable(deliverableId: string): DeliverableParameters {
  const deliverable = getDeliverableById(deliverableId);
  const defaults: DeliverableParameters = {};
  if (!deliverable?.parameters) return defaults;

  for (const paramKey of deliverable.parameters) {
    const param = getParameterByKey(paramKey);
    if (!param) continue;
    defaults[param.key] = typeof param.default === 'string' ? param.default : param.default;
  }
  return defaults;
}

// Initial State
const initialState = {
  selectedProducts: [],
  selectedDeliverables: {},
  persistEnabled: true, // Default enabled for persistence
  activeProduct: null,
  wizardStep: 1 as const,
  hasBundleLoadedForProduct: null,
  lastFocusedDeliverableId: null,
};

// Load from localStorage
function loadFromStorage(): Partial<ConfigState> {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem('produktkatalog-config');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        selectedProducts: parsed.selectedUseCases || [],
        selectedDeliverables: parsed.selectedDeliverables || {},
        persistEnabled: parsed.persistEnabled !== undefined ? parsed.persistEnabled : true,
        activeProduct: parsed.activeUseCase || null,
        wizardStep: parsed.wizardStep === 2 ? 2 : 1,
        hasBundleLoadedForProduct: parsed.hasBundleLoadedForUseCase || null,
        lastFocusedDeliverableId: parsed.lastFocusedDeliverableId ?? null,
      };
    }
  } catch (e) {
    console.warn('Failed to load from localStorage', e);
  }

  return {};
}

// Save to localStorage
function saveToStorage(state: ConfigState) {
  if (typeof window === 'undefined' || !state.persistEnabled) return;

  try {
    localStorage.setItem('produktkatalog-config', JSON.stringify({
      selectedUseCases: state.selectedProducts,
      selectedDeliverables: state.selectedDeliverables,
      persistEnabled: state.persistEnabled,
      activeUseCase: state.activeProduct,
      wizardStep: state.wizardStep,
      hasBundleLoadedForUseCase: state.hasBundleLoadedForProduct,
      lastFocusedDeliverableId: state.lastFocusedDeliverableId,
    }));
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
}

/** Nach Client-Mount laden, damit SSR/Hydration nicht von localStorage abweicht. */
export function rehydrateConfigFromStorage(): void {
  if (typeof window === 'undefined') return;
  const loaded = loadFromStorage();
  if (Object.keys(loaded).length > 0) {
    useConfigStore.setState(loaded);
  }
}

export const useConfigStore = create<ConfigState>((set, get) => {
  return {
    ...initialState,

    // Getters
    getCart: () => {
      return getCartFromSelectedDeliverables(get().selectedDeliverables);
    },

    getCartWithPrices: () => {
      return getCartWithPricesFromSelectedDeliverables(get().selectedDeliverables);
    },

    getTotalPrice: () => {
      return getTotalPriceFromSelectedDeliverables(get().selectedDeliverables);
    },

    // Actions
    selectProduct: (id: string) => {
      set((state) => {
        const newState = {
          ...state,
          selectedProducts: state.selectedProducts.includes(id)
            ? state.selectedProducts
            : [...state.selectedProducts, id]
        };
        saveToStorage(newState);
        return newState;
      });
    },

    deselectProduct: (id: string) => {
      set((state) => {
        const newState = {
          ...state,
          selectedProducts: state.selectedProducts.filter(productId => productId !== id)
        };
        saveToStorage(newState);
        return newState;
      });
    },

    setActiveProduct: (id: string | null) => {
      set((state) => {
        const newState = { ...state, activeProduct: id };
        saveToStorage(newState);
        return newState;
      });
    },

    setWizardStep: (step: 1 | 2) => {
      set((state) => {
        const newState = { ...state, wizardStep: step };
        saveToStorage(newState);
        return newState;
      });
    },

    setBundleFromProduct: (productId: string, options?: { force?: boolean; resetSelection?: boolean }) => {
      const currentState = get();
      if (!options?.force && currentState.hasBundleLoadedForProduct === productId) {
        return;
      }

      const recommendations = getBundleForProduct(productId);
      if (recommendations.length === 0) return;

      const newDeliverables: Record<string, DeliverableState> = { ...currentState.selectedDeliverables };

      recommendations.forEach((rec) => {
        const deliverable = getDeliverableById(rec.deliverableId);
        if (!deliverable?.active) return;

        const existing = newDeliverables[rec.deliverableId];
        // Empfohlene Bausteine sind visuell markiert, aber nicht automatisch im Warenkorb.
        const enabled = options?.resetSelection ? false : (existing?.enabled ?? false);

        newDeliverables[rec.deliverableId] = {
          enabled,
          params: existing?.params ?? getDefaultParametersForDeliverable(rec.deliverableId),
          sourceProductId: existing?.sourceProductId ?? null,
        };
      });

      const stateUpdate: Partial<ConfigState> = {
        selectedDeliverables: newDeliverables,
        selectedProducts: currentState.selectedProducts.includes(productId)
          ? currentState.selectedProducts
          : [...currentState.selectedProducts, productId],
        activeProduct: productId,
        hasBundleLoadedForProduct: productId,
        wizardStep: 1,
      };

      const newState: ConfigState = { ...currentState, ...stateUpdate };
      saveToStorage(newState);
      set(stateUpdate);
    },

    toggleDeliverable: (id: string, enabled: boolean) => {
      set((state) => {
        const current = state.selectedDeliverables[id];
        const newState = {
          ...state,
          lastFocusedDeliverableId: enabled ? id : state.lastFocusedDeliverableId,
          selectedDeliverables: {
            ...state.selectedDeliverables,
            [id]: {
              enabled,
              params: current?.params ?? getDefaultParametersForDeliverable(id),
              sourceProductId: enabled
                ? (state.activeProduct ?? current?.sourceProductId ?? null)
                : (current?.sourceProductId ?? null),
            },
          },
        };
        saveToStorage(newState);
        return newState;
      });
    },

    configureSingleDeliverable: (id: string) => {
      const deliverable = getDeliverableById(id);
      if (!deliverable?.active) return;

      set((state) => {
        const sourceProductId = state.activeProduct;
        const newState: ConfigState = {
          ...state,
          lastFocusedDeliverableId: id,
          selectedDeliverables: {
            [id]: {
              enabled: true,
              params: getDefaultParametersForDeliverable(id),
              sourceProductId,
            },
          },
          activeProduct: null,
          hasBundleLoadedForProduct: null,
          wizardStep: 2,
        };
        saveToStorage(newState);
        return newState;
      });
    },

    updateDeliverableParam: (id: string, key: string, value: string | number) => {
      set((state) => {
        const current = state.selectedDeliverables[id];

        let newDeliverables: Record<string, DeliverableState>;

        if (!current) {
          newDeliverables = {
            ...state.selectedDeliverables,
            [id]: {
              enabled: true,
              params: {
                ...getDefaultParametersForDeliverable(id),
                [key]: value,
              },
              sourceProductId: state.activeProduct ?? null,
            },
          };
        } else {
          newDeliverables = {
            ...state.selectedDeliverables,
            [id]: {
              ...current,
              params: {
                ...current.params,
                [key]: value,
              },
              sourceProductId: current.sourceProductId ?? state.activeProduct ?? null,
            },
          };
        }

        const newState = {
          ...state,
          lastFocusedDeliverableId: id,
          selectedDeliverables: newDeliverables,
        };
        saveToStorage(newState);
        return newState;
      });
    },

    resetAll: () => {
      const newState = { ...initialState };
      if (typeof window !== 'undefined') {
        localStorage.removeItem('produktkatalog-config');
      }
      set(newState);
    },

    setPersistEnabled: (enabled: boolean) => {
      set((state) => {
        const newState = { ...state, persistEnabled: enabled };
        if (enabled) {
          saveToStorage(newState);
        } else if (typeof window !== 'undefined') {
          localStorage.removeItem('produktkatalog-config');
        }
        return newState;
      });
    }
  };
});
