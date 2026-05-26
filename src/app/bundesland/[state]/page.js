import Link from 'next/link';
import { notFound } from 'next/navigation';
import { bundeslaender } from '@/data/bundeslaender';
import { bestatter } from '@/data/bestatter';
import { cities } from '@/data/cities';
import { breadcrumbSchema } from '@/lib/seo';
import styles from './page.module.css';

export async function generateStaticParams() {
  return bundeslaender.map(b => ({ state: b.slug }));
}

export async function generateMetadata({ params }) {
  const { state } = await params;
  const bl = bundeslaender.find(b => b.slug === state);
  if (!bl) return {};
  const count = bestatter.filter(b => b.bundesland === state).length;
  return {
    title: `Bestattung ${bl.name} – ${count} Bestattungsunternehmen in ${bl.name}`,
    description: `${count} Bestattungsunternehmen in ${bl.name} finden. Vergleichen Sie Bestatter in ${bl.name} mit Kontaktdaten, Leistungen und Sterbeanzeigen.`,
    alternates: { canonical: `https://bestattungs.at/bundesland/${state}` },
    openGraph: { title: `Bestattung ${bl.name}`, description: bl.description, url: `https://bestattungs.at/bundesland/${state}` },
  };
}

export default async function BundeslandPage({ params }) {
  const { state } = await params;
  const bl = bundeslaender.find(b => b.slug === state);
  if (!bl) notFound();

  const stateBestatter = bestatter.filter(b => b.bundesland === state);
  const stateCities = cities.filter(c => c.bundesland === state);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Bestattungsunternehmen in ${bl.name}`,
    description: bl.description,
    numberOfItems: stateBestatter.length,
    itemListElement: stateBestatter.map((b, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'FuneralHome', name: b.name, address: { '@type': 'PostalAddress', addressLocality: b.city, addressRegion: bl.name, addressCountry: 'AT' } }
    }))
  };
  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Bundeslaender', href: '/bundesland' },
    { name: bl.name, href: `/bundesland/${state}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]) }} />
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Startseite</Link><span className="separator">/</span>
          <Link href="/bundesland">Bundesländer</Link><span className="separator">/</span>
          <span>{bl.name}</span>
        </nav>

        <header className={styles.header}>
          <h1>Bestattungsunternehmen in {bl.name}</h1>
          <p className={styles.intro}>{bl.description}</p>
          <div className={styles.stats}>
            <span className="badge badge-accent">{stateBestatter.length} Bestatter</span>
            <span className="badge badge-gold">{stateCities.length} Städte</span>
            <span className="badge badge-success">{bl.population} Einwohner</span>
          </div>
        </header>

        {stateCities.length > 0 && (
          <section className={styles.section}>
            <h2>Städte in {bl.name}</h2>
            <div className={styles.cityGrid}>
              {stateCities.map(c => (
                <Link href={`/bundesland/${state}/${c.slug}`} key={c.slug} className={styles.cityCard}>
                  <h3>{c.name}</h3>
                  <span className={styles.cityCount}>{bestatter.filter(b => b.citySlug === c.slug).length} Bestatter</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2>Alle Bestatter in {bl.name}</h2>
          <div className={styles.bestatterList}>
            {stateBestatter.map(b => (
              <Link href={`/bestattung/${b.slug}`} key={b.id} className={`card ${styles.bCard}`}>
                <div className={styles.bHeader}>
                  <span className={styles.bInitial}>{b.name.replace('Bestattung ', '').replace('PAX ', '').charAt(0)}</span>
                  <div>
                    <h3 className={styles.bName}>{b.name}</h3>
                    <span className={styles.bLoc}>📍 {b.city}, {b.plz}</span>
                  </div>
                </div>
                <p className={styles.bDesc}>{b.description}</p>
                <div className={styles.bServices}>{b.services.slice(0, 3).map(s => <span className="badge badge-accent" key={s}>{s}</span>)}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Bestattungstraditionen in {bl.name}</h2>
          <div className={`card ${styles.tradCard}`}>
            <p>{bl.traditions}</p>
          </div>
          <h3 className={styles.subTitle}>Friedhöfe in {bl.name}</h3>
          <ul className={styles.friedhofList}>
            {bl.friedhoefe.map(f => <li key={f}>{f}</li>)}
          </ul>
        </section>
      </div>
    </>
  );
}
