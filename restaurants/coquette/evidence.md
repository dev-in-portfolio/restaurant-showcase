# Coquette — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Coquette
- **Slug:** `coquette`
- **Audit Grade / Disposition / Score:** A / YES / 100
- **Audit Batch:** 5
- **Verification Date:** August 12, 2026

## Verification Sources

- [Coquette CLT Official Website](https://coquetteclt.com)
- [AAA Travel — Coquette Profile](https://aaa.com)
- [OpenTable — Coquette Reservations & Details](https://opentable.com)

## Original Audit Weakness

Coquette relies on standard reservations platforms (`coquetteclt.com`, OpenTable). Located at 101 S Tryon St in Uptown Charlotte, it lacks an owned digital showcase capturing its romantic Parisian brasserie atmosphere, raw bar & duck fat fry craft, midday apéro ritual, and high-fashion French dining elegance.

## Creative Brief

### Verified Visual / Content Anchors

1. **Uptown Charlotte One South Location:** 101 S Tryon St, Ste 14, Charlotte NC 28280 (Tryon & Trade).
2. **Signature French Cuisine:** Duck Fat Fried Chicken with lavender honey drizzle, fresh raw bar oysters on ice with mignonette, French onion soup gratinee, and steak frites with béarnaise.
3. **Apéro Hour & Patisserie:** Midday Apéro Experience (Tue-Sat 3-5pm), French wine cellars, artisanal charcuterie, and French pastries.

### Core Design Moves

1. **Haute Couture French Serif Typography:** Elegant French serif display (*Playfair Display*) paired with refined body sans (*Plus Jakarta Sans*) and brasserie ticket mono (*Space Mono*).
2. **Parisian Burgundy & Brass Gold Palette:** High-fashion palette anchored in deep Parisian burgundy (`#2D0C15`), royal velvet plum (`#4A1224`), polished brass gold (`#D4AF37`), warm rose gold (`#E6A17E`), and soft silk cream (`#FFFDF7`).
3. **"The Duck Fat Fry & Raw Bar Craft Matrix":** Matrix-style dual column layout (`duck-fat-fry-craft.html` & `menu.html`) showcasing duck fat fried chicken alongside raw bar oysters and Bordeaux wines.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Copperhead Social Club` — Industrial smash burger pub with Space Grotesk/Outfit fonts and Burnished Copper.
2. `Cool Idiot Coffee` — Playful specialty coffee bar with Bricolage Grotesque/Outfit fonts and Cake Pop Magenta.
3. `Comal Taco Co.` — Sonoran comal taco stall with Syne/Outfit fonts and Habanero Amber.

### Divergent Choices for Coquette

- **Hero Composition:** Parisian Haute Couture Brasserie & Uptown Tryon Vault split-hero layout: left side features an ornate gold filigree & Paris stamp badge (`"MODERN FRENCH BRASSERIE • UPTOWN 101 S TRYON"`), haute couture serif typography (*Playfair Display*), burgundy velvet & brass gold palette, and right side features a sunlit framed hero image of signature Duck Fat Fried Chicken, iced raw bar oysters, French onion soup, and Bordeaux wine on a marble table.
- **Section Rhythm:** Replaced standard card grids with **Coquette Vault Cards** (`coquette-vault-card`) and **Uptown Apéro Hour Highlights**.
- **HTML Vocabulary:** Completely unique class names (`coquette-header`, `brasserie-brand`, `paris-hero-stage`, `gold-stamp-badge`, `coquette-vault-card`, `coquette-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 101 S Tryon St Ste 14 in Uptown Charlotte | `visit.html`, `index.html`, `concept.html` | [Coquette CLT Direct](https://coquetteclt.com) |
| Lunch Mon-Fri 11-3, Dinner Mon-Sat 5-10 & Sun 5-9, Brunch Sat-Sun 11-3 | `visit.html`, `index.html` | [Coquette CLT Direct](https://coquetteclt.com) |
| Phone number: (704) 705-2224 | `visit.html`, `index.html` | [AAA Travel Profile](https://aaa.com) |
| Signature Duck Fat Fried Chicken with lavender honey & raw bar oysters | `menu.html`, `duck-fat-fry-craft.html` | [Coquette CLT Direct](https://coquetteclt.com) |
| Midday Apéro Experience (Tue-Sat 3pm-5pm walk-ins welcome) | `menu.html`, `apero-craft.html` | [Coquette CLT Direct](https://coquetteclt.com) |
| Complimentary valet parking nightly & 2-hour One South garage validation | `visit.html`, `concept.html` | [Coquette CLT Direct](https://coquetteclt.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Coquette VIP Table Reservation & Sommelier Portal:** Premium online table booking & French wine pairing concierge.
- **Corporate Private Dining & Salon Buyout Engine:** Direct booking portal for Uptown Charlotte executive dining & private galas.
- **Apéro Club Champagne & Caviar Drop SMS Alert Engine:** Exclusive text notifications for rare wine allocations & seasonal caviar drops.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live table waitlist counter.

### Available for Production Scope

- Custom zero-commission direct reservation portal.
- Interactive French wine & charcuterie pairing builder.
- Uptown Charlotte private dining management system.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs coquette` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
