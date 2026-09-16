/** @type {import('next').NextConfig} */
const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

const nextConfig = {
  images: { unoptimized: true },
  // Proxy API calls through this app so the backend auth cookie is stored on
  // this app's own domain. Without this, the cookie belongs to the API domain
  // and the server-side admin session check in app/admin/page.tsx can never read it.
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${apiUrl}/:path*` }];
  },
};

module.exports = nextConfig;
