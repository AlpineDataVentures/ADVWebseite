import { useState, useEffect } from 'react';
import { TopBar } from './TopBar';
import { FinderPanel } from './FinderPanel';
import { BundleView } from './BundleView';
import { ConfigView } from './ConfigView';
import { CartButton } from './CartButton';
import { CartSheet } from './CartSheet';
import { HeroEmptyState } from './HeroEmptyState';
import { useConfigStore } from '../stores/configStore';
import { getUseCaseById } from '../data/useCases';
import { getBundleForUseCase } from '../data/recommendations';

/**
 * Demo Shop App - Moderner interaktiver Konfigurator
 * Layout: TopBar + 3 Spalten (Finder | Content | Cart Button)
 * Flow: Domain -> Use Case -> Bundle -> Konfiguration
 */
export default function DemoShopApp() {
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);
  const [activeUseCaseId, setActiveUseCaseId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'bundle' | 'configure'>('bundle');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const setBundleFromUseCase = useConfigStore((state) => state.setBundleFromUseCase);
  const setActiveUseCase = useConfigStore((state) => state.setActiveUseCase);

  // Handle Domain Selection
  const handleDomainChange = (domainId: string | null) => {
    setActiveDomainId(domainId);
    // Reset use case when domain changes
    if (domainId !== activeDomainId) {
      setActiveUseCaseId(null);
      setViewMode('bundle');
    }
  };

  // Handle Use Case Selection
  const handleUseCaseSelect = (useCaseId: string) => {
    if (!useCaseId) return;

    setActiveUseCaseId(useCaseId);
    setActiveUseCase(useCaseId);
    setBundleFromUseCase(useCaseId);
    setViewMode('bundle');

    // Scroll to top of middle panel
    setTimeout(() => {
      const middlePanel = document.querySelector('[data-middle-panel]');
      if (middlePanel) {
        middlePanel.scrollTop = 0;
      }
    }, 100);
  };

  // Handle Bundle -> Configuration
  const handleNextToConfiguration = () => {
    setViewMode('configure');
    setTimeout(() => {
      const middlePanel = document.querySelector('[data-middle-panel]');
      if (middlePanel) {
        middlePanel.scrollTop = 0;
      }
    }, 100);
  };

  // Handle Back Navigation
  const handleBack = () => {
    if (viewMode === 'configure') {
      setViewMode('bundle');
    } else if (activeUseCaseId) {
      setActiveUseCaseId(null);
      setActiveUseCase(null);
    }
  };

  // Dev Sanity Checks
  useEffect(() => {
    if (activeUseCaseId && process.env.NODE_ENV === 'development') {
      const recommendations = getBundleForUseCase(activeUseCaseId);
      if (recommendations.length === 0) {
        console.warn(`[DemoShopApp] No recommendations found for useCaseId: ${activeUseCaseId}`);
      } else {
        console.log(`[DemoShopApp] Loaded ${recommendations.length} recommendations for useCaseId: ${activeUseCaseId}`);
      }
    }
  }, [activeUseCaseId]);

  const useCase = activeUseCaseId ? getUseCaseById(activeUseCaseId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-body text-text dark:text-darkmode-text">
      {/* TopBar with Domain Tabs */}
      <TopBar
        activeDomainId={activeDomainId}
        onDomainChange={handleDomainChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content: 3 Columns */}
      <main className="flex-1 min-h-0">
        <div className="container mx-auto h-full px-4 py-6">
          <div className="grid grid-cols-12 gap-6 h-full min-h-0">

            {/* Left: Finder Panel */}
            <aside className="hidden lg:block lg:col-span-3 min-h-0 flex flex-col">
              <FinderPanel
                activeDomainId={activeDomainId}
                activeUseCaseId={activeUseCaseId}
                onSelectUseCase={handleUseCaseSelect}
                searchQuery={searchQuery}
              />
            </aside>

            {/* Middle: Content Panel */}
            <section
              data-middle-panel
              className="col-span-12 lg:col-span-9 min-h-0 overflow-y-auto"
            >
              {!useCase ? (
                <HeroEmptyState />
              ) : viewMode === 'bundle' ? (
                <BundleView
                  useCaseId={activeUseCaseId}
                  onNext={handleNextToConfiguration}
                  onBack={handleBack}
                />
              ) : (
                <ConfigView
                  useCaseId={activeUseCaseId}
                  onBack={handleBack}
                />
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Cart Button (Floating) */}
      <CartButton onClick={() => setCartOpen(true)} />

      {/* Cart Sheet */}
      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        onGoToConfig={() => {
          if (useCase) {
            setViewMode('configure');
            setCartOpen(false);
          }
        }}
      />
    </div>
  );
}
