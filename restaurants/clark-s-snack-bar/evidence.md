# Clark’s Snack Bar — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Clark’s Snack Bar
- **Slug:** `clark-s-snack-bar`
- **Audit Grade / Disposition / Score:** A / YES / 92
- **Audit Batch:** 4
- **Verification Date:** August 12, 2026

## Verification Sources

- [Clark's Snack Bar Official Website](https://clarkssnackbar.com)
- [Unpretentious Palate / Substack Feature](https://substack.com)
- [Uber Eats — Clark's Snack Bar Charlotte Listing](https://ubereats.com)

## Original Audit Weakness

Clark’s Snack Bar relies on basic ordering platforms (`clarkssnackbar.com`, `ubereats.com`). Located at 3001 Central Ave in Plaza Midwood, it lacks an owned digital showcase capturing its retro 70s snack bar nostalgia, Montreal bagel & pastrami craft, weekend breakfast culture, and custom wiener bar.

## Creative Brief

### Verified Visual / Content Anchors

1. **Plaza Midwood Central Ave Location:** 3001 Central Ave, Charlotte NC 28205 (Plaza Midwood / Central Ave).
2. **Montreal Bagels & Steamed Pastrami:** Hand-rolled honey-boiled Montreal-style bagels, hot spiced pastrami on rye with deli mustard, and smashed diner wieners.
3. **Weekend Breakfast & All-Day Egg Sandwiches:** Saturday & Sunday breakfast (9am-2pm), all-day egg sandwiches, smash burgers, and crisp hand-cut fries.

### Core Design Moves

1. **Retro 70s Diner Display Typography:** Groovy rounded 70s display sans (*Space Grotesk*) paired with clean body sans (*Outfit*) and diner ticket mono (*Space Mono*).
2. **Mustard & Diner Cherry Red Palette:** Nostalgic snack bar palette anchored in vintage mustard yellow (`#D9822B`), diner cherry red (`#C42B28`), toasted sesame gold (`#E8A938`), diner counter cream (`#FFF9EE`), and dark charcoal (`#1F1A17`).
3. **"The Montreal Bagel & Hot Pastrami Wiener Matrix":** Matrix-style dual column layout (`pastrami-bagel-craft.html` & `menu.html`) showcasing hand-rolled Montreal bagels alongside classic diner wieners and pastrami stacks.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Circle G Restaurant` — Classic 1954 Southern diner with Playfair Display/Outfit fonts.
2. `Cilantro Noodle + Kitchen` — Modern Vietnamese noodle bar with Outfit/Plus Jakarta Sans fonts.
3. `Chop Chop Red Pot` — Southern smoked street food joint with Outfit/Plus Jakarta Sans fonts.

### Divergent Choices for Clark’s Snack Bar

- **Hero Composition:** Retro 1970s Diner & Pastrami Baguette Vault split-hero layout: left side features a mustard yellow snack bar stamp badge (`"RETRO DINER & SNACK BAR • PLAZA MIDWOOD 3001 CENTRAL"`), groovy display typography (*Space Grotesk*), mustard & diner cherry red palette, and right side features a sunlit framed hero image of stacked pastrami on a Montreal bagel, wieners, and hand-cut fries.
- **Section Rhythm:** Replaced standard card grids with **Snack Vault Cards** (`snack-vault-card`) and **Retro Diner Highlights**.
- **HTML Vocabulary:** Completely unique class names (`clark-header`, `snack-brand`, `groovy-hero-stage`, `mustard-stamp-badge`, `snack-vault-card`, `clark-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 3001 Central Ave in Plaza Midwood Charlotte NC | `visit.html`, `index.html`, `concept.html` | [Clark's Official Site](https://clarkssnackbar.com) |
| Operating hours: Mon-Thu 11-8, Fri 11-9, Sat 9-9, Sun 9-5 | `visit.html`, `index.html` | [Clark's Official Site](https://clarkssnackbar.com) |
| Phone contact: (980) 207-1168 | `visit.html`, `concept.html` | [Clark's Official Site](https://clarkssnackbar.com) |
| Serves Montreal bagels, hot pastrami on rye, & classic wieners | `menu.html`, `pastrami-bagel-craft.html` | [Substack Feature](https://substack.com) |
| Features weekend breakfast (Sat-Sun 9am-2pm) & all-day egg sandwiches | `menu.html`, `wiener-craft.html` | [Uber Eats Listing](https://ubereats.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Clark’s Express Wiener & Bagel Pickup Portal:** Direct non-aggregate snack bar order engine.
- **Pastrami Drop & Bagel Batch SMS Alert Engine:** Real-time SMS notifications for fresh Montreal bagel & pastrami releases.
- **Plaza Midwood Snack Club Stamp Card:** Mobile loyalty stamp card for complimentary pastrami slider or fries.
- **Weekend Breakfast Call & Pickup Reservation Engine:** Fast weekend morning egg sandwich reservation tool.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, catering request, or newsletter forms).
- No automated SMS or email marketing tools.
- No live counter queue counter.

### Available for Production Scope

- Custom zero-commission direct ordering portal.
- Interactive custom wiener & bagel combo builder.
- Plaza Midwood office party pastrami & bagel catering engine.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs clark-s-snack-bar` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
