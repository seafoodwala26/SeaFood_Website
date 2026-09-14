const express = require('express');
const rateLimit = require('express-rate-limit');
const { createInquiry, listInquiries, replyToInquiry } = require('../controllers/inquiry.controller');
const { validateBody } = require('../middlewares/validationMiddleware');
const { inquirySchema, inquiryReplySchema } = require('../validations/inquiry.validation');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many inquiry submissions. Please try again later.',
}), validateBody(inquirySchema), createInquiry);
router.get('/', protect, adminOnly, listInquiries);
router.post('/:id/reply', protect, adminOnly, validateBody(inquiryReplySchema), replyToInquiry);

module.exports = router;
