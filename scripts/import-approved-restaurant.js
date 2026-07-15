// Staging to Showcase Promotion Script
// Usage: npm run promote:showcase -- --restaurant <restaurant-slug> [--update] [--dry-run] [--source <path>]

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach((val, index, array) => {
    if (val.startsWith('--')) {
      const key = val.slice(2);
      const nextVal = array[index + 1];
      if (nextVal && !nextVal.startsWith('--')) {
        args[key] = nextVal;
      } else {
        args[key] = true;
      }
    }
  });
  return args;
}

const args = parseArgs();

if (args.help || !args["restaurant"]) {
  console.log(`
Staging to Showcase Promotion Script

Usage:
  npm run promote:showcase -- --restaurant <restaurant-slug> [options]

Required:
  --restaurant <slug>     The folder name / slug of the restaurant in staging.

Options:
  --update                Overwrite the restaurant folder in showcase if it already exists.
  --dry-run               Validate the source and print changes without copying files.
  --source <path>         Path to the local staging repository (defaults to '../restaurant-staging').
  --help                  Show this help message.
  `);
  process.exit(!args["restaurant"] && !args.help ? 1 : 0);
}

const slug = args["restaurant"];
const updateMode = !!args["update"];
const dryRun = !!args["dry-run"];
const stagingRoot = path.resolve(args.source || '../restaurant-staging');
const sourceDir = path.join(stagingRoot, 'restaurants', slug);
const showcaseRoot = path.resolve(__dirname, '..');
const destDir = path.join(showcaseRoot, 'restaurants', slug);
const indexFile = path.join(showcaseRoot, 'data', 'restaurants.json');

const VALID_PRESENCE_TYPES = [
  'website', 'facebook', 'instagram', 'opentable', 'doordash',
  'ubereats', 'grubhub', 'google-business-profile', 'directory-listing', 'other', 'none'
];

console.log(`Starting showcase promotion for: ${slug}`);
console.log(`Source directory:   ${sourceDir}`);
console.log(`Destination dir:    ${destDir}`);
if (dryRun) console.log('*** DRY RUN MODE - No files will be written ***');

// 1. Confirm source exists
if (!fs.existsSync(sourceDir)) {
  console.error(`Error: Source restaurant directory does not exist at '${sourceDir}'`);
  process.exit(1);
}

// 2. Parse and validate metadata
const metadataPath = path.join(sourceDir, 'restaurant.json');
if (!fs.existsSync(metadataPath)) {
  console.error(`Error: 'restaurant.json' not found in source directory.`);
  process.exit(1);
}

let metadata;
try {
  metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
} catch (err) {
  console.error(`Error: Invalid JSON in 'restaurant.json': ${err.message}`);
  process.exit(1);
}

// 3. Check all approval criteria
const errors = [];

if (metadata.status !== 'approved') {
  errors.push(`Metadata 'status' must be "approved". Found: "${metadata.status}"`);
}

const requiredReviewFlags = [
  'desktopReviewed', 'tabletReviewed', 'mobileReviewed',
  'linksVerified', 'contentVerified', 'performanceReviewed',
  'accessibilityReviewed', 'productionBuildPassed', 'approvedForPresentation'
];

requiredReviewFlags.forEach(flag => {
  if (metadata[flag] !== true) {
    errors.push(`Review flag '${flag}' must be true. Found: ${metadata[flag]}`);
  }
});

if (metadata.comparisonButtonAdded !== true && metadata.comparisonButtonNotApplicable !== true) {
  errors.push(`Either 'comparisonButtonAdded' or 'comparisonButtonNotApplicable' must be true.`);
}

if (!metadata.id || !metadata.name || !metadata.slug) {
  errors.push(`Metadata missing required fields: 'id', 'name', 'slug'.`);
}

if (metadata.currentPublicPresenceType && !VALID_PRESENCE_TYPES.includes(metadata.currentPublicPresenceType)) {
  errors.push(`Invalid 'currentPublicPresenceType': "${metadata.currentPublicPresenceType}"`);
}

if (!fs.existsSync(path.join(sourceDir, 'index.html'))) {
  errors.push(`Missing 'index.html' in source directory.`);
}

