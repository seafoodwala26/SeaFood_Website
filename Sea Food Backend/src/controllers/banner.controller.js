const Banner = require('../modules/banner.model');
const { uploadImage, replaceImage, deleteImage } = require('../utils/cloudinaryImage');

async function createBanner(req, res) {
  const bannerData = { ...req.body };

  bannerData.image = await uploadImage(req.file, 'seafood/banners');

  const banner = await Banner.create(bannerData);
  res.status(201).json({ status: 'success', data: banner });
}

async function getAllBanners(req, res) {
  const filter = {};
  if (req.query.active) {
    filter.isActive = req.query.active === 'true';
  }

  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const cursor = req.query.cursor;

  if (cursor) {
    const [cursorDate, cursorId] = Buffer.from(cursor, 'base64').toString('ascii').split('|');
    filter.$or = [
      { createdAt: { $lt: new Date(cursorDate) } },
      { createdAt: new Date(cursorDate), _id: { $lt: cursorId } },
    ];
  }

  const banners = await Banner.find(filter).sort({ createdAt: -1, _id: -1 }).limit(limit + 1);
  const hasNext = banners.length > limit;
  if (hasNext) banners.pop();

  const nextCursor = hasNext
    ? Buffer.from(`${banners[banners.length - 1].createdAt.toISOString()}|${banners[banners.length - 1]._id}`).toString('base64')
    : null;

  res.json({ status: 'success', results: banners.length, nextCursor, data: banners });
}

async function getPublicBanners(req, res) {
  const banners = await Banner.find({ isActive: true }).sort({ pageSlug: 1, sortOrder: 1, createdAt: -1 });
  res.json({ status: 'success', data: banners });
}

async function getBannerById(req, res) {
  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    return res.status(404).json({ status: 'fail', message: 'Banner not found' });
  }

  res.json({ status: 'success', data: banner });
}

async function updateBanner(req, res) {
  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    return res.status(404).json({ status: 'fail', message: 'Banner not found' });
  }

  if (req.file) req.body.image = await replaceImage(req.file, banner.image, 'seafood/banners');

  Object.assign(banner, req.body);
  await banner.save();

  res.json({ status: 'success', data: banner });
}

async function deleteBanner(req, res) {
  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    return res.status(404).json({ status: 'fail', message: 'Banner not found' });
  }

  if (banner.image?.publicId) {
    await deleteImage(banner.image);
  }
  await banner.deleteOne();

  res.json({ status: 'success', message: 'Banner deleted' });
}

module.exports = { createBanner, getAllBanners, getPublicBanners, getBannerById, updateBanner, deleteBanner };
