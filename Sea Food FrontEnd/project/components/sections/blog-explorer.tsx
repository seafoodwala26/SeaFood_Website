'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, X, Filter, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BlogCard } from '@/components/cards/blog-card';
import { BlogGridSkeleton } from '@/components/cards/blog-card-skeleton';
import { useInfinitePublicBlogs, usePublicBlogCategories } from '@/lib/hooks/use-blogs';
import { useInfiniteScroll } from '@/lib/hooks/use-infinite-scroll';

export function BlogExplorer({ initialCategory }: { initialCategory?: string }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [category, setCategory] = useState<string>(initialCategory || 'all');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setCategory(initialCategory || 'all');
  }, [initialCategory]);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfinitePublicBlogs({
    category: category === 'all' ? undefined : category,
    search: debouncedQuery || undefined,
  });
  const { data: blogCategories = [], isLoading: isLoadingCategories } = usePublicBlogCategories();

  const allPosts = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const total = data?.pages[0]?.pagination.total ?? allPosts.length;

  const sentinelRef = useInfiniteScroll({
    onLoadMore: () => fetchNextPage(),
    hasMore: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const hasFilters = query !== '' || category !== 'all';

  const categoryOptions = blogCategories.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            aria-label="Search articles"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[220px]" aria-label="Filter by category">
              <SelectValue placeholder={isLoadingCategories ? 'Loading categories...' : 'All Categories'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoryOptions.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            'Loading articles...'
          ) : (
            <>
              Showing <span className="font-semibold text-foreground">{allPosts.length}</span> of{' '}
              <span className="font-semibold text-foreground">{total}</span> articles
            </>
          )}
        </p>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery('');
              setDebouncedQuery('');
              setCategory('all');
            }}
            className="text-muted-foreground"
          >
            <X className="mr-1 h-3.5 w-3.5" />
            Clear filters
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="mt-6">
          <BlogGridSkeleton count={6} />
        </div>
      ) : allPosts.length > 0 ? (
        <>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} priority={i < 3} />
            ))}
          </div>

          <div ref={sentinelRef} className="mt-8 flex justify-center py-4">
            {isFetchingNextPage && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-brand-primary" />
                Loading more articles...
              </div>
            )}
            {!hasNextPage && allPosts.length > 0 && (
              <p className="text-sm text-muted-foreground">All articles loaded</p>
            )}
          </div>

          {isFetchingNextPage && <BlogGridSkeleton count={3} />}
        </>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center">
          <Search className="h-10 w-10 text-muted-foreground/40" />
          <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">No articles found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or category.</p>
        </div>
      )}
    </div>
  );
}
