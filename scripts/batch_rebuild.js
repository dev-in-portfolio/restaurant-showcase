const { resolvedRedo } = require('./resolve_targets');
const { buildRestaurant } = require('./rebuild_target');
const { execSync } = require('child_process');
const showcaseRoot = require('path').resolve(__dirname, '..');

console.log(`Starting Batch Rebuild for all ${resolvedRedo.length} REDO target restaurants...`);

let completedCount = 0;
const failedSlugs = [];

for (let i = 0; i < resolvedRedo.length; i++) {
  const target = resolvedRedo[i];
  console.log(`\n[${i + 1}/${resolvedRedo.length}] Processing #${target.num}: ${target.name} (${target.slug})...`);

  try {
    buildRestaurant(target);
    completedCount++;
  } catch (err) {
    console.error(`❌ ERROR rebuilding ${target.slug}: ${err.message}`);
    failedSlugs.push(target.slug);
    // Stop batch on error to allow debugging
    break;
  }
}

console.log(`\n========================================`);
console.log(`Batch Rebuild Summary`);
console.log(`Completed: ${completedCount} / ${resolvedRedo.length}`);
console.log(`Failed: ${failedSlugs.length}`);
if (failedSlugs.length > 0) {
  console.log(`Failed Slugs: ${failedSlugs.join(', ')}`);
}
console.log(`========================================`);
