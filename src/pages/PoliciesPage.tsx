import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  FileText,
  AlertTriangle,
  Printer,
  ArrowRight,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { policies } from '../data/products';
import { useSettings } from '../contexts/SettingsContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PolicySection {
  id: string;
  label: string;
  icon: React.ElementType;
  content: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'privacy-policy',
    label: 'Privacy Policy',
    icon: Shield,
    content: policies.privacy,
  },
  {
    id: 'terms-of-service',
    label: 'Terms of Service',
    icon: FileText,
    content: policies.terms,
  },
  {
    id: 'disclaimer',
    label: 'Disclaimer',
    icon: AlertTriangle,
    content: policies.disclaimer,
  },
];

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
// Policy Content Renderer
// ---------------------------------------------------------------------------

function PolicyContent({ content }: { content: string }) {
  const lines = content.split('\n');

  return (
    <div className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-alloy-300">
      {lines.map((line, index) => {
        // Detect section headers (ALL CAPS lines or numbered headings)
        const isHeader = /^[A-Z][A-Z\s]+$/.test(line.trim()) || /^\d+\.\s+[A-Z]/.test(line.trim());
        const isEmpty = line.trim() === '';

        if (isEmpty) {
          return <div key={index} className="h-3" />;
        }

        if (isHeader) {
          return (
            <h3 key={index} className="mt-6 mb-2 text-base font-bold text-alloy-50 first:mt-0">
              {line}
            </h3>
          );
        }

        return (
          <p key={index} className="mb-2">
            {line}
          </p>
        );
      })}
    </div>
  );
}

// ===========================================================================
// MAIN PAGE COMPONENT
// ===========================================================================

