const mongoose = require('mongoose');

const siteConfigurationSchema = new mongoose.Schema({
  key: { type: String, default: 'site', unique: true, immutable: true },
  yearsOfExperience: { type: Number, default: 0, min: 0 },
  countriesServed: { type: Number, default: 0, min: 0 },
  happyClients: { type: Number, default: 0, min: 0 },
  productsExported: { type: Number, default: 0, min: 0 },
  tagline: { type: String, required: true, trim: true, maxlength: 300 },
  facebookUrl: { type: String, trim: true, default: '' },
  linkedinUrl: { type: String, trim: true, default: '' },
  instagramUrl: { type: String, trim: true, default: '' },
  mobileNumber: { type: String, required: true, trim: true, maxlength: 30 },
  email: { type: String, required: true, trim: true, lowercase: true },
  workingDays: { type: String, required: true, trim: true, maxlength: 100 },
  officeHours: { type: String, required: true, trim: true, maxlength: 100 },
  fullAddress: { type: String, required: true, trim: true, maxlength: 500 },
  mapEmbedUrl: { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('SiteConfiguration', siteConfigurationSchema);
