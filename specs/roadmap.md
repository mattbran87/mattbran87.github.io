# Feature Roadmap

> **Last Updated:** 2026-02-25
> **Research docs:** [`docs/`](../docs/)

## Feature Queue

Features listed in order of priority. Each feature gets its own spec directory when work begins.

| # | Feature | Spec | Status |
|---|---------|------|--------|
| 001 | Bootstrap Integration | `specs/001-bootstrap-integration/` | Completed |
| 002 | Custom Theme | `specs/002-custom-theme/` | Completed |
| 003 | Tags & Categories | `specs/003-tags-categories/` | Completed |
| 004 | Series Support | `specs/004-series-support/` | Completed |
| 005 | Contact Form | `specs/005-contact-form/` | Completed |
| 006 | Personalize Site | `specs/006-personalize-site/` | Completed |
| 007 | Custom Homepage | `specs/007-custom-homepage/` | Deferred — no compelling need yet; reconsider when content volume justifies a curated landing page |
| 008 | SEO Foundation | `specs/008-seo-foundation/` | Completed |
| 009 | Search | `specs/009-search/` | Completed |
| 010 | Related Posts | `specs/010-related-posts/` | Completed |
| 011 | Code Block Enhancements | `specs/011-code-blocks/` | Completed |
| 012 | Analytics | `specs/012-analytics/` | Deferred — research complete; awaiting private repository and server migration before implementation |
| 013 | Dark Mode | `specs/013-dark-mode/` | Completed |
| 014 | Custom 404 | `specs/014-custom-404/` | Completed |
| 015 | Uses Page | — | Completed (stub) |
| 016 | Resume/CV Page | — | Removed (LinkedIn preferred) |
| 017 | Multi-Language Support | [`docs/multi-language-research.md`](../docs/multi-language-research.md) | Not Started |
| 018 | Ad Integration | [`docs/ad-integration-research.md`](../docs/ad-integration-research.md) | Not Started |
| 019 | Featured Posts | [`docs/featured-posts-research.md`](../docs/featured-posts-research.md) | Not Started |
| 020 | Social Sharing | `specs/020-social-sharing/` | Completed |
| 021 | Comments | [`docs/commenting-system-research.md`](../docs/commenting-system-research.md) | Not Started |
| 022 | JS Module Migration | — | Completed |
| 023 | Read More Link | — | Completed |
| 024 | Estimated Reading Time | — | Completed |
| 025 | Table of Contents | — | Not Started |
| 026 | Back to Top Button | — | Not Started |
| 027 | Scroll Progress Indicator | — | Not Started |
| 028 | Newsletter Subscribe CTA | [`docs/newsletter-research.md`](../docs/newsletter-research.md) | Not Started |
| 029 | Pagination | — | Not Started |
| 030 | Visible Breadcrumbs | — | Not Started |
| 031 | Series Badge Redesign | — | Completed |
| 032 | Sidebar Tags Widget | — | Not Started |

## Natural Groupings

Features that share dependencies or are closely related and benefit from being developed together or in sequence.

### Foundation (do first — everything builds on this)

| # | Feature | Rationale |
|---|---------|-----------|
| 001 | Bootstrap Integration | Changes the entire CSS foundation |
| 002 | Custom Theme | Builds layouts and visual identity on top of Bootstrap |
| 006 | Personalize Site | Replace placeholder content early so all subsequent work uses real data |

### Content Organization

| # | Feature | Rationale |
|---|---------|-----------|
| 003 | Tags & Categories | Taxonomy system for organizing posts |
| 004 | Series Support | Multi-part post linking — related taxonomy concept |
| 010 | Related Posts | Uses tags/categories to determine relatedness |

### Page Builds

| # | Feature | Rationale |
|---|---------|-----------|
| 005 | Contact Form | Single standalone page |
| 007 | Custom Homepage | Designed landing page |
| 014 | Custom 404 | Single standalone page |
| 015 | Uses Page | Single standalone page |
| 016 | Resume/CV Page | Single standalone page |

