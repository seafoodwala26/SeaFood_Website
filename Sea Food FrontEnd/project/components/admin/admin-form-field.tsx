import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface AdminFormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function AdminFormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  className,
  children,
}: AdminFormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p className="text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
