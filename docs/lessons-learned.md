# Lessons Learned

A living reference of reusable lessons extracted from feature retrospectives, completion notes, and process reviews. Consult this document during Research & Planning and Testing phases.

## How to Use

- **Research & Planning:** Scan relevant categories before finalizing the implementation approach
- **Testing:** Check for known pitfalls related to the feature's technology stack
- **Retrospectives:** Add new entries when a milestone review or completion note surfaces a reusable lesson

## Liquid

- Verify filter availability during Research — Jekyll's Liquid is missing `pluralize` and other common filters. List all filters the feature will use and confirm each exists. (Source: spec 004)
- Add inline comments when Liquid logic exceeds simple iteration — nested loops, sort keys, and scoring algorithms need thorough documentation for maintainability. (Source: spec 010)
- Pure Liquid vs. plugin tradeoff — Liquid solutions keep the build simple and GitHub Pages-compatible, but complexity grows fast. Consider a Jekyll plugin when Liquid logic requires nested loops over all posts. (Source: Content Organization retro)

## Build & CI

- Use leading slash in `.gitignore` for root-only matching — `vendor/` matches nested directories, `/vendor/` matches root only. Always use the leading slash for vendor directories. (Source: spec 001)
- Measure `jekyll build` time before and after for Liquid-heavy features — establishes a performance baseline and detects when O(N²) algorithms stop being negligible at scale. (Source: Content Organization retro)
- Verify CI build passes on the feature branch before merging — "works locally, breaks CI" is a recurring risk due to path differences, platform gems, and gitignore behavior. (Source: Foundation retro)

## Sass / CSS

- Underscore handling in Sass paths — directory names vs. filenames can trip up imports. Double-check partial import paths when adding new SCSS files. (Source: specs 001, 002)
- Two-layer variable model is validated — SCSS variables for Bootstrap overrides (Layer 1), CSS custom properties for project components (Layer 2). Maintain this pattern consistently. (Source: Foundation retro)
- Selective Bootstrap imports scale well — only uncomment modules as needed per feature. Don't import the full Bootstrap bundle. (Source: Foundation retro)
- Self-review before committing catches CSS cascade issues — media query specificity can override modifier states (e.g., `@media (hover: hover)` opacity overriding `--copied` modifier). Check that state modifiers are included in media query reveal selectors. (Source: spec 011)
- Keep generated theme CSS close to original output — customize only what's necessary (e.g., override background color) to make future regeneration via `rougify` easy. (Source: spec 011)

## Accessibility

- Bake accessibility into foundational layers — setting accessible defaults at the variable level (focus rings, contrast ratios, link underlines) means downstream features inherit them automatically. More effective than auditing after the fact. (Source: Foundation retro, Content Organization retro)
- Zero-issue audits are achievable — when foundational accessibility is strong, new features built on the same design tokens pass A11y audits cleanly. (Source: spec 010)
- Prefer visible text over `aria-label` for buttons — `aria-label` overrides visible text for screen readers, creating WCAG 2.5.3 (Label in Name) mismatches when the visible text changes dynamically. Use visible text as the accessible name and let aria-live regions handle state announcements. (Source: spec 011)

## Testing

- Cross-feature integration testing for grouped features — when features in the same natural grouping interact (e.g., tags feeding related posts), add a brief integration check to the final feature's Testing phase. (Source: Content Organization retro)
- Check `.gitignore` patterns against nested paths — any time a vendor directory is added, verify patterns use leading slashes. (Source: Foundation retro)

## Spec Workflow

- Calibrate spec tier to scope — features with no research, no architectural decisions, and fewer than 5 files should use the mini-spec tier. Reserve full specs for features with real unknowns. (Source: Foundation retro, re: spec 006)
- Decision documentation prevents mid-implementation churn — settling decisions during Research means implementation proceeds without scope changes. (Source: Content Organization retro)
- Completion notes feed milestone reviews — structured retros (Delivered, Deviations, What Went Well, What Didn't, Lessons) make cross-feature pattern recognition much easier. (Source: process review)
