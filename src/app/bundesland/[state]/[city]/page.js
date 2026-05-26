import Link from 'next/link';
import { notFound } from 'next/navigation';
import { bundeslaender } from '@/data/bundeslaender';
import { bestatter } from '@/data/bestatter';
import { cities } from '@/data/cities';
import { breadcrumbSchema } from '@/lib/seo';
import styles from './page.module.css';

export async function generateStaticParams() {
  return cities.map(c => ({ state: c.bundesland, city: c.slug }));
}

export async function generateMetadata({ params }) {
  const { state, city } = await params;
  const c = cities.find(x => x.slug === city && x.bundesland === state);
  const bl = bundeslaender.find(x => x.slug === state);
  if (!c || !bl) return {};
  const count = bestatter.filter(b => b.citySlug === city).length;
  return {
    title: `Bestattung ${c.name} – ${count} Bestattungsunternehmen in ${c.name}, ${bl.name}`,
    description: `${count} Bestattungsunternehmen in ${c.name}, ${bl.name} finden. Vergleichen Sie Bestatter in ${c.name} mit Kontaktdaten, Leistungen, Friedhöfen und aktuellen Sterbeanzeigen.`,
    alternates: { canonical: `https://bestattungs.at/bundesland/${state}/${city}` },
    openGraph: { title: `Bestattung ${c.name}`, description: c.description, url: `https://bestattungs.at/bundesland/${state}/${city}` },
  };
}

export default async function CityPage({ params }) {
  const { state, city } = await params;
  const c = cities.find(x => x.slug === city && x.bundesland === state);
  const bl = bundeslaender.find(x => x.slug === state);
  if (!c || !bl) notFound();

  const cityBestatter = bestatter.filter(b => b.citySlug === city || (b.locations && b.locations.some(l => l.city.toLowerCase().replace(/[^a-z0-9]/g, '-') === city)));
  const nearbyCities = cities.filter(x => x.bundesland === state && x.slug !== city).slice(0, 6);

  const schema = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: `Bestattungsunternehmen in ${c.name}`,
    description: c.description,
    numberOfItems: cityBestatter.length,
    itemListElement: cityBestatter.map((b, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'FuneralHome', name: b.name, address: { '@type': 'PostalAddress', addressLocality: c.name, addressRegion: bl.name, addressCountry: 'AT' } }
    }))
  };
  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Bundeslaender', href: '/bundesland' },
    { name: bl.name, href: `/bundesland/${state}` },
    { name: c.name, href: `/bundesland/${state}/${city}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]) }} />
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Startseite</Link><span className="separator">/</span>
          <Link href="/bundesland">Bundesländer</Link><span className="separator">/</span>
          <Link href={`/bundesland/${state}`}>{bl.name}</Link><span className="separator">/</span>
          <span>{c.name}</span>
        </nav>

        <header className={styles.header}>
          <h1>Bestattung in {c.name}</h1>
          <p className={styles.subtitle}>{bl.name} · PLZ {Array.isArray(c.plz) ? c.plz[0] : c.plz} · {c.population ? Number(c.population).toLocaleString('de-AT') + ' Einwohner' : ''}</p>
          <p className={styles.intro}>{c.description}</p>
        </header>

        {/* Bestatter in this city */}
        <section className={styles.section}>
          <h2>Bestattungsunternehmen in {c.name}</h2>
          {cityBestatter.length > 0 ? (
            <div className={styles.bestatterGrid}>
              {cityBestatter.map(b => (
                <Link href={`/bestattung/${b.slug}`} key={b.id} className={styles.bCard}>
                  <div className={styles.bHeader}>
                    <span className={styles.bInitial}>{b.name.replace('Bestattung ', '').replace('PAX ', '').charAt(0)}</span>
                    <div>
                      <h3 className={styles.bName}>{b.name}</h3>
                      <span className={styles.bAddr}>{b.street}, {b.plz} {b.city}</span>
                    </div>
                  </div>
                  <p className={styles.bDesc}>{b.description}</p>
                  <div className={styles.bMeta}>
                    <span className={styles.bPhone}>☎ {b.phone}</span>
                    <div className={styles.bServices}>
                      {b.services.slice(0, 3).map(s => <span className="badge badge-accent" key={s}>{s}</span>)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Derzeit sind keine Bestatter speziell in {c.name} gelistet. Bitte sehen Sie sich die <Link href={`/bundesland/${state}`}>Bestatter in {bl.name}</Link> an.</p>
            </div>
          )}
        </section>

        {/* Local info */}
        <section className={styles.section}>
          <h2>Wichtige Informationen für {c.name}</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>⛪ Friedhöfe in {c.name}</h3>
              <ul className={styles.infoList}>
                {c.friedhoefe.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h3>📋 Standesamt</h3>
              <p>Im Todesfall muss die Sterbeurkunde beim zuständigen Standesamt beantragt werden.</p>
              <p className={styles.standesamt}>{c.standesamt}</p>
            </div>
            <div className={styles.infoCard}>
              <h3>📞 Notfall-Kontakt</h3>
              <p>Im Todesfall erreichen Sie Bestatter in {c.name} rund um die Uhr. Die meisten Bestattungsunternehmen bieten einen 24-Stunden-Bereitschaftsdienst an.</p>
            </div>
          </div>
        </section>

        {/* What to do */}
        <section className={styles.section}>
          <h2>Was tun im Todesfall in {c.name}?</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>1</span>
              <div><h3>Arzt verständigen</h3><p>Ein Arzt muss den Tod feststellen und den Totenschein ausstellen.</p></div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>2</span>
              <div><h3>Bestatter kontaktieren</h3><p>Kontaktieren Sie ein Bestattungsunternehmen in {c.name}. Diese übernehmen die weitere Organisation.</p></div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <div><h3>Standesamt ({c.standesamt})</h3><p>Der Todesfall wird beim {c.standesamt} beurkundet.</p></div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>4</span>
              <div><h3>Bestattung planen</h3><p>Gemeinsam mit dem Bestatter die Bestattungsart, den Termin und die Trauerfeier planen.</p></div>
            </div>
          </div>
        </section>

        {/* Nearby cities */}
        {nearbyCities.length > 0 && (
          <section className={styles.section}>
            <h2>Bestatter in der Nähe von {c.name}</h2>
            <div className={styles.nearbyGrid}>
              {nearbyCities.map(nc => (
                <Link href={`/bundesland/${state}/${nc.slug}`} key={nc.slug} className={styles.nearbyCard}>
                  <h3>{nc.name}</h3>
                  <span>{bestatter.filter(b => b.citySlug === nc.slug).length} Bestatter</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
