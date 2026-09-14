const Category = require('../modules/category.model');
const Product = require('../modules/product.model');
const { uploadImage, replaceImage, deleteImage } = require('../utils/cloudinaryImage');
const slugify = require('slugify');

async function createCategory(req, res) {
  const categoryData = { ...req.body };
  categoryData.slug = slugify(categoryData.catName, { lower: true, strict: true });

  categoryData.image = await uploadImage(req.file, 'seafood/categories');

  const category = await Category.create(categoryData);
  res.status(201).json({ status: 'success', data: category });
}

async function getPublicCategories(req, res) {
  const [categories, productCounts] = await Promise.all([
    Category.find({ isActive: true }).sort({ createdAt: -1 }).lean(),
    Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]),
  ]);
  const countByCategoryId = new Map(productCounts.map((item) => [String(item._id), item.count]));

  categories.forEach((category) => {
    if (!category.slug) category.slug = slugify(category.catName, { lower: true, strict: true });
    category.productCount = countByCategoryId.get(String(category._id)) || 0;
  });
  res.json({ status: 'success', data: categories });
}

async function getAllCategories(req, res) {
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

  const categories = await Category.find(filter).sort({ createdAt: -1, _id: -1 }).limit(limit + 1);
  const hasNext = categories.length > limit;
  if (hasNext) categories.pop();

  const nextCursor = hasNext
    ? Buffer.from(`${categories[categories.length - 1].createdAt.toISOString()}|${categories[categories.length - 1]._id}`).toString('base64')
    : null;

  res.json({ status: 'success', results: categories.length, nextCursor, data: categories });
}

async function getCategoryById(req, res) {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ status: 'fail', message: 'Category not found' });
  }

  res.json({ status: 'success', data: category });
}

async function updateCategory(req, res) {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ status: 'fail', message: 'Category not found' });
  }

  if (req.file) req.body.image = await replaceImage(req.file, category.image, 'seafood/categories');

  if (req.body.catName) req.body.slug = slugify(req.body.catName, { lower: true, strict: true });

  Object.assign(category, req.body);
  await category.save();

  res.json({ status: 'success', data: category });
}

async function deleteCategory(req, res) {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ status: 'fail', message: 'Category not found' });
  }

  if (category.image?.publicId) {
    await deleteImage(category.image);
  }
  await category.deleteOne();

  res.json({ status: 'success', message: 'Category deleted' });
}

module.exports = { createCategory, getAllCategories, getPublicCategories, getCategoryById, updateCategory, deleteCategory };
