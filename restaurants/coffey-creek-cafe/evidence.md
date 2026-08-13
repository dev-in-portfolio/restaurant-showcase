# Coffey Creek Café — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Coffey Creek Café
- **Slug:** `coffey-creek-cafe`
- **Audit Grade / Disposition / Score:** A / YES / 97
- **Audit Batch:** 5
- **Verification Date:** August 12, 2026

## Verification Sources

- [Joe Coffee Directory — Coffey Creek Cafe Profile](https://joe.coffee)
- [SinglePlatform Menu Directory — Coffey Creek Cafe Charlotte](https://singleplatform.com)
- [Hey-Restaurants — Coffey Creek Cafe Charlotte](https://hey-restaurants.com)

## Original Audit Weakness

Coffey Creek Café relies on basic third-party online menus (`joe.coffee`, `hey-restaurants.com`). Operating since 1987 at 1700 Center Park Dr, it lacks an owned digital showcase capturing its 39-year Southern breakfast heritage, Center Park lunch crowd tradition, house-cut deli sandwiches, and morning coffee culture.

## Creative Brief

### Verified Visual / Content Anchors

1. **Center Park Drive Location:** 1700 Center Park Dr, Charlotte NC 28217 (West Charlotte / Center Park Business Park).
2. **39-Year Southern Breakfast Staples:** Operating since 1987 serving triple egg platters, Carolina livermush, country ham biscuits, crispy bacon, sausage, and buttered grits.
3. **Hot Lunch Deli & Morning Coffee:** Mon-Fri 7am-3pm hours, grilled thick-cut bologna, classic Reuben on rye, tuna salad melts, and freshly brewed diner coffee.

### Core Design Moves

1. **Heritage Southern Serif Typography:** Classic Southern diner serif (*Lora*) paired with clean body sans (*Outfit*) and diner ticket mono (*Space Mono*).
2. **Espresso & Copper Chestnut Palette:** Nostalgic diner palette anchored in dark roasted espresso (`#1F1512`), warm copper chestnut (`#A0522D`), buttered biscuit gold (`#D99B26`), soft morning steam linen (`#FAF6F0`), and Center Park slate (`#2C3E35`).
3. **"The 39-Year Center Park Breakfast & Deli Matrix":** Matrix-style dual column layout (`southern-breakfast-craft.html` & `menu.html`) showcasing hearty Southern breakfast plates alongside deli lunch classics.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Club West Brewing` — Modern brewery taproom with Outfit/Plus Jakarta Sans fonts and Electric Hops Green.
2. `Clark’s Snack Bar` — Retro 70s diner with Space Grotesk/Outfit fonts and Mustard Yellow.
3. `Circle G Restaurant` — 1954 Southern diner with Playfair Display/Outfit fonts and Cast-Iron Walnut.

### Divergent Choices for Coffey Creek Café

- **Hero Composition:** 1987 Southern Breakfast & Center Park Deli Counter Vault split-hero layout: left side features a warm coffee brown stamp badge (`"EST. 1987 • CENTER PARK DR • CHARLOTTE NC"`), heritage serif display typography (*Lora*), roasted espresso & warm copper palette, and right side features a sunlit framed hero image of a triple-egg Southern breakfast platter, country ham biscuit, and coffee mug.
- **Section Rhythm:** Replaced standard card grids with **Coffey Vault Cards** (`coffey-vault-card`) and **Center Park Diner Highlights**.
- **HTML Vocabulary:** Completely unique class names (`coffey-header`, `creek-brand`, `roast-hero-stage`, `biscuit-stamp-badge`, `coffey-vault-card`, `coffey-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 1700 Center Park Dr in Charlotte NC | `visit.html`, `index.html`, `concept.html` | [Joe Coffee Directory](https://joe.coffee) |
| Operating hours: Mon-Fri 7:00 AM – 3:00 PM (Closed Sat-Sun) | `visit.html`, `index.html` | [Joe Coffee Directory](https://joe.coffee) |
| Phone number: (704) 357-6117 | `visit.html`, `index.html` | [Joe Coffee Directory](https://joe.coffee) |
| Serving Charlotte since 1987 (39 years of Southern diner heritage) | `concept.html`, `index.html` | [Hey-Restaurants](https://hey-restaurants.com) |
| Triple egg plates, country ham biscuits, Carolina livermush, & buttered grits | `menu.html`, `southern-breakfast-craft.html` | [SinglePlatform Menu](https://singleplatform.com) |
| Grilled thick-cut bologna, classic Reuben on rye, & tuna salad melts | `menu.html`, `deli-lunch-craft.html` | [SinglePlatform Menu](https://singleplatform.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Coffey Creek Express Lunch Pick-Up Portal:** Direct phone & mobile pickup ordering engine for Center Park workers.
- **Office Breakfast Biscuit Box & Coffee Catering Engine:** Direct platter booking tool for morning corporate meetings.
- **Center Park Daily Lunch Special SMS Alert Engine:** Text alerts for daily weekday sandwich specials & soup of the day.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table reservation engine.

### Available for Production Scope

- Custom zero-commission direct ordering portal.
- Interactive custom breakfast platter builder.
- Center Park corporate lunch catering management system.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs coffey-creek-cafe` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
