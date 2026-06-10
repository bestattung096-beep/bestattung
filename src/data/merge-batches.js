const fs = require('fs');
const path = require('path');

// Helper to convert ES module file to a standard JS array string and eval it
function loadArrayFromFile(filePath, varName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Replace export statement with a simple assignment
    const sanitized = content
      .replace(new RegExp(`export const ${varName}\\s*=`), `const ${varName} =`)
      .replace(/export const/g, 'const'); // replace any other exports
    
    // Eval in a sandbox-like function wrapper
    const fn = new Function(`${sanitized}; return ${varName};`);
    return fn();
  } catch (error) {
    console.error(`Error loading ${varName} from ${filePath}:`, error);
    throw error;
  }
}

function runMerge() {
  const dataDir = __dirname;
  
  // 1. Load original bestatter list
  console.log('Loading bestatter.js...');
  const originalBestatter = loadArrayFromFile(path.join(dataDir, 'bestatter.js'), 'bestatter');
  console.log(`Loaded ${originalBestatter.length} original entries.`);

  // 2. Load all batches
  const batches = [
    { file: 'missing-funeral-homes-data.js', name: 'missingFuneralHomes' },
    { file: 'missing-batch2.js', name: 'missingBatch2' },
    { file: 'missing-batch3.js', name: 'missingBatch3' },
    { file: 'missing-batch4.js', name: 'missingBatch4' },
    { file: 'missing-batch5.js', name: 'missingBatch5' },
    { file: 'missing-batch6.js', name: 'missingBatch6' },
    { file: 'missing-batch7.js', name: 'missingBatch7' },
    { file: 'missing-batch8.js', name: 'missingBatch8' }
  ];

  let allBatchEntries = [];
  for (const batch of batches) {
    const batchPath = path.join(dataDir, batch.file);
    console.log(`Loading batch file ${batch.file} (${batch.name})...`);
    const entries = loadArrayFromFile(batchPath, batch.name);
    console.log(`Loaded ${entries.length} entries from ${batch.file}.`);
    allBatchEntries = allBatchEntries.concat(entries);
  }

  console.log(`Total new entries to merge: ${allBatchEntries.length}`);

  // 3. Merge them and handle duplicates
  // Create a map by ID
  const mergedMap = new Map();
  
  // Put original entries in map
  for (const item of originalBestatter) {
    mergedMap.set(item.id, item);
  }

  // Put new entries in map (overwriting if ID matches, or just inserting)
  let overwrittenCount = 0;
  let addedCount = 0;
  for (const item of allBatchEntries) {
    if (mergedMap.has(item.id)) {
      overwrittenCount++;
    } else {
      addedCount++;
    }
    // Clean up properties if needed (ensure slug is present, website is included if present, etc.)
    const cleanItem = {
      id: item.id,
      slug: item.slug || item.id,
      name: item.name,
      city: item.city,
      citySlug: item.citySlug,
      bundesland: item.bundesland,
      plz: item.plz,
      street: item.street,
      phone: item.phone,
      services: item.services || ["Erdbestattung", "Feuerbestattung", "Überführungen", "Trauerfeier"],
      description: item.description || `${item.name} in ${item.city} – Ihr zuverlässiger Partner für Bestattungen, Trauerfeiern und Überführungen.`
    };

    if (item.email) cleanItem.email = item.email;
    if (item.website) cleanItem.website = item.website;
    if (item.locations) cleanItem.locations = item.locations;

    mergedMap.set(item.id, cleanItem);
  }

  console.log(`Merge complete: Added ${addedCount} new entries, updated/overwrote ${overwrittenCount} existing entries.`);
  
  // Convert map back to list
  const mergedList = Array.from(mergedMap.values());
  console.log(`Total entries in merged dataset: ${mergedList.length}`);

  // 4. Sort entries by name or slug for clean ordering
  mergedList.sort((a, b) => a.id.localeCompare(b.id));

  // 5. Serialize and write back to bestatter.js
  const serialized = `// Complete bestatter dataset
// Automatically compiled and merged
export const bestatter = ${JSON.stringify(mergedList, null, 2)};
`;

  fs.writeFileSync(path.join(dataDir, 'bestatter.js'), serialized, 'utf8');
  console.log('Successfully wrote merged data back to bestatter.js.');
}

runMerge();
