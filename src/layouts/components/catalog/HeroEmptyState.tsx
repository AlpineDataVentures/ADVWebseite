import { CheckCircle2, Zap, Eye, Settings } from "lucide-react";
import { cn } from "../lib/utils";

interface HeroEmptyStateProps {
  className?: string;
}

/**
 * Hero Empty State Component
 * Zeigt große Headline, Subline und 3 Value Props
 */
export function HeroEmptyState({ className }: HeroEmptyStateProps) {
  const valueProps = [
    {
      icon: Zap,
      title: "Schnell",
      description: "In wenigen Minuten zum passenden Paket"
    },
    {
      icon: Eye,
      title: "Transparent",
      description: "Preise sofort sichtbar, keine versteckten Kosten"
    },
    {
      icon: Settings,
      title: "Konfigurierbar",
      description: "Passe Parameter an deine Bedürfnisse an"
    }
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text dark:text-darkmode-text leading-tight">
          Use Case wählen.
          <br />
          Paket bekommen.
          <br />
          Preis sehen.
        </h1>
        <p className="text-lg md:text-xl text-text-light dark:text-darkmode-text-light leading-relaxed">
          Finden Sie die passende Beratungsleistung für Ihr Unternehmen.
        </p>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {valueProps.map((prop, idx) => {
          const Icon = prop.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl border border-border bg-light dark:bg-darkmode-light hover:shadow-sm hover:border-green-500/30 transition-all duration-200"
            >
              <div className="shrink-0 p-2 rounded-lg bg-green-500/10">
                <Icon className="h-5 w-5 text-text dark:text-darkmode-text" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-text dark:text-darkmode-text mb-1">
                  {prop.title}
                </h3>
                <p className="text-xs text-text-light dark:text-darkmode-text-light leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
