import { useState } from 'react';
import { ApiRequestError } from '@/lib/api';

export function useAdminFormErrors() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleError = (error: Error) => {
    if (error instanceof ApiRequestError && Object.keys(error.fieldErrors).length > 0) {
      setFieldErrors(error.fieldErrors);
      setFormError(null);
      return;
    }

    setFormError(error.message);
  };

  const clearFieldError = (field: string) => {
    setFieldErrors((current) => {
      return Object.fromEntries(Object.entries(current).filter(([key]) =>
        key !== field && !key.startsWith(`${field}.`)
      ));
    });
    setFormError(null);
  };

  const clearErrors = () => {
    setFieldErrors({});
    setFormError(null);
  };

  return { fieldErrors, formError, setFieldErrors, setFormError, handleError, clearFieldError, clearErrors };
}
