import { useEffect, useMemo, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ViewToggle, type ViewLayout } from './ViewToggle';
import { ProductTileGrid } from './UseCaseTileGrid';
import { ProductListView } from './ProductListView';
import { DeliverableListView } from './DeliverableListView';
import type { Product } from '../data/useCases';
import { searchCatalog } from '../data/catalogSearch';
import { searchCatalogWithLLM, localFallbackProducts, type LLMSearchOutcome } from '../data/catalogSearchLLM';
import { getFromPriceMap } from '../lib/pricing';
import { cn } from '../lib/utils';

interface AiSearchLandingProps {
  onShowAll: () => void;
  onSelectProduct: (productId: string) => void;
  onConfigureDeliverable: (deliverableId: string) => void;
}

type LlmSearchState = {
  status: 'idle' | 'loading' | LLMSearchOutcome;
  query: string;
  products: Product[];
  retryAfterSeconds?: number;
};

/**
 * Alleiniger Einstieg in den Produktkatalog: ein einzelnes, ChatGPT-artiges
 * Suchfeld (keine Konversation, nur Einzelanfragen). Zeigt bewusst keine
 * Produkt- oder Bausteinübersicht, bis eine Anfrage abgeschickt wurde – der
 * einzige weitere sichtbare Einstieg ist der "Alle Produkte"-Button.
 */
export function AiSearchLanding({ onShowAll, onSelectProduct, onConfigureDeliverable }: AiSearchLandingProps) {
  const [kiQuery, setKiQuery] = useState('');
  const [llmSearch, setLlmSearch] = useState<LlmSearchState>({ status: 'idle', query: '', products: [] });
  const [rateLimitCountdown, setRateLimitCountdown] = useState<number | null>(null);
  const [viewLayout, setViewLayout] = useState<ViewLayout>('grid');
  // Einmal erkanntes Tageslimit gilt für den Rest der Session: keine weiteren
  // (ohnehin erfolglosen) Netzwerk-Aufrufe mehr, stattdessen direkt lokal suchen.
  const [kiUnavailableToday, setKiUnavailableToday] = useState(false);

  // Live-Countdown für das Pro-IP-Rate-Limit (Sekunden bis zum nächsten Versuch).
  useEffect(() => {
    if (llmSearch.status !== 'rate_limited' || !llmSearch.retryAfterSeconds) {
      setRateLimitCountdown(null);
      return;
    }
    const deadline = Date.now() + llmSearch.retryAfterSeconds * 1000;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRateLimitCountdown(remaining);
      if (remaining <= 0) {
        setLlmSearch({ status: 'idle', query: '', products: [] });
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [llmSearch.status, llmSearch.retryAfterSeconds]);

  const handleSubmit = async () => {
    const trimmed = kiQuery.trim();
    if (!trimmed) {
      setLlmSearch({ status: 'idle', query: '', products: [] });
      return;
    }

    // Tageslimit für heute schon bekannt -> gar nicht erst anfragen.
    if (kiUnavailableToday) {
      setLlmSearch({ status: 'daily_limit', query: trimmed, products: localFallbackProducts(trimmed) });
      return;
    }

    const previousProducts = llmSearch.products;
    setLlmSearch({ status: 'loading', query: trimmed, products: [] });
    const result = await searchCatalogWithLLM(trimmed);

    if (result.outcome === 'rate_limited') {
      setLlmSearch({
        status: 'rate_limited',
        query: trimmed,
        products: previousProducts,
        retryAfterSeconds: result.retryAfterSeconds,
      });
      return;
    }

    if (result.outcome === 'daily_limit') {
      setKiUnavailableToday(true);
    }

    setLlmSearch({ status: result.outcome, query: trimmed, products: result.products });
  };

  const hasResult = llmSearch.status !== 'idle';

  // Bausteine-Trefferliste: exakt dieselbe lokale Keyword-Logik wie überall
  // im Katalog, unabhängig davon, ob das Produkt-Ranking von der KI oder vom
  // lokalen Fallback stammt.
  const searchResults = useMemo(() => {
    if (!llmSearch.query) return null;
    return searchCatalog(llmSearch.query);
  }, [llmSearch.query]);

  const fromPriceById = useMemo(() => getFromPriceMap(llmSearch.products), [llmSearch.products]);

  const kiSearchStatus = useMemo(() => {
    const query = kiQuery.trim();
    if (llmSearch.status === 'loading') return 'loading';
    if (llmSearch.status === 'rate_limited') return 'rate_limited';
    if (llmSearch.status === 'daily_limit') return 'daily_limit';
    if (query && llmSearch.query === query) {
      return llmSearch.status === 'error' ? 'error' : null;
    }
    return query ? 'stale' : null;
  }, [kiQuery, llmSearch]);

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
              handleSubmit();
            }}
          >
            {kiUnavailableToday ? (
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-light dark:text-darkmode-text-light pointer-events-none" />
            ) : (
              <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-light dark:text-darkmode-text-light pointer-events-none" />
            )}
            <Input
              type="search"
              autoFocus
              value={kiQuery}
              onChange={(e) => setKiQuery(e.target.value)}
              placeholder={
                kiUnavailableToday
                  ? 'Produkte, Bausteine, Themen durchsuchen…'
                  : 'z. B. „Wir wollen weg von Excel-Tabellen“ – Enter zum Suchen'
              }
              className="h-14 pl-12 pr-4 text-base rounded-2xl shadow-sm bg-light dark:bg-darkmode-light border-border/80"
              aria-label="Produktkatalog durchsuchen"
            />
          </form>

          {kiUnavailableToday && (
            <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
              KI-Suche heute ausgelastet – Standardsuche aktiv.
            </p>
          )}
          {kiSearchStatus === 'loading' && (
            <p className="text-sm text-text-light dark:text-darkmode-text-light text-center">
              KI durchsucht den Katalog…
            </p>
          )}
          {kiSearchStatus === 'error' && (
            <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
              KI-Suche derzeit nicht verfügbar – Ergebnisse der Standardsuche werden angezeigt.
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
            </p>
          )}
          {kiSearchStatus === 'stale' && (
            <p className="text-sm text-text-light dark:text-darkmode-text-light text-center">
              Enter drücken, um {kiUnavailableToday ? 'zu suchen' : `die KI-Suche für „${kiQuery.trim()}“ zu starten`}.
            </p>
          )}
        </div>

        {hasResult && (
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

            {searchResults && searchResults.deliverables.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-text dark:text-darkmode-text">
                    Passende Produktbausteine
                  </h3>
                  <p className="text-sm text-text-light dark:text-darkmode-text-light">
                    Direkt konfigurieren – ohne ein Produkt zu öffnen.
                  </p>
                </div>
                <DeliverableListView
                  layout="list"
                  onConfigure={onConfigureDeliverable}
                  items={searchResults.deliverables}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
