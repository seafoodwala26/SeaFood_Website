import type { ApiCategory, ApiProduct, ApiBlog } from '@/lib/api';
import type { Product, ProductCategory, BlogPost } from '@/lib/types';
import { slugify } from '@/lib/utils/slugify';
import { imageNameWithoutExtension } from '@/lib/utils';

const FALLBACK_CATEGORY_IMAGE =
  'https://images.pexels.com/photos/8352394/pexels-photo-8352394.jpeg?auto=compress&cs=tinysrgb&w=800';

const FALLBACK_PRODUCT_IMAGE =
  'https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=800';

export function mapApiCategory(category: ApiCategory, productCount = 0): ProductCategory {
  return {
    slug: category.slug || slugify(category.catName),
    name: category.catName,
    description: category.description,
    image: category.image?.url || FALLBACK_CATEGORY_IMAGE,
    imageName: imageNameWithoutExtension(category.image?.originalName),
    count: category.productCount ?? productCount,
    metaTitle: category.metaTitle,
    metaDescription: category.metaDescription,
  };
}

export function mapApiProduct(product: ApiProduct): Product {
  const categoryName = typeof product.category === 'object' ? product.category.catName : '';
  const categoryId = typeof product.category === 'object'
    ? (product.category.slug || product.category._id)
    : String(product.category);

  return {
    slug: product.slug || product._id,
    name: product.title,
    category: categoryName,
    categorySlug: categoryId,
    tagline: product.description.slice(0, 100),
    description: product.description,
    image: product.images[0]?.url || FALLBACK_PRODUCT_IMAGE,
    imageName: imageNameWithoutExtension(product.images[0]?.originalName),
    gallery: product.images.map((img) => img.url).filter(Boolean),
    price: 'Contact for Price',
    sku: product._id.slice(-8).toUpperCase(),
    rating: 4.8,
    reviewCount: 0,
    featured: true,
    bestSeller: false,
    isNew: false,
    inStock: true,
    features: product.features,
    specifications: [],
    brochureUrl: '#',
    metaTitle: product.metaTitle,
    metaDescription: product.metaDescription,
    faqs: product.faqs,
  };
}

export function categoryHref(category: ProductCategory | ApiCategory): string {
  const id = '_id' in category ? (category.slug || slugify(category.catName)) : category.slug;
  return `/products?category=${id}`;
}

export function productHref(product: Product | ApiProduct): string {
  const id = '_id' in product ? (product.slug || product._id) : product.slug;
  return `/products/${id}`;
}

export function categoryLabel(category: ApiCategory): string {
  return category.catName;
}

export function categorySlugFromName(name: string): string {
  return slugify(name);
}

const FALLBACK_BLOG_IMAGE =
  'https://images.pexels.com/photos/8352394/pexels-photo-8352394.jpeg?auto=compress&cs=tinysrgb&w=800';

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function mapApiBlog(blog: ApiBlog): BlogPost {
  return {
    slug: blog.url,
    title: blog.blogTitle,
    excerpt: blog.excerpt,
    content: blog.content,
    category: blog.category,
    categorySlug: slugify(blog.category),
    image: blog.blogImg?.url || FALLBACK_BLOG_IMAGE,
    imageName: imageNameWithoutExtension(blog.blogImg?.originalName),
    metaTitle: blog.seoTitle || blog.blogTitle,
    metaDescription: blog.seoMeta || blog.excerpt,
    faqs: blog.faq || [],
    publishedAt: blog.createdAt,
    readingTime: estimateReadingTime(blog.content),
    featured: blog.isFeatured,
    tags: blog.tags || [],
  };
}
