import Link from 'next/link';
import { bundeslaender } from '@/data/bundeslaender';
import SearchBox from '@/components/SearchBox';
import { getValidBestatter, getTopCitiesByValidListings } from '@/lib/records';
import styles from './page.module.css';

export default function Home() {
  const bestatter = getValidBestatter();
  const totalBestatter = bestatter.length;
  const topCities = getTopCitiesByValidListings(15);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} id="hero-section">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>🇦🇹 Österreichs Bestatter-Verzeichnis</span>
          <h1 className={styles.heroTitle}>
            Bestattungsunternehmen in <span className={styles.highlight}>Österreich</span> finden
          </h1>
          <p className={styles.heroDesc}>
            Finden Sie einfühlsame und professionelle Bestattungsunternehmen in Ihrer Nähe. 
            Über {totalBestatter} Bestatter in allen 9 Bundesländern.
          </p>
          <SearchBox />
        </div>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>9</span>
            <span className={styles.statLabel}>Bundesländer</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{totalBestatter}+</span>
            <span className={styles.statLabel}>Bestatter</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>24/7</span>
            <span className={styles.statLabel}>Erreichbar</span>
          </div>
        </div>
      </section>

      {/* Bundesländer Section */}
      <section className={`section ${styles.statesSection}`} id="bundeslaender-section">
        <div className="container">
          <div className="section-header">
            <h2>Bestatter nach Bundesland</h2>
            <p>Wählen Sie Ihr Bundesland, um Bestattungsunternehmen in Ihrer Region zu finden.</p>
          </div>
          <div className={styles.statesGrid}>
            {bundeslaender.map((state) => {
              const count = bestatter.filter(b => b.bundesland === state.slug).length;
              return (
                <Link href={`/bundesland/${state.slug}`} key={state.slug} className={styles.stateCard} id={`state-${state.slug}`}>
                  <div className={styles.stateIcon}>{getStateEmoji(state.slug)}</div>
                  <h3 className={styles.stateName}>{state.name}</h3>
                  <span className={styles.stateCount}>{count} Bestatter</span>
                  <span className={styles.stateArrow}>→</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      {topCities.length > 0 && (
        <section className={`section ${styles.statesSection}`} id="cities-section">
          <div className="container">
            <div className="section-header">
              <h2>Bestatter in Ihrer Stadt</h2>
              <p>Die Städte mit den meisten gelisteten Bestattungsunternehmen in Österreich.</p>
            </div>
            <div className={styles.statesGrid}>
              {topCities.map(({ city, count }) => (
                <Link href={`/bundesland/${city.bundesland}/${city.slug}`} key={city.slug} className={styles.stateCard} id={`city-${city.slug}`}>
                  <h3 className={styles.stateName}>{city.name}</h3>
                  <span className={styles.stateCount}>{count} Bestatter</span>
                  <span className={styles.stateArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Bestatter */}
      <section className={`section ${styles.featuredSection}`} id="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Bekannte Bestattungsunternehmen</h2>
            <p>Ausgewählte Bestatter mit langjähriger Erfahrung und Tradition in Österreich.</p>
          </div>
          <div className="grid-3">
            {bestatter.slice(0, 6).map((b) => (
              <Link href={`/bestattung/${b.slug}`} key={b.id} className={`card ${styles.bestatterCard}`} id={`featured-${b.slug}`}>
                <div className={styles.bestatterHeader}>
                  <span className={styles.bestatterInitial}>{b.name.replace('Bestattung ', '').charAt(0)}</span>
                  <div>
                    <h3 className={styles.bestatterName}>{b.name}</h3>
                    <span className={styles.bestatterLocation}>📍 {b.city}</span>
                  </div>
                </div>
                <p className={styles.bestatterDesc}>{b.description.substring(0, 120)}...</p>
                <div className={styles.bestatterServices}>
                  {b.services.slice(0, 3).map(s => (
                    <span className="badge badge-accent" key={s}>{s}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link href="/bestattung" className="btn btn-outline">Alle Bestatter anzeigen →</Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className={`section ${styles.infoSection}`} id="info-section">
        <div className="container">
          <div className="section-header">
            <h2>Rat und Hilfe im Trauerfall</h2>
            <p>Wichtige Informationen und Ratgeber für den Trauerfall in Österreich.</p>
          </div>
          <div className="grid-3">
            <div className={`card ${styles.infoCard}`}>
              <span className={styles.infoIcon}>📋</span>
              <h3>Was tun im Todesfall?</h3>
              <p>Schritt-für-Schritt-Anleitung: Von der Todesfeststellung bis zur Bestattung – was Sie als Angehörige wissen müssen.</p>
              <Link href="/ratgeber/was-tun-im-todesfall" className={styles.infoLink}>Mehr erfahren →</Link>
            </div>
            <div className={`card ${styles.infoCard}`}>
              <span className={styles.infoIcon}>⚱️</span>
              <h3>Bestattungsarten</h3>
              <p>Erdbestattung, Feuerbestattung, Seebestattung und alternative Bestattungsformen in Österreich im Überblick.</p>
              <Link href="/ratgeber/bestattungsarten" className={styles.infoLink}>Mehr erfahren →</Link>
            </div>
            <div className={`card ${styles.infoCard}`}>
              <span className={styles.infoIcon}>💰</span>
              <h3>Bestattungskosten</h3>
              <p>Was kostet eine Bestattung in Österreich? Durchschnittliche Kosten, Förderungen und Spartipps.</p>
              <Link href="/ratgeber/kosten" className={styles.infoLink}>Mehr erfahren →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function getStateEmoji(slug) {
  const map = { wien: '🏛️', niederoesterreich: '🏰', oberoesterreich: '🏔️', salzburg: '🎵', steiermark: '🌿', kaernten: '☀️', tirol: '⛷️', vorarlberg: '🗻', burgenland: '🍷' };
  return map[slug] || '📍';
}
