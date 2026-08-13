# LILA Restaurant & Lounge — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** LILA Restaurant & Lounge
- **Slug:** `lila-restaurant-and-lounge`
- **Audit Grade / Disposition / Score:** A / YES / 100
- **Audit Batch:** 12
- **Verification Date:** August 13, 2026

## Verification Sources

- [LILA Restaurant & Lounge Official Portal](https://eatsushirose.com)
- [Axios Charlotte — LILA Announcement](https://charlotte.axios.com)
- [Asia Carolinas Directory — LILA Listing](https://asiacarolinas.org)

## Original Audit Weakness

LILA Restaurant & Lounge relies on basic nightlife listings and social media announcements. Located at 225 S Poplar St in Uptown's Third Ward, it lacks an owned digital showcase capturing its luxury Japanese fusion gastronomy, omakase sushi craft, late-night lounge program, and Uptown directives.

## Creative Brief

### Verified Visual / Content Anchors

1. **Uptown Third Ward Location:** 225 S Poplar St, Charlotte NC 28202 (Third Ward Uptown Charlotte in former Haymaker space).
2. **Japanese Fusion Specialties:** A5 Japanese Wagyu & Siberian Caviar Nigiri, Bluefin Tuna Tartare with White Truffle Oil, Truffle Hamachi Crudo, Miso Glazed Chilean Sea Bass, Robata Flame Skewers, Craft Botanical Cocktails, & Late-Night Lounge Directives.
3. **Contact & Operating Hours:** Phone (704) 919-0442; Wed–Thu 5:00 PM – 11:00 PM | Fri–Sat 5:00 PM – 1:00 AM (Late-Night Lounge) | Sun 5:00 PM – 10:00 PM.

### Core Design Moves

1. **Haute-Couture Display Typography:** High-fashion display serif (*Cormorant Garamond*) paired with clean body sans (*Plus Jakarta Sans*) and Uptown luxury mono (*Space Mono*).
2. **Velvet Midnight Plum & Champagne Gold Palette:** Luxury nightlife palette anchored in deep velvet midnight plum (`#31102F`), lustrous champagne gold (`#F59E0B`), soft rose gold cream (`#FDF8F6`), and obsidian night void (`#0D030E`).
3. **"The Omakase Sushi & Botanical Lounge Matrix":** Matrix-style dual column layout (`japanese-fusion-craft.html` & `menu.html`) showcasing A5 Wagyu nigiri alongside craft botanical cocktails & late-night lounge vibes.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Libretto’s Pizzeria` — NYC Brick Oven with Playfair Display fonts and Deep Italian Garnet/Brick Amber.
2. `Let’s Meat KBBQ` — Seoul Cyber-Industrial with Space Grotesk fonts and Deep Charcoal Obsidian/Fiery Ember.
3. `Lempira Restaurant` — Honduran Caribbean Coast with Outfit fonts and Deep Sapphire Blue/Banana Gold.

### Divergent Choices for LILA Restaurant & Lounge

- **Hero Composition:** Tokyo Midnight Velvet & Botanical Lounge Vault split-hero layout: left side features an Imperial Lotus stamp badge (`"JAPANESE FUSION & LUXURY COCKTAIL LOUNGE • UPTOWN CHARLOTTE NC"`), high-fashion serif (*Cormorant Garamond*), velvet midnight plum & champagne gold palette, and right side features a bold framed hero image of luxury omakase sushi & craft cocktails.
- **Section Rhythm:** Replaced standard card grids with **LILA Vault Cards** (`lila-vault-card`) and Uptown lounge highlights.
- **HTML Vocabulary:** Completely unique class names (`lila-header`, `lila-brand`, `velvet-hero-stage`, `lotus-stamp-badge`, `lila-vault-card`, `lila-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 225 S Poplar St in Charlotte NC 28202 | `visit.html`, `index.html`, `concept.html` | [Axios Charlotte Announcement](https://charlotte.axios.com) |
| Operating hours: Wed-Thu 5-11pm, Fri-Sat 5pm-1am, Sun 5-10pm | `visit.html`, `index.html` | [LILA Official Portal](https://eatsushirose.com) |
| Phone number: (704) 919-0442 | `visit.html`, `index.html` | [LILA Official Portal](https://eatsushirose.com) |
| Signature A5 Wagyu Nigiri, Bluefin Tuna Tartare, & Truffle Hamachi | `menu.html`, `japanese-fusion-craft.html` | [LILA Official Portal](https://eatsushirose.com) |
| Miso Chilean Sea Bass, Robata Skewers, & Botanical Cocktails | `menu.html`, `botanical-cocktail-craft.html` | [LILA Official Portal](https://eatsushirose.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **LILA VIP Omakase & Lounge Reservation Engine:** Table & VIP booth booking portal for Uptown dinner dates & nightlife bottle service.
- **LILA Private Dining Event Booking Engine:** Private party booking portal for executive corporate dinners & celebrations.
- **LILA Velvet Society Rewards Engine:** Exclusive VIP rewards portal for Charlotte fine dining & lounge enthusiasts.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table seating reservation integration.

### Available for Production Scope

- Custom VIP lounge table & bottle service reservation app.
- Interactive omakase tasting menu curator & wine pairing selector.
- Custom executive private dining & corporate event booking portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs lila-restaurant-and-lounge` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
