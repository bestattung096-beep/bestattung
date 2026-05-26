import Link from 'next/link';
import SearchClient from './SearchClient';

export const metadata = {
  title: 'Bestatter suchen',
  description: 'Suchen Sie Bestattungsunternehmen in Oesterreich nach Name, Ort und Bundesland.',
  alternates: { canonical: 'https://bestattungs.at/suche' },
  robots: { index: true, follow: true },
};

export default function SuchePage() {
  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Startseite</Link><span className="separator">/</span><span>Suche</span>
      </nav>
      <h1 style={{ marginBottom: '1.5rem' }}>Bestatter suchen</h1>
      <SearchClient />
    </div>
  );
}
