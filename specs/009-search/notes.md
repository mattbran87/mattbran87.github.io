# Notes: Search

## Research & Planning

### Findings

#### Lunr.js Library Assessment
- **Version:** 2.3.9 (last release ~2020, stable but unmaintained)
- **Size:** ~8.4 KB minified, ~3 KB gzipped — negligible impact
- **API:** Builder pattern — define fields, add documents, get immutable index. Searches return scored results with match data.
- **Features:** BM25 ranking, wildcards, field-scoped search, boosting, fuzzy matching, required/prohibited terms
- **CDN:** Available on jsDelivr, cdnjs, unpkg (all serve 2.3.9)
- **Maintenance risk:** GitHub issue #504 ("Still maintained?") open since 2021 with no response. Library works reliably as-is. MiniSearch is a near-drop-in replacement if needed later.

#### Jekyll Integration Pattern
- **Recommended approach:** Liquid-generated JSON file at build time (no plugin needed)
- A file like `search-index.json` with YAML front matter triggers Liquid processing — Jekyll outputs it to `_site/`
- JavaScript on the search page fetches the JSON, builds the Lunr index client-side, and performs searches
- Full content indexing is fine for this site size (currently 4 posts, expected 20-50 near term)
- Use `jsonify` filter for all text fields (handles escaping edge cases)
- Use `strip_html | strip_newlines` on content before `jsonify`

#### Index Fields and Boosting Strategy
| Field | Indexed? | Boosted? | Display? | Notes |
|-------|----------|----------|----------|-------|
| title | Yes | 10x | Yes (linked) | Primary search target |
| tags | Yes | 5x | Yes (pills) | Array joined to string for indexing |
| categories | Yes | 5x | No | Similar to tags for relevance |
| excerpt | Yes | 2x | Yes (snippet) | Truncated to 50 words |
| content | Yes | 1x (default) | No | Full text, stripped of HTML |
| url | No | — | Yes (link target) | Stored for result links |
| date | No | — | Yes (formatted) | Stored for display |

#### Current Site Architecture Integration Points
- **Navigation:** `header_pages` in `_config.yml` controls navbar links — add `search.html`
- **Layouts:** `page.html` extends `default.html` — suitable base for search page
- **JS pattern:** IIFE with DOM-ready guard, JSDoc comments, null checks on DOM queries
- **CSS pattern:** BEM naming, CSS custom properties only (no `$scss-vars` in project code), partials imported in `main.scss`
- **Existing JS:** Only `nav-keyboard.js` (IIFE pattern) — search.js follows same conventions
- **Assets structure:** `assets/js/modules/` for feature JS, `assets/css/_partials/` for SCSS

#### Alternatives Considered
| Library | Size | Maintained | Full-text | Jekyll Ecosystem |
|---------|------|------------|-----------|------------------|
| **Lunr.js** | ~8 KB | No (stable) | Yes | Excellent |
| MiniSearch | ~8 KB | Yes | Yes | Limited |
| Fuse.js | ~12 KB | Yes | No (fuzzy only) | Good |
| Pagefind | Chunked | Yes | Yes | Good (overkill for small sites) |

**Verdict:** Lunr.js is the right choice — small, battle-tested, extensive Jekyll tutorials, specified in roadmap. Note MiniSearch as backup.

### Open Questions

- [x] Search library choice — Lunr.js confirmed (roadmap specifies it, research validates it)
- [x] Index generation approach — Liquid-generated JSON (no plugin needed)
- [x] Search UX pattern — Instant/live search with debounce (matches spec requirement for "real-time results")
- [x] Lunr.js loading — CDN (jsDelivr) for simplicity, with `defer` attribute

### References

- [Lunr.js documentation](https://lunrjs.com/)
- [Lunr.js GitHub](https://github.com/olivernn/lunr.js)
- [Jekyll Codex: Search with Lunr.js](https://jekyllcodex.org/without-plugin/search-lunr/)
- [Lunr.js search guide](https://lunrjs.com/guides/searching.html)

---

## Implementation

- [Notes captured during implementation — gotchas, surprises, workarounds]

---

## Testing

- [Test observations, edge cases found, performance notes]

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
