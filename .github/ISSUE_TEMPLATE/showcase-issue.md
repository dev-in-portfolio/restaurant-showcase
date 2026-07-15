name: Showcase Issue
description: Report an issue with a showcase restaurant
labels: ["showcase"]
body:
  - type: input
    id: restaurant
    attributes:
      label: Restaurant Slug
      placeholder: e.g. boudreauxs
    validations:
      required: true
  - type: textarea
    id: problem
    attributes:
      label: What is the issue?
      placeholder: Describe the problem with the showcase entry
    validations:
      required: true
