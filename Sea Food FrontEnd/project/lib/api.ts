import axios from 'axios';

// Absolute backend URL. Used for server-side requests (e.g. the admin session
// check in app/admin/page.tsx), which cannot use a relative URL.
const configuredApiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000')
  .replace(/\/+$/, '')
  .replace(/\/api$/, '');
export const API_URL = `${configuredApiUrl}/api`;

// Browser requests use the Next.js proxy so the backend auth cookie remains
// available to the server-side admin session check.
export const BROWSER_API_URL = '/api';

export const api = axios.create({
  baseURL: BROWSER_API_URL,
  withCredentials: true,
  headers: { Accept: 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(error.response?.data?.message || 'Unable to complete the request.')),
);

export interface ApiUser {
  id: string;
  name?: string;
  email: string;
  role: 'admin' | string;
}

export interface ApiBlog {
  _id: string;
  blogTitle: string;
  url: string;
  category: string;
  excerpt: string;
  content: string;
  isFeatured: boolean;
  isActive: boolean;
  seoTitle?: string;
  seoMeta?: string;
  faq?: { question: string; answer: string }[];
  tags?: string[];
  blogImg?: { url?: string; originalName?: string };
  createdAt: string;
  updatedAt: string;
}

export interface BlogPayload {
  blogTitle: string;
  url: string;
  category: string;
  excerpt: string;
  content: string;
  isFeatured: boolean;
  isActive: boolean;
  seoTitle: string;
  seoMeta: string;
  faq: { question: string; answer: string }[];
  tags: string[];
  image?: string;
  imageName?: string;
}

export interface ApiBanner {
  _id: string;
  pageSlug: 'about' | 'products' | 'blog' | 'contact' | 'gallery';
  pageName: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: { url?: string; originalName?: string };
  overlayStart?: string;
  overlayEnd?: string;
  isActive: boolean;
}

export interface BannerPayload {
  pageSlug: ApiBanner['pageSlug']; pageName: string; title: string; subtitle?: string;
  description: string; overlayStart: string; overlayEnd: string; isActive: boolean;
  image?: string; imageName?: string;
}

export interface SiteConfiguration {
  yearsOfExperience: number; countriesServed: number; happyClients: number; productsExported: number;
  tagline: string; facebookUrl: string; linkedinUrl: string; instagramUrl: string;
  mobileNumber: string; email: string; workingDays: string; officeHours: string; fullAddress: string;
  mapEmbedUrl: string;
}

export interface ApiGalleryImage {
  _id: string;
  name: string;
  image: { publicId: string; url: string; originalName?: string };
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiCategory {
  _id: string; slug?: string; catName: string; description: string;
  image?: { url?: string; originalName?: string }; metaTitle?: string; metaDescription?: string;
  isActive: boolean; productCount?: number; createdAt: string;
}

export interface CategoryPayload {
  catName: string; description: string; metaTitle?: string; metaDescription?: string;
  image?: string; imageName?: string;
}

export interface ApiProduct {
  _id: string; slug?: string; title: string; category: { _id: string; catName: string; slug?: string };
  images: { url: string; originalName?: string }[]; description: string; features: string[];
  metaTitle?: string; metaDescription?: string; faqs: { question: string; answer: string }[];
  isActive: boolean; createdAt: string;
}

export interface ProductPayload {
  title: string; category: string; images: string[]; imageNames?: string[]; description: string;
  features: string[]; metaTitle: string; metaDescription: string;
  faqs: { question: string; answer: string }[]; isActive: boolean;
}

export interface PublicPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface PublicListResponse<T> {
  data: T[];
  pagination: PublicPagination;
}

export interface ApiHeroBannerSlider {
  _id: string; image?: { url?: string; originalName?: string }; alt: string; badge: string;
  title: string; highlight: string; description: string;
  primaryCta: { label: string; href: string }; secondaryCta: { label: string; href: string };
  stats: { value: string; label: string }[]; iconKey?: string; sortOrder: number; isActive: boolean;
  createdAt: string; updatedAt: string;
}

export interface HeroBannerSliderPayload {
  image?: string; imageName?: string; alt: string; badge: string; title: string; highlight: string;
  description: string; primaryCta: { label: string; href: string }; secondaryCta: { label: string; href: string };
  stats: { value: string; label: string }[]; iconKey?: string; sortOrder: number; isActive: boolean;
}

async function toBlogFormData(payload: BlogPayload): Promise<FormData> {
  const { image, imageName, faq, tags, isFeatured, isActive, ...fields } = payload;
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
  formData.append('isFeatured', String(isFeatured));
  formData.append('isActive', String(isActive));
  formData.append('faq', JSON.stringify(faq));
  formData.append('tags', JSON.stringify(tags));

  // Only submit a newly selected local image. Existing Cloudinary URLs remain unchanged.
  if (image?.startsWith('data:image/')) {
    const imageBlob = await fetch(image).then((response) => response.blob());
    formData.append('blogImg', imageBlob, imageName || 'blog-image.png');
  }

  return formData;
}

async function toBannerFormData(payload: BannerPayload): Promise<FormData> {
  const { image, imageName, ...fields } = payload;
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, String(value)));
  if (image?.startsWith('data:image/')) {
    formData.append('image', await fetch(image).then((response) => response.blob()), imageName || 'banner-image.png');
  }
  return formData;
}

