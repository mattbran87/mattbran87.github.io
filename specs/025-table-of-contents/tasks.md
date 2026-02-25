# Tasks: Table of Contents

> **Status:** Completed

## Last Session

- **Date:** 2026-02-25
- **Stopped at:** Phase 4 — Acceptance complete
- **Context:** All 15 tasks done. Feature complete and merged to master.
- **Next step:** N/A — feature shipped

> Update this block when **starting each task** and when **ending a session**. This ensures the next session knows exactly where to pick up, even if the previous session ended unexpectedly.

## Task Breakdown

### Phase 1: Research & Planning

**Stage 1: Research**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Consult Jekyll SME — Kramdown heading IDs, TOC options, post layout structure | Done | S1–S4 in finding tracker |
| 1.2 | Consult Accessibility SME — semantic markup, keyboard nav, focus management, screen readers | Done | S5–S10 in finding tracker |
| 1.3 | Consult CSS/Design SME — BEM naming, visual design, responsive behavior, placement | Done | S11–S17 in finding tracker |

**Research Discussion** — Present findings to user and get approval before planning.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.R | Research discussion with user | Done | User decided to replace series TOC with h3 line (D1). All open questions resolved. |

**Stage 2: Planning**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.4 | Record decisions from discussion in decisions.md | Done | D1–D8 recorded |
| 1.5 | Break down work into tasks in tasks.md | Done | This document |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Create feature branch `feature/025-table-of-contents` | Done | |
| 2.2 | Replace series TOC with series h3 line in `_layouts/post.html` | Done | b7b9e35 |
| 2.3 | Clean up series TOC dead code | Done | a1ea333 |
| 2.4 | Create `_article-toc.scss` partial and wire up | Done | f9f2ae0 — also added `.post__series-line` to `_post.scss` |
| 2.5 | Create `toc.js` ES module | Done | 790cc3f |
| 2.6 | Import TOC module in `main.js` | Done | 762c551 |
| 2.7 | Self-review code for quality, conventions, and accessibility | Done | fa8dfd1 — changed series line from h3 to p (heading hierarchy fix) |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify all acceptance criteria on local dev server | Done | 14/14 PASS |
| 3.2 | Run Accessibility SME audit | Done | Zero issues |
| 3.3 | Run QA SME audit | Done | 0 errors, 1 warning (low risk), 1 info |
| 3.4 | User testing plan | Done | 7/7 items passed by user |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review against spec requirements | Done | All requirements and acceptance criteria met |
| 4.2 | Fill in completion notes in spec.md | Done | All 5 sections completed |
| 4.3 | Merge feature branch to master, delete branch, verify deploy | Done | |

## Summary

- **Total tasks:** 15
- **Completed:** 15
- **Remaining:** 0
