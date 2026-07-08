import Link from 'next/link';
import SearchClient from './SearchClient';
import { breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Bestatter suchen',
  description: 'Suchen Sie Bestattungsunternehmen in Oesterreich nach Name, Ort und Bundesland.',
  alternates: { canonical: 'https://bestattungs.at/suche' },
  robots: { index: false, follow: true },
};

export default function SuchePage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Suche', href: '/suche' },
  ]);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
      <JsonLd data={breadcrumb} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Startseite</Link><span className="separator">/</span><span>Suche</span>
      </nav>
      <h1 style={{ marginBottom: '1.5rem' }}>Bestatter suchen</h1>
      <SearchClient />
    </div>
  );
}
