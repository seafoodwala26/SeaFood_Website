'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-muted shadow-soft">
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'relative aspect-square overflow-hidden rounded-xl border-2 bg-muted transition-colors',
                active === i ? 'border-brand-primary' : 'border-border hover:border-brand-primary/40'
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
