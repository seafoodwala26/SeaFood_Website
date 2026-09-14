'use client';

import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  rootMargin?: string;
}

/** Triggers onLoadMore when the sentinel enters the viewport. */
export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  rootMargin = '200px',
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore, rootMargin]);

  return sentinelRef;
}
