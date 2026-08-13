# Ann Marie’s Gourmet Burgers & Fries — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Ann Marie’s Gourmet Burgers & Fries
- **Slug:** `ann-marie-s-gourmet-burgers-and-fries`
- **Audit Grade / Disposition / Score:** A / YES / 99
- **Audit Batch:** 1
- **Verification Date:** August 11, 2026

## Verification Sources

- [Charlotte's Got A Lot — Ann Marie's Gourmet Burgers Guide](https://www.charlottesgotalot.com/eat-drink/burgers/ann-maries-gourmet-burgers)
- [Uber Eats — Ann Marie's Gourmet Burgers Charlotte](https://www.ubereats.com)
- [Facebook Business Page — Ann Marie's Gourmet Burgers](https://www.facebook.com)

## Original Audit Weakness

Ann Marie’s Gourmet Burgers & Fries operates in Callabridge Plaza (9820 Callabridge Court) in Northwest Charlotte without a dedicated owned website or brand platform. Relied entirely on delivery app aggregators (Uber Eats, DoorDash), providing no digital venue to communicate its high-heat smashburger techniques, custom fry seasoning options, or direct call-ahead phone ordering at (704) 393-0105.

## Creative Brief

### Verified Visual / Content Anchors

1. **High-Heat Smashburger Technique:** 100% USDA ground beef smashed paper-thin on a 500°F flat-top griddle for lacy, caramelized crispy edges, melted cheese, and juicy centers.
2. **Loaded Hand-Cut Seasoned Fries:** Fresh Russet potatoes double-fried to golden perfection, tossed in house Cajun or garlic parmesan spices, and smothered in bacon and warm cheese.
3. **Callabridge Court Local Institution:** Beloved Northwest Charlotte (Coulwood area) smashburger joint open daily from 11:00 AM to 9:00 PM.

### Core Design Moves

1. **Retro Gourmet Diner Typography & Grill Badges:** Bold display serifs (*Fraunces*) paired with retro high-contrast diner sans-serifs (*Outfit*) and golden grill badges (e.g., `"SMASHED TO ORDER • 100% USDA BEEF"`).
2. **Charcoal & Searing Ember Palette:** High-contrast palette anchored in deep griddle charcoal (`#16161A`), searing ember red (`#E05638`), and toasted brioche gold (`#F4A261`) with warm cream background (`#FAF8F5`).
3. **"Smashburger Customizer & Fry Matrix":** A specialized menu layout (`menu.html` & `loaded-fries.html`) that pairs signature smashburgers directly with house dipping sauces and custom fry seasonings.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 9820 Callabridge Court, Charlotte, NC 28216 | `visit.html`, `index.html`, `concept.html` | [Charlotte's Got A Lot](https://www.charlottesgotalot.com/eat-drink/burgers/ann-maries-gourmet-burgers) |
| Open daily from 11:00 AM to 9:00 PM | `visit.html`, `index.html` | [Uber Eats Listing](https://www.ubereats.com) |
| Phone number for call-ahead ordering is (704) 393-0105 | `visit.html`, `index.html` | [Charlotte's Got A Lot](https://www.charlottesgotalot.com/eat-drink/burgers/ann-maries-gourmet-burgers) |
| Specializes in double smashburgers with lacy edges, toasted brioche buns, and loaded fries | `menu.html`, `smashburger-craft.html` | [Charlotte's Got A Lot](https://www.charlottesgotalot.com/eat-drink/burgers/ann-maries-gourmet-burgers) |
| Features house-made dipping sauces, Cajun fries, and craft milkshakes | `menu.html`, `loaded-fries.html` | [Uber Eats Listing](https://www.ubereats.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Interactive Order Builder:** Custom smashburger patty & sauce builder.
- **Order & Reserve Pack:** Direct online ordering engine with real-time pickup status tracker.
- **Guest Engagement Pack:** SMS Smash Club alerts for weekly secret menu drops.
- **Local Discovery Pack:** SEO landing pages targeting Coulwood and Mountain Island Lake burger lovers.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or payment processing engine.
- No submission forms of any kind (no contact, catering inquiry, or newsletter forms).
- No automated SMS or email loyalty subscription tools.
- No interactive burger customizer wizard.

### Available for Production Scope

- Custom zero-commission online ordering integration.
- SMS Secret Burger Club loyalty module.
- Corporate Lunch Catering & Group Express Order portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs ann-marie-s-gourmet-burgers-and-fries` executed. `qa-report.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
