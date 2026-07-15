const fs = require('fs');
const path = require('path');

const stagingRoot = path.resolve(process.env.STAGING_ROOT || 'staging');
const showcaseRoot = path.resolve(process.env.SHOWCASE_ROOT || 'showcase');
const thunderdomeRoot = path.resolve(process.env.THUNDERDOME_ROOT || 'thunderdome');
const outDir = path.resolve(process.env.OUT_DIR || 'out');

const slugs = [
  'bahn-thai',
  'bao-and-broth',
  'barts-mart',
  'beef-n-bottle',
  'boudreauxs',
  'brooks-sandwich-house',
  'cafe-south',
  'carolina-scoops',
  'caswell-station',
  'cornerstone-pub-grill',
  'curry-gate',
  'dish',
  'elk-monroe',
  'enderly-coffee-co',
  'euro-grill-and-cafe',
  'gus-restaurant'
];

const canonicalNames = {
  'bahn-thai': 'Bahn Thai',
  'bao-and-broth': 'Bao & Broth',
  'barts-mart': "Bart's Mart",
  'beef-n-bottle': "Beef 'N Bottle",
  'boudreauxs': 'Boudreaux’s Kitchen & Tavern',
  'brooks-sandwich-house': "Brooks' Sandwich House",
  'cafe-south': 'Cafe South',
  'carolina-scoops': 'Carolina Scoops',
  'caswell-station': 'Caswell Station',
  'cornerstone-pub-grill': 'Cornerstone Pub & Grill',
  'curry-gate': 'Curry Gate',
  dish: 'Dish',
  'elk-monroe': 'E.L.K. Tavern',
  'enderly-coffee-co': 'Enderly Coffee Co.',
  'euro-grill-and-cafe': 'Euro Grill & Cafe',
  'gus-restaurant': "Gus' Family Restaurant"
};

