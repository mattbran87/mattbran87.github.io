# Feature: Bootstrap Integration

> **Spec ID:** 001
> **Status:** Draft
> **Created:** 2026-02-22
> **Completed:** —

## Goal

Replace Minima's CSS foundation with Bootstrap 5 by vendoring Bootstrap's Sass source into the Jekyll build pipeline. Establish Bootstrap as the base component and layout framework for all subsequent UI work. Minima remains installed as a fallback during this transition.

## Background

The site currently uses Minima 2.5's built-in styles, which are limited in layout capability and component variety. Bootstrap 5 provides a comprehensive grid system, utility classes, and component library that will serve as the foundation for the custom theme (spec 002) and all features that follow. By vendoring the Sass source, we get full customization control without adding npm as a build dependency.

## Requirements

- [ ] Download Bootstrap 5 Sass source files and place them in `assets/vendor/bootstrap/`
- [ ] Create the SCSS entry point (`assets/css/main.scss`) that imports Bootstrap source
- [ ] Configure Bootstrap's Sass variables before import to align with project design tokens (CSS custom properties defined in `_variables.scss`)
- [ ] Set up the SCSS partial structure per `docs/code-guidelines.md` (`_partials/_variables.scss`, `_partials/_base.scss`, etc.)
- [ ] Verify Bootstrap's grid system, typography, and core utilities are functional
- [ ] Verify Bootstrap's responsive breakpoints work correctly
- [ ] Ensure Minima's existing layouts still render correctly (Minima stays as fallback)
- [ ] No Bootstrap JavaScript is required at this stage (CSS/Sass only)
- [ ] Site builds successfully with `bundle exec jekyll build`
- [ ] Site deploys successfully via GitHub Actions

## Constraints

- **Vendored source only** — no npm, no CDN. Bootstrap Sass files live in `assets/vendor/bootstrap/`
- **No Minima removal** — Minima gem stays in the Gemfile and `_config.yml`. Removal happens in spec 002 (Custom Theme)
- **No layout overrides** — do not create custom layouts in this spec. Layout work happens in spec 002
- **No Bootstrap JS** — JavaScript components (modals, dropdowns, etc.) are not needed yet. Add only when a feature requires them
- **Sass only** — Bootstrap's compiled CSS is not used. Import from source for full control
- **Follow project conventions** — all file organization per `docs/code-guidelines.md` (BEM naming, CSS custom properties, SCSS partials by component)

## Acceptance Criteria

- [ ] Bootstrap 5 Sass source is vendored in `assets/vendor/bootstrap/`
- [ ] `assets/css/main.scss` exists and imports Bootstrap with project variable overrides
- [ ] SCSS partial structure is in place: `_variables.scss`, `_base.scss` at minimum
- [ ] Bootstrap grid classes (`.container`, `.row`, `.col-*`) work correctly in markup
- [ ] Bootstrap utility classes (spacing, display, text) work correctly
- [ ] Bootstrap responsive breakpoints (`sm`, `md`, `lg`, `xl`, `xxl`) function as expected
- [ ] Existing site pages (homepage, about, welcome post, 404) render without visual breakage
- [ ] `bundle exec jekyll build` completes without errors or warnings
- [ ] GitHub Actions deploy succeeds
- [ ] No Minima files have been deleted or overridden (layouts, includes)

## Affected Files

- `assets/vendor/bootstrap/` — new directory with Bootstrap Sass source
- `assets/css/main.scss` — new SCSS entry point
- `assets/css/_partials/_variables.scss` — new project variables
- `assets/css/_partials/_base.scss` — new base/reset styles
- `_config.yml` — may need `sass` configuration for load paths

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | — | — | |
| Implementation | — | — | |
| Testing | — | — | |
| Acceptance | — | — | |

## Completion Notes

[Filled in when status is set to Completed. Summary of what was delivered, any deviations from the original spec, and lessons learned.]
