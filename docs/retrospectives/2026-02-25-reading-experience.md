# Milestone Retrospective: Reading Experience

> **Group:** Reading Experience (024 Estimated Reading Time, 025 Table of Contents, 026 Back to Top Button, 027 Scroll Progress Indicator, 031 Series Badge Redesign)
> **Completed:** 2026-02-25
> **Review Date:** 2026-02-25

## Summary of Features

| # | Feature | Scope | Duration |
|---|---------|-------|----------|
| 031 | Series Badge Redesign | Replace pill badge with h3 link, move above excerpt, remove old pill styles, 3 files | 1 session (mini-spec, batched with 023 and 024) |
| 024 | Estimated Reading Time | Pure Liquid reading time calc (~200 wpm), reusable include, post cards + post pages, 7 files | 1 session (mini-spec, batched with 023 and 031) |
| 025 | Table of Contents | JS-generated TOC from h2–h4, IntersectionObserver active heading, series TOC replaced with p line, dead code cleanup, 9 files | 1 session (full spec, all 4 phases) |
| 026 | Back to Top Button | Floating fixed button, scroll threshold reveal, smooth scroll, prefers-reduced-motion, 6 files | 1 session (mini-spec, batched with 027) |
| 027 | Scroll Progress Indicator | JS-created progress bar, scaleX transform, post pages only, ARIA progressbar, 4 files | 1 session (mini-spec, batched with 026) |

The Reading Experience group enhances how readers navigate and orient themselves within posts. Reading time sets expectations before reading, the TOC provides in-post navigation, the progress bar shows position within a post, and the back-to-top button provides a quick return. The series badge redesign was sequenced first to settle the post-card series treatment before the TOC addressed the inline series presentation on post pages.

## Cross-Feature Patterns

### Recurring issues

- **CSS specificity in `.post__content` containers:** 025's TOC heading (`h2.article-toc__heading`) was overridden by `.post__content h2` margin styles. This is a predictable risk for any JS-generated elements placed inside `.post__content` and should be checked proactively for future features that inject elements into that container.

### Common decisions

- **`prefers-reduced-motion` as standard practice:** 025 (smooth scroll), 026 (instant scroll instead of smooth), and 027 (disable transitions) all respect the reduced-motion preference. This is now a firmly established convention across four groups (Enhancements, Sidebar Redesign, Reading Experience, and Foundation).
- **JS-generated DOM over Liquid includes for dynamic content:** Both 025 (TOC nav) and 027 (progress bar) create their DOM elements entirely in JavaScript rather than rendering empty containers in Liquid. This gives clean progressive enhancement — nothing renders if JS fails. 026 used a Liquid include for the button since the `[hidden]` attribute provides the same progressive enhancement guarantee.
- **Scroll listeners with `{ passive: true }`:** Both 026 and 027 attach scroll listeners. Both use the passive flag for performance, ensuring the browser doesn't wait for potential `preventDefault()` calls during scroll.
- **`--color-primary` for interactive/visual elements:** 026 (button background) and 027 (progress bar color) both use `--color-primary`, getting dark mode support for free with zero additional CSS.
- **IntersectionObserver vs scroll listener:** 025 used IntersectionObserver for active heading detection (per-element threshold logic), while 026 and 027 used scroll listeners (simple scroll position checks). The right tool for each job — no over-engineering.

### Repeated blockers

- None.

## Workflow Effectiveness

### What worked

- **Sequencing 031 before 025 was the right call.** The roadmap identified that settling the post-card series treatment first would inform the TOC's handling of series context on post pages. During 025's research, the decision to replace the series TOC with a simple `<p>` line was straightforward because the sidebar series widget (033) and the redesigned series badge (031) already handled series discovery elsewhere. Without that context, the TOC feature would have needed to solve series navigation too.
- **Batching 026 + 027 together was efficient.** Both features share the scroll listener pattern, the same `prefers-reduced-motion` convention, and the same import/wiring steps in `main.js` and `main.scss`. Doing them in one session avoided duplicated context-switching.
- **Earlier batch of 023 + 024 + 031 validated the pattern.** Three mini-spec features that all modify post-card layouts were batched into one session. The Enhancements retro recommended this, and it worked well again here.
- **Full spec for 025, mini-spec for the rest.** The TOC had genuine research questions (series TOC replacement, DOM injection vs Liquid, IntersectionObserver design, heading hierarchy). The other four features had clear implementations with no unknowns. Tier calibration was correct for all five.
- **Self-review during 025 caught a heading hierarchy violation.** The series indicator was initially an `<h3>`, which would have created an h1 → h3 → h2 hierarchy violation. Caught and changed to `<p>` before Testing.

### What was too heavy

- Nothing. One full spec and four mini-specs was the right mix for this group.

### What was missing

- **No proactive check for container specificity during CSS SME consultation.** The `.post__content h2` override on the TOC heading could have been anticipated if the CSS SME research had explicitly reviewed element-type selectors in containers where JS would inject elements. This was added as a lesson learned but the check should be part of future CSS SME consultations.

## Process Improvements for Next Group

1. **Check container element-type selectors before placing JS-generated elements.** When a JS module creates elements inside a styled container (`.post__content`, `.sidebar`, etc.), review the container's CSS for element-type selectors that could override the new component's styles. Do this during Research or early Implementation, not after the first styling commit.
2. **Continue batching scroll-related features.** If future features involve scroll listeners (e.g., sticky headers, infinite scroll), batch them to share listener patterns and avoid redundant event handlers.
3. **The passive scroll listener + scaleX transform pattern is reusable.** The approach used in 027 (GPU-accelerated visual update on scroll with no layout thrashing) is a good template for any future scroll-driven visual effect.

## Updated Conventions

- **Lesson added to `docs/lessons-learned.md`:** "Check for inherited element-type selectors when placing JS-generated elements inside styled containers" under CSS section. (Source: spec 025)
- No changes needed to `CLAUDE.md` or `docs/code-guidelines.md`.
- The JS module pattern for scroll-based features (passive listener, DOM creation, conditional activation via element detection) is now established across `back-to-top.js`, `scroll-progress.js`, and `toc.js`.
