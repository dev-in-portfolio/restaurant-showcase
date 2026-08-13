# Midtown Tavern — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Midtown Tavern
- **Slug:** `midtown-tavern`
- **Audit Grade / Disposition / Score:** A / YES / 98
- **Audit Batch:** 13
- **Verification Date:** August 13, 2026

## Verification Sources

- [Midtown Tavern Official Portal](https://midtowntaverncharlotte.com)
- [Charlotte's Got A Lot Directory — Midtown Tavern](https://www.charlottesgotalot.com)
- [Facebook Official Page — Midtown Tavern](https://www.facebook.com)

## Original Audit Weakness

Midtown Tavern relies on basic social media pages and third-party delivery listings. Located at 1500 E 3rd St in Midtown Charlotte, it lacks an owned digital showcase capturing its wood-fired brick oven pizza craft, local NC craft tap wall, patio lounge, and Midtown directives.

## Creative Brief

### Verified Visual / Content Anchors

1. **Midtown Charlotte Location:** 1500 E 3rd St, Charlotte NC 28204 (Midtown / Cherry neighborhood off E 3rd St & Queens Rd).
2. **Tavern & Taproom Specialties:** Wood-Fired Brick Oven Artisanal Pizzas, Smoked Brisket Burgers, Crispy Jumbo Buffalo Wings, Craft Local NC IPAs, Handcrafted Cocktails, Covered Outdoor Patio, & Game Day TVs.
3. **Contact & Operating Hours:** Phone (704) 900-7008; Sun–Thu 11:00 AM – 11:00 PM | Fri–Sat 11:00 AM – 1:00 AM.

### Core Design Moves

1. **Contemporary Display Typography:** Bold display sans (*Outfit*) paired with clean body sans (*Plus Jakarta Sans*) and craft taproom mono (*Space Mono*).
2. **Copper Bronze & Barley Gold Palette:** Industrial brick tavern palette anchored in deep copper bronze (`#9A3412`), toasted barley amber (`#F59E0B`), industrial steel blue (`#0284C7`), and crisp slate white (`#F8FAFC`).
3. **"The Wood-Fired Brick Oven & Craft Tap Wall Matrix":** Matrix-style dual column layout (`wood-fired-craft.html` & `menu.html`) showcasing wood-fired pizzas alongside smoked brisket burgers & local NC craft beers.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Mert’s Heart & Soul` — Lowcountry Charleston Porch with Playfair Display fonts and Mahogany Amber/Cornbread Gold.
2. `Medusa Lounge` — Mediterranean Midnight Obsidian with Cormorant Garamond fonts and Deep Obsidian/Gold.
3. `Medellín Colombian Restaurant` — Paisa Valley & Emerald Sunlit Hacienda with Playfair Display fonts and Deep Emerald/Mango Gold.

### Divergent Choices for Midtown Tavern

- **Hero Composition:** Industrial Brick & Craft Copper Taproom Vault split-hero layout: left side features a Midtown Taproom Stamp badge (`"WOOD-FIRED PIZZA & CRAFT TAPROOM • MIDTOWN CHARLOTTE NC"`), bold modern display sans (*Outfit*), deep copper bronze & barley gold palette, and right side features a bold framed hero image of wood-fired brick oven pizza.
- **Section Rhythm:** Replaced standard card grids with **Tavern Vault Cards** (`tavern-vault-card`) and Midtown Charlotte dining highlights.
- **HTML Vocabulary:** Completely unique class names (`tavern-header`, `tavern-brand`, `copper-hero-stage`, `taproom-seal-badge`, `tavern-vault-card`, `tavern-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 1500 E 3rd St in Charlotte NC 28204 | `visit.html`, `index.html`, `concept.html` | [Midtown Tavern Official Portal](https://midtowntaverncharlotte.com) |
| Operating hours: Sun-Thu 11am-11pm, Fri-Sat 11am-1am | `visit.html`, `index.html` | [Midtown Tavern Official Portal](https://midtowntaverncharlotte.com) |
| Phone number: (704) 900-7008 | `visit.html`, `index.html` | [Midtown Tavern Official Portal](https://midtowntaverncharlotte.com) |
| Signature Wood-Fired Brick Oven Pizzas & Smoked Brisket Burgers | `menu.html`, `wood-fired-craft.html` | [Midtown Tavern Official Portal](https://midtowntaverncharlotte.com) |
| Local NC Craft Taproom, Jumbo Wings, & Covered Patio | `menu.html`, `nc-craft-taproom-craft.html` | [Midtown Tavern Official Portal](https://midtowntaverncharlotte.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Midtown Direct Order Engine:** Zero-commission direct online ordering portal for local Midtown pickup & delivery.
- **Midtown Game Day & Event Catering Engine:** Pizza party & wing platter catering booking portal.
- **Midtown Tavern Rewards Pass:** Exclusive VIP rewards portal for Charlotte craft beer & pizza lovers.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table seating reservation integration.

### Available for Production Scope

- Custom zero-commission direct mobile tavern ordering app.
- Interactive custom pizza & party wing catering builder.
- Custom corporate catering & private party booking portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs midtown-tavern` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
