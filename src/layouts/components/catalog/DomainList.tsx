import { Badge } from "./ui/badge";
import { domains } from "../data/domains";
import * as LucideIcons from "lucide-react";
import { cn } from "../lib/utils";

interface DomainListProps {
  selectedDomainId: string | null;
  onSelectDomain: (domainId: string) => void;
}

/**
 * Vertikale Domain Liste als Pills/Rows
 * Sticky oben im Panel
 */
export function DomainList({ selectedDomainId, onSelectDomain }: DomainListProps) {
  return (
    <div className="space-y-1">
      {domains.map((domain) => {
        const Icon = (LucideIcons as any)[domain.icon] || LucideIcons.Briefcase;
        const isSelected = selectedDomainId === domain.id;
        const isDisabled = !domain.enabled;

        return (
          <button
            key={domain.id}
            onClick={() => !isDisabled && onSelectDomain(domain.id)}
            disabled={isDisabled}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
              "transition-all duration-200",
              "text-left",
              {
                // Active state
                "bg-[hsl(var(--accent)/0.1)] border-l-2 border-[hsl(var(--accent))]": isSelected && !isDisabled,
                "bg-[hsl(var(--surface2))]": isSelected && !isDisabled,
                // Hover state
                "hover:bg-[hsl(var(--surface2))]": !isDisabled && !isSelected,
                // Disabled state
                "opacity-50 cursor-not-allowed": isDisabled,
                "cursor-pointer": !isDisabled,
              }
            )}
          >
            <Icon className={cn(
              "h-5 w-5 shrink-0",
              isSelected && !isDisabled ? "text-[hsl(var(--accent))]" : "text-[hsl(var(--muted))]"
            )} />
            <span className={cn(
              "flex-1 text-sm font-medium",
              isSelected && !isDisabled ? "text-[hsl(var(--text))]" : "text-[hsl(var(--muted))]"
            )}>
              {domain.name}
            </span>
            {isDisabled && (
              <Badge variant="outline" className="text-xs shrink-0">
                Coming soon
              </Badge>
            )}
          </button>
        );
      })}
    </div>
  );
}
