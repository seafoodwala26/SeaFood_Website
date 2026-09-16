import type { Metadata } from 'next';
import { siteConfig } from '@/lib/constants/site';

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = '/og-image.jpg',
  type = 'website',
  publishedTime,
  noIndex = false,
  keywords,
}: PageMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    ...(keywords && keywords.length > 0
      ? { other: { keywords: keywords.join(', ') } }
      : {}),
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
