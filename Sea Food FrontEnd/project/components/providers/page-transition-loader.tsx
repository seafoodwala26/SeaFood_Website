'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { LogoLoader } from '@/components/ui/logo-loader';

export function PageTransitionLoader() {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  // When pathname finishes updating, dismiss loader
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  // Intercept internal link clicks to trigger seamless animated logo loader
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      // Only handle internal navigation links
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('/#') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        target.target !== '_blank' &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        const targetUrl = new URL(href, window.location.origin);
        if (targetUrl.pathname !== window.location.pathname) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });
    return () => document.removeEventListener('click', handleAnchorClick, { capture: true });
  }, []);

  // Safety fallback: auto dismiss after max 3.5 seconds
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-300">
      <LogoLoader fullscreen />
    </div>
  );
}

