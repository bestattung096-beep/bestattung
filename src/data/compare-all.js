const fs = require('fs');
const path = require('path');

function runCompare() {
  const dataDir = __dirname;
  
  // 1. Load bestatter.js names
  const bestatterContent = fs.readFileSync(path.join(dataDir, 'bestatter.js'), 'utf8');
  // Strip export statement
  const sanitized = bestatterContent
    .replace(/export const bestatter\s*=/, 'const bestatter =')
    .replace(/export const/g, 'const');
  const fn = new Function(`${sanitized}; return bestatter;`);
  const currentBestatters = fn();
  
  console.log(`Current bestatter.js has ${currentBestatters.length} entries.`);

  // 2. Load bestatter-at-complete.txt names
  const completeText = fs.readFileSync(path.join(dataDir, 'bestatter-at-complete.txt'), 'utf8');
  const completeNames = completeText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
  
  console.log(`bestatter-at-complete.txt has ${completeNames.length} names.`);

  // 3. Normalize and match names
  // Helper to normalize names for comparison
  function normalize(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .replace(/gmbh/g, '')
      .replace(/kg/g, '')
      .replace(/og/g, '')
      .replace(/bestattung/g, '')
      .replace(/bestattungsunternehmen/g, '');
  }

  const currentNamesMap = new Map();
  for (const b of currentBestatters) {
    currentNamesMap.set(normalize(b.name), b);
  }

  let matched = [];
  let missing = [];

  for (const name of completeNames) {
    const norm = normalize(name);
    // Try exact or fuzzy match
    let found = null;
    
    // Check direct normalized match
    if (currentNamesMap.has(norm)) {
      found = currentNamesMap.get(norm);
    } else {
      // Check if any current name is a substring of complete name or vice versa
      for (const [currNorm, b] of currentNamesMap.entries()) {
        if (norm.includes(currNorm) || currNorm.includes(norm)) {
          found = b;
          break;
        }
      }
    }

    if (found) {
      matched.push({ official: name, matchedWith: found.name, id: found.id });
    } else {
      missing.push(name);
    }
  }

  console.log(`\nResults:`);
  console.log(`- Matched: ${matched.length}`);
  console.log(`- Missing: ${missing.length}`);
  
  if (missing.length > 0) {
    console.log(`\nSample of missing names (first 10):`);
    missing.slice(0, 10).forEach(m => console.log(`  - ${m}`));
    
    // Write missing names to a file
    fs.writeFileSync(path.join(dataDir, 'unmatched-names.txt'), missing.join('\n'), 'utf8');
    console.log(`\nAll ${missing.length} unmatched names written to src/data/unmatched-names.txt`);
  }
}

runCompare();
