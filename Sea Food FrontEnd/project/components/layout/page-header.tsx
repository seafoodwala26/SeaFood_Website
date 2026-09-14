'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { getBannerByPageSlug } from '@/lib/data/banners';
import { bannerApi } from '@/lib/api';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems: { name: string; href: string }[];
  pageSlug?: string;
}

export function PageHeader({ title, description, breadcrumbItems, pageSlug }: PageHeaderProps) {
  const { data: savedBanners = [] } = useQuery({ queryKey: ['public-banners'], queryFn: bannerApi.publicList, staleTime: 60_000 });
  const savedBanner = pageSlug ? savedBanners.find((banner) => banner.pageSlug === pageSlug) : undefined;
  const fallbackBanner = pageSlug ? getBannerByPageSlug(pageSlug) : undefined;
  const bannerTitle = savedBanner?.title || fallbackBanner?.title || title;
  const bannerDescription = savedBanner?.description || fallbackBanner?.description || description;
  const bannerImage = savedBanner?.image?.url || fallbackBanner?.backgroundImage;
  const showBanner = savedBanner ? savedBanner.isActive : (fallbackBanner ? fallbackBanner.visible : true);

  if (showBanner && bannerImage) {
    return (
      <section className="relative overflow-hidden border-b border-border pt-12 pb-16">
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt={bannerTitle}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: savedBanner ? `linear-gradient(135deg, ${savedBanner.overlayStart || '#131838'}dd, ${savedBanner.overlayEnd || '#6869b6'}cc)` : 'rgb(0 0 0 / 0.7)' }} />
        </div>
        <div className="container-wide relative">
          <Breadcrumbs items={breadcrumbItems} tone="dark" />
          <h1 className="section-title-reveal mt-6 max-w-3xl font-heading text-4xl font-bold tracking-tight text-white drop-shadow-lg text-balance sm:text-5xl">
            {bannerTitle}
          </h1>
          {bannerDescription && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow text-balance">
              {bannerDescription}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-brand-primary/10 to-background pt-12 pb-16">
      <div className="absolute inset-0 bg-ocean-mesh opacity-50" aria-hidden="true" />
      <div className="container-wide relative">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="section-title-reveal mt-6 max-w-3xl font-heading text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
          {bannerTitle}
        </h1>
        {bannerDescription && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance">
            {bannerDescription}
          </p>
        )}
      </div>
    </section>
  );
}
