'use client';

import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement>(rootMargin = '0px') {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const activateLazyLoading = () => setHasScrolled(true);

    if (window.scrollY > 0) {
      activateLazyLoading();
      return;
    }

    window.addEventListener('scroll', activateLazyLoading, { once: true, passive: true });
    return () => window.removeEventListener('scroll', activateLazyLoading);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView || !hasScrolled) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasScrolled, isInView, rootMargin]);

  return { ref, isInView };
}
