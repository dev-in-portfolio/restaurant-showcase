# Bar à Vins — Concept Evidence & Brief

## Prospect Summary

- **Canonical Restaurant:** Bar à Vins
- **Slug:** `bar-a-vins`
- **Audit Grade / Disposition / Score:** A / YES / 86
- **Audit Batch:** 2
- **Verification Date:** August 11, 2026

## Verification Sources

- [In5 District Directory — Bar à Vins NoDa](https://no-da.in5.fyi/directory/bar-a-vins)
- [Raisin Digital — Bar à Vins Charlotte](https://raisin.digital)
- [Unpretentious Palate — Bar à Vins Feature](https://unpretentiouspalate.com)

## Original Audit Weakness

Bar à Vins relies on basic social media links and third-party neighborhood directories (`in5.fyi`, `raisin.digital`). Located at 3206 N Davidson St in NoDa Charlotte NC, it lacks an owned digital showcase capturing its NoDa N Davidson St storefront, curated natural wine list, conservas tinned fish pairing, caviar service, and bottle shop corkage rules.

## Creative Brief

### Verified Visual / Content Anchors

1. **NoDa N Davidson St Wine Bar:** Located at 3206 N Davidson St in Charlotte's arts district NoDa.
2. **Low-Intervention Natural Wines:** Biodynamic skin-contact orange wines, chilled pet-nats, organic red cuvées by glass or bottle with flat corkage fee.
3. **French Cellar Bites & Conservas:** Spanish tinned fish (conservas), caviar service with potato chips and crème fraîche, artisanal cheese & charcuterie boards, and castelvetrano olives.

### Core Design Moves

1. **Parisian Minimalist Cellar Typography:** Classical French serif display (*Cormorant Garamond*) paired with delicate italic accents (*Playfair Display*) and clean modern sans (*Plus Jakarta Sans*).
2. **Bordeaux & Raw Linen Palette:** Elegant French cellar palette anchored in deep bordeaux wine (`#4A121A`), burgundy noir (`#1F080C`), raw linen cream (`#F9F6F0`), antique brass (`#D4AF37`), and muted rose velvet (`#8C3B4A`).
3. **"The Natural Wine Cellar & Conservas Board":** Asymmetric grid layout (`conservas-craft.html` & `menu.html`) pairing biodynamic wines with artisanal tinned fish and caviar.

## Cross-Demo Diversity

### Inspected Recent Demos

1. `Babaloo Coffee Club` — Havana-Miami split hero with warm cream cards and terracotta micro-badges.
2. `Backyard Brew` — Botanical Garden Glasshouse Editorial centered hero with sage green and oat linen.
3. `DeepCuts HiFi` — Audiophile vinyl black journal layout with Syne/Space Mono fonts.

### Divergent Choices for Bar à Vins

- **Hero Composition:** Parisian Minimalist Cellar Salon with an off-center asymmetrical layout: left side features a tall vertical wine vintage stamp badge (`"CUVÉE NODA • 3206 N DAVIDSON ST"`), refined French editorial typography (*Cormorant Garamond*), deep burgundy & raw linen palette, and an arched framed photograph of the NoDa wine bar.
- **Section Rhythm:** Replaced standard card grids with **Cellar Unit Cards** (`cellar-unit`) and **Conservas Pairing Highlights**.
- **HTML Vocabulary:** Completely unique class names (`vins-header`, `bordeaux-brand`, `parisian-hero`, `bordeaux-badge`, `cellar-unit`, `vins-footer`) ensuring 100% design diversity compliance.

## Claim Ledger

| Claim | Page(s) | Supporting Source URL |
| --- | --- | --- |
| Located at 3206 N Davidson St, Charlotte, NC 28205 in NoDa | `visit.html`, `index.html`, `concept.html` | [In5 Directory](https://no-da.in5.fyi/directory/bar-a-vins) |
| Operating hours: Tue-Thu 4-10 PM, Fri-Sat 1-10 PM, Sun 1-8 PM (Closed Mon) | `visit.html`, `index.html` | [Raisin Digital](https://raisin.digital) |
| Contact phone is 980-498-7935 | `visit.html`, `concept.html` | [In5 Directory](https://no-da.in5.fyi/directory/bar-a-vins) |
| Features natural wines by glass/bottle with flat corkage fee for on-site drinking | `menu.html`, `wine-cellar-craft.html` | [Unpretentious Palate](https://unpretentiouspalate.com) |
| Serves Spanish conservas tinned fish, caviar with chips & crème fraîche, charcuterie, and olives | `menu.html`, `conservas-craft.html` | [In5 Directory](https://no-da.in5.fyi/directory/bar-a-vins) |

## Add-On Preservation

### Relevant DSC Add-On Opportunities

- **NoDa Natural Wine Club & Monthly Cuvée Box:** E-commerce bottle membership module.
- **Private Tasting Room & Sommelier Event Engine:** Private event space booking calculator.
- **Digital Bottle Shop Corkage & Cellar Inventory Concierge:** Real-time wine list filter.
- **Natural Wine SMS Vintage Release Alerts:** SMS notification engine for rare allocations.

### Intentionally Not Implemented (Preserved for Upsell)

- No native digital checkout or bottle ordering engine.
- No submission forms of any kind (no contact, event inquiry, or newsletter forms).
- No automated SMS or email marketing tools.
- No live wine bottle inventory tracking.

### Available for Production Scope

- Custom zero-commission bottle shop e-commerce store.
- Private sommelier tasting reservation system.
- Natural wine subscription membership portal.

## QA

- **Machine Validator:** `node scripts/validate-demo.mjs bar-a-vins` executed. `qa-report.json` and `design-diversity.json` generated and verified passing.
- **Browser Verification:** Tested responsive layouts at desktop (1440px) and mobile (375px) viewports, validated keyboard focus rings, zero console errors, no horizontal overflow, and clean DOM structure.
