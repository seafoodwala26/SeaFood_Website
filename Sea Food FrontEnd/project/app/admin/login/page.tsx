'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Waves, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeProvider } from '@/components/admin/theme-provider';
import { authApi } from '@/lib/api';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useMutation({ mutationFn: authApi.login });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    try {
      await loginMutation.mutateAsync({ email, password });
      router.replace(searchParams.get('next') || '/admin');
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in.');
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/30 p-4">
        {/* Background mesh */}
        <div className="absolute inset-0 bg-ocean-mesh opacity-50" aria-hidden="true" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-brand-accent/10 blur-3xl" aria-hidden="true" />

        <div className="relative w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <h1 className="mt-5 font-heading text-2xl font-bold tracking-tight text-foreground">
              Admin Panel
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to manage Seafood Wala
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-premium sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {error && (
                <div className="flex items-center gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@seafoodwala.in"
                    className="pl-9"
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="px-9"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
              </label>

              <Button type="submit" size="lg" className="w-full group" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>

          </div>

        </div>
      </div>
    </ThemeProvider>
  );
}
