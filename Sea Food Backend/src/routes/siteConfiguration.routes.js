const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validationMiddleware');
const { siteConfigurationSchema } = require('../validations/siteConfiguration.validation');
const { getSiteConfiguration, updateSiteConfiguration } = require('../controllers/siteConfiguration.controller');

const router = express.Router();
router.get('/public', getSiteConfiguration);
router.use(protect, adminOnly);
router.get('/', getSiteConfiguration);
router.put('/', validateBody(siteConfigurationSchema), updateSiteConfiguration);

module.exports = router;
