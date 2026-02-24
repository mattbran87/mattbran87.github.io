# Decisions: Analytics

## Decision Log

### D1: Analytics Provider

- **Date:** 2026-02-24
- **Phase:** Pre-spec (planning session)
- **Context:** Need free analytics with API access for Featured Posts and future AdSense integration
- **Options Considered:**
  1. GA4 — Free, full-featured, native AdSense integration, requires cookie consent banner
  2. Plausible — No cookies, $9/mo recurring cost
  3. Fathom — No cookies, $15/mo recurring cost
  4. Umami (self-hosted) — Free, requires running a server
  5. Cloudflare Web Analytics — Free, no API for Featured Posts
- **Decision:** GA4
- **Rationale:** Only free option that meets all roadmap needs (AdSense integration, Featured Posts API). Cookie consent banner is required infrastructure for future ad integration anyway.

### D2: Ad Network Strategy

- **Date:** 2026-02-24
- **Phase:** Pre-spec (planning session)
- **Context:** User considered Carbon Ads as an alternative to AdSense
- **Options Considered:**
  1. Start with Carbon Ads — requires ~10,000 monthly pageviews minimum
  2. Start with EthicalAds — requires 50,000 monthly pageviews minimum
  3. Start with AdSense — no minimum traffic requirement
- **Decision:** AdSense first, graduate to Carbon Ads at ~10k pageviews/month
- **Rationale:** Neither Carbon Ads nor EthicalAds accepts new sites with low traffic. AdSense has no minimum requirement. GA4's native AdSense integration provides per-page revenue correlation during the growth phase.

### D3: Production-Only Loading Pattern

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** GA4 should only load in production, not during local development
- **Options Considered:**
  1. `jekyll.environment == "production"` guard only
  2. Double guard: `jekyll.environment == "production" and site.google_analytics`
- **Decision:** Double guard
- **Rationale:** Prevents errors if measurement ID hasn't been configured yet. Safe to have the include in the layout even when no measurement ID exists. (Jekyll SME — S1)

### D4: Include File Structure

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** GA4 Consent Mode v2 requires consent defaults in `<head>` before gtag.js, but the consent banner UI belongs at end of `<body>`
- **Options Considered:**
  1. Single include called from `<head>`, banner injected via JS — simpler layout integration but mixes concerns
  2. Two includes: `analytics.html` in `<head>`, `cookie-consent.html` at end of `<body>` — cleaner separation, matches project's one-concern-per-file pattern
- **Decision:** Two includes (Option 2)
- **Rationale:** Follows the project's existing include architecture. Server-rendered banner HTML is better for accessibility (no flash of missing content). (Jekyll SME — S2)

### D5: Config Structure

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** How to store GA4 measurement ID in `_config.yml`
- **Options Considered:**
  1. Flat key: `google_analytics: "G-XXXXXXXXXX"`
  2. Nested structure: `analytics: { provider: "ga4", id: "G-XXXXXXXXXX" }`
- **Decision:** Flat key
- **Rationale:** Only one value needed. Follows Jekyll convention used by Minima and many themes. Recognizable key name. Can be extended later if needed. (Jekyll SME — S3)

### D6: Privacy Policy Page Structure

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** How to create and configure the privacy policy page
- **Options Considered:**
  1. Root-level `privacy.markdown` with `noindex: true` (Jekyll SME recommendation)
  2. Root-level `privacy.markdown` without `noindex` (SEO SME recommendation)
- **Decision:** Root-level `privacy.markdown` without `noindex`
- **Rationale:** SEO SME overrode Jekyll SME's `noindex` recommendation. Privacy policies build E-E-A-T trust signals, Google expects them to be crawlable, and indexing causes no SEO harm. Link from footer, not header nav. (SEO SME — S12, overriding Jekyll SME — S4)

### D7: Script Loading Strategy

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** GA4 Consent Mode v2 has specific execution order requirements
- **Options Considered:**
  1. All scripts at end of `<body>` with `defer` (matches existing pattern)
  2. Two-part loading: consent defaults + gtag.js in `<head>`, banner JS at end of `<body>`
- **Decision:** Two-part loading (Option 2)
- **Rationale:** Consent Mode defaults must execute before gtag.js fires — `defer` would break this requirement. gtag.js uses `async` per Google's recommendation. Banner interaction JS can use `defer` at end of `<body>`. (Jekyll SME — S5, SEO SME — S14)

### D8: Banner Accessibility Pattern

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Need to determine ARIA role, focus management, and keyboard behavior for the consent banner
- **Options Considered:**
  1. `role="dialog"` (modal) — focus trap, Escape to close
  2. `role="dialog"` (non-modal) — no focus trap, Escape to close
  3. `role="region"` with `aria-label` — non-modal, no Escape, natural tab order
  4. `role="alertdialog"` — assertive announcement, focus trap
- **Decision:** `role="region"` with `aria-label="Cookie consent"` on `<aside>` element (Option 3)
- **Rationale:** Banner is non-urgent and non-modal (spec requires it not block content). No auto-focus — discovered via Tab or visual presence. `aria-live="polite"` for screen reader announcement. No Escape handler — Escape is for dialogs, and dismissing without choosing creates ambiguous consent state. Server-render with hidden state, reveal via JS for reliable `aria-live` behavior. (A11y SME — S6, S7, S8, S9)

### D9: Consent Change Mechanism

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Users need a way to change their consent choice after the banner is dismissed
- **Options Considered:**
  1. Footer link only
  2. Privacy policy page section only
  3. Both footer button + privacy policy page section
- **Decision:** Both (Option 3)
- **Rationale:** Footer "Cookie Settings" button is always accessible from any page. Privacy policy page provides full context alongside the manage option. Footer uses `<button>` (action, not navigation). (A11y SME — S10)

### D10: JavaScript File Organization

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Should consent banner JS be inline in the include or a separate file?
- **Options Considered:**
  1. Inline JS in `_includes/cookie-consent.html` — simpler, fewer files
  2. Separate `assets/js/cookie-consent.js` loaded with `defer` — follows existing pattern
- **Decision:** Separate file (Option 2)
- **Rationale:** Matches existing project pattern (`code-copy.js`, `nav-keyboard.js` are all separate files). Consent Mode defaults in `<head>` remain inline (must execute before gtag.js). Only the banner interaction JS is in the separate file. (QA SME — S24)
