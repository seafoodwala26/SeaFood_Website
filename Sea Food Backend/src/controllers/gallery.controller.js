const Gallery = require('../modules/gallery.model');
const { uploadImage, deleteImage } = require('../utils/cloudinaryImage');

async function createGalleryImages(req, res) {
  const names = req.body.names;
  const images = await Promise.all((req.files || []).map((file) => uploadImage(file, 'seafood/gallery')));
  const records = await Gallery.insertMany(images.map((image, index) => ({
    name: names[index] || image.originalName,
    image,
    sortOrder: index,
  })));

  res.status(201).json({ status: 'success', data: records, message: 'Gallery images uploaded successfully.' });
}

async function listPublicGallery(req, res) {
  const images = await Gallery.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 }).lean();
  res.json({ status: 'success', data: images });
}

async function listGallery(req, res) {
  const images = await Gallery.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
  res.json({ status: 'success', data: images });
}

async function updateGalleryImage(req, res) {
  const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!image) return res.status(404).json({ status: 'fail', message: 'Gallery image not found.' });
  res.json({ status: 'success', data: image });
}

async function deleteGalleryImage(req, res) {
  const image = await Gallery.findById(req.params.id);
  if (!image) return res.status(404).json({ status: 'fail', message: 'Gallery image not found.' });
  await deleteImage(image.image);
  await image.deleteOne();
  res.json({ status: 'success', message: 'Gallery image deleted.' });
}

module.exports = { createGalleryImages, listPublicGallery, listGallery, updateGalleryImage, deleteGalleryImage };
