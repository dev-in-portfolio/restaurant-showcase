// Showcase Validation Script
// Usage: npm run validate -- --restaurant <restaurant-slug>
//        npm run validate:all

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
const showcaseRoot = path.resolve(__dirname, '..');

function validateRestaurant(slug) {
  const restaurantDir = path.join(showcaseRoot, 'restaurants', slug);
  let hasErrors = false;
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(restaurantDir)) {
    return { hasErrors: true, errors: [`Restaurant directory does not exist at '${restaurantDir}'`], warnings: [] };
  }

  // 1. Validate restaurant.json
  const metadataPath = path.join(restaurantDir, 'restaurant.json');
  let metadata = {};
  if (!fs.existsSync(metadataPath)) {
    errors.push('Missing restaurant.json metadata file.');
    hasErrors = true;
  } else {
    try {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

      if (metadata.stage !== 'showcase') {
        errors.push(`Metadata 'stage' must be "showcase". Found: "${metadata.stage}"`);
        hasErrors = true;
      }
      if (metadata.status !== 'presentation-ready') {
        errors.push(`Metadata 'status' must be "presentation-ready". Found: "${metadata.status}"`);
        hasErrors = true;
      }

      const requiredFlags = [
        'desktopReviewed', 'tabletReviewed', 'mobileReviewed',
        'linksVerified', 'contentVerified', 'performanceReviewed',
        'accessibilityReviewed', 'productionBuildPassed', 'approvedForPresentation'
      ];
      requiredFlags.forEach(flag => {
        if (metadata[flag] !== true) {
          errors.push(`Required review flag '${flag}' is not true.`);
          hasErrors = true;
        }
      });

      const cb = metadata.comparisonButtonAdded;
      const cbna = metadata.comparisonButtonNotApplicable;
      if (cb !== true && cbna !== true) {
        errors.push(`Either 'comparisonButtonAdded' or 'comparisonButtonNotApplicable' must be true.`);
        hasErrors = true;
      }

      if (!metadata.id || !metadata.name || !metadata.slug) {
        errors.push('Missing required fields: id, name, slug.');
        hasErrors = true;
      }

      const allowedPresenceTypes = ['website', 'facebook', 'instagram', 'opentable', 'doordash',
        'ubereats', 'grubhub', 'google-business-profile', 'directory-listing', 'other', 'none'];
      if (metadata.currentPublicPresenceType && !allowedPresenceTypes.includes(metadata.currentPublicPresenceType)) {
        errors.push(`Invalid currentPublicPresenceType: "${metadata.currentPublicPresenceType}"`);
        hasErrors = true;
      }

      if (!metadata.promotedToShowcaseAt) {
        errors.push('Missing promotedToShowcaseAt timestamp.');
        hasErrors = true;
      }
    } catch (err) {
      errors.push(`Invalid JSON in restaurant.json: ${err.message}`);
      hasErrors = true;
    }
  }

  // 2. Check index.html
  if (!fs.existsSync(path.join(restaurantDir, 'index.html'))) {
    errors.push('Missing index.html.');
    hasErrors = true;
  }

  // 3. Scan files
  function getFiles(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return []; }
    const results = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== '.git' && entry.name !== 'node_modules') {
          results.push(...getFiles(fullPath));
        }
      } else {
        results.push(fullPath);
      }
    }
    return results;
  }

  const allFiles = getFiles(restaurantDir);
  const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

  if (htmlFiles.length === 0) {
    errors.push('No HTML files found.');
    hasErrors = true;
  }

  // 4. Check placeholders
  const placeholderPatterns = [
    /lorem\s+ipsum/i, /todo/i, /\bplaceholder\b(?!\s*=)/i, /fixme/i,
    /insert\s+(here|text|details)/i, /\[name\]/i, /\[phone\]/i, /\[address\]/i
  ];

  for (const htmlFile of htmlFiles) {
    const content = fs.readFileSync(htmlFile, 'utf8');
    const relPath = path.relative(restaurantDir, htmlFile);
    const searchableContent = content
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ');
    for (const pattern of placeholderPatterns) {
      const match = searchableContent.match(pattern);
      if (match) {
        errors.push(`Placeholder '${match[0]}' in '${relPath}'`);
        hasErrors = true;
      }
    }
  }

  // 5. Check broken local references
  for (const htmlFile of htmlFiles) {
    const content = fs.readFileSync(htmlFile, 'utf8');
    const relPath = path.relative(restaurantDir, htmlFile);
    const refs = [
      ...content.matchAll(/src=["'](.*?)["']/g),
      ...content.matchAll(/href=["'](.*?)["']/g)
    ];
    for (const match of refs) {
      const ref = match[1];
      if (ref.startsWith('http://') || ref.startsWith('https://') || ref.startsWith('//') ||
          ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('#') ||
          ref.startsWith('sms:') || ref.trim() === '') continue;
      const resolvedPath = path.resolve(path.dirname(htmlFile), ref).split('?')[0].split('#')[0];
      if (!fs.existsSync(resolvedPath)) {
        errors.push(`Broken reference '${ref}' in '${relPath}'`);
        hasErrors = true;
      }
    }
  }

  // 6. Check for temporary files
  const tempPatterns = [/\.tmp$/i, /~$/, /^\.#/, /#.*#$/];
  for (const filePath of allFiles) {
    const name = path.basename(filePath);
    for (const pattern of tempPatterns) {
      if (pattern.test(name)) {
        errors.push(`Temporary file '${name}'`);
        hasErrors = true;
      }
    }
  }

  // 7. Validate showroom index
  const indexFile = path.join(showcaseRoot, 'data', 'restaurants.json');
  if (fs.existsSync(indexFile)) {
    try {
      const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
      if (!Array.isArray(index)) {
        warnings.push('restaurants.json is not an array.');
      } else {
        const entries = index.filter(e => e.slug === slug);
        if (entries.length === 0) {
          warnings.push(`No showroom index entry found for '${slug}'.`);
        } else if (entries.length > 1) {
          errors.push(`Duplicate showroom index entries for '${slug}'.`);
          hasErrors = true;
        }
        const duplicateSlugs = index.filter((e, i, a) => a.findIndex(x => x.slug === e.slug) !== i);
        if (duplicateSlugs.length > 0) {
          errors.push(`Duplicate slugs in showroom index: ${[...new Set(duplicateSlugs.map(x => x.slug))].join(', ')}`);
          hasErrors = true;
        }
      }
    } catch (err) {
      warnings.push(`Could not parse restaurants.json: ${err.message}`);
    }
  } else {
    warnings.push('showroom index file not found at data/restaurants.json.');
  }

  return { hasErrors, errors, warnings };
}

if (args.all) {
  const restaurantsDir = path.join(showcaseRoot, 'restaurants');
  let slugs = [];
  if (fs.existsSync(restaurantsDir)) {
    slugs = fs.readdirSync(restaurantsDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('.'))
      .map(d => d.name);
  }

  if (slugs.length === 0) {
    console.log('No restaurants found in showcase. Validation passed.');
    process.exit(0);
  }

  let overallErrors = false;
  for (const slug of slugs) {
    console.log(`\n=== Validating: ${slug} ===`);
    const result = validateRestaurant(slug);
    if (result.warnings.length > 0) {
      result.warnings.forEach(w => console.log(`  [WARN] ${w}`));
    }
    if (result.hasErrors) {
      result.errors.forEach(e => console.error(`  [ERROR] ${e}`));
      overallErrors = true;
    } else {
      console.log('  ✓ PASSED');
    }
  }
  if (overallErrors) {
    console.error('\n❌ Some validations FAILED.');
    process.exit(1);
  } else {
    console.log('\n✓ All validations PASSED.');
    process.exit(0);
  }
} else if (args["restaurant"]) {
  const slug = args["restaurant"];
  console.log(`Running validation for: ${slug}`);
  const result = validateRestaurant(slug);
  if (result.warnings.length > 0) {
    console.log(`\nWarnings (${result.warnings.length}):`);
    result.warnings.forEach(w => console.log(`  [WARN] ${w}`));
  }
  if (result.hasErrors) {
    console.error(`\nErrors (${result.errors.length}):`);
    result.errors.forEach(e => console.error(`  [ERROR] ${e}`));
    console.error('\n❌ Validation FAILED.');
    process.exit(1);
  } else {
    console.log('\n✓ Validation PASSED.');
    process.exit(0);
  }
} else if (args.help) {
  console.log(`
Showcase Validation Script

Usage:
  npm run validate -- --restaurant <restaurant-slug>
  npm run validate:all

Options:
  --restaurant <slug>     Validate a specific restaurant in the showcase.
  --all                   Validate all restaurants in the showcase.
  --help                  Show this help message.
  `);
} else {
  console.error('Usage: npm run validate -- --restaurant <slug>');
  console.error('       npm run validate:all');
  process.exit(1);
}
