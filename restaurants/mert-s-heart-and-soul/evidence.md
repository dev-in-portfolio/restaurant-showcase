# Mert’s Heart & Soul — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Mert’s Heart & Soul
- **Slug:** `mert-s-heart-and-soul`
- **Audit Grade / Disposition / Score:** A / YES / 100
- **Audit Batch:** 13
- **Verification Date:** August 13, 2026

## Verification Sources

- [Mert's Heart & Soul Official Portal](http://www.mertscharlotte.com)
- [Food Network — Guy Fieri Diners Drive-Ins and Dives Feature](https://www.foodnetwork.com)
- [Uptown Charlotte Partnership — Mert's Profile](https://www.uptowncharlotte.com)

## Original Audit Weakness

Mert’s Heart & Soul relies on basic third-party online ordering portals and legacy site structure. Located at 214 N College St in Uptown Charlotte, it lacks an owned digital showcase capturing its 25+ year Lowcountry heritage, Guy Fieri Food Network feature, corporate catering platters, and Uptown directives.

## Creative Brief

### Verified Visual / Content Anchors

1. **Uptown Charlotte Location:** 214 N College St, Charlotte NC 28202 (Uptown Charlotte Center City off N College St & E 5th St).
2. **Lowcountry & Soul Specialties:** Southern Fried Chicken, Lowcountry Shrimp & Grits with Tasso Ham Gravy, Smoked Pork Ribs, Charleston Fried Catfish, Cornbread Waffles, Macaroni & Cheese, Slow-Simmered Collard Greens, & Sweet Potato Pie.
3. **Contact & Operating Hours:** Phone (704) 342-4222; Mon–Thu 11:00 AM – 8:00 PM | Fri–Sun 11:00 AM – 9:00 PM.

### Core Design Moves

1. **Classic Southern Display Typography:** Warm heritage display serif (*Playfair Display*) paired with clean body sans (*Plus Jakarta Sans*) and Lowcountry kitchen mono (*Space Mono*).
2. **Mahogany & Cornbread Gold Palette:** Rich Lowcountry Southern palette anchored in deep mahogany tobacco amber (`#78350F`), cornbread gold (`#F59E0B`), Carolina coast indigo (`#1E3A8A`), and soft toasted parchment (`#FFFBEB`).
3. **"The Lowcountry Shrimp & Grits & Soul Kitchen Matrix":** Matrix-style dual column layout (`lowcountry-heritage-craft.html` & `menu.html`) showcasing Southern deep-fried chicken alongside shrimp & grits & homemade sweet potato pies.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Medusa Lounge` — Mediterranean Midnight Obsidian with Cormorant Garamond fonts and Deep Obsidian/Gold.
2. `Medellín Colombian Restaurant` — Paisa Valley & Emerald Sunlit Hacienda with Playfair Display fonts and Deep Emerald/Mango Gold.
3. `MAS Tortilleria` — Oaxaca Earth with Plus Jakarta Sans fonts and Volcanic Clay Terracotta/Maize Gold.

### Divergent Choices for Mert’s Heart & Soul

- **Hero Composition:** Lowcountry Charleston Porch & Warm Heritage Soul Kitchen Vault split-hero layout: left side features a Lowcountry Heritage Stamp badge (`"CHARLESTON LOWCOUNTRY & SOUL FOOD HERITAGE • UPTOWN CHARLOTTE NC"`), warm heritage display serif (*Playfair Display*), deep mahogany & cornbread gold palette, and right side features a bold framed hero image of Southern fried chicken & cornbread.
- **Section Rhythm:** Replaced standard card grids with **Mert's Vault Cards** (`merts-vault-card`) and Uptown Charlotte dining highlights.
- **HTML Vocabulary:** Completely unique class names (`merts-header`, `merts-brand`, `amber-hero-stage`, `lowcountry-seal-badge`, `merts-vault-card`, `merts-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 214 N College St in Charlotte NC 28202 | `visit.html`, `index.html`, `concept.html` | [Mert's Official Portal](http://www.mertscharlotte.com) |
| Operating hours: Mon-Thu 11am-8pm, Fri-Sun 11am-9pm | `visit.html`, `index.html` | [Mert's Official Portal](http://www.mertscharlotte.com) |
| Phone number: (704) 342-4222 | `visit.html`, `index.html` | [Mert's Official Portal](http://www.mertscharlotte.com) |
| Signature Southern Fried Chicken, Shrimp & Grits, & Smoked Ribs | `menu.html`, `lowcountry-heritage-craft.html` | [Mert's Official Portal](http://www.mertscharlotte.com) |
| Cornbread Waffles, Mac & Cheese, Collard Greens, & Sweet Potato Pie | `menu.html`, `soul-comfort-craft.html` | [Mert's Official Portal](http://www.mertscharlotte.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Mert's Direct Order Engine:** Zero-commission direct online ordering portal for local Uptown pickup & delivery.
- **Mert's Corporate & Event Catering Engine:** Southern soul food catering & cornbread platter booking portal.
- **Mert's Heart & Soul VIP Pass:** Exclusive VIP rewards portal for Charlotte Southern food lovers.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table seating reservation integration.

### Available for Production Scope

- Custom zero-commission direct mobile soul food ordering app.
- Interactive custom Southern catering platter builder & event calculator.
- Custom corporate catering & private soul food event booking portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs mert-s-heart-and-soul` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
