import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Monitor,
  Plane,
  Gamepad2,
  Sun,
  Moon,
  Settings,
  ShoppingCart,
  Menu,
  X,
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useSetupMode } from '../../contexts/SetupModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSettings } from '../../contexts/SettingsContext';
import type { SetupMode } from '../../contexts/SetupModeContext';

const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home' as const },
  { to: '/products', labelKey: 'nav.products' as const },
  { to: '/about', label: 'About' },
  { to: '/contact', labelKey: 'nav.contact' as const },
  { to: '/faq', labelKey: 'nav.faq' as const },
] as const;

const SETUP_MODE_CONFIG: { mode: SetupMode; icon: React.ElementType; labelKey: 'setup.desk' | 'setup.travel' | 'setup.gaming' }[] = [
  { mode: 'Desk', icon: Monitor, labelKey: 'setup.desk' },
  { mode: 'Travel', icon: Plane, labelKey: 'setup.travel' },
  { mode: 'Gaming', icon: Gamepad2, labelKey: 'setup.gaming' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { openCart, items } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { setupMode, setSetupMode } = useSetupMode();
  const { language, setLanguage, t } = useLanguage();
  const { updateSettings } = useSettings();

  const location = useLocation();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSetupModeChange = (mode: SetupMode) => {
    setSetupMode(mode);
    updateSettings({ defaultSetupMode: mode });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-graphene-900/80 backdrop-blur-lg border-b border-alloy-200 dark:border-graphene-700">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <NavLink to="/" className="flex-shrink-0 text-xl font-extrabold tracking-tight">
            <span className="text-graphene-900 dark:text-white">SHORALLE </span>
            <span className="oil-spectrum-text">LENISSE FRANKLIN</span>
          </NavLink>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md transition-colors relative ${
                    isActive
                      ? 'text-teal-500 dark:text-teal-400'
                      : 'text-graphene-700 dark:text-alloy-300 hover:text-teal-500 dark:hover:text-teal-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {'labelKey' in link ? t(link.labelKey) : link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-500 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Setup Mode Toggle */}
            <div className="hidden md:flex items-center bg-alloy-100 dark:bg-graphene-800 rounded-lg p-0.5">
              {SETUP_MODE_CONFIG.map(({ mode, icon: Icon, labelKey }) => (
                <button
                  key={mode}
                  onClick={() => handleSetupModeChange(mode)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    setupMode === mode
                      ? 'bg-teal-500 text-white shadow-sm'
                      : 'text-graphene-600 dark:text-alloy-400 hover:text-graphene-900 dark:hover:text-white'
                  }`}
                  title={t(labelKey)}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">{t(labelKey)}</span>
                </button>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="hidden sm:flex items-center bg-alloy-100 dark:bg-graphene-800 rounded-lg p-0.5">
              {(['en', 'es'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1.5 rounded-md text-xs font-semibold uppercase transition-all ${
                    language === lang
                      ? 'bg-coral-500 text-white shadow-sm'
                      : 'text-graphene-600 dark:text-alloy-400 hover:text-graphene-900 dark:hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-graphene-600 dark:text-alloy-400 hover:bg-alloy-100 dark:hover:bg-graphene-800 transition-colors"
              aria-label={isDark ? t('general.lightMode') : t('general.darkMode')}
              title={isDark ? t('general.lightMode') : t('general.darkMode')}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Settings */}
            <button
              onClick={() =>
                dispatchEvent(new CustomEvent('open-settings-panel'))
              }
              className="p-2 rounded-lg text-graphene-600 dark:text-alloy-400 hover:bg-alloy-100 dark:hover:bg-graphene-800 transition-colors"
              aria-label="Settings"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-lg text-graphene-600 dark:text-alloy-400 hover:bg-alloy-100 dark:hover:bg-graphene-800 transition-colors"
              aria-label={t('nav.cart')}
              title={t('nav.cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-coral-500 text-white text-[10px] font-bold leading-none rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-graphene-600 dark:text-alloy-400 hover:bg-alloy-100 dark:hover:bg-graphene-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-graphene-900 shadow-2xl animate-slide-right flex flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-alloy-200 dark:border-graphene-700">
              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-graphene-900 dark:text-white">SHORALLE </span>
                <span className="oil-spectrum-text">LENISSE FRANKLIN</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-graphene-600 dark:text-alloy-400 hover:bg-alloy-100 dark:hover:bg-graphene-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <div className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-teal-500/10 text-teal-500 dark:text-teal-400'
                          : 'text-graphene-700 dark:text-alloy-300 hover:bg-alloy-100 dark:hover:bg-graphene-800'
                      }`}
                    >
                      {'labelKey' in link ? t(link.labelKey) : link.label}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />
                      )}
                    </NavLink>
                  );
                })}
              </div>

              {/* Setup Mode in Drawer */}
              <div className="mt-6 pt-6 border-t border-alloy-200 dark:border-graphene-700">
                <p className="text-xs font-semibold text-graphene-500 dark:text-alloy-500 uppercase tracking-wider mb-3">
                  Setup Mode
                </p>
                <div className="space-y-1">
                  {SETUP_MODE_CONFIG.map(({ mode, icon: Icon, labelKey }) => (
                    <button
                      key={mode}
                      onClick={() => {
                        handleSetupModeChange(mode);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        setupMode === mode
                          ? 'bg-teal-500/10 text-teal-500 dark:text-teal-400'
                          : 'text-graphene-700 dark:text-alloy-300 hover:bg-alloy-100 dark:hover:bg-graphene-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {t(labelKey)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language in Drawer */}
              <div className="mt-6 pt-6 border-t border-alloy-200 dark:border-graphene-700">
                <p className="text-xs font-semibold text-graphene-500 dark:text-alloy-500 uppercase tracking-wider mb-3">
                  {t('general.language')}
                </p>
                <div className="flex gap-2">
                  {(['en', 'es'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold uppercase transition-all ${
                        language === lang
                          ? 'bg-coral-500 text-white'
                          : 'bg-alloy-100 dark:bg-graphene-800 text-graphene-600 dark:text-alloy-400'
                      }`}
                    >
                      {lang === 'en' ? 'English' : 'Espanol'}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
