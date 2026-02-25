# Feature: Social Sharing

> **Spec ID:** 020
> **Status:** Draft
> **Created:** 2026-02-25
> **Completed:** —

## Goal

Add share buttons to blog posts so readers can easily share articles to social platforms, copy the link, or send via email. No third-party scripts, no tracking, no cookies — just plain URL-based share links and minimal JavaScript.

## Background

The site currently has no way for readers to share posts. Social sharing buttons are a standard blog feature that increases content reach. The SEO Foundation (008) already provides Open Graph meta tags, so shared links will display rich previews on social platforms. This feature uses plain URL-based share endpoints — no SDKs or tracking scripts — keeping the privacy-friendly approach consistent with the rest of the site.

## Requirements

- [ ] Create `_includes/social-share.html` component with share buttons
- [ ] Include share buttons in the post layout after post content
- [ ] Support platforms: Twitter/X, LinkedIn, Reddit, Hacker News
- [ ] Add a Copy Link button using the Clipboard API
- [ ] Add an Email share link using `mailto:`
- [ ] Add Web Share API support as progressive enhancement for mobile
- [ ] All share links open in a new tab (`target="_blank" rel="noopener"`)
- [ ] URL-encode all dynamic values using Liquid's `url_encode` filter
- [ ] Style with Bootstrap components and BEM naming conventions
- [ ] Support dark mode via existing CSS custom properties
- [ ] Full keyboard accessibility
- [ ] No third-party scripts, tracking, or cookies

## Constraints

- Static site only — no server-side logic
- Must work with existing post layout without breaking other components (related posts, series nav)
- Copy button and Web Share API require JavaScript; core share links must work without JS
- Bootstrap Icons are available in the project for platform icons
- Follow ES module pattern per code guidelines

## Acceptance Criteria

- [ ] Share buttons appear below post content on all published posts
- [ ] Each platform link opens the correct sharing URL with the post title and URL pre-filled
- [ ] Copy Link button copies the page URL and shows visual feedback
- [ ] Web Share API button appears only on devices that support it
- [ ] Email link opens the default mail client with subject and body pre-filled
- [ ] All buttons are keyboard accessible (focusable, activatable with Enter/Space)
- [ ] Screen readers announce each button's purpose
- [ ] Component renders correctly in both light and dark mode
- [ ] Component is responsive — works at mobile, tablet, and desktop widths
- [ ] No JavaScript errors when JS is disabled (share links still work, copy/Web Share hidden)
- [ ] Generated HTML is valid
- [ ] No third-party network requests from the share component

## Affected Files

- `path/to/file` — description of change

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | — | — | |
| Implementation | — | — | |
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
