import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useConfigStore } from "../stores/configStore";
import { products } from "../data/seed";
import { formatPrice } from "../lib/pricing";
import { Check } from "lucide-react";

interface RecommendedBundleProps {
  productIds: string[];
  useCaseTitle: string;
}

export function RecommendedBundle({ productIds, useCaseTitle }: RecommendedBundleProps) {
  const addToCart = useConfigStore((state) => state.addToCart);
  const recommendedProducts = productIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const handleAddAll = () => {
    recommendedProducts.forEach(product => {
      addToCart(product.id, 1, []);
    });
  };

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Empfohlenes Paket für {useCaseTitle}</CardTitle>
            <CardDescription>
              Basierend auf Ihrem Use Case haben wir diese Produkte für Sie zusammengestellt
            </CardDescription>
          </div>
          <Badge variant="default">Empfohlen</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-6">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-light/50 dark:bg-darkmode-light/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-text-light dark:text-darkmode-text-light">{product.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(product.basePrice)}</p>
                <p className="text-xs text-text-light dark:text-darkmode-text-light">pro {product.unit}</p>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={handleAddAll} className="w-full" size="lg">
          Alle empfohlenen Produkte hinzufügen
        </Button>
      </CardContent>
    </Card>
  );
}
