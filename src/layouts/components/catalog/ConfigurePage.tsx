import { useState, useEffect } from 'react';
import { RecommendedBundleStep } from './RecommendedBundleStep';
import { DeliverableConfigurator } from './DeliverableConfigurator';
import { CartSidebar } from './CartSidebar';
import { Button } from './ui/button';
import { useConfigStore } from '../stores/configStore';
import { useCases } from '../data/seed';
import { formatPrice } from '../lib/pricing';

type WizardStep = 'recommendation' | 'configuration';

/**
 * Configure Page als Wizard mit 2 Schritten
 * Schritt A: Empfehlung (Recommended Bundle)
 * Schritt B: Konfigurieren (Parameter)
 */
export default function ConfigurePage() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('recommendation');
  const [useCaseId, setUseCaseId] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  
  const setBundleFromUseCase = useConfigStore((state) => state.setBundleFromUseCase);
  const cartWithPrices = useConfigStore((state) => state.getCartWithPrices());
  const cartCount = cartWithPrices.length;

  // Use Case aus URL laden
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ucId = params.get('useCase');
      if (ucId) {
        setUseCaseId(ucId);
        // Bundle laden wenn noch nicht geladen
        const selectedDeliverables = useConfigStore.getState().selectedDeliverables;
        const hasDeliverables = Object.keys(selectedDeliverables).length > 0;
        if (!hasDeliverables) {
          setBundleFromUseCase(ucId);
        }
      }
    }
  }, [setBundleFromUseCase]);

  const useCase = useCaseId ? useCases.find(uc => uc.id === useCaseId) : null;

  const handleNext = () => {
    setCurrentStep('configuration');
  };

  const handleBack = () => {
    setCurrentStep('recommendation');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-3">
        {currentStep === 'recommendation' ? (
          <RecommendedBundleStep 
            useCaseId={useCaseId}
            onNext={handleNext}
          />
        ) : (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              ← Zurück zur Empfehlung
            </Button>
            <DeliverableConfigurator />
          </div>
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
                    <span>{formatPrice(useConfigStore.getState().getTotalPrice())}</span>
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

      {/* Mobile Cart Sidebar */}
      <CartSidebar
        open={cartOpen}
        onOpenChange={setCartOpen}
        onCheckout={() => {
          setCartOpen(false);
          window.location.href = '/summary';
        }}
      />
    </div>
  );
}
