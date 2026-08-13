# Chez Marie Pâtisserie — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Chez Marie Pâtisserie
- **Slug:** `chez-marie-patisserie`
- **Audit Grade / Disposition / Score:** A / YES / 92
- **Audit Batch:** 4
- **Verification Date:** August 12, 2026

## Verification Sources

- [Chez Marie Pâtisserie Official Website](https://chezmarieclt.com)
- [SouthPark CLT — Chez Marie Directory](https://southparkclt.org)
- [ezCater — Chez Marie Pâtisserie Catering](https://ezcater.com)

## Original Audit Weakness

Chez Marie Pâtisserie relies on basic showcase pages (`chezmarieclt.com`) and third-party catering templates (`ezcater.com`). Located at 4732 Sharon Rd in SouthPark Charlotte, it lacks an owned digital showcase capturing its authentic French pastry craft, afternoon high tea service, artisanal quiche lunches, and event pastry platters.

## Creative Brief

### Verified Visual / Content Anchors

1. **Sharon Corners SouthPark Location:** 4732 Sharon Rd, Suite M, Charlotte NC 28210 (Sharon Corners / SouthPark).
2. **Authentic French Viennoiserie & Pâtisserie:** Scratch-baked butter croissants, pistachio eclairs, French macarons, sourdough baguettes, mousse desserts, and quiche.
3. **Salon de Thé & Pellini Coffee:** French High Afternoon Tea Service (daily 2pm-4pm), Pellini Italian espresso, and premium French teas.

### Core Design Moves

1. **Parisian High-Fashion Typography:** Regal luxury serif (*Cormorant Garamond*) paired with clean modern sans (*Outfit*) and bakery technical mono (*Space Mono*).
2. **Royal Navy & Champagne Gold Palette:** Elegant French palette anchored in Parisian royal navy (`#16233B`), rose champagne gold (`#D4AF37`), pistachio cream (`#F7F4EB`), rose blush (`#E8C5C8`), and butter crust gold (`#C89B48`).
3. **"The Parisian Pâtisserie Counter & High Tea Matrix":** Matrix-style dual column layout (`pastry-craft.html` & `menu.html`) showcasing hand-laminated viennoiserie alongside French afternoon tea towers.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Cheat’s Cheesesteaks` — High-octane Philly cheesesteak joint with Outfit/Plus Jakarta Sans fonts.
2. `Chaat ’N’ Dosa` — South Indian saffron spice & paper dosa layout with Playfair/Outfit fonts.
3. `Carmella’s Pizza Grill` — New York red-checkered pizzeria with Bitter/Plus Jakarta Sans fonts.

### Divergent Choices for Chez Marie Pâtisserie

- **Hero Composition:** High-End Parisian Salon de Thé & Viennoiserie Vault split-hero layout: left side features a French navy gold stamp badge (`"FRENCH PÂTISSERIE & SALON DE THÉ • SOUTHPARK CHARLOTTE"`), luxury serif display typography (*Cormorant Garamond*), Parisian navy & champagne gold palette, and right side features a sunlit marble counter hero image of croissants, eclairs, macarons, and espresso.
- **Section Rhythm:** Replaced standard card grids with **Pastry Vault Cards** (`pastry-vault-card`) and **Salon de Thé Highlights**.
- **HTML Vocabulary:** Completely unique class names (`chez-header`, `patisserie-brand`, `salon-hero-stage`, `champagne-stamp-badge`, `pastry-vault-card`, `chez-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 4732 Sharon Rd, Suite M in Sharon Corners SouthPark Charlotte NC | `visit.html`, `index.html`, `concept.html` | [SouthPark CLT Directory](https://southparkclt.org) |
| Operating hours: Tue-Sat 8am-6pm, Sun 10am-5pm; Tea Time daily 2pm-4pm | `visit.html`, `index.html` | [SouthPark CLT Directory](https://southparkclt.org) |
| Phone contact: (704) 910-3013 | `visit.html`, `concept.html` | [SouthPark CLT Directory](https://southparkclt.org) |
| Serves butter croissants, pistachio eclairs, macarons, baguettes, and quiche | `menu.html`, `pastry-craft.html` | [Chez Marie Official](https://chezmarieclt.com) |
| Hosts daily French Afternoon High Tea service with Pellini coffee & French teas | `menu.html`, `tea-craft.html` | [SouthPark CLT Directory](https://southparkclt.org) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Chez Marie Salon de Thé High Tea Reservation Engine:** Direct French tea time table booking engine.
- **French Pastry Box & Wedding Dessert Catering Engine:** Custom macarons & croquembouche event builder.
- **Chez Marie VIP Pâtisserie Club Stamp Card:** Mobile SMS stamp card for complimentary espresso & macaron.
- **Fresh Baguette & Croissant Morning Alert Engine:** Real-time SMS notification when morning viennoiserie leaves the oven.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, catering request, or tea reservation forms).
- No automated SMS or email marketing tools.
- No live pastry oven timer.

### Available for Production Scope

- Custom zero-commission direct ordering portal.
- High Tea reservation booking system.
- Corporate breakfast pastry platter builder.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs chez-marie-patisserie` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
