import { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { getEnabledDomains } from '../data/domains';
import { getDomainIcon } from '../lib/iconMap';
import { cn } from '../lib/utils';

interface TopBarProps {
  activeDomainId: string | null;
  onDomainChange: (domainId: string | null) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  title?: string;
}

/**
 * TopBar mit Domain Tabs und Search.
 * Theme Toggle lebt im globalen Header (ThemeSwitcher.astro) → hier nicht nötig.
 */
export function TopBar({
  activeDomainId,
  onDomainChange,
  searchQuery = '',
  onSearchChange,
  title = 'ADV Produktkatalog'
}: TopBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const domains = getEnabledDomains();

  // "/" Shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border dark:border-darkmode-border bg-light/95 dark:bg-darkmode-light/95 backdrop-blur supports-[backdrop-filter]:bg-light/80 supports-[backdrop-filter]:dark:bg-darkmode-light/80">
      <div className="container mx-auto px-4">
        {/* Title + Search row */}
        <div className="flex h-14 items-center justify-between gap-4">
          <h1 className="text-base font-semibold text-text dark:text-darkmode-text shrink-0">
            {title}
          </h1>
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light dark:text-darkmode-text-light shrink-0" />
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Use Cases suchen... (/)"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-9 h-9 border-border dark:border-darkmode-border"
              />
            </div>
          </div>
        </div>

        {/* Domain Tabs — flush with container (no extra padding) */}
        <nav className="flex flex-wrap gap-1 border-t border-border dark:border-darkmode-border py-2 -mb-px">
          {domains.map((domain) => {
            const Icon = getDomainIcon(domain.id);
            const isActive = activeDomainId === domain.id;

            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => onDomainChange(isActive ? null : domain.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150",
                  isActive
                    ? "text-green-700 dark:text-green-400 bg-green-500/8 dark:bg-green-500/10 ring-1 ring-green-600/20 dark:ring-green-400/20"
                    : "text-text-light dark:text-darkmode-text-light hover:text-text dark:hover:text-darkmode-text hover:bg-light dark:hover:bg-darkmode-light"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-green-600 dark:text-green-400" : ""
                  )}
                />
                <span className="whitespace-nowrap">{domain.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
