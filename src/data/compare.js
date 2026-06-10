const fs = require('fs');

// 1. Read our project data
const src = fs.readFileSync(__dirname + '/bestatter.js', 'utf8');
const ourNames = [];
const nameRx = /name:\s*"([^"]+)"/g;
let m;
while ((m = nameRx.exec(src)) !== null) ourNames.push(m[1]);

// 2. Read bestatter.at scraped list
const bAt = fs.readFileSync(__dirname + '/bestatter-at-complete.txt', 'utf8')
  .split('\n').map(l => l.replace('\r','').trim()).filter(Boolean);

console.log(`\n=== COMPARISON REPORT ===`);
console.log(`Our project: ${ourNames.length} entries`);
console.log(`bestatter.at: ${bAt.length} entries\n`);

// 3. Normalize names for fuzzy matching
function norm(s) {
  return s.toLowerCase()
    .replace(/bestattung(en|s|sinstitut|sunternehmen)?/gi, '')
    .replace(/gmbh|kg|og|e\.u\.|ges\.?m\.?b\.?h\.?|gesellschaft|kommanditgesellschaft|co\.?\s*kg|inh\.|nfg\.?/gi, '')
    .replace(/&|und|\u0026/gi, '')
    .replace(/[^a-zäöüß]/gi, '')
    .trim();
}

// 4. Find matches and missing
const matched = [];
const missing = [];

for (const bName of bAt) {
  const bNorm = norm(bName);
  let found = false;
  for (const oName of ourNames) {
    const oNorm = norm(oName);
    // Check if one contains the other or they share significant overlap
    if (bNorm === oNorm || bNorm.includes(oNorm) || oNorm.includes(bNorm)) {
      found = true;
      matched.push({ bestatterAt: bName, ours: oName });
      break;
    }
  }
  if (!found) {
    // Try surname match (last word of normalized)
    const bWords = bNorm.split('').join(''); // keep as is
    let partialMatch = false;
    for (const oName of ourNames) {
      const oNorm = norm(oName);
      // Check if key surname appears
      if (bNorm.length > 4 && oNorm.length > 4) {
        if (bNorm.includes(oNorm.substring(0, Math.min(6, oNorm.length))) ||
            oNorm.includes(bNorm.substring(0, Math.min(6, bNorm.length)))) {
          partialMatch = true;
          matched.push({ bestatterAt: bName, ours: oName, partial: true });
          break;
        }
      }
    }
    if (!partialMatch) {
      missing.push(bName);
    }
  }
}

console.log(`--- MATCHED (in both): ${matched.length} ---`);
matched.forEach(m => {
  if (m.partial) console.log(`  ~ ${m.bestatterAt}  ≈  ${m.ours} (partial)`);
});

console.log(`\n--- MISSING FROM OUR PROJECT: ${missing.length} ---`);
missing.forEach((name, i) => console.log(`  ${i+1}. ${name}`));

// 5. Save missing list
fs.writeFileSync(__dirname + '/missing-from-project.txt', missing.join('\n'), 'utf8');
console.log(`\nSaved missing list to missing-from-project.txt`);
