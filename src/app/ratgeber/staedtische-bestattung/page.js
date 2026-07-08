import Link from 'next/link';
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/seo';
import { guides, formatGuideDate } from '@/data/guides';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Städtische oder private Bestattung? Unterschiede & freie Bestatterwahl',
  description: 'Unterschiede zwischen städtischen (kommunalen) und privaten Bestattungsunternehmen in Österreich. Gebühren, Leistungen & freie Bestatterwahl im Vergleich.',
  alternates: { canonical: 'https://bestattungs.at/ratgeber/staedtische-bestattung' },
  openGraph: { title: 'Städtische oder private Bestattung? Unterschiede & freie Bestatterwahl', description: 'Unterschiede zwischen städtischen (kommunalen) und privaten Bestattungsunternehmen in Österreich. Gebühren, Leistungen & freie Bestatterwahl im Vergleich.', url: 'https://bestattungs.at/ratgeber/staedtische-bestattung' },
};

const faqs = [
  {
    question: 'Habe ich in Österreich die freie Wahl des Bestatters?',
    answer: 'Ja, seit der Liberalisierung des Bestattergewerbes in Österreich im Jahr 2002 herrscht freie Bestatterwahl. Angehörige können jeden Bestatter im In- und Ausland beauftragen, unabhängig davon, ob es sich um ein privates oder städtisches Unternehmen handelt.'
  },
  {
    question: 'Sind städtische Bestattungen günstiger als private?',
    answer: 'Nicht zwingend. Während städtische Betriebe oft feste Tarife haben, bieten private Bestattungsunternehmen durch Wettbewerb und maßgeschneiderte Pakete häufig günstigere Alternativen oder flexiblere Serviceleistungen an. Ein Preisvergleich lohnt sich immer.'
  },
  {
    question: 'Welche Aufgaben übernimmt nur die Gemeinde?',
    answer: 'Die Friedhofsverwaltung (Zuweisung von Grabstellen, Grabgebühren) sowie gesundheitsbehördliche Aufgaben (wie Totenbeschau oder Sozialbestattungen bei Mittellosigkeit) liegen in der Hoheit der Gemeinde. Die eigentliche Bestattungsdurchführung kann jedoch frei vergeben werden.'
  }
];

