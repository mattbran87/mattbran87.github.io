# Feature: Comments

> **Spec ID:** 021
> **Status:** Completed
> **Created:** 2026-02-25
> **Completed:** 2026-02-25

## Goal

Add per-post commenting using Giscus, presented in a right-side offcanvas panel that readers can open on demand. Comments are stored as GitHub Discussions in the repository — no external service, no tracking, no cookies. The Giscus script is lazy-loaded only when the user opens the panel.

## Background

The site currently has social sharing (spec 020) for outbound engagement but no way for readers to respond or discuss posts. Giscus was selected during prior research (`docs/commenting-system-research.md`) as the best fit: free, privacy-friendly, lightweight, GitHub-native, and ideal for a developer audience. Dark mode (spec 013) is already implemented, enabling automatic theme matching.

## Requirements

- [x] Add a "Comments" pill button as the last item in the social-share `<ul>` list
- [x] Create a Bootstrap offcanvas panel (`_includes/comments.html`) that slides in from the right
- [x] Lazy-load the Giscus script on first panel open — no third-party script on page load
- [x] Store Giscus configuration in `_config.yml` under `comments.giscus.*`
- [x] Map discussions using `pathname` strategy with `data-strict="1"`
- [x] Comments enabled by default; disable per post via `comments: false` in front matter
- [x] When `comments: false`, omit both the trigger button and the offcanvas panel entirely
- [x] Set Giscus theme based on current `data-bs-theme` at injection time
- [x] Sync Giscus theme dynamically via `postMessage` when the user toggles dark/light mode
- [x] Create "Blog Comments" Discussion category in the GitHub repository
- [x] Include `crossorigin="anonymous"` on the Giscus script tag
- [x] Include `data-emit-metadata="0"` in Giscus config

## Constraints

- No external dependencies beyond the Giscus script tag (loaded on demand)
- Must not break existing post layout components (TOC, series line, social share, related posts)
- Giscus requires GitHub Discussions enabled and the Giscus app installed on the repo
- Readers must have a GitHub account to comment (acceptable for developer audience)
- The `page.comments` front matter flag must be checked correctly in the post layout context (not a loop context)
- If the Giscus script fails to load (network error, ad blocker), no layout breakage or console errors
- Bootstrap offcanvas CSS must be imported in `assets/main.scss`

## Acceptance Criteria

- [x] A "Comments" pill button appears in the social-share row on post pages
- [x] Clicking the button opens a right-side offcanvas panel
- [x] The Giscus widget loads inside the panel on first open (lazy load)
- [x] Subsequent opens reuse the already-loaded widget (no re-injection)
- [x] Comments map to GitHub Discussions via URL pathname with strict matching
- [x] `comments: false` in front matter hides both the button and the panel
- [x] Giscus theme matches the site's current dark/light mode on first load
- [x] When the user toggles dark/light mode, the Giscus iframe updates its theme without a page reload
- [x] The offcanvas panel has accessible heading, focus trapping, ESC to close (Bootstrap handles this)
- [x] No layout regressions to post content, TOC, series line, social share, prev/next nav, or related posts
- [x] Widget loads and displays correctly on mobile viewports
- [x] When Giscus script is blocked or fails to load, no layout breakage or console errors
- [x] Jekyll build passes with no errors
- [x] Giscus configuration values are stored in `_config.yml`, not hardcoded

## Affected Files

- `_includes/comments.html` — new: offcanvas panel markup with Giscus placeholder
- `_includes/social-share.html` — add Comments pill button as last list item
- `_layouts/post.html` — add comments include after `</article>`, before related-posts
- `_config.yml` — add Giscus configuration block under `comments.giscus.*`
- `assets/js/modules/comments.js` — new: lazy-load Giscus on panel open, dark mode sync
- `assets/js/modules/theme-toggle.js` — add postMessage to Giscus iframe on toggle
- `assets/js/main.js` — import and init comments module
- `assets/main.scss` — import Bootstrap offcanvas, close, and comments partial
- `assets/css/_partials/_comments.scss` — new: offcanvas panel styling overrides

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-25 | 2026-02-25 | 3 SMEs consulted; 10 decisions recorded |
| Implementation | 2026-02-25 | 2026-02-25 | 5 commits; 9 files created/modified |
| Testing | 2026-02-25 | 2026-02-25 | 2 SME audits clean; 1 bug fixed (missing Bootstrap close CSS); 10/10 user tests pass |
| Acceptance | 2026-02-25 | 2026-02-25 | All requirements and AC met; merged to master |

## Completion Notes

### Delivered
- Giscus commenting system integrated via Bootstrap offcanvas panel that slides in from the right on demand
- Lazy-loaded on first open — no third-party scripts on page load
- Full dark mode sync: explicit theme on injection + postMessage on toggle
- Per-post opt-out via `comments: false` front matter
- Comments button in social-share pill row for visual cohesion

### Deviations
- Added Bootstrap `close` SCSS partial import — not in original affected files list but required for `.btn-close` X icon rendering

### What Went Well
- Offcanvas panel decision (D5) was a strong UX choice — keeps reading flow clean while making comments easily accessible
- Lazy loading pattern is clean and simple — one event listener, one flag, no complex state
- SME consultations during Research produced thorough findings that prevented issues during Implementation
- All 10 decisions made during Planning held through Implementation with no mid-build changes

### What Didn't Go Well
- Missing Bootstrap `close` partial wasn't caught until user testing — the selective Bootstrap import approach requires checking all CSS dependencies of each component, not just the primary partial
- Implementation started before explicit Phase 1 sign-off in the previous session

### Lessons Learned
- When importing a Bootstrap component partial (e.g., `offcanvas`), audit its rendered HTML for classes that depend on other partials (e.g., `.btn-close` requires `close`). Bootstrap components are not fully self-contained in their SCSS.
- Phase sign-off checkpoints must be explicitly confirmed before advancing — the checklist exists to prevent premature work
