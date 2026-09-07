import { useEffect, useRef, useState } from 'react';
import { Loader2, Search, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ViewToggle, type ViewLayout } from './ViewToggle';
import { ProductTileGrid } from './UseCaseTileGrid';
import { ProductListView } from './ProductListView';
import type { Product } from '../data/useCases';
import type { LLMSearchOutcome } from '../data/catalogSearchLLM';
import { getFromPriceMap } from '../lib/pricing';
import { cn } from '../lib/utils';

export type LlmSearchState = {
  status: 'idle' | 'loading' | LLMSearchOutcome;
  query: string;
  products: Product[];
  retryAfterSeconds?: number;
};

interface AiSearchLandingProps {
  kiQuery: string;
  onKiQueryChange: (value: string) => void;
  llmSearch: LlmSearchState;
  kiUnavailableToday: boolean;
  rateLimitCountdown: number | null;
  onSubmit: () => void;
  onShowAll: () => void;
  onSelectProduct: (productId: string) => void;
}

/**
 * Alleiniger Einstieg in den Produktkatalog: ein einzelnes, ChatGPT-artiges
 * Suchfeld (keine Konversation, nur Einzelanfragen). Zeigt bewusst keine
 * Produkt- oder Bausteinübersicht, bis eine Anfrage abgeschickt wurde – der
 * einzige weitere sichtbare Einstieg ist der "Alle Produkte"-Button.
 *
 * Zustand (kiQuery/llmSearch) wird bewusst vom Elternteil (ProductCatalogApp)
 * übergeben statt lokal gehalten: so bleiben die letzten Suchergebnisse
 * erhalten, wenn man ein Produkt öffnet und wieder zurückgeht – ohne
 * erneuten API-Aufruf.
 */
const TEXTAREA_MAX_HEIGHT_PX = 240;

export function AiSearchLanding({
  kiQuery,
  onKiQueryChange,
  llmSearch,
  kiUnavailableToday,
  rateLimitCountdown,
  onSubmit,
  onShowAll,
  onSelectProduct,
}: AiSearchLandingProps) {
  const [viewLayout, setViewLayout] = useState<ViewLayout>('grid');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Feld wächst mit dem Text mit (wie bei ChatGPT/Claude), bis zu einer
  // Maximalhöhe, danach scrollt der Inhalt innerhalb des Felds.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT_PX)}px`;
  }, [kiQuery]);

  const hasResult = llmSearch.status !== 'idle';
  const isLoading = llmSearch.status === 'loading';

  const fromPriceById = getFromPriceMap(llmSearch.products);

  const kiSearchStatus = (() => {
    const query = kiQuery.trim();
    if (llmSearch.status === 'loading') return 'loading';
    if (llmSearch.status === 'rate_limited') return 'rate_limited';
    if (llmSearch.status === 'daily_limit') return 'daily_limit';
    if (query && llmSearch.query === query) {
      return llmSearch.status === 'error' ? 'error' : null;
    }
    return query ? 'stale' : null;
  })();

  return (
    <div className="min-h-[70vh] flex flex-col">
      <div className="flex justify-end pb-6">
        <Button variant="outline" onClick={onShowAll}>
          Alle Produkte
        </Button>
      </div>

      <div
        className={cn(
          'flex-1 flex flex-col items-center',
          hasResult ? 'justify-start' : 'justify-center pb-24'
        )}
      >
        <div className="w-full max-w-2xl space-y-4">
          {!hasResult && (
            <div className="text-center space-y-2 mb-2">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text dark:text-darkmode-text">
                Was möchten Sie umsetzen?
              </h1>
              <p className="text-base text-text-light dark:text-darkmode-text-light">
                Beschreiben Sie Ihr Anliegen in eigenen Worten – wir finden die passenden Produkte.
              </p>
            </div>
          )}

          <form
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {kiUnavailableToday ? (
              <Search className="absolute left-4 top-4 h-5 w-5 text-text-light dark:text-darkmode-text-light pointer-events-none" />
            ) : (
              <Sparkles className="absolute left-4 top-4 h-5 w-5 text-text-light dark:text-darkmode-text-light pointer-events-none" />
            )}
            <textarea
              ref={textareaRef}
              autoFocus
              rows={1}
              value={kiQuery}
              onChange={(e) => onKiQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit();
                }
              }}
              placeholder={
                kiUnavailableToday
                  ? 'Produkte, Bausteine, Themen durchsuchen…'
                  : 'z. B. „Wir wollen weg von Excel-Tabellen“ – Enter zum Suchen, Umschalt+Enter für Zeilenumbruch'
              }
              className="block w-full resize-none overflow-y-auto rounded-2xl border border-border/80 bg-light dark:bg-darkmode-light pl-12 pr-4 py-4 text-base leading-6 text-text dark:text-darkmode-text shadow-sm placeholder:text-text-light dark:placeholder:text-darkmode-text-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ maxHeight: TEXTAREA_MAX_HEIGHT_PX }}
              aria-label="Produktkatalog durchsuchen"
            />
          </form>

          {kiUnavailableToday && (
            <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
              KI-Suche heute ausgelastet – Standardsuche aktiv.
            </p>
          )}
          {kiSearchStatus === 'error' && (
            <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
              KI-Suche derzeit nicht verfügbar – Ergebnisse der Standardsuche werden angezeigt.
              Nutzen Sie bitte Schlagwörter anstatt ausformulierter Texte.
            </p>
          )}
          {kiSearchStatus === 'rate_limited' && (
            <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
              Zu viele Anfragen kurz hintereinander – bitte warte{' '}
              {rateLimitCountdown ?? llmSearch.retryAfterSeconds ?? ''} Sekunde
              {(rateLimitCountdown ?? llmSearch.retryAfterSeconds ?? 0) === 1 ? '' : 'n'}, bevor du erneut suchst.
            </p>
          )}
          {kiSearchStatus === 'daily_limit' && !kiUnavailableToday && (
            <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
              Unsere KI-Suche hat heute bereits sehr viele Anfragen bekommen und ist gerade nicht
              erreichbar – bitte versuche es morgen noch einmal. Ergebnisse der Standardsuche werden angezeigt.
              Nutzen Sie bitte Schlagwörter anstatt ausformulierter Texte.
            </p>
          )}
          {kiSearchStatus === 'stale' && (
            <p className="text-sm text-text-light dark:text-darkmode-text-light text-center">
              Enter drücken, um {kiUnavailableToday ? 'zu suchen' : `die KI-Suche für „${kiQuery.trim()}“ zu starten`}.
            </p>
          )}
        </div>

        {isLoading && (
          <div className="flex flex-col items-center gap-3 pt-12 text-text-light dark:text-darkmode-text-light">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm">KI durchsucht den Katalog…</p>
          </div>
        )}

        {hasResult && !isLoading && (
          <div className="w-full max-w-6xl mt-8 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="text-base text-text-light dark:text-darkmode-text-light">
                {llmSearch.products.length} {llmSearch.products.length === 1 ? 'Produkt' : 'Produkte'} für „
                {llmSearch.query}“
              </p>
              <ViewToggle value={viewLayout} onChange={setViewLayout} />
            </div>

            {viewLayout === 'grid' ? (
              <ProductTileGrid products={llmSearch.products} onSelect={onSelectProduct} fromPriceById={fromPriceById} />
            ) : (
              <ProductListView products={llmSearch.products} onSelect={onSelectProduct} fromPriceById={fromPriceById} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
