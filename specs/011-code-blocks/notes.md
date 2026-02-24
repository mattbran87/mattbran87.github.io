# Notes: Code Block Enhancements

## SME Finding Tracker

All SME findings across every phase, with disposition. Add rows as findings come in.

| # | Phase | SME | Finding | Recommendation | Disposition |
|---|-------|-----|---------|----------------|-------------|
| S1 | Research | Jekyll | No explicit highlighter config in _config.yml; defaults work fine | Add minimal kramdown config only if needed for line numbers | Adopted → D1 |
| S2 | Research | Jekyll | rougify CLI generates usable base theme CSS; customize after | Use `rougify style github` as starting point, save as SCSS partial | Adopted → D2 |
| S3 | Research | Jekyll | Rouge table-based line numbers are complex and break copy UX | Avoid Rouge built-in linenos; use CSS counters with JS line wrapping if line numbers are needed | Adopted → D3 |
| S4 | Research | Jekyll | SCSS file changes picked up by live reload; no server restart needed | No action needed |
| S5 | Research | Jekyll | Fenced code blocks produce `div.highlighter-rouge > div.highlight > pre.highlight > code` structure | Target both fenced and Liquid highlight structures in CSS/JS |
| S6 | Research | A11y | aria-live="polite" region approach is correct for copy announcements | Place region in DOM on page load, use role="status" | Adopted → D4 |
| S7 | Research | A11y | Visible text preferred over icon-only buttons for discoverability | Use visible "Copy"/"Copied!" text — benefits all users | Adopted → D5 |
| S8 | Research | A11y | Show-on-hover pattern excludes touch and keyboard-only users | Use always-visible baseline with enhanced hover treatment via `@media (hover: hover)` | Adopted → D6 |
| S9 | Research | A11y | Code blocks (`<pre><code>`) are natively semantic; no ARIA roles needed | Do not add roles to code blocks |
| S10 | Research | A11y | Long code blocks should be keyboard-scrollable | Add `tabindex="0"` and `role="region"` with `aria-label` to code blocks with overflow | Adopted |
| S11 | Research | CSS | Converting Rouge theme to CSS custom properties is premature | Keep concrete color values; dark mode (spec 013) will add a companion dark theme | Adopted → D2 |
| S12 | Research | CSS | BEM block name `.code-block` with elements `__copy`, `__copy--copied` | Add `.code-block` class via JS alongside Rouge's existing classes | Adopted |
| S13 | Research | CSS | Existing code styles in `_base.scss` should move to `_code-blocks.scss` | Consolidate all code block styles in one partial | Adopted |
| S14 | Research | CSS | Opacity hover pattern needs reduced-motion and touch-device handling | Use `@media (hover: hover)` for hover-only behavior; `prefers-reduced-motion` to disable transitions | Adopted → D6 |
| S15 | Testing | A11y | `aria-label` overrides visible text during "Copied!" state (WCAG 2.5.3) | Remove `aria-label`; visible text is clear enough | Fixed in 8689e77 |
| S16 | Testing | A11y | Missing `.catch()` on clipboard promise — no failure feedback | Add `.catch()` with status region message | Fixed in 8689e77 |
| S17 | Testing | A11y | Comment syntax color (#6e7781 on #f5f5f5) is 4.19:1 — below 4.5:1 AA | Standard GitHub theme trade-off; not a blocker | N/A |
| S18 | Testing | A11y | Overflowing code blocks not keyboard-scrollable | Could add `tabindex="0"` + `role="region"` — deferred | Deferred |
| S19 | Testing | QA | Misleading SCSS comment about `.code-block` class injection | Update comment to reflect actual approach | Fixed in 8689e77 |
| S20 | Testing | QA | Syntax theme lines 11-12 use single-line format from generator | Acceptable for generated code | N/A |

---

## Research & Planning

### Findings

#### Jekyll SME — Research

- **Finding:** No explicit kramdown or Rouge configuration exists in `_config.yml`. Jekyll defaults produce fenced code blocks as `div.language-XX.highlighter-rouge > div.highlight > pre.highlight > code > span.TOKEN`. The Liquid `{% highlight %}` tag produces `figure.highlight > pre > code.language-XX > span.TOKEN`. No Rouge theme CSS is loaded — all code renders monochrome.
- **Recommendation:** No config changes needed for basic highlighting. Only add `kramdown.syntax_highlighter_opts` if enabling line numbers globally (not recommended). The rougify CLI is the best starting point for a theme — generates a complete CSS file targeting `.highlight` scope. Customize colors after generating.

- **Finding:** Rouge's built-in `linenos` option produces a `<table>` structure with separate `<td>` for gutter and code. This complicates both CSS (different structure from non-lineno blocks) and copy UX (line numbers in `<pre>` content get selected on manual copy). The `linenos` option only works per-block with `{% highlight lang linenos %}` — not with fenced code blocks unless set globally in config.
- **Recommendation:** Avoid Rouge's built-in line numbers. If line numbers are needed, use CSS counters with JavaScript line wrapping. This keeps line numbers out of the copy buffer (`user-select: none` on pseudo-elements) and works with the standard Rouge HTML structure.

- **Finding:** Adding new SCSS partials and updating `@import` in `main.scss` is picked up by Jekyll's live reload. No server restart needed (only `_config.yml` changes require restart).
- **Recommendation:** No special workflow considerations.

#### Accessibility SME — Research

- **Finding:** The planned `aria-live="polite"` approach is correct for copy success announcements. A single status region placed in the DOM at page load, with `textContent` updated on copy, is the standard pattern. `role="status"` is implicit `aria-live="polite"` and has good screen reader support.
- **Recommendation:** Use a `<div>` with `class="visually-hidden"`, `role="status"`, and `aria-live="polite"` (belt-and-suspenders). Place it in the DOM on page load (not dynamically created). Clear after 3 seconds.

- **Finding:** Visible text ("Copy" / "Copied!") is preferred over icon-only buttons. Visible text benefits all users — sighted users who don't recognize icons, touch users, and screen reader users. If icons are used, `aria-label` is mandatory, but visible text eliminates the need for it entirely.
- **Recommendation:** Use visible text labels. The text change from "Copy" to "Copied!" doubles as visual feedback for sighted users and state change for screen readers.

- **Finding:** Show-on-hover pattern (`opacity: 0` → `opacity: 1` on hover) excludes touch device users and users with motor impairments. Touch devices have no hover state. WCAG 1.4.13 (Content on Hover or Focus) applies to content that appears on hover.
- **Recommendation:** Make the button always visible as baseline (e.g., `opacity: 0.7`). Use `@media (hover: hover)` to apply the hide-until-hover pattern only on devices with hover capability. Always show on `:focus-visible` regardless.

- **Finding:** `<pre>` and `<code>` elements are natively semantic — screen readers announce them as "code". Adding ARIA roles would be redundant. However, long code blocks that overflow horizontally should be keyboard-scrollable.
- **Recommendation:** Add `tabindex="0"`, `role="region"`, and `aria-label="Code example"` to code block containers that have horizontal overflow. This allows keyboard users to scroll the code with arrow keys.

#### CSS/Design SME — Research

- **Finding:** Converting the Rouge theme to CSS custom properties for dark mode readiness would be premature. Dark mode (spec 013) will likely use a separate theme file (`github.dark`) rather than swapping individual token colors via custom properties. The existing `--color-code-bg` should be used for the code block background.
- **Recommendation:** Use the rougify-generated theme with concrete color values. Override only the background color with the existing `--color-code-bg` custom property. Add a comment noting dark mode will require a companion file.

- **Finding:** BEM naming should use `.code-block` as the block since the existing `.highlighter-rouge` class is Rouge-generated and shouldn't be targeted in project styles. The `.code-block` class gets added via JS when the copy button is injected.
- **Recommendation:** `.code-block` (block), `.code-block__copy` (button), `.code-block__copy--copied` (state modifier), `.code-block__line` (line wrapper if line numbers are implemented).

- **Finding:** The existing code/pre styles in `_base.scss` (lines 41-59) should move to the new `_code-blocks.scss` partial. This follows the project pattern of one partial per component and consolidates all code block styling.
- **Recommendation:** Create `_code-blocks.scss`, move existing code styles there, import it in `main.scss` after `_base`.

- **Finding:** The opacity hover transition needs two additional media query considerations: `@media (hover: hover)` for touch devices (only apply hide-on-no-hover to hover-capable devices) and `@media (prefers-reduced-motion: reduce)` to disable the transition animation.
- **Recommendation:** Default to always-visible button. Layer on the hover-reveal behavior with `@media (hover: hover)`. Remove transition in `prefers-reduced-motion: reduce`.

### Open Questions

- [x] Should line numbers be included in this feature? → Recommend making it optional/deferred — copy button and syntax theme deliver the most value with least complexity
- [x] Should the JS follow the existing IIFE + defer pattern or the code guidelines' ES module recommendation? → Follow existing pattern (IIFE + defer) for consistency with `nav-keyboard.js` and `search.js`

### References

- [MDN: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) — 95.68% global browser support
- [Sara Soueidan: Accessible notifications with ARIA Live Regions](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-1/)
- [Rouge GitHub Repository](https://github.com/rouge-ruby/rouge) — theme generation via `rougify style`
- [Drew Silcock: Proper Line Numbers with Jekyll](https://drew.silcock.dev/blog/proper-linenumbers/) — CSS counter approach

---

## Implementation

- [Notes captured during implementation — gotchas, surprises, workarounds]

---

## Testing

### Stage 1: Claude Verification & SME Audits

#### Accessibility SME — Testing Audit
- **Finding:** `aria-label` overrode visible text, creating WCAG 2.5.3 mismatch during "Copied!" state
- **Recommendation:** Remove `aria-label` — visible text "Copy"/"Copied!" is clear. **Fixed.**

- **Finding:** No `.catch()` on clipboard promise — failure gives no user feedback
- **Recommendation:** Add `.catch()` with status region announcement. **Fixed.**

- **Finding:** Comment syntax color (#6e7781 on #f5f5f5) measures ~4.19:1, just below 4.5:1 AA
- **Recommendation:** Standard GitHub theme trade-off. Not blocking.

- **Finding:** Overflowing code blocks not keyboard-scrollable (no `tabindex`)
- **Recommendation:** Deferred — current posts don't have extreme line lengths.

#### QA SME — Testing Audit
- **Finding:** Misleading SCSS comment said `.code-block` class added via JS (it isn't)
- **Recommendation:** Updated comment to describe actual approach. **Fixed.**

- **Finding:** Syntax theme lines 11-12 use single-line format from rougify generator
- **Recommendation:** Acceptable for generated code. No action needed.

- **Finding:** All other checks pass — JSDoc, BEM, custom properties, indentation, imports, build

### Stage 2: User Testing

- All 8 test items passed — syntax highlighting, copy button, feedback, inline code, responsive, keyboard

### Issues Found

- None — all user testing items passed

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
