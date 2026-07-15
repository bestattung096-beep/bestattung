/**
 * Generates all missing city entries for cities.js
 * by extracting citySlug data directly from bestatter.js
 */
import { cities as existingCities } from '../src/data/cities.js';
import { bestatter } from '../src/data/bestatter.js';
import { bundeslaender } from '../src/data/bundeslaender.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const existingSlugs = new Set(existingCities.map(c => c.slug));

// Build a map of citySlug -> { bundesland, cityName, plz }
const missingCitiesMap = new Map();

bestatter.forEach(b => {
  // Primary city
  if (b.citySlug && !existingSlugs.has(b.citySlug)) {
    if (!missingCitiesMap.has(b.citySlug)) {
      missingCitiesMap.set(b.citySlug, {
        slug: b.citySlug,
        name: b.city,
        bundesland: b.bundesland,
        plz: b.plz,
      });
    }
  }
  // Branch locations
  if (b.locations) {
    b.locations.forEach(loc => {
      if (loc.citySlug && !existingSlugs.has(loc.citySlug)) {
        if (!missingCitiesMap.has(loc.citySlug)) {
          missingCitiesMap.set(loc.citySlug, {
            slug: loc.citySlug,
            name: loc.city,
            bundesland: b.bundesland,
            plz: loc.plz,
          });
        }
      }
    });
  }
});

const missingCities = [...missingCitiesMap.values()].sort((a, b) => a.slug.localeCompare(b.slug));

console.log(`Found ${missingCities.length} missing cities to add.`);

// Generate the new cities.js content
const allCities = [...existingCities, ...missingCities].sort((a, b) => a.slug.localeCompare(b.slug));

const output = `export const cities = ${JSON.stringify(allCities, null, 2)};\n`;

const targetPath = path.join(__dirname, '..', 'src', 'data', 'cities.js');
fs.writeFileSync(targetPath, output, 'utf8');
console.log(`\nSuccessfully wrote ${allCities.length} cities to cities.js`);
console.log('New cities added:');
missingCities.forEach(c => console.log(`  + ${c.slug} (${c.name}, ${c.bundesland})`));
