import { cn } from '../lib/utils';
import { getUseCasesForUiCluster, uiClusterLabels, uiClusterOrder, type UiClusterId } from '../data/useCases';

interface TopBarProps {
  activeCluster: UiClusterId | null;
  onClusterChange: (cluster: UiClusterId | null) => void;
  hasMatchesForSelection?: boolean;
  title?: string;
}

/**
 * TopBar mit Domain Tabs und Search.
 * Theme Toggle lebt im globalen Header (ThemeSwitcher.astro) → hier nicht nötig.
 */
export function TopBar({
  activeCluster,
  onClusterChange,
  hasMatchesForSelection = true,
  title = 'ADV Produktkatalog'
}: TopBarProps) {
  const visibleClusterOptions = uiClusterOrder
    .filter((clusterId) => getUseCasesForUiCluster(clusterId).length > 0)
    .map((clusterId) => ({
      id: clusterId,
      label: uiClusterLabels[clusterId],
    }));

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border dark:border-darkmode-border bg-light/95 dark:bg-darkmode-light/95 backdrop-blur supports-[backdrop-filter]:bg-light/80 supports-[backdrop-filter]:dark:bg-darkmode-light/80">
      <div className="container mx-auto px-4">
        {/* Title row */}
        <div className="flex h-12 items-center justify-between gap-4">
          <h1 className="text-base font-semibold text-text dark:text-darkmode-text shrink-0">
            {title}
          </h1>
        </div>

        <nav className="flex flex-wrap gap-1 border-t border-border dark:border-darkmode-border py-1.5 -mb-px">
          {visibleClusterOptions.map((cluster) => {
            const isActive = activeCluster === cluster.id;
            return (
              <button
                key={cluster.id}
                type="button"
                onClick={() => onClusterChange(cluster.id)}
                className={cn(
                  "flex items-center px-3 py-1 rounded-md text-sm font-medium transition-all duration-150",
                  isActive
                    ? "text-green-700 dark:text-green-400 bg-green-500/8 dark:bg-green-500/10 ring-1 ring-green-600/20 dark:ring-green-400/20"
                    : "text-text-light dark:text-darkmode-text-light hover:text-text dark:hover:text-darkmode-text hover:bg-light dark:hover:bg-darkmode-light"
                )}
              >
                <span className="whitespace-nowrap">{cluster.label}</span>
              </button>
            );
          })}
        </nav>

        {activeCluster && !hasMatchesForSelection && (
          <p className="pb-2 text-xs text-text-light dark:text-darkmode-text-light">
            Für diesen Cluster sind aktuell keine Use Cases hinterlegt.
          </p>
        )}
      </div>
    </header>
  );
}
