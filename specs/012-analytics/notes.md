# Notes: Analytics

## SME Finding Tracker

All SME findings across every phase, with disposition. Add rows as findings come in.

| # | Phase | SME | Finding | Recommendation | Disposition |
|---|-------|-----|---------|----------------|-------------|
| S1 | Research | Jekyll | `jekyll.environment` confirmed working with deploy workflow; no existing usage in codebase | Use `jekyll.environment == "production"` with `site.google_analytics` guard | Adopted → D3 |
| S2 | Research | Jekyll | Two distinct concerns: analytics script (needs `<head>`) and consent banner UI (needs `<body>`) | Split into `analytics.html` (head) + `cookie-consent.html` (body) | Adopted → D4 |
| S3 | Research | Jekyll | jekyll-seo-tag has no GA4 integration; Minima's `google_analytics` key no longer applies since layouts are custom | Use flat `google_analytics` key in `_config.yml` | Adopted → D5 |
| S4 | Research | Jekyll | Privacy policy follows same pattern as `about.markdown` | Root-level `privacy.markdown` with `layout: page` | Adopted → D6 |
| S5 | Research | Jekyll | Consent Mode v2 requires consent defaults before gtag.js fires | Consent defaults inline in `<head>`, gtag.js with `async`, banner JS at end of `<body>` | Adopted → D7 |
| S6 | Research | A11y | Auto-focusing banner hijacks user experience; violates expectations for non-modal components | Do NOT auto-focus; use `aria-live="polite"` for announcement | Adopted → D8 |
| S7 | Research | A11y | Banner is non-urgent, non-modal; `role="dialog"` overpromises | Use `role="region"` with `aria-label="Cookie consent"` on `<aside>` | Adopted → D8 |
| S8 | Research | A11y | Escape is for dialogs; banner is `role="region"`; Escape creates ambiguous consent state | Do NOT implement Escape dismiss | Adopted → spec AC update |
| S9 | Research | A11y | `aria-live` needs container in DOM before content appears | Server-render banner with hidden state, reveal via JS | Adopted → D8 |
| S10 | Research | A11y | Footer "Cookie Settings" should be `<button>` (action, not navigation); privacy page needs manage section too | Both footer button + privacy page section | Adopted → D9 |
| S11 | Research | A11y | `prefers-reduced-motion` trivial to implement; use existing `--transition-fast` token | Add `@media (prefers-reduced-motion: reduce)` to banner styles | Adopted → implementation task |
| S12 | Research | SEO | Privacy policy builds E-E-A-T trust signals; Google expects it to be crawlable | Do NOT noindex the privacy policy page | Adopted → overrides Jekyll SME S4 recommendation |
| S13 | Research | SEO | `position: fixed` elements don't cause CLS; no SEO concerns with banner rendering | Ensure banner is `position: fixed` from initial CSS, not applied via JS | Adopted → implementation task |
| S14 | Research | SEO | gtag.js ~45KB (~15KB gzipped) has minor INP impact; mitigated by loading only after consent | Use `async` for gtag.js per Google's recommendation; no further mitigation needed | Adopted → D7 |
| S15 | Research | SEO | Consent Mode v2 has zero impact on SEO; Search Console uses Googlebot data, not GA4 | No action needed | N/A |
| S16 | Research | SEO | No structured data changes needed for analytics or privacy policy | No action needed | N/A |
| S17 | Research | SEO | Privacy policy needs specific sections for GA4 compliance and future AdSense readiness | Cover: data collected, how, why, third-party services, user rights, cookie details, contact, future advertising placeholder | Adopted → implementation task |
| S18 | Research | QA | AC9 lists Escape but A11y SME recommends no Escape handler — contradiction | Remove Escape from AC9 | Adopted → spec AC update |
| S19 | Research | QA | No acceptance criterion for localStorage unavailability | Add AC: banner shows every load, GA4 defaults to denied | Adopted → spec AC update |
| S20 | Research | QA | No acceptance criterion for JS-disabled behavior | Add AC: no banner, no analytics, site works normally | Adopted → spec AC update |
| S21 | Research | QA | AC7 (change consent) doesn't specify behavior | Expand AC7 with detailed behavior | Adopted → spec AC update |
| S22 | Research | QA | AC6 (Consent Mode pings) not testable as written | Reframe to testable: no cookies set, consent update call fires | Adopted → spec AC update |
| S23 | Research | QA | SCSS path uses `_components/` but project uses `_partials/` | Fix to `assets/css/_partials/_cookie-consent.scss` | Adopted → spec affected files update |
| S24 | Research | QA | JS file organization: inline vs. separate file | Separate `assets/js/cookie-consent.js` follows existing pattern | Adopted → D10 |
| S25 | Research | QA | Cookie clearing on consent withdrawal not addressed | Add requirement: clear `_ga` cookies when consent withdrawn | Adopted → spec requirements update |
| S26 | Research | QA | Consent expiry (12-month re-prompt) not addressed | Future consideration — document but don't implement now | Deferred |
| S27 | Research | QA | Per-purpose consent needed when ads arrive (spec 018) | Future consideration — single Accept/Decline sufficient for analytics only | Deferred |

