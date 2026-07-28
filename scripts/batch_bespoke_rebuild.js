const { resolvedRedo } = require('./resolve_targets');
const { rebuildBespokeRestaurant } = require('./rebuild_bespoke_target');
const showcaseRoot = require('path').resolve(__dirname, '..');

console.log(`Starting Bespoke Batch Rebuild for all ${resolvedRedo.length} REDO target restaurants...`);

let completedCount = 0;
const failedSlugs = [];

for (let i = 0; i < resolvedRedo.length; i++) {
  const target = resolvedRedo[i];

  // Skip Amélie's since it was already completed with custom bespoke commit 0834c0d
  if (target.slug === 'amelies-french-bakery-and-cafe') {
    console.log(`\n[${i + 1}/${resolvedRedo.length}] Skipping Amélie's (Already completed with bespoke commit 0834c0d).`);
    completedCount++;
    continue;
  }

  console.log(`\n[${i + 1}/${resolvedRedo.length}] Processing #${target.num}: ${target.name} (${target.slug})...`);

  try {
    rebuildBespokeRestaurant(target);
    completedCount++;
  } catch (err) {
    console.error(`❌ ERROR rebuilding ${target.slug}: ${err.message}`);
    failedSlugs.push(target.slug);
    break;
  }
}

console.log(`\n========================================`);
console.log(`Bespoke Batch Rebuild Summary`);
console.log(`Completed: ${completedCount} / ${resolvedRedo.length}`);
console.log(`Failed: ${failedSlugs.length}`);
if (failedSlugs.length > 0) {
  console.log(`Failed Slugs: ${failedSlugs.join(', ')}`);
}
console.log(`========================================`);
