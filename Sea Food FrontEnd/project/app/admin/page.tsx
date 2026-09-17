'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import AdminDashboardPage from '@/components/admin/admin-dashboard-page';
import { authApi } from '@/lib/api';

export default function AdminPage() {
  const router = useRouter();
  const { data: user, isPending, isError } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.me,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isError || (user && user.role !== 'admin')) router.replace('/admin/login');
  }, [isError, router, user]);

  if (isPending || !user || user.role !== 'admin') return null;

  return <AdminDashboardPage />;
}