**Disposition values:** Adopted → D# (decision), Adopted → Task #, Deferred, Overridden by D#, Fixed in [commit], N/A

---

## Research & Planning

### Findings

#### Jekyll SME — Research

- **Finding:** `jekyll.environment` reads from `JEKYLL_ENV` environment variable. The deploy workflow (`deploy.yml` line 33) sets `JEKYLL_ENV: production`. Local `jekyll serve` defaults to `"development"`. No existing `jekyll.environment` checks anywhere in the codebase.
- **Recommendation:** Use double guard: `jekyll.environment == "production" and site.google_analytics`. Prevents errors if measurement ID not configured.

- **Finding:** GA4 with Consent Mode v2 requires a two-part script loading strategy. Consent defaults must be set before gtag.js fires (inline in `<head>`). The consent banner UI and interaction JS belong at end of `<body>`.
- **Recommendation:** Two includes: `_includes/analytics.html` (included in `<head>` — consent defaults + gtag.js with `async`) and `_includes/cookie-consent.html` (included before `</body>` — banner markup + interaction JS). This follows the project's one-concern-per-file pattern.

- **Finding:** jekyll-seo-tag does not handle GA4. Minima 2.5 had a built-in `google_analytics` config key, but the project has fully replaced Minima's layouts. The config key convention is still recognizable and conventional.
- **Recommendation:** Flat `google_analytics: "G-XXXXXXXXXX"` key in `_config.yml`. Accessed as `{{ site.google_analytics }}`.

- **Finding:** Privacy policy page follows the same pattern as existing standalone pages (`about.markdown`). Use `layout: page` with `permalink: /privacy/`.
- **Recommendation:** Root-level `privacy.markdown`. Link from footer, not header nav. (Note: Jekyll SME recommended `noindex: true` but this was overridden by SEO SME — see S12.)

- **Finding:** Script loading should be: consent defaults (inline, synchronous, `<head>`), gtag.js (`async`, `<head>`), gtag config (inline, `<head>`), consent banner JS (`defer` or inline, end of `<body>`).
- **Recommendation:** Do not change the existing script loading pattern for other features. Analytics scripts are separate from the feature JS stack.

#### Accessibility SME — Research

- **Finding:** WCAG 2.2 has no specific criterion for consent banners. Applicable criteria: 2.4.3 Focus Order (A), 2.4.11 Focus Not Obscured (AA), 3.2.1 On Focus (A). Auto-focusing a non-modal banner hijacks the user experience and breaks expectations.
- **Recommendation:** Do NOT auto-focus the banner. Let it be discovered via Tab or visual presence. Use `aria-live="polite"` for screen reader announcement.

- **Finding:** The banner is non-urgent and non-modal (spec says "must not block page content or navigation"). `role="dialog"` overpromises interaction patterns. `role="alertdialog"` is for urgent alerts. `role="banner"` is reserved for site-wide headers.
- **Recommendation:** Use `<aside>` with `role="region"` and `aria-label="Cookie consent"`. Non-modal — no focus trap. Creates a named landmark for screen reader navigation.

