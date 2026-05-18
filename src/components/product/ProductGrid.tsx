import { useMemo } from 'react';
import type { Product } from '../../data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  productsPerPage?: number;
}

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-alloy-200 bg-alloy-50 dark:border-graphene-700 dark:bg-graphene-900">
      {/* Image skeleton */}
      <div className="h-48 w-full animate-pulse bg-alloy-200 dark:bg-graphene-700" />

      {/* Content skeleton */}
      <div className="flex flex-col gap-3 p-4">
        {/* Title */}
        <div className="h-4 w-3/4 animate-pulse rounded bg-alloy-200 dark:bg-graphene-700" />
        {/* Description line 1 */}
        <div className="h-3 w-full animate-pulse rounded bg-alloy-200 dark:bg-graphene-700" />
        {/* Description line 2 */}
        <div className="h-3 w-5/6 animate-pulse rounded bg-alloy-200 dark:bg-graphene-700" />
        {/* Spec badges */}
        <div className="flex gap-2">
          <div className="h-5 w-14 animate-pulse rounded-full bg-alloy-200 dark:bg-graphene-700" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-alloy-200 dark:bg-graphene-700" />
          <div className="h-5 w-12 animate-pulse rounded-full bg-alloy-200 dark:bg-graphene-700" />
        </div>
        {/* Rating */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-3.5 w-3.5 animate-pulse rounded bg-alloy-200 dark:bg-graphene-700" />
          ))}
          <div className="ml-1 h-3 w-8 animate-pulse rounded bg-alloy-200 dark:bg-graphene-700" />
        </div>
        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2">
          <div className="h-5 w-16 animate-pulse rounded bg-alloy-200 dark:bg-graphene-700" />
          <div className="h-4 w-12 animate-pulse rounded bg-alloy-200 dark:bg-graphene-700" />
        </div>
        {/* Button */}
        <div className="mt-2 h-8 w-full animate-pulse rounded-lg bg-alloy-200 dark:bg-graphene-700" />
      </div>
    </div>
  );
}

export default function ProductGrid({ products, currentPage, productsPerPage = 9 }: ProductGridProps) {
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return products.slice(start, start + productsPerPage);
  }, [products, currentPage, productsPerPage]);

  const isEmpty = products.length === 0;

  return (
    <div
      key={currentPage}
      className="grid grid-cols-1 gap-6 animate-fade-in sm:grid-cols-2 lg:grid-cols-3"
    >
      {isEmpty
        ? Array.from({ length: productsPerPage }, (_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))
        : paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
}
