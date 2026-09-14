const SiteConfiguration = require('../modules/siteConfiguration.model');

const PUBLIC_CACHE_TTL = 5 * 60 * 1000;
let publicConfigurationCache = null;
let publicConfigurationCacheExpiresAt = 0;

async function warmPublicSiteConfigurationCache() {
  publicConfigurationCache = await SiteConfiguration.findOne({ key: 'site' }).lean();
  publicConfigurationCacheExpiresAt = Date.now() + PUBLIC_CACHE_TTL;
  return publicConfigurationCache;
}

async function getSiteConfiguration(req, res) {
  const isPublicRequest = req.path === '/public';

  if (isPublicRequest && publicConfigurationCache && Date.now() < publicConfigurationCacheExpiresAt) {
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    return res.json({ status: 'success', data: publicConfigurationCache });
  }

  const configuration = await warmPublicSiteConfigurationCache();
  if (isPublicRequest) {
    publicConfigurationCache = configuration;
    publicConfigurationCacheExpiresAt = Date.now() + PUBLIC_CACHE_TTL;
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
  }
  res.json({ status: 'success', data: configuration });
}

async function updateSiteConfiguration(req, res) {
  const configuration = await SiteConfiguration.findOneAndUpdate(
    { key: 'site' }, { ...req.body, key: 'site' }, { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
  publicConfigurationCache = configuration.toObject();
  publicConfigurationCacheExpiresAt = Date.now() + PUBLIC_CACHE_TTL;
  res.json({ status: 'success', data: configuration });
}

module.exports = { getSiteConfiguration, updateSiteConfiguration, warmPublicSiteConfigurationCache };
