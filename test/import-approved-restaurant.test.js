const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const scriptsSource = path.join(repoRoot, 'scripts');

let testRoot, stagingDir, showcaseDir, scriptPath;

function runPromote(args) {
  const cmd = `node "${scriptPath}" ${args}`;
  try {
    const stdout = execSync(cmd, {
      cwd: showcaseDir,
      encoding: 'utf8',
      timeout: 10000,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return { exitCode: 0, stdout, stderr: '' };
  } catch (err) {
    return {
      exitCode: err.status ?? 1,
      stdout: err.stdout || '',
      stderr: err.stderr || ''
    };
  }
}

function createStagingRestaurant(slug, files) {
  const dir = path.join(stagingDir, 'restaurants', slug);
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    const filePath = path.join(dir, name);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function approvedMetadata(slug, overrides) {
  const meta = {
    id: slug,
    name: 'Test Restaurant',
    slug: slug,
    location: { city: 'Test', state: 'TS', address: '123 Test St' },
    stage: 'staging',
    status: 'approved',
    sourceRepository: 'dev-in-portfolio/restaurant-staging',
    sourcePath: 'restaurants/' + slug,
    currentWebsiteUrl: 'https://example.com',
    currentPublicPresenceType: 'website',
    demoRoute: 'restaurants/' + slug + '/index.html',
    informationVerifiedAt: new Date().toISOString(),
    promotedToStagingAt: new Date().toISOString(),
    promotedToShowcaseAt: null,
    desktopReviewed: true,
    tabletReviewed: true,
    mobileReviewed: true,
    linksVerified: true,
    contentVerified: true,
    performanceReviewed: true,
    accessibilityReviewed: true,
    comparisonButtonAdded: true,
    comparisonButtonNotApplicable: false,
    productionBuildPassed: true,
    approvedForPresentation: true,
    notes: ['Fully reviewed and approved']
  };
  return { ...meta, ...overrides };
}

describe('Import Approved Restaurant (Showcase Promotion)', () => {
  before(() => {
    testRoot = fs.mkdtempSync(path.join(repoRoot, 'tmp-test-import-'));
    stagingDir = path.join(testRoot, 'staging');
    showcaseDir = path.join(testRoot, 'showcase');

    fs.mkdirSync(path.join(stagingDir, 'restaurants'), { recursive: true });
    fs.mkdirSync(path.join(stagingDir, 'data'), { recursive: true });

    fs.mkdirSync(path.join(showcaseDir, 'scripts'), { recursive: true });
    fs.mkdirSync(path.join(showcaseDir, 'restaurants'), { recursive: true });
    fs.mkdirSync(path.join(showcaseDir, 'data'), { recursive: true });

    scriptPath = path.join(showcaseDir, 'scripts', 'import-approved-restaurant.js');
    const scriptContent = fs.readFileSync(path.join(scriptsSource, 'import-approved-restaurant.js'), 'utf8');
    fs.writeFileSync(scriptPath, scriptContent, 'utf8');

    fs.writeFileSync(path.join(showcaseDir, 'data', 'restaurants.json'), '[]\n', 'utf8');
  });

  after(() => {
    fs.rmSync(testRoot, { recursive: true, force: true });
  });

  it('shows help output with --help flag', () => {
    const result = runPromote('--help');
    assert.equal(result.exitCode, 0);
    assert.ok(result.stdout.includes('Usage:'));
    assert.ok(result.stdout.includes('--restaurant'));
  });

  it('exits nonzero when --restaurant is missing', () => {
    const result = runPromote('');
    assert.notEqual(result.exitCode, 0);
    assert.ok(result.stdout.includes('--restaurant'));
  });

  it('exits nonzero when source does not exist', () => {
    const result = runPromote('--restaurant nonexistent --source "' + stagingDir + '"');
    assert.notEqual(result.exitCode, 0);
    assert.ok(result.stderr.includes('Error'));
  });

  it('promotes an approved restaurant successfully', () => {
    const slug = 'approved-restaurant';
    createStagingRestaurant(slug, {
      'restaurant.json': JSON.stringify(approvedMetadata(slug), null, 2),
      'index.html': '<html><body><h1>Home</h1><a href="menu.html">Menu</a></body></html>',
      'menu.html': '<html><body><h1>Menu</h1><a href="index.html">Home</a></body></html>',
      'about.html': '<html><body><h1>About</h1></body></html>',
      'contact.html': '<html><body><h1>Contact</h1></body></html>',
      'order.html': '<html><body><h1>Order</h1></body></html>',
      'events.html': '<html><body><h1>Events</h1></body></html>'
    });

    const result = runPromote('--restaurant ' + slug + ' --source "' + stagingDir + '"');
    assert.equal(result.exitCode, 0);
    assert.ok(result.stdout.includes('completed successfully'));

    const destDir = path.join(showcaseDir, 'restaurants', slug);
    assert.ok(fs.existsSync(destDir), 'destination should exist');
    assert.ok(fs.existsSync(path.join(destDir, 'restaurant.json')), 'metadata should exist');
    const meta = JSON.parse(fs.readFileSync(path.join(destDir, 'restaurant.json'), 'utf8'));
    assert.equal(meta.stage, 'showcase');
    assert.equal(meta.status, 'presentation-ready');
    assert.ok(meta.promotedToShowcaseAt);

    const index = JSON.parse(fs.readFileSync(path.join(showcaseDir, 'data', 'restaurants.json'), 'utf8'));
    assert.equal(index.length, 1);
    assert.equal(index[0].slug, slug);
  });

  it('rejects promotion when status is not approved', () => {
    const slug = 'not-approved';
    createStagingRestaurant(slug, {
      'restaurant.json': JSON.stringify(approvedMetadata(slug, { status: 'ready-for-polish' }), null, 2),
      'index.html': '<html><body><h1>Home</h1></body></html>'
    });
    const result = runPromote('--restaurant ' + slug + ' --source "' + stagingDir + '"');
    assert.notEqual(result.exitCode, 0);
    assert.ok(result.stderr.includes('status') || result.stdout.includes('status'));
  });

  it('rejects promotion when review flags are incomplete', () => {
    const slug = 'incomplete-flags';
    createStagingRestaurant(slug, {
      'restaurant.json': JSON.stringify(approvedMetadata(slug, { desktopReviewed: false }), null, 2),
      'index.html': '<html><body><h1>Home</h1></body></html>'
    });
    const result = runPromote('--restaurant ' + slug + ' --source "' + stagingDir + '"');
    assert.notEqual(result.exitCode, 0);
    assert.ok(result.stderr.includes('desktopReviewed') || result.stdout.includes('desktopReviewed'));
  });

  it('refuses overwrite without --update flag', () => {
    const slug = 'no-overwrite';
    createStagingRestaurant(slug, {
      'restaurant.json': JSON.stringify(approvedMetadata(slug), null, 2),
      'index.html': '<html><body><h1>Home</h1></body></html>',
      'about.html': '<html><body><h1>About</h1></body></html>',
      'menu.html': '<html><body><h1>Menu</h1></body></html>',
      'contact.html': '<html><body><h1>Contact</h1></body></html>',
      'order.html': '<html><body><h1>Order</h1></body></html>',
      'events.html': '<html><body><h1>Events</h1></body></html>'
    });

    const destDir = path.join(showcaseDir, 'restaurants', slug);
    fs.mkdirSync(destDir, { recursive: true });

    const result = runPromote('--restaurant ' + slug + ' --source "' + stagingDir + '"');
    assert.notEqual(result.exitCode, 0);
    assert.ok(result.stderr.includes('already exists'));
  });

  it('dry run does not write any files', () => {
    const slug = 'dry-run-test';
    createStagingRestaurant(slug, {
      'restaurant.json': JSON.stringify(approvedMetadata(slug), null, 2),
      'index.html': '<html><body><h1>Home</h1></body></html>',
      'about.html': '<html><body><h1>About</h1></body></html>',
      'menu.html': '<html><body><h1>Menu</h1></body></html>',
      'contact.html': '<html><body><h1>Contact</h1></body></html>',
      'order.html': '<html><body><h1>Order</h1></body></html>',
      'events.html': '<html><body><h1>Events</h1></body></html>'
    });

    const destDir = path.join(showcaseDir, 'restaurants', slug);

    const result = runPromote('--restaurant ' + slug + ' --source "' + stagingDir + '" --dry-run');
    assert.equal(result.exitCode, 0);
    assert.ok(result.stdout.includes('DRY RUN'));
    assert.equal(fs.existsSync(destDir), false, 'dry run should not create destination');
  });

  it('rejects promotion with placeholder content', () => {
    const slug = 'placeholder-test';
    createStagingRestaurant(slug, {
      'restaurant.json': JSON.stringify(approvedMetadata(slug), null, 2),
      'index.html': '<html><body><h1>Lorem Ipsum</h1></body></html>'
    });
    const result = runPromote('--restaurant ' + slug + ' --source "' + stagingDir + '"');
    assert.notEqual(result.exitCode, 0);
  });

  it('rejects promotion with broken local references', () => {
    const slug = 'broken-assets';
    createStagingRestaurant(slug, {
      'restaurant.json': JSON.stringify(approvedMetadata(slug), null, 2),
      'index.html': '<html><body><img src="missing.jpg"></body></html>'
    });
    const result = runPromote('--restaurant ' + slug + ' --source "' + stagingDir + '"');
    assert.notEqual(result.exitCode, 0);
  });

  it('updates showroom index correctly', () => {
    fs.writeFileSync(path.join(showcaseDir, 'data', 'restaurants.json'), '[]\n', 'utf8');
    const slug1 = 'alpha-restaurant';
    createStagingRestaurant(slug1, {
      'restaurant.json': JSON.stringify(approvedMetadata(slug1), null, 2),
      'index.html': '<html><body><h1>Alpha</h1></body></html>',
      'about.html': '<html><body><h1>About</h1></body></html>',
      'menu.html': '<html><body><h1>Menu</h1></body></html>',
      'contact.html': '<html><body><h1>Contact</h1></body></html>',
      'order.html': '<html><body><h1>Order</h1></body></html>',
      'events.html': '<html><body><h1>Events</h1></body></html>'
    });
    const r1 = runPromote('--restaurant ' + slug1 + ' --source "' + stagingDir + '"');
    assert.equal(r1.exitCode, 0);

    const slug2 = 'beta-restaurant';
    createStagingRestaurant(slug2, {
      'restaurant.json': JSON.stringify(approvedMetadata(slug2), null, 2),
      'index.html': '<html><body><h1>Beta</h1></body></html>',
      'about.html': '<html><body><h1>About</h1></body></html>',
      'menu.html': '<html><body><h1>Menu</h1></body></html>',
      'contact.html': '<html><body><h1>Contact</h1></body></html>',
      'order.html': '<html><body><h1>Order</h1></body></html>',
      'events.html': '<html><body><h1>Events</h1></body></html>'
    });
    const r2 = runPromote('--restaurant ' + slug2 + ' --source "' + stagingDir + '"');
    assert.equal(r2.exitCode, 0);

    const index = JSON.parse(fs.readFileSync(path.join(showcaseDir, 'data', 'restaurants.json'), 'utf8'));
    assert.equal(index.length, 2);
    assert.equal(index[0].slug, 'alpha-restaurant');
    assert.equal(index[1].slug, 'beta-restaurant');
  });
});
