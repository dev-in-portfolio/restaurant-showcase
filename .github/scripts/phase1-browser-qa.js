const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const outDir = path.resolve(process.env.OUT_DIR || 'out');
const plan = JSON.parse(fs.readFileSync(path.join(outDir, 'promotion-plan.json'), 'utf8'));
const baseUrl = process.env.SHOWCASE_BASE_URL || 'http://127.0.0.1:4173';
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 390, height: 844 }
];

const report = {
  startedAt: new Date().toISOString(),
  restaurants: [],
  directory: {},
  failures: []
};

async function inspectPage(page, url, label, viewportName) {
  const failures = [];
  const localHttpFailures = [];
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('response', response => {
    const responseUrl = response.url();
    if (responseUrl.startsWith(`${baseUrl}/`) && response.status() >= 400 && !responseUrl.endsWith('/favicon.ico')) {
      localHttpFailures.push(`${response.status()} ${responseUrl}`);
    }
  });

  const started = Date.now();
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(100);
  const elapsed = Date.now() - started;
  if (!response || response.status() >= 400) failures.push(`${label}: navigation failed (${response?.status() ?? 'no response'})`);
  if (elapsed > 5000) failures.push(`${label}: DOMContentLoaded took ${elapsed}ms`);

  const checks = await page.evaluate(() => {
    const visible = element => !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    const controls = [...document.querySelectorAll('a[href], button, input, select, textarea')].filter(visible);
    const unnamedControls = controls.filter(element => {
      if (element.tagName === 'INPUT' && ['hidden', 'submit', 'button', 'reset'].includes((element.type || '').toLowerCase())) return false;
      const associatedLabels = [...(element.labels || [])].map(item => item.textContent).join(' ');
      const wrappedLabel = element.closest('label')?.textContent || '';
      const name = [
        element.getAttribute('aria-label'),
        element.getAttribute('aria-labelledby') && document.getElementById(element.getAttribute('aria-labelledby'))?.textContent,
        element.getAttribute('title'),
        associatedLabels,
        wrappedLabel,
        element.getAttribute('placeholder'),
        element.textContent,
        element.value,
        element.querySelector?.('img')?.getAttribute('alt')
      ].filter(Boolean).join(' ').trim();
      return !name;
    }).length;
    const missingAlt = [...document.querySelectorAll('img')].filter(image => !image.hasAttribute('alt')).length;
    const ids = [...document.querySelectorAll('[id]')].map(element => element.id).filter(Boolean);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    return {
      title: document.title.trim(),
      lang: document.documentElement.lang.trim(),
      h1Count: document.querySelectorAll('h1').length,
      mainCount: document.querySelectorAll('main').length,
      bodyTextLength: document.body.innerText.replace(/\s+/g, ' ').trim().length,
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
      unnamedControls,
      missingAlt,
      duplicateIds
    };
  });

  if (!checks.title) failures.push(`${label}: empty title`);
  if (!checks.lang) failures.push(`${label}: missing html lang`);
  if (checks.h1Count < 1) failures.push(`${label}: missing h1`);
  if (checks.mainCount !== 1) failures.push(`${label}: expected one main element, found ${checks.mainCount}`);
  if (checks.bodyTextLength < 180) failures.push(`${label}: insufficient visible content (${checks.bodyTextLength})`);
  if (checks.horizontalOverflow > 12) failures.push(`${label}: horizontal overflow ${checks.horizontalOverflow}px at ${viewportName}`);
  if (checks.unnamedControls > 0) failures.push(`${label}: ${checks.unnamedControls} visible unnamed controls`);
  if (checks.missingAlt > 0) failures.push(`${label}: ${checks.missingAlt} images missing alt attributes`);
  if (checks.duplicateIds.length > 0) failures.push(`${label}: duplicate ids ${checks.duplicateIds.join(', ')}`);
  failures.push(...pageErrors.map(error => `${label}: pageerror ${error}`));
  failures.push(...localHttpFailures.map(error => `${label}: local response ${error}`));

  return { elapsedMs: elapsed, checks, failures };
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const restaurant of plan) {
      const restaurantResult = { slug: restaurant.slug, pages: restaurant.htmlFiles.length, viewports: {} };
      for (const viewport of viewports) {
        const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
        const page = await context.newPage();
        const results = [];
        for (const rel of restaurant.htmlFiles) {
          const url = `${baseUrl}/restaurants/${restaurant.slug}/${rel}`;
          const result = await inspectPage(page, url, rel, viewport.name);
          results.push({ file: rel, ...result });
          if (result.failures.length) report.failures.push({ slug: restaurant.slug, viewport: viewport.name, file: rel, failures: result.failures });
        }
        restaurantResult.viewports[viewport.name] = results;
        await context.close();
      }
      report.restaurants.push(restaurantResult);
    }

    for (const viewport of viewports) {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
      const page = await context.newPage();
      const result = await inspectPage(page, `${baseUrl}/restaurants/index.html`, 'restaurants/index.html', viewport.name);
      report.directory[viewport.name] = result;
      if (result.failures.length) report.failures.push({ slug: '_directory', viewport: viewport.name, file: 'restaurants/index.html', failures: result.failures });
      await context.close();
    }
  } finally {
    await browser.close();
  }

  report.completedAt = new Date().toISOString();
  fs.writeFileSync(path.join(outDir, 'browser-report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({
    restaurants: report.restaurants.length,
    pagesPerViewport: report.restaurants.reduce((sum, item) => sum + item.pages, 0),
    viewports: viewports.map(item => item.name),
    failures: report.failures
  }, null, 2));
  if (report.failures.length) process.exit(1);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