### Discovery & SEO

| # | Feature | Rationale |
|---|---------|-----------|
| 008 | SEO Foundation | Meta tags and structured data live in layouts — best done with the custom theme |
| 009 | Search | Client-side search for readers to find content |
| 012 | Analytics | Traffic tracking and user behavior insights |
| 019 | Featured Posts | Curated/automated "most popular" posts section |

### Engagement

| # | Feature | Rationale |
|---|---------|-----------|
| 020 | Social Sharing | Share buttons for readers to spread content |
| 021 | Comments | Per-post discussion threads via Giscus |
| 028 | Newsletter Subscribe CTA | Call-to-action for email updates — converts readers into subscribers |

### Internationalization

| # | Feature | Rationale |
|---|---------|-----------|
| 017 | Multi-Language Support | Translate the site into Spanish, French, and German using jekyll-polyglot; includes language switcher, detection banner, and translator subagent |

### Monetization

| # | Feature | Rationale |
|---|---------|-----------|
| 018 | Ad Integration | Revenue generation via Google AdSense initially, graduating to Carbon Ads or EthicalAds for better tech-audience fit |

### Enhancements

| # | Feature | Rationale |
|---|---------|-----------|
| 011 | Code Block Enhancements | Developer experience polish for code-heavy posts |
| 013 | Dark Mode | Theming enhancement — requires custom theme CSS custom properties in place |
| 022 | JS Module Migration | Migrate existing IIFE scripts to ES module pattern per code guidelines |
| 023 | Read More Link | Explicit "Read more" call-to-action on post cards for clearer content discovery |
| 032 | Sidebar Tags Widget | Move tags from post cards to a top-10 sidebar widget with link to tags page |

### Reading Experience

| # | Feature | Rationale |
|---|---------|-----------|
| 024 | Estimated Reading Time | Sets expectations for readers — helps decide when to read |
| 025 | Table of Contents | In-post navigation for longer articles — jump to sections |
| 026 | Back to Top Button | Quick return to top on long pages — standard UX pattern |
| 027 | Scroll Progress Indicator | Visual feedback showing reading position within a post |
| 031 | Series Badge Redesign | Simplify series indicator on post cards — sequenced before 025 TOC |

### Navigation

| # | Feature | Rationale |
|---|---------|-----------|
| 029 | Pagination | Break long post lists into pages as content volume grows |
| 030 | Visible Breadcrumbs | Surface the existing BreadcrumbList schema as visible navigation on post pages |

## Feature Descriptions

### 001 — Bootstrap Integration

Replace Minima's CSS foundation with Bootstrap 5. Install Bootstrap's Sass source into the Jekyll build pipeline, set up the grid system, and establish the base component library. This is the foundation for all subsequent UI work.

### 002 — Custom Theme

Build custom Jekyll layouts and includes on top of Bootstrap, replacing Minima's default templates. Define the site's visual identity — typography, color palette, spacing, header, footer, and navigation. All pages and posts use the new theme.

### 003 — Tags & Categories

Add taxonomy pages for tags and categories. Each tag and category gets an archive page listing all associated posts. Posts display their tags and categories with links to the corresponding archive pages.

### 004 — Series Support

Enable multi-part blog post series. Posts within a series are linked together with previous/next navigation and a series table of contents. Series metadata is managed through front matter.

### 005 — Contact Form

Add a contact page with a mailto link for reader communication. Styled consistently with the site theme using Bootstrap components.

### 006 — Personalize Site

Replace all placeholder values in `_config.yml` with real site title, description, email, and social links. Update the about page with real content. Remove the default welcome post.

### 007 — Custom Homepage

Replace the default post list with a designed landing page featuring a hero section, featured posts, and an about blurb. Responsive layout using Bootstrap grid.

### 008 — SEO Foundation

