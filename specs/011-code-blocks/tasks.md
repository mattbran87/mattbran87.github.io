# Tasks: Code Block Enhancements

> **Status:** In Progress

## Last Session

- **Date:** 2026-02-24
- **Stopped at:** Phase 2 Implementation complete — all 6 tasks done
- **Context:** Feature branch `feature/011-code-blocks` created. Syntax theme, code block SCSS, copy button JS all implemented. Build verified.
- **Next step:** Commit implementation, then move to Phase 3 Testing

> Update this block when **starting each task** and when **ending a session**. This ensures the next session knows exactly where to pick up, even if the previous session ended unexpectedly.

## Task Breakdown

### Phase 1: Research & Planning

**Stage 1: Research**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Research Rouge themes, Clipboard API, code block HTML structure, and accessibility patterns | Done | Findings in notes.md |
| 1.2 | Consult Jekyll, Accessibility, and CSS/Design SMEs | Done | 14 findings tracked in SME Finding Tracker |

**Research Discussion** — Present findings to user and get approval before planning.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.R | Research discussion with user | Done | Line numbers deferred (D3), visible text confirmed (D5) |

**Stage 2: Planning**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.3 | Record decisions in decisions.md | Done | 7 decisions: D1-D7 |
| 1.4 | Break down implementation tasks in tasks.md | Done | 6 implementation tasks |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Generate Rouge github theme and create `_syntax.scss` | Done | `rougify style github --scope '.highlight'`, background overridden with `--color-code-bg` |
| 2.2 | Move code styles from `_base.scss` to new `_code-blocks.scss` | Done | Code/pre rules moved, BEM styles for copy button added |
| 2.3 | Add SCSS imports to `main.scss` | Done | `_syntax` and `_code-blocks` imported after `_base` |
| 2.4 | Create `code-copy.js` — copy button injection and clipboard logic | Done | IIFE pattern, JSDoc, aria-live region, "Copy"/"Copied!" text, null checks |
| 2.5 | Update `_layouts/default.html` — add script tag | Done | `<script defer>` for code-copy.js; aria-live region created dynamically by JS |
| 2.6 | Verify build and visual check on local dev server | Done | Build succeeds, syntax theme in CSS, script tag on all pages |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify all acceptance criteria | Pending | 9 criteria in spec.md |
| 3.2 | Run Accessibility SME audit | Pending | Required — keyboard, screen reader, contrast |
| 3.3 | Run QA SME audit | Pending | Required — conventions, code quality |
| 3.4 | User testing plan | Pending | Visual/manual testing with user |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review and completion notes | Pending | |
| 4.2 | Merge, deploy, and verify live site | Pending | |

## Summary

- **Total tasks:** 14
- **Completed:** 4
- **Remaining:** 10
