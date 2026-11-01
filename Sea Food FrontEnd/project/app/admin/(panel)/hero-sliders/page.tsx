'use client';

import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit3, Eye, ImageIcon, Plus, Save, Trash2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { AdminFormField } from '@/components/admin/admin-form-field';
import { ImageUpload } from '@/components/admin/image-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { heroBannerSliderApi, type ApiHeroBannerSlider, type HeroBannerSliderPayload } from '@/lib/api';
import { heroSliderKeys } from '@/lib/hooks/use-hero-sliders';
import { useAdminFormErrors } from '@/components/admin/use-admin-form-errors';

interface FormState extends HeroBannerSliderPayload { imageName: string; }

const blank = (): FormState => ({
  image: '', imageName: '', alt: '', badge: '', title: '', highlight: '', description: '',
  primaryCta: { label: 'Browse Products', href: '/products' },
  secondaryCta: { label: 'Request a Quote', href: '/inquiry' },
  stats: [{ value: '40+', label: 'Countries Served' }], iconKey: 'fish', sortOrder: 0, isActive: true,
});

function fromApi(slide: ApiHeroBannerSlider): FormState {
  return { ...slide, image: slide.image?.url || '', imageName: slide.image?.originalName || '' };
}

export default function AdminHeroSlidersPage() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<ApiHeroBannerSlider | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(blank());
  const { fieldErrors, formError: error, setFieldErrors, handleError, clearFieldError, clearErrors } = useAdminFormErrors();
  const { data: slides = [], isLoading, error: loadError } = useQuery({ queryKey: heroSliderKeys.list, queryFn: heroBannerSliderApi.list });

  useEffect(() => { setForm(editing ? fromApi(editing) : blank()); clearErrors(); }, [editing]);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: heroSliderKeys.list });
    queryClient.invalidateQueries({ queryKey: heroSliderKeys.public });
  };
  const save = useMutation({
    mutationFn: (payload: FormState) => editing ? heroBannerSliderApi.update(editing._id, payload) : heroBannerSliderApi.create(payload),
    onSuccess: () => { refresh(); setEditing(null); setForm(blank()); setFormOpen(false); },
    onError: handleError,
  });
  const remove = useMutation({ mutationFn: heroBannerSliderApi.remove, onSuccess: refresh, onError: handleError });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    clearFieldError(String(key));
    setForm((state) => ({ ...state, [key]: value }));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    clearErrors();
    if (!form.image) return setFieldErrors({ image: 'Hero Image is required.' });
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = 'Title is required.';
    if (!form.highlight.trim()) errors.highlight = 'Highlight is required.';
    if (form.description.trim().length < 10) errors.description = 'Description must be at least 10 characters.';
    if (Object.keys(errors).length) return setFieldErrors(errors);
    save.mutate(form);
  };
  const setStat = (index: number, key: 'value' | 'label', value: string) => update('stats', form.stats.map((stat, i) => i === index ? { ...stat, [key]: value } : stat));

  const openCreate = () => { setEditing(null); setForm(blank()); clearErrors(); setFormOpen(true); };
  const openEdit = (slide: ApiHeroBannerSlider) => { setEditing(slide); setFormOpen(true); };
  const closeForm = () => { setEditing(null); setForm(blank()); clearErrors(); setFormOpen(false); };

  return <div className="space-y-6">
    <AdminPageHeader title="Hero Banner Sliders" description="Create and manage the homepage hero slides without changing page banners." />
    {!formOpen ? <div className="space-y-4">
      <div className="flex items-center justify-between"><h2 className="font-heading text-lg font-semibold">Hero Slides</h2><Button onClick={openCreate} size="sm"><Plus className="mr-2 h-4 w-4" />Create Slider</Button></div>
        {!isLoading && slides.length === 0 ? <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No hero slides yet. Add your first homepage slide.</div> : !isLoading && <div className="space-y-3">
          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-soft"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-border bg-muted/40"><tr><th className="px-4 py-3 font-semibold">Preview</th><th className="px-4 py-3 font-semibold">Title</th><th className="px-4 py-3 font-semibold">Badge</th><th className="px-4 py-3 font-semibold">Order</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 text-right font-semibold">Actions</th></tr></thead><tbody>
          {slides.map((slide) => <tr key={slide._id} className="border-b border-border last:border-0 hover:bg-muted/30">
            <td className="px-4 py-3"><div className="relative h-14 w-24 overflow-hidden rounded-md bg-muted">{slide.image?.url ? <Image src={slide.image.url} alt={slide.alt} fill sizes="96px" className="object-cover" /> : <ImageIcon className="m-auto h-6 w-6" />}</div></td><td className="max-w-[220px] truncate px-4 py-3 font-semibold">{slide.title}</td><td className="px-4 py-3 text-muted-foreground">{slide.badge}</td><td className="px-4 py-3 text-muted-foreground">{slide.sortOrder}</td><td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs ${slide.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'}`}>{slide.isActive ? 'Active' : 'Inactive'}</span></td><td className="px-4 py-3 text-right"><Button variant="ghost" size="icon" aria-label={`Edit ${slide.title}`} onClick={() => openEdit(slide)}><Edit3 className="h-4 w-4" /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${slide.title}`} onClick={() => window.confirm(`Delete ${slide.title}?`) && remove.mutate(slide._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></td>
          </tr>)}
          </tbody></table></div>
        </div>}
        {(loadError || error) && <p className="text-sm text-destructive">{error || (loadError instanceof Error ? loadError.message : 'Unable to load slides.')}</p>}
    </div> :
    <div className="mx-auto w-full max-w-4xl">

      <form onSubmit={submit} className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between"><h2 className="font-heading text-lg font-semibold">{editing ? 'Edit Slide' : 'Create Slider'}</h2><Button type="button" variant="ghost" size="sm" onClick={closeForm}>Cancel</Button></div>
        <AdminFormField label="Hero Image" htmlFor="hero-image" required error={fieldErrors.image} hint="Recommended: 1920px wide"><ImageUpload id="hero-image" value={form.image} fileName={form.imageName} onChange={(image, imageName) => { clearFieldError('image'); setForm((state) => ({ ...state, image, imageName: imageName || '' })); }} aspectRatio="16/9" className={fieldErrors.image ? 'rounded-lg ring-1 ring-destructive' : undefined} /></AdminFormField>
        <AdminFormField label="Image Alt Text" htmlFor="hero-alt" required error={fieldErrors.alt}><Input id="hero-alt" value={form.alt} onChange={(event) => update('alt', event.target.value)} /></AdminFormField>
        <div className="grid gap-4 sm:grid-cols-2"><AdminFormField label="Badge" htmlFor="hero-badge" required error={fieldErrors.badge}><Input id="hero-badge" value={form.badge} onChange={(event) => update('badge', event.target.value)} placeholder="Sustainably Sourced" /></AdminFormField><AdminFormField label="Icon" htmlFor="hero-icon" error={fieldErrors.iconKey}><select id="hero-icon" value={form.iconKey} onChange={(event) => update('iconKey', event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="fish">Fish</option><option value="shell">Shell</option><option value="anchor">Anchor</option></select></AdminFormField></div>
        <div className="grid gap-4 sm:grid-cols-2"><AdminFormField label="Title" htmlFor="hero-title" required error={fieldErrors.title}><Input id="hero-title" value={form.title} onChange={(event) => update('title', event.target.value)} /></AdminFormField><AdminFormField label="Highlight" htmlFor="hero-highlight" required error={fieldErrors.highlight}><Input id="hero-highlight" value={form.highlight} onChange={(event) => update('highlight', event.target.value)} /></AdminFormField></div>
        <AdminFormField label="Description" htmlFor="hero-description" required error={fieldErrors.description}><Textarea id="hero-description" rows={4} value={form.description} onChange={(event) => update('description', event.target.value)} /></AdminFormField>
        <div className="grid gap-4 sm:grid-cols-2"><AdminFormField label="Primary CTA Label" htmlFor="primary-label" error={fieldErrors['primaryCta.label']}><Input id="primary-label" value={form.primaryCta.label} onChange={(event) => { clearFieldError('primaryCta.label'); update('primaryCta', { ...form.primaryCta, label: event.target.value }); }} /></AdminFormField><AdminFormField label="Primary CTA URL" htmlFor="primary-href" error={fieldErrors['primaryCta.href']}><Input id="primary-href" value={form.primaryCta.href} onChange={(event) => { clearFieldError('primaryCta.href'); update('primaryCta', { ...form.primaryCta, href: event.target.value }); }} /></AdminFormField></div>
        <div className="grid gap-4 sm:grid-cols-2"><AdminFormField label="Secondary CTA Label" htmlFor="secondary-label" error={fieldErrors['secondaryCta.label']}><Input id="secondary-label" value={form.secondaryCta.label} onChange={(event) => { clearFieldError('secondaryCta.label'); update('secondaryCta', { ...form.secondaryCta, label: event.target.value }); }} /></AdminFormField><AdminFormField label="Secondary CTA URL" htmlFor="secondary-href" error={fieldErrors['secondaryCta.href']}><Input id="secondary-href" value={form.secondaryCta.href} onChange={(event) => { clearFieldError('secondaryCta.href'); update('secondaryCta', { ...form.secondaryCta, href: event.target.value }); }} /></AdminFormField></div>
        <div className="space-y-3"><div className="flex items-center justify-between"><span className="text-sm font-medium">Stats</span><Button type="button" variant="outline" size="sm" disabled={form.stats.length >= 6} onClick={() => update('stats', [...form.stats, { value: '', label: '' }])}><Plus className="mr-1 h-3.5 w-3.5" />Add</Button></div>{form.stats.map((stat, index) => <div key={index} className="flex gap-2"><div className="flex-1"><Input placeholder="40+" value={stat.value} onChange={(event) => { clearFieldError(`stats.${index}.value`); setStat(index, 'value', event.target.value); }} className={fieldErrors[`stats.${index}.value`] ? 'border-destructive focus-visible:ring-destructive' : undefined} />{fieldErrors[`stats.${index}.value`] && <p className="mt-1 text-xs text-destructive">{fieldErrors[`stats.${index}.value`]}</p>}</div><div className="flex-1"><Input placeholder="Countries Served" value={stat.label} onChange={(event) => { clearFieldError(`stats.${index}.label`); setStat(index, 'label', event.target.value); }} className={fieldErrors[`stats.${index}.label`] ? 'border-destructive focus-visible:ring-destructive' : undefined} />{fieldErrors[`stats.${index}.label`] && <p className="mt-1 text-xs text-destructive">{fieldErrors[`stats.${index}.label`]}</p>}</div><Button type="button" variant="ghost" size="icon" onClick={() => update('stats', form.stats.filter((_, i) => i !== index))} aria-label="Remove stat"><Trash2 className="h-4 w-4" /></Button></div>)}</div>
        <div className="grid gap-4 sm:grid-cols-2"><AdminFormField label="Display Order" htmlFor="sort-order" error={fieldErrors.sortOrder}><Input id="sort-order" type="number" min={0} value={form.sortOrder} onChange={(event) => update('sortOrder', Number(event.target.value))} /></AdminFormField><div className="flex items-center justify-between rounded-lg border border-border px-3"><span className="text-sm font-medium">Active</span><Switch checked={form.isActive} onCheckedChange={(value) => update('isActive', value)} /></div></div>
        <Button type="submit" className="w-full" disabled={save.isPending}><Save className="mr-2 h-4 w-4" />{editing ? 'Update Slide' : 'Create Slide'}</Button>
      </form>
    </div>}
  </div>;
}
