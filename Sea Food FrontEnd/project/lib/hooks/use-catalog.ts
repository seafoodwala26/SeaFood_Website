'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { categoryApi, productApi } from '@/lib/api';
import { mapApiCategory, mapApiProduct } from '@/lib/utils/catalog';

export const catalogKeys = {
  categories: ['public-categories'] as const,
  products: (category?: string, limit?: number) => ['public-products', category ?? 'all', limit ?? 20] as const,
  productsInfinite: (category?: string, search?: string) =>
    ['public-products-infinite', category ?? 'all', search ?? ''] as const,
};

const PAGE_SIZE = 12;

export function usePublicCategories(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: catalogKeys.categories,
    queryFn: categoryApi.publicList,
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60_000,
    select: (data) => {
      return data.map((cat) => mapApiCategory(cat));
    },
  });
}

export function usePublicProducts(options?: { category?: string; limit?: number; enabled?: boolean }) {
  const category = options?.category;
  const limit = options?.limit ?? 20;

  return useQuery({
    queryKey: catalogKeys.products(category, limit),
    queryFn: () => productApi.publicList({ page: 1, limit, category }),
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60_000,
    select: (response) => {
      return response.data.map(mapApiProduct);
    },
  });
}

export function useInfinitePublicProducts(options?: {
  category?: string;
  search?: string;
  limit?: number;
}) {
  const category = options?.category;
  const search = options?.search;
  const limit = options?.limit ?? PAGE_SIZE;

  return useInfiniteQuery({
    queryKey: catalogKeys.productsInfinite(category, search),
    queryFn: ({ pageParam }) =>
      productApi.publicList({ page: pageParam, limit, category, search: search || undefined }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    staleTime: 2 * 60_000,
    select: (data) => ({
      pages: data.pages.map((page) => {
        return { ...page, data: page.data.map(mapApiProduct) };
      }),
      pageParams: data.pageParams,
    }),
  });
}

export function useCategoryProducts(categoryId: string | null, enabled = true) {
  return usePublicProducts({
    category: categoryId ?? undefined,
    limit: 10,
    enabled: enabled && Boolean(categoryId),
  });
}
