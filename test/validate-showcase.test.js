const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const scriptsSource = path.join(repoRoot, 'scripts');

let testRoot, testScriptsDir;

function runValidate(args) {
  const cmd = `node "${path.join(testScriptsDir, 'validate-showcase.js')}" ${args}`;
  try {
    const stdout = execSync(cmd, {
      cwd: testRoot,
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

function showcaseMetadata(slug, overrides) {
  const meta = {
    id: slug,
    name: 'Showcase Restaurant',
    slug: slug,
    location: { city: 'Test', state: 'TS', address: '123 Test St' },
    stage: 'showcase',
    status: 'presentation-ready',
    sourceRepository: 'dev-in-portfolio/restaurant-staging',
    sourcePath: 'restaurants/' + slug,
    currentWebsiteUrl: 'https://example.com',
    currentPublicPresenceType: 'website',
    demoRoute: 'restaurants/' + slug + '/index.html',
    informationVerifiedAt: new Date().toISOString(),
    promotedToStagingAt: new Date().toISOString(),
    promotedToShowcaseAt: new Date().toISOString(),
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
    notes: ['Showcase entry']
  };
  return { ...meta, ...overrides };
}

function createShowcaseDir(slug, files) {
  const dir = path.join(testRoot, 'restaurants', slug);
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    const filePath = path.join(dir, name);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

describe('Validate Showcase', () => {
  before(() => {
    testRoot = fs.mkdtempSync(path.join(repoRoot, 'tmp-test-val-showcase-'));
    testScriptsDir = path.join(testRoot, 'scripts');

    fs.mkdirSync(testScriptsDir, { recursive: true });
    fs.mkdirSync(path.join(testRoot, 'restaurants'), { recursive: true });
    fs.mkdirSync(path.join(testRoot, 'data'), { recursive: true });

    const scriptContent = fs.readFileSync(path.join(scriptsSource, 'validate-showcase.js'), 'utf8');
    fs.writeFileSync(path.join(testScriptsDir, 'validate-showcase.js'), scriptContent, 'utf8');
  });

  after(() => {
    fs.rmSync(testRoot, { recursive: true, force: true });
  });

  it('--all passes when showcase is empty', () => {
    const result = runValidate('--all');
    assert.equal(result.exitCode, 0);
    assert.ok(result.stdout.includes('No restaurants'));
  });

  it('passes for a valid showcase restaurant', () => {
    const slug = 'valid-showcase';
    createShowcaseDir(slug, {
      'restaurant.json': JSON.stringify(showcaseMetadata(slug), null, 2),
      'index.html': '<html><body><h1>Home</h1></body></html>'
    });
    const indexEntry = { slug: slug, name: 'Valid Showcase' };
    fs.writeFileSync(
      path.join(testRoot, 'data', 'restaurants.json'),
      JSON.stringify([indexEntry], null, 2) + '\n',
      'utf8'
    );
    const result = runValidate('--restaurant ' + slug);
    assert.equal(result.exitCode, 0);
    assert.ok(result.stdout.includes('PASSED'));
  });

  it('fails when stage is not showcase', () => {
    const slug = 'wrong-stage';
    createShowcaseDir(slug, {
      'restaurant.json': JSON.stringify(showcaseMetadata(slug, { stage: 'staging' }), null, 2),
      'index.html': '<html><body><h1>Home</h1></body></html>'
    });
    const indexEntry = { slug: slug };
    fs.writeFileSync(
      path.join(testRoot, 'data', 'restaurants.json'),
      JSON.stringify([indexEntry], null, 2) + '\n',
      'utf8'
    );
    const result = runValidate('--restaurant ' + slug);
    assert.notEqual(result.exitCode, 0);
  });

  it('fails when status is not presentation-ready', () => {
    const slug = 'wrong-status';
    createShowcaseDir(slug, {
      'restaurant.json': JSON.stringify(showcaseMetadata(slug, { status: 'approved' }), null, 2),
      'index.html': '<html><body><h1>Home</h1></body></html>'
    });
    const indexEntry = { slug: slug };
    fs.writeFileSync(
      path.join(testRoot, 'data', 'restaurants.json'),
      JSON.stringify([indexEntry], null, 2) + '\n',
      'utf8'
    );
    const result = runValidate('--restaurant ' + slug);
    assert.notEqual(result.exitCode, 0);
  });

  it('fails when review flags are not all true', () => {
    const slug = 'missing-flags';
    createShowcaseDir(slug, {
      'restaurant.json': JSON.stringify(showcaseMetadata(slug, { desktopReviewed: false }), null, 2),
      'index.html': '<html><body><h1>Home</h1></body></html>'
    });
    const indexEntry = { slug: slug };
    fs.writeFileSync(
      path.join(testRoot, 'data', 'restaurants.json'),
      JSON.stringify([indexEntry], null, 2) + '\n',
      'utf8'
    );
    const result = runValidate('--restaurant ' + slug);
    assert.notEqual(result.exitCode, 0);
  });

  it('detects broken references', () => {
    const slug = 'broken-refs';
    createShowcaseDir(slug, {
      'restaurant.json': JSON.stringify(showcaseMetadata(slug), null, 2),
      'index.html': '<html><body><img src="gone.jpg"></body></html>'
    });
    const indexEntry = { slug: slug };
    fs.writeFileSync(
      path.join(testRoot, 'data', 'restaurants.json'),
      JSON.stringify([indexEntry], null, 2) + '\n',
      'utf8'
    );
    const result = runValidate('--restaurant ' + slug);
    assert.notEqual(result.exitCode, 0);
  });

  it('detects placeholder content', () => {
    const slug = 'placeholder-fail';
    createShowcaseDir(slug, {
      'restaurant.json': JSON.stringify(showcaseMetadata(slug), null, 2),
      'index.html': '<html><body><h1>Placeholder text here</h1></body></html>'
    });
    const indexEntry = { slug: slug };
    fs.writeFileSync(
      path.join(testRoot, 'data', 'restaurants.json'),
      JSON.stringify([indexEntry], null, 2) + '\n',
      'utf8'
    );
    const result = runValidate('--restaurant ' + slug);
    assert.notEqual(result.exitCode, 0);
  });
});
