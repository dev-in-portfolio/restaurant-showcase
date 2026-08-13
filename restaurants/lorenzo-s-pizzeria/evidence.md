# Lorenzo’s Pizzeria — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Lorenzo’s Pizzeria
- **Slug:** `lorenzo-s-pizzeria`
- **Audit Grade / Disposition / Score:** A / YES / 94
- **Audit Batch:** 12
- **Verification Date:** August 13, 2026

## Verification Sources

- [Lorenzo's Pizzeria Official Portal](https://lorenzos-pizzeria.com)
- [ToastTab Online Ordering — Lorenzo's Pizzeria](https://www.toasttab.com)
- [Grubhub Directory — Lorenzo's Pizzeria Listing](https://www.grubhub.com)

## Original Audit Weakness

Lorenzo’s Pizzeria relies on basic online ordering portals and directory listings. Located at 16721 Orchard Stone Run Suite 120 in South Charlotte, it lacks an owned digital showcase capturing its hand-tossed NY crust tradition, Sicilian deep dish baking, family party platters, and Blakeney directives.

## Creative Brief

### Verified Visual / Content Anchors

1. **South Charlotte Location:** 16721 Orchard Stone Run, Suite 120, Charlotte NC 28277 (Ballantyne / Blakeney area off Rea Rd & Orchard Stone Run).
2. **NY Pizzeria Specialties:** Signature NY Thin Crust Hand-Tossed Pizzas (The Lorenzo Special Supreme, Sicilian Deep Dish Square, White Spinach Ricotta Pie, Meatballs Marinara, Calzones, Stromboli, Eggplant Rollatini, Baked Ziti).
3. **Contact & Operating Hours:** Phone (704) 544-1414; Mon 12:00 PM – 9:00 PM | Tue–Thu 11:00 AM – 9:00 PM | Fri–Sat 11:00 AM – 10:00 PM | Sun 12:00 PM – 9:00 PM.

### Core Design Moves

1. **Geometric Display Typography:** Contemporary bold display sans (*Outfit*) paired with clean body sans (*Plus Jakarta Sans*) and NY pizzeria mono (*Space Mono*).
2. **Forest Green & Terracotta Palette:** Authentic NY pizzeria palette anchored in deep Italian forest pine green (`#064E3B`), warm terracotta brick orange (`#C2410C`), warm Tuscan cream (`#FEF3C7`), and toasted garlic gold (`#D97706`).
3. **"The NY Hand-Tossed Pizza & Family Trattoria Matrix":** Matrix-style dual column layout (`ny-crust-sicilian-craft.html` & `menu.html`) showcasing NY thin crust pies alongside Sicilian deep dish squares & pasta entrees.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `LILA Restaurant & Lounge` — Tokyo Midnight Velvet with Cormorant Garamond fonts and Velvet Midnight Plum/Champagne Gold.
2. `Libretto’s Pizzeria` — NYC Brick Oven with Playfair Display fonts and Deep Italian Garnet/Brick Amber.
3. `Let’s Meat KBBQ` — Seoul Cyber-Industrial with Space Grotesk fonts and Deep Charcoal Obsidian/Fiery Ember.

### Divergent Choices for Lorenzo’s Pizzeria

- **Hero Composition:** Brooklyn Stone Deck & Italian Family Trattoria Vault split-hero layout: left side features a Family Hearth Seal stamp badge (`"AUTHENTIC NY PIZZERIA & ITALIAN FAMILY KITCHEN • SOUTH CHARLOTTE NC"`), geometric display sans (*Outfit*), Italian forest green & terracotta palette, and right side features a bold framed hero image of hand-tossed NY pizza.
- **Section Rhythm:** Replaced standard card grids with **Lorenzo Vault Cards** (`lorenzo-vault-card`) and Blakeney dining highlights.
- **HTML Vocabulary:** Completely unique class names (`lorenzo-header`, `lorenzo-brand`, `pine-hero-stage`, `hearth-seal-badge`, `lorenzo-vault-card`, `lorenzo-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 16721 Orchard Stone Run Suite 120 in Charlotte NC 28277 | `visit.html`, `index.html`, `concept.html` | [Lorenzo's Official Portal](https://lorenzos-pizzeria.com) |
| Operating hours: Mon 12-9pm, Tue-Thu 11am-9pm, Fri-Sat 11am-10pm, Sun 12-9pm | `visit.html`, `index.html` | [Lorenzo's Official Portal](https://lorenzos-pizzeria.com) |
| Phone number: (704) 544-1414 | `visit.html`, `index.html` | [Lorenzo's Official Portal](https://lorenzos-pizzeria.com) |
| Signature The Lorenzo Special, Sicilian Deep Dish Square, White Spinach Pie | `menu.html`, `ny-crust-sicilian-craft.html` | [Lorenzo's Official Portal](https://lorenzos-pizzeria.com) |
| Calzones, Stromboli, Eggplant Rollatini, & Baked Ziti | `menu.html`, `calzones-pasta-craft.html` | [Lorenzo's Official Portal](https://lorenzos-pizzeria.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Lorenzo's Direct Pizza Order Engine:** Zero-commission direct online ordering portal for South Charlotte pickup & delivery.
- **Lorenzo's Family Party Catering Engine:** Party platter booking portal for office events & family celebrations.
- **Lorenzo's Pizza Pass Rewards Engine:** Exclusive VIP rewards portal for Blakeney pizza lovers.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table seating reservation integration.

### Available for Production Scope

- Custom zero-commission direct mobile pizza ordering app.
- Interactive custom pizza builder & party size calculator.
- Custom corporate pizza catering & party platter booking portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs lorenzo-s-pizzeria` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
