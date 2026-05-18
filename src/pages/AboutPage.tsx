import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  CheckCircle,
  ChevronRight,
  Gamepad2,
  Leaf,
  Mail,
  MessageSquare,
  Monitor,
  PackageCheck,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { products } from '../data/products';

const CONTACT_EMAIL = 'soodtwyla676@gmail.com';
const CONTACT_PHONE = '+1 7187158758';
const CONTACT_PHONE_HREF = '+17187158758';

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function InfoCard({ icon: Icon, title, description }: InfoCardProps) {
  return (
    <div className="group rounded-2xl border border-graphene-700 bg-graphene-900/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:shadow-xl hover:shadow-teal-500/10">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 transition-colors group-hover:bg-teal-500 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-bold text-alloy-50">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-alloy-400">
        {description}
      </p>
    </div>
  );
}

interface SetupCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
}

function SetupCard({ icon: Icon, title, description, items }: SetupCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-graphene-700 bg-graphene-900/80 p-6 shadow-sm backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-teal-500/10" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-alloy-50">
              {title}
            </h3>
            <p className="text-sm text-alloy-400">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {items.map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-alloy-400">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const categoryStats = useMemo(() => {
    const map = new Map<string, number>();

    products.forEach((product) => {
      map.set(product.category, (map.get(product.category) ?? 0) + 1);
    });

    return Array.from(map.entries()).map(([category, count]) => ({
      category,
      count,
    }));
  }, []);

  const featuredProducts = useMemo(
    () =>
      products
        .filter((product) => product.badge === 'Best Seller' || product.badge === 'New')
        .slice(0, 3),
    [],
  );

  const bestSellerCount = useMemo(
    () => products.filter((product) => product.badge === 'Best Seller').length,
    [],
  );

  return (
    <main className="min-h-screen bg-graphene-950 text-alloy-50">
      {/* ============================================================
          PAGE HEADER
          ============================================================ */}
      <section className="border-b border-graphene-700 bg-graphene-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-sm text-alloy-400">
              <li>
                <Link to="/" className="transition-colors hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li className="font-semibold text-alloy-50">About</li>
            </ol>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              {/* Back button */}
              <Link
                to="/"
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-graphene-700 bg-graphene-800 px-4 py-2 text-sm font-semibold text-alloy-300 transition-all hover:-translate-x-1 hover:border-teal-400 hover:text-teal-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
                <Sparkles className="h-3.5 w-3.5" />
                About Our Store
              </div>

              <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-alloy-50 sm:text-4xl lg:text-5xl">
                Curated tech accessories for smarter daily setups.
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-alloy-400 sm:text-lg">
                We focus on practical electronics and smart accessories that make your desk,
                travel routine, car setup, home space, and entertainment moments easier to use.
                Every item is presented with clear specs, compatibility notes, setup modes, and
                simple buying guidance.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-colors hover:bg-teal-600"
                >
                  Explore Products
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-graphene-700 bg-graphene-800 px-5 py-3 text-sm font-semibold text-alloy-300 transition-colors hover:border-coral-400 hover:text-coral-400"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            {/* Header stats */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-graphene-700 bg-graphene-800 p-4">
              <div className="rounded-xl bg-graphene-900 p-4 text-center shadow-sm">
                <p className="text-2xl font-extrabold text-alloy-50">
                  {products.length}
                </p>
                <p className="mt-1 text-xs font-medium text-alloy-400">
                  Products
                </p>
              </div>
              <div className="rounded-xl bg-graphene-900 p-4 text-center shadow-sm">
                <p className="text-2xl font-extrabold text-alloy-50">
                  {categoryStats.length}
                </p>
                <p className="mt-1 text-xs font-medium text-alloy-400">
                  Categories
                </p>
              </div>
              <div className="rounded-xl bg-graphene-900 p-4 text-center shadow-sm">
                <p className="text-2xl font-extrabold text-alloy-50">
                  {bestSellerCount}
                </p>
                <p className="mt-1 text-xs font-medium text-alloy-400">
                  Best Sellers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          INTRO SECTION
          ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-3xl border border-graphene-700 bg-graphene-900/80 p-6 shadow-sm backdrop-blur-sm">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral-500">
              What we sell
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-alloy-50 sm:text-3xl">
              Real-use electronics, not random gadget clutter.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-alloy-400">
              Our catalog is built around useful products: portable projectors,
              magnetic power banks, smart locks, health monitors, air purifiers,
              Bluetooth speakers, car chargers, wireless mice, charging stations,
              smart scales, and portable displays.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {categoryStats.map((item) => (
                <span
                  key={item.category}
                  className="rounded-full border border-graphene-700 bg-graphene-800 px-3 py-1.5 text-xs font-semibold text-alloy-300"
                >
                  {item.category} · {item.count}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="group overflow-hidden rounded-2xl border border-graphene-700 bg-graphene-900/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:shadow-xl hover:shadow-teal-500/10"
              >
                <div className="flex h-40 items-center justify-center bg-graphene-800 p-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-1 text-xs font-semibold text-coral-500">
                    <Star className="h-3.5 w-3.5 fill-coral-500" />
                    {product.rating} · {product.reviewCount} reviews
                  </div>
                  <h3 className="line-clamp-2 text-sm font-bold text-alloy-50 group-hover:text-teal-400">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs text-alloy-400">
                    {product.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          OUR APPROACH
          ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-teal-500" />
          <h2 className="text-2xl font-bold text-alloy-50">
            How We Curate Products
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            icon={BadgeCheck}
            title="Clear product purpose"
            description="Each product needs a practical use case: desk work, travel, car setup, home comfort, health tracking, audio, or entertainment."
          />
          <InfoCard
            icon={PackageCheck}
            title="Specs that are easy to read"
            description="We organize ports, power, materials, compatibility, and in-the-box details so customers can compare quickly."
          />
          <InfoCard
            icon={MessageSquare}
            title="Support before checkout"
            description="Customers can contact us before ordering if they need help choosing the right device or confirming compatibility."
          />
          <InfoCard
            icon={Award}
            title="Balanced selection"
            description="The catalog mixes best sellers, new arrivals, practical budget items, and higher-value smart tech products."
          />
        </div>
      </section>

      {/* ============================================================
          SETUP MODES
          ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-graphene-700 bg-graphene-900/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-500">
              Setup Mode Philosophy
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-alloy-50 sm:text-3xl">
              Products are easier to shop when they match the way people actually use them.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-alloy-400">
              Instead of only listing products by category, we also think in real-life setup modes.
              This makes the About page feel connected to the Products page filters.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <SetupCard
              icon={Monitor}
              title="Desk"
              description="For workspaces and home offices"
              items={[
                'Charging stations, wireless mouse, smart display, speaker lamp',
                'Useful for tidy desks, daily charging, and focused work',
                'Clear compatibility notes for laptops, phones, and accessories',
              ]}
            />
            <SetupCard
              icon={Plane}
              title="Travel"
              description="For mobile use and road trips"
              items={[
                'Power banks, GPS trackers, car chargers, FM transmitters',
                'Compact products that are easy to carry or use in vehicles',
                'Good for backup power, navigation, entertainment, and safety',
              ]}
            />
            <SetupCard
              icon={Gamepad2}
              title="Gaming"
              description="For entertainment and flexible setups"
              items={[
                'Portable display, speaker lamp, power accessories, projectors',
                'Designed around simple connection and comfortable use',
                'Helps customers build a more complete entertainment setup',
              ]}
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          QUALITY + SUSTAINABILITY
          ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-graphene-700 bg-graphene-900/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-alloy-50">
              Quality Mindset
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-alloy-400">
              We avoid exaggerated promises. Product pages should explain what the item does,
              where it fits, what devices it supports, what comes in the box, and how customers
              should care for it.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {['Compatibility first', 'Simple descriptions', 'Useful spec badges', 'Care notes included'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl bg-graphene-800 px-3 py-2 text-sm font-medium text-alloy-300">
                  <CheckCircle className="h-4 w-4 text-teal-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-graphene-700 bg-graphene-900/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
              <Leaf className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-alloy-50">
              Practical Sustainability
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-alloy-400">
              We keep sustainability language realistic: less waste, longer product life,
              better care habits, and fewer wrong purchases caused by unclear compatibility.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {['Reduce wrong orders', 'Promote product care', 'Favor durable use', 'Avoid vague claims'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl bg-graphene-800 px-3 py-2 text-sm font-medium text-alloy-300">
                  <Leaf className="h-4 w-4 text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTACT CTA
          ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-graphene-900 text-alloy-50 shadow-xl">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
                <Zap className="h-3.5 w-3.5" />
                Need help choosing?
              </div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Tell us your device, setup, or use case — we will help you choose the right product.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-alloy-400">
                Whether you need a travel charger, a desk accessory, a smart home device,
                or a product for entertainment, our support team can help confirm the most suitable option.
              </p>
            </div>

            <div className="rounded-2xl border border-alloy-50/10 bg-graphene-900/5 p-5">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-graphene-900/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-alloy-500">Email</p>
                  <p className="text-sm font-semibold text-alloy-50">{CONTACT_EMAIL}</p>
                </div>
              </a>

              <a
                href={`tel:${CONTACT_PHONE_HREF}`}
                className="mt-2 flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-graphene-900/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coral-500/10 text-coral-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-alloy-500">Phone</p>
                  <p className="text-sm font-semibold text-alloy-50">{CONTACT_PHONE}</p>
                </div>
              </a>

              <Link
                to="/contact"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-coral-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-600"
              >
                Open Contact Page
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-8" />
    </main>
  );
}
