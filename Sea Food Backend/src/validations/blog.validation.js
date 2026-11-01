const { z } = require('zod');

const faqItemSchema = z.object({
  question: z.string().min(3, { message: 'FAQ question is required' }),
  answer: z.string().min(3, { message: 'FAQ answer is required' }),
});

const faqArraySchema = z
  .preprocess((value) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }
    return value;
  }, z.array(faqItemSchema).optional())
  .optional();

const draftFaqArraySchema = z
  .preprocess((value) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }
    return value;
  }, z.array(z.object({
    question: z.string().optional(),
    answer: z.string().optional(),
  })).optional())
  .optional();

const tagsSchema = z
  .preprocess((value) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }
    return value;
  }, z.array(z.string().trim().min(1).max(50)).max(20).optional())
  .optional();

const booleanField = z.preprocess((value) => {
  if (typeof value === 'string') return value === 'true' || value === '1';
  return Boolean(value);
}, z.boolean());

const createBlogSchema = z.object({
  blogTitle: z.string().min(5, { message: 'Blog title must be at least 5 characters' }),
  url: z.string().min(3, { message: 'URL is required' }),
  category: z.string().min(3, { message: 'Category is required' }),
  excerpt: z.string().min(20, { message: 'Excerpt should be at least 20 characters' }).max(320),
  content: z.string().min(50, { message: 'Content should be at least 50 characters' }),
  isFeatured: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        return value === 'true' || value === '1';
      }
      return Boolean(value);
    }, z.boolean())
    .optional(),
  isActive: booleanField.optional(),
  seoTitle: z.string().max(70).optional(),
  seoMeta: z.string().max(160).optional(),
  faq: faqArraySchema,
  tags: tagsSchema,
});

const updateBlogSchema = createBlogSchema.partial().extend({
  isDraft: z.preprocess((value) => {
    if (typeof value === 'string') return value === 'true' || value === '1';
    return Boolean(value);
  }, z.literal(false)).optional(),
});
const draftBlogSchema = z.object({
  blogTitle: z.string().optional(),
  url: z.string().optional(),
  category: z.string().optional(),
  excerpt: z.string().max(320).optional(),
  content: z.string().optional(),
  isFeatured: z.preprocess((value) => {
    if (typeof value === 'string') return value === 'true' || value === '1';
    return Boolean(value);
  }, z.boolean()).optional(),
  seoTitle: z.string().max(70).optional(),
  seoMeta: z.string().max(160).optional(),
  faq: draftFaqArraySchema,
  tags: tagsSchema,
});
const blogStatusSchema = z.object({ isActive: booleanField });

module.exports = { createBlogSchema, updateBlogSchema, draftBlogSchema, blogStatusSchema };
