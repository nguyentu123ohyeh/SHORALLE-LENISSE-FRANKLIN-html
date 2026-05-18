import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Cable,
  LayoutGrid,
  Headphones,
  Monitor,
  HardDrive,
  Smartphone,
  Globe,
  RotateCcw,
  ShieldCheck,
  Lock,
  Star,
  ShoppingCart,
  ChevronRight,
  Mail,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';
import { products, categories, bundles, setupGuides, reviews } from '../data/products';
import FeaturedSpotlight from '../components/product/FeaturedSpotlight';
import ProductCard from '../components/product/ProductCard';
import BundleBuilder from '../components/product/BundleBuilder';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';

// --- Icon mapping for categories ---
const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Cable,
  LayoutGrid,
  Headphones,
  Monitor,
  HardDrive,
  Smartphone,
  Globe,
};

// --- Icon mapping for setup guides ---
const GUIDE_ICON_MAP: Record<string, React.ElementType> = {
  Usb: Zap,
  Cable,
  Plane: Globe,
  Gamepad2: LayoutGrid,
};

export default function HomePage() {
  const { addItem } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- IntersectionObserver for scroll reveal ---
  useEffect(() => {
    const sections = document.querySelectorAll('.reveal-on-scroll');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // --- Derived data ---
  const featuredProduct = products.find((p) => p.badge === 'Featured Spotlight');
  const dealProducts = products.filter((p) => p.originalPrice !== undefined && p.originalPrice > p.price);
  const bestSellers = products.filter((p) => p.badge === 'Best Seller');

  const scrollToGuides = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <main className="min-h-screen bg-alloy-50 dark:bg-graphene-950">
      {/* ============================================================
          SECTION 1: HERO
          ============================================================ */}
      <section className="relative overflow-hidden bg-graphene-900 dark:bg-graphene-950">
        {/* Circuit grid background */}
        <div className="circuit-grid-dark absolute inset-0" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-graphene-900/80 via-graphene-900/60 to-graphene-900/90 dark:from-graphene-950/80 dark:via-graphene-950/60 dark:to-graphene-950/90" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="animate-slide-up max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-alloy-50 sm:text-5xl lg:text-6xl">
              Tech That{' '}
              <span className="oil-spectrum-text">
                Keeps Up
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-alloy-300 sm:text-xl">
              Curated accessories for every setup. Power, connect, and create — without compromise.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/products">
                <Button variant="primary" size="lg">
                  Shop Tech
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={scrollToGuides}>
                Explore Setups
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </div>
            {/* Quick stats */}
            <div className="mt-12 flex flex-wrap gap-8 text-alloy-400">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-alloy-50">18+</span>
                <span className="text-sm">Products</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-alloy-50">8</span>
                <span className="text-sm">Categories</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-alloy-50">3</span>
                <span className="text-sm">Curated Bundles</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-alloy-50">4.6</span>
                <span className="text-sm">Avg Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: CATEGORY MEGA-GRID
          ============================================================ */}
      <section className="reveal-on-scroll mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-graphene-900 dark:text-alloy-50">
            Browse by Category
          </h2>
          <p className="mt-2 text-graphene-600 dark:text-alloy-400">
            Find exactly what you need across our curated collections
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICON_MAP[cat.icon] ?? Zap;
            return (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-alloy-200 bg-white p-6 transition-all duration-300 hover:scale-[1.03] hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/10 dark:border-graphene-700 dark:bg-graphene-900 dark:hover:border-teal-400 dark:hover:shadow-teal-400/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-graphene-100 transition-colors duration-300 group-hover:bg-teal-500/10 dark:bg-graphene-800 dark:group-hover:bg-teal-500/20">
                  <Icon className="h-7 w-7 text-graphene-600 transition-colors group-hover:text-teal-500 dark:text-alloy-400 dark:group-hover:text-teal-400" />
                </div>
                <span className="text-sm font-semibold text-graphene-900 dark:text-alloy-50">
                  {cat.name}
                </span>
                <span className="text-xs text-graphene-500 dark:text-alloy-500">
                  {cat.count} {cat.count === 1 ? 'product' : 'products'}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          SECTION 3: FEATURED SPOTLIGHT
          ============================================================ */}
      {featuredProduct && (
        <section className="reveal-on-scroll mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-coral-500" />
            <h2 className="text-3xl font-bold text-graphene-900 dark:text-alloy-50">
              Featured Spotlight
            </h2>
          </div>
          <FeaturedSpotlight product={featuredProduct} />
        </section>
      )}

      {/* ============================================================
          SECTION 4: TODAY'S DEALS
          ============================================================ */}
      {dealProducts.length > 0 && (
        <section className="reveal-on-scroll mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-coral-500" />
              <h2 className="text-3xl font-bold text-graphene-900 dark:text-alloy-50">
                Today's Deals
              </h2>
            </div>
            <Link
              to="/products"
              className="group flex items-center gap-1 text-sm font-semibold text-teal-500 transition-colors hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
            >
              View All Deals
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-2 text-graphene-600 dark:text-alloy-400">
            Limited-time savings on top-rated gear
          </p>

          <div className="mt-8 flex gap-5 overflow-x-auto pb-4 scrollbar-thin">
            {dealProducts.map((product) => {
              const savings = product.originalPrice! - product.price;
              const savingsPercent = Math.round((savings / product.originalPrice!) * 100);
              return (
                <div
                  key={product.id}
                  className="group/card relative flex w-72 flex-shrink-0 flex-col overflow-hidden rounded-xl border border-alloy-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-graphene-700 dark:bg-graphene-900"
                >
                  <Link to={`/products/${product.slug}`} className="relative block overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-44 w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center rounded-full bg-coral-500 px-2.5 py-1 text-xs font-bold text-white">
                        Save {savingsPercent}%
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <Link to={`/products/${product.slug}`}>
                      <h3 className="text-sm font-semibold text-graphene-900 transition-colors hover:text-teal-500 dark:text-alloy-50 dark:hover:text-teal-400 line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-graphene-600 dark:text-alloy-400 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-lg font-bold text-graphene-900 dark:text-alloy-50">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-alloy-500 line-through dark:text-alloy-400">
                        ${product.originalPrice!.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-coral-500">
                      You save ${savings.toFixed(2)}
                    </span>

                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-auto w-full"
                      onClick={() => addItem(product)}
                    >
                      <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                      Quick Add
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 5: BEST SELLERS
          ============================================================ */}
      {bestSellers.length > 0 && (
        <section className="reveal-on-scroll mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-8 rounded-full bg-coral-500" />
            <h2 className="text-3xl font-bold text-graphene-900 dark:text-alloy-50">
              Best Sellers
            </h2>
          </div>
          <p className="mt-2 text-graphene-600 dark:text-alloy-400">
            Our most popular picks, loved by thousands of customers
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/products">
              <Button variant="outline" size="md">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 6: BUNDLE & SAVE
          ============================================================ */}
      <section className="reveal-on-scroll bg-alloy-100 py-16 dark:bg-graphene-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-violet-500" />
            <h2 className="text-3xl font-bold text-graphene-900 dark:text-alloy-50">
              Bundle & Save
            </h2>
          </div>
          <p className="mt-2 text-graphene-600 dark:text-alloy-400">
            Curated bundles designed for your setup — with built-in savings
          </p>

          {/* Featured Bundle Builder for the first bundle */}
          {bundles.length > 0 && (
            <div className="mt-10">
              <BundleBuilder bundleIds={bundles[0].productIds} />
            </div>
          )}

          {/* Remaining bundle cards */}
          {bundles.length > 1 && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {bundles.slice(1).map((bundle) => {
                const bundleProducts = bundle.productIds
                  .map((id) => products.find((p) => p.id === id))
                  .filter((p): p is typeof products[0] => p !== undefined);
                const totalOriginal = bundleProducts.reduce(
                  (sum, p) => sum + (p.originalPrice ?? p.price),
                  0,
                );
                const totalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);

                return (
                  <div
                    key={bundle.id}
                    className="rounded-xl border border-alloy-200 bg-white p-6 transition-all duration-300 hover:shadow-lg dark:border-graphene-700 dark:bg-graphene-800"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-graphene-900 dark:text-alloy-50">
                          {bundle.name}
                        </h3>
                        <p className="mt-1 text-sm text-graphene-600 dark:text-alloy-400">
                          {bundle.description}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-coral-500/10 px-2.5 py-1 text-xs font-bold text-coral-500 dark:bg-coral-500/20">
                        Save ${bundle.savings.toFixed(2)}
                      </span>
                    </div>

                    {/* Included products */}
                    <div className="mt-4 flex flex-wrap gap-3">
                      {bundleProducts.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.slug}`}
                          className="flex items-center gap-2 rounded-lg border border-alloy-200 bg-alloy-50 px-3 py-2 transition-colors hover:border-teal-500 dark:border-graphene-600 dark:bg-graphene-700 dark:hover:border-teal-400"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-8 w-8 rounded object-cover"
                            loading="lazy"
                          />
                          <span className="text-xs font-medium text-graphene-900 dark:text-alloy-100 line-clamp-1">
                            {product.name}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Price + Add button */}
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-graphene-900 dark:text-alloy-50">
                          ${totalPrice.toFixed(2)}
                        </span>
                        {totalOriginal > totalPrice && (
                          <span className="text-sm text-alloy-500 line-through dark:text-alloy-400">
                            ${totalOriginal.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          bundleProducts.forEach((product) => addItem(product));
                        }}
                      >
                        <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                        Add Bundle
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          SECTION 7: SETUP GUIDES
          ============================================================ */}
      <section
        ref={scrollRef}
        className="reveal-on-scroll mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-teal-500" />
          <h2 className="text-3xl font-bold text-graphene-900 dark:text-alloy-50">
            Setup Guides
          </h2>
        </div>
        <p className="mt-2 text-graphene-600 dark:text-alloy-400">
          Learn the essentials and build the perfect setup for your workflow
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {setupGuides.map((guide) => {
            const Icon = GUIDE_ICON_MAP[guide.icon] ?? Zap;
            return (
              <div
                key={guide.title}
                className="group flex flex-col gap-4 rounded-xl border border-alloy-200 bg-white p-6 transition-all duration-300 hover:border-teal-500 hover:shadow-lg dark:border-graphene-700 dark:bg-graphene-900 dark:hover:border-teal-400"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500/10 dark:bg-teal-500/20">
                  <Icon className="h-6 w-6 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-graphene-900 dark:text-alloy-50">
                    {guide.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-graphene-600 dark:text-alloy-400">
                    {guide.description}
                  </p>
                </div>
                <Link
                  to="#"
                  className="group/link inline-flex items-center gap-1 text-sm font-semibold text-teal-500 transition-colors hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          SECTION 8: TRUST ROW
          ============================================================ */}
      <section className="reveal-on-scroll border-t border-alloy-200 bg-white py-16 dark:border-graphene-700 dark:bg-graphene-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              {
                icon: RotateCcw,
                title: 'Easy Returns',
                description: '30-day hassle-free returns on all products. No questions asked, no hidden fees.',
              },
              {
                icon: Headphones,
                title: 'Expert Support',
                description: 'Our tech specialists are ready to help you find the perfect setup and troubleshoot any issue.',
              },
              {
                icon: ShieldCheck,
                title: 'Authentic Products',
                description: 'Every item is sourced directly from manufacturers and authorized distributors. Guaranteed genuine.',
              },
              {
                icon: Lock,
                title: 'Secure Handling',
                description: 'Your data and transactions are protected with industry-standard encryption and secure processing.',
              },
            ].map((block) => {
              const Icon = block.icon;
              return (
                <div key={block.title} className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/10 dark:bg-teal-500/20">
                    <Icon className="h-7 w-7 text-teal-500" />
                  </div>
                  <h3 className="text-base font-bold text-graphene-900 dark:text-alloy-50">
                    {block.title}
                  </h3>
                  <p className="text-sm text-graphene-600 dark:text-alloy-400">
                    {block.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 9: REVIEWS CAROUSEL
          ============================================================ */}
      <section className="reveal-on-scroll mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Star className="h-6 w-6 fill-coral-500 text-coral-500" />
          <h2 className="text-3xl font-bold text-graphene-900 dark:text-alloy-50">
            What Customers Say
          </h2>
        </div>
        <p className="mt-2 text-graphene-600 dark:text-alloy-400">
          Real reviews from real tech enthusiasts
        </p>

        <div className="mt-8 flex gap-6 overflow-x-auto pb-4">
          {reviews.map((review, index) => {
            const fullStars = review.rating;
            return (
              <div
                key={`${review.name}-${index}`}
                className="flex w-80 flex-shrink-0 flex-col gap-4 rounded-xl border border-alloy-200 bg-white p-6 dark:border-graphene-700 dark:bg-graphene-900"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < fullStars
                          ? 'fill-coral-500 text-coral-500'
                          : 'fill-alloy-200 text-alloy-200 dark:fill-graphene-700 dark:text-graphene-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm leading-relaxed text-graphene-700 dark:text-alloy-300">
                  "{review.text}"
                </p>

                {/* Reviewer info */}
                <div className="mt-auto border-t border-alloy-200 pt-4 dark:border-graphene-700">
                  <span className="text-sm font-semibold text-graphene-900 dark:text-alloy-50">
                    {review.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-graphene-500 dark:text-alloy-500">
                    {review.product}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          SECTION 10: NEWSLETTER SIGNUP
          ============================================================ */}
      <section className="reveal-on-scroll bg-graphene-900 dark:bg-graphene-950">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Mail className="mx-auto h-10 w-10 text-teal-500" />
            <h2 className="mt-4 text-3xl font-bold text-alloy-50">
              Stay in the Loop
            </h2>
            <p className="mt-3 text-alloy-400">
              Get notified about new products, exclusive deals, and setup tips
              delivered straight to your inbox.
            </p>

            {subscribed ? (
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/20">
                  <Check className="h-7 w-7 text-teal-500" />
                </div>
                <p className="text-lg font-semibold text-teal-500">
                  You're subscribed!
                </p>
                <p className="text-sm text-alloy-400">
                  Welcome aboard. We'll send you the best tech updates.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-graphene-700 bg-graphene-800 px-4 py-3 text-sm text-alloy-50 placeholder-alloy-500 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 sm:max-w-xs"
                />
                <Button variant="primary" size="lg" type="submit">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            <p className="mt-4 text-xs text-alloy-600">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
