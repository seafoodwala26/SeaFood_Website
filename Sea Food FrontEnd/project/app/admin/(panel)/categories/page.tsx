'use client';

import { FormEvent, useMemo, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, ChevronLeft, ChevronRight, FolderTree, Loader2, Pencil, Plus, Save, Search, Trash2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { AdminFormField } from '@/components/admin/admin-form-field';
import { ImageUpload } from '@/components/admin/image-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { categoryApi, type CategoryPayload } from '@/lib/api';

const emptyForm: CategoryPayload = { catName: '', description: '', metaTitle: '', metaDescription: '', image: '', imageName: '' };
const PAGE_SIZE = 5;

export default function AdminCategoriesPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CategoryPayload>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { data: categories = [], isLoading, error: loadError } = useQuery({ queryKey: ['categories'], queryFn: categoryApi.list });

  const filtered = useMemo(
    () => categories.filter((category) => category.catName.toLowerCase().includes(search.trim().toLowerCase())),
    [categories, search],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const currentItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const saveMutation = useMutation({
    mutationFn: (payload: CategoryPayload) => editingId ? categoryApi.update(editingId, payload) : categoryApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      setPage(1);
    },
    onError: (requestError: Error) => setError(requestError.message),
  });

  const deleteMutation = useMutation({
    mutationFn: categoryApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setPage(1);
    },
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.catName.trim() || form.description.trim().length < 10 || (!editingId && !form.image)) {
      return setError(editingId ? 'Name and a 10-character description are required.' : 'Name, a 10-character description, and an image are required.');
    }
    setError(null);
    saveMutation.mutate(form);
  };

  const handleOpenAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
    setShowForm(true);
  };

  const handleOpenEditForm = (category: (typeof categories)[number]) => {
    setForm({
      catName: category.catName,
      description: category.description,
      metaTitle: category.metaTitle || '',
      metaDescription: category.metaDescription || '',
      image: category.image?.url || '',
      imageName: category.image?.originalName || '',
    });
    setEditingId(category._id);
    setError(null);
    setShowForm(true);
  };

  return <div className="space-y-6">
    <AdminPageHeader title="Product Categories" description="Add, edit, and delete categories saved in your backend." actions={<Button onClick={handleOpenAddForm}><Plus className="mr-2 h-4 w-4" />Add Category</Button>} />
    {showForm && <form onSubmit={submit} className="rounded-xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditingId(null); setError(null); }} className="h-8 px-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1.5 h-4 w-4" />Back
          </Button>
          <h2 className="font-heading text-lg font-semibold">{editingId ? 'Edit Product Category' : 'Add Product Category'}</h2>
        </div>
        <Button type="button" variant="ghost" size="icon" onClick={() => { setShowForm(false); setEditingId(null); setError(null); }} aria-label="Close form">
          <ChevronRight className="h-4 w-4 rotate-45" />
        </Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <AdminFormField label="Category Name" htmlFor="category-name" required className="md:col-span-2"><Input id="category-name" value={form.catName} onChange={(event) => setForm((state) => ({ ...state, catName: event.target.value }))} placeholder="e.g. Fresh Fish" /></AdminFormField>
        <AdminFormField label="Description" htmlFor="category-description" required className="md:col-span-2"><Textarea id="category-description" rows={3} value={form.description} onChange={(event) => setForm((state) => ({ ...state, description: event.target.value }))} placeholder="At least 10 characters" /></AdminFormField>
        <AdminFormField label="Category Image" htmlFor="category-image" required><ImageUpload id="category-image" value={form.image} fileName={form.imageName} onChange={(image, imageName) => setForm((state) => ({ ...state, image, imageName: imageName || '' }))} aspectRatio="4/3" /></AdminFormField>
        <div className="space-y-5"><AdminFormField label="Meta Title" htmlFor="meta-title"><Input id="meta-title" value={form.metaTitle} placeholder="Enter SEO meta title" onChange={(event) => setForm((state) => ({ ...state, metaTitle: event.target.value }))} /></AdminFormField><AdminFormField label="Meta Description" htmlFor="meta-description"><Textarea id="meta-description" rows={2} value={form.metaDescription} placeholder="Enter SEO meta description" onChange={(event) => setForm((state) => ({ ...state, metaDescription: event.target.value }))} /></AdminFormField></div>
      </div>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <div className="mt-5 flex gap-3"><Button type="submit" disabled={saveMutation.isPending}>{saveMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}{editingId ? 'Update Category' : 'Save Category'}</Button><Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null); setError(null); }}>Cancel</Button></div>
    </form>}
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between"><div className="relative max-w-xs flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search categories..." className="pl-9" /></div><span className="text-sm text-muted-foreground">{filtered.length} categories</span></div>
      <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground"><th className="px-5 py-3">Image</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">Description</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody>{currentItems.map((category) => <tr key={category._id} className="border-t border-border"><td className="px-5 py-3"><div className="relative h-12 w-16 overflow-hidden rounded-md bg-muted">{category.image?.url && <Image src={category.image.url} alt={category.catName} fill sizes="64px" className="object-cover" />}</div></td><td className="px-5 py-3 font-medium">{category.catName}</td><td className="max-w-md px-5 py-3 text-muted-foreground"><p className="line-clamp-2">{category.description}</p></td><td className="px-5 py-3"><div className="flex justify-end gap-2"><Button size="sm" variant="outline" onClick={() => handleOpenEditForm(category)}><Pencil className="mr-1.5 h-3.5 w-3.5" />Edit</Button><Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" disabled={deleteMutation.isPending} onClick={() => { if (window.confirm(`Delete ${category.catName}?`)) deleteMutation.mutate(category._id); }}><Trash2 className="mr-1.5 h-3.5 w-3.5" />Delete</Button></div></td></tr>)}</tbody></table></div>
      {isLoading && <div className="flex flex-col items-center justify-center py-14 text-center"><FolderTree className="h-9 w-9 text-muted-foreground/40" /><p className="mt-3 text-sm text-muted-foreground">Loading categories...</p></div>}
      {!isLoading && loadError && <div className="flex flex-col items-center justify-center py-14 text-center"><FolderTree className="h-9 w-9 text-muted-foreground/40" /><p className="mt-3 text-sm text-muted-foreground">{loadError instanceof Error ? loadError.message : 'Something went wrong while loading categories.'}</p></div>}
      {!isLoading && !loadError && filtered.length === 0 && <div className="flex flex-col items-center justify-center py-14 text-center"><FolderTree className="h-9 w-9 text-muted-foreground/40" /><p className="mt-3 text-sm text-muted-foreground">No categories have been added yet.</p></div>}
      {!isLoading && !loadError && filtered.length > 0 && <div className="border-t border-border p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}-{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}</p>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}><ChevronLeft className="mr-1.5 h-4 w-4" />Previous</Button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <Button key={pageNumber} type="button" variant={pageNumber === currentPage ? 'default' : 'outline'} size="sm" className="min-w-9 px-2" onClick={() => setPage(pageNumber)}>{pageNumber}</Button>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages}>Next<ChevronRight className="ml-1.5 h-4 w-4" /></Button>
          </div>
        </div>
      </div>}
    </div>
  </div>;
}
