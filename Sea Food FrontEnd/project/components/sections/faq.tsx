import {Accordion,AccordionContent,AccordionItem,AccordionTrigger} from '@/components/ui/accordion';
import Image from 'next/image';
import { SectionHeading } from '@/components/layout/section-heading';
import { FAQSchema } from '@/lib/seo/schema';
import { faqs } from '@/lib/data/content';

export function FAQ() {
  return (
    <section id="faq" className="section-padding">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                eyebrow="FAQ"
                title="Frequently Asked Questions"
                description="Everything you need to know about ordering, shipping, warranties, and OEM partnerships."
                align="left"
              />
              <p className="mt-6 text-sm text-muted-foreground">
                Can&apos;t find what you are looking for?{' '}
                <a href="/contact" className="font-medium text-brand-primary hover:underline">
                  Contact our team
                </a>
                .
              </p>
              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-soft">
                <Image
                  src="https://images.pexels.com/photos/8352344/pexels-photo-8352344.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Fresh seafood prepared for delivery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-sm font-medium text-white">
                  Freshness, quality, and reliable delivery from ocean to table.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FAQSchema items={faqs} />
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl border border-border bg-card px-5 shadow-soft data-[state=open]:shadow-premium"
                >
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
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
      </div>
    </section>
  );
}
