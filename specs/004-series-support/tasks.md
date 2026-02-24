# Tasks: Series Support

> **Status:** Completed

## Task Breakdown

### Phase 1: Research & Planning

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Research series implementations in Jekyll | Done | Pure Liquid + data file chosen |
| 1.2 | Investigate front matter conventions | Done | `series` (slug) + `series_part` (integer) |
| 1.3 | Determine approach for archive pages | Done | Manual per-series pages + index |
| 1.4 | Document decisions in decisions.md | Done | 7 decisions recorded (D1–D7) |
| 1.5 | Break down Phase 2 implementation tasks | Done | 10 tasks defined |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Create `_data/series.yml` with sample series | Done | One sample series: "Building with AI Tools" |
| 2.2 | Create sample series posts | Done | 3 posts in the sample series |
| 2.3 | Create `_includes/series-toc.html` | Done | TOC + prev/next nav, ARIA, nil guards |
| 2.4 | Create `_includes/series-badge.html` | Done | Compact badge for homepage cards |
| 2.5 | Integrate series TOC into `_layouts/post.html` | Done | Below title/meta, conditional render |
| 2.6 | Integrate series badge into `_layouts/home.html` | Done | Above tags section on post cards |
| 2.7 | Create `_layouts/series-archive.html` | Done | Description, status badge, ordered posts |
| 2.8 | Create `/series/` index + per-series archive pages | Done | series.html + series/building-with-ai-tools.html |
| 2.9 | Add series styles (`_series.scss`) | Done | BEM classes, CSS custom properties |
| 2.10 | Add Series to header navigation | Done | Updated header_pages in _config.yml |
| 2.11 | Fix pluralize filter (not native to Jekyll) | Done | Replaced with Liquid conditional |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify all acceptance criteria | Done | All 10 pass |
| 3.2 | Test edge cases | Done | First/last part nav, non-series posts verified |
| 3.3 | Accessibility audit | Done | 3 issues found and fixed |
| 3.4 | Build validation | Done | Clean build, no errors or warnings |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review against spec | Done | All requirements, criteria, constraints verified |
| 4.2 | Update documentation and mark complete | Done | |

## Summary

- **Total tasks:** 22
- **Completed:** 22
- **Remaining:** 0
