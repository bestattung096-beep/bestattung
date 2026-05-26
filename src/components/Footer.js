import Link from 'next/link';
import { bundeslaender } from '@/data/bundeslaender';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.brand}>
              <span className={styles.brandIcon}>✦</span>
              <span className={styles.brandName}>bestattungs.at</span>
            </div>
            <p className={styles.brandDesc}>
              Ihr Verzeichnis für Bestattungsunternehmen in ganz Österreich. Finden Sie den passenden Bestatter in Ihrer Nähe.
            </p>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Bundesländer</h4>
            <ul className={styles.list}>
              {bundeslaender.map(b => (
                <li key={b.slug}><Link href={`/bundesland/${b.slug}`}>{b.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Informationen</h4>
            <ul className={styles.list}>
              <li><Link href="/ratgeber">Ratgeber</Link></li>
              <li><Link href="/ratgeber/bestattungsarten">Bestattungsarten</Link></li>
              <li><Link href="/ratgeber/kosten">Kosten</Link></li>
              <li><Link href="/ratgeber/vorsorge">Vorsorge</Link></li>
              <li><Link href="/suche">Bestatter suchen</Link></li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Rechtliches</h4>
            <ul className={styles.list}>
              <li><Link href="/impressum">Impressum</Link></li>
              <li><Link href="/datenschutz">Datenschutz</Link></li>
              <li><Link href="/privacy-policy">Datenschutzerklaerung</Link></li>
              <li><Link href="/disclaimer">Haftungsausschluss</Link></li>
              <li><Link href="/agb">AGB</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} bestattungs.at – Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
