import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants/site';
import { products } from '@/lib/data/products';
import { blogPosts } from '@/lib/data/blog';

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/inquiry`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
