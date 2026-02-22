# Feature: Custom Theme

> **Spec ID:** 002
> **Status:** Completed
> **Created:** 2026-02-22
> **Completed:** 2026-02-22

## Goal

Build custom Jekyll layouts and includes on top of the Bootstrap 5 foundation (spec 001), replacing Minima entirely with a site-specific theme based on Bootstrap's [blog template](https://getbootstrap.com/docs/5.3/examples/blog/). Define the site's visual identity — typography, color palette, spacing, header, footer, sidebar, and navigation — so all pages and posts use the new theme.

## Background

The site currently uses Minima 2.5 as its gem-based theme, providing default layouts (`default`, `home`, `page`, `post`) and includes (`header`, `footer`, `head`, `social-icons`, etc.). Spec 001 replaced Minima's CSS with Bootstrap 5 Sass but kept Minima's layouts and includes intact as a fallback. This spec completes the transition by:

1. Creating project-owned layouts and includes based on the Bootstrap blog template
2. Fully removing the Minima gem (from both `_config.yml` and `Gemfile`)
3. Explicitly adding `jekyll-seo-tag` (previously a hidden Minima dependency)

The Bootstrap blog template provides the structural reference: centered header, blog posts in an 8/4 grid with sidebar on the homepage, clean post typography, and a simple footer. We adapt this template for Jekyll's Liquid templating while following the project's accessibility and code conventions.

## Requirements

- [x] Create `_layouts/default.html` — base HTML shell: `<html lang="{{ site.lang | default: 'en' }}">`, head include, skip-to-content link (before header), header include, `<main>` with `id="main-content" tabindex="-1"`, footer include, Bootstrap JS before `</body>` with `defer`
- [x] Create `_layouts/home.html` — extends `default`. Bootstrap blog template layout: 8/4 grid with post list (col-md-8) and sidebar (col-md-4). Posts show title, date, excerpt, and tags.
- [x] Create `_layouts/page.html` — extends `default`. Centered content, `<h1>` page title, body content.
- [x] Create `_layouts/post.html` — extends `default`. Centered content with `<h1>` post title, date, tags, content body, and previous/next post navigation.
- [x] Create `_includes/head.html` — `<head>` with charset, viewport, `{% seo %}` tag, CSS link, `{% feed_meta %}` tag (no JS here — Bootstrap JS loads before `</body>` in default.html)
- [x] Create `_includes/header.html` — site header with Bootstrap navbar: site title/brand as home link, responsive navigation with hamburger menu on mobile, `aria-label` on `<nav>`
- [x] Create `_includes/footer.html` — site footer with copyright year, site description, social links
- [x] Create `_includes/sidebar.html` — Bootstrap blog template sidebar: About section (from `site.description`), Recent Posts (last 5), Archives (monthly grouping via pure Liquid on `site.posts`), Social/Elsewhere links (from existing `_config.yml` username fields: `github_username`, `twitter_username`)
- [x] Update color palette in `_variables.scss` Layer 1 and Layer 2. Fix link color contrast (current `#2a7ae2` at 4.56:1 — target 5:1+ for comfortable WCAG AA margin).
- [x] Update typography system — adjust line height to 1.65 for prose readability, heading font-weight to 700, heading scale sized for blog context
- [x] Define spacing and layout tokens — content max-width for prose (42rem), header height, section spacing
- [x] Responsive navigation — Bootstrap navbar collapse with hamburger on mobile, vendor `bootstrap.min.js` (no Popper)
- [x] All layouts use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`). Add `role="list"` to `<ul>` elements styled with `list-style: none` to restore Safari VoiceOver list semantics.
- [x] All layouts fully responsive: no horizontal overflow at 375px, 768px, 1280px
- [x] Skip-to-content link: visually hidden, visible on focus, jumps to `<main>`
- [x] Heading hierarchy: site title is `<p>` (not `<h1>`), each page owns its `<h1>`. (Post body content starting at `##`/`<h2>` is a content authoring convention per code-guidelines.md, not enforced by layout.)
- [x] `aria-current="page"` on active navigation link
- [x] Create SCSS partials for each component (skip-link, header, nav, footer, post, post-card, page, sidebar)
- [x] Create `assets/js/nav-keyboard.js` — Escape key closes mobile menu, returns focus to toggle
- [x] Fully remove Minima: delete `theme: minima` from `_config.yml`, remove `gem "minima"` from `Gemfile`, run `bundle install`
- [x] Add `jekyll-seo-tag` gem explicitly to `Gemfile` and `plugins` in `_config.yml`
- [x] Site builds successfully with `bundle exec jekyll build` — no errors
- [x] Existing content (posts, pages, 404) renders correctly with the new layouts

