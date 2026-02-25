# Notes: Custom 404

## SME Finding Tracker

All SME findings across every phase, with disposition. Add rows as findings come in.

| # | Phase | SME | Finding | Recommendation | Disposition |
|---|-------|-----|---------|----------------|-------------|
| S1 | Research | Jekyll | `permalink: /404.html` is the required convention for GitHub Pages custom 404 | Keep current permalink; no changes needed | Adopted |
| S2 | Research | Jekyll | `jekyll-seo-tag` respects `noindex: true` and outputs `<meta name="robots" content="noindex">` | Keep `noindex: true` in front matter | Adopted |
| S3 | Research | Jekyll | Relative URLs work correctly on 404 pages when using `relative_url` filter | Use `relative_url` filter for all internal links | Adopted |
| S4 | Research | Jekyll | `layout: page` wraps in `.container > article.page` — suitable for 404 since the page layout is minimal and content area is flexible | Keep `layout: page`; no custom layout needed | Adopted → D1 |
| S5 | Research | Accessibility | `role="alert"` is too aggressive for 404 — user navigated here intentionally, not an unexpected error | Do not use `role="alert"` or any alert role; standard landmarks are sufficient | Adopted |
| S6 | Research | Accessibility | "Page not found" should be the `<h1>`, not the number "404" — screen readers need descriptive heading | Use "Page not found" as `<h1>`, display "404" as decorative/visual element | Adopted → D2 |
| S7 | Research | Accessibility | Navigation links don't need a `<nav>` — too few links to warrant a landmark; simple paragraph with links is appropriate | Use a simple `<p>` with inline links, not `<nav>` | Adopted |
| S8 | Research | Accessibility | "404" as visual display should use `aria-hidden="true"` to avoid confusing screen reader announcement | Add `aria-hidden="true"` to the decorative 404 number | Adopted |
| S9 | Research | CSS/Design | BEM block name `.error-page` is the most semantic and future-proof (works for any error page) | Use `.error-page` as the BEM block | Adopted → D3 |
| S10 | Research | CSS/Design | Large 404 display: use `clamp()` for fluid sizing — `clamp(4rem, 15vw, 8rem)` gives good range | Use `clamp()` for the 404 display number | Adopted |
| S11 | Research | CSS/Design | Horizontal centering with standard page flow is better than viewport centering — avoids awkward spacing with header/footer | Center horizontally via `text-align: center`, keep standard page flow | Adopted → D4 |
| S12 | Research | CSS/Design | Existing design tokens are sufficient — no new custom properties needed | Use existing tokens only | Adopted |
| S13 | Research | CSS/Design | Links as regular styled text links, not buttons — keeps the page minimal and consistent with site tone | Use standard text links with existing link colors | Adopted → D5 |
| S14 | Testing | Accessibility | No WCAG violations — heading hierarchy, aria-hidden, link text, landmarks all correct | No changes needed | N/A — clean audit |
| S15 | Testing | QA | No convention violations — BEM, custom properties, indentation, front matter, build all clean | No changes needed | N/A — clean audit |

---

## Research & Planning

### Findings

#### Jekyll SME — Research
- **Finding:** `permalink: /404.html` is the required convention for GitHub Pages. When a page is not found, GitHub Pages serves the file at `/404.html`. This is a platform convention, not a Jekyll feature — Jekyll just needs to produce the file at that path. The current front matter is correctly configured.
- **Recommendation:** Keep the existing permalink. No changes needed.

- **Finding:** `jekyll-seo-tag` (v2.8.0) respects the `noindex: true` front matter variable. When present, it outputs `<meta name="robots" content="noindex">` in the `<head>`, which tells search engines not to index the page. Combined with `sitemap: false` (which `jekyll-sitemap` respects), the 404 page will be excluded from both the sitemap and search engine indexing.
- **Recommendation:** Keep both `sitemap: false` and `noindex: true` in front matter.

- **Finding:** Relative URLs on 404 pages work correctly when using the `relative_url` Liquid filter. Since the 404 page is served at `/404.html` (root level), paths like `{{ '/' | relative_url }}` and `{{ '/search/' | relative_url }}` resolve correctly. No special handling needed.
- **Recommendation:** Use `relative_url` filter for all internal links on the 404 page, consistent with the rest of the site.

- **Finding:** The existing `layout: page` wraps content in `.container > article.page > h1.page__title + div.page__content`. This provides the site header, footer, navigation, and consistent page structure. For a minimal 404 page, this is sufficient — the content area is flexible enough to accommodate centered text. A dedicated `_layouts/404.html` would duplicate most of the page layout for minimal gain.
- **Recommendation:** Keep `layout: page`. Style the 404 content within `.page__content` using a BEM block. The `page__title` can serve as the accessible heading ("Page not found"), and the 404 number can be a decorative visual element inside the content area.

#### Accessibility SME — Research
- **Finding:** `role="alert"` is inappropriate for a 404 page. Alert roles trigger immediate screen reader announcements and are meant for unexpected, time-sensitive errors (form validation failures, connection errors). A 404 page is a standard navigation outcome — the user clicked a link or typed a URL and arrived at a page. The standard `<main>` landmark (already provided by the layout) is sufficient.
- **Recommendation:** No special ARIA roles needed. The existing layout provides `<main>`, `<header>`, `<nav>`, and `<footer>` landmarks.

