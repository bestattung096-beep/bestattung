import Link from 'next/link';
import { articleSchema } from '@/lib/seo';

export const metadata = {
  title: 'Bestattungskosten in Österreich – Was kostet eine Bestattung?',
  description: 'Was kostet eine Bestattung in Österreich? Durchschnittliche Kosten für Erdbestattung, Feuerbestattung, Grabgebühren, Förderungen und Spartipps.',
  alternates: { canonical: 'https://bestattungs.at/ratgeber/kosten' },
};

export default function KostenPage() {
  const article = articleSchema({
    title: 'Bestattungskosten in Oesterreich - Was kostet eine Bestattung?',
    description: metadata.description,
    path: '/ratgeber/kosten',
  });

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem', maxWidth: '800px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Startseite</Link><span className="separator">/</span>
        <Link href="/ratgeber">Ratgeber</Link><span className="separator">/</span>
        <span>Kosten</span>
      </nav>

      <article>
        <h1 style={{ marginBottom: '1.5rem' }}>Was kostet eine Bestattung in Österreich?</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.8 }}>
          Die Kosten einer Bestattung in Österreich variieren je nach Bestattungsart, Region und individuellen Wünschen erheblich. Im Durchschnitt liegen die Gesamtkosten zwischen 3.000 und 10.000 Euro. Hier finden Sie eine detaillierte Kostenübersicht.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>Kostenübersicht nach Bestattungsart</h2>
        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--color-text-primary)' }}>Bestattungsart</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--color-text-primary)' }}>Kosten (ca.)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Erdbestattung', '3.000 – 8.000 €'],
                ['Feuerbestattung', '2.500 – 6.000 €'],
                ['Seebestattung', '3.500 – 7.000 €'],
                ['Naturbestattung', '2.000 – 5.000 €'],
                ['Diamantbestattung', '5.000 – 15.000 €'],
              ].map(([art, kosten], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem', color: 'var(--color-text-secondary)' }}>{art}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--color-gold)', fontWeight: 600 }}>{kosten}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ marginBottom: '1rem' }}>Woraus setzen sich die Kosten zusammen?</h2>
        {[
          { title: 'Bestatterleistungen', items: ['Überführung und Aufbahrung', 'Sarg oder Urne', 'Einkleidung und Versorgung', 'Organisation der Trauerfeier', 'Parte / Sterbeanzeigen'] },
          { title: 'Friedhofsgebühren', items: ['Grabgebühren (Grabkauf oder -verlängerung)', 'Beisetzungsgebühren', 'Friedhofsverwaltung', 'Grabpflege (optional)'] },
          { title: 'Sonstige Kosten', items: ['Blumenschmuck und Kränze', 'Steinmetz / Grabstein', 'Totenmahl / Leichenschmaus', 'Trauerkarten und Danksagungen', 'Kirchliche Gebühren'] },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', marginBottom: '0.75rem' }}>{section.title}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {section.items.map((item, j) => (
                <li key={j} style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', paddingLeft: '1rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)' }}>•</span>{item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <h2 style={{ marginBottom: '1rem' }}>Förderungen und Zuschüsse</h2>
        <div style={{ padding: '1.5rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.93rem', lineHeight: 1.7 }}>
            In Österreich gibt es verschiedene Möglichkeiten, finanzielle Unterstützung für eine Bestattung zu erhalten. Die Sozialversicherungsträger zahlen unter bestimmten Voraussetzungen ein Bestattungskostenpauschale. Zudem kann bei der Gemeinde oder beim Sozialamt um Unterstützung angesucht werden, wenn die Kosten nicht aus dem Nachlass oder eigenen Mitteln gedeckt werden können.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--color-accent-glow)', border: '1px solid rgba(124,140,245,0.2)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Kostenlose Beratung bei einem Bestatter in Ihrer Nähe</p>
          <Link href="/suche" className="btn btn-primary">Bestatter finden →</Link>
        </div>
      </article>
    </div>
  );
}
