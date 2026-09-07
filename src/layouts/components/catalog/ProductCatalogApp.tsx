import { useState, useEffect, useMemo } from 'react';
import { CatalogToolbar } from './CatalogToolbar';
import { AiSearchLanding, type LlmSearchState } from './AiSearchLanding';
import { DomainDrawer } from './DomainDrawer';
import { ProductTileGrid } from './UseCaseTileGrid';
import { ProductListView } from './ProductListView';
import { DeliverableListView } from './DeliverableListView';
import { ViewToggle } from './ViewToggle';
import { BundleView } from './BundleView';
import { ConfigView } from './ConfigView';
import { CartButton } from './CartButton';
import { CartSheet } from './CartSheet';
import { useConfigStore, rehydrateConfigFromStorage } from '../stores/configStore';
import {
  getProductById,
  products,
  uiClusterLabels,
  type UiClusterId,
} from '../data/useCases';
import { getBundleForProduct } from '../data/recommendations';
import { getFromPriceMap } from '../lib/pricing';
import {
  buildProductCatalogUrl,
  getCanonicalProductId,
} from '../data/productCatalogRouting';
import {
  getFeaturedProducts,
  getProductsForClusterBrowse,
  sortProductsAlphabetically,
} from '../data/catalogStrategy';
import { searchCatalog, searchDeliverables } from '../data/catalogSearch';
import { searchCatalogWithLLM, localFallbackProducts } from '../data/catalogSearchLLM';
import { PRODUCT_CATALOG_URL } from '@/config/products';
import { scrollCatalogToTopAfterPaint } from '../lib/catalogScroll';

type ViewLayout = 'grid' | 'list';

type CatalogReturnContext = {
  activeCluster: UiClusterId | null;
  searchQuery: string;
  showAll: boolean;
  showDeliverables: boolean;
  viewLayout: ViewLayout;
};

interface ProductCatalogAppProps {
  initialProductId?: string | null;
}

function getProductIdFromPathname(pathname: string): string | null {
  if (!pathname.startsWith(PRODUCT_CATALOG_URL)) return null;

  const remainder = pathname.slice(PRODUCT_CATALOG_URL.length).replace(/^\/+|\/+$/g, '');
  if (!remainder) return null;

  const [productOrAlias] = remainder.split('/');
  return getCanonicalProductId(productOrAlias);
}

function readCatalogQueryParams(): { q: string; view: 'all' | 'deliverables' | null } {
  if (typeof window === 'undefined') return { q: '', view: null };
  const params = new URLSearchParams(window.location.search);
  const viewParam = params.get('view');
  const view = viewParam === 'all' || viewParam === 'deliverables' ? viewParam : null;
  return { q: params.get('q') ?? '', view };
}

function buildCatalogListUrl(options: {
  q?: string;
  view?: 'all' | 'deliverables' | null;
}): string {
  const params = new URLSearchParams();
  if (options.q?.trim()) params.set('q', options.q.trim());
  if (options.view === 'all') params.set('view', 'all');
  if (options.view === 'deliverables') params.set('view', 'deliverables');
  const qs = params.toString();
  return qs ? `${PRODUCT_CATALOG_URL}?${qs}` : PRODUCT_CATALOG_URL;
}

function readInitialCatalogListState(): {
  q: string;
  showAll: boolean;
  showDeliverables: boolean;
  viewLayout: ViewLayout;
} {
  const { q, view } = readCatalogQueryParams();
  return {
    q,
    showAll: view === 'all',
    showDeliverables: view === 'deliverables',
    viewLayout: view === 'all' || view === 'deliverables' ? 'list' : 'grid',
  };
}

