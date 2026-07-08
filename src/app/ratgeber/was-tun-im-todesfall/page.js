import Link from 'next/link';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';
import { guides, formatGuideDate } from '@/data/guides';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Was tun im Todesfall? – Schritt-für-Schritt Anleitung',
  description: 'Was tun im Todesfall in Österreich? Unsere Schritt-für-Schritt Anleitung hilft Ihnen: Arzt rufen, Bestatter kontaktieren, Dokumente, Bestattung planen.',
  alternates: { canonical: 'https://bestattungs.at/ratgeber/was-tun-im-todesfall' },
  openGraph: { title: 'Was tun im Todesfall? – Schritt-für-Schritt Anleitung', description: 'Was tun im Todesfall in Österreich? Unsere Schritt-für-Schritt Anleitung hilft Ihnen: Arzt rufen, Bestatter kontaktieren, Dokumente, Bestattung planen.', url: 'https://bestattungs.at/ratgeber/was-tun-im-todesfall' },
};

export default function WasTunPage() {
  const lastUpdated = guides['was-tun-im-todesfall'].lastUpdated;
  const article = articleSchema({
    title: 'Was tun im Todesfall? Schritt-fuer-Schritt Anleitung',
    description: metadata.description,
    path: '/ratgeber/was-tun-im-todesfall',
    dateModified: lastUpdated,
  });

  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Ratgeber', href: '/ratgeber' },
    { name: 'Was tun im Todesfall?', href: '/ratgeber/was-tun-im-todesfall' },
  ]);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem', maxWidth: '800px' }}>
      <JsonLd data={[article, breadcrumb]} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Startseite</Link><span className="separator">/</span>
        <Link href="/ratgeber">Ratgeber</Link><span className="separator">/</span>
        <span>Was tun im Todesfall?</span>
      </nav>

      <article>
        <h1 style={{ marginBottom: '0.5rem' }}>Was tun im Todesfall? – Schritt-für-Schritt Anleitung</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Zuletzt aktualisiert: {formatGuideDate(lastUpdated)}</p>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.8 }}>
          Der Verlust eines geliebten Menschen ist eine der schwierigsten Situationen im Leben. In dieser belastenden Zeit müssen dennoch wichtige Schritte unternommen werden. Dieser Ratgeber gibt Ihnen eine klare Übersicht über alles, was in Österreich im Todesfall zu tun ist.
        </p>

        {steps.map((step, i) => (
          <section key={i} style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
              <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gradient-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
              <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{step.title}</h2>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.93rem', lineHeight: 1.7, margin: 0 }}>{step.text}</p>
          </section>
        ))}

        <section style={{ marginTop: '2.5rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Wichtige Dokumente im Todesfall</h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {docs.map((d, i) => (
              <li key={i} style={{ padding: '0.75rem 1rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                📄 {d}
              </li>
            ))}
          </ul>
        </section>

        <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--color-accent-glow)', border: '1px solid rgba(124,140,245,0.2)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Brauchen Sie Hilfe bei der Suche nach einem Bestatter?</p>
          <Link href="/suche" className="btn btn-primary">Bestatter in Ihrer Nähe finden →</Link>
        </div>
      </article>
    </div>
  );
}

const steps = [
  { title: 'Arzt verständigen', text: 'Im Todesfall muss zunächst ein Arzt verständigt werden, der den Tod feststellt und den Totenschein (Todesbescheinigung) ausstellt. Bei einem Todesfall zu Hause rufen Sie den Hausarzt oder den ärztlichen Bereitschaftsdienst. Bei einem Todesfall im Krankenhaus übernimmt dies das Krankenhaus.' },
  { title: 'Bestattungsunternehmen kontaktieren', text: 'Kontaktieren Sie ein Bestattungsunternehmen Ihrer Wahl. Die meisten Bestatter in Österreich sind rund um die Uhr erreichbar. Der Bestatter übernimmt die Abholung des Verstorbenen und berät Sie bei allen weiteren Schritten. Sie können unsere Bestattersuche nutzen, um einen Bestatter in Ihrer Nähe zu finden.' },
  { title: 'Standesamt – Sterbeurkunde beantragen', text: 'Der Todesfall muss innerhalb von drei Werktagen beim zuständigen Standesamt gemeldet werden. Das Standesamt stellt die Sterbeurkunde aus. Benötigte Dokumente: Totenschein, Geburtsurkunde, Meldezettel und ggf. Heiratsurkunde des Verstorbenen. Oft übernimmt der Bestatter diese Formalitäten.' },
  { title: 'Bestattungsart wählen', text: 'Gemeinsam mit dem Bestatter wählen Sie die Bestattungsart: Erdbestattung, Feuerbestattung (Kremation), Seebestattung, Naturbestattung oder andere Formen. Berücksichtigen Sie dabei den Wunsch des Verstorbenen, religiöse Traditionen und das Budget.' },
  { title: 'Trauerfeier planen', text: 'Planen Sie die Trauerfeier: Ort (Kirche, Friedhofskapelle, Aufbahrungshalle), Musik, Blumenschmuck, Parte/Sterbeanzeigen und den Ablauf. Der Bestatter unterstützt Sie bei der Organisation.' },
  { title: 'Versicherungen und Behörden informieren', text: 'Informieren Sie Versicherungen (Lebensversicherung, Unfallversicherung), Banken, den Arbeitgeber des Verstorbenen, die Pensionsversicherung und ggf. das Sozialamt. Kündigen Sie Verträge und Abonnements.' },
  { title: 'Verlassenschaft regeln', text: 'Nach der Bestattung wird das Verlassenschaftsverfahren durch das Bezirksgericht eingeleitet. Ein Notar wird als Gerichtskommissär bestellt und kontaktiert die Erben. Halten Sie Testament und wichtige Dokumente bereit.' },
];

const docs = [
  'Totenschein (vom Arzt)', 'Geburtsurkunde des Verstorbenen', 'Meldezettel', 'Staatsbürgerschaftsnachweis',
  'Heiratsurkunde (falls verheiratet)', 'Scheidungsurkunde (falls geschieden)', 'Sterbeurkunde des Ehepartners (falls verwitwet)',
  'Versicherungspolicen', 'Testament (falls vorhanden)', 'Personalausweis / Reisepass',
];
