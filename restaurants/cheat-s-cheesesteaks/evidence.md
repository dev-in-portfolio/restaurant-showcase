# Cheat’s Cheesesteaks — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Cheat’s Cheesesteaks
- **Slug:** `cheat-s-cheesesteaks`
- **Audit Grade / Disposition / Score:** A / YES / 91
- **Audit Batch:** 4
- **Verification Date:** August 11, 2026

## Verification Sources

- [Cheat’s Cheesesteaks Official Website](https://eatcheats.com)
- [Toast Tab — Cheat’s Cheesesteaks South End](https://toasttab.com)
- [South End CLT — Cheat’s Cheesesteaks Directory](https://southendclt.org)

## Original Audit Weakness

Cheat’s Cheesesteaks relies on basic ordering templates (`eatcheats.com`, `toasttab.com`). Located at 913 Pecan Ave and 2137 Hawkins St, it lacks a high-energy digital showcase capturing its authentic Philly Amoroso roll craft, Cooper Sharp cheese melt process, beef tallow fryer, and Plaza Midwood walk-up window culture.

## Creative Brief

### Verified Visual / Content Anchors

1. **Plaza Midwood & South End Charlotte Locations:** Walk-up window at 913 Pecan Ave, Charlotte NC 28205 (Plaza Midwood) and 2137 Hawkins St, Charlotte NC 28203 (South End).
2. **Authentic Philly Ribeye & Cooper Sharp Cheese:** House-shaved ribeye, Cooper Sharp American cheese melted to velvet, Wiz wit onions, fried chicken cheesesteaks, and vegan options.
3. **Tallow Fryer & Bakery Treats:** Double-fried beef tallow french fries, hot powdered sugar beignets, pretzel bites, and dirty sodas.

### Core Design Moves

1. **High-Octane Athletic Philly Typography:** Heavy sans display (*Outfit*) paired with clean modern sans (*Plus Jakarta Sans*) and griddle technical mono (*Space Mono*).
2. **Asphalt Charcoal & Cooper Sharp Yellow Palette:** High-contrast urban palette anchored in asphalt charcoal (`#18191C`), molten Cooper Sharp yellow (`#F5B81C`), ribeye brown (`#7A3E26`), paper white (`#FBF9F5`), and ketchup red (`#D93829`).
3. **"The Amoroso Roll & Flat-Top Sizzle Matrix":** Matrix-style dual column layout (`cheesesteak-craft.html` & `menu.html`) showcasing shaved ribeye cheesesteaks alongside beef tallow fries and warm beignets.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Chaat ’N’ Dosa` — South Indian saffron spice & paper dosa layout with Playfair/Outfit fonts.
2. `Carmella’s Pizza Grill` — New York red-checkered pizzeria with Bitter/Plus Jakarta Sans fonts.
3. `Caribbean Hut` — Sunny Caribbean island kitchen with Outfit/Playfair Display fonts.

### Divergent Choices for Cheat’s Cheesesteaks

- **Hero Composition:** High-Octane Philly Amoroso & Cooper Sharp Cheese Vault split-hero layout: left side features a Cooper Sharp yellow stamp badge (`"AUTHENTIC PHILLY CHEESESTEAKS • PLAZA MIDWOOD & SOUTH END"`), athletic heavy display typography (*Outfit*), asphalt charcoal & Cooper Sharp yellow palette, and right side features a framed hero image of shaved ribeye cheesesteak with melted cheese and fries.
- **Section Rhythm:** Replaced standard card grids with **Ribeye Vault Cards** (`ribeye-vault-card`) and **Flat-Top Sizzle Highlights**.
- **HTML Vocabulary:** Completely unique class names (`cheats-header`, `cheesesteak-brand`, `sizzle-hero-stage`, `cooper-stamp-badge`, `ribeye-vault-card`, `cheats-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 913 Pecan Ave & 2137 Hawkins St in Charlotte NC | `visit.html`, `index.html`, `concept.html` | [Cheat’s Official](https://eatcheats.com) |
| Operating hours: Plaza Midwood (11am-9pm daily); South End (9am-9pm daily) | `visit.html`, `index.html` | [Cheat’s Official](https://eatcheats.com) |
| South End phone: (980) 216-6323 | `visit.html`, `concept.html` | [South End CLT Directory](https://southendclt.org) |
| Serves house-shaved ribeye cheesesteaks, Cooper Sharp cheese, Amoroso rolls, & fried chicken steaks | `menu.html`, `cheesesteak-craft.html` | [Toast Tab Menu](https://toasttab.com) |
| Serves beef tallow fries, hot beignets, pretzel bites, and dirty sodas | `menu.html`, `fries-craft.html` | [Cheat’s Official](https://eatcheats.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Cheat's Express Line-Cutter Mobile Order Engine:** Direct non-aggregate walk-up window ordering portal.
- **Cheesesteak Party Box & Game Day Catering Engine:** Tailgate party box order builder.
- **Cheat's VIP Cheesesteak Loyalty Stamp Card:** Mobile SMS stamp card for complimentary beef tallow fries.
- **Secret Steak Drop SMS Alert Engine:** Real-time SMS notification for limited-edition monthly cheesesteak specials.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, catering request, or newsletter forms).
- No automated SMS or email marketing tools.
- No live flat-top grill queue tracker.

### Available for Production Scope

- Custom zero-commission direct ordering portal.
- Tailgate party box builder.
- Corporate lunch catering engine.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs cheat-s-cheesesteaks` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
