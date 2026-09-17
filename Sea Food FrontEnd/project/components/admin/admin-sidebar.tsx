'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { adminNav } from '@/lib/constants/admin';
import { cn } from '@/lib/utils';
import { inquiryApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: inquiries = [] } = useQuery({
    queryKey: ['inquiries'],
    queryFn: inquiryApi.list,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });
  const newInquiryCount = inquiries.filter((inquiry) => inquiry.status === 'new').length;

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const NavContent = () => (
    <nav className="flex flex-col gap-1" aria-label="Admin navigation">
      {adminNav.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground')} />
            <span className="flex-1">{item.title}</span>
            {item.title === 'Inquiries' && newInquiryCount > 0 && (
              <span className={cn(
                'flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-bold leading-none shadow-sm ring-1 ring-inset',
                active
                  ? 'bg-white text-primary ring-white/60'
                  : 'bg-destructive text-destructive-foreground ring-white/10',
              )}>
                {newInquiryCount > 99 ? '99+' : newInquiryCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
          <Image src="/seafoodwala.png" alt="Seafood Wala" width={48} height={48} className="h-10 w-auto max-w-12 object-contain" priority />
          <div className="flex flex-col leading-none">
            <span className="font-heading text-sm font-bold text-foreground">Seafood Wala</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Admin Panel
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavContent />
        </div>
        <div className="border-t border-border p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
            <span className="flex flex-col gap-1">
              <span className="h-0.5 w-5 bg-foreground" />
              <span className="h-0.5 w-5 bg-foreground" />
              <span className="h-0.5 w-5 bg-foreground" />
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
          <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
            <Image src="/seafoodwala.png" alt="Seafood Wala" width={48} height={48} className="h-10 w-auto max-w-12 object-contain" priority />
            <div className="flex flex-col leading-none">
              <span className="font-heading text-sm font-bold text-foreground">Seafood Wala</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Admin Panel
              </span>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="ml-auto" aria-label="Close menu">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <div className="p-4">
            <NavContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
