const { z } = require('zod');

const url = z.union([z.string().url(), z.literal('')]);
const siteConfigurationSchema = z.object({
  yearsOfExperience: z.coerce.number().int().min(0).max(200),
  countriesServed: z.coerce.number().int().min(0).max(300),
  happyClients: z.coerce.number().int().min(0),
  productsExported: z.coerce.number().int().min(0),
  tagline: z.string().trim().min(3).max(300),
  facebookUrl: url.optional().default(''),
  linkedinUrl: url.optional().default(''),
  instagramUrl: url.optional().default(''),
  mobileNumber: z.string().trim().min(6).max(30),
  email: z.string().trim().email(),
  workingDays: z.string().trim().min(3).max(100),
  officeHours: z.string().trim().min(3).max(100),
  fullAddress: z.string().trim().min(5).max(500),
  mapEmbedUrl: url.optional().default(''),
});

module.exports = { siteConfigurationSchema };
