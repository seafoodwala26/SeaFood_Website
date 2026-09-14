const { z } = require('zod');

const booleanField = z.preprocess((value) => {
  if (typeof value === 'string') return value === 'true' || value === '1';
  return value;
}, z.boolean());

const createCategorySchema = z.object({
  catName: z.string().min(2, { message: 'Category name is required' }),
  description: z.string().min(10, { message: 'Category description is required' }),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isActive: booleanField.optional(),
});

const updateCategorySchema = createCategorySchema.partial();

module.exports = { createCategorySchema, updateCategorySchema };
