const fs = require('fs');
const path = require('path');

const json = JSON.parse(fs.readFileSync('data/restaurants.json', 'utf8'));
const archivedJsonPath = 'data/archived-restaurants.json';
const archivedJson = fs.existsSync(archivedJsonPath) ? JSON.parse(fs.readFileSync(archivedJsonPath, 'utf8')) : [];
const folders = fs.readdirSync('restaurants').filter(f => f !== '.gitkeep');
const archiveFoldersDir = 'archive/restaurants';
const archiveFolders = fs.existsSync(archiveFoldersDir) ? fs.readdirSync(archiveFoldersDir) : [];

const redoRaw = [
  '001 | The Derby',
  '005 | AJ Family Restaurant',
  '009 | Matthews Social House',
  '014 | Picadeli\'s Pub-In-Deli',
  '015 | Americana Restaurant',
  '017 | Umami Sushi & Grill',
  '018 | Seaboard Brewing, Taproom & Wine Bar',
  '019 | Carolina Beer Temple',
  '020 | Kabab-Je Rotisserie & Grille',
  '021 | Kristopher\'s Bar & Restaurant',
  '022 | El Valle Mexican Restaurant',
  '023 | The One Tapas & Bar',
  '024 | Loyalist Market',
  '025 | Cornerstone Pub & Grill',
  '027 | Lula Bánh Mì + Bakery',
  '028 | Carolina Scoops',
  '030 | Waldhorn Restaurant',
  '031 | The Garrison',
  '032 | Margaux\'s Wine, Pizza & Market',
  '033 | MJ Donuts',
  '034 | Kit\'s Trackside Crafts',
  '037 | DB\'s Tavern',
  '038 | Cafe South',
  '039 | Lenny Boy Brewing Co.',
  '040 | McKoy\'s Smokehouse & Saloon',
  '041 | Mad Greek Cafe',
  '043 | Crispy Banh Mi',
  '044 | Maria\'s Mexican Restaurant',
  '048 | Good Food on Montford',
  '049 | Luisa\'s Brick Oven Pizzeria',
  '050 | Moosehead Grill',
  '052 | Sir Edmond Halley\'s',
  '054 | Duckworth\'s Grill & Taphouse',
  '055 | Beef \'N Bottle',
  '056 | L\'Ostrica',
  '057 | Flour Shop',
  '058 | 131 Main Restaurant',
  '059 | Little Mama\'s Italian',
  '060 | Eddie\'s Place',
  '061 | Barcelona Wine Bar',
  '062 | HopFly Brewing Company',
  '064 | Flower Child',
  '065 | Link & Pin',
  '066 | Kid Cashew',
  '068 | Leluia Hall',
  '070 | Comet Grill',
  '072 | Fiamma Ristorante',
  '074 | Paco\'s Tacos & Tequila',
  '076 | Fin & Fino',
  '078 | Ink N Ivy',
  '081 | La Belle Helene',
  '082 | Deluxe Fun Dining',
  '083 | Home Style Kitchn',
  '085 | Open Kitchen',
  '089 | Enderly Coffee Co.',
  '090 | Dressler\'s Restaurant',
  '091 | Thirsty Beaver Saloon',
  '093 | Intermezzo Pizzeria',
  '095 | Customshop',
  '096 | Hawthorne\'s NY Pizza & Bar',
  '098 | Menya Daruma',
  '099 | Caswell Station',
  '100 | Laurel Market',
  '102 | Barrington\'s Restaurant',
  '103 | New Zealand Cafe',
  '105 | Calle Sol Latin Café & Cevicheria',
  '108 | Dish',
  '109 | Diamond Restaurant',
  '110 | Legion Brewing',
  '111 | Free Range Brewing',
  '116 | Heist Brewery',
  '120 | South 21 Drive-In',
  '122 | Ever Andalo',
  '123 | La Shish Kabob',
  '125 | Portofino\'s',
  '126 | House of Pizza',
  '129 | Idlewild',
  '130 | Manolo\'s Latin Bakery',
  '134 | Local Loaf',
  '138 | Amelie\'s French Bakery & Cafe',
  '139 | HEX Coffee',
  '143 | House of Leng',
  '144 | Le Kebab Grill',
  '145 | Le\'s Sandwiches & Café',
  '150 | Hello, Sailor',
  '151 | Kindred'
];

