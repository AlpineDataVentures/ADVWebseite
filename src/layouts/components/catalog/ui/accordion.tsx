import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionContextValue {
  value: string[];
  onValueChange: (value: string[]) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);
const ItemContext = React.createContext<{ value: string } | undefined>(undefined);

interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
  className?: string;
}

const Accordion = ({ type = "single", defaultValue, value, onValueChange, children, className }: AccordionProps) => {
  const [internalValue, setInternalValue] = React.useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  );
  
  const currentValue = value !== undefined 
    ? (Array.isArray(value) ? value : [value])
    : internalValue;
  
  const handleValueChange = (itemValue: string) => {
    let newValue: string[];
    if (type === "single") {
      newValue = currentValue.includes(itemValue) ? [] : [itemValue];
    } else {
      newValue = currentValue.includes(itemValue)
        ? currentValue.filter(v => v !== itemValue)
        : [...currentValue, itemValue];
    }
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    if (onValueChange) {
      onValueChange(type === "single" ? newValue[0] || "" : newValue);
    }
  };
  
  return (
    <AccordionContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className={cn("space-y-2", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionItem = ({ value, children, className }: AccordionItemProps) => {
  return (
    <div className={cn("border rounded-lg", className)} data-value={value}>
      {children}
    </div>
  );
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = ({ children, className }: AccordionTriggerProps) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within Accordion");
  
  const item = React.useContext(ItemContext);
  if (!item) throw new Error("AccordionTrigger must be used within AccordionItem");
  
  const isOpen = context.value.includes(item.value);
  
  return (
    <button
      type="button"
      onClick={() => context.onValueChange(item.value)}
      className={cn(
        "flex w-full items-center justify-between p-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = ({ children, className }: AccordionContentProps) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within Accordion");
  
  const item = React.useContext(ItemContext);
  if (!item) throw new Error("AccordionContent must be used within AccordionItem");
  
  const isOpen = context.value.includes(item.value);
  
  if (!isOpen) return null;
  
  return (
    <div className={cn("overflow-hidden text-sm transition-all", className)}>
      <div className="p-4 pt-0">{children}</div>
    </div>
  );
};

// Wrapper to provide ItemContext
const AccordionItemWithContext = ({ value, children, className }: AccordionItemProps) => {
  return (
    <ItemContext.Provider value={{ value }}>
      <AccordionItem value={value} className={className}>
        {children}
      </AccordionItem>
    </ItemContext.Provider>
  );
};

export { Accordion, AccordionItemWithContext as AccordionItem, AccordionTrigger, AccordionContent };
