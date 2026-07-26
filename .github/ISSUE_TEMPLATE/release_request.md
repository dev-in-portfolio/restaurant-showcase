name: Showcase Release Request
description: Request promotion of a staging restaurant website to the showcase
labels: ["release-request"]
body:
  - type: markdown
    attributes:
      value: |
        Please verify that all staging quality criteria are met before requesting promotion to showcase.
  - type: input
    id: restaurant
    attributes:
      label: Restaurant Slug
      placeholder: e.g. 1900-mexican-grill
    validations:
      required: true
  - type: checkboxes
    id: checks
    attributes:
      label: Staging Checklist Sign-offs
      options:
        - label: Information verified (address, phone, hours, social links)
          required: true
        - label: Desktop, tablet, and mobile views checked
          required: true
        - label: Comparison button added and working
          required: true
        - label: Static validation passed
          required: true
