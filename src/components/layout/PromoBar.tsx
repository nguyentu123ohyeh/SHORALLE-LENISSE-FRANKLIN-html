import { useState } from 'react';
import { X } from 'lucide-react';

export default function PromoBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-graphene-950 text-teal-500 text-xs sm:text-sm font-medium animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center">
        <p className="text-center tracking-wide">
          Free shipping on orders over $50{' '}
          <span className="mx-2 text-teal-700">|</span>{' '}
          Easy 30-day returns{' '}
          <span className="mx-2 text-teal-700">|</span>{' '}
          Authentic products guaranteed
        </p>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 hover:text-teal-400 transition-colors"
          aria-label="Dismiss promotional bar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
