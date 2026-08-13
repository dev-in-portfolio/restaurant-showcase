# Aqua e Vino — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Aqua e Vino
- **Slug:** `aqua-e-vino`
- **Audit Grade / Disposition / Score:** A / YES / 88
- **Audit Batch:** 1
- **Verification Date:** August 11, 2026

## Verification Sources

- [Aqua e Vino Official Website](https://www.aquaevino.com)
- [Resy — Aqua e Vino Reservations](https://resy.com/cities/clt/aqua-e-vino)
- [Appetito Magazine — Chef Gabriele Grigolon Feature](https://appetitomagazine.com)

## Original Audit Weakness

Aqua e Vino relies on an outdated third-party template site with embedded Resy widgets, lacking an owned digital platform that properly captures Chef Gabriele Grigolon's authentic Northern Italian heritage, handmade daily pastas, curated Italian DOCG wine program, or split lunch/dinner operating schedule in South Charlotte's Strawberry Hill center.

## Creative Brief

### Verified Visual / Content Anchors

1. **Chef Gabriele Grigolon's Heritage:** Authentic Northern Italian culinary craft from Chef Gabriele Grigolon celebrating Venetian and Lombardian culinary roots.
2. **Handmade Daily Pasta & Seafood:** Fresh egg yolk pastas rolled and shaped by hand daily alongside wild Mediterranean branzino, veal ossobuco, and octopus carpaccio.
3. **Intimate Strawberry Hill Enoteca:** Cozy 40-seat trattoria & enoteca in South Charlotte (4219 Providence Rd, Ste 3) featuring regional Italian wine pairings.

### Core Design Moves

1. **Enoteca Editorial Typography & Gold Seal Badges:** Elegant Venetian display serifs (*Playfair Display*) paired with refined sans-serifs (*Plus Jakarta Sans*) and gold wax seal badges (e.g., `"CHEF GABRIELE GRIGOLON • NORTHERN ITALIAN ENOTECA"`).
2. **Venetian Barolo & Linen Palette:** High-contrast palette anchored in deep Barolo wine red (`#6B1D2F`), aged olive brass (`#C5A059`), and warm linen parchment (`#FAF7F2`) with dark slate accents (`#1C1B1A`).
3. **"The Sommelier & Primi Matrix":** A specialized menu layout (`menu.html` & `wine-enoteca.html`) that pairs every handmade pasta dish directly with recommended Italian DOCG wine selections.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 4219 Providence Road #3, Charlotte, NC 28211 in Strawberry Hill | `visit.html`, `index.html`, `concept.html` | [Aqua e Vino Official](https://www.aquaevino.com) |
| Operating hours Tue–Sat Lunch 12:00 PM – 3:00 PM, Dinner 5:00 PM – 10:00 PM; Closed Sun–Mon | `visit.html`, `index.html` | [Aqua e Vino Official](https://www.aquaevino.com) |
| Phone number for direct inquiries is (704) 364-4445 | `visit.html`, `index.html` | [Aqua e Vino Official](https://www.aquaevino.com) |
| Led by Executive Chef Gabriele Grigolon | `concept.html`, `pasta-craft.html`, `index.html` | [Resy Listing](https://resy.com/cities/clt/aqua-e-vino) |
| Serves handmade pasta (tagliatelle, ravioli, gnocchi) and Northern Italian seafood | `menu.html`, `pasta-craft.html` | [Aqua e Vino Official](https://www.aquaevino.com) |
| Enforces a 24-hour cancellation policy for reservations | `visit.html` | [Resy Listing](https://resy.com/cities/clt/aqua-e-vino) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Reservation & Dining Engine:** Direct table booking manager with deposit hold and 24-hour reminder automated SMS.
- **Digital Sommelier Concierge:** Interactive wine pairing quiz and cellar bottle finder.
- **Private Dining & Event Pack:** Chef's table inquiry and private enoteca takeover manager.
- **Guest Engagement Pack:** VIP Sommelier Club SMS wine releases and seasonal truffle tasting alerts.

### Intentionally Not Implemented (Preserved for Upsell)

- No active digital booking or reservation widget.
- No submission forms of any kind (no contact, private dining inquiry, or newsletter forms).
- No automated SMS or email marketing tools.
- No interactive wine recommendation wizard.

### Available for Production Scope

- Direct custom table reservation engine with 24-hour policy enforcement.
- Sommelier Wine Pairing & Private Cellar guide.
- VIP Guest Loyalty & Seasonal Chef Tasting alert system.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs aqua-e-vino` executed. `qa-report.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
