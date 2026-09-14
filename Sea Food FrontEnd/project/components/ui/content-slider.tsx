'use client';

import { useState, useRef, useCallback, useEffect, Children, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentSliderProps {
  children: ReactNode;
  itemsPerView?: { base: number; sm: number; md: number; lg: number; xl?: number };
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
  gap?: number;
  className?: string;
}

export function ContentSlider({
  children,
  itemsPerView = { base: 1, sm: 2, md: 3, lg: 4 },
  showArrows = true,
  showDots = true,
  autoPlay = true,
  interval = 5000,
  gap = 24,
  className = '',
}: ContentSliderProps) {
  const [current, setCurrent] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [perView, setPerView] = useState(itemsPerView.base);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const childItems = Children.toArray(children);

  useEffect(() => {
    const updatePerView = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(itemsPerView.base);
      else if (w < 768) setPerView(itemsPerView.sm);
      else if (w < 1024) setPerView(itemsPerView.md);
      else setPerView(itemsPerView.xl ?? itemsPerView.lg);
    };
    updatePerView();
    window.addEventListener('resize', updatePerView);
    return () => window.removeEventListener('resize', updatePerView);
  }, [itemsPerView]);

  useEffect(() => {
    setItemsCount(childItems.length);
  }, [childItems.length]);

  const maxIndex = Math.max(0, itemsCount - perView);

  const goNext = useCallback(() => {
    setCurrent((p) => (p >= maxIndex ? 0 : p + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrent((p) => (p <= 0 ? maxIndex : p - 1));
  }, [maxIndex]);

  const goTo = useCallback(
    (i: number) => {
      setCurrent(Math.min(i, maxIndex));
    },
    [maxIndex]
  );

  useEffect(() => {
    if (!autoPlay || isPaused || itemsCount <= perView) return;
    const t = setTimeout(goNext, interval);
    return () => clearTimeout(t);
  }, [autoPlay, isPaused, interval, itemsCount, perView, goNext, current]);

  if (itemsCount === 0) return null;

  const itemWidth = `calc((100% - ${gap * (perView - 1)}px) / ${perView})`;
  const step = `calc(${itemWidth} + ${gap}px)`;

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(-${current} * ${step}))`,
          }}
        >
          {childItems.length > 0
            ? childItems.map((child, i) => (
                <div
                  key={i}
                  className="shrink-0"
                  style={{ width: itemWidth }}
                >
                  {child}
                </div>
              ))
            : null}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && itemsCount > perView && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-soft transition-all hover:shadow-premium hover:scale-110 md:-left-5 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-soft transition-all hover:shadow-premium hover:scale-110 md:-right-5 md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && itemsCount > perView && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 bg-brand-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
