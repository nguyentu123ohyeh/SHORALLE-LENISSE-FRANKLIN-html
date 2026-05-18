import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Usb, Zap, MonitorSmartphone } from 'lucide-react';
import type { Product } from '../../data/products';
import { useCart } from '../../contexts/CartContext';
import { useSettings } from '../../contexts/SettingsContext';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const BADGE_VARIANT_MAP: Record<string, 'best-seller' | 'new' | 'limited' | 'featured'> = {
  'Best Seller': 'best-seller',
  New: 'new',
  Limited: 'limited',
  'Featured Spotlight': 'featured',
};

const SPEC_ICONS: Record<string, React.ElementType> = {
  usb: Usb,
  pd: Zap,
  wattage: Zap,
  hdmi: MonitorSmartphone,
  display: MonitorSmartphone,
};

function getSpecIcon(spec: string) {
  const key = spec.toLowerCase();
  for (const [keyword, Icon] of Object.entries(SPEC_ICONS)) {
    if (key.includes(keyword)) return Icon;
  }
  return null;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { settings } = useSettings();
  const isOnSale = product.originalPrice !== undefined && product.originalPrice > product.price;
  const savings = isOnSale ? product.originalPrice! - product.price : 0;
  const currentMode = settings.defaultSetupMode;
  const hasSetupMode = product.setupModes.includes(currentMode);

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating - fullStars >= 0.5;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-alloy-200 bg-alloy-50 product-card-hover dark:border-graphene-700 dark:bg-graphene-900">
      {/* Setup Mode Indicator */}
      {hasSetupMode && (
        <span className="absolute top-3 right-3 z-10 h-2.5 w-2.5 rounded-full bg-teal-500 ring-2 ring-alloy-50 dark:ring-graphene-900" title={`Available for ${currentMode} mode`} />
      )}

      {/* Image */}
      <Link
        to={`/products/${product.slug}`}
        className="relative flex h-56 items-center justify-center overflow-hidden bg-white dark:bg-graphene-950"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="max-h-full max-w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="category">{product.category}</Badge>
        </div>

        {/* Product Badge */}
        {product.badge && (
          <div className="absolute top-3 left-28">
            <Badge variant={BADGE_VARIANT_MAP[product.badge] ?? 'featured'}>
              {product.badge}
            </Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Name */}
        <Link to={`/products/${product.slug}`} className="group/name inline-block">
          <h3 className="text-sm font-semibold text-graphene-900 hover:text-teal-500 dark:text-alloy-50 dark:hover:text-teal-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-xs text-graphene-600 dark:text-alloy-400 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Spec Badges Row */}
        <div className="flex flex-wrap gap-1.5">
          {product.specBadges.map((badge) => {
            const Icon = getSpecIcon(badge);
            return (
              <span
                key={badge}
                className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-500 dark:bg-violet-500/20"
              >
                {Icon && <Icon className="h-3 w-3" />}
                {badge}
              </span>
            );
          })}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < fullStars
                  ? 'fill-coral-500 text-coral-500'
                  : i === fullStars && hasHalfStar
                    ? 'fill-coral-500/50 text-coral-500'
                    : 'fill-alloy-200 text-alloy-200 dark:fill-graphene-700 dark:text-graphene-700'
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-graphene-600 dark:text-alloy-400">
            {product.rating}
          </span>
          <span className="text-xs text-graphene-400 dark:text-alloy-500">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-lg font-bold text-graphene-900 dark:text-alloy-50">
            ${product.price.toFixed(2)}
          </span>
          {isOnSale && (
            <>
              <span className="text-sm text-alloy-500 line-through dark:text-alloy-400">
                ${product.originalPrice!.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-coral-500">
                Save ${savings.toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          variant="primary"
          size="sm"
          className="mt-2 w-full"
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
        >
          <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
          Add to Cart
        </Button>
      </div>

      {/* Spec Strip Overlay */}
      {settings.showSpecStrips && (
        <div className="spec-strip absolute bottom-0 left-0 right-0 z-20 bg-graphene-950/95 backdrop-blur-sm px-4 py-3">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-alloy-100">
            {product.specs.ports && product.specs.ports.length > 0 && (
              <div className="flex items-center gap-1">
                <Usb className="h-3 w-3 text-teal-400" />
                <span>{product.specs.ports.slice(0, 3).join(', ')}</span>
              </div>
            )}
            {product.specs.powerDelivery && (
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-coral-400" />
                <span>{product.specs.powerDelivery}</span>
              </div>
            )}
            {product.compatibility.devices && product.compatibility.devices.length > 0 && (
              <div className="flex items-center gap-1">
                <MonitorSmartphone className="h-3 w-3 text-violet-400" />
                <span>{product.compatibility.devices.slice(0, 2).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
