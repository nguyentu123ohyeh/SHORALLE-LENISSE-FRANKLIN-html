import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Cpu,
  Truck,
  ShieldCheck,
  Wrench,
  Headset,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { faqData } from '../data/products';
import { useSettings } from '../contexts/SettingsContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FAQCategory {
  category: string;
  items: { q: string; a: string }[];
}

interface CategoryMeta {
  label: string;
  icon: React.ElementType;
  slug: string;
}

// ---------------------------------------------------------------------------
// Category metadata — icon + slug mapping
// ---------------------------------------------------------------------------

const CATEGORY_META: Record<string, CategoryMeta> = {
  'Orders & Cart': { label: 'Orders & Cart', icon: ShoppingCart, slug: 'orders-cart' },
  Compatibility: { label: 'Compatibility', icon: Cpu, slug: 'compatibility' },
  'Shipping & Returns': { label: 'Shipping & Returns', icon: Truck, slug: 'shipping-returns' },
  'Warranty & Quality': { label: 'Warranty & Quality', icon: ShieldCheck, slug: 'warranty-quality' },
  'Setup & Troubleshooting': { label: 'Setup & Troubleshooting', icon: Wrench, slug: 'setup-troubleshooting' },
  'Contact & Support': { label: 'Contact & Support', icon: Headset, slug: 'contact-support' },
};

// ---------------------------------------------------------------------------
// Reveal on Scroll Hook
// ---------------------------------------------------------------------------

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

// ---------------------------------------------------------------------------
// RevealSection Component
// ---------------------------------------------------------------------------

