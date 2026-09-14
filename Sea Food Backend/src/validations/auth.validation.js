const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email({ message: 'Valid email is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

module.exports = { loginSchema };
