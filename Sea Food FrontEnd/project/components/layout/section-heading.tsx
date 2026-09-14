import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'motion-reveal max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
          {eyebrow}
        </span>
      )}
      <h2 className="section-title-reveal mt-4 font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
