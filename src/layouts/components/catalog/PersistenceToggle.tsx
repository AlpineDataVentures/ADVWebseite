import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useConfigStore } from "../stores/configStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

/**
 * Toggle für localStorage Persistenz
 */
export function PersistenceToggle() {
  const persistEnabled = useConfigStore((state) => state.persistEnabled);
  const setPersistEnabled = useConfigStore((state) => state.setPersistEnabled);

  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="text-sm">Einstellungen</CardTitle>
        <CardDescription className="text-xs">
          Konfiguration im Browser speichern
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label htmlFor="persist-toggle" className="text-sm">
            Konfiguration speichern
          </Label>
          <Switch
            id="persist-toggle"
            checked={persistEnabled}
            onChange={(e) => setPersistEnabled(e.target.checked)}
          />
        </div>
        {persistEnabled && (
          <p className="text-xs text-text-light dark:text-darkmode-text-light mt-2">
            Ihre Auswahl wird im Browser gespeichert
          </p>
        )}
      </CardContent>
    </Card>
  );
}
