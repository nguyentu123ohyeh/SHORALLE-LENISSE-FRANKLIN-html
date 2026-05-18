import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import type { Product } from '../../data/products';

interface CartItemProps {
  item: {
    product: Product;
    quantity: number;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleDecrease = () => {
    if (quantity <= 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex items-start gap-3 border-b border-alloy-100/10 py-4">
      {/* Thumbnail */}
      <img
        src={product.images[0]}
        alt={product.name}
        className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
      />

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {/* Name & category */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-alloy-50">
              {product.name}
            </h4>
            <span className="inline-flex items-center rounded-full bg-alloy-100/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-alloy-100">
              {product.category}
            </span>
          </div>
          <button
            onClick={handleRemove}
            className="flex-shrink-0 rounded-md p-1 text-alloy-100 transition-colors hover:bg-alloy-100/10 hover:text-coral-500"
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Price & quantity */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-alloy-100">
            ${product.price.toFixed(2)} x {quantity}
          </div>
          <div className="text-sm font-semibold text-alloy-50">
            ${(product.price * quantity).toFixed(2)}
          </div>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleDecrease}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-alloy-100/20 text-alloy-100 transition-colors hover:border-coral-500 hover:text-coral-500"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="flex h-7 w-8 items-center justify-center text-sm font-medium text-alloy-50">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-alloy-100/20 text-alloy-100 transition-colors hover:border-teal-500 hover:text-teal-500"
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
