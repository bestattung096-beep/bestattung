import styles from '../legal.module.css';

export const metadata = {
  title: 'Impressum',
  description: 'Impressum von bestattungs.at.',
  alternates: { canonical: 'https://bestattungs.at/impressum' },
};

export default function ImpressumPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Rechtliches</p>
        <h1>Impressum</h1>
        <p className={styles.updated}>Stand: Mai 2026</p>
      </header>

      <section className={styles.section}>
        <h2>Medieninhaber und Betreiber</h2>
        <p>bestattungs.at</p>
        <p>Prof. Rodger Graham</p>
        <p>Johann-Georg-Ulmer-Strasse 1</p>
        <p>6850 Dornbirn, Oesterreich</p>
      </section>

      <section className={styles.section}>
        <h2>Kontakt</h2>
        <p>E-Mail: bestattung096@gmail.com</p>
      </section>

      <section className={styles.section}>
        <h2>Haftung fuer Inhalte</h2>
        <p>
          Die Inhalte dieser Website werden mit groesstmoeglicher Sorgfalt erstellt. Fuer die
          Richtigkeit, Vollstaendigkeit und Aktualitaet der Inhalte kann jedoch keine Gewaehr
          uebernommen werden.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Haftung fuer externe Links</h2>
        <p>
          Diese Website kann Links zu externen Websites Dritter enthalten. Auf deren Inhalte haben
          wir keinen Einfluss. Fuer diese fremden Inhalte ist stets der jeweilige Anbieter oder
          Betreiber der Seiten verantwortlich.
        </p>
      </section>
    </main>
  );
}
