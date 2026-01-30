import { ShoppingCart } from "lucide-react";
import { useConfigStore } from "../stores/configStore";
import { formatPrice } from "../lib/pricing";
import { cn } from "../lib/utils";

interface CartButtonProps {
  onClick: () => void;
}

/**
 * Cart Button - Minimaler Floating Button mit Badge
 */
export function CartButton({ onClick }: CartButtonProps) {
  const cartWithPrices = useConfigStore((state) => state.getCartWithPrices());
  const cartCount = cartWithPrices.length;
  const totalPrice = useConfigStore((state) => state.getTotalPrice());

  if (cartCount === 0) {
    return null; // Nicht anzeigen wenn leer
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-40",
        "flex items-center gap-2 px-4 py-3 rounded-full",
        "bg-accent text-background shadow-lg hover:shadow-xl",
        "transition-all duration-200",
        "font-medium text-sm"
      )}
      aria-label="Warenkorb öffnen"
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="whitespace-nowrap">
        Warenkorb ({cartCount})
      </span>
      <span className="whitespace-nowrap font-semibold">
        · {formatPrice(totalPrice)}
      </span>
    </button>
  );
}
