'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { blogApi } from '@/lib/api';
import { mapApiBlog } from '@/lib/utils/catalog';

export const blogKeys = {
  list: (limit?: number) => ['public-blogs', limit ?? 12] as const,
  infinite: (category?: string, search?: string) =>
    ['public-blogs-infinite', category ?? 'all', search ?? ''] as const,
};

const PAGE_SIZE = 9;

export function usePublicBlogs(options?: { limit?: number; category?: string; enabled?: boolean }) {
  const limit = options?.limit ?? 3;

  return useQuery({
    queryKey: blogKeys.list(limit),
    queryFn: () => blogApi.publicList({ page: 1, limit, category: options?.category }),
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60_000,
    select: (response) => {
      return response.data.map(mapApiBlog);
    },
  });
}

export function usePublicBlogCategories() {
  return useQuery({
    queryKey: ['public-blog-categories'],
    queryFn: () => blogApi.publicList({ page: 1, limit: 100 }),
    staleTime: 5 * 60_000,
    select: (response) => Array.from(new Set(response.data.map((blog) => blog.category.trim()).filter(Boolean))),
  });
}

export function useInfinitePublicBlogs(options?: { category?: string; search?: string }) {
  const category = options?.category;
  const search = options?.search;

  return useInfiniteQuery({
    queryKey: blogKeys.infinite(category, search),
    queryFn: ({ pageParam }) =>
      blogApi.publicList({
        page: pageParam,
        limit: PAGE_SIZE,
        category: category && category !== 'all' ? category : undefined,
        search: search || undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    staleTime: 2 * 60_000,
    select: (data) => ({
      pages: data.pages.map((page, pageIndex) => {
        return { ...page, data: page.data.map(mapApiBlog) };
      }),
      pageParams: data.pageParams,
    }),
  });
}
