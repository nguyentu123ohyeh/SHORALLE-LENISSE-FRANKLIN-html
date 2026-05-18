import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
        {title}
      </h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

const SHOP_LINKS = [
  { label: 'Keyboards', to: '/products?category=keyboards' },
  { label: 'Mice', to: '/products?category=mice' },
  { label: 'Monitors', to: '/products?category=monitors' },
  { label: 'Headsets', to: '/products?category=headsets' },
  { label: 'Webcams', to: '/products?category=webcams' },
  { label: 'Accessories', to: '/products?category=accessories' },
];

const COMPANY_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Policies', to: '/policies' },
];

const SUPPORT_LINKS = [
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Policies', to: '/policies' },
];

export default function Footer() {
  return (
    <footer className="bg-graphene-950 text-alloy-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Shop */}
          <FooterColumn title="Shop">
            {SHOP_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="block text-sm text-alloy-400 hover:text-teal-400 transition-colors"
              >
                {link.label}
              </NavLink>
            ))}
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company">
            {COMPANY_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="block text-sm text-alloy-400 hover:text-teal-400 transition-colors"
              >
                {link.label}
              </NavLink>
            ))}
          </FooterColumn>

          {/* Support */}
          <FooterColumn title="Support">
            {SUPPORT_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="block text-sm text-alloy-400 hover:text-teal-400 transition-colors"
              >
                {link.label}
              </NavLink>
            ))}
          </FooterColumn>

          {/* Connect */}
          <FooterColumn title="Connect">
            <div className="space-y-3">
              <a
                href="mailto:soodtwyla676@gmail.com"
                className="flex items-start gap-3 text-sm text-alloy-400 hover:text-teal-400 transition-colors"
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>soodtwyla676@gmail.com</span>
              </a>
              <a
                href="tel:+12133610175"
                className="flex items-start gap-3 text-sm text-alloy-400 hover:text-teal-400 transition-colors"
              >
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+1 7187158758</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-alloy-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Blount Street 500 Longview Texas 75602</span>
              </div>
            </div>
          </FooterColumn>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-graphene-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-alloy-500">
            &copy; {new Date().getFullYear()} SHORALLE LENISSE FRANKLIN. All rights reserved.
          </p>

          {/* Payment Icons Placeholder */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded border border-graphene-700 text-[10px] font-semibold text-alloy-500 uppercase tracking-wider">
              Visa
            </div>
            <div className="px-3 py-1 rounded border border-graphene-700 text-[10px] font-semibold text-alloy-500 uppercase tracking-wider">
              Mastercard
            </div>
            <div className="px-3 py-1 rounded border border-graphene-700 text-[10px] font-semibold text-alloy-500 uppercase tracking-wider">
              Amex
            </div>
            <div className="px-3 py-1 rounded border border-graphene-700 text-[10px] font-semibold text-alloy-500 uppercase tracking-wider">
              PayPal
            </div>
          </div>

          <p className="text-xs text-alloy-500">
            Powered by{' '}
            <span className="font-semibold text-white">SHORALLE </span>
            <span className="oil-spectrum-text font-semibold">LENISSE FRANKLIN</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
