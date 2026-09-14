'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/layout/section-heading';
import { ProductCard } from '@/components/cards/product-card';
import { ProductGridSkeleton } from '@/components/cards/product-card-skeleton';
import { ContentSlider } from '@/components/ui/content-slider';
import { usePublicProducts } from '@/lib/hooks/use-catalog';
import { useInView } from '@/lib/hooks/use-in-view';

export function FeaturedProducts() {
  const { ref, isInView } = useInView<HTMLElement>();
  const { data: products = [], isLoading } = usePublicProducts({ limit: 10, enabled: isInView });

  if (isInView && !isLoading && products.length === 0) return null;

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-gradient-to-b from-muted/40 via-background to-muted/30">
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-brand-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-brand-primary/5 blur-3xl" />

      <div className="container-wide relative">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow=" Latest Products"
              title="Premium Seafood Selection"
              description="Our most-requested fresh fish, shrimp, lobster, and shellfish — sourced sustainably and delivered with uncompromising cold chain integrity."
              align="left"
              className="max-w-xl"
            />
          
          <Button asChild variant="outline" className="shrink-0 border-brand-primary/30 hover:bg-brand-primary/5">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <ContentSlider itemsPerView={{ base: 1, sm: 2, md: 3, lg: 4, xl: 4 }} showDots={false} autoPlay gap={24}>
              {products.map((product, i) => (
                <ProductCard key={product.slug} product={product} priority={i < 2} />
              ))}
            </ContentSlider>
          )}
        </div>
      </div>
    </section>
  );
}