export default function ProductCatalogApp({ initialProductId = null }: ProductCatalogAppProps) {
  const initialListState = readInitialCatalogListState();
  const [activeCluster, setActiveCluster] = useState<UiClusterId | null>(null);
  const [activeProductId, setActiveProductId] = useState<string | null>(initialProductId);
  const [viewMode, setViewMode] = useState<'bundle' | 'configure'>('bundle');
  const [searchQuery, setSearchQuery] = useState(initialListState.q);
  const [cartOpen, setCartOpen] = useState(false);
  const [domainDrawerOpen, setDomainDrawerOpen] = useState(false);
  const [viewLayout, setViewLayout] = useState<ViewLayout>(initialListState.viewLayout);
  const [showAll, setShowAll] = useState(initialListState.showAll);
  const [showDeliverables, setShowDeliverables] = useState(initialListState.showDeliverables);
  const [returnContext, setReturnContext] = useState<CatalogReturnContext | null>(null);

  // KI-Suche: bewusst hier oben (nicht in AiSearchLanding) gehalten, damit die
  // letzten Ergebnisse erhalten bleiben, wenn man ein Produkt öffnet und per
  // Zurück/Browser-Back wieder auf die Landing-Seite kommt (kein neuer API-Call).
  const [kiQuery, setKiQuery] = useState('');
  const [llmSearch, setLlmSearch] = useState<LlmSearchState>({ status: 'idle', query: '', products: [] });
  const [rateLimitCountdown, setRateLimitCountdown] = useState<number | null>(null);
  // Einmal erkanntes Tageslimit gilt für den Rest der Session.
  const [kiUnavailableToday, setKiUnavailableToday] = useState(false);
  // Merkt sich, ob das gerade betrachtete Produkt/Konfiguration aus der
  // klassischen Browsing-Ansicht kam -> steuert, ob dort oben die Toolbar
  // (Alle Domänen/Zurück zur KI-Suche) mit angezeigt wird.
  const [cameFromBrowse, setCameFromBrowse] = useState(false);

  const setBundleFromProduct = useConfigStore((state) => state.setBundleFromProduct);
  const setActiveProduct = useConfigStore((state) => state.setActiveProduct);
  const configureSingleDeliverable = useConfigStore((state) => state.configureSingleDeliverable);

  const cartCount = useConfigStore((state) =>
    Object.values(state.selectedDeliverables).filter((d) => d.enabled).length
  );

  const navigateToCatalogUrl = (
    productId: string | null,
    historyMode: 'push' | 'replace' = 'push',
    listState?: { q?: string; view?: 'all' | 'deliverables' | null }
  ) => {
    if (typeof window === 'undefined') return;

    const nextUrl = productId
      ? buildProductCatalogUrl(productId)
      : buildCatalogListUrl({
        q: listState?.q ?? searchQuery,
        view: listState?.view ?? (showDeliverables ? 'deliverables' : showAll ? 'all' : null),
      });
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (currentUrl === nextUrl) return;

    const method = historyMode === 'replace' ? 'replaceState' : 'pushState';
    window.history[method]({}, '', nextUrl);
  };

  const captureReturnContext = (): CatalogReturnContext => ({
    activeCluster,
    searchQuery,
    showAll,
    showDeliverables,
    viewLayout,
  });

  const restoreReturnContext = (context: CatalogReturnContext) => {
    setActiveCluster(context.activeCluster);
    setSearchQuery(context.searchQuery);
    setShowAll(context.showAll);
    setShowDeliverables(context.showDeliverables);
    setViewLayout(context.viewLayout);
    navigateToCatalogUrl(null, 'push', {
      q: context.searchQuery || undefined,
      view: context.showAll ? 'all' : context.showDeliverables ? 'deliverables' : null,
    });
  };

  /** Gegenstück zu handleShowAll(): zurück zum alleinigen KI-Such-Einstieg. */
  const handleBackToKiLanding = () => {
    setActiveCluster(null);
    setShowAll(false);
    setShowDeliverables(false);
    setSearchQuery('');
    setCameFromBrowse(false);
    setActiveProductId(null);
    setActiveProduct(null);
    setViewMode('bundle');
    navigateToCatalogUrl(null, 'push', { q: '', view: null });
  };

  const handleKiSearchSubmit = async () => {
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

    // Vorherige Ergebnisse merken: beim Pro-IP-Limit bleiben sie sichtbar,
    // statt die Liste während des Wartens zu leeren.
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

  const openProductFromUrl = (productId: string | null) => {
    if (!productId) {
      setActiveProductId(null);
      setActiveProduct(null);
      setViewMode('bundle');
      return;
    }

    setActiveCluster(null);
    setShowAll(false);
    setShowDeliverables(false);
    setActiveProductId(productId);
    setActiveProduct(productId);
    setBundleFromProduct(productId);
    setViewMode('bundle');
  };

  const handleClusterSelect = (cluster: UiClusterId) => {
    setActiveCluster(cluster);
    setShowAll(false);
    setShowDeliverables(false);
    setActiveProductId(null);
    setActiveProduct(null);
    setViewMode('bundle');
    navigateToCatalogUrl(null);
  };

  const handleShowAll = () => {
    setActiveCluster(null);
    setShowAll(true);
    setShowDeliverables(false);
    setActiveProductId(null);
    setActiveProduct(null);
    setViewMode('bundle');
    setViewLayout('list');
    navigateToCatalogUrl(null, 'push', { view: 'all' });
  };

  const handleShowDeliverables = () => {
    setActiveCluster(null);
    setShowAll(false);
    setShowDeliverables(true);
    setActiveProductId(null);
    setActiveProduct(null);
    setViewMode('bundle');
    setViewLayout('list');
    navigateToCatalogUrl(null, 'push', { view: 'deliverables' });
  };

  const handleConfigureDeliverable = (deliverableId: string) => {
    setReturnContext(captureReturnContext());
    setCameFromBrowse(Boolean(showAll || activeCluster || showDeliverables));
    configureSingleDeliverable(deliverableId);
    setActiveProductId(null);
    setActiveProduct(null);
    setViewMode('configure');
    navigateToCatalogUrl(null);
    scrollCatalogToTopAfterPaint();
  };

  const handleProductSelect = (productId: string) => {
    if (!productId) return;
    setReturnContext(captureReturnContext());
    setCameFromBrowse(Boolean(showAll || activeCluster || showDeliverables));
    openProductFromUrl(productId);
    navigateToCatalogUrl(productId);
    scrollCatalogToTopAfterPaint();
  };

  const handleNextToConfiguration = () => {
    setViewMode('configure');
    scrollCatalogToTopAfterPaint();
  };

  const handleBack = () => {
    if (viewMode === 'configure') {
      setViewMode('bundle');
      if (activeProductId) {
        return;
      }
      if (returnContext?.showDeliverables || showDeliverables) {
        setShowDeliverables(true);
        setShowAll(false);
        setActiveProductId(null);
        setActiveProduct(null);
        if (returnContext) {
          restoreReturnContext(returnContext);
        } else {
          navigateToCatalogUrl(null, 'push', { view: 'deliverables' });
        }
      }
      return;
    }

    if (activeProductId) {
      setActiveProductId(null);
      setActiveProduct(null);
      setViewMode('bundle');
      if (returnContext) {
        restoreReturnContext(returnContext);
      } else {
        navigateToCatalogUrl(null);
      }
    }
  };

  const handleGoToConfig = () => {
    setCameFromBrowse(Boolean(showAll || activeCluster || showDeliverables));
    setViewMode('configure');
    setCartOpen(false);
    scrollCatalogToTopAfterPaint();
  };

  useEffect(() => {
    if (viewMode === 'configure') {
      scrollCatalogToTopAfterPaint();
    }
  }, [viewMode]);

  useEffect(() => {
    rehydrateConfigFromStorage();
  }, []);

  // Zählt das Pro-IP-Rate-Limit für die KI-Suche live herunter und setzt den
  // Status danach automatisch zurück, damit ein neuer Versuch möglich ist.
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

  useEffect(() => {
    if (activeProductId && process.env.NODE_ENV === 'development') {
      const recommendations = getBundleForProduct(activeProductId);
      if (recommendations.length === 0) {
        console.warn(`[ProductCatalog] No product modules found for productId: ${activeProductId}`);
      }
    }
  }, [activeProductId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const productIdFromUrl = getProductIdFromPathname(window.location.pathname) ?? initialProductId;
    const { q, view } = readCatalogQueryParams();

    if (productIdFromUrl) {
      openProductFromUrl(productIdFromUrl);
    } else {
      if (q) setSearchQuery(q);
      if (view === 'all') {
        setShowAll(true);
        setShowDeliverables(false);
        setViewLayout('list');
      } else if (view === 'deliverables') {
        setShowDeliverables(true);
        setShowAll(false);
        setViewLayout('list');
      }
    }
  }, [initialProductId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const productIdFromUrl = getProductIdFromPathname(window.location.pathname);
      const { q, view } = readCatalogQueryParams();

      if (productIdFromUrl) {
        openProductFromUrl(productIdFromUrl);
        return;
      }

      openProductFromUrl(null);
      setSearchQuery(q);
      setShowAll(view === 'all');
      setShowDeliverables(view === 'deliverables');
      if (view === 'all' || view === 'deliverables') setViewLayout('list');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const activeProduct = activeProductId ? getProductById(activeProductId) : null;

  // "browse" wird ausschließlich über Alle-Produkte/Domäne/Bausteine-Buttons
  // erreicht; ohne diese drei zeigt renderContent() stattdessen AiSearchLanding.
  const catalogEntryMode: 'ki-landing' | 'browse' = showAll || activeCluster || showDeliverables ? 'browse' : 'ki-landing';

  const searchResults = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return null;

    const pool = showAll ? products : activeCluster ? getProductsForClusterBrowse(activeCluster) : products;
    return searchCatalog(query, pool);
  }, [activeCluster, searchQuery, showAll]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim();

    if (query && searchResults) {
      return [...searchResults.products, ...searchResults.productsViaDeliverable];
    }

    if (showAll) {
      return sortProductsAlphabetically(products);
    }

    if (activeCluster) {
      return getProductsForClusterBrowse(activeCluster);
    }

    return getFeaturedProducts(products);
  }, [activeCluster, searchQuery, showAll, searchResults]);

  const filteredDeliverables = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return null;
    return searchDeliverables(query);
  }, [searchQuery]);

  const fromPriceById = useMemo(() => getFromPriceMap(filteredProducts), [filteredProducts]);

  const tileTitle = useMemo(() => {
    if (searchQuery.trim()) return 'Suchergebnisse';
    if (activeCluster) return uiClusterLabels[activeCluster];
    if (showAll) return 'Alle Produkte';
    return 'Beliebte Einstiege';
  }, [activeCluster, showAll, searchQuery]);

  const tileSubtitle = useMemo(() => {
    if (searchQuery.trim()) {
      const deliverableCount = searchResults?.deliverables.length ?? 0;
      const extra =
        deliverableCount > 0
          ? ` · ${deliverableCount} passende ${deliverableCount === 1 ? 'Baustein' : 'Bausteine'}`
          : '';
      return `${filteredProducts.length} ${filteredProducts.length === 1 ? 'Produkt' : 'Produkte'} für „${searchQuery.trim()}“${extra}`;
    }
    if (activeCluster) {
      return `${filteredProducts.length} ${filteredProducts.length === 1 ? 'Produkt' : 'Produkte'} in diesem Bereich`;
    }
    if (showAll) {
      return `${filteredProducts.length} Produkte insgesamt`;
    }
    return 'Wählen Sie „Alle Domänen“, um den gesamten Katalog zu durchsuchen.';
  }, [activeCluster, showAll, filteredProducts.length, searchQuery]);

  const renderContent = () => {
    if (viewMode === 'configure' && cartCount > 0) {
      return <ConfigView productId={activeProductId} onBack={handleBack} onOpenCart={() => setCartOpen(true)} />;
    }

    if (!activeProduct && showDeliverables) {
      const deliverableItems = filteredDeliverables ?? undefined;
      return (
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text dark:text-darkmode-text">
                Alle Produktbausteine
              </h2>
              <p className="text-base text-text-light dark:text-darkmode-text-light max-w-2xl leading-relaxed">
                Kauf- und konfigurierbare Leistungen – einzeln auswählbar, direkt zur Konfiguration und Anfrage.
              </p>
            </div>
            <ViewToggle value={viewLayout} onChange={setViewLayout} />
          </div>
          <DeliverableListView
            layout={viewLayout}
            onConfigure={handleConfigureDeliverable}
            items={deliverableItems}
            emptyMessage={
              searchQuery.trim()
                ? `Keine Bausteine für „${searchQuery.trim()}“`
                : 'Keine Produktbausteine gefunden'
            }
          />
        </div>
      );
    }

    if (!activeProduct && catalogEntryMode === 'ki-landing') {
      return (
        <AiSearchLanding
          kiQuery={kiQuery}
          onKiQueryChange={setKiQuery}
          llmSearch={llmSearch}
          kiUnavailableToday={kiUnavailableToday}
          rateLimitCountdown={rateLimitCountdown}
          onSubmit={handleKiSearchSubmit}
          onShowAll={handleShowAll}
          onSelectProduct={handleProductSelect}
        />
      );
    }

    if (!activeProduct) {
      return (
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text dark:text-darkmode-text">
                {tileTitle}
              </h2>
              <p className="text-base text-text-light dark:text-darkmode-text-light max-w-2xl leading-relaxed">
                {tileSubtitle}
              </p>
            </div>

            <ViewToggle value={viewLayout} onChange={setViewLayout} />
          </div>

          {viewLayout === 'grid' ? (
            <ProductTileGrid
              products={filteredProducts}
              onSelect={handleProductSelect}
              fromPriceById={fromPriceById}
            />
          ) : (
            <ProductListView
              products={filteredProducts}
              onSelect={handleProductSelect}
              fromPriceById={fromPriceById}
            />
          )}

          {searchQuery.trim() && searchResults && searchResults.deliverables.length > 0 && (
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
                onConfigure={handleConfigureDeliverable}
                items={searchResults.deliverables}
              />
            </div>
          )}
        </div>
      );
    }

    if (viewMode === 'bundle') {
      return (
        <BundleView
          productId={activeProductId}
          onNext={handleNextToConfiguration}
          onBack={handleBack}
          viewLayout={viewLayout}
          onViewLayoutChange={setViewLayout}
        />
      );
    }

    return <ConfigView productId={activeProductId} onBack={handleBack} onOpenCart={() => setCartOpen(true)} />;
  };

  // Toolbar (Domänen + "Zurück zur KI-Suche") nur in der klassischen
  // Browsing-Ansicht selbst, oder auf Produktdetail/Konfiguration, wenn diese
  // aus der klassischen Ansicht heraus geöffnet wurden (cameFromBrowse).
  // Kommt man aus der KI-Suche, bleibt es auch beim Produkt/Konfigurieren clean.
  const showCatalogToolbar =
    catalogEntryMode === 'browse' ||
    ((Boolean(activeProduct) || (viewMode === 'configure' && cartCount > 0)) && cameFromBrowse);

  return (
    <div className="min-h-screen flex flex-col bg-body dark:bg-darkmode-body text-text dark:text-darkmode-text">
      {showCatalogToolbar && (
        <CatalogToolbar
          activeCluster={activeCluster}
          onOpenDomains={() => setDomainDrawerOpen(true)}
          onBackToKiSearch={handleBackToKiLanding}
        />
      )}

      <main className="flex-1 min-h-0" data-catalog-main>
        <div className="container mx-auto px-4 py-8 md:py-10 max-w-6xl">
          {renderContent()}
        </div>
      </main>

      <DomainDrawer
        open={domainDrawerOpen}
        onOpenChange={setDomainDrawerOpen}
        activeCluster={activeCluster}
        showAll={showAll}
        showDeliverables={showDeliverables}
        onSelectCluster={handleClusterSelect}
        onSelectProduct={handleProductSelect}
        onShowAll={handleShowAll}
        onShowDeliverables={handleShowDeliverables}
      />

      <CartButton onClick={() => setCartOpen(true)} />

      {cartOpen && (
        <CartSheet
          open={cartOpen}
          onOpenChange={setCartOpen}
          onGoToConfig={cartCount > 0 ? handleGoToConfig : undefined}
        />
      )}
    </div>
  );
}
