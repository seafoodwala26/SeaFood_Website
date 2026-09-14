'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/layout/section-heading';
import { BlogCard } from '@/components/cards/blog-card';
import { BlogGridSkeleton } from '@/components/cards/blog-card-skeleton';
import { usePublicBlogs } from '@/lib/hooks/use-blogs';
import { useInView } from '@/lib/hooks/use-in-view';

export function LatestBlogs() {
  const { ref, isInView } = useInView<HTMLElement>();
  const { data: posts = [], isLoading } = usePublicBlogs({ limit: 3, enabled: isInView });

  if (isInView && !isLoading && posts.length === 0) return null;

  return (
    <section ref={ref} className="section-padding bg-muted/40">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="From the Blog"
            title="Seafood Guides & Industry Insights"
            description="Sourcing tips, handling guides, and industry news from our team of seafood experts and marine biologists."
            align="left"
            className="max-w-xl"
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/blog">
              Read All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <BlogGridSkeleton count={3} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <BlogCard key={post.slug} post={post} priority={i === 0} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
