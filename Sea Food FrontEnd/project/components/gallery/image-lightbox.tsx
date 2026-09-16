'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const [imageLoading, setImageLoading] = useState(true);

  const currentImage = images[currentIndex];
  const total = images.length;

  const handlePrev = useCallback(() => {
    setImageLoading(true);
    const nextIdx = (currentIndex - 1 + total) % total;
    onNavigate(nextIdx);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    setImageLoading(true);
    const nextIdx = (currentIndex + 1) % total;
    onNavigate(nextIdx);
  }, [currentIndex, total, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Reset loading state on image index change
  useEffect(() => {
    setImageLoading(true);
  }, [currentIndex]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentImage.caption || currentImage.alt || 'Gallery Image Preview'}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-3 sm:p-6 backdrop-blur-md animate-in fade-in-0 duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex w-full items-center justify-between z-10 px-2 sm:px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm border border-white/10">
            {currentIndex + 1} / {total}
          </span>
          {currentImage.category && (
            <span className="hidden sm:inline-block rounded-full bg-primary/30 text-primary-foreground border border-primary/40 px-2.5 py-0.5 text-xs font-medium">
              {currentImage.category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {currentImage.src && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              title="Open full resolution in new tab"
              asChild
            >
              <a href={currentImage.src} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" /> <span className="sr-only">Open original image</span>
              </a>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Close (Esc)"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" /> <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>

      <div className="relative flex flex-1 w-full max-w-6xl items-center justify-center my-auto overflow-hidden px-2 sm:px-12"
        onClick={(e) => {if (e.target === e.currentTarget) onClose();}}
      >
        {/* Prev Button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handlePrev();}}
          className="absolute left-2 sm:left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white border border-white/15 backdrop-blur-sm hover:bg-black/90 hover:scale-105 active:scale-95 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Previous image"
          title="Previous (Left Arrow)"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Image Container */}
        <div className="relative flex items-center justify-center max-h-[75vh] sm:max-h-[80vh] w-full h-full">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={1600}
            height={1200}
            priority
            unoptimized
            onLoad={() => setImageLoading(false)}
            className={`max-h-[75vh] sm:max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-2 sm:right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white border border-white/15 backdrop-blur-sm hover:bg-black/90 hover:scale-105 active:scale-95 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Next image"
          title="Next (Right Arrow)"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Caption Bar */}
      <div className="w-full max-w-4xl text-center px-4 py-3 z-10">
        <p className="text-sm sm:text-base font-medium text-white/95 leading-relaxed drop-shadow-md">
          {currentImage.caption || currentImage.alt}
        </p>
        <p className="text-xs text-white/60 mt-1 hidden sm:block">
          Use ← and → arrow keys to navigate, Esc to close
        </p>
      </div>
    </div>
  );
}

