# Brawley’s Beverage — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Brawley’s Beverage
- **Slug:** `brawley-s-beverage`
- **Audit Grade / Disposition / Score:** A / YES / 97
- **Audit Batch:** 3
- **Verification Date:** August 11, 2026

## Verification Sources

- [Charlotte is Creative Directory — Brawley's Beverage](https://charlotteiscreative.com)
- [Untappd — Brawley's Beverage Taproom & Bottle Shop](https://untappd.com)
- [BeerMenus — Brawley's Beverage Charlotte](https://beermenus.com)

## Original Audit Weakness

Brawley’s Beverage does not maintain an owned standalone website (relies on third-party aggregators like `untappd.com`, `beermenus.com`, `facebook.com`). Located at 4620 Park Rd in Montford Park, Charlotte NC, it lacks a dedicated web presence highlighting its pioneer craft beer legacy, taproom line-up, bottle cellar inventory, homebrew supplies, and Black Saturday releases.

## Creative Brief

### Verified Visual / Content Anchors

1. **Park Road Craft Pioneer:** Located at 4620 Park Rd in Charlotte's Montford Park / Park Road corridor (established 2003).
2. **Rotating Taproom & Bottle Shop:** Rare regional craft microbrews on tap, cold bottle & can cellar, growler fills, and Black Saturday imperial stout releases.
3. **Homebrew Supplies & Neighborhood Porch:** Full grain, hop, and yeast homebrew supply shop plus cozy outdoor porch seating.

### Core Design Moves

1. **Craft Taphouse Slab Typography:** Rugged slab serif display (*Bitter*) paired with industrial technical mono (*Space Mono*) and clean body sans (*Plus Jakarta Sans*).
2. **Roasted Amber Stout Palette:** Rich taphouse palette anchored in deep roasted stout dark (`#1C1005`), rich amber copper (`#D97706`), warm copper gold (`#F59E0B`), vintage parchment cream (`#FEF3C7`), and rustic oak (`#451A03`).
3. **"The Taproom Board & Cellar Vault Matrix":** Matrix-style layout (`taproom-craft.html` & `menu.html`) showcasing rotating tap handles alongside rare bottled cellar vintages.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Assorted Table Wine & Shop` — Cellar grid layout with burgundy/charcoal palette.
2. `Bar à Vins` — Parisian Minimalist Cellar Salon with Garamond serif display and bordeaux tones.
3. `DeepCuts HiFi` — Audiophile vinyl black journal layout with Syne/Space Mono fonts.

### Divergent Choices for Brawley’s Beverage

- **Hero Composition:** Craft Taphouse & Cellar Stamp Vault with an off-center asymmetrical layout: left side features a bold industrial copper tap stamp badge (`"PARK ROAD TAPROOM • EST. 2003"`), heavy slab craft typography (*Bitter*), deep amber stout & copper rust palette, and right side features a wooden barrel-framed photo of the taproom.
- **Section Rhythm:** Replaced standard card grids with **Cellar Vault Cards** (`cellar-vault-card`) and **Homebrew & Porch Highlights**.
- **HTML Vocabulary:** Completely unique class names (`brawley-header`, `amber-brand`, `taproom-hero-stage`, `copper-stamp-badge`, `cellar-vault-card`, `brawley-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 4620 Park Rd, Charlotte, NC 28209 on Park Road | `visit.html`, `index.html`, `concept.html` | [Charlotte is Creative](https://charlotteiscreative.com) |
| Operating hours: Mon/Sun 12-5 PM, Tue-Fri 12-7 PM, Sat 11 AM-7 PM | `visit.html`, `index.html` | [BeerMenus Directory](https://beermenus.com) |
| Contact phone is (704) 521-1300 | `visit.html`, `concept.html` | [Charlotte is Creative](https://charlotteiscreative.com) |
| Established in 2003 as Charlotte's pioneer craft beer taproom & bottle shop | `index.html`, `concept.html`, `taproom-craft.html` | [Untappd Directory](https://untappd.com) |
| Features rotating draft microbrews, Black Saturday stout events, and homebrew supplies | `menu.html`, `homebrew-craft.html` | [Untappd Directory](https://untappd.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Brawley’s Black Saturday Stout Vault Pass:** VIP event ticket & rare stout allocation engine.
- **Park Road Growler & Bottle Reserve Club:** Monthly craft beer bottle subscription portal.
- **Homebrew Supply Inventory & Recipe Calculator:** Grains & hops order builder.
- **Fresh Draft SMS Tap Alert Engine:** Real-time SMS notification for rare keg tappings.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or growler ordering engine.
- No submission forms of any kind (no contact, event ticket, or newsletter forms).
- No automated SMS or email marketing tools.
- No live keg pressure or draft inventory tracking.

### Available for Production Scope

- Custom zero-commission bottle shop e-commerce store.
- Growler fill reservation portal.
- Homebrew recipe kit order builder.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs brawley-s-beverage` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
