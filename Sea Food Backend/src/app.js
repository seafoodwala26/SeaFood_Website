const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const blogRoutes = require('./routes/blog.routes');
const bannerRoutes = require('./routes/banner.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const siteConfigurationRoutes = require('./routes/siteConfiguration.routes');
const heroBannerSliderRoutes = require('./routes/heroBannerSlider.routes');
const inquiryRoutes = require('./routes/inquiry.routes');

const app = express();
// Render sits behind a trusted reverse proxy and forwards the client IP.
app.set('trust proxy', 1);
const defaultAllowedOrigins = [
  'http://localhost:3000',
  'https://seafoodwala.netlify.app',
  'https://seafoodwala.in',
];
const allowedOrigins = [...new Set([
  ...defaultAllowedOrigins,
  ...(process.env.CLIENT_URL || '').split(',').map((origin) => origin.trim()).filter(Boolean),
])];

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) return callback(null, true);

    const isNetlifyPreview = /^https:\/\/.*\.netlify\.app$/.test(origin);
    if (isNetlifyPreview) return callback(null, true);

    return callback(new Error('Origin is not allowed by CORS'));
  },
  credentials: true,
}));

app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use((req, res, next) => {
  mongoSanitize.sanitize(req.body);
  mongoSanitize.sanitize(req.params);
  mongoSanitize.sanitize(req.query);
  next();
});
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 1000 : 10000,
  skip: () => process.env.NODE_ENV !== 'production',
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'fail', message: 'Too many requests from this IP, please try again later' },
});
app.use('/api', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/site-configuration', siteConfigurationRoutes);
app.use('/api/hero-banner-sliders', heroBannerSliderRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'fail', message: 'The requested page or resource could not be found.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);

  const statusCode = err.statusCode || 500;
  const message = statusCode >= 500
    ? 'Something went wrong while processing your request. Please try again. If the problem continues, contact support.'
    : err.message || 'We could not complete your request. Please check your information and try again.';
  return res.status(statusCode).json({ status: 'error', message });
});

module.exports = app;
