const fs = require('fs');
const path = require('path');

const archiveDirs = ['alice-jules-coffee-house', 'elk-monroe', 'boudreauxs-restaurant'];
let brokenCount = 0;

archiveDirs.forEach(slug => {
  const dir = path.join('archive', 'restaurants', slug);
  if (!fs.existsSync(dir)) {
    console.error(`Directory missing: ${dir}`);
    return;
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const htmlPath = path.join(dir, f);
    const content = fs.readFileSync(htmlPath, 'utf8');
    const hrefs = Array.from(content.matchAll(/href=["'](.*?)["']/g), m => m[1]);
    const srcs = Array.from(content.matchAll(/src=["'](.*?)["']/g), m => m[1]);
    [...hrefs, ...srcs].forEach(ref => {
      if (
        ref.startsWith('http://') ||
        ref.startsWith('https://') ||
        ref.startsWith('//') ||
        ref.startsWith('mailto:') ||
        ref.startsWith('tel:') ||
        ref.startsWith('#') ||
        ref.startsWith('sms:') ||
        ref.trim() === ''
      ) return;
      const resolved = path.resolve(dir, ref);
      const cleanPath = resolved.split('?')[0].split('#')[0];
      if (!fs.existsSync(cleanPath)) {
        console.log(`Broken ref in ${slug}/${f}: '${ref}' (Resolved: ${cleanPath})`);
        brokenCount++;
      }
    });
  });
});

if (brokenCount === 0) {
  console.log('✓ All internal links and resources in archived sites resolve cleanly.');
} else {
  console.log(`Found ${brokenCount} broken reference(s) in archived sites.`);
}
