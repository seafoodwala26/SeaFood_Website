'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="h-9 w-9"
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <div className="h-4 w-4" />
      )}
    </Button>
  );
}
