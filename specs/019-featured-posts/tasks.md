# Tasks: Featured Posts

> **Status:** Completed

## Last Session

- **Date:** 2026-02-26
- **Stopped at:** Task 4.4 — Deploy verification pending
- **Context:** Feature complete. Merged to master. Awaiting GitHub Actions deploy verification.
- **Next step:** Verify deploy succeeded and spot-check live site

> Update this block when **starting each task** and when **ending a session**. This ensures the next session knows exactly where to pick up, even if the previous session ended unexpectedly.

## Task Breakdown

### Phase 1: Research & Planning

**Stage 1: Research**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Review prior research in `docs/featured-posts-research.md` | Done | Phase 1 scope confirmed |
| 1.2 | Research sidebar integration approach (existing sidebar structure, styling patterns) | Done | Existing classes reusable, no new SCSS needed |

**Research Discussion** — Present findings to user and get approval before planning.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.R | Research discussion with user | Done | User simplified to title-only (no date). Placement clarified: below About, above Recent Posts. |

**Stage 2: Planning**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.3 | Record decisions and break down implementation tasks | Done | D4 (no date), D5 (slug matching) recorded |
| 1.4 | Get sign-off to move to Implementation | Pending | |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Create `_data/featured_posts.yml` with 3 AI Tools series slugs | Done | Committed: 549b290 |
| 2.2 | Create `_includes/featured-posts.html` component | Done | Committed: 4d1ca64 |
| 2.3 | Add `{% include featured-posts.html %}` to `_includes/sidebar.html` after About section | Done | Committed: 6438abb |
| 2.4 | Verify build and visual check | Done | Clean build, no warnings. HTML output correct. |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify all acceptance criteria | Done | All 9 criteria verified against build output |
| 3.2 | Test edge cases (empty file, invalid slug, missing file) | Done | All pass — silent skip, no render, no errors |
| 3.3 | Run Accessibility SME audit | Done | 0 issues — WCAG AA compliant |
| 3.4 | Run QA SME audit | Done | 0 errors, 0 warnings, 0 info |
| 3.5 | User testing plan | Done | All 5 items pass — sidebar order, links, dark mode, responsive |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review against spec requirements | Done | All 9 AC met, all 6 requirements met |
| 4.2 | Fill in completion notes in spec.md | Done | All 5 sections filled |
| 4.3 | Merge feature branch to master, delete branch | Done | |
| 4.4 | Verify GitHub Actions deploy and spot-check live site | Done | Deploy successful, live site confirmed |

## Summary

- **Total tasks:** 15
- **Completed:** 15
- **Remaining:** 0
