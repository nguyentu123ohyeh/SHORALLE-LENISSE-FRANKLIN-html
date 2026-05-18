import { Link } from 'react-router-dom';
import {
  Info,
  ShoppingCart,
  Mail,
  Phone,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Circle,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';

// ---------------------------------------------------------------------------
// Step Indicator
// ---------------------------------------------------------------------------

interface Step {
  label: string;
  icon: React.ElementType;
  status: 'active' | 'pending';
}

const STEPS: Step[] = [
  { label: 'Review Cart', icon: ShoppingCart, status: 'active' },
  { label: 'Contact Support', icon: MessageCircle, status: 'pending' },
  { label: 'Confirm Order', icon: CheckCircle2, status: 'pending' },
];

function StepIndicator() {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const isActive = step.status === 'active';
        const isLast = i === STEPS.length - 1;

        return (
          <div key={step.label} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? 'border-coral-500 bg-coral-500/10 shadow-md shadow-coral-500/20'
                    : 'border-alloy-200 bg-white dark:border-graphene-700 dark:bg-graphene-800'
                }`}
              >
                {isActive ? (
                  <Icon className="h-5 w-5 text-coral-500" />
                ) : (
                  <Circle className="h-5 w-5 text-alloy-300 dark:text-graphene-600" />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-semibold ${
                  isActive
                    ? 'text-coral-500 dark:text-coral-400'
                    : 'text-alloy-400 dark:text-alloy-500'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="relative mx-2 h-0.5 w-12 sm:w-20">
                <div className="absolute inset-0 bg-alloy-200 dark:bg-graphene-700" />
                {isActive && (
                  <div className="absolute inset-0 w-1/2 bg-coral-500 transition-all duration-500" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cart Summary
// ---------------------------------------------------------------------------

function CartSummary() {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-alloy-200 bg-white p-8 text-center dark:border-graphene-700 dark:bg-graphene-900/80">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-alloy-100 dark:bg-graphene-800">
          <ShoppingCart className="h-8 w-8 text-alloy-400 dark:text-alloy-500" />
        </div>
        <h3 className="text-lg font-bold text-graphene-900 dark:text-alloy-50">
          Your cart is empty
        </h3>
        <p className="mt-2 text-sm text-graphene-600 dark:text-alloy-400">
          Add some products to your cart before checking out.
        </p>
        <Link
          to="/products"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-500 transition-colors hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
        >
          <ShoppingBag className="h-4 w-4" />
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-alloy-200 bg-white dark:border-graphene-700 dark:bg-graphene-900/80">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-alloy-200 px-6 py-4 dark:border-graphene-700">
        <ShoppingCart className="h-5 w-5 text-graphene-600 dark:text-alloy-400" />
        <h3 className="text-sm font-bold text-graphene-900 dark:text-alloy-50">
          Cart Summary
        </h3>
        <span className="ml-auto inline-flex items-center rounded-full bg-alloy-100 px-2.5 py-0.5 text-xs font-semibold text-graphene-600 dark:bg-graphene-800 dark:text-alloy-400">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Item list */}
      <ul className="divide-y divide-alloy-100 dark:divide-graphene-700/50">
        {items.map((item) => (
          <li
            key={item.product.id}
            className="flex items-center justify-between px-6 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-graphene-900 dark:text-alloy-100">
                {item.product.name}
              </p>
              <p className="text-xs text-graphene-500 dark:text-alloy-500">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="ml-4 text-sm font-semibold text-graphene-700 dark:text-alloy-300">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      {/* Subtotal */}
      <div className="border-t border-alloy-200 px-6 py-4 dark:border-graphene-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-graphene-900 dark:text-alloy-50">
            Subtotal
          </span>
          <span className="text-lg font-extrabold text-teal-500 dark:text-teal-400">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export default function CheckoutInfoPage() {

  return (
    <main className="min-h-screen bg-alloy-50 dark:bg-graphene-950">
      {/* =============================================================
          PAGE HEADER
          ============================================================= */}
      <section className="border-b border-alloy-200 bg-white dark:border-graphene-700 dark:bg-graphene-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-graphene-500 dark:text-alloy-400">
              <li>
                <Link to="/" className="transition-colors hover:text-teal-500 dark:hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li>
                <Link to="/products" className="transition-colors hover:text-teal-500 dark:hover:text-teal-400">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="font-semibold text-graphene-900 dark:text-alloy-50">Checkout</li>
            </ol>
          </nav>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold tracking-tight text-graphene-900 dark:text-alloy-50 sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-graphene-600 dark:text-alloy-400">
            Review your cart and reach out to us to finalize your order.
          </p>
        </div>
      </section>

      {/* =============================================================
          MAIN CONTENT
          ============================================================= */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">

          {/* ---------------------------------------------------------
              CHECKOUT NOTICE
              --------------------------------------------------------- */}
          <div className="flex gap-4 rounded-xl border-l-4 border-l-coral-500 border border-alloy-200 bg-white p-5 shadow-sm dark:border-graphene-700 dark:bg-graphene-900/80">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-coral-500/10">
              <Info className="h-5 w-5 text-coral-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-graphene-900 dark:text-alloy-50">
                Checkout coming soon
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-graphene-600 dark:text-alloy-400">
                Checkout and payment are not yet implemented.{' '}
                <Link
                  to="/contact"
                  className="font-semibold text-teal-500 transition-colors hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  Contact us
                </Link>{' '}
                to finalize your order &mdash; our team will review your cart and help you complete your purchase.
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------
              CHECKOUT STEPS
              --------------------------------------------------------- */}
          <div className="rounded-xl border border-alloy-200 bg-white p-6 dark:border-graphene-700 dark:bg-graphene-900/80">
            <h3 className="mb-6 text-center text-sm font-bold uppercase tracking-wider text-graphene-500 dark:text-alloy-500">
              Checkout Steps
            </h3>
            <StepIndicator />
          </div>

          {/* ---------------------------------------------------------
              CART SUMMARY
              --------------------------------------------------------- */}
          <CartSummary />

          {/* ---------------------------------------------------------
              CTA SECTION
              --------------------------------------------------------- */}
          <div className="rounded-xl border border-alloy-200 bg-white p-8 text-center dark:border-graphene-700 dark:bg-graphene-900/80">
            <h2 className="text-xl font-bold text-graphene-900 dark:text-alloy-50">
              Contact Support to Finalize
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-graphene-600 dark:text-alloy-400">
              Our team will review your cart and help you complete your order.
            </p>

            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-coral-500 px-8 py-3 text-base font-semibold text-white shadow-md shadow-coral-500/25 transition-colors hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 focus:ring-offset-alloy-50 dark:focus:ring-offset-graphene-950"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-1 text-sm font-medium text-teal-500 transition-colors hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* ---------------------------------------------------------
              BUSINESS INFO
              --------------------------------------------------------- */}
          <div className="rounded-xl border border-alloy-200 bg-white p-6 dark:border-graphene-700 dark:bg-graphene-900/80">
            <h3 className="mb-4 text-sm font-bold text-graphene-900 dark:text-alloy-50">
              Contact Information
            </h3>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              {/* Email */}
              <a
                href="mailto:soodtwyla676@gmail.com"
                className="group flex items-center gap-3 text-sm transition-colors"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/5 transition-colors group-hover:border-teal-500 group-hover:bg-teal-500/10 dark:border-teal-500/20 dark:bg-teal-500/5">
                  <Mail className="h-5 w-5 text-teal-500 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-wider text-graphene-500 dark:text-alloy-600">
                    EMAIL
                  </p>
                  <p className="text-teal-500 transition-colors group-hover:text-teal-600 dark:text-teal-400 dark:group-hover:text-teal-300">
                    soodtwyla676@gmail.com
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+12133610175"
                className="group flex items-center gap-3 text-sm transition-colors"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/5 transition-colors group-hover:border-violet-500 group-hover:bg-violet-500/10 dark:border-violet-500/20 dark:bg-violet-500/5">
                  <Phone className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-wider text-graphene-500 dark:text-alloy-600">
                    PHONE
                  </p>
                  <p className="text-violet-500 transition-colors group-hover:text-violet-600 dark:text-violet-400 dark:group-hover:text-violet-300">
                    +1 7187158758
                  </p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
