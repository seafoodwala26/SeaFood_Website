import Script from 'next/script';
import { siteConfig } from '@/lib/constants/site';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id={`json-ld-${String(data['@type'] || 'schema').toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    foundingDate: `${siteConfig.foundedYear}`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.twitter,
      siteConfig.social.youtube,
      siteConfig.social.linkedin,
    ],
  };
  return <JsonLd data={data} />;
}

export function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.7743,
      longitude: -80.1918,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
  };
  return <JsonLd data={data} />;
}

export function WebsiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  return <JsonLd data={data} />;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={data} />;
}

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  sku: string;
  price: string;
  rating: number;
  reviewCount: number;
  url: string;
}

export function ProductSchema({
  name,
  description,
  image,
  sku,
  price,
  rating,
  reviewCount,
  url,
}: ProductSchemaProps) {
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    sku,
    brand: { '@type': 'Brand', name: siteConfig.name },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount,
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      price: numericPrice,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${siteConfig.url}/#organization` },
    },
  };
  return <JsonLd data={data} />;
}

interface BlogPostingSchemaProps {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  url: string;
}

export function BlogPostingSchema({
  title,
  description,
  image,
  publishedAt,
  url,
}: BlogPostingSchemaProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
    datePublished: publishedAt,
    dateModified: publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  return <JsonLd data={data} />;
}

interface FAQSchemaProps {
  items: { question: string; answer: string }[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
  return <JsonLd data={data} />;
}

export interface ImageGalleryItem {
  url: string;
  caption?: string;
  name?: string;
}

export interface ImageGallerySchemaProps {
  name?: string;
  description?: string;
  images: ImageGalleryItem[];
}

export function ImageGallerySchema({
  name = 'Seafood Wala Gallery',
  description = 'Explore Seafood Wala fresh catches, cold storage facilities, packaging, and seafood experiences.',
  images,
}: ImageGallerySchemaProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name,
    description,
    url: `${siteConfig.url}/gallery`,
    image: images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: img.url,
      name: img.name || img.caption || name,
      caption: img.caption || img.name || description,
    })),
  };
  return <JsonLd data={data} />;
}

