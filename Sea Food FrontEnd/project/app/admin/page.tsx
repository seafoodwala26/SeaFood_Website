'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboardPage from '@/components/admin/admin-dashboard-page';
import { authApi } from '@/lib/api';

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    const checkAdmin = async () => {
      try {
        const user = await authApi.me();
        if (!active) return;

        if (user.role !== 'admin') {
          router.replace('/admin/login');
          return;
        }

        setAuthorized(true);
      } catch {
        if (!active) return;
        router.replace('/admin/login');
      }
    };

    checkAdmin();

    return () => {
      active = false;
    };
  }, [router]);

  if (!authorized) {
    return null;
  }

  return <AdminDashboardPage />;
}
