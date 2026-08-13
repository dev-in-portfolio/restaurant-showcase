# ANJU Korean Dining & Bar — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** ANJU Korean Dining & Bar
- **Slug:** `anju-korean-dining-and-bar`
- **Audit Grade / Disposition / Score:** A / YES / 95
- **Audit Batch:** 1
- **Verification Date:** August 11, 2026

## Verification Sources

- [ANJU Official Web Presence](https://www.anjucharlotte.com)
- [Charlotte's Got A Lot — ANJU Korean Dining Listing](https://www.charlottesgotalot.com/things-to-do/restaurants/anju-korean-dining-bar)
- [CLT Bucket List — ANJU Feature](https://cltbucketlist.com/anju-korean-dining-bar/)

## Original Audit Weakness

ANJU Korean Dining & Bar relies on a basic third-party online ordering lander (`anjucharlotte.com` / DoorDash templates) that fails to convey the restaurant's dual identity: a refined daytime Korean lunch destination and a high-energy late-night gastro-lounge serving soju cocktails until 2:00 AM on weekends. Operating in ParkTowne Village, its digital footprint lacks menu hierarchy for traditional "Anju" drink-pairing dishes, hot pot sharing options, or clear last-seating guidelines.

## Creative Brief

### Verified Visual / Content Anchors

1. **Traditional Korean "Anju" Culture:** Built around the authentic Korean tradition of pairing bold, savory dishes (spicy rice cakes, K-BBQ short ribs, hot pots) with soju, rice wine, and craft beer.
2. **Dual Lunch & Late-Night Schedule:** Features daytime lunch sets (11:30 AM – 2:30 PM) and late-night weekend dining until 2:00 AM in ParkTowne Village.
3. **Contemporary Gastro-Lounge Atmosphere:** Modern architectural paneling, warm ambient pendant lights, and vibrant magenta neon accents reflecting Seoul's late-night dining scene.

### Core Design Moves

1. **Seoul Gastro-Lounge Neon & Dark Obsidian Palette:** Deep midnight obsidian (`#0A0B0E`), warm smoked amber (`#F4A261`), and vibrant electric magenta (`#FF2E93`) border glows, avoiding generic dark cards to reflect an authentic Korean nightlife vibe.
2. **Hangul Typographic Watermarks & Modern Layout:** Asymmetric hero and card grids incorporating stylized vertical Korean typography (*안주*) alongside clean geometric sans-serifs (*Plus Jakarta Sans*) and high-contrast monospace labels (*Space Mono*).
3. **"The Anju Pairing Matrix":** A specialized menu layout (`menu.html` & `soju-bar.html`) that pairs each food category directly with suggested Korean soju, rice wine, or craft lager tasting notes.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 1600 East Woodlawn Road, Charlotte, NC 28209 in ParkTowne Village | `visit.html`, `index.html`, `concept.html` | [Charlotte's Got A Lot](https://www.charlottesgotalot.com/things-to-do/restaurants/anju-korean-dining-bar) |
| Lunch hours are Monday – Sunday, 11:30 AM – 2:30 PM | `visit.html`, `index.html` | [ANJU Official Site](https://www.anjucharlotte.com) |
| Dinner hours are Mon–Thu 5:00 PM – 12:00 AM, Fri–Sat 5:00 PM – 2:00 AM, Sun 5:00 PM – 10:00 PM | `visit.html`, `index.html` | [ANJU Official Site](https://www.anjucharlotte.com) |
| Phone number is (704) 900-7347 | `visit.html`, `index.html` | [ANJU Official Site](https://www.anjucharlotte.com) |
| Offers Kalbi Steak, Bulgogi, Sweet Soy Garlic Chicken, Tteokbokki, and Budae Jungol hot pots | `menu.html`, `anju-culture.html` | [ANJU Official Site](https://www.anjucharlotte.com) |
| Last seating is 30 minutes prior to closing time | `visit.html`, `index.html` | [ANJU Official Site](https://www.anjucharlotte.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Signature Interactive Experience:** Interactive Soju & Flight Pairing Builder or interactive K-BBQ grilling guide.
- **Digital Menu Concierge:** Flavor preference quiz (spicy, savory, umami) and group hot pot share calculator.
- **Order & Reserve Pack:** Private karaoke lounge / late-night group reservation manager.
- **Guest Engagement Pack:** Late-Night Soju Club SMS alerts and VIP table rewards.

### Intentionally Not Implemented (Preserved for Upsell)

- No interactive flight builders or recommendation engines.
- No submission forms of any kind (no contact, private party inquiry, or newsletter forms).
- No automated SMS or CRM marketing tools.
- No live table waitlist or reservation booking widgets.

### Available for Production Scope

- Interactive Soju Pairing & Flight Builder.
- Private Lounge & Late-Night Group Booking portal.
- VIP Guest Loyalty & Late-Night Special alert system.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs anju-korean-dining-and-bar` executed. `qa-report.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, verified keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM hierarchy.
