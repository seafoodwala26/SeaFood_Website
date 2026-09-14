import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { OrganizationSchema } from '@/lib/seo/schema';
import { FloatingButtons } from '@/components/layout/floating-buttons';
import { QueryProvider } from '@/components/providers/query-provider';
import { PageTransitionLoader } from '@/components/providers/page-transition-loader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const siteUrl = 'https://seafoodwala.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Seafood Wala | Premium Seafood Supplier & Distributor',
    template: '%s | Seafood Wala',
  },
  description:
    'Seafood Wala supplies premium fresh fish, shrimp, lobster, oysters, and shellfish to customers worldwide. Sustainably sourced, cold chain delivered, freshness guaranteed.',
  authors: [{ name: 'Seafood Wala' }],
  creator: 'Seafood Wala',
  publisher: 'Seafood Wala',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Seafood Wala',
    title: 'Seafood Wala | Premium Seafood Supplier & Distributor',
    description:
      'Premium seafood supplier serving 40+ countries. Fresh fish, shrimp, lobster, oysters, and shellfish — sustainably sourced and cold chain delivered.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Seafood Wala',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seafood Wala | Premium Seafood Supplier',
    description:
      'Premium seafood supplier serving 40+ countries. Fresh fish, shrimp, lobster, oysters, and shellfish.',
    images: ['/og-image.jpg'],
    creator: '@seafoodwala',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/seafoodwala.png', type: 'image/png' }],
    apple: [{ url: '/seafoodwala.png', type: 'image/png' }],
  },
  category: 'food',
};

export const viewport: Viewport = {
  themeColor: '#0F89F6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans antialiased" suppressHydrationWarning>
        <OrganizationSchema />
        <QueryProvider>
          <PageTransitionLoader />
          {children}
          <FloatingButtons />
        </QueryProvider>
        <style>{`\n          @keyframes progressBar {\n            from { width: 0%; }\n            to { width: 100%; }\n          }\n        `}</style>
      </body>
    </html>
  );
}