// Check for placeholder content
const placeholderPatterns = [
  /lorem\s+ipsum/i, /todo/i, /placeholder/i, /fixme/i,
  /insert\s+(here|text|details)/i, /\[name\]/i, /\[phone\]/i, /\[address\]/i
];

function scanFiles(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '.git' && entry.name !== 'node_modules') {
        results.push(...scanFiles(fullPath));
      }
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = scanFiles(sourceDir);
for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const relPath = path.relative(sourceDir, htmlFile);
  for (const pattern of placeholderPatterns) {
    const match = content.match(pattern);
    if (match) {
      errors.push(`Placeholder text '${match[0]}' detected in '${relPath}'`);
    }
  }
}

// Check for broken local references in HTML files
for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const filename = path.relative(sourceDir, htmlFile);
  const srcMatches = content.matchAll(/src=["'](.*?)["']/g);
  const hrefMatches = content.matchAll(/href=["'](.*?)["']/g);

  for (const match of srcMatches) {
    const ref = match[1];
    if (ref.startsWith('http://') || ref.startsWith('https://') || ref.startsWith('//') ||
        ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('#') ||
        ref.startsWith('sms:') || ref.trim() === '') continue;
    const resolvedPath = path.resolve(path.dirname(htmlFile), ref).split('?')[0].split('#')[0];
    if (!fs.existsSync(resolvedPath)) {
      errors.push(`Broken local reference: '${ref}' in '${filename}'`);
    }
  }
  for (const match of hrefMatches) {
    const ref = match[1];
    if (ref.startsWith('http://') || ref.startsWith('https://') || ref.startsWith('//') ||
        ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('#') ||
        ref.startsWith('sms:') || ref.trim() === '') continue;
    const resolvedPath = path.resolve(path.dirname(htmlFile), ref).split('?')[0].split('#')[0];
    if (!fs.existsSync(resolvedPath)) {
      errors.push(`Broken local reference: '${ref}' in '${filename}'`);
    }
  }
}

// Check for temporary files
const tempFilePatterns = [/\.tmp$/i, /~$/, /^\.#/, /#.*#$/];
function scanAllFiles(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '.git' && entry.name !== 'node_modules') {
        results.push(...scanAllFiles(fullPath));
      }
    } else {
      results.push(entry.name);
    }
  }
  return results;
}

const allFileNames = scanAllFiles(sourceDir);
for (const fileName of allFileNames) {
  for (const pattern of tempFilePatterns) {
    if (pattern.test(fileName)) {
      errors.push(`Temporary file detected: '${fileName}'`);
    }
  }
}

if (errors.length > 0) {
  console.error('\nPromotion validation failed:');
  errors.forEach(err => console.error(`  [ERROR] ${err}`));
  process.exit(1);
}

// 4. Detect destination conflicts
let destExistedBefore = fs.existsSync(destDir);
if (destExistedBefore && !updateMode) {
  console.error(`Error: Restaurant '${slug}' already exists in showcase.`);
  console.error(`Use --update flag to overwrite the existing files.`);
  process.exit(1);
}

// 5. File exclusion list
const excludedNames = ['.git', '.github', 'node_modules', '.DS_Store', 'Thumbs.db'];

function shouldCopy(srcPath) {
  const relative = path.relative(sourceDir, srcPath);
  if (!relative) return true;
  const parts = relative.split(path.sep);
  return !parts.some(part => excludedNames.includes(part));
}

// 6. Gather files to copy
const filesToCopy = [];
function collectFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (!shouldCopy(fullPath)) continue;
    if (entry.isDirectory()) {
      collectFiles(fullPath);
    } else {
      filesToCopy.push(fullPath);
    }
  }
}
collectFiles(sourceDir);

// 7. Perform copy
let copiedCount = 0;

if (!dryRun) {
  destExistedBefore = fs.existsSync(destDir);
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of filesToCopy) {
    const relative = path.relative(sourceDir, file);
    const destFile = path.join(destDir, relative);
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    fs.copyFileSync(file, destFile);
    copiedCount++;
  }
} else {
  copiedCount = filesToCopy.length;
}

