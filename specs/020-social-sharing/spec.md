# Feature: Social Sharing

> **Spec ID:** 020
> **Status:** Completed
> **Created:** 2026-02-25
> **Completed:** 2026-02-25

## Goal

Add share buttons to blog posts so readers can easily share articles to social platforms, copy the link, or send via email. No third-party scripts, no tracking, no cookies — just plain URL-based share links and minimal JavaScript. Two variants: full (article page, 6 options) and compact (post-cards, Copy Link + Web Share only).

## Background

The site currently has no way for readers to share posts. Social sharing buttons are a standard blog feature that increases content reach. The SEO Foundation (008) already provides Open Graph meta tags, so shared links will display rich previews on social platforms. This feature uses plain URL-based share endpoints — no SDKs or tracking scripts — keeping the privacy-friendly approach consistent with the rest of the site.

## Requirements

- [ ] Create `_includes/social-share.html` component with share buttons
- [ ] Include accepts `url`, `title`, and `compact` parameters (defaults to `page.url` and `page.title`)
- [ ] Full variant: include in the post layout after `.post__content`, before `.post__nav`
- [ ] Compact variant: include in post-cards (homepage, tag archive, series archive) with Copy Link + Web Share only
- [ ] Support platforms (full variant): Twitter/X, LinkedIn, Reddit, Email
- [ ] Add a Copy Link button using the Clipboard API (both variants)
- [ ] Add Web Share API support as progressive enhancement (both variants)
- [ ] All share links open in a new tab (`target="_blank" rel="noopener"`)
- [ ] URL-encode all dynamic values using Liquid's `url_encode` filter
- [ ] Support `share: false` in post front matter to hide share buttons on individual posts
- [ ] Create `assets/js/modules/social-share.js` ES module for Copy Link and Web Share, imported from `main.js`
- [ ] Style with BEM naming conventions (`.social-share` block)
- [ ] Support dark mode via existing CSS custom properties
- [ ] Full keyboard accessibility
- [ ] No third-party scripts, tracking, or cookies

## Constraints

- Static site only — no server-side logic
- Must work with existing post layout without breaking other components (related posts, series nav)
- Copy button and Web Share API require JavaScript; platform share links (full variant) must work without JS
- Compact variant is JS-only — if JS is disabled, nothing renders on post-cards (acceptable)
- Icons are inline SVGs (project pattern from theme-toggle), not Bootstrap Icons CSS
- Follow ES module pattern per code guidelines
- JS must handle multiple Copy Link buttons on a single page (post-card lists) via `data-url` attributes

## Acceptance Criteria

- [x] Full share buttons appear in post header on all published posts (unless `share: false`)
- [x] Compact share buttons (Copy Link + Web Share) appear on post-cards on homepage, tag archive, and series archive
- [x] Each platform link opens the correct sharing URL per the URL patterns in `docs/social-sharing-research.md`
- [x] Copy Link button copies the post URL and shows visual feedback ("Copied!")
- [x] Copy Link works correctly on pages with multiple post-cards (each copies its own URL)
- [x] Web Share API button appears only on devices that support it
- [x] Email link opens the default mail client with subject and body pre-filled
- [x] All buttons are keyboard accessible (focusable, activatable with Enter/Space)
- [x] Screen readers announce each button's purpose
- [x] Share buttons do not render on posts with `share: false` in front matter
- [x] Component renders correctly in both light and dark mode
- [x] Component is responsive — works at mobile, tablet, and desktop widths
- [x] No JavaScript errors when JS is disabled (full variant: share links still work, copy/Web Share hidden; compact variant: nothing renders)
- [x] Generated HTML is valid
- [x] No third-party network requests from the share component

## Affected Files

- `_includes/social-share.html` — new, the share component (full + compact variants)
- `_layouts/post.html` — add full share include after `.post__content`
- `_layouts/home.html` — add compact share include in post-card loop
- `_layouts/tag-archive.html` — add compact share include in post-card loop
- `_layouts/series-archive.html` — add compact share include in post-card loop
- `assets/css/_partials/_social-share.scss` — new, BEM styles for both variants
- `assets/main.scss` — add social-share partial import
- `assets/js/modules/social-share.js` — new, Copy Link + Web Share logic
- `assets/js/main.js` — add social-share module import

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-25 | 2026-02-25 | 4 SMEs consulted, 23 findings, 13 decisions. Post-card compact variant added, Hacker News removed per user request. |
| Implementation | 2026-02-25 | 2026-02-25 | 8 commits, no deviations from plan. Build verified. |
| Testing | 2026-02-25 | 2026-02-25 | 4 SME findings fixed (S24-S27), 12/12 user tests passed |
| Acceptance | 2026-02-25 | 2026-02-25 | All ACs met, completion notes filled, merged to master |

## Completion Notes

### Delivered
- Social share component (`_includes/social-share.html`) with two variants: full (Twitter/X, LinkedIn, Reddit, Email, Copy Link, Web Share) and compact (Copy Link + Web Share)
- Full variant in post header below date/tags on all post pages
- Compact variant on post-cards across homepage, tag archive, and series archive
- ES module (`social-share.js`) for Clipboard API copy with "Copied!" feedback and Web Share API feature detection
- BEM-styled ghost pill buttons with dark mode support, keyboard accessibility, aria-live announcements, and reduced-motion respect
- `share: false` front matter opt-out for both variants, `rel="noopener noreferrer"` on external links

### Deviations
- Share buttons moved from after `.post__content` to inside `<header>` below `.post__meta` — user preferred top-of-page placement (D2 revised)
- Bottom border separator instead of top border — user styling preference
- Added `share` parameter to include for compact variant opt-out (not in original spec, added during Testing per S26)
- Added `rel="noreferrer"` to external links for privacy (not in original spec, added during Testing per S27)

### What Went Well
- 13 decisions from Research held up during Implementation — zero mid-build churn
- code-copy.js provided a proven, tested pattern to mirror for Clipboard API and aria-live
- Single include with `compact` parameter (D13) kept markup DRY across both variants
- SME audits caught 4 real issues that were all quick fixes

### What Didn't Go Well
- Multiple styling adjustment commits during Implementation (border position, spacing, placement) — could have been one pass if visual review happened before committing

### Lessons Learned
- When a component has visual design decisions (borders, spacing, placement), do a visual review with the user before committing — reduces adjustment commits
- Pass front matter flags as include parameters when calling includes from post loops — `page` refers to the list page, not the individual post
