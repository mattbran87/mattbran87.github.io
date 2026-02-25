# Notes: Table of Contents

## SME Finding Tracker

All SME findings across every phase, with disposition. Add rows as findings come in.

| # | Phase | SME | Finding | Recommendation | Disposition |
|---|-------|-----|---------|----------------|-------------|
| S1 | Research | Jekyll | Kramdown auto-generates heading IDs; `auto_ids: true` is the default and already active | No config changes needed | Adopted |
| S2 | Research | Jekyll | Kramdown `{:toc}` requires manual placement in each post's Markdown — cannot be injected from layouts | Not suitable; use JS module approach instead | Adopted |
| S3 | Research | Jekyll | Series TOC occupies space between header and `.post__content`; article TOC goes inside `.post__content` — no placement conflict | Originally: keep as-is. User decision: replace with simple h3 line | Adopted > D1 |
| S4 | Research | Jekyll | `jekyll-toc` plugin exists but adds a dependency; Liquid HTML parsing is brittle | Use JS module approach — robust, enables progressive enhancement | Adopted |
| S5 | Research | A11y | TOC should be a `<nav>` with visible heading and `aria-labelledby` | Use `<nav aria-labelledby="article-toc-heading">` with visible `<h2>` | Adopted |
| S6 | Research | A11y | Standard anchor links provide all needed keyboard behavior | No custom keyboard handlers needed; inherit project focus styles | Adopted |
| S7 | Research | A11y | Active heading highlight should be visual-only, not `aria-current` | Use CSS class only; pair color with font-weight + left border for WCAG 1.4.1 | Adopted |
| S8 | Research | A11y | Smooth scroll must respect `prefers-reduced-motion` | Use CSS `scroll-behavior: smooth` with `prefers-reduced-motion: reduce` override | Adopted |
| S9 | Research | A11y | Headings need `tabindex="-1"` for focus management on fragment navigation | JS module adds `tabindex="-1"` dynamically to TOC target headings | Adopted |
| S10 | Research | A11y | Multiple `<nav>` landmarks need distinct accessible names | Series TOC has `aria-label`; article TOC uses `aria-labelledby` — distinct names | Adopted |
| S11 | Research | CSS | Block name `.article-toc` parallels `.series-toc`; elements follow BEM | `.article-toc__heading`, `__list`, `__item`, `__link`, `__link--active` | Adopted |
| S12 | Research | CSS | Visual design should match series TOC card pattern | Same bg/border/radius/padding tokens for design consistency | Adopted |
| S13 | Research | CSS | TOC should remain always visible, not collapsible | Collapsible adds complexity and hurts discoverability | Adopted |
| S14 | Research | CSS | Nested lists for h2/h3/h4 hierarchy with `padding-left` indentation | Nested `<ol>` with `padding-left: var(--spacing-lg)` per level | Adopted |
| S15 | Research | CSS | Active heading uses font-weight + color + left border (3 visual channels) | `font-weight: 600`, `color: var(--color-primary)`, `border-left: 2px solid` | Adopted |
| S16 | Research | CSS | JS inserts TOC before first `<h2>` in `.post__content` | DOM insertion, no CSS positioning tricks needed | Adopted |
| S17 | Research | CSS | New partial `_article-toc.scss`, add to theme transition list in `_base.scss` | Import after `_post` in `main.scss` | Adopted |
| S18 | Testing | A11y | Zero issues — heading hierarchy, landmarks, focus, color independence, reduced motion all correct | No changes needed | N/A |
| S19 | Testing | QA | `setActive` CSS selector uses string concat with heading IDs (low risk) | No fix needed; Kramdown IDs are safe | N/A |
| S20 | Testing | QA | `data-toc-exclude` documented but unused after series line changed to `<p>` | Keep as extensibility hook | N/A |

**Disposition values:** Adopted > D# (decision), Adopted > Task #, Deferred, Overridden by D#, Fixed in [commit], N/A

---

## Research & Planning

### Findings

#### Jekyll SME — Research

