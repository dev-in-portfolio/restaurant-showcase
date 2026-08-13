# Anita's Mexican Grill — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Anita's Mexican Grill
- **Slug:** `anita-s-mexican-grill`
- **Audit Grade / Disposition / Score:** A / YES / 94
- **Audit Batch:** 1
- **Verification Date:** August 11, 2026

## Verification Sources

- [Charlotte's Got A Lot — Anita's Mexican Grill Guide](https://www.charlottesgotalot.com/eat-drink/mexican/anitas-mexican-grill)
- [Axios Charlotte — Best Mexican Lunch Spots in Charlotte](https://charlotte.axios.com)
- [Anita's Mexican Grill Online Ordering](https://anitasmexicangrill.netwaiter.com/charlotte)

## Original Audit Weakness

Anita's Mexican Grill relies on a rudimentary third-party Netwaiter ordering template with no dedicated owned website or brand identity. Operating on a strict, high-demand 10:30 AM – 3:00 PM Monday–Friday lunch schedule near Charlotte Douglas International Airport, guests frequently face long lines and parking bottlenecks without clear digital guidance for call-ahead ordering, lunch-rush timing, or menu customization.

## Creative Brief

### Verified Visual / Content Anchors

1. **Yorkmont Road Lunch Institution:** Fast-casual lunch spot near the CLT Airport industrial corridor, renowned for lightning-speed service during its 10:30 AM – 3:00 PM Monday–Friday window.
2. **California & Traditional Mexican Specialties:** Famous for loaded West Coast-style burritos (stuffed with fries, cheese, and grilled meats) alongside authentic tortas, carnitas, and chicken tortilla soup.
3. **Generous Portions & No-Frills Authenticity:** Warm, sunlit taqueria environment with high-contrast, energetic visual presentation celebrating scratch-made salsas and hearty portions.

### Core Design Moves

1. **High-Contrast Taqueria Typography & Stamped Badges:** Uses expressive, warm display serifs (*Fraunces*) paired with clean geometric sans-serifs (*Outfit*) and prominent badge UI chips (e.g. "WEEKDAY LUNCH ONLY 10:30 AM – 3:00 PM").
2. **Sun-Drenched Terracotta & Agave Palette:** Warm color system anchored in terracotta (`#C84B31`), agave green (`#2A9D8F`), and sunlit cream (`#FDFBF7`), departing from generic dark templates to reflect an authentic daytime taqueria.
3. **"Lunch Rush Express" Customer Flow:** A dedicated page (`lunch-rush.html`) that optimizes the experience for office and airport workers, detailing peak-hour navigation, quick phone ordering, and meal pickup strategies.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 2904 Yorkmont Rd, Ste C, Charlotte, NC 28208 | `visit.html`, `index.html`, `lunch-rush.html` | [Charlotte's Got A Lot](https://www.charlottesgotalot.com/eat-drink/mexican/anitas-mexican-grill) |
| Operating hours are Monday – Friday, 10:30 AM – 3:00 PM; closed Sat & Sun | `visit.html`, `index.html`, `lunch-rush.html` | [Charlotte's Got A Lot](https://www.charlottesgotalot.com/eat-drink/mexican/anitas-mexican-grill) |
| Phone number for call-in orders is (704) 329-0321 | `visit.html`, `lunch-rush.html` | [Charlotte's Got A Lot](https://www.charlottesgotalot.com/eat-drink/mexican/anitas-mexican-grill) |
| Offers California-style burritos stuffed with fries, cheese, and grilled meats | `menu.html`, `california-style.html` | [Netwaiter Menu](https://anitasmexicangrill.netwaiter.com/charlotte) |
| Serves chicken tortilla soup, street tacos, tortas, and scratch-made salsas | `menu.html`, `concept.html` | [Charlotte's Got A Lot](https://www.charlottesgotalot.com/eat-drink/mexican/anitas-mexican-grill) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Order & Reserve Pack:** Direct custom online ordering engine, mobile pickup tracker, and catering group order planner.
- **Menu Concierge Pack:** Interactive burrito customizer and heat-level salsa guide.
- **Local Discovery Pack:** SEO landing pages targeting airport travelers and corporate lunch hubs.
- **Guest Engagement Pack:** SMS lunch special alerts and digital loyalty reward stamp card.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or payment processing engine.
- No submission forms of any kind (no contact, catering inquiry, or newsletter forms).
- No automated SMS or email loyalty subscription tools.
- No interactive meal builder or salsa recommendation wizard.

### Available for Production Scope

- Custom zero-commission online ordering integration.
- SMS Lunch Alert subscription module.
- Corporate Lunch Catering & Group Express Order portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs anita-s-mexican-grill` executed. `qa-report.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
