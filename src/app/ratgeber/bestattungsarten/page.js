import Link from 'next/link';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';
import { guides, formatGuideDate } from '@/data/guides';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Bestattungsarten in Österreich – Überblick & Vergleich',
  description: 'Alle Bestattungsarten in Österreich: Erdbestattung, Feuerbestattung, Seebestattung, Naturbestattung und alternative Formen im Vergleich.',
  alternates: { canonical: 'https://bestattungs.at/ratgeber/bestattungsarten' },
  openGraph: { title: 'Bestattungsarten in Österreich – Überblick & Vergleich', description: 'Alle Bestattungsarten in Österreich: Erdbestattung, Feuerbestattung, Seebestattung, Naturbestattung und alternative Formen im Vergleich.', url: 'https://bestattungs.at/ratgeber/bestattungsarten' },
};

const arten = [
  { icon: '⚰️', title: 'Erdbestattung', desc: 'Die traditionelle Erdbestattung ist die in Österreich am weitesten verbreitete Bestattungsform. Der Verstorbene wird in einem Sarg auf einem Friedhof beigesetzt. Die Erdbestattung ermöglicht einen festen Ort der Trauer und Erinnerung. Die Ruhezeit beträgt in der Regel 10 bis 20 Jahre, je nach Gemeinde. Kosten: ca. 3.000 – 8.000 Euro.' },
  { icon: '🔥', title: 'Feuerbestattung (Kremation)', desc: 'Bei der Feuerbestattung wird der Verstorbene in einem Krematorium eingeäschert. Die Urne kann anschließend auf einem Friedhof beigesetzt, in einem Kolumbarium aufbewahrt oder für alternative Bestattungsformen verwendet werden. Die Feuerbestattung ist in Österreich in den letzten Jahren immer beliebter geworden. Kosten: ca. 2.500 – 6.000 Euro.' },
  { icon: '🌊', title: 'Seebestattung', desc: 'Bei der Seebestattung wird die Asche des Verstorbenen in einer wasserlöslichen Urne der See übergeben. In Österreich ist dies an bestimmten Gewässern möglich, häufig wird die Seebestattung jedoch an der Adria oder Nordsee durchgeführt. Eine vorherige Kremation ist erforderlich. Kosten: ca. 3.500 – 7.000 Euro.' },
  { icon: '🌳', title: 'Naturbestattung / Baumbestattung', desc: 'Bei der Naturbestattung wird die Asche in der Natur beigesetzt – beispielsweise unter einem Baum in einem Bestattungswald. Diese Form der Bestattung gewinnt in Österreich zunehmend an Beliebtheit. In mehreren Bundesländern gibt es bereits Naturbestattungsanlagen. Kosten: ca. 2.000 – 5.000 Euro.' },
  { icon: '🏔️', title: 'Almwiesenbestattung', desc: 'Eine in Österreich besonders beliebte Form der Naturbestattung. Die Asche wird auf einer Almwiese in den Bergen verstreut oder beigesetzt. Diese Bestattungsform verbindet die Liebe zur österreichischen Bergwelt mit dem Wunsch nach einer naturnahen letzten Ruhestätte.' },
  { icon: '💎', title: 'Diamantbestattung', desc: 'Aus einem Teil der Asche wird ein synthetischer Diamant hergestellt, der als Erinnerungsstück getragen werden kann. Diese moderne Bestattungsform wird von spezialisierten Anbietern durchgeführt und ist in Österreich rechtlich zulässig. Kosten: ca. 5.000 – 15.000 Euro.' },
];

export default function BestattungsartenPage() {
  const lastUpdated = guides['bestattungsarten'].lastUpdated;
  const article = articleSchema({
    title: 'Bestattungsarten in Oesterreich - Ueberblick und Vergleich',
    description: metadata.description,
    path: '/ratgeber/bestattungsarten',
    dateModified: lastUpdated,
  });

  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Ratgeber', href: '/ratgeber' },
    { name: 'Bestattungsarten', href: '/ratgeber/bestattungsarten' },
  ]);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem', maxWidth: '800px' }}>
      <JsonLd data={[article, breadcrumb]} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Startseite</Link><span className="separator">/</span>
        <Link href="/ratgeber">Ratgeber</Link><span className="separator">/</span>
        <span>Bestattungsarten</span>
      </nav>

      <article>
        <h1 style={{ marginBottom: '0.5rem' }}>Bestattungsarten in Österreich</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Zuletzt aktualisiert: {formatGuideDate(lastUpdated)}</p>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
          In Österreich stehen verschiedene Bestattungsarten zur Verfügung. Die Wahl der Bestattungsform hängt von persönlichen, religiösen und finanziellen Faktoren ab. Hier finden Sie einen umfassenden Überblick über alle gängigen Bestattungsarten.
        </p>

        {arten.map((a, i) => (
          <section key={i} style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{a.icon}</span> {a.title}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.93rem', lineHeight: 1.7, margin: 0 }}>{a.desc}</p>
          </section>
        ))}

        <section style={{ marginTop: '2.5rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Welche Bestattungsart ist die richtige?</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.93rem', lineHeight: 1.7 }}>
            Die Wahl der Bestattungsart ist eine sehr persönliche Entscheidung. Berücksichtigen Sie den Wunsch des Verstorbenen, religiöse oder kulturelle Traditionen, die Kosten und den gewünschten Ort der Erinnerung. Ein erfahrener Bestatter berät Sie gerne bei der Wahl der passenden Bestattungsform.
          </p>
        </section>

        <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--color-accent-glow)', border: '1px solid rgba(124,140,245,0.2)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Finden Sie einen Bestatter, der Ihre gewünschte Bestattungsart anbietet.</p>
          <Link href="/suche" className="btn btn-primary">Bestatter suchen →</Link>
        </div>
      </article>
    </div>
  );
}
