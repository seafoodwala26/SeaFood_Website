const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validationMiddleware');
const { uploadSingle, requireImage } = require('../middlewares/upload.middleware');
const { createCategory, getAllCategories, getPublicCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { createCategorySchema, updateCategorySchema } = require('../validations/category.validation');

const router = express.Router();

router.get('/public', getPublicCategories);
router.get('/', protect, adminOnly, getAllCategories);
router.get('/:id', protect, adminOnly, getCategoryById);
router.post('/', protect, adminOnly, uploadSingle('image'), requireImage, validateBody(createCategorySchema), createCategory);
router.patch('/:id', protect, adminOnly, uploadSingle('image'), validateBody(updateCategorySchema), updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

module.exports = router;
