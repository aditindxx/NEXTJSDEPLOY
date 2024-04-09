// const nextConfig = {
//   // output: "export",
//   images: { unoptimized: true },
//   reactStrictMode: false,
// };

const nextConfig = {
  // reactStrictMode: true,
  // output: "export",
  images: { unoptimized: true },
  reactStrictMode: false,
  generateEtags: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },
    ]
  },
};
module.exports = nextConfig;
