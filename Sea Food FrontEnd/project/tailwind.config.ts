import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ocean-gradient':
          'linear-gradient(135deg, hsl(var(--brand-primary)) 0%, hsl(var(--brand-primary-deep)) 100%)',
        'ocean-mesh':
          'radial-gradient(at 20% 20%, hsl(203 92% 51% / 0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(17 89% 51% / 0.10) 0px, transparent 50%), radial-gradient(at 0% 80%, hsl(220 100% 21% / 0.08) 0px, transparent 50%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 12px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        brand: {
          primary: 'hsl(var(--brand-primary))',
          'primary-deep': 'hsl(var(--brand-primary-deep))',
          'primary-light': 'hsl(var(--brand-primary-light))',
          secondary: 'hsl(var(--brand-secondary))',
          accent: 'hsl(var(--brand-accent))',
          'accent-light': 'hsl(var(--brand-accent-light))',
          'accent-deep': 'hsl(var(--brand-accent-deep))',
          surface: 'hsl(var(--brand-surface))',
          navy: 'hsl(var(--brand-navy))',
          black: 'hsl(var(--brand-black))',
          white: 'hsl(var(--brand-white))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-fast': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'wave-move': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'slide-fade-in': {
          '0%': { opacity: '0', transform: 'translateX(60px) scale(1.05)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        'slide-fade-out': {
          '0%': { opacity: '1', transform: 'translateX(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateX(-60px) scale(0.95)' },
        },
        'slide-zoom-in': {
          '0%': { opacity: '0', transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        'slide-text-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-text-up-delayed': {
          '0%, 15%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-badge-in': {
          '0%': { opacity: '0', transform: 'translateY(-20px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'slide-button-in': {
          '0%, 30%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hero-blur-in': {
          '0%': { opacity: '0', filter: 'blur(20px)', transform: 'scale(1.05)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' },
        },
        'hero-slide-left': {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'hero-slide-up-stagger': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.15) translate(-2%, -1%)' },
        },
        'fade-slide-in': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer-bg': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(15, 137, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(15, 137, 246, 0.6)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-fast': 'fade-in-fast 0.3s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.5s infinite',
        'wave-move': 'wave-move 12s ease infinite',
        'slide-fade-in': 'slide-fade-in 0.8s ease-out forwards',
        'slide-fade-out': 'slide-fade-out 0.8s ease-in forwards',
        'slide-zoom-in': 'slide-zoom-in 0.8s ease-out forwards',
        'slide-ken-burns': 'slide-ken-burns 8s ease-out forwards',
        'slide-text-up': 'slide-text-up 0.7s ease-out forwards',
        'slide-text-up-delayed': 'slide-text-up-delayed 1s ease-out forwards',
        'slide-badge-in': 'slide-badge-in 0.5s ease-out forwards',
        'slide-button-in': 'slide-button-in 0.8s ease-out forwards',
        'hero-blur-in': 'hero-blur-in 1.2s ease-out forwards',
        'hero-slide-left': 'hero-slide-left 0.8s ease-out forwards',
        'hero-slide-up-stagger': 'hero-slide-up-stagger 0.6s ease-out forwards',
        'ken-burns': 'ken-burns 8s ease-out forwards',
        'fade-slide-in': 'fade-slide-in 0.7s ease-out forwards',
        'count-up': 'count-up 0.5s ease-out forwards',
        'shimmer-bg': 'shimmer-bg 3s linear infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgb(0 0 0 / 0.08), 0 4px 16px -4px rgb(0 0 0 / 0.06)',
        premium: '0 8px 30px -8px rgb(15 137 246 / 0.18), 0 2px 8px -4px rgb(15 137 246 / 0.10)',
        glass: '0 8px 32px -8px rgb(15 137 246 / 0.20)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
