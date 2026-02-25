# Tasks: Social Sharing

> **Status:** In Progress (Implementation)

## Last Session

- **Date:** 2026-02-25
- **Stopped at:** All Implementation tasks (2.1–2.9) complete. Build verified.
- **Context:** All 9 new/modified files committed to `feature/020-social-sharing`. Jekyll build succeeds, HTML output verified for both full (post page) and compact (homepage post-cards) variants. Production URLs correct.
- **Next step:** Phase 2 sign-off, then Phase 3 Testing

> Update this block when **starting each task** and when **ending a session**. This ensures the next session knows exactly where to pick up, even after an unexpected end.

## Task Breakdown

### Phase 1: Research & Planning

**Stage 1: Research**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Research approaches, consult SMEs (Jekyll, A11y, CSS/Design, QA) | Done | 23 findings, 0 conflicts |
| 1.2 | Document findings in notes.md and decisions in decisions.md | Done | 13 decisions logged |

**Research Discussion** — Present findings to user and get approval before planning.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.R | Research discussion with user | Done | User added post-card compact variant requirement |

**Stage 2: Planning**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.3 | Record post-discussion decisions (D3 revised, D13 added) | Done | |
| 1.4 | Break down tasks, update spec, get sign-off | Done | |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Create feature branch `feature/020-social-sharing` | Done | |
| 2.2 | Build `_includes/social-share.html` — full variant | Done | Both full + compact in single file per D13 |
| 2.3 | Build `_includes/social-share.html` — compact variant | Done | Included in 2.2 commit |
| 2.4 | Create `assets/css/_partials/_social-share.scss` | Done | |
| 2.5 | Add social-share import to `assets/main.scss` | Done | |
| 2.6 | Create `assets/js/modules/social-share.js` | Done | |
| 2.7 | Add social-share import to `assets/js/main.js` | Done | |
| 2.8 | Add full share include to `_layouts/post.html` | Done | |
| 2.9 | Add compact share include to post-card layouts | Done | home.html, tag-archive.html, series-archive.html |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify all acceptance criteria | Pending | |
| 3.2 | Run Accessibility SME audit | Pending | |
| 3.3 | Run QA SME audit | Pending | |
| 3.4 | User testing plan | Pending | |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review, completion notes, merge | Pending | |
| 4.2 | Deploy verification | Pending | |

## Summary

- **Total tasks:** 17
- **Completed:** 13 (R&P + Implementation)
- **In Progress:** 0
- **Remaining:** 4 (Testing + Acceptance)
