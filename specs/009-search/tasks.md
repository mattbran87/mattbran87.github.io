# Tasks: Search

> **Status:** Completed

## Task Breakdown

### Phase 1: Research & Planning

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Research Lunr.js integration patterns for Jekyll | Done | See notes.md — Lunr.js 2.3.9, Liquid JSON index, CDN loading |
| 1.2 | Audit current site structure and theme for integration points | Done | See notes.md — layouts, includes, JS/CSS patterns documented |
| 1.3 | Document decisions and break down implementation tasks | Done | 6 decisions recorded, 8 implementation tasks defined |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Create search index JSON template | Done | `search-index.json` — Liquid-generated, all 4 posts indexed |
| 2.2 | Create search page | Done | `search.html` — input, results area, states, sidebar |
| 2.3 | Write search JavaScript | Done | `assets/js/modules/search.js` — IIFE, debounce, XHR, ?q= param |
| 2.4 | Create search SCSS partial | Done | `assets/css/_partials/_search.scss` — BEM, CSS custom properties |
| 2.5 | Import search partial in main.scss | Done | Added `@import "_partials/search"` |
| 2.6 | Add search page to site navigation | Done | Added `search.html` to `header_pages` in `_config.yml` |
| 2.7 | Add no-JavaScript fallback | Done | `<noscript>` block with tag/homepage links |
| 2.8 | Add WebSite SearchAction schema | Done | `_includes/schema/search-action.html` on homepage |
| 2.9 | Add search form to navbar | Done | `_includes/header.html` — inline Bootstrap form after nav links |
| 2.10 | Rewrite search.js for navbar + smart navigation | Done | Dual-mode: navbar submit + search page results |
| 2.11 | Move Lunr.js and search.js scripts to default.html | Done | Loaded globally via `_layouts/default.html` |
| 2.12 | Update search page for results-only mode | Done | Removed script tags from `search.html` |
| 2.13 | Remove search.html from header_pages | Done | `_config.yml` — inline form replaces nav link |
| 2.14 | Update search SCSS for navbar input styling | Done | `.navbar-search__input` styles added |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify all acceptance criteria | Done | All 19 criteria passed |
| 3.2 | Test edge cases | Done | Code review: empty queries, malformed Lunr queries, index not ready |
| 3.3 | Test accessibility | Done | Audit found 5 issues, all fixed (see notes.md) |
| 3.4 | Validate HTML and build output | Done | No duplicate IDs, no missing attrs, clean build |
| 3.5 | Fix: Add aria-label to navbar form | Done | `aria-label="Quick search"` distinguishes landmarks |
| 3.6 | Fix: Remove redundant aria-label from input | Done | Kept `<label for>`, removed `aria-label` |
| 3.7 | Fix: Progressive enhancement for navbar form | Done | `action="/search/"` + `name="q"` + submit handler |
| 3.8 | Fix: Focus styles for High Contrast Mode | Done | `:focus-visible` + transparent outline |
| 3.9 | Fix: Add datetime to time elements | Done | `isoDate` field in index, `datetime` attr in JS |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review against spec requirements | Done | All requirements and acceptance criteria met |
| 4.2 | Update documentation and mark complete | Done | spec.md, tasks.md, checklist.md, notes.md updated |

## Summary

- **Total tasks:** 28
- **Completed:** 28
- **Remaining:** 0
