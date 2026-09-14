const mongoose = require('mongoose');

const faqItemSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const imageSchema = new mongoose.Schema(
  {
    publicId: String,
    url: { type: String, required: true },
    originalName: String,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Product title is required'], trim: true },
    slug: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required'] },
    images: { type: [imageSchema], required: [true, 'At least one product image is required'] },
    description: { type: String, required: [true, 'Product description is required'], trim: true },
    features: { type: [{ type: String, trim: true }], default: [] },
    metaTitle: { type: String, trim: true, maxlength: 70 },
    metaDescription: { type: String, trim: true, maxlength: 160 },
    faqs: { type: [faqItemSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ title: 'text' });
productSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
