import { useState, useEffect } from 'react';
import { DomainGrid } from './DomainGrid';
import { UseCaseList } from './UseCaseList';
import { RecommendedBundleStep } from './RecommendedBundleStep';
import { DeliverableConfigurator } from './DeliverableConfigurator';
import { CartSidebar } from './CartSidebar';
import { SummaryPage } from './SummaryPage';
import { TopBar } from './TopBar';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useConfigStore } from '../stores/configStore';
import { formatPrice } from '../lib/pricing';
import { getUseCaseById } from '../data/useCases';

export type AppView = 'use-cases' | 'configure' | 'summary';

export interface AdvConfiguratorAppProps {
  initialView?: AppView;
  initialUseCaseId?: string | null;
  onViewChange?: (view: AppView) => void;
  onUseCaseSelect?: (useCaseId: string) => void;
  className?: string;
  // Demo-Mode: zeigt Use Cases und Configurator gleichzeitig
  demoMode?: boolean;
}

/**
 * Eigenständige React-Komponente für den gesamten Konfigurator-Flow
 * Kann per <AdvConfiguratorApp client:load /> in Astro-Seiten eingebunden werden
 * 
 * Verwaltet internes Routing via State (keine Backend Calls)
 * Alle Daten aus src/data/*
 */
export default function AdvConfiguratorApp({
  initialView = 'use-cases',
  initialUseCaseId = null,
  onViewChange,
  onUseCaseSelect,
  className = '',
  demoMode = false
}: AdvConfiguratorAppProps) {
  const [currentView, setCurrentView] = useState<AppView>(initialView);
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);
  const [useCaseId, setUseCaseId] = useState<string | null>(initialUseCaseId);
  const [currentStep, setCurrentStep] = useState<'recommendation' | 'configuration'>('recommendation');
  const [cartOpen, setCartOpen] = useState(false);

  const setBundleFromUseCase = useConfigStore((state) => state.setBundleFromUseCase);
  const cartWithPrices = useConfigStore((state) => state.getCartWithPrices());
  const cartCount = cartWithPrices.length;
  const selectedUseCases = useConfigStore((state) => state.selectedUseCases);
  const getTotalPrice = useConfigStore((state) => state.getTotalPrice);

  const activeUseCase = useConfigStore((state) => state.activeUseCase);
  const wizardStep = useConfigStore((state) => state.wizardStep);
  const setActiveUseCase = useConfigStore((state) => state.setActiveUseCase);
  const setWizardStep = useConfigStore((state) => state.setWizardStep);

  // URL-Parameter lesen beim Mount (für Navigation von Astro pages)
  useEffect(() => {
    if (typeof window !== 'undefined' && !demoMode && currentView === 'configure') {
      const params = new URLSearchParams(window.location.search);
      const ucId = params.get('useCase');
      
      if (ucId) {
        setActiveUseCase(ucId);
        setUseCaseId(ucId);
        setBundleFromUseCase(ucId);
        setWizardStep(1); // Reset to step 1
      } else if (activeUseCase) {
        // Fallback: use activeUseCase from store
        setUseCaseId(activeUseCase);
        setBundleFromUseCase(activeUseCase);
        setWizardStep(1);
      }
    }
  }, []); // Only run on mount

  // Sync wizardStep with currentStep
  useEffect(() => {
    if (currentView === 'configure') {
      const step = wizardStep === 1 ? 'recommendation' : 'configuration';
      if (step !== currentStep) {
        setCurrentStep(step);
      }
    }
  }, [wizardStep, currentView, currentStep]);

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    if (onViewChange) {
      onViewChange(view);
    }
    // Update URL wenn nicht in demoMode
    if (!demoMode && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (view === 'use-cases') {
        url.pathname = '/use-cases';
        url.search = '';
      } else if (view === 'configure') {
        url.pathname = '/configure';
        if (useCaseId) {
          url.search = `?useCase=${useCaseId}`;
        }
      } else if (view === 'summary') {
        url.pathname = '/summary';
        url.search = '';
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleSelectDomain = (domainId: string) => {
    setSelectedDomainId(domainId);
  };

  const handleBackToDomains = () => {
    setSelectedDomainId(null);
  };

  const handleSelectUseCase = (selectedUseCaseId: string) => {
    setUseCaseId(selectedUseCaseId);
    setBundleFromUseCase(selectedUseCaseId);
    
    if (onUseCaseSelect) {
      onUseCaseSelect(selectedUseCaseId);
    }
    
    // In demoMode: bleibe in use-cases view, sonst navigiere zu configure
    if (!demoMode) {
      handleViewChange('configure');
    }
  };

  const handleNextToConfiguration = () => {
    setCurrentStep('configuration');
    setWizardStep(2);
  };

  const handleBackToRecommendation = () => {
    if (wizardStep === 2) {
      setCurrentStep('recommendation');
      setWizardStep(1);
    } else {
      // Navigate back to use-cases
      if (!demoMode) {
        window.location.href = '/use-cases';
      } else {
        handleViewChange('use-cases');
      }
    }
  };

  const handleGoToSummary = () => {
    if (!demoMode) {
      handleViewChange('summary');
    }
  };

  const handleBackToUseCases = () => {
    handleViewChange('use-cases');
    setSelectedDomainId(null);
    setUseCaseId(null);
  };

  // Render basierend auf currentView
  const renderContent = () => {
    switch (currentView) {
      case 'use-cases':
        return (
          <>
            {/* Cart Button (nur wenn nicht demoMode) */}
            {!demoMode && (
              <div className="mb-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setCartOpen(true)}
                  className="relative"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Warenkorb
                  {cartCount > 0 && (
                    <span className="ml-2 bg-green-600 text-white rounded-full px-2 py-0.5 text-xs">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </div>
            )}

            {/* Content: Domain Grid oder Use Case List */}
            {selectedDomainId ? (
              <UseCaseList
                domainId={selectedDomainId}
                onSelectUseCase={handleSelectUseCase}
                onBack={handleBackToDomains}
              />
            ) : (
              <DomainGrid
                onSelectDomain={handleSelectDomain}
              />
            )}
          </>
        );

      case 'configure':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Back Button */}
              <div className="mb-4">
                <Button variant="ghost" size="sm" onClick={handleBackToRecommendation}>
                  ← {wizardStep === 2 ? 'Zurück zur Empfehlung' : 'Zur Use-Case-Auswahl'}
                </Button>
              </div>
              
              {currentStep === 'recommendation' ? (
                <RecommendedBundleStep 
                  useCaseId={useCaseId}
                  onNext={handleNextToConfiguration}
                />
              ) : (
                <DeliverableConfigurator onComplete={handleGoToSummary} />
              )}
            </div>

            {/* Cart Sidebar - Desktop: immer sichtbar, Mobile: Sheet */}
            <div className="lg:col-span-1">
              {/* Desktop: Fixed Sidebar */}
              <div className="hidden lg:block sticky top-4">
                <div className="border rounded-lg p-4 bg-light dark:bg-darkmode-light">
                  <h3 className="font-semibold mb-4">Warenkorb</h3>
                  {cartCount === 0 ? (
                    <p className="text-sm text-text-light dark:text-darkmode-text-light text-center py-4">
                      Keine Deliverables aktiviert
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {cartWithPrices.map((item) => {
                        if (!item.deliverable) return null;
                        return (
                          <div key={item.deliverableId} className="text-sm">
                            <p className="font-medium">{item.deliverable.name}</p>
                            <p className="text-text-light dark:text-darkmode-text-light text-xs line-clamp-1">
                              {item.deliverable.shortDescription}
                            </p>
                            <p className="font-semibold mt-1">{formatPrice(item.price)}</p>
                          </div>
                        );
                      })}
                      <div className="pt-3 border-t">
                        <div className="flex justify-between font-bold">
                          <span>Gesamt</span>
                          <span>{formatPrice(getTotalPrice())}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile: Cart Button */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  onClick={() => setCartOpen(true)}
                  className="w-full relative"
                >
                  Warenkorb
                  {cartCount > 0 && (
                    <span className="ml-2 bg-green-600 text-white rounded-full px-2 py-0.5 text-xs">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        );

      case 'summary':
        return (
          <SummaryPage 
            onBack={() => handleViewChange('configure')}
            onNew={() => handleBackToUseCases()}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {/* Top Bar mit Theme Toggle */}
      <TopBar 
        onCartClick={() => setCartOpen(true)}
        showCartButton={!demoMode && currentView !== 'use-cases'}
      />

      {renderContent()}

      {/* Cart Sidebar (Mobile) */}
      <CartSidebar
        open={cartOpen}
        onOpenChange={setCartOpen}
        onCheckout={handleGoToSummary}
      />
    </div>
  );
}
