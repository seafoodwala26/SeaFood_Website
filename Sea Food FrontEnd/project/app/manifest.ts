import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F5FAFD',
    theme_color: '#0E7ACC',
    icons: [
      {
        src: '/seafoodwala.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/seafoodwala.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/seafoodwala.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
