import * as React from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface SheetContentProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
}

const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      {children}
    </div>
  );
};

const SheetContent = ({ children, side = "right", className }: SheetContentProps) => {
  return (
    <div
      className={cn(
        "fixed z-50 bg-background p-6 shadow-lg transition-transform",
        {
          "inset-y-0 right-0 w-full sm:w-96 border-l": side === "right",
          "inset-y-0 left-0 w-full sm:w-96 border-r": side === "left",
          "inset-x-0 top-0 border-b": side === "top",
          "inset-x-0 bottom-0 border-t": side === "bottom",
        },
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

const SheetHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left mb-4", className)}>
    {children}
  </div>
);

const SheetTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn("text-lg font-semibold text-foreground", className)}>
    {children}
  </h2>
);

const SheetDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("text-sm text-muted-foreground", className)}>
    {children}
  </p>
);

const SheetClose = ({ onClose }: { onClose: () => void }) => (
  <button
    onClick={onClose}
    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </button>
);

export { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose };
