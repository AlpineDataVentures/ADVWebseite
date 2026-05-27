import { ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { getDomainByKey } from "../data/domains";
import { getUseCaseByKey } from "../data/useCases";

interface BreadcrumbProps {
  domainKey?: string | null;
  useCaseId?: string | null;
  className?: string;
}

/**
 * Breadcrumb Component
 * Zeigt: Domain > Use Case
 */
export function Breadcrumb({ domainKey, useCaseId, className }: BreadcrumbProps) {
  const domain = domainKey ? getDomainByKey(domainKey) : null;
  const useCase = useCaseId ? getUseCaseByKey(useCaseId) : null;

  if (!domain && !useCase) {
    return null;
  }

  return (
    <nav className={cn("flex items-center gap-2 text-sm", className)} aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {domain && (
          <>
            <li>
              <span className="text-[hsl(var(--muted))] font-medium">
                {domain.name}
              </span>
            </li>
            {useCase && (
              <>
                <li>
                  <ChevronRight className="h-4 w-4 text-[hsl(var(--muted))]" />
                </li>
                <li>
                  <span className="text-[hsl(var(--text))] font-semibold line-clamp-1">
                    {useCase.title}
                  </span>
                </li>
              </>
            )}
          </>
        )}
      </ol>
    </nav>
  );
}
