# Feature: Search

> **Spec ID:** 009
> **Status:** Completed
> **Created:** 2026-02-24
> **Completed:** 2026-02-24

## Goal

Add client-side search so readers can find posts by title, content, tags, and categories. Uses Lunr.js to build a search index at build time and provides a dedicated search page with input and results display.

## Background

As the blog's content library grows, readers need a way to find specific posts beyond browsing tags, categories, or the homepage post list. Client-side search keeps the static site architecture intact — no backend or external service required. The roadmap also notes that completing search enables a WebSite `SearchAction` schema addition from spec 008 (SEO Foundation).

## Requirements

- [x] Build a JSON search index at Jekyll build time containing post titles, content, tags, categories, dates, URLs, and excerpts
- [x] Integrate Lunr.js for client-side full-text search
- [x] Create a dedicated search page at `/search/`
- [x] Search input with real-time results (no page reload)
- [x] Display results with post title (linked), date, excerpt/snippet, and tags
- [x] Handle empty query state, no results state, and loading state gracefully
- [x] Support searching by title, content, tags, and categories
- [x] Add search input form to the site navbar (inline, collapses with hamburger on mobile)
- [x] Smart navigation: 1 result navigates directly to post, multiple/zero results navigate to search page
- [x] Style the search page consistently with the existing theme using Bootstrap components
- [x] Ensure full keyboard accessibility (focus management, Enter to search)
- [x] Search works without JavaScript (graceful degradation — show a message)

## Constraints

- No server-side components — purely client-side using Lunr.js
- No external search services (Algolia, etc.)
- Must work with Jekyll's build pipeline (Liquid templates for index generation)
- Search index must not significantly impact page load (lazy-load or defer)
- Follow existing code conventions (BEM for CSS, JSDoc for JS, semantic HTML)
- Must be accessible (WCAG 2.2 AA)

## Acceptance Criteria

- [x] `/search/` page loads and displays a search input
- [x] Typing a query returns relevant results in real time (debounced)
- [x] Results include linked title, date, excerpt snippet, and tags
- [x] Searching by post title returns the correct post
- [x] Searching by tag name returns posts with that tag
- [x] Searching by content keywords returns relevant posts
- [x] Empty query shows an appropriate default state
- [x] No results query shows a helpful "no results" message
- [x] Navbar contains an inline search input on all pages
- [x] Search input collapses with hamburger menu on mobile
- [x] Entering a query with 1 result navigates directly to that post
- [x] Entering a query with multiple results navigates to `/search/?q=...`
- [x] `/search/` page auto-runs query from `?q=` param and displays results
- [x] Search page still works as standalone results page
- [x] Page is fully keyboard accessible
- [x] No-JS fallback message is displayed when JavaScript is disabled
- [x] Search index is generated at build time (exists in `_site/`)
- [x] Page passes HTML validation
- [x] Styles are consistent with the existing theme

## Affected Files

- `search-index.json` — new; Liquid-generated JSON index of all posts (build-time), includes isoDate field
- `search.html` — new; dedicated search page at `/search/`
- `assets/js/modules/search.js` — new; dual-mode search (navbar smart navigation + search page live results)
- `assets/css/_partials/_search.scss` — new; search component styles (BEM) + navbar input styles
- `assets/main.scss` — modified; import search partial
- `_includes/header.html` — modified; inline search form in navbar with progressive enhancement
- `_includes/schema/search-action.html` — new; WebSite SearchAction JSON-LD
- `_layouts/home.html` — modified; include SearchAction schema
- `_layouts/default.html` — modified; global Lunr.js CDN and search.js script tags

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-24 | 2026-02-24 | Lunr.js confirmed, 6 decisions documented, 8 implementation tasks defined |
| Implementation | 2026-02-24 | 2026-02-24 | Tasks 2.1–2.14: index, page, JS, SCSS, nav, schema, navbar form, smart nav |
| Testing | 2026-02-24 | 2026-02-24 | All criteria passed; 5 a11y issues found and fixed (tasks 3.5–3.9) |
| Acceptance | 2026-02-24 | 2026-02-24 | All requirements and acceptance criteria met |

## Completion Notes

Feature delivered as specified with enhancements beyond the original spec:

**Delivered:** Client-side search using Lunr.js with a JSON index built at Jekyll build time. Dual-mode search — inline navbar form with smart navigation (1 result goes directly to the post, multiple/zero results go to the search page) plus a full-featured `/search/` page with live debounced results.

**Deviations from original spec:**
- Navigation changed from a text link (`header_pages`) to an inline navbar form — better UX, immediate search access from any page
- Search JS and Lunr.js loaded globally (not just on search page) to support navbar search everywhere
- Added progressive enhancement: navbar form falls back to `GET /search/?q=` when JS is disabled
- Added `isoDate` field to search index for proper `<time datetime>` attributes

**Accessibility improvements from testing:**
- Distinct `aria-label` on navbar form landmark ("Quick search" vs "Site search")
- Removed redundant `aria-label` / `<label for>` on navbar input
- `:focus-visible` with transparent outline for Windows High Contrast Mode support
- Form submit event handler for AT compatibility

**Lessons learned:**
- Loading search JS globally has minimal cost (single XHR for index, ~8KB Lunr) but enables much better UX
- Progressive enhancement for search forms is simple (real `action` + `name` attrs) and should be default
