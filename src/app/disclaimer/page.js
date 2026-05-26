import styles from '../legal.module.css';

export const metadata = {
  title: 'Haftungsausschluss',
  description: 'Haftungsausschluss von Bestattungs.',
  alternates: { canonical: 'https://bestattungs.at/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Rechtliches</p>
        <h1>Haftungsausschluss</h1>
        <p className={styles.updated}>Stand: Mai 2026</p>
      </header>

      <section className={styles.section}>
        <h2>Kontakt</h2>
        <p>
          Wenn Sie weitere Informationen benoetigen oder Fragen zum Haftungsausschluss unserer
          Website haben, kontaktieren Sie uns bitte per E-Mail unter bestattung096@gmail.com.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Haftungsausschluss fuer Bestattungs</h2>
        <p>
          Alle Informationen auf dieser Website, https://Bestattungs.at/, werden nach bestem
          Wissen und Gewissen und ausschliesslich zu allgemeinen Informationszwecken
          veroeffentlicht. Bestattungs uebernimmt keine Gewaehr fuer die Vollstaendigkeit,
          Zuverlaessigkeit und Richtigkeit dieser Informationen. Jede Handlung, die Sie auf Basis
          der Informationen auf dieser Website (Bestattungs) setzen, erfolgt ausschliesslich auf
          eigenes Risiko. Bestattungs haftet nicht fuer Verluste und/oder Schaeden im Zusammenhang
          mit der Nutzung unserer Website.
        </p>
        <p>
          Von unserer Website aus koennen Sie ueber Hyperlinks andere Websites besuchen. Obwohl wir
          uns bemuehen, nur hochwertige Links zu nuetzlichen und serioesen Websites bereitzustellen,
          haben wir keinen Einfluss auf den Inhalt und die Art dieser Seiten. Solche Links zu
          anderen Websites bedeuten keine Empfehlung fuer saemtliche dort veroeffentlichten
          Inhalte. Betreiber und Inhalte von Websites koennen sich ohne Vorankuendigung aendern;
          dies kann geschehen, bevor wir die Moeglichkeit haben, einen Link zu entfernen, der
          moeglicherweise nicht mehr passend ist.
        </p>
        <p>
          Bitte beachten Sie ausserdem, dass andere Websites, sobald Sie unsere Website verlassen,
          andere Datenschutzrichtlinien und Bedingungen haben koennen, die ausserhalb unseres
          Einflussbereichs liegen. Bitte pruefen Sie die Datenschutzerklaerungen dieser Websites
          sowie deren Nutzungsbedingungen, bevor Sie Geschaefte abschliessen oder Informationen
          hochladen.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Einwilligung</h2>
        <p>
          Durch die Nutzung unserer Website stimmen Sie diesem Haftungsausschluss zu und erklaeren
          sich mit seinen Bedingungen einverstanden.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Aktualisierung</h2>
        <p>
          Sollten wir dieses Dokument aktualisieren, ergaenzen oder aendern, werden diese
          Aenderungen deutlich sichtbar auf dieser Seite veroeffentlicht.
        </p>
      </section>
    </main>
  );
}
