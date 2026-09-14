const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validationMiddleware');
const { uploadMultiple, requireImages } = require('../middlewares/upload.middleware');
const { createGallerySchema, updateGallerySchema } = require('../validations/gallery.validation');
const {createGalleryImages,listPublicGallery,listGallery,updateGalleryImage,deleteGalleryImage} = require('../controllers/gallery.controller');

const router = express.Router();

router.get('/public', listPublicGallery);
router.get('/', protect, adminOnly, listGallery);
router.post('/', protect, adminOnly, uploadMultiple('images'), requireImages, validateBody(createGallerySchema), createGalleryImages);
router.patch('/:id', protect, adminOnly, validateBody(updateGallerySchema), updateGalleryImage);
router.delete('/:id', protect, adminOnly, deleteGalleryImage);

module.exports = router;
