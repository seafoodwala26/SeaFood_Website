import { Shield, Globe, Leaf, Award, Truck, Headset } from 'lucide-react';
import { whyChooseUs } from '@/lib/data/content';

const iconMap = {
  shield: Shield,
  globe: Globe,
  leaf: Leaf,
  award: Award,
  truck: Truck,
  headset: Headset,
};

const accentColors = [
  'from-brand-primary/20 to-brand-primary/5',
  'from-brand-accent/20 to-brand-accent/5',
  'from-brand-primary-light/20 to-brand-primary/5',
  'from-brand-accent-light/20 to-brand-accent/5',
  'from-brand-primary/15 to-brand-accent/5',
  'from-brand-accent/15 to-brand-primary/5',
];

export function WhyChooseUs({
  items = whyChooseUs,
  description = 'Choosing a seafood supplier is about more than simply finding a product. Customers want freshness, quality, consistency, and responsive service. Seafood Wala is built around these essential priorities.',
}: {
  items?: typeof whyChooseUs;
  description?: string;
}) {
  return (
    <section className="section-padding bg-navy-gradient text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_0%_50%,hsl(203_92%_51%/0.15),transparent_70%)]" />
        <div className="absolute right-0 bottom-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_100%_80%,hsl(17_89%_51%/0.12),transparent_70%)]" />
      </div>

      <div className="container-wide relative">
        <div className="mx-auto max-w-2xl text-center">
          {/* <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-accent-light">
            Why Seafood Wala
          </span> */}
          <h2 className="section-title-reveal mt-5 font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Why Choose Seafood Wala?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60 text-balance sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-5">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div
                key={item.title}
                className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333333%-0.833333rem)]"
              >
                <div
                  className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${accentColors[index % accentColors.length]} blur-2xl transition-opacity group-hover:opacity-100 opacity-60`}
                />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/30 to-brand-accent/20 text-brand-primary-light transition-all duration-300 group-hover:scale-110 group-hover:from-brand-primary group-hover:to-brand-accent group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
