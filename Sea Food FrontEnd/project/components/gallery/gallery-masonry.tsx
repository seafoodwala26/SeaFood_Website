'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Maximize2, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { galleryApi, ApiGalleryImage } from '@/lib/api';
import { galleryImages } from '@/lib/data/content';
import { ImageLightbox, LightboxImage } from './image-lightbox';
import { Skeleton } from '@/components/ui/skeleton';

interface GalleryMasonryProps {
  initialData?: ApiGalleryImage[];
}

export function GalleryMasonry({ initialData }: GalleryMasonryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  // Fetch managed images from backend API with SSR hydration support
  const { data: rawImages, isLoading } = useQuery({
    queryKey: ['public-gallery'],
    queryFn: galleryApi.publicList,
    initialData,
    staleTime: 60 * 1000,
  });

  // Normalise to a guaranteed array so downstream code never handles undefined.
  const apiImages: ApiGalleryImage[] = rawImages ?? [];

  // Prepare images array: managed images from DB or fallback content images
  const allImages: LightboxImage[] = useMemo(() => {
    if (apiImages.length > 0) {
      return apiImages.map((item) => ({
        src: item.image.url,
        alt: item.name || 'Seafood Wala Gallery Image',
        caption: item.name || 'Seafood Wala Fresh Catch & Facility',
      }));
    }
    return galleryImages.map((item) => ({
      src: item.src,
      alt: item.alt,
      caption: item.caption,
    }));
  }, [apiImages]);

  // Optional category filter
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return allImages;
    return allImages.filter((img) => img.caption?.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [allImages, selectedCategory]);

  return (
    <div className="w-full">
      {/* Gallery Header Info & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-border">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground tracking-tight">
            Seafood In Focus
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Browse our processing hubs, daily wild catches, and global exports. Click any photo to view in high resolution.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{filteredImages.length} Photographs</span>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && apiImages.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl">
              <Skeleton className="h-full w-full rounded-2xl sm:rounded-3xl" />
            </div>
          ))}
        </div>
      ) : (
        /* Uniform Clean Aspect Ratio Grid (Same box size for all images) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredImages.map((image, index) => (
            <GalleryItem
              key={`${image.src}-${index}`}
              image={image}
              index={index}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Interactive Lightbox Popup Modal */}
      <ImageLightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}

interface GalleryItemProps {
  image: LightboxImage;
  index: number;
  onClick: () => void;
}

function GalleryItem({ image, index, onClick }: GalleryItemProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure
      onClick={onClick}
      className="group relative aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-muted/60 border border-border shadow-soft hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      tabIndex={0}
      role="button"
      aria-label={`View photo: ${image.caption || image.alt}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Skeleton Pulse before image is ready */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse z-0" />
      )}

      {/* Consistent Full-Box Image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        unoptimized
        loading={index < 4 ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Top-Right Expand Badge (Always subtle, pops on hover) */}
      <div className="absolute top-3 right-3 z-10">
        <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-md border border-white/20 shadow-md group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
          <Maximize2 className="h-4 w-4" />
        </span>
      </div>

      {/* Bottom Caption Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4 sm:p-5 transition-opacity duration-300">
        <figcaption>
          <p className="text-sm sm:text-base font-bold text-white leading-tight drop-shadow-md line-clamp-2">
            {image.caption || image.alt}
          </p>
          <span className="inline-block mt-1 text-[11px] font-medium text-white/75 group-hover:text-white transition-colors">
            Click to expand
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
