import type { Stat } from '@/lib/types';

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="scroll-motion group relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-premium lg:p-7">
      <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-brand-primary to-brand-accent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="font-heading text-3xl font-bold text-foreground sm:text-4xl xl:text-4xl">
        {stat.value}
        <span className="text-brand-primary">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-foreground/80 sm:text-sm">
        {stat.label}
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{stat.description}</p>
    </div>
  );
}
