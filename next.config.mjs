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
      {
        source: '/bestattung/schoenbiechler',
        destination: '/bestattung/schoenbichler',
        statusCode: 301,
      },
      {
        source: '/privacy-policy',
        destination: '/datenschutz',
        statusCode: 301,
      },
      {
        source: '/disclaimer',
        destination: '/haftungsausschluss',
        statusCode: 301,
      },
      {
        source: '/bestattung/grossschaedl-gmbh',
        destination: '/bestattung/grossschaedl',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
