'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Anchor, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants/site';
import { usePublicSiteConfiguration } from '@/lib/hooks/use-site-configuration';

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
              Fresh Seafood You Can Trust,{' '}
              <span className="gradient-text">Quality From the Sea to Your Table</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Welcome to <b>Seafood Wala</b>, your destination for fresh, quality seafood sourced with care and delivered with a commitment to freshness and reliability. We bring together a wide range of seafood options for families, seafood lovers, restaurants, hotels, cafés, and businesses looking for dependable seafood supply.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              From fresh fish and prawns to other popular seafood varieties, our focus is simple: <b>quality seafood, careful handling, and dependable service.</b> Whether you are planning a delicious seafood meal at home or need seafood for your restaurant or business, Seafood Wala aims to make sourcing fresh seafood easier and more convenient.
            </p>

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
