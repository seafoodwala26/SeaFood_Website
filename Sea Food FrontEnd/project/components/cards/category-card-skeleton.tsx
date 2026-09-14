import { Skeleton } from '@/components/ui/skeleton';

export function CategoryCardSkeleton() {
  return (
    <article className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <Skeleton className="absolute inset-0 rounded-none skeleton-shimmer" />
      <div className="relative z-10 space-y-3 bg-black/10 p-5">
        <Skeleton className="h-3 w-24 bg-white/40 skeleton-shimmer" />
        <Skeleton className="h-6 w-4/5 bg-white/50 skeleton-shimmer" />
        <Skeleton className="h-4 w-full bg-white/35 skeleton-shimmer" />
        <Skeleton className="h-4 w-2/3 bg-white/35 skeleton-shimmer" />
        <Skeleton className="mt-3 h-4 w-20 bg-white/45 skeleton-shimmer" />
      </div>
    </article>
  );
}
