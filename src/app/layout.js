import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { organizationSchema } from '@/lib/seo';

export const metadata = {
  metadataBase: new URL('https://bestattungs.at'),
  title: {
    default: 'Bestattungsunternehmen in Österreich finden | bestattungs.at',
    template: '%s | bestattungs.at',
  },
  description: 'Finden Sie Bestattungsunternehmen in ganz Österreich. Vergleichen Sie Bestatter nach Standort, Leistungen und Bewertungen. Aktuelle Sterbeanzeigen und Parten.',
  keywords: ['Bestattung', 'Bestatter', 'Österreich', 'Bestattungsunternehmen', 'Trauerfall', 'Sterbeanzeigen', 'Parten'],
  authors: [{ name: 'bestattungs.at' }],
  creator: 'bestattungs.at',
  publisher: 'bestattungs.at',
  formatDetection: { email: false, telephone: true },
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: 'https://bestattungs.at',
    siteName: 'bestattungs.at',
    title: 'Bestattungsunternehmen in Österreich finden | bestattungs.at',
    description: 'Finden Sie Bestattungsunternehmen in ganz Österreich. Vergleichen Sie Bestatter nach Standort, Leistungen und Bewertungen.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'bestattungs.at' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bestattungsunternehmen in Oesterreich finden | bestattungs.at',
    description: 'Finden Sie Bestattungsunternehmen in ganz Oesterreich.',
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
  alternates: { canonical: 'https://bestattungs.at' },
  other: { 'geo.region': 'AT', 'geo.placename': 'Österreich', 'content-language': 'de-AT' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de-AT" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'bestattungs.at',
              url: 'https://bestattungs.at',
              description: 'Bestattungsunternehmen in Österreich finden',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://bestattungs.at/suche?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
              inLanguage: 'de-AT',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
