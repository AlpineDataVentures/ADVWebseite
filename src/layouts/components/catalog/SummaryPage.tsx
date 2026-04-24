import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { useConfigStore } from '../stores/configStore';
import { formatPrice } from '../lib/pricing';
import { getUseCaseById } from '../data/useCases';
import { Download, Mail, ArrowLeft } from 'lucide-react';

interface SummaryPageProps {
  onBack?: () => void;
  onNew?: () => void;
}

export function SummaryPage({ onBack, onNew }: SummaryPageProps = {}) {
  const selectedUseCases = useConfigStore((state) => state.selectedUseCases);
  const activeUseCase = useConfigStore((state) => state.activeUseCase);
  const cart = useConfigStore((state) => state.getCart());
  const cartWithPrices = useConfigStore((state) => state.getCartWithPrices());
  const totalPrice = useConfigStore((state) => state.getTotalPrice());
  const setWizardStep = useConfigStore((state) => state.setWizardStep);

  const useCase = selectedUseCases.length > 0 
    ? getUseCaseById(selectedUseCases[0])
    : null;

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Ihr Warenkorb ist leer</h2>
        <p className="text-text-light dark:text-darkmode-text-light mb-6">
          Bitte fügen Sie Deliverables hinzu, um eine Angebotsübersicht zu erstellen.
        </p>
        <Button onClick={onNew || (() => window.location.href = '/use-cases')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zum Use Case Finder
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Angebotsübersicht</h1>
        <p className="text-text-light dark:text-darkmode-text-light">
          Überprüfen Sie Ihre Auswahl und laden Sie das Angebot herunter
        </p>
      </div>

      {useCase && (
        <Card>
          <CardHeader>
            <CardTitle>Ausgewählter Use Case</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{useCase.title}</h3>
                <p className="text-text-light dark:text-darkmode-text-light">{useCase.description}</p>
              </div>
              <Badge>{useCase.domain}</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Ausgewählte Deliverables</CardTitle>
          <CardDescription>
            Übersicht über alle konfigurierten Deliverables und Parameter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartWithPrices.map((item) => {
            if (!item.deliverable) return null;

            return (
              <div key={item.deliverableId} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{item.deliverable.name}</h4>
                    <p className="text-sm text-text-light dark:text-darkmode-text-light">{item.deliverable.shortDescription}</p>
                    <Badge variant="outline" className="mt-2">{item.deliverable.family}</Badge>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-lg">{formatPrice(item.price)}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <Separator />

          <div className="flex items-center justify-between text-xl font-bold pt-2">
            <span>Gesamtpreis</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nächste Schritte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-text-light dark:text-darkmode-text-light">
            Sie können das Angebot herunterladen oder per E-Mail anfordern.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => alert('Download-Funktion würde hier implementiert werden')}>
              <Download className="h-4 w-4 mr-2" />
              Angebot herunterladen
            </Button>
            <Button variant="outline" onClick={() => alert('E-Mail-Funktion würde hier implementiert werden')}>
              <Mail className="h-4 w-4 mr-2" />
              Per E-Mail senden
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={() => {
            setWizardStep(2); // Set to configuration step
            if (activeUseCase) {
              window.location.href = `/configure?useCase=${activeUseCase}`;
            } else {
              window.location.href = '/configure';
            }
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück & anpassen
        </Button>
        <Button onClick={onNew || (() => window.location.href = '/use-cases')}>
          Neues Angebot erstellen
        </Button>
      </div>
    </div>
  );
}
