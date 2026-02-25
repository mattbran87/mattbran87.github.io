# Decisions: Social Sharing

## Decision Log

### D1: Share URL Construction

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** How to build the full share URL and encoded title in Liquid
- **Options Considered:**
  1. `page.url | absolute_url` + `page.title | url_encode` — standard Jekyll filters
  2. Manual string concatenation with `site.url` — more control but error-prone
- **Decision:** Use `page.url | absolute_url` for the URL and `page.title | url_encode` for the title
- **Rationale:** Standard Jekyll pattern already used in schema includes. `absolute_url` handles `site.url` + `site.baseurl` automatically. All target platforms accept `+` encoding for spaces.

---

### D2: Placement in Post Layout

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Where to place the share include in `_layouts/post.html`
- **Options Considered:**
  1. Inside `<article>`, after `.post__content`, before `.post__nav` — within semantic boundary, natural reading position
  2. After `</article>`, before related posts — outside article, alongside other supplementary content
  3. Both above and below content — maximum visibility
- **Decision:** ~~Inside `<article>`, after `.post__content`, before `.post__nav`~~ **Revised:** Inside `<header>`, after `.post__meta`
- **Rationale:** ~~Share buttons are semantically part of the article. Placement at the "just finished reading" point is the most natural share moment.~~ User preferred share buttons visible at the top of the post, below the title and meta info, for immediate access before reading.

---

### D3: Include Parameters

- **Date:** 2026-02-25 (revised)
- **Phase:** Research & Planning
- **Context:** The include is used in two contexts: article pages (from `page`) and post-card loops (from `post`). In a loop, `page` refers to the list page, not the individual post.
- **Options Considered:**
  1. Read from `page` directly — only works on article pages
  2. Accept `url`, `title`, and `compact` parameters — works in both contexts
  3. Two separate includes — duplicates markup
- **Decision:** Accept parameters: `url` (post URL), `title` (post title), `compact` (boolean string). Defaults to `page.url` and `page.title` when not passed.
- **Rationale:** Required for post-card context where `page` is the list page. Single include with a `compact` flag avoids markup duplication. `series-badge.html` already uses this parameterized pattern in the project.

---

### D13: Two-Variant Architecture

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** User requested share buttons on both post-cards and article pages with different content.
- **Options Considered:**
  1. One include with `compact` parameter — full variant (all options) for articles, compact (Copy Link + Web Share only) for post-cards
  2. Two separate includes — dedicated markup per context
- **Decision:** One include with `compact` parameter. Full variant renders all 7 options. Compact variant renders only Copy Link and Web Share (both JS-dependent, progressive enhancement).
- **Rationale:** Avoids duplicating shared markup (SVG icons, BEM structure, aria patterns). Compact variant is JS-only by design — if JS is disabled, nothing renders on post-cards, which is acceptable since the full share options are available on the article page.

---

### D4: Opt-Out Front Matter Flag

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Should posts be able to disable share buttons?
- **Options Considered:**
  1. `share: false` in front matter — one line of Liquid, lightweight
  2. No opt-out — always show share buttons
- **Decision:** Support `share: false` in front matter to hide share buttons
- **Rationale:** Lightweight guard (`{% unless page.share == false %}`). Default is share buttons visible. Gives post-level control for content where sharing isn't appropriate.

---

### D5: Wrapper Element

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** What semantic element should wrap the share buttons?
- **Options Considered:**
  1. `<nav aria-label="Share this post">` — navigation landmark, distinguishable from other navs
  2. `<aside>` — tangentially related content
  3. `<div>` — no semantic meaning
- **Decision:** `<nav aria-label="Share this post">`
- **Rationale:** Share buttons are a navigation function (WCAG 1.3.1). `aria-label` distinguishes from primary nav and post nav. `<aside>` implies tangential content, which is wrong. `<div>` is invisible to screen readers.

---

### D6: Icon + Text Strategy

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Should share buttons show icons only, text only, or both?
- **Options Considered:**
  1. Icon + visible text label — accessible, no `aria-label` needed, works at all widths
  2. Icon-only with visually-hidden text — compact but violates project convention
  3. Text-only — accessible but less visually scannable
- **Decision:** Icon + visible text label at all viewport widths
- **Rationale:** Satisfies WCAG 2.5.3 (Label in Name). Matches project convention of "prefer visible text over aria-label." SVGs get `aria-hidden="true"`. No responsive text hiding needed — flex-wrap handles layout.

---

### D7: Copy Button Accessible Pattern

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** How to handle the Copy Link button's state change accessibly
- **Options Considered:**
  1. Visible text as accessible name + aria-live region — matches validated code-copy.js pattern
  2. `aria-label` with dynamic update — violates project "prefer visible text" convention
- **Decision:** Mirror code-copy.js pattern: visible text ("Copy link" → "Copied!"), `aria-live` region for announcements, `--copied` BEM modifier for success styling
- **Rationale:** Proven, tested pattern in the project. Consistent UX for copy actions across the site.

---

### D8: New Tab Indication

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Should screen reader users be told that share links open in a new tab?
- **Options Considered:**
  1. Visually-hidden "(opens in new tab)" span on each external link — more accessible
  2. No indication — social share links universally open in new tabs
- **Decision:** Add `<span class="visually-hidden">(opens in new tab)</span>` on external share links
- **Rationale:** Minimal cost, helps screen reader users who may not expect the context switch. Skip on Copy Link and Web Share buttons since they don't navigate away.

---

### D9: Layout Approach

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** How to lay out the row of share buttons
- **Options Considered:**
  1. Flexbox with `gap` and `flex-wrap: wrap` — standard, handles mixed element types
  2. Bootstrap `.btn-group` — designed for toggle actions, forces shared borders
- **Decision:** Flexbox with `gap` and `flex-wrap: wrap` using a `<ul>` list
- **Rationale:** `.btn-group` is wrong semantically (toggle actions, not independent links) and visually (shared borders, removed inner border-radius). `<ul>` gives screen readers an item count.

---

### D10: BEM Naming Structure

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** BEM class naming for the component
- **Decision:** `.social-share` block with: `__list` (ul), `__item` (li), `__link` (a), `__button` (button), `__icon` (svg), `__button--copied` (success state), `__button--native` (Web Share). Shared styles for `__link` and `__button` via grouped selector.
- **Rationale:** Clean BEM hierarchy. Separate element names for links vs. buttons (different HTML elements, different behaviors) but identical visual styling.

---

### D11: Visual Design

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Visual styling approach for share buttons
- **Decision:** Ghost-style: transparent background, `1px solid var(--color-border)`, `var(--color-muted)` text, `var(--border-radius-pill)` radius, `var(--font-size-sm)`. Top border separator with `padding-top` and `margin-top` using `--spacing-xl`.
- **Rationale:** Subtle design that doesn't compete with post content. Pill radius distinguishes from rectangular code-copy buttons. Top border matches `post__nav` pattern for visual consistency.

---

### D12: Interaction States

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Hover, focus, and motion preferences
- **Decision:** Follow existing project patterns: hover shifts to `--color-text` with `--color-bg-alt` background, `focus-visible` outline with `--focus-ring-width` and `--focus-ring-color`, `prefers-reduced-motion: reduce` disables transitions.
- **Rationale:** Consistency with established patterns (code-copy, tag pills, nav links).
