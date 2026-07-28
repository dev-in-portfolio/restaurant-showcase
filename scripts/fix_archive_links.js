const fs = require('fs');
const path = require('path');

// 1. Fix alice-jules-coffee-house
const ajDir = path.join('archive', 'restaurants', 'alice-jules-coffee-house');
if (fs.existsSync(ajDir)) {
  fs.readdirSync(ajDir).filter(f => f.endsWith('.html')).forEach(file => {
    const filePath = path.join(ajDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\/alice-jules-coffee-house\/menu\.html/g, 'menu.html');
    content = content.replace(/\/alice-jules-coffee-house\/story\.html/g, 'story.html');
    content = content.replace(/\/alice-jules-coffee-house\/shop\.html/g, 'shop.html');
    content = content.replace(/\/alice-jules-coffee-house\/visit\.html/g, 'visit.html');
    content = content.replace(/\/alice-jules-coffee-house\//g, 'index.html');
    fs.writeFileSync(filePath, content, 'utf8');
  });
  console.log('✓ Updated relative links in alice-jules-coffee-house');
}

// 2. Fix elk-monroe
const elkDir = path.join('archive', 'restaurants', 'elk-monroe');
if (fs.existsSync(elkDir)) {
  fs.readdirSync(elkDir).filter(f => f.endsWith('.html')).forEach(file => {
    const filePath = path.join(elkDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace link back to main showroom or archive showroom
    content = content.replace(/href=["']\.\.\/index\.html["']/g, 'href="../../index.html"');
    fs.writeFileSync(filePath, content, 'utf8');
  });
  console.log('✓ Updated relative links in elk-monroe');
}

// 3. Fix boudreauxs-restaurant
const bouDir = path.join('archive', 'restaurants', 'boudreauxs-restaurant');
if (fs.existsSync(bouDir)) {
  fs.readdirSync(bouDir).filter(f => f.endsWith('.html')).forEach(file => {
    const filePath = path.join(bouDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\.\.\/boudreauxs\/index\.html/g, 'index.html');
    fs.writeFileSync(filePath, content, 'utf8');
  });
  console.log('✓ Updated relative links in boudreauxs-restaurant');
}
