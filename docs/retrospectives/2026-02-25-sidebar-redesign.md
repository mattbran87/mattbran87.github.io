# Milestone Retrospective: Sidebar Redesign

> **Group:** Sidebar Redesign (032 Sidebar Tags Widget, 033 Sidebar Series Widget, 034 Sidebar Author Links Redesign)
> **Completed:** 2026-02-25
> **Review Date:** 2026-02-25

## Summary of Features

| # | Feature | Scope | Duration |
|---|---------|-------|----------|
| 032 | Sidebar Tags Widget | Remove tags from post cards (3 layouts), add Popular Tags section to sidebar with top 10 tags + "View all" link, 5 files | 1 session (mini-spec, batched with 033 and 034) |
| 033 | Sidebar Series Widget | Replace Archives section with Series section listing from `_data/series.yml` + "View all" link, 1 file | 1 session (mini-spec, batched with 032 and 034) |
| 034 | Sidebar Author Links Redesign | Rename Elsewhere to Site Author Links, replace text labels with inline SVG icons, add title hover text, 2 files | 1 session (mini-spec, batched with 032 and 033) |

The Sidebar Redesign group modernizes the sidebar from a generic blog template pattern (archives, text social links) to a curated navigation hub (tags, series, icon author links). All three features were batched into a single session since they all modify `_includes/sidebar.html`.

## Cross-Feature Patterns

### Recurring issues

- None. All three features were straightforward sidebar markup changes with no shared technical challenges.

### Common decisions

- **Inline SVGs over external icon library:** 034 used inline SVGs for author link icons, following the same pattern as the social-share component (spec 020), rather than adding Bootstrap Icons as a dependency. This keeps the project dependency-free for icons.
- **Alphabetical sort for tags:** The "Popular Tags" widget sorts alphabetically rather than by post count because Liquid lacks a clean way to sort a hash by computed value size. Alphabetical is consistent with the `/tags/` index page. Can revisit when content volume makes frequency-based sorting valuable.
- **Reuse of existing `.tag` class:** The sidebar tag links reuse the same `.tag` pill component from `_tag.scss` — no new styling needed for the tag pills themselves. Only the container (`sidebar__tags` flex-wrap) and "View all" link needed new CSS.
- **`<nav>` landmarks for link groups:** Both the Popular Tags section and the Author Links section use `<nav>` with descriptive `aria-label` attributes, per Accessibility SME recommendation. This makes the sidebar more navigable for screen reader users.

### Repeated blockers

- None.

## Workflow Effectiveness

### What worked

- **Batching mini-specs that touch the same file:** All three features modify `sidebar.html`. Doing them in one session avoided merge conflicts and repeated context-switching. This validates the lesson from the Enhancements retro about batching related mini-specs.
- **SME review after implementation caught one improvement:** The Accessibility SME recommended wrapping Popular Tags in a `<nav>` landmark. The SEO SME confirmed no negative impact from moving tags out of post cards. Running both SMEs in parallel was efficient.
- **Existing design tokens covered everything:** No new CSS custom properties were needed. The tag pills, sidebar link styles, and spacing tokens from Foundation handled all three features.
- **Removing complexity was the right call:** Dropping Archives (low value, redundant with other post links) and text social labels (replaced with universally recognized icons) simplified the sidebar without losing functionality.

### What was too heavy

- Nothing. All three features were correctly scoped as mini-specs.

### What was missing

- **Bootstrap Icons claim in roadmap was incorrect.** The 034 description said Bootstrap Icons were "already available in the project" — they weren't. Inline SVGs were used instead. Roadmap feature descriptions should be verified against actual project state during implementation.

## Process Improvements for Next Group

1. **Verify dependency claims in roadmap descriptions.** When a feature description references a library or tool being "already available," confirm during implementation rather than trusting the description.
2. **Continue batching sidebar/layout changes.** Any future sidebar features should be grouped into a single session when possible.

## Updated Conventions

- No changes needed to `CLAUDE.md` or `docs/code-guidelines.md`.
- The inline SVG icon pattern for sidebar links is now established alongside the social-share component's use of the same approach.
