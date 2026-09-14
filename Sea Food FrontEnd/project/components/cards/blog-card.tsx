import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils/format';
import type { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
  variant?: 'default' | 'horizontal';
}

export function BlogCard({ post, priority = false, variant = 'default' }: BlogCardProps) {
  if (variant === 'horizontal') {
    return (
      <article className="scroll-motion group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:shadow-premium sm:flex-row">
        <Link prefetch={false} href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-muted sm:w-2/5">
          <Image
            src={post.image}
            alt={post.imageName || post.title}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
            {post.category}
          </span>
          <h3 className="mt-1.5 font-heading text-lg font-semibold leading-snug">
            <Link prefetch={false} href={`/blog/${post.slug}`} className="hover:text-brand-primary transition-colors">
              {post.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
          <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="scroll-motion group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
      <Link prefetch={false} href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={post.image}
          alt={post.imageName || post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-primary backdrop-blur-sm">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold leading-snug">
          <Link prefetch={false} href={`/blog/${post.slug}`} className="hover:text-brand-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
          <div className="flex flex-col leading-tight">
            <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} min read
            </span>
          </div>
          <Link
            prefetch={false}
            href={`/blog/${post.slug}`}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-brand-primary transition-colors hover:bg-brand-primary/10"
            aria-label={`Read ${post.title}`}
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
