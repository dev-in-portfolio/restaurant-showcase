const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { redoSlugs, archiveSlugs, protectedSlugs } = require('./resolve_targets');

const BASELINE_SHA = '21095c2379d208adfb100afcefa866766ca92b79';

console.log('=== Scope Verification Guard ===');
console.log(`Baseline SHA: ${BASELINE_SHA}`);

let hasError = false;
const errors = [];

function fail(msg) {
  errors.push(msg);
  hasError = true;
}

// 1. Get changed files compared to BASELINE_SHA
let diffOutput = '';
try {
  diffOutput = execSync(`git diff --name-status ${BASELINE_SHA}`, { encoding: 'utf8' });
} catch (err) {
  fail(`Failed to run git diff against baseline ${BASELINE_SHA}: ${err.message}`);
}

let untrackedOutput = '';
try {
  untrackedOutput = execSync('git status --porcelain', { encoding: 'utf8' });
} catch (err) {
  fail(`Failed to run git status --porcelain: ${err.message}`);
}

const changedFiles = new Map(); // path -> status

diffOutput.trim().split('\n').forEach(line => {
  if (!line.trim()) return;
  const parts = line.trim().split(/\s+/);
  const status = parts[0];
  const file = parts[parts.length - 1];
  changedFiles.set(file.replace(/\\/g, '/'), status);
});

untrackedOutput.trim().split('\n').forEach(line => {
  if (!line.trim()) return;
  const status = line.substring(0, 2).trim();
  const file = line.substring(3).trim().replace(/\\/g, '/');
  if (status === '??') {
    changedFiles.set(file, 'A');
  }
});

console.log(`Total changed / untracked files vs baseline: ${changedFiles.size}`);

// 2. Check each changed file
const allowedInfrastructureFiles = new Set([
  'docs/SELECTIVE_SHOWCASE_MANIFEST.md',
  'scripts/verify-selective-scope.js',
  'scripts/resolve_targets.js',
  'scripts/generate_manifest.js',
  'scripts/archive-showcase.js',
  'scripts/check_archive_refs.js',
  'scripts/fix_archive_links.js',
  'scripts/rebuild_restaurant.js',
  'scripts/rebuild_target.js',
  'scripts/batch_rebuild.js',
  'scripts/rebuild_bespoke_target.js',
  'scripts/batch_bespoke_rebuild.js',
  'scripts/shared/comparison-button.js',
  'data/archived-restaurants.json',
  'data/hold-restaurants.json',
  'archive/index.html',
  'archive/hold/index.html',
  'archive/style.css',
  'package.json',
  'index.html'
]);

for (const [filePath, status] of changedFiles.entries()) {
  // Check if inside restaurants/
  if (filePath.startsWith('restaurants/')) {
    const parts = filePath.split('/');
    const slug = parts[1];
    if (slug === '.gitkeep') continue;
    if (!redoSlugs.has(slug) && !archiveSlugs.has(slug)) {
      fail(`PROTECTED VIOLATION: Protected restaurant folder modified or added: '${filePath}' (Status: ${status})`);
    }
  } else if (filePath.startsWith('archive/restaurants/')) {
    const parts = filePath.split('/');
    const slug = parts[2];
    if (!archiveSlugs.has(slug)) {
      fail(`UNAUTHORIZED ARCHIVE: Restaurant '${slug}' in '${filePath}' is not in ARCHIVE_TARGETS.`);
    }
  } else if (filePath.startsWith('archive/')) {
    // General archive infrastructure allowed
    continue;
  } else if (filePath.startsWith('artifacts/')) {
    // Screenshot review artifacts allowed
    continue;
  } else if (filePath === 'data/restaurants.json') {
    // Check registry for protected targets immutability
    try {
      const baselineJson = JSON.parse(execSync(`git show ${BASELINE_SHA}:data/restaurants.json`, { encoding: 'utf8' }));
      const currentJson = JSON.parse(fs.readFileSync('data/restaurants.json', 'utf8'));

      const currentMap = new Map(currentJson.map(e => [e.slug, e]));
      const baselineMap = new Map(baselineJson.map(e => [e.slug, e]));

      for (const pSlug of protectedSlugs) {
        const baseEntry = baselineMap.get(pSlug);
        const currEntry = currentMap.get(pSlug);
        if (!currEntry) {
          fail(`PROTECTED REGISTRY VIOLATION: Protected restaurant '${pSlug}' was removed from data/restaurants.json`);
        } else if (JSON.stringify(baseEntry) !== JSON.stringify(currEntry)) {
          fail(`PROTECTED REGISTRY VIOLATION: Entry for protected restaurant '${pSlug}' was modified in data/restaurants.json`);
        }
      }
    } catch (err) {
      fail(`Failed to verify data/restaurants.json immutability: ${err.message}`);
    }
  } else if (!allowedInfrastructureFiles.has(filePath)) {
    fail(`UNAUTHORIZED CHANGE: File outside allowed scope was modified: '${filePath}' (Status: ${status})`);
  }
}

if (hasError) {
  console.error(`\n❌ SCOPE VERIFICATION FAILED (${errors.length} error(s)):`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('\n✓ SCOPE VERIFICATION PASSED: Working tree strictly adheres to approved scope boundaries.');
  process.exit(0);
}
