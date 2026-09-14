'use client';

import { SectionHeading } from '@/components/layout/section-heading';
import { TestimonialCard } from '@/components/cards/testimonial-card';
import { ContentSlider } from '@/components/ui/content-slider';
import { testimonials } from '@/lib/data/content';

export function Testimonials() {
  return (
    <section className="`bg-muted/40">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Customer Stories"
          title="Trusted by Buyers Worldwide"
          description="From Michelin-starred chefs to international distributors, our customers rely on Seafood Wala every day."
        />
        <div className="mt-12">
          <ContentSlider
            itemsPerView={{ base: 1, sm: 1, md: 2, lg: 3 }}
            showDots={true}
            autoPlay
            interval={5000}
            gap={24}
          >
            {testimonials.slice(0, 6).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </ContentSlider>
        </div>
      </div>
    </section>
  );
}
