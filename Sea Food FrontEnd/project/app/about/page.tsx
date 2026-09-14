import type { Metadata } from 'next';
import Image from 'next/image';
import { PageShell } from '@/components/layout/page-shell';
import { PageHeader } from '@/components/layout/page-header';
import { SectionHeading } from '@/components/layout/section-heading';
import { Stats } from '@/components/sections/stats';
import { CTAInquiry } from '@/components/sections/cta-inquiry';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/constants/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Seafood Wala',
  description:'Seafood Wala supplies premium seafood with HACCP and MSC certified quality.',
  path: '/about',
});

const milestones = [
  { year: '2001', title: 'Founded in Miami', description: 'Robert Callahan opens a small fish brokerage supplying local restaurants with fresh daily catch.' },
  { year: '2006', title: 'First Export Contract', description: 'Seafood Wala signs its first international distribution agreement with a European seafood importer.' },
  { year: '2012', title: 'HACCP Certification', description: 'Our Miami facility earns HACCP certification, formalizing our food safety management system.' },
  { year: '2017', title: 'Private-Label Division', description: 'We begin custom processing and private-label packaging for distributors across Africa, South America, and Europe.' },
  { year: '2021', title: 'Sustainability Program', description: 'MSC certified sustainable sourcing and recyclable cold-chain packaging roll out across the catalog.' },
  { year: '2026', title: '160+ Products', description: 'Our catalog surpasses 160 products across six categories, shipped to 40+ countries worldwide.' },
];

const values = [
  {
    title: 'Quality',
    description: 'Every catch is inspected, graded, and cold-chain handled by people who know seafood. We sweat the details that matter on the plate.',
  },
  {
    title: 'Integrity',
    description: 'We honor our freshness guarantee, meet our delivery times, and stand behind every product we ship.',
  },
  {
    title: 'Sustainability',
    description: 'We invest in MSC and ASC certified sourcing, recyclable packaging, and marine conservation partnerships.',
  },
  {
    title: 'Partnership',
    description: 'Our distributors and private-label clients are long-term partners. Your success is our success.',
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        title="From Ocean to Table, Worldwide"
        description="Seafood Wala supplies premium fresh fish, shrimp, lobster, and shellfish to distributors, restaurants, and retailers across the globe."
        breadcrumbItems={[{ name: 'About', href: '/about' }]}
        pageSlug="about"
      />

      {/* Story */}
      <section id="story" className="section-padding">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-premium">
                <Image
                  src="https://images.pexels.com/photos/8352344/pexels-photo-8352344.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Seafood Wala seafood facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                Our Story
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                From a Miami Dock to a Global Supplier
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  In {siteConfig.foundedYear}, Robert Callahan — a third-generation commercial
                  fisherman — grew tired of inconsistent quality and broken cold chains that
                  spoiled good seafood. He rented a small facility on Miami&apos;s Harbor Boulevard
                  and started sourcing and grading his own.
                </p>
                <p>
                  Word spread quickly among local chefs, and within five years Seafood Wala was
                  supplying restaurants across Florida. Today, our 40,000-square-foot facility
                  processes over 160 products and exports to distributors, restaurants, and
                  private-label brands in 40+ countries.
                </p>
                <p>
                  We are still a family-owned company, still led by fishermen, and still obsessed
                  with delivering seafood that performs when it matters most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* Milestones */}
      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our Journey"
            title="25 Years of Milestones"
            description="From a single dock to a global exporter — here are the moments that shaped Seafood Wala."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
              >
                <span className="font-heading text-3xl font-bold gradient-text">{m.year}</span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Core Values"
            description="The principles that guide every product we source and every relationship we keep."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover-lift">
                <h3 className="font-heading text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Sustainability */}
      <section id="sustainability" className="section-padding bg-muted/40">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-accent">
                Sustainability
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                Fishing for the Future
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Healthy oceans are the foundation of our business. We invest in sourcing and
                practices that protect the waters our customers and communities depend on.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  MSC certified sustainable wild-caught sourcing
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  ASC certified responsible aquaculture partners
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  Recyclable cold-chain packaging on all shipments
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  1% of revenue donated to marine conservation partners
                </li>
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-premium">
              <Image
                src="https://images.pexels.com/photos/8352394/pexels-photo-8352394.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Sustainable seafood sourcing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <CTAInquiry />
    </PageShell>
  );
}
