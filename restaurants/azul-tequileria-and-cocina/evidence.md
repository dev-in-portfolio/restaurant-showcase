# Azul Tequileria & Cocina — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Azul Tequileria & Cocina
- **Slug:** `azul-tequileria-and-cocina`
- **Audit Grade / Disposition / Score:** A / YES / 99
- **Audit Batch:** 2
- **Verification Date:** August 11, 2026

## Verification Sources

- [ToastTab — Azul Tequileria & Cocina Ballantyne](https://www.toasttab.com/azul-tequileria-cocina/v3)
- [DoorDash — Azul Tequileria & Cocina Listing](https://www.doordash.com)
- [Ballantyne Village Directory — Azul Tequileria](https://azulballantyne.com)

## Original Audit Weakness

Azul Tequileria & Cocina relies on third-party online ordering portals (`toasttab.com`) and a basic landing page (`azulballantyne.com`). Located in Ballantyne Village (14825 Ballantyne Village Way Suite 155), it lacks an owned digital showcase highlighting its 100% blue agave tequila cellar, wood-fired Mexican dishes, Birria Tacos, and vibrant outdoor patio ambiance.

## Creative Brief

### Verified Visual / Content Anchors

1. **Ballantyne Village Landmark:** Suite 155 at 14825 Ballantyne Village Way in South Charlotte.
2. **100% Blue Agave Tequila & Margaritas:** Artisanal Blanco, Reposado, Añejo, and Extra Añejo tequila flights paired with fresh lime margaritas.
3. **Birria Tacos & Mexican Seafood:** Rich slow-braised beef Birria Tacos with consommé dip, Cocktail Mexicano, and Camarones Empanizados.

### Core Design Moves

1. **Agave Cobalt Editorial & Serif Display:** High-impact serif headers (*Playfair Display*) paired with clean tech-mono agave labels (*Space Mono*) and gold foil seals.
2. **Midnight Cobalt & Electric Teal Palette:** Deep midnight blue (`#0B1320`), rich agave cobalt (`#0F4C81`), electric teal (`#00A896`), and terracotta warm sand (`#FAF6F0`).
3. **"The Agave Flight & Cocina Matrix":** Asymmetric vertical magazine layout (`tequila-craft.html` & `menu.html`) matching each tequila expression with regional Mexican specialties.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Assorted Table Wine & Shop` — Split 2-column hero, burgundy/champagne palette, card grid.
2. `Astoria Café` — Split hero with right-side image, terracotta/oat palette, 3-card grid.
3. `Azucar Cuban Restaurant` — Split hero with right-side image, coral/palm green palette, banner grid.

### Divergent Choices for Azul Tequileria & Cocina

- **Hero Composition:** Replaced the split 2-column image frame with a **full-bleed dark agave editorial masthead** featuring centered serif typography and gold accent badges.
- **Section Rhythm:** Replaced standard 3-card grids with an asymmetric vertical **"Agave Flight Board"** layout.
- **Typography System:** Switched to high-contrast *Playfair Display* and *Space Mono* tech labels over cobalt backgrounds.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 14825 Ballantyne Village Way, Suite 155, Charlotte, NC 28277 | `visit.html`, `index.html`, `concept.html` | [Ballantyne Village Directory](https://azulballantyne.com) |
| Operating hours are Monday – Sunday, 11:00 AM – 9:00 PM | `visit.html`, `index.html` | [ToastTab Profile](https://www.toasttab.com/azul-tequileria-cocina/v3) |
| Contact phone is (980) 613-8022 | `visit.html`, `concept.html` | [ToastTab Profile](https://www.toasttab.com/azul-tequileria-cocina/v3) |
| Features 100% blue agave tequila flights, handcrafted margaritas, and mezcal | `menu.html`, `tequila-craft.html` | [ToastTab Profile](https://www.toasttab.com/azul-tequileria-cocina/v3) |
| Serves Birria Tacos with consommé, Cocktail Mexicano, and Churros con Cajeta | `menu.html`, `index.html` | [DoorDash Listing](https://www.doordash.com) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **Tequila Flight Customizer & Tasting Experience:** Signature Interactive Experience for tequila pairing.
- **Ballantyne VIP Tequila Club & Event Engine:** Private tequila tasting event booking portal.
- **Multi-Location Growth Module:** Unified portal connecting Ballantyne Village with future expansion sites.
- **Digital Menu Concierge:** Automated dietary and tequila recommendation engine.

### Intentionally Not Implemented (Preserved for Upsell)

- No interactive tequila flight builder or quiz.
- No submission forms of any kind (no contact, event inquiry, or newsletter forms).
- No automated SMS or email marketing tools.
- No custom online checkout or reservation booking engine.

### Available for Production Scope

- Custom zero-commission online ordering integration.
- Tequila Tasting Club membership module.
- Ballantyne table reservation engine.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs azul-tequileria-and-cocina` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
