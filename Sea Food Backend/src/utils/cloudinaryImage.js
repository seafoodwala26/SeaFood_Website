const cloudinary = require('../config/cloudinary');
const path = require('path');

function getImagePublicId(file) {
  const baseName = path.parse(file.originalname || '').name;
  const safeName = baseName
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  return safeName || `image-${Date.now()}`;
}

/**
 * Upload one multer file to Cloudinary and return the only image shape stored
 * in MongoDB throughout this API.
 */
function uploadImage(file, folder) {
  if (!file?.buffer) return null;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: getImagePublicId(file),
        resource_type: 'image',
        overwrite: true,
        invalidate: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          publicId: result.public_id,
          url: result.secure_url,
          originalName: file.originalname,
        });
      }
    );
    stream.end(file.buffer);
  });
}

async function deleteImage(imageOrPublicId) {
  const publicId = typeof imageOrPublicId === 'string' ? imageOrPublicId : imageOrPublicId?.publicId;
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
}

// Upload first so an existing image is never deleted when a new upload fails.
async function replaceImage(file, currentImage, folder) {
  if (!file) return currentImage;
  const image = await uploadImage(file, folder);
  if (image?.publicId !== currentImage?.publicId) await deleteImage(currentImage);
  return image;
}

module.exports = { uploadImage, replaceImage, deleteImage };
