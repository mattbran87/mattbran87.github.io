# Feature: Newsletter Subscribe CTA

> **Spec ID:** 028
> **Status:** Completed
> **Created:** 2026-02-25
> **Completed:** 2026-02-25

## Goal

Add a subscribe call-to-action so readers can sign up for email notifications about new posts. Uses Buttondown (free tier) for subscriber management and an embedded HTML form for signup. The site owner manually sends notification emails through Buttondown when new content is published.

## Background

The site has no mechanism for readers to get notified about new posts beyond RSS (which exists but isn't discoverable). Adding a visible subscribe option and an RSS link gives readers two ways to stay updated — email for casual readers, RSS for power users. This completes the Engagement group (020 Social Sharing, 021 Comments, 028 Newsletter Subscribe CTA).

## Requirements

- [x] Embedded Buttondown subscribe form (email input + submit button) in the sidebar
- [x] Subscribe CTA section after post content on post pages
- [x] RSS feed link added to the sidebar for discoverability
- [x] Newsletter configuration stored in `_config.yml` (Buttondown username, CTA text)
- [x] Can be disabled per post via `newsletter: false` in front matter
- [x] Styled consistently with the site theme using BEM naming conventions
- [x] Works without JavaScript (standard HTML form submission)
- [x] Supports dark mode via existing CSS custom properties

## Constraints

- No third-party JavaScript — Buttondown's embed is a plain HTML form
- Free tier only (up to 100 subscribers, manual send)
- RSS-to-email automation is not used (paid add-on)
- Form submits to Buttondown's API endpoint, opening confirmation in a new tab

## Acceptance Criteria

- [x] Sidebar displays a "Subscribe" section with an email input and submit button
- [x] Post pages display a subscribe CTA after the prev/next navigation
- [x] Sidebar displays an RSS feed link (icon + text or icon-only)
- [x] Form submits successfully to Buttondown and the subscriber appears in the Buttondown dashboard
- [x] Setting `newsletter: false` in a post's front matter hides the post-footer CTA
- [x] Both components render correctly in light and dark modes
- [x] Components are keyboard accessible and have appropriate ARIA labels
- [x] `_config.yml` contains newsletter configuration (username, heading, description)
- [x] No layout shifts or visual regressions on existing pages

## Affected Files

- `_includes/newsletter-cta.html` — new include for the subscribe form component
- `_includes/sidebar.html` — add subscribe section and RSS link
- `_layouts/post.html` — add newsletter CTA after post navigation
- `_config.yml` — add newsletter configuration block
- `assets/css/_partials/_newsletter.scss` — new SCSS partial for component styles
- `assets/main.scss` — import newsletter partial
- `docs/newsletter-research.md` — updated with completed evaluation

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-25 | 2026-02-25 | Research conducted in conversation; all decisions made |
| Implementation | 2026-02-25 | 2026-02-25 | 6 implementation commits + 3 testing fixes on feature branch |
| Testing | 2026-02-25 | 2026-02-25 | A11y and QA audits passed; 1 bug fixed (dark mode contrast); user testing passed |
| Acceptance | 2026-02-25 | 2026-02-25 | All criteria met; user confirmed |

## Completion Notes

### Delivered
- Embedded Buttondown subscribe form in sidebar and post footer with per-post opt-out
- RSS feed link with icon in sidebar for feed discoverability
- Dark mode support with WCAG AA contrast-compliant button colors
- Form opens Buttondown confirmation in a new tab (reader stays on blog)

### Deviations
- Added `target="_blank"` to form so confirmation opens in new tab — not in original spec but requested during user testing
- Original Buttondown embed included "Powered by Buttondown" referral link — removed in favor of clean BEM-styled form

### What Went Well
- Research was conducted interactively in conversation, making the provider decision fast and well-informed
- All key decisions (provider, placement, integration style, send method) were settled before implementation began
- The HTML form approach required zero JavaScript — pure progressive enhancement
- A11y SME caught the dark mode contrast issue before user testing

### What Didn't Go Well
- Nothing significant — straightforward feature with no blockers

### Lessons Learned
- Buttondown's RSS-to-email is a paid add-on ($9/month), not included in free tier — verify feature availability per pricing tier during research, not just overall service capabilities
