'use client';

import { useQuery } from '@tanstack/react-query';
import { heroBannerSliderApi } from '@/lib/api';

export const heroSliderKeys = {
  list: ['hero-banner-sliders'] as const,
  public: ['public-hero-banner-sliders'] as const,
};

export function usePublicHeroSliders() {
  return useQuery({ queryKey: heroSliderKeys.public, queryFn: heroBannerSliderApi.publicList, staleTime: 2 * 60_000 });
}