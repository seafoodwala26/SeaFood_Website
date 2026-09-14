'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { SectionHeading } from '@/components/layout/section-heading';
import { Button } from '@/components/ui/button';
import { galleryImages } from '@/lib/data/content';
import { galleryApi, bannerApi } from '@/lib/api';
import { ImageLightbox } from '@/components/gallery/image-lightbox';

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const { data: managedImages } = useQuery({ queryKey: ['public-gallery'], queryFn: galleryApi.publicList });
  const { data: savedBanners = [] } = useQuery({
    queryKey: ['public-banners'],
    queryFn: bannerApi.publicList,
    staleTime: 60_000,
  });

  const galleryBanner = savedBanners.find((b) => b.pageSlug === 'gallery');
  const eyebrow = galleryBanner?.subtitle || 'Photo Gallery';
  const title = galleryBanner?.title || 'Our Seafood & Facility Gallery';
  const description =
    galleryBanner?.description ||
    'Take a visual tour of our fresh catches, modern cold-storage facilities, hygienic processing units, and global export operations.';

  const hasManagedImages = Boolean(managedImages?.length);
  const images = hasManagedImages
    ? managedImages!.map((item) => ({ src: item.image.url, alt: item.name, caption: item.name }))
    : galleryImages;

  // Show first 8 images on homepage
  const previewImages = images.slice(0, 8);

  return (
    <section className="section-padding bg-muted/40">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="left"
            className="max-w-2xl"
          />
          <Button asChild variant="outline" className="self-start md:self-auto rounded-full gap-2">
            <Link href="/gallery">
              Explore Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {previewImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxIndex(i);
                }
              }}
              aria-label={`View photo: ${img.caption || img.alt}`}
              className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-muted/60 border border-border shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-md">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white line-clamp-2 drop-shadow-md">
                    {img.caption}
                  </p>
                  <span className="text-[10px] text-white/80 mt-0.5 inline-block">
                    Click to enlarge
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Popup */}
      <ImageLightbox
        images={previewImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
}
