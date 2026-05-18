import { Link } from 'react-router-dom';
import { X, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';
import CartItem from './CartItem';

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-graphene-950/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full max-w-md w-full flex-col bg-graphene-900 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-alloy-100/10 px-5 py-4">
          <h2 className="text-lg font-bold text-alloy-50">
            Your Cart
            {itemCount > 0 && (
              <span className="ml-2 inline-flex items-center rounded-full bg-coral-500 px-2 py-0.5 text-xs font-semibold text-white">
                {itemCount}
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="rounded-md p-1.5 text-alloy-100 transition-colors hover:bg-alloy-100/10 hover:text-alloy-50"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart items or empty state */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5">
            <ShoppingCart className="h-12 w-12 text-alloy-100/40" />
            <p className="text-lg font-semibold text-alloy-50">Your cart is empty</p>
            <Link
              to="/products"
              onClick={closeCart}
              className="text-sm font-medium text-teal-500 transition-colors hover:text-teal-400 hover:underline"
            >
              Shop Tech
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-2">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-alloy-100/10 px-5 py-4">
          {items.length > 0 && (
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-alloy-100">Subtotal</span>
              <span className="text-lg font-bold text-alloy-50">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Link to="/checkout-info" onClick={closeCart}>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={items.length === 0}
              >
                Checkout
              </Button>
            </Link>
            <Link
              to="/products"
              onClick={closeCart}
              className="text-center text-sm font-medium text-teal-500 transition-colors hover:text-teal-400 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
