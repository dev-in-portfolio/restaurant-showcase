# Courtyard Hooligans — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Courtyard Hooligans
- **Slug:** `courtyard-hooligans`
- **Audit Grade / Disposition / Score:** A / YES / 98
- **Audit Batch:** 5
- **Verification Date:** August 12, 2026

## Verification Sources

- [Courtyard Hooligans Official Website](http://www.courtyardhooligansclt.com)
- [Pitch Pubs — Courtyard Hooligans Profile](https://pitchpubs.com)
- [Uptown Charlotte Partnership Profile](https://uptowncharlotte.com)

## Original Audit Weakness

Courtyard Hooligans relies on basic social links (`courtyardhooligansclt.com`). Located at 140 Brevard Court in historic Brevard Court, it lacks an owned digital showcase capturing its legendary international soccer pub atmosphere, early matchday broadcast schedules, craft draft taplist, and historic cobblestone alleyway heritage.

## Creative Brief

### Verified Visual / Content Anchors

1. **Brevard Court Charlotte Location:** 140 Brevard Court, Charlotte NC 28202 (Historic Cobblestone Alley in Uptown Charlotte near Bank of America Stadium & Romare Bearden Park).
2. **Soccer Pub Culture:** Premier League, Champions League, MLS, & World Cup matchday broadcasts; opens early on weekends for European kickoff times.
3. **Craft Taplist & Fare:** 24+ rotating international & Carolina craft draft beers, Guinness, authentic British meat pies with mash & gravy, bratwursts, and warm soft pretzels with beer cheese.

### Core Design Moves

1. **High-Impact Athletic Display Typography:** Bold athletic display (*Unbounded*) paired with clean body sans (*Outfit*) and matchday ticker mono (*Space Mono*).
2. **Stadium Pitch Green & Gold Palette:** High-energy athletic palette anchored in pitch dark emerald (`#0A1D13`), stadium turf green (`#0F2E1E`), championship gold (`#EAB308`), electric pitch white (`#FFFFFF`), and Brevard slate charcoal (`#111827`).
3. **"The Matchday Pitch & International Draft Taplist Matrix":** Matrix-style dual column layout (`matchday-soccer-craft.html` & `menu.html`) showcasing live matchday kickoff schedules alongside rotating craft draft beers and savory pub pies.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Costa del Sol` — Honduran coastal kitchen with Lora display fonts and Honduran Terracotta/Teal.
2. `Coquette` — Parisian haute couture brasserie with Playfair Display fonts and Parisian Burgundy.
3. `Copperhead Social Club` — Industrial smash burger pub with Space Grotesk/Outfit fonts and Burnished Copper.

### Divergent Choices for Courtyard Hooligans

- **Hero Composition:** British Soccer Pitch & Historic Brevard Court Pub Vault split-hero layout: left side features an embroidered crest badge & pitch stamp (`"HISTORIC BREVARD COURT • INTERNATIONAL SOCCER PUB UPTOWN"`), bold athletic display (*Unbounded*), stadium pitch green & gold palette, and right side features a sunlit framed hero image of soccer scarves, live match broadcast screens, Guinness pints, and hot British meat pies.
- **Section Rhythm:** Replaced standard card grids with **Hooligans Vault Cards** (`hooligans-vault-card`) and **Matchday Fan Highlights**.
- **HTML Vocabulary:** Completely unique class names (`hooligans-header`, `pub-brand`, `pitch-hero-stage`, `crest-stamp-badge`, `hooligans-vault-card`, `hooligans-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 140 Brevard Court in Uptown Charlotte NC | `visit.html`, `index.html`, `concept.html` | [Courtyard Hooligans Direct](http://www.courtyardhooligansclt.com) |
| Operating hours: Mon-Thu 2pm-12am, Fri 2pm-2am, Sat-Sun 11am-2am | `visit.html`, `index.html` | [Courtyard Hooligans Direct](http://www.courtyardhooligansclt.com) |
| Phone number: (704) 376-2238 | `visit.html`, `index.html` | [Courtyard Hooligans Direct](http://www.courtyardhooligansclt.com) |
| Opens early for weekend European Premier League matchdays | `index.html`, `matchday-soccer-craft.html` | [Pitch Pubs Profile](https://pitchpubs.com) |
| 24+ rotating international & Carolina craft draft taps & Guinness | `menu.html`, `craft-beer-craft.html` | [Courtyard Hooligans Direct](http://www.courtyardhooligansclt.com) |
| Authentic British savory meat pies, bratwursts, & soft pretzels | `menu.html`, `concept.html` | [Uptown Charlotte Profile](https://uptowncharlotte.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Hooligans Matchday Kickoff & Fan Table Reservation Portal:** Matchday table & supporter club priority seat reservation engine.
- **Corporate Supporter Event & Alleyway Buyout Engine:** Event reservation portal for Charlotte FC watch parties & corporate sports gatherings.
- **Supporter Club Early Kickoff SMS Alert Engine:** Text alert notifications for early morning Premier League doors-open times & tap drops.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live match score API tracker.

### Available for Production Scope

- Custom zero-commission matchday ordering portal.
- Interactive live draft taplist & TV schedule manager.
- Brevard Court supporter club party booking system.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs courtyard-hooligans` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
