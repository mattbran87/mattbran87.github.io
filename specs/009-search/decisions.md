# Decisions: Search

## Decision Log

### D1: Search Library

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Need a client-side full-text search library for a Jekyll static site
- **Options Considered:**
  1. **Lunr.js** — ~8 KB, stable, immutable indexes, excellent Jekyll ecosystem, unmaintained since 2020
  2. **MiniSearch** — ~8 KB, actively maintained, mutable indexes, smaller community
  3. **Fuse.js** — ~12 KB, maintained, fuzzy-only (not true full-text search), less relevant results for keyword search
  4. **Pagefind** — chunked loading, requires post-build CLI step, overkill for small sites
- **Decision:** Lunr.js
- **Rationale:** Specified in roadmap, battle-tested, tiny bundle, extensive Jekyll documentation. The library is stable and feature-complete — inactive maintenance is acceptable for a library that doesn't need updates. MiniSearch is noted as a drop-in replacement if needed later.

---

### D2: Search Index Generation

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Need to generate a searchable JSON index from Jekyll posts at build time
- **Options Considered:**
  1. **Liquid-generated JSON file** — A `.json` file with YAML front matter processed by Jekyll at build time. No plugin needed, full control over fields.
  2. **Inline script data** — Embed post data directly in a `<script>` tag on the search page. No separate fetch, but increases page size and can't be cached independently.
  3. **jekyll-lunr-js-search plugin** — Auto-generates index. Marked as UNSUPPORTED on GitHub, unmaintained.
- **Decision:** Liquid-generated JSON file
- **Rationale:** No plugin dependency, works on GitHub Pages, simple to maintain, cacheable independently from the search page. Standard pattern in the Jekyll community.

---

### D3: Lunr.js Loading Strategy

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** How to load the Lunr.js library — CDN vs. vendored locally
- **Options Considered:**
  1. **CDN (jsDelivr)** — `https://cdn.jsdelivr.net/npm/lunr@2.3.9/lunr.min.js` with `defer`. Fast, cached across sites, no local file to maintain.
  2. **Vendored locally** — Copy `lunr.min.js` to `assets/vendor/lunr/`. Self-contained, no external dependency at runtime.
- **Decision:** CDN (jsDelivr)
- **Rationale:** Simpler setup, likely already cached in user's browser from other sites. The library is pinned to 2.3.9 so the CDN URL is stable. If offline support becomes a concern, can switch to vendored later. Bootstrap JS is already loaded from a local vendor path, but Bootstrap is much larger and required on every page — Lunr.js is only needed on the search page.

---

### D4: Search UX Pattern (Revised)

- **Date:** 2026-02-24 (revised 2026-02-24)
- **Phase:** Implementation
- **Context:** How search should behave — instant filtering vs. smart navigation
- **Options Considered:**
  1. **Instant/live search** — Results update as user types, debounced. Only works on dedicated search page.
  2. **Submit-based with smart navigation** — User types in navbar input and presses Enter. If exactly 1 result, navigate directly to that post. If multiple or zero results, navigate to `/search/?q=...` to show full results.
- **Decision:** Submit-based with smart navigation from navbar
- **Rationale:** Moving search into the navbar means it must work on every page. Live search with a dropdown is complex and heavy for a navbar input. Submit-based with smart navigation gives a fast path (1 result = direct navigation) while preserving the full results experience on the search page. The search page itself retains live/debounced search for browsing results.

---

### D5: Search Page Layout

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Whether to create a custom search layout or reuse the existing page layout
- **Options Considered:**
  1. **Custom `search.html` layout** — Full control over the search page structure, but adds a new layout file.
  2. **Reuse `page.html` layout** — Search page uses existing page layout with search-specific HTML in the page content area. Simpler, consistent with other pages.
  3. **Dedicated `search.html` page file** — A root-level page (like `tags.html`) using `default` layout directly, with all search markup inline.
- **Decision:** Root-level `search.html` page using `default` layout directly
- **Rationale:** Matches the pattern used by `tags.html` and `series.html` — standalone pages with custom markup that don't fit the generic `page.html` template. Avoids creating a new layout for a single-use page. The search page needs custom structure (input, results area, states) that would fight against the `page.html` article wrapper.

---

### D6: Navigation Integration (Revised)

- **Date:** 2026-02-24 (revised 2026-02-24)
- **Phase:** Implementation
- **Context:** How to integrate search into the site navigation
- **Options Considered:**
  1. **Add to `header_pages`** — Text link in navbar that navigates to `/search/` page.
  2. **Inline form in navbar** — Search input directly in the navbar, collapses with hamburger on mobile. Smart navigation on submit.
  3. **Search icon that expands** — Icon button that expands to reveal an input field.
- **Decision:** Inline form in navbar
- **Rationale:** Provides immediate search access from any page without an extra click. The Bootstrap navbar supports `d-flex` forms natively. The input collapses into the hamburger menu on mobile, keeping the compact layout. Removes `search.html` from `header_pages` since the inline form replaces the nav link.

---

### D7: Smart Navigation Behavior

- **Date:** 2026-02-24
- **Phase:** Implementation
- **Context:** What happens when user submits a search from the navbar
- **Options Considered:**
  1. **Always navigate to search page** — Every search goes to `/search/?q=...` regardless of result count.
  2. **Smart navigation** — 1 result navigates directly to the matching post. Multiple or zero results navigate to `/search/?q=...`.
  3. **Dropdown results** — Show results in a dropdown under the navbar input (no page navigation).
- **Decision:** Smart navigation (1 result = direct, N results = search page)
- **Rationale:** Optimizes for the common case where the user knows what they're looking for. If a search uniquely identifies a single post, skip the middleman and go straight there. For broader searches, the full results page gives space to browse. Avoids the complexity and accessibility challenges of a dropdown overlay.
