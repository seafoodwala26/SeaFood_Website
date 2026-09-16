'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, ChevronRight, ChevronDown, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { mainNav, siteConfig } from '@/lib/constants/site';
import { usePublicCategories, useCategoryProducts } from '@/lib/hooks/use-catalog';
import { categoryHref, productHref } from '@/lib/utils/catalog';
import { cn } from '@/lib/utils';
import { useSiteConfiguration } from '@/components/providers/site-configuration-provider';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const { phone } = useSiteConfiguration();

  const productsMenuOpen = megaMenuOpen || mobileProductsOpen;
  const { data: categories = [], isLoading: categoriesLoading } = usePublicCategories({
    enabled: productsMenuOpen,
  });
  const activeCategoryId = hoveredCategory ?? categories[0]?.slug ?? null;
  const { data: categoryProducts = [], isLoading: productsLoading } = useCategoryProducts(
    activeCategoryId,
    productsMenuOpen,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (categories.length && !hoveredCategory) {
      setHoveredCategory(categories[0].slug);
    }
  }, [categories, hoveredCategory]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const hoveredCat = categories.find((c) => c.slug === hoveredCategory);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/60 bg-white/95 backdrop-blur-xl transition-all duration-300',
        scrolled
          ? 'shadow-soft'
          : 'shadow-none',
      )}
      onMouseLeave={() => {
        setMegaMenuOpen(false);
        setHoveredCategory(categories[0]?.slug ?? null);
      }}
    >
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between py-2 sm:h-20 sm:py-3">
          <Link prefetch={false} href="/" className="group flex items-center" aria-label={`${siteConfig.name} home`}>
            <Image
              src="/seafoodwala.png"
              alt="Seafood Wala"
              width={220}
              height={80}
              priority
              className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {mainNav.map((item) => {
              if (item.title === 'Products') {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => {
                      setMegaMenuOpen(true);
                      setHoveredCategory(categories[0]?.slug ?? null);
                    }}
                  >
                    <Link
                      prefetch={false}
                      href={item.href}
                      className={cn(
                        'relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors',
                        isActive(item.href)
                          ? 'text-brand-primary'
                          : 'text-foreground/70 hover:text-foreground',
                      )}
                    >
                      {item.title}
                      <ChevronDown
                        className={cn('h-3.5 w-3.5 transition-transform', megaMenuOpen && 'rotate-180')}
                      />
                      {isActive(item.href) && (
                        <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-primary" />
                      )}
                    </Link>

                    {megaMenuOpen && (
                      <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                        <div className="w-[780px] overflow-hidden rounded-2xl border border-border bg-card shadow-premium animate-fade-in-fast">
                          <div className="grid grid-cols-12 gap-0">
                            <div className="col-span-5 border-r border-border bg-gradient-to-b from-muted/40 to-muted/20 p-4">
                              <h3 className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Seafood Categories
                              </h3>
                              {categoriesLoading ? (
                                <div className="flex items-center justify-center py-10">
                                  <Loader2 className="h-5 w-5 animate-spin text-brand-primary" />
                                </div>
                              ) : (
                                <div className="flex flex-col gap-1">
                                  {categories.map((cat) => (
                                    <Link
                                      key={cat.slug}
                                      prefetch={false}
                                      href={categoryHref(cat)}
                                      onMouseEnter={() => setHoveredCategory(cat.slug)}
                                      className={cn(
                                        'flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all',
                                        hoveredCategory === cat.slug
                                          ? 'bg-brand-primary/10 text-brand-primary font-medium shadow-soft'
                                          : 'text-foreground/70 hover:bg-muted hover:text-foreground',
                                      )}
                                    >
                                      <span className="flex items-center gap-2.5">
                                        <Image
                                          src={cat.image}
                                          alt={cat.name}
                                          width={36}
                                          height={36}
                                          className="rounded-lg object-cover ring-2 ring-white/50"
                                        />
                                        <span className="capitalize">{cat.name}</span>
                                      </span>
                                      <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="col-span-7 p-4">
                              <div className="flex items-center justify-between px-3 pb-3">
                                <div>
                                  <h3 className="text-xs font-semibold capitalize tracking-wider text-muted-foreground">
                                    {hoveredCat ? hoveredCat.name : 'Featured Products'}
                                  </h3>
                                </div>
                                <Link 
                                  prefetch={false}
                                  href={hoveredCat ? categoryHref(hoveredCat) : '/products'}
                                  className="flex items-center gap-1 text-xs font-medium text-brand-primary hover:gap-2 transition-all"
                                >
                                  View All <ArrowRight className="h-3 w-3" />
                                </Link>
                              </div>

                              {productsLoading ? (
                                <div className="flex items-center justify-center py-12">
                                  <Loader2 className="h-5 w-5 animate-spin text-brand-primary" />
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 gap-2">
                                  {categoryProducts.length > 0 ? (
                                    categoryProducts.map((p) => (
                                      <Link
                                        key={p.slug}
                                        prefetch={false}
                                        href={productHref(p)}
                                        className="group flex gap-3 rounded-xl border border-transparent p-2.5 transition-all hover:border-border hover:bg-muted/60"
                                      >
                                        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-border">
                                          <Image
                                            src={p.image}
                                            alt={p.name}
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                          />
                                        </span>
                                        <div className="min-w-0">
                                          <div className="truncate text-sm font-medium text-foreground group-hover:text-brand-primary transition-colors capitalize">{p.name}</div>
                                          <div className="mt-0.5 text-xs text-muted-foreground capitalize">{p.category}</div>
                                          <div className="mt-1 text-xs font-semibold text-brand-accent">{p.price}</div>
                                        </div>
                                      </Link>
                                    ))
                                  ) : (
                                    <div className="col-span-2 rounded-xl border border-dashed border-border px-3 py-10 text-center text-sm text-muted-foreground">
                                      No products in this category yet
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-border bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 px-4 py-3">
                            <span className="text-xs text-muted-foreground">
                              Can&apos;t find what you need?
                            </span>
                            <Link
                              prefetch={false}
                              href="/contact"
                              className="flex items-center gap-1 text-xs font-medium text-brand-primary hover:gap-2 transition-all"
                            >
                              Request a Custom Order <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  prefetch={false}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive(item.href)
                      ? 'text-brand-primary'
                      : 'text-foreground/70 hover:text-foreground',
                  )}
                >
                  {item.title}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className={cn('hidden items-center gap-2 text-sm font-medium transition-colors xl:flex', 'text-foreground/70 hover:text-brand-primary',)}
            >
              <Phone className="h-4 w-4" />
              {phone}
            </a>
            <Button asChild size="sm" className="hidden sm:inline-flex"><Link prefetch={false} href="/contact">Get a Quote</Link></Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] sm:w-96 overflow-y-auto">
                <SheetTitle className="text-left text-lg font-heading font-bold">Navigation</SheetTitle>
                <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile navigation">
                  {mainNav.map((item) => {
                    if (item.title === 'Products') {
                      return (
                        <div key={item.href}>
                          <button
                            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                            className={cn(
                              'flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors',
                              isActive(item.href) ? 'bg-brand-primary/10 text-brand-primary' : 'text-foreground/80 hover:bg-muted',
                            )}
                          >
                            {item.title}
                            <ChevronRight className={cn('h-4 w-4 opacity-50 transition-transform', mobileProductsOpen && 'rotate-90',)}
                            />
                          </button>
                          {mobileProductsOpen && (
                            <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-border pl-3">
                              <Link
                                prefetch={false}
                                href="/products"
                                className="rounded-lg px-4 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-brand-primary transition-colors"
                              >
                                All Products
                              </Link>
                              {categoriesLoading ? (
                                <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Loading...
                                </div>
                              ) : (
                                categories.map((cat) => (
                                  <Link
                                    key={cat.slug}
                                    prefetch={false}
                                    href={categoryHref(cat)}
                                    className="rounded-lg px-4 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-brand-primary transition-colors capitalize"
                                  >
                                    {cat.name}
                                  </Link>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={item.href}
                        prefetch={false}
                        href={item.href}
                        className={cn(
                          'flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors',
                          isActive(item.href) 
                            ? 'bg-brand-primary/10 text-brand-primary'
                            : 'text-foreground/80 hover:bg-muted',
                        )}
                      >
                        {item.title}
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
                  <Button asChild className="w-full">
                    <Link prefetch={false} href="/contact">Get a Quote</Link>
                  </Button>
                  <a
                    href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-foreground/70"
                  >
                    <Phone className="h-4 w-4" />
                    {phone}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}