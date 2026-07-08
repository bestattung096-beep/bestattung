export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/suche'],
      },
    ],
    sitemap: 'https://bestattungs.at/sitemap.xml',
  };
}
