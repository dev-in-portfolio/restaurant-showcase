# La Lima Sangucheria — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** La Lima Sangucheria
- **Slug:** `la-lima-sangucheria`
- **Audit Grade / Disposition / Score:** A / YES / 99
- **Audit Batch:** 11
- **Verification Date:** August 13, 2026

## Verification Sources

- [La Lima Sangucheria Official Portal](https://lalimaclt.com)
- [Toast Tab — La Lima Ordering Page](https://www.toasttab.com)
- [South End Charlotte — La Lima Directory](https://southendclt.org)

## Original Audit Weakness

La Lima Sangucheria relies on basic third-party online ordering apps (Toast Tab) and social media pages. Located at 131 E Park Ave in South End, it lacks an owned digital showcase capturing its authentic Peruvian sangucheria traditions, daily slow-roasted chicharrón, corporate lunch catering, and Aji pepper sauce directives.

## Creative Brief

### Verified Visual / Content Anchors

1. **South End Charlotte Location:** 131 E Park Ave, Charlotte NC 28203 (South End near East/West Blvd LYNX station).
2. **Peruvian Sánguches & Street Food Specialties:** Sánguche de Chicharrón with crispy pork belly & fried sweet potato, Lomo Saltado Sandwich with stir-fried beef tenderloin, Pollo Aji Amarillo Sandwich, Fresh Lime Ceviche Clásico, Yucca Fries with Huancaina dip, Chicha Morada, & Maracuyá passion fruit juice.
3. **Contact & Operating Hours:** Phone (704) 900-5265; Mon–Sat 11:00 AM – 8:00 PM | Sun 11:00 AM – 3:00 PM.

### Core Design Moves

1. **Bold Geometric Display Typography:** Bold display sans (*Syne*) paired with clean body sans (*Outfit*) and Lima street market mono (*Space Mono*).
2. **Andean Terracotta & Peruvian Lime Palette:** Peruvian sangucheria palette anchored in deep Andean terracotta red (`#991B1B`), Peruvian lime green (`#65A30D`), warm sun yellow (`#EAB308`), and soft parchment (`#FEFCE8`).
3. **"The Peruvian Sánguche & Ceviche Matrix":** Matrix-style dual column layout (`peruvian-sanguche-craft.html` & `menu.html`) showcasing crispy pork belly chicharrón sandwiches alongside fresh lime ceviche & yucca fries.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `La Bonbonniere Bakery` — Parisian Patisserie with Playfair Display fonts and Rich Espresso Chocolate/Honey Gold.
2. `King Fish Poke` — Hawaiian Pacific Sunburst with Outfit fonts and Deep Pacific Navy/Tropical Mango.
3. `Jimmy Pearls` — Chesapeake Bay Maritime with Cinzel fonts and Deep Atlantic Navy/Old Bay Orange.

### Divergent Choices for La Lima Sangucheria

- **Hero Composition:** Peruvian Andean Sun & Colonial Lima Sangucheria Vault split-hero layout: left side features an Inca Gold stamp badge (`"PERUVIAN ARTISANAL SÁNGUCHES • SOUTH END CHARLOTTE NC"`), bold geometric sans (*Syne*), Andean terracotta & lime green palette, and right side features a bold framed hero image of crispy Sánguche de Chicharrón.
- **Section Rhythm:** Replaced standard card grids with **La Lima Vault Cards** (`sangucheria-vault-card`) and South End dining highlights.
- **HTML Vocabulary:** Completely unique class names (`sangucheria-header`, `sangucheria-brand`, `lima-hero-stage`, `inca-stamp-badge`, `sangucheria-vault-card`, `sangucheria-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 131 E Park Ave in Charlotte NC 28203 | `visit.html`, `index.html`, `concept.html` | [La Lima Direct Portal](https://lalimaclt.com) |
| Operating hours: Mon-Sat 11am-8pm, Sun 11am-3pm | `visit.html`, `index.html` | [La Lima Direct Portal](https://lalimaclt.com) |
| Phone number: (704) 900-5265 | `visit.html`, `index.html` | [La Lima Direct Portal](https://lalimaclt.com) |
| Sánguche de Chicharrón, Lomo Saltado, & Pollo Aji Amarillo | `menu.html`, `peruvian-sanguche-craft.html` | [La Lima Direct Portal](https://lalimaclt.com) |
| Fresh Lime Ceviche, Yucca Fries with Huancaina, & Chicha Morada | `menu.html`, `chicharron-ceviche-craft.html` | [La Lima Direct Portal](https://lalimaclt.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **La Lima Direct Sánguche Order Engine:** Zero-commission direct online ordering portal for local South End pickup & delivery.
- **La Lima Corporate Lunch Catering Engine:** Sánguche platter catering portal for South End offices & events.
- **La Lima Inca Pass Rewards Engine:** Exclusive VIP rewards portal for Charlotte Peruvian food lovers.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table seating reservation integration.

### Available for Production Scope

- Custom zero-commission direct mobile sangucheria ordering app.
- Interactive Peruvian sandwich builder & spice level customization tool.
- Custom corporate lunch catering & party platter booking portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs la-lima-sangucheria` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
