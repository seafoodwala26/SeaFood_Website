const path = require('path');
// Support the project-root .env and the existing src/.env during migration.
// Values in the root file take precedence when both files exist.
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env'), override: true });
const app = require('./app');
const connectDB = require('./config/database');
const { warmPublicHeroBannerSliderCache } = require('./controllers/heroBannerSlider.controller');
const { warmPublicSiteConfigurationCache } = require('./controllers/siteConfiguration.controller');

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    return Promise.all([
      warmPublicHeroBannerSliderCache(),
      warmPublicSiteConfigurationCache(),
    ]);
  })
  .then(() => {
    app.listen(port, () => { console.log(`Server running on port ${port}`);});
  })
  .catch((error) => {console.error('Failed to connect to database', error); process.exit(1);});
