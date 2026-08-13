# Azucar Cuban Restaurant — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Azucar Cuban Restaurant
- **Slug:** `azucar-cuban-restaurant`
- **Audit Grade / Disposition / Score:** A / YES / 93
- **Audit Batch:** 2
- **Verification Date:** August 11, 2026

## Verification Sources

- [Azucar Cuban Restaurant Official Website](https://azucarcubanrestaurantnc.com)
- [Grubhub — Azucar Cuban Restaurant Ballantyne](https://www.grubhub.com)
- [DoorDash — Azucar Cuban Restaurant Huntersville](https://www.doordash.com)

## Original Audit Weakness

Azucar Cuban Restaurant relies on a basic template site (`azucarcubanrestaurantnc.com`) with text lists and third-party delivery links. Operating across two premier Charlotte area hubs (Ballantyne Village and Huntersville), it lacks an owned digital showcase highlighting its slow-roasted Ropa Vieja, hand-muddled Mojito lounge, pressed Cubano sandwiches, and live weekend Latin ambiance.

## Creative Brief

### Verified Visual / Content Anchors

1. **Dual Charlotte Locations:** Ballantyne Village (14825 Ballantyne Village Way #150) and Huntersville (15906 Old Statesville Rd).
2. **Slow-Roasted Ropa Vieja & Vaca Frita:** Authentic 12-hour shredded beef Ropa Vieja, crispy garlic Vaca Frita, and authentic pressed Cubano sandwiches.
3. **Hand-Muddled Mojito & Rum Lounge:** Fresh mint, sugar cane, lime, and aged Cuban-style rums served daily from 11:00 AM.

### Core Design Moves

1. **Havana Tropical Revival & Brass Typography:** Classic Cuban display serifs (*Fraunces*) paired with tropical geometric sans-serifs (*Plus Jakarta Sans*) and gold foil Havana badges (e.g., `"BALLANTYNE VILLAGE & HUNTERSVILLE • CUBAN CUISINE"`).
2. **Havana Coral & Royal Palm Green Palette:** High-contrast palette anchored in vibrant Havana Coral (`#D94A38`), Royal Palm Leaf green (`#2D5A43`), Warm Sugarcane Gold (`#E6B04C`), and deep mahogany wood charcoal (`#1C1917`) on warm sand parchment (`#FAF6F0`).
3. **"The Mojito & Platos Principales Matrix":** A specialized dual-column menu layout (`menu.html` & `mojito-lounge.html`) matching each traditional Cuban entree with its recommended rum cocktail pairing.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Ballantyne location: 14825 Ballantyne Village Way #150, Charlotte NC (980-268-6465) | `visit.html`, `index.html` | [Azucar Official](https://azucarcubanrestaurantnc.com) |
| Huntersville location: 15906 Old Statesville Rd, Huntersville NC (704-992-9480) | `visit.html`, `index.html` | [Azucar Official](https://azucarcubanrestaurantnc.com) |
| Operating hours: Sun–Thu 11am–9pm, Fri–Sat 11am–10pm (Both locations) | `visit.html`, `index.html` | [Azucar Official](https://azucarcubanrestaurantnc.com) |
| Serves Ropa Vieja, Vaca Frita, Cubano Sandwiches, Lechon Asado, and Yuca con Mojo | `menu.html`, `ropa-vieja-heritage.html` | [Azucar Official](https://azucarcubanrestaurantnc.com) |
| Offers hand-muddled mint mojitos, daiquiris, and aged Cuban-style rums | `mojito-lounge.html`, `menu.html` | [Azucar Official](https://azucarcubanrestaurantnc.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Dual-Location Direct Reservation Engine:** Multi-unit table reservation system with automated seating management.
- **Catering & Havana Feast Order Engine:** Corporate catering pre-order portal for Ballantyne and Lake Norman offices.
- **VIP Mojito Lounge Club SMS Alerts:** SMS notification engine for weekend live music and rum tasting events.
- **Local Discovery Pack:** Targeted SEO landing pages for Ballantyne, Blakeney, Huntersville, and Cornelius diners.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online reservation booking engine.
- No submission forms of any kind (no contact, catering inquiry, or newsletter forms).
- No automated SMS or email marketing tools.
- No interactive rum tasting selector.

### Available for Production Scope

- Custom zero-commission online ordering & catering integration.
- Multi-location table reservation engine.
- VIP Cuban Mojito Club loyalty module.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs azucar-cuban-restaurant` executed. `qa-report.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
