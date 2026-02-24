# Decisions: Series Support

## Decision Log

### D1: Series Data Architecture

- **Date:** 2026-02-23
- **Phase:** Research & Planning
- **Context:** Need to decide how posts declare series membership and where series metadata lives
- **Options Considered:**
  1. Pure Liquid + front matter + `_data/series.yml` — zero dependencies, full control, posts stay in `_posts/`
  2. Plugin-based (jekyll-series or jekyll-group) — both abandoned, outdated, low adoption
  3. Jekyll Collections — breaks existing post infrastructure (tags, archives, feeds)
- **Decision:** Pure Liquid with `_data/series.yml` for centralized metadata
- **Rationale:** No viable plugins exist. Collections break the post ecosystem. Liquid approach follows the same pattern used for tags, requires no dependencies, and gives full control.

---

### D2: Series Archive Pages

- **Date:** 2026-02-23
- **Phase:** Research & Planning
- **Context:** Need series archive pages at `/series/slug/` — how to generate them
- **Options Considered:**
  1. One manual `.html` page per series — simple, explicit, full control over content
  2. Single dynamic page — zero maintenance but no per-series URLs
  3. Both index + per-series pages — most complete but more files
- **Decision:** One manual page per series + a `/series/` index page
- **Rationale:** Manual pages provide per-series URLs for linking and SEO, while the index page provides discoverability. Adding a file per series is minimal overhead since series are infrequent. The index page lists all series.

---

### D3: Front Matter Schema

- **Date:** 2026-02-23
- **Phase:** Research & Planning
- **Context:** Need to define what front matter fields series posts use
- **Options Considered:**
  1. `series` (slug) + `series_part` (integer) — explicit ordering, slug avoids typo issues
  2. `series_name` (display title) + `series_order` (integer) — display title in front matter risks mismatch
  3. `series` only, order by date — loses explicit ordering
- **Decision:** `series` (slug string) + `series_part` (integer)
- **Rationale:** Slug as primary key avoids display title typos breaking grouping. Display title comes from `_data/series.yml` (single source of truth). Integer part number gives explicit ordering independent of publication date. Follows patterns from Hugo (`series_weight`) and Eleventy.

Example front matter:
```yaml
series: getting-started-with-jekyll
series_part: 2
```

Example `_data/series.yml`:
```yaml
getting-started-with-jekyll:
  title: "Getting Started with Jekyll"
  description: "A complete guide to building your first Jekyll blog."
  status: in_progress
```

---

### D4: Series TOC Placement and Display

- **Date:** 2026-02-23
- **Phase:** Research & Planning
- **Context:** Where and how to display the series table of contents on a post page
- **Options Considered:**
  1. Below title/meta, always visible — immediate context, no JS needed
  2. Sidebar — visible while reading but requires layout changes, poor on mobile
  3. Bottom of post — less prominent, doesn't interrupt flow
  4. Collapsible (default open or closed) — saves space for long series
- **Decision:** Below the post title/meta, always visible
- **Rationale:** Readers see series context immediately. No JavaScript required. Simple implementation. For most series (3-8 parts), the list is compact enough to not disrupt the reading flow.

---

### D5: Series Nav vs Chronological Nav

- **Date:** 2026-02-23
- **Phase:** Research & Planning
- **Context:** Series posts have two navigation concepts — sequential within the series and chronological across all posts
- **Options Considered:**
  1. Coexist — series nav near TOC, chronological nav stays at bottom
  2. Replace — series nav replaces chronological nav for series posts
- **Decision:** Coexist — show both
- **Rationale:** They serve different purposes. Series nav (prev/next part) is about continuing the series. Chronological nav (older/newer post) is about browsing the blog. Series nav appears within the series TOC component below the title. Chronological nav stays at the bottom as-is.

---

### D6: Header Navigation

- **Date:** 2026-02-23
- **Phase:** Research & Planning
- **Context:** Whether the /series/ index page should appear in the site header navigation
- **Decision:** Yes — add "Series" to the header nav
- **Rationale:** Makes series discoverable from any page, alongside existing Tags and About links.

---

### D7: Homepage Series Badge

- **Date:** 2026-02-23
- **Phase:** Research & Planning
- **Context:** Whether series posts should show a series indicator on the homepage post list
- **Decision:** Yes — show series name and part number on homepage post cards
- **Rationale:** Helps readers discover series content from the homepage. Shows context like "Part 2 of Getting Started with Jekyll" alongside existing tags.
