/**
 * Scrollt den Produktkatalog nach oben (window ist der Scroll-Container, nicht data-catalog-main).
 * Blur des fokussierten Elements verhindert, dass der Browser danach wieder in die Mitte scrollt.
 */
export function scrollCatalogToTop(behavior: ScrollBehavior = "smooth"): void {
  if (typeof window === "undefined") return;

  const active = document.activeElement;
  if (active instanceof HTMLElement && active !== document.body) {
    active.blur();
  }

  window.scrollTo({ top: 0, left: 0, behavior });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/** Nach React-Render/Re-Layout ausführen (z. B. View-Wechsel). */
export function scrollCatalogToTopAfterPaint(behavior: ScrollBehavior = "smooth"): void {
  if (typeof window === "undefined") return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => scrollCatalogToTop(behavior));
  });
}
