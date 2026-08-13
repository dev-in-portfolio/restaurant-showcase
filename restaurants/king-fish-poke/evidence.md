# King Fish Poke — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** King Fish Poke
- **Slug:** `king-fish-poke`
- **Audit Grade / Disposition / Score:** A / YES / 100
- **Audit Batch:** 10
- **Verification Date:** August 13, 2026

## Verification Sources

- [King Fish Poke Official Portal](https://kingfishpokenc.com)
- [King Fish Poke Online Ordering](https://kingfishpoke.chinesemenuonline.com)
- [Grubhub — King Fish Poke Charlotte Profile](https://www.grubhub.com)

## Original Audit Weakness

King Fish Poke relies on basic third-party online ordering apps (ChineseMenuOnline, Grubhub). Located at 350 E McCullough Dr in University City, it lacks an owned digital showcase capturing its sashimi-grade fish sourcing, build-your-own poke bowl interactive matrix, University catering platters, and Hawaiian boba drink club.

## Creative Brief

### Verified Visual / Content Anchors

1. **University City Charlotte Location:** 350 E McCullough Dr, Suite 110, Charlotte NC 28262 (University City near UNC Charlotte).
2. **Hawaiian Poke & Sashimi Specialties:** King Ahi Tuna Poke Bowl, Spicy Salmon Crunch Bowl, Eel Unagi Lover Bowl, Volcano Crab Bowl, Custom Build-Your-Own Poke Bowls, Seaweed Salad, Miso Soup, & Taro Boba Milk Teas.
3. **Contact & Operating Hours:** Phone (704) 548-8333; Open Daily 11:00 AM – 8:00 PM.

### Core Design Moves

1. **Clean Tropical Display Typography:** Bold tropical sans (*Outfit*) paired with clean body sans (*Plus Jakarta Sans*) and Honolulu dock mono (*Space Mono*).
2. **Pacific Ocean Navy & Tropical Mango Palette:** Island poke palette anchored in deep Pacific ocean navy (`#0369A1`), tropical mango amber (`#F59E0B`), coral pink (`#F43F5E`), and crisp seafoam white (`#F0FDFA`).
3. **"The Build-Your-Own Hawaiian Poke & Sashimi Matrix":** Matrix-style dual column layout (`hawaiian-poke-craft.html` & `menu.html`) showcasing signature poke creations alongside custom 5-step build-your-own bowl options & boba teas.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Jimmy Pearls` — Chesapeake Bay Maritime with Cinzel fonts and Deep Atlantic Navy/Old Bay Orange.
2. `Jeff's Bucket Shop` — Underground Electric Neon with Space Grotesk fonts and Midnight Black/Magenta.
3. `Corkscrew Wine Pub` — Vintage Bordeaux Oak Barrel with Playfair Display fonts and Deep Bordeaux Maroon/Oak Amber.

### Divergent Choices for King Fish Poke

- **Hero Composition:** Hawaiian Pacific Island Sunburst & Sashimi Poke Vault split-hero layout: left side features a Tropical Lagoon stamp badge (`"HAWAIIAN POKE & FRESH SASHIMI BAR • UNIVERSITY CHARLOTTE NC"`), bold tropical sans (*Outfit*), Pacific navy & mango amber palette, and right side features a bold framed hero image of fresh sashimi-grade Ahi tuna poke bowls.
- **Section Rhythm:** Replaced standard card grids with **King Fish Vault Cards** (`poke-vault-card`) and University City dining highlights.
- **HTML Vocabulary:** Completely unique class names (`poke-header`, `poke-brand`, `tropical-hero-stage`, `lagoon-stamp-badge`, `poke-vault-card`, `poke-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 350 E McCullough Dr Ste 110 in Charlotte NC 28262 | `visit.html`, `index.html`, `concept.html` | [King Fish Direct Portal](https://kingfishpokenc.com) |
| Operating hours: Open daily 11:00 AM - 8:00 PM | `visit.html`, `index.html` | [King Fish Direct Portal](https://kingfishpokenc.com) |
| Phone number: (704) 548-8333 | `visit.html`, `index.html` | [King Fish Direct Portal](https://kingfishpokenc.com) |
| King Ahi Tuna, Spicy Salmon Crunch, & Volcano Crab Bowls | `menu.html`, `hawaiian-poke-craft.html` | [King Fish Direct Portal](https://kingfishpokenc.com) |
| Build-Your-Own Poke Bowls, Miso Soup, & Taro Boba Milk Teas | `menu.html`, `sashimi-boba-craft.html` | [King Fish Direct Portal](https://kingfishpokenc.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **King Fish Direct Poke Order Engine:** Zero-commission direct mobile ordering portal for local pickup & delivery.
- **King Fish University Catering Engine:** Party platter catering portal for UNCC campus events & corporate lunches.
- **King Fish Boba & Poke Rewards Engine:** Exclusive VIP rewards portal for frequent Charlotte poke fans.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table seating reservation integration.

### Available for Production Scope

- Custom zero-commission direct mobile poke ordering app.
- Interactive 5-step build-your-own poke bowl builder & nutrition calculator.
- Custom corporate catering & campus party booking portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs king-fish-poke` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
