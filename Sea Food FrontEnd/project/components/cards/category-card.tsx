import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ProductCategory } from '@/lib/types';

interface CategoryCardProps {
  category: ProductCategory;
  priority?: boolean;
}

export function CategoryCard({ category, priority = false }: CategoryCardProps) {
  return (
    <Link
      prefetch={false}
      href={`/products?category=${category.slug}`}
      className="scroll-motion group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-secondary shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
    >
      <Image
        src={category.image}
        alt={category.imageName || category.name}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-60"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative p-5 text-white">
        <span className="text-xs font-medium uppercase tracking-wider text-white/70">
          {category.count} products
        </span>
        <h3 className="mt-1 font-heading text-lg font-bold leading-tight">{category.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/70">{category.description}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
