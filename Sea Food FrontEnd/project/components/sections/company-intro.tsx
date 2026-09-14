'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Anchor, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants/site';
import { usePublicSiteConfiguration } from '@/lib/hooks/use-site-configuration';

const highlights = [
  'Founded in 2001 by commercial fishermen',
  'HACCP & MSC certified facility',
  'Seafood shipped to 40+ countries',
  'Private-label and custom processing',
];

export function CompanyIntro() {
  const { data: configuration } = usePublicSiteConfiguration();
  const yearsOfExperience = configuration?.yearsOfExperience ?? new Date().getFullYear() - siteConfig.foundedYear;
  const countriesServed = configuration?.countriesServed ?? 40;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-ocean-surface" aria-hidden="true" />
      <div className="container-wide relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-2xl bg-brand-primary/10 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-premium ring-1 ring-border">
              <Image
                src="https://images.pexels.com/photos/8352344/pexels-photo-8352344.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Seafood Wala seafood facility"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/30 to-transparent" />
            </div>

            <div className="absolute -bottom-5 -right-4 rounded-2xl border border-white/20 bg-brand-navy p-5 text-white shadow-premium sm:-bottom-6 sm:-right-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-accent/20">
                  <Anchor className="h-5 w-5 text-brand-accent-light" />
                </span>
                <div>
                  <div className="font-heading text-3xl font-bold">{yearsOfExperience}+</div>
                  <div className="text-xs text-white/70">Years of seafood trust</div>
                </div>
              </div>
            </div>

            <div className="absolute -left-3 top-8 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-soft sm:block">
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-brand-primary" />
                <span className="text-sm font-medium text-foreground">{countriesServed}+ Countries Served</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
              About Seafood Wala
            </span>
            <h2 className="section-title-reveal mt-4 font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              From Ocean to Table,{' '}
              <span className="gradient-text">Worldwide</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {siteConfig.name} began in {siteConfig.foundedYear} on the docks of Miami, where our
              founders — commercial fishermen frustrated by inconsistent quality — started sourcing
              their own. Today, we supply a full catalog of premium seafood and export to
              distributors, restaurants, and retailers across {countriesServed}+ countries.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every catch is inspected, graded, and cold-chain handled in our HACCP certified
              facility. We back our products with a freshness guarantee and a dedication to
              sustainable sourcing.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-card/50 px-3 py-2.5 text-sm font-medium text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <Button asChild className="mt-8 group">
              <Link href="/about">
                Learn Our Story
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
