const Product = require('../modules/product.model');
const Category = require('../modules/category.model');
const { uploadImage, deleteImage } = require('../utils/cloudinaryImage');
const slugify = require('slugify');

async function uploadProductImages(files) {
  return Promise.all((files || []).map((file) => uploadImage(file, 'seafood/products')));
}

async function createProduct(req, res) {
  const product = await Product.create({
    ...req.body,
    slug: slugify(req.body.title, { lower: true, strict: true }),
    images: await uploadProductImages(req.files),
  });
  await product.populate('category', 'catName slug');
  res.status(201).json({ status: 'success', data: product });
}

async function getPublicProducts(req, res) {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 100);
  const filter = { isActive: true };
  const search = String(req.query.search || '').trim();

  if (req.query.category) {
    const categorySlug = String(req.query.category).trim().toLowerCase();
    const categoryName = categorySlug.replace(/-/g, ' ');
    const category = await Category.findOne({
      $or: [
        { slug: categorySlug },
        { catName: { $regex: `^${categoryName}$`, $options: 'i' } },
      ],
    }).select('_id');
    if (!category) return res.json({ status: 'success', results: 0, data: [], pagination: { page, limit, total: 0, totalPages: 0, hasMore: false } });
    filter.category = category._id;
  }
  if (search) filter.title = { $regex: search, $options: 'i' };

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'catName slug')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  products.forEach((product) => {
    if (!product.slug) product.slug = slugify(product.title, { lower: true, strict: true });
  });

  const totalPages = Math.ceil(total / limit);
  res.json({
    status: 'success',
    results: products.length,
    data: products,
    pagination: { page, limit, total, totalPages, hasMore: page < totalPages },
  });
}

async function getPublicProductById(req, res) {
  const lookup = [
    { slug: req.params.id },
    { title: { $regex: `^${req.params.id.replace(/-/g, ' ')}$`, $options: 'i' } },
  ];
  if (require('mongoose').isValidObjectId(req.params.id)) lookup.push({ _id: req.params.id });
  const product = await Product.findOne({ $or: lookup, isActive: true }).populate('category', 'catName slug');
  if (!product) return res.status(404).json({ status: 'fail', message: 'Product not found' });
  if (!product.slug) product.slug = slugify(product.title, { lower: true, strict: true });
  res.json({ status: 'success', data: product });
}

async function getAllProducts(req, res) {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
  const filter = {};
  const search = String(req.query.search || '').trim();

  if (search) filter.title = { $regex: search, $options: 'i' };
  if (req.query.category) {
    const category = await Category.findOne({ $or: [{ slug: req.query.category }, { _id: req.query.category }] }).select('_id');
    if (!category) return res.json({ status: 'success', results: 0, data: [], pagination: { page, limit, total: 0, totalPages: 0, hasMore: false } });
    filter.category = category._id;
  }
  if (req.query.active === 'true' || req.query.active === 'false') filter.isActive = req.query.active === 'true';

  const [products, total] = await Promise.all([
    Product.find(filter).populate('category', 'catName slug').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Product.countDocuments(filter)
  ]);

  res.json({ status: 'success', results: products.length, data: products, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
}

async function getProductById(req, res) {
  const product = await Product.findById(req.params.id).populate('category', 'catName slug');
  if (!product) return res.status(404).json({ status: 'fail', message: 'Product not found' });
  res.json({ status: 'success', data: product });
}

async function updateProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ status: 'fail', message: 'Product not found' });

  const { existingImages, ...fields } = req.body;
  if (fields.title) fields.slug = slugify(fields.title, { lower: true, strict: true });
  Object.assign(product, fields);
  if (req.files?.length) {
    const uploadedImages = await uploadProductImages(req.files);
    product.images = [...(existingImages || []).map((url) => ({ url })), ...uploadedImages];
  } else if (existingImages) {
    product.images = existingImages.map((url) => ({ url }));
  }
  await product.save();
  await product.populate('category', 'catName slug');
  res.json({ status: 'success', data: product });
}

async function deleteProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ status: 'fail', message: 'Product not found' });
  await Promise.all((product.images || []).filter((image) => image.publicId).map((image) => deleteImage(image)));
  await product.deleteOne();
  res.json({ status: 'success', message: 'Product deleted' });
}

module.exports = { createProduct, getAllProducts, getPublicProducts, getPublicProductById, getProductById, updateProduct, deleteProduct };
