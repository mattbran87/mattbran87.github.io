# Milestone Retrospective: Foundation

> **Group:** Foundation (001 Bootstrap Integration, 002 Custom Theme, 006 Personalize Site)
> **Completed:** 2026-02-22
> **Review Date:** 2026-02-24

## Summary of Features

| # | Feature | Scope | Duration |
|---|---------|-------|----------|
| 001 | Bootstrap Integration | Vendored Bootstrap 5.3.8 Sass source, selective imports, two-layer variable architecture, accessible defaults | 1 day (all 4 phases) |
| 002 | Custom Theme | 4 layouts, 8 includes, 8 SCSS partials, Bootstrap JS, keyboard nav, full Minima removal | 1 day (all 4 phases) |
| 006 | Personalize Site | Config updates, about page rewrite, social link template changes (4 files) | 1 day (all 4 phases) |

All three features completed on 2026-02-22 in a single working session. The Foundation group establishes: Bootstrap as the CSS framework, project-owned layouts/includes replacing Minima, and real site identity data.

## Cross-Feature Patterns

### Recurring issues

- **Sass path conventions:** Underscore handling tripped up both 001 (directory names vs. filenames) and 002 (partial import paths). The convention is now documented but worth double-checking on each new SCSS partial.
- **CI/build environment differences:** 001 hit a `.gitignore` issue where `vendor/` matched nested directories, breaking the CI build despite working locally. 002 had no CI issues because the pattern was already fixed, but this class of "works locally, breaks CI" problem is a recurring risk.
- **Accessibility as an afterthought vs. built-in:** 001 set accessible defaults at the variable level (focus rings, contrast ratios, link underlines), which meant 002 inherited them automatically. This "bake it into the foundation" approach worked well and should be the default pattern.

### Common decisions

- **Vendor, don't CDN:** Bootstrap Sass is vendored for full control. Bootstrap JS is vendored for the same reason. This adds repo size but removes external dependencies from the build.
- **Two-layer variable model:** SCSS variables for Bootstrap overrides (Layer 1), CSS custom properties for project components (Layer 2). Adopted in 001, used consistently through 002, never caused confusion. This model is validated.
- **Selective imports over full Bootstrap:** Only needed Bootstrap modules are imported, keeping CSS output lean. New features uncomment modules as needed. This approach scales well.

### Repeated blockers

- None. Each feature had unique issues but nothing recurred across all three.

## Workflow Effectiveness

### What worked

- **Single-day feature cycles:** All three specs completed research through acceptance in one day each. For foundation work with clear requirements, the four-phase workflow didn't add unnecessary overhead — each phase was short and focused.
- **SME consultations during Research & Planning:** 001 consulted 5 SMEs (Jekyll, Bootstrap, A11y, CSS/Design, QA). 002 consulted 4. The cross-disciplinary input caught issues early (e.g., accessible defaults, Sass path conventions, Liquid comment requirements).
- **Parallel SME audits during Testing:** Running A11y and QA audits simultaneously in 002 was efficient and caught distinct issue categories without duplication.
- **Spec-driven scope control:** Each spec had clear boundaries. 001 explicitly prohibited layout work (deferred to 002). 002 explicitly prohibited content changes (deferred to 006). This prevented scope creep.
- **Completion notes as mini-retros:** Each spec's completion notes captured deviations, known issues, and lessons learned. These were immediately useful for writing this milestone review.

### What was too heavy

- **006 may not have needed a full spec.** Four files changed, no architectural decisions, no research required, and all inputs were provided by the user. A mini-spec or even a minor change with changelog entry might have been sufficient. However, having the spec did document the social link template changes cleanly.

### What was missing

- **No explicit deploy verification step in the workflow.** 001 discovered that the CI build broke despite local success. AC18 in 002 was a "post-merge gate" that acknowledged this gap. A formal "push to a test branch, verify CI, then merge" step would catch this earlier.
- **No visual regression baseline.** Testing was manual (check pages at three viewport widths). For a theme spec like 002, having screenshots or a visual diff tool would have caught layout regressions faster.

## Process Improvements for Next Group

1. **Add a CI verification step before merge.** Push the feature branch and verify the GitHub Actions build passes before merging to master. Don't treat deploy verification as a post-merge gate.
2. **Calibrate spec tier to scope.** Features like 006 that have no research, no architectural decisions, and touch fewer than 5 files should use the mini-spec tier rather than the full four-phase workflow. Reserve full specs for features with real unknowns.
3. **Continue the "accessible defaults" pattern.** Baking accessibility into foundational layers (variables, base styles) so downstream features inherit them automatically is more effective than auditing after the fact.
4. **Check `.gitignore` patterns against nested paths.** Any time a vendor directory is added, verify that gitignore patterns use leading slashes for root-only matching.

## Updated Conventions

No new conventions to add to `CLAUDE.md` or `docs/code-guidelines.md`. The `.gitignore` leading-slash convention and two-layer variable model are already documented from the 001 completion notes.
