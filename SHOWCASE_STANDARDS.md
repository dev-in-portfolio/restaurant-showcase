# Showcase Standards

The Polished Showcase is the final stage in the restaurant website pipeline. Restaurants promoted here must meet the highest quality bar.

## Mandatory Requirements

### Metadata Requirements
- `restaurant.json` must exist and be valid JSON
- `status` must be `"approved"`
- All boolean review flags must be `true`:
  - `desktopReviewed`
  - `tabletReviewed`
  - `mobileReviewed`
  - `linksVerified`
  - `contentVerified`
  - `performanceReviewed`
  - `accessibilityReviewed`
  - `productionBuildPassed`
  - `approvedForPresentation`
- Either `comparisonButtonAdded` or `comparisonButtonNotApplicable` must be `true`

### Content Requirements
- No placeholder text (Lorem Ipsum, TODO, FIXME, etc.)
- No broken local references (images, scripts, stylesheets)
- No temporary or development-only files
- `index.html` must exist

### Showroom Index
- Every promoted restaurant must have an entry in `data/restaurants.json`
- No duplicate IDs or slugs
- Entries must be sorted deterministically

## What Is Excluded
- Competing concepts or rejected versions
- Research dumps and temporary screenshots
- Generator output and placeholder copy
- Incomplete review metadata
- Broken local assets
- Development-only controls
- Abandoned or unrelated files
