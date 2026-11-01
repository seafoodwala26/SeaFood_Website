'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Eye, ImageIcon, Save } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { AdminFormField } from '@/components/admin/admin-form-field';
import { ImageUpload } from '@/components/admin/image-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { bannerApi, type ApiBanner, type BannerPayload } from '@/lib/api';
import { useAdminFormErrors } from '@/components/admin/use-admin-form-errors';

const pages = [
  { slug: 'about', name: 'About' }, { slug: 'products', name: 'Products' },
  { slug: 'blog', name: 'Blog' }, { slug: 'contact', name: 'Contact' },
] as const;
type PageSlug = (typeof pages)[number]['slug'];
interface FormState extends BannerPayload { imageName: string; }
const blank = (slug: PageSlug): FormState => ({ pageSlug: slug, pageName: pages.find((page) => page.slug === slug)!.name, title: '', subtitle: '', description: '', overlayStart: '#131838', overlayEnd: '#6869b6', isActive: true, image: '', imageName: '' });
const fromBanner = (banner: ApiBanner): FormState => ({ pageSlug: banner.pageSlug, pageName: banner.pageName, title: banner.title, subtitle: banner.subtitle || '', description: banner.description, overlayStart: banner.overlayStart || '#131838', overlayEnd: banner.overlayEnd || '#6869b6', isActive: banner.isActive, image: banner.image?.url || '', imageName: banner.image?.originalName || '' });

export default function AdminBannersPage() {
  const queryClient = useQueryClient();
  const [activePage, setActivePage] = useState<PageSlug>('about');
  const [form, setForm] = useState<FormState>(blank('about'));
  const { fieldErrors, formError: error, setFieldErrors, handleError, clearFieldError, clearErrors } = useAdminFormErrors();
  const { data: banners = [], isLoading, error: loadError } = useQuery({ queryKey: ['banners'], queryFn: bannerApi.list });
  const existing = useMemo(() => banners.find((banner) => banner.pageSlug === activePage), [banners, activePage]);
  useEffect(() => { setForm(existing ? fromBanner(existing) : blank(activePage)); clearErrors(); }, [activePage, existing]);
  const saveMutation = useMutation({
    mutationFn: (payload: FormState) => existing ? bannerApi.update(existing._id, payload) : bannerApi.create(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['banners'] }); queryClient.invalidateQueries({ queryKey: ['public-banners'] }); },
    onError: handleError,
  });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    clearErrors();
    if (!form.title.trim()) return setFieldErrors({ title: 'Title is required.' });
    if (form.description.trim().length < 3) return setFieldErrors({ description: 'Subtitle must be at least 3 characters.' });
    if (!existing && !form.image) return setFieldErrors({ image: 'Background Image is required.' });
    saveMutation.mutate(form);
  };
  return <div className="space-y-6">
    <AdminPageHeader title="Edit Page Banners" description="Manage the About, Products, Blog, and Contact page hero banners." />
    {isLoading ? <p className="text-sm text-muted-foreground">Loading banners...</p> : <form onSubmit={submit} className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4">{pages.map((page) => <button key={page.slug} type="button" onClick={() => setActivePage(page.slug)} className={`px-3 py-4 text-sm font-medium transition-colors ${activePage === page.slug ? 'border-b-2 border-primary bg-primary/5 text-primary' : 'text-muted-foreground hover:bg-muted/50'}`}>{page.name}</button>)}</div>
      <div className="grid gap-6 p-4 lg:grid-cols-2 lg:p-6">
        <div className="space-y-5">
          <AdminFormField label="Background Image" htmlFor="banner-image" required error={fieldErrors.image} hint="Recommended: 1600px wide image"><ImageUpload value={form.image} fileName={form.imageName} onChange={(image, imageName) => { clearFieldError('image'); setForm((state) => ({ ...state, image, imageName: imageName || '' })); }} id="banner-image" aspectRatio="16/9" className={fieldErrors.image ? 'rounded-lg ring-1 ring-destructive' : undefined} /></AdminFormField>
          <AdminFormField label="Title" htmlFor="title" required error={fieldErrors.title}><Input id="title" value={form.title} onChange={(event) => { clearFieldError('title'); setForm((state) => ({ ...state, title: event.target.value })); }} placeholder={`Enter ${form.pageName} banner title`} /></AdminFormField>
          <AdminFormField label="Subtitle" htmlFor="subtitle" required error={fieldErrors.description}><Textarea id="subtitle" rows={3} value={form.description} onChange={(event) => { clearFieldError('description'); setForm((state) => ({ ...state, description: event.target.value })); }} placeholder="Short supporting message" /></AdminFormField>
          <div className="grid grid-cols-2 gap-4"><AdminFormField label="Overlay start" htmlFor="overlay-start" error={fieldErrors.overlayStart}><Input id="overlay-start" type="color" value={form.overlayStart} onChange={(event) => { clearFieldError('overlayStart'); setForm((state) => ({ ...state, overlayStart: event.target.value })); }} className="h-10 p-1" /></AdminFormField><AdminFormField label="Overlay end" htmlFor="overlay-end" error={fieldErrors.overlayEnd}><Input id="overlay-end" type="color" value={form.overlayEnd} onChange={(event) => { clearFieldError('overlayEnd'); setForm((state) => ({ ...state, overlayEnd: event.target.value })); }} className="h-10 p-1" /></AdminFormField></div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4"><span className="text-sm font-medium">Show banner on website</span><Switch checked={form.isActive} onCheckedChange={(isActive) => setForm((state) => ({ ...state, isActive }))} /></div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={saveMutation.isPending}>{saveMutation.isPending ? 'Saving...' : <><Save className="mr-2 h-4 w-4" />{existing ? `Update ${form.pageName} Banner` : `Create ${form.pageName} Banner`}</>}</Button>
        </div>
        <div><p className="mb-3 flex items-center gap-2 text-sm font-semibold"><Eye className="h-4 w-4 text-primary" />Live Preview</p><div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">{form.image ? <Image src={form.image} alt="Banner preview" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /> : <div className="flex h-full items-center justify-center"><ImageIcon className="h-10 w-10 text-muted-foreground" /></div>}<div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${form.overlayStart}dd, ${form.overlayEnd}cc)` }} /><div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white"><h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">{form.title || `${form.pageName} Banner`}</h2><p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">{form.description || 'Your banner subtitle will appear here.'}</p></div></div></div>
      </div>
    </form>}
    {loadError && <p className="text-sm text-destructive">{loadError instanceof Error ? loadError.message : 'Unable to load banners.'}</p>}
  </div>;
}
