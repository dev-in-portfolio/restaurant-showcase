# El Veneno — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** El Veneno
- **Slug:** `el-veneno`
- **Audit Grade / Disposition / Score:** A / YES / 99
- **Audit Batch:** 7
- **Verification Date:** August 12, 2026

## Verification Sources

- [El Veneno Official Website](https://www.elvenenotacos.com)
- [Monarch Market Food Hall Directory — 101 N Tryon St](https://www.elvenenotacos.com)
- [Axios Charlotte — El Veneno Profile](https://www.axios.com/local/charlotte)

## Original Audit Weakness

El Veneno relies on food truck pop-up schedules and food hall directories. Located at 101 N Tryon St (Monarch Market) & Latrobe Dr in Charlotte, it lacks an owned digital showcase capturing its authentic Mexican street taco craft, house birria consomé, catering buyouts, and brewery pop-up schedule engine.

## Creative Brief

### Verified Visual / Content Anchors

1. **Monarch Market Uptown Location:** Monarch Market Food Hall, 101 N Tryon St, Charlotte NC 28202 (Uptown Charlotte).
2. **Authentic Mexican Street Tacos & Birria:** Birria de Res Tacos with Queso & Consomé, Suadero Tacos, Tacos al Pastor, Carnitas Michoacán, Quesabirria, & Fresh Homemade Aguas Frescas (Horchata & Jamaica).
3. **Food Truck & Catering Operations:** Rotating food truck schedule across Charlotte breweries & custom taco bar catering buyouts.

### Core Design Moves

1. **Bold Geometric Display Typography:** Geometric display sans (*Unbounded*) paired with clean body sans (*Inter*) and street kitchen mono (*Space Mono*).
2. **Dark Obsidian & Fiery Habanero Palette:** Electric street palette anchored in dark obsidian (`#0F0D0E`), fiery habanero red (`#DC2626`), street cilantro green (`#16A34A`), maize gold (`#F59E0B`), and warm masa cream (`#FFFBEB`).
3. **"The Street Taco & Birria Consomé Matrix":** Matrix-style dual column layout (`mexican-street-taco-craft.html` & `menu.html`) showcasing hand-pressed corn tortilla street tacos alongside slow-braised birria de res consomé & homemade horchata.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Dee’s Vegan To Go` — 100% Plant-Based Comfort with Plus Jakarta Sans fonts and Forest Charcoal/Kale Emerald.
2. `Curry n Cake` — Indian Street Food & Fusion Bakery with Fraunces fonts and Saffron Charcoal/Royal Amber.
3. `Great Wagon Road Distilling Co.` — Industrial Copper Distillery with Cinzel fonts and Copper Charcoal/Oak Bronze.

### Divergent Choices for El Veneno

- **Hero Composition:** Urban Mexican Street Taco & Birria Consomé Vault split-hero layout: left side features a fiery habanero red stamp badge (`"AUTHENTIC MEXICAN STREET TACOS • MONARCH MARKET UPTOWN"`), bold condensed sans (*Unbounded*), obsidian & habanero red palette, and right side features a vibrant framed hero image of birria tacos, consomé dip, & cilantro.
- **Section Rhythm:** Replaced standard card grids with **EV Vault Cards** (`ev-vault-card`) and Monarch Market culinary highlights.
- **HTML Vocabulary:** Completely unique class names (`ev-header`, `ev-brand`, `habanero-hero-stage`, `chili-stamp-badge`, `ev-vault-card`, `ev-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at Monarch Market 101 N Tryon St in Charlotte NC 28202 | `visit.html`, `index.html`, `concept.html` | [El Veneno Direct](https://www.elvenenotacos.com) |
| Monarch Market hours: Mon-Sat 11am-9pm, Sun 12pm-7pm | `visit.html`, `index.html` | [El Veneno Direct](https://www.elvenenotacos.com) |
| Food truck schedule & Latrobe headquarters (3500 Latrobe Dr) | `visit.html`, `food-truck-schedule.html` | [El Veneno Direct](https://www.elvenenotacos.com) |
| Birria de Res Tacos with Queso & Warm Consomé Dip | `menu.html`, `mexican-street-taco-craft.html` | [El Veneno Direct](https://www.elvenenotacos.com) |
| Suadero, al Pastor, & Carnitas Michoacán Street Tacos | `menu.html`, `mexican-street-taco-craft.html` | [El Veneno Direct](https://www.elvenenotacos.com) |
| Homemade Horchata, Jamaica, & Taco Bar Event Catering | `menu.html`, `visit.html` | [El Veneno Direct](https://www.elvenenotacos.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **El Veneno Live Food Truck Brewery Location Tracker Engine:** Direct GPS & calendar scheduling engine for food truck pop-ups.
- **El Veneno Taco Bar Event Catering Ordering Engine:** Bulk corporate catering & wedding taco bar booking portal.
- **El Veneno VIP Street Taco Loyalty Rewards Engine:** Exclusive VIP rewards portal for frequent Monarch Market guests.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live food hall table seating reservation integration.

### Available for Production Scope

- Custom zero-commission direct mobile takeout & catering app.
- Interactive custom taco bar catering price calculator.
- Live brewery pop-up notification subscription system for Charlotte foodies.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs el-veneno` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
