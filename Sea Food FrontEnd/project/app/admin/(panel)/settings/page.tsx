'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Building2, CheckCircle2, Globe2, Phone, Save, TrendingUp } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { AdminFormField } from '@/components/admin/admin-form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteConfigurationApi, type SiteConfiguration } from '@/lib/api';
import { useAdminFormErrors } from '@/components/admin/use-admin-form-errors';

const defaults: SiteConfiguration = { yearsOfExperience: 10, countriesServed: 50, happyClients: 200, productsExported: 200, tagline: '', facebookUrl: '', linkedinUrl: '', instagramUrl: '', mobileNumber: '', email: '', workingDays: 'Monday - Saturday', officeHours: '09:00 AM - 7:00 PM', fullAddress: '', mapEmbedUrl: '' };

function SectionTitle({ icon: Icon, children }: { icon: typeof Building2; children: string }) {
  return <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground"><Icon className="h-4 w-4 text-primary" />{children}</h2>;
}

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<SiteConfiguration>(defaults);
  const { fieldErrors, formError: errorMessage, handleError, clearFieldError, clearErrors } = useAdminFormErrors();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { data, isLoading, error } = useQuery({ queryKey: ['site-configuration'], queryFn: siteConfigurationApi.get });
  useEffect(() => { if (data) setForm({ ...defaults, ...data }); }, [data]);
  const mutation = useMutation({
    mutationFn: siteConfigurationApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-configuration'] });
      queryClient.invalidateQueries({ queryKey: ['public-site-configuration'] });
      setSuccessMessage('Configuration updated successfully.');
    },
    onError: handleError,
  });
  const update = <K extends keyof SiteConfiguration>(key: K, value: SiteConfiguration[K]) => {
    clearFieldError(String(key));
    setSuccessMessage(null);
    setForm((state) => ({ ...state, [key]: value }));
  };
  const submit = (event: FormEvent) => { event.preventDefault(); clearErrors(); setSuccessMessage(null); mutation.mutate(form); };
  if (isLoading) return <p className="py-12 text-center text-sm text-muted-foreground">Loading configuration...</p>;
  return <div className="space-y-6">
    <AdminPageHeader title="Edit Business Configuration" description="Manage the business details displayed across your website." />
    <form onSubmit={submit} className="rounded-xl border border-border bg-card shadow-soft">
      <div className="space-y-7 p-4 sm:p-6">
        <section><SectionTitle icon={TrendingUp}>Business Statistics</SectionTitle><div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {([['yearsOfExperience', 'Years of Experience'], ['countriesServed', 'Countries Served'], ['happyClients', 'Happy Clients'], ['productsExported', 'Products Exported']] as const).map(([key, label]) => <AdminFormField key={key} label={label} htmlFor={key} error={fieldErrors[key]}><Input id={key} type="number" min="0" value={form[key]} placeholder="0" onChange={(event) => update(key, Number(event.target.value) || 0)} /></AdminFormField>)}
        </div></section>
        <section className="border-t border-border pt-6"><SectionTitle icon={Globe2}>Online Presence</SectionTitle><div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdminFormField label="Business Tagline" htmlFor="tagline" required error={fieldErrors.tagline} className="xl:col-span-1"><Input id="tagline" value={form.tagline} onChange={(event) => update('tagline', event.target.value)} placeholder="Trusted exporter of premium products" /></AdminFormField>
          <AdminFormField label="Facebook URL" htmlFor="facebook" error={fieldErrors.facebookUrl}><Input id="facebook" type="url" value={form.facebookUrl} onChange={(event) => update('facebookUrl', event.target.value)} placeholder="https://facebook.com/..." /></AdminFormField>
          <AdminFormField label="LinkedIn URL" htmlFor="linkedin" error={fieldErrors.linkedinUrl}><Input id="linkedin" type="url" value={form.linkedinUrl} onChange={(event) => update('linkedinUrl', event.target.value)} placeholder="https://linkedin.com/company/..." /></AdminFormField>
          <AdminFormField label="Instagram URL" htmlFor="instagram" error={fieldErrors.instagramUrl}><Input id="instagram" type="url" value={form.instagramUrl} onChange={(event) => update('instagramUrl', event.target.value)} placeholder="https://instagram.com/..." /></AdminFormField>
        </div></section>
        <section className="border-t border-border pt-6"><SectionTitle icon={Phone}>Contact &amp; Working Hours</SectionTitle><div className="mt-4 grid gap-4 md:grid-cols-2">
          <AdminFormField label="Mobile Number" htmlFor="mobile" required error={fieldErrors.mobileNumber}><Input id="mobile" type="tel" value={form.mobileNumber} onChange={(event) => update('mobileNumber', event.target.value)} placeholder="+91 00000 00000" /></AdminFormField>
          <AdminFormField label="Email Address" htmlFor="email" required error={fieldErrors.email}><Input id="email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="info@company.com" /></AdminFormField>
          <AdminFormField label="Working Days" htmlFor="working-days" required error={fieldErrors.workingDays}><Input id="working-days" value={form.workingDays} placeholder="Monday - Saturday" onChange={(event) => update('workingDays', event.target.value)} /></AdminFormField>
          <AdminFormField label="Office Hours" htmlFor="office-hours" required error={fieldErrors.officeHours}><Input id="office-hours" value={form.officeHours} placeholder="9:00 AM - 6:00 PM" onChange={(event) => update('officeHours', event.target.value)} /></AdminFormField>
          <AdminFormField label="Full Address" htmlFor="address" required error={fieldErrors.fullAddress} className="md:col-span-2"><Textarea id="address" rows={3} value={form.fullAddress} onChange={(event) => update('fullAddress', event.target.value)} placeholder="Office address, city, state and postal code" /></AdminFormField>
          <AdminFormField label="Map Embed URL" htmlFor="map-embed-url" error={fieldErrors.mapEmbedUrl} className="md:col-span-2"><Input id="map-embed-url" type="url" value={form.mapEmbedUrl} onChange={(event) => update('mapEmbedUrl', event.target.value)} placeholder="https://www.google.com/maps/embed?..." /></AdminFormField>
        </div></section>
        <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>{errorMessage && <p className="flex items-center gap-2 text-sm text-destructive" role="alert">{errorMessage}</p>}{successMessage && <p className="flex items-center gap-2 text-sm text-brand-accent"><CheckCircle2 className="h-4 w-4" />{successMessage}</p>}{error && <p className="text-sm text-destructive">Unable to load configuration.</p>}</div>
          <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto"><Save className="mr-2 h-4 w-4" />{mutation.isPending ? 'Updating...' : 'Update Configuration'}</Button>
        </div>
      </div>
    </form>
  </div>;
}