- **Finding:** Escape key is associated with closing modals/dialogs (WAI-ARIA Authoring Practices). The banner is `role="region"`, not a dialog. Escape would create an ambiguous consent state (neither granted nor denied).
- **Recommendation:** Do NOT implement Escape to dismiss. Users must explicitly Accept or Decline. Tab/Shift+Tab between controls, Enter/Space to activate (native `<button>` behavior — no JS needed).

- **Finding:** For `aria-live="polite"` to work correctly, the container must be in the DOM before content appears. Server-rendered Liquid includes with a hidden state that JS reveals will trigger the announcement properly.
- **Recommendation:** Render banner HTML in template with `hidden` attribute or CSS class. JS checks localStorage on load — if no consent stored, reveal the banner.

- **Finding:** The "change consent" mechanism needs to be in both the footer (always accessible) and the privacy policy page. Footer link should be a `<button>` (triggers action) not `<a>` (navigates).
- **Recommendation:** Footer: `<button type="button" class="site-footer__consent-link">Cookie Settings</button>`. Privacy page: "Manage Cookie Settings" section with a button. Use `aria-hidden="true"` on decorative separators.

- **Finding:** Banner entrance animation should respect `prefers-reduced-motion`. The project already has `--transition-fast: 0.15s ease`.
- **Recommendation:** Add `@media (prefers-reduced-motion: reduce) { transition: none; }` to banner styles.

- **Recommended markup skeleton:**
```html
<aside class="cookie-consent" role="region" aria-label="Cookie consent"
       aria-live="polite">
    <div class="cookie-consent__body">
        <p class="cookie-consent__message">
            We use cookies to analyze site traffic.
            <a href="/privacy/" class="cookie-consent__link">Privacy Policy</a>
        </p>
        <div class="cookie-consent__actions">
            <button type="button" class="cookie-consent__btn cookie-consent__btn--accept">
                Accept
            </button>
            <button type="button" class="cookie-consent__btn cookie-consent__btn--decline">
                Decline
            </button>
        </div>
    </div>
</aside>
```

#### SEO SME — Research

- **Finding:** Noindexing the privacy policy page is incorrect from an SEO perspective. Google expects privacy policies to be publicly accessible and crawlable. Privacy policies build E-E-A-T trust signals. No SEO harm from indexing — no keyword cannibalization or thin content issues.
- **Recommendation:** Do NOT set `noindex`. Do not exclude from sitemap. Let jekyll-seo-tag generate standard meta tags from front matter.

- **Finding:** `position: fixed` elements have zero CLS impact because they don't participate in document flow. The banner appearing/disappearing doesn't move any other content.
- **Recommendation:** Ensure banner is `position: fixed` from initial CSS. Never apply fixed positioning via JS (the transition could cause a brief layout shift).

