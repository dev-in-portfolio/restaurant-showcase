// Staging to Showcase Promotion Script (Import Approved Restaurant)
// Usage: npm run promote:showcase -- --restaurant <restaurant-slug> [--update] [--source <path>]

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
Staging to Showcase Promotion Script

Usage:
  npm run promote:showcase -- --restaurant <restaurant-slug> [options]

Required:
  --restaurant <slug>     The folder slug of the restaurant inside staging.

Options:
  --update                Overwrite the restaurant folder in the showcase if it already exists.
  --source <path>         Path to the local staging repository (defaults to '../restaurant-staging').
  --help                  Show this help message.
  `);
  process.exit(!args.restaurant && !args.help ? 1 : 0);
}

const slug = args.restaurant;
const updateMode = !!args.update;
const stagingRoot = path.resolve(args.source || '../restaurant-staging');
const sourceDir = path.join(stagingRoot, 'restaurants', slug);
const showcaseRoot = path.resolve(__dirname, '..');
const destDir = path.join(showcaseRoot, 'restaurants', slug);

console.log(`Promoting restaurant to Showcase: ${slug}`);
console.log(`Source (Staging):   ${sourceDir}`);
console.log(`Destination (Show): ${destDir}\n`);

// 1. Check if source folder exists
if (!fs.existsSync(sourceDir)) {
  console.error(`Error: Source restaurant does not exist in staging at '${sourceDir}'`);
  process.exit(1);
}

// 2. Overwrite check
if (fs.existsSync(destDir) && !updateMode) {
  console.error(`Error: Restaurant '${slug}' already exists in the showcase.`);
  console.error(`Use --update flag to overwrite the existing showcase files.`);
  process.exit(1);
}

// 3. Read metadata from staging
const metadataPath = path.join(sourceDir, 'restaurant.json');
if (!fs.existsSync(metadataPath)) {
  console.error(`Error: Metadata file 'restaurant.json' is missing in staging at '${metadataPath}'`);
  process.exit(1);
}

let metadata = {};
try {
  metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
} catch (err) {
  console.error(`Error: Failed to parse staging restaurant.json: ${err.message}`);
  process.exit(1);
}

// 4. Verify all checklist fields are true
const requiredTrueFlags = [
  'desktopReviewed',
  'mobileReviewed',
  'linksVerified',
  'contentVerified',
  'performanceReviewed',
  'accessibilityReviewed',
  'productionBuildPassed',
  'approvedForPresentation'
];

const failedFlags = [];
requiredTrueFlags.forEach(flag => {
  if (metadata[flag] !== true) {
    failedFlags.push(flag);
  }
});

// Check comparison button: must be true unless website is none/empty
const comparisonButtonAdded = metadata.comparisonButtonAdded;
if (metadata.currentWebsiteUrl && metadata.currentWebsiteUrl.trim() !== "") {
  if (comparisonButtonAdded !== true) {
    failedFlags.push('comparisonButtonAdded');
  }
}

if (failedFlags.length > 0) {
  console.error('❌ Error: Promotion rejected. The following quality checks must be verified and set to true in restaurant.json:');
  failedFlags.forEach(flag => console.error(`  - ${flag}`));
  process.exit(1);
}

// 5. Gather all staging files
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

const allFiles = getFiles(sourceDir);
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

// 6. Enforce zero placeholders in HTML files
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

const foundPlaceholders = [];
htmlFiles.forEach(htmlFile => {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const filename = path.basename(htmlFile);

  placeholderRegexes.forEach(regex => {
    const match = content.match(regex);
    if (match) {
      foundPlaceholders.push(`Placeholder '${match[0]}' in '${filename}'`);
    }
  });
});

if (foundPlaceholders.length > 0) {
  console.error('❌ Error: Promotion rejected. Placeholders were detected in HTML files:');
  foundPlaceholders.forEach(ph => console.error(`  - ${ph}`));
  process.exit(1);
}

// 7. Enforce 6-page minimum standard
if (htmlFiles.length < 6) {
  console.error(`❌ Error: Promotion rejected. Showcase requires a minimum of 6 substantive pages. Found: ${htmlFiles.length}`);
  process.exit(1);
}

// 8. Enforce local references integrity
const brokenRefs = [];
htmlFiles.forEach(htmlFile => {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const filename = path.basename(htmlFile);
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

    // Special allowance for shared showcase scripts
    if (ref.includes('scripts/shared/comparison-button.js') || ref.includes('scripts/shared/darkstar-footer.js')) {
      resolvedPath = path.resolve(htmlDir, ref);
    } else {
      resolvedPath = path.join(htmlDir, ref);
    }

    const cleanPath = resolvedPath.split('?')[0].split('#')[0];
    if (!fs.existsSync(cleanPath)) {
      brokenRefs.push(`Broken reference: '${ref}' in '${filename}'`);
    }
  };

  for (const match of srcMatches) checkRef(match[1]);
  for (const match of hrefMatches) checkRef(match[1]);
});

if (brokenRefs.length > 0) {
  console.error('❌ Error: Promotion rejected. Broken local references were detected:');
  brokenRefs.forEach(br => console.error(`  - ${br}`));
  process.exit(1);
}

// 9. Perform file copy & Dark Star footer injection
console.log('Quality validation passed. Copying files...');
fs.mkdirSync(destDir, { recursive: true });

allFiles.forEach(file => {
  const relative = path.relative(sourceDir, file);
  const destFile = path.join(destDir, relative);
  
  if (path.basename(file) === 'restaurant.json') {
    return; // Don't copy raw json yet, we will write updated one below
  }
  
  fs.mkdirSync(path.dirname(destFile), { recursive: true });

  if (file.endsWith('.html')) {
    let htmlContent = fs.readFileSync(file, 'utf8');
    if (!htmlContent.includes('darkstar-footer.js')) {
      const scriptTag = '\n  <!-- Dark Star Consulting Footer Badge -->\n  <script src="../../scripts/shared/darkstar-footer.js"></script>\n';
      if (htmlContent.includes('</body>')) {
        htmlContent = htmlContent.replace('</body>', `${scriptTag}</body>`);
      } else {
        htmlContent += scriptTag;
      }
    }
    fs.writeFileSync(destFile, htmlContent, 'utf8');
  } else {
    fs.copyFileSync(file, destFile);
  }
});

// 10. Update restaurant.json values for Showcase
const updatedMetadata = {
  ...metadata,
  stage: "showcase",
  status: "presentation-ready",
  promotedToShowcaseAt: new Date().toISOString(),
  sourceRepository: "dev-in-portfolio/restaurant-staging",
  sourcePath: `restaurants/${slug}`
};

const destMetadataPath = path.join(destDir, 'restaurant.json');
fs.writeFileSync(destMetadataPath, JSON.stringify(updatedMetadata, null, 2), 'utf8');
console.log(`✓ Generated updated Showcase metadata at '${destMetadataPath}'`);

// 11. Update registry data/restaurants.json
const registryPath = path.join(showcaseRoot, 'data', 'restaurants.json');
let registry = [];
if (fs.existsSync(registryPath)) {
  try {
    registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  } catch (err) {
    console.warn(`Warning: Could not parse registry file data/restaurants.json (${err.message}). Re-initializing...`);
  }
}

const existingEntryIndex = registry.findIndex(entry => entry.slug === slug || entry.id === slug);
const registryEntry = {
  id: updatedMetadata.id,
  name: updatedMetadata.name,
  slug: updatedMetadata.slug,
  cuisine: updatedMetadata.notes?.[0]?.includes('cuisine') ? '' : '', // Placeholder, we can read from tags or parsed info
  location: updatedMetadata.location,
  currentWebsiteUrl: updatedMetadata.currentWebsiteUrl,
  currentPublicPresenceType: updatedMetadata.currentPublicPresenceType,
  demoRoute: updatedMetadata.demoRoute,
  promotedToShowcaseAt: updatedMetadata.promotedToShowcaseAt
};

if (existingEntryIndex > -1) {
  registry[existingEntryIndex] = registryEntry;
  console.log(`✓ Updated existing registry entry in data/restaurants.json`);
} else {
  registry.push(registryEntry);
  console.log(`✓ Added new entry to data/restaurants.json`);
}

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
console.log('✓ Registry index successfully updated.');
console.log('\n🎉 Showcase promotion completed successfully.');
