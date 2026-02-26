# Tasks: Analytics

> **Status:** In Progress — Phase 2 (Implementation)

## Last Session

- **Date:** 2026-02-26
- **Stopped at:** Phase 2 — All implementation tasks complete (2.1–2.10). Build verified in both development and production modes.
- **Context:** All 10 files created/modified. GA4 with Consent Mode v2 renders in production build. Cookie consent banner, privacy policy page, footer links all present. Development build correctly excludes analytics.
- **Next step:** Move to Phase 3 (Testing). Run SME audits (Accessibility, QA), then user testing.

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
| 1.R | Research discussion with user | Done | User reviewed findings; deferred 2026-02-24. Resumed 2026-02-26 after security research. |

**Stage 2: Planning**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.6 | Security research for public repo | Done | Documented in `docs/security-research.md`. Public repo is not a blocker. |
| 1.7 | Break down implementation tasks | Done | 10 implementation tasks defined below |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Add GA4 config to `_config.yml` | Done | `google_analytics: "G-C3KLPG4WPE"` |
| 2.2 | Create privacy policy page | Done | `privacy.markdown` — covers GA4 data, cookies, rights, Giscus, Buttondown, future ads |
| 2.3 | Create analytics include | Done | `_includes/analytics.html` — Consent Mode v2 defaults + gtag.js with double guard |
| 2.4 | Create cookie consent banner markup | Done | `_includes/cookie-consent.html` — `<aside role="region">`, hidden by default, Accept/Decline |
| 2.5 | Create cookie consent styles | Done | `_cookie-consent.scss` — BEM, fixed position, dark mode, prefers-reduced-motion. Imported in main.scss. |
| 2.6 | Create cookie consent JS module | Done | `cookie-consent.js` — localStorage, Consent Mode updates, cookie clearing, Cookie Settings re-open |
| 2.7 | Integrate analytics include in head | Done | `_includes/head.html` — analytics.html before feed_meta |
| 2.8 | Integrate cookie consent banner in layout | Done | `_layouts/default.html` — cookie-consent.html after footer |
| 2.9 | Add cookie consent init to main.js | Done | First module initialized (before navKeyboard) |
| 2.10 | Update footer with privacy link and Cookie Settings | Done | Privacy link + Cookie Settings button with production guard. Footer styles added. |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify all 15 acceptance criteria | Pending | Check each AC against built output and browser behavior |
| 3.2 | Accessibility SME audit | Pending | Banner keyboard navigation, focus management, contrast, ARIA |
| 3.3 | QA SME audit | Pending | Code conventions, BEM naming, JS patterns, edge cases |
| 3.4 | Fix issues from SME audits | Pending | If any issues found |
| 3.5 | User testing plan | Pending | Walk through consent flow with user in browser |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review against spec | Pending | All requirements and acceptance criteria |
| 4.2 | Update spec.md status and completion notes | Pending | |
| 4.3 | Merge feature branch to master | Pending | |
| 4.4 | Verify GitHub Actions deploy | Pending | |
| 4.5 | Spot-check live site | Pending | |

## Summary

- **Total tasks:** 22
- **Completed:** 8 (Phase 1)
- **Pending:** 14 (Phase 2-4)
