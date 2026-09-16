import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell';
import { PageHeader } from '@/components/layout/page-header';
import { GalleryMasonry } from '@/components/gallery/gallery-masonry';
import { ImageGallerySchema, BreadcrumbSchema } from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { galleryApi, ApiGalleryImage } from '@/lib/api';
import { galleryImages } from '@/lib/data/content';
import { siteConfig } from '@/lib/constants/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Fresh Seafood & Facility Gallery | Seafood Wala',
  description:
    'Explore Seafood Wala\'s official gallery featuring daily catches, cold storage facilities, hygienic processing, and international export packing of fresh fish, prawns, and crabs.',
  path: '/gallery'
});

export default async function GalleryPage() {
  // Pre-fetch managed images on server for SEO & instant load
  let initialImages: ApiGalleryImage[] = [];
  try {
    initialImages = await galleryApi.publicList();
  } catch {
    initialImages = [];
  }

  // Generate schema images data (managed images if available, fallback to content images)
  const schemaImages =
    initialImages.length > 0
      ? initialImages.map((item) => ({
          url: item.image.url,
          name: item.name,
          caption: item.name,
        }))
      : galleryImages.map((img) => ({
          url: img.src,
          name: img.alt,
          caption: img.caption,
        }));

  return (
    <PageShell>
      {/* Schema.org Structured Data for Google Image Search & Rich Snippets */}
      <ImageGallerySchema
        name="Seafood Wala Photo Gallery"
        description="Fresh catches, modern cold-storage facilities, hygienic packaging, and global seafood export logistics."
        images={schemaImages}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Gallery', url: `${siteConfig.url}/gallery` },
        ]}
      />

      <PageHeader
        title="Photo Gallery"
        description="A visual look at our daily wild catches, cold storage facilities, packaging, and the team powering every delivery."
        breadcrumbItems={[{ name: 'Gallery', href: '/gallery' }]}
        pageSlug="gallery"
      />

      <section className="pb-16 pt-8 sm:pb-24 sm:pt-12 bg-background">
        <div className="container-wide">
          <GalleryMasonry initialData={initialImages} />
        </div>
      </section>
    </PageShell>
  );
}