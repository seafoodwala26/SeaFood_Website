const { z } = require('zod');

const namesSchema = z.preprocess((value) => {
  if (typeof value === 'string') {
    try { return JSON.parse(value); } catch (error) { return value; }
  }
  return value;
}, z.array(z.string().trim().min(1).max(150)).min(1));

const createGallerySchema = z.object({
  names: namesSchema,
});

const updateGallerySchema = z.object({
  name: z.string().trim().min(1).max(150).optional(),
  isActive: z.preprocess((value) => {
    if (typeof value === 'string') return value === 'true' || value === '1';
    return Boolean(value);
  }, z.boolean()).optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

module.exports = { createGallerySchema, updateGallerySchema };
