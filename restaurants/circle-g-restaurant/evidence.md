# Circle G Restaurant — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Circle G Restaurant
- **Slug:** `circle-g-restaurant`
- **Audit Grade / Disposition / Score:** A / YES / 98
- **Audit Batch:** 4
- **Verification Date:** August 12, 2026

## Verification Sources

- [Circle G Restaurant Official Shop](https://circlegrestaurant.shop)
- [Grubhub — Circle G Restaurant Charlotte Listing](https://grubhub.com)
- [Wanderlog — Circle G Restaurant Guide](https://wanderlog.com)

## Original Audit Weakness

Circle G Restaurant relies on basic ordering shops (`circlegrestaurant.shop`, `grubhub.com`). Located at 4818 Rozzelles Ferry Rd in West Charlotte, it lacks an owned digital showcase capturing its 70+ year Southern diner heritage, early morning country breakfast roots, smothered gravy meats, and community gathering status.

## Creative Brief

### Verified Visual / Content Anchors

1. **Rozzelles Ferry West Charlotte Location:** 4818 Rozzelles Ferry Rd, Charlotte NC 28216 (Rozzelles Ferry / West Charlotte).
2. **Early Morning Country Breakfast:** Ribeye steak & eggs, country ham biscuits, buttered grits, sausage gravy, and bottomless mug diner coffee.
3. **Smothered Gravy Entrees & Desserts:** Grilled hamburger steak with onions & gravy, baked chicken over rice, fried pork chops, and house strawberry banana pudding.

### Core Design Moves

1. **Classic Southern Serif Diner Typography:** Warm Southern serif display (*Playfair Display*) paired with clean body sans (*Outfit*) and diner technical mono (*Space Mono*).
2. **Cast-Iron Walnut & Butter Gold Palette:** Vintage diner palette anchored in deep cast-iron walnut (`#2A1810`), copper butter gold (`#C88A2E`), smothered gravy amber (`#8C4A21`), buttermilk biscuit cream (`#FAF5EC`), and pure linen white (`#FFFFFF`).
3. **"The 1954 Country Breakfast & Smothered Gravy Steak Matrix":** Matrix-style dual column layout (`country-breakfast-craft.html` & `menu.html`) showcasing classic Southern breakfast favorites alongside lunch entrees.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Cilantro Noodle + Kitchen` — Modern Vietnamese noodle bar with Outfit/Plus Jakarta Sans fonts.
2. `Chop Chop Red Pot` — Southern smoked street food joint with Outfit/Plus Jakarta Sans fonts.
3. `Choi’s Korea & Wing` — Korean double-fried wing joint with Plus Jakarta Sans/Outfit fonts.

### Divergent Choices for Circle G Restaurant

- **Hero Composition:** Vintage 1954 Southern Country Kitchen & Golden Gravy Vault split-hero layout: left side features a copper diner stamp badge (`"EST. 1954 • WEST CHARLOTTE COUNTRY BREAKFAST & DINER"`), classic Southern serif display typography (*Playfair Display*), cast-iron walnut & copper gold palette, and right side features a sunlit framed hero image of ribeye steak & eggs, country ham, and buttermilk biscuits.
- **Section Rhythm:** Replaced standard card grids with **Diner Vault Cards** (`diner-vault-card`) and **Southern Breakfast Highlights**.
- **HTML Vocabulary:** Completely unique class names (`circleg-header`, `diner-brand`, `copper-hero-stage`, `diner-stamp-badge`, `diner-vault-card`, `circleg-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 4818 Rozzelles Ferry Rd in West Charlotte NC | `visit.html`, `index.html`, `concept.html` | [Circle G Official Shop](https://circlegrestaurant.shop) |
| Operating hours: Mon-Fri 6am-3pm, Sat 6am-2pm; Closed Sundays | `visit.html`, `index.html` | [Wanderlog Guide](https://wanderlog.com) |
| Phone contact: (704) 399-2931 | `visit.html`, `concept.html` | [Wanderlog Guide](https://wanderlog.com) |
| Serves ribeye steak & eggs, country ham biscuits, & grits | `menu.html`, `country-breakfast-craft.html` | [Circle G Official Shop](https://circlegrestaurant.shop) |
| Features grilled hamburger steak with onions & gravy, & strawberry banana pudding | `menu.html`, `smothered-gravy-craft.html` | [Grubhub Menu](https://grubhub.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Circle G Morning Express Order & Pickup Portal:** Direct non-aggregate breakfast takeout ordering engine.
- **Early Bird Breakfast Call & Catering Booking Engine:** Direct phone & pickup reservation tool.
- **Rozzelles Ferry Regulars Stamp Card:** Mobile SMS loyalty stamp card for free coffee & cobbler.
- **Daily Smothered Special SMS Alert Engine:** Morning alert engine notifying locals of daily lunch plate specials.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, catering request, or newsletter forms).
- No automated SMS or email marketing tools.
- No live table waitlist counter.

### Available for Production Scope

- Custom zero-commission direct ordering portal.
- Interactive Southern plate meal combo builder.
- West Charlotte corporate breakfast & lunch catering engine.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs circle-g-restaurant` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
