# Tasks: Dark Mode

> **Status:** Completed

## Last Session

- **Date:** 2026-02-24
- **Stopped at:** Feature complete. All phases done, deployed and verified.
- **Context:** Merged to master, deployed via GitHub Actions, Lighthouse performance 99.
- **Next step:** None — spec 013 is complete.

> Update this block when **starting each task** and when **ending a session**. This ensures the next session knows exactly where to pick up, even if the previous session ended unexpectedly.

## Task Breakdown

### Phase 1: Research & Planning

**Stage 1: Research**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Audit existing CSS custom properties and SCSS architecture | Done | 16 partials read, two-layer model confirmed |
| 1.2 | Research dark mode implementation patterns for Jekyll/Bootstrap sites | Done | Bootstrap 5.3 color-mode, FOUC prevention, localStorage |
| 1.3 | Audit all existing components for color dependencies | Done | Hard-coded colors in 4 files catalogued |
| 1.4 | Consult SMEs (Jekyll, A11y, Bootstrap, CSS/Design, QA) | Done | 28 findings, 0 conflicts |

**Research Discussion** — Present findings to user and get approval before planning.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.R | Research discussion with user | Done | User approved direction. Resolved: ES modules, separate aria-live, toggle left of hamburger |

**Stage 2: Planning**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.5 | Record decisions from discussion in decisions.md | Done | 12 decisions (D1–D12) |
| 1.6 | Break down implementation tasks in tasks.md | Done | 12 implementation tasks |
| 1.7 | Update spec with QA-recommended AC additions | Done | 4 new ACs added, affected files refined |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Create feature branch `feature/013-dark-mode` | Done | Branch created from master |
| 2.2 | Add new semantic custom properties to `:root` in `_variables.scss` | Done | 7 new tokens added |
| 2.3 | Add `@include color-mode(dark)` block to `_variables.scss` | Done | Raw selector used (mixin unavailable at import order); 23 dark values |
| 2.4 | Replace hard-coded colors in `_code-blocks.scss` | Done | 2 occurrences replaced |
| 2.5 | Replace hard-coded colors in `_series.scss` | Done | 4 values replaced in 2 status modifiers |
| 2.6 | Replace hard-coded colors in `_search.scss` | Done | 3 values replaced (1 error, 2 focus-shadow) |
| 2.7 | Generate `_syntax-dark.scss` and import in `main.scss` | Done | Scoped under [data-bs-theme="dark"], bg uses var(--color-code-bg) |
| 2.8 | Add theme transition styles | Done | 7 structural elements, 0.2s ease, reduced-motion override |
| 2.9 | Add FOUC-prevention inline script to `default.html` | Done | 255 bytes, reads localStorage then prefers-color-scheme |
| 2.10 | Create theme toggle component (`_includes/theme-toggle.html` + `_theme-toggle.scss`) | Done | Button + SVG icons + aria-live region + BEM styles |
| 2.11 | Add toggle to `_includes/header.html` | Done | Outside collapse, order-md-1 for desktop end position |
| 2.12 | Create theme toggle JS module (`assets/js/modules/theme-toggle.js`) | Done | ES module with toggle, localStorage, matchMedia, aria-live |
| 2.13 | Add module script tag to `default.html` | Done | Inline module import for theme-toggle.js |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify each acceptance criterion | Done | 25 ACs checked — all pass except 3 issues sent to fix |
| 3.2 | Contrast check all dark palette color pairings | Done | All 14 pairings pass WCAG AA |
| 3.3 | Test FOUC prevention (hard reload, new tab, incognito) | Done | No flash — pass |
| 3.4 | Test localStorage persistence across navigations/sessions | Done | Persists correctly — pass |
| 3.5 | Test prefers-color-scheme system detection and real-time changes | Done | Real-time updates — pass |
| 3.6 | Test with JavaScript disabled | Done | Light default, toggle hidden — pass |
| 3.7 | Test prefers-reduced-motion behavior | Done | Instant switch — pass |
| 3.8 | Keyboard navigation test (Tab through all pages in dark mode) | Done | Focus rings visible — pass |
| 3.9 | Run Accessibility SME audit | Done | 1 warning fixed (S29 → ba927a5), 6 checks pass |
| 3.10 | Run QA SME audit | Done | 1 info fixed (S36 → f00db06), 0 errors/warnings |
| 3.11 | User testing plan | Done | All A–H pass, I1 deferred to Phase 4. Transition tweak committed (a70d449) |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review against all spec requirements | Done | All 10 requirements, 25 ACs, 12 decisions verified |
| 4.2 | Fill in completion notes in spec.md | Done | All 5 sections filled |
| 4.3 | Update lessons-learned.md if applicable | Done | 2 new entries (Sass mixin availability, inline/module dead code) |
| 4.4 | Merge feature branch to master | Done | No-ff merge, 16 commits, 13 files |
| 4.5 | Delete feature branch (local and remote) | Done | Local deleted; no remote branch to delete |
| 4.6 | Verify GitHub Actions deploy | Done | Deploy succeeded, Lighthouse performance 99 |
| 4.7 | Spot-check live site | Done | User verified live site |

## Summary

- **Total tasks:** 33
- **Completed:** 33 (Phase 1: 7, Phase 2: 13, Phase 3: 11, Phase 4: 7)
- **Remaining:** 0
