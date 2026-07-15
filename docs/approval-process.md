# Approval Process

Before a restaurant can be promoted from staging to the showcase, it must satisfy:

1. All review flags in `restaurant.json` are set to `true`
2. The `status` field is set to `"approved"`
3. The project passes showcase validation
4. No placeholder or incomplete content exists
5. All local assets resolve correctly

The promotion script enforces these rules programmatically.
