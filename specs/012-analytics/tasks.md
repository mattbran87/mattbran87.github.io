# Tasks: Analytics

> **Status:** Deferred

## Last Session

- **Date:** 2026-02-24
- **Stopped at:** Phase 1 — Research Stage 1 complete. Spec deferred before Stage 2 (Planning).
- **Context:** All research tasks complete. 4 SMEs consulted (Jekyll, A11y, SEO, QA). 27 findings documented in notes.md. 10 decisions recorded in decisions.md. QA corrections applied to spec.md (acceptance criteria updated, SCSS path fixed, JS file organization decided). Spec deferred — user plans to move to a private repository and server before implementing analytics.
- **Next step:** When resuming, begin Stage 2 (Planning) — break down implementation tasks based on research findings and decisions. User needs to create a GA4 property before Implementation phase.

> Update this block when **starting each task** and when **ending a session**. This ensures the next session knows exactly where to pick up, even if the previous session ended unexpectedly.

## Task Breakdown

### Phase 1: Research & Planning

**Stage 1: Research**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Research GA4 integration for Jekyll static sites | Done | Jekyll SME: production guard, config key, script loading |
| 1.2 | Research Google Consent Mode v2 | Done | Two-part loading: defaults in head, gtag.js async, banner JS defer |
| 1.3 | Research cookie consent banner patterns | Done | A11y SME: role="region", no auto-focus, no Escape, aria-live="polite" |
| 1.4 | Research privacy policy requirements for GA4 | Done | SEO SME: index (not noindex), required content sections documented |
| 1.5 | Consult SMEs (Jekyll, A11y, SEO, QA) | Done | 4 SMEs, 27 findings, all documented in notes.md |

**Research Discussion** — Present findings to user and get approval before planning.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.R | Research discussion with user | Done | User reviewed findings; decided to defer spec before planning |

**Stage 2: Planning** — deferred

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.6 | Record decisions from discussion | Deferred | Spec deferred before planning stage |
| 1.7 | Break down implementation tasks | Deferred | |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | TBD — break down during Stage 2 Planning | Deferred | |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | TBD | Deferred | |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | TBD | Deferred | |

## Summary

- **Total tasks:** 7 (Phase 1 only — Phase 2-4 TBD after planning)
- **Completed:** 6 (research tasks + discussion)
- **Deferred:** 1 (planning) + all Phase 2-4 tasks
