  'use client';

  import { useState, useEffect, FormEvent } from 'react';
  import { useSearchParams } from 'next/navigation';
  import { useMutation } from '@tanstack/react-query';
  import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Textarea } from '@/components/ui/textarea';
  import { Label } from '@/components/ui/label';
  import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
  import { countries } from '@/lib/data/content';
  import { usePublicProducts } from '@/lib/hooks/use-catalog';
  import { inquiryApi } from '@/lib/api';

  interface FormState {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    product: string;
    quantity: string;
    message: string;
  }

  interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    country?: string;
    product?: string;
    quantity?: string;
    message?: string;
  }

  const initialState: FormState = {
    fullName: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    product: '',
    quantity: '',
    message: '',
  };

  interface UnifiedInquiryFormProps {
    variant?: 'full' | 'compact';
    successTitle?: string;
    successMessage?: string;
    loadProducts?: boolean;
  }

  export function UnifiedInquiryForm({
    variant = 'full',
    successTitle = 'Inquiry Submitted',
    successMessage = 'Thank you for your interest. Our export team will review your inquiry and respond within one business day.',
    loadProducts = true,
  }: UnifiedInquiryFormProps) {
    const searchParams = useSearchParams();
    const { data: products = [] } = usePublicProducts({ limit: 100, enabled: loadProducts });
    const [values, setValues] = useState<FormState>(initialState);
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [submitError, setSubmitError] = useState<string | null>(null);
    const inquiryMutation = useMutation({
      mutationFn: inquiryApi.create,
      onSuccess: () => {
        setValues({ ...initialState });
        setErrors({});
        setSubmitError(null);
        setStatus('success');
      },
      onError: (error: Error) => {
        setSubmitError(error.message);
        setStatus('error');
      },
    });

    useEffect(() => {
      const product = searchParams.get('product');
      if (product && products.some((item) => item.slug === product)) {
        setValues((previous) => ({ ...previous, product }));
      }
    }, [products, searchParams]);

    const validate = (): boolean => {
      const next: FormErrors = {};
      if (!values.fullName.trim()) next.fullName = 'Full name is required';
      if (!values.email.trim()) { next.email = 'Email is required';}
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) { next.email = 'Enter a valid email address';}
      if (!values.phone.trim()) { next.phone = 'Phone number is required';
      } else if (values.phone.replace(/[^0-9]/g, '').length < 7) { next.phone = 'Enter a valid phone number';}
      if (!values.country) next.country = 'Please select a country';
      if (!values.product) next.product = 'Please select a product';
      if (!values.quantity.trim()) { next.quantity = 'Enter a quantity, for example 1000kg';}
      if (!values.message.trim() || values.message.trim().length < 10) {
        next.message = 'Please provide a message (at least 10 characters)';
      }
      setErrors(next);
      return Object.keys(next).length === 0;
    };

    const handleChange = (field: keyof FormState, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      setSubmitError(null);
      setStatus('submitting');
      inquiryMutation.mutate({ ...values });
    };

    if (status === 'success') {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-accent/30 bg-brand-accent/5 p-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent/10">
            <CheckCircle2 className="h-8 w-8 text-brand-accent" />
          </div>
          <h3 className="mt-5 font-heading text-2xl font-bold text-foreground">{successTitle}</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">{successMessage}</p>
          <Button onClick={() => setStatus('idle')} variant="outline" className="mt-6">
            Submit Another Inquiry
          </Button>
        </div>
      );
    }

    const isCompact = variant === 'compact';

    return (
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {status === 'error' && (
          <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {submitError || 'Something went wrong. Please try again or email us directly.'}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Full Name" required error={errors.fullName} htmlFor="fullName">
            <Input
              id="fullName"
              value={values.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Jane Doe"
              aria-invalid={!!errors.fullName}
            />
          </FormField>
          <FormField label="Company Name" htmlFor="company">
            <Input
              id="company"
              value={values.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Acme Seafood Co."
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Email Address" required error={errors.email} htmlFor="email">
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@company.com"
              aria-invalid={!!errors.email}
            />
          </FormField>
          <FormField label="Phone Number" required error={errors.phone} htmlFor="phone">
            <Input
              id="phone"
              type="tel"
              value={values.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (305) 555-0100"
              aria-invalid={!!errors.phone}
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Country" required error={errors.country} htmlFor="country">
            <Select value={values.country} onValueChange={(v) => handleChange('country', v)}>
              <SelectTrigger id="country" aria-invalid={!!errors.country}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Product Selection" required error={errors.product} htmlFor="product">
            <Select value={values.product} onValueChange={(v) => handleChange('product', v)}>
              <SelectTrigger id="product" aria-invalid={!!errors.product}>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.slug} value={p.slug}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <FormField label="Quantity" required error={errors.quantity} htmlFor="quantity">
          <Input
            id="quantity"
            type="text"
            value={values.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
            placeholder="e.g. 1000kg or 2 tons"
            aria-invalid={!!errors.quantity}
          />
        </FormField>

        <FormField label="Message" required error={errors.message} htmlFor="message">
          <Textarea
            id="message"
            rows={isCompact ? 4 : 5}
            value={values.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Tell us about your requirements, target market, or customization needs..."
            aria-invalid={!!errors.message}
          />
        </FormField>

        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={inquiryMutation.isPending}
        >
          {inquiryMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Inquiry'
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          By submitting, you agree to be contacted by our sales team. We never share your information.
        </p>
      </form>
    );
  }

  interface FormFieldProps {
    label: string;
    htmlFor: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
  }

  function FormField({ label, htmlFor, required, error, children }: FormFieldProps) {
    return (
      <div className="space-y-2">
        <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-0.5 text-destructive">*</span>}
        </Label>
        {children}
        {error && (
          <p className="text-xs font-medium text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
