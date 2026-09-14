export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageName?: string;
  count: number;
  metaTitle?: string;
  metaDescription?: string;
  faqs?: FAQItem[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  tagline: string;
  description: string;
  image: string;
  imageName?: string;
  gallery: string[];
  price: string;
  sku: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestSeller: boolean;
  isNew: boolean;
  inStock: boolean;
  features: string[];
  specifications: ProductSpec[];
  brochureUrl: string;
  metaTitle?: string;
  metaDescription?: string;
  faqs?: FAQItem[];
}

export interface BlogCategory {
  slug: string;
  name: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  image: string;
  imageName?: string;
  metaTitle: string;
  metaDescription: string;
  faqs: FAQItem[];
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface PageBanner {
  pageSlug: string;
  pageName: string;
  title: string;
  description: string;
  backgroundImage: string;
  overlayOpacity: number;
  breadcrumbLabel: string;
  visible: boolean;
}
