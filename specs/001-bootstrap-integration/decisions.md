# Decisions: Bootstrap Integration

## Decision Log

### D1: Bootstrap Installation Method

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Need to determine how Bootstrap 5 Sass source is added to the Jekyll project
- **Options Considered:**
  1. Sass source via npm — full customization, requires node_modules in the project
  2. Sass source vendored — full customization, no npm dependency, manual updates
  3. CDN links — simplest setup, no Sass customization, external dependency
- **Decision:** Sass source vendored
- **Rationale:** Full Sass customization control without adding npm as a build dependency. Bootstrap source files will live in `assets/vendor/bootstrap/scss/` and be updated manually.

---

### D2: Minima Theme During Transition

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Need to determine whether Minima is kept or removed when Bootstrap is integrated
- **Options Considered:**
  1. Remove Minima entirely — clean slate, all layouts and styles from scratch, but more upfront work and risk of broken pages
  2. Keep Minima as fallback — override incrementally, site never breaks during transition
- **Decision:** Keep Minima as fallback
- **Rationale:** The site stays functional throughout the Bootstrap integration. Minima's layouts and includes continue to render for any pages not yet overridden. Full Minima removal will happen in spec 002 (Custom Theme).

---

### D3: SCSS Entry Point Location

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Minima's `_includes/head.html` links to `/assets/main.css`. Placing the SCSS entry point at `assets/css/main.scss` would compile to `/assets/css/main.css` — a different path that Minima's layouts would never load. Bootstrap would compile but be invisible in the browser.
- **Options Considered:**
  1. `assets/main.scss` — overrides Minima's gem-level file at the same path. Minima's layouts automatically load it. This is Minima's documented customization path.
  2. `assets/css/main.scss` — compiles to a different path. Requires overriding `_includes/head.html` to add a `<link>` tag, which violates the "no layout/include overrides" constraint.
- **Decision:** `assets/main.scss`
- **Rationale:** Option A follows Minima's documented customization path, requires no layout or include overrides, and means Bootstrap CSS is actually loaded in the browser for verification. The `_partials/` directory still lives at `assets/css/_partials/` and is imported via the Sass load path.

---

### D4: Selective vs. Full Bootstrap Import

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Bootstrap can be imported as a single `@import "bootstrap"` (all components, ~190KB minified) or selectively by naming individual partials. The project has 15+ planned features that may need various Bootstrap components.
- **Options Considered:**
  1. Full import — simple, no dependency tracking, but includes unused components (carousel, modal, tooltip, etc.)
  2. Selective import — smaller output, import foundation components now, comment out optional components with dependency annotations for future features to uncomment
- **Decision:** Selective import
- **Rationale:** Foundation components (reboot, type, images, containers, grid, helpers, utilities API) cover blog needs. Optional components (navbar, cards, forms, buttons, etc.) are commented out with dependency annotations so future specs can uncomment them as needed. Avoids shipping dead CSS while keeping maintenance simple.

---

### D5: Two-Layer Variable Architecture

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Bootstrap's Sass functions require SCSS `$variables` at compile time, but the project's code guidelines mandate CSS custom properties as the primary variable system. These are incompatible — Bootstrap cannot read `var(--*)` at compile time.
- **Options Considered:**
  1. SCSS variables only — abandon CSS custom properties convention for Bootstrap-related values
  2. CSS custom properties only — impossible, Bootstrap compilation would fail
  3. Two-layer model — SCSS variables for Bootstrap overrides (Layer 1: build-time), CSS custom properties for project component styles (Layer 2: runtime)
- **Decision:** Two-layer model
- **Rationale:** SCSS variables exist solely to feed Bootstrap's Sass compiler. CSS custom properties remain the primary system for all project-authored component styles. Both layers share the same values (e.g., `$primary: #2a7ae2` and `--color-primary: #2a7ae2`), maintained in sync manually in `_variables.scss`. Code guidelines updated with carve-out: "SCSS variables are permitted only for Bootstrap Sass overrides."

---

### D6: Dart Sass Deprecation Warning Handling

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Bootstrap 5.3.x uses `@import` syntax and global built-in functions. The project's Dart Sass 1.97.3 (via sass-embedded) emits deprecation warnings for these patterns. Bootstrap will not migrate to `@use`/`@forward` until v6. Warnings are cosmetic — CSS output is correct.
- **Options Considered:**
  1. Ignore warnings — build succeeds, but noisy output clutters logs
  2. Suppress via `_config.yml` — `quiet_deps: true` + `silence_deprecations` for `import`, `global-builtin`, `mixed-decls`
- **Decision:** Suppress via `_config.yml`
- **Rationale:** Warnings are unavoidable with Bootstrap 5.3.x on Dart Sass 1.80+. Suppressing them keeps build logs clean. Project-authored Sass should still be written with clean practices and remain warning-free.
