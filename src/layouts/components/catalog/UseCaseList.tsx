import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { UseCaseCard } from "./UseCaseCard";
import { getUseCasesForDomain, getDomainById } from "../data/domains";

interface UseCaseListProps {
  domainId: string;
  onSelectUseCase: (useCaseId: string) => void;
  onBack: () => void;
}

/**
 * Liste von Use Cases für eine Domäne
 * Zeigt alle Use Cases der Domäne als Cards
 */
export function UseCaseList({ domainId, onSelectUseCase, onBack }: UseCaseListProps) {
  const domain = getDomainById(domainId);
  const useCases = getUseCasesForDomain(domainId);

  if (!domain) {
    return (
      <div className="text-center py-8">
        <p className="text-text-light dark:text-darkmode-text-light">Domäne nicht gefunden</p>
        <Button onClick={onBack} variant="outline" className="mt-4">
          Zurück
        </Button>
      </div>
    );
  }

  if (useCases.length === 0) {
    return (
      <div className="space-y-4">
        <Button onClick={onBack} variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zu Domänen
        </Button>
        <div className="text-center py-8">
          <p className="text-text-light dark:text-darkmode-text-light">Keine Use Cases für diese Domäne verfügbar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button onClick={onBack} variant="ghost" size="sm">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Zurück zu Domänen
      </Button>

      {/* Domain Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{domain.name}</h2>
        <p className="text-text-light dark:text-darkmode-text-light">{domain.description}</p>
      </div>

      {/* Use Case Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((useCase) => (
          <UseCaseCard
            key={useCase.id}
            useCase={useCase}
            onSelect={onSelectUseCase}
          />
        ))}
      </div>
    </div>
  );
}
