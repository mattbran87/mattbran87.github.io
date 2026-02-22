# Feature: Bootstrap Integration

> **Spec ID:** 001
> **Status:** Implementation
> **Created:** 2026-02-22
> **Completed:** —

## Goal

Replace Minima's CSS foundation with Bootstrap 5 by vendoring Bootstrap's Sass source into the Jekyll build pipeline. Establish Bootstrap as the base component and layout framework for all subsequent UI work. Minima remains installed as a fallback during this transition.

## Background

The site currently uses Minima 2.5's built-in styles, which are limited in layout capability and component variety. Bootstrap 5 provides a comprehensive grid system, utility classes, and component library that will serve as the foundation for the custom theme (spec 002) and all features that follow. By vendoring the Sass source, we get full customization control without adding npm as a build dependency.

## Requirements

- [ ] Download Bootstrap **5.3.8** `scss/` directory and place it in `assets/vendor/bootstrap/scss/`
- [ ] Only vendor the `scss/` directory — no JS, no dist, no other directories from the Bootstrap source package
- [ ] Create the SCSS entry point at `assets/main.scss` (overrides Minima's gem-level `assets/main.scss` so Minima's layouts automatically load it)
- [ ] Use selective Bootstrap imports: required infrastructure block + blog foundation components (reboot, type, images, containers, grid, helpers, utilities API). Optional components commented out with dependency annotations.
- [ ] Override Bootstrap SCSS variables (`$primary`, `$body-color`, etc.) before Bootstrap's `_variables.scss` import to control compiled output (Layer 1: build-time)
- [ ] Define project CSS custom properties in `assets/css/_partials/_variables.scss` `:root {}` block for use in project component partials (Layer 2: runtime)
- [ ] Set accessible Bootstrap defaults: `$focus-ring-*` variables (solid, high-contrast), `$min-contrast-ratio: 4.5`, `$link-decoration: underline`, `$font-size-base: 1rem`, `$line-height-base: 1.5`
- [ ] Set up SCSS partial structure: `assets/css/_partials/_variables.scss` and `assets/css/_partials/_base.scss`
- [ ] Configure `_config.yml` with `sass: load_paths` to include `assets/vendor` and `assets/css`. Add `quiet_deps: true` and `silence_deprecations` for Bootstrap's Dart Sass warnings.
- [ ] Bootstrap grid classes, typography, and core utility classes function correctly in generated HTML output
- [ ] Bootstrap responsive breakpoints (576px, 768px, 992px, 1200px, 1400px) apply correctly
- [ ] Existing site pages (homepage, about, welcome post, 404) remain functional during the transition
- [ ] Create a temporary `bootstrap-test.html` verification page with grid, utility, typography, and breakpoint test sections (deleted after Testing phase)
- [ ] `assets/vendor/bootstrap/` is committed to version control (intentionally vendored, not gitignored)
- [ ] Site builds successfully with `bundle exec jekyll build` (no errors; Sass deprecation warnings from Bootstrap's vendored source are permitted)
- [ ] Site deploys successfully via GitHub Actions (verified post-push)

## Constraints

- **Vendored source only** — no npm, no CDN. Only Bootstrap's `scss/` directory is vendored in `assets/vendor/bootstrap/scss/`
- **No Minima removal** — Minima gem stays in the Gemfile and `_config.yml`. Removal happens in spec 002 (Custom Theme)
- **No layout or include overrides** — do not create `_layouts/` or `_includes/` directories. Layout work happens in spec 002. Overriding `assets/main.scss` is permitted (this is Minima's documented customization path, not a layout override).
- **No Bootstrap JS** — only the `scss/` directory is vendored. JavaScript components ship only when a feature requires them. Bootstrap component HTML and JS must always be shipped together or not at all.
- **Sass only** — Bootstrap's compiled CSS is not used. Import from Sass source for full control.
- **Two-layer variable model** — SCSS `$variables` are permitted only for Bootstrap Sass overrides (Layer 1). CSS custom properties in `:root {}` are the project's primary variable system for component styles (Layer 2). Per CSS/SCSS section of `docs/code-guidelines.md`.

## Acceptance Criteria

- [ ] Bootstrap 5.3.8 `scss/` directory is vendored in `assets/vendor/bootstrap/scss/`
- [ ] `assets/main.scss` exists with Jekyll front matter, imports Bootstrap selectively with project variable overrides before Bootstrap's `_variables.scss`
- [ ] `assets/css/_partials/_variables.scss` exists with Layer 1 (SCSS overrides) and Layer 2 (CSS custom properties in `:root {}`)
- [ ] `assets/css/_partials/_base.scss` exists with base styles using `var(--*)` custom properties
- [ ] Accessible defaults are set: `$focus-ring-width: 3px`, `$focus-ring-opacity: 1`, `$min-contrast-ratio: 4.5`, `$link-decoration: underline`
- [ ] `_config.yml` has `sass` configuration with `load_paths`, `quiet_deps`, and `silence_deprecations`
- [ ] `bootstrap-test.html` renders at `/bootstrap-test/` with:
  - A `.container` constraining content width at each breakpoint
  - A `.row` with `.col-md-4` children stacking vertically on small screens, side-by-side at `md`+
  - Spacing utilities (`mb-`, `p-`) applying visible spacing
  - Display utilities (`d-none`, `d-*-block`) toggling visibility at each breakpoint (576px, 768px, 992px, 1200px, 1400px)
- [ ] Existing pages (homepage, about, welcome post, 404) render with: readable text at 375px, 768px, and 1280px; no content overflow or horizontal scrollbars; navigation links visible and functional
- [ ] `bundle exec jekyll build` completes without errors. Sass deprecation warnings from vendored Bootstrap source are permitted; project-authored Sass must be warning-free.
- [ ] GitHub Actions deploy succeeds (verified post-push as final gate)
- [ ] No `_layouts/` or `_includes/` directory has been created. No Minima layout or include file has been duplicated into the project.

## Affected Files

- `assets/vendor/bootstrap/scss/` — new directory with Bootstrap 5.3.8 Sass source
- `assets/main.scss` — new SCSS entry point (overrides Minima's gem-level file)
- `assets/css/_partials/_variables.scss` — new project variables (SCSS overrides + CSS custom properties)
- `assets/css/_partials/_base.scss` — new base/reset styles
- `_config.yml` — `sass` configuration for load paths, quiet_deps, silence_deprecations
- `bootstrap-test.html` — temporary verification page (deleted after Testing phase)
- `docs/code-guidelines.md` — update CSS file organization to reflect `assets/main.scss` entry point
- `.github/workflows/deploy.yml` — reviewed for Bootstrap compatibility (no changes expected)
- `Gemfile.lock` — updated if `bundle install` resolves new versions

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-22 | 2026-02-22 | Complete — 5 SMEs consulted, 6 decisions recorded, spec revised |
| Implementation | — | — | |
| Testing | — | — | |
| Acceptance | — | — | |

## Completion Notes

[Filled in when status is set to Completed. Summary of what was delivered, any deviations from the original spec, and lessons learned.]
