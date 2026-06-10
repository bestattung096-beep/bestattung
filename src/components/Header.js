import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header} id="site-header">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} id="logo-link">
          <span className={styles.logoIcon}>*</span>
          <span className={styles.logoText}>Bestattungs<span className={styles.logoAt}>.at</span></span>
        </Link>

        <nav className={`${styles.nav} ${styles.desktopNav}`} aria-label="Hauptnavigation">
          <Link href="/bundesland" className={styles.navLink}>Bundesländer</Link>
          <Link href="/bestattung" className={styles.navLink}>Bestatter</Link>
          <Link href="/staedtische-bestattung" className={styles.navLink}>Städtische Bestattung</Link>
          <Link href="/ratgeber" className={styles.navLink}>Ratgeber</Link>
          <Link href="/suche" className={styles.navLink}>Suche</Link>
        </nav>

        <details className={styles.mobileMenu} id="mobile-menu">
          <summary className={styles.mobileSummary} aria-label="Menue oeffnen">
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </summary>
          <nav className={styles.mobileNav} id="main-navigation" aria-label="Mobile Hauptnavigation">
            <Link href="/bundesland" className={styles.navLink}>Bundesländer</Link>
            <Link href="/bestattung" className={styles.navLink}>Bestatter</Link>
            <Link href="/staedtische-bestattung" className={styles.navLink}>Städtische Bestattung</Link>
            <Link href="/ratgeber" className={styles.navLink}>Ratgeber</Link>
            <Link href="/suche" className={styles.navLink}>Suche</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
