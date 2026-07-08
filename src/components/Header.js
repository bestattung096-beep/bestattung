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

        {/* JS-free menu toggle: a visually-hidden checkbox drives the mobile
            dropdown via the `:checked ~ .nav` sibling selector. The single
            <nav> is always in the DOM (no duplicate links) and is shown
            unconditionally on desktop via the min-width query below. */}
        <input type="checkbox" id="nav-toggle" className={styles.navToggle} aria-hidden="true" tabIndex={-1} />
        <label htmlFor="nav-toggle" className={styles.burger} aria-label="Menü öffnen">
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </label>

        <nav className={styles.nav} id="main-navigation" aria-label="Hauptnavigation">
          <Link href="/bundesland" className={styles.navLink}>Bundesländer</Link>
          <Link href="/bestattung" className={styles.navLink}>Bestatter</Link>
          <Link href="/staedtische-bestattung" className={styles.navLink}>Städtische Bestattung</Link>
          <Link href="/ratgeber" className={styles.navLink}>Ratgeber</Link>
          <Link href="/suche" className={styles.navLink}>Suche</Link>
        </nav>
      </div>
    </header>
  );
}
