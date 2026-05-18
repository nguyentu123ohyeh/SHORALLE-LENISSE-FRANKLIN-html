import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import PromoBar from './PromoBar';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from '../ui/CookieConsent';
import CartDrawer from '../cart/CartDrawer';
import SettingsPanel from '../ui/SettingsPanel';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-teal-500 text-white shadow-lg hover:bg-teal-600 transition-all hover:scale-110"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-alloy-50 dark:bg-graphene-900 transition-colors">
      <PromoBar />
      <Header />
      <main className="flex-1 pt-0">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
      <CookieConsent />
      <CartDrawer />
      <SettingsPanel />
    </div>
  );
}
