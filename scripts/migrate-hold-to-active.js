/**
 * Migration script: Move 23 specified restaurants from HOLD to ACTIVE/LIVE.
 * Reads data/hold-restaurants.json and data/restaurants.json,
 * moves the specified slugs, transforms status, removes heldAt,
 * checks for duplicates, writes both files back.
 */

const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');
const HOLD_PATH = path.join(BASE, 'data', 'hold-restaurants.json');
const ACTIVE_PATH = path.join(BASE, 'data', 'restaurants.json');
const RESTAURANTS_DIR = path.join(BASE, 'restaurants');

// The 23 slugs to move
const SLUGS_TO_MOVE = new Set([
  '1900-mexican-grill',
  'aj-family-restaurant',
  'banh-mi-brothers',
  'barringtons-restaurant',
  'carolina-beer-temple',
  'carolina-scoops',
  'crispy-banh-mi',
  'dbs-tavern',
  'deluxe-fun-dining',
  'el-puro-cuban-restaurant',
  'el-valle-mexican-restaurant',
  'flame-asian-bistro-and-bar',
  'gus-restaurant',
  'hello-sailor',
  'hopfly-brewing',
  'idlewild',
  'intermezzo-pizzeria',
  'laurel-market',
  'lenny-boy-brewing',
  'local-loaf',
  'mad-greek-cafe',
  'mckoys-smokehouse-and-saloon',
  'sir-edmond-halleys',
]);

console.log('=== HOLD → ACTIVE MIGRATION ===\n');

// 1. Read both files
const holdData = JSON.parse(fs.readFileSync(HOLD_PATH, 'utf-8'));
const activeData = JSON.parse(fs.readFileSync(ACTIVE_PATH, 'utf-8'));

console.log(`Before migration:`);
console.log(`  HOLD count: ${holdData.length}`);
console.log(`  ACTIVE count: ${activeData.length}`);

// 2. Build active lookup sets
const activeSlugs = new Set(activeData.map(r => r.slug));
const activeNames = new Set(activeData.map(r => normalizeName(r.name)));

