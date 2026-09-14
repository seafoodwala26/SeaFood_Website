const HeroBannerSlider = require('../modules/heroBannerSlider.model');
const { uploadImage, replaceImage, deleteImage } = require('../utils/cloudinaryImage');

const PUBLIC_CACHE_TTL = 5 * 60 * 1000;
let publicSlidesCache = null;
let publicSlidesCacheExpiresAt = 0;

function clearPublicSlidesCache() {
  publicSlidesCache = null;
  publicSlidesCacheExpiresAt = 0;
}

async function warmPublicHeroBannerSliderCache() {
  publicSlidesCache = await HeroBannerSlider.find({ isActive: true })
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();
  publicSlidesCacheExpiresAt = Date.now() + PUBLIC_CACHE_TTL;
  return publicSlidesCache;
}

async function createHeroBannerSlider(req, res) {
  const data = { ...req.body, image: await uploadImage(req.file, 'seafood/hero-sliders') };
  const slide = await HeroBannerSlider.create(data);
  clearPublicSlidesCache();
  res.status(201).json({ status: 'success', data: slide });
}

async function getPublicHeroBannerSliders(req, res) {
  if (publicSlidesCache && Date.now() < publicSlidesCacheExpiresAt) {
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    return res.json({ status: 'success', data: publicSlidesCache });
  }

  const slides = await warmPublicHeroBannerSliderCache();
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
  res.json({ status: 'success', data: slides });
}

async function getAllHeroBannerSliders(req, res) {
  const filter = {};
  if (req.query.active === 'true' || req.query.active === 'false') filter.isActive = req.query.active === 'true';
  const slides = await HeroBannerSlider.find(filter).sort({ sortOrder: 1, createdAt: -1 });
  res.json({ status: 'success', results: slides.length, data: slides });
}

async function getHeroBannerSliderById(req, res) {
  const slide = await HeroBannerSlider.findById(req.params.id);
  if (!slide) return res.status(404).json({ status: 'fail', message: 'Hero slider not found' });
  res.json({ status: 'success', data: slide });
}

async function updateHeroBannerSlider(req, res) {
  const slide = await HeroBannerSlider.findById(req.params.id);
  if (!slide) return res.status(404).json({ status: 'fail', message: 'Hero slider not found' });
  if (req.file) req.body.image = await replaceImage(req.file, slide.image, 'seafood/hero-sliders');
  Object.assign(slide, req.body);
  await slide.save();
  clearPublicSlidesCache();
  res.json({ status: 'success', data: slide });
}

async function deleteHeroBannerSlider(req, res) {
  const slide = await HeroBannerSlider.findById(req.params.id);
  if (!slide) return res.status(404).json({ status: 'fail', message: 'Hero slider not found' });
  if (slide.image?.publicId) await deleteImage(slide.image);
  await slide.deleteOne();
  clearPublicSlidesCache();
  res.json({ status: 'success', message: 'Hero slider deleted' });
}

module.exports = { createHeroBannerSlider, getPublicHeroBannerSliders, getAllHeroBannerSliders, getHeroBannerSliderById, updateHeroBannerSlider, deleteHeroBannerSlider, warmPublicHeroBannerSliderCache };
