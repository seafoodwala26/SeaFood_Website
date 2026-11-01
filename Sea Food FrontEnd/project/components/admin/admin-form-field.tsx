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
    <div
      data-invalid={Boolean(error)}
      className={cn(
      'space-y-2',
      error && '[&_input]:border-destructive [&_input]:focus-visible:ring-destructive [&_textarea]:border-destructive [&_textarea]:focus-visible:ring-destructive [&_select]:border-destructive [&_button[aria-haspopup]]:border-destructive',
      className,
      )}
    >
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
