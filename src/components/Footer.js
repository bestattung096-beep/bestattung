import Link from 'next/link';
import { bundeslaender } from '@/data/bundeslaender';
import { socialLinks } from '@/data/socialLinks';
import styles from './Footer.module.css';

function SocialIcon({ label }) {
  if (label === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M14 8.5h2.5V5.1c-.4-.1-1.9-.2-3.5-.2-3.5 0-5.9 2.1-5.9 6v3.4H4v3.8h3.1V24h4.2v-5.9h3.3l.6-3.8h-3.9v-3c0-1.1.3-1.8 2-1.8Z" />
      </svg>
    );
  }

  if (label === 'Pinterest') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12.1 0C5.4 0 1.3 4.8 1.3 10c0 2.4 1.3 5.4 3.3 6.3.3.1.5.1.6-.2.1-.2.4-1.4.5-1.8.1-.2 0-.4-.2-.7-.7-.9-1.2-2-1.2-3.6 0-3.6 2.7-7.1 7.4-7.1 4 0 6.8 2.8 6.8 6.7 0 4.4-2.2 7.4-5.1 7.4-1.6 0-2.8-1.3-2.4-2.9.5-1.9 1.4-3.9 1.4-5.3 0-1.2-.7-2.3-2-2.3-1.6 0-2.9 1.7-2.9 3.9 0 1.4.5 2.4.5 2.4s-1.6 6.8-1.9 8.1c-.3 1.4-.2 3.3-.1 4.5h.2c.6-1 1.4-2.5 1.8-3.9.1-.5.8-3.1.8-3.1.4.8 1.6 1.5 2.9 1.5 3.8 0 6.6-3.5 6.6-8.6C21.9 3.7 18.5 0 12.1 0Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.7l-5.2-6.8L5.6 22H2.3l7.7-8.8L1.8 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.6 3.9H5.7L17.7 20Z" />
    </svg>
  );
}

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
            <nav className={styles.social} aria-label="Social profiles">
              {socialLinks.map(profile => (
                <a
                  key={profile.href}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${profile.label} profile`}
                  title={profile.label}
                >
                  <SocialIcon label={profile.label} />
                </a>
              ))}
            </nav>
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
