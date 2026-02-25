# Decisions: Comments

## Decision Log

### D1: Comment provider

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Need a commenting system for a static Jekyll site on GitHub Pages.
- **Options Considered:**
  1. Giscus — free, GitHub Discussions backend, no tracking, lightweight
  2. Utterances — GitHub Issues backend, no threading, clutters Issues tab
  3. Disqus — ads, heavy JS, extensive tracking
  4. Staticman — complex setup, no real-time interaction
  5. Paid services (Commento, Hyvor Talk) — unnecessary cost
- **Decision:** Giscus
- **Rationale:** Free, privacy-friendly, GitHub-native, developer audience already has accounts. See `docs/commenting-system-research.md`.

---

### D2: Discussion mapping strategy

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Giscus needs a strategy to map pages to Discussion threads.
- **Options Considered:**
  1. `pathname` — maps by URL path, stable and unique
  2. `url` — breaks if domain changes
  3. `title` — breaks if title is edited
  4. `og:title` — depends on SEO meta tags
- **Decision:** `pathname`
- **Rationale:** Most stable identifier. Won't break on title edits or domain changes.

---

### D3: Strict matching

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** `data-strict` controls whether Giscus requires exact title match for Discussion threads. QA SME recommended strict for new sites. (S13)
- **Options Considered:**
  1. `data-strict="0"` — lenient matching, more forgiving
  2. `data-strict="1"` — exact matching, prevents accidental cross-matching
- **Decision:** `data-strict="1"`
- **Rationale:** New site with no existing Discussion threads — strict matching prevents any accidental cross-matching from the start.

---

### D4: Config structure

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** How to store Giscus settings in `_config.yml`. Jekyll SME recommended nested structure. (S1)
- **Options Considered:**
  1. Flat — `giscus_repo`, `giscus_category`, etc. at top level
  2. Nested — `site.comments.giscus.*` with a `provider` field
- **Decision:** Nested under `comments.giscus.*`
- **Rationale:** Matches `jekyll-archives` pattern. Provider field enables clean future swaps. Keeps config namespaced.

---

### D5: Presentation — offcanvas sidebar panel

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** User requested comments in a hidden sidebar rather than inline below the post.
- **Options Considered:**
  1. Inline below post — standard blog convention, always visible
  2. Offcanvas panel (right side) — hidden by default, revealed on demand
- **Decision:** Bootstrap offcanvas panel, sliding in from the right
- **Rationale:** Keeps reading flow uninterrupted. Comments are an intentional action, not a visual distraction. Bootstrap offcanvas handles accessibility (focus trapping, ESC to close, backdrop, ARIA) out of the box.

---

### D6: Lazy loading

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** When to load the Giscus script — on page load or when the panel opens.
- **Options Considered:**
  1. Eager — script in HTML from the start, loads on every post page
  2. Lazy — inject script only when user opens the comments panel
- **Decision:** Lazy load
- **Rationale:** No third-party script loaded unless user explicitly wants comments. Better performance, better privacy. Avoids iframe sizing quirks in hidden containers. ~1-2s delay on first open is acceptable.

---

### D7: Trigger button placement

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Where to place the button that opens the comments panel.
- **Options Considered:**
  1. Floating button (like back-to-top)
  2. After post content (standalone)
  3. In the social share list (last pill button)
  4. In the post header/meta area
- **Decision:** Last item in the social-share `<ul>` list
- **Rationale:** Visually cohesive — inherits ghost pill styling, flows in the same flex row. Groups all engagement actions together. Simplest implementation.

---

### D8: Default comment state

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Should comments be enabled or disabled by default.
- **Options Considered:**
  1. Enabled by default, opt-out with `comments: false`
  2. Disabled by default, opt-in with `comments: true`
- **Decision:** Enabled by default
- **Rationale:** Comments should be available on all posts unless explicitly disabled. Matches social-share pattern (share: true by default).

---

### D9: Semantic placement in DOM

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Where the offcanvas panel markup goes in the post layout. Jekyll SME and A11y SME provided guidance. (S2, S6)
- **Options Considered:**
  1. Inside `<article>` — treats panel as part of the article
  2. After `</article>` — treats panel as external to the article
- **Decision:** Offcanvas panel markup placed after `</article>`, before related-posts
- **Rationale:** The comment button lives in the social-share list (inside article header), but the panel itself is reader-generated content — semantically not part of the article. The panel is position:fixed by Bootstrap, so DOM position doesn't affect visual rendering.

---

### D10: Dark mode sync mechanism

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Giscus theme needs to match site dark/light mode, including when toggled dynamically.
- **Options Considered:**
  1. `preferred_color_scheme` theme — auto-detects OS preference but doesn't respond to manual toggle
  2. Explicit theme set on load + postMessage on toggle — full sync with site theme
- **Decision:** Set explicit theme (`light` / `dark_dimmed`) on script injection based on current `data-bs-theme`, plus postMessage to iframe on theme toggle
- **Rationale:** The site uses a manual toggle that overrides OS preference. Giscus must match the site's actual theme, not the OS preference. `dark_dimmed` matches the site's dark palette better than Giscus's `dark` theme.