async function toCategoryFormData(payload: CategoryPayload): Promise<FormData> {
  const { image, imageName, ...fields } = payload;
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, String(value)));
  if (image?.startsWith('data:image/')) {
    formData.append('image', await fetch(image).then((response) => response.blob()), imageName || 'category-image.png');
  }
  return formData;
}

async function toProductFormData(payload: ProductPayload): Promise<FormData> {
  const { images, imageNames, features, faqs, isActive, ...fields } = payload;
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, String(value)));
  formData.append('features', JSON.stringify(features));
  formData.append('faqs', JSON.stringify(faqs));
  formData.append('isActive', String(isActive));
  formData.append('existingImages', JSON.stringify(images.filter((image) => !image.startsWith('data:image/'))));
  await Promise.all(images.filter((image) => image.startsWith('data:image/')).map(async (image, index) => {
    formData.append('images', await fetch(image).then((response) => response.blob()), imageNames?.[index] || `product-image-${index + 1}.png`);
  }));
  return formData;
}

async function toHeroSliderFormData(payload: HeroBannerSliderPayload): Promise<FormData> {
  const { image, imageName, primaryCta, secondaryCta, stats, ...fields } = payload;
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, String(value)));
  formData.append('primaryCta', JSON.stringify(primaryCta));
  formData.append('secondaryCta', JSON.stringify(secondaryCta));
  formData.append('stats', JSON.stringify(stats));
  if (image?.startsWith('data:image/')) {
    formData.append('image', await fetch(image).then((response) => response.blob()), imageName || 'hero-slide.png');
  }
  return formData;
}

export const authApi = {
  login: async (credentials: { email: string; password: string }) =>
    (await api.post<{ data: { user: ApiUser } }>('/auth/login', credentials)).data.data.user,
  logout: () => api.post('/auth/logout'),
  me: async () => (await api.get<{ data: { user: ApiUser } }>('/auth/me')).data.data.user,
};

export interface InquiryPayload {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  quantity: string;
  message: string;
}

export interface ApiInquiry {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  quantity: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: string;
}

export const inquiryApi = {
  create: (payload: InquiryPayload) => api.post('/inquiries', payload),
  reply: async (id: string, payload: { subject: string; message: string }) => {
    const response = await api.post<{ data: Omit<ApiInquiry, 'id'> & { _id: string } }>(`/inquiries/${id}/reply`, payload);
    const { _id, ...inquiry } = response.data.data;
    return { ...inquiry, id: _id };
  },
  list: async () => {
    const response = await api.get<{ data: (Omit<ApiInquiry, 'id'> & { _id: string })[] }>('/inquiries');
    return response.data.data.map(({ _id, ...inquiry }) => ({ ...inquiry, id: _id }));
  },
};

export const blogApi = {
  list: async () => (await api.get<{ data: ApiBlog[] }>('/blogs')).data.data,
  publicList: async (params?: { page?: number; limit?: number; search?: string; category?: string }) =>
    (await api.get<{ data: ApiBlog[]; pagination: PublicPagination }>('/blogs/public', { params })).data,
  publicGet: async (slug: string) => (await api.get<{ data: ApiBlog }>(`/blogs/public/${slug}`)).data.data,
  get: async (id: string) => (await api.get<{ data: ApiBlog }>(`/blogs/${id}`)).data.data,
  updateStatus: async (id: string, isActive: boolean) => (await api.patch<{ data: ApiBlog }>(`/blogs/${id}/status`, { isActive })).data.data,
  create: async (payload: BlogPayload) => {
    const formData = await toBlogFormData(payload);
    return (await api.post<{ data: ApiBlog }>('/blogs', formData)).data.data;
  },
  update: async ({ id, payload }: { id: string; payload: Partial<BlogPayload> }) => {
    const formData = await toBlogFormData({
      blogTitle: payload.blogTitle || '',
      url: payload.url || '',
      category: payload.category || '',
      excerpt: payload.excerpt || '',
      content: payload.content || '',
      isFeatured: payload.isFeatured || false,
      isActive: payload.isActive ?? true,
      seoTitle: payload.seoTitle || '',
      seoMeta: payload.seoMeta || '',
      faq: payload.faq || [],
      tags: payload.tags || [],
      image: payload.image,
      imageName: payload.imageName,
    });
    return (await api.patch<{ data: ApiBlog }>(`/blogs/${id}`, formData)).data.data;
  },
  remove: (id: string) => api.delete(`/blogs/${id}`),
};

