import { useState, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  Plane,
  Gamepad2,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { products, type Product } from '../data/products';
import FeaturedSpotlight from '../components/product/FeaturedSpotlight';
import ProductGrid from '../components/product/ProductGrid';
import Badge from '../components/ui/Badge';
import { useSetupMode } from '../contexts/SetupModeContext';

// --- Constants ---

const PRODUCTS_PER_PAGE = 9;

const CATEGORY_OPTIONS = [
  'All',
  'Power & Charging',
  'Cables',
  'Hubs & Docks',
  'Audio',
  'Mounts & Stands',
  'Storage',
  'Smart Accessories',
  'Travel Tech',
] as const;

const SETUP_MODE_OPTIONS = [
  { label: 'All', icon: null },
  { label: 'Desk', icon: Monitor },
  { label: 'Travel', icon: Plane },
  { label: 'Gaming', icon: Gamepad2 },
] as const;

type SortOption = 'featured' | 'newest' | 'popular';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
];

// --- Helpers ---

function sortProducts(items: Product[], sort: SortOption): Product[] {
  const sorted = [...items];
  if (sort === 'featured') {
    const badgePriority: Record<string, number> = {
      'Best Seller': 0,
      New: 1,
      Limited: 2,
    };
    sorted.sort((a, b) => {
      const aP = a.badge && a.badge !== 'Featured Spotlight' ? badgePriority[a.badge] ?? 3 : 3;
      const bP = b.badge && b.badge !== 'Featured Spotlight' ? badgePriority[b.badge] ?? 3 : 3;
      return aP - bP;
    });
  } else if (sort === 'newest') {
    sorted.sort((a, b) => {
      const aNew = a.badge === 'New' ? 0 : 1;
      const bNew = b.badge === 'New' ? 0 : 1;
      return aNew - bNew;
    });
  } else if (sort === 'popular') {
    sorted.sort((a, b) => b.reviewCount - a.reviewCount);
  }
  return sorted;
}

