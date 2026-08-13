# Everybody Eatz — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Everybody Eatz
- **Slug:** `everybody-eatz`
- **Audit Grade / Disposition / Score:** A / YES / 99
- **Audit Batch:** 7
- **Verification Date:** August 12, 2026

## Verification Sources

- [Everybody Eatz Official Facebook Page](https://facebook.com/EveryBodYeBeEaTs)
- [DoorDash — Everybody Eatz Charlotte Profile](https://doordash.com)
- [Order Online — Everybody Eatz Menu Directives](https://order.online)

## Original Audit Weakness

Everybody Eatz relies on basic Facebook updates and delivery platform links. Located at 3720 N Tryon St in Charlotte, it lacks an owned digital showcase capturing its loaded garlic butter seafood platters, slow-braised soul food craft, North Tryon carryout kitchen vibe, and online catering order directives.

## Creative Brief

### Verified Visual / Content Anchors

1. **North Tryon Location:** 3720 N Tryon St, Suite 107, Charlotte NC 28206 (NoDa / North Tryon Corridor in Charlotte).
2. **Garlic Butter Seafood Platters:** Loaded garlic butter lobster tails, cornmeal-crusted fried catfish fillets, garlic butter shrimp, & fried crab cluster baskets.
3. **Southern Braised Soul Food:** Slow-cooked braised oxtails, southern fried chicken, baked five-cheese mac and cheese, smoked turkey collard greens, & sweet yam cornbread.

### Core Design Moves

1. **Heavy High-Impact Display Sans Typography:** Heavy high-impact display sans (*Outfit* 800) paired with clean body sans (*Inter*) and kitchen pass mono (*Space Mono*).
2. **Cajun Charcoal & Electric Amber Palette:** High-energy soul food & seafood kitchen palette anchored in deep cajun charcoal (`#12100E`), electric cajun amber (`#F59E0B`), spicy cayenne red (`#DC2626`), butter gold (`#FACC15`), and warm linen white (`#FAF9F6`).
3. **"The Garlic Butter Seafood & Braised Soul Food Matrix":** Matrix-style dual column layout (`seafood-soul-craft.html` & `menu.html`) showcasing loaded seafood platters alongside slow-braised southern soul food plates & scratch sides.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Emmy Lou's Wine Bar` — Dilworth Velvet Wine Bar with Cormorant Garamond fonts and Velvet Bordeaux/Champagne Gold.
2. `Elizabeth Creamery` — Warm Sweet Shop with Fraunces fonts and Strawberry Velvet/Waffle Gold.
3. `Distro Beer Hub` — Industrial Craft Beer Hall with Syne fonts and Industrial Charcoal/Hops Amber.

### Divergent Choices for Everybody Eatz

- **Hero Composition:** Bold Southern Soul Food & Loaded Seafood Vault split-hero layout: left side features an electric neon amber stamp badge (`"NODA / NORTH TRYON SOUL FOOD & SEAFOOD • 3720 N TRYON ST"`), heavy high-energy display sans (*Outfit* 800), cajun charcoal & electric amber palette, and right side features a sunlit framed hero image of a loaded garlic butter lobster tail, fried catfish fillets, baked mac & cheese, smoked turkey collards, sweet cornbread, & iced tea.
- **Section Rhythm:** Replaced standard card grids with **Everybody Eatz Vault Cards** (`eatz-vault-card`) and North Tryon kitchen highlights.
- **HTML Vocabulary:** Completely unique class names (`eatz-header`, `soul-brand`, `cajun-hero-stage`, `electric-stamp-badge`, `eatz-vault-card`, `eatz-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 3720 N Tryon St Suite 107 in Charlotte NC | `visit.html`, `index.html`, `concept.html` | [Facebook Page Direct](https://facebook.com/EveryBodYeBeEaTs) |
| Operating hours: Wed-Sun 1:30pm-9:00pm (Mon-Tue closed) | `visit.html`, `index.html` | [DoorDash Profile](https://doordash.com) |
| Phone number: (704) 910-1845 | `visit.html`, `index.html` | [Order Online Profile](https://order.online) |
| Loaded garlic butter lobster tails & fried catfish baskets | `menu.html`, `seafood-soul-craft.html` | [Facebook Page Direct](https://facebook.com/EveryBodYeBeEaTs) |
| Slow-braised oxtails, southern fried chicken, & baked mac | `menu.html`, `soul-food-kitchen-craft.html` | [DoorDash Profile](https://doordash.com) |
| Smoked turkey collard greens, sweet yam cornbread, & catering | `menu.html`, `concept.html` | [Order Online Profile](https://order.online) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Everybody Eatz Direct Mobile Ordering Portal:** Direct carryout & pickup ordering platform bypassing third-party commissions.
- **North Tryon Soul Food Catering & Party Pan Engine:** Bulk catering order engine for corporate events, family reunions, & tailgates.
- **Everybody Eatz Daily Specials Alert Engine:** SMS broadcast notifications when limited batch oxtails & crab clusters are fresh out of the kitchen.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or online payment processing engine.
- No submission forms of any kind (no contact, order, or feedback forms).
- No automated SMS or email marketing tools.
- No live kitchen fryer temperature integration.

### Available for Production Scope

- Custom zero-commission direct mobile soul food ordering app.
- Interactive seafood combo builder with garlic butter heat levels.
- Bulk catering quote engine for Charlotte community gatherings.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs everybody-eatz` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
