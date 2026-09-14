/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://seafoodwala.in',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/*', '/admin'],
  transformItem: (item) => {
    if (item.url === 'https://seafoodwala.in/') {
      item.priority = 1;
    }
    return item;
  },
};
