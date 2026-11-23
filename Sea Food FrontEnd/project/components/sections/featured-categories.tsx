'use client';

import { Fish } from 'lucide-react';
import { SectionHeading } from '@/components/layout/section-heading';
import { CategoryCard } from '@/components/cards/category-card';
import { CategoryCardSkeleton } from '@/components/cards/category-card-skeleton';
import { ContentSlider } from '@/components/ui/content-slider';
import { usePublicCategories } from '@/lib/hooks/use-catalog';
import { useInView } from '@/lib/hooks/use-in-view';

export function FeaturedCategories() {
  const { ref, isInView } = useInView<HTMLElement>();
  const { data: categories, isLoading, isError, isSuccess } = usePublicCategories({ enabled: isInView });
  const availableCategories = categories ?? [];

  if (isSuccess && availableCategories.length === 0) return null;

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-seafood-mesh opacity-60" aria-hidden="true" />
      <div className="container-wide relative">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Browse by Category"
            title="Seafood for Every Need"
            description="From fresh fish and shrimp to lobster, oysters, and value-added products — explore our full catalog sourced for chefs and distributors."
            align="left"
            className="max-w-2xl"
          />
          {availableCategories.length > 0 && (
            <div className="hidden items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-medium text-brand-primary lg:flex">
              <Fish className="h-4 w-4" />
              {availableCategories.length} Categories Available
            </div>
          )}
        </div>

        <div className="mt-12">
          {!isInView || isLoading ? (
            <ContentSlider itemsPerView={{ base: 1, sm: 2, md: 3, lg: 4 }} showDots={false} gap={24} autoPlay={false}>
              {Array.from({ length: 4 }).map((_, i) => <CategoryCardSkeleton key={i} />)}
            </ContentSlider>
          ) : isError && availableCategories.length === 0 ? (
            <p className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
              Categories are temporarily unavailable. Please try again later.
            </p>
          ) : (
            <ContentSlider itemsPerView={{ base: 1, sm: 2, md: 3, lg: 4 }} showDots={false} gap={24}>
              {availableCategories.map((cat, i) => (
                <CategoryCard key={cat.slug} category={cat} priority={i < 2} />
              ))}
            </ContentSlider>
          )}
        </div>
      </div>
    </section>
  );
}
