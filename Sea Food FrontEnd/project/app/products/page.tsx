import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageShell } from '@/components/layout/page-shell';
import { PageHeader } from '@/components/layout/page-header';
import { ProductsExplorer } from '@/components/sections/products-explorer';
import { ProductGridSkeleton } from '@/components/cards/product-card-skeleton';
import { CTAInquiry } from '@/components/sections/cta-inquiry';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { productCategories } from '@/lib/constants/products';

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { category } = await searchParams;
  const cat = productCategories.find((c) => c.slug === category);

  if (category) {
    const canonicalPath = `/products?category=${encodeURIComponent(category)}`;

    return buildPageMetadata({
      title: cat?.metaTitle || (cat ? `${cat.name} — Premium Seafood | Seafood Wala` : 'Premium Seafood Products & Fresh Fish Catalog'),
      description: cat?.metaDescription || cat?.description || 'Browse our full catalog of premium seafood: fresh fish, shrimp, lobster, crab, oysters, mussels, and value-added products. Sourced sustainably, delivered worldwide.',
      path: canonicalPath,
      image: cat?.image,
    });
  }

  return buildPageMetadata({
    title: 'Premium Seafood Products & Fresh Fish Catalog',
    description:
      'Browse our full catalog of premium seafood: fresh fish, shrimp, lobster, crab, oysters, mussels, and value-added products. Sourced sustainably, delivered worldwide.',
    path: '/products',
  });
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const cat = productCategories.find((c) => c.slug === category);

  return (
    <PageShell>
      <PageHeader
        title={cat ? cat.name : 'Premium Seafood Products'}
        description={cat ? cat.description : 'Browse our full catalog of premium seafood — fresh fish, shrimp, lobster, crab, oysters, mussels, and value-added products. Sourced sustainably, delivered worldwide.'}
        breadcrumbItems={[{ name: 'Products', href: '/products' }]}
        pageSlug="products"
      />
      <section className="pb-10 pt-16 sm:pb-14 sm:pt-20">
        <div className="container-wide">
          <Suspense fallback={<ProductGridSkeleton count={8} />}>
            <ProductsExplorer initialCategory={category} />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
