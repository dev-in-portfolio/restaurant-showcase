// Archive Showcase Script
// Usage: npm run archive:showcase -- --restaurant <exact-slug> [--dry-run]

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function parseArgs() {
  const args = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const val = argv[i];
    if (val.startsWith('--')) {
      const key = val.slice(2);
      const nextVal = argv[i + 1];
      if (nextVal && !nextVal.startsWith('--')) {
        args[key] = nextVal;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

const args = parseArgs();

if (args.help) {
  console.log(`
Archive Showcase Script

Usage:
  npm run archive:showcase -- --restaurant <exact-slug> [--dry-run]

Options:
  --restaurant <slug>  The exact slug of the restaurant to archive (Required).
  --dry-run            Simulate the archive process without writing changes.
  --help               Show this help message.
  `);
  process.exit(0);
}

const slug = args.restaurant;
const isDryRun = !!args['dry-run'];

if (!slug || typeof slug !== 'string' || slug.trim() === '' || slug === 'true') {
  console.error('Error: Exactly one restaurant slug must be specified with --restaurant <exact-slug>');
  process.exit(1);
}

const showcaseRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(showcaseRoot, 'restaurants', slug);
const archiveDir = path.join(showcaseRoot, 'archive', 'restaurants', slug);
const activeRegistryPath = path.join(showcaseRoot, 'data', 'restaurants.json');
const archiveRegistryPath = path.join(showcaseRoot, 'data', 'archived-restaurants.json');

console.log(`=== Archive Showcase Operation ===`);
console.log(`Target Slug: ${slug}`);
console.log(`Mode: ${isDryRun ? 'DRY RUN (No changes will be written)' : 'EXECUTE'}\n`);

// 1. Refuse unknown or non-existent source directory
if (!fs.existsSync(sourceDir)) {
  console.error(`Error: Restaurant source directory does not exist at '${sourceDir}'`);
  process.exit(1);
}

// 2. Refuse to overwrite existing archive destination silently
if (fs.existsSync(archiveDir)) {
  console.error(`Error: Archive destination already exists at '${archiveDir}'. Refusing to overwrite silently.`);
  process.exit(1);
}

// 3. Read active registry
if (!fs.existsSync(activeRegistryPath)) {
  console.error(`Error: Active registry file missing at '${activeRegistryPath}'`);
  process.exit(1);
}

let activeRegistry = [];
try {
  activeRegistry = JSON.parse(fs.readFileSync(activeRegistryPath, 'utf8'));
} catch (err) {
  console.error(`Error reading active registry: ${err.message}`);
  process.exit(1);
}

const entryIndex = activeRegistry.findIndex(item => item.slug === slug);
if (entryIndex === -1) {
  console.error(`Error: Restaurant '${slug}' is not found in '${activeRegistryPath}'`);
  process.exit(1);
}

const targetEntry = activeRegistry[entryIndex];

// Read archive registry
let archiveRegistry = [];
if (fs.existsSync(archiveRegistryPath)) {
  try {
    archiveRegistry = JSON.parse(fs.readFileSync(archiveRegistryPath, 'utf8'));
  } catch (err) {
    console.error(`Error reading archive registry: ${err.message}`);
    process.exit(1);
  }
}

// Print planned path changes
console.log('Planned Changes:');
console.log(`  1. Move Directory: '${sourceDir}' -> '${archiveDir}'`);
console.log(`  2. Registry Update: Remove '${slug}' from '${activeRegistryPath}'`);
console.log(`  3. Registry Update: Add '${slug}' to '${archiveRegistryPath}'`);

if (isDryRun) {
  console.log('\n[DRY RUN COMPLETE] No files were modified.');
  process.exit(0);
}

// Execute changes
try {
  // Ensure archive/restaurants parent dir exists
  const archiveParent = path.dirname(archiveDir);
  if (!fs.existsSync(archiveParent)) {
    fs.mkdirSync(archiveParent, { recursive: true });
  }

  // Move directory
  fs.renameSync(sourceDir, archiveDir);
  console.log(`✓ Moved restaurant folder to archive.`);

  // Remove from active registry
  activeRegistry.splice(entryIndex, 1);
  fs.writeFileSync(activeRegistryPath, JSON.stringify(activeRegistry, null, 2) + '\n', 'utf8');
  console.log(`✓ Removed entry from active registry.`);

  // Prepare archived entry
  const archivedEntry = {
    ...targetEntry,
    archivedAt: new Date().toISOString(),
    status: 'archived',
    href: `restaurants/${slug}/index.html`
  };

  // Add to archive registry if not already present
  if (!archiveRegistry.some(e => e.slug === slug)) {
    archiveRegistry.push(archivedEntry);
  }

  fs.writeFileSync(archiveRegistryPath, JSON.stringify(archiveRegistry, null, 2) + '\n', 'utf8');
  console.log(`✓ Added entry to archived registry.`);

  console.log('\nRunning Scope Verification Guard after archiving...');
  execSync('node scripts/verify-selective-scope.js', { stdio: 'inherit', cwd: showcaseRoot });

  console.log(`\n✓ Archive operation completed successfully for '${slug}'.`);
} catch (err) {
  console.error(`\n❌ Archive operation failed: ${err.message}`);
  process.exit(1);
}
