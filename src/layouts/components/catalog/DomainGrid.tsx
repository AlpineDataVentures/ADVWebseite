import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { domains } from "../data/domains";
import { 
  TrendingUp, 
  DollarSign, 
  Database, 
  Briefcase, 
  Settings, 
  Users,
  Lock
} from "lucide-react";
import { cn } from "../lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'trending-up': TrendingUp,
  'dollar-sign': DollarSign,
  'database': Database,
  'briefcase': Briefcase,
  'settings': Settings,
  'users': Users,
};

interface DomainGridProps {
  onSelectDomain: (domainId: string) => void;
  selectedDomainId?: string;
}

/**
 * Grid mit Domänenkacheln
 * Zeigt aktivierte und deaktivierte (Coming soon) Domänen
 */
export function DomainGrid({ onSelectDomain, selectedDomainId }: DomainGridProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-text-light dark:text-darkmode-text-light mb-6">
        Wähle deinen Bereich und Use Case – wir schlagen ein Projektpaket vor.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map((domain) => {
          const Icon = iconMap[domain.icon] || Briefcase;
          const isSelected = selectedDomainId === domain.id;
          const isDisabled = !domain.enabled;
          
          return (
            <Card
              key={domain.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg",
                {
                  "border-green-600 dark:border-green-400 border-2": isSelected,
                  "opacity-60 cursor-not-allowed": isDisabled,
                  "hover:border-green-600/50 dark:hover:border-green-400/50": !isDisabled && !isSelected
                }
              )}
              onClick={() => !isDisabled && onSelectDomain(domain.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <Icon className={cn(
                      "h-6 w-6",
                      isDisabled ? "text-text-light dark:text-darkmode-text-light" : "text-green-600 dark:text-green-400"
                    )} />
                  </div>
                  {isDisabled && (
                    <Badge variant="outline" className="text-xs">
                      Coming soon
                    </Badge>
                  )}
                  {isSelected && (
                    <Badge variant="default" className="text-xs">
                      Ausgewählt
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-4">{domain.name}</CardTitle>
                <CardDescription>{domain.description}</CardDescription>
              </CardHeader>
              {isDisabled && (
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-text-light dark:text-darkmode-text-light">
                    <Lock className="h-4 w-4" />
                    <span>Diese Domäne ist noch in Vorbereitung</span>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
