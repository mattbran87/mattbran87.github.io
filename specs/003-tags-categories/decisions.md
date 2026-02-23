# Decisions: Tags & Categories

## Decision Log

### D1: Tags Only (No Categories)

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Need to choose between tags, categories, or both for post taxonomy
- **Options Considered:**
  1. Tags only — flat, flexible, no URL impact, low cognitive overhead
  2. Categories only — hierarchical, affects URLs, one per post typically
  3. Both — maximum flexibility but high maintenance overhead
- **Decision:** Tags only
- **Rationale:** Simpler mental model for a personal dev blog. Tags don't affect URL structure, support multiple labels per post, and are the standard approach for developer blogs. Categories can be added later if a clear need emerges.

---

### D2: Use jekyll-archives Plugin

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Need to generate tag archive pages — plugin vs hand-rolled Liquid
- **Options Considered:**
  1. `jekyll-archives` plugin — automatic page generation, standard config, well-maintained
  2. Hand-rolled Liquid — more control, no dependency, but requires manual collection pages
- **Decision:** Use `jekyll-archives` v2.3.0
- **Rationale:** User preference. Plugin is well-maintained, compatible with Jekyll 4.4.x, and works with our custom GitHub Actions build. Handles slug generation and page creation automatically.

---

### D3: Tag Archive URL Pattern

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Plugin default is `/tag/:name/` (singular) — need to decide on URL pattern
- **Options Considered:**
  1. `/tag/:name/` — plugin default (singular)
  2. `/tags/:name/` — plural, matches the index page at `/tags/`
- **Decision:** `/tags/:name/` (plural)
- **Rationale:** Consistent with the tags index page URL (`/tags/`). Plural is more intuitive for a collection endpoint.

---

### D4: Convert Tag Spans to Links (In-Place)

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Templates already render tags as `<span class="tag">` — need to decide how to add links
- **Options Considered:**
  1. Create a shared `_includes/post-tags.html` include and replace inline code in both layouts
  2. Update the inline code in each layout directly
- **Decision:** Create a shared include
- **Rationale:** DRY approach. Both `home.html` and `post.html` render tags — a single include avoids duplication and makes future tag display changes easier. The SCSS `.tag` class already exists and just needs `<a>` styling added.
