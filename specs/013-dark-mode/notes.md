# Notes: Dark Mode

## SME Finding Tracker

All SME findings across every phase, with disposition. Add rows as findings come in.

| # | Phase | SME | Finding | Recommendation | Disposition |
|---|-------|-----|---------|----------------|-------------|
| S1 | Research | Jekyll | FOUC script should go in default.html before head.html include | Inline sync script on `<html>` tag, set data-bs-theme before CSS loads | Adopted → D1 |
| S2 | Research | Jekyll | Syntax dark theme via rougify, scope under [data-bs-theme="dark"] | Generate _syntax-dark.scss, import after _syntax | Adopted → D2 |
| S3 | Research | Jekyll | Theme preference is purely client-side, no _config.yml needed | Remove _config.yml from affected files | Adopted → D3 |
| S4 | Research | Jekyll | No concerns with inline script and Jekyll processing | Keep under 500 bytes, use setAttribute() | N/A |
| S5 | Research | A11y | Use plain button with visible text, not aria-pressed or role="switch" | Visually hidden text label + aria-live status region for announcements | Adopted → D4 |
| S6 | Research | A11y | Focus ring #005fcc fails WCAG 1.4.11 on dark bg (~2.7:1, need 3:1) | Use ~#58a6ff in dark mode (~7:1 contrast) | Adopted → Task |
| S7 | Research | A11y | Theme changes must be announced to screen readers (WCAG 4.1.3) | aria-live="polite" region, announce "Dark/Light mode enabled" | Adopted → D4 |
| S8 | Research | A11y | FOUC inline script is transparent to assistive technology | No concerns — proceed with approach | N/A |
| S9 | Research | A11y | Search input rgba focus shadow invisible on dark bg | Replace hardcoded rgba with --color-focus-shadow custom property | Adopted → Task |
| S10 | Research | Bootstrap | data-bs-theme="dark" auto-restyles all imported Bootstrap components | Bootstrap layer handled; project Layer 2 custom properties need manual dark values | Adopted → D5 |
| S11 | Research | Bootstrap | Use @include color-mode(dark) mixin for project custom properties | Consistent with Bootstrap convention, outputs [data-bs-theme="dark"] | Adopted → D6 |
| S12 | Research | Bootstrap | Navbar toggler icon swaps to light variant automatically in dark mode | No manual work needed for toggler icon | N/A |
| S13 | Research | Bootstrap | Two parallel CSS custom property systems must stay synchronized | Verify both --bs-* and --color-* systems have dark values | Adopted → Task |
| S14 | Research | Bootstrap | Hardcoded rgba in search and color-scheme: dark affects native UI | Replace rgba, test native form elements (scrollbars, autofill) in dark mode | Adopted → Task |
| S15 | Research | CSS/Design | Full dark palette recommended — GitHub-dark inspired, blue hue family | 16 color tokens with specific hex values and contrast ratios | Adopted → D7 |
| S16 | Research | CSS/Design | Syntax highlighting: full theme swap via separate _syntax-dark.scss | Maintains rougify regenerability per spec 011 lesson | Adopted → D2 |
| S17 | Research | CSS/Design | Targeted transitions on structural elements (approach A) | body, header, footer, post-card + prefers-reduced-motion override | Adopted → D8 |
| S18 | Research | CSS/Design | Hard-coded colors should become semantic custom properties | --color-success, --color-error, --color-status-*, --color-focus-shadow | Adopted → Task |
| S19 | Research | CSS/Design | Toggle as minimal icon button, sun/moon SVGs, .theme-toggle BEM block | Place between nav links and search; outside collapsible nav on mobile | Adopted → D9 |
| S20 | Research | QA | Affected files list includes _config.yml — should be removed | Remove per Jekyll SME finding (S3) | Adopted → D3 |
| S21 | Research | QA | JS module pattern inconsistency: existing code uses IIFE, guidelines say ES modules | Document as explicit decision; FOUC script is inline sync regardless | Adopted → D10 |
| S22 | Research | QA | AC "performance not noticeably degraded" is not objectively testable | Replace with Lighthouse 90+ and inline script <500 bytes | Adopted → spec update |
| S23 | Research | QA | Missing AC for prefers-reduced-motion behavior | Add AC: transitions disabled when prefers-reduced-motion: reduce | Adopted → spec update |
| S24 | Research | QA | Missing AC for real-time system preference changes | Add AC: tracks OS theme changes live when no manual pref saved | Adopted → spec update |
| S25 | Research | QA | Missing AC for JavaScript-disabled behavior | Add AC: light mode default, toggle hidden, no broken UI | Adopted → spec update |
| S26 | Research | QA | Spec status should be "Research" not "Draft" | Update status field | Adopted → spec update |
| S27 | Research | QA | localStorage key name should be specified to prevent collisions | Specify key name in spec (e.g., "theme") | Adopted → D11 |
| S28 | Research | QA | Code guidelines JS example already uses dark mode pattern | Use as reference implementation for toggle JS | N/A |
| S29 | Testing | A11y | Redundant aria-label overrides dynamic visually hidden text (WCAG 2.5.3) | Remove aria-label from toggle button | Fixed in ba927a5 |
| S30 | Testing | A11y | Skip link contrast passes in dark mode (#4dabf7 on #0d1117 ~7.65:1) | No action needed | N/A |
| S31 | Testing | A11y | Toggle tap target 32×32px passes WCAG 2.5.8 (min 24×24) | No action needed | N/A |
| S32 | Testing | A11y | Focus ring #58a6ff on #0d1117 ~7.49:1 passes WCAG 1.4.11 | No action needed | N/A |
| S33 | Testing | A11y | Theme transitions respect prefers-reduced-motion (WCAG 2.3.3) | No action needed | N/A |
| S34 | Testing | A11y | Noscript fallback hides toggle, light default works | No action needed | N/A |
| S35 | Testing | A11y | aria-live region correct: role="status", polite, in DOM on load, cleared after 2s | No action needed | N/A |
| S36 | Testing | QA | getPreferredTheme() declared but never called — dead code | Remove unused function | Fixed in f00db06 |
| S37 | Testing | QA | BEM naming correct across all new partials | No action needed | N/A |
| S38 | Testing | QA | JSDoc file headers and function docs complete in theme-toggle.js | No action needed | N/A |
| S39 | Testing | QA | Liquid comment conventions followed in theme-toggle.html | No action needed | N/A |
| S40 | Testing | QA | 4-space indentation consistent across all new/modified files | No action needed | N/A |
| S41 | Testing | QA | File organization and import order correct in main.scss | No action needed | N/A |
| S42 | Testing | QA | CSS custom property usage consistent — no remaining hard-coded colors | No action needed | N/A |
| S43 | Testing | QA | All Research findings S20–S28 verified as correctly addressed | No action needed | N/A |

**Disposition values:** Adopted → D# (decision), Adopted → Task #, Deferred, Overridden by D#, Fixed in [commit], N/A

---

## Research & Planning

### Findings

#### Jekyll SME — Research

- **Finding 1 (FOUC prevention):** The inline script should go in `_layouts/default.html`, not `_includes/head.html`. Set `data-bs-theme="light"` as the default on the `<html>` tag, then add a synchronous inline `<script>` immediately after the `<html>` tag (before `head.html` include) that reads localStorage and `prefers-color-scheme`, then updates the attribute. Must be synchronous and render-blocking by design — keep under 500 bytes.
- **Recommendation:** Modify `default.html` to include the inline script before `head.html`. No `{% raw %}` needed unless JS uses `{{` syntax.

- **Finding 2 (Syntax themes):** Rouge generates class-based HTML — syntax colors are pure CSS. Generate the dark theme via `bundle exec rougify style github.dark --scope '.highlight'`, save as `_syntax-dark.scss`, scope all rules under `[data-bs-theme="dark"]`, import after `_syntax` in `main.scss`. Override only `background-color` to use `var(--color-code-bg)` per spec 011 lesson.
- **Recommendation:** Full theme swap via separate file. No Jekyll build pipeline changes needed.

- **Finding 3 (No _config.yml changes):** Theme preference is a runtime, per-user preference — `_config.yml` is build-time. No config changes needed. Remove from affected files.
- **Recommendation:** Purely client-side implementation.

- **Finding 4 (Inline script safety):** No concerns with Jekyll processing. Liquid won't interfere with JS syntax. CSP nonce may be needed in the future — document as a future consideration.
- **Recommendation:** Proceed with inline script approach.

#### Accessibility SME — Research

- **Finding 1 (Toggle ARIA pattern):** Use a plain `<button type="button">` with visually hidden text label (e.g., "Switch to dark mode"). Do not use `aria-pressed` or `role="switch"` — they have uneven screen reader support. Aligns with spec 011 lesson: prefer visible text over `aria-label` to avoid WCAG 2.5.3 (Label in Name) mismatches.
- **Recommendation:** Icon + visually hidden text label. Use aria-live="polite" status region for announcements.

- **Finding 2 (Dark mode contrast):** WCAG requirements are identical in both modes (4.5:1 text, 3:1 non-text). Key pitfalls: (a) avoid pure white on pure black (halation), (b) current focus ring `#005fcc` on `#212529` yields ~2.7:1 — fails WCAG 1.4.11, (c) current link color `#0060df` on dark bg yields ~3.1:1 — fails 4.5:1 for text, (d) muted text will fail on dark bg. All dark palette values must be verified.
- **Recommendation:** Target slightly higher than minimum ratios for body text. Use ~#58a6ff for dark focus ring (~7:1 contrast).

- **Finding 3 (Screen reader announcements):** Theme changes must be announced (WCAG 4.1.3 Status Messages). Use same aria-live="polite" pattern as code-copy.js. Consider a shared global status region (rename from `code-copy-status` to something generic like `sr-status`).
- **Recommendation:** Announce "Dark mode enabled" / "Light mode enabled" via live region. Clear after 2s delay.

- **Finding 4 (FOUC and AT):** No accessibility concerns with the inline script. Screen readers consume the DOM after initial paint, so the correct theme is already applied. Use `setAttribute()` specifically to avoid overwriting other `<html>` attributes.
- **Recommendation:** Proceed with no changes.

- **Finding 5 (Focus indicators in dark mode):** Focus ring color must change. `#005fcc` on dark bg fails WCAG 1.4.11. The search input's hardcoded `rgba(0, 96, 223, 0.25)` box-shadow will be invisible on dark backgrounds. Skip link contrast needs verification.
- **Recommendation:** Add `--focus-ring-color` dark value. Replace hardcoded rgba with `--color-focus-shadow` custom property. Tab through entire page in dark mode during testing.

#### Bootstrap SME — Research

- **Finding 1 (Auto-restyling):** Setting `data-bs-theme="dark"` on `<html>` automatically restyles all imported Bootstrap components: reboot (body color/bg), navbar (toggler icon), type, buttons, tables, etc. via CSS custom property redefinition in `_root.scss`. No additional work needed for Bootstrap's own components.
- **Recommendation:** Focus implementation work on project Layer 2 custom properties only.

- **Finding 2 (color-mode mixin):** The `color-mode(dark)` mixin outputs `[data-bs-theme="dark"] { ... }`. Provides future flexibility (could switch to `prefers-color-scheme` media queries without code changes). Already available via the imported mixins module.
- **Recommendation:** Use `@include color-mode(dark)` for project custom property overrides. Place in `_variables.scss` after the `:root` block.

- **Finding 3 (Navbar toggler):** Bootstrap's `_navbar.scss` has an explicit `color-mode(dark)` block that swaps the toggler SVG icon automatically. No manual work needed.
- **Recommendation:** No action for toggler. Nav link colors need dark values via `--color-nav-link`.

- **Finding 4 (Pitfalls):** (a) Two parallel custom property systems — project `body { background-color: var(--color-background) }` overrides Bootstrap's reboot, so project vars must have dark values. (b) `color-scheme: dark` in Bootstrap root affects native UI (scrollbars, autofill) — test these. (c) Hardcoded rgba focus shadows won't adapt. (d) CSS transitions target resolved properties (`background-color`), not custom properties. (e) `$min-contrast-ratio` is compile-time only — dark mode contrast must be verified manually.
- **Recommendation:** Ensure every Layer 2 property has a dark counterpart. Replace all hardcoded rgba values. Test native browser UI elements in dark mode.

#### CSS/Design SME — Research

- **Finding 1 (Dark palette):** GitHub-dark inspired palette maintaining the blue hue family:
  - `--color-primary`: `#4dabf7` (8.5:1 on dark bg)
  - `--color-text`: `#c9d1d9` (10:1)
  - `--color-heading`: `#e6edf3` (near-white for hierarchy)
  - `--color-muted`: `#8b949e` (5.5:1)
  - `--color-background`: `#0d1117` (not pure black — blue undertone)
  - `--color-bg-alt`: `#161b22`
  - `--color-link`: `#4dabf7`
  - `--color-link-hover`: `#79c0ff`
  - `--color-border`: `#30363d`
  - `--color-code-bg`: `#161b22`
  - `--color-nav-link`: `#c9d1d9`
  - `--color-tag-bg`: `#21262d`
  - `--color-tag-text`: `#c9d1d9`
  - `--color-tag-border`: `#30363d`
  - `--meta-color`: `#8b949e`
  - `--focus-ring-color`: `#58a6ff`
- **Recommendation:** Adopt palette. Verify all pairings with contrast checker during implementation.

- **Finding 2 (Syntax highlighting):** Full theme swap via `_syntax-dark.scss` generated by `rougify style github.dark`. Override only background-color to `var(--color-code-bg)`. Maintains regenerability per spec 011 lesson.
- **Recommendation:** Approach B — separate file, not custom properties per token.

- **Finding 3 (Transitions):** Targeted transitions (approach A) on structural elements: body, header, footer, post-card, series-toc, sidebar, tags, code-block copy. Duration 0.2s ease. Include `@media (prefers-reduced-motion: reduce)` to disable for motion-sensitive users.
- **Recommendation:** Avoid broad `*` selector. Scope transitions to elements with visible color areas.

- **Finding 4 (Hard-coded colors):** Four locations need custom properties:
  - Series status badges → `--color-status-progress-bg/text`, `--color-status-complete-bg/text`
  - Code copy "Copied" state → `--color-success` (light: `#116329`, dark: `#3fb950`)
  - Search error → `--color-error` (light: `#c62828`, dark: `#f85149`)
  - Search focus shadow → `--color-focus-shadow` (light: `rgba(0,96,223,0.25)`, dark: `rgba(77,171,247,0.3)`)
- **Recommendation:** Add semantic custom properties to both `:root` and dark mode blocks. Replace hardcoded values in partials.

- **Finding 5 (Toggle design):** Minimal icon button with sun/moon inline SVGs. Place between nav links and search in header. Keep outside collapsible nav for mobile visibility. BEM block `.theme-toggle` with `.theme-toggle__icon` element. Borderless, uses `--color-muted` default, `--color-text` on hover. 1.25rem icon, ~2rem tap target.
- **Recommendation:** Two SVGs with CSS display toggling. Match nav link hover pattern.

#### QA SME — Spec Review

- **Finding 1 (Error):** Affected files list includes `_config.yml` — should be removed per Jekyll SME finding.
- **Recommendation:** Remove during Planning.

- **Finding 2 (Warning):** JS module pattern inconsistency — existing code uses IIFEs, code guidelines specify ES modules. Toggle JS needs explicit decision.
- **Recommendation:** Document in decisions.md. FOUC script is inline sync regardless.

- **Finding 3 (Warning):** AC "performance not noticeably degraded" is subjective and not testable.
- **Recommendation:** Replace with "Lighthouse 90+" and "inline script <500 bytes."

- **Finding 4 (Warning):** Missing AC for `prefers-reduced-motion` behavior.
- **Recommendation:** Add: "Theme transitions disabled when prefers-reduced-motion: reduce is active."

- **Finding 5 (Warning):** Missing AC for real-time OS theme changes while page is open.
- **Recommendation:** Add: "Site tracks OS color scheme changes live when no manual preference is saved; ignores OS changes when manual preference exists."

- **Finding 6 (Warning):** Missing AC for JavaScript-disabled behavior.
- **Recommendation:** Add: "With JS disabled, site renders in light mode, toggle is hidden, no broken UI."

- **Finding 7 (Info):** Spec status should be "Research" not "Draft."
- **Recommendation:** Update status.

- **Finding 8 (Info):** localStorage key name should be specified to prevent collisions.
- **Recommendation:** Specify key (e.g., `theme`). Document naming convention.

- **Finding 9 (Info):** Code guidelines JS example already uses dark mode pattern — use as reference.
- **Recommendation:** Align implementation with the documented example.

### Open Questions

- [ ] JS pattern for toggle file: IIFE (matching existing code) or ES module (matching code guidelines)?
- [ ] Shared aria-live status region (rename `code-copy-status` → `sr-status`) or separate region per feature?
- [ ] Toggle placement on mobile: left of hamburger, or right?

### References

- Bootstrap 5.3 color modes: `assets/vendor/bootstrap/scss/_root.scss` (lines 132–187)
- Bootstrap color-mode mixin: `assets/vendor/bootstrap/scss/mixins/_color-mode.scss`
- Existing FOUC-free pattern: GitHub, MDN, and other static sites use inline `<script>` before `<head>`
- Rouge theme generation: `bundle exec rougify style github.dark --scope '.highlight'`
- Spec 011 lesson: keep generated syntax CSS close to rougify output
- Code guidelines JS example: `docs/code-guidelines.md` lines 17–41

---

## Implementation

- **D6 deviation (minor):** `@include color-mode(dark)` mixin is unavailable in `_variables.scss` because the file is imported before Bootstrap's mixins in the SCSS pipeline. Used raw `[data-bs-theme="dark"]` selector instead — same CSS output. Documented in the file comment.
- **FOUC script size:** 255 bytes — well within 500-byte budget.
- **Toggle placement:** Wrapped in `<div class="d-flex align-items-center order-md-1">` to keep it outside collapsible nav (mobile visible) while pushing it to end on desktop via flex ordering.
- **All tasks completed in a single session.** Build verified clean — no Sass compilation errors.

---

## Testing

### Stage 1: Claude Verification & SME Audits

#### Accessibility SME — Testing Audit

- **Finding 1 (S29):** Redundant `aria-label="Toggle theme"` overrides dynamic visually hidden text. Screen readers announce static label instead of "Switch to dark/light mode."
- **Recommendation:** Remove `aria-label`. Fixed in ba927a5.

- **Finding 2 (S30–S35):** All other accessibility checks pass — skip link contrast, tap target size, focus indicators, reduced motion, noscript fallback, aria-live region. All 5 Research findings (S5–S9) verified as correctly implemented.

#### QA SME — Testing Audit

- **Finding 1 (S36):** `getPreferredTheme()` function declared but never called in theme-toggle.js — dead code. FOUC inline script handles initial detection; `initThemeToggle()` reads `data-bs-theme` attribute directly.
- **Recommendation:** Remove unused function. Fixed in f00db06.

- **Finding 2 (S37–S43):** All other QA checks pass — BEM naming, JSDoc completeness, Liquid comment conventions, 4-space indentation, file organization, import order, CSS custom property usage. All 9 Research findings (S20–S28) verified as correctly addressed. 0 errors, 0 warnings.

### Stage 2: User Testing

- **A1–A10:** All visual rendering tests pass in dark mode (homepage, nav, footer, code blocks, tags, series, related posts, search, about)
- **B1–B2:** Light mode unchanged, no regressions
- **C1–C4:** Toggle icon correct, smooth transition, positioned correctly on desktop and mobile
- **D1–D4:** Persistence works across navigation, sessions; system preference detection works in real-time
- **E1–E2:** No FOUC on hard reload or incognito with dark preference
- **F1–F2:** Keyboard accessible, focus rings visible in dark mode
- **G1:** Reduced motion disables transitions — instant switch
- **H1:** JS disabled — light mode default, toggle hidden, no errors
- **I1:** Deferred to Phase 4 (requires deploy to remote)
- **User feedback:** Transition speed increased from 0.2s to 0.5s ease per user preference (a70d449)

### Issues Found

- **Issue 1 (trivial): Toggle visible when JS disabled**
  - Steps: Disable JS in browser, load any page — theme toggle button is visible but non-functional
  - AC violated: "With JavaScript disabled, toggle is hidden"
  - Severity: Trivial — add `<noscript>` style
  - Fix: Add `<noscript><style>.theme-toggle{display:none}</style></noscript>` to head
  - Status: Fixed in 71f1c78

- **Issue 2 (warning): Redundant aria-label overrides dynamic visually hidden text**
  - Steps: Screen reader reads "Toggle theme" (static aria-label) instead of "Switch to dark mode" (dynamic visually hidden span)
  - AC violated: WCAG 2.5.3 Label in Name — aria-label takes precedence, making JS label updates invisible to AT
  - Severity: Warning — remove one attribute
  - Fix: Remove `aria-label="Toggle theme"` from button; visually hidden span becomes accessible name
  - Status: Fixed in ba927a5

- **Issue 3 (info): Unused getPreferredTheme() function**
  - Steps: Read theme-toggle.js — function is declared but never called
  - AC violated: None (dead code, not a bug)
  - Severity: Info — code cleanliness
  - Fix: Remove unused function
  - Status: Fixed in f00db06

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