function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/[''']/g, "'")  // normalize curly apostrophes
    .replace(/[&＋]/g, 'and') // normalize & and +
    .replace(/[,]/g, '')     // remove commas
    .replace(/[^a-z0-9\s]/g, '') // remove other punctuation
    .replace(/\s+/g, ' ')    // collapse whitespace
    .trim();
}

// 3. Identify the 23 in hold
const toMove = [];
const notFound = [];
const alreadyActive = [];
const remainingHold = [];

for (const restaurant of holdData) {
  if (SLUGS_TO_MOVE.has(restaurant.slug)) {
    // Check if already in active by slug
    if (activeSlugs.has(restaurant.slug)) {
      alreadyActive.push({ slug: restaurant.slug, name: restaurant.name });
      remainingHold.push(restaurant); // keep in hold since it shouldn't be moved
      continue;
    }
    // Check if already in active by normalized name
    const normName = normalizeName(restaurant.name);
    if (activeNames.has(normName)) {
      alreadyActive.push({ slug: restaurant.slug, name: restaurant.name });
      remainingHold.push(restaurant);
      continue;
    }
    toMove.push(restaurant);
  } else {
    remainingHold.push(restaurant);
  }
}

// Report any that were requested but not found
for (const slug of SLUGS_TO_MOVE) {
  const found = holdData.find(r => r.slug === slug);
  if (!found) {
    notFound.push(slug);
  }
}

console.log(`\nRestaurants to move: ${toMove.length}`);
console.log(`Already in ACTIVE (skipped): ${alreadyActive.length}`);
if (alreadyActive.length > 0) {
  alreadyActive.forEach(r => console.log(`  - ${r.name} (${r.slug})`));
}
console.log(`Not found in HOLD: ${notFound.length}`);
if (notFound.length > 0) {
  notFound.forEach(s => console.log(`  - ${s}`));
}

// 4. Transform each object for active registry
const transformed = toMove.map(r => {
  const { heldAt, ...rest } = r;
  return {
    ...rest,
    status: 'presentation-ready',  // match active registry convention
  };
});

// Also preserve href → for consistency, ensure it uses 'href' not 'demoRoute'
// (already using href in hold, so no change needed)

// 5. Build new active array (append to end)
const newActive = [...activeData, ...transformed];

// 6. Validate no duplicate slugs in new active
const newActiveSlugs = newActive.map(r => r.slug);
const slugCounts = {};
newActiveSlugs.forEach(s => { slugCounts[s] = (slugCounts[s] || 0) + 1; });
const duplicates = Object.entries(slugCounts).filter(([, c]) => c > 1);
if (duplicates.length > 0) {
  console.error('\nERROR: Duplicate slugs in new active registry:');
  duplicates.forEach(([slug, count]) => console.error(`  ${slug}: ${count}x`));
  process.exit(1);
}

// 7. Check demo directories exist
console.log('\n=== DEMO DIRECTORY CHECK ===');
const missingDirs = [];
for (const r of transformed) {
  const href = r.href || r.demoRoute;
  if (!href) {
    missingDirs.push({ name: r.name, slug: r.slug, reason: 'no href/demoRoute' });
    continue;
  }
  const demoPath = path.join(BASE, href);
  // Check if the directory containing index.html exists
  const dirPath = path.dirname(demoPath);
  if (!fs.existsSync(dirPath)) {
    missingDirs.push({ name: r.name, slug: r.slug, path: dirPath });
  } else if (!fs.existsSync(demoPath)) {
    missingDirs.push({ name: r.name, slug: r.slug, path: demoPath, reason: 'index.html missing but dir exists' });
  }
}

if (missingDirs.length > 0) {
  console.log('MISSING demo directories:');
  missingDirs.forEach(d => console.log(`  - ${d.name} (${d.slug}): ${d.path || d.reason}`));
} else {
  console.log('All 23 demo directories exist ✓');
}

// 8. Write files back
fs.writeFileSync(ACTIVE_PATH, JSON.stringify(newActive, null, 2) + '\n');
fs.writeFileSync(HOLD_PATH, JSON.stringify(remainingHold, null, 2) + '\n');

console.log(`\n=== AFTER MIGRATION ===`);
console.log(`  HOLD count: ${remainingHold.length} (was ${holdData.length})`);
console.log(`  ACTIVE count: ${newActive.length} (was ${activeData.length})`);
console.log(`  Moved: ${transformed.length}`);
console.log(`  Expected HOLD: ${holdData.length - transformed.length}`);

// 9. Verify none of the 23 remain in hold
const remainingSlugs = new Set(remainingHold.map(r => r.slug));
const stillInHold = [...SLUGS_TO_MOVE].filter(s => remainingSlugs.has(s));
if (stillInHold.length > 0) {
  console.log(`\nWARNING: ${stillInHold.length} still in HOLD (should be 0 for moved):`);
  stillInHold.forEach(s => console.log(`  - ${s}`));
} else {
  console.log(`\n✓ All ${transformed.length} moved restaurants removed from HOLD`);
}

// 10. Summary
console.log(`\n=== MIGRATION COMPLETE ===`);
console.log(`Successfully moved to ACTIVE:`);
transformed.forEach(r => console.log(`  ${r.emoji} ${r.name} (${r.slug})`));

if (alreadyActive.length > 0) {
  console.log(`\nAlready in ACTIVE (not duplicated):`);
  alreadyActive.forEach(r => console.log(`  - ${r.name} (${r.slug})`));
}

if (missingDirs.length > 0) {
  console.log(`\nMissing directories (registry preserved):`);
  missingDirs.forEach(d => console.log(`  - ${d.name}: ${d.path || d.reason}`));
}
