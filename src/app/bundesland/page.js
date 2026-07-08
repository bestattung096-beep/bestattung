import Link from 'next/link';
import { bundeslaender } from '@/data/bundeslaender';
import { getValidBestatterForBundesland } from '@/lib/records';
import { breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Alle Bundesländer – Bestattungsunternehmen in Österreich',
  description: 'Bestattungsunternehmen in allen 9 österreichischen Bundesländern finden. Wien, Niederösterreich, Oberösterreich, Salzburg, Steiermark, Kärnten, Tirol, Vorarlberg, Burgenland.',
  alternates: { canonical: 'https://bestattungs.at/bundesland' },
  openGraph: { title: 'Alle Bundesländer – Bestattungsunternehmen in Österreich', description: 'Bestattungsunternehmen in allen 9 österreichischen Bundesländern finden.', url: 'https://bestattungs.at/bundesland' },
};

export default function BundeslaenderPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Bundesländer', href: '/bundesland' },
  ]);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
      <JsonLd data={breadcrumb} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Startseite</Link><span className="separator">/</span><span>Bundesländer</span>
      </nav>
      <h1 style={{ marginBottom: '1rem' }}>Bestattungsunternehmen nach Bundesland</h1>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: 600, marginBottom: '2rem' }}>
        Österreich besteht aus 9 Bundesländern. Wählen Sie Ihr Bundesland, um Bestatter in Ihrer Region zu finden.
      </p>
      <div className="grid-3">
        {bundeslaender.map(bl => {
          const count = getValidBestatterForBundesland(bl.slug).length;
          return (
            <Link href={`/bundesland/${bl.slug}`} key={bl.slug} className="card" style={{ textDecoration: 'none' }}>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{bl.name}</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{bl.description.substring(0, 120)}...</p>
              <span className="badge badge-accent">{count} Bestatter</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
