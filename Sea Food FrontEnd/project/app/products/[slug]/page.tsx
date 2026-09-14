import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, CheckCircle2, ArrowLeft, Send, Truck, Globe, HelpCircle, MessageCircle } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/layout/section-heading';
import { ProductGallery } from '@/components/sections/product-gallery';
import { ProductCard } from '@/components/cards/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger} from '@/components/ui/accordion';
import { ProductSchema, FAQSchema } from '@/lib/seo/schema';
import { productApi } from '@/lib/api';
import { mapApiProduct } from '@/lib/utils/catalog';
import { siteConfig } from '@/lib/constants/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { ContentSlider } from '@/components/ui/content-slider';

export const dynamic = 'force-dynamic';
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const apiProduct = await productApi.publicGet(slug).catch(() => null);
  const product = apiProduct ? mapApiProduct(apiProduct) : null;
  if (!product) {
    return buildPageMetadata({
      title: 'Product Not Found',
      description: 'The product you are looking for could not be found.',
      path: `/products/${slug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.description,
    path: `/products/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const apiProduct = await productApi.publicGet(slug).catch(() => null);
  const product = apiProduct ? mapApiProduct(apiProduct) : null;
  if (!product) notFound();

  const relatedResponse = await productApi.publicList({ limit: 6, category: product.categorySlug }).catch(() => null);
  const related = relatedResponse?.data
    .filter((item) => {
      const itemIdentifier = item.slug || item._id;
      const itemCategory = item.category.slug || item.category._id;
      return itemIdentifier !== product.slug && itemCategory === product.categorySlug;
    })
    .slice(0, 6)
    .map(mapApiProduct) || [];

  const whatsappNumber = siteConfig.whatsapp.replace(/[^0-9]/g, '');
  const whatsappMessage = `Hello, I would like to enquire about ${product.name}. Please share availability and pricing.\n\nProduct link: ${siteConfig.url}/products/${product.slug}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <PageShell>
      <ProductSchema
        name={product.name}
        description={product.description}
        image={product.image}
        sku={product.sku}
        price={product.price}
        rating={product.rating}
        reviewCount={product.reviewCount}
        url={`${siteConfig.url}/products/${product.slug}`}
      />
      {product.faqs && product.faqs.length > 0 && <FAQSchema items={product.faqs} />}

      <section className="border-b border-border bg-gradient-to-b from-brand-primary/5 to-background pt-10 pb-8">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { name: 'Products', href: '/products' },
              { name: product.name, href: `/products/${product.slug}` },
            ]}
          />
        </div>
      </section>

      {/* Main */}
      <section className="bg-ocean-surface pb-12 pt-10 md:pb-16 md:pt-16">
        <div className="container-wide">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Gallery */}
            <div className="lg:sticky lg:top-24">
              <ProductGallery images={product.gallery} alt={product.name} />
            </div>

            {/* Info */}
            <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card p-6 shadow-premium sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-brand-accent/10 blur-3xl" />
              <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="bg-brand-primary/10 px-3 py-1 text-brand-primary hover:bg-brand-primary/10">
                  {product.category}
                </Badge>
                {product.isNew && <Badge className="bg-brand-accent text-white hover:bg-brand-accent">New</Badge>}
                {product.bestSeller && <Badge className="bg-brand-primary text-white hover:bg-brand-primary">Best Seller</Badge>}
              </div>

              <h1 className="mt-5 text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 text-lg font-medium text-brand-primary/80">{product.tagline}</p>

              {/* Description */}
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Features */}
              <div className="mt-8 rounded-2xl bg-muted/60 p-5">
                <h2 className="font-heading text-lg font-semibold text-foreground">Why you&apos;ll love it</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-6 text-sm font-medium text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-brand-primary" />
                  Ships in 7 days
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-brand-primary" />
                  Global shipping
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="group flex-1 shadow-lg shadow-brand-primary/25">
                  <Link href={`/inquiry?product=${product.slug}`}>
                    <Send className="mr-2 h-4 w-4" />
                    Quick Inquiry
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-green-600 bg-green-50/60 text-green-700 hover:bg-green-100 hover:text-green-800">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${product.name} on WhatsApp`}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Enquiry
                  </a>
                </Button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-muted/40 pb-12 pt-16 md:pb-16 md:pt-20">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Specifications"
            title="Technical Details"
            description="Every spec, measured and verified in our ISO 9001 certified facility."
            align="left"
          />
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <table className="w-full">
              <tbody>
                {product.specifications.map((spec, i) => (
                  <tr
                    key={spec.label}
                    className={i % 2 === 0 ? 'bg-muted/30' : 'bg-card'}
                  >
                    <th
                      scope="row"
                      className="w-1/3 px-6 py-4 text-left text-sm font-semibold text-foreground"
                    >
                      {spec.label}
                    </th>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="bg-muted/40 pb-12 pt-16 md:pb-16 md:pt-20">
          <div className="container-wide">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-brand-primary" />
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Frequently Asked Questions
                </h2>
              </div>
              <Accordion type="single" collapsible className="mt-6">
                {product.faqs.map((faq, i) => (
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
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-12 pt-16 md:pb-16 md:pt-20">
          <div className="container-wide">
            <div className="flex items-center justify-between">
              <SectionHeading
                eyebrow="You May Also Like"
                title="Related Products"
                align="left"
              />
              <Button asChild variant="ghost" size="sm">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  All Products
                </Link>
              </Button>
            </div>
            <div className="mt-10">
              <ContentSlider itemsPerView={{ base: 1, sm: 2, md: 3, lg: 4 }} autoPlay interval={4500} gap={24}>
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
              </ContentSlider>
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
