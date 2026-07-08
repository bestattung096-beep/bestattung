import Link from 'next/link';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';
import { guides, formatGuideDate } from '@/data/guides';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Bestattungsvorsorge in Österreich – Vorsorgen und Angehörige entlasten',
  description: 'Bestattungsvorsorge in Österreich: Vorsorgevertrag, Kosten, Vorteile und was Sie beachten sollten. Entlasten Sie Ihre Angehörigen.',
  alternates: { canonical: 'https://bestattungs.at/ratgeber/vorsorge' },
  openGraph: { title: 'Bestattungsvorsorge in Österreich – Vorsorgen und Angehörige entlasten', description: 'Bestattungsvorsorge in Österreich: Vorsorgevertrag, Kosten, Vorteile und was Sie beachten sollten.', url: 'https://bestattungs.at/ratgeber/vorsorge' },
};

export default function VorsorgePage() {
  const lastUpdated = guides['vorsorge'].lastUpdated;
  const article = articleSchema({
    title: 'Bestattungsvorsorge in Oesterreich',
    description: metadata.description,
    path: '/ratgeber/vorsorge',
    dateModified: lastUpdated,
  });

  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Ratgeber', href: '/ratgeber' },
    { name: 'Vorsorge', href: '/ratgeber/vorsorge' },
  ]);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem', maxWidth: '800px' }}>
      <JsonLd data={[article, breadcrumb]} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Startseite</Link><span className="separator">/</span>
        <Link href="/ratgeber">Ratgeber</Link><span className="separator">/</span>
        <span>Vorsorge</span>
      </nav>

      <article>
        <h1 style={{ marginBottom: '0.5rem' }}>Bestattungsvorsorge – Vorsorgen und Angehörige entlasten</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Zuletzt aktualisiert: {formatGuideDate(lastUpdated)}</p>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.8 }}>
          Die Bestattungsvorsorge ermöglicht es Ihnen, Ihre eigene Bestattung zu Lebzeiten zu planen und finanziell abzusichern. So entlasten Sie Ihre Angehörigen und stellen sicher, dass Ihre Wünsche respektiert werden.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>Warum Bestattungsvorsorge?</h2>
        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          {[
            { icon: '💚', title: 'Angehörige entlasten', text: 'Ihre Familie muss in der schweren Zeit des Abschieds keine schwierigen Entscheidungen treffen.' },
            { icon: '✅', title: 'Eigene Wünsche sichern', text: 'Sie bestimmen selbst, wie Ihre Bestattung ablaufen soll – von der Bestattungsart bis zur Musik.' },
            { icon: '💰', title: 'Kosten fixieren', text: 'Mit einem Vorsorgevertrag sichern Sie sich die heutigen Preise und schützen sich vor Kostensteigerungen.' },
            { icon: '🛡️', title: 'Finanzielle Absicherung', text: 'Das Vorsorgeguthaben ist vor dem Zugriff Dritter geschützt und zweckgebunden.' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '1.25rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', margin: '0.5rem 0 0.3rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.6 }}>{item.text}</p>
            </div>
          ))}
        </div>

        <h2 style={{ marginBottom: '1rem' }}>So funktioniert die Bestattungsvorsorge</h2>
        {[
          { step: '1', title: 'Beratungsgespräch', text: 'Vereinbaren Sie ein unverbindliches Beratungsgespräch bei einem Bestatter Ihrer Wahl. Besprechen Sie Ihre Vorstellungen bezüglich Bestattungsart, Trauerfeier und Budget.' },
          { step: '2', title: 'Vorsorgevertrag abschließen', text: 'Im Vorsorgevertrag werden alle Details Ihrer gewünschten Bestattung festgehalten: Bestattungsart, Sarg oder Urne, Blumenschmuck, Musik und weitere Wünsche.' },
          { step: '3', title: 'Finanzierung regeln', text: 'Sie können den vereinbarten Betrag als Einmalzahlung oder in Raten einzahlen. Das Geld wird auf einem Treuhandkonto sicher verwahrt.' },
          { step: '4', title: 'Dokumente sicher aufbewahren', text: 'Bewahren Sie den Vorsorgevertrag an einem sicheren Ort auf und informieren Sie eine Vertrauensperson über den Vertrag.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', padding: '1.25rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{item.step}</span>
            <div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>{item.text}</p>
            </div>
          </div>
        ))}

        <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--color-accent-glow)', border: '1px solid rgba(124,140,245,0.2)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Finden Sie einen Bestatter für ein Vorsorgegespräch in Ihrer Nähe.</p>
          <Link href="/suche" className="btn btn-primary">Bestatter finden →</Link>
        </div>
      </article>
    </div>
  );
}
