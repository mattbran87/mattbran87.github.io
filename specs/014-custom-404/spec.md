# Feature: Custom 404

> **Spec ID:** 014
> **Status:** Completed
> **Created:** 2026-02-24
> **Completed:** 2026-02-24

## Goal

Design a helpful, on-brand 404 error page that guides lost visitors back to useful content. Helpful tone, minimal content.

## Background

The site currently has a bare-bones 404 page (`404.html`) with inline styles, generic text ("Page not found :("), and no navigation assistance. It uses `layout: page` but has its own inline CSS that conflicts with the site's design system. With search (009) already built, the 404 page can direct users to search for what they were looking for. The page needs to be restyled to match the custom theme and use the project's design tokens.

## Requirements

- [x] Replace inline styles with BEM-based SCSS partial
- [x] Use the site's design tokens (CSS custom properties) for all styling
- [x] Display a clear "page not found" message with helpful tone
- [x] Provide a link to the homepage
- [x] Provide a link to search (`/search/`)
- [x] Responsive layout that works on mobile and desktop
- [x] Support both light and dark themes
- [x] Maintain `sitemap: false` and `noindex: true` front matter
- [x] Keep content minimal — no lengthy explanations

## Constraints

- Static HTML only — no server-side redirects or dynamic behavior
- No JavaScript required for the page to function (progressive enhancement)
- Must use existing layout system (`default` or `page` layout, or a new dedicated layout if warranted)
- Follow BEM naming, code guidelines, and accessibility standards
- No images or illustrations unless they add clear value

## Acceptance Criteria

- [x] 404 page renders with the site's header, footer, and navigation
- [x] Page content is centered and visually distinct (large heading, clear messaging)
- [x] Homepage link and search link are present and functional
- [x] Page works in both light and dark mode
- [x] Page passes basic accessibility checks (heading hierarchy, link text, contrast)
- [x] No inline styles — all styling via SCSS partial
- [x] HTML validates without errors
- [x] Page is excluded from sitemap and search indexing

## Affected Files

- `404.html` — rewrite content and markup
- `assets/css/_partials/_404.scss` — new SCSS partial for 404 styles
- `assets/main.scss` — import new partial

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-24 | 2026-02-24 | 3 SMEs, 13 findings, 5 decisions |
| Implementation | 2026-02-24 | 2026-02-24 | 2 commits, 3 files changed |
| Testing | 2026-02-24 | 2026-02-24 | Zero issues, user approved |
| Acceptance | 2026-02-24 | 2026-02-24 | All criteria met |

## Completion Notes

### Delivered
- Redesigned 404 page using the existing `page` layout with a new `.error-page` BEM component. Large decorative "404" (fluid `clamp()` sizing, `aria-hidden`), descriptive "Page not found" `<h1>`, helpful message, and text links to homepage and search. Centered title via `:has()` selector. Full light/dark mode support using existing design tokens. 3 files changed, 3 commits.

### Deviations
- Added centered page title (`:has(.error-page)` selector) during Testing per user feedback — not in original spec but a natural enhancement.

### What Went Well
- Existing design tokens and page layout covered all needs — zero new infrastructure required.
- Clean SME audits (0 issues from both Accessibility and QA) validated the research decisions.
- Small scope kept all four phases in a single session.

### What Didn't Go Well
- None — the feature was straightforward with no surprises.

### Lessons Learned
- For simple page features, `layout: page` with BEM content blocks is sufficient — a dedicated layout is unnecessary overhead.
- `:has()` is a clean way to scope page-specific styles without adding classes to shared layouts or using front matter flags.
