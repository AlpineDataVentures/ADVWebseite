import { domains } from "./domains";
import { useCases } from "./useCases";
import { deliverables } from "./deliverables";

/**
 * Lokale Datenquelle fuer den Produktkatalog.
 * Geplanter Strapi-Adapter kann spaeter hier angedockt werden,
 * ohne die konsumierenden Komponenten hart umzustellen.
 */
export function getCatalogData() {
  return {
    domains,
    useCases,
    deliverables,
  };
}

export type CatalogData = ReturnType<typeof getCatalogData>;
