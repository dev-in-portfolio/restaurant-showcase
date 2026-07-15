# Restaurant Website Showcase (Polished Showroom)

Welcome to the **Polished Showcase** (or **Showroom**) repository.

This repository contains only completed, verified, stable, polished, presentation-ready restaurant website demonstrations.

Repository URL: `https://github.com/dev-in-portfolio/restaurant-showcase`

## Pipeline Context
1. **Thunderdome** (`dev-in-portfolio/restaurants`) — Prospect research, concept testing, active experimentation.
2. **Ready for Polish (Staging)** (`dev-in-portfolio/restaurant-staging`) — Controlled staging, QA, and validation.
3. **Polished Showcase (Showroom)** (`dev-in-portfolio/restaurant-showcase`) — *[You are here]* Presentation-ready completed showcase.

For full pipeline documentation, see the [Restaurant Pipeline Document](https://github.com/dev-in-portfolio/restaurants/blob/main/docs/RESTAURANT_PIPELINE.md).

## Directory Structure

* `/restaurants/` — Approved, polished restaurant showcase projects. Each folder contains static site files and a `restaurant.json` metadata file.
* `/scripts/` — Automation and validation scripts for showcase promotion.
* `/data/restaurants.json` — Showroom index of all approved restaurants.
* `/templates/` — Metadata templates.
* `/docs/` — Showcase rules and definitions.

## Getting Started

```bash
npm install
```

### Promoting a Site from Staging
```bash
npm run promote:showcase -- --restaurant <restaurant-slug>
```

Options:
* `--restaurant <slug>` (Required) The slug folder name of the restaurant in staging.
* `--source <path>` (Optional) Path to the staging repo (defaults to `../restaurant-staging`).
* `--update` (Optional) Allow overwriting an existing showcase restaurant directory.
* `--dry-run` (Optional) Validate the source and print changes without writing files.
* `--help` Show this help message.

### Validating Showcase Restaurants
```bash
npm run validate -- --restaurant <restaurant-slug>
npm run validate:all
```

## Showcase Standards

A restaurant must meet all of the following before it can be promoted to showcase:
* `status` is `approved` in `restaurant.json`
* All review flags are `true`
* Either `comparisonButtonAdded` or `comparisonButtonNotApplicable` is `true`
* `productionBuildPassed` is `true`
* `approvedForPresentation` is `true`
* No placeholder content
* No broken local references
* No temporary files
* Passes showcase validation
