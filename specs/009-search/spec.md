# Feature: Search

> **Spec ID:** 009
> **Status:** Research
> **Created:** 2026-02-24
> **Completed:** —

## Goal

Add client-side search so readers can find posts by title, content, tags, and categories. Uses Lunr.js to build a search index at build time and provides a dedicated search page with input and results display.

## Background

As the blog's content library grows, readers need a way to find specific posts beyond browsing tags, categories, or the homepage post list. Client-side search keeps the static site architecture intact — no backend or external service required. The roadmap also notes that completing search enables a WebSite `SearchAction` schema addition from spec 008 (SEO Foundation).

## Requirements

- [ ] Build a JSON search index at Jekyll build time containing post titles, content, tags, categories, dates, URLs, and excerpts
- [ ] Integrate Lunr.js for client-side full-text search
- [ ] Create a dedicated search page at `/search/`
- [ ] Search input with real-time results (no page reload)
- [ ] Display results with post title (linked), date, excerpt/snippet, and tags
- [ ] Handle empty query state, no results state, and loading state gracefully
- [ ] Support searching by title, content, tags, and categories
- [ ] Add search input form to the site navbar (inline, collapses with hamburger on mobile)
- [ ] Smart navigation: 1 result navigates directly to post, multiple/zero results navigate to search page
- [ ] Style the search page consistently with the existing theme using Bootstrap components
- [ ] Ensure full keyboard accessibility (focus management, Enter to search)
- [ ] Search works without JavaScript (graceful degradation — show a message)

## Constraints

- No server-side components — purely client-side using Lunr.js
- No external search services (Algolia, etc.)
- Must work with Jekyll's build pipeline (Liquid templates for index generation)
- Search index must not significantly impact page load (lazy-load or defer)
- Follow existing code conventions (BEM for CSS, JSDoc for JS, semantic HTML)
- Must be accessible (WCAG 2.2 AA)

## Acceptance Criteria

- [ ] `/search/` page loads and displays a search input
- [ ] Typing a query returns relevant results in real time (debounced)
- [ ] Results include linked title, date, excerpt snippet, and tags
- [ ] Searching by post title returns the correct post
- [ ] Searching by tag name returns posts with that tag
- [ ] Searching by content keywords returns relevant posts
- [ ] Empty query shows an appropriate default state
- [ ] No results query shows a helpful "no results" message
- [ ] Navbar contains an inline search input on all pages
- [ ] Search input collapses with hamburger menu on mobile
- [ ] Entering a query with 1 result navigates directly to that post
- [ ] Entering a query with multiple results navigates to `/search/?q=...`
- [ ] `/search/` page auto-runs query from `?q=` param and displays results
- [ ] Search page still works as standalone results page
- [ ] Page is fully keyboard accessible
- [ ] No-JS fallback message is displayed when JavaScript is disabled
- [ ] Search index is generated at build time (exists in `_site/`)
- [ ] Page passes HTML validation
- [ ] Styles are consistent with the existing theme

## Affected Files

- `search-index.json` — new; Liquid-generated JSON index of all posts (build-time)
- `search.html` — new; dedicated search page at `/search/`
- `assets/js/modules/search.js` — new; client-side search logic (Lunr.js integration, input handling, result rendering)
- `assets/css/_partials/_search.scss` — new; search component styles (BEM)
- `assets/main.scss` — modified; import search partial
- `_config.yml` — modified; add `search.html` to `header_pages`
- `_includes/schema/search-action.html` — new; WebSite SearchAction JSON-LD
- `_layouts/home.html` — modified; include SearchAction schema

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-24 | 2026-02-24 | Lunr.js confirmed, 6 decisions documented, 8 implementation tasks defined |
| Implementation | 2026-02-24 | — | |
| Testing | — | — | |
| Acceptance | — | — | |

## Completion Notes

[Filled in when status is set to Completed. Summary of what was delivered, any deviations from the original spec, and lessons learned.]
