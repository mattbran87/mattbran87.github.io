# Tasks: Bootstrap Integration

> **Status:** In Progress

## Task Breakdown

### Phase 1: Research & Planning

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Jekyll SME — Sass pipeline research | Done | Load paths, entry point, coexistence |
| 1.2 | Accessibility SME — identify a11y requirements | Done | Focus ring, contrast, link decoration |
| 1.3 | Bootstrap SME — integration approach | Done | Selective import, v5.3.8, Dart Sass warnings |
| 1.4 | CSS/Design SME — variable architecture | Done | Two-layer model, partial structure |
| 1.5 | QA SME — spec review | Done | 6 errors found and resolved in spec revision |
| 1.6 | Record decisions in decisions.md | Done | D1–D6 recorded |
| 1.7 | Build task breakdown for Implementation | Done | Tasks 2.1–2.8 defined |
| 1.8 | Get sign-off to move to Implementation | Done | Approved by user |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Download Bootstrap 5.3.8 and vendor `scss/` directory to `assets/vendor/bootstrap/scss/` | Pending | Only `scss/` dir, exclude tests/ |
| 2.2 | Create `assets/css/_partials/_variables.scss` with Layer 1 (SCSS overrides) and Layer 2 (CSS custom properties) | Pending | Include a11y defaults: focus ring, contrast ratio, link decoration |
| 2.3 | Create `assets/css/_partials/_base.scss` with base styles using `var(--*)` | Pending | Body defaults, link styles |
| 2.4 | Create `assets/main.scss` entry point with selective Bootstrap imports | Pending | Infrastructure + foundation, optional components commented with dependency annotations |
| 2.5 | Update `_config.yml` with `sass` configuration | Pending | load_paths, quiet_deps, silence_deprecations |
| 2.6 | Create `bootstrap-test.html` verification page | Pending | Grid, utilities, typography, breakpoint tests |
| 2.7 | Update `docs/code-guidelines.md` CSS file organization | Pending | Reflect `assets/main.scss` entry point, add two-layer variable note |
| 2.8 | Verify build succeeds with `bundle exec jekyll build` | Pending | No errors, warnings from project Sass |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify each acceptance criterion | Pending | |
| 3.2 | Test bootstrap-test.html at all breakpoints (375px, 576px, 768px, 992px, 1200px, 1400px) | Pending | |
| 3.3 | Verify existing pages render correctly at 375px, 768px, 1280px | Pending | No overflow, readable text, functional nav |
| 3.4 | Accessibility SME — audit focus styles and contrast | Pending | Required SME |
| 3.5 | QA SME — comprehensive code quality audit | Pending | Required SME |
| 3.6 | Delete bootstrap-test.html after verification | Pending | |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | QA SME — final quality gate | Pending | Required SME |
| 4.2 | Verify all acceptance criteria met | Pending | |
| 4.3 | Update spec.md status to Completed | Pending | |
| 4.4 | Push to master and verify GitHub Actions deploy | Pending | Final gate |

## Summary

- **Total tasks:** 22
- **Completed:** 7
- **Remaining:** 15
