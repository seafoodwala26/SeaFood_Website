import Image from 'next/image';
import { Star, Quote, MapPin } from 'lucide-react';
import type { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-premium">
      <div className="flex items-center justify-between">
        <Quote className="h-8 w-8 text-brand-primary/30" />
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={
                i < testimonial.rating
                  ? 'h-4 w-4 fill-amber-400 text-amber-400'
                  : 'h-4 w-4 text-muted-foreground/30'
              }
            />
          ))}
        </div>
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={44}
          height={44}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className="font-heading text-sm font-semibold text-foreground">
            {testimonial.name}
          </span>
          <span className="text-xs text-muted-foreground">{testimonial.role}</span>
          <span className="text-xs text-muted-foreground">
            {testimonial.company} · {testimonial.location}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
