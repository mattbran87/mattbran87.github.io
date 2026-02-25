# Feature Roadmap

> **Last Updated:** 2026-02-24
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
| 020 | Social Sharing | `specs/020-social-sharing/` | Research & Planning |
| 021 | Comments | [`docs/commenting-system-research.md`](../docs/commenting-system-research.md) | Not Started |
| 022 | JS Module Migration | — | Completed |

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

All other features can technically be built independently but will benefit from Bootstrap and the custom theme being in place first.

## Notes

- Priority order may shift as the project evolves
- New features are appended to the bottom of the queue and re-prioritized as needed
- Each feature follows the spec engineering workflow (Research & Planning → Implementation → Testing → Acceptance)
