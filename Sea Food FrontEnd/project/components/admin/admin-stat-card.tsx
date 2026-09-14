import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface AdminStatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  accent?: 'primary' | 'accent' | 'amber' | 'violet';
}

const accentClasses = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-brand-accent/10 text-brand-accent',
  amber: 'bg-amber-500/10 text-amber-500',
  violet: 'bg-violet-500/10 text-violet-500',
};

export function AdminStatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  accent = 'primary',
}: AdminStatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:shadow-premium">
      <div className="flex items-center justify-between">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', accentClasses[accent])}>
          <Icon className="h-5 w-5" />
        </div>
        {change && (
          <span
            className={cn(
              'flex items-center gap-1 text-xs font-semibold',
              trend === 'up' ? 'text-brand-accent' : 'text-destructive'
            )}
          >
            {trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {change}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-heading text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
