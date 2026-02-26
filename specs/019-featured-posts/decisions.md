# Decisions: Featured Posts

## Decision Log

### D1: Sidebar Placement

- **Date:** 2026-02-26
- **Phase:** Pre-spec (user direction)
- **Context:** The research doc suggested homepage placement for maximum visibility. User provided specific placement preference.
- **Options Considered:**
  1. Homepage hero section — high visibility but only on one page
  2. Sidebar widget — visible on every page that renders the sidebar
  3. Both — maximum coverage but more implementation work
- **Decision:** Sidebar only, positioned below the About section and above the Tags section
- **Rationale:** User preference. Sidebar placement gives persistent visibility across all pages without requiring homepage layout changes.

### D2: Display Count

- **Date:** 2026-02-26
- **Phase:** Pre-spec (user direction)
- **Context:** Research doc suggested 3–5 featured posts. User specified an exact count.
- **Options Considered:**
  1. 3 posts — compact, fits sidebar well
  2. 5 posts — more content highlighted but longer sidebar
- **Decision:** Exactly 3 featured posts
- **Rationale:** User preference. Keeps the sidebar compact.

### D3: Initial Featured Posts

- **Date:** 2026-02-26
- **Phase:** Pre-spec (user direction)
- **Context:** 4 posts exist. User asked to pick any 3.
- **Options Considered:**
  1. All 3 AI Tools series posts — cohesive series, represents the site's real content
  2. Mix of welcome post and 2 AI Tools posts — broader variety
- **Decision:** Feature the 3 AI Tools series posts (getting-started, environment-setup, effective-prompting)
- **Rationale:** These are the site's substantive content. The welcome post is introductory and less valuable to highlight.

---

### D4: No Date Display — Title-Only Links

- **Date:** 2026-02-26
- **Phase:** Research & Planning
- **Context:** Accessibility SME recommended `<time datetime>` outside the link. User clarified the widget should mirror Recent Posts — just linked titles, no dates. The purpose is editorial curation, not chronological display.
- **Options Considered:**
  1. Title + date — more informational, distinguishes from Recent Posts visually
  2. Title only — simpler, matches Recent Posts format, keeps sidebar compact
- **Decision:** Title only, no date
- **Rationale:** User preference. The widget's purpose is to highlight curated content, not to show when it was published. Matches the existing Recent Posts pattern exactly.

### D5: Slug-Based Matching

- **Date:** 2026-02-26
- **Phase:** Research & Planning
- **Context:** Jekyll SME evaluated three identifier approaches for the data file.
- **Options Considered:**
  1. `slug` (title-only, e.g., `ai-tools-getting-started`) — short, readable, permalink-resilient
  2. Full filename (e.g., `2026-02-23-ai-tools-getting-started`) — unique but verbose
  3. `url` (e.g., `/2026/02/23/ai-tools-getting-started/`) — unique but breaks if permalink changes
- **Decision:** Use `slug` field with Liquid `where` filter
- **Rationale:** Consistent with how `_data/series.yml` identifies content. Human-readable. Uniqueness risk is negligible for a manually curated list of 3 posts.
