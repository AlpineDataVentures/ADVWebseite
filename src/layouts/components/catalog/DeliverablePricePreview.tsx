import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MiniPriceTag } from "./MiniPriceTag";
import { PriceBreakdown } from "./PriceBreakdown";
import type { Deliverable, DeliverableParameters } from "../data/models";
import { getParametersForDeliverable } from "../data/parameters";
import { Select } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface DeliverablePricePreviewProps {
  deliverable: Deliverable;
  onParametersChange?: (parameters: DeliverableParameters) => void;
  initialParameters?: DeliverableParameters;
  showConfigurator?: boolean;
}

/**
 * Komponente zur Live-Preisvorschau mit Parameter-Konfiguration
 * Recalculiert automatisch bei jeder Parameteränderung
 */
export function DeliverablePricePreview({
  deliverable,
  onParametersChange,
  initialParameters,
  showConfigurator = true
}: DeliverablePricePreviewProps) {
  const applicableParameters = getParametersForDeliverable(deliverable.id);
  
  // State für Parameter mit Defaults
  const [parameters, setParameters] = useState<DeliverableParameters>(() => {
    const defaults: DeliverableParameters = {};
    applicableParameters.forEach(param => {
      if (initialParameters?.[param.key] !== undefined) {
        defaults[param.key] = initialParameters[param.key];
      } else {
        defaults[param.key] = typeof param.default === 'string' 
          ? param.default 
          : param.default;
      }
    });
    return defaults;
  });

  // Live-Recalculierung bei Parameteränderung
  useEffect(() => {
    if (onParametersChange) {
      onParametersChange(parameters);
    }
  }, [parameters, onParametersChange]);

  const handleParameterChange = (key: string, value: string | number) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-4">
      {/* Preis-Tag */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{deliverable.name}</h3>
          <p className="text-sm text-muted-foreground">{deliverable.shortDescription}</p>
        </div>
        <MiniPriceTag deliverable={deliverable} parameters={parameters} />
      </div>

      {/* Parameter-Konfigurator */}
      {showConfigurator && applicableParameters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Konfiguration</CardTitle>
            <CardDescription>
              Passen Sie die Parameter an, um den Preis zu sehen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {applicableParameters.map(param => {
              if (param.type === 'radio' || param.type === 'select') {
                return (
                  <div key={param.key} className="space-y-2">
                    <Label htmlFor={param.key}>{param.label}</Label>
                    <Select
                      id={param.key}
                      value={String(parameters[param.key] || param.default)}
                      onChange={(e) => handleParameterChange(param.key, e.target.value)}
                    >
                      {param.options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                );
              } else if (param.type === 'number') {
                return (
                  <div key={param.key} className="space-y-2">
                    <Label htmlFor={param.key}>{param.label}</Label>
                    <Input
                      id={param.key}
                      type="number"
                      min={1}
                      max={20}
                      value={parameters[param.key] || param.default}
                      onChange={(e) => handleParameterChange(
                        param.key, 
                        parseInt(e.target.value) || Number(param.default)
                      )}
                    />
                  </div>
                );
              }
              return null;
            })}
          </CardContent>
        </Card>
      )}

      {/* Preisaufschlüsselung */}
      <PriceBreakdown 
        deliverableId={deliverable.id}
        parameters={parameters}
        showDetails={true}
      />
    </div>
  );
}
