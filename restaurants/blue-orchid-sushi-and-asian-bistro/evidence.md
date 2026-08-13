# Blue Orchid Sushi & Asian Bistro — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Blue Orchid Sushi & Asian Bistro
- **Slug:** `blue-orchid-sushi-and-asian-bistro`
- **Audit Grade / Disposition / Score:** A / YES / 96
- **Audit Batch:** 3
- **Verification Date:** August 11, 2026

## Verification Sources

- [Blue Orchid Official Website](http://blueorchidnc.com)
- [DoorDash — Blue Orchid Sushi Charlotte](https://doordash.com)
- [Uber Eats — Blue Orchid Asian Bistro](https://ubereats.com)

## Original Audit Weakness

Blue Orchid Sushi & Asian Bistro relies on third-party online ordering aggregators (`doordash.com`, `ubereats.com`) and basic template landing pages (`blueorchidnc.com`). Located at 8170 S Tryon St Suite G in South Charlotte NC, it lacks an owned digital showcase highlighting its artisanal sushi bar, chef's specialty rolls, hibachi grill craftsmanship, and lunch bentos.

## Creative Brief

### Verified Visual / Content Anchors

1. **South Tryon Steele Creek Bistro:** Located at 8170 S Tryon St Suite G in Steele Creek / South Charlotte NC.
2. **Handcrafted Specialty Rolls & Sashimi:** Blue Orchid Dragon Roll, Spicy Tuna Crunch, Deep-Fried Godzilla Roll, fresh salmon & yellowtail nigiri.
3. **Asian Bistro & Sizzling Hibachi:** Sizzling Hibachi steak & chicken, Teriyaki salmon, Chicken Katsu, Tonkotsu Ramen, and pork gyoza.

### Core Design Moves

1. **Kyoto Indigo Precision Typography:** Contemporary bold display sans (*Outfit*) paired with technical sushi bar mono (*Space Mono*) and clean body sans (*Plus Jakarta Sans*).
2. **Sapphire Cobalt & Orchid Glow Palette:** High-contrast dark palette anchored in deep sapphire cobalt (`#0A1128`), royal indigo (`#1C2541`), electric orchid blue (`#3A506B`), celestial ice (`#E0F2FE`), and orchid glow accent (`#6366F1`).
3. **"The Omakase Roll Board & Hibachi Matrix":** Matrix-style layout (`sushi-craft.html` & `menu.html`) showcasing specialty rolls alongside sizzling hibachi entrees.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Bar à Vins` — Parisian Minimalist Cellar Salon layout with bordeaux wine palette and Garamond typography.
2. `Backyard Brew` — Botanical Garden Glasshouse Editorial centered hero with sage green and oat linen.
3. `DeepCuts HiFi` — Audiophile vinyl black journal layout with Syne/Space Mono fonts.

### Divergent Choices for Blue Orchid Sushi & Asian Bistro

- **Hero Composition:** Modernist Kyoto Indigo Glass Showcase with an asymmetric 2-column layout: left column features an intense royal cobalt & sapphire glow background with sharp white headline typography (*Outfit*), neon orchid indigo badges (`"STEELE CREEK • 8170 S TRYON ST"`), and right column features a glass-bordered pill hero frame displaying fresh sushi art.
- **Section Rhythm:** Replaced standard card grids with **Sushi Matrix Cards** (`sushi-matrix-card`) and **Chef Omakase Highlights**.
- **HTML Vocabulary:** Completely unique class names (`orchid-top-bar`, `blue-brand`, `indigo-hero-stage`, `sapphire-badge`, `sushi-matrix-card`, `orchid-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 8170 S Tryon St Suite G, Charlotte, NC 28273 in Steele Creek | `visit.html`, `index.html`, `concept.html` | [Blue Orchid Official](http://blueorchidnc.com) |
| Operating hours: Mon-Sat 11 AM-2:50 PM & 5 PM-9:20 PM (Closed Sun) | `visit.html`, `index.html` | [Blue Orchid Official](http://blueorchidnc.com) |
| Contact phone is (980) 430-3971 | `visit.html`, `concept.html` | [DoorDash Listing](https://doordash.com) |
| Specializes in Dragon Rolls, Spicy Tuna Crunch, and Godzilla Rolls | `menu.html`, `sushi-craft.html` | [Uber Eats Listing](https://ubereats.com) |
| Serves Sizzling Hibachi steak/chicken, Teriyaki salmon, Katsu, and Ramen | `menu.html`, `asian-bistro-craft.html` | [Blue Orchid Official](http://blueorchidnc.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **South Tryon Express Sushi Pickup Engine:** Toast/DoorDash Drive direct pickup portal.
- **Steele Creek Corporate Hibachi Catering Engine:** Event Bento & Sushi platter calculator.
- **Omakase VIP Table & Tasting Bar Engine:** OpenTable sushi counter seat selector.
- **Blue Orchid SMS VIP Roll Drop Alerts:** SMS notification engine for seasonal fish arrivals.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online order placement engine.
- No submission forms of any kind (no contact, catering request, or newsletter forms).
- No automated SMS or email marketing tools.
- No live fish stock inventory tracking.

### Available for Production Scope

- Custom zero-commission direct ordering portal.
- Express Lunch Bento ordering engine.
- Corporate catering platter calculator.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs blue-orchid-sushi-and-asian-bistro` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
