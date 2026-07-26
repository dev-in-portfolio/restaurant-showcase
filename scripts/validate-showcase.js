// Showcase Restaurant Validation Script
// Usage: npm run validate -- --restaurant <restaurant-slug>

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

if (args.help || !args.restaurant) {
  console.log(`
Showcase Restaurant Validation Script

Usage:
  npm run validate -- --restaurant <restaurant-slug>

Required:
  --restaurant <slug>     The slug of the restaurant inside the showcase.

Options:
  --help                  Show this help message.
  `);
  process.exit(!args.restaurant && !args.help ? 1 : 0);
}

const slug = args.restaurant;
const showcaseRoot = path.resolve(__dirname, '..');
const restaurantDir = path.join(showcaseRoot, 'restaurants', slug);

if (!fs.existsSync(restaurantDir)) {
  console.error(`Error: Restaurant directory does not exist in showcase at '${restaurantDir}'`);
  process.exit(1);
}

console.log(`Running Showcase Validation for: ${slug}`);
console.log(`Path: ${restaurantDir}\n`);

let hasErrors = false;
const errors = [];

// 1. Validate restaurant.json
const metadataPath = path.join(restaurantDir, 'restaurant.json');
let metadata = {};
if (!fs.existsSync(metadataPath)) {
  errors.push(`Missing 'restaurant.json' metadata file.`);
  hasErrors = true;
} else {
  try {
    metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    console.log('✓ restaurant.json: Valid JSON');

    // Strict value checks for showcase
    if (metadata.stage !== 'showcase') {
      errors.push(`Showcase metadata 'stage' must be 'showcase'. Found: '${metadata.stage}'`);
      hasErrors = true;
    }
    if (metadata.status !== 'presentation-ready') {
      errors.push(`Showcase metadata 'status' must be 'presentation-ready'. Found: '${metadata.status}'`);
      hasErrors = true;
    }

    const requiredTrueFlags = [
      'desktopReviewed', 'mobileReviewed', 'linksVerified', 'contentVerified',
      'performanceReviewed', 'accessibilityReviewed', 'productionBuildPassed', 'approvedForPresentation'
    ];
    requiredTrueFlags.forEach(flag => {
      if (metadata[flag] !== true) {
        errors.push(`Quality check '${flag}' must be true in the showcase.`);
        hasErrors = true;
      }
    });

    if (metadata.currentWebsiteUrl && metadata.currentWebsiteUrl.trim() !== "") {
      if (metadata.comparisonButtonAdded !== true) {
        errors.push(`Quality check 'comparisonButtonAdded' must be true since a currentWebsiteUrl is configured.`);
        hasErrors = true;
      }
    }
  } catch (err) {
    errors.push(`Invalid JSON in 'restaurant.json': ${err.message}`);
    hasErrors = true;
  }
}

// 2. Validate registry file data/restaurants.json
const registryPath = path.join(showcaseRoot, 'data', 'restaurants.json');
if (!fs.existsSync(registryPath)) {
  errors.push(`Missing registry index file at '${registryPath}'`);
  hasErrors = true;
} else {
  try {
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    const entry = registry.find(e => e.slug === slug || e.id === slug);
    if (!entry) {
      errors.push(`Restaurant '${slug}' is not registered in data/restaurants.json`);
      hasErrors = true;
    } else {
      console.log('✓ registered in data/restaurants.json');
    }
  } catch (err) {
    errors.push(`Invalid JSON in registry index 'data/restaurants.json': ${err.message}`);
    hasErrors = true;
  }
}

// 3. Scan HTML Files
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  files.forEach(file => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = getFiles(restaurantDir);
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

if (htmlFiles.length === 0) {
  errors.push('No HTML files found in the restaurant folder.');
  hasErrors = true;
} else if (htmlFiles.length < 6) {
  errors.push(`Showcase sites must have at least 6 separate substantive HTML files. Found: ${htmlFiles.length}`);
  hasErrors = true;
}

const hasIndexHtml = htmlFiles.some(f => path.basename(f) === 'index.html');
if (!hasIndexHtml) {
  errors.push('Missing index.html home page.');
  hasErrors = true;
}

const placeholderRegexes = [
  /lorem\s+ipsum/i,
  /todo/i,
  /placeholder/i,
  /fixme/i,
  /insert\s+(here|text|details)/i,
  /\[name\]/i,
  /\[phone\]/i,
  /\[address\]/i
];

htmlFiles.forEach(htmlFile => {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const filename = path.basename(htmlFile);

  // Placeholders
  placeholderRegexes.forEach(regex => {
    const match = content.match(regex);
    if (match) {
      errors.push(`Placeholder text '${match[0]}' detected in '${filename}'`);
      hasErrors = true;
    }
  });

  // Dark Star Footer check
  if (!content.includes('darkstar-footer.js')) {
    errors.push(`Missing Dark Star Consulting footer badge script in '${filename}'`);
    hasErrors = true;
  }

  // Local references
  const srcMatches = content.matchAll(/src=["'](.*?)["']/g);
  const hrefMatches = content.matchAll(/href=["'](.*?)["']/g);

  const checkRef = (ref) => {
    if (
      ref.startsWith('http://') || 
      ref.startsWith('https://') || 
      ref.startsWith('//') ||
      ref.startsWith('mailto:') || 
      ref.startsWith('tel:') || 
      ref.startsWith('#') ||
      ref.startsWith('sms:') ||
      ref.trim() === ''
    ) {
      return;
    }

    const htmlDir = path.dirname(htmlFile);
    let resolvedPath;

    if (ref.includes('scripts/shared/comparison-button.js') || ref.includes('scripts/shared/darkstar-footer.js')) {
      resolvedPath = path.resolve(htmlDir, ref);
    } else {
      resolvedPath = path.join(htmlDir, ref);
    }

    const cleanPath = resolvedPath.split('?')[0].split('#')[0];
    if (!fs.existsSync(cleanPath)) {
      errors.push(`Broken reference: '${ref}' in '${filename}' (resolved path: ${cleanPath})`);
      hasErrors = true;
    }
  };

  for (const match of srcMatches) checkRef(match[1]);
  for (const match of hrefMatches) checkRef(match[1]);
});

// Summary
if (hasErrors) {
  console.error(`\n❌ Showcase Validation FAILED with ${errors.length} error(s):`);
  errors.forEach(err => console.error(`  [ERROR] ${err}`));
  process.exit(1);
} else {
  console.log('\n✓ Showcase Validation PASSED. Ready for presentation!');
  process.exit(0);
}
