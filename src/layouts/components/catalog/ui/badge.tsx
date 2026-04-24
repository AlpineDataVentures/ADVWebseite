import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        {
          // Subtiler ADV-Grün-Badge
          "border-green-600/30 bg-green-500/10 text-green-600 dark:bg-green-500/15 dark:text-green-400 hover:bg-green-500/20": variant === "default",
          "border-border dark:border-darkmode-border bg-light dark:bg-darkmode-light text-text-light dark:text-darkmode-text-light hover:bg-light/80 dark:hover:bg-darkmode-light/80": variant === "secondary",
          "border-transparent bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50": variant === "destructive",
          "border-border text-text dark:text-darkmode-text": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
