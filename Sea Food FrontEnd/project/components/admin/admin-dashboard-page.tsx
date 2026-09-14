'use client';

import Link from 'next/link';
import {
  Package,
  Tags,
  FileText,
  ClipboardList,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { AdminStatCard } from '@/components/admin/admin-stat-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { blogApi, categoryApi, inquiryApi, productApi } from '@/lib/api';

const recentOrders = [
  { id: 'OP-2026-0148', customer: 'PescaMar S.A.', country: 'Peru', product: 'Vannamei Shrimp 16-20', qty: 500, total: '$7,000', status: 'Processing' },
  { id: 'OP-2026-0147', customer: 'Nordic Seafood AS', country: 'Norway', product: 'Atlantic Salmon Fillet', qty: 200, total: '$3,600', status: 'Shipped' },
  { id: 'OP-2026-0146', customer: 'Lagos Fish Market', country: 'Nigeria', product: 'Yellowfin Tuna Loin', qty: 100, total: '$3,200', status: 'Pending' },
  { id: 'OP-2026-0145', customer: 'Pacific Marine Supply', country: 'New Zealand', product: 'Live American Lobster', qty: 48, total: '$3,240', status: 'Completed' },
  { id: 'OP-2026-0144', customer: 'Mediterraneo Pesca', country: 'Italy', product: 'Blue Point Oysters', qty: 200, total: '$300', status: 'Processing' },
];

const topProducts = [
  { name: 'Wild-Caught Yellowfin Tuna Loin', sales: 187, revenue: '$5,984', trend: '+12%' },
  { name: 'Atlantic Salmon Fillet (Fresh)', sales: 214, revenue: '$3,852', trend: '+8%' },
  { name: 'Tiger Shrimp (Head-On, Jumbo)', sales: 156, revenue: '$3,744', trend: '+24%' },
  { name: 'Vannamei Shrimp (Peeled & Deveined)', sales: 142, revenue: '$1,988', trend: '+5%' },
];

const statusColors: Record<string, string> = {
  Processing: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Shipped: 'bg-primary/10 text-primary border-primary/20',
  Pending: 'bg-muted text-muted-foreground border-border',
  Completed: 'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
};

export default function AdminDashboardPage() {
  const productsQuery = useQuery({
    queryKey: ['admin-dashboard-products-count'],
    queryFn: () => productApi.list({ page: 1, limit: 1 }),
  });
  const categoriesQuery = useQuery({
    queryKey: ['admin-dashboard-categories-count'],
    queryFn: categoryApi.list,
  });
  const blogsQuery = useQuery({
    queryKey: ['admin-dashboard-blogs-count'],
    queryFn: () => blogApi.publicList({ page: 1, limit: 1 }),
  });
  const inquiriesQuery = useQuery({
    queryKey: ['admin-dashboard-inquiries-count'],
    queryFn: inquiryApi.list,
  });

  const count = (value: number | undefined, isLoading: boolean) => (isLoading ? '...' : String(value ?? 0));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="Welcome back, Robert. Here's what's happening with your store today."
      />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total Products" icon={Package} value={count(productsQuery.data?.pagination.total, productsQuery.isLoading)} accent="primary" />
        <AdminStatCard label="Total Categories" icon={Tags} value={count(categoriesQuery.data?.length, categoriesQuery.isLoading)} accent="accent" />
        <AdminStatCard label="Total Blogs" icon={FileText} value={count(blogsQuery.data?.pagination.total, blogsQuery.isLoading)} accent="violet" />
        <AdminStatCard label="Total Inquiries" icon={ClipboardList} value={count(inquiriesQuery.data?.length, inquiriesQuery.isLoading)} accent="amber" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent orders */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card shadow-soft">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="font-heading text-lg font-semibold text-foreground">Recent Orders</h2>
                <p className="text-sm text-muted-foreground">Latest wholesale and export orders</p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/inquiries">
                  View all
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Order ID</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Product</th>
                    <th className="px-5 py-3 font-medium">Total</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs font-medium text-foreground">{order.id}</td>
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-foreground">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.country}</p>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">{order.product}</td>
                      <td className="px-5 py-3.5 font-semibold text-foreground">{order.total}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant="outline" className={statusColors[order.status]}>
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top products */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-heading text-lg font-semibold text-foreground">Top Products</h2>
            <p className="text-sm text-muted-foreground">Best sellers this month</p>
            <div className="mt-4 space-y-4">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.sales} sales · {p.revenue}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-brand-accent">
                    <TrendingUp className="h-3 w-3" />
                    {p.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
