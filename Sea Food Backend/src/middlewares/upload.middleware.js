const multer = require('multer');

const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!imageMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG and WEBP image formats are allowed'), false);
  }
  cb(null, true);
};

function uploadSingle(fieldName, maxFileSize = MAX_IMAGE_SIZE) {
  return multer({
    storage,
    limits: { fileSize: maxFileSize },
    fileFilter,
  }).single(fieldName);
}

function uploadFields(fields, maxFileSize = MAX_IMAGE_SIZE) {
  return multer({
    storage,
    limits: { fileSize: maxFileSize },
    fileFilter,
  }).fields(fields);
}

function uploadMultiple(fieldName, maxCount = 10, maxFileSize = MAX_IMAGE_SIZE) {
  return multer({
    storage,
    limits: { fileSize: maxFileSize, files: maxCount },
    fileFilter,
  }).array(fieldName, maxCount);
}

function requireImage(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ status: 'fail', message: 'An image file is required.' });
  }
  next();
}

function requireImages(req, res, next) {
  if (!req.files?.length) {
    return res.status(400).json({ status: 'fail', message: 'At least one product image is required.' });
  }
  next();
}

module.exports = { uploadSingle, uploadFields, uploadMultiple, requireImage, requireImages };