- **Finding:** gtag.js (~45KB, ~15KB gzipped) with `async` has minor INP impact but doesn't meaningfully affect LCP or CLS. Since GA4 only loads after consent, the initial page load is completely unaffected.
- **Recommendation:** Use `async` for gtag.js (Google's recommendation). No further performance mitigation needed — Lighthouse 90+ target is safe.

- **Finding:** Consent Mode v2 has zero impact on SEO. Search Console uses Googlebot's own data, not GA4. Core Web Vitals field data comes from CrUX, not GA4. GA4 organic traffic will show modeled data for declining users — approximately correct.
- **Recommendation:** No action needed.

- **Finding:** No structured data changes needed. jekyll-seo-tag auto-generates meta tags for the privacy page from front matter. No Schema.org type for privacy policies.
- **Recommendation:** No action needed.

- **Finding:** Privacy policy content needs specific sections for GA4 compliance and future AdSense readiness.
- **Recommendation:** Required sections: (1) what data is collected, (2) how data is collected — GA4 cookies, retention, (3) why data is collected, (4) third-party services — Google Analytics + link to their policy, (5) user rights — decline/withdraw consent, (6) cookie details — name, purpose, duration, (7) contact info. For AdSense readiness: (8) advertising placeholder section, (9) third-party cookies note. Use clear `##` headings, plain language, "Last updated" date at top.

#### QA SME — Spec Review

- **Finding (Error):** AC9 lists "Escape" but A11y SME explicitly recommended no Escape handler. Contradiction.
- **Recommendation:** Remove Escape from AC9 to align with A11y guidance.

- **Finding (Error):** SCSS path `assets/css/_components/_cookie-consent.scss` uses `_components/` which doesn't exist. All partials are in `_partials/`.
- **Recommendation:** Change to `assets/css/_partials/_cookie-consent.scss`.

- **Finding (Warning):** No acceptance criterion for localStorage unavailability (private browsing, storage quota, disabled storage).
- **Recommendation:** Add AC: "If localStorage is unavailable, consent banner shows on every page load and GA4 defaults to denied."

- **Finding (Warning):** No acceptance criterion for JS-disabled behavior. Progressive enhancement guideline requires site to work without JS.
- **Recommendation:** Add AC: "With JavaScript disabled, no consent banner appears and no analytics scripts load — site functions normally."

- **Finding (Warning):** AC7 (change consent) doesn't specify behavior after re-choosing.
- **Recommendation:** Expand: "Clicking 'Cookie Settings' in footer reopens banner. Changing from declined to accepted loads GA4. Changing from accepted to declined clears GA4 cookies on next page load."

- **Finding (Warning):** AC6 (Consent Mode pings) not testable as written — cookieless pings aren't visible in GA4 real-time.
- **Recommendation:** Reframe: "After declining, no `_ga` or `_ga_*` cookies set. `gtag('consent', 'update', ...)` fires with `analytics_storage: 'denied'`. Verifiable via DevTools."

- **Finding (Warning):** Cookie clearing on consent withdrawal not addressed. `_ga` cookies have 2-year expiry.
- **Recommendation:** Add requirement: clear `_ga` and `_ga_*` cookies when consent is withdrawn.

- **Finding (Warning):** JS file organization — consent banner JS should be a separate file, not inline, to match existing pattern (`code-copy.js`, `nav-keyboard.js`).
- **Recommendation:** Create `assets/js/cookie-consent.js`. Keep Consent Mode defaults inline in `<head>` (they must execute before gtag.js).

- **Finding (Info):** Consent expiry (GDPR recommends re-prompting every 6-12 months) not addressed. Store timestamp with consent value.
- **Recommendation:** Document as future consideration. Not blocking for initial implementation.

- **Finding (Info):** Per-purpose consent will be needed when ads arrive (spec 018). Current single Accept/Decline is sufficient for analytics only.
- **Recommendation:** Document as future consideration for spec 018.

- **Finding (Info):** Multi-tab behavior — consent in one tab won't update banner in another until refresh. Acceptable complexity tradeoff.
- **Recommendation:** No action needed.

- **Finding (Info):** GA4 measurement ID not configured — double guard in Liquid handles this gracefully. Add a comment in the include explaining the guard.
- **Recommendation:** Document in implementation notes.

### Open Questions

All open questions resolved during research. No outstanding questions.

### References

- [Google Analytics 4 documentation](https://developers.google.com/analytics)
- [Google Consent Mode v2](https://developers.google.com/tag-platform/security/guides/consent)
- [WAI-ARIA Authoring Practices — Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [WCAG 2.2 — 2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order)
- [WCAG 2.2 — 2.4.11 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum)
- [Google E-E-A-T and trust signals](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

---

## Implementation

- [Notes captured during implementation — gotchas, surprises, workarounds]

---

## Testing

### Stage 1: Claude Verification & SME Audits

#### Accessibility SME — Testing Audit
- **Finding:** [what was found]
- **Recommendation:** [what they suggest]

#### QA SME — Testing Audit
- **Finding:** [what was found]
- **Recommendation:** [what they suggest]

### Stage 2: User Testing

- [User testing observations, pass/fail results]

### Issues Found

- [Issues documented with steps to reproduce, severity, and fix status]

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
