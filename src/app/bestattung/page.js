import Link from 'next/link';
import { bundeslaender } from '@/data/bundeslaender';
import { getValidBestatter } from '@/lib/records';
import { breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Alle Bestattungsunternehmen in Österreich',
  description: 'Komplettes Verzeichnis aller Bestattungsunternehmen in Österreich. Finden Sie Bestatter nach Name, Standort und Leistungen.',
  alternates: { canonical: 'https://bestattungs.at/bestattung' },
  openGraph: { title: 'Alle Bestattungsunternehmen in Österreich', description: 'Komplettes Verzeichnis aller Bestattungsunternehmen in Österreich.', url: 'https://bestattungs.at/bestattung' },
};

export default function BestatterListPage() {
  const bestatter = getValidBestatter();
  const grouped = {};
  bestatter.forEach(b => {
    const bl = bundeslaender.find(x => x.slug === b.bundesland);
    const key = bl ? bl.name : 'Sonstige';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(b);
  });

  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Alle Bestatter', href: '/bestattung' },
  ]);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
      <JsonLd data={breadcrumb} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Startseite</Link><span className="separator">/</span><span>Alle Bestatter</span>
      </nav>
      <h1 style={{ marginBottom: '0.5rem' }}>Alle Bestattungsunternehmen in Österreich</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        {bestatter.length} Bestattungsunternehmen in ganz Österreich – sortiert nach Bundesland.
      </p>
      {Object.entries(grouped).map(([region, items]) => (
        <section key={region} style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>{region} ({items.length})</h2>
          <div className="grid-3">
            {items.map(b => (
              <Link href={`/bestattung/${b.slug}`} key={b.id} className="card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600 }}>{b.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>📍 {b.city}, {b.plz}</span>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', flex: 1 }}>{b.description.substring(0, 100)}...</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {b.services.slice(0, 2).map(s => <span className="badge badge-accent" key={s}>{s}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
