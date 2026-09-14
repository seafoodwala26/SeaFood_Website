import type { PageBanner } from '@/lib/types';

const seafoodBanner =
  'https://images.pexels.com/photos/8352344/pexels-photo-8352344.jpeg?auto=compress&cs=tinysrgb&w=1600';
const fishBanner =
  'https://images.pexels.com/photos/8352394/pexels-photo-8352394.jpeg?auto=compress&cs=tinysrgb&w=1600';
const oysterBanner =
  'https://images.pexels.com/photos/10895800/pexels-photo-10895800.jpeg?auto=compress&cs=tinysrgb&w=1600';
const shrimpBanner =
  'https://images.pexels.com/photos/33653815/pexels-photo-33653815.jpeg?auto=compress&cs=tinysrgb&w=1600';
const lobsterBanner =
  'https://images.pexels.com/photos/566343/pexels-photo-566343.jpeg?auto=compress&cs=tinysrgb&w=1600';

export const pageBanners: PageBanner[] = [
  {
    pageSlug: 'about',
    pageName: 'About',
    title: 'From Ocean to Table, Worldwide',
    description:
      'Seafood Wala supplies premium fresh fish, shrimp, lobster, and shellfish to distributors, restaurants, and retailers worldwide.',
    backgroundImage: seafoodBanner,
    overlayOpacity: 0.7,
    breadcrumbLabel: 'About',
    visible: true,
  },
  {
    pageSlug: 'products',
    pageName: 'Products',
    title: 'Premium Seafood Catalog',
    description:
      'Browse our full catalog of fresh fish, shrimp, lobster, oysters, shellfish, and value-added seafood — sourced sustainably and delivered cold chain fresh.',
    backgroundImage: fishBanner,
    overlayOpacity: 0.75,
    breadcrumbLabel: 'Products',
    visible: true,
  },
  {
    pageSlug: 'blog',
    pageName: 'Blog',
    title: 'Seafood Guides & Insights',
    description:
      'Expert sourcing guides, handling tips, sustainability stories, and industry news from our team of seafood experts and marine biologists.',
    backgroundImage: oysterBanner,
    overlayOpacity: 0.7,
    breadcrumbLabel: 'Blog',
    visible: true,
  },
  {
    pageSlug: 'contact',
    pageName: 'Contact',
    title: 'Contact Us',
    description:
      'We are here to help. Reach our team by phone, email, or the form below — or visit our Miami headquarters during working hours.',
    backgroundImage: shrimpBanner,
    overlayOpacity: 0.75,
    breadcrumbLabel: 'Contact',
    visible: true,
  },
  {
    pageSlug: 'gallery',
    pageName: 'Gallery',
    title: 'Seafood Wala Gallery',
    description: 'A look at our seafood, facilities, and the people behind every delivery.',
    backgroundImage: seafoodBanner,
    overlayOpacity: 0.7,
    breadcrumbLabel: 'Gallery',
    visible: true,
  },
  {
    pageSlug: 'inquiry',
    pageName: 'Online Inquiry',
    title: 'Online Inquiry',
    description:
      'Tell us what you need and our export team will send a personalized quote within one business day. Bulk, private-label, and custom processing orders welcome.',
    backgroundImage: lobsterBanner,
    overlayOpacity: 0.7,
    breadcrumbLabel: 'Online Inquiry',
    visible: true,
  },
];

export function getBannerByPageSlug(slug: string): PageBanner | undefined {
  return pageBanners.find((b) => b.pageSlug === slug);
}
