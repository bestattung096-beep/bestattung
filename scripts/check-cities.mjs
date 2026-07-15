import { cities } from '../src/data/cities.js';
import { bestatter } from '../src/data/bestatter.js';

// Collect all city slugs linked from bestatter detail pages (via locations array)
const allLinkedCitySlugs = new Set();
bestatter.forEach(b => {
  if (b.citySlug) allLinkedCitySlugs.add(b.citySlug);
  if (b.locations) {
    b.locations.forEach(loc => {
      if (loc.citySlug) allLinkedCitySlugs.add(loc.citySlug);
    });
  }
});

const citySlugsInData = new Set(cities.map(c => c.slug));

const missing = [...allLinkedCitySlugs].filter(slug => !citySlugsInData.has(slug));
console.log(`\nCity slugs linked from bestatter pages but MISSING from cities.js (${missing.length} total):\n`);
missing.sort().forEach(slug => {
  // Find which bestatter links to this missing city
  const sources = bestatter.filter(b =>
    b.citySlug === slug ||
    (b.locations && b.locations.some(l => l.citySlug === slug))
  ).map(b => b.slug);
  console.log(`  MISSING: /bundesland/.../${slug}  (linked from: ${sources.join(', ')})`);
});
console.log(`\nTotal cities in cities.js: ${cities.length}`);
console.log(`Total unique city slugs linked from bestatters: ${allLinkedCitySlugs.size}`);
