import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboardPage from '@/components/admin/admin-dashboard-page';
import { API_URL } from '@/lib/api';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
  let role: string | undefined;

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { Cookie: cookieHeader },
      cache: 'no-store',
    });
    if (response.ok) {
      const body = (await response.json()) as { data?: { user?: { role?: string } } };
      role = body.data?.user?.role;
    }
  } catch {
    // An unavailable API is handled as an unauthenticated session.
  }

  if (role !== 'admin') redirect('/admin/login');

  return <AdminDashboardPage />;
}