const archiveRaw = [
  '007 | Alice Jules Coffee House',
  '008 | E.L.K. Tavern',
  '133 | Boudreaux\'s Restaurant'
];

const aliasMap = {
  '008': 'elk-monroe',
  '017': 'umami-sushi-grill',
  '018': 'seaboard-brewing',
  '020': 'kabab-je',
  '021': 'kristophers-sports-bar',
  '023': 'the-one-tapas',
  '025': 'cornerstone-pub-grill',
  '027': 'lula-banh-mi-and-bakery',
  '032': 'margauxs-wine-pizza-market',
  '039': 'lenny-boy-brewing',
  '040': 'mckoys-smokehouse-and-saloon',
  '054': 'duckworths-grill-taphouse',
  '056': 'lostrica',
  '062': 'hopfly-brewing',
  '065': 'link-and-pin',
  '074': 'pacos-tacos-tequila',
  '076': 'fin-and-fino',
  '090': 'dresslers',
  '096': 'hawthornes-ny-pizza-and-bar',
  '105': 'calle-sol-latin-cafe-cevicheria',
  '133': 'boudreauxs-restaurant',
  '138': 'amelies-french-bakery-and-cafe',
  '145': 'les-sandwiches-cafe'
};

function resolveTarget(item, action) {
  const parts = item.split(' | ');
  const num = parts[0];
  const name = parts[1];
  let slug = aliasMap[num];
  if (!slug) {
    slug = name.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/['’]/g, '')
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  const isArchived = action === 'ARCHIVE';
  const folderExists = isArchived ? archiveFolders.includes(slug) : folders.includes(slug);
  const folderPath = isArchived ? `archive/restaurants/${slug}` : `restaurants/${slug}`;
  const regEntry = isArchived ? archivedJson.find(j => j.slug === slug) : json.find(j => j.slug === slug);
  return {
    num,
    name,
    slug,
    folder: folderExists ? folderPath : null,
    action,
    regExists: !!regEntry,
    cardExists: !!regEntry,
    discrepancy: regEntry && regEntry.name !== name ? `Registry name is "${regEntry.name}"` : 'None'
  };
}

const resolvedRedo = redoRaw.map(item => resolveTarget(item, 'REDO'));
const resolvedArchive = archiveRaw.map(item => resolveTarget(item, 'ARCHIVE'));

console.log('REDO Total:', resolvedRedo.length);
console.log('REDO Unresolved:', resolvedRedo.filter(r => !r.folder || !r.regExists));

console.log('ARCHIVE Total:', resolvedArchive.length);
console.log('ARCHIVE Unresolved:', resolvedArchive.filter(r => !r.folder || !r.regExists));

// Check duplicates or overlaps
const redoSlugs = new Set(resolvedRedo.map(r => r.slug));
const archiveSlugs = new Set(resolvedArchive.map(r => r.slug));

const overlap = [...redoSlugs].filter(s => archiveSlugs.has(s));
console.log('Overlap between Redo and Archive:', overlap);

// All protected targets
const allSlugs = new Set([...json.map(j => j.slug), ...archivedJson.map(j => j.slug)]);
const protectedSlugs = [...allSlugs].filter(s => !redoSlugs.has(s) && !archiveSlugs.has(s));
console.log('Protected target count:', protectedSlugs.length);
console.log('Total JSON targets count:', allSlugs.size);
console.log('Calculation check:', redoSlugs.size, '+', archiveSlugs.size, '+', protectedSlugs.length, '=', redoSlugs.size + archiveSlugs.size + protectedSlugs.length);

module.exports = {
  resolvedRedo,
  resolvedArchive,
  redoSlugs,
  archiveSlugs,
  protectedSlugs
};
