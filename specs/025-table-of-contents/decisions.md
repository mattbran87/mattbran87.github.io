# Decisions: Table of Contents

## Decision Log

### D1: Replace Series TOC with Simple Series Line

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** The spec's open question asked whether the series TOC should be simplified. The series TOC is a substantial component (prev/next nav, full part listing) occupying the zone between the post header and `.post__content`. With the article TOC being added inside `.post__content`, the user decided to simplify the series indicator.
- **Options Considered:**
  1. Keep series TOC as-is — both TOCs coexist in separate zones (Jekyll/A11y SMEs confirmed no conflict)
  2. Replace series TOC with a simple h3 line inside `.post__content` — "This is part {N} of the series {Series Title}" with the title linking to the series archive page
- **Decision:** Option 2 — replace with simple h3 line
- **Rationale:** User preference. The sidebar series widget (spec 033) now provides series discovery. The series archive page provides the full part listing. An inline h3 gives enough context without the overhead of a full TOC component. Simplifies the post layout.

---

### D2: JS Module Approach for Article TOC

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Three approaches were evaluated: Kramdown `{:toc}` (requires manual per-post placement), Liquid HTML parsing (brittle), and JavaScript ES module (robust, enables progressive enhancement).
- **Options Considered:**
  1. Kramdown `{:toc}` — manual, no conditional logic, no styling hooks
  2. Liquid HTML parsing — brittle string splitting, build-time complexity
  3. JS ES module — scans DOM, builds TOC, enables smooth-scroll and active heading
- **Decision:** Option 3 — JavaScript ES module
- **Rationale:** Full control over conditional display, styling, and progressive enhancement. Follows the project's ES module pattern (spec 022). ~50-80 lines, no external dependencies.

---

### D3: Minimum 3 Headings to Display TOC

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Need a threshold to avoid showing a TOC on short posts where it adds clutter rather than value.
- **Options Considered:**
  1. 2 headings — even short posts get navigation
  2. 3 headings — balance between value and clutter
  3. 4 headings — only longer posts
- **Decision:** 3 headings minimum
- **Rationale:** Posts with only 2 sections are short enough to scan without a TOC. 3+ indicates enough structure to benefit from in-page navigation.

---

### D4: Series Line Excluded from Article TOC

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** The series h3 is injected by the layout before `{{ content }}`. The JS module scans for headings to build the TOC.
- **Options Considered:**
  1. Include the series h3 in the TOC listing
  2. Exclude it — TOC only lists headings from the post's own markdown content
- **Decision:** Exclude it
- **Rationale:** The series line is contextual information about the post's place in a series, not a content section. The JS module should scope its heading scan to markdown-generated headings only (by starting from the first h2 or by marking the series h3 with a data attribute to skip it).

---

### D5: Clean Up Series TOC Dead Code in This Spec

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Removing the series TOC include from `post.html` leaves `_includes/series-toc.html` and `.series-toc` styles in `_series.scss` as dead code.
- **Options Considered:**
  1. Clean up in this spec — remove dead code since we're already touching these files
  2. Separate chore — leave for later
- **Decision:** Clean up in this spec
- **Rationale:** We're already modifying `post.html` and touching the series/TOC area. Removing dead code in the same feature avoids orphaned files.

---

### D6: Visual-Only Active Heading (No aria-current)

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** A11y SME advised that dynamically changing `aria-current` on scroll would be noisy for screen readers.
- **Options Considered:**
  1. Visual + `aria-current` — full semantic indication but noisy on scroll
  2. Visual-only CSS class — font-weight + color + left border (3 channels per WCAG 1.4.1)
- **Decision:** Visual-only CSS class (`article-toc__link--active`)
- **Rationale:** Avoids excessive screen reader announcements. Three visual channels (weight, color, border) satisfy WCAG 1.4.1 (Use of Color) without assistive technology noise.

---

### D7: CSS Smooth Scroll with Reduced Motion Override

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** TOC links scroll to headings. Need smooth scroll that respects accessibility preferences.
- **Options Considered:**
  1. CSS `scroll-behavior: smooth` with `prefers-reduced-motion: reduce` override
  2. JS `scrollTo` with motion media query check
- **Decision:** CSS approach
- **Rationale:** Simpler, no JS needed for scroll behavior. Native browser handling. Falls back to instant scroll when reduced motion is preferred.

---

### D8: Always-Visible TOC (Not Collapsible)

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** On mobile, the TOC could take significant vertical space. Collapsible vs. always visible.
- **Options Considered:**
  1. Collapsible with toggle button — saves space on mobile
  2. Always visible — simpler, better discoverability
- **Decision:** Always visible
- **Rationale:** Collapsible adds JS complexity and a discoverability problem. The TOC is compact (small font, tight spacing) and accurately reflects the post's structure.
