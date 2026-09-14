const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validationMiddleware');
const { uploadMultiple, requireImages } = require('../middlewares/upload.middleware');
const { createProductSchema, updateProductSchema } = require('../validations/product.validation');
const { createProduct, getAllProducts, getPublicProducts, getPublicProductById, getProductById, updateProduct, deleteProduct } = require('../controllers/product.controller');

const router = express.Router();

router.get('/public', getPublicProducts);
router.get('/public/:id', getPublicProductById);
router.get('/', protect, adminOnly, getAllProducts);
router.get('/:id', protect, adminOnly, getProductById);
router.post('/', protect, adminOnly, uploadMultiple('images'), requireImages, validateBody(createProductSchema), createProduct);
router.patch('/:id', protect, adminOnly, uploadMultiple('images'), validateBody(updateProductSchema), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
