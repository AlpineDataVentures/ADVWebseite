import { cn } from "../lib/utils";

interface SectionHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Section Header Component
 * Moderne Consulting-Homepage Struktur:
 * - Kleine Overline (uppercase muted)
 * - Große H2
 * - kurze Beschreibung
 */
export function SectionHeader({ overline, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {overline && (
        <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted))]">
          {overline}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--text))] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-base text-[hsl(var(--muted))] leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
