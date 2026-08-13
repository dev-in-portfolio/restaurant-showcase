# Astoria Café — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Astoria Café
- **Slug:** `astoria-cafe`
- **Audit Grade / Disposition / Score:** A / YES / 97
- **Audit Batch:** 2
- **Verification Date:** August 11, 2026

## Verification Sources

- [South End Charlotte Directory — Astoria Café](https://southendclt.org)
- [Explore Charlotte — Astoria Cafe Listing](https://explorecharlotte.com)
- [Joe Coffee App — Astoria Cafe Profile](https://joe.coffee)

## Original Audit Weakness

Astoria Café relies on social media profiles and third-party app ordering pages (`joe.coffee`) with no dedicated web platform. Situated at 110 East Blvd along the South End Rail Trail in Charlotte NC, it lacks an owned digital experience that showcases its house-made syrup craft, specialty cold brews, Rail Trail patio atmosphere, or daily morning hours (7:00 AM – 3:00 PM).

## Creative Brief

### Verified Visual / Content Anchors

1. **South End Rail Trail Landmark:** Located at 100 East Blvd & Camden Rd right on the South End Rail Trail (110 East Blvd).
2. **House-Made Specialty Syrups:** Signature house-crafted syrups including Pistachio Cardamom, Lavender Honey, and Brown Sugar Cinnamon paired with double-shot espresso.
3. **Rail Trail Morning Patio & Dog Friendly:** Outdoor espresso bar gathering spot open daily 7:00 AM – 3:00 PM with apple cider donuts and whipped cream pup cups.

### Core Design Moves

1. **Rail Trail Espresso & Mediterranean Serif Typography:** Stylish modern serif headlines (*Fraunces*) paired with clean geometric sans-serifs (*Plus Jakarta Sans*) and stamped copper badges (e.g., `"110 EAST BLVD • SOUTH END RAIL TRAIL"`).
2. **Terracotta Ceramic & Warm Espresso Latte Palette:** High-contrast palette anchored in rich espresso charcoal (`#1F1A17`), warm terracotta clay (`#C86D51`), pistachio green (`#8A9B6E`), and steamed oat milk cream (`#FAF6F0`) with warm copper accents (`#D49B6A`).
3. **"The Syrup Lab & Roast Matrix":** A specialized dual-column menu layout (`menu.html` & `syrup-craft.html`) matching each signature coffee creation with its custom house syrup, milk choice, and bakery pair.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 110 East Blvd, Charlotte, NC 28203 in South End | `visit.html`, `index.html`, `concept.html` | [South End CLT Directory](https://southendclt.org) |
| Operating hours are Monday – Sunday, 7:00 AM – 3:00 PM | `visit.html`, `index.html` | [Joe Coffee Profile](https://joe.coffee) |
| Contact phone is (561) 405-1518 and email astoriacafeclt@gmail.com | `visit.html`, `concept.html` | [Explore Charlotte](https://explorecharlotte.com) |
| Crafts signature house-made syrups like Pistachio Cardamom, Lavender Honey, and Brown Sugar | `menu.html`, `syrup-craft.html` | [Joe Coffee Profile](https://joe.coffee) |
| Features apple cider donuts, fresh pastries, and pup cups along the Rail Trail | `menu.html`, `rail-trail-vibe.html` | [Joe Coffee Profile](https://joe.coffee) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Mobile Coffee Pre-Order & Rail Trail Pickup:** Direct mobile order engine with instant barista ETA counter.
- **House-Made Syrup Subscription Club:** E-commerce bottle sales engine for retail syrup syrup drops.
- **Pup & Brew Rail Trail VIP Pass:** Mobile loyalty module for local South End dog owners.
- **Corporate Coffee Catering Manager:** Event booking engine for 110 East office tower coffee pop-ups.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or mobile pre-payment engine.
- No submission forms of any kind (no contact, catering inquiry, or newsletter forms).
- No automated SMS or email marketing tools.
- No interactive syrup flavor quiz.

### Available for Production Scope

- Custom zero-commission mobile order integration.
- House Syrup retail shop e-commerce module.
- VIP Rail Trail Coffee Club loyalty engine.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs astoria-cafe` executed. `qa-report.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
