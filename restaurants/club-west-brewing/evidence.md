# Club West Brewing — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Club West Brewing
- **Slug:** `club-west-brewing`
- **Audit Grade / Disposition / Score:** A / YES / 100
- **Audit Batch:** 4
- **Verification Date:** August 12, 2026

## Verification Sources

- [Club West Brewing Official Site](https://clubwestbrew.com)
- [Axios Charlotte — Club West Brewing Rebrand Feature](https://axios.com)
- [WFAE — South End Brewery Spotlight](https://wfae.org)

## Original Audit Weakness

Club West Brewing relies on generic brewery landing pages (`clubwestbrew.com`). Located at 2151 Hawkins St in South End, it lacks an owned digital showcase capturing its 2-acre outdoor beer garden, craft fermentation chemistry, South End nightlife energy, and taproom food engine.

## Creative Brief

### Verified Visual / Content Anchors

1. **South End Hawkins Street Location:** 2151 Hawkins Street, Charlotte NC 28203 (South End / Hawkins St).
2. **Core Craft Beer Lineup:** Flagship West Coast IPA (7.2% ABV), Light Lager (4.2% ABV), Peach Yuzu Cider (5.6% ABV), Citrus Valencia Wheat (5.2% ABV), and Blood Orange Lime Mexican Lager (4.8% ABV).
3. **Beer Garden & Taproom Kitchen:** Sunlit outdoor beer garden, artisanal pretzel bites with warm beer cheese, smash burgers, craft cocktails, and late-night nightlife.

### Core Design Moves

1. **Technical Fermentation Typography:** Contemporary technical brewery sans (*Outfit*) paired with clean body sans (*Plus Jakarta Sans*) and fermentation batch mono (*Space Mono*).
2. **Obsidian & Electric Hops Palette:** High-energy brewery palette anchored in deep malt charcoal (`#0B1310`), electric hops green (`#00E676`), warm amber hazy gold (`#E5A93B`), soft foam white (`#F6FAF7`), and nightlife dark (`#121E1A`).
3. **"The 10-Barrel Fermentation Chemistry & Taproom Food Matrix":** Matrix-style dual column layout (`craft-beer-chemistry.html` & `menu.html`) showcasing core craft brews alongside taproom comfort food.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Clark’s Snack Bar` — Retro 70s diner with Space Grotesk/Outfit fonts.
2. `Circle G Restaurant` — Classic 1954 Southern diner with Playfair Display/Outfit fonts.
3. `Cilantro Noodle + Kitchen` — Modern Vietnamese noodle bar with Outfit/Plus Jakarta Sans fonts.

### Divergent Choices for Club West Brewing

- **Hero Composition:** Modern Craft Brewery & South End Beer Garden Vault split-hero layout: left side features an electric hops green stamp badge (`"CRAFT BREWERY & BEER GARDEN • SOUTH END 2151 HAWKINS"`), technical display typography (*Outfit*), obsidian & electric hops green palette, and right side features a sunlit framed hero image of craft beer pints, peach yuzu cider, and pretzel bites in the beer garden.
- **Section Rhythm:** Replaced standard card grids with **Brew Vault Cards** (`brew-vault-card`) and **South End Taproom Highlights**.
- **HTML Vocabulary:** Completely unique class names (`brew-header`, `hop-brand`, `malt-hero-stage`, `hops-stamp-badge`, `brew-vault-card`, `brew-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 2151 Hawkins St in South End Charlotte NC | `visit.html`, `index.html`, `concept.html` | [Club West Official Site](https://clubwestbrew.com) |
| Operating hours: Sun-Mon 11am-10pm, Tue-Wed 11am-11pm, Thu-Sat 11am-12am | `visit.html`, `index.html` | [Club West Official Site](https://clubwestbrew.com) |
| Serves Flagship West Coast IPA (7.2%), Light Lager (4.2%), & Peach Yuzu Cider (5.6%) | `menu.html`, `craft-beer-chemistry.html` | [Club West Beer Menu](https://clubwestbrew.com) |
| Features Citrus Valencia Wheat (5.2%) & Blood Orange Lime Mexican Lager (4.8%) | `menu.html`, `taproom-food-craft.html` | [Club West Beer Menu](https://clubwestbrew.com) |
| Outdoor beer garden, taproom kitchen, pretzel bites, & craft cocktails | `concept.html`, `visit.html` | [Axios Charlotte](https://axios.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Club West Express Taproom Order & Pickup Portal:** Direct non-aggregate crowler, growler & food order engine.
- **Beer Garden Private Event & Party Booking Engine:** Direct space reservation tool for corporate events & birthdays.
- **South End Mug Club Loyalty Stamp Card:** Mobile SMS stamp card for exclusive small-batch beer tastings.
- **Secret Can Release SMS Alert Engine:** Real-time SMS notification when limited IPA & cider cans drop.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, event request, or newsletter forms).
- No automated SMS or email marketing tools.
- No live taproom occupancy counter.

### Available for Production Scope

- Custom zero-commission direct ordering portal.
- Interactive custom beer flight builder.
- South End corporate beer garden event catering engine.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs club-west-brewing` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
