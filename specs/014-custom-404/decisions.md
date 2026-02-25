# Decisions: Custom 404

## Decision Log

### D1: Use existing `layout: page` — no custom layout

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Should the 404 page use the existing `page` layout or a dedicated `_layouts/404.html`?
- **Options Considered:**
  1. Keep `layout: page` — content wraps in `.container > article.page > .page__title + .page__content`. The page title becomes the `<h1>`, and all 404-specific content goes in `.page__content`.
  2. Create `_layouts/404.html` — a dedicated layout for error pages with a different structure (e.g., no `<article>` wrapper, different centering).
- **Decision:** Keep `layout: page`
- **Rationale:** The page layout provides the header, footer, navigation, and consistent page structure. A dedicated layout would duplicate most of this for minimal gain. The 404 content is simple enough to fit within `.page__content`. The title front matter ("Page not found") becomes the `<h1>` automatically.

---

### D2: "Page not found" as `<h1>`, "404" as decorative display

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** What should be the `<h1>` heading and how should the "404" number be presented?
- **Options Considered:**
  1. "404" as `<h1>` with "Page not found" as a subtitle — simple but screen readers get a meaningless heading.
  2. "Page not found" as `<h1>` (via page title front matter) with "404" as a decorative visual element using `aria-hidden="true"` — accessible and descriptive.
  3. "404 — Page not found" as combined `<h1>` — accessible but doesn't allow different visual treatment of the number.
- **Decision:** Option 2 — "Page not found" as `<h1>`, "404" as decorative
- **Rationale:** The page layout renders `page.title` as the `<h1>`. Setting `title: "Page not found"` gives screen readers a descriptive heading and the browser tab a meaningful title. The "404" number is displayed as a large decorative element with `aria-hidden="true"`, providing visual recognition without cluttering assistive technology.

---

### D3: BEM block name `.error-page`

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** What BEM block name to use for the 404 page component?
- **Options Considered:**
  1. `.error-page` — semantic, future-proof (works for 500, 403, etc.)
  2. `.not-found` — descriptive but 404-specific
  3. `.page-404` — explicit but uses a number, less semantic
- **Decision:** `.error-page`
- **Rationale:** Most semantic and extensible. If additional error pages are ever needed, the same block can be reused with modifiers (e.g., `.error-page--500`). Elements: `__code`, `__message`, `__actions`.

---

### D4: Horizontal centering, standard page flow

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Should the 404 content be vertically centered in the viewport or use standard page flow?
- **Options Considered:**
  1. Viewport centering via flexbox on `<main>` — content always appears in the vertical center.
  2. Standard page flow with horizontal centering — content sits at the top of the content area with normal spacing.
- **Decision:** Standard page flow with horizontal centering
- **Rationale:** Viewport centering creates visual issues when header/footer height varies and on short viewports. Standard flow with `text-align: center` is predictable, works at all screen sizes, and matches the site's existing page pattern. The layout's `py-4 py-md-5` on `<main>` already provides comfortable top spacing.

---

### D5: Standard text links, not buttons

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** How should the homepage and search links be styled?
- **Options Considered:**
  1. Bootstrap buttons (`.btn .btn-primary`) — prominent call-to-action style.
  2. Standard text links — use existing link colors, blend with page content.
  3. Styled links with icons — text links with arrow or search icons.
- **Decision:** Standard text links
- **Rationale:** Buttons would make the page feel like a marketing landing page. Text links match the minimal, helpful tone the user requested. The existing link styles (`--color-link`, `--color-link-hover`) provide sufficient visual affordance. Keeps the page understated and consistent with the rest of the site.
