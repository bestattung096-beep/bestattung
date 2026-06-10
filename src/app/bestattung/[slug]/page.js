import Link from 'next/link';
import { notFound } from 'next/navigation';
import { bestatter } from '@/data/bestatter';
import { bundeslaender } from '@/data/bundeslaender';
import { breadcrumbSchema, faqSchema } from '@/lib/seo';
import styles from './page.module.css';

export async function generateStaticParams() {
  return bestatter.map(b => ({ slug: b.slug }));
}

function formatAddress(location) {
  return [
    location.street && location.street !== 'Placeholder' ? location.street : '',
    [location.plz, location.city].filter(Boolean).join(' '),
    'Austria',
  ].filter(Boolean).join(', ');
}

function getMapsUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const b = bestatter.find(x => x.slug === slug);
  if (!b) return {};
  const bl = bundeslaender.find(x => x.slug === b.bundesland);
  return {
    title: `${b.name} – ${b.city}, ${bl?.name || ''} | Adresse, Parten & Leistungen`,
    description: `${b.name} in ${b.city}, ${bl?.name || ''}. ☎ Telefonnummer, Adresse, aktuelle Sterbeanzeigen, Leistungen & Öffnungszeiten. Ihr Bestatter in ${b.city}.`,
    alternates: { canonical: `https://bestattungs.at/bestattung/${slug}` },
    openGraph: { title: b.name, description: b.description, url: `https://bestattungs.at/bestattung/${slug}` },
  };
}

