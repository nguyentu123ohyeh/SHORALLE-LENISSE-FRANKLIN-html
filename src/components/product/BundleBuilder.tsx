import { useState, useMemo } from 'react';
import { ShoppingCart, Plus, Check, Package } from 'lucide-react';
import { products, type Product } from '../../data/products';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';

interface BundleBuilderProps {
  bundleIds: string[];
}

export default function BundleBuilder({ bundleIds }: BundleBuilderProps) {
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const bundleProducts = useMemo(
    () => bundleIds.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => p !== undefined),
    [bundleIds],
  );

  const totalOriginal = bundleProducts.reduce((sum, p) => sum + (p.originalPrice ?? p.price), 0);
  const totalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);
  const totalSavings = totalOriginal - totalPrice;

  const handleAddSingle = (product: Product) => {
    addItem(product);
    setAddedIds((prev) => new Set(prev).add(product.id));
  };

  const handleAddAll = () => {
    bundleProducts.forEach((product) => {
      addItem(product);
    });
    setAddedIds(new Set(bundleProducts.map((p) => p.id)));
  };

  if (bundleProducts.length === 0) return null;

  return (
    <div className="rounded-xl border border-alloy-200 bg-alloy-50 p-6 dark:border-graphene-700 dark:bg-graphene-900">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <Package className="h-5 w-5 text-teal-500" />
        <h3 className="text-lg font-bold text-graphene-900 dark:text-alloy-50">
          Frequently Bought Together
        </h3>
      </div>

      {/* Product Rail */}
      <div className="flex flex-col gap-3 sm:flex-row sm:overflow-x-auto sm:pb-2">
        {bundleProducts.map((product, index) => {
          const isAdded = addedIds.has(product.id);
          return (
            <div key={product.id} className="flex items-center gap-3 sm:min-w-[220px]">
              {/* Connector Plus Sign */}
              {index > 0 && (
                <Plus className="hidden h-4 w-4 flex-shrink-0 text-alloy-400 sm:block dark:text-alloy-500" />
              )}

              {/* Mini Card */}
              <div className="flex flex-1 items-center gap-3 rounded-lg border border-alloy-200 bg-alloy-100 p-3 dark:border-graphene-600 dark:bg-graphene-800">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
                  loading="lazy"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-xs font-semibold text-graphene-900 dark:text-alloy-50 line-clamp-1">
                    {product.name}
                  </span>
                  <span className="text-sm font-bold text-graphene-900 dark:text-alloy-100">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <Button
                  variant={isAdded ? 'ghost' : 'secondary'}
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => handleAddSingle(product)}
                  disabled={isAdded}
                >
                  {isAdded ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add All + Summary */}
      <div className="mt-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-col">
          <span className="text-sm text-graphene-600 dark:text-alloy-300">
            Total for {bundleProducts.length} items
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-graphene-900 dark:text-alloy-50">
              ${totalPrice.toFixed(2)}
            </span>
            {totalSavings > 0 && (
              <>
                <span className="text-sm text-alloy-500 line-through dark:text-alloy-400">
                  ${totalOriginal.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-coral-500">
                  Save ${totalSavings.toFixed(2)}
                </span>
              </>
            )}
          </div>
        </div>

        <Button variant="primary" size="md" onClick={handleAddAll}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add All to Cart
        </Button>
      </div>
    </div>
  );
}
