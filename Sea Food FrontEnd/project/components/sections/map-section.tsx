"use client";

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SectionHeading } from '@/components/layout/section-heading';
import { siteConfig } from '@/lib/constants/site';
import { useSiteConfiguration } from '@/components/providers/site-configuration-provider';

export function MapSection() {
  const { mapEmbedUrl } = useSiteConfiguration();

  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Visit Us"
          title="Find Our Headquarters"
          description="Our Miami facility houses cold storage, processing, and export operations."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Map */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                title="Seafood Wala location map"
                src={mapEmbedUrl}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-4">
            <div className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">Headquarters</h3>
                <p className="mt-2 flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                  <br />
                  {siteConfig.address.country}
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                  Contact
                </h3>
                <p className="mt-3 flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0 text-brand-primary" />
                  <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-brand-primary">
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-2 flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0 text-brand-primary" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-primary">
                    {siteConfig.email}
                  </a>
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                  <Clock className="h-4 w-4 text-brand-primary" />
                  Working Hours
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {siteConfig.workingHours.map((wh) => (
                    <li key={wh.day} className="flex justify-between gap-4">
                      <span className="text-muted-foreground">{wh.day}</span>
                      <span className="font-medium text-foreground">{wh.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
