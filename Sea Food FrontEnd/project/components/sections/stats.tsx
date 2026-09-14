'use client';

import { StatCard } from '@/components/cards/stat-card';
import { usePublicSiteConfiguration } from '@/lib/hooks/use-site-configuration';

const defaultStats = [
  { label: 'Years of Experience', value: 10, suffix: '+', description: 'Building trusted seafood partnerships since day one.' },
  { label: 'Countries Served', value: 50, suffix: '+', description: 'Delivering quality seafood across global markets.' },
  { label: 'Happy Clients', value: 200, suffix: '+', description: 'Restaurants, distributors, and retailers served.' },
  { label: 'Products Exported', value: 200, suffix: '+', description: 'A growing catalog of premium seafood products.' },
];

export function Stats() {
  const { data: configuration } = usePublicSiteConfiguration();
  const stats = [
    { ...defaultStats[0], value: configuration?.yearsOfExperience ?? defaultStats[0].value },
    { ...defaultStats[1], value: configuration?.countriesServed ?? defaultStats[1].value },
    { ...defaultStats[2], value: configuration?.happyClients ?? defaultStats[2].value },
    { ...defaultStats[3], value: configuration?.productsExported ?? defaultStats[3].value },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-brand-primary/[0.03] to-background py-16 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
      <div className="container-wide">
        <div className="motion-reveal mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
            By the Numbers
          </span>
          <h2 className="section-title-reveal mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted Worldwide
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Decades of craftsmanship, a global community, and seafood delivered to every corner of the world.
          </p>
        </div>

        <div className="motion-stagger mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="transition-transform duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <StatCard stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
