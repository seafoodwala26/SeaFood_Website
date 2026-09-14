'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/admin/theme-provider';
import { AdminHeader } from '@/components/admin/admin-header';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="flex min-h-screen bg-muted/30">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
