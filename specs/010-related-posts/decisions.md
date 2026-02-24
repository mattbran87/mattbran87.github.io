# Decisions: Related Posts

## Decision Log

### D1: Relatedness Algorithm

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Need to determine which posts are "related" to the current post. Multiple approaches exist.
- **Options Considered:**
  1. **Jekyll `site.related_posts`** — built-in variable. Returns 10 most recent posts by default (not actually related). LSI mode requires `classifier-reborn` gem and is slow.
  2. **Pure Liquid tag-scoring** — count shared tags between current post and all other posts, rank by overlap count. Standard Jekyll community pattern.
  3. **Jekyll plugin (Ruby)** — custom Ruby plugin for efficient relatedness computation.
- **Decision:** Pure Liquid tag-scoring (Option 2)
- **Rationale:** Spec constrains to pure Liquid (no plugins, no gems). `site.related_posts` is useless without LSI. Tag-scoring aligns with the existing taxonomy system and is the established community pattern. Build performance is negligible at current and projected post counts.

---

### D2: Semantic Structure

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Need to choose the HTML landmark, heading level, and list type for the related posts section.
- **Options Considered:**
  1. **`<aside>` + `<h2>` + `<ul>`** — complementary landmark, page-level heading, unordered list
  2. **`<nav>` + `<h2>` + `<ul>`** — navigation landmark (already 2 on the page)
  3. **`<section>` + `<h2>` + `<ol>`** — generic section, ordered list implying rank matters
- **Decision:** `<aside aria-labelledby="related-posts-heading">` with `<h2>` and `<ul role="list">` (Option 1)
- **Rationale:** Related posts are supplementary content (exact purpose of `<aside>`). `<nav>` is reserved for major navigation blocks. `<ul>` over `<ol>` because the ranking distinction isn't meaningful to users. `role="list"` restores Safari VoiceOver semantics lost by `list-style: none`. `aria-labelledby` uses the visible heading rather than `aria-label`.

---

### D3: Placement in Post Layout

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** The related posts section could go inside or outside the `<article>` element in `post.html`.
- **Options Considered:**
  1. **Inside `<article>`** — after prev/next nav, before closing `</article>`
  2. **Outside `<article>`** — after `</article>`, inside `.container`, before schema includes
- **Decision:** Outside `<article>` (Option 2)
- **Rationale:** The `<article>` represents the blog post content itself. Related posts are page-level supplementary content, not part of the article. This is semantically correct and keeps the article element clean. The `<aside>` is a sibling of `<article>` within the container.

---

### D4: BEM Naming Strategy

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Choose between a standalone BEM block or an element of the existing `.post` block.
- **Options Considered:**
  1. **`.related-posts` standalone block** — independent component with its own BEM hierarchy
  2. **`.post__related` element** — child element of the `.post` block
- **Decision:** `.related-posts` standalone block (Option 1)
- **Rationale:** The component lives outside `<article class="post">`, so `.post__related` would violate BEM rules (elements must be inside their block). A standalone block also supports the reusable include requirement — it can be embedded in any layout context.

---

### D5: Visual Layout

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Choose how to lay out the related post items.
- **Options Considered:**
  1. **Stacked vertical** — one item per line, matching the homepage post list pattern
  2. **3-column grid** — side-by-side cards using Bootstrap grid, responsive collapse
- **Decision:** Stacked vertical (Option 1)
- **Rationale:** At `--content-max-width: 42rem`, three columns would be ~14rem each — too narrow for title + date + excerpt. Stacked layout matches the existing site patterns (homepage post list, sidebar recent posts), requires no breakpoint logic, and maintains the vertical reading flow after the article.

---

### D6: Excerpt Format

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** `post.excerpt` returns the first paragraph with HTML markup. Need to decide how to display it in the compact related posts card.
- **Options Considered:**
  1. **Raw excerpt** — `{{ post.excerpt }}` with full HTML
  2. **Stripped and truncated** — `{{ post.excerpt | default: "" | strip_html | truncatewords: 20 }}`
- **Decision:** Stripped and truncated (Option 2)
- **Rationale:** Raw HTML in the excerpt could contain `<a>` tags, creating nested link issues (title is already linked). `strip_html` gives clean text. `truncatewords: 20` (~100-120 characters) keeps cards compact. Nil guard with `default: ""` prevents errors on edge cases.

---

### D7: Empty State Handling

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** What to show when a post has no tags or no matching related posts.
- **Options Considered:**
  1. **Render nothing** — omit the entire `<aside>` block
  2. **Show message** — render the section with "No related posts found"
- **Decision:** Render nothing (Option 1)
- **Rationale:** "No related posts" provides no value to any user. An empty `<aside>` would pollute the screen reader landmark map. Matches the existing conditional rendering pattern for prev/next nav in `post.html`.

---

### D8: Tiebreaker for Equal Tag Counts

- **Date:** 2026-02-24
- **Phase:** Research & Planning (updated during Implementation)
- **Context:** When two candidate posts share the same number of tags with the current post, which appears first?
- **Options Considered:**
  1. **Recency (most recent first)** — would require encoding date in the sort key
  2. **Reverse-alphabetical by URL** — natural from the string-scoring approach (sort key includes URL)
  3. **No defined tiebreaker** — leave it to sort implementation
- **Decision:** Reverse-alphabetical by URL (Option 2) — accepted as-is
- **Rationale:** The sort key is the full string `"02|/post-url/"`, so Liquid's `sort` differentiates equally-scored posts by their URL portion. After `reverse`, this produces reverse-alphabetical URL order. Encoding dates in the sort key would add Liquid complexity for negligible user benefit — the primary sort by tag count is the meaningful ordering. The tiebreaker only affects posts with identical overlap scores.
