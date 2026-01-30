import { useState } from 'react';
import { DomainGrid } from './DomainGrid';
import { UseCaseList } from './UseCaseList';
import { CartSidebar } from './CartSidebar';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useConfigStore } from '../stores/configStore';

/**
 * Hauptkomponente für Use Case Finder
 * Step 1: Domänen-Grid
 * Step 2: Use Case Liste für ausgewählte Domäne
 */
export default function UseCasePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);
  
  const cartWithPrices = useConfigStore((state) => state.getCartWithPrices());
  const cartCount = cartWithPrices.length;
  const setBundleFromUseCase = useConfigStore((state) => state.setBundleFromUseCase);

  const handleSelectDomain = (domainId: string) => {
    setSelectedDomainId(domainId);
  };

  const handleBackToDomains = () => {
    setSelectedDomainId(null);
  };

  const handleSelectUseCase = (useCaseId: string) => {
    // Bundle laden
    setBundleFromUseCase(useCaseId);
    
    // Navigiere zu /configure
    window.location.href = `/configure?useCase=${useCaseId}`;
  };

  return (
    <>
      {/* Cart Button */}
      <div className="mb-6 flex justify-end">
        <Button
          variant="outline"
          onClick={() => setCartOpen(true)}
          className="relative"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Warenkorb
          {cartCount > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
              {cartCount}
            </span>
          )}
        </Button>
      </div>

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

      {/* Cart Sidebar */}
      <CartSidebar
        open={cartOpen}
        onOpenChange={setCartOpen}
        onCheckout={() => {
          setCartOpen(false);
          window.location.href = '/summary';
        }}
      />
    </>
  );
}