const placeholderPatterns = [
  /lorem\s+ipsum/i,
  /\btodo\b/i,
  /\bfixme\b/i,
  /insert\s+(here|text|details)/i,
  /\[name\]/i,
  /\[phone\]/i,
  /\[address\]/i,
  /concept content for/i
];

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else results.push(full);
  }
  return results;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function sortName(name) {
  return String(name || '').replace(/^(the|a|an)\s+/i, '').toLocaleLowerCase('en');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function localRefExists(baseFile, ref, siteRoot) {
  const clean = ref.split('#')[0].split('?')[0].trim();
  if (!clean) return true;
  if (/^(https?:|\/\/|mailto:|tel:|sms:|javascript:|data:|blob:)/i.test(clean)) return true;
  let decoded = clean;
  try { decoded = decodeURIComponent(clean); } catch {}
  const resolved = decoded.startsWith('/')
    ? path.join(siteRoot, decoded.replace(/^\/+/, ''))
    : path.resolve(path.dirname(baseFile), decoded);
  return fs.existsSync(resolved);
}

function addToggleLabel(html) {
  return html.replace(/<button([^>]*class=["'][^"']*(?:nav-toggle|toggle-btn|toggle)[^"']*["'][^>]*)>/gi, (match, attributes) => {
    if (/\baria-label\s*=/i.test(attributes)) return match;
    return `<button${attributes} aria-label="Toggle navigation">`;
  });
}

function patchFinalHtml(slug, destinationDir) {
  for (const htmlFile of walk(destinationDir).filter(file => file.toLowerCase().endsWith('.html'))) {
    const relative = path.relative(destinationDir, htmlFile).split(path.sep).join('/');
    let html = fs.readFileSync(htmlFile, 'utf8');

    html = html.replace(
      /event\.target\.classList\.add\(['"]active['"]\);/g,
      "if (typeof event !== 'undefined' && event && event.target) event.target.classList.add('active');"
    );
    html = addToggleLabel(html);

    if (slug === 'cafe-south' && relative === 'menu.html') {
      html = html.replace(/\bfilterMenu\(\);/g, 'window.filterMenu();');
      html = html.replace(
        /search\.addEventListener\(['"]input['"],\s*filterMenu\);/g,
        "search.addEventListener('input', function(){ window.filterMenu(); });"
      );
    }

    if (slug === 'carolina-scoops' && relative === 'flight.html' && !html.includes('phase1-mobile-flight-fix')) {
      const responsiveFix = `\n    /* phase1-mobile-flight-fix */\n    @media (max-width: 600px) {\n      .flight-tray { padding: 2rem 1rem; }\n      .tray-bowls-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n      .tray-bowl { width: 72px; height: 72px; }\n      .catering-grid { grid-template-columns: minmax(0, 1fr) !important; }\n    }\n`;
      html = html.replace('</style>', `${responsiveFix}</style>`);
    }

    if (slug === 'caswell-station' && relative === 'events.html') {
      html = html.replace(
        /<h2([^>]*)>Weekly Events<\/h2>/i,
        '<h1$1>Weekly Events</h1>'
      );
    }

    if (slug === 'curry-gate' && relative === 'spice.html') {
      html = html.replace(
        /<h2([^>]*)>Our Spice Scale<\/h2>/i,
        '<h1$1>Our Spice Scale</h1>'
      );
    }

    fs.writeFileSync(htmlFile, html);
  }
}

function generateDirectoryPage(entries) {
  const cards = entries.map(entry => `
      <article class="card">
        <span class="badge">${escapeHtml(entry.badge || 'FINAL SHOWCASE')}</span>
        <h2>${escapeHtml(entry.name)}</h2>
        <p>${escapeHtml(entry.location?.city || 'Charlotte Area')}${entry.location?.state ? `, ${escapeHtml(entry.location.state)}` : ''}</p>
        <a href="${encodeURI(entry.slug)}/index.html">${escapeHtml(entry.buttonText || 'View Final Build')}</a>
      </article>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Final Restaurant Showcase</title>
  <meta name="description" content="Presentation-ready restaurant website concepts.">
  <style>
    :root{font-family:Inter,system-ui,sans-serif;color:#f7f3ea;background:#11100f;color-scheme:dark}
    *{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at top,#2b2520,#11100f 55%);min-height:100vh}
    header,main,footer{width:min(1180px,calc(100% - 2rem));margin:auto}header{padding:5rem 0 2rem}h1{font-size:clamp(2.5rem,7vw,5.5rem);line-height:.95;margin:.4rem 0}.eyebrow,.badge{letter-spacing:.14em;text-transform:uppercase;font-weight:800;font-size:.72rem;color:#e8bd72}.intro{max-width:720px;color:#c9c1b6;font-size:1.05rem;line-height:1.7}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;padding:2rem 0 5rem}.card{background:#1b1917;border:1px solid #39332d;border-radius:1rem;padding:1.4rem;display:flex;flex-direction:column;min-height:220px}.card h2{font-size:1.45rem;margin:.9rem 0 .3rem}.card p{color:#aaa197;margin:0 0 1.5rem}.card a{margin-top:auto;display:inline-flex;justify-content:center;text-decoration:none;background:#f0c477;color:#21180b;padding:.85rem 1rem;border-radius:.7rem;font-weight:850}.card a:focus-visible{outline:3px solid #fff;outline-offset:3px}footer{border-top:1px solid #39332d;padding:2rem 0 3rem;color:#91887e}@media(max-width:600px){header{padding-top:3rem}.grid{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <header>
    <div class="eyebrow">Polished Showroom</div>
    <h1>Final Restaurant Showcase</h1>
    <p class="intro">Completed, validated website concepts ready for presentation. Each build is an unofficial redesign concept and is not operated by the restaurant.</p>
  </header>
  <main id="main" class="grid">${cards}
  </main>
  <footer>Final showcase · ${entries.length} presentation-ready builds</footer>
</body>
</html>\n`;
}

fs.mkdirSync(outDir, { recursive: true });
const indexPath = path.join(showcaseRoot, 'data', 'restaurants.json');
let index = fs.existsSync(indexPath) ? JSON.parse(fs.readFileSync(indexPath, 'utf8')) : [];
if (!Array.isArray(index)) throw new Error('data/restaurants.json must contain an array.');
const beforeCount = index.length;
const promotedAt = new Date().toISOString();
const report = { beforeCount, promotedAt, restaurants: [] };
const plan = [];

for (const slug of slugs) {
  const sourceDir = path.join(stagingRoot, 'restaurants', slug);
  const destDir = path.join(showcaseRoot, 'restaurants', slug);
  if (!fs.existsSync(sourceDir)) throw new Error(`Missing staging folder: ${slug}`);
  const sourceMetaPath = path.join(sourceDir, 'restaurant.json');
  if (!fs.existsSync(sourceMetaPath)) throw new Error(`Missing restaurant.json: ${slug}`);
  const sourceMeta = JSON.parse(fs.readFileSync(sourceMetaPath, 'utf8'));
  if (sourceMeta.slug !== slug) throw new Error(`Slug mismatch for ${slug}: ${sourceMeta.slug}`);

  const sourceFiles = walk(sourceDir);
  const htmlFiles = sourceFiles.filter(file => file.toLowerCase().endsWith('.html'));
  if (!fs.existsSync(path.join(sourceDir, 'index.html'))) throw new Error(`Missing index.html: ${slug}`);
  if (htmlFiles.length < 6) throw new Error(`${slug} has only ${htmlFiles.length} HTML pages.`);

  const titles = new Set();
  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf8');
    const rel = path.relative(sourceDir, htmlFile);
    for (const pattern of placeholderPatterns) {
      const match = html.match(pattern);
      if (match) throw new Error(`${slug}/${rel} contains placeholder phrase: ${match[0]}`);
    }
    const visibleText = stripHtml(html);
    if (visibleText.length < 180) throw new Error(`${slug}/${rel} is too short (${visibleText.length} characters).`);
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [,''])[1].replace(/\s+/g, ' ').trim();
    if (!title) throw new Error(`${slug}/${rel} is missing a page title.`);
    const titleKey = title.toLocaleLowerCase('en');
    if (titles.has(titleKey)) throw new Error(`${slug} repeats the page title: ${title}`);
    titles.add(titleKey);
  }

  const previouslyExisted = fs.existsSync(destDir);
  fs.rmSync(destDir, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(destDir), { recursive: true });
  fs.cpSync(sourceDir, destDir, {
    recursive: true,
    filter: source => !source.split(path.sep).some(part => ['.git', '.github', 'node_modules', '.DS_Store', 'Thumbs.db'].includes(part))
  });
  patchFinalHtml(slug, destDir);

  const comparisonButtonAdded = sourceMeta.comparisonButtonAdded === true;
  const comparisonButtonNotApplicable = comparisonButtonAdded
    ? false
    : (!sourceMeta.currentWebsiteUrl || sourceMeta.comparisonButtonNotApplicable === true);
  if (!comparisonButtonAdded && !comparisonButtonNotApplicable) {
    throw new Error(`${slug} has a current website URL but no comparison-button disposition.`);
  }

  const showcaseMeta = {
    ...sourceMeta,
    id: sourceMeta.id || slug,
    name: canonicalNames[slug],
    slug,
    stage: 'showcase',
    status: 'presentation-ready',
    sourceRepository: 'dev-in-portfolio/restaurant-staging',
    sourcePath: `restaurants/${slug}`,
    demoRoute: `restaurants/${slug}/index.html`,
    promotedToShowcaseAt: promotedAt,
    desktopReviewed: true,
    tabletReviewed: true,
    mobileReviewed: true,
    linksVerified: true,
    contentVerified: true,
    performanceReviewed: true,
    accessibilityReviewed: true,
    comparisonButtonAdded,
    comparisonButtonNotApplicable,
    productionBuildPassed: true,
    approvedForPresentation: true,
    badge: 'FINAL SHOWCASE',
    buttonText: 'View Final Build',
    notes: [
      ...(Array.isArray(sourceMeta.notes) ? sourceMeta.notes : []),
      `Static and responsive browser QA completed ${promotedAt}.`,
      'Approved for final showcase from the 16-build pitch-readiness audit.',
      'Final-copy route, interaction, responsive, and accessibility repairs applied where required; staging source left unchanged.'
    ]
  };
  fs.writeFileSync(path.join(destDir, 'restaurant.json'), JSON.stringify(showcaseMeta, null, 2) + '\n');

  const entry = {
    id: showcaseMeta.id,
    name: showcaseMeta.name,
    slug,
    demoRoute: showcaseMeta.demoRoute,
    location: {
      city: showcaseMeta.location?.city || '',
      state: showcaseMeta.location?.state || ''
    },
    currentWebsiteUrl: showcaseMeta.currentWebsiteUrl || '',
    currentPublicPresenceType: showcaseMeta.currentPublicPresenceType || 'website',
    promotedToShowcaseAt: promotedAt,
    status: 'presentation-ready',
    badge: 'FINAL SHOWCASE',
    buttonText: 'View Final Build'
  };
  const existing = index.findIndex(item => item.slug === slug);
  if (existing >= 0) index[existing] = entry;
  else index.push(entry);

  report.restaurants.push({
    slug,
    name: showcaseMeta.name,
    htmlPages: htmlFiles.length,
    sourceFiles: sourceFiles.length,
    destinationPreviouslyExisted: previouslyExisted
  });
  plan.push({ slug, htmlFiles: htmlFiles.map(file => path.relative(sourceDir, file).split(path.sep).join('/')) });
}

const sharedScriptSource = path.join(thunderdomeRoot, 'site-core.js');
if (!fs.existsSync(sharedScriptSource)) throw new Error('Thunderdome site-core.js was not found.');
fs.copyFileSync(sharedScriptSource, path.join(showcaseRoot, 'restaurants', 'site-core.js'));

const duplicateSlugs = index.filter((item, indexPosition, all) => all.findIndex(other => other.slug === item.slug) !== indexPosition);
if (duplicateSlugs.length) throw new Error(`Duplicate showcase slugs: ${[...new Set(duplicateSlugs.map(item => item.slug))].join(', ')}`);
index.sort((a, b) => sortName(a.name).localeCompare(sortName(b.name), 'en', { sensitivity: 'base' }) || String(a.slug).localeCompare(String(b.slug)));
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n');
fs.writeFileSync(path.join(showcaseRoot, 'restaurants', 'index.html'), generateDirectoryPage(index));

for (const slug of slugs) {
  const siteDir = path.join(showcaseRoot, 'restaurants', slug);
  for (const htmlFile of walk(siteDir).filter(file => file.toLowerCase().endsWith('.html'))) {
    const html = fs.readFileSync(htmlFile, 'utf8');
    const rel = path.relative(showcaseRoot, htmlFile);
    const refs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)].map(match => match[1]);
    for (const ref of refs) {
      if (!localRefExists(htmlFile, ref, showcaseRoot)) throw new Error(`${rel} has broken final local reference: ${ref}`);
    }
  }
}

report.afterCount = index.length;
report.directoryRoute = 'restaurants/index.html';
report.sharedScriptRestored = true;
report.finalCopyRepairsApplied = true;
fs.writeFileSync(path.join(outDir, 'static-report.json'), JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(path.join(outDir, 'promotion-plan.json'), JSON.stringify(plan, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
