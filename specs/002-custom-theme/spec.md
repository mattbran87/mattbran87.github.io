# Feature: Custom Theme

> **Spec ID:** 002
> **Status:** Implementation Complete — Ready for Testing
> **Created:** 2026-02-22
> **Completed:** —

## Goal

Build custom Jekyll layouts and includes on top of the Bootstrap 5 foundation (spec 001), replacing Minima entirely with a site-specific theme based on Bootstrap's [blog template](https://getbootstrap.com/docs/5.3/examples/blog/). Define the site's visual identity — typography, color palette, spacing, header, footer, sidebar, and navigation — so all pages and posts use the new theme.

## Background

The site currently uses Minima 2.5 as its gem-based theme, providing default layouts (`default`, `home`, `page`, `post`) and includes (`header`, `footer`, `head`, `social-icons`, etc.). Spec 001 replaced Minima's CSS with Bootstrap 5 Sass but kept Minima's layouts and includes intact as a fallback. This spec completes the transition by:

1. Creating project-owned layouts and includes based on the Bootstrap blog template
2. Fully removing the Minima gem (from both `_config.yml` and `Gemfile`)
3. Explicitly adding `jekyll-seo-tag` (previously a hidden Minima dependency)

The Bootstrap blog template provides the structural reference: centered header, blog posts in an 8/4 grid with sidebar on the homepage, clean post typography, and a simple footer. We adapt this template for Jekyll's Liquid templating while following the project's accessibility and code conventions.

## Requirements

- [ ] Create `_layouts/default.html` — base HTML shell: `<html lang="{{ site.lang | default: 'en' }}">`, head include, skip-to-content link (before header), header include, `<main>` with `id="main-content" tabindex="-1"`, footer include, Bootstrap JS before `</body>` with `defer`
- [ ] Create `_layouts/home.html` — extends `default`. Bootstrap blog template layout: 8/4 grid with post list (col-md-8) and sidebar (col-md-4). Posts show title, date, excerpt, and tags.
- [ ] Create `_layouts/page.html` — extends `default`. Centered content, `<h1>` page title, body content.
- [ ] Create `_layouts/post.html` — extends `default`. Centered content with `<h1>` post title, date, tags, content body, and previous/next post navigation.
- [ ] Create `_includes/head.html` — `<head>` with charset, viewport, `{% seo %}` tag, CSS link, `{% feed_meta %}` tag (no JS here — Bootstrap JS loads before `</body>` in default.html)
- [ ] Create `_includes/header.html` — site header with Bootstrap navbar: site title/brand as home link, responsive navigation with hamburger menu on mobile, `aria-label` on `<nav>`
- [ ] Create `_includes/footer.html` — site footer with copyright year, site description, social links
- [ ] Create `_includes/sidebar.html` — Bootstrap blog template sidebar: About section (from `site.description`), Recent Posts (last 5), Archives (monthly grouping via pure Liquid on `site.posts`), Social/Elsewhere links (from existing `_config.yml` username fields: `github_username`, `twitter_username`)
- [ ] Update color palette in `_variables.scss` Layer 1 and Layer 2. Fix link color contrast (current `#2a7ae2` at 4.56:1 — target 5:1+ for comfortable WCAG AA margin).
- [ ] Update typography system — adjust line height to 1.65 for prose readability, heading font-weight to 700, heading scale sized for blog context
- [ ] Define spacing and layout tokens — content max-width for prose (42rem), header height, section spacing
- [ ] Responsive navigation — Bootstrap navbar collapse with hamburger on mobile, vendor `bootstrap.min.js` (no Popper)
- [ ] All layouts use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`). Add `role="list"` to `<ul>` elements styled with `list-style: none` to restore Safari VoiceOver list semantics.
- [ ] All layouts fully responsive: no horizontal overflow at 375px, 768px, 1280px
- [ ] Skip-to-content link: visually hidden, visible on focus, jumps to `<main>`
- [ ] Heading hierarchy: site title is `<p>` (not `<h1>`), each page owns its `<h1>`. (Post body content starting at `##`/`<h2>` is a content authoring convention per code-guidelines.md, not enforced by layout.)
- [ ] `aria-current="page"` on active navigation link
- [ ] Create SCSS partials for each component (skip-link, header, nav, footer, post, post-card, page, sidebar)
- [ ] Create `assets/js/nav-keyboard.js` — Escape key closes mobile menu, returns focus to toggle
- [ ] Fully remove Minima: delete `theme: minima` from `_config.yml`, remove `gem "minima"` from `Gemfile`, run `bundle install`
- [ ] Add `jekyll-seo-tag` gem explicitly to `Gemfile` and `plugins` in `_config.yml`
- [ ] Site builds successfully with `bundle exec jekyll build` — no errors
- [ ] Existing content (posts, pages, 404) renders correctly with the new layouts

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

- [ ] AC1: `_layouts/default.html`, `home.html`, `page.html`, `post.html` exist and render correctly
- [ ] AC2: `_includes/head.html`, `header.html`, `footer.html`, `sidebar.html` exist and render correctly
- [ ] AC3: `theme: minima` removed from `_config.yml` AND `gem "minima"` removed from `Gemfile`
- [ ] AC4: `jekyll-seo-tag` added to `Gemfile` and `_config.yml` plugins list
- [ ] AC5: Site header displays site title as home link and page navigation links
- [ ] AC6: Navigation is responsive: full links on desktop, collapsed hamburger on mobile (<768px)
- [ ] AC7: Site footer displays copyright year, social links, and site description
- [ ] AC8: Homepage uses Bootstrap blog template 8/4 grid: post list with sidebar
- [ ] AC9: Sidebar shows About, Recent Posts, Archives, and Social sections
- [ ] AC10: Skip-to-content link is present and functional (visible on focus, jumps to `<main>`)
- [ ] AC11: All pages use semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- [ ] AC12: Link color is `#0060df` (5.74:1 contrast on white, WCAG AA with comfortable margin above 5:1)
- [ ] AC13: Typography is consistent with defined scale; body line-height is 1.65
- [ ] AC14: Post layout displays title, date, tags, content, and previous/next navigation
- [ ] AC15: Page layout displays title and content (centered, max-width constrained)
- [ ] AC16: All pages render without horizontal overflow at 375px, 768px, 1280px
- [ ] AC17: `bundle exec jekyll build` completes without errors
- [ ] AC18: GitHub Actions deploy succeeds
- [ ] AC19: Pressing Escape while mobile nav is open closes the menu and returns focus to the hamburger button
- [ ] AC20: `<html>` element has a `lang` attribute (defaults to `"en"` if `site.lang` is not set)

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
| Acceptance | — | — | |

## Completion Notes

[Filled in when status is set to Completed. Summary of what was delivered, any deviations from the original spec, and lessons learned.]