- **Finding:** The `<h1>` should be descriptive — "Page not found" — not the number "404". Screen readers announce headings to help users understand the page. "404" alone is meaningless to many users. The number "404" can appear as a large decorative visual element but should be hidden from screen readers with `aria-hidden="true"`.
- **Recommendation:** Use `title: "Page not found"` in front matter (which the page layout renders as `<h1>`). Display "404" as a decorative `<p>` or `<span>` with `aria-hidden="true"`.

- **Finding:** With only 2 navigation links (homepage, search), a `<nav>` element is unnecessary and would add noise to the landmarks list. Simple paragraph text with inline links is the most appropriate pattern.
- **Recommendation:** Use `<p>` elements with descriptive link text. Avoid wrapping in `<nav>`. Ensure link text is descriptive (e.g., "return to the homepage" or "try searching", not generic "click here").

- **Finding:** Relevant WCAG criteria: 2.4.2 (Page Titled — title should say "Page not found"), 2.4.6 (Headings and Labels — descriptive `<h1>`), 1.4.3 (Contrast Minimum), 2.4.7 (Focus Visible), 1.3.1 (Info and Relationships — proper heading hierarchy).
- **Recommendation:** The page layout handles most of these. Ensure the front matter `title` is set to "Page not found" for the browser tab/title bar.

#### CSS/Design SME — Research
- **Finding:** `.error-page` is the best BEM block name — semantic, descriptive, and future-proof if the site ever needs other error pages (500, 403). Structure: `.error-page` (block), `.error-page__code` (the "404" display number), `.error-page__message` (the helpful text), `.error-page__actions` (the links section).
- **Recommendation:** Use `.error-page` as the BEM block with `__code`, `__message`, and `__actions` elements.

- **Finding:** For the large "404" display, `clamp(4rem, 15vw, 8rem)` provides excellent fluid scaling — 4rem minimum on small screens, scaling up to 8rem on large screens. Use `--headings-font-weight: 700` and `--color-muted` to make it visually prominent but not competing with the heading.
- **Recommendation:** Use `clamp()` for the display number. Color it with `--color-muted` so it reads as decorative rather than primary content.

- **Finding:** Vertical centering (flexbox on `<main>`) creates awkward visual results when the header and footer are present — the "center" shifts based on header height, and on short viewports the content can overlap the footer. Standard page flow with horizontal centering and generous top spacing is more predictable.
- **Recommendation:** Use `text-align: center` on the block. Let the standard page flow (with the layout's existing `py-4 py-md-5` on `<main>`) handle vertical spacing. Add `--spacing-xl` or `--spacing-xxl` top margin to the error-page block for visual breathing room.

- **Finding:** Existing design tokens cover all needs — `--color-muted` for the 404 number, `--color-text` and `--color-heading` for text, `--color-link` for links, spacing scale for margins. No new tokens required.
- **Recommendation:** Use existing tokens only. This keeps the 404 page fully theme-aware with zero additional maintenance.

- **Finding:** Regular text links (not buttons) match the minimal, helpful tone. Buttons would make the page feel like a call-to-action landing page. Text links keep it understated. Use the existing link styles with `--color-link` / `--color-link-hover`.
- **Recommendation:** Use standard text links within paragraph text, styled by the existing base link rules.

### Open Questions

- [x] Layout choice — resolved: keep `layout: page` (D1)
- [x] Heading approach — resolved: "Page not found" as `<h1>`, "404" as decorative (D2)
- [x] Link styling — resolved: text links, not buttons (D5)

### References

- [GitHub Pages custom 404](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)
- [jekyll-seo-tag noindex support](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/usage.md)
- [WCAG 2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html)

---

## Implementation

- No issues encountered. Straightforward implementation with 2 commits.

---

## Testing

### Stage 1: Claude Verification & SME Audits

**Acceptance Criteria Verification:**

| # | Criterion | Result |
|---|-----------|--------|
| AC1 | Renders with header, footer, nav | Pass |
| AC2 | Centered, visually distinct | Pass |
| AC3 | Homepage + search links functional | Pass |
| AC4 | Light and dark mode | Pass |
| AC5 | Accessibility (headings, links, contrast) | Pass |
| AC6 | No inline styles | Pass |
| AC7 | HTML validates | Pass |
| AC8 | Excluded from sitemap/indexing | Pass — `sitemap: false`, `noindex: true`, robots meta verified, 0 hits in sitemap.xml |

#### Accessibility SME — Testing Audit
- **Finding:** Heading hierarchy is correct — single `<h1>` "Page not found" with no skipped levels. The decorative "404" uses `aria-hidden="true"` correctly. Link text is descriptive ("Return to the homepage", "try searching for it"). Landmark structure provided by the page layout (`<main>`, `<header>`, `<nav>`, `<footer>`) is complete. Page title reads "Page not found | AI Code Blog" (WCAG 2.4.2). No WCAG 2.2 violations found.
- **Recommendation:** No changes needed. Implementation follows all accessibility recommendations from Research phase.

#### QA SME — Testing Audit
- **Finding:** BEM naming is correct (`.error-page`, `__code`, `__message`, `__actions` — no nested elements, no missing modifiers). SCSS partial uses only CSS custom properties (Layer 2), no SCSS `$variables`. 4-space indentation throughout. File naming follows convention (`_404.scss`). Front matter has all required fields. `relative_url` filter used correctly on both links. Import placed at end of project partials in `main.scss`. Build completes with zero warnings.
- **Recommendation:** No changes needed. 0 errors, 0 warnings, 0 info items.

### Stage 2: User Testing

- [User testing observations, pass/fail results]

### Issues Found

- No issues found during Stage 1.

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