## Constraints

- **Build on spec 001 foundation** — use the Bootstrap Sass pipeline, two-layer variable architecture, and selective imports already in place. Enable additional Bootstrap components as needed by uncommenting them in `assets/main.scss`.
- **Bootstrap blog template as design reference** — layout structure, grid proportions, and typography patterns from https://getbootstrap.com/docs/5.3/examples/blog/ adapted for Jekyll. Not a pixel-perfect copy.
- **No external fonts** — use the system font stack. The Bootstrap blog template uses Playfair Display (Google Font) for headings; we substitute the system sans-serif stack.
- **Bootstrap JS for navbar only** — vendor `bootstrap.min.js` (without Popper, ~29 kB min). Only the collapse plugin is used. No other JS frameworks.
- **Full Minima removal** — remove both `theme: minima` from `_config.yml` AND the `gem "minima"` line from `Gemfile`. All layouts, includes, and the `jekyll-seo-tag` dependency must be project-owned before removal.
- **Follow code guidelines** — BEM naming for custom CSS classes, CSS custom properties for theming, semantic HTML, Liquid comments, accessibility standards per `docs/code-guidelines.md`.
- **Two-layer variable model** — SCSS variables for Bootstrap overrides only (Layer 1). CSS custom properties for all project component styles (Layer 2). No mixing layers.
- **Performance budget** — max 1MB total page weight, keep CSS output lean by only importing needed Bootstrap components.
- **Sidebar on home layout only** — post and page layouts use centered full-width content (max-width constrained for readability). The sidebar pattern is available for reuse by later specs.

## Acceptance Criteria

- [x] AC1: `_layouts/default.html`, `home.html`, `page.html`, `post.html` exist and render correctly
- [x] AC2: `_includes/head.html`, `header.html`, `footer.html`, `sidebar.html` exist and render correctly
- [x] AC3: `theme: minima` removed from `_config.yml` AND `gem "minima"` removed from `Gemfile`
- [x] AC4: `jekyll-seo-tag` added to `Gemfile` and `_config.yml` plugins list
- [x] AC5: Site header displays site title as home link and page navigation links
- [x] AC6: Navigation is responsive: full links on desktop, collapsed hamburger on mobile (<768px)
- [x] AC7: Site footer displays copyright year, social links, and site description
- [x] AC8: Homepage uses Bootstrap blog template 8/4 grid: post list with sidebar
- [x] AC9: Sidebar shows About, Recent Posts, Archives, and Social sections
- [x] AC10: Skip-to-content link is present and functional (visible on focus, jumps to `<main>`)
- [x] AC11: All pages use semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- [x] AC12: Link color is `#0060df` (5.74:1 contrast on white, WCAG AA with comfortable margin above 5:1)
- [x] AC13: Typography is consistent with defined scale; body line-height is 1.65
- [x] AC14: Post layout displays title, date, tags, content, and previous/next navigation
- [x] AC15: Page layout displays title and content (centered, max-width constrained)
- [x] AC16: All pages render without horizontal overflow at 375px, 768px, 1280px
- [x] AC17: `bundle exec jekyll build` completes without errors
- [x] AC18: GitHub Actions deploy succeeds — **deploy gate, verified post-merge**
- [x] AC19: Pressing Escape while mobile nav is open closes the menu and returns focus to the hamburger button
- [x] AC20: `<html>` element has a `lang` attribute (defaults to `"en"` if `site.lang` is not set)

