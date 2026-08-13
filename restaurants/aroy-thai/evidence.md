# Aroy Thai — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Aroy Thai
- **Slug:** `aroy-thai`
- **Audit Grade / Disposition / Score:** A / YES / 90
- **Audit Batch:** 2
- **Verification Date:** August 11, 2026

## Verification Sources

- [Aroy Thai Official Ordering Lander](https://aroythaitogo.com)
- [DoorDash — Aroy Thai Charlotte](https://www.doordash.com)
- [Grubhub — Aroy Thai To Go Charlotte](https://www.grubhub.com)

## Original Audit Weakness

Aroy Thai relies on a basic third-party online ordering lander (`aroythaitogo.com`) with no dedicated brand story or custom digital experience. Operating on the busy East Independence Boulevard corridor (5301 E Independence Blvd), it lacks visual hierarchy for authentic spice customization, wok noodle techniques, or fast call-ahead pickup at (980) 819-5245.

## Creative Brief

### Verified Visual / Content Anchors

1. **East Independence Blvd Noodle & Curry Landmark:** A staple for authentic Thai cuisine on the East Independence corridor (5301 E Independence Blvd).
2. **High-Heat Wok & House Tamarind Glaze:** Signature Pad Kee Meow (Drunken Noodles) and Pad Thai seared in screaming hot woks with fresh Thai basil and house tamarind glaze.
3. **Aroy Signature Peanut Curry:** Famous house specialty curry infused with coconut milk, kaffir lime leaves, roasted peanuts, and choice of protein.

### Core Design Moves

1. **Siam Silk & Brass Typography:** Warm Thai display serifs (*Fraunces*) paired with clean modern sans-serifs (*Plus Jakarta Sans*) and stamped brass badges (e.g., `"5301 E INDEPENDENCE BLVD • AUTHENTIC THAI CRAFT"`).
2. **Deep Teak Wood & Golden Coconut Curry Palette:** High-contrast palette anchored in rich teak wood charcoal (`#1A1716`), golden coconut curry amber (`#E09F3E`), deep Thai chili red (`#9E2A2B`), and lime leaf green (`#3A5A40`) on warm parchment (`#FAF7F2`).
3. **"The Wok Spice & Noodle Matrix":** A specialized dual-column menu layout (`menu.html` & `curry-spice.html`) that pairs each stir-fry and curry directly with recommended heat levels and house beverage matches (Thai Iced Tea).

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 5301 East Independence Boulevard, Charlotte, NC 28212 | `visit.html`, `index.html`, `concept.html` | [DoorDash Listing](https://www.doordash.com) |
| Operating hours are Mon–Sat 11:00 AM – 9:00 PM, Sun 12:00 PM – 9:00 PM | `visit.html`, `index.html` | [Aroy Thai Official](https://aroythaitogo.com) |
| Phone number for call-in pickup is (980) 819-5245 | `visit.html`, `index.html` | [Aroy Thai Official](https://aroythaitogo.com) |
| Offers Pad Thai, Drunken Noodles, Aroy Peanut Curry, Tom Yum Soup, and Crab Rangoon | `menu.html`, `pad-thai-craft.html` | [Aroy Thai Official](https://aroythaitogo.com) |
| Serves authentic Thai iced tea and mango sticky rice | `menu.html`, `curry-spice.html` | [Aroy Thai Official](https://aroythaitogo.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Interactive Spice & Noodle Customizer:** Custom wok noodle and heat level selector (1 to 5 stars).
- **Order & Reserve Pack:** Direct online takeout ordering engine with pickup ETA tracker.
- **Guest Engagement Pack:** SMS Thai Lunch Club alerts for weekly chef specials.
- **Local Discovery Pack:** SEO landing pages targeting East Charlotte and Matthews Thai lovers.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or payment processing engine.
- No submission forms of any kind (no contact, catering inquiry, or newsletter forms).
- No automated SMS or email marketing tools.
- No interactive spice wizard.

### Available for Production Scope

- Custom zero-commission online ordering integration.
- SMS VIP Thai Noodle Club loyalty module.
- Corporate Lunch Express & Catering portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs aroy-thai` executed. `qa-report.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
