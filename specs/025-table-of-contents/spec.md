# Feature: Table of Contents

> **Spec ID:** 025
> **Status:** Completed
> **Created:** 2026-02-25
> **Completed:** 2026-02-25

## Goal

Auto-generate a table of contents from heading elements (h2–h4) within blog posts, providing in-page navigation for longer articles. Replace the existing series TOC component with a simpler inline series indicator.

## Background

Longer tutorial and technical posts benefit from a table of contents that lets readers jump to specific sections. The site previously had a series TOC component (`series-toc.html`) for multi-part series navigation, occupying the zone between the post header and content. During research, the decision was made to replace it with a simple paragraph line ("This is part N of the series {Title}") inside the post content area, since the sidebar series widget (spec 033) and series archive pages now handle series discovery. The article TOC and series line coexist inside `.post__content`.

## Requirements

- [x] Auto-generate TOC from h2–h4 headings in post content via JavaScript ES module
- [x] Place TOC inside `.post__content`, before the first h2 in the markdown content
- [x] Each TOC entry links to the corresponding heading via Kramdown auto-generated anchor IDs
- [x] TOC only displays when the post has 3+ headings (h2–h4)
- [x] TOC can be disabled per post via `toc: false` in front matter
- [x] Replace series TOC with a `<p>` line: "This is part {N} of the series {Series Title}" (title links to series archive page)
- [x] Series line is excluded from the article TOC listing (it's a `<p>`, not a heading)
- [x] Remove dead series TOC code (`_includes/series-toc.html`, `.series-toc` styles)
- [x] Smooth scroll to headings, respecting `prefers-reduced-motion`
- [x] Active heading highlight (visual-only, no `aria-current`)
- [x] Styled consistently with the site theme (card pattern matching series TOC)

## Constraints

- Must work with Jekyll's Kramdown markdown processor (auto-generates heading IDs by default)
- No external JavaScript libraries — lightweight ES module only
- Must not break existing post layouts, series badges on post cards, or reading time display
- Respect `prefers-reduced-motion` for smooth scroll
- Headings targeted by TOC must receive `tabindex="-1"` for focus management

## Acceptance Criteria

- [x] Posts with 3+ headings display a TOC before the first h2
- [x] Posts with fewer than 3 headings do not display a TOC
- [x] `toc: false` in front matter suppresses the TOC
- [x] TOC links scroll to the correct heading and move focus to it
- [x] Active heading is visually highlighted in the TOC as the user scrolls
- [x] Smooth scroll is disabled when `prefers-reduced-motion: reduce` is active
- [x] Series posts display the series line with correct part number and linked series title
- [x] Series line does not appear in the article TOC
- [x] Series TOC component is fully removed (include, styles)
- [x] TOC is accessible: `<nav>` with visible heading, `aria-labelledby`, keyboard navigable
- [x] TOC is responsive and works on mobile viewports
- [x] TOC has nested list structure reflecting h2/h3/h4 hierarchy
- [x] Dark mode: TOC transitions smoothly between themes
- [x] No regressions to post layout, series badges on post cards, sidebar series widget, or reading time

## Affected Files

- `_layouts/post.html` — remove series TOC include, add series `<p>` line, add `data-toc` attribute
- `_includes/series-toc.html` — deleted (dead code)
- `assets/js/modules/toc.js` — new ES module for TOC generation
- `assets/js/main.js` — import TOC module
- `assets/css/_partials/_article-toc.scss` — new partial for TOC styles
- `assets/css/_partials/_post.scss` — add `.post__series-line` styles
- `assets/css/_partials/_series.scss` — removed `.series-toc` block styles (kept badge/archive/card)
- `assets/css/_partials/_base.scss` — replaced `.series-toc` with `.article-toc` in theme transition list
- `assets/css/main.scss` — import `_article-toc` partial

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-25 | 2026-02-25 | Jekyll, A11y, CSS SMEs consulted; 8 decisions recorded |
| Implementation | 2026-02-25 | 2026-02-25 | 7 tasks, 9 commits; series line changed from h3 to p during self-review |
| Testing | 2026-02-25 | 2026-02-25 | 14/14 criteria pass, A11y clean, QA clean, user testing 7/7 |
| Acceptance | 2026-02-25 | 2026-02-25 | All criteria met, merged to master |

## Completion Notes

### Delivered
- Auto-generated article TOC via JS ES module (`toc.js`, ~234 lines) that scans `.post__content` for h2–h4 headings, builds a nested `<nav>` with `<ol>` lists, and inserts before the first h2. Includes IntersectionObserver-based active heading highlight, smooth scroll with reduced motion respect, and `tabindex="-1"` focus management.
- Replaced the series TOC component with a simple `<p>` series indicator line inside `.post__content`.
- Cleaned up all dead series TOC code (include file, 100+ lines of SCSS, theme transition entry).

### Deviations
- Series indicator changed from `<h3>` (user's initial request) to `<p>` during self-review — the h3 created a heading hierarchy violation (h1 → h3 → h2). User approved the change.
- No `_includes/toc.html` was needed — the JS module creates the entire `<nav>` dynamically, which is cleaner for progressive enhancement (no empty container if JS fails).

### What Went Well
- SME consultations during Research produced clear decisions (D1–D8) that made Implementation straightforward — no mid-build surprises.
- Self-review caught the heading hierarchy issue before Testing, avoiding a round-trip.
- The card-style design (matching series TOC tokens) required zero new custom properties.

### What Didn't Go Well
- The TOC heading h2 was overridden by `.post__content h2` styles — required a specificity fix after initial styling commit. Could have been anticipated during CSS SME research.

### Lessons Learned
- When placing JS-generated elements inside styled containers (`.post__content`), check for inherited element-type selectors (e.g., `.post__content h2`) that may override component styles. Scope component selectors to win specificity.
