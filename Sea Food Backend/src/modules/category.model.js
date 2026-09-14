const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    catName: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
    },
    slug: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    description: {
      type: String,
      trim: true,
      required: [true, 'Category description is required'],
    },
    image: {
      publicId: String,
      url: String,
      originalName: String,
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
