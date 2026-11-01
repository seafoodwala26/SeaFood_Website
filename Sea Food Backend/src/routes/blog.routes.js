const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validationMiddleware');
const { uploadSingle, requireImage } = require('../middlewares/upload.middleware');
const { createBlogSchema, updateBlogSchema, draftBlogSchema, blogStatusSchema } = require('../validations/blog.validation');
const { createBlog, createBlogDraft, getAllBlogs, getPublicBlogs, getPublicBlogByUrl, getBlogById, updateBlog, updateBlogDraft, updateBlogStatus, deleteBlog } = require('../controllers/blog.controller');

const router = express.Router();

router.get('/public', getPublicBlogs);
router.get('/public/:slug', getPublicBlogByUrl);
router.get('/', protect, adminOnly, getAllBlogs);
router.get('/:id', protect, adminOnly, getBlogById);

router.post(
  '/drafts', protect,
  adminOnly,
  uploadSingle('blogImg'),
  validateBody(draftBlogSchema),
  createBlogDraft
);
router.patch(
  '/:id/draft',
  protect,
  adminOnly,
  uploadSingle('blogImg'),
  validateBody(draftBlogSchema),
  updateBlogDraft
);
router.post(
  '/', protect,
  adminOnly,
  uploadSingle('blogImg'),
  requireImage,
  validateBody(createBlogSchema),
  createBlog
);
router.patch(
  '/:id',
  protect,
  adminOnly,
  uploadSingle('blogImg'),
  validateBody(updateBlogSchema),
  updateBlog
);
router.patch('/:id/status', protect, adminOnly, validateBody(blogStatusSchema), updateBlogStatus);
router.delete('/:id', protect, adminOnly, deleteBlog);

module.exports = router;
