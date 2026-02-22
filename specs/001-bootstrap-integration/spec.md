# Feature: Bootstrap Integration

> **Spec ID:** 001
> **Status:** Completed
> **Created:** 2026-02-22
> **Completed:** 2026-02-22

## Goal

Replace Minima's CSS foundation with Bootstrap 5 by vendoring Bootstrap's Sass source into the Jekyll build pipeline. Establish Bootstrap as the base component and layout framework for all subsequent UI work. Minima remains installed as a fallback during this transition.

## Background

The site currently uses Minima 2.5's built-in styles, which are limited in layout capability and component variety. Bootstrap 5 provides a comprehensive grid system, utility classes, and component library that will serve as the foundation for the custom theme (spec 002) and all features that follow. By vendoring the Sass source, we get full customization control without adding npm as a build dependency.

## Requirements

- [x] Download Bootstrap **5.3.8** `scss/` directory and place it in `assets/vendor/bootstrap/scss/`
- [x] Only vendor the `scss/` directory — no JS, no dist, no other directories from the Bootstrap source package
- [x] Create the SCSS entry point at `assets/main.scss` (overrides Minima's gem-level `assets/main.scss` so Minima's layouts automatically load it)
- [x] Use selective Bootstrap imports: required infrastructure block + blog foundation components (reboot, type, images, containers, grid, helpers, utilities API). Optional components commented out with dependency annotations.
- [x] Override Bootstrap SCSS variables (`$primary`, `$body-color`, etc.) before Bootstrap's `_variables.scss` import to control compiled output (Layer 1: build-time)
- [x] Define project CSS custom properties in `assets/css/_partials/_variables.scss` `:root {}` block for use in project component partials (Layer 2: runtime)
- [x] Set accessible Bootstrap defaults: `$focus-ring-*` variables (solid, high-contrast), `$min-contrast-ratio: 4.5`, `$link-decoration: underline`, `$font-size-base: 1rem`, `$line-height-base: 1.5`
- [x] Set up SCSS partial structure: `assets/css/_partials/_variables.scss` and `assets/css/_partials/_base.scss`
- [x] Configure `_config.yml` with `sass: load_paths` to include `assets/vendor` and `assets/css`. Add `quiet_deps: true` and `silence_deprecations` for Bootstrap's Dart Sass warnings.
- [x] Bootstrap grid classes, typography, and core utility classes function correctly in generated HTML output
- [x] Bootstrap responsive breakpoints (576px, 768px, 992px, 1200px, 1400px) apply correctly
- [x] Existing site pages (homepage, about, welcome post, 404) remain functional during the transition
- [x] Create a temporary `bootstrap-test.html` verification page with grid, utility, typography, and breakpoint test sections (deleted after Testing phase)
- [x] `assets/vendor/bootstrap/` is committed to version control (intentionally vendored, not gitignored)
- [x] Site builds successfully with `bundle exec jekyll build` (no errors; Sass deprecation warnings from Bootstrap's vendored source are permitted)
- [ ] Site deploys successfully via GitHub Actions (verified post-push)

## Constraints

- **Vendored source only** — no npm, no CDN. Only Bootstrap's `scss/` directory is vendored in `assets/vendor/bootstrap/scss/`
- **No Minima removal** — Minima gem stays in the Gemfile and `_config.yml`. Removal happens in spec 002 (Custom Theme)
- **No layout or include overrides** — do not create `_layouts/` or `_includes/` directories. Layout work happens in spec 002. Overriding `assets/main.scss` is permitted (this is Minima's documented customization path, not a layout override).
- **No Bootstrap JS** — only the `scss/` directory is vendored. JavaScript components ship only when a feature requires them. Bootstrap component HTML and JS must always be shipped together or not at all.
- **Sass only** — Bootstrap's compiled CSS is not used. Import from Sass source for full control.
- **Two-layer variable model** — SCSS `$variables` are permitted only for Bootstrap Sass overrides (Layer 1). CSS custom properties in `:root {}` are the project's primary variable system for component styles (Layer 2). Per CSS/SCSS section of `docs/code-guidelines.md`.

## Acceptance Criteria

- [x] Bootstrap 5.3.8 `scss/` directory is vendored in `assets/vendor/bootstrap/scss/`
- [x] `assets/main.scss` exists with Jekyll front matter, imports Bootstrap selectively with project variable overrides before Bootstrap's `_variables.scss`
- [x] `assets/css/_partials/_variables.scss` exists with Layer 1 (SCSS overrides) and Layer 2 (CSS custom properties in `:root {}`)
- [x] `assets/css/_partials/_base.scss` exists with base styles using `var(--*)` custom properties
- [x] Accessible defaults are set: `$focus-ring-width: 3px`, `$focus-ring-opacity: 1`, `$min-contrast-ratio: 4.5`, `$link-decoration: underline`
- [x] `_config.yml` has `sass` configuration with `load_paths`, `quiet_deps`, and `silence_deprecations`
- [x] `bootstrap-test.html` renders at `/bootstrap-test/` with:
  - A `.container` constraining content width at each breakpoint
  - A `.row` with `.col-md-4` children stacking vertically on small screens, side-by-side at `md`+
  - Spacing utilities (`mb-`, `p-`) applying visible spacing
  - Display utilities (`d-none`, `d-*-block`) toggling visibility at each breakpoint (576px, 768px, 992px, 1200px, 1400px)
- [x] Existing pages (homepage, about, welcome post, 404) render with: readable text at 375px, 768px, and 1280px; no content overflow or horizontal scrollbars; navigation links visible and functional
- [x] `bundle exec jekyll build` completes without errors. Sass deprecation warnings from vendored Bootstrap source are permitted; project-authored Sass must be warning-free.
- [ ] GitHub Actions deploy succeeds (verified post-push as final gate)
- [x] No `_layouts/` or `_includes/` directory has been created. No Minima layout or include file has been duplicated into the project.

## Affected Files

- `assets/vendor/bootstrap/scss/` — new directory with Bootstrap 5.3.8 Sass source
- `assets/main.scss` — new SCSS entry point (overrides Minima's gem-level file)
- `assets/css/_partials/_variables.scss` — new project variables (SCSS overrides + CSS custom properties)
- `assets/css/_partials/_base.scss` — new base/reset styles
- `_config.yml` — `sass` configuration for load paths, quiet_deps, silence_deprecations
- `bootstrap-test.html` — temporary verification page (deleted after Testing phase)
- `docs/code-guidelines.md` — corrected import paths (`_partials/` not `partials/`) in SCSS examples
- `.github/workflows/deploy.yml` — reviewed for Bootstrap compatibility (no changes needed)
- `Gemfile.lock` — no changes needed (no new gem dependencies)

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-22 | 2026-02-22 | Complete — 5 SMEs consulted, 6 decisions recorded, spec revised |
| Implementation | 2026-02-22 | 2026-02-22 | Complete — all 8 tasks done, build clean, vendor excluded from _site |
| Testing | 2026-02-22 | 2026-02-22 | Complete — all AC verified, a11y audit 15P/7W/0F, QA audit 49P/8W/1F, test page deleted |
| Acceptance | 2026-02-22 | 2026-02-22 | Complete — all requirements met, all decisions followed, AC10 (deploy) pending post-push |

## Completion Notes

**Delivered:** Bootstrap 5.3.8 Sass source vendored into the Jekyll build pipeline with selective imports, two-layer variable architecture, accessible defaults, and clean build output. Establishes Bootstrap as the CSS foundation for all subsequent UI work.

**Deviations from original spec:**
- Import paths use `_partials/` (with underscore) instead of `partials/` — Sass only strips underscores from filenames, not directory names. Code-guidelines.md corrected.
- `mixed-decls` removed from `silence_deprecations` — obsolete in Dart Sass 1.97.3.
- `assets/vendor/` was initially added to `_config.yml` exclude list to prevent raw source in `_site/`, then removed because it broke the CI build (see lessons learned).

**Lessons learned:**
- Sass underscore convention applies only to filenames, not directories. Always test import paths.
- Minima 2.5 does not support `exclude_from_nav` front matter. Use `header_pages` in `_config.yml` to control navigation.
- **Never `exclude` a directory that is also a Sass `load_path`.** Jekyll's `exclude` on Linux prevents the Sass compiler from resolving relative imports within excluded directories, even though `load_paths` points there. This worked locally on Windows but broke the GitHub Actions CI build. The 4 non-partial Bootstrap files in `_site/` are an acceptable trade-off.
- Link color #2a7ae2 on white passes AA contrast (4.56:1) but with thin margin. Revisit in spec 002 theme work.

**Remaining gate:** AC10 (GitHub Actions deploy) is verified post-push.
