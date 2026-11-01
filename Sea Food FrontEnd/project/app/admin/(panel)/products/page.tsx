'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, ChevronDown, ChevronLeft, ChevronRight, Loader2, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { AdminFormField } from '@/components/admin/admin-form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { productApi, categoryApi, type ApiProduct, type ProductPayload } from '@/lib/api';
import { useAdminFormErrors } from '@/components/admin/use-admin-form-errors';

const emptyForm: ProductPayload = { title: '', category: '', images: [], imageNames: [], description: '', features: [], metaTitle: '', metaDescription: '', faqs: [], isActive: true };
const PAGE_SIZE = 10;

type CategoryOption = { _id: string; catName: string };

function CategoryPicker({ categories, value, onChange, allowAll = false, placeholder = 'Select category' }: { categories: CategoryOption[]; value: string; onChange: (value: string) => void; allowAll?: boolean; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);
  const selectedCategory = categories.find((item) => item._id === value);
  const visibleCategories = categories.filter((item) => item.catName.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [open]);

  const selectCategory = (categoryId: string) => {
    onChange(categoryId);
    setQuery('');
    setOpen(false);
  };

  return <div ref={pickerRef} className="relative">
    <button type="button" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors hover:bg-accent/40 focus:ring-2 focus:ring-ring" onClick={() => setOpen((current) => !current)} aria-haspopup="listbox" aria-expanded={open}>
      <span className={selectedCategory || (allowAll && value === 'all') ? 'text-foreground' : 'text-muted-foreground'}>{selectedCategory?.catName || (allowAll && value === 'all' ? 'All Categories' : placeholder)}</span>
      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-border bg-popover p-1.5 text-popover-foreground shadow-lg">
      <div className="relative mb-1.5">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search category..." className="h-9 border-0 bg-muted/40 pl-8 shadow-none focus-visible:ring-1" />
      </div>
      <div className="max-h-56 overflow-y-auto" role="listbox">
        {allowAll && <button type="button" className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm hover:bg-accent" onClick={() => selectCategory('all')}><span>All Categories</span>{value === 'all' && <Check className="h-4 w-4 text-primary" />}</button>}
        {visibleCategories.map((item) => <button type="button" key={item._id} className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm hover:bg-accent" onClick={() => selectCategory(item._id)}><span>{item.catName}</span>{value === item._id && <Check className="h-4 w-4 text-primary" />}</button>)}
        {!visibleCategories.length && <p className="px-2.5 py-3 text-center text-xs text-muted-foreground">No categories found</p>}
      </div>
    </div>}
  </div>;
}

function readImages(files: FileList | null, onImage: (image: string, name: string) => void) {
  if (!files?.length) return;
  Array.from(files).forEach((file) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => onImage(reader.result as string, file.name);
    reader.readAsDataURL(file);
  });
}

export default function AdminProductsPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductPayload>(emptyForm);
  const [featureInput, setFeatureInput] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const { fieldErrors, formError: error, setFieldErrors, handleError, clearFieldError, clearErrors } = useAdminFormErrors();
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: categoryApi.list });
  const { data, isLoading, isError } = useQuery({ queryKey: ['products', page, search, category], queryFn: () => productApi.list({ page, limit: PAGE_SIZE, search, category: category === 'all' ? undefined : category }) });
  const products = data?.data || [];
  const pagination = data?.pagination;

  useEffect(() => { setPage(1); }, [search, category]);

  const saveMutation = useMutation({
    mutationFn: (payload: ProductPayload) => editingId ? productApi.update(editingId, payload) : productApi.create(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['products'] }); closeForm(); },
    onError: handleError,
  });
  const deleteMutation = useMutation({ mutationFn: productApi.remove, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }) });
  const toggleActiveMutation = useMutation({
    mutationFn: ({ product, isActive }: { product: ApiProduct; isActive: boolean }) => productApi.update(product._id, {
      title: product.title,
      category: product.category._id,
      images: product.images.map((image) => image.url),
      imageNames: product.images.map((image) => image.originalName || ''),
      description: product.description,
      features: product.features || [],
      metaTitle: product.metaTitle || '',
      metaDescription: product.metaDescription || '',
      faqs: product.faqs || [],
      isActive,
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    onError: handleError,
  });

  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(emptyForm); setFeatureInput(''); clearErrors(); };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    clearErrors();
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = 'Title is required.';
    if (!form.category) errors.category = 'Category is required.';
    if (!form.description.trim()) errors.description = 'Description is required.';
    if (!form.images.length) errors.images = 'At least one Product Image is required.';
    if (Object.keys(errors).length) return setFieldErrors(errors);
    saveMutation.mutate(form);
  };
  const edit = (product: ApiProduct) => {
    clearErrors();
    setForm({ title: product.title, category: product.category._id, images: product.images.map((image) => image.url), imageNames: product.images.map((image) => image.originalName || ''), description: product.description, features: product.features || [], metaTitle: product.metaTitle || '', metaDescription: product.metaDescription || '', faqs: product.faqs || [], isActive: product.isActive });
    setFeatureInput('');
    setEditingId(product._id); setShowForm(true);
  };
  const updateField = <K extends keyof ProductPayload>(key: K, value: ProductPayload[K]) => {
    clearFieldError(String(key));
    setForm((current) => ({ ...current, [key]: value }));
  };
  const addFeature = () => {
    const value = featureInput.trim();
    if (!value) return;
    updateField('features', [...form.features, value]);
    setFeatureInput('');
  };
  const removeFeature = (index: number) => updateField('features', form.features.filter((_, featureIndex) => featureIndex !== index));
  const addFaq = () => updateField('faqs', [...form.faqs, { question: '', answer: '' }]);
  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => updateField('faqs', form.faqs.map((faq, faqIndex) => faqIndex === index ? { ...faq, [field]: value } : faq));
  const removeFaq = (index: number) => updateField('faqs', form.faqs.filter((_, faqIndex) => faqIndex !== index));

  return <div className="space-y-6">
    <AdminPageHeader
      title={showForm ? (editingId ? 'Edit Product' : 'Create Product') : 'Products'}
      breadcrumbItems={showForm ? [
        { label: 'Products List', href: '/admin/products' },
        { label: editingId ? 'Edit Product' : 'Create Product' },
      ] : [
        { label: 'Products List', href: '/admin/products' },
      ]}
      description="Manage products saved in your backend."
      actions={!showForm && <Button onClick={() => { setForm(emptyForm); setFeatureInput(''); setEditingId(null); clearErrors(); setShowForm(true); }}><Plus className="mr-2 h-4 w-4" />Add Product</Button>}
    />
    {showForm && <form onSubmit={submit} className="rounded-xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-center justify-between"><h2 className="font-heading text-lg font-semibold">{editingId ? 'Edit Product' : 'Add Product'}</h2><Button type="button" variant="ghost" size="icon" onClick={closeForm}><X className="h-4 w-4" /></Button></div>
      <div className="grid gap-5 md:grid-cols-2">
        <AdminFormField label="Product Title" htmlFor="product-title" required error={fieldErrors.title}><Input id="product-title" value={form.title} placeholder="Enter product title" onChange={(event) => updateField('title', event.target.value)} /></AdminFormField>
        <AdminFormField label="Category" htmlFor="product-category" required error={fieldErrors.category}><CategoryPicker categories={categories} value={form.category} onChange={(value) => updateField('category', value)} /></AdminFormField>
        <AdminFormField label="Description" htmlFor="product-description" required error={fieldErrors.description} className="md:col-span-2"><Textarea id="product-description" rows={4} value={form.description} placeholder="Write a detailed product description" onChange={(event) => updateField('description', event.target.value)} /></AdminFormField>
        <AdminFormField label="Product Images" htmlFor="product-images" required error={fieldErrors.images || fieldErrors.existingImages} className="md:col-span-2"><Input id="product-images" type="file" accept="image/png,image/jpeg,image/webp" multiple aria-label="Select product images" onChange={(event) => { clearFieldError('images'); clearFieldError('existingImages'); readImages(event.target.files, (image, name) => setForm((current) => ({ ...current, images: [...current.images, image], imageNames: [...(current.imageNames || []), name] }))); }} /><div className="mt-3 flex flex-wrap gap-3">{form.images.map((image, index) => <div key={`${image}-${index}`} className="relative h-20 w-24 overflow-hidden rounded-md bg-muted"><Image src={image} alt={`Product image ${index + 1}`} fill sizes="96px" className="object-cover" /><button type="button" aria-label="Remove image" className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white" onClick={() => updateField('images', form.images.filter((_, imageIndex) => imageIndex !== index))}><X className="h-3 w-3" /></button></div>)}</div></AdminFormField>
        <AdminFormField label="Features" htmlFor="product-features" required error={fieldErrors.features} className="md:col-span-2">
          <div className="flex gap-2">
            <Input id="product-features" value={featureInput} placeholder="e.g. Material: PP, Weight: 500g" onChange={(event) => setFeatureInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addFeature(); } }} />
            <Button type="button" variant="outline" onClick={addFeature}><Plus className="mr-1.5 h-4 w-4" />Add</Button>
          </div>
          {form.features.length === 0 ? <p className="text-xs italic text-muted-foreground">No items added yet</p> : <div className="space-y-2">{form.features.map((feature, index) => <div key={`${feature}-${index}`} className="flex items-center justify-between rounded-md border border-border bg-muted/20 px-3 py-2 text-sm"><span>{feature}</span><Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive" aria-label={`Remove feature ${index + 1}`} onClick={() => removeFeature(index)}><X className="h-3.5 w-3.5" /></Button></div>)}</div>}
        </AdminFormField>
        <div className="space-y-6 rounded-xl border border-border bg-card p-5 shadow-soft md:col-span-2 sm:p-6">
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">SEO Details</h2>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <AdminFormField label="Meta Title" htmlFor="meta-title" error={fieldErrors.metaTitle}><Input id="meta-title" value={form.metaTitle} placeholder="Enter SEO meta title" onChange={(event) => updateField('metaTitle', event.target.value)} /></AdminFormField>
              <AdminFormField label="Meta Description" htmlFor="meta-description" error={fieldErrors.metaDescription}><Textarea id="meta-description" rows={2} value={form.metaDescription} placeholder="Enter SEO meta description" onChange={(event) => updateField('metaDescription', event.target.value)} /></AdminFormField>
            </div>
          </div>
          <div className="border-t border-border pt-5">
            <div className="flex items-center justify-between"><div><h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">FAQ Section</h2><p className="mt-1 text-xs text-muted-foreground">Add frequently asked questions with answers for SEO</p></div><Button type="button" variant="outline" size="sm" onClick={addFaq}><Plus className="mr-1.5 h-3.5 w-3.5" />Add FAQ</Button></div>
            <div className="mt-4 space-y-4">{form.faqs.length === 0 && <p className="text-sm italic text-muted-foreground">No FAQs added yet. Click &quot;Add FAQ&quot; to create one.</p>}{form.faqs.map((faq, index) => <div key={index} className="rounded-lg border border-border bg-muted/20 p-4"><div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">FAQ {index + 1}</span><Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeFaq(index)}><Trash2 className="h-3.5 w-3.5" /></Button></div><div className="mt-3 space-y-3"><div><label className="text-xs font-medium text-muted-foreground" htmlFor={`faq-question-${index}`}>Question</label><Input id={`faq-question-${index}`} value={faq.question} onChange={(event) => { clearFieldError(`faqs.${index}.question`); updateFaq(index, 'question', event.target.value); }} placeholder="Enter the question..." className={`mt-1 ${fieldErrors[`faqs.${index}.question`] ? 'border-destructive focus-visible:ring-destructive' : ''}`} />{fieldErrors[`faqs.${index}.question`] && <p className="mt-1 text-xs text-destructive">{fieldErrors[`faqs.${index}.question`]}</p>}</div><div><label className="text-xs font-medium text-muted-foreground" htmlFor={`faq-answer-${index}`}>Answer</label><Textarea id={`faq-answer-${index}`} value={faq.answer} onChange={(event) => { clearFieldError(`faqs.${index}.answer`); updateFaq(index, 'answer', event.target.value); }} placeholder="Enter the answer..." rows={2} className={`mt-1 ${fieldErrors[`faqs.${index}.answer`] ? 'border-destructive focus-visible:ring-destructive' : ''}`} />{fieldErrors[`faqs.${index}.answer`] && <p className="mt-1 text-xs text-destructive">{fieldErrors[`faqs.${index}.answer`]}</p>}</div></div></div>)}</div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3"><Switch id="is-active" checked={form.isActive} onCheckedChange={(value) => updateField('isActive', value)} /><label htmlFor="is-active" className="text-sm font-medium">Is Active</label></div>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <div className="mt-5 flex gap-3"><Button type="submit" disabled={saveMutation.isPending}>{saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editingId ? 'Update Product' : 'Save Product'}</Button><Button type="button" variant="outline" onClick={closeForm}>Cancel</Button></div>
    </form>}
    {!showForm && <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft"><div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between"><div className="relative max-w-xs flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." className="pl-9" /></div><div className="w-full sm:w-[220px]"><CategoryPicker categories={categories} value={category} onChange={setCategory} allowAll /></div></div>
      {isLoading ? <p className="p-10 text-center text-sm text-muted-foreground">Loading products...</p> : isError ? <p className="p-10 text-center text-sm text-destructive">Unable to load products.</p> : <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground"><th className="px-5 py-3">Product</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">Image</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody>{products.map((product) => <tr key={product._id} className="border-t border-border"><td className="px-5 py-3 font-medium">{product.title}</td><td className="px-5 py-3 text-muted-foreground">{product.category?.catName}</td><td className="px-5 py-3"><div className="relative h-12 w-16 overflow-hidden rounded-md bg-muted">{product.images[0]?.url ? <Image src={product.images[0].url} alt={product.title} fill sizes="64px" className="object-cover" /> : <span className="flex h-full items-center justify-center text-[10px] text-muted-foreground">No image</span>}</div></td><td className="px-5 py-3"><Button size="sm" variant={product.isActive ? 'default' : 'outline'} className="min-w-24" disabled={toggleActiveMutation.isPending} onClick={() => toggleActiveMutation.mutate({ product, isActive: !product.isActive })}>{toggleActiveMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : product.isActive ? 'Active' : 'Inactive'}</Button></td><td className="px-5 py-3"><div className="flex justify-end gap-2"><Button size="sm" variant="outline" onClick={() => edit(product)}><Pencil className="mr-1.5 h-3.5 w-3.5" />Edit</Button><Button size="sm" variant="ghost" className="text-destructive" onClick={() => window.confirm(`Delete ${product.title}?`) && deleteMutation.mutate(product._id)}><Trash2 className="mr-1.5 h-3.5 w-3.5" />Delete</Button></div></td></tr>)}</tbody></table></div>}
      {!isLoading && pagination && pagination.totalPages > 0 && <div className="flex items-center justify-between border-t border-border p-4"><span className="text-sm text-muted-foreground">{pagination.total} products</span><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setPage((value) => value - 1)} disabled={page <= 1}><ChevronLeft className="h-4 w-4" />Previous</Button><span className="px-2 py-2 text-sm">{page} / {pagination.totalPages}</span><Button size="sm" variant="outline" onClick={() => setPage((value) => value + 1)} disabled={page >= pagination.totalPages}>Next<ChevronRight className="h-4 w-4" /></Button></div></div>}
    </div>}
  </div>;
}
