import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  ShoppingCart,
  HelpCircle,
  Package,
  RefreshCw,
  Settings,
  Shield,
  Boxes,
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useSettings } from '../contexts/SettingsContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiry: string;
  isOrderInquiry: boolean;
  cartSummary: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface SupportTopic {
  title: string;
  description: string;
  icon: React.ElementType;
  inquiryValue: string;
}

interface ContactCartInquiryItem {
  id: string;
  name: string;
  slug: string;
  quantity: number;
  price: number;
  image: string;
  productUrl: string;
}

interface ContactCartInquiry {
  items: ContactCartInquiryItem[];
  message: string;
  cartSummary: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const INQUIRY_OPTIONS = [
  'Compatibility help',
  'Bulk order',
  'Support',
  'Other',
] as const;

const SUPPORT_TOPICS: SupportTopic[] = [
  {
    title: 'Compatibility Help',
    description: 'Not sure if a product works with your setup? We can help you find the right match.',
    icon: HelpCircle,
    inquiryValue: 'Compatibility help',
  },
  {
    title: 'Order Status',
    description: 'Check on your current order, shipping updates, or delivery estimates.',
    icon: Package,
    inquiryValue: 'Support',
  },
  {
    title: 'Returns & Exchanges',
    description: 'Start a return or exchange. We make the process straightforward.',
    icon: RefreshCw,
    inquiryValue: 'Support',
  },
  {
    title: 'Product Setup',
    description: 'Get guidance on setting up and configuring your new accessories.',
    icon: Settings,
    inquiryValue: 'Support',
  },
  {
    title: 'Warranty Questions',
    description: 'Learn about warranty coverage and how to file a claim.',
    icon: Shield,
    inquiryValue: 'Support',
  },
  {
    title: 'Bulk Orders',
    description: 'Need large quantities for your team or organization? Let us work out a deal.',
    icon: Boxes,
    inquiryValue: 'Bulk order',
  },
];

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  inquiry: '',
  isOrderInquiry: false,
  cartSummary: '',
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
// Checkmark Animation Component
// ---------------------------------------------------------------------------

function AnimatedCheckmark() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="relative flex h-20 w-20 items-center justify-center">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-teal-500"
          style={{
            animation: 'scaleIn 0.4s ease-out forwards',
          }}
        />
        {/* Inner fill */}
        <div
          className="absolute inset-2 rounded-full bg-teal-500/20"
          style={{
            animation: 'scaleIn 0.4s ease-out 0.15s both',
          }}
        />
        {/* Checkmark */}
        <CheckCircle
          className="relative h-10 w-10 text-teal-400"
          style={{
            animation: 'checkPop 0.5s ease-out 0.3s both',
          }}
        />
      </div>
      <p className="text-xl font-bold text-alloy-50">Message sent!</p>
      <p className="text-sm text-alloy-400">
        We'll get back to you as soon as possible.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Business Info Card
// ---------------------------------------------------------------------------

function BusinessInfoCard() {
  const contactLines = [
    {
      icon: User,
      label: 'Full Name',
      value: 'SHORALLE LENISSE FRANKLIN',
      href: undefined,
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'soodtwyla676@gmail.com',
      href: 'mailto:soodtwyla676@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Blount Street 500 Longview Texas 75602 United States of America State',
      href: undefined,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 7187158758',
      href: 'tel:+12133610175',
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border border-graphene-700 bg-graphene-900/80 p-6 backdrop-blur-sm">
      {/* Decorative circuit trace */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-teal-500/40 via-teal-500/10 to-transparent" />

      <h2 className="mb-6 text-lg font-bold text-alloy-50">Contact Information</h2>

      <div className="flex flex-col gap-5 pl-4">
        {contactLines.map((line, i) => {
          const Icon = line.icon;
          const content = (
            <>
              <p className="text-xs font-mono tracking-wider text-alloy-600">
                {line.label.toUpperCase()}
              </p>
              <p
                className={
                  line.href
                    ? 'text-teal-400 transition-colors hover:text-teal-300'
                    : 'text-alloy-100'
                }
              >
                {line.value}
              </p>
            </>
          );

          return (
            <div key={line.label}>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10">
                  <Icon className="h-5 w-5 text-teal-400" />
                </div>
                <div className="min-w-0">{line.href ? <a href={line.href}>{content}</a> : content}</div>
              </div>
              {/* Signal line connecting entries */}
              {i < contactLines.length - 1 && (
                <div className="ml-5 mt-3 h-4 w-px bg-teal-500/30" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Embedded Map Placeholder
// ---------------------------------------------------------------------------

function EmbeddedMap() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-graphene-700 bg-graphene-900/80 backdrop-blur-sm">
      {/* Map-like visual */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden sm:h-72">
        {/* Grid pattern simulating map tiles */}
        <div className="absolute inset-0 circuit-grid-dark opacity-60" />

        {/* Simulated map roads/paths */}
        <svg
          className="absolute inset-0 h-full w-full opacity-20"
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
        >
          {/* Horizontal roads */}
          <line x1="0" y1="40" x2="400" y2="40" stroke="#8b5cf6" strokeWidth="1.5" />
          <line x1="0" y1="90" x2="400" y2="90" stroke="#0bb8f0" strokeWidth="2" />
          <line x1="0" y1="140" x2="400" y2="140" stroke="#8b5cf6" strokeWidth="1" />
          <line x1="0" y1="170" x2="400" y2="170" stroke="#59647f" strokeWidth="0.8" />
          {/* Vertical roads */}
          <line x1="80" y1="0" x2="80" y2="200" stroke="#59647f" strokeWidth="0.8" />
          <line x1="180" y1="0" x2="180" y2="200" stroke="#0bb8f0" strokeWidth="1.5" />
          <line x1="280" y1="0" x2="280" y2="200" stroke="#8b5cf6" strokeWidth="1" />
          <line x1="340" y1="0" x2="340" y2="200" stroke="#59647f" strokeWidth="0.8" />
          {/* Diagonal road */}
          <line x1="0" y1="0" x2="180" y2="90" stroke="#59647f" strokeWidth="0.8" />
          {/* Pin location marker */}
          <circle cx="200" cy="100" r="6" fill="#ff5a4c" opacity="0.8" />
          <circle cx="200" cy="100" r="12" fill="none" stroke="#ff5a4c" strokeWidth="1.5" opacity="0.4">
            <animate attributeName="r" from="12" to="24" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Center overlay with address */}
        <div className="relative z-10 flex flex-col items-center gap-3 rounded-xl bg-graphene-900/90 px-6 py-4 text-center backdrop-blur-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-coral-500/30 bg-coral-500/10">
            <MapPin className="h-6 w-6 text-coral-400" />
          </div>
          <p className="text-sm font-medium text-alloy-100">
            Blount Street 500 Longview
          </p>
          <p className="text-xs text-alloy-400">
            Texas 75602, United States of America
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Support Topic Card
// ---------------------------------------------------------------------------

function SupportTopicCard({
  topic,
  onSelect,
}: {
  topic: SupportTopic;
  onSelect: (inquiryValue: string) => void;
}) {
  const Icon = topic.icon;

  return (
    <button
      onClick={() => onSelect(topic.inquiryValue)}
      className="group flex flex-col items-center rounded-xl border border-graphene-700 bg-graphene-900/80 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-teal-500/40 hover:bg-graphene-800/80"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/5 transition-colors duration-300 group-hover:border-teal-500/40 group-hover:bg-teal-500/10">
        <Icon className="h-6 w-6 text-teal-400" />
      </div>
      <h3 className="text-sm font-bold text-alloy-50">{topic.title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-alloy-400">{topic.description}</p>
    </button>
  );
}

// ===========================================================================
// MAIN PAGE COMPONENT
// ===========================================================================

export default function ContactPage() {
  // Ref for the form section so topic cards can scroll to it
  const formRef = useRef<HTMLDivElement>(null);

  // Pass formRef scroll behavior down to topic cards
  const handleTopicSelect = useCallback((inquiryValue: string) => {
    // First set the inquiry in the form -- we do this by scrolling to form
    // The ContactForm component handles its own state via the inquiry dropdown
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // We use a custom event to pass the selected inquiry to the form
    window.dispatchEvent(
      new CustomEvent('contact:select-inquiry', { detail: inquiryValue }),
    );
  }, []);

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
              <li className="font-semibold text-alloy-50">Contact</li>
            </ol>
          </nav>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Get in{' '}
            <span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-alloy-400">
            Have a question or need help? Reach out and we'll get back to you promptly.
          </p>
        </div>
      </section>

      {/* =============================================================
          MAIN CONTENT
          ============================================================= */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Business Info + Form */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column: Business Info + Map */}
          <div className="space-y-8 lg:col-span-1">
            {/* Business Info Card */}
            <RevealSection>
              <BusinessInfoCard />
            </RevealSection>

            {/* Embedded Map */}
            <RevealSection delay={150}>
              <EmbeddedMap />
            </RevealSection>
          </div>

          {/* Right column: Form */}
          <div className="lg:col-span-2" ref={formRef}>
            <RevealSection delay={100}>
              <div className="rounded-xl border border-graphene-700 bg-graphene-900/80 p-6 backdrop-blur-sm sm:p-8">
                <h2 className="mb-6 text-lg font-bold text-alloy-50">Send a Message</h2>
                <ContactFormWithTopicListener />
              </div>
            </RevealSection>
          </div>
        </div>

        {/* =============================================================
            SUPPORT TOPICS QUICK LINKS
            ============================================================= */}
        <RevealSection className="mt-16" delay={200}>
          <section>
            <h2 className="mb-8 text-2xl font-bold text-alloy-50">
              Quick Help{' '}
              <span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
                Topics
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SUPPORT_TOPICS.map((topic) => (
                <SupportTopicCard
                  key={topic.title}
                  topic={topic}
                  onSelect={handleTopicSelect}
                />
              ))}
            </div>
          </section>
        </RevealSection>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// ContactForm with topic listener -- bridges custom events to form state
// ---------------------------------------------------------------------------

function ContactFormWithTopicListener() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [contactCartItems, setContactCartItems] = useState<ContactCartInquiryItem[]>([]);
  const { items, subtotal } = useCart();
  const subjectRef = useRef<HTMLInputElement>(null);

  // Listen for custom events from support topic cards
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      setForm((prev) => ({ ...prev, inquiry: detail }));
    };
    window.addEventListener('contact:select-inquiry', handler);
    return () => window.removeEventListener('contact:select-inquiry', handler);
  }, []);

  // Update cart summary when items change
  useEffect(() => {
    if (items.length > 0 && form.isOrderInquiry) {
      const summary = items
        .map((item) => `${item.product.name} x${item.quantity}`)
        .join(', ');
      setForm((prev) => ({ ...prev, cartSummary: summary }));
    }
  }, [items, form.isOrderInquiry]);

  useEffect(() => {
    const savedInquiry = sessionStorage.getItem('contactCartInquiry');
    if (!savedInquiry) return;

    try {
      const data = JSON.parse(savedInquiry) as ContactCartInquiry;

      setContactCartItems(data.items ?? []);

      setForm((prev) => ({
        ...prev,
        subject: prev.subject || 'Product inquiry from cart',
        inquiry: prev.inquiry || 'Bulk order',
        isOrderInquiry: true,
        cartSummary: data.cartSummary || prev.cartSummary,
        message: data.message || prev.message,
      }));

      sessionStorage.removeItem('contactCartInquiry');
    } catch (error) {
      console.error('Failed to load cart inquiry:', error);
    }
  }, []);

  const validate = useCallback((): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) {
      errs.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    return errs;
  }, [form]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setSubmitted(true);
    },
    [validate],
  );

  if (submitted) {
    return (
      <div>
        <AnimatedCheckmark />
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              setForm(INITIAL_FORM);
              setSubmitted(false);
              setErrors({});
            }}
            className="text-sm font-medium text-teal-400 transition-colors hover:text-teal-300"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name & Email - 2 columns on desktop */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-alloy-200">
            Name <span className="text-coral-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={`w-full rounded-lg border bg-graphene-800 px-4 py-2.5 text-sm text-alloy-100 placeholder-alloy-500 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${
              errors.name ? 'border-coral-500' : 'border-graphene-700'
            }`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-coral-400">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-alloy-200">
            Email <span className="text-coral-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full rounded-lg border bg-graphene-800 px-4 py-2.5 text-sm text-alloy-100 placeholder-alloy-500 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${
              errors.email ? 'border-coral-500' : 'border-graphene-700'
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-coral-400">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-alloy-200">
          Subject <span className="text-coral-500">*</span>
        </label>
        <input
          ref={subjectRef}
          id="contact-subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          className={`w-full rounded-lg border bg-graphene-800 px-4 py-2.5 text-sm text-alloy-100 placeholder-alloy-500 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${
            errors.subject ? 'border-coral-500' : 'border-graphene-700'
          }`}
          placeholder="What's this about?"
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-coral-400">{errors.subject}</p>
        )}
      </div>

      {/* Inquiry Type */}
      <div>
        <label htmlFor="contact-inquiry" className="mb-1.5 block text-sm font-medium text-alloy-200">
          Inquiry Type
        </label>
        <select
          id="contact-inquiry"
          name="inquiry"
          value={form.inquiry}
          onChange={handleChange}
          className="w-full rounded-lg border border-graphene-700 bg-graphene-800 px-4 py-2.5 text-sm text-alloy-100 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="">Select an inquiry type</option>
          {INQUIRY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Order Inquiry Checkbox + Cart Summary */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="isOrderInquiry"
            checked={form.isOrderInquiry}
            onChange={handleChange}
            className="h-4 w-4 rounded border-graphene-600 bg-graphene-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
          />
          <span className="flex items-center gap-2 text-sm font-medium text-alloy-200">
            <ShoppingCart className="h-4 w-4 text-alloy-400" />
            This is an order inquiry
          </span>
        </label>

        {form.isOrderInquiry && (
          <div className="mt-3 rounded-lg border border-graphene-700 bg-graphene-800 p-4">
            <p className="mb-2 text-xs font-mono tracking-wider text-alloy-600">
              CART SUMMARY
            </p>
            {items.length > 0 ? (
              <div className="space-y-1.5">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-graphene-700 bg-graphene-900">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-contain p-1.5"
                        />
                      </div>

                      <span className="min-w-0 text-alloy-200">
                        <span className="line-clamp-1">{item.product.name}</span>
                        <span className="text-alloy-500">x{item.quantity}</span>
                      </span>
                    </div>

                    <span className="flex-shrink-0 text-alloy-400">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="mt-2 border-t border-graphene-700 pt-2">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-alloy-100">Subtotal</span>
                    <span className="text-teal-400">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-alloy-500">Your cart is empty.</p>
            )}
            <input
              name="cartSummary"
              type="text"
              value={form.cartSummary}
              onChange={handleChange}
              className="mt-3 w-full rounded-lg border border-graphene-700 bg-graphene-900 px-4 py-2 text-sm text-alloy-100 placeholder-alloy-500 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              placeholder="Add any order details or notes"
            />
          </div>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-alloy-200">
          Message <span className="text-coral-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={`w-full resize-y rounded-lg border bg-graphene-800 px-4 py-2.5 text-sm text-alloy-100 placeholder-alloy-500 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${
            errors.message ? 'border-coral-500' : 'border-graphene-700'
          }`}
          placeholder="Tell us how we can help (min 10 characters)"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-coral-400">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-coral-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 focus:ring-offset-graphene-950"
      >
        <Send className="h-4 w-4" />
        Send Message
      </button>
    </form>
  );
}
