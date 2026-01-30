import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useConfigStore } from "../stores/configStore";
import { products } from "../data/seed";
import { formatPrice, calculateItemPrice, getProductById } from "../lib/pricing";
import { Plus, Minus, Trash2 } from "lucide-react";

export function ProductConfigurator() {
  const cartItems = useConfigStore((state) => state.configuration.cartItems);
  const addToCart = useConfigStore((state) => state.addToCart);
  const removeFromCart = useConfigStore((state) => state.removeFromCart);
  const updateCartItem = useConfigStore((state) => state.updateCartItem);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

  const handleAddProduct = (productId: string) => {
    const options = selectedOptions[productId] || [];
    addToCart(productId, 1, options);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartItem(productId, { quantity });
    }
  };

  const handleToggleOption = (productId: string, optionId: string) => {
    const current = selectedOptions[productId] || [];
    const newOptions = current.includes(optionId)
      ? current.filter(id => id !== optionId)
      : [...current, optionId];
    setSelectedOptions({ ...selectedOptions, [productId]: newOptions });
  };

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const categoryProducts = products.filter(p => p.category === category);
        
        return (
          <div key={category}>
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <Accordion type="multiple" className="space-y-4">
              {categoryProducts.map((product) => {
                const cartItem = cartItems.find(item => item.productId === product.id);
                const isInCart = !!cartItem;
                const productOptions = selectedOptions[product.id] || [];
                
                return (
                  <AccordionItem key={product.id} value={product.id}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle>{product.name}</CardTitle>
                              {isInCart && (
                                <Badge variant="default">Im Warenkorb</Badge>
                              )}
                            </div>
                            <CardDescription>{product.description}</CardDescription>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-2xl font-bold">{formatPrice(product.basePrice)}</p>
                            <p className="text-sm text-muted-foreground">pro {product.unit}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <AccordionTrigger className="px-6">
                        {product.options && product.options.length > 0 ? "Optionen anzeigen" : "Details"}
                      </AccordionTrigger>
                      <AccordionContent>
                        <CardContent className="space-y-4">
                          {product.options && product.options.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-medium">Optionen:</h4>
                              {product.options.map((option) => {
                                const isSelected = productOptions.includes(option.id);
                                return (
                                  <div
                                    key={option.id}
                                    className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                                    onClick={() => handleToggleOption(product.id, option.id)}
                                  >
                                    <div>
                                      <p className="font-medium">{option.name}</p>
                                      {option.description && (
                                        <p className="text-sm text-muted-foreground">{option.description}</p>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="font-semibold">
                                        {option.priceModifier > 0 ? "+" : ""}
                                        {formatPrice(option.priceModifier)}
                                      </span>
                                      <div
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                          isSelected
                                            ? "bg-primary border-primary"
                                            : "border-muted-foreground"
                                        }`}
                                      >
                                        {isSelected && (
                                          <svg className="w-3 h-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                          </svg>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          
                          {isInCart ? (
                            <div className="flex items-center gap-3 pt-4 border-t">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleUpdateQuantity(product.id, cartItem.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                min="1"
                                value={cartItem.quantity}
                                onChange={(e) => handleUpdateQuantity(product.id, parseInt(e.target.value) || 1)}
                                className="w-20 text-center"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleUpdateQuantity(product.id, cartItem.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => removeFromCart(product.id)}
                                className="ml-auto"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Entfernen
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => handleAddProduct(product.id)}
                              className="w-full"
                            >
                              Zum Warenkorb hinzufügen
                            </Button>
                          )}
                        </CardContent>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}
