const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validationMiddleware');
const { uploadSingle, requireImage } = require('../middlewares/upload.middleware');
const { createBanner, getAllBanners, getPublicBanners, getBannerById, updateBanner, deleteBanner } = require('../controllers/banner.controller');
const { createBannerSchema, updateBannerSchema } = require('../validations/banner.validation');

const router = express.Router();

router.get('/public', getPublicBanners);
router.get('/', protect, adminOnly, getAllBanners);
router.get('/:id', protect, adminOnly, getBannerById);
router.post('/', protect, adminOnly, uploadSingle('image'), requireImage, validateBody(createBannerSchema), createBanner);
router.patch('/:id', protect, adminOnly, uploadSingle('image'), validateBody(updateBannerSchema), updateBanner);
router.delete('/:id', protect, adminOnly, deleteBanner);

module.exports = router;
