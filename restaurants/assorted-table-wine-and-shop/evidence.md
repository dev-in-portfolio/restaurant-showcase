# Assorted Table Wine & Shop — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Assorted Table Wine & Shop
- **Slug:** `assorted-table-wine-and-shop`
- **Audit Grade / Disposition / Score:** A / YES / 95
- **Audit Batch:** 2
- **Verification Date:** August 11, 2026

## Verification Sources

- [Assorted Table Wine Official Website](http://www.assortedtablewine.com)
- [The Market at 7th Street Merchant Listing](https://themarketat7thstreet.com)
- [Uptown Charlotte Merchant Directory](https://uptowncharlotte.com)

## Original Audit Weakness

Assorted Table Wine & Shop relies on a basic WordPress template (`assortedtablewine.com` / `atws.wine`) with static text lists and external social media embeds. Located inside The Market at 7th Street (224 E 7th St), it lacks an owned digital platform to showcase its Tuesday Night Wine Flights, Orrman's Cheese pairing policy, artisanal sake and vermouth portfolio, or 2-hour garage parking validation.

## Creative Brief

### Verified Visual / Content Anchors

1. **The Market at 7th Street Enoteca:** Anchored inside Charlotte's premier urban food hall (224 E 7th St) with direct LYNX Light Rail access and 2-hour parking validation.
2. **Sommelier Josh Villapando's International Cellar:** Curated boutique wines, artisanal Japanese sake, small-batch vermouth, and rare digestive bitters.
3. **Tuesday Night Flights & Market Food Pairings:** Renowned weekly wine flight tastings (Tue 5–7 PM) and BYO food pairing privileges with neighboring vendors (Orrman's Cheese Shop).

### Core Design Moves

1. **Sommelier Editorial & Corkscrew Typography:** Elegant vintage serif headlines (*Fraunces*) paired with crisp modern sans-serifs (*Plus Jakarta Sans*) and gold foil bottle tags (e.g., `"224 E 7TH ST • THE MARKET AT 7TH STREET"`).
2. **Burgundy & Vintage Champagne Palette:** Rich Sommelier Burgundy red (`#721B29`), warm oak barrel amber (`#C68B45`), deep slate charcoal (`#1C1A17`), and champagne cream (`#FDFBF7`) with olive leaf accents (`#4A5D4E`).
3. **"The Flight Board & Cheese Pairing Matrix":** A specialized dual-column menu layout (`menu.html` & `market-pairings.html`) matching specific wine glass flights with artisanal cheeses from Orrman's and market bites.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located inside The Market at 7th Street (224 E 7th St, Charlotte, NC 28202) | `visit.html`, `index.html`, `concept.html` | [Market at 7th St Official](https://themarketat7thstreet.com) |
| Operating hours: Mon-Tue 11-7, Wed-Thu 11-8, Fri-Sat 11-9, Sun 11-6 | `visit.html`, `index.html` | [Assorted Table Official](http://www.assortedtablewine.com) |
| Phone number is (704) 277-3234 | `visit.html`, `index.html` | [Assorted Table Official](http://www.assortedtablewine.com) |
| Hosts Tuesday Night Wine Flights from 5:00 PM to 7:00 PM | `wine-flights.html`, `index.html` | [Market at 7th St Official](https://themarketat7thstreet.com) |
| Offers 2-hour free parking validation in the 7th Street Station Garage | `visit.html`, `index.html` | [Assorted Table Official](http://www.assortedtablewine.com) |
| Allows guests to pair wines with food from Orrman's Cheese Shop and Market vendors | `market-pairings.html`, `menu.html` | [Market at 7th St Official](https://themarketat7thstreet.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Wine Flight & Event Ticket Engine:** Direct RSVP and pre-payment engine for Tuesday Night Flights and masterclasses.
- **Curated Monthly Wine Club Portal:** E-commerce subscription engine for quarterly sommelier bottle drops.
- **Private Enoteca Event Reservation Engine:** Booking portal for corporate wine tastings and private market receptions.
- **VIP Sommelier SMS Alerts:** Instant SMS notifications for rare allocation releases and sake arrivals.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or bottle ordering engine.
- No submission forms of any kind (no contact, event inquiry, or newsletter forms).
- No automated SMS or email marketing tools.
- No interactive wine matching quiz.

### Available for Production Scope

- Custom zero-commission wine club subscription integration.
- Tuesday Flight RSVP & e-ticket module.
- VIP Sommelier Allocation SMS alert system.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs assorted-table-wine-and-shop` executed. `qa-report.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
