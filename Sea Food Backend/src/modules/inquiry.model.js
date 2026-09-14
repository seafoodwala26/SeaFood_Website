const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    company: { type: String, default: '', trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    product: { type: String, required: true, trim: true },
    quantity: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
