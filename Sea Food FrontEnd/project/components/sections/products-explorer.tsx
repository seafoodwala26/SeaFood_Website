'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, X, Loader2, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductCard } from '@/components/cards/product-card';
import { ProductGridSkeleton } from '@/components/cards/product-card-skeleton';
import { usePublicCategories, useInfinitePublicProducts } from '@/lib/hooks/use-catalog';
import { useInfiniteScroll } from '@/lib/hooks/use-infinite-scroll';
import type { Product } from '@/lib/types';

interface ProductsExplorerProps {
  initialCategory?: string;
}

export function ProductsExplorer({ initialCategory }: ProductsExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [category, setCategory] = useState<string>(initialCategory || 'all');

  const { data: categories = [], isLoading: categoriesLoading } = usePublicCategories();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfinitePublicProducts({
    category: category === 'all' ? undefined : category,
    search: debouncedQuery || undefined,
  });

  const allProducts = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const total = data?.pages[0]?.pagination.total ?? allProducts.length;

  const sortedProducts = useMemo(() => {
    const result = [...allProducts] as Product[];
    return result.sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [allProducts]);

  const sentinelRef = useInfiniteScroll({
    onLoadMore: () => fetchNextPage(),
    hasMore: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const hasFilters = query !== '' || category !== 'all';

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    router.replace(`/products${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  };

  const clearFilters = () => {
    setQuery('');
    setDebouncedQuery('');
    setCategory('all');
    router.replace('/products', { scroll: false });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            aria-label="Search products"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={category} onValueChange={handleCategoryChange} disabled={categoriesLoading}>
              <SelectTrigger className="w-[220px]" aria-label="Filter by category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            'Loading products...'
          ) : (
            <>
              Showing <span className="font-semibold text-foreground">{sortedProducts.length}</span> of{' '}
              <span className="font-semibold text-foreground">{total}</span> products
            </>
          )}
        </p>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            <X className="mr-1 h-3.5 w-3.5" />
            Clear filters
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="mt-6">
          <ProductGridSkeleton count={8} />
        </div>
      ) : sortedProducts.length > 0 ? (
        <>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {sortedProducts.map((product, i) => (
              <ProductCard key={product.slug} product={product} priority={i < 3} />
            ))}
          </div>

          <div ref={sentinelRef} className="mt-6 flex justify-center py-2">
            {isFetchingNextPage && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-brand-primary" />
                Loading more products...
              </div>
            )}
            {!hasNextPage && sortedProducts.length > 0 && (
              <p className="text-sm text-muted-foreground">All products loaded</p>
            )}
          </div>

          {isFetchingNextPage && <ProductGridSkeleton count={4} />}
        </>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center">
          <Search className="h-10 w-10 text-muted-foreground/40" />
          <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">No products found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or category filter.</p>
          <Button onClick={clearFilters} variant="outline" className="mt-4">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