export default async function BestatterPage({ params }) {
  const { slug } = await params;
  const b = bestatter.find(x => x.slug === slug);
  if (!b) notFound();
  const bl = bundeslaender.find(x => x.slug === b.bundesland);
  const nearby = bestatter.filter(x => x.bundesland === b.bundesland && x.id !== b.id).slice(0, 4);
  const mainAddress = formatAddress(b);
  const mainMapsUrl = getMapsUrl(mainAddress);

  const schema = {
    '@context': 'https://schema.org', '@type': 'FuneralHome',
    name: b.name, description: b.description,
    telephone: b.phone,
    ...(b.email ? { email: b.email } : {}),
    hasMap: mainMapsUrl,
    address: { '@type': 'PostalAddress', streetAddress: b.street, postalCode: b.plz, addressLocality: b.city, addressRegion: bl?.name, addressCountry: 'AT' },
    areaServed: b.locations ? b.locations.map(l => l.city) : [b.city],
    url: `https://bestattungs.at/bestattung/${slug}`,
  };
  const faqItems = [
    { question: `Wie erreiche ich ${b.name}?`, answer: `Sie erreichen ${b.name} telefonisch unter ${b.phone}. Die Adresse lautet: ${b.street}, ${b.plz} ${b.city}.` },
    { question: `Welche Bestattungsarten bietet ${b.name} an?`, answer: `${b.name} bietet folgende Bestattungsarten an: ${b.services.join(', ')}.` },
    { question: `Wo finde ich aktuelle Parten und Sterbeanzeigen von ${b.name}?`, answer: `Aktuelle Parten und Sterbeanzeigen finden Sie auf dieser Seite oder kontaktieren Sie ${b.name} direkt.` },
  ];
  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: bl?.name || b.bundesland, href: `/bundesland/${b.bundesland}` },
    { name: b.name, href: `/bestattung/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb, faqSchema(faqItems)]) }} />
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Startseite</Link><span className="separator">/</span>
          <Link href={`/bundesland/${b.bundesland}`}>{bl?.name}</Link><span className="separator">/</span>
          <span>{b.name}</span>
        </nav>

        <div className={styles.layout}>
          <article className={styles.main}>
            <header className={styles.header}>
              <div className={styles.initial}>{b.name.replace('Bestattung ', '').replace('PAX ', '').charAt(0)}</div>
              <div>
                <h1>{b.name}</h1>
                <p className={styles.loc}>📍 {b.city}, {bl?.name} · {b.plz}</p>
              </div>
            </header>

            <section className={styles.section} id="ueber-uns">
              <h2>Über {b.name}</h2>
              <p>{b.description}</p>
              <p>{b.name} ist ein erfahrenes Bestattungsunternehmen in {b.city}, {bl?.name}. Mit einfühlsamer Betreuung und professionellem Service begleiten wir Trauerfamilien in einer der schwierigsten Zeiten ihres Lebens. Unser Team steht Ihnen rund um die Uhr zur Verfügung und kümmert sich um alle notwendigen Formalitäten.</p>
            </section>

            <section className={styles.section} id="leistungen">
              <h2>Leistungen</h2>
              <div className={styles.servicesGrid}>
                {b.services.map(s => (
                  <div key={s} className={styles.serviceItem}>
                    <span className={styles.serviceIcon}>{getServiceIcon(s)}</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </section>

            {b.locations && b.locations.length > 1 && (
              <section className={styles.section} id="standorte">
                <h2>Standorte</h2>
                <div className={styles.locGrid}>
                  {b.locations.map((l, i) => (
                    <div key={i} className={styles.locCard}>
                      <h3>{l.city}</h3>
                      <p>{formatAddress(l)}</p>
                      {l.phone && (
                        <p style={{ marginTop: '0.25rem', fontSize: '0.85rem' }}>
                          ☎ <a href={`tel:${l.phone}`}>{l.phone}</a>
                        </p>
                      )}
                      {l.email && (
                        <p style={{ marginTop: '0.25rem', fontSize: '0.85rem' }}>
                          ✉ <a href={`mailto:${l.email}`}>{l.email}</a>
                        </p>
                      )}
                      <a
                        href={getMapsUrl(formatAddress(l))}
                        className={styles.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginTop: '0.5rem', display: 'inline-block' }}
                      >
                        Route planen
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className={styles.section} id="parten">
              <h2>Aktuelle Sterbeanzeigen & Parten</h2>
              <p className={styles.partenInfo}>Aktuelle Sterbeanzeigen und Parten von {b.name} werden hier veröffentlicht. Bitte kontaktieren Sie {b.name} direkt für aktuelle Traueranzeigen und Todesfälle.</p>
              <div className={styles.partenCta}>
                <span>☎ Für aktuelle Parten kontaktieren Sie uns unter:</span>
                <a href={`tel:${b.phone}`} className={styles.phoneLink}>{b.phone}</a>
              </div>
            </section>

            <section className={styles.section} id="faq">
              <h2>Häufig gestellte Fragen</h2>
              <div className={styles.faqList}>
                <details className={styles.faq}><summary>Wie erreiche ich {b.name}?</summary><p>Sie erreichen {b.name} telefonisch unter {b.phone}. Die Adresse lautet: {b.street}, {b.plz} {b.city}.</p></details>
                <details className={styles.faq}><summary>Welche Bestattungsarten bietet {b.name} an?</summary><p>{b.name} bietet folgende Bestattungsarten an: {b.services.join(', ')}.</p></details>
                <details className={styles.faq}><summary>Wo finde ich aktuelle Parten und Sterbeanzeigen von {b.name}?</summary><p>Aktuelle Parten und Sterbeanzeigen finden Sie auf dieser Seite oder kontaktieren Sie {b.name} direkt.</p></details>
              </div>
            </section>
          </article>

          <aside className={styles.sidebar}>
            <div className={`card ${styles.contactCard}`}>
              <h3>Kontakt</h3>
              <div className={styles.contactItem}><span>📍</span><p>{b.street}<br/>{b.plz} {b.city}</p></div>
              <div className={styles.contactItem}><span>☎</span><a href={`tel:${b.phone}`}>{b.phone}</a></div>
              {b.email && (
                <div className={styles.contactItem}><span>@</span><a href={`mailto:${b.email}`}>{b.email}</a></div>
              )}
              <a
                href={mainMapsUrl}
                className={`btn btn-outline ${styles.mapButton}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Route planen
              </a>
              <a href={`tel:${b.phone}`} className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:'0.5rem'}}>Jetzt anrufen</a>
            </div>

            {nearby.length > 0 && (
              <div className={`card ${styles.nearbyCard}`}>
                <h3>Weitere Bestatter in {bl?.name}</h3>
                <div className={styles.nearbyList}>
                  {nearby.map(n => (
                    <Link href={`/bestattung/${n.slug}`} key={n.id} className={styles.nearbyItem}>
                      <span className={styles.nearbyName}>{n.name}</span>
                      <span className={styles.nearbyLoc}>{n.city}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

function getServiceIcon(s) {
  const map = { Erdbestattung: '⚰️', Feuerbestattung: '🔥', Seebestattung: '🌊', Naturbestattung: '🌳', Überführungen: '🚐', Trauerfeier: '🕯️', Parten: '📜', Todesanzeigen: '📰', Traueranzeigen: '📝' };
  return map[s] || '✦';
}
