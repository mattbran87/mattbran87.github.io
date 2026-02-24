# Feature: Code Block Enhancements

> **Spec ID:** 011
> **Status:** Implementation
> **Created:** 2026-02-24
> **Completed:** —

## Goal

Improve the code block experience with a copy-to-clipboard button, a custom syntax highlighting theme, and optional line numbers. Styled to match the site theme.

## Background

As a developer blog, code blocks are a core content element. The current setup uses Jekyll's default Rouge syntax highlighter with whatever default styles are in place. Enhancing code blocks with a copy button, a polished syntax theme, and optional line numbers will improve the reader experience significantly — especially for code-heavy posts.

## Requirements

- [ ] Add a copy-to-clipboard button on all code blocks
- [ ] Implement a custom syntax highlighting theme that matches the site's visual identity
- [ ] Style consistently with the existing Bootstrap-based theme
- [ ] Follow BEM naming conventions for CSS classes
- [ ] Full keyboard accessibility and semantic HTML
- [ ] No external JavaScript dependencies (vanilla JS only)
- [ ] Works with all languages Rouge supports
- [ ] Responsive — code blocks scroll horizontally on small screens

## Constraints

- Static site — no server-side processing at render time
- Must use Rouge (Jekyll's built-in highlighter) — no Prism.js or highlight.js
- No external CDN dependencies
- Must not degrade build performance
- Must work with existing posts without requiring changes to their markdown

## Acceptance Criteria

- [ ] Code blocks display a "Copy" button that copies content to clipboard on click
- [ ] Copy button shows "Copied!" text for 2 seconds after successful copy
- [ ] Custom syntax theme (github) is applied and visually cohesive with site theme
- [ ] Code blocks are horizontally scrollable on narrow viewports
- [ ] Copy button is always visible on touch devices; hover-reveal on desktop
- [ ] Copy button is keyboard accessible (focusable via Tab, activatable via Enter/Space)
- [ ] Screen readers announce the copy button purpose and copy result via aria-live region
- [ ] No JavaScript errors in the browser console
- [ ] Existing posts render correctly without modification

## Affected Files

- `assets/css/_partials/_syntax.scss` — new Rouge github syntax theme
- `assets/css/_partials/_code-blocks.scss` — new BEM styles for copy button and code block container
- `assets/css/_partials/_base.scss` — remove code/pre styles (moved to `_code-blocks.scss`)
- `assets/main.scss` — add imports for `_syntax` and `_code-blocks`
- `assets/js/code-copy.js` — new copy-to-clipboard button injection and logic
- `_layouts/default.html` — add script tag for code-copy.js and aria-live status region

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-24 | 2026-02-24 | Line numbers deferred, visible text copy button confirmed |
| Implementation | 2026-02-24 | — | |
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
