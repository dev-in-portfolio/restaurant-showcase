# Aria Tuscan Grill — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Aria Tuscan Grill
- **Slug:** `aria-tuscan-grill`
- **Audit Grade / Disposition / Score:** A / YES / 96
- **Audit Batch:** 1
- **Verification Date:** August 11, 2026

## Verification Sources

- [Aria Tuscan Grill Official Website](https://ariacharlotte.com)
- [Uptown Charlotte Dining Directory — Aria Tuscan Grill](https://uptowncharlotte.com)
- [Grubhub — Aria Tuscan Grill Menu](https://www.grubhub.com)

## Original Audit Weakness

Aria Tuscan Grill relies on a legacy template website with rigid PDF menu links and embedded third-party booking widgets. Situated at 100 N Tryon Street inside Founders Hall, it lacks an owned digital showcase that highlights its Blumenthal pre-theater express dining options, corporate weekday lunch schedule, complimentary weekend valet service, or wood-fired Tuscan pizza and pasta craft.

## Creative Brief

### Verified Visual / Content Anchors

1. **Uptown Charlotte Landmark:** Premier Tuscan dining venue anchored at 100 N Tryon St inside Founders Hall, directly adjacent to Blumenthal Performing Arts Center.
2. **Wood-Fired & Re-Imagined Tuscan Comfort:** House-made caramelized gnocchi, pappardelle with duck bolognese, wood-fired artisan pizzas, and prime grilled NY strip.
3. **Pre-Theater & Valet Service:** Dedicated pre-theater dining flow with complimentary weekend valet on College St and Bank of America Corporate Center garage validation.

### Core Design Moves

1. **Contemporary Tuscan Grandeur Typography:** Classic Florentine serifs (*Fraunces*) paired with sleek urban sans-serifs (*Plus Jakarta Sans*) and gold metallic badges (e.g., `"100 N TRYON ST • UPTOWN TUSCAN GRILL"`).
2. **Tuscan Terracotta & Charcoal Gold Palette:** Rich Tuscan Sienna red (`#9E2A2B`), warm burnt terracotta (`#D00000`), deep charcoal slate (`#1B1B1E`), and champagne gold accents (`#E9C46A`) on warm cream (`#FDFBF7`).
3. **"Pre-Theater Express Timeline & Sommelier Matrix":** A specialized dual-column layout (`menu.html` & `theater-express.html`) guiding theatergoers with guaranteed 45-minute multi-course service options paired with Italian DOCG wines.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 100 N Tryon Street, Charlotte, NC 28202 in Founders Hall | `visit.html`, `index.html`, `concept.html` | [Aria Official Site](https://ariacharlotte.com) |
| Lunch hours are Tuesday – Thursday, 11:30 AM – 1:30 PM | `visit.html`, `theater-express.html` | [Aria Official Site](https://ariacharlotte.com) |
| Dinner hours are Tuesday – Saturday, 5:00 PM – 10:00 PM; Closed Sun–Mon | `visit.html`, `index.html` | [Aria Official Site](https://ariacharlotte.com) |
| Phone number is (704) 376-8880 | `visit.html`, `index.html` | [Aria Official Site](https://ariacharlotte.com) |
| Features caramelized gnocchi, duck bolognese pappardelle, artisan pizza, and prime steaks | `menu.html`, `tuscan-craft.html` | [Aria Official Site](https://ariacharlotte.com) |
| Offers complimentary weekend valet on College St and Bank of America garage validation | `visit.html`, `theater-express.html` | [Aria Official Site](https://ariacharlotte.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Pre-Theater Direct Reservation Engine:** Guaranteed curtain-call timing reservation system with automatic showtime integration.
- **Corporate Express Lunch Portal:** Pre-order lunch engine for Bank of America and Uptown corporate teams.
- **Private Event & Enoteca Takeover:** Interactive private dining room planner for Founders Hall events.
- **Guest Engagement Pack:** Blumenthal Pre-Show VIP Dining SMS pass and Tuscan wine club drops.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or reservation booking engine.
- No submission forms of any kind (no contact, private event inquiry, or newsletter forms).
- No automated SMS or email marketing tools.
- No interactive pre-theater timing calculator.

### Available for Production Scope

- Custom zero-commission online reservation & pre-show ordering integration.
- Corporate Lunch Express pre-ordering portal.
- VIP Theater Dining & Wine Tasting alert system.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs aria-tuscan-grill` executed. `qa-report.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
