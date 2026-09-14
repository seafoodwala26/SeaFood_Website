'use client';

import { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Slide {
  id: string;
  image: string;
  alt?: string;
}

export interface CarouselSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showProgressBar?: boolean;
  loop?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  height?: string;
  renderContent?: (slide: Slide, index: number, isActive: boolean) => ReactNode;
}

export function CarouselSlider({
  slides,
  autoPlay = true,
  interval = 6000,
  showArrows = true,
  showDots = true,
  showProgressBar = true,
  loop = true,
  pauseOnHover = true,
  className = '',
  height = 'h-[600px]',
  renderContent,
}: CarouselSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = slides.length;

  const goNext = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setIsTransitioning(true);
    setCurrent(index);
  }, [current]);

  useEffect(() => {
    if (!autoPlay || isPaused || total <= 1) return;
    timerRef.current = setTimeout(goNext, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoPlay, isPaused, interval, total, goNext, current]);

  useEffect(() => {
    if (isTransitioning) {
      const t = setTimeout(() => setIsTransitioning(false), 800);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  if (total === 0) return null;

  return (
    <div
      className={`relative overflow-hidden ${height} ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => {
          const isActive = index === current;

          let slideClass = 'absolute inset-0 opacity-0 pointer-events-none';
          let imageClass = '';

          if (isActive) {
            slideClass = 'absolute inset-0 opacity-100 pointer-events-auto';
            imageClass = 'animate-slide-ken-burns';
          }

          return (
            <div key={slide.id} className={slideClass}>
              {/* Background image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.alt || ''}
                  className={`h-full w-full object-cover ${isActive ? imageClass : ''}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />

              {/* Custom content overlay */}
              {renderContent && (
                <div className="relative z-10 flex h-full items-center">
                  {renderContent(slide, index, isActive)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      {showArrows && total > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white transition-all duration-300 hover:bg-white/30 hover:scale-110 md:left-6 md:h-14 md:w-14"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white transition-all duration-300 hover:bg-white/30 hover:scale-110 md:right-6 md:h-14 md:w-14"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && total > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                index === current
                  ? 'w-10 bg-brand-accent shadow-lg shadow-brand-accent/50'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {showProgressBar && autoPlay && total > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10">
          <div
            key={current}
            className="h-full bg-gradient-to-r from-brand-primary to-brand-accent"
            style={{
              animation: isPaused
                ? 'none'
                : `progressBar ${interval}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  );
}
