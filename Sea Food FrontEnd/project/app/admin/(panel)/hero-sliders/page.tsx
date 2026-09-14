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
  const [error, setError] = useState('');
  const { data: slides = [], isLoading, error: loadError } = useQuery({ queryKey: heroSliderKeys.list, queryFn: heroBannerSliderApi.list });

  useEffect(() => { setForm(editing ? fromApi(editing) : blank()); setError(''); }, [editing]);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: heroSliderKeys.list });
    queryClient.invalidateQueries({ queryKey: heroSliderKeys.public });
  };
  const save = useMutation({
    mutationFn: (payload: FormState) => editing ? heroBannerSliderApi.update(editing._id, payload) : heroBannerSliderApi.create(payload),
    onSuccess: () => { refresh(); setEditing(null); setForm(blank()); setFormOpen(false); },
    onError: (requestError: Error) => setError(requestError.message),
  });
  const remove = useMutation({ mutationFn: heroBannerSliderApi.remove, onSuccess: refresh, onError: (requestError: Error) => setError(requestError.message) });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((state) => ({ ...state, [key]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.image) return setError('Hero image is required.');
    if (!form.title.trim() || !form.highlight.trim() || form.description.trim().length < 10) return setError('Title, highlight and a 10 character description are required.');
    setError(''); save.mutate(form);
  };
  const setStat = (index: number, key: 'value' | 'label', value: string) => update('stats', form.stats.map((stat, i) => i === index ? { ...stat, [key]: value } : stat));

  const openCreate = () => { setEditing(null); setForm(blank()); setError(''); setFormOpen(true); };
  const openEdit = (slide: ApiHeroBannerSlider) => { setEditing(slide); setFormOpen(true); };
  const closeForm = () => { setEditing(null); setForm(blank()); setError(''); setFormOpen(false); };

  return <div className="space-y-6">
    <AdminPageHeader title="Hero Banner Sliders" description="Create and manage the homepage hero slides without changing page banners." />
    {!formOpen ? <div className="space-y-4">
      <div className="flex items-center justify-between"><h2 className="font-heading text-lg font-semibold">Hero Slides</h2><Button onClick={openCreate} size="sm"><Plus className="mr-2 h-4 w-4" />Create Slider</Button></div>
        {isLoading ? <p className="text-sm text-muted-foreground">Loading hero sliders...</p> : slides.length === 0 ? <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No hero slides yet. Add your first homepage slide.</div> : <div className="space-y-3">
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
        <AdminFormField label="Hero Image" htmlFor="hero-image" required hint="Recommended: 1920px wide"><ImageUpload id="hero-image" value={form.image} fileName={form.imageName} onChange={(image, imageName) => setForm((state) => ({ ...state, image, imageName: imageName || '' }))} aspectRatio="16/9" /></AdminFormField>
        <AdminFormField label="Image Alt Text" htmlFor="hero-alt" required><Input id="hero-alt" value={form.alt} onChange={(event) => update('alt', event.target.value)} /></AdminFormField>
        <div className="grid gap-4 sm:grid-cols-2"><AdminFormField label="Badge" htmlFor="hero-badge" required><Input id="hero-badge" value={form.badge} onChange={(event) => update('badge', event.target.value)} placeholder="Sustainably Sourced" /></AdminFormField><AdminFormField label="Icon" htmlFor="hero-icon"><select id="hero-icon" value={form.iconKey} onChange={(event) => update('iconKey', event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="fish">Fish</option><option value="shell">Shell</option><option value="anchor">Anchor</option></select></AdminFormField></div>
        <div className="grid gap-4 sm:grid-cols-2"><AdminFormField label="Title" htmlFor="hero-title" required><Input id="hero-title" value={form.title} onChange={(event) => update('title', event.target.value)} /></AdminFormField><AdminFormField label="Highlight" htmlFor="hero-highlight" required><Input id="hero-highlight" value={form.highlight} onChange={(event) => update('highlight', event.target.value)} /></AdminFormField></div>
        <AdminFormField label="Description" htmlFor="hero-description" required><Textarea id="hero-description" rows={4} value={form.description} onChange={(event) => update('description', event.target.value)} /></AdminFormField>
        <div className="grid gap-4 sm:grid-cols-2"><AdminFormField label="Primary CTA Label" htmlFor="primary-label"><Input id="primary-label" value={form.primaryCta.label} onChange={(event) => update('primaryCta', { ...form.primaryCta, label: event.target.value })} /></AdminFormField><AdminFormField label="Primary CTA URL" htmlFor="primary-href"><Input id="primary-href" value={form.primaryCta.href} onChange={(event) => update('primaryCta', { ...form.primaryCta, href: event.target.value })} /></AdminFormField></div>
        <div className="grid gap-4 sm:grid-cols-2"><AdminFormField label="Secondary CTA Label" htmlFor="secondary-label"><Input id="secondary-label" value={form.secondaryCta.label} onChange={(event) => update('secondaryCta', { ...form.secondaryCta, label: event.target.value })} /></AdminFormField><AdminFormField label="Secondary CTA URL" htmlFor="secondary-href"><Input id="secondary-href" value={form.secondaryCta.href} onChange={(event) => update('secondaryCta', { ...form.secondaryCta, href: event.target.value })} /></AdminFormField></div>
        <div className="space-y-3"><div className="flex items-center justify-between"><span className="text-sm font-medium">Stats</span><Button type="button" variant="outline" size="sm" disabled={form.stats.length >= 6} onClick={() => update('stats', [...form.stats, { value: '', label: '' }])}><Plus className="mr-1 h-3.5 w-3.5" />Add</Button></div>{form.stats.map((stat, index) => <div key={index} className="flex gap-2"><Input placeholder="40+" value={stat.value} onChange={(event) => setStat(index, 'value', event.target.value)} /><Input placeholder="Countries Served" value={stat.label} onChange={(event) => setStat(index, 'label', event.target.value)} /><Button type="button" variant="ghost" size="icon" onClick={() => update('stats', form.stats.filter((_, i) => i !== index))} aria-label="Remove stat"><Trash2 className="h-4 w-4" /></Button></div>)}</div>
        <div className="grid gap-4 sm:grid-cols-2"><AdminFormField label="Display Order" htmlFor="sort-order"><Input id="sort-order" type="number" min={0} value={form.sortOrder} onChange={(event) => update('sortOrder', Number(event.target.value))} /></AdminFormField><div className="flex items-center justify-between rounded-lg border border-border px-3"><span className="text-sm font-medium">Active</span><Switch checked={form.isActive} onCheckedChange={(value) => update('isActive', value)} /></div></div>
        <Button type="submit" className="w-full" disabled={save.isPending}>{save.isPending ? 'Saving...' : <><Save className="mr-2 h-4 w-4" />{editing ? 'Update Slide' : 'Create Slide'}</>}</Button>
      </form>
    </div>}
  </div>;
}
