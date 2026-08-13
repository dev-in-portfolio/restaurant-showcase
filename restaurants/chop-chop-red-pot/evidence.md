# Chop Chop Red Pot — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Chop Chop Red Pot
- **Slug:** `chop-chop-red-pot`
- **Audit Grade / Disposition / Score:** A / YES / 99
- **Audit Batch:** 4
- **Verification Date:** August 12, 2026

## Verification Sources

- [Chop Chop Red Pot Official Website](https://chopchopredpot.com)
- [Uber Eats — Chop Chop Red Pot Listing](https://ubereats.com)
- [Street Food Finder — Chop Chop Red Pot Schedule](https://streetfoodfinder.com)

## Original Audit Weakness

Chop Chop Red Pot relies on basic ordering templates (`chopchopredpot.com`, `ubereats.com`). Located at 224 E 7th St in Uptown Charlotte, it lacks an owned digital showcase capturing its 12-hour hickory smoke technique, Southern street food identity, food truck/7th Street Market dual presence, and event catering engine.

## Creative Brief

### Verified Visual / Content Anchors

1. **7th Street Market Uptown Location:** 224 E 7th St, Charlotte NC 28202 (The Market at 7th Street / Uptown Charlotte).
2. **12-Hour Smoked Brisket & Southern Street Food:** Hickory-smoked brisket smashburgers, braised short rib grilled cheese, Carolina pulled pork & chicken, smoked pork belly, and shrimp & grits.
3. **Street Sides & Mobile Truck Catering:** Fried Brussels sprouts with balsamic glaze, mac & cheese bites, collard greens, and food truck event pop-ups across Charlotte.

### Core Design Moves

1. **Heavy Industrial Southern Typography:** Heavy slab sans display (*Outfit* heavy) paired with clean body sans (*Plus Jakarta Sans*) and smokehouse technical mono (*Space Mono*).
2. **Smokey Red & Hickory Charcoal Palette:** High-impact smokehouse palette anchored in deep charcoal (`#1A1A1D`), fiery red-orange (`#C82A27`), hickory amber (`#D97724`), butcher paper cream (`#F7F4EE`), and cast iron black (`#111113`).
3. **"The 12-Hour Hickory Smoke & Southern Smashburger Matrix":** Matrix-style dual column layout (`hickory-smoke-craft.html` & `menu.html`) showcasing low-and-slow smokehouse meats alongside artisanal street food sides.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Choi’s Korea & Wing` — Korean double-fried wing joint with Plus Jakarta Sans/Outfit fonts.
2. `CHNO Coffee Co.` — Modern chemical caffeine lab with Space Grotesk/Outfit fonts.
3. `Chez Marie Pâtisserie` — Parisian high-fashion pâtisserie with Cormorant Garamond/Outfit fonts.

### Divergent Choices for Chop Chop Red Pot

- **Hero Composition:** Southern Hickory Smoked Street Food & Red Pot Smokehouse Vault split-hero layout: left side features a fiery red smokehouse stamp badge (`"SOUTHERN STREET FOOD & HICKORY SMOKE • 7TH ST MARKET UPTOWN"`), heavy industrial slab display typography (*Outfit* heavy), smokey red & charcoal palette, and right side features a sunlit framed hero image of smoked brisket smashburgers and pulled pork.
- **Section Rhythm:** Replaced standard card grids with **Smokehouse Vault Cards** (`smoke-vault-card`) and **Southern Street Food Highlights**.
- **HTML Vocabulary:** Completely unique class names (`chop-header`, `redpot-brand`, `smoke-hero-stage`, `red-stamp-badge`, `smoke-vault-card`, `chop-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 224 E 7th St in 7th Street Market Charlotte NC | `visit.html`, `index.html`, `concept.html` | [Chop Chop Red Pot](https://chopchopredpot.com) |
| Operating hours: Tue-Sun 11am-8pm; Closed Mondays | `visit.html`, `index.html` | [Chop Chop Red Pot](https://chopchopredpot.com) |
| Phone contact: (704) 454-2619 | `visit.html`, `concept.html` | [Chop Chop Red Pot](https://chopchopredpot.com) |
| Serves 12-hour hickory smoked brisket smashburgers, short rib grilled cheese, & pulled pork | `menu.html`, `hickory-smoke-craft.html` | [Uber Eats Menu](https://ubereats.com) |
| Features fried Brussels sprouts, mac & cheese bites, shrimp & grits, & food truck catering | `menu.html`, `street-sides-craft.html` | [Street Food Finder](https://streetfoodfinder.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Chop Chop Express Mobile Pickup & Order Portal:** Direct non-aggregate street food order engine.
- **Food Truck Location Tracker & Event Booking Engine:** Live GPS and schedule reservation tool for food truck catering.
- **Red Pot Loyalty Pitmaster Stamp Card:** Mobile SMS stamp card for complimentary brisket smashburger upgrades.
- **Secret Smoked Meat Drop SMS Alert Engine:** Real-time SMS notification when limited brisket batches come out of the smoker.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, catering request, or newsletter forms).
- No automated SMS or email marketing tools.
- No live smoker pit temperature gauge.

### Available for Production Scope

- Custom zero-commission direct ordering portal.
- Food truck event booking & catering quote engine.
- Corporate smoked barbecue box catering system.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs chop-chop-red-pot` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
