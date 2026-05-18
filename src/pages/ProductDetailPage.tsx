import { useState, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  Monitor,
  Plane,
  Gamepad2,
  Usb,
  Zap,
  Package,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  MonitorSmartphone,
} from 'lucide-react';
import { products, type Product } from '../data/products';
import BundleBuilder from '../components/product/BundleBuilder';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useCart } from '../contexts/CartContext';

// --- Constants ---

const BADGE_VARIANT_MAP: Record<string, 'best-seller' | 'new' | 'limited' | 'featured'> = {
  'Best Seller': 'best-seller',
  New: 'new',
  Limited: 'limited',
  'Featured Spotlight': 'featured',
};

const SETUP_MODE_ICONS: Record<string, React.ElementType> = {
  Desk: Monitor,
  Travel: Plane,
  Gaming: Gamepad2,
};

const SETUP_MODE_COLORS: Record<string, string> = {
  Desk: 'bg-teal-500/15 text-teal-500 border-teal-500/30',
  Travel: 'bg-coral-500/15 text-coral-500 border-coral-500/30',
  Gaming: 'bg-violet-500/15 text-violet-500 border-violet-500/30',
};

const USE_CASE_ICONS: Record<string, React.ElementType> = {
  Work: Monitor,
  Travel: Plane,
  Gaming: Gamepad2,
};

const USE_CASE_COLORS: Record<string, string> = {
  Work: 'border-teal-500/30 bg-teal-500/5 dark:bg-teal-500/10',
  Travel: 'border-coral-500/30 bg-coral-500/5 dark:bg-coral-500/10',
  Gaming: 'border-violet-500/30 bg-violet-500/5 dark:bg-violet-500/10',
};

const USE_CASE_ICON_COLORS: Record<string, string> = {
  Work: 'text-teal-500',
  Travel: 'text-coral-500',
  Gaming: 'text-violet-500',
};

// --- Accordion Section Data ---

interface AccordionSection {
  key: string;
  title: string;
  icon: React.ElementType;
  items?: string[];
  text?: string;
}

function getAccordionSections(product: Product): AccordionSection[] {
  const sections: AccordionSection[] = [];

  if ((product.specs.ports && product.specs.ports.length > 0) || (product.specs.standards && product.specs.standards.length > 0)) {
    const items: string[] = [];
    if (product.specs.ports && product.specs.ports.length > 0) {
      items.push(...product.specs.ports);
    }
    if (product.specs.standards && product.specs.standards.length > 0) {
      items.push(...product.specs.standards);
    }
    sections.push({ key: 'ports', title: 'Ports & Standards', icon: Usb, items });
  }

  if (product.specs.powerDelivery) {
    sections.push({ key: 'power', title: 'Power Delivery', icon: Zap, text: product.specs.powerDelivery });
  }

  if (product.specs.materials) {
    sections.push({ key: 'materials', title: 'Materials & Build', icon: Package, text: product.specs.materials });
  }

  if (product.specs.inTheBox && product.specs.inTheBox.length > 0) {
    sections.push({ key: 'inbox', title: 'In the Box', icon: Package, items: product.specs.inTheBox });
  }

  if (product.specs.careNotes) {
    sections.push({ key: 'care', title: 'Care & Handling', icon: AlertTriangle, text: product.specs.careNotes });
  }

  return sections;
}

// --- 404 Component ---

function ProductNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-alloy-50 px-4 dark:bg-graphene-950">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-graphene-900 dark:text-alloy-50">
          Product not found
        </h1>
        <p className="mt-4 text-graphene-600 dark:text-alloy-400">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-coral-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-600"
        >
          <ChevronRight className="h-4 w-4" />
          Back to Products
        </Link>
      </div>
    </main>
  );
}

// --- Accordion Section Component ---

