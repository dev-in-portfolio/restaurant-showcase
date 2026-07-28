const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { resolvedRedo } = require('./resolve_targets');

// Comprehensive Restaurant Database with Bespoke Themes and Intelligence
const restaurantIntel = {
  'the-derby': {
    cuisine: 'Classic Southern Tavern & Grill',
    tagline: 'Bourbon, Prime Steaks & Southern Heritage',
    heroBadge: 'Est. Local Gem • Speakeasy Vibes & Wood-Fired Fare',
    accentColor: '#d97706',
    secondaryColor: '#92400e',
    bgColor: '#0f172a',
    bgGradient: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0f172a 75%)',
    fontDisplay: "'Playfair Display', Georgia, serif",
    fontBody: "'Inter', sans-serif",
    emoji: '🏇',
    currentUrl: 'https://thederbyrestaurant.com',
    address: '5638 N Tryon St, Charlotte, NC 28213',
    phone: '(704) 596-8558',
    hours: 'Mon-Thu: 11am-10pm | Fri-Sat: 11am-11pm | Sun: 10am-9pm',
    specialties: ['Smoked Prime Rib', 'Bourbon Glazed Salmon', 'Cast Iron Cornbread', 'Derby Mint Julep'],
    interactionName: 'Bourbon & Pairings Selector',
    interactionType: 'pairing'
  },
  'aj-family-restaurant': {
    cuisine: 'Comfort Country Diner',
    tagline: 'Hearty Home-Cooked Meals & Warm Hospitality',
    heroBadge: 'Family Recipes • All-Day Breakfast & Daily Specials',
    accentColor: '#ea580c',
    secondaryColor: '#9a3412',
    bgColor: '#18181b',
    bgGradient: 'radial-gradient(circle at 50% 0%, #27272a 0%, #09090b 75%)',
    fontDisplay: "'Outfit', sans-serif",
    fontBody: "'Plus Jakarta Sans', sans-serif",
    emoji: '🍳',
    currentUrl: 'https://ajfamilyrestaurant.com',
    address: '4807 Albemarle Rd, Charlotte, NC 28205',
    phone: '(704) 536-9877',
    hours: 'Mon-Sun: 6am-9pm',
    specialties: ['Country Fried Steak', 'Homemade Biscuit Platters', 'Southern Fried Chicken', 'Pecan Pie'],
    interactionName: 'Breakfast Plate Customizer',
    interactionType: 'planner'
  },
  'matthews-social-house': {
    cuisine: 'Modern American Social House',
    tagline: 'Craft Cocktails, Small Plates & Community Vibes',
    heroBadge: 'Matthews Historic District • Elevated Gathering Spot',
    accentColor: '#3b82f6',
    secondaryColor: '#1d4ed8',
    bgColor: '#0b1329',
    bgGradient: 'radial-gradient(circle at 50% 0%, #1e3a8a 0%, #0b1329 75%)',
    fontDisplay: "'Outfit', sans-serif",
    fontBody: "'Inter', sans-serif",
    emoji: '🍸',
    currentUrl: 'https://matthewssocialhouse.com',
    address: '104 E Matthews St, Matthews, NC 28105',
    phone: '(704) 847-1900',
    hours: 'Tue-Thu: 4pm-10pm | Fri-Sat: 4pm-11pm | Sun: 10am-3pm',
    specialties: ['Truffle Fries', 'Braised Short Rib Sliders', 'Smoked Old Fashioned', 'Artisanal Charcuterie'],
    interactionName: 'Social Small-Plates Planner',
    interactionType: 'planner'
  }
};

// Generic Generator for Remaining Redo Target Intelligence
function getIntel(target) {
  if (restaurantIntel[target.slug]) {
    return restaurantIntel[target.slug];
  }

  // Generate distinct thematic properties derived from name and index
  const numInt = parseInt(target.num) || 1;
  const palettes = [
    { accent: '#f59e0b', sec: '#b45309', bg: '#0f172a', grad: 'radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 75%)', fontD: "'Playfair Display', serif", fontB: "'Inter', sans-serif", emoji: '🍽️' },
    { accent: '#10b981', sec: '#047857', bg: '#064e3b', grad: 'radial-gradient(circle at 50% 0%, #065f46 0%, #022c22 75%)', fontD: "'Outfit', sans-serif", fontB: "'Plus Jakarta Sans', sans-serif", emoji: '🌿' },
    { accent: '#ec4899', sec: '#be185d', bg: '#18181b', grad: 'radial-gradient(circle at 50% 0%, #3f3f46 0%, #09090b 75%)', fontD: "'Cormorant Garamond', serif", fontB: "'DM Sans', sans-serif", emoji: '✨' },
    { accent: '#6366f1', sec: '#4338ca', bg: '#0f172a', grad: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0f172a 75%)', fontD: "'Syne', sans-serif", fontB: "'Inter', sans-serif", emoji: '🍸' },
    { accent: '#ef4444', sec: '#b91c1c', bg: '#1a0505', grad: 'radial-gradient(circle at 50% 0%, #450a0a 0%, #180202 75%)', fontD: "'Cinzel', serif", fontB: "'Montserrat', sans-serif", emoji: '🔥' },
    { accent: '#06b6d4', sec: '#0e7490', bg: '#082f49', grad: 'radial-gradient(circle at 50% 0%, #0c4a6e 0%, #031926 75%)', fontD: "'Fraunces', serif", fontB: "'DM Sans', sans-serif", emoji: '🌊' }
  ];

  const p = palettes[numInt % palettes.length];

  return {
    cuisine: target.name.includes('Beer') || target.name.includes('Brewing') ? 'Craft Brewery & Taproom' :
             target.name.includes('Pizza') || target.name.includes('Pizzeria') ? 'Artisanal NY & Brick Oven Pizzeria' :
             target.name.includes('Mexican') || target.name.includes('Tacos') || target.name.includes('Valle') ? 'Authentic Mexican Cantina' :
             target.name.includes('Bánh Mì') || target.name.includes('Vietnamese') ? 'Vietnamese Street Food & Bakery' :
             target.name.includes('Coffee') || target.name.includes('Bakery') ? 'Artisanal Cafe & Bakery' : 'Bespoke Culinary & Dining Experience',
    tagline: `Premium Culinary Craftsmanship in Charlotte, NC`,
    heroBadge: `Featured Showcase • Handcrafted Flavor & Hospitality`,
    accentColor: p.accent,
    secondaryColor: p.sec,
    bgColor: p.bg,
    bgGradient: p.grad,
    fontDisplay: p.fontD,
    fontBody: p.fontB,
    emoji: p.emoji,
    currentUrl: `https://www.google.com/search?q=${encodeURIComponent(target.name + ' Charlotte NC')}`,
    address: `Charlotte Metro Area, NC`,
    phone: `(704) 555-${String(1000 + numInt).padStart(4, '0')}`,
    hours: 'Mon-Thu: 11am-10pm | Fri-Sat: 11am-11pm | Sun: 10am-9pm',
    specialties: ['Chef Special Creation', 'Signature House Entrée', 'Handcrafted Appetizer', 'Seasonal Craft Beverage'],
    interactionName: `${target.name} Flavor Explorer`,
    interactionType: 'explorer'
  };
}

console.log('Loaded rebuild helper for 86 targets.');
module.exports = { restaurantIntel, getIntel };
