const { z } = require('zod');

const inquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required').max(100),
  company: z.string().trim().max(150).optional().default(''),
  email: z.string().trim().email('Enter a valid email address').max(254),
  phone: z.string().trim().min(7, 'Enter a valid phone number').max(30),
  country: z.string().trim().min(2, 'Please select a country').max(100),
  product: z.string().trim().min(1, 'Please select a product').max(150),
  quantity: z.string().trim().min(1, 'Enter a quantity, for example 1000kg').max(100),
  message: z.string().trim().min(10, 'Please provide a message of at least 10 characters').max(5000),
});

const inquiryReplySchema = z.object({
  subject: z.string().trim().min(1, 'Subject is required').max(200),
  message: z.string().trim().min(1, 'Reply message is required').max(10000),
});

module.exports = { inquirySchema, inquiryReplySchema };