function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, revealed } = useRevealOnScroll();
  const { settings } = useSettings();
  const reduceMotion = settings.reduceMotion;

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${revealed ? 'revealed' : ''} ${className}`}
      style={
        reduceMotion
          ? { opacity: 1, transform: 'none' }
          : revealed
            ? { transitionDelay: `${delay}ms` }
            : undefined
      }
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Accordion Item Component
// ---------------------------------------------------------------------------

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  itemIndex,
  reduceMotion,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  itemIndex: number;
  reduceMotion: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  return (
    <div
      className="border-b border-graphene-700 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:ring-inset rounded-lg group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${itemIndex}`}
      >
        <span className={`text-base font-medium transition-colors duration-200 ${isOpen ? 'text-alloy-50' : 'text-alloy-200 group-hover:text-alloy-50'}`}>
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-alloy-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-teal-400' : 'group-hover:text-alloy-300'
          }`}
          style={reduceMotion ? { transition: 'none' } : undefined}
        />
      </button>
      <div
        id={`faq-answer-${itemIndex}`}
        role="region"
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={
          reduceMotion
            ? { display: isOpen ? 'block' : 'none' }
            : { maxHeight: isOpen ? contentHeight : 0, opacity: isOpen ? 1 : 0 }
        }
      >
        <div ref={contentRef} className="pb-5 pr-8">
          <p className="text-sm leading-relaxed text-alloy-400">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQ Category Section Component
// ---------------------------------------------------------------------------

function FAQCategorySection({
  categoryData,
  categoryIndex,
  openItems,
  onToggleItem,
  reduceMotion,
}: {
  categoryData: FAQCategory;
  categoryIndex: number;
  openItems: Set<string>;
  onToggleItem: (key: string) => void;
  reduceMotion: boolean;
}) {
  const meta = CATEGORY_META[categoryData.category];
  const Icon = meta?.icon ?? MessageCircle;
  const slug = meta?.slug ?? `category-${categoryIndex}`;

  return (
    <section
      id={`faq-${slug}`}
      className="scroll-mt-24"
    >
      <RevealSection delay={categoryIndex * 100}>
        <div className="rounded-xl border border-graphene-700 bg-graphene-900/80 backdrop-blur-sm overflow-hidden">
          {/* Category heading */}
          <div className="flex items-center gap-3 border-b border-graphene-700 px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10">
              <Icon className="h-5 w-5 text-teal-400" />
            </div>
            <h2 className="text-lg font-bold text-alloy-50">{categoryData.category}</h2>
            <span className="ml-auto rounded-full bg-graphene-800 px-2.5 py-0.5 text-xs font-mono text-alloy-500">
              {categoryData.items.length}
            </span>
          </div>

          {/* Accordion items */}
          <div className="px-6">
            {categoryData.items.map((item, itemIndex) => {
              const key = `${categoryIndex}-${itemIndex}`;
              return (
                <AccordionItem
                  key={key}
                  question={item.q}
                  answer={item.a}
                  isOpen={openItems.has(key)}
                  onToggle={() => onToggleItem(key)}
                  itemIndex={key.charCodeAt(0) * 100 + itemIndex}
                  reduceMotion={reduceMotion}
                />
              );
            })}
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ===========================================================================
// MAIN PAGE COMPONENT
// ===========================================================================

export default function FAQPage() {
  const { settings } = useSettings();
  const reduceMotion = settings.reduceMotion;

  // Track which accordion items are open (key format: "categoryIndex-itemIndex")
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  // Active category for chip navigation
  const [activeCategory, setActiveCategory] = useState<string>(faqData[0]?.category ?? '');
  // Ref for chip scroll container
  const chipsRef = useRef<HTMLDivElement>(null);
  // Refs for each category section
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Toggle accordion item — allow multiple open at a time
  const handleToggleItem = useCallback((key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // Scroll to a category section
  const scrollToCategory = useCallback((category: string) => {
    const meta = CATEGORY_META[category];
    const slug = meta?.slug ?? '';
    const el = document.getElementById(`faq-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }, [reduceMotion]);

  // IntersectionObserver to update active category based on scroll position
  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx !== -1) {
              setActiveCategory(faqData[idx].category);
            }
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Set ref helper
  const setSectionRef = useCallback((index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  }, []);

  // Total FAQ count
  const totalQuestions = faqData.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <main className="min-h-screen bg-graphene-950 text-alloy-50">
      {/* =============================================================
          PAGE HEADER
          ============================================================= */}
      <section className="border-b border-graphene-700 bg-graphene-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-alloy-400">
              <li>
                <Link to="/" className="transition-colors hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li className="font-semibold text-alloy-50">FAQ</li>
            </ol>
          </nav>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-alloy-400">
            Find quick answers to common questions about orders, compatibility, shipping, and more.
          </p>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 rounded-full border border-graphene-700 bg-graphene-800/60 px-4 py-2">
              <MessageCircle className="h-4 w-4 text-teal-400" />
              <span className="text-alloy-200">
                <span className="font-semibold text-alloy-50">{totalQuestions}</span> questions answered
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-graphene-700 bg-graphene-800/60 px-4 py-2">
              <Cpu className="h-4 w-4 text-violet-400" />
              <span className="text-alloy-200">
                <span className="font-semibold text-alloy-50">{faqData.length}</span> categories
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================
          CATEGORY NAVIGATION CHIPS
          ============================================================= */}
      <div className="sticky top-0 z-30 border-b border-graphene-700 bg-graphene-950/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            ref={chipsRef}
            className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {faqData.map((cat) => {
              const meta = CATEGORY_META[cat.category];
              const ChipIcon = meta?.icon ?? MessageCircle;
              const isActive = activeCategory === cat.category;

              return (
                <button
                  key={cat.category}
                  onClick={() => scrollToCategory(cat.category)}
                  className={`group flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 ${
                    isActive
                      ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                      : 'border border-graphene-700 bg-graphene-800/60 text-alloy-300 hover:border-teal-500/40 hover:text-alloy-100'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <ChipIcon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-alloy-500 group-hover:text-teal-400'}`} />
                  <span>{cat.category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =============================================================
          FAQ ACCORDION SECTIONS
          ============================================================= */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {faqData.map((cat, index) => (
            <div
              key={cat.category}
              ref={setSectionRef(index)}
            >
              <FAQCategorySection
                categoryData={cat}
                categoryIndex={index}
                openItems={openItems}
                onToggleItem={handleToggleItem}
                reduceMotion={reduceMotion}
              />
            </div>
          ))}
        </div>
      </div>

      {/* =============================================================
          CONTACT CTA
          ============================================================= */}
      <RevealSection className="border-t border-graphene-700">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-graphene-700 bg-graphene-900/80 backdrop-blur-sm">
            {/* Decorative circuit grid */}
            <div className="absolute inset-0 circuit-grid-dark opacity-40" />

            {/* Decorative gradient blobs */}
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-teal-500/5 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl" />

            <div className="relative flex flex-col items-center px-6 py-12 text-center sm:px-12 sm:py-16 lg:flex-row lg:text-left lg:py-12 lg:px-16">
              <div className="flex-1">
                <div className="mb-4 flex items-center justify-center gap-2 lg:justify-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10">
                    <Headset className="h-5 w-5 text-teal-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Still have{' '}
                  <span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
                    questions?
                  </span>
                </h2>
                <p className="mt-3 max-w-lg text-alloy-400">
                  Our support team is ready to help with compatibility guidance, order inquiries, product setup, or anything else. Reach out and we will get back to you within 24 hours.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 lg:ml-12 lg:mt-0 lg:items-start">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-coral-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 focus:ring-offset-graphene-950"
                >
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-xs text-alloy-500">
                  Mon-Fri, 9 AM - 6 PM EST &middot; Response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* =============================================================
          BOTTOM LINKS
          ============================================================= */}
      <RevealSection className="border-t border-graphene-700" delay={100}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-alloy-400 transition-colors hover:text-teal-400"
            >
              Browse Products
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-alloy-400 transition-colors hover:text-teal-400"
            >
              About Us
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-alloy-400 transition-colors hover:text-teal-400"
            >
              Back to Home
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
