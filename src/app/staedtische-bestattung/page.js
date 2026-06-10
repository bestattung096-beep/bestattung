import Link from 'next/link';
import { municipalFuneralServices } from '@/data/municipal-funeral-services';
import { bundeslaender } from '@/data/bundeslaender';
import { breadcrumbSchema } from '@/lib/seo';
import styles from './page.module.css';

export const metadata = {
  title: 'Städtische Bestattung Österreich – Kommunale Bestatter im Überblick',
  description: 'Übersicht aller städtischen und kommunalen Bestattungsunternehmen in Österreich. Kontaktdaten, Adressen, Telefonnummern von Wien bis Kärnten.',
  alternates: { canonical: 'https://bestattungs.at/staedtische-bestattung' },
};

export default function StaedtischeBestattungPage() {
  // Group municipal services by bundesland
  const grouped = bundeslaender.reduce((acc, bl) => {
    const list = municipalFuneralServices.filter(s => s.bundesland === bl.slug);
    if (list.length > 0) {
      acc.push({
        state: bl,
        services: list
      });
    }
    return acc;
  }, []);

  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Städtische Bestattung', href: '/staedtische-bestattung' },
  ]);

  const totalCount = municipalFuneralServices.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Startseite</Link>
          <span className="separator">/</span>
          <span>Städtische Bestattungen</span>
        </nav>

        <header className={styles.header}>
          <span className="badge badge-gold">Kommunale Bestattungsdienste</span>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>Städtische Bestattungen in Österreich</h1>
          <p className={styles.intro}>
            Städtische oder kommunale Bestattungsunternehmen werden direkt von den jeweiligen Gemeinden, 
            Stadtgemeinden oder städtischen Betrieben geführt. Hier finden Sie eine vollständige Übersicht aller 
            {totalCount} städtischen Bestatter in Österreich.
          </p>
          <div className={styles.stats}>
            <span className="badge badge-accent">{totalCount} Städtische Bestatter</span>
            <span className="badge badge-success">24/7 Journaldienst</span>
            <span className="badge badge-gold">Alle Bundesländer</span>
          </div>
        </header>

        {/* Informative Explanation Section */}
        <section className={styles.infoSection} id="info-section">
          <h2>Was zeichnet städtische Bestattungen aus?</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            In Österreich gibt es historisch gewachsen eine Koexistenz aus privaten Bestattungsunternehmen 
            und städtischen (oft als &bdquo;Städtische Bestattung&ldquo; bezeichneten) Betrieben. Beide bieten 
            grundsätzlich dieselben Dienstleistungen an.
          </p>
          <div className={styles.infoGrid}>
            <div className={styles.infoCol}>
              <h3>Öffentlicher Auftrag</h3>
              <p>Städtische Bestatter übernehmen die Bestattungsdienste im Auftrag der Gemeinde. Sie sichern den Grundbedarf ab und betreiben oft auch die städtischen Friedhöfe.</p>
            </div>
            <div className={styles.infoCol}>
              <h3>Tradition & Vertrauensschutz</h3>
              <p>Viele Menschen schätzen den verlässlichen Charakter kommunaler Betriebe, die oft seit Generationen existieren und eng mit den regionalen Bräuchen verwurzelt sind.</p>
            </div>
            <div className={styles.infoCol}>
              <h3>Preistransparenz</h3>
              <p>Die Gebührenordnungen städtischer Bestattungen sind in der Regel öffentlich einsehbar und orientieren sich an kommunalen Tarifen und Vorgaben.</p>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link href="/ratgeber/staedtische-bestattung" style={{ fontWeight: 600 }}>
              Detaillierten Ratgeber: Städtisch vs. Privat lesen →
            </Link>
          </div>
        </section>

        {/* Grouped Lists */}
        {grouped.map(({ state, services }) => (
          <section key={state.slug} className={styles.stateSection} id={`state-section-${state.slug}`}>
            <h2 className={styles.stateTitle}>
              <span>{getStateEmoji(state.slug)}</span> {state.name}
            </h2>
            <div className={styles.bestatterGrid}>
              {services.map(b => (
                <div key={b.id} className={styles.bCard} id={`municipal-home-${b.id}`}>
                  <div>
                    <div className={styles.bHeader}>
                      <span className={styles.bIcon}>🏛️</span>
                      <div>
                        <h3 className={styles.bName}>{b.name}</h3>
                        <span className={styles.bLocation}>📍 {b.plz} {b.city}</span>
                      </div>
                    </div>
                    <p className={styles.bDetails}>
                      {b.street && b.street !== b.city ? b.street : 'Gemeindegebiet'}
                      {b.note && <span style={{ display: 'block', marginTop: '0.5rem', fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--color-gold)' }}>* {b.note}</span>}
                    </p>
                  </div>

                  <div className={styles.bContact}>
                    {b.phone && b.phone !== 'Placeholder' && (
                      <a href={`tel:${b.phone}`} className={styles.contactItem} aria-label={`Telefonnummer für ${b.name}`}>
                        <span>📞</span> {b.phone}
                      </a>
                    )}
                    {b.email && b.email !== 'Placeholder' && (
                      <a href={`mailto:${b.email}`} className={styles.contactItem} aria-label={`E-Mail-Adresse für ${b.name}`}>
                        <span>✉️</span> {b.email}
                      </a>
                    )}
                    {b.website && (
                      <a href={b.website.startsWith('http') ? b.website : `https://${b.website}`} target="_blank" rel="noopener noreferrer" className={styles.contactItem} aria-label={`Webseite für ${b.name}`}>
                        <span>🌐</span> {b.website}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className={styles.ctaBox}>
          <h2>Sie suchen einen privaten Bestatter in Ihrer Region?</h2>
          <p>
            Vergleichen Sie Dienstleistungen und Angebote von Bestattern in allen Regionen Österreichs.
          </p>
          <Link href="/suche" className="btn btn-outline" style={{ background: '#fff', color: 'var(--color-bg-primary)', border: 'none' }}>
            Zur Bestattersuche →
          </Link>
        </div>
      </div>
    </>
  );
}

function getStateEmoji(slug) {
  const map = { wien: '🏛️', niederoesterreich: '🏰', oberoesterreich: '🏔️', salzburg: '🎵', steiermark: '🌿', kaernten: '☀️', tirol: '⛷️', vorarlberg: '🗻', burgenland: '🍷' };
  return map[slug] || '📍';
}