// 8. Generate showcase metadata
const showcaseMetadata = {
  id: metadata.id || slug,
  name: metadata.name || slug,
  slug: metadata.slug || slug,
  location: {
    city: metadata.location?.city || '',
    state: metadata.location?.state || '',
    address: metadata.location?.address || ''
  },
  stage: 'showcase',
  status: 'presentation-ready',
  sourceRepository: metadata.sourceRepository || 'dev-in-portfolio/restaurant-staging',
  sourcePath: `restaurants/${slug}`,
  currentWebsiteUrl: metadata.currentWebsiteUrl || '',
  currentPublicPresenceType: metadata.currentPublicPresenceType || 'website',
  demoRoute: `restaurants/${slug}/index.html`,
  informationVerifiedAt: metadata.informationVerifiedAt || null,
  promotedToStagingAt: metadata.promotedToStagingAt || null,
  promotedToShowcaseAt: new Date().toISOString(),
  desktopReviewed: metadata.desktopReviewed || false,
  tabletReviewed: metadata.tabletReviewed || false,
  mobileReviewed: metadata.mobileReviewed || false,
  linksVerified: metadata.linksVerified || false,
  contentVerified: metadata.contentVerified || false,
  performanceReviewed: metadata.performanceReviewed || false,
  accessibilityReviewed: metadata.accessibilityReviewed || false,
  comparisonButtonAdded: metadata.comparisonButtonAdded || false,
  comparisonButtonNotApplicable: metadata.comparisonButtonNotApplicable || false,
  productionBuildPassed: metadata.productionBuildPassed || false,
  approvedForPresentation: metadata.approvedForPresentation || false,
  notes: metadata.notes ? [...metadata.notes] : []
};

const showcaseMetaPath = path.join(destDir, 'restaurant.json');

if (!dryRun) {
  fs.writeFileSync(showcaseMetaPath, JSON.stringify(showcaseMetadata, null, 2), 'utf8');
} else {
  console.log(`\n[DRY RUN] Would write showcase metadata to '${showcaseMetaPath}':`);
  console.log(JSON.stringify(showcaseMetadata, null, 2));
}

// 9. Update showroom index
function updateShowroomIndex(slug, entry, filePath, dryRun) {
  let index = [];
  if (fs.existsSync(filePath)) {
    try {
      index = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (!Array.isArray(index)) index = [];
    } catch {
      console.warn('Warning: Could not parse restaurants.json, starting fresh.');
      index = [];
    }
  }

  const existingIdx = index.findIndex(e => e.slug === slug);
  if (existingIdx !== -1) {
    if (!updateMode) {
      console.error(`Error: Duplicate slug '${slug}' in showroom index. Use --update to replace.`);
      if (!dryRun) {
        cleanupDestOnFailure();
      }
      process.exit(1);
    }
    index[existingIdx] = entry;
  } else {
    index.push(entry);
  }

  index.sort((a, b) => a.slug.localeCompare(b.slug));

  if (!dryRun) {
    fs.writeFileSync(filePath, JSON.stringify(index, null, 2) + '\n', 'utf8');
    console.log(`Updated showroom index at '${filePath}'`);
  } else {
    console.log(`[DRY RUN] Would update showroom index at '${filePath}'`);
  }
}

let destExistedForCleanup = false;

function cleanupDestOnFailure() {
  if (!dryRun && !destExistedForCleanup && fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
    console.log(`Cleaned up incomplete destination '${destDir}'`);
  }
}

const showroomEntry = {
  id: metadata.id || slug,
  name: metadata.name || slug,
  slug: slug,
  demoRoute: `restaurants/${slug}/index.html`,
  location: {
    city: metadata.location?.city || '',
    state: metadata.location?.state || ''
  },
  currentWebsiteUrl: metadata.currentWebsiteUrl || '',
  currentPublicPresenceType: metadata.currentPublicPresenceType || 'website',
  promotedToShowcaseAt: showcaseMetadata.promotedToShowcaseAt,
  status: 'presentation-ready'
};

if (!dryRun) {
  updateShowroomIndex(slug, showroomEntry, indexFile, dryRun);
} else {
  console.log(`\n[DRY RUN] Showroom index would be updated with entry for '${slug}'`);
}

console.log(`\n--- Summary ---`);
console.log(`Copied:           ${copiedCount} files`);
console.log(`Showcase status:  presentation-ready`);
if (dryRun) {
  console.log('Dry run completed. No files were written.');
} else {
  console.log('Promotion completed successfully.');
}
