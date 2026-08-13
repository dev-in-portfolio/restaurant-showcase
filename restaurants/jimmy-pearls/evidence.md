# Jimmy Pearls — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Jimmy Pearls
- **Slug:** `jimmy-pearls`
- **Audit Grade / Disposition / Score:** A / YES / 91
- **Audit Batch:** 10
- **Verification Date:** August 13, 2026

## Verification Sources

- [Jimmy Pearls Official Portal](https://jimmypearls.com)
- [Market at 7th Street — Jimmy Pearls Stall Profile](https://www.marketat7thstreet.com)
- [EatOkra — Jimmy Pearls Profile](https://www.eatokra.com)

## Original Audit Weakness

Jimmy Pearls relies on basic market stall directory listings and third-party delivery apps. Located at 224 E 7th St in Uptown Charlotte, it lacks an owned digital showcase capturing its authentic Virginia Tidewater heritage, daily fresh seafood catches, pop-up catering, and coastal fish fry directives.

## Creative Brief

### Verified Visual / Content Anchors

1. **Uptown Charlotte Market Location:** 224 E 7th St, Charlotte NC 28202 (Market at 7th Street).
2. **Virginia Tidewater & Coastal Seafood Specialties:** Soft-Shell Crab Sandwiches, Cornmeal Fried Catfish, Virginia Tidewater Fried Oysters with House Tartar, Lowcountry Shrimp & Grits, Smoked Trout Dip, Old Bay Seasoned Fries, & Hushpuppies.
3. **Contact & Operating Hours:** Phone (980) 263-9677; Wed 11:00 AM – 7:00 PM | Thu–Sat 11:00 AM – 8:00 PM | Sun 11:00 AM – 5:00 PM (Closed Mon–Tue).

### Core Design Moves

1. **Bold Maritime Coastal Typography:** Bold serif (*Cinzel*) paired with clean body sans (*Outfit*) and dockside catch mono (*Space Mono*).
2. **Atlantic Navy & Old Bay Orange Palette:** Coastal seafood palette anchored in deep Atlantic navy (`#0F172A`), Old Bay paprika orange (`#EA580C`), seafoam teal (`#0D9488`), and sunlit oyster white (`#F8FAFC`).
3. **"The Tidewater Fish Fry & Coastal Oyster Matrix":** Matrix-style dual column layout (`tidewater-seafood-craft.html` & `menu.html`) showcasing crispy fried seafood plates alongside house-smoked trout dip & coastal sides.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Jeff's Bucket Shop` — Underground Electric Neon Karaoke with Space Grotesk fonts and Midnight Black/Magenta.
2. `Corkscrew Wine Pub` — Vintage Bordeaux Oak Barrel with Playfair Display fonts and Deep Bordeaux Maroon/Oak Amber.
3. `Jazzy Cheesecakes` — Velvet Magenta Dessert Lounge with Syne fonts and Deep Velvet Plum/Hot Raspberry.

### Divergent Choices for Jimmy Pearls

- **Hero Composition:** Chesapeake Bay Maritime Oyster Shack & Tidewater Coastal Vault split-hero layout: left side features an Oyster Shell stamp badge (`"VIRGINIA TIDEWATER & SOUTHERN COASTAL SEAFOOD • UPTOWN CHARLOTTE NC"`), bold maritime serif (*Cinzel*), Atlantic navy & Old Bay orange palette, and right side features a bold framed hero image of fresh coastal seafood & fried oysters.
- **Section Rhythm:** Replaced standard card grids with **Jimmy Pearls Vault Cards** (`pearls-vault-card`) and Uptown Charlotte market highlights.
- **HTML Vocabulary:** Completely unique class names (`pearls-header`, `pearls-brand`, `coastal-hero-stage`, `oyster-stamp-badge`, `pearls-vault-card`, `pearls-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 224 E 7th St in Charlotte NC 28202 (Market at 7th Street) | `visit.html`, `index.html`, `concept.html` | [Jimmy Pearls Portal](https://jimmypearls.com) |
| Operating hours: Wed 11-7, Thu-Sat 11-8, Sun 11-5 (Closed Mon-Tue) | `visit.html`, `index.html` | [Jimmy Pearls Portal](https://jimmypearls.com) |
| Phone number: (980) 263-9677 | `visit.html`, `index.html` | [Jimmy Pearls Portal](https://jimmypearls.com) |
| Soft-Shell Crab, Cornmeal Fried Catfish, & Fried Oysters | `menu.html`, `tidewater-seafood-craft.html` | [Jimmy Pearls Portal](https://jimmypearls.com) |
| Smoked Trout Dip, Lowcountry Shrimp & Grits, & Old Bay Fries | `menu.html`, `coastal-smoked-dips.html` | [Jimmy Pearls Portal](https://jimmypearls.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Jimmy Pearls Coastal Order Engine:** Zero-commission direct online ordering portal for local market pickup.
- **Jimmy Pearls Tidewater Fish Fry Catering Engine:** Event catering portal for corporate luncheons & private seafood boils.
- **Jimmy Pearls VIP Oyster Club Rewards Engine:** Exclusive VIP rewards portal for Charlotte seafood lovers.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table seating reservation integration.

### Available for Production Scope

- Custom zero-commission direct mobile seafood ordering app.
- Interactive seafood boil platter calculator & catch of the day tracker.
- Custom private catering & pop-up event booking portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs jimmy-pearls` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
