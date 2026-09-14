const { z } = require('zod');

const arrayFromMultipart = (schema) => z.preprocess((value) => {
  if (typeof value === 'string') {
    try { return JSON.parse(value); } catch (error) { return value; }
  }
  return value;
}, schema);

const booleanFromMultipart = z.preprocess((value) => {
  if (typeof value === 'string') return value === 'true' || value === '1';
  return Boolean(value);
}, z.boolean());

const faqItemSchema = z.object({
  question: z.string().trim().min(3, { message: 'FAQ question is required' }),
  answer: z.string().trim().min(3, { message: 'FAQ answer is required' }),
});

const productFields = {
  title: z.string().trim().min(2, { message: 'Product title is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  description: z.string().trim().min(10, { message: 'Product description must be at least 10 characters' }),
  features: arrayFromMultipart(z.array(z.string().trim().min(1)).default([])),
  metaTitle: z.string().trim().max(70).optional(),
  metaDescription: z.string().trim().max(160).optional(),
  faqs: arrayFromMultipart(z.array(faqItemSchema).default([])),
  existingImages: arrayFromMultipart(z.array(z.string()).default([])).optional(),
  isActive: booleanFromMultipart.optional(),
};

const createProductSchema = z.object(productFields);
const updateProductSchema = createProductSchema.partial();

module.exports = { createProductSchema, updateProductSchema };