export const bannerApi = {
  list: async () => (await api.get<{ data: ApiBanner[] }>('/banners')).data.data,
  publicList: async () => (await api.get<{ data: ApiBanner[] }>('/banners/public')).data.data,
  create: async (payload: BannerPayload) => (await api.post<{ data: ApiBanner }>('/banners', await toBannerFormData(payload))).data.data,
  update: async (id: string, payload: BannerPayload) => (await api.patch<{ data: ApiBanner }>(`/banners/${id}`, await toBannerFormData(payload))).data.data,
};

export const siteConfigurationApi = {
  get: async () => (await api.get<{ data: SiteConfiguration | null }>('/site-configuration')).data.data,
  publicGet: async () => (await api.get<{ data: SiteConfiguration | null }>('/site-configuration/public')).data.data,
  update: async (payload: SiteConfiguration) => (await api.put<{ data: SiteConfiguration }>('/site-configuration', payload)).data.data,
};

export const categoryApi = {
  list: async () => (await api.get<{ data: ApiCategory[] }>('/categories')).data.data,
  publicList: async () => (await api.get<{ data: ApiCategory[] }>('/categories/public')).data.data,
  create: async (payload: CategoryPayload) => (await api.post<{ data: ApiCategory }>('/categories', await toCategoryFormData(payload))).data.data,
  update: async (id: string, payload: CategoryPayload) => (await api.patch<{ data: ApiCategory }>(`/categories/${id}`, await toCategoryFormData(payload))).data.data,
  remove: (id: string) => api.delete(`/categories/${id}`),
};

export const productApi = {
  list: async (params: { page: number; limit: number; search?: string; category?: string }) =>
    (await api.get<{ data: ApiProduct[]; pagination: { page: number; limit: number; total: number; totalPages: number } }>('/products', { params })).data,
  publicList: async (params?: { page?: number; limit?: number; search?: string; category?: string }) =>
    (await api.get<{ data: ApiProduct[]; pagination: PublicPagination }>('/products/public', { params })).data,
  publicGet: async (id: string) => (await api.get<{ data: ApiProduct }>(`/products/public/${id}`)).data.data,
  create: async (payload: ProductPayload) => (await api.post<{ data: ApiProduct }>('/products', await toProductFormData(payload))).data.data,
  update: async (id: string, payload: ProductPayload) => (await api.patch<{ data: ApiProduct }>(`/products/${id}`, await toProductFormData(payload))).data.data,
  remove: (id: string) => api.delete(`/products/${id}`),
};

export const heroBannerSliderApi = {
  list: async () => (await api.get<{ data: ApiHeroBannerSlider[] }>('/hero-banner-sliders')).data.data,
  publicList: async () => (await api.get<{ data: ApiHeroBannerSlider[] }>('/hero-banner-sliders/public')).data.data,
  create: async (payload: HeroBannerSliderPayload) => (await api.post<{ data: ApiHeroBannerSlider }>('/hero-banner-sliders', await toHeroSliderFormData(payload))).data.data,
  update: async (id: string, payload: HeroBannerSliderPayload) => (await api.patch<{ data: ApiHeroBannerSlider }>(`/hero-banner-sliders/${id}`, await toHeroSliderFormData(payload))).data.data,
  remove: (id: string) => api.delete(`/hero-banner-sliders/${id}`),
};

export const galleryApi = {
  publicList: async () => (await api.get<{ data: ApiGalleryImage[] }>('/gallery/public')).data.data,
  list: async () => (await api.get<{ data: ApiGalleryImage[] }>('/gallery')).data.data,
  create: async (files: File[], names: string[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    formData.append('names', JSON.stringify(names));
    return (await api.post<{ data: ApiGalleryImage[] }>('/gallery', formData)).data.data;
  },
  update: async (id: string, payload: { name?: string; isActive?: boolean; sortOrder?: number }) =>
    (await api.patch<{ data: ApiGalleryImage }>(`/gallery/${id}`, payload)).data.data,
  remove: (id: string) => api.delete(`/gallery/${id}`),
};
