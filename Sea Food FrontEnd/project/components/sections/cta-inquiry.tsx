'use client';

import Image from 'next/image';
import { Phone, Mail, Clock, ShieldCheck, Globe, Headset, FileText, ArrowRight } from 'lucide-react';
import { UnifiedInquiryForm } from '@/components/forms/unified-inquiry-form';
import { siteConfig } from '@/lib/constants/site';
import { usePublicSiteConfiguration } from '@/lib/hooks/use-site-configuration';
import { useInView } from '@/lib/hooks/use-in-view';

const benefits = [
  {
    icon: Headset,
    title: 'Personalized Response',
    description: 'A dedicated account manager reviews your inquiry and responds within one business day.',
  },
  {
    icon: ShieldCheck,
    title: 'No Obligation',
    description: 'Inquiries are free and place you under no obligation. We provide quotes to help you decide.',
  },
  {
    icon: Globe,
    title: 'Global Shipping',
    description: 'We handle export documentation, customs, and freight to 40+ countries worldwide.',
  },
  {
    icon: FileText,
    title: 'Catalog on Request',
    description: 'Need our full catalog? Select any product and mention "Catalog Request" in your message.',
  },
];

export function CTAInquiry() {
  const { ref, isInView } = useInView<HTMLElement>();
  const { data: configuration } = usePublicSiteConfiguration({ enabled: isInView });
  const phone = configuration?.mobileNumber || siteConfig.phone;
  const email = configuration?.email || siteConfig.email;
  const workingDays = configuration?.workingDays || siteConfig.workingHours.map((item) => item.day).join(' - ');
  const officeHours = configuration?.officeHours || siteConfig.workingHours[0]?.hours || '';

  return (
    <section ref={ref} id="inquiry" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.pexels.com/photos/229789/pexels-photo-229789.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/90 to-brand-black/95" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-brand-primary/15 blur-3xl animate-float-slow" />
      <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-brand-accent/10 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent-light">
              Get In Touch
            </span>
          </div>
          <h2 className="section-title-reveal mt-5 font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Ready to Order?
            <span className="block mt-2 bg-gradient-to-r from-brand-accent to-brand-accent-light bg-clip-text text-transparent">
              Let&apos;s Talk About Your Seafood Needs
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 text-balance">
            Submit an online inquiry and our export team will send a personalized quote
            within one business day. Bulk, private-label, and custom processing orders welcome.
          </p>
        </div>

        {/* Form + Sidebar */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-premium sm:p-8">
              <h3 className="font-heading text-2xl font-bold text-foreground">Request a Quote</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fields marked with <span className="text-destructive">*</span> are required.
              </p>
              <div className="mt-8">
                <UnifiedInquiryForm
                  variant="full"
                  loadProducts={isInView}
                  successTitle="Inquiry Submitted"
                  successMessage="Thank you for your interest. Our export team will review your inquiry and respond within one business day."
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              {/* Benefits */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h3 className="font-heading text-lg font-semibold text-white">
                  Why Submit an Inquiry?
                </h3>
                <ul className="mt-4 space-y-5">
                  {benefits.map((b) => (
                    <li key={b.title} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-brand-accent-light">
                        <b.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{b.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-white/60">
                          {b.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact card */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-primary/20 to-brand-accent/10 p-6 backdrop-blur-md">
                <h3 className="font-heading text-lg font-semibold text-white">Prefer to Talk?</h3>
                <p className="mt-2 text-sm text-white/60">
                  Reach our export team directly during business hours.
                </p>
                <div className="mt-5 space-y-3 text-sm">
                  <a
                    href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Phone className="h-4 w-4 text-brand-accent-light" />
                    {phone}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4 text-brand-accent-light" />
                    {email}
                  </a>
                  <div className="flex items-start gap-3 text-white/80">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-light" />
                    <div className="space-y-1">
                      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                        <span>{workingDays}</span>
                        <span className="font-medium">{officeHours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
