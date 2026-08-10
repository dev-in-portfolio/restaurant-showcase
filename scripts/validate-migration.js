const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');

const MOVED = [
  '1900-mexican-grill','aj-family-restaurant','banh-mi-brothers','barringtons-restaurant',
  'carolina-beer-temple','carolina-scoops','crispy-banh-mi','dbs-tavern','deluxe-fun-dining',
  'el-puro-cuban-restaurant','el-valle-mexican-restaurant','flame-asian-bistro-and-bar',
  'gus-restaurant','hello-sailor','hopfly-brewing','idlewild','intermezzo-pizzeria',
  'laurel-market','lenny-boy-brewing','local-loaf','mad-greek-cafe',
  'mckoys-smokehouse-and-saloon','sir-edmond-halleys'
];

let errors = 0;

// Parse files
let hold, active;
try {
  hold = JSON.parse(fs.readFileSync(path.join(BASE, 'data', 'hold-restaurants.json'), 'utf-8'));
  console.log('✓ hold-restaurants.json parses OK');
} catch(e) { console.error('✗ hold-restaurants.json:', e.message); errors++; process.exit(1); }

try {
  active = JSON.parse(fs.readFileSync(path.join(BASE, 'data', 'restaurants.json'), 'utf-8'));
  console.log('✓ restaurants.json parses OK');
} catch(e) { console.error('✗ restaurants.json:', e.message); errors++; process.exit(1); }

console.log(`\nCounts:`);
console.log(`  HOLD:  ${hold.length}  (was 54, expected 31)`);
console.log(`  ACTIVE: ${active.length} (was 91, expected 114)`);

if (hold.length !== 31) console.error(`  ✗ HOLD count mismatch! Expected 31, got ${hold.length}`);
if (active.length !== 114) console.error(`  ✗ ACTIVE count mismatch! Expected 114, got ${active.length}`);

// No duplicate slugs in active
const activeSlugs = active.map(r => r.slug);
const dupes = activeSlugs.filter((s, i) => activeSlugs.indexOf(s) !== i);
if (dupes.length > 0) {
  console.error(`\n✗ DUPLICATE SLUGS in ACTIVE: ${[...new Set(dupes)].join(', ')}`);
  errors++;
} else {
  console.log(`\n✓ No duplicate slugs in ACTIVE`);
}

// Check none of 23 remain in hold
const holdSlugs = new Set(hold.map(r => r.slug));
const stillInHold = MOVED.filter(s => holdSlugs.has(s));
if (stillInHold.length > 0) {
  console.error(`✗ STILL IN HOLD: ${stillInHold.join(', ')}`);
  errors++;
} else {
  console.log(`✓ All 23 removed from HOLD`);
}

// Check all 23 are in active
const activeSlugSet = new Set(activeSlugs);
const missingFromActive = MOVED.filter(s => !activeSlugSet.has(s));
if (missingFromActive.length > 0) {
  console.error(`✗ MISSING from ACTIVE: ${missingFromActive.join(', ')}`);
  errors++;
} else {
  console.log(`✓ All 23 present in ACTIVE`);
}

// Check status
const movedEntries = active.filter(r => MOVED.includes(r.slug));
const wrongStatus = movedEntries.filter(r => r.status !== 'presentation-ready');
if (wrongStatus.length > 0) {
  console.error(`✗ Wrong status: ${wrongStatus.map(r => `${r.slug}=${r.status}`).join(', ')}`);
  errors++;
} else {
  console.log(`✓ All 23 have status="presentation-ready"`);
}

// Check no heldAt
const hasHeldAt = movedEntries.filter(r => r.heldAt !== undefined);
if (hasHeldAt.length > 0) {
  console.error(`✗ Still has heldAt: ${hasHeldAt.map(r => r.slug).join(', ')}`);
  errors++;
} else {
  console.log(`✓ No heldAt on moved entries`);
}

// Check href paths
let brokenPaths = 0;
for (const r of movedEntries) {
  const href = r.href || r.demoRoute;
  if (!href) { console.error(`✗ No href on: ${r.slug}`); brokenPaths++; continue; }
  const fullPath = path.join(BASE, href);
  if (!fs.existsSync(fullPath)) {
    console.error(`✗ Broken path: ${href}`);
    brokenPaths++;
  }
}
if (brokenPaths === 0) {
  console.log(`✓ All 23 demo href paths resolve to existing files`);
}

// Check remaining hold entries all have status=hold
const nonHoldInHold = hold.filter(r => r.status !== 'hold');
if (nonHoldInHold.length > 0) {
  console.error(`✗ Non-hold status in hold file: ${nonHoldInHold.map(r => r.slug).join(', ')}`);
  errors++;
} else {
  console.log(`✓ All ${hold.length} remaining HOLD entries have status="hold"`);
}

// Check for duplicate names across both registries
console.log(`\n--- Name overlap check ---`);
const activeNames = new Set(active.map(r => r.name.toLowerCase().trim()));
const holdNames = hold.map(r => r.name.toLowerCase().trim());
const nameConflicts = holdNames.filter(n => activeNames.has(n));
if (nameConflicts.length > 0) {
  console.log(`  Name conflicts (same name in HOLD and ACTIVE): ${nameConflicts.join(', ')}`);
} else {
  console.log(`  ✓ No exact name conflicts between HOLD and ACTIVE`);
}

console.log(`\n=== VALIDATION COMPLETE ===`);
console.log(`Errors: ${errors}`);
process.exit(errors > 0 ? 1 : 0);
