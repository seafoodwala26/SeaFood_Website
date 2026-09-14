const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    image: {
      publicId: { type: String, required: true },
      url: { type: String, required: true },
      originalName: String,
    },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

gallerySchema.index({ isActive: 1, sortOrder: 1, createdAt: -1 });

module.exports = mongoose.model('Gallery', gallerySchema);
