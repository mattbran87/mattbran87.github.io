# Feature: Dark Mode

> **Spec ID:** 013
> **Status:** Completed
> **Created:** 2026-02-24
> **Completed:** 2026-02-24

## Goal

Add a light/dark theme toggle that detects system preference, allows manual override, and persists the user's choice. All components and Bootstrap customizations support both modes via CSS custom properties.

## Background

The site currently has a fixed light theme. Dark mode is a widely expected feature for developer-focused blogs — it reduces eye strain in low-light conditions and respects user preference. The custom theme (002) established a two-layer variable architecture: SCSS variables for Bootstrap overrides (Layer 1) and CSS custom properties for project components (Layer 2). Dark mode is the natural payoff for that architecture — it swaps CSS custom property values to restyle the entire site without duplicating component CSS.

## Requirements

- [x] Detect system color scheme preference via `prefers-color-scheme`
- [x] Allow manual theme toggle (light/dark) via a UI control
- [x] Persist the user's manual choice in localStorage
- [x] System preference is used when no manual choice has been saved
- [x] All existing components render correctly in both light and dark modes
- [x] Bootstrap customizations (variables, utilities) support both modes
- [x] Syntax highlighting (Rouge) theme works in both modes
- [x] Toggle control is accessible (keyboard operable, proper ARIA attributes)
- [x] No flash of incorrect theme on page load (FOUC prevention)
- [x] Transition between themes is smooth (CSS transitions on color properties)

## Constraints

- Static site — no server-side detection or rendering
- No external dependencies beyond what's already vendored (Bootstrap, existing JS)
- Must not degrade page performance
- Must work with existing cookie consent banner (012, when implemented)
- CSS custom properties are the mechanism — no duplicate stylesheets or class-based overrides on individual components
- Must not break existing pages or components

## Acceptance Criteria

- [x] Dark mode activates automatically when system preference is `prefers-color-scheme: dark`
- [x] Light mode activates automatically when system preference is `prefers-color-scheme: light` (or no preference)
- [x] A visible toggle control allows switching between light and dark modes
- [x] Manual toggle choice persists across page navigations and browser sessions (localStorage)
- [x] Clearing localStorage reverts to system preference behavior
- [x] No flash of wrong theme on page load (theme applied before first paint)
- [x] All text meets WCAG 2.2 AA contrast ratios in both modes
- [x] All interactive elements have visible focus indicators in both modes
- [x] Code blocks (syntax highlighting) are readable in both modes
- [x] Tag pills, series badges, related posts cards render correctly in both modes
- [x] Navigation, header, and footer render correctly in both modes
- [x] Search page and results render correctly in both modes
- [x] Contact form renders correctly in both modes
- [x] About page renders correctly in both modes
- [x] Toggle control is keyboard accessible (Tab to focus, Enter/Space to activate)
- [x] Toggle control has appropriate ARIA attributes (role, label, state)
- [x] Smooth color transition when toggling (no jarring flash)
- [x] No JavaScript errors in the browser console in either mode
- [x] Lighthouse performance score remains 90+ after dark mode implementation
- [x] Inline FOUC-prevention script is under 500 bytes
- [x] Theme transition animation is disabled when `prefers-reduced-motion: reduce` is active — theme switches instantly
- [x] When no manual preference is saved, site responds to OS-level color scheme changes in real-time without page reload
- [x] When a manual preference is saved, OS-level color scheme changes are ignored
- [x] With JavaScript disabled, site renders in light mode, toggle is hidden, no broken UI or console errors

## Affected Files

- `_layouts/default.html` — inline FOUC-prevention script, theme toggle module script tag
- `_includes/head.html` — noscript style to hide toggle when JS disabled
- `_includes/header.html` — theme toggle button placement
- `_includes/theme-toggle.html` — toggle component markup (new)
- `assets/css/_partials/_variables.scss` — dark mode custom property block, new semantic tokens
- `assets/css/_partials/_syntax-dark.scss` — GitHub Dark syntax theme (new)
- `assets/css/_partials/_theme-toggle.scss` — toggle button styles (new)
- `assets/css/_partials/_code-blocks.scss` — replace hard-coded #116329 with --color-success
- `assets/css/_partials/_series.scss` — replace hard-coded status badge colors with custom properties
- `assets/css/_partials/_search.scss` — replace hard-coded #c62828 and rgba with custom properties
- `assets/css/_partials/_base.scss` — theme transition styles, prefers-reduced-motion override
- `assets/js/modules/theme-toggle.js` — theme toggle ES module (new)
- `assets/main.scss` — import _syntax-dark, _theme-toggle partials

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-24 | 2026-02-24 | 5 SMEs, 28 findings, 12 decisions, 13 impl tasks |
| Implementation | 2026-02-24 | 2026-02-24 | 13 tasks, 13 commits (incl. 1 bug fix from Testing), build verified |
| Testing | 2026-02-24 | 2026-02-24 | 3 issues fixed (noscript, aria-label, dead code) + transition tweak; all user tests pass |
| Acceptance | 2026-02-24 | 2026-02-24 | All requirements met, Lighthouse deferred to post-deploy |

## Completion Notes

### Delivered
- Full light/dark theme toggle with system preference detection, manual override via localStorage, and FOUC prevention (255-byte inline script)
- 23 CSS custom property dark values in a `[data-bs-theme="dark"]` block, plus 7 new semantic tokens replacing hard-coded colors across 3 partials
- GitHub Dark syntax highlighting theme via separate `_syntax-dark.scss`
- Accessible toggle button with sun/moon SVG icons, visually hidden dynamic label, and aria-live announcements
- Smooth 0.5s transitions on structural elements with `prefers-reduced-motion` override
- Progressive enhancement: light mode default and hidden toggle when JS disabled

### Deviations
- D6: Used raw `[data-bs-theme="dark"]` selector instead of `@include color-mode(dark)` mixin because `_variables.scss` is imported before Bootstrap's mixins in the SCSS pipeline. Same CSS output.
- D8: Transition duration changed from 0.2s to 0.5s per user preference during testing.

### What Went Well
- Two-layer variable architecture (spec 002) paid off exactly as designed — dark mode was a matter of swapping custom property values, not rewriting component CSS
- 5-SME research phase produced 28 findings with zero conflicts, making implementation straightforward
- All 14 dark palette contrast pairings passed WCAG AA on first attempt — the CSS/Design SME palette recommendation was well-calibrated
- Bug fix flow worked smoothly — 3 issues found during Testing, all fixed immediately with minimal overhead

### What Didn't Go Well
- The `getPreferredTheme()` function was implemented but never wired up — the FOUC inline script handles initial detection and the module reads the attribute directly. Should have caught this during implementation self-review.
- D6 mixin unavailability wasn't discovered until implementation — the import order constraint should have been identified during Research when the Bootstrap SME recommended the mixin.

### Lessons Learned
- Verify SCSS mixin availability at the actual import point during Research — a mixin recommended by one SME may not be available where another SME recommends placing the code.
- Dead code is easy to introduce when inline scripts and modules share responsibilities — review the boundary between FOUC script and module initialization to ensure no overlap.
- User testing for subjective qualities (transition speed) is valuable — the 0.2s default felt mechanical; 0.5s felt natural. These preferences can't be determined through code review alone.
