# Contributing to the Showcase (Showroom)

This repository contains our production-quality showcase websites. Direct edits or manual modifications of website files in this repository are **strictly discouraged**. 

## Workflow
All website edits must take place in the previous pipeline stages:
1. Make structural changes or test concepts in the **Thunderdome**.
2. Clean up and run reviews in **Staging**.
3. Re-run `npm run promote:showcase -- --restaurant <restaurant-slug> --update` from the showcase repository to import the updated site.

## Pull Requests
* Showcase PRs are only for promoting new, fully verified websites.
* When submitting a PR, ensure the restaurant metadata file (`restaurant.json`) is complete and all checks are marked `true`.
* The automated validation check will run on the PR and must pass before merging.
