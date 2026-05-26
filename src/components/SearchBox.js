'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { bestatter } from '@/data/bestatter';
import { cities } from '@/data/cities';
import styles from './SearchBox.module.css';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const matchedBestatter = bestatter.filter(b => b.name.toLowerCase().includes(q) || b.slug.includes(q)).slice(0, 4).map(b => ({ type: 'bestatter', label: b.name, sub: b.city, href: `/bestattung/${b.slug}` }));
    const matchedCities = cities.filter(c => c.name.toLowerCase().includes(q) || c.slug.includes(q)).slice(0, 3).map(c => ({ type: 'city', label: c.name, sub: c.bundesland, href: `/bundesland/${c.bundesland}/${c.slug}` }));
    return [...matchedBestatter, ...matchedCities];
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) router.push(`/suche?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit} role="search" id="hero-search">
      <span className={styles.icon}>🔍</span>
      <input
        type="search"
        className={styles.input}
        placeholder="Bestatter oder Ort suchen..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        aria-label="Bestatter suchen"
        id="search-input"
      />
      <button type="submit" className={styles.btn} id="search-submit">Suchen</button>
      {focused && results.length > 0 && (
        <div className={styles.dropdown} id="search-results">
          {results.map((r, i) => (
            <a key={i} href={r.href} className={styles.result} onClick={() => setFocused(false)}>
              <span className={styles.resultIcon}>{r.type === 'bestatter' ? '🏢' : '📍'}</span>
              <div>
                <span className={styles.resultLabel}>{r.label}</span>
                <span className={styles.resultSub}>{r.sub}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </form>
  );
}
