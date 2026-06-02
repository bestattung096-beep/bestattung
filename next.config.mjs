/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.bestattungs.at' }],
        destination: 'https://bestattungs.at/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
