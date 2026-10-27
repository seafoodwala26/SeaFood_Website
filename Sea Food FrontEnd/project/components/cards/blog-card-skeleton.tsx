import { Skeleton } from '@/components/ui/skeleton';



export function BlogCardSkeleton() {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <Skeleton className="aspect-[16/10] w-full rounded-none skeleton-shimmer" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Skeleton className="h-5 w-4/5 skeleton-shimmer" />
        <Skeleton className="h-4 w-full skeleton-shimmer" />
        <Skeleton className="h-4 w-full skeleton-shimmer" />
        <Skeleton className="h-4 w-3/5 skeleton-shimmer" />
        <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
          <Skeleton className="h-4 w-28 skeleton-shimmer" />
          <Skeleton className="h-4 w-20 skeleton-shimmer" />
        </div>
      </div>
    </article>
  );
}

export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