export default function StaedtischeBestattungRatgeberPage() {
  const lastUpdated = guides['staedtische-bestattung'].lastUpdated;
  const article = articleSchema({
    title: 'Städtische oder private Bestattung? Unterschiede & freie Bestatterwahl in Österreich',
    description: metadata.description,
    path: '/ratgeber/staedtische-bestattung',
    dateModified: lastUpdated,
  });

  const faq = faqSchema(faqs);
  const breadcrumb = breadcrumbSchema([
    { name: 'Startseite', href: '/' },
    { name: 'Ratgeber', href: '/ratgeber' },
    { name: 'Städtische vs. Private Bestattung', href: '/ratgeber/staedtische-bestattung' },
  ]);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem', maxWidth: '800px' }}>
      <JsonLd data={[article, faq, breadcrumb]} />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Startseite</Link><span className="separator">/</span>
        <Link href="/ratgeber">Ratgeber</Link><span className="separator">/</span>
        <span>Städtische vs. Private Bestattung</span>
      </nav>

      <article style={{ lineHeight: 1.8 }}>
        <header style={{ marginBottom: '2.5rem' }}>
          <span className="badge badge-accent" style={{ marginBottom: '0.5rem' }}>Ratgeber: Entscheidungshilfe</span>
          <h1 style={{ marginBottom: '0.5rem', fontSize: '2.4rem' }}>Städtische Bestattung vs. Private Bestatter</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Zuletzt aktualisiert: {formatGuideDate(lastUpdated)}</p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
            Was ist der Unterschied zwischen einer städtischen (kommunalen) Bestattung und einem privaten Bestattungsunternehmen in Österreich? 
            Hier erfahren Sie alles über Ihre Rechte, Pflichten und die freie Bestatterwahl.
          </p>
        </header>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>1. Die rechtliche Grundlage: Freie Bestatterwahl</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Bis zur Liberalisierung des österreichischen Bestattergewerbes im Jahr 2002 hatten städtische Bestattungsunternehmen 
            in vielen Regionen ein gesetzliches Monopol. Das bedeutete, dass Angehörige bei einem Todesfall gezwungen waren, den 
            kommunalen Betrieb der jeweiligen Stadt oder Gemeinde zu beauftragen.
          </p>
          <div style={{ padding: '1rem 1.5rem', background: 'var(--color-gold-soft)', borderLeft: '4px solid var(--color-gold)', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
            <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '0.25rem' }}>Wichtiger Hinweis:</strong>
            <p style={{ color: 'var(--color-text-primary)', margin: 0, fontSize: '0.92rem' }}>
              Heute gilt in ganz Österreich die <strong>freie Bestatterwahl</strong>. Unabhängig vom Wohnort oder Sterbeort können Sie 
              jeden lizenzierten Bestatter – ob städtisch oder privat – mit der Durchführung der Trauerfeier und Überführung betrauen.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>2. Städtisch vs. Privat: Die wesentlichen Unterschiede</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Obwohl beide Formen dieselben Kerndienstleistungen (Überführung, Aufbahrung, Organisation der Trauerfeier und Beisetzung) 
            anbieten, gibt es strukturelle Unterschiede:
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            <thead>
              <tr style={{ borderBottom: '2.5px solid var(--color-border)', textAlign: 'left' }}>
                <th style={{ padding: '10px', color: 'var(--color-text-primary)', fontWeight: 600 }}>Kriterium</th>
                <th style={{ padding: '10px', color: 'var(--color-text-primary)', fontWeight: 600 }}>Städtische Bestattung</th>
                <th style={{ padding: '10px', color: 'var(--color-text-primary)', fontWeight: 600 }}>Privater Bestatter</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>Trägerschaft</td>
                <td style={{ padding: '10px' }}>Gemeinde, Stadtwerke oder kommunale Holding (z.B. BESTATTUNG WIEN)</td>
                <td style={{ padding: '10px' }}>Privates Unternehmen / GmbH / inhabergeführtes Familienunternehmen</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>Preisgestaltung</td>
                <td style={{ padding: '10px' }}>Meist feste Tarife und öffentlich verordnete Tarifsätze</td>
                <td style={{ padding: '10px' }}>Freie Preisgestaltung, oft flexible Angebote und Festpreis-Pakete</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>Flexibilität</td>
                <td style={{ padding: '10px' }}>Strenge Ausrichtung an kommunalen Standards und Bräuchen</td>
                <td style={{ padding: '10px' }}>Sehr flexibel bei individuellen Wünschen und kreativen Abschiedsformen</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>3. Friedhofsverwaltung und Bestattung trennen</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Ein häufiger Irrglaube ist, dass man die städtische Bestattung wählen muss, weil man ein Grab auf dem städtischen Friedhof 
            nutzen möchte. Hierbei müssen zwei Bereiche klar voneinander getrennt werden:
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Die Friedhofsverwaltung (städtisch):</strong> Sie vergibt das Grabnutzungsrecht (Grabstelle) und hebt die Friedhofsgebühren ein. 
              Dies ist eine behördliche Aufgabe der Gemeinde.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Die Bestattungsdurchführung (frei wählbar):</strong> Welches Bestattungsunternehmen den Sarg liefert, den Verstorbenen ankleidet, 
              überführt und die Trauerfeier auf dem Friedhof leitet, bestimmen Sie als Angehöriger selbst. Jedes private Unternehmen darf auf städtischen Friedhöfen beisetzen.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>4. Die Vor- und Nachteile auf einen Blick</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.25rem' }}>
            <div style={{ padding: '1.25rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ color: 'var(--color-accent)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Städtische Bestattung</h3>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                <li style={{ marginBottom: '0.4rem' }}>Vorteil: Hohe Planungssicherheit und bekannte lokale Strukturen.</li>
                <li style={{ marginBottom: '0.4rem' }}>Vorteil: Kurze Wege zur städtischen Friedhofsverwaltung.</li>
                <li style={{ marginBottom: '0.4rem' }}>Nachteil: Weniger flexibel bei modernen oder unkonventionellen Zeremonien.</li>
              </ul>
            </div>
            <div style={{ padding: '1.25rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ color: 'var(--color-gold)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Privates Bestattungsunternehmen</h3>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                <li style={{ marginBottom: '0.4rem' }}>Vorteil: Sehr persönliche und individuelle Betreuung.</li>
                <li style={{ marginBottom: '0.4rem' }}>Vorteil: Oft kostengünstigere Pakete und transparente Online-Angebote.</li>
                <li style={{ marginBottom: '0.4rem' }}>Nachteil: Regionale Verfügbarkeit variiert je nach Unternehmensgröße.</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
          <h2 style={{ marginBottom: '1.25rem', color: 'var(--color-text-primary)' }}>Häufig gestellte Fragen (FAQ)</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.25rem', fontSize: '1rem', fontWeight: 600 }}>❓ {f.question}</h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>{f.answer}</p>
            </div>
          ))}
        </section>

        <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Verzeichnis aller städtischen Bestatter</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.93rem', marginBottom: '1.5rem' }}>
            Möchten Sie gezielt städtische Bestattungsdienste kontaktieren? Finden Sie alle Adressen und Telefonnummern in unserem Register.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/staedtische-bestattung" className="btn btn-primary">
              Städtische Bestatter im Überblick →
            </Link>
            <Link href="/suche" className="btn btn-outline">
              Preise vergleichen →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