export default function PoliciesPage() {
  const { settings } = useSettings();
  const reduceMotion = settings.reduceMotion;

  const [activeSection, setActiveSection] = useState<string>('privacy-policy');
  const [printMode, setPrintMode] = useState(false);

  // Refs for each policy section
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll progress for the main document
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(scrollTop / docHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to highlight active section in nav
  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Scroll to a section
  const scrollToSection = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    },
    [reduceMotion],
  );

  // Set ref helper
  const setSectionRef = useCallback((index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  }, []);

  // Toggle print mode
  const togglePrintMode = useCallback(() => {
    setPrintMode((prev) => !prev);
  }, []);

  return (
    <main
      className={`min-h-screen bg-graphene-950 text-alloy-50 ${printMode ? 'print-mode' : ''}`}
    >
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
              <li className="font-semibold text-alloy-50">Policies & Legal</li>
            </ol>
          </nav>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Policies &{' '}
            <span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
              Legal
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-alloy-400">
            Review our privacy practices, terms of service, and disclaimers. We believe in full transparency.
          </p>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 rounded-full border border-graphene-700 bg-graphene-800/60 px-4 py-2">
              <Shield className="h-4 w-4 text-teal-400" />
              <span className="text-alloy-200">
                <span className="font-semibold text-alloy-50">3</span> policy documents
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-graphene-700 bg-graphene-800/60 px-4 py-2">
              <FileText className="h-4 w-4 text-violet-400" />
              <span className="text-alloy-200">
                Last updated <span className="font-semibold text-alloy-50">January 2025</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================
          MOBILE TAB NAVIGATION (hidden on desktop)
          ============================================================= */}
      <div className="sticky top-0 z-30 border-b border-graphene-700 bg-graphene-950/95 backdrop-blur-md lg:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div
            className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {POLICY_SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 ${
                    isActive
                      ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                      : 'border border-graphene-700 bg-graphene-800/60 text-alloy-300 hover:border-teal-500/40 hover:text-alloy-100'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-alloy-500 group-hover:text-teal-400'}`} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =============================================================
          SCROLL PROGRESS INDICATOR
          ============================================================= */}
      <div className="sticky top-0 z-20 h-0.5 bg-graphene-800 lg:top-0">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-violet-500 transition-all duration-150 ease-out"
          style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        />
      </div>

      {/* =============================================================
          MAIN CONTENT: SIDEBAR + POLICY SECTIONS
          ============================================================= */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex gap-8 lg:gap-12">
          {/* -----------------------------------------------------------
              STICKY LEFT NAVIGATION (desktop only)
              ----------------------------------------------------------- */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <nav
              className="sticky top-12 space-y-1"
              aria-label="Policy sections"
            >
              {/* Section links */}
              {POLICY_SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 ${
                      isActive
                        ? 'bg-teal-500/10 text-teal-400'
                        : 'text-alloy-400 hover:bg-graphene-800 hover:text-alloy-200'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {/* Active indicator bar */}
                    <span
                      className={`h-5 w-0.5 rounded-full transition-colors duration-200 ${
                        isActive ? 'bg-teal-500' : 'bg-transparent group-hover:bg-graphene-600'
                      }`}
                    />
                    <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-teal-400' : 'text-alloy-500 group-hover:text-alloy-300'}`} />
                    <span>{section.label}</span>
                  </button>
                );
              })}

              {/* Print-friendly toggle */}
              <div className="mt-6 border-t border-graphene-700 pt-4">
                <button
                  onClick={togglePrintMode}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 ${
                    printMode
                      ? 'bg-violet-500/10 text-violet-400'
                      : 'text-alloy-400 hover:bg-graphene-800 hover:text-alloy-200'
                  }`}
                  aria-pressed={printMode}
                  aria-label="Toggle print-friendly mode"
                >
                  <Printer className={`h-4 w-4 flex-shrink-0 ${printMode ? 'text-violet-400' : 'text-alloy-500 group-hover:text-alloy-300'}`} />
                  <span>Print Mode</span>
                  {printMode && (
                    <span className="ml-auto rounded-full bg-violet-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-400">
                      On
                    </span>
                  )}
                </button>
              </div>
            </nav>
          </aside>

          {/* -----------------------------------------------------------
              POLICY CONTENT SECTIONS
              ----------------------------------------------------------- */}
          <div className="min-w-0 flex-1">
            {/* Print mode toggle (mobile - shown in content area) */}
            <div className="mb-6 lg:hidden">
              <button
                onClick={togglePrintMode}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 ${
                  printMode
                    ? 'border-violet-500/40 bg-violet-500/10 text-violet-400'
                    : 'border-graphene-700 bg-graphene-800/60 text-alloy-400 hover:border-violet-500/40 hover:text-alloy-200'
                }`}
                aria-pressed={printMode}
                aria-label="Toggle print-friendly mode"
              >
                <Printer className="h-4 w-4" />
                <span>Print Mode</span>
                {printMode && (
                  <span className="rounded-full bg-violet-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-400">
                    On
                  </span>
                )}
              </button>
            </div>

            {/* Policy sections */}
            <div className="space-y-12">
              {POLICY_SECTIONS.map((section, index) => {
                const Icon = section.icon;

                return (
                  <RevealSection key={section.id} delay={index * 100}>
                    <section
                      id={section.id}
                      ref={setSectionRef(index)}
                      className={`scroll-mt-24 rounded-xl border backdrop-blur-sm ${
                        printMode
                          ? 'border-graphene-600 bg-transparent'
                          : 'border-graphene-700 bg-graphene-900/80'
                      } overflow-hidden`}
                    >
                      {/* Section header */}
                      <div className={`flex items-center gap-3 border-b px-6 py-4 ${
                        printMode ? 'border-graphene-600' : 'border-graphene-700'
                      }`}>
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                          printMode
                            ? 'border-graphene-600 bg-graphene-800/40'
                            : 'border-teal-500/20 bg-teal-500/10'
                        }`}>
                          <Icon className={`h-5 w-5 ${printMode ? 'text-alloy-400' : 'text-teal-400'}`} />
                        </div>
                        <h2 className={`text-lg font-bold ${printMode ? 'text-alloy-100' : 'text-alloy-50'}`}>
                          {section.label}
                        </h2>
                      </div>

                      {/* Section content */}
                      <div className={`px-6 py-6 sm:px-8 sm:py-8 ${
                        printMode ? '' : ''
                      }`}>
                        <div className="mx-auto max-w-3xl">
                          <PolicyContent content={section.content} />
                        </div>
                      </div>
                    </section>
                  </RevealSection>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =============================================================
          CONTACT CTA
          ============================================================= */}
      <RevealSection className="border-t border-graphene-700">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm ${
            printMode
              ? 'border-graphene-600 bg-transparent'
              : 'border-graphene-700 bg-graphene-900/80'
          }`}>
            {/* Decorative circuit grid */}
            {!printMode && <div className="absolute inset-0 circuit-grid-dark opacity-40" />}

            {/* Decorative gradient blobs */}
            {!printMode && (
              <>
                <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-teal-500/5 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl" />
              </>
            )}

            <div className="relative flex flex-col items-center px-6 py-12 text-center sm:px-12 sm:py-16 lg:flex-row lg:text-left lg:py-12 lg:px-16">
              <div className="flex-1">
                <div className="mb-4 flex items-center justify-center gap-2 lg:justify-start">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    printMode
                      ? 'border-graphene-600 bg-graphene-800/40'
                      : 'border-teal-500/20 bg-teal-500/10'
                  }`}>
                    <MessageCircle className={`h-5 w-5 ${printMode ? 'text-alloy-400' : 'text-teal-400'}`} />
                  </div>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Questions about our{' '}
                  <span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
                    policies?
                  </span>
                </h2>
                <p className="mt-3 max-w-lg text-alloy-400">
                  If you have questions about any of our policies or need clarification on how we handle your information, our support team is here to help.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 lg:ml-12 lg:mt-0 lg:items-start">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-coral-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 focus:ring-offset-graphene-950"
                >
                  Contact Us
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

      {/* =============================================================
          PRINT MODE STYLES
          ============================================================= */}
      <style>{`
        .print-mode {
          --tw-bg-opacity: 1;
        }
        .print-mode .circuit-grid-dark {
          display: none !important;
        }
        .print-mode section,
        .print-mode div {
          background: transparent !important;
          backdrop-filter: none !important;
        }
        .print-mode .rounded-xl,
        .print-mode .rounded-2xl {
          border-color: #2d3348 !important;
        }
        .print-mode .bg-graphene-900\\/80,
        .print-mode .bg-graphene-800\\/60 {
          background: transparent !important;
        }
        @media print {
          .print-mode nav,
          .print-mode button,
          .print-mode a[href] {
            display: none !important;
          }
          .print-mode {
            color: #000 !important;
            background: #fff !important;
          }
        }
      `}</style>
    </main>
  );
}
