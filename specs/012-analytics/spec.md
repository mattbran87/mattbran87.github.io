# Feature: Analytics

> **Spec ID:** 012
> **Status:** Completed
> **Created:** 2026-02-24
> **Completed:** 2026-02-26
> **Resumed:** 2026-02-26 — Deferral lifted. Security research confirms public repo is not a blocker. See [`docs/security-research.md`](../../docs/security-research.md).

## Goal

Integrate Google Analytics 4 (GA4) for tracking site traffic, with a cookie consent banner for GDPR compliance and a privacy policy page. Load tracking only in production and only after user consent.

## Background

The site currently has no analytics — there is no data on traffic, popular posts, or reader behavior. GA4 is the only free option that meets all roadmap needs: native AdSense integration for the upcoming ad feature (018), API access for Featured Posts Phase 2 (019), and a comprehensive event/goal system. Since GA4 uses cookies, GDPR requires a cookie consent banner. The consent banner also serves as shared infrastructure for future ad integration. A privacy policy page is required by both GA4 and ad providers.

## Requirements

- [x] Add GA4 tracking script (gtag.js) to the site
- [x] Load GA4 only in production (`JEKYLL_ENV=production`)
- [x] Load GA4 only after user consents to cookies
- [x] Implement a cookie consent banner (vanilla JS, no third-party CMP)
- [x] Integrate Google Consent Mode v2 (cookieless pings when consent is denied)
- [x] Persist consent choice in localStorage
- [x] Create a privacy policy page (`/privacy/`)
- [x] Add GA4 measurement ID as a configurable value in `_config.yml`
- [x] Style consent banner consistently with the site theme (Bootstrap components, BEM naming)
- [x] Full keyboard accessibility for the consent banner
- [x] Consent banner must not block page content or navigation
- [x] Works with dark mode (013, already built) via CSS custom properties
- [x] Clear GA4 cookies (`_ga`, `_ga_*`) when consent is withdrawn

## Constraints

- Static site — no server-side processing
- No third-party consent management platforms (keep it simple, vanilla JS)
- No external CSS/JS dependencies beyond what's already vendored
- Must not degrade page performance (defer/async script loading)
- GA4 measurement ID will be in the built HTML (normal for client-side analytics)

## Acceptance Criteria

- [x] GA4 tracking fires on page load in production when consent is granted
- [x] GA4 does NOT load in development (`jekyll serve` without `JEKYLL_ENV=production`)
- [x] Cookie consent banner appears on first visit
- [x] Banner does not reappear after user makes a choice (persisted in localStorage)
- [x] Accepting consent loads GA4 and sets consent state to granted
- [x] Declining consent: no `_ga` or `_ga_*` cookies are set; `gtag('consent', 'update', ...)` fires with `analytics_storage: 'denied'` (verifiable via DevTools)
- [x] Clicking "Cookie Settings" in footer reopens the consent banner; changing from declined to accepted loads GA4; changing from accepted to declined clears GA4 cookies on next page load
- [x] Privacy policy page exists at `/privacy/` and covers GA4 data collection, cookie details, user rights, and contact info
- [x] Consent banner is keyboard accessible (Tab, Enter/Space to navigate and activate)
- [x] Consent banner meets WCAG 2.2 AA contrast and focus requirements
- [x] Banner is responsive across mobile, tablet, and desktop viewports
- [x] No JavaScript errors in the browser console
- [x] Page load performance is not noticeably degraded
- [x] If localStorage is unavailable, consent banner shows on every page load and GA4 defaults to denied (graceful degradation)
- [x] With JavaScript disabled, no consent banner appears and no analytics scripts load — site functions normally

## Affected Files

- `_config.yml` — GA4 measurement ID configuration
- `_includes/analytics.html` — GA4 script and consent mode logic (new)
- `_includes/cookie-consent.html` — consent banner markup (new)
- `_layouts/default.html` — include analytics and consent banner
- `assets/css/_partials/_cookie-consent.scss` — consent banner styles (new)
- `assets/main.scss` — import consent banner styles
- `assets/js/cookie-consent.js` — consent banner interaction JS (new)
- `privacy.markdown` — privacy policy page (new)
- `_includes/footer.html` — privacy policy link and Cookie Settings button

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-24 | 2026-02-26 | Research complete (Stage 1, 2026-02-24). Deferred, then resumed 2026-02-26 for Stage 2 (Planning). Security research documented. |
| Implementation | 2026-02-26 | 2026-02-26 | 2 commits; 10 tasks; 12 files new/modified |
| Testing | 2026-02-26 | 2026-02-26 | 15/15 AC pass; 0 SME errors; 9/9 user tests pass |
| Acceptance | 2026-02-26 | 2026-02-26 | Deploy verified, live site confirmed |

## Future Considerations

Documented during research, not blocking for initial implementation:

- **Consent expiry:** GDPR recommends re-prompting every 6-12 months. Store consent timestamp in localStorage and re-show banner when expired. (QA SME — S26)
- **Per-purpose consent:** When ads arrive (spec 018), the consent banner must offer granular per-purpose consent (analytics vs. advertising). Current single Accept/Decline is sufficient for analytics only. (QA SME — S27)
- **GA4 Data API credentials:** Featured Posts Phase 2 (spec 019) will need a GA4 service account key. Store as a GitHub Actions secret, never in the repo. This is a spec 019 concern, not spec 012.

## Completion Notes

### Delivered
- GA4 integration with Consent Mode v2: consent defaults (all denied) execute before gtag.js, consent updated after user choice
- Cookie consent banner: `<aside role="region">` with `aria-live="polite"`, server-rendered hidden, Accept/Decline buttons, responsive layout
- Privacy policy page at `/privacy/` covering GA4 data collection, cookies, user rights, third-party services (Giscus, Buttondown), and future advertising placeholder
- Footer links: Privacy Policy link (always visible) + Cookie Settings button (production only)
- Cookie clearing on consent withdrawal via `clearGaCookies()` function
- Production-only loading with double guard (`jekyll.environment` + `site.google_analytics`)
- Security research documented in `docs/security-research.md` covering public repo implications for analytics and ad integration

### Deviations
- Dark mode requirement updated from "works with future dark mode" to "works with dark mode" — spec 013 was already completed when this spec resumed
- No deviations from the planned implementation — all 10 decisions from Research held through Implementation

### What Went Well
- Thorough research before deferral paid off — all 27 findings and 10 decisions from the original research session remained valid 2 days later, enabling immediate planning and implementation
- Zero issues from SME audits — the research decisions (D8 for ARIA pattern, D10 for JS organization, S11 for reduced-motion) produced clean code on the first pass
- Security research resolved the deferral blocker definitively — public repo confirmed as non-issue for analytics and ads
- Single-session completion after resuming — planning, implementation, testing, and acceptance all in one session

### What Didn't Go Well
- Nothing — clean execution with no friction

### Lessons Learned
- Deferring with thorough research documentation enables fast resumption — the 27 findings and 10 decisions were immediately actionable with no re-research needed
- The `hidden` attribute is preferable to CSS class toggling for components that should be fully removed from the accessibility tree when not active (vs. `back-to-top` which uses CSS opacity for visual transition)
