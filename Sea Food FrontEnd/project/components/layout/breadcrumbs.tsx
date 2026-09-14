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
}

export function Breadcrumbs({ items, tone = 'light' }: BreadcrumbsProps) {
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
        className={`inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full px-3 py-1.5 text-sm backdrop-blur-sm ${
          tone === 'dark' ? 'bg-black/25 text-white' : 'bg-background/80 text-muted-foreground'
        }`}
      >
        <Link
          href="/"
          className={tone === 'dark' ? 'text-white/80 transition-colors hover:text-white' : 'text-muted-foreground transition-colors hover:text-brand-primary'}
        >
          Home
        </Link>
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className={`h-3.5 w-3.5 ${tone === 'dark' ? 'text-white/60' : 'text-muted-foreground/50'}`} />
            {index === items.length - 1 ? (
              <span className={`font-medium ${tone === 'dark' ? 'text-white' : 'text-foreground'}`} aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className={tone === 'dark' ? 'text-white/80 transition-colors hover:text-white' : 'text-muted-foreground transition-colors hover:text-brand-primary'}
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
