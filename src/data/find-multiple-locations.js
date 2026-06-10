const fs = require('fs');
const path = require('path');

function runAudit() {
  const dataDir = __dirname;
  const backupPath = 'C:\\Users\\Administrator\\.gemini\\antigravity-backup\\scratch\\bestattungs-at\\src\\data\\bestatter.js';

  if (!fs.existsSync(backupPath)) {
    console.error('Backup bestatter.js not found.');
    return;
  }

  // 1. Load original 226 bestatters
  const content = fs.readFileSync(backupPath, 'utf8');
  const sanitized = content
    .replace(/export const bestatter\s*=/, 'const bestatter =')
    .replace(/export const/g, 'const');
  const fn = new Function(`${sanitized}; return bestatter;`);
  const original = fn();

  // 2. Load WKO complete registry
  const completeText = fs.readFileSync(path.join(dataDir, 'bestatter-at-complete.txt'), 'utf8');
  const completeNames = completeText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  // Helper to normalize names
  function getCleanBaseName(name) {
    return name
      .toLowerCase()
      .replace(/gmbh/g, '')
      .replace(/kg/g, '')
      .replace(/og/g, '')
      .replace(/&/g, 'und')
      .replace(/co/g, '')
      .replace(/e\.u\./g, '')
      .replace(/bestattung/g, '')
      .replace(/bestattungsunternehmen/g, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  }

  console.log(`Auditing ${original.length} original entries against WKO registry...`);

  const results = [];

  for (const b of original) {
    const cleanB = getCleanBaseName(b.name);
    if (cleanB.length < 3) continue; // Skip too short names

    // Find all WKO names that match this base name
    const matches = completeNames.filter(wkoName => {
      const cleanWko = getCleanBaseName(wkoName);
      return cleanWko.includes(cleanB) || cleanB.includes(cleanWko);
    });

    // If there are multiple matches in different cities, or if we want to see them
    if (matches.length > 1) {
      results.push({
        bestatter: b.name,
        city: b.city,
        id: b.id,
        matches: matches
      });
    }
  }

  console.log(`\nFound ${results.length} bestatters with potential duplicate/multiple listings in WKO:`);
  results.forEach((res, index) => {
    console.log(`\n${index + 1}. ${res.bestatter} (primary: ${res.city}, id: ${res.id})`);
    console.log(`   WKO matches (${res.matches.length}):`);
    res.matches.forEach(m => console.log(`     - ${m}`));
  });
}

runAudit();
