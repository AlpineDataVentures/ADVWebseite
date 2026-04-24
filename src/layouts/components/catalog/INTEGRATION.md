# AdvConfiguratorApp Integration

## Übersicht

`AdvConfiguratorApp` ist eine eigenständige React-Komponente, die den gesamten Konfigurator-Flow verwaltet. Sie kann einfach in bestehende Astro-Seiten eingebunden werden.

## Einbindung

### Basis-Einbindung

```astro
---
import AdvConfiguratorApp from '../components/AdvConfiguratorApp';
---

<AdvConfiguratorApp client:load />
```

### Mit Props

```astro
---
import AdvConfiguratorApp from '../components/AdvConfiguratorApp';
---

<AdvConfiguratorApp 
  initialView="use-cases"
  initialUseCaseId="uc-sales-dashboard"
  client:load 
/>
```

## Props

### `initialView?: 'use-cases' | 'configure' | 'summary'`
Start-Ansicht der App. Standard: `'use-cases'`

### `initialUseCaseId?: string | null`
Vordefinierter Use Case ID. Wird automatisch geladen wenn gesetzt.

### `onViewChange?: (view: AppView) => void`
Callback wenn sich die Ansicht ändert.

### `onUseCaseSelect?: (useCaseId: string) => void`
Callback wenn ein Use Case ausgewählt wird.

### `className?: string`
Zusätzliche CSS-Klassen für den Container.

## Views

### `use-cases`
- Zeigt Domain Grid
- Bei Domain-Auswahl: Use Case Liste
- Cart Button (Mobile: Sheet)

### `configure`
- Schritt A: Recommended Bundle (Toggle Deliverables)
- Schritt B: Konfiguration (Parameter)
- Cart Sidebar (Desktop: immer sichtbar, Mobile: Sheet)

### `summary`
- Angebotsübersicht
- Use Case Info
- Deliverables Liste
- Download/Email Actions

## State Management

Die Komponente nutzt den globalen Zustand-Store (`useConfigStore`):
- `selectedUseCases`: Array von Use Case IDs
- `selectedDeliverables`: Record von Deliverable States
- `cart`: Abgeleitete Liste der aktivierten Deliverables

## Datenquellen

Alle Daten kommen aus:
- `src/data/seed.ts` - Use Cases, Deliverables
- `src/data/domains.ts` - Domänen
- `src/data/parameters.ts` - Parameter-Definitionen
- `src/data/mappings.ts` - Use Case → Deliverable Mappings

**Keine Hardcodings in UI-Komponenten!**

## Styling

- **Nur Tailwind CSS** - Kein globales CSS außer Tailwind base
- CSS-Variablen für Themes (in `globals.css`)
- Responsive Design (Mobile-first)

## Beispiel: Integration in bestehende Seite

```astro
---
import Layout from '../layouts/Layout.astro';
import AdvConfiguratorApp from '../components/AdvConfiguratorApp';
---

<Layout title="Meine Seite">
  <div class="container mx-auto px-4 py-8">
    <h1>Mein Konfigurator</h1>
    
    <AdvConfiguratorApp 
      initialView="use-cases"
      client:load 
    />
  </div>
</Layout>
```

## Demo-Route

Die `/demo` Route zeigt den kompletten Flow auf einer Seite:
- Links: Use Cases
- Rechts: Konfigurator + Cart

Nützlich für Präsentationen und Tests.