Implement comprehensive structured data and meta tag strategy. jekyll-seo-tag (v2.8.0) already generates basic JSON-LD (WebSite, BlogPosting) and Open Graph tags — this feature enriches that foundation. Key additions: configure `site.logo` and `site.social.links` to unlock plugin features; add `image` to post front matter for Article rich results; build custom `_includes/schema/` templates for BreadcrumbList, enhanced BlogPosting (wordCount, keywords, articleSection, inLanguage), and Person schema on the about page. Also: XML sitemap via jekyll-sitemap, canonical URL verification, and WebSite SearchAction after #009 Search is built. Research findings: [`docs/schema-markup-research.md`](../docs/schema-markup-research.md).

### 009 — Search

Add client-side search using Lunr.js. Build a search index at build time, add a search page with input and results display. Allow readers to find posts by title, content, tags, and categories.

### 010 — Related Posts

Display related content at the bottom of each blog post. Determine relatedness by shared tags and categories. Show 3-4 related posts with title, date, and excerpt.

### 011 — Code Block Enhancements

Improve the code block experience with a copy-to-clipboard button, a custom syntax highlighting theme, and optional line numbers. Styled to match the site theme.

### 012 — Analytics

Integrate Google Analytics (GA4) for tracking site traffic. Load the tracking script only in production (`JEKYLL_ENV=production`). Respect user privacy preferences where possible.

### 013 — Dark Mode

Add a light/dark theme toggle. Detect system preference via `prefers-color-scheme`, allow manual override, and persist the user's choice in localStorage. All components and Bootstrap customizations support both modes via CSS custom properties.

### 014 — Custom 404

Design a helpful, on-brand 404 error page. Include navigation back to the homepage, a search link (once search is built), and styling consistent with the site theme.

### 015 — Uses Page

Create a `/uses/` page listing tools, hardware, software, and development setup. Structured with categories and descriptions. A common page format in the developer blog community.

### 016 — Resume/CV Page

Create a dedicated `/resume/` page with professional experience, skills, education, and contact information. Styled for both web viewing and print. Separate from the about page.

### 018 — Ad Integration

Add advertising to generate revenue. Start with Google AdSense for broad coverage, then graduate to Carbon Ads or EthicalAds for better developer-audience alignment. Client-side JavaScript integration only (static site constraint). Load ad scripts only in production. Ad placement locations to be determined during implementation. Requires a privacy policy page for AdSense compliance. Research findings: [`docs/ad-integration-research.md`](../docs/ad-integration-research.md).

### 019 — Featured Posts

Display a curated "Featured Posts" section on the site highlighting the most popular articles. Phase 1: manually curated via `_data/featured_posts.yml` with a reusable Liquid include. Phase 2: automate data refresh with a scheduled GitHub Action that queries the Google Analytics Data API (GA4) for top-performing posts and commits updated data weekly, triggering a site rebuild. The same data file and templates are used in both phases — only the update mechanism changes. Research findings: [`docs/featured-posts-research.md`](../docs/featured-posts-research.md).

### 020 — Social Sharing

Add share buttons to blog posts so readers can easily share articles to social platforms, copy the link, or send via email. Plain URL-based share links for Twitter/X, LinkedIn, Reddit, and Hacker News — no third-party scripts, no tracking, no cookies. Includes a copy-to-clipboard button and progressive Web Share API support for mobile. Placed below post content in a reusable `_includes/social-share.html` component. Benefits from #008 SEO Foundation for rich link previews via Open Graph tags. Research findings: [`docs/social-sharing-research.md`](../docs/social-sharing-research.md).

### 021 — Comments

Add per-post commenting using Giscus, which stores comments as GitHub Discussions in the repository. Each post maps to its own Discussion thread via URL pathname. Single `<script>` tag integration — no backend, no tracking, no cookies. Readers authenticate with their GitHub account. Comments can be disabled per post via `comments: false` in front matter. Supports threaded replies, emoji reactions, and automatic dark mode matching. Configuration stored in `_config.yml`, rendered via `_includes/comments.html` in the post layout. Research findings: [`docs/commenting-system-research.md`](../docs/commenting-system-research.md).

