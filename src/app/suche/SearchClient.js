'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { bestatter } from '@/data/bestatter';
import { cities } from '@/data/cities';
import { bundeslaender } from '@/data/bundeslaender';

export default function SearchClient() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (q.length < 2) return { bestatterResults: bestatter, cityResults: cities };
    const bestatterResults = bestatter.filter(b =>
      b.name.toLowerCase().includes(q) || b.city.toLowerCase().includes(q) || b.slug.includes(q)
    );
    const cityResults = cities.filter(c =>
      c.name.toLowerCase().includes(q) || c.slug.includes(q)
    );
    return { bestatterResults, cityResults };
  }, [query]);

  const filteredBestatter = filter === 'all' ? results.bestatterResults :
    results.bestatterResults.filter(b => b.bundesland === filter);

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="search" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Name oder Ort eingeben..." className="search-input"
          style={{ maxWidth: 400, paddingLeft: '1rem' }} id="search-page-input"
        />
        <select value={filter} onChange={e => setFilter(e.target.value)}
          style={{ padding: '0.7rem 1rem', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', color: 'var(--color-text-primary)', fontSize: '0.9rem' }}
          id="state-filter"
        >
          <option value="all">Alle Bundeslaender</option>
          {bundeslaender.map(bl => <option key={bl.slug} value={bl.slug}>{bl.name}</option>)}
        </select>
      </div>

      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        {filteredBestatter.length} Bestatter gefunden
      </p>

      <div className="grid-3">
        {filteredBestatter.map(b => (
          <Link href={`/bestattung/${b.slug}`} key={b.id} className="card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600 }}>{b.name}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>📍 {b.city}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: 'auto' }}>
              {b.services.slice(0, 2).map(s => <span className="badge badge-accent" key={s}>{s}</span>)}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
