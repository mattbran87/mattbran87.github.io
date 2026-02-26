# Feature: Analytics

> **Spec ID:** 012
> **Status:** In Progress — Phase 2 (Implementation)
> **Created:** 2026-02-24
> **Resumed:** 2026-02-26 — Deferral lifted. Security research confirms public repo is not a blocker. See [`docs/security-research.md`](../../docs/security-research.md).

## Goal

Integrate Google Analytics 4 (GA4) for tracking site traffic, with a cookie consent banner for GDPR compliance and a privacy policy page. Load tracking only in production and only after user consent.

## Background

The site currently has no analytics — there is no data on traffic, popular posts, or reader behavior. GA4 is the only free option that meets all roadmap needs: native AdSense integration for the upcoming ad feature (018), API access for Featured Posts Phase 2 (019), and a comprehensive event/goal system. Since GA4 uses cookies, GDPR requires a cookie consent banner. The consent banner also serves as shared infrastructure for future ad integration. A privacy policy page is required by both GA4 and ad providers.

## Requirements

- [ ] Add GA4 tracking script (gtag.js) to the site
- [ ] Load GA4 only in production (`JEKYLL_ENV=production`)
- [ ] Load GA4 only after user consents to cookies
- [ ] Implement a cookie consent banner (vanilla JS, no third-party CMP)
- [ ] Integrate Google Consent Mode v2 (cookieless pings when consent is denied)
- [ ] Persist consent choice in localStorage
- [ ] Create a privacy policy page (`/privacy/`)
- [ ] Add GA4 measurement ID as a configurable value in `_config.yml`
- [ ] Style consent banner consistently with the site theme (Bootstrap components, BEM naming)
- [ ] Full keyboard accessibility for the consent banner
- [ ] Consent banner must not block page content or navigation
- [ ] Works with dark mode (013, already built) via CSS custom properties
- [ ] Clear GA4 cookies (`_ga`, `_ga_*`) when consent is withdrawn

## Constraints

- Static site — no server-side processing
- No third-party consent management platforms (keep it simple, vanilla JS)
- No external CSS/JS dependencies beyond what's already vendored
- Must not degrade page performance (defer/async script loading)
- GA4 measurement ID will be in the built HTML (normal for client-side analytics)

## Acceptance Criteria

- [ ] GA4 tracking fires on page load in production when consent is granted
- [ ] GA4 does NOT load in development (`jekyll serve` without `JEKYLL_ENV=production`)
- [ ] Cookie consent banner appears on first visit
- [ ] Banner does not reappear after user makes a choice (persisted in localStorage)
- [ ] Accepting consent loads GA4 and sets consent state to granted
- [ ] Declining consent: no `_ga` or `_ga_*` cookies are set; `gtag('consent', 'update', ...)` fires with `analytics_storage: 'denied'` (verifiable via DevTools)
- [ ] Clicking "Cookie Settings" in footer reopens the consent banner; changing from declined to accepted loads GA4; changing from accepted to declined clears GA4 cookies on next page load
- [ ] Privacy policy page exists at `/privacy/` and covers GA4 data collection, cookie details, user rights, and contact info
- [ ] Consent banner is keyboard accessible (Tab, Enter/Space to navigate and activate)
- [ ] Consent banner meets WCAG 2.2 AA contrast and focus requirements
- [ ] Banner is responsive across mobile, tablet, and desktop viewports
- [ ] No JavaScript errors in the browser console
- [ ] Page load performance is not noticeably degraded
- [ ] If localStorage is unavailable, consent banner shows on every page load and GA4 defaults to denied (graceful degradation)
- [ ] With JavaScript disabled, no consent banner appears and no analytics scripts load — site functions normally

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
| Implementation | 2026-02-26 | — | |
| Testing | — | — | |
| Acceptance | — | — | |

## Future Considerations

Documented during research, not blocking for initial implementation:

- **Consent expiry:** GDPR recommends re-prompting every 6-12 months. Store consent timestamp in localStorage and re-show banner when expired. (QA SME — S26)
- **Per-purpose consent:** When ads arrive (spec 018), the consent banner must offer granular per-purpose consent (analytics vs. advertising). Current single Accept/Decline is sufficient for analytics only. (QA SME — S27)
- **GA4 Data API credentials:** Featured Posts Phase 2 (spec 019) will need a GA4 service account key. Store as a GitHub Actions secret, never in the repo. This is a spec 019 concern, not spec 012.

## Completion Notes

### Delivered
- [What was built — brief summary of the final implementation]

### Deviations
- [Anything that changed from the original spec and why, or "None"]

### What Went Well
- [Process, tools, or decisions that worked effectively]

### What Didn't Go Well
- [Friction points, rework, surprises, or time sinks]

### Lessons Learned
- [Specific takeaways to carry forward to future features]
