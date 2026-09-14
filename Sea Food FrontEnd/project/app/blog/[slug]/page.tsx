import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, HelpCircle, BookOpen } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/layout/section-heading';
import { BlogCard } from '@/components/cards/blog-card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BlogPostingSchema, FAQSchema } from '@/lib/seo/schema';
import { blogApi } from '@/lib/api';
import { mapApiBlog } from '@/lib/utils/catalog';
import { siteConfig } from '@/lib/constants/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { formatDateLong } from '@/lib/utils/format';
import { ContentSlider } from '@/components/ui/content-slider';

export const dynamic = 'force-dynamic';

function BlogContent({ content }: { content: string }) {
  const isHtmlContent = /<\/?[a-z][\s\S]*>/i.test(content);

  if (isHtmlContent) {
    return <div className="blog-html-content" dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return (
    <>
      {content.split('\n').map((line, i) => {
        if (line.startsWith('# ')) {
          return (
            <h2 key={i} className="mt-8 font-heading text-2xl font-bold text-foreground">
              {line.replace('# ', '')}
            </h2>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h3 key={i} className="mt-6 font-heading text-xl font-semibold text-foreground">
              {line.replace('## ', '')}
            </h3>
          );
        }
        if (line.startsWith('- ')) {
          return (
            <li key={i} className="ml-6 mt-2 text-base text-foreground/80 list-disc">
              {line.replace('- ', '')}
            </li>
          );
        }
        if (line.match(/^\d+\. /)) {
          return (
            <li key={i} className="ml-6 mt-2 text-base text-foreground/80 list-decimal">
              {line.replace(/^\d+\. /, '')}
            </li>
          );
        }
        if (line.trim() === '') {
          return <div key={i} className="h-4" />;
        }
        return (
          <p key={i} className="mt-4 text-base leading-relaxed text-foreground/80">
            {line}
          </p>
        );
      })}
    </>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const apiPost = await blogApi.publicGet(slug).catch(() => null);
  const post = apiPost ? mapApiBlog(apiPost) : null;
  if (!post) {
    return buildPageMetadata({
      title: 'Article Not Found',
      description: 'The article you are looking for could not be found.',
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: 'article',
    publishedTime: post.publishedAt,
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const apiPost = await blogApi.publicGet(slug).catch(() => null);
  const post = apiPost ? mapApiBlog(apiPost) : null;
  if (!post) notFound();

  const relatedResponse = await blogApi.publicList({ limit: 100 }).catch(() => null);
  const related = relatedResponse?.data
    .map(mapApiBlog)
    .filter((item) => item.slug !== post.slug && item.categorySlug === post.categorySlug)
    .slice(0, 6) || [];

  return (
    <PageShell>
      <BlogPostingSchema
        title={post.title}
        description={post.excerpt}
        image={post.image}
        publishedAt={post.publishedAt}
        url={`${siteConfig.url}/blog/${post.slug}`}
      />
      {post.faqs.length > 0 && <FAQSchema items={post.faqs} />}

      {/* Hero */}
      <section className="blog-detail-hero">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { name: 'Blog', href: '/blog' },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <div className="mt-10 max-w-4xl text-left">
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary transition-colors hover:bg-brand-primary/20"
            >
              {post.category}
            </Link>
            <h1 className="section-title-reveal mt-6 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground text-balance sm:text-lg">
              {post.excerpt}
            </p>
            {/* Meta */}
            <div className="mt-8 flex flex-wrap items-center justify-start gap-x-6 gap-y-3 border-t border-border/70 pt-6">
              <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDateLong(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured image */}
      <div className="container-wide -mt-2 sm:-mt-4">
        <div className="blog-featured-image relative aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <section className="blog-detail-body pb-10 sm:pb-14">
        <div className="container-wide">
          <div className="blog-article-layout mx-auto max-w-6xl">
            <article className="blog-article prose-custom">
              <BlogContent content={post.content} />
              {post.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-6">
                  <Tag className="mr-1 h-4 w-4 text-brand-primary" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* FAQ Section */}
              {post.faqs?.length > 0 && (
                <div className="blog-faq mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-brand-primary" />
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    Frequently Asked Questions
                  </h2>
                </div>
                <Accordion type="single" collapsible className="mt-4">
                  {post.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left font-heading text-base font-medium text-foreground">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                </div>
              )}

              {/* Back to blog */}
              <div className="mt-10">
              <Button asChild variant="outline">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
              </div>
            </article>

            <aside className="blog-article-aside hidden lg:block">
              <div className="blog-article-aside-card sticky top-28">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Article guide</p>
                <p className="mt-3 font-heading text-xl font-bold leading-snug text-foreground">{post.title}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                  <span className="rounded-full bg-muted px-2.5 py-1">{post.category}</span>
                  <span className="rounded-full bg-muted px-2.5 py-1">{post.readingTime} min read</span>
                </div>
                <div className="mt-6 border-t border-border pt-4" />
                <Link href="/blog" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-primary transition-colors hover:text-brand-primary-light">
                  Browse all articles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-12 pt-20 sm:pb-16 sm:pt-24 bg-muted/40">
          <div className="container-wide">
            <div className="flex items-center justify-between">
              <SectionHeading title="Related Articles" eyebrow="Keep Reading" align="left" />
              <Button asChild variant="ghost" size="sm">
                <Link href="/blog">
                  All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-10">
              <ContentSlider itemsPerView={{ base: 1, sm: 2, md: 3, lg: 3 }} autoPlay interval={5000} gap={24}>
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
              </ContentSlider>
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
