import * as React from "react";
import { cn } from "../../lib/utils";

// Simple Tooltip Implementation (ohne Radix UI Dependency)
interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined);

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative">
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ children, asChild, className, ...props }, ref) => {
  const context = React.useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger must be used within Tooltip");
  
  const handleMouseEnter = () => context.setOpen(true);
  const handleMouseLeave = () => context.setOpen(false);
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      className: cn(className, children.props.className),
      ...props,
    } as any);
  }
  
  return (
    <button
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", sideOffset = 4, children, ...props }, ref) => {
    const context = React.useContext(TooltipContext);
    if (!context) throw new Error("TooltipContent must be used within Tooltip");
    
    if (!context.open) return null;
    
    const sideClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 overflow-hidden rounded-md bg-[hsl(var(--surface))] px-3 py-1.5 text-xs text-[hsl(var(--text))] shadow-lg border border-[hsl(var(--border))]",
          "animate-in fade-in-0 zoom-in-95",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
