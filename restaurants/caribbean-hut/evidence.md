# Caribbean Hut — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Caribbean Hut
- **Slug:** `caribbean-hut`
- **Audit Grade / Disposition / Score:** A / YES / 96
- **Audit Batch:** 4
- **Verification Date:** August 11, 2026

## Verification Sources

- [Caribbean Hut Official Website](https://caribbean-hut.com)
- [Grubhub — Caribbean Hut N Tryon Charlotte](https://grubhub.com)
- [Order Online — Caribbean Hut Woodlawn](https://order.online)

## Original Audit Weakness

Caribbean Hut relies on basic template pages (`caribbean-hut.com`) and third-party delivery links (`order.online`, `grubhub.com`). Located at 9605 N Tryon St and 200 W Woodlawn Rd, it lacks a vibrant digital showcase capturing its authentic Jamaican jerk wood-smoke process, braised oxtail gravy craft, island lunch platters, and event catering.

## Creative Brief

### Verified Visual / Content Anchors

1. **N Tryon & W Woodlawn Charlotte Locations:** Flagship kitchen at 9605 N Tryon St, Charlotte NC 28262 (University / North Charlotte) and 200 W Woodlawn Rd, Charlotte NC 28217 (South Charlotte).
2. **Authentic Jamaican Jerk & Braised Oxtails:** Pimento wood-smoked jerk chicken, slow-braised oxtails in butter bean gravy, curry goat, red snapper, and jerk shrimp.
3. **Island Staples & Bakery:** Rice and peas, sweet fried plantains, Jamaican beef patties, callaloo, and moist carrot cake.

### Core Design Moves

1. **Sunny Island Typography:** Bold sunburst sans display (*Outfit*) paired with rich tropical serif (*Playfair Display*) and island reggae mono (*Space Mono*).
2. **Island Teal & Mango Gold Palette:** Vibrant Caribbean palette anchored in deep island teal (`#0D3B36`), sunburst mango gold (`#E89B27`), pimento orange (`#D94E28`), palm leaf green (`#2E6F40`), and warm sand linen (`#FAF6EE`).
3. **"The Jamaican Jerk Pit & Island Stew Matrix":** Matrix-style dual column layout (`jerk-craft.html` & `menu.html`) showcasing wood-smoked jerk platters alongside slow-simmered Caribbean stews.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Café Audire` — Mid-Century modern walnut analog vinyl lounge with Playfair/Outfit fonts.
2. `Caffeto Specialty Coffee` — Modern Andean Colombian espresso roastery with Lora/Outfit fonts.
3. `Buona Vita Pub & Pizzeria` — Tuscan hearth terra cotta brick tavern with Playfair serif display.

### Divergent Choices for Caribbean Hut

- **Hero Composition:** Sunny Caribbean Island Sunshine & Allspice Jerk Vault split-hero layout: left side features a pimento allspice stamp badge (`"AUTHENTIC JAMAICAN KITCHEN • N TRYON & WOODLAWN"`), bold tropical typography (*Outfit*), deep island teal & mango gold palette, and right side features a sunlit framed hero image of jerk chicken with rice and peas.
- **Section Rhythm:** Replaced standard card grids with **Island Platter Cards** (`island-platter-card`) and **Jerk Smokehouse Highlights**.
- **HTML Vocabulary:** Completely unique class names (`island-header`, `caribbean-brand`, `jerk-hero-stage`, `pimento-stamp-badge`, `island-platter-card`, `caribbean-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 9605 N Tryon St and 200 W Woodlawn Rd in Charlotte NC | `visit.html`, `index.html`, `concept.html` | [Caribbean Hut Official](https://caribbean-hut.com) |
| Operating hours: Mon-Fri 11am-10:30pm, Sat 8am-10:30pm, Sun 12pm-8pm (N Tryon) | `visit.html`, `index.html` | [Caribbean Hut Official](https://caribbean-hut.com) |
| Contact phones: (704) 593-0030 (N Tryon) & (704) 527-9505 (W Woodlawn) | `visit.html`, `concept.html` | [Caribbean Hut Official](https://caribbean-hut.com) |
| Features wood-smoked jerk chicken, braised oxtail gravy, curry goat, and red snapper | `menu.html`, `jerk-craft.html` | [Grubhub Listing](https://grubhub.com) |
| Serves rice & peas, sweet plantains, Jamaican patties, and carrot cake | `menu.html`, `island-sides.html` | [Order Online Listing](https://order.online) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Caribbean Hut Express Takeout & Delivery Portal:** Direct non-aggregate mobile order engine.
- **Island Corporate Catering & Event Platter Engine:** Office lunch & party platter order builder.
- **Jerk Sauce & Patty Loyalty Perk Club:** Mobile SMS stamp card for complimentary beef patties.
- **Daily Stew Availability SMS Alert Engine:** Real-time SMS notification for fresh oxtail & curry goat pots.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, catering request, or newsletter forms).
- No automated SMS or email marketing tools.
- No live kitchen pot tracker.

### Available for Production Scope

- Custom zero-commission direct ordering portal.
- Express lunch bento order engine.
- Island event catering calculator.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs caribbean-hut` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
