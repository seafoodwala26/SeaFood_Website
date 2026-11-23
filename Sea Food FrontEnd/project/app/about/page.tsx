import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Handshake, Target } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/layout/section-heading";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FAQ } from "@/components/sections/faq";
import { ReadMoreContent } from "@/components/sections/read-more-content";
import { aboutFaqs, aboutWhyChooseUs } from "@/lib/data/content";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About Seafood Wala | Fresh Fish, Prawns & Seafood",
  description:
    "Learn about Seafood Wala, a seafood-focused business offering fish, prawns and other seafood options for home customers, restaurants and food businesses.",
  path: "/about"
});

const customerGroups = [
  "Families and individual seafood lovers",
  "Restaurants and hotels",
  "Cafés and food outlets",
  "Caterers and event businesses",
  "Commercial kitchens",
  "Businesses looking for bulk seafood supplies",
];

const seafoodSelection = [
  {
    title: "Fresh Fish",
    description:
      "Fish can be used in traditional curries, fish fry, grilled dishes, baked meals, and many regional recipes. Contact us to ask which varieties are currently available.",
  },
  {
    title: "Fresh Prawns",
    description:
      "Prawns work well in curries, biryani, grilled dishes, noodles, stir-fries, and more. Ask our team about current availability and quantity options.",
  },
  {
    title: "Other Seafood Options",
    description:
      "Our selection can change with sourcing and availability. Contact us directly for the latest seafood options and order details.",
  },
];

const businessRequirements = [
  "Seafood varieties and availability",
  "Required quantities and bulk orders",
  "Pricing and order schedules",
  "Delivery or collection requirements",
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        title="About Seafood Wala"
        description="Bringing quality seafood closer to home customers, restaurants, and food businesses."
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
                <ReadMoreContent
                  blocks={[
                    {
                      type: "paragraph",
                      text: "At Seafood Wala, our aim is to make seafood sourcing simple and convenient. We focus on understanding customer requirements and providing seafood options based on availability, quantity, and order needs.",
                    },
                    { type: "heading", text: "Our Approach to Seafood" },
                    {
                      type: "paragraph",
                      text: "Fish and prawns can be prepared in many ways, from traditional curries and crispy fried fish to grilled dishes, biryani, and stir-fries. A good seafood experience begins with quality ingredients, careful sourcing, and responsible handling.",
                    },
                    {
                      type: "paragraph",
                      text: "Our approach is straightforward: provide seafood options based on availability, communicate clearly, and make the ordering process as convenient as possible.",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customers and seafood range */}
      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Fresh Seafood for Different Needs"
            description="From a family meal to a commercial kitchen, every customer has different seafood requirements."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {customerGroups.map((group) => (
              <li
                key={group}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 text-sm font-medium leading-relaxed text-foreground shadow-soft"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-primary" aria-hidden="true" />
                {group}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm leading-relaxed text-muted-foreground">
            Contact us to enquire about available seafood varieties, quantities, pricing, and order requirements.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our Seafood Selection"
            title="Options for Your Table"
            description="Our seafood selection may vary depending on sourcing and availability. Ask our team about the latest options."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {seafoodSelection.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-premium sm:p-7"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 font-heading text-sm font-bold text-brand-primary">
                  0{index + 1}
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
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

      <WhyChooseUs
        items={aboutWhyChooseUs}
        description="A quality-focused, customer-first approach with clear communication about seafood availability, quantities, and order requirements."
      />

      {/* Quality and freshness */}
      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                Quality and Freshness
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                Quality and Freshness Matter
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Seafood requires careful handling and appropriate storage throughout the supply
                process. We understand that customers expect seafood to be handled with care.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Our focus is on maintaining product quality and providing clear information about
                available seafood and order requirements. We believe attention to detail can
                contribute to a better customer experience.
              </p>
            </div>
            <div className="relative aspect-[4/3] self-start overflow-hidden rounded-3xl shadow-premium lg:sticky lg:top-24">
              <Image
                src="https://images.pexels.com/photos/8352394/pexels-photo-8352394.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Fresh seafood being carefully prepared"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Home and business customers */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="How We Help"
            title="Seafood for Home and Business"
            description="We aim to make sourcing seafood more convenient, whether you are planning a meal at home or sourcing for a food business."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="font-heading text-xl font-bold text-foreground">Serving Home Seafood Lovers</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Cooking seafood at home can make everyday meals, family gatherings, celebrations,
                and special dinners memorable. Contact us to discuss seafood options and quantities
                for your next meal.
              </p>
            </article>
            <article className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="font-heading text-xl font-bold text-foreground">
                Supporting Restaurants and Food Businesses
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Restaurants and commercial kitchens may need larger quantities or regular supply.
                Businesses can contact us to discuss:
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {businessRequirements.map((requirement) => (
                  <li key={requirement} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" aria-hidden="true" />
                    {requirement}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl bg-navy-gradient px-6 py-10 text-center shadow-premium sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-brand-primary/20 blur-3xl" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent-light">
                Your Seafood Partner
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
                Looking for Fresh Seafood?
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/70 sm:text-base">
                Contact Seafood Wala to ask about current seafood availability, pricing, quantity
                options, and ordering.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:bg-white/90"
              >
                Contact Seafood Wala
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={aboutFaqs} />
    </PageShell>
  );
}
