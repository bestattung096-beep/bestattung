// Flags likely duplicate bestatter records for manual confirmation.
// Run: node scripts/find-duplicates.mjs
// Does not modify source data or merge anything automatically.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { bestatter } from '../src/data/bestatter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'reports');
mkdirSync(outDir, { recursive: true });

const UMLAUT_MAP = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' };

function normalizeName(name) {
  let s = String(name || '').toLowerCase();
  s = s.replace(/[äöüß]/g, ch => UMLAUT_MAP[ch]);
  s = s.replace(/\bgmbh\s*&?\s*co\s*kg\b/g, ' ');
  s = s.replace(/\bgmbh\b/g, ' ');
  s = s.replace(/\be\.?\s*u\.?\b/g, ' ');
  s = s.replace(/\bkg\b/g, ' ');
  s = s.replace(/\bohg\b/g, ' ');
  s = s.replace(/\bog\b/g, ' ');
  s = s.replace(/[.,()\-–]/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function bigrams(str) {
  const s = str.replace(/\s+/g, '');
  const grams = [];
  for (let i = 0; i < s.length - 1; i++) grams.push(s.slice(i, i + 2));
  return grams;
}

// Dice coefficient over character bigrams.
function similarity(a, b) {
  const ga = bigrams(a);
  const gb = bigrams(b);
  if (ga.length === 0 || gb.length === 0) return ga.length === gb.length ? 1 : 0;
  const counts = new Map();
  for (const g of ga) counts.set(g, (counts.get(g) || 0) + 1);
  let matches = 0;
  for (const g of gb) {
    const c = counts.get(g) || 0;
    if (c > 0) {
      matches++;
      counts.set(g, c - 1);
    }
  }
  return (2 * matches) / (ga.length + gb.length);
}

function normCity(city) {
  return String(city || '').trim().toLowerCase();
}

const candidates = [];
for (let i = 0; i < bestatter.length; i++) {
  for (let j = i + 1; j < bestatter.length; j++) {
    const a = bestatter[i];
    const b = bestatter[j];
    const samePlz = a.plz && b.plz && a.plz === b.plz;
    const sameCity = normCity(a.city) === normCity(b.city) && normCity(a.city) !== '';
    if (!samePlz && !sameCity) continue;

    const nameSimilarity = similarity(normalizeName(a.name), normalizeName(b.name));
    if (nameSimilarity >= 0.85) {
      candidates.push({
        a: { id: a.id, slug: a.slug, name: a.name, city: a.city, plz: a.plz },
        b: { id: b.id, slug: b.slug, name: b.name, city: b.city, plz: b.plz },
        nameSimilarity: Math.round(nameSimilarity * 1000) / 1000,
        samePlz,
        sameCity,
      });
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  threshold: 0.85,
  candidateCount: candidates.length,
  candidates,
};

writeFileSync(path.join(outDir, 'duplicates.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote ${outDir}/duplicates.json`);
console.log(`Found ${candidates.length} candidate duplicate pair(s):`);
for (const c of candidates) {
  console.log(`  - ${c.a.id} <-> ${c.b.id} (similarity ${c.nameSimilarity}, samePlz=${c.samePlz}, sameCity=${c.sameCity})`);
}
