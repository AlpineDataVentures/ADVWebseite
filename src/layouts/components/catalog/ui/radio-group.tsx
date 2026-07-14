import * as React from "react";
import { cn } from "../../lib/utils";

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);

interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, defaultValue, onValueChange, children, className }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const currentValue = value !== undefined ? value : internalValue;

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("space-y-2", className)} role="radiogroup">
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps {
  value: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const RadioGroupItem = React.forwardRef<HTMLLabelElement, RadioGroupItemProps>(
  ({ value, id, className, children }, ref) => {
    const context = React.useContext(RadioGroupContext);
    if (!context) throw new Error("RadioGroupItem must be used within RadioGroup");

    const isChecked = context.value === value;
    const inputId = id ?? `radio-${value}`;

    return (
      <label
        ref={ref}
        htmlFor={inputId}
        className={cn(
          "flex items-center gap-3 min-h-[44px] w-full rounded-lg border px-3 py-2 cursor-pointer transition-colors",
          isChecked
            ? "border-green-600/50 bg-green-500/10 dark:border-green-400/40 dark:bg-green-400/10"
            : "border-border dark:border-darkmode-border hover:bg-light/80 dark:hover:bg-darkmode-light/80",
          className
        )}
      >
        <input
          type="radio"
          id={inputId}
          value={value}
          checked={isChecked}
          onChange={() => context.onValueChange(value)}
          className="h-5 w-5 shrink-0 border-border text-green-600 focus:ring-green-600 focus:ring-offset-2 pointer-events-auto"
        />
        <span className="text-sm font-medium leading-snug text-text dark:text-darkmode-text select-none">
          {children}
        </span>
      </label>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
