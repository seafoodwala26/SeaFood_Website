const { z } = require('zod');

const booleanField = z.preprocess((value) => {
  if (typeof value === 'string') return value === 'true' || value === '1';
  return value;
}, z.boolean());

const createBannerSchema = z.object({
  pageSlug: z.enum(['about', 'products', 'blog', 'contact']),
  pageName: z.string().min(2),
  title: z.string().min(3, { message: 'Banner title is required' }),
  subtitle: z.string().optional(),
  description: z.string().trim().min(3, { message: 'Banner subtitle must be at least 3 characters' }),
  backgroundColor: z.string().optional(),
  overlayStart: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use a valid hex color').optional(),
  overlayEnd: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use a valid hex color').optional(),
  isActive: booleanField.optional(),
});

const updateBannerSchema = createBannerSchema.partial();

module.exports = { createBannerSchema, updateBannerSchema };
