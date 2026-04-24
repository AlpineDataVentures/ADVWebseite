import { Info, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "../lib/utils";

type InfoBannerVariant = "info" | "success" | "warning" | "error";

interface InfoBannerProps {
  variant?: InfoBannerVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<InfoBannerVariant, { icon: typeof Info; bg: string; border: string; text: string }> = {
  info: {
    icon: Info,
    bg: "bg-[hsl(var(--accent)/0.1)]",
    border: "border-[hsl(var(--accent)/0.3)]",
    text: "text-[hsl(var(--accent))]"
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-500"
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-500"
  },
  error: {
    icon: AlertCircle,
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-500"
  }
};

/**
 * Info Banner Component
 * Zeigt Informationen, Warnungen oder Erfolgsmeldungen
 */
export function InfoBanner({ variant = "info", title, children, className }: InfoBannerProps) {
  const styles = variantStyles[variant];
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border",
        styles.bg,
        styles.border,
        className
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", styles.text)} />
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={cn("font-semibold text-sm mb-1", styles.text)}>
            {title}
          </h4>
        )}
        <div className={cn("text-sm", title ? "text-[hsl(var(--muted))]" : styles.text)}>
          {children}
        </div>
      </div>
    </div>
  );
}
