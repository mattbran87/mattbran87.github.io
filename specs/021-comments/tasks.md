# Tasks: Comments

> **Status:** Completed

## Last Session

- **Date:** 2026-02-25
- **Stopped at:** Phase 3 Testing complete — all tests pass
- **Context:** 2 SME audits clean (1 QA warning fixed, 1 bug fixed during user testing). 10/10 user tests pass.
- **Next step:** Phase 4 Acceptance — final review, merge to master, deploy verification.

> Update this block when **starting each task** and when **ending a session**. This ensures the next session knows exactly where to pick up, even if the previous session ended unexpectedly.

## Task Breakdown

### Phase 1: Research & Planning

**Stage 1: Research**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Review existing research doc and codebase | Done | `docs/commenting-system-research.md` reviewed, post layout and social-share analyzed |
| 1.2 | Consult required SMEs (Jekyll, A11y, QA) | Done | 17 findings, all documented in notes.md |

**Research Discussion** — Present findings to user and get approval before planning.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.R | Research discussion with user | Done | User chose offcanvas panel, lazy load, button in social-share list |

**Stage 2: Planning**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.3 | Record decisions in decisions.md | Done | D1–D10 recorded |
| 1.4 | Break down tasks in tasks.md | Done | 8 implementation tasks |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Add Giscus config to `_config.yml` | Done | Nested under `comments.giscus.*` per D4. Committed f5fe34c. |
| 2.2 | Import Bootstrap offcanvas CSS | Done | Added `@import "bootstrap/scss/offcanvas"` to `assets/main.scss`. Committed 38b5041. |
| 2.3 | Create `_includes/comments.html` | Done | Offcanvas panel with heading, Giscus placeholder. Guarded by `unless page.comments == false`. Committed 38b5041. |
| 2.4 | Add Comments button to `_includes/social-share.html` | Done | Last `<li>` in full-variant list. Uses `data-bs-toggle="offcanvas"`. Committed 38b5041. |
| 2.5 | Add comments include to `_layouts/post.html` | Done | After `</article>`, before related-posts. Committed 38b5041. |
| 2.6 | Create `assets/js/modules/comments.js` | Done | Lazy-load on `show.bs.offcanvas`, theme sync exports, re-injection guard. |
| 2.7 | Add Giscus theme sync to `assets/js/modules/theme-toggle.js` | Done | Imports from comments.js, calls setGiscusTheme on toggle and OS change. |
| 2.8 | Create `assets/css/_partials/_comments.scss` | Done | Panel width, title sizing, Giscus container min-height. Imported in main.scss. |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify all acceptance criteria | Done | 14 criteria checked — 11 pass (code), 3 confirmed by user |
| 3.2 | Accessibility SME audit | Done | 0 errors, 0 warnings, 1 info |
| 3.3 | QA SME audit | Done | 1 warning (missing Liquid comment) — fixed in 08cfd56 |
| 3.4 | User testing | Done | 10/10 tests pass including mobile and comments:false opt-out |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review and sign-off | Done | All 12 requirements met, all 14 AC met, all 10 decisions followed |
| 4.2 | Merge and deploy verification | Done | |

## Summary

- **Total tasks:** 16
- **Completed:** 16
- **Remaining:** 0
