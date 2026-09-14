'use client';

import { useQuery } from '@tanstack/react-query';
import { siteConfigurationApi } from '@/lib/api';

export function usePublicSiteConfiguration(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['public-site-configuration'],
    queryFn: siteConfigurationApi.publicGet,
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60_000,
  });
}