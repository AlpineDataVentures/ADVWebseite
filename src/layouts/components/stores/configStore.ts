import { create } from 'zustand';
import type { DeliverableParameters, CartItem } from '../data/models';
import { globalParameters } from '../data/parameters';
import { getBundleForUseCase } from '../data/recommendations';
import { getDeliverableById, calculateCartItemPrice } from '../lib/pricing';

/**
 * Deliverable State
 */
interface DeliverableState {
  enabled: boolean;
  params: DeliverableParameters;
}

/**
 * Store State
 */
interface ConfigState {
  // State
  selectedUseCases: string[];
  selectedDeliverables: Record<string, DeliverableState>;
  persistEnabled: boolean;
  activeUseCase: string | null;
  wizardStep: 1 | 2; // 1 = Recommendation, 2 = Configuration
  hasBundleLoadedForUseCase: string | null; // Track which useCase has bundle loaded
  
  // Actions
  selectUseCase: (id: string) => void;
  deselectUseCase: (id: string) => void;
  setActiveUseCase: (id: string | null) => void;
  setBundleFromUseCase: (useCaseId: string) => void;
  setWizardStep: (step: 1 | 2) => void;
  toggleDeliverable: (id: string, enabled: boolean) => void;
  updateDeliverableParam: (id: string, key: string, value: string | number) => void;
  resetAll: () => void;
  setPersistEnabled: (enabled: boolean) => void;
  
  // Getters (computed)
  getCart: () => CartItem[];
  getCartWithPrices: () => Array<CartItem & { deliverable: ReturnType<typeof getDeliverableById>; price: number; breakdown: ReturnType<typeof calculateCartItemPrice> }>;
  getTotalPrice: () => number;
}

// Default-Parameter aus globalen Parametern
function getDefaultParameters(): DeliverableParameters {
  const defaults: DeliverableParameters = {};
  globalParameters.forEach(param => {
    defaults[param.key] = typeof param.default === 'string' 
      ? param.default 
      : param.default;
  });
  return defaults;
}

// Initial State
const initialState = {
  selectedUseCases: [],
  selectedDeliverables: {},
  persistEnabled: true, // Default enabled for persistence
  activeUseCase: null,
  wizardStep: 1 as const,
  hasBundleLoadedForUseCase: null
};

// Load from localStorage
function loadFromStorage(): Partial<ConfigState> {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem('produktkatalog-config');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        selectedUseCases: parsed.selectedUseCases || [],
        selectedDeliverables: parsed.selectedDeliverables || {},
        persistEnabled: parsed.persistEnabled !== undefined ? parsed.persistEnabled : true,
        activeUseCase: parsed.activeUseCase || null,
        wizardStep: parsed.wizardStep || 1,
        hasBundleLoadedForUseCase: parsed.hasBundleLoadedForUseCase || null
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
      selectedUseCases: state.selectedUseCases,
      selectedDeliverables: state.selectedDeliverables,
      persistEnabled: state.persistEnabled,
      activeUseCase: state.activeUseCase,
      wizardStep: state.wizardStep,
      hasBundleLoadedForUseCase: state.hasBundleLoadedForUseCase
    }));
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
}

export const useConfigStore = create<ConfigState>((set, get) => {
  // Initial load
  const loaded = loadFromStorage();
  const initial = { ...initialState, ...loaded };
  
  return {
    ...initial,
    
    // Getters
    getCart: () => {
      const state = get();
      return Object.entries(state.selectedDeliverables)
        .filter(([_, deliverableState]) => deliverableState.enabled)
        .map(([deliverableId, deliverableState]) => ({
          deliverableId,
          quantity: 1,
          parameters: deliverableState.params
        }));
    },
    
    getCartWithPrices: () => {
      const cart = get().getCart();
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
    },
    
    getTotalPrice: () => {
      const cart = get().getCart();
      return cart.reduce((total, item) => {
        const calculation = calculateCartItemPrice(item);
        return total + calculation.total;
      }, 0);
    },
    
    // Actions
    selectUseCase: (id: string) => {
      set((state) => {
        const newState = {
          ...state,
          selectedUseCases: state.selectedUseCases.includes(id)
            ? state.selectedUseCases
            : [...state.selectedUseCases, id]
        };
        saveToStorage(newState);
        return newState;
      });
    },
    
    deselectUseCase: (id: string) => {
      set((state) => {
        const newState = {
          ...state,
          selectedUseCases: state.selectedUseCases.filter(ucId => ucId !== id)
        };
        saveToStorage(newState);
        return newState;
      });
    },
    
    setActiveUseCase: (id: string | null) => {
      set((state) => {
        const newState = { ...state, activeUseCase: id };
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
    
    setBundleFromUseCase: (useCaseId: string) => {
      // Skip if bundle already loaded for this useCase
      const state = get();
      if (state.hasBundleLoadedForUseCase === useCaseId) {
        return;
      }
      
      // Verwende getBundleForUseCase aus recommendations.ts
      const recommendations = getBundleForUseCase(useCaseId);
      if (recommendations.length === 0) return;
      
      set((state) => {
        const newDeliverables: Record<string, DeliverableState> = { ...state.selectedDeliverables };
        
        // Registriere alle Recommendations, aber aktiviere NICHTS automatisch.
        // Der Nutzer muss Deliverables explizit per Toggle auswählen.
        recommendations.forEach(rec => {
          if (!newDeliverables[rec.deliverableId]) {
            newDeliverables[rec.deliverableId] = {
              enabled: false,
              params: getDefaultParameters()
            };
          }
          // Bereits vorhandene Deliverables behalten ihren enabled-Status
        });
        
        const newState = {
          ...state,
          selectedDeliverables: newDeliverables,
          selectedUseCases: state.selectedUseCases.includes(useCaseId)
            ? state.selectedUseCases
            : [...state.selectedUseCases, useCaseId],
          activeUseCase: useCaseId,
          hasBundleLoadedForUseCase: useCaseId,
          wizardStep: 1 // Reset to step 1 when loading bundle
        };
        saveToStorage(newState);
        return newState;
      });
    },
    
    toggleDeliverable: (id: string, enabled: boolean) => {
      set((state) => {
        const current = state.selectedDeliverables[id];
        const newState = {
          ...state,
          selectedDeliverables: {
            ...state.selectedDeliverables,
            [id]: {
              enabled,
              params: current?.params || getDefaultParameters()
            }
          }
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
          // Erstelle neues Deliverable mit Default-Parametern
          newDeliverables = {
            ...state.selectedDeliverables,
            [id]: {
              enabled: true,
              params: {
                ...getDefaultParameters(),
                [key]: value
              }
            }
          };
        } else {
          // Update bestehendes Deliverable
          newDeliverables = {
            ...state.selectedDeliverables,
            [id]: {
              ...current,
              params: {
                ...current.params,
                [key]: value
              }
            }
          };
        }
        
        const newState = {
          ...state,
          selectedDeliverables: newDeliverables
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
