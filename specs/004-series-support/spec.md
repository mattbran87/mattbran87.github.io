# Feature: Series Support

> **Spec ID:** 004
> **Status:** Completed
> **Created:** 2026-02-23
> **Completed:** 2026-02-23

## Goal

Enable multi-part blog post series so readers can follow a sequence of related posts. Posts within a series are linked together with previous/next navigation and a series table of contents. Series metadata is managed through front matter.

## Background

The site now has Bootstrap 5, a custom theme, tags, and real content in place. As the blog grows, some topics will span multiple posts (e.g., a tutorial split into parts, or a deep-dive into a framework). Without series support, readers have no structured way to discover that related posts form a sequence or navigate between them in order. Series support provides this structure, complementing the existing tags taxonomy with ordered, sequential grouping.

## Requirements

- [x] Define a front matter convention for associating posts with a series (series name + part number)
- [x] Display series navigation (previous/next) on posts that belong to a series
- [x] Display a series table of contents on each post in the series, highlighting the current part
- [x] Create a series index page (`/series/`) listing all series with post counts and descriptions
- [x] Create individual series archive pages showing all posts in a series, in order
- [x] Style series components using Bootstrap and existing theme conventions
- [x] Ensure series navigation is accessible (keyboard navigable, proper ARIA, screen reader friendly)
- [x] Support a series being "in progress" (not all parts published yet)

## Constraints

- Pure Liquid/Jekyll — no plugins unless a strong case is made during Research
- Follow existing theme's Bootstrap conventions (BEM classes, custom properties)
- Maintain accessibility standards (WCAG AA) established by the custom theme
- Series order determined by explicit part numbers in front matter, not by date
- No changes to existing post URL structure
- Must work correctly with jekyll-archives (tags) already in place

## Acceptance Criteria

- [x] Posts can declare series membership via front matter (series name + part number)
- [x] A post in a series displays previous/next navigation linking to adjacent parts
- [x] A post in a series displays a table of contents listing all parts, with the current part highlighted
- [x] `/series/` page exists and lists all series with titles, descriptions, and post counts
- [x] Each series has an archive page showing all its posts in order
- [x] Series components are styled consistently with the site theme (Bootstrap)
- [x] Series navigation is keyboard accessible and screen reader friendly
- [x] Series with only one published post display gracefully (no broken prev/next)
- [x] Site builds without errors with `bundle exec jekyll build`
- [x] Existing tag functionality is unaffected

## Affected Files

- `_data/series.yml` — new data file for series metadata (title, description, status)
- `_includes/series-toc.html` — new include: series TOC with prev/next navigation
- `_includes/series-badge.html` — new include: compact badge for homepage post cards
- `_layouts/series-archive.html` — new layout for per-series archive pages
- `_layouts/post.html` — added series TOC include below post header
- `_layouts/home.html` — added series badge to post cards
- `series.html` — new series index page at `/series/`
- `series/building-with-ai-tools.html` — new per-series archive page
- `assets/css/_partials/_series.scss` — new SCSS partial for all series styles
- `assets/main.scss` — added `_series` import
- `_config.yml` — added `series.html` to `header_pages`
- `_posts/2026-02-23-ai-tools-getting-started.md` — new sample series post (Part 1)
- `_posts/2026-02-23-ai-tools-environment-setup.md` — new sample series post (Part 2)
- `_posts/2026-02-23-ai-tools-effective-prompting.md` — new sample series post (Part 3)

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-23 | 2026-02-23 | 7 decisions logged, all questions resolved |
| Implementation | 2026-02-23 | 2026-02-23 | 12 commits, pluralize fix + a11y fixes from Testing |
| Testing | 2026-02-23 | 2026-02-23 | 3 a11y issues found and fixed, all 10 AC pass |
| Acceptance | 2026-02-23 | 2026-02-23 | All requirements, criteria, and constraints verified |

## Completion Notes

Series support delivered using pure Liquid with `_data/series.yml` for centralized metadata. No plugins added — all logic handled by Liquid `where` and `sort` filters.

Key implementation details:
- `_data/series.yml` stores series title, description, and status (single source of truth)
- Posts declare `series` (slug) and `series_part` (integer) in front matter
- `_includes/series-toc.html` renders TOC + prev/next nav below the post header, with `aria-current="page"` on the current item
- `_includes/series-badge.html` shows compact "Part N / Series Title" on homepage post cards
- Manual per-series archive pages at `/series/slug/` with a shared `series-archive` layout
- Series index page at `/series/` with `<section aria-label>` wrapper
- BEM-named SCSS with CSS custom properties, focus-visible styles, and WCAG AA contrast on status badges

Deviations from original spec:
- `pluralize` Liquid filter does not exist in Jekyll — replaced with conditional
- Status badge colors darkened during Testing for WCAG AA contrast compliance

Lessons learned:
- Jekyll lacks `pluralize` — always verify filter availability before using
- Accessibility audit during Testing caught real focus-visible gaps — worth running every time
- The `_data` + front matter pattern works well and mirrors how Hugo and Eleventy handle series
