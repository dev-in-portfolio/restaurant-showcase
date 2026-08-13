# Bonzai Thai Cuisine — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Bonzai Thai Cuisine
- **Slug:** `bonzai-thai-cuisine`
- **Audit Grade / Disposition / Score:** A / YES / 98
- **Audit Batch:** 3
- **Verification Date:** August 11, 2026

## Verification Sources

- [Toast Tab — Bonzai Thai Cuisine Storefront](https://toasttab.com)
- [DoorDash — Bonzai Thai Charlotte](https://doordash.com)
- [Uber Eats — Bonzai Thai & Japanese](https://ubereats.com)

## Original Audit Weakness

Bonzai Thai Cuisine relies on third-party online ordering aggregators (`toasttab.com`, `ubereats.com`, `doordash.com`) and basic directory pages (`bonzaithaicuisine.com`). Located at 4847 Shopton Rd Ste G in Berewick Charlotte NC, it lacks an owned digital showcase capturing its Berewick Shopton Rd storefront, wok stir-fry mastery, authentic curry pastes, and express lunch bentos.

## Creative Brief

### Verified Visual / Content Anchors

1. **Berewick Shopton Rd Location:** Located at 4847 Shopton Rd, Ste G in the Berewick community of Charlotte NC 28278.
2. **Wok Stir-Fry Noodle Craft:** Signature Pad Thai, smoky Drunken Noodles (Pad Kee Mow), Pad See Ew, and Spicy Basil Fried Rice.
3. **Authentic Thai Curries & Appetizers:** Panang Curry, Red & Green Curries, crispy Bonzai Wings, Crab Rangoon, and Pho.

### Core Design Moves

1. **Tropical Bamboo Emerald Typography:** Warm classical serif display (*DM Serif Display*) paired with organic technical mono (*Space Mono*) and modern body sans (*Outfit*).
2. **Emerald & Sunset Copper Palette:** Rich tropical palette anchored in deep emerald forest (`#0B2B20`), bamboo green (`#164E3D`), sunset copper gold (`#E5A93C`), warm papyrus linen (`#F5F2EB`), and chili red (`#C8372D`).
3. **"The Berewick Wok & Noodle Bar Grid":** High-impact grid layout (`noodles-craft.html` & `menu.html`) pairing wok-charred noodle dishes with coconut milk curries.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Aroy Thai` — Crimson spice & gold Thai wok layout with Playfair/Inter typography.
2. `Blue Orchid Sushi & Asian Bistro` — Modernist Kyoto Indigo Glass Showcase with sapphire cobalt and electric orchid glow.
3. `Backyard Brew` — Botanical Garden Glasshouse Editorial centered hero with sage green and oat linen.

### Divergent Choices for Bonzai Thai Cuisine

- **Hero Composition:** Tropical Bamboo Emerald Wok Stage with a bold split-screen layout: left column features rich emerald bamboo green (`#0B2B20`), metallic copper gold accents (`"BEREWICK • 4847 SHOPTON RD"`), clean modern serif display (*DM Serif Display*), and right column features a rounded bamboo-bordered frame displaying wok stir-fry art.
- **Section Rhythm:** Replaced standard card grids with **Wok Feature Cards** (`wok-feature-card`) and **Berewick Noodle Highlights**.
- **HTML Vocabulary:** Completely unique class names (`bonzai-header`, `emerald-brand`, `bamboo-hero-stage`, `copper-badge`, `wok-feature-card`, `bonzai-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 4847 Shopton Rd, Ste G, Charlotte, NC 28278 in Berewick | `visit.html`, `index.html`, `concept.html` | [Toast Tab Storefront](https://toasttab.com) |
| Operating hours: Mon-Sat Lunch 11am-1:25pm & Dinner 4:30pm-8:55pm (Closed Sun) | `visit.html`, `index.html` | [Order Online Listing](https://order.online) |
| Contact phone is (980) 207-4484 | `visit.html`, `concept.html` | [Wanderlog Directory](https://wanderlog.com) |
| Specializes in Pad Thai, Drunken Noodles (Pad Kee Mow), and Pad See Ew | `menu.html`, `noodles-craft.html` | [DoorDash Listing](https://doordash.com) |
| Serves Panang Curry, Bonzai Wings, Crab Rangoon, and Pho | `menu.html`, `curry-craft.html` | [Uber Eats Listing](https://ubereats.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Berewick Express Wok Pickup Engine:** Direct non-aggregate mobile pickup portal.
- **Shopton Corporate Thai Lunch Bento Engine:** Group catering & bento calculator.
- **Curry Spice Level & Noodle Customization Concierge:** Interactive order modifier.
- **Bonzai SMS Noodle Perk Club:** SMS notification engine for weekly lunch specials.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, catering inquiry, or newsletter forms).
- No automated SMS or email marketing tools.
- No live kitchen inventory tracking.

### Available for Production Scope

- Custom zero-commission direct ordering portal.
- Express Lunch Bento ordering engine.
- Corporate catering platter calculator.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs bonzai-thai-cuisine` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
