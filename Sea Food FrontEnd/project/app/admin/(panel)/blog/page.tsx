'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2, FileText, Calendar } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import { blogCategories } from '@/lib/data/blog';
import { formatDate } from '@/lib/utils/format';
import { blogApi } from '@/lib/api';

export default function AdminBlogPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const queryClient = useQueryClient();
  const { data: posts = [], isLoading, error } = useQuery({ queryKey: ['blogs'], queryFn: blogApi.list });
 
  const deleteMutation = useMutation({
    mutationFn: blogApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  });
  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => blogApi.updateStatus(id, isActive),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  });

  const filtered = posts.filter((p) => {
    const matchSearch = p.blogTitle.toLowerCase().includes(search.toLowerCase().trim());
    const matchCategory = categoryFilter === 'all' || p.category.toLowerCase() === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this article permanently?')) deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Blog Posts"
        description="Write, edit, and publish articles with the rich text editor."
        actions={
          <Button asChild>
            <Link href="/admin/blog/new">
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Link>
          </Button>
        }
      />

      <div className="rounded-xl border border-border bg-card shadow-soft">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {blogCategories.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <span className="whitespace-nowrap text-sm text-muted-foreground">{filtered.length} articles</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Article</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p._id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {p.blogImg?.url && <Image src={p.blogImg.url} alt={p.blogTitle} fill sizes="56px" className="object-cover" />}
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <p className="truncate font-medium text-foreground">{p.blogTitle}</p>
                        <p className="truncate text-xs text-muted-foreground">{p.url}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className="border-primary/20 text-primary">{p.category}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(p.createdAt)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={p.isActive !== false ? 'default' : 'outline'}
                        className="min-w-24"
                        disabled={toggleActiveMutation.isPending}
                        onClick={() => toggleActiveMutation.mutate({ id: p._id, isActive: p.isActive === false })}
                      >
                        {p.isActive !== false ? 'Active' : 'Inactive'}
                      </Button>
                      {p.isFeatured && <Badge className="bg-brand-accent/10 text-brand-accent border border-brand-accent/20">Featured</Badge>}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                        <Link href={`/admin/blog/${p._id}`}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(p._id)} disabled={deleteMutation.isPending}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {(!isLoading && (error || filtered.length === 0)) && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="h-10 w-10 text-muted-foreground/40" />
            <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{error ? 'Unable to load articles' : 'No articles found'}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{error instanceof Error ? error.message : 'Try adjusting your filters or write a new article.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
