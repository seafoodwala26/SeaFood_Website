const mongoose = require('mongoose');

const faqItemSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
    },
    answer: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: [function () { return !this.isDraft; }, 'Blog title is required'],
      default: '',
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true,
      unique: true,
    },
    draftUrl: {
      type: String,
      trim: true,
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: [function () { return !this.isDraft; }, 'Category is required'],
      default: '',
      trim: true,
    },
    excerpt: {
      type: String,
      required: [function () { return !this.isDraft; }, 'Excerpt is required'],
      default: '',
      trim: true,
      maxlength: 320,
    },
    content: {
      type: String,
      required: [function () { return !this.isDraft; }, 'Content is required'],
      default: '',
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
