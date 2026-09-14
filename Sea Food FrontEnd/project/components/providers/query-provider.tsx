'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { SiteConfigurationProvider } from '@/components/providers/site-configuration-provider';

/** Provides the shared React Query cache required by useQuery and useMutation. */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SiteConfigurationProvider>{children}</SiteConfigurationProvider>
    </QueryClientProvider>
  );
}