function SpecAccordion({ sections }: { sections: AccordionSection[] }) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  const toggle = useCallback((key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  return (
    <div className="space-y-3">
      {sections.map(({ key, title, icon: Icon, items, text }) => {
        const isOpen = openKeys.has(key);
        return (
          <div
            key={key}
            className="overflow-hidden rounded-xl border border-alloy-200 bg-white dark:border-graphene-700 dark:bg-graphene-900"
          >
            <button
              onClick={() => toggle(key)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-alloy-50 dark:hover:bg-graphene-800"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-teal-500" />
                <span className="text-base font-semibold text-graphene-900 dark:text-alloy-50">
                  {title}
                </span>
              </span>
              <ChevronDown
                className={`h-5 w-5 text-graphene-500 transition-transform duration-200 dark:text-alloy-400 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-alloy-200 px-5 py-4 dark:border-graphene-700">
                {items && items.length > 0 && (
                  <ul className="space-y-2">
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-graphene-700 dark:text-alloy-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {text && (
                  <p className="text-sm leading-relaxed text-graphene-700 dark:text-alloy-300">
                    {text}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// --- Main Page Component ---

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();

  const product = useMemo(
    () => products.find((p) => p.slug === slug),
    [slug],
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Reset image index and loaded state when product changes
  const currentImages = product?.images ?? [];
  const mainImage = currentImages[selectedImageIndex] ?? '';

  const handleImageSelect = useCallback((index: number) => {
    setImageLoaded(false);
    setSelectedImageIndex(index);
  }, []);

  const handleQuantityChange = useCallback((delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addItem(product, quantity);
      setQuantity(1);
    }
  }, [product, quantity, addItem]);

  // Related products: same category, exclude current product, limit to 4
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Accordion sections
  const accordionSections = useMemo(
    () => (product ? getAccordionSections(product) : []),
    [product],
  );

  // --- 404 ---

  if (!product) {
    return <ProductNotFound />;
  }

  // --- Derived ---

  const isOnSale = product.originalPrice !== undefined && product.originalPrice > product.price;
  const savings = isOnSale ? product.originalPrice! - product.price : 0;
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating - fullStars >= 0.5;
  const hasBundles = product.bundleIds && product.bundleIds.length > 0;

  return (
    <main className="min-h-screen bg-alloy-50 dark:bg-graphene-950">
      {/* ============================================================
          BREADCRUMB
          ============================================================ */}
      <section className="border-b border-alloy-200 bg-white dark:border-graphene-700 dark:bg-graphene-900">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-graphene-500 dark:text-alloy-400">
              <li>
                <Link to="/" className="transition-colors hover:text-teal-500 dark:hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li>
                <Link to="/products" className="transition-colors hover:text-teal-500 dark:hover:text-teal-400">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li className="font-semibold text-graphene-900 dark:text-alloy-50">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ============================================================
          PRODUCT HERO
          ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* --- Left: Image Gallery --- */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-alloy-200 bg-white dark:border-graphene-700 dark:bg-graphene-900">
              <img
                key={selectedImageIndex}
                src={mainImage}
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                className={`h-full w-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-alloy-100 dark:bg-graphene-800" />
              )}
              {/* Badge overlay */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant={BADGE_VARIANT_MAP[product.badge] ?? 'featured'}>
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3">
              {currentImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    index === selectedImageIndex
                      ? 'border-coral-500 ring-2 ring-coral-500/30'
                      : 'border-alloy-200 hover:border-teal-500 dark:border-graphene-700 dark:hover:border-teal-400'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* --- Right: Product Info --- */}
          <div className="flex flex-col gap-5">
            {/* Category Badge */}
            <div>
              <Badge variant="category">{product.category}</Badge>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl font-extrabold tracking-tight text-graphene-900 dark:text-alloy-50 sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < fullStars
                      ? 'fill-coral-500 text-coral-500'
                      : i === fullStars && hasHalfStar
                        ? 'fill-coral-500/50 text-coral-500'
                        : 'fill-alloy-200 text-alloy-200 dark:fill-graphene-700 dark:text-graphene-700'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-semibold text-graphene-900 dark:text-alloy-100">
                {product.rating}
              </span>
              <span className="text-sm text-graphene-500 dark:text-alloy-400">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-graphene-900 dark:text-alloy-50">
                ${product.price.toFixed(2)}
              </span>
              {isOnSale && (
                <>
                  <span className="text-lg text-alloy-500 line-through dark:text-alloy-400">
                    ${product.originalPrice!.toFixed(2)}
                  </span>
                  <span className="rounded-full bg-coral-500/15 px-2.5 py-0.5 text-sm font-semibold text-coral-500">
                    Save ${savings.toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-base leading-relaxed text-graphene-600 dark:text-alloy-400">
              {product.shortDescription}
            </p>

            {/* Add to Cart Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Quantity Selector */}
              <div className="flex items-center overflow-hidden rounded-lg border border-alloy-200 bg-white dark:border-graphene-700 dark:bg-graphene-800">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="flex h-10 w-10 items-center justify-center text-graphene-600 transition-colors hover:bg-alloy-50 disabled:cursor-not-allowed disabled:opacity-40 dark:text-alloy-300 dark:hover:bg-graphene-700"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="flex h-10 w-12 items-center justify-center border-x border-alloy-200 text-sm font-semibold text-graphene-900 dark:border-graphene-700 dark:text-alloy-50">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="flex h-10 w-10 items-center justify-center text-graphene-600 transition-colors hover:bg-alloy-50 dark:text-alloy-300 dark:hover:bg-graphene-700"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button variant="primary" size="lg" onClick={handleAddToCart} className="flex-1 sm:flex-none">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {/* Setup Mode Badges */}
            {product.setupModes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.setupModes.map((mode) => {
                  const Icon = SETUP_MODE_ICONS[mode];
                  const colors = SETUP_MODE_COLORS[mode] ?? '';
                  return (
                    <span
                      key={mode}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${colors}`}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5" />}
                      {mode}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          COMPATIBILITY PANEL
          ============================================================ */}
      <section className="border-t border-alloy-200 bg-white dark:border-graphene-700 dark:bg-graphene-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-graphene-900 dark:text-alloy-50">
            <Cpu className="h-6 w-6 text-teal-500" />
            Compatibility
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Supported Devices */}
            {product.compatibility.devices && product.compatibility.devices.length > 0 && (
              <div className="rounded-xl border border-alloy-200 bg-alloy-50 p-5 dark:border-graphene-700 dark:bg-graphene-800">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-graphene-500 dark:text-alloy-400">
                  <MonitorSmartphone className="h-4 w-4 text-teal-500" />
                  Supported Devices
                </h3>
                <ul className="space-y-1.5">
                  {product.compatibility.devices.map((device, i) => (
                    <li key={i} className="text-sm text-graphene-700 dark:text-alloy-300">
                      {device}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Ports */}
            {product.compatibility.ports && product.compatibility.ports.length > 0 && (
              <div className="rounded-xl border border-alloy-200 bg-alloy-50 p-5 dark:border-graphene-700 dark:bg-graphene-800">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-graphene-500 dark:text-alloy-400">
                  <Usb className="h-4 w-4 text-teal-500" />
                  Required Ports
                </h3>
                <ul className="space-y-1.5">
                  {product.compatibility.ports.map((port, i) => (
                    <li key={i} className="text-sm text-graphene-700 dark:text-alloy-300">
                      {port}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* OS Compatibility */}
            {product.compatibility.os && product.compatibility.os.length > 0 && (
              <div className="rounded-xl border border-alloy-200 bg-alloy-50 p-5 dark:border-graphene-700 dark:bg-graphene-800">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-graphene-500 dark:text-alloy-400">
                  <Cpu className="h-4 w-4 text-teal-500" />
                  OS Compatibility
                </h3>
                <ul className="space-y-1.5">
                  {product.compatibility.os.map((os, i) => (
                    <li key={i} className="text-sm text-graphene-700 dark:text-alloy-300">
                      {os}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes / Warnings */}
            {product.compatibility.notes && (
              <div className="rounded-xl border border-alloy-200 bg-alloy-50 p-5 dark:border-graphene-700 dark:bg-graphene-800">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-graphene-500 dark:text-alloy-400">
                  <AlertTriangle className="h-4 w-4 text-coral-500" />
                  Notes
                </h3>
                <p className="text-sm leading-relaxed text-graphene-700 dark:text-alloy-300">
                  {product.compatibility.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          LONG-FORM DESCRIPTION
          ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-graphene-900 dark:text-alloy-50">
          What It Solves
        </h2>
        <p className="mb-8 max-w-3xl text-base leading-relaxed text-graphene-600 dark:text-alloy-400">
          {product.longDescription.whatItSolves}
        </p>

        <h2 className="mb-6 text-2xl font-bold text-graphene-900 dark:text-alloy-50">
          Best Use Cases
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {product.longDescription.bestUseCases.map((useCase) => {
            // Parse "Work: ..." or "Travel: ..." or "Gaming: ..."
            const colonIndex = useCase.indexOf(':');
            const label = colonIndex !== -1 ? useCase.substring(0, colonIndex).trim() : useCase;
            const description = colonIndex !== -1 ? useCase.substring(colonIndex + 1).trim() : '';
            const Icon = USE_CASE_ICONS[label];
            const cardColor = USE_CASE_COLORS[label] ?? '';
            const iconColor = USE_CASE_ICON_COLORS[label] ?? 'text-teal-500';

            return (
              <div
                key={label}
                className={`rounded-xl border p-6 ${cardColor}`}
              >
                <div className="mb-3 flex items-center gap-3">
                  {Icon && <Icon className={`h-6 w-6 ${iconColor}`} />}
                  <h3 className="text-lg font-bold text-graphene-900 dark:text-alloy-50">
                    {label}
                  </h3>
                </div>
                {description && (
                  <p className="text-sm leading-relaxed text-graphene-600 dark:text-alloy-300">
                    {description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          SPECS ACCORDION
          ============================================================ */}
      <section className="border-t border-alloy-200 bg-white dark:border-graphene-700 dark:bg-graphene-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-graphene-900 dark:text-alloy-50">
            Specifications
          </h2>
          <SpecAccordion sections={accordionSections} />
        </div>
      </section>

      {/* ============================================================
          BUNDLE BUILDER SUGGESTIONS
          ============================================================ */}
      {hasBundles && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <BundleBuilder bundleIds={product.bundleIds!} />
        </section>
      )}

      {/* ============================================================
          RELATED PRODUCTS
          ============================================================ */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-alloy-200 bg-white dark:border-graphene-700 dark:bg-graphene-900">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-graphene-900 dark:text-alloy-50">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
