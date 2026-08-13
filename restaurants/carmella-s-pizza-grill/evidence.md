# Carmella’s Pizza Grill — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Carmella’s Pizza Grill
- **Slug:** `carmella-s-pizza-grill`
- **Audit Grade / Disposition / Score:** A / YES / 96
- **Audit Batch:** 4
- **Verification Date:** August 11, 2026

## Verification Sources

- [Slice Life — Carmella’s Pizza Grill Montford Dr](https://slicelife.com)
- [DoorDash — Carmella’s Pizza Grill South Tryon](https://doordash.com)
- [Postmates — Carmella’s Menu & Hours](https://postmates.com)

## Original Audit Weakness

Carmella’s Pizza Grill relies on third-party delivery aggregate ordering links (`slicelife.com`, `doordash.com`, `ubereats.com`). Located at 8124 S Tryon St and 1513 Montford Dr in Charlotte NC, it lacks an owned digital showcase capturing its hand-tossed stone-baked NY crusts, authentic Italian sub grill, family pizza combo deals, and local delivery.

## Creative Brief

### Verified Visual / Content Anchors

1. **South Tryon & Montford Dr Charlotte Locations:** Flagship pizzeria at 8124 S Tryon St, Charlotte NC 28273 (South Tryon / Steele Creek) and 1513 Montford Dr, Charlotte NC 28209 (Montford Park).
2. **Hand-Tossed NY Stone-Baked Crusts:** Classic cheese pies, pepperoni, meat lovers, Margherita, white garlic spinach, calzones, and strombolis.
3. **Pizzeria Grill & Hot Subs:** Philly cheesesteaks, hot Parmigiana heroes, Reuben sandwiches, buffalo wings, and garlic knots.

### Core Design Moves

1. **New York Red-Checkered Pizzeria Typography:** Bold slab display (*Bitter*) paired with clean modern sans (*Plus Jakarta Sans*) and pizzeria technical mono (*Space Mono*).
2. **Crimson & Crust Palette:** Traditional NY pizzeria palette anchored in deep crimson tomato (`#8B1E1B`), oregano basil green (`#1E4D3A`), warm toasted crust gold (`#D98A2B`), cream flour parchment (`#FAF7F2`), and charcoal slate (`#1F2421`).
3. **"The NY Hand-Tossed Crust & Italian Hero Sub Matrix":** Matrix-style dual column layout (`pizza-craft.html` & `menu.html`) showcasing stone-baked pizzas alongside grilled Philly cheesesteaks and hot heroes.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Buona Vita Pub & Pizzeria` — Tuscan brick hearth tavern with Playfair Display/Plus Jakarta Sans fonts.
2. `Caribbean Hut` — Sunny Caribbean island kitchen with Outfit/Playfair Display fonts.
3. `Café Audire` — Mid-Century modern walnut analog vinyl lounge with Playfair/Outfit fonts.

### Divergent Choices for Carmella’s Pizza Grill

- **Hero Composition:** Classic NY Neighborhood Pizzeria & Hero Grill Vault split-hero layout: left side features a red-and-white checkered pizza stamp badge (`"HAND-TOSSED NY PIZZERIA • SOUTH TRYON & MONTFORD"`), heavy retro slab display typography (*Bitter*), deep crimson tomato red & toasted flour parchment palette, and right side features a stone-baked pizza image with melted mozzarella and fresh basil.
- **Section Rhythm:** Replaced standard card grids with **Slice Vault Cards** (`slice-vault-card`) and **NY Stone Hearth Highlights**.
- **HTML Vocabulary:** Completely unique class names (`carmella-header`, `pizzeria-brand`, `crust-hero-stage`, `checkered-stamp-badge`, `slice-vault-card`, `carmella-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 8124 S Tryon St & 1513 Montford Dr in Charlotte NC | `visit.html`, `index.html`, `concept.html` | [Slice Life Listing](https://slicelife.com) |
| Operating hours: Open daily 10:30 AM – 10:00 PM | `visit.html`, `index.html` | [DoorDash Listing](https://doordash.com) |
| Features hand-tossed NY stone-baked pizzas, calzones, and strombolis | `menu.html`, `pizza-craft.html` | [Slice Life Listing](https://slicelife.com) |
| Serves Philly cheesesteaks, hot Parmigiana subs, wings, and garlic knots | `menu.html`, `sub-craft.html` | [Postmates Listing](https://postmates.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Carmella's Express NY Slice Order & Delivery Engine:** Direct non-aggregate pizza ordering portal.
- **Family Game Night & Party Combo Builder:** Large pizza, wings & garlic knot combo calculator.
- **Carmella's VIP Slice Club Loyalty Stamp Card:** Mobile SMS stamp card for complimentary garlic knots.
- **Late-Night Slice Delivery Alert Engine:** Real-time SMS notification for game night pizza delivery.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, party order, or newsletter forms).
- No automated SMS or email marketing tools.
- No live pizza oven tracker.

### Available for Production Scope

- Custom zero-commission direct ordering portal.
- Family combo pizza builder.
- Group party catering engine.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs carmella-s-pizza-grill` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
