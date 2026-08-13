# Backyard Brew — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Backyard Brew
- **Slug:** `backyard-brew`
- **Audit Grade / Disposition / Score:** A / YES / 91
- **Audit Batch:** 2
- **Verification Date:** August 11, 2026

## Verification Sources

- [Backyard Brew Official Website](https://backyardbrew.coffee)
- [DoorDash — Backyard Brew Charlotte](https://doordash.com)
- [Charlotte's Got A Lot — Backyard Brew](https://charlottesgotalot.com)

## Original Audit Weakness

Backyard Brew relies on third-party delivery platforms (`doordash.com`, `ubereats.com`) and basic social media links with a minimal landing site. Located at 1218 East Blvd in Dilworth Charlotte NC, it lacks an owned digital showcase capturing its Dilworth garden patio, scratch ingredient brewing philosophy, Middle Eastern breakfast items, and roasted bean subscriptions.

## Creative Brief

### Verified Visual / Content Anchors

1. **Dilworth Garden Sanctuary:** Located at 1218 East Blvd in the historic Dilworth neighborhood of Charlotte NC.
2. **Scratch Ingredient Craft Coffee:** Signature Banana Bread Latte, Nutella Mocha, Almond Joy Latte, and Nitro Cold Brews brewed without commercial syrup concentrates.
3. **Middle Eastern & Garden Kitchen:** Jordanian Pancakes, savory Lentil Soup, fresh homemade fruit syrups, and daily baked scones.

### Core Design Moves

1. **Botanical Garden Glasshouse Typography:** Classical botanical serif headers (*Marcellus*) paired with organic technical mono (*Space Mono*) and clean functional body sans (*Outfit*).
2. **Forest Sage & Linen Palette:** Earthy organic palette anchored in botanical forest sage (`#2C4A3E`), moss green (`#4A6B5D`), oat linen (`#F4F1EA`), honey amber (`#D4A359`), and dark roasted oak (`#1E2622`).
3. **"The Dilworth Coffee Garden & Scratch Kitchen":** Centered garden-banner hero and asymmetric spec-cards layout (`scratch-craft.html` & `menu.html`) showcasing espresso drinks alongside scratch kitchen pastries.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Astoria Café` — Split hero with right-side image, terracotta/oat palette, 3-card grid.
2. `Babaloo Coffee Club` — Havana-Miami split hero with warm cream cards and terracotta micro-badges.
3. `DeepCuts HiFi` — Audiophile vinyl black journal layout with Syne/Space Mono fonts.

### Divergent Choices for Backyard Brew

- **Hero Composition:** Botanical Garden Glasshouse Editorial with full-width top announcement bar (`"DILWORTH CRAFT COFFEE GARDEN • 1218 EAST BLVD"`), centered high-impact rustic serif typography (`Marcellus`), botanical sage green & toasted oak palette, and a full-bleed horizontal garden patio banner.
- **Section Rhythm:** Replaced standard card grids with centered **Garden Spec Units** (`garden-spec-unit`) and **Scratch Kitchen Highlights**.
- **HTML Vocabulary:** Completely unique class names (`garden-top-banner`, `botanical-brand`, `glasshouse-hero`, `sage-badge`, `garden-spec-unit`, `botanical-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 1218 East Blvd, Charlotte, NC 28203 in Dilworth | `visit.html`, `index.html`, `concept.html` | [Charlotte's Got A Lot](https://charlottesgotalot.com) |
| Operating hours: Monday – Sunday: 8:00 AM – 5:00 PM | `visit.html`, `index.html` | [Official Website](https://backyardbrew.coffee) |
| Phone contact is (704) 910-1648 | `visit.html`, `concept.html` | [DoorDash Listing](https://doordash.com) |
| Specializes in Banana Bread Latte, Nutella Mocha, and Nitro Brews without commercial syrups | `menu.html`, `scratch-craft.html` | [Official Website](https://backyardbrew.coffee) |
| Serves Jordanian Pancakes, Lentil Soup, house fruit syrups, and homemade scones | `menu.html`, `garden-patio.html` | [Charlotte's Got A Lot](https://charlottesgotalot.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Dilworth Garden Mobile Order Pickup Engine:** Toast/Square white-label coffee pickup.
- **Backyard Whole Bean Subscription Club:** E-commerce roasted coffee bean delivery module.
- **Private Garden Event & Catering Engine:** Outdoor patio event booking system.
- **Coffee Garden SMS Morning Perk Club:** SMS notification engine for daily scone specials.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or order placement engine.
- No submission forms of any kind (no contact, catering request, or newsletter forms).
- No automated SMS or email marketing tools.
- No live bean inventory tracking.

### Available for Production Scope

- Custom zero-commission online ordering portal.
- Whole bean subscription & grind selector module.
- Garden event space booking calculator.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs backyard-brew` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
