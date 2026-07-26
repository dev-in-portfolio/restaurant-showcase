# Showcase Approval Process

Moving a project from staging to the showcase requires formal review.

## Review Steps
1. The developer finishes all items on the `QUALITY_CHECKLIST.md` in staging.
2. The staging validation check passes.
3. The developer runs the showcase promotion command:
   ```bash
   npm run promote:showcase -- --restaurant <restaurant-slug>
   ```
4. The promotion command automatically inspects the candidate project's metadata (`restaurant.json`) and sweeps files to ensure showcase readiness.
5. If the checklist passes, the project is imported, and the registry index (`data/restaurants.json`) is updated.
