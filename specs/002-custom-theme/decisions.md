# Decisions: Custom Theme

## Decision Log

### D1: Full Minima Removal

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Spec originally planned to keep Minima gem in Gemfile after removing `theme:` line. User decided to fully remove Minima.
- **Options Considered:**
  1. Remove `theme: minima` from `_config.yml` but keep gem in Gemfile — safe fallback, gem available for reference
  2. Fully remove: delete `theme: minima` from `_config.yml` AND remove `gem "minima"` from Gemfile — clean break, no dead dependencies
- **Decision:** Option 2 — fully remove Minima gem
- **Rationale:** User preference. Jekyll SME confirmed safe: once all layouts/includes are project-owned, the gem is inert. Must add `jekyll-seo-tag` explicitly since it's a hidden Minima dependency. No other Minima dependencies are needed.

---

### D2: Bootstrap Blog Template as Design Reference

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Need a design direction for the custom theme. User specified the Bootstrap blog template.
- **Options Considered:**
  1. Design from scratch — full creative control, more research needed
  2. Use Bootstrap blog template (https://getbootstrap.com/docs/5.3/examples/blog/) — proven layout, Bootstrap-native patterns, sidebar included
- **Decision:** Option 2 — Bootstrap blog template as structural reference
- **Rationale:** User preference. Template provides a well-tested blog layout with 8/4 grid, sidebar pattern, clean typography. We adapt it for Jekyll (navbar instead of custom header, Liquid templating, system fonts instead of Playfair Display). Not a pixel-perfect copy — we apply project conventions (BEM, a11y, two-layer variables).

---

### D3: Mobile Navigation Approach

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Need responsive navigation that works on mobile. Bootstrap template uses a custom grid header, not a navbar.
- **Options Considered:**
  1. CSS-only checkbox hack — no JS dependency, but poor accessibility (checkbox is not a button, ARIA state not updated)
  2. Bootstrap navbar with `bootstrap.min.js` — native collapse animation, correct ARIA updates, well-tested
  3. Custom JS without Bootstrap — full control, smaller footprint, more work
- **Decision:** Option 2 — Bootstrap navbar with `bootstrap.min.js`
- **Rationale:** Spec constraint explicitly allows Bootstrap collapse JS. The A11y SME confirmed CSS-only has accessibility drawbacks (no `aria-expanded` state management). Bootstrap's collapse auto-updates ARIA attributes. Vendor `bootstrap.min.js` (without Popper) at ~29 kB minified (~11 kB gzipped). Place at `assets/vendor/bootstrap/js/bootstrap.min.js`.

---

### D4: Primary Color

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Current `#2a7ae2` has 4.56:1 contrast on white — marginal WCAG AA pass. Spec 001 flagged this for resolution.
- **Options Considered:**
  1. `#1a68d1` (4.93:1) — Bootstrap SME recommendation. Below 5:1 target.
  2. `#0060df` (5.74:1) — A11y SME recommendation. Comfortable margin, matches focus ring `#005fcc` in feel.
  3. `#1a5db5` (5.9:1) — CSS SME recommendation. Strongest margin.
  4. `#0047b3` (7.15:1) — AAA level. Too dark, shifts to navy.
- **Decision:** `#0060df` (5.74:1)
- **Rationale:** A11y SME is the authority on contrast. 5.74:1 provides comfortable WCAG AA margin (above the recommended 5:1 floor). Visually similar blue family to the original `#2a7ae2`. Coherent with focus ring color `#005fcc` (5.76:1) — consistent blue palette. Both CSS and A11y SMEs agreed on targeting 5:1+ minimum.

---

### D5: Typography System

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Need to define type scale for blog readability. Bootstrap defaults optimized for UI, not prose.
- **Options Considered:**
  1. Keep Bootstrap defaults — `$line-height-base: 1.5`, `$headings-font-weight: 500`, `$h1-font-size: 2.5rem`
  2. Blog-optimized adjustments — looser line height for prose, stronger heading weight, tighter heading scale
- **Decision:** Option 2 with these values:
  - `$line-height-base: 1.65` (was 1.5; 1.65 is more comfortable for long-form reading per WCAG 1.4.12)
  - `$headings-font-weight: 700` (was 500; stronger visual hierarchy for blog headings)
  - `$h1-font-size: 2rem` (was 2.5rem; right-sized for blog post titles)
  - System sans-serif font stack (no external fonts, no serif fallback from Bootstrap template)
- **Rationale:** Bootstrap SME and CSS SME agreed on these adjustments. 1.65 is the sweet spot between Bootstrap's 1.5 (tight for prose) and Minima's historical 1.6. Heading weight 700 provides clear hierarchy in a content-heavy layout. System font stack avoids external dependencies.

---

### D6: Heading Hierarchy

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Site title appears in the header on every page. Should it be `<h1>` or not?
- **Options Considered:**
  1. Site title as `<h1>` on homepage, `<p>` on all other pages — technically correct, requires Liquid conditional
  2. Site title as `<p>` on all pages — consistent header markup, each page owns its `<h1>`
- **Decision:** Option 2 — site title is always `<p>` (styled as brand), never `<h1>`
- **Rationale:** A11y SME recommended this. The header is a `banner` landmark; the site title is a branding/navigation element, not a page heading. Avoids two `<h1>` elements and Liquid conditional complexity. Each page clearly owns its `<h1>`: post title on post pages, page title on static pages, "Posts" on homepage.

---

### D7: Layout Strategy

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Bootstrap blog template uses 8/4 grid with sidebar. Need to decide where sidebar appears.
- **Options Considered:**
  1. Sidebar on all pages (match template exactly) — consistent layout but hurts post readability
  2. Sidebar on homepage only — posts/pages get full-width centered content for better reading
  3. No sidebar (defer to later spec) — simplest but loses template pattern
- **Decision:** Option 2 — sidebar on homepage only
- **Rationale:** The 8/4 grid with sidebar works well for the post list + discovery layout on the homepage. Blog posts benefit from a narrower, centered content column (42rem max-width, ~75 chars/line) without sidebar distraction. Static pages similarly benefit from focused content. The sidebar include (`_includes/sidebar.html`) is reusable — other layouts can add it later.

---

### D8: SCSS Architecture

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Need to organize new SCSS partials for the theme components.
- **Options Considered:**
  1. Single `_theme.scss` partial for everything — simple but monolithic
  2. One partial per component — `_header.scss`, `_nav.scss`, `_footer.scss`, `_post.scss`, `_post-card.scss`, `_page.scss`, `_sidebar.scss`, `_skip-link.scss`
- **Decision:** Option 2 — one partial per component
- **Rationale:** CSS SME recommended this. Each partial has a single BEM root, clear responsibility, and is independently maintainable. Import order in `assets/main.scss`: `_variables` (slot 1, before Bootstrap), then after all Bootstrap imports: `_base`, `_skip-link`, `_header`, `_nav`, `_footer`, `_sidebar`, `_tag`, `_post-card`, `_post`, `_page`.

---

### D9: Accepted Deviations from Code Guidelines

- **Date:** 2026-02-22
- **Phase:** Testing (QA SME audit)
- **Context:** QA SME audit found several patterns that diverge from the strict letter of the code guidelines but are pragmatic or industry-standard. Documented here so future sessions are aware these are intentional.

**D9a: Descendant element selectors in Markdown content blocks (QA-W2/W3)**

`.post__content` and `.page__content` use bare element selectors (`h2`, `h3`, `h4`, `p`, `img`, `blockquote`) instead of BEM classes. This is an accepted industry pattern — Markdown/Jekyll generates HTML without classes, so targeting elements within a scoped content container is the only practical approach. BEM naming would require a custom Markdown renderer.

**D9b: IIFE pattern instead of ES module (QA-I6)**

`nav-keyboard.js` uses an IIFE `(function() { ... })()` with `<script defer>` instead of `<script type="module">` as the code guidelines recommend. This is intentional because the script needs access to the `bootstrap.Collapse` global, which is set by `bootstrap.min.js` (a non-module script). ES modules have their own scope and would need an explicit `window.bootstrap` reference, adding complexity for no benefit. The IIFE pattern is the right choice here.

**D9c: Hardcoded `0.25rem` border-radius (QA-I1)**

Several partials use `border-radius: 0.25rem` as a literal value rather than a CSS custom property. This was not extracted to a `--radius-sm` token because the value is a Bootstrap convention (Bootstrap's `$border-radius` default), it only appears in a few places, and adding a token for a single value that matches a framework default would be premature abstraction. Revisit if a future spec introduces a design system with multiple radius sizes.

**D9d: Utility-only wrapper span in post.html (QA-I3)**

The tag pill wrapper `<span class="ms-2">` in the post layout uses only a Bootstrap utility class with no BEM class. This is acceptable because the span is purely a spacing wrapper with no semantic identity — adding a BEM class would name something that has no component purpose. If the tag section grows in complexity, extract it to an include with a proper BEM class.

**D9e: Archive sidebar links point to individual posts (QA-I5)**

The Archives section in the sidebar groups posts by month but links each month to the first post of that month rather than an archive index page. This is an interim behavior — archive index pages do not exist yet. The sidebar include is designed to be updated when an archive feature is added in a future spec.
