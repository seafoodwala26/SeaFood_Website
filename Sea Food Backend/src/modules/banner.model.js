const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    pageSlug: {
      type: String,
      required: [true, 'Page slug is required'],
      enum: ['about', 'products', 'blog', 'contact'],
      unique: true,
      trim: true,
    },
    pageName: { type: String, required: true, trim: true },
    title: {
      type: String,
      required: [true, 'Banner title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Banner description is required'],
    },
    image: {
      publicId: String,
      url: String,
      originalName: String,
    },
    backgroundColor: {
      type: String,
      trim: true,
      default: '#ffffff',
    },
    overlayStart: { type: String, trim: true, default: '#131838' },
    overlayEnd: { type: String, trim: true, default: '#6869b6' },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);
