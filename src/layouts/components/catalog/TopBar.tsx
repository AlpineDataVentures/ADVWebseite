import { useRef, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
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
 * TopBar mit Domain Tabs, Search und Theme Toggle
 */
export function TopBar({
  activeDomainId,
  onDomainChange,
  searchQuery = '',
  onSearchChange,
  title = 'ADV Produktkatalog (Demo)'
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-light dark:bg-darkmode-light backdrop-blur supports-[backdrop-filter]:bg-light/80 supports-[backdrop-filter]:dark:bg-darkmode-light/80">
      <div className="container mx-auto px-4">
        {/* First Row: Title + Search + Theme */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo / Title */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <h1 className="text-lg font-semibold text-text dark:text-darkmode-text">
              {title}
            </h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-light dark:text-darkmode-text-light" />
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Use Cases durchsuchen... (/)"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-9 h-9 border-border"
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Second Row: Domain Tabs */}
        <div className="flex items-center gap-1 border-t border-border overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 min-w-max px-2 py-2">
            {domains.map((domain) => {
              const Icon = getDomainIcon(domain.id);
              const isActive = activeDomainId === domain.id;

              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => onDomainChange(isActive ? null : domain.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-200",
                    "border-b-2 border-transparent",
                    "hover:bg-light/70 dark:hover:bg-darkmode-light/70",
                    isActive
                      ? "border-green-500 text-green-600 dark:text-green-400 bg-green-500/5"
                      : "text-text-light dark:text-darkmode-text-light hover:text-text dark:hover:text-darkmode-text"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isActive ? "text-green-500" : "text-text-light dark:text-darkmode-text-light"
                    )}
                  />
                  <span className="whitespace-nowrap">{domain.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
