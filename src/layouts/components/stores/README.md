# Zustand Store Dokumentation

## Store State

Der `useConfigStore` verwaltet den globalen State der Anwendung:

### State Properties

- **`selectedUseCases: string[]`** - Array von ausgewählten Use Case IDs
- **`selectedDeliverables: Record<string, DeliverableState>`** - Map von Deliverable IDs zu ihrem State
  - `DeliverableState`: `{ enabled: boolean, params: DeliverableParameters }`
- **`persistEnabled: boolean`** - Ob localStorage Persistenz aktiviert ist

### Derived Properties (Getters)

- **`getCart(): CartItem[]`** - Liste aller enabled Deliverables als Cart Items
- **`getCartWithPrices()`** - Cart mit berechneten Preisen und Breakdowns
- **`getTotalPrice(): number`** - Gesamtpreis aller enabled Deliverables

## Actions

### Use Case Management

```typescript
// Use Case auswählen
selectUseCase(id: string)

// Use Case abwählen
deselectUseCase(id: string)

// Bundle aus Use Case laden (recommended + optional mit defaults)
setBundleFromUseCase(useCaseId: string)
```

### Deliverable Management

```typescript
// Deliverable aktivieren/deaktivieren
toggleDeliverable(id: string, enabled: boolean)

// Parameter eines Deliverables aktualisieren
updateDeliverableParam(id: string, key: string, value: string | number)
```

### Utility

```typescript
// Alles zurücksetzen
resetAll()

// Persistenz aktivieren/deaktivieren
setPersistEnabled(enabled: boolean)
```

## Verwendung

### Basic Usage

```typescript
import { useConfigStore } from '../stores/configStore';

function MyComponent() {
  // State lesen
  const selectedUseCases = useConfigStore((state) => state.selectedUseCases);
  const cart = useConfigStore((state) => state.getCart());
  const totalPrice = useConfigStore((state) => state.getTotalPrice());
  
  // Actions verwenden
  const setBundleFromUseCase = useConfigStore((state) => state.setBundleFromUseCase);
  const toggleDeliverable = useConfigStore((state) => state.toggleDeliverable);
  
  // Use Case Bundle laden
  const handleSelectUseCase = (id: string) => {
    setBundleFromUseCase(id);
  };
  
  // Deliverable togglen
  const handleToggle = (id: string, enabled: boolean) => {
    toggleDeliverable(id, enabled);
  };
}
```

### Cart mit Preisen

```typescript
const cartWithPrices = useConfigStore((state) => state.getCartWithPrices());

// Jedes Item enthält:
// - deliverable: Deliverable Objekt
// - price: Berechneter Preis
// - breakdown: Detaillierte Preisaufschlüsselung
```

## Persistenz

Die Persistenz ist optional und kann über `setPersistEnabled(true)` aktiviert werden.

Wenn aktiviert, werden folgende Daten im localStorage gespeichert:
- `selectedUseCases`
- `selectedDeliverables`
- `persistEnabled`

Die Daten werden automatisch geladen beim Store-Initialisierung und gespeichert bei jeder State-Änderung.

## Beispiel: Use Case Bundle laden

```typescript
// Use Case auswählen und Bundle laden
const useCaseId = 'uc-sales-dashboard';
setBundleFromUseCase(useCaseId);

// Dies aktiviert automatisch:
// - Required deliverables (enabled: true)
// - Optional deliverables (enabled: defaultSelected)
// - Setzt Default-Parameter für alle Deliverables
```

## Beispiel: Parameter aktualisieren

```typescript
// Parameter eines Deliverables aktualisieren
updateDeliverableParam('del-1', 'companySize', 'Enterprise');
updateDeliverableParam('del-1', 'speed', 'FastTrack');

// Wenn Deliverable noch nicht existiert, wird es automatisch erstellt
```
