# Dee’s Vegan To Go — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Dee’s Vegan To Go
- **Slug:** `dee-s-vegan-to-go`
- **Audit Grade / Disposition / Score:** A / YES / 97
- **Audit Batch:** 6
- **Verification Date:** August 12, 2026

## Verification Sources

- [Dee’s Vegan To Go Official Website](https://deesvegantogo.com)
- [MarketSpread — Charlotte Regional Farmers Market Profile](https://marketspread.com)
- [EatOkra Black-Owned Business Directory](https://eatokra.com)

## Original Audit Weakness

Dee’s Vegan To Go relies on basic market stall listings and third-party delivery links. Located at 1801 Yorkmont Rd Bldg B Space 37 in Charlotte, it lacks an owned digital showcase capturing its 100% plant-based comfort recipes, weekly meal plan pre-order engine, Thursday ordering cutoffs, and catering services.

## Creative Brief

### Verified Visual / Content Anchors

1. **Yorkmont Farmers Market Location:** Charlotte Regional Farmers Market, 1801 Yorkmont Rd, Building B, Space 37, Charlotte NC 28217.
2. **100% Plant-Based Comfort Entrees:** Vegan Mac & Cheese, Smothered Jackfruit Ribs, Crispy Plant-Based Chick'n, Vegan Collard Greens with Smoked Paprika, & Sweet Yam Casserole.
3. **Weekly Meal Plan Pre-Orders & Market Hours:** Friday 9am-2pm, Saturday 8am-3pm, Sunday 9am-2pm. Weekly meal plan orders close Thursday at 2:00 PM for weekend market pickup.

### Core Design Moves

1. **Modern Geometric Display Sans Typography:** Geometric display sans (*Plus Jakarta Sans*) paired with clean body sans (*Inter*) and market kitchen mono (*Space Mono*).
2. **Organic Forest Charcoal & Kale Emerald Palette:** Vibrant organic palette anchored in forest charcoal (`#091E13`), kale emerald (`#15803D`), sunlit citrus lime (`#84CC16`), organic oat cream (`#F8FAF2`), and warm avocado gold (`#EAB308`).
3. **"The Plant-Based Kitchen & Weekly Meal Plan Matrix":** Matrix-style dual column layout (`plant-based-comfort-craft.html` & `menu.html`) showcasing 100% plant-based comfort entrees alongside weekly meal plan prep containers & cold-pressed juices.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Curry n Cake` — Indian Street Food & Fusion Bakery with Fraunces fonts and Saffron Charcoal/Royal Amber.
2. `Great Wagon Road Distilling Co.` — Industrial Copper Distillery with Cinzel fonts and Copper Charcoal/Oak Bronze.
3. `Fumée Kitchen & Cocktails` — 21+ Vibe Lounge with Syne fonts and Deep Obsidian Onyx/Smoked Rose Gold.

### Divergent Choices for Dee’s Vegan To Go

- **Hero Composition:** Modern Organic Plant-Based Comfort Vault split-hero layout: left side features an electric kale green stamp badge (`"100% PLANT-BASED COMFORT & MEAL PLANS • 1801 YORKMONT RD BLDG B"`), geometric display sans (*Plus Jakarta Sans*), forest charcoal & kale emerald palette, and right side features a sunlit framed hero image of plant-based chick'n, vegan mac, & fresh market juices.
- **Section Rhythm:** Replaced standard card grids with **DVTG Vault Cards** (`dvtg-vault-card`) and Farmers Market culinary highlights.
- **HTML Vocabulary:** Completely unique class names (`dvtg-header`, `dvtg-brand`, `kale-hero-stage`, `sprout-stamp-badge`, `dvtg-vault-card`, `dvtg-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 1801 Yorkmont Rd Bldg B Space 37 in Charlotte NC 28217 | `visit.html`, `index.html`, `concept.html` | [Dee’s Vegan Direct](https://deesvegantogo.com) |
| Operating hours: Fri 9-2, Sat 8-3, Sun 9-2 at Farmers Market | `visit.html`, `index.html` | [Dee’s Vegan Direct](https://deesvegantogo.com) |
| Phone number: (980) 322-1791 / (980) 430-3856 | `visit.html`, `index.html` | [EatOkra Directory](https://eatokra.com) |
| Vegan Mac & Cheese, Smothered Jackfruit Ribs, & Plant Chick'n | `menu.html`, `plant-based-comfort-craft.html` | [Dee’s Vegan Direct](https://deesvegantogo.com) |
| Weekly Meal Plan Ordering (Thursday 2pm Cutoff for Pickup) | `menu.html`, `weekly-meal-plans.html` | [Dee’s Vegan Direct](https://deesvegantogo.com) |
| Vegan Collard Greens, Sweet Yams, & Organic Cold-Pressed Juices | `menu.html`, `visit.html` | [Dee’s Vegan Direct](https://deesvegantogo.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Dee’s Vegan Weekly Meal Plan Subscription Engine:** Direct recurring subscription portal for weekly 5-meal & 10-meal plant packages.
- **Dee’s Vegan Event Catering & Office Lunch Delivery Portal:** Bulk corporate catering ordering engine for Charlotte businesses.
- **Dee’s Plant-Based Loyalty Rewards Engine:** Exclusive VIP rewards portal for frequent market pickup guests.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live farmers market booth foot traffic sensor integration.

### Available for Production Scope

- Custom zero-commission direct mobile takeout & meal plan pickup app.
- Interactive plant-based nutrition counter & meal plan macro builder.
- Corporate wellness lunch buyout calculator for Charlotte offices.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs dee-s-vegan-to-go` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
