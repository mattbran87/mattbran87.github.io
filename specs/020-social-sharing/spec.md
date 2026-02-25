# Feature: Social Sharing

> **Spec ID:** 020
> **Status:** Implementation
> **Created:** 2026-02-25
> **Completed:** —

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

- [ ] Full share buttons appear below post content on all published posts (unless `share: false`)
- [ ] Compact share buttons (Copy Link + Web Share) appear on post-cards on homepage, tag archive, and series archive
- [ ] Each platform link opens the correct sharing URL per the URL patterns in `docs/social-sharing-research.md`
- [ ] Copy Link button copies the post URL and shows visual feedback ("Copied!")
- [ ] Copy Link works correctly on pages with multiple post-cards (each copies its own URL)
- [ ] Web Share API button appears only on devices that support it
- [ ] Email link opens the default mail client with subject and body pre-filled
- [ ] All buttons are keyboard accessible (focusable, activatable with Enter/Space)
- [ ] Screen readers announce each button's purpose
- [ ] Share buttons do not render on posts with `share: false` in front matter
- [ ] Component renders correctly in both light and dark mode
- [ ] Component is responsive — works at mobile, tablet, and desktop widths
- [ ] No JavaScript errors when JS is disabled (full variant: share links still work, copy/Web Share hidden; compact variant: nothing renders)
- [ ] Generated HTML is valid
- [ ] No third-party network requests from the share component

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
| Testing | — | — | |
| Acceptance | — | — | |

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
