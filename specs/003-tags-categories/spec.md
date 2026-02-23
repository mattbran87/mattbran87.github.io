# Feature: Tags & Categories

> **Spec ID:** 003
> **Status:** Completed
> **Created:** 2026-02-22
> **Completed:** 2026-02-22

## Goal

Add a tags-only taxonomy system so readers can browse posts by topic. Each tag gets its own archive page, and a tags index page lists all tags with post counts.

## Background

The site has Bootstrap 5, a custom theme, and real content in place. Posts currently have no discoverable way to browse by topic. Tags are the simplest, most flexible taxonomy for a personal dev blog — they don't affect URLs, support multiple labels per post, and are widely understood by readers.

## Requirements

- [x] Install and configure `jekyll-archives` plugin for tag archive generation
- [x] Create a tag archive layout showing all posts for a given tag
- [x] Create a tags index page (`/tags/`) listing all tags with post counts
- [x] Display tags on each post (on the post detail page) with links to the tag archive
- [x] Display tags on post list items (homepage) with links to the tag archive
- [x] Style all tag components using Bootstrap and existing theme conventions
- [x] Ensure all existing posts have appropriate tags in front matter
- [x] Tag archive URLs follow the pattern `/tags/:tag/`

## Constraints

- Tags only — no categories taxonomy
- Use `jekyll-archives` plugin (not hand-rolled Liquid)
- Follow existing theme's Bootstrap conventions (BEM classes, custom properties)
- Maintain accessibility standards (WCAG AA) established by the custom theme
- No changes to existing URL structure for posts

## Acceptance Criteria

- [x] `jekyll-archives` is installed and configured in `Gemfile` and `_config.yml`
- [x] `/tags/` page exists and lists all tags with post counts
- [x] Each tag has an archive page at `/tags/:tag/` listing associated posts
- [x] Post detail pages display tags as clickable links
- [x] Homepage post list items display tags as clickable links
- [x] Tag styling is consistent with the site theme (Bootstrap components)
- [x] All tag links navigate correctly to their archive pages
- [x] Site builds without errors with `bundle exec jekyll build`
- [x] Tags are accessible (proper semantics, keyboard navigable, sufficient contrast)

## Affected Files

- `Gemfile` — added jekyll-archives gem
- `Gemfile.lock` — updated lock file
- `_config.yml` — added jekyll-archives plugin, configuration, and header_pages
- `_layouts/tag-archive.html` — new layout for per-tag archive pages
- `tags.html` — new tags index page at /tags/
- `_includes/post-tags.html` — new shared include for rendering tag links
- `_layouts/post.html` — updated to use post-tags include
- `_layouts/home.html` — updated to use post-tags include
- `_posts/2026-02-22-welcome-to-jekyll.markdown` — replaced categories with tags, added description
- `assets/css/_partials/_tag.scss` — added link styles, hover/focus states, index page styles
- `assets/css/_partials/_variables.scss` — added border-radius and transition design tokens

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-22 | 2026-02-22 | All questions resolved, 4 decisions logged |
| Implementation | 2026-02-22 | 2026-02-22 | 7 commits, QA review passed |
| Testing | 2026-02-22 | 2026-02-22 | All 9 AC pass, no issues found |
| Acceptance | 2026-02-22 | 2026-02-22 | All requirements and constraints verified |

## Completion Notes

Tags-only taxonomy system delivered using jekyll-archives v2.3.0. The codebase was already partially prepared (tag spans in templates, SCSS, design tokens), so the main work was installing the plugin, creating archive pages, and converting spans to linked pills via a shared include.

Key implementation details:
- `jekyll-archives` configured for tags only at `/tags/:name/`
- `header_pages` config added to prevent archive pages from appearing in the navbar
- Shared `_includes/post-tags.html` used across homepage, post detail, and tag archive layouts
- New design tokens added: `--border-radius-pill`, `--border-radius-badge`, `--transition-fast`
- All tag links include `aria-label` for screen reader accessibility

No deviations from the original spec. The affected files list was updated to reflect the actual files changed (e.g., `tag-archive.html` instead of `tag_archive.html`, `tags.html` in root instead of `_pages/`).
