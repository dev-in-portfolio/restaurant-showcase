# Corkscrew Wine Pub — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Corkscrew Wine Pub
- **Slug:** `corkscrew-wine-pub`
- **Audit Grade / Disposition / Score:** A / YES / 99
- **Audit Batch:** 5
- **Verification Date:** August 13, 2026

## Verification Sources

- [Corkscrew Wine Pub Official Portal](https://corkscrewwinepub.com)
- [Corkscrew Wine Pub Facebook Community Page](https://www.facebook.com)
- [LKN Connect Community — Corkscrew Huntersville](https://lknconnectcommunity.com)

## Original Audit Weakness

Corkscrew Wine Pub relies on basic social media pages and legacy site redirects. Located at 111 Gilead Rd in Huntersville, it lacks an owned digital showcase capturing its Sommelier cellar selections, artisan charcuterie board pairings, Lake Norman wine tasting events, and monthly wine club subscriptions.

## Creative Brief

### Verified Visual / Content Anchors

1. **Huntersville Town Center Location:** 111 Gilead Rd, Suite B1, Huntersville NC 28078 (Huntersville / Lake Norman area).
2. **Wine Bar & Charcuterie Specialties:** Sommelier Curated Wine Flights by the Glass, Artisan Charcuterie & Cheese Boards, Baked Warm Brie with Fig & Walnut Jam, Prosciutto & Arugula Flatbreads, Local Craft Beer Taps, & Pet-Friendly Patio.
3. **Contact & Operating Hours:** Phone (803) 547-0202; Mon–Thu 1:00 PM – 11:00 PM | Fri–Sat 1:00 PM – 12:00 AM (Midnight) | Sun 1:00 PM – 10:00 PM.

### Core Design Moves

1. **Classic Wine Pub Serif Typography:** Elegant serif (*Playfair Display*) paired with clean body sans (*Inter*) and Sommelier cellar mono (*Space Mono*).
2. **Bordeaux Vintage Maroon & Oak Amber Palette:** Wine pub palette anchored in deep Bordeaux maroon (`#2E0814`), oak barrel amber gold (`#D97706`), cork tan (`#92400E`), and warm linen parchment (`#FFFDF7`).
3. **"The Sommelier Wine Flight & Charcuterie Board Matrix":** Matrix-style dual column layout (`wine-flight-craft.html` & `menu.html`) showcasing curated wine flights alongside artisan charcuterie boards & warm tapas flatbreads.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Jazzy Cheesecakes` — Velvet Magenta Dessert Lounge with Syne fonts and Deep Velvet Plum/Hot Raspberry.
2. `Jaipur Indian Restaurant` — Royal Pink City Palace with Cormorant Garamond fonts and Deep Crimson/Saffron.
3. `Italo` — Venetian Renaissance Italian with Bodoni Moda fonts and Barolo Burgundy/Tuscan Gold.

### Divergent Choices for Corkscrew Wine Pub

- **Hero Composition:** Vintage Bordeaux Oak Barrel & Sommelier Cellar Vault split-hero layout: left side features an Oak stamp badge (`"WINE BAR, CRAFT TAPS & CHARCUTERIE • HUNTERSVILLE NC (111 GILEAD RD)"`), classic wine pub serif (*Playfair Display*), Bordeaux maroon & oak amber palette, and right side features a bold framed hero image of wine glasses & charcuterie boards.
- **Section Rhythm:** Replaced standard card grids with **Corkscrew Vault Cards** (`corkscrew-vault-card`) and Huntersville wine pub highlights.
- **HTML Vocabulary:** Completely unique class names (`corkscrew-header`, `corkscrew-brand`, `cellar-hero-stage`, `oak-stamp-badge`, `corkscrew-vault-card`, `corkscrew-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 111 Gilead Rd Suite B1 in Huntersville NC 28078 | `visit.html`, `index.html`, `concept.html` | [Corkscrew Direct Portal](https://corkscrewwinepub.com) |
| Operating hours: Mon-Thu 1-11pm, Fri-Sat 1pm-12am, Sun 1-10pm | `visit.html`, `index.html` | [Corkscrew Direct Portal](https://corkscrewwinepub.com) |
| Phone number: (803) 547-0202 | `visit.html`, `index.html` | [Corkscrew Direct Portal](https://corkscrewwinepub.com) |
| Sommelier Curated Wine Flights & Artisan Charcuterie Boards | `menu.html`, `wine-flight-craft.html` | [Corkscrew Direct Portal](https://corkscrewwinepub.com) |
| Baked Warm Brie, Prosciutto Flatbreads, & Craft Beer Taps | `menu.html`, `charcuterie-cheese-craft.html` | [Corkscrew Direct Portal](https://corkscrewwinepub.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Corkscrew Wine Bar Reservation Engine:** Zero-commission direct online table booking portal for Huntersville patrons.
- **The Screw Crew Wine Club Subscription Engine:** Recurring monthly subscription portal for hand-picked sommelier wine bottles & tasting allocations.
- **Corkscrew VIP Cellar Club Rewards Engine:** Exclusive VIP rewards portal for frequent Lake Norman wine lovers.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table seating reservation integration.

### Available for Production Scope

- Custom zero-commission direct mobile wine app.
- Interactive wine pairing guide & charcuterie builder calculator.
- Custom private wine party banquet booking portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs corkscrew-wine-pub` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
