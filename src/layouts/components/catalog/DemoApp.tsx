import { useState, useEffect } from 'react';
import { FinderPanel } from './FinderPanel';
import { RecommendedBundleStep } from './RecommendedBundleStep';
import { DeliverableConfigurator } from './DeliverableConfigurator';
import { CartSidebar, CartFloatingButton } from './CartSidebar';
import { TopBar } from './TopBar';
import { HeroEmptyState } from './HeroEmptyState';
import { Breadcrumb } from './Breadcrumb';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Sheet, SheetContent } from './ui/sheet';
import { Menu, X } from 'lucide-react';
import { useConfigStore } from '../stores/configStore';
import { getUseCaseById } from '../data/useCases';
import { formatPrice } from '../lib/pricing';
import { getBundleForUseCase } from '../data/recommendations';

/**
 * Demo App - Kompletter Flow auf einer Seite
 * Layout: 3-Spalten (Finder | Main | Cart)
 * Responsive: Tablet (Finder collapsible), Mobile (Tabs)
 */
export default function DemoApp() {
  const [useCaseId, setUseCaseId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'recommendation' | 'configuration'>('recommendation');
  const [cartOpen, setCartOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);

  const setBundleFromUseCase = useConfigStore((state) => state.setBundleFromUseCase);
  const setActiveUseCase = useConfigStore((state) => state.setActiveUseCase);
  const wizardStep = useConfigStore((state) => state.wizardStep);
  const setWizardStep = useConfigStore((state) => state.setWizardStep);
  const cartWithPrices = useConfigStore((state) => state.getCartWithPrices());
  const cartCount = cartWithPrices.length;
  const getTotalPrice = useConfigStore((state) => state.getTotalPrice());

  // Handle Use Case Selection
  const handleSelectUseCase = (selectedUseCaseId: string) => {
    if (!selectedUseCaseId) return;
    setUseCaseId(selectedUseCaseId);
    setActiveUseCase(selectedUseCaseId);
    setBundleFromUseCase(selectedUseCaseId);
    setCurrentStep('recommendation');
    setWizardStep(1);
    // Close finder on mobile/tablet
    setFinderOpen(false);
    // Scroll to top of middle panel
    setTimeout(() => {
      const middlePanel = document.querySelector('main.col-span-12.lg\\:col-span-6');
      if (middlePanel) {
        middlePanel.scrollTop = 0;
      }
    }, 100);
  };

  const handleDomainChange = (domainId: string | null) => {
    setSelectedDomainId(domainId);
    // Reset use case when domain changes
    if (domainId !== selectedDomainId) {
      setUseCaseId(null);
      setCurrentStep('recommendation');
    }
  };

  const handleNextToConfiguration = () => {
    setCurrentStep('configuration');
    setWizardStep(2);
  };

  const handleBackToRecommendation = () => {
    if (wizardStep === 2) {
      // Back from configuration to recommendation
      setCurrentStep('recommendation');
      setWizardStep(1);
      // Scroll to top
      setTimeout(() => {
        const middlePanel = document.querySelector('main.col-span-12.lg\\:col-span-6');
        if (middlePanel) {
          middlePanel.scrollTop = 0;
        }
      }, 100);
    } else if (useCaseId) {
      // If we're in recommendation step but have a use case, reset to finder
      setUseCaseId(null);
      setActiveUseCase(null);
      setCurrentStep('recommendation');
      setWizardStep(1);
    }
  };

  const handleGoToSummary = () => {
    window.location.href = '/summary';
  };

  const useCase = useCaseId ? getUseCaseById(useCaseId) : null;

  // Dev Sanity Checks / Assertions
  useEffect(() => {
    if (useCaseId && process.env.NODE_ENV === 'development') {
      const recommendations = getBundleForUseCase(useCaseId);
      if (recommendations.length === 0) {
        console.warn(`[DemoApp] No recommendations found for useCaseId: ${useCaseId}`);
      } else {
        console.log(`[DemoApp] Loaded ${recommendations.length} recommendations for useCaseId: ${useCaseId}`);
      }
    }
  }, [useCaseId]);

  return (
    <div className="flex flex-col h-screen bg-[hsl(var(--bg))]">
      {/* Top Bar */}
      <TopBar
        showCartButton={false}
        showSearch={true}
        title="ADV Produktkatalog (Demo)"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto h-full px-4 py-6">
          <div className="grid grid-cols-12 gap-6 h-full">

            {/* Left: Finder Panel (Desktop: col-span-3, Tablet: Sheet, Mobile: Tab) */}
            {/* Desktop */}
            <aside className="hidden lg:block lg:col-span-3">
              <FinderPanel
                activeUseCaseId={useCaseId}
                onSelectUseCase={handleSelectUseCase}
              />
            </aside>

            {/* Tablet: Finder as Sheet */}
            <Sheet open={finderOpen} onOpenChange={setFinderOpen}>
              <SheetContent side="left" className="w-[90vw] sm:w-[400px] p-0">
                <div className="h-full">
                  <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
                    <h2 className="panel-title mb-0">Use Case Finder</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setFinderOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="h-[calc(100%-4rem)]">
                    <FinderPanel
                      activeUseCaseId={useCaseId}
                      onSelectUseCase={handleSelectUseCase}
                      searchQuery={searchQuery}
                      onDomainChange={handleDomainChange}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Middle: Main Panel (Desktop: col-span-6, Mobile: Tab) */}
            <main className="col-span-12 lg:col-span-6 h-full overflow-y-auto">
              {/* Mobile: Tabs */}
              <div className="lg:hidden mb-4">
                <Tabs defaultValue="config" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                      value="finder"
                      onClick={() => {
                        setFinderOpen(true);
                        setCartOpen(false);
                      }}
                    >
                      Finder
                    </TabsTrigger>
                    <TabsTrigger
                      value="config"
                      onClick={() => {
                        setFinderOpen(false);
                        setCartOpen(false);
                      }}
                    >
                      Konfigurator
                    </TabsTrigger>
                    <TabsTrigger
                      value="cart"
                      onClick={() => {
                        setCartOpen(true);
                        setFinderOpen(false);
                      }}
                    >
                      Cart ({cartCount})
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="finder" className="mt-4 h-[calc(100vh-12rem)]">
                    <FinderPanel
                      activeUseCaseId={useCaseId}
                      onSelectUseCase={handleSelectUseCase}
                      searchQuery={searchQuery}
                      onDomainChange={handleDomainChange}
                    />
                  </TabsContent>
                  <TabsContent value="config" className="mt-4">
                    {/* Config Content */}
                    {!useCase ? (
                      <HeroEmptyState />
                    ) : currentStep === 'recommendation' ? (
                      <RecommendedBundleStep
                        useCaseId={useCaseId}
                        onNext={handleNextToConfiguration}
                      />
                    ) : (
                      <div className="space-y-4">
                        <Button variant="ghost" size="sm" onClick={handleBackToRecommendation}>
                          ← {wizardStep === 2 ? 'Zurück zur Empfehlung' : 'Zur Use-Case-Auswahl'}
                        </Button>
                        <DeliverableConfigurator onBackToRecommendation={handleBackToRecommendation} />
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="cart" className="mt-4">
                    <div className="card p-4">
                      {cartCount === 0 ? (
                        <p className="text-sm text-[hsl(var(--muted))] text-center py-8">
                          Keine Deliverables aktiviert
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {cartWithPrices.map((item) => {
                            if (!item.deliverable) return null;
                            return (
                              <div key={item.deliverableId} className="text-sm">
                                <p className="font-medium">{item.deliverable.name}</p>
                                <p className="text-[hsl(var(--muted))] text-xs line-clamp-1">
                                  {item.deliverable.shortDescription}
                                </p>
                                <p className="font-semibold mt-1 text-[hsl(var(--accent))]">
                                  {formatPrice(item.price)}
                                </p>
                              </div>
                            );
                          })}
                          <div className="pt-3 border-t border-[hsl(var(--border))]">
                            <div className="flex justify-between font-bold">
                              <span>Gesamt</span>
                              <span className="text-[hsl(var(--accent))]">
                                {formatPrice(getTotalPrice())}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Desktop: Stepper / Content */}
              <div className="hidden lg:block space-y-6">
                {/* Step Indicator */}
                <div className="flex items-center gap-2 mb-6">
                  <div className={`flex items-center gap-2 ${currentStep === 'recommendation' ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--muted))]'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'recommendation' ? 'bg-[hsl(var(--accent))] text-white' : 'bg-[hsl(var(--surface2))]'}`}>
                      1
                    </div>
                    <span className="font-medium">Empfehlung</span>
                  </div>
                  <div className="flex-1 h-px bg-[hsl(var(--border))]"></div>
                  <div className={`flex items-center gap-2 ${currentStep === 'configuration' ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--muted))]'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'configuration' ? 'bg-[hsl(var(--accent))] text-white' : 'bg-[hsl(var(--surface2))]'}`}>
                      2
                    </div>
                    <span className="font-medium">Konfiguration</span>
                  </div>
                </div>

                {/* Breadcrumb */}
                {useCase && (
                  <Breadcrumb
                    domainId={selectedDomainId}
                    useCaseId={useCaseId}
                    className="mb-4"
                  />
                )}

                {/* Content */}
                {!useCase ? (
                  <HeroEmptyState />
                ) : currentStep === 'recommendation' ? (
                  <RecommendedBundleStep
                    useCaseId={useCaseId}
                    onNext={handleNextToConfiguration}
                  />
                ) : (
                  <div className="space-y-4">
                    <Button variant="ghost" size="sm" onClick={handleBackToRecommendation}>
                      ← {wizardStep === 2 ? 'Zurück zur Empfehlung' : 'Zur Use-Case-Auswahl'}
                    </Button>
                    <DeliverableConfigurator onBackToRecommendation={handleBackToRecommendation} />
                  </div>
                )}
              </div>
            </main>

            {/* Right: Cart Sidebar (Desktop: col-span-3, Mobile: Sheet) */}
            <CartSidebar
              open={false}
              onOpenChange={() => { }}
              onCheckout={handleGoToSummary}
              variant="desktop"
            />
          </div>
        </div>
      </div>

      {/* Mobile: Cart Sheet + Floating Button */}
      <CartSidebar
        open={cartOpen}
        onOpenChange={setCartOpen}
        onCheckout={handleGoToSummary}
        variant="mobile"
      />
      <CartFloatingButton onClick={() => setCartOpen(true)} />
    </div>
  );
}