**Kramdown Heading IDs:**
- **Finding:** Jekyll 4.4.1 uses Kramdown as its default Markdown processor. Kramdown auto-generates `id` attributes on all headings (lowercase, hyphens, special characters stripped). The `auto_ids: true` option is the default and already active — no `kramdown:` section exists in `_config.yml`. Authors can override IDs with `## Heading {#custom-id}`.
- **Recommendation:** No configuration changes needed. The default behavior provides the anchor targets the TOC requires.

**Kramdown `{:toc}` Built-In:**
- **Finding:** Kramdown has a built-in TOC triggered by `* TOC placeholder\n{:toc}` in Markdown. However, it must be placed manually in each post's Markdown — it cannot be injected from a layout or include. It generates unstyled HTML with no wrapper, no BEM classes, no conditional logic. It cannot be controlled via front matter.
- **Recommendation:** Not suitable for this feature. The spec requires automatic generation, conditional display based on heading count, and themed styling. A JS module approach provides full control.

**Post Layout Structure:**
- **Finding:** The post layout has: (1) `<header>` with title/meta/share, (2) series TOC between header and content (only for series posts), (3) `<div class="post__content">` with `{{ content }}`, (4) post nav, (5) related posts. The series TOC and article TOC occupy different zones — no conflict.
- **Recommendation:** Keep the series TOC as-is. The article TOC goes inside `.post__content` before the first `<h2>`. Both serve different purposes (inter-post vs. intra-post navigation) and coexist cleanly.

**Jekyll TOC Plugins:**
- **Finding:** `jekyll-toc` gem exists (Liquid filter approach). Adds a dependency. Liquid HTML parsing is brittle. Per lessons-learned, prefer Liquid for multi-post loops but lightweight JS for single-page DOM work.
- **Recommendation:** Skip the plugin. A JS module (~50-80 lines) is more robust, enables progressive enhancement (smooth scroll, active heading), and follows the project's ES module pattern from spec 022.

#### Accessibility SME — Research

**Semantic Markup:**
- **Finding:** A TOC is a navigation region requiring `<nav>` with an accessible name. The list should be `<ol>` (headings follow sequential document order). Nested sub-items use nested `<ol>` elements.
- **Recommendation:** Use `<nav class="article-toc" aria-labelledby="article-toc-heading">` with a visible `<h2 id="article-toc-heading">Table of Contents</h2>`. Visible heading benefits all users; `aria-labelledby` satisfies WCAG 1.3.1 and creates a distinct landmark.

**Keyboard Navigation:**
- **Finding:** Standard anchor links provide all needed keyboard behavior (Tab to reach, Enter to activate). No custom handling needed.
- **Recommendation:** Inherit the project's `:focus-visible` ring from `_base.scss`. No ARIA widget roles — this is a list of links, not a menu. (WCAG 2.1.1, 2.4.7)

**Active Heading Highlighting:**
- **Finding:** Dynamically setting `aria-current` via scroll would be noisy for screen readers — unlike the series TOC's static `aria-current="page"`, a scroll-driven active state changes constantly.
- **Recommendation:** Use a visual-only CSS class (`article-toc__link--active`) without `aria-current`. Pair color with font-weight and left border to avoid WCAG 1.4.1 (Use of Color) violation. No assistive technology announcements on scroll.

**Smooth Scroll:**
- **Finding:** Smooth scrolling is animation from interaction. WCAG 2.3.3 requires respecting `prefers-reduced-motion`.
- **Recommendation:** Use CSS `scroll-behavior: smooth` with `@media (prefers-reduced-motion: reduce) { scroll-behavior: auto; }`. CSS-only approach preferred over JS `scrollTo`.

**Screen Reader / Multiple Nav Landmarks:**
- **Finding:** On a series post, the page will have: site nav, series nav (`aria-label="Series: ..."`), article TOC nav (`aria-labelledby="article-toc-heading"`), post nav (`aria-label="Post navigation"`). Each needs a distinct accessible name.
- **Recommendation:** The distinct labeling approach already handles this. Four navigation landmarks is acceptable for a content-rich page. (WCAG 1.3.6, 2.4.1)

**Focus Management:**
- **Finding:** Headings are not natively focusable. When a TOC link navigates to `#heading-id`, focus should move to the heading for screen reader announcement.
- **Recommendation:** Add `tabindex="-1"` to headings that are TOC targets. The JS module should add this dynamically so only TOC-targeted headings are affected. (WCAG 2.4.3)

