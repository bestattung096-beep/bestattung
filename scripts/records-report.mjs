// Generates scripts/reports/invalid-records.json from the current bestatter dataset.
// Run: node scripts/records-report.mjs
// Does not modify source data.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { bestatter } from '../src/data/bestatter.js';
import { getInvalidBestatter } from '../src/lib/records.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'reports');
mkdirSync(outDir, { recursive: true });

const invalid = getInvalidBestatter().map(({ record, reasons }) => ({
  id: record.id,
  slug: record.slug,
  name: record.name,
  reasons,
  record,
}));

// Manual-review flags: known issues that don't cleanly match an automatic
// invalidation rule, so we flag them for a human rather than guessing.
// (woegenstein and kessler were flagged here previously; both were resolved
// after researching the real businesses — see CHANGELOG.md — so no
// hardcoded flags remain. This array is kept for any future ambiguous case.)
const manualReview = [];

const report = {
  generatedAt: new Date().toISOString(),
  totalRecords: bestatter.length,
  invalidCount: invalid.length,
  invalid,
  manualReview,
};

writeFileSync(path.join(outDir, 'invalid-records.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote ${outDir}/invalid-records.json`);
console.log(`Total records: ${bestatter.length}, invalid: ${invalid.length}, manual-review flags: ${manualReview.length}`);
for (const item of invalid) {
  console.log(`  - ${item.id}: ${item.reasons.join(', ')}`);
}
