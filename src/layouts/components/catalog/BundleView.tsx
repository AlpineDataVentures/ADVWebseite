import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useConfigStore } from "../stores/configStore";
import { getUseCaseById } from "../data/useCases";
import { getDeliverableById } from "../data/deliverables";
import { getBundleForUseCase } from "../data/recommendations";
import { DeliverableCard } from "./DeliverableCard";
import { Separator } from "./ui/separator";

interface BundleViewProps {
  useCaseId: string | null;
  onNext: () => void;
  onBack: () => void;
}

/**
 * Bundle View - Zeigt Use Case Header + Recommended Deliverables
 */
export function BundleView({ useCaseId, onNext, onBack }: BundleViewProps) {
  const useCase = useCaseId ? getUseCaseById(useCaseId) : null;
  const selectedDeliverables = useConfigStore((state) => state.selectedDeliverables);
  const toggleDeliverable = useConfigStore((state) => state.toggleDeliverable);
  const setBundleFromUseCase = useConfigStore((state) => state.setBundleFromUseCase);

  if (!useCase) {
    return null;
  }

  // Hole Recommendations
  const recommendations = getBundleForUseCase(useCase.id);
  
  // Filter: Core (defaultEnabled=true) vs Optional (defaultEnabled=false)
  const coreDeliverables = recommendations.filter(rec => rec.defaultEnabled);
  const optionalDeliverables = recommendations.filter(rec => !rec.defaultEnabled);
  const comingSoonDeliverables = recommendations.filter(rec => {
    const deliverable = getDeliverableById(rec.deliverableId);
    return deliverable && !deliverable.active;
  });

  const enabledCount = recommendations.filter(rec => {
    const deliverable = getDeliverableById(rec.deliverableId);
    if (!deliverable) return false;
    return selectedDeliverables[deliverable.id]?.enabled || false;
  }).length;

  const handleToggle = (deliverableId: string, enabled: boolean) => {
    toggleDeliverable(deliverableId, enabled);
  };

  const handleResetBundle = () => {
    setBundleFromUseCase(useCase.id);
  };

  return (
    <div className="space-y-6">
      {/* Use Case Header */}
      <div className="card">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-2 line-clamp-2">
              {useCase.title}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
              {useCase.short}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Zurück
          </Button>
        </div>
        
        {/* Output Bullets (max 3) */}
        {useCase.outputs.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Typische Outputs:
            </p>
            <ul className="space-y-1.5">
              {useCase.outputs.slice(0, 3).map((output, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  <span>{output}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recommended Bundle Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">
            Empfohlene Projektpakete
          </h3>
          {recommendations.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {recommendations.length} Deliverables
            </Badge>
          )}
        </div>

        {recommendations.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-muted-foreground mb-2">
              Keine Empfehlungen für diesen Use Case verfügbar.
            </p>
            <p className="text-sm text-muted-foreground">
              Bitte wählen Sie einen anderen Use Case aus.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Core Deliverables */}
            {coreDeliverables.map((recommendation) => {
              const deliverable = getDeliverableById(recommendation.deliverableId);
              if (!deliverable) return null;
              const isEnabled = selectedDeliverables[deliverable.id]?.enabled || false;

              return (
                <DeliverableCard
                  key={deliverable.id}
                  deliverable={deliverable}
                  recommendation={recommendation}
                  isEnabled={isEnabled}
                  onToggle={(enabled) => handleToggle(deliverable.id, enabled)}
                />
              );
            })}

            {/* Optional Deliverables */}
            {optionalDeliverables.map((recommendation) => {
              const deliverable = getDeliverableById(recommendation.deliverableId);
              if (!deliverable || !deliverable.active) return null;
              const isEnabled = selectedDeliverables[deliverable.id]?.enabled || false;

              return (
                <DeliverableCard
                  key={deliverable.id}
                  deliverable={deliverable}
                  recommendation={recommendation}
                  isEnabled={isEnabled}
                  onToggle={(enabled) => handleToggle(deliverable.id, enabled)}
                />
              );
            })}

            {/* Coming Soon Deliverables */}
            {comingSoonDeliverables.map((recommendation) => {
              const deliverable = getDeliverableById(recommendation.deliverableId);
              if (!deliverable) return null;

              return (
                <DeliverableCard
                  key={deliverable.id}
                  deliverable={deliverable}
                  recommendation={recommendation}
                  isEnabled={false}
                  onToggle={() => {}}
                />
              );
            })}
          </div>
        )}
      </div>

      <Separator />

      {/* CTA Buttons */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleResetBundle}
          size="lg"
        >
          Auswahl zurücksetzen
        </Button>
        
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {enabledCount} von {recommendations.filter(r => getDeliverableById(r.deliverableId)?.active).length} aktiviert
          </p>
          <Button
            onClick={onNext}
            size="lg"
            disabled={enabledCount === 0}
            className="btn-primary"
          >
            Weiter zur Konfiguration
          </Button>
        </div>
      </div>
    </div>
  );
}
