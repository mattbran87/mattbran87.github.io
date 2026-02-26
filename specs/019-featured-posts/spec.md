# Feature: Featured Posts

> **Spec ID:** 019
> **Status:** Completed
> **Created:** 2026-02-26
> **Completed:** 2026-02-26

## Goal

Display a curated "Featured Posts" section in the sidebar to highlight the site's best content. Manually curated via a data file — no analytics dependency.

## Background

As the site grows, readers who land on the homepage or browse via tags may miss the best content. A Featured Posts widget in the sidebar gives persistent visibility to top articles from every page that renders the sidebar. This is Phase 1 of the two-phase plan described in `docs/featured-posts-research.md` — manual curation now, automated GA4 refresh later when Analytics (012) is unblocked.

## Requirements

- [x] Create `_data/featured_posts.yml` with 3 featured post entries
- [x] Build `_includes/featured-posts.html` as a reusable Liquid component
- [x] Display the widget in the sidebar below the About section, above Popular Tags
- [x] Show exactly 3 featured posts as linked titles (no date) — same format as Recent Posts
- [x] Graceful degradation — if the data file is empty or missing, render nothing
- [x] Style consistently with existing sidebar sections (Recent Posts, Series, Author Links)

## Constraints

- Phase 1 only — no GitHub Action, no GA4 integration
- Sidebar placement only (not homepage or other layouts)
- Maximum 3 featured posts displayed
- No third-party scripts or dependencies
- Must work in both light and dark mode
- Follow existing BEM and SCSS conventions

## Acceptance Criteria

- [x] `_data/featured_posts.yml` exists with 3 post slugs
- [x] Featured Posts section appears in the sidebar below About, above Popular Tags
- [x] Each featured post displays its title as a link (no date)
- [x] Links navigate correctly to the full post
- [x] If a slug in the data file does not match any published post, that entry is silently skipped
- [x] Widget renders correctly in both light and dark mode
- [x] Widget does not render when the data file is empty or contains no valid entries
- [x] Accessible — proper heading hierarchy, link text, semantic markup
- [x] Responsive — displays correctly at all breakpoints where the sidebar is visible

## Affected Files

- `_data/featured_posts.yml` — new data file with featured post slugs
- `_includes/featured-posts.html` — new Liquid component
- `_includes/sidebar.html` — add featured posts include + reorder Recent Posts below Series

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-26 | 2026-02-26 | Research complete, planning complete, signed off |
| Implementation | 2026-02-26 | 2026-02-26 | 4 commits: data file, include, sidebar integration, sidebar reorder |
| Testing | 2026-02-26 | 2026-02-26 | 0 issues from SME audits, all user tests pass |
| Acceptance | 2026-02-26 | 2026-02-26 | All criteria met, merged to master |

## Completion Notes

### Delivered
- Featured Posts sidebar widget: `_data/featured_posts.yml` (3 curated slugs), `_includes/featured-posts.html` (Liquid include), integrated into `_includes/sidebar.html` below About section. Reuses existing `sidebar__*` BEM classes — no new SCSS. Also reordered sidebar: Recent Posts moved below Series.

### Deviations
- Removed date display — user simplified to title-only links matching Recent Posts format (D4)
- Sidebar reorder — user requested Recent Posts move below Series during implementation; not in original spec but improves content hierarchy

### What Went Well
- Existing sidebar patterns made implementation trivial — all BEM classes reusable, no new CSS needed
- Pre-recorded user decisions (D1–D3) during spec creation eliminated back-and-forth during research
- Clean SME audits — 0 issues from both Accessibility and QA, validating the pattern-reuse approach

### What Didn't Go Well
- Nothing — straightforward feature with no friction

### Lessons Learned
- When a new sidebar section reuses existing patterns exactly, no new SCSS partial is needed — the existing `sidebar__*` classes are sufficient. This keeps the CSS footprint flat as sidebar sections grow.
