# Notes: Bootstrap Integration

## Research & Planning

### Findings

**Jekyll Sass Pipeline (Jekyll SME)**
- Jekyll uses `jekyll-sass-converter` 3.1.0 with `sass-embedded` (Dart Sass 1.97.3)
- Only `.scss` files with YAML front matter are compiled; files without front matter are partials
- `sass_dir` defaults to `_sass`; `load_paths` in `_config.yml` adds additional search paths
- `@import "bootstrap/scss/bootstrap"` resolves via `load_paths` to `assets/vendor/bootstrap/scss/bootstrap.scss`

**Bootstrap Integration (Bootstrap SME)**
- Latest stable: Bootstrap 5.3.8
- Only the `scss/` directory needs to be vendored (~92 files across 6 subdirectories)
- Exclude `tests/`, `js/`, `dist/`, `site/`, `build/` from the download
- Selective import recommended: infrastructure block is required, blog foundation components imported, optional components commented with dependency annotations
- Known dependency chains: dropdown→transitions, navbar→nav+dropdown, popover→tooltip, modal→transitions+close, offcanvas→transitions+close

**Variable Architecture (CSS/Design SME)**
- Two-layer model: SCSS `$variables` for Bootstrap overrides (compile-time), CSS custom properties for project components (runtime)
- `$primary` and `--color-primary` share the same hex value, maintained in sync manually
- Breakpoints cannot be CSS custom properties (`@media` queries don't support `var()`)
- Only create `_variables.scss` and `_base.scss` partials now; add component partials in spec 002

**Accessibility (Accessibility SME)**
- Set `$focus-ring-width: 3px`, `$focus-ring-opacity: 1`, `$focus-ring-color: #005fcc`, `$focus-ring-blur: 0` for WCAG-compliant focus indicators
- Set `$min-contrast-ratio: 4.5` (WCAG AA for normal text)
- Keep `$link-decoration: underline` (WCAG 1.4.1 Use of Color)
- Keep `$font-size-base: 1rem` (never below 16px)
- Bootstrap's `$enable-reduced-motion: true` is correct default — do not change
- Minima's mobile nav has existing a11y issues (no ARIA) — carry to spec 002
- Skip link needed — add as first-priority task in spec 002
- `.text-muted` and similar utilities fail AA contrast — audit usage in future specs

**QA Review**
- 6 errors, 7 warnings, 5 info items identified in original spec draft
- Critical: SCSS entry point path was wrong (`assets/css/main.scss` → corrected to `assets/main.scss`)
- All errors and warnings resolved in spec revision

### Open Questions

All questions resolved during Research & Planning.

### References

- [Bootstrap 5.3 Sass documentation](https://getbootstrap.com/docs/5.3/customize/sass/)
- [Bootstrap 5.3 Optimize documentation](https://getbootstrap.com/docs/5.3/customize/optimize/)
- [Jekyll Sass/SCSS configuration](https://jekyllrb.com/docs/configuration/sass/)
- [Jekyll Sass Converter 3.0 release notes](https://jekyllrb.com/news/2022/12/21/jekyll-sass-converter-3.0-released/)
- [Bootstrap 5.3.8 release](https://github.com/twbs/bootstrap/releases/tag/v5.3.8)

---

## Implementation

- [Notes captured during implementation — gotchas, surprises, workarounds]

---

## Testing

- [Test observations, edge cases found, performance notes]

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
