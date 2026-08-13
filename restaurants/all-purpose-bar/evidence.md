# All Purpose Bar — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** All Purpose Bar
- **Slug:** `all-purpose-bar`
- **Audit Grade / Disposition / Score:** A / YES / 96
- **Audit Batch:** 1
- **Verification Date:** August 11, 2026

## Verification Sources

- [Charlotte's Got A Lot — All Purpose Bar Listing](https://www.charlottesgotalot.com/things-to-do/nightlife/all-purpose-bar)
- [Hoodline — East Coast-Style Cocktail Den All Purpose Bar Opens in NoDa](https://hoodline.com/2024/02/east-coast-style-cocktail-den-all-purpose-bar-opens-in-noda-bringing-inclusive-sip-culture/)
- [Unpretentious Palate — Charlotte Old-Fashioned Sampler Feature](https://unpretentiouspalate.com/charlotte-old-fashioned-sampler-kits/)
- [WhatNow Charlotte — All Purpose Bar NoDa Opening Announcement](https://whatnowcharlotte.com/all-purpose-bar-noda-charlotte/)

## Original Audit Weakness

All Purpose Bar operates without a dedicated, owned web domain, relying entirely on social media fragments, third-party directory listings, and word of mouth. Key operating details—such as its 6:00 PM – Midnight Wednesday-through-Sunday hours, its "no kitchen, all bar" neighborhood dining policy, and its flagship zero-proof cocktail program led by veteran Charlotte mixologist Larry Suggs—are scattered across external articles rather than showcased on an official digital homepage.

## Creative Brief

### Verified Visual / Content Anchors

1. **East Coast Cocktail Den Atmosphere:** An intimate 1,700-square-foot space in NoDa (formerly Protagonist Beer) defined by dark wood cabinetry, moody amber lighting, and a focused, unpretentious hospitality ethos.
2. **Equal-Footing Zero-Proof & Spirit Philosophy:** Founded by mixologist Larry Suggs with a strict commitment to crafting alcohol-free cocktails with the exact same precision, glassware, and complex flavor balance as spirit-forward classics.
3. **No Kitchen, All Bar Service Model:** The establishment serves no food, explicitly encouraging guests to eat at neighboring NoDa eateries before or after stopping by for evening drinks.

### Core Design Moves

1. **Editorial Dual-Column Cocktails & Glassware Typography:** Instead of a generic grid of rectangular cards, the beverage menu uses asymmetric dual-column lists pairing crisp editorial serifs (*Playfair Display*) with technical monospace typography (*Space Mono*) for glass styles, ice formats, and ABV notes.
2. **Midnight Amber & Smoked Brass Aesthetic:** A bespoke dark design system anchored in deep navy (`#0B111E`), smoked amber (`#D97706`), and brushed brass (`#F59E0B`), utilizing full-bleed typographic storytelling cards and subtle border accents rather than generic dark overlay heroes.
3. **"NoDa Night Out" Integrated Neighborhood Flow:** A dedicated neighborhood integration page (`noda-guide.html`) that frames the bar's "no food" rule as a curated hospitality asset, offering arrival timing, nearby dinner pairings, and late-night cocktail recommendations.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Founded by veteran Charlotte mixologist Larry Suggs | `index.html`, `concept.html` | [Hoodline Article](https://hoodline.com/2024/02/east-coast-style-cocktail-den-all-purpose-bar-opens-in-noda-bringing-inclusive-sip-culture/) |
| Located at 3123 N. Davidson St., Suite 104 in NoDa, Charlotte | `visit.html`, `index.html`, `noda-guide.html` | [Charlotte's Got A Lot](https://www.charlottesgotalot.com/things-to-do/nightlife/all-purpose-bar) |
| Operating hours are Wednesday – Sunday, 6:00 PM – Midnight | `visit.html`, `index.html` | [Charlotte's Got A Lot](https://www.charlottesgotalot.com/things-to-do/nightlife/all-purpose-bar) |
| Does not serve food in-house; guest policy encourages dining in NoDa before or after | `noda-guide.html`, `index.html`, `visit.html` | [Charlotte's Got A Lot](https://www.charlottesgotalot.com/things-to-do/nightlife/all-purpose-bar) |
| Offers both spirit-forward craft cocktails and equal-focus non-alcoholic (zero-proof) drinks | `drinks.html`, `zero-proof.html`, `index.html` | [Hoodline Article](https://hoodline.com/2024/02/east-coast-style-cocktail-den-all-purpose-bar-opens-in-noda-bringing-inclusive-sip-culture/) |
| Occupies a 1,700 sq ft space in former Protagonist Beer venue | `concept.html` | [Hoodline Article](https://hoodline.com/2024/02/east-coast-style-cocktail-den-all-purpose-bar-opens-in-noda-bringing-inclusive-sip-culture/) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Digital Menu Concierge:** Interactive taste profile wizard, spirit preference filters, and flavor pair finder.
- **Signature Interactive Experience:** Custom Old Fashioned builder or virtual spirit flight creator.
- **Local Discovery Pack:** Interactive live map of NoDa dining partners with real-time walk-up wait times.
- **Order & Reserve Pack:** Digital waitlist manager and private party table reservations.

### Intentionally Not Implemented (Preserved for Upsell)

- No interactive cocktail recommendation engines or flavor quizzes.
- No submission forms of any kind (no contact, inquiry, reservation, or newsletter forms).
- No custom flight builder or interactive map API integrations.
- No live waitlist or reservation booking widgets.

### Available for Production Scope

- Digital Menu Concierge pack for seasonal spirit recommendation.
- Signature Flight Builder for curated bourbon/tequila tastings.
- Local Discovery SEO & Partner Integration suite.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs all-purpose-bar` executed. `qa-report.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) breakpoints, validated keyboard accessibility, focus rings, zero console errors, and clean DOM hierarchy.