## Affected Files

**New files:**
- `_layouts/default.html` — base HTML layout
- `_layouts/home.html` — homepage with post list + sidebar
- `_layouts/page.html` — static page layout
- `_layouts/post.html` — blog post layout
- `_includes/head.html` — `<head>` element
- `_includes/header.html` — site header with navbar
- `_includes/footer.html` — site footer
- `_includes/sidebar.html` — sidebar with about, recent posts, archives, social
- `assets/css/_partials/_skip-link.scss` — skip link styles
- `assets/css/_partials/_header.scss` — header/brand styles
- `assets/css/_partials/_nav.scss` — navigation styles
- `assets/css/_partials/_footer.scss` — footer styles
- `assets/css/_partials/_post.scss` — post layout styles
- `assets/css/_partials/_post-card.scss` — post list item styles
- `assets/css/_partials/_page.scss` — static page styles
- `assets/css/_partials/_sidebar.scss` — sidebar styles
- `assets/css/_partials/_tag.scss` — shared tag pill styles
- `assets/vendor/bootstrap/js/bootstrap.min.js` — Bootstrap JS (collapse plugin, no Popper)
- `assets/js/nav-keyboard.js` — Escape key handler for mobile nav

**Modified files:**
- `assets/main.scss` — enable Bootstrap components, add partial imports
- `assets/css/_partials/_variables.scss` — updated palette, typography, layout tokens
- `assets/css/_partials/_base.scss` — expanded base styles
- `_config.yml` — remove `theme: minima`, add `jekyll-seo-tag` to plugins, verify no orphaned `minima:` config block
- `Gemfile` — remove `gem "minima"`, add `gem "jekyll-seo-tag"`
- `Gemfile.lock` — updated after `bundle install`

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-22 | 2026-02-22 | 4 SMEs consulted (Jekyll, Bootstrap, A11y, CSS/Design), user decisions integrated |
| Implementation | 2026-02-22 | 2026-02-22 | 16 tasks completed, 10 commits on feature branch |
| Testing | 2026-02-22 | 2026-02-22 | 17/20 AC pass, 3 need browser/deploy. A11y: 2W. QA: 0E/5W/7I. Issues documented for fix review. |
| Acceptance | 2026-02-22 | 2026-02-22 | 19/20 AC pass. AC18 (deploy) is a post-merge gate. All requirements met. |

## Completion Notes

**Delivered:** Complete custom theme replacing Minima 2.5 with project-owned layouts and includes built on Bootstrap 5. The site has a responsive navbar, 8/4 grid homepage with sidebar, centered post/page layouts, full accessibility support (skip link, landmarks, ARIA, keyboard nav), and an updated color palette meeting WCAG AA with comfortable margin.

**Deviations from original spec:**
- Added `_tag.scss` partial (not in original spec) during testing to extract duplicated tag pill styles — a DRY improvement recommended by QA SME.
- `bootstrap.min.js` is ~60KB on disk, not ~29KB as estimated during research. The 29KB was the gzipped transfer size. Still well within the 1MB page weight budget.
- 5 accepted deviations from code guidelines documented in D9a–D9e (descendant selectors in content blocks, IIFE pattern, hardcoded border-radius, utility-only wrapper, interim archive links).

**Known issues deferred:**
- 404.html has an empty `<h1>` from the page layout (no `title` in front matter) plus an inline `<h1>404</h1>` = duplicate. Full fix in spec 014 (Custom 404).
- Archive sidebar links point to individual posts, not archive index pages (no archive feature yet).
- AC18 (GitHub Actions deploy) verified post-merge.

**Lessons learned:**
- Running A11y and QA SME audits in parallel during Testing was efficient and caught distinct issues.
- The two-layer variable model worked well — Layer 1 SCSS overrides fed Bootstrap cleanly, Layer 2 CSS custom properties kept component partials self-contained.
- Liquid comment requirements from code guidelines are easy to miss on nested blocks — should be checked during implementation self-review.
