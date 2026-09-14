const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validationMiddleware');
const { uploadSingle, requireImage } = require('../middlewares/upload.middleware');
const { createHeroBannerSliderSchema, updateHeroBannerSliderSchema } = require('../validations/heroBannerSlider.validation');
const {
  createHeroBannerSlider, getPublicHeroBannerSliders, getAllHeroBannerSliders,
  getHeroBannerSliderById, updateHeroBannerSlider, deleteHeroBannerSlider,
} = require('../controllers/heroBannerSlider.controller');

const router = express.Router();
router.get('/public', getPublicHeroBannerSliders);
router.use(protect, adminOnly);
router.get('/', getAllHeroBannerSliders);
router.get('/:id', getHeroBannerSliderById);
router.post('/', uploadSingle('image'), requireImage, validateBody(createHeroBannerSliderSchema), createHeroBannerSlider);
router.patch('/:id', uploadSingle('image'), validateBody(updateHeroBannerSliderSchema), updateHeroBannerSlider);
router.delete('/:id', deleteHeroBannerSlider);

module.exports = router;
