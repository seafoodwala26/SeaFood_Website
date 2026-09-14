const mongoose = require('mongoose');

const ctaSchema = new mongoose.Schema(
  { label: { type: String, trim: true, required: true }, href: { type: String, trim: true, required: true } },
  { _id: false }
);

const statSchema = new mongoose.Schema(
  { value: { type: String, trim: true, required: true }, label: { type: String, trim: true, required: true } },
  { _id: false }
);

const heroBannerSliderSchema = new mongoose.Schema(
  {
    image: { publicId: String, url: { type: String, required: true }, originalName: String },
    alt: { type: String, trim: true, required: true },
    badge: { type: String, trim: true, required: true },
    title: { type: String, trim: true, required: true },
    highlight: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    primaryCta: { type: ctaSchema, required: true },
    secondaryCta: { type: ctaSchema, required: true },
    stats: { type: [statSchema], default: [] },
    iconKey: { type: String, trim: true, default: 'fish' },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

heroBannerSliderSchema.index({ sortOrder: 1, createdAt: -1 });

module.exports = mongoose.model('HeroBannerSlider', heroBannerSliderSchema);
