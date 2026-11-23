import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/layout/section-heading';

const seafoodSelection = [
  {
    title: 'Fresh Fish',
    description:
      'From crispy fried fish and grilled preparations to traditional curries and regional recipes, fish can suit many meals. Ask us about currently available varieties.',
  },
  {
    title: 'Fresh Prawns',
    description:
      'Prawns can be used in curries, biryanis, stir-fries, grilled dishes, and more. Contact us to check current availability and quantity options.',
  },
  {
    title: 'Other Seafood',
    description:
      'Our seafood range may vary with sourcing and availability. Get in touch to ask about current options, quantities, and pricing.',
  },
];

const customerTypes = [
  {
    title: 'For Home Customers',
    description:
      'Planning an everyday meal, weekend dinner, family gathering, or celebration? Ask us about seafood options and quantities for your needs.',
  },
  {
    title: 'For Restaurants and Hotels',
    description:
      'Discuss regular orders, larger quantities, availability, and sourcing requirements for your menu with our team.',
  },
  {
    title: 'For Cafés and Food Businesses',
    description:
      'Cafés, caterers, food outlets, and commercial kitchens can contact us to discuss seafood requirements.',
  },
];

const orderSteps = [
  {
    title: 'Contact Us',
    description: 'Enquire about the seafood that is currently available.',
  },
  {
    title: 'Choose Your Seafood',
    description: 'Tell us the product and quantity you are looking for.',
  },
  {
    title: 'Confirm Your Order',
    description: 'Discuss availability, pricing, and order details with our team.',
  },
  {
    title: 'Arrange Fulfilment',
    description: 'Confirm the delivery or collection process for your order.',
  },
];

const inquiryTopics = [
  'Available seafood varieties',
  'Current pricing and quantity options',
  'Bulk, restaurant, and business orders',
  'Delivery or collection requirements',
];

export function HomeSeafoodContent() {
  return (
    <>
      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Quality From Sea to Table"
            title="Fresh Seafood for Every Seafood Lover"
            description="Seafood Wala brings together fish, prawns, and other seafood options for families, seafood lovers, restaurants, hotels, cafés, and food businesses."
          />
          <p className="motion-reveal mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-muted-foreground sm:text-base">
            Freshness plays an important role in the taste, texture, and cooking experience of
            seafood. We focus on careful sourcing and responsible handling, and aim to make the
            buying experience straightforward and convenient.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {seafoodSelection.map((item, index) => (
              <article
                key={item.title}
                className="scroll-motion rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-premium sm:p-7"
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

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Home, Restaurant, and Business"
            title="Seafood for Different Needs"
            description="Whether you are planning a meal at home or sourcing for a food business, share your requirements with us."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {customerTypes.map((customer, index) => (
              <article
                key={customer.title}
                className="scroll-motion rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-7"
              >
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-primary">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-heading text-lg font-bold text-foreground">{customer.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{customer.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/40">
        <div className="container-wide">
          <SectionHeading
            eyebrow="A Simple Ordering Process"
            title="From Seafood Sourcing to Your Kitchen"
            description="We want customers to know what they are enquiring about and have a convenient way to discuss order details."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {orderSteps.map((step, index) => (
              <li key={step.title} className="scroll-motion rounded-2xl border border-border bg-card p-5 shadow-soft">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-heading font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 rounded-3xl border border-brand-primary/15 bg-gradient-to-br from-brand-primary/5 via-background to-brand-accent/5 p-6 sm:p-9 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-center">
            <div className="scroll-motion">
              <span className="inline-flex rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                Quality and Care
              </span>
              <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Quality Seafood Starts With Proper Handling
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Seafood needs careful handling, storage, packaging, and transportation to help
                preserve quality throughout the supply process. We aim to handle orders responsibly
                and communicate clearly about availability and fulfilment.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                From a family meal to a restaurant menu, Seafood Wala aims to be a dependable
                seafood partner by focusing on product quality, customer requirements, and
                responsive service.
              </p>
            </div>
            <div className="scroll-motion rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
              <h3 className="font-heading text-lg font-bold text-foreground">Looking for Fresh Seafood?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Contact our team to ask about:
              </p>
              <ul className="mt-4 space-y-2">
                {inquiryTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" aria-hidden="true" />
                    {topic}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-deep"
              >
                Contact Seafood Wala
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
