import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <Skeleton className="aspect-[4/3] w-full rounded-none skeleton-shimmer" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Skeleton className="h-3 w-24 skeleton-shimmer" />
        <Skeleton className="h-5 w-4/5 skeleton-shimmer" />
        <Skeleton className="h-4 w-full skeleton-shimmer" />
        <Skeleton className="h-4 w-2/3 skeleton-shimmer" />
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5 rounded-full skeleton-shimmer" />
          <Skeleton className="h-3.5 w-3.5 rounded-full skeleton-shimmer" />
          <Skeleton className="h-3.5 w-3.5 rounded-full skeleton-shimmer" />
          <Skeleton className="h-3 w-16 skeleton-shimmer" />
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16 skeleton-shimmer" />
            <Skeleton className="h-6 w-24 skeleton-shimmer" />
          </div>
          <Skeleton className="h-9 w-20 rounded-md skeleton-shimmer" />
        </div>
      </div>
    </article>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
