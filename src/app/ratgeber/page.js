import Link from 'next/link';

export const metadata = {
  title: 'Ratgeber – Hilfe im Trauerfall in Österreich',
  description: 'Umfassende Ratgeber zu Bestattungsarten, Kosten, Vorsorge und was zu tun ist im Todesfall in Österreich.',
  alternates: { canonical: 'https://bestattungs.at/ratgeber' },
};

const articles = [
  { slug: 'was-tun-im-todesfall', title: 'Was tun im Todesfall?', icon: '📋', desc: 'Schritt-für-Schritt-Anleitung von der Todesfeststellung bis zur Bestattung.' },
  { slug: 'bestattungsarten', title: 'Bestattungsarten in Österreich', icon: '⚱️', desc: 'Erdbestattung, Feuerbestattung, Seebestattung, Naturbestattung und mehr.' },
  { slug: 'kosten', title: 'Bestattungskosten', icon: '💰', desc: 'Was kostet eine Bestattung? Durchschnittliche Kosten und Förderungen.' },
  { slug: 'vorsorge', title: 'Bestattungsvorsorge', icon: '🛡️', desc: 'Vorsorge treffen und Angehörige entlasten.' },
  { slug: 'bestattung-sarg', title: 'Sargbestattung', icon: '⚰️', desc: 'Alles über die traditionelle Sargbestattung in Österreich.' },
];

export default function RatgeberPage() {
  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Startseite</Link><span className="separator">/</span><span>Ratgeber</span>
      </nav>
      <h1 style={{ marginBottom: '0.5rem' }}>Ratgeber – Hilfe im Trauerfall</h1>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: 600, marginBottom: '2rem' }}>
        Wichtige Informationen und Ratgeber für den Trauerfall in Österreich.
      </p>
      <div className="grid-2">
        {articles.map(a => (
          <Link href={`/ratgeber/${a.slug}`} key={a.slug} className="card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem' }}>{a.icon}</span>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem' }}>{a.title}</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{a.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
