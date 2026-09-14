import Link from 'next/link';
import Image from 'next/image';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { mainNav } from '@/lib/constants/site';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ocean-surface">
      <SiteHeader />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-seafood-mesh opacity-70" aria-hidden="true" />
        <div className="relative w-full max-w-2xl text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-premium backdrop-blur sm:h-36 sm:w-36">
            <Image src="/seafoodwala.png" alt="Seafood Wala" width={150} height={150} className="h-full w-auto max-w-full object-contain" priority />
          </div>

          <p className="mt-8 font-heading text-7xl font-bold leading-none tracking-tight text-brand-navy sm:text-9xl">404</p>
          <div className="mx-auto mt-5 max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent">Lost at sea</p>
            <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">This page drifted away</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We couldn&apos;t find the page you were looking for. Let&apos;s get you back to fresh finds and calm waters.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-w-40">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-40 bg-background/70">
              <Link href="/products">
                <Search className="mr-2 h-4 w-4" />
                Browse Products
              </Link>
            </Button>
          </div>

          <div className="mx-auto mt-12 max-w-xl border-t border-border/70 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Explore Seafood Wala</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
              {mainNav.map((item) => (
                <Link key={item.href} href={item.href} className="text-muted-foreground transition-colors hover:text-brand-primary">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
