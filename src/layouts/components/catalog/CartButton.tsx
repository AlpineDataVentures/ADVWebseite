import { ShoppingCart } from "lucide-react";
import { useConfigStore } from "../stores/configStore";
import { formatPrice } from "../lib/pricing";
import { cn } from "../lib/utils";

interface CartButtonProps {
  onClick: () => void;
}

/**
 * Cart Button - Floating pill with count + total.
 * Uses ADV green, safe-area padding for iOS.
 */
export function CartButton({ onClick }: CartButtonProps) {
  const cartCount = useConfigStore((state) =>
    Object.values(state.selectedDeliverables).filter(d => d.enabled).length
  );
  const totalPrice = useConfigStore((state) => state.getTotalPrice());

  if (cartCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-40",
        "flex items-center gap-2 px-5 py-3 rounded-full",
        "bg-dark dark:bg-darkmode-dark text-white dark:text-dark",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-200 hover:scale-[1.02]",
        "font-medium text-sm",
        // iOS safe area
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      )}
      aria-label="Warenkorb öffnen"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="whitespace-nowrap">
        Warenkorb ({cartCount})
      </span>
      <span className="whitespace-nowrap font-semibold text-green-400">
        · {formatPrice(totalPrice)}
      </span>
    </button>
  );
}