// --- Component ---

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  useSetupMode();

  // --- State ---
  const [sort, setSort] = useState<SortOption>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [setupModeFilter, setSetupModeFilter] = useState<string>('All');

  // Category from URL search params
  const categoryFilter = searchParams.get('category') ?? 'All';

  const setCategoryFilter = useCallback(
    (category: string) => {
      setSearchParams(category === 'All' ? {} : { category }, { replace: true });
      setCurrentPage(1);
    },
    [setSearchParams],
  );

  // --- Derived data ---

  // The featured spotlight product
  const featuredProduct = useMemo(
    () => products.find((p) => p.badge === 'Featured Spotlight'),
    [],
  );

  // All non-featured products
  const nonFeaturedProducts = useMemo(
    () => products.filter((p) => p.badge !== 'Featured Spotlight'),
    [],
  );

  // Filter and sort the grid products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = nonFeaturedProducts;

    // Category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Setup mode filter
    if (setupModeFilter !== 'All') {
      filtered = filtered.filter((p) => p.setupModes.includes(setupModeFilter as 'Desk' | 'Travel' | 'Gaming'));
    }

    // Sort
    return sortProducts(filtered, sort);
  }, [nonFeaturedProducts, categoryFilter, setupModeFilter, sort]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));

  const paginatedStart = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const paginatedEnd = Math.min(safeCurrentPage * PRODUCTS_PER_PAGE, filteredAndSortedProducts.length);

  // --- Handlers ---

  const handleSetupModeFilter = useCallback((mode: string) => {
    setSetupModeFilter(mode);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortOption);
    setCurrentPage(1);
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [],
  );

  // --- Total product count for the header ---
  const totalProductCount = products.length; // 19 total

  return (
    <main className="min-h-screen bg-alloy-50 dark:bg-graphene-950">
      {/* ============================================================
          PAGE HEADER
          ============================================================ */}
      <section className="border-b border-alloy-200 bg-white dark:border-graphene-700 dark:bg-graphene-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-graphene-500 dark:text-alloy-400">
              <li>
                <Link to="/" className="transition-colors hover:text-teal-500 dark:hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li className="font-semibold text-graphene-900 dark:text-alloy-50">Products</li>
            </ol>
          </nav>

          {/* Heading */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-graphene-900 dark:text-alloy-50 sm:text-4xl">
                Shop Tech Accessories
              </h1>
              <p className="mt-2 text-graphene-600 dark:text-alloy-400">
                {totalProductCount} products across 8 curated categories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED SPOTLIGHT
          ============================================================ */}
      {featuredProduct && (
        <section className="mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-coral-500" />
            <h2 className="text-2xl font-bold text-graphene-900 dark:text-alloy-50">
              Featured Spotlight
            </h2>
            <Badge variant="featured">Featured Spotlight</Badge>
          </div>
          <FeaturedSpotlight product={featuredProduct} />
        </section>
      )}

      {/* ============================================================
          FILTERING + SORTING
          ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Category chips */}
        <div className="mb-4">
          <h3 className="sr-only">Category filter</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  categoryFilter === category
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/25'
                    : 'bg-white text-graphene-700 border border-alloy-200 hover:border-teal-500 hover:text-teal-600 dark:bg-graphene-800 dark:text-alloy-300 dark:border-graphene-700 dark:hover:border-teal-400 dark:hover:text-teal-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Setup Mode chips + Sort dropdown */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Setup Mode chips */}
          <div>
            <h3 className="sr-only">Setup mode filter</h3>
            <div className="flex flex-wrap gap-2">
              {SETUP_MODE_OPTIONS.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => handleSetupModeFilter(label)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    setupModeFilter === label
                      ? 'bg-teal-500 text-white shadow-md shadow-teal-500/25'
                      : 'bg-white text-graphene-700 border border-alloy-200 hover:border-teal-500 hover:text-teal-600 dark:bg-graphene-800 dark:text-alloy-300 dark:border-graphene-700 dark:hover:border-teal-400 dark:hover:text-teal-400'
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-graphene-500 dark:text-alloy-400" />
            <select
              value={sort}
              onChange={handleSortChange}
              className="rounded-lg border border-alloy-200 bg-white px-3 py-1.5 text-sm font-medium text-graphene-700 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-graphene-700 dark:bg-graphene-800 dark:text-alloy-300 dark:focus:border-teal-400"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ============================================================
          PRODUCT GRID
          ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={filteredAndSortedProducts}
          currentPage={safeCurrentPage}
          productsPerPage={PRODUCTS_PER_PAGE}
        />
      </section>

      {/* ============================================================
          PAGINATION
          ============================================================ */}
      {totalPages > 1 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            {/* Showing X-Y of Z products */}
            <p className="text-sm text-graphene-600 dark:text-alloy-400">
              Showing {paginatedStart}-{paginatedEnd} of {filteredAndSortedProducts.length} products
            </p>

            {/* Page controls */}
            <div className="flex items-center gap-2">
              {/* Previous button */}
              <button
                onClick={() => goToPage(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className="inline-flex items-center gap-1 rounded-lg border border-alloy-200 bg-white px-3 py-2 text-sm font-medium text-graphene-700 transition-colors hover:border-teal-500 hover:text-teal-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-alloy-200 disabled:hover:text-graphene-700 dark:border-graphene-700 dark:bg-graphene-800 dark:text-alloy-300 dark:hover:border-teal-400 dark:hover:text-teal-400 dark:disabled:hover:border-graphene-700 dark:disabled:hover:text-alloy-300"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              {/* Page number buttons */}
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === safeCurrentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-coral-500 text-white shadow-md shadow-coral-500/25'
                        : 'border border-alloy-200 bg-white text-graphene-700 hover:border-teal-500 hover:text-teal-600 dark:border-graphene-700 dark:bg-graphene-800 dark:text-alloy-300 dark:hover:border-teal-400 dark:hover:text-teal-400'
                    }`}
                    aria-label={`Page ${pageNum}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next button */}
              <button
                onClick={() => goToPage(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className="inline-flex items-center gap-1 rounded-lg border border-alloy-200 bg-white px-3 py-2 text-sm font-medium text-graphene-700 transition-colors hover:border-teal-500 hover:text-teal-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-alloy-200 disabled:hover:text-graphene-700 dark:border-graphene-700 dark:bg-graphene-800 dark:text-alloy-300 dark:hover:border-teal-400 dark:hover:text-teal-400 dark:disabled:hover:border-graphene-700 dark:disabled:hover:text-alloy-300"
                aria-label="Next page"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Page X of Y */}
            <p className="text-sm font-medium text-graphene-500 dark:text-alloy-500">
              Page {safeCurrentPage} of {totalPages}
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
