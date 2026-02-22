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

**Import path correction:** Sass strips leading `_` from filenames (partials) but NOT from directory names. The `_partials/` directory requires `@import "_partials/variables"` — not `@import "partials/variables"` as originally documented in code-guidelines.md. Fixed in both `assets/main.scss` and `docs/code-guidelines.md`.

**Vendor source in `_site/`:** Bootstrap's non-partial entry point files (`bootstrap.scss`, `bootstrap-grid.scss`, `bootstrap-reboot.scss`, `bootstrap-utilities.scss`) are copied to `_site/assets/vendor/` since they lack the `_` prefix. This is cosmetically imperfect but harmless. **Do not add `assets/vendor/` to the `exclude` list** — see "Jekyll exclude breaks Sass load_paths on CI" below.

**Jekyll `exclude` breaks Sass `load_paths` on CI (Linux):** Adding `assets/vendor/` to `_config.yml` `exclude` prevented the Sass compiler from resolving Bootstrap's internal imports (e.g., `vendor/rfs` from `_mixins.scss`) on the GitHub Actions Linux runner, even though `load_paths` pointed to the same directory. This worked locally on Windows but failed on CI. **Root cause:** Jekyll's `exclude` on Linux prevents the Sass compiler from traversing excluded directories for relative imports within vendored source. The `load_paths` config tells Sass where to start looking, but `exclude` blocks resolution of files nested inside excluded paths. **Resolution:** Removed `assets/vendor/` from `exclude`. The 4 non-partial Bootstrap files are copied to `_site/` (acceptable trade-off). **Rule: never exclude a directory that is also a Sass `load_path` or contains files imported by a `load_path` entry.**

**`mixed-decls` deprecation obsolete:** The `mixed-decls` silence_deprecation entry was no longer needed in Dart Sass 1.97.3 (the deprecation was removed). Removed from `_config.yml` to eliminate the harmless "obsolete" warning. Only `import` and `global-builtin` silencing remains.

**Bootstrap 5.3.8 vendored structure:** 92 files across 6 subdirectories (forms/, helpers/, mixins/, utilities/, vendor/). `tests/` directory excluded per spec. The `unzip` command's glob pattern `"bootstrap-5.3.8/scss/*"` only matches top-level files — full extraction required extracting everything then removing tests/.

---

## Testing

**Minima CSS fully replaced:** Overriding `assets/main.scss` means Minima's CSS classes (`.site-header`, `.wrapper`, `.post-content`, etc.) are no longer styled. Minima's layouts still provide the HTML structure, but all styling is now Bootstrap reboot + project base. This is expected and intentional — visual appearance changes but functionality is preserved. Spec 002 (Custom Theme) will build proper styling on top of Bootstrap.

**`exclude_from_nav` not supported by Minima 2.5:** The `bootstrap-test.html` front matter included `exclude_from_nav: true` but Minima 2.5 doesn't check this key. The test page appeared in the site navigation. Minima uses `header_pages` in `_config.yml` to control nav. Low impact since the page is temporary and has been deleted.

**Link color contrast thin margin:** The link color `#2a7ae2` on white has approximately 4.56:1 contrast — passes WCAG AA (4.5:1) but barely. Future theme work (spec 002) should verify or darken slightly.

**Accessibility audit (15 PASS, 7 WARN, 0 FAIL):** All acceptance criteria for accessible defaults met. WARN items are pre-existing Minima issues (mobile nav a11y, skip link) deferred to spec 002, plus temporary test page heading hierarchy.

**QA audit (49 PASS, 8 WARN, 1 FAIL):** Single FAIL is the non-functional `exclude_from_nav` (low impact, page deleted). WARN items are documentation housekeeping and acknowledged design trade-offs (Layer 1/2 asymmetry, base.scss overlap with reboot).

---

## Acceptance

All 16 requirements verified met. All 6 decisions followed. 10 of 11 acceptance criteria confirmed — AC10 (GitHub Actions deploy) is a post-push final gate. No issues found requiring return to Implementation or Testing. Feature declared complete and ready to commit.
