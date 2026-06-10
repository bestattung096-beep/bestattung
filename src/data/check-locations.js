const fs = require('fs');
const path = require('path');

function runCheck() {
  const backupPath = 'C:\\Users\\Administrator\\.gemini\\antigravity-backup\\scratch\\bestattungs-at\\src\\data\\bestatter.js';
  
  if (!fs.existsSync(backupPath)) {
    console.error('Backup bestatter.js not found at ' + backupPath);
    return;
  }

  const content = fs.readFileSync(backupPath, 'utf8');
  const sanitized = content
    .replace(/export const bestatter\s*=/, 'const bestatter =')
    .replace(/export const/g, 'const');
  const fn = new Function(`${sanitized}; return bestatter;`);
  const original = fn();

  console.log(`Loaded ${original.length} original bestatters.`);

  const withLocations = original.filter(b => b.locations && b.locations.length > 0);
  console.log(`Bestatters with 'locations' array: ${withLocations.length}`);

  const withMultiple = original.filter(b => b.locations && b.locations.length > 1);
  console.log(`Bestatters with multiple locations (> 1): ${withMultiple.length}`);

  console.log('\nList of bestatters with multiple locations in the original dataset:');
  withMultiple.forEach((b, idx) => {
    console.log(`${idx + 1}. ${b.name} (${b.id}) - ${b.locations.length} locations:`);
    b.locations.forEach(l => {
      console.log(`   - ${l.street || 'no street'}, ${l.plz} ${l.city}`);
    });
  });
}

runCheck();
