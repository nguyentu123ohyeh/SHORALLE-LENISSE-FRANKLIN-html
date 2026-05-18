import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

// --- Types ---

export type Language = 'en' | 'es';

type TranslationKey = keyof typeof translations;

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

// --- Translations ---

const translations = {
  // Nav items
  'nav.home': { en: 'Home', es: 'Inicio' },
  'nav.products': { en: 'Products', es: 'Productos' },
  'nav.bundles': { en: 'Bundles', es: 'Paquetes' },
  'nav.setupGuides': { en: 'Setup Guides', es: 'Guias de Configuracion' },
  'nav.reviews': { en: 'Reviews', es: 'Resenas' },
  'nav.faq': { en: 'FAQ', es: 'Preguntas Frecuentes' },
  'nav.contact': { en: 'Contact', es: 'Contacto' },
  'nav.cart': { en: 'Cart', es: 'Carrito' },

  // Setup modes
  'setup.desk': { en: 'Desk', es: 'Escritorio' },
  'setup.travel': { en: 'Travel', es: 'Viaje' },
  'setup.gaming': { en: 'Gaming', es: 'Juego' },

  // CTA text
  'cta.addToCart': { en: 'Add to Cart', es: 'Agregar al Carrito' },
  'cta.viewDetails': { en: 'View Details', es: 'Ver Detalles' },
  'cta.checkout': { en: 'Checkout', es: 'Pagar' },
  'cta.continueShopping': { en: 'Continue Shopping', es: 'Seguir Comprando' },
  'cta.contactSupport': { en: 'Contact Support', es: 'Contactar Soporte' },
  'cta.shopNow': { en: 'Shop Now', es: 'Comprar Ahora' },
  'cta.learnMore': { en: 'Learn More', es: 'Mas Informacion' },

  // Cookie consent
  'cookie.title': { en: 'Cookie Preferences', es: 'Preferencias de Cookies' },
  'cookie.description': {
    en: 'We use cookies to improve your experience, analyze site traffic, and serve personalized content. You can manage your preferences below.',
    es: 'Usamos cookies para mejorar su experiencia, analizar el trafico del sitio y ofrecer contenido personalizado. Puede gestionar sus preferencias a continuacion.',
  },
  'cookie.accept': { en: 'Accept All', es: 'Aceptar Todo' },
  'cookie.reject': { en: 'Reject All', es: 'Rechazar Todo' },
  'cookie.manage': { en: 'Manage Preferences', es: 'Gestionar Preferencias' },
  'cookie.essential': { en: 'Essential', es: 'Esenciales' },
  'cookie.analytics': { en: 'Analytics', es: 'Analitica' },
  'cookie.marketing': { en: 'Marketing', es: 'Marketing' },
  'cookie.save': { en: 'Save Preferences', es: 'Guardar Preferencias' },

  // General
  'general.subtotal': { en: 'Subtotal', es: 'Subtotal' },
  'general.quantity': { en: 'Quantity', es: 'Cantidad' },
  'general.remove': { en: 'Remove', es: 'Eliminar' },
  'general.emptyCart': { en: 'Your cart is empty', es: 'Su carrito esta vacio' },
  'general.search': { en: 'Search products...', es: 'Buscar productos...' },
  'general.darkMode': { en: 'Dark Mode', es: 'Modo Oscuro' },
  'general.lightMode': { en: 'Light Mode', es: 'Modo Claro' },
  'general.language': { en: 'Language', es: 'Idioma' },
} as const;

// --- Context ---

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function useLanguageContext(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { useLanguageContext as useLanguage };

// --- Helpers ---

const STORAGE_KEY = 'language';
const VALID_LANGUAGES: Language[] = ['en', 'es'];

function loadLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_LANGUAGES.includes(stored as Language)) {
      return stored as Language;
    }
  } catch {
    // ignore
  }
  return 'en';
}

// --- Provider ---

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(loadLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[language] ?? entry.en ?? key;
    },
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
