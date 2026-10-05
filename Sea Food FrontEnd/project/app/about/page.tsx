import type { Metadata } from "next";
import Image from "next/image";
import { Handshake, Target } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/layout/section-heading";
import { Stats } from "@/components/sections/stats";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FAQ } from "@/components/sections/faq";
import { CTAInquiry } from "@/components/sections/cta-inquiry";
import { aboutFaqs, aboutWhyChooseUs } from "@/lib/data/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = buildPageMetadata({
  title: "About Seafood Wala | Fresh Fish, Prawns & Seafood",
  description:
    "Learn about Seafood Wala, a seafood-focused business offering fish, prawns and other seafood options for home customers, restaurants and food businesses.",
  path: "/about"
});

const milestones = [
  {
    year: "2001",
    title: "Founded in Miami",
    description:
      "Robert Callahan opens a small fish brokerage supplying local restaurants with fresh daily catch."
  },
  {
    year: "2006",
    title: "First Export Contract",
    description:
      "Seafood Wala signs its first international distribution agreement with a European seafood importer."
  },
  {
    year: "2012",
    title: "HACCP Certification",
    description:
      "Our Miami facility earns HACCP certification, formalizing our food safety management system."
  },
  {
    year: "2017",
    title: "Private-Label Division",
    description:
      "We begin custom processing and private-label packaging for distributors across Africa, South America, and Europe."
  },
  {
    year: "2021",
    title: "Sustainability Program",
    description:
      "MSC certified sustainable sourcing and recyclable cold-chain packaging roll out across the catalog."
  },
  {
    year: "2026",
    title: "160+ Products",
    description:
      "Our catalog surpasses 160 products across six categories, shipped to 40+ countries worldwide."
  }
];

const values = [
  {
    title: "Quality",
    description:
      "Every catch is inspected, graded, and cold-chain handled by people who know seafood. We sweat the details that matter on the plate."
  },
  {
    title: "Integrity",
    description:
      "We honor our freshness guarantee, meet our delivery times, and stand behind every product we ship."
  },
  {
    title: "Sustainability",
    description:
      "We invest in MSC and ASC certified sourcing, recyclable packaging, and marine conservation partnerships."
  },
  {
    title: "Partnership",
    description:
      "Our distributors and private-label clients are long-term partners. Your success is our success."
  }
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        title="From Ocean to Table, Worldwide"
        description="Seafood Wala supplies premium fresh fish, shrimp, lobster, and shellfish to distributors, restaurants, and retailers across the globe."
        breadcrumbItems={[{ name: "About", href: "/about" }]}
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
                About Seafood Wala
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                Bringing Quality Seafood Closer to You
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Welcome to <b>Seafood Wala</b>, a seafood-focused business
                  committed to making quality fish, prawns, and other seafood
                  products easier to source for customers and food businesses.
                </p>
                <p>
                  We understand that when it comes to seafood, freshness,
                  quality, proper handling, and reliable service matter. Whether
                  you are preparing a delicious seafood meal at home, planning a
                  family gathering, or managing a restaurant, hotel, café,
                  catering business, or commercial kitchen, choosing the right
                  seafood supplier can make a real difference.
                </p>
                <p>
                  At Seafood Wala, our aim is to make seafood sourcing simple
                  and convenient. We focus on understanding customer
                  requirements and providing seafood options based on
                  availability, quantity, and order needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

 {/* Mission and customer commitment */}
      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our Purpose"
            title="Our Mission & Commitment"
            description="The principles behind how we serve seafood customers and businesses."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <article className="group relative overflow-hidden rounded-3xl bg-navy-gradient p-6 text-white shadow-premium sm:p-8 lg:p-10">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-primary/20 blur-3xl transition-opacity group-hover:opacity-80"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-brand-accent-light">
                  <Target className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold sm:text-3xl">
                  Our Mission
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/75 sm:text-base">
                  <p>
                    Our mission is simple: <b>to make quality seafood sourcing
                    easier and more convenient for customers.</b>
                  </p>
                  <p>
                    We want Seafood Wala to be a dependable name for people
                    looking for fish, prawns, and other seafood products.
                  </p>
                  <p>
                    By focusing on quality, customer requirements, and reliable
                    communication, we aim to create long-term relationships with
                    the people and businesses we serve.
                  </p>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-premium sm:p-8 lg:p-10">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-accent/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent">
                  <Handshake className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Our Commitment to Customers
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <p>
                    At Seafood Wala, we know that customers have choices when
                    purchasing seafood. That is why we want every interaction
                    to be straightforward and transparent.
                  </p>
                  <p>
                    We aim to provide useful information about seafood
                    availability, quantities, and ordering requirements so
                    customers can make informed purchasing decisions.
                  </p>
                  <p>
                    For us, seafood is not simply another product. It is an
                    ingredient that becomes part of family meals, restaurant
                    dishes, celebrations, and memorable dining experiences.
                  </p>
                  <p>
                    We want to play our part by helping customers source
                    seafood according to their needs.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      <WhyChooseUs
        items={aboutWhyChooseUs}
        description=""
      />

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
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft hover-lift"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="section-padding bg-muted/40">
        <div className="container-wide">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-accent">
                Sustainability
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            Supporting Restaurants and Food Businesses
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
               Restaurants and commercial kitchens often need seafood in larger quantities and may require dependable sourcing for their regular menus.</p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">Seafood Wala can support businesses that require fish, prawns, and other seafood according to their requirements and availability.</p>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground">Restaurants, hotels, cafés, caterers, and food businesses can contact us to discuss:</p>
              <ul className="mt-6 space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  Seafood varieties
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                     Required quantities
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  Bulk orders
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  Product availability
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  Pricing
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  Order schedules
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  Delivery or collection requirements
                </li>
              </ul>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Our goal is to make seafood procurement more straightforward for food businesses.
              </p>
            </div>
            <div className="relative aspect-[4/3] self-start overflow-hidden rounded-3xl shadow-premium lg:sticky lg:top-24">
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

      <FAQ items={aboutFaqs} />
    </PageShell>
  );
}
