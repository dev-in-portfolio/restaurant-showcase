# Polished Showcase (Showroom)

Welcome to the **Polished Showcase** (or **Showroom**) repository. 

This repository functions as the professional sales showroom. It contains only completed, verified, stable, highly polished, and presentation-ready restaurant website demonstrations.

Repository URL: `https://github.com/dev-in-portfolio/restaurant-showcase`

## Pipeline Context
Our restaurant website production workflow consists of three distinct stages:
1. **Thunderdome** (`dev-in-portfolio/restaurants`) — Prospect research, concept testing, active experimentation.
2. **Ready for Polish (Staging)** (`dev-in-portfolio/restaurant-staging`) — Controlled staging, QA, and validation.
3. **Polished Showcase (Showroom)** (`dev-in-portfolio/restaurant-showcase`) — *[You are here]* Presentation-ready completed showcase.

---

## Directory Structure

* `/restaurants/` — Presentation-ready restaurant projects currently in the showroom. Each folder is a static site containing its pages and a `restaurant.json` metadata file.
* `/data/` — Contains `restaurants.json`, the registry index of all approved showcase projects.
* `/scripts/` — Showcase management and validation tools:
  * `import-approved-restaurant.js` — Promotion tool to import approved sites from staging.
  * `validate-showcase.js` — Validation script to run strict showcase audits.
  * `shared/comparison-button.js` — Reusable component for the floating current-site comparison feature.
* `/templates/` — Metadata examples.
* `/docs/` — Showroom definitions, presentation rules, and approval guidelines.

---

## Showcase Standards

A restaurant website is only promoted to the showroom when it has:
* A fully selected and approved design.
* Verified public restaurant information (no placeholder content).
* Consistent branding and typography, optimized media, and functional calls to action.
* Responsive layouts matching mobile and desktop standards (no overlaps, zero console errors).
* A working floating current-site comparison button.
* Approved status indicators on all checks in `restaurant.json`.

## Showcase Usage

### Importing an Approved Restaurant
To import a verified restaurant from staging, run:
```bash
npm run promote:showcase -- --restaurant <restaurant-slug>
```
Options:
* `--restaurant <slug>` (Required) The slug folder name of the restaurant.
* `--update` (Optional) Allow updating/overwriting an existing showcase restaurant directory.
* `--source <path>` (Optional) Explicit path to the local staging repo (defaults to `../restaurant-staging`).

### Running Showcase Audits
To run validation audits on a showcase restaurant's files:
```bash
npm run validate -- --restaurant <restaurant-slug>
```
