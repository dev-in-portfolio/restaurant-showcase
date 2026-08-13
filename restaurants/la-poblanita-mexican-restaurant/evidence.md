# La Poblanita Mexican Restaurant — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** La Poblanita Mexican Restaurant
- **Slug:** `la-poblanita-mexican-restaurant`
- **Audit Grade / Disposition / Score:** A / YES / 95
- **Audit Batch:** 11
- **Verification Date:** August 13, 2026

## Verification Sources

- [La Poblanita Official Portal](https://lapoblanitarestaurant.com)
- [Fun 4 Charlotte Kids — La Poblanita Listing](https://fun4charlottekids.com)
- [Uber Eats — La Poblanita Charlotte Profile](https://www.ubereats.com)

## Original Audit Weakness

La Poblanita Mexican Restaurant relies on basic social media pages and third-party delivery apps (Uber Eats, DoorDash, Postmates). Located at 1925 Westinghouse Blvd, it lacks an owned digital showcase capturing its 15-year Puebla family heritage, scratch Mole Poblano preparation, party platter catering, and taqueria directives.

## Creative Brief

### Verified Visual / Content Anchors

1. **Westinghouse Blvd Location:** 1925 Westinghouse Blvd, Charlotte NC 28273 (Southwest Charlotte / Steele Creek area).
2. **Puebla Mexican Specialties:** Signature Mole Poblano Chicken, Birria Tacos with Consommé, Authentic Street Tacos (Al Pastor, Carne Asada, Carnitas, Chorizo), Chiles Rellenos, Sopes, Handmade Corn Tortillas, Fresh Guacamole, & Horchata.
3. **Contact & Operating Hours:** Phone (704) 588-5700; Sun–Thu 9:00 AM – 9:00 PM | Fri–Sat 9:00 AM – 10:00 PM. Est 2009.

### Core Design Moves

1. **Warm Rustic Typography:** Warm serif (*Fraunces*) paired with clean body sans (*Plus Jakarta Sans*) and Puebla taqueria mono (*Space Mono*).
2. **Puebla Terracotta Brick & Agave Amber Palette:** Authentic Mexican palette anchored in deep Puebla terracotta brick (`#7C2D12`), agave amber (`#D97706`), cilantro emerald (`#047857`), and warm cornmeal cream (`#FFFBEB`).
3. **"The Puebla Mole & Street Taco Matrix":** Matrix-style dual column layout (`puebla-mole-craft.html` & `menu.html`) showcasing 20-ingredient Mole Poblano alongside hand-crafted street tacos & handmade tortillas.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `La Lima Sangucheria` — Peruvian Andean Sun with Syne fonts and Deep Andean Red/Lime Green.
2. `La Bonbonniere Bakery` — Parisian Patisserie with Playfair Display fonts and Rich Espresso Chocolate/Honey Gold.
3. `King Fish Poke` — Hawaiian Pacific Sunburst with Outfit fonts and Deep Pacific Navy/Tropical Mango.

### Divergent Choices for La Poblanita Mexican Restaurant

- **Hero Composition:** Puebla Hacienda Terracotta & Authentic Mexican Taqueria Vault split-hero layout: left side features a Talavera Tile stamp badge (`"TRADITIONAL PUEBLA KITCHEN & TAQUERIA • EST 2009 • CHARLOTTE NC"`), warm rustic serif (*Fraunces*), Puebla terracotta & agave amber palette, and right side features a bold framed hero image of authentic street tacos & handmade corn tortillas.
- **Section Rhythm:** Replaced standard card grids with **La Poblanita Vault Cards** (`poblanita-vault-card`) and Westinghouse Blvd dining highlights.
- **HTML Vocabulary:** Completely unique class names (`poblanita-header`, `poblanita-brand`, `hacienda-hero-stage`, `talavera-stamp-badge`, `poblanita-vault-card`, `poblanita-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 1925 Westinghouse Blvd in Charlotte NC 28273 | `visit.html`, `index.html`, `concept.html` | [La Poblanita Direct Portal](https://lapoblanitarestaurant.com) |
| Operating hours: Sun-Thu 9am-9pm, Fri-Sat 9am-10pm | `visit.html`, `index.html` | [La Poblanita Direct Portal](https://lapoblanitarestaurant.com) |
| Phone number: (704) 588-5700 | `visit.html`, `index.html` | [La Poblanita Direct Portal](https://lapoblanitarestaurant.com) |
| Signature Mole Poblano Chicken, Birria Tacos, & Chiles Rellenos | `menu.html`, `puebla-mole-craft.html` | [La Poblanita Direct Portal](https://lapoblanitarestaurant.com) |
| Street Tacos (Al Pastor, Carne Asada, Carnitas), Guacamole, & Horchata | `menu.html`, `street-tacos-craft.html` | [La Poblanita Direct Portal](https://lapoblanitarestaurant.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **La Poblanita Direct Taqueria Order Engine:** Zero-commission direct online ordering portal for local pickup & delivery.
- **La Poblanita Party Platter Catering Engine:** Taqueria catering portal for family celebrations & corporate luncheons.
- **La Poblanita VIP Amigos Club Rewards Engine:** Exclusive VIP rewards portal for Charlotte Mexican food lovers.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table seating reservation integration.

### Available for Production Scope

- Custom zero-commission direct mobile taqueria ordering app.
- Interactive taco platter customization tool & salsa bar calculator.
- Custom party catering & fiesta event booking portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs la-poblanita-mexican-restaurant` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