#### CSS/Design SME — Research

**BEM Naming:**
- **Finding:** `.series-toc` is the established TOC block pattern. The article TOC is a standalone component, not a child of `.post`.
- **Recommendation:** Use `.article-toc` as the block. Elements: `__heading`, `__list`, `__item`, `__link`. Modifier: `__link--active`.

**Visual Design:**
- **Finding:** The series TOC uses `var(--color-bg-alt)` background, `var(--color-border)` border, `var(--border-radius-badge)` radius, `var(--spacing-lg)` padding.
- **Recommendation:** Match the series TOC card pattern for design consistency. Same tokens, differentiated by content (heading text, list structure) rather than visual treatment.

**Responsive Behavior:**
- **Finding:** Post content is constrained to `42rem`. The TOC fits within this on all viewports.
- **Recommendation:** Keep the TOC always visible. Collapsible adds JS complexity and hurts discoverability. Compact styling (small font, tight spacing) keeps it manageable even with many entries.

**Nested List Indentation:**
- **Finding:** h2 = top level, h3 = nested one level, h4 = nested two levels. Series TOC uses flat `<ol>`.
- **Recommendation:** Nested `<ol>` elements with `padding-left: var(--spacing-lg)` per level. Remove default list-style; use indentation for hierarchy.

**Active Heading Styling:**
- **Finding:** Per A11y SME, visual-only indicator with multiple channels.
- **Recommendation:** `font-weight: 600`, `color: var(--color-primary)`, and `border-left: 2px solid var(--color-primary)` on the active item. Instant transition (no animation) to avoid scroll jank.

**Placement:**
- **Finding:** JS module handles insertion dynamically.
- **Recommendation:** Insert before the first `<h2>` in `.post__content`. `margin-bottom: var(--spacing-xl)` separates it from the first heading.

**SCSS Organization:**
- **Finding:** One partial per component in `assets/css/_partials/`.
- **Recommendation:** Create `_article-toc.scss`, import after `_post` in `main.scss`. Add `.article-toc` to theme transition list in `_base.scss`.

### Open Questions

- [x] Should the existing series TOC be replaced with a simpler link to the series archive page? **Answer: Yes — replace with h3 line: "This is part {N} of the series {Title}" (D1)**
- [x] Pure CSS or JavaScript-enhanced (smooth scroll, active heading highlight)? **Answer: JavaScript ES module with CSS smooth-scroll and visual-only active heading (D2)**
- [x] Minimum heading count threshold to display TOC (2? 3?)? **Answer: 3 headings minimum (D3)**

### References

- Kramdown auto IDs: https://kramdown.gettalong.org/converter/html.html#auto-ids
- WAI-ARIA landmark regions: https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/
- WCAG 2.4.1 Bypass Blocks, 1.3.1 Info and Relationships, 1.4.1 Use of Color

---

## Implementation

- [Notes captured during implementation — gotchas, surprises, workarounds]

---

## Testing

### Stage 1: Claude Verification & SME Audits

All 14 acceptance criteria verified — PASS.

#### Accessibility SME — Testing Audit
- **Finding:** Zero accessibility issues. Heading hierarchy correct (h1 title → h2 TOC heading → h2+ content headings, series line is `<p>`). Landmark labeling distinct across all `<nav>` elements. Focus management via `tabindex="-1"` on target headings. Active indicator uses 3 visual channels (WCAG 1.4.1). Reduced motion respected.
- **Recommendation:** No changes needed.

#### QA SME — Testing Audit
- **Finding (Warning):** `setActive` builds CSS selector via string concatenation with heading IDs. Kramdown IDs are safe in practice but no `CSS.escape()` guard. Low risk.
- **Recommendation:** No fix needed — Kramdown generates safe IDs (lowercase, hyphens, alphanumeric). Note for future reference.
- **Finding (Info):** `data-toc-exclude` mechanism documented in toc.js but no element currently uses it (series line was changed to `<p>`).
- **Recommendation:** Keep as extensibility hook — harmless and useful if future headings need exclusion.

### Stage 2: User Testing

- [User testing observations, pass/fail results]

### Issues Found

- [Issues documented with steps to reproduce, severity, and fix status]

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
