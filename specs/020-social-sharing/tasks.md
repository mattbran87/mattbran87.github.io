# Tasks: Social Sharing

> **Status:** In Progress (Research & Planning)

## Last Session

- **Date:** 2026-02-25
- **Stopped at:** Planning complete. Ready for Implementation.
- **Context:** Research & Planning finished. 4 SMEs, 23 findings, 13 decisions. User added post-card compact variant and removed Hacker News. Full variant: Twitter/X, LinkedIn, Reddit, Email, Copy Link, Web Share. Compact variant: Copy Link + Web Share only.
- **Next step:** Start Phase 2 — read `specs/020-social-sharing/prompts/02-implementation.md`, create feature branch, begin task 2.1

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
| 2.1 | Create feature branch `feature/020-social-sharing` | Pending | |
| 2.2 | Build `_includes/social-share.html` — full variant | Pending | Liquid template with 6 share options (Twitter/X, LinkedIn, Reddit, Email, Copy Link, Web Share), `<nav>` wrapper, `<ul>` list, inline SVG icons, visible text labels, aria-live region, `share: false` guard |
| 2.3 | Build `_includes/social-share.html` — compact variant | Pending | Same include, `compact` parameter branch renders only Copy Link + Web Share. Hidden by default, revealed by JS. Uses `data-url`/`data-title` attributes. |
| 2.4 | Create `assets/css/_partials/_social-share.scss` | Pending | BEM styles: `.social-share` block, ghost-style pills, flex layout, hover/focus/copied states, reduced-motion, compact variant styles |
| 2.5 | Add social-share import to `assets/main.scss` | Pending | |
| 2.6 | Create `assets/js/modules/social-share.js` | Pending | ES module: Copy Link (Clipboard API, multiple buttons via `data-url`), Web Share API (feature detect, show/invoke), aria-live announcements |
| 2.7 | Add social-share import to `assets/js/main.js` | Pending | |
| 2.8 | Add full share include to `_layouts/post.html` | Pending | After `.post__content`, before `.post__nav`. No parameters (defaults to `page`). |
| 2.9 | Add compact share include to post-card layouts | Pending | `home.html`, `tag-archive.html`, `series-archive.html`. Pass `url`, `title`, `compact` parameters. |

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
- **Completed:** 4 (Research & Planning Stage 1)
- **In Progress:** 1 (1.4 — Planning)
- **Remaining:** 12
