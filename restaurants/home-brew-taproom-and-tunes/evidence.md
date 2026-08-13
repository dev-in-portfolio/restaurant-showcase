# Home Brew Taproom & Tunes — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Home Brew Taproom & Tunes
- **Slug:** `home-brew-taproom-and-tunes`
- **Audit Grade / Disposition / Score:** A / YES / 99
- **Audit Batch:** 9
- **Verification Date:** August 13, 2026

## Verification Sources

- [Open Mic Carolina — Home Brew Taproom Profile](https://openmiccarolina.com)
- [PlaceJoys Monroe NC — Home Brew Taproom Listing](https://placejoys.com)
- [Giftly Monroe — Home Brew Taproom & Tunes Profile](https://www.giftly.com)

## Original Audit Weakness

Home Brew Taproom & Tunes relies on basic social media & directory listings without an owned digital showcase. Located at 215 S Main St in Downtown Monroe, it lacks an owned digital showcase highlighting its rotating 24-tap draft board, live acoustic music calendar, artisan pub menu, and community vinyl lounge vibe.

## Creative Brief

### Verified Visual / Content Anchors

1. **Downtown Monroe Location:** 215 S Main St, Monroe NC 28112 (Historic Downtown Monroe near Franklin St).
2. **Craft Taproom & Live Tunes Specialties:** 24 Rotating Carolina Craft Taps, Artisan Stone-Baked Flatbreads, Bavarian Soft Pretzels with Smoked Beer Cheese, Craft Mimosas, Acoustic Open Mic Nights, & Dog-Friendly Patio.
3. **Hours of Operation:** Mon-Thu 4pm-10pm, Fri-Sat 1pm-11pm, Sun 1pm-8pm.

### Core Design Moves

1. **Heavy Industrial Geometric Sans Typography:** Bold industrial sans (*Syne*) paired with clean body sans (*Inter*) and vinyl stage mono (*Space Mono*).
2. **Industrial Iron & Copper Electroplate Palette:** Taproom palette anchored in industrial iron charcoal (`#11161B`), copper electroplate (`#C2410C`), hops amber gold (`#F59E0B`), and malt cream parchment (`#FDFBF7`).
3. **"The 24-Tap Draft Board & Live Stage Matrix":** Matrix-style dual column layout (`craft-taps-tunes.html` & `menu.html`) showcasing 24 rotating Carolina taps alongside live music acoustic lineups & artisan pub bites.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Ho Ho Cherry House` — Traditional Chinese & Wok with Cormorant Garamond fonts and Cherry Lacquer/Crimson.
2. `Hickory & Heart` — Rustic BBQ Smokehouse with BioRhyme fonts and Hickory Charcoal/Smoked Amber.
3. `Henrietta’s` — High-End Bistro with Bodoni Moda fonts and Midnight Navy/Champagne Gold.

### Divergent Choices for Home Brew Taproom & Tunes

- **Hero Composition:** Downtown Monroe Industrial Craft Beer & Acoustic Vinyl Lounge split-hero layout: left side features a copper electroplated stamp badge (`"CRAFT BEER TAPROOM & LIVE TUNES • MONROE NC (215 S MAIN ST)"`), bold industrial sans (*Syne*), copper & iron palette, and right side features a bold framed hero image of craft beer flights & live acoustic lounge.
- **Section Rhythm:** Replaced standard card grids with **HBT Vault Cards** (`hbt-vault-card`) and Monroe taproom highlights.
- **HTML Vocabulary:** Completely unique class names (`hbt-header`, `hbt-brand`, `taproom-hero-stage`, `copper-stamp-badge`, `hbt-vault-card`, `hbt-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 215 S Main St in Monroe NC 28112 (Downtown Monroe) | `visit.html`, `index.html`, `concept.html` | [Open Mic Carolina Profile](https://openmiccarolina.com) |
| Active craft beer taproom & live tunes venue | `concept.html`, `index.html` | [PlaceJoys Listing](https://placejoys.com) |
| Operating hours: Mon-Thu 4-10pm, Fri-Sat 1-11pm, Sun 1-8pm | `visit.html`, `index.html` | [PlaceJoys Listing](https://placejoys.com) |
| Phone number: (980) 215-3564 | `visit.html`, `index.html` | [Open Mic Carolina Profile](https://openmiccarolina.com) |
| 24 Rotating Carolina Craft Taps & Craft Mimosas | `menu.html`, `craft-taps-tunes.html` | [PlaceJoys Listing](https://placejoys.com) |
| Bavarian Soft Pretzels, Artisan Flatbreads, & Open Mic Nights | `menu.html`, `artisan-pub-bites.html` | [Open Mic Carolina Profile](https://openmiccarolina.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Home Brew Direct Express Taproom To-Go Order Engine:** Zero-commission direct online ordering portal for growlers, crowlers, & artisan flatbreads.
- **Home Brew Live Music & Acoustic Stage Booking Engine:** Band submission & live acoustic event booking calendar for Monroe musicians.
- **Home Brew VIP Taproom Mug Club Rewards Engine:** Exclusive VIP rewards portal for frequent Monroe craft beer & music lovers.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table seating reservation integration.

### Available for Production Scope

- Custom zero-commission direct mobile takeout app.
- Interactive live draft board tap list manager with ABV/IBU filtering.
- Concert & open mic stage booking portal for regional Union County artists.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs home-brew-taproom-and-tunes` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
