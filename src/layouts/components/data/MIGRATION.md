# Datenmodell-Migration

## Neue Struktur

Das Datenmodell wurde komplett überarbeitet:

### Alte Struktur (veraltet)
- `src/data/types.ts` - Alte Types (Product, UseCase mit alten Feldern)
- `src/data/seed.ts` - Alte Seed-Daten (13 generische Produkte)

### Neue Struktur (MVP)
- `src/data/models.ts` - Neue Types (Deliverable, UseCase mit Domänen, Parameter)
- `src/data/seed.ts` - Neue Seed-Daten (8 Deliverables, 3 Use Cases)
- `src/data/parameters.ts` - Parameter-Definitionen für Preisberechnung
- `src/data/mappings.ts` - Use Case zu Deliverable Mappings

## Wichtige Änderungen

### 1. Produkte → Deliverables
- **Alt:** `Product` mit `category`, `options`, `basePrice`
- **Neu:** `Deliverable` mit `family`, `parameters`, `tags`, `deliverablesOutput`, `assumptions`, `outOfScope`

### 2. Use Cases
- **Alt:** 6 generische Use Cases mit `category` und `icon`
- **Neu:** 3 Use Cases nach Domänen (`domain`): "Sales & Marketing", "Finance", "IT & Data"

### 3. Preislogik
- **Alt:** Einfache Optionen mit `priceModifier`
- **Neu:** Parameter-basierte Preisberechnung mit Multiplikatoren und Add-ons
  - Globale Parameter: `companySize`, `speed`
  - Produktspezifische Parameter: `dataSources`, `deployment`, `securityLevel`, `trainingParticipants`, `reportComplexity`

### 4. Warenkorb
- **Alt:** `CartItem` mit `productId`, `selectedOptions: string[]`
- **Neu:** `CartItem` mit `deliverableId`, `parameters: DeliverableParameters`

## Nächste Schritte

Die folgenden Komponenten müssen aktualisiert werden, um das neue Datenmodell zu verwenden:

1. **UseCaseGrid.tsx** - Verwendet noch alte `useCases` und `recommendedProducts`
2. **RecommendedBundle.tsx** - Verwendet noch alte `products`
3. **ProductConfigurator.tsx** - Muss zu `DeliverableConfigurator` werden
4. **CartSidebar.tsx** - Muss neue `CartItem` Struktur verwenden
5. **PriceBreakdown.tsx** - Muss neue Preislogik mit Breakdown anzeigen
6. **SummaryPage.tsx** - Muss neue Struktur verwenden
7. **ConfigurePage.tsx** - Muss neue Struktur verwenden

## Neue Preislogik

Die Preisberechnung erfolgt jetzt über `src/lib/pricing.ts` mit:
- `calculateDeliverablePrice()` - Berechnet Preis mit Breakdown
- `calculateCartItemPrice()` - Berechnet Preis für Cart-Item
- `getPriceBreakdownForCartItem()` - Gibt detaillierten Breakdown zurück

Der Breakdown enthält:
- `basePrice` - Basispreis
- `multipliers` - Alle Multiplikatoren (companySize, speed, etc.)
- `addOns` - Additive Aufschläge (z.B. trainingParticipants)
- `subtotal` - Zwischensumme
- `finalPrice` - Finaler Preis (gerundet auf 100 EUR)

## Parameter-System

Parameter werden in `src/data/parameters.ts` definiert:
- Globale Parameter gelten für alle Deliverables
- Produktspezifische Parameter nur für bestimmte Deliverables (`applicableTo`)

Jeder Parameter hat:
- `key` - Eindeutiger Identifier
- `label` - Anzeigename
- `type` - 'select', 'number', 'radio'
- `options` - Optionen für select/radio
- `default` - Standardwert
- `pricingEffect` - Multiplikator oder Add-on
