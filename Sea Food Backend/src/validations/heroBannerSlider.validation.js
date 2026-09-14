const { z } = require('zod');

const jsonField = (schema) => z.preprocess((value) => {
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return value; }
}, schema);

const booleanField = z.preprocess((value) => {
  if (typeof value === 'string') return value === 'true' || value === '1';
  return value;
}, z.boolean());

const ctaSchema = z.object({ label: z.string().trim().min(1), href: z.string().trim().min(1) });
const statsSchema = z.array(z.object({ value: z.string().trim().min(1), label: z.string().trim().min(1) })).max(6);

const heroBannerSliderSchema = z.object({
  alt: z.string().trim().min(2),
  badge: z.string().trim().min(1),
  title: z.string().trim().min(2),
  highlight: z.string().trim().min(1),
  description: z.string().trim().min(10),
  primaryCta: jsonField(ctaSchema),
  secondaryCta: jsonField(ctaSchema),
  stats: jsonField(statsSchema).default([]),
  iconKey: z.string().trim().optional(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: booleanField.optional(),
});

module.exports = { createHeroBannerSliderSchema: heroBannerSliderSchema, updateHeroBannerSliderSchema: heroBannerSliderSchema.partial() };