### 017 — Multi-Language Support

Add multi-language support using jekyll-polyglot. Translate the full site (posts, pages, UI chrome) into Spanish, French, and German with English as the default. English content serves from root URLs; translated content gets language-prefixed paths (`/es/`, `/fr/`, `/de/`). Includes a language switcher in the nav, a JavaScript browser-language detection banner, hreflang SEO tags, and a custom `/translator` subagent for AI-assisted translation. Research findings: [`docs/multi-language-research.md`](../docs/multi-language-research.md).

### 022 — JS Module Migration

Migrate existing JavaScript files (`nav-keyboard.js`, `code-copy.js`, `search.js`) from the IIFE pattern to ES modules per `docs/code-guidelines.md`. Create an `assets/js/main.js` entry point that imports from `assets/js/modules/`. Update `_layouts/default.html` script tags from `<script defer>` to `<script type="module">`. Mini-spec tier — no research required, straightforward mechanical migration.

### 023 — Read More Link

Add a "Read more" link to post-card elements on the homepage, tag archive, and series archive pages. Currently the only clickable path to an article is the post title — this adds an explicit call-to-action below the excerpt that gives readers a second, more visible entry point. Styled as a text link consistent with the site theme, placed after the excerpt and before the tags. Accessible, with appropriate `aria-label` referencing the post title. Implemented in the shared post-card markup across `_layouts/home.html`, `_layouts/tag-archive.html`, and `_layouts/series-archive.html`.

### 024 — Estimated Reading Time

Display an estimated reading time (e.g., "3 min read") on post cards and at the top of post pages. Calculated from word count using a standard ~200–250 words-per-minute average. Implemented in Liquid — no JavaScript required. Shown alongside the post date in `post-card__meta` and `post__meta`. Helps readers set expectations and decide whether to read now or later. Minimum display of "1 min read" for short posts.

### 025 — Table of Contents

Auto-generate a table of contents from heading elements (h2–h4) within blog posts. Placed inside the post content area (after the intro paragraph), not in the header zone — this avoids conflict with the series TOC on series posts, which occupies the header zone. Both TOCs can coexist on series posts: the series TOC handles series navigation, the article TOC handles within-post navigation. Links anchor to each heading for in-page navigation. Can be disabled per post via `toc: false` in front matter. Pure HTML/CSS implementation preferred; JavaScript only if smooth-scroll or active-heading highlighting is desired. Particularly valuable for longer tutorial and technical posts. **Open consideration:** the existing series TOC may be replaced with a simpler link to the series archive page, which would eliminate the placement conflict entirely and simplify the post header for series posts. This decision should be evaluated during research.

### 026 — Back to Top Button

Add a floating "back to top" button that appears after the reader scrolls past a threshold (e.g., 300–400px). Smooth-scrolls to the top of the page on click. Positioned in the bottom-right corner, styled to match the site theme, with appropriate `aria-label`. Hidden by default and revealed via JavaScript scroll listener. Respects `prefers-reduced-motion` by disabling the smooth scroll animation. Small footprint — one include, minimal CSS, lightweight JS.

### 027 — Scroll Progress Indicator

Add a thin progress bar fixed to the very top of the viewport (above the site header) that fills left-to-right as the reader scrolls through a post. Full browser width, ~3px tall, using the site's primary color. Shown only on post pages (not the homepage or archive pages). Implemented with a small JavaScript scroll listener that calculates scroll percentage against the post content height. Respects `prefers-reduced-motion`. Provides visual orientation for long-form content without being intrusive.

### 028 — Newsletter Subscribe CTA

Add a call-to-action prompting readers to subscribe for email updates. Placed after post content (above or below social share buttons) and optionally in the sidebar. Email provider to be determined during research — options include Buttondown, Mailchimp, ConvertKit, or a simple "mailto" placeholder until a provider is chosen. The CTA itself is a reusable `_includes/newsletter-cta.html` component with a heading, short pitch, and subscribe link or embedded form. Styled consistently with the site theme. Can be disabled per post via `newsletter: false` in front matter. No third-party scripts loaded unless an embedded form is used.

