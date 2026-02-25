# Milestone Retrospective: Enhancements

> **Group:** Enhancements (011 Code Block Enhancements, 013 Dark Mode, 022 JS Module Migration)
> **Completed:** 2026-02-24
> **Review Date:** 2026-02-24

## Summary of Features

| # | Feature | Scope | Duration |
|---|---------|-------|----------|
| 011 | Code Block Enhancements | Rouge syntax theme, copy-to-clipboard button, consolidated code styles, hover-reveal pattern, 4 files | 1 day (full spec, all 4 phases) |
| 013 | Dark Mode | Light/dark toggle, 23 CSS custom properties, dark syntax theme, FOUC inline script, accessible toggle button, transitions, 10+ files | 1 day (full spec, all 4 phases) |
| 022 | JS Module Migration | Convert 3 IIFEs to ES modules, create main.js entry point, update layout script tags, 7 files | 1 session (mini-spec) |

The Enhancements group adds developer experience polish (code blocks), theming (dark mode), and codebase modernization (ES modules). All three features build on the Foundation group's two-layer variable architecture and Bootstrap integration.

## Cross-Feature Patterns

### Recurring issues

- **JS architecture mismatch corrected late:** 011 chose the IIFE pattern "for consistency with existing scripts" (D7), matching the legacy approach rather than the documented ES module target. 013 introduced the first ES module (`theme-toggle.js`), creating a split. 022 was needed to reconcile the two patterns into a single ES module architecture. Had 011 followed the code guidelines' target pattern, 022 would have been unnecessary.
- **Inline script / module boundary ambiguity:** 013 introduced a FOUC-prevention inline script alongside the theme-toggle ES module. The `getPreferredTheme()` function was implemented in the module but never called because the inline script handled detection. This dead code was caught during testing but should have been caught during implementation self-review.

### Common decisions

- **Accessible interactive patterns:** Both 011 (copy button) and 013 (theme toggle) used visible text as the accessible name, aria-live regions for state announcements, and keyboard-accessible controls. The `aria-label` approach was tried in 011 and rejected after SME audit — 013 learned from that and used visible text from the start.
- **Progressive enhancement:** Both 011 and 013 degrade gracefully — copy buttons don't appear without Clipboard API support, the theme toggle is hidden when JS is disabled. 022 preserved this by keeping external libraries (Bootstrap, Lunr) as classic deferred scripts since they lack ES module builds.
- **`prefers-reduced-motion` support:** Both 011 (button transitions) and 013 (theme transitions) respect the reduced-motion media query. This is now an established project convention for any CSS transitions.
- **CSS custom properties as the theming mechanism:** 011 introduced code block tokens, 013 extended the full site to dark mode via custom property swaps. The two-layer variable model from Foundation (SCSS for Bootstrap overrides, custom properties for components) proved its value — dark mode was largely a matter of adding alternate property values rather than rewriting component CSS.

### Repeated blockers

- None. Each feature had unique challenges (011: CSS cascade specificity; 013: SCSS import order for mixins; 022: none) but nothing recurred across the group.

## Workflow Effectiveness

### What worked

- **Two-layer variable architecture (from Foundation) paid off exactly as designed.** 013's dark mode was the acid test — swapping custom property values in a single `[data-bs-theme="dark"]` block was sufficient. No component CSS needed rewriting.
- **SME consultations continued to catch real issues.** 011's QA found the `aria-label` mismatch and missing `.catch()`. 013's 5-SME research phase produced 28 findings with zero conflicts. Both features were stronger for the audits.
- **Mini-spec tier was appropriate for 022.** No research, no architectural decisions, no SME consultations needed — just mechanical migration. The mini-spec approach (discuss, implement, log in changelog) was the right tier. This validates the Foundation retro's recommendation to calibrate spec tier to scope.
- **Self-review catches cascade bugs.** 011's opacity bug (hover media query overriding the `--copied` state) was caught during self-review before committing. This is now a documented lesson.
- **Bug fix flow in Testing worked smoothly for 013.** Three issues found during Testing were fixed immediately with minimal overhead, validating the "fix now or batch" Testing phase process.

### What was too heavy

- **Nothing in this group.** Both full specs (011, 013) had genuine research questions and architectural decisions. The mini-spec for 022 was correctly scoped.

### What was missing

- **No "follow the target, not the current state" guideline.** 011's decision to use IIFE for consistency was reasonable in isolation but created technical debt that 022 had to clean up. A guideline to follow the documented target architecture (code guidelines) rather than matching existing legacy code would have prevented this.

## Process Improvements for Next Group

1. **Follow documented target architecture for new code.** When code guidelines specify a pattern (e.g., ES modules), new code should use that pattern even if existing code hasn't been migrated yet. Matching legacy patterns creates technical debt.
2. **Review inline script / module boundaries during implementation.** When a feature has both an inline script and an ES module (e.g., FOUC prevention + runtime behavior), explicitly document which responsibilities belong to each and verify no overlap during self-review.
3. **Continue `prefers-reduced-motion` as a standard convention.** Any feature adding CSS transitions should include a reduced-motion override. Consider adding this to code guidelines if not already there.

## Updated Conventions

- **New lesson added to `docs/lessons-learned.md`:** "Follow the documented target architecture for new code, not the current state" under a new JavaScript section. (Source: specs 011, 022)
- No changes needed to `CLAUDE.md` or `docs/code-guidelines.md` — the ES module pattern and single entry point are already documented there.
