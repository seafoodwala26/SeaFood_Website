import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="scroll-motion group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Link prefetch={false} href={`/products/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.imageName || product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
        </Link>
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.isNew && (
            <Badge className="bg-brand-accent text-white hover:bg-brand-accent">
              New
            </Badge>
          )}
          {product.bestSeller && (
            <Badge className="bg-brand-primary text-white hover:bg-brand-primary">
              Best Seller
            </Badge>
          )}
        </div>
        {product.category && (
          <Badge className="absolute right-3 top-3 max-w-[calc(100%-1.5rem)] truncate bg-white/90 text-brand-primary shadow-sm backdrop-blur-sm hover:bg-white/90 capitalize">
            {product.category}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[2.75rem] font-heading text-base font-semibold leading-snug text-foreground capitalize">
          <Link prefetch={false} href={`/products/${product.slug}`} className="hover:text-brand-primary transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">
          {product.tagline}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Starting at</span>
            <span className="font-heading text-lg font-bold text-foreground">
              {product.price}
            </span>
          </div>
          <Button asChild size="sm" variant="outline" className="group/btn">
            <Link href={`/products/${product.slug}`}>
              View
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