### 029 — Pagination

Paginate the homepage post list and archive pages as content volume grows. Use `jekyll-paginate-v2` for flexible pagination across multiple layouts (home, tag archive, series archive). Display page numbers, previous/next links, and a "Page X of Y" indicator. Configured via `_config.yml` with a sensible default (e.g., 10 posts per page). Styled consistently with the site theme. Triggered when the post count exceeds a practical threshold — can be built proactively or deferred until content volume warrants it.

### 030 — Visible Breadcrumbs

Surface the existing BreadcrumbList structured data (built in #008 SEO Foundation) as a visible breadcrumb trail on post pages. Display a simple "Home > Tag > Post Title" path above the post title. Links to the homepage and relevant tag archive page. Styled as a small, muted navigation element that doesn't compete with the post title. Improves orientation — especially for readers who arrive via search or social links and need to understand where they are in the site hierarchy.

### 031 — Series Badge Redesign

Redesign the series indicator on post cards. Replace the current pill-shaped `series-badge` component with a simpler h3 element containing a link to the series archive page. Move it above the `post-card__excerpt` element (currently positioned below it). This simplifies the post card layout and gives the series name more visual prominence. Touches `_includes/series-badge.html`, `assets/css/_partials/_series.scss`, and the post-card markup in `_layouts/home.html`, `_layouts/tag-archive.html`, and `_layouts/series-archive.html`. Should be built before 025 (Table of Contents) since both features affect how series context is presented — settling the post-card series treatment first informs the TOC decision about whether to also simplify the inline series TOC on post pages.

### 032 — Sidebar Tags Widget

Remove tags from post-card elements on the homepage, tag archive, and series archive pages. Replace with a "Popular Tags" section in the sidebar (`_includes/sidebar.html`) that displays the 10 most-used tags as links, plus a "View all tags" link to the existing `/tags/` page. Tags are counted and sorted by frequency using Liquid. This declutters the post cards while keeping tag discovery accessible from every page that renders the sidebar. Touches `_layouts/home.html`, `_layouts/tag-archive.html`, `_layouts/series-archive.html` (remove tag markup), `_includes/sidebar.html` (add tags section), and `assets/css/_partials/_sidebar.scss` (style the tag list).

## Dependencies

Features with hard dependencies on prior work:

- **002 Custom Theme** depends on **001 Bootstrap Integration**
- **007 Custom Homepage** depends on **002 Custom Theme**
- **013 Dark Mode** depends on **002 Custom Theme**
- **014 Custom 404** depends on **002 Custom Theme**

- **017 Multi-Language Support** benefits from **008 SEO Foundation** being in place first (shared concerns around meta tags, sitemaps, structured data)
- **018 Ad Integration** benefits from **002 Custom Theme** (ad placement needs finalized layouts) and **012 Analytics** (traffic data informs provider choice and placement)

- **019 Featured Posts** Phase 2 depends on **012 Analytics** (GA4 must be collecting data); Phase 1 has no dependencies
- **020 Social Sharing** benefits from **008 SEO Foundation** (Open Graph tags enable rich link previews when shared)
- **021 Comments** has no hard dependencies; benefits from **013 Dark Mode** for theme matching

- **025 Table of Contents** should be built after **031 Series Badge Redesign** (settling the series treatment on post cards informs the TOC decision about the inline series TOC on post pages)
- **028 Newsletter Subscribe CTA** has no hard dependencies; benefits from choosing an email provider before implementation
- **030 Visible Breadcrumbs** benefits from **008 SEO Foundation** (reuses existing BreadcrumbList schema logic)

All other features can technically be built independently but will benefit from Bootstrap and the custom theme being in place first.

## Notes

- Priority order may shift as the project evolves
- New features are appended to the bottom of the queue and re-prioritized as needed
- Each feature follows the spec engineering workflow (Research & Planning → Implementation → Testing → Acceptance)
