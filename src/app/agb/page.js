import styles from '../legal.module.css';

export const metadata = {
  title: 'AGB',
  description: 'Allgemeine Geschaeftsbedingungen von bestattungs.at.',
  alternates: { canonical: 'https://bestattungs.at/agb' },
};

export default function AgbPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Rechtliches</p>
        <h1>Allgemeine Geschaeftsbedingungen</h1>
        <p className={styles.updated}>Stand: Mai 2026</p>
      </header>

      <section className={styles.section}>
        <h2>Geltungsbereich</h2>
        <p>
          Diese AGB gelten fuer die Nutzung von bestattungs.at. Die Website stellt ein
          Informations- und Verzeichnisangebot fuer Bestattungsunternehmen in Oesterreich bereit.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Leistungsbeschreibung</h2>
        <p>
          bestattungs.at veroeffentlicht Informationen zu Bestattungsunternehmen, Standorten,
          Kontaktdaten und allgemeinen Ratgeberinhalten. Es findet keine Rechts-, Steuer-,
          Medizin- oder Bestattungsberatung statt.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Richtigkeit der Inhalte</h2>
        <p>
          Die Daten werden sorgfaeltig gepflegt, koennen sich jedoch jederzeit aendern. Nutzerinnen
          und Nutzer sollten wichtige Angaben direkt beim jeweiligen Bestattungsunternehmen
          bestaetigen.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Eintraege und Aenderungen</h2>
        <p>
          Bestattungsunternehmen koennen Hinweise auf fehlerhafte oder unvollstaendige Angaben an
          den Betreiber senden. Ein Anspruch auf Aufnahme, Aenderung oder dauerhafte
          Veroeffentlichung eines Eintrags besteht nur, wenn dies gesondert vereinbart wurde.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Haftung</h2>
        <p>
          Die Nutzung der Informationen erfolgt auf eigene Verantwortung. Fuer Schaeden, die aus
          der Nutzung oder Nichtverfuegbarkeit der Website entstehen, haftet der Betreiber nur nach
          den gesetzlichen Bestimmungen.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Schlussbestimmungen</h2>
        <p>
          Es gilt oesterreichisches Recht, soweit keine zwingenden gesetzlichen Vorschriften
          entgegenstehen. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der
          uebrigen Bestimmungen unberuehrt.
        </p>
      </section>
    </main>
  );
}
