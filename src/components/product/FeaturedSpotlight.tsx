import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../../data/products';
import { useCart } from '../../contexts/CartContext';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface FeaturedSpotlightProps {
  product: Product;
}

export default function FeaturedSpotlight({ product }: FeaturedSpotlightProps) {
  const { addItem } = useCart();
  const isOnSale = product.originalPrice !== undefined && product.originalPrice > product.price;
  const savings = isOnSale ? product.originalPrice! - product.price : 0;

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating - fullStars >= 0.5;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block w-full rounded-2xl border border-alloy-200 bg-alloy-50 glow-coral overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:border-graphene-700 dark:bg-graphene-900"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image - Left */}
        <div className="relative md:w-1/2 flex-shrink-0 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full md:min-h-[360px]"
            loading="lazy"
          />

          {/* Featured Spotlight Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="featured">Featured Spotlight</Badge>
          </div>
        </div>

        {/* Details - Right */}
        <div className="flex flex-col gap-3 p-6 md:p-8 md:w-1/2">
          {/* Category */}
          <Badge variant="category">{product.category}</Badge>

          {/* Product Name */}
          <h2 className="text-2xl font-bold text-graphene-900 dark:text-alloy-50 md:text-3xl">
            {product.name}
          </h2>

          {/* Short Description */}
          <p className="text-sm leading-relaxed text-graphene-600 dark:text-alloy-300">
            {product.shortDescription}
          </p>

          {/* Spec Badges */}
          <div className="flex flex-wrap gap-2">
            {product.specBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-500 dark:bg-violet-500/20"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < fullStars
                    ? 'fill-coral-500 text-coral-500'
                    : i === fullStars && hasHalfStar
                      ? 'fill-coral-500/50 text-coral-500'
                      : 'fill-alloy-200 text-alloy-200 dark:fill-graphene-700 dark:text-graphene-700'
                }`}
              />
            ))}
            <span className="ml-1 text-sm font-semibold text-graphene-900 dark:text-alloy-50">
              {product.rating}
            </span>
            <span className="text-sm text-graphene-500 dark:text-alloy-400">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-graphene-900 dark:text-alloy-50">
              ${product.price.toFixed(2)}
            </span>
            {isOnSale && (
              <>
                <span className="text-lg text-alloy-500 line-through dark:text-alloy-400">
                  ${product.originalPrice!.toFixed(2)}
                </span>
                <span className="inline-flex items-center rounded-full bg-coral-500/10 px-2.5 py-0.5 text-sm font-bold text-coral-500 dark:bg-coral-500/20">
                  Save ${savings.toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            variant="primary"
            size="lg"
            className="mt-2 w-full md:w-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
