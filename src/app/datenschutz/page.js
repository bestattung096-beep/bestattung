import styles from '../legal.module.css';

export const metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklaerung von bestattungs.at.',
  alternates: { canonical: 'https://bestattungs.at/datenschutz' },
};

export default function DatenschutzPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Rechtliches</p>
        <h1>Datenschutz</h1>
        <p className={styles.updated}>Stand: Mai 2026</p>
      </header>

      <section className={styles.section}>
        <h2>Verantwortlicher</h2>
        <p>
          Verantwortlich fuer die Datenverarbeitung auf dieser Website ist der im Impressum
          genannte Betreiber. Bitte ergaenzen Sie dort die vollstaendigen Kontaktdaten.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Zugriffsdaten</h2>
        <p>
          Beim Besuch dieser Website koennen technisch erforderliche Zugriffsdaten verarbeitet
          werden, zum Beispiel IP-Adresse, Browsertyp, Datum und Uhrzeit des Zugriffs sowie die
          aufgerufene Seite. Diese Daten dienen dem sicheren und stabilen Betrieb der Website.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Kontaktaufnahme</h2>
        <p>
          Wenn Sie uns per E-Mail oder ueber andere angegebene Kontaktwege kontaktieren, werden die
          von Ihnen uebermittelten Daten zur Bearbeitung Ihrer Anfrage verarbeitet.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Verzeichnisdaten</h2>
        <p>
          bestattungs.at stellt oeffentlich recherchierbare Informationen zu
          Bestattungsunternehmen bereit, darunter Namen, Adressen, Telefonnummern, E-Mail-Adressen
          und Standorte. Hinweise auf fehlerhafte oder nicht mehr aktuelle Daten koennen an den
          Betreiber gesendet werden.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Cookies und externe Dienste</h2>
        <p>
          Diese Website kann technisch notwendige Cookies und eingebundene externe Dienste nutzen.
          Falls Analyse-, Karten-, Schrift- oder Werbedienste eingesetzt werden, muessen diese hier
          mit Anbieter, Zweck, Rechtsgrundlage und Speicherdauer konkret ergaenzt werden.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Ihre Rechte</h2>
        <p>Sie haben nach Massgabe der DSGVO insbesondere folgende Rechte:</p>
        <ul>
          <li>Auskunft ueber die verarbeiteten personenbezogenen Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Loeschung oder Einschraenkung der Verarbeitung</li>
          <li>Widerspruch gegen bestimmte Verarbeitungen</li>
          <li>Datenuebertragbarkeit, soweit anwendbar</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Beschwerderecht</h2>
        <p>
          Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen
          Datenschutzrecht verstoesst, koennen Sie sich an die zustaendige Datenschutzbehoerde
          wenden.
        </p>
      </section>
    </main>
  );
}
