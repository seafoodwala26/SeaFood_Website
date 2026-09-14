const mongoose = require('mongoose');

const faqItemSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'FAQ question is required'],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, 'FAQ answer is required'],
      trim: true,
    },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true,
      maxlength: 320,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },
    seoMeta: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    faq: {
      type: [faqItemSchema],
      default: undefined,
    },
    tags: {
      type: [{ type: String, trim: true, lowercase: true }],
      default: [],
    },
    blogImg: {
      publicId: String,
      url: String,
      originalName: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
