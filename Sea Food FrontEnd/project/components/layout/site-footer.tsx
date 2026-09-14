'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { siteConfig, footerNav, mainNav } from '@/lib/constants/site';
import { usePublicCategories } from '@/lib/hooks/use-catalog';
import { usePublicSiteConfiguration } from '@/lib/hooks/use-site-configuration';
import { categoryHref } from '@/lib/utils/catalog';
import { useInView } from '@/lib/hooks/use-in-view';

const socialIcons = { facebook: Facebook, instagram: Instagram, twitter: Twitter, youtube: Youtube, linkedin: Linkedin };

export function SiteFooter() {
  const { ref, isInView } = useInView<HTMLElement>();
  const { data: categories = [] } = usePublicCategories({ enabled: isInView });
  const { data: configuration } = usePublicSiteConfiguration({ enabled: isInView });
  const description = configuration?.tagline || siteConfig.description;
  const phone = configuration?.mobileNumber || siteConfig.phone;
  const email = configuration?.email || siteConfig.email;
  const address = configuration?.fullAddress || `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state}`;
  const social = {
    facebook: configuration?.facebookUrl || siteConfig.social.facebook,
    instagram: configuration?.instagramUrl || siteConfig.social.instagram,
    linkedin: configuration?.linkedinUrl || siteConfig.social.linkedin,
  };

  return (
    <footer ref={ref} className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-primary via-brand-primary-light to-brand-accent" />
      <div className="absolute inset-0 bg-ocean-surface opacity-30" />

      <div className="container-wide relative py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex rounded-xl bg-white p-2 transition-transform hover:scale-[1.02]">
              <Image src="/seafoodwala.png" alt="Seafood Wala" width={240} height={88} className="h-16 w-auto object-contain sm:h-20" />
            </Link>
            <p className="mt-5 max-w-sm break-words text-sm leading-relaxed text-white/60">{description}</p>
          </div>

          <div className="min-w-0 lg:col-span-2">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-0 text-sm text-white/60 transition-colors hover:text-brand-primary-light">
                    <ArrowRight className="h-3.5 w-0 shrink-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-3.5 group-hover:opacity-100" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{link.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sitemap.xml" className="group flex items-center gap-0 text-sm text-white/60 transition-colors hover:text-brand-primary-light">
                  <ArrowRight className="h-3.5 w-0 shrink-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-3.5 group-hover:opacity-100" />
                  <span className="transition-transform duration-300 group-hover:translate-x-1">Sitemap</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">Categories</h3>
            <ul className="mt-4 space-y-3">
              {categories.length > 0 ? categories.slice(0, 10).map((category) => (
                <li key={category.slug}>
                  <Link href={categoryHref(category)} className="group flex items-center gap-0 break-words text-sm capitalize text-white/60 transition-colors hover:text-brand-primary-light">
                    <ArrowRight className="h-3.5 w-0 shrink-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-3.5 group-hover:opacity-100" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{category.name}</span>
                  </Link>
                </li>
              )) : footerNav.products.links.slice(0, 10).map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-brand-primary-light">{link.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary-light" /><span className="min-w-0 break-words">{address}</span></li>
              <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 shrink-0 text-brand-primary-light" /><a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="break-all hover:text-brand-primary-light">{phone}</a></li>
              <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 shrink-0 text-brand-primary-light" /><a href={`mailto:${email}`} className="break-all hover:text-brand-primary-light">{email}</a></li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {Object.entries(social).map(([key, href]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                return <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Seafood Wala on ${key}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-white"><Icon className="h-4 w-4" /></a>;
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pb-12 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:pb-0">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:flex sm:flex-wrap"><Link href="/privacy" className="hover:text-brand-primary-light">Privacy Policy</Link><Link href="/terms" className="hover:text-brand-primary-light">Terms of Service</Link></div>
        </div>
      </div>
    </footer>
  );
}
