import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbSchema } from '@/lib/seo/schema';
import { siteConfig } from '@/lib/constants/site';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  tone?: 'light' | 'dark';
  mobileCompact?: boolean;
}

export function Breadcrumbs({ items, tone = 'light', mobileCompact = false }: BreadcrumbsProps) {
  const schemaItems = [
    { name: 'Home', url: siteConfig.url },
    ...items.map((item) => ({
      name: item.name,
      url: `${siteConfig.url}${item.href}`,
    })),
  ];

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav
        aria-label="Breadcrumb"
        className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1.5 text-sm backdrop-blur-sm ${
          mobileCompact
            ? `flex-nowrap border border-brand-primary/20 bg-brand-primary/10 text-brand-navy sm:flex-wrap sm:border-0 ${
                tone === 'dark' ? 'sm:bg-black/25 sm:text-white' : 'sm:bg-background/80 sm:text-muted-foreground'
              }`
            : `flex-wrap ${
                tone === 'dark' ? 'bg-black/25 text-white' : 'bg-background/80 text-muted-foreground'
              }`
        }`}
      >
        <Link
          href="/"
          className={`${mobileCompact ? 'hidden sm:inline' : ''} ${
            tone === 'dark' ? 'text-white/80 transition-colors hover:text-white' : 'text-muted-foreground transition-colors hover:text-brand-primary'
          }`}
        >
          Home
        </Link>
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className={`h-3.5 w-3.5 ${
              mobileCompact && index === 0 ? 'hidden sm:block' : ''
            } ${
              mobileCompact
                ? tone === 'dark'
                  ? 'text-brand-primary/60 sm:text-white/60'
                  : 'text-brand-primary/60 sm:text-muted-foreground/50'
                : tone === 'dark' ? 'text-white/60' : 'text-muted-foreground/50'
            }`} />
            {index === items.length - 1 ? (
              <span
                className={`font-medium ${
                  mobileCompact
                    ? `block min-w-0 max-w-[140px] truncate whitespace-nowrap sm:max-w-none sm:whitespace-normal ${
                        tone === 'dark' ? 'text-white' : 'text-brand-navy sm:text-foreground'
                      }`
                    : tone === 'dark' ? 'text-white' : 'text-foreground'
                }`}
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className={
                  mobileCompact && tone === 'light'
                    ? 'text-brand-primary transition-colors hover:text-brand-primary sm:text-muted-foreground'
                    : tone === 'dark'
                      ? 'text-white/80 transition-colors hover:text-white'
                      : 'text-muted-foreground transition-colors hover:text-brand-primary'
                }
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
