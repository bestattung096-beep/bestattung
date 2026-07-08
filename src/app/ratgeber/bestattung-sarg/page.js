import Link from 'next/link';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';
import { guides, formatGuideDate } from '@/data/guides';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Sargbestattung in Österreich – Ablauf, Kosten & Traditionen',
  description: 'Alles über die Sargbestattung in Österreich: Ablauf, Kosten, Sargarten, Traditionen und was Sie bei einer Bestattung im Sarg beachten sollten.',
  alternates: { canonical: 'https://bestattungs.at/ratgeber/bestattung-sarg' },
  openGraph: { title: 'Sargbestattung in Österreich – Ablauf, Kosten & Traditionen', description: 'Alles über die Sargbestattung in Österreich: Ablauf, Kosten, Sargarten, Traditionen und was Sie bei einer Bestattung im Sarg beachten sollten.', url: 'https://bestattungs.at/ratgeber/bestattung-sarg' },
};

export default function BestattungSargPage() {
  const lastUpdated = guides['bestattung-sarg'].lastUpdated;
  const article = articleSchema({
    title: 'Sargbestattung in Oesterreich',
    description: metadata.description,
    path: '/ratgeber/bestattung-sarg',
    dateModified: lastUpdated,
  });

  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Ratgeber', href: '/ratgeber' },
    { name: 'Sargbestattung', href: '/ratgeber/bestattung-sarg' },
  ]);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem', maxWidth: '800px' }}>
      <JsonLd data={[article, breadcrumb]} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Startseite</Link><span className="separator">/</span>
        <Link href="/ratgeber">Ratgeber</Link><span className="separator">/</span>
        <span>Sargbestattung</span>
      </nav>

      <article>
        <h1 style={{ marginBottom: '0.5rem' }}>Sargbestattung in Österreich</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Zuletzt aktualisiert: {formatGuideDate(lastUpdated)}</p>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.8 }}>
          Die Sargbestattung (Erdbestattung) ist die traditionellste Form der Bestattung in Österreich. Der Verstorbene wird in einem Sarg auf einem Friedhof beigesetzt. Dieser Ratgeber informiert Sie über Ablauf, Kosten und Sargarten.
        </p>

        <h2 style={{ marginBottom: '1rem' }}>Ablauf einer Sargbestattung</h2>
        {[
          { title: 'Versorgung und Einsargung', text: 'Der Verstorbene wird vom Bestatter versorgt, gewaschen und eingekleidet. Anschließend erfolgt die Einsargung in den ausgewählten Sarg.' },
          { title: 'Aufbahrung', text: 'Die Aufbahrung kann zu Hause, in der Aufbahrungshalle des Friedhofs oder in den Räumlichkeiten des Bestatters stattfinden. Angehörige haben die Möglichkeit, sich vom Verstorbenen zu verabschieden.' },
          { title: 'Trauerfeier', text: 'Die Trauerfeier findet in der Kirche, Friedhofskapelle oder Aufbahrungshalle statt. Sie kann religiös oder weltlich gestaltet werden.' },
          { title: 'Beisetzung', text: 'Der Sarg wird in einem Erdgrab auf dem Friedhof beigesetzt. Die Beisetzung erfolgt in der Regel im Anschluss an die Trauerfeier.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', padding: '1.25rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
            <div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>{item.text}</p>
            </div>
          </div>
        ))}

        <h2 style={{ margin: '2rem 0 1rem' }}>Sargarten im Überblick</h2>
        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          {[
            { title: 'Kiefernsarg', price: 'ab 500 €', desc: 'Der am häufigsten verwendete Sarg. Schlicht und natürlich.' },
            { title: 'Eichensarg', price: 'ab 1.200 €', desc: 'Hochwertiger und langlebiger Sarg aus Eichenholz.' },
            { title: 'Designersarg', price: 'ab 2.000 €', desc: 'Individuell gestaltete Särge mit besonderen Verzierungen.' },
            { title: 'Ökosarg', price: 'ab 400 €', desc: 'Umweltfreundliche Särge aus nachhaltigen Materialien.' },
          ].map((sarg, i) => (
            <div key={i} style={{ padding: '1.25rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>⚰️ {sarg.title}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: 600 }}>{sarg.price}</span>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', margin: '0.5rem 0 0', lineHeight: 1.6 }}>{sarg.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ marginBottom: '1rem' }}>Kosten einer Sargbestattung</h2>
        <div style={{ padding: '1.5rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.93rem', lineHeight: 1.7 }}>
            Die Gesamtkosten einer Sargbestattung in Österreich liegen durchschnittlich zwischen <strong style={{ color: 'var(--color-gold)' }}>3.000 und 8.000 Euro</strong>. Darin enthalten sind der Sarg (500–3.000 €), die Bestatterleistungen (1.000–2.500 €), Friedhofsgebühren (500–2.000 €) sowie Blumen, Steinmetz und Trauerfeier.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--color-accent-glow)', border: '1px solid rgba(124,140,245,0.2)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Lassen Sie sich von einem Bestatter zur Sargbestattung beraten.</p>
          <Link href="/suche" className="btn btn-primary">Bestatter finden →</Link>
        </div>
      </article>
    </div>
  );
}
