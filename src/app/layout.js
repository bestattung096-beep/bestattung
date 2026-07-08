import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://bestattungs.at'),
  title: {
    default: 'Bestattungsunternehmen in Österreich finden | bestattungs.at',
    template: '%s | bestattungs.at',
  },
  description: 'Finden Sie Bestattungsunternehmen in ganz Österreich. Vergleichen Sie Bestatter nach Standort und Leistungen.',
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
  verification: { google: 'tbonGItdX7kVGC963AeDBo0nz_2BuBLOufU98_dxOHs' },
  other: { 'geo.region': 'AT', 'geo.placename': 'Österreich', 'content-language': 'de-AT' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de-AT" className="dark" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-307V9X36XX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-307V9X36XX');
        `}
      </Script>
    </html>
  );
}
