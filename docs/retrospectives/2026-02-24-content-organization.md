# Milestone Retrospective: Content Organization

> **Group:** Content Organization (003 Tags & Categories, 004 Series Support, 010 Related Posts)
> **Completed:** 2026-02-24
> **Review Date:** 2026-02-24

## Summary of Features

| # | Feature | Scope | Duration |
|---|---------|-------|----------|
| 003 | Tags & Categories | jekyll-archives plugin, per-tag archive pages, tags index page, tag pills on posts/homepage, 11 files | 1 day (all 4 phases) |
| 004 | Series Support | `_data/series.yml`, series TOC + prev/next nav, per-series archive pages, series badge on homepage, 22 tasks, 12 commits | 1 day (all 4 phases) |
| 010 | Related Posts | Tag-scoring algorithm in pure Liquid, related posts aside on post pages, stacked card layout, 4 files | 1 day (all 4 phases) |

All three features completed within a 3-day span (Feb 22–24). The Content Organization group establishes: tag-based taxonomy, multi-part series linking, and automated related content recommendations — all built on the Foundation group's Bootstrap/theme layer.

## Cross-Feature Patterns

### Recurring issues

- **Liquid complexity ceiling:** Each feature pushed Liquid further — from simple tag iteration (003) to nested loops with sort keys (004) to a full string-scoring algorithm (010). By 010, the Liquid was the most complex in the project and required thorough inline comments for maintainability. Future features should consider whether Liquid is the right tool or if a Jekyll plugin would be cleaner.
- **Missing/unexpected Liquid filters:** Both 003 (slugify behavior) and 004 (missing `pluralize` filter) required workarounds for Liquid filter limitations. Lesson: always verify filter availability and behavior before relying on them in the implementation plan.
- **Manual archive page creation:** Both 003 (tags index) and 004 (per-series pages) require hand-built archive pages. jekyll-archives handles per-tag pages but not the index; series pages are fully manual by design. This is a known maintenance cost for future content additions.

### Common decisions

- **Pure Liquid, no plugins (except jekyll-archives for 003):** 004 and 010 both chose pure Liquid over plugins. The rationale was consistent: no viable plugins exist, and Liquid solutions keep the build pipeline simple and GitHub Pages-compatible.
- **BEM naming with CSS custom properties:** All three features used BEM-named SCSS blocks (`.tag`, `.series-*`, `.related-posts`) with project design tokens. The pattern established in Foundation carried through without friction.
- **Shared `_includes/` architecture:** 003 created `post-tags.html`, 004 created `series-toc.html` and `series-badge.html`, 010 created `related-posts.html`. Each is a self-contained include with clear responsibilities, following the pattern set by the custom theme.
- **Tags as the universal connector:** Tags power all three features — archive pages (003), series discovery via tag overlap (010), and related post scoring (010). The decision to go tags-only (no categories) in 003 simplified the entire group.

### Repeated blockers

- None. Each feature had unique challenges but nothing recurred as a blocker across all three.

## Workflow Effectiveness

### What worked

- **Single-day feature cycles continued:** All three specs completed in one day each, matching the Foundation group's pace. The four-phase workflow stayed lightweight for well-scoped features.
- **SME consultations caught real issues:** 003's QA review found 7 issues before testing. 004's accessibility audit found 3 issues (focus-visible, contrast, semantic markup) that were fixed before acceptance. 010's combined A11y + QA audits returned zero issues, validating the "accessible defaults" approach from Foundation.
- **Decision documentation prevented mid-implementation churn:** 003 resolved 4 open questions upfront, 004 documented 7 decisions, 010 documented 8. In every case, implementation proceeded without scope changes because decisions were settled during research.
- **Codebase preparation paid off:** 003 found that tag templates and SCSS were already partially in place from the theme work, dramatically reducing implementation time. Each feature in the group built cleanly on the last.
- **Deploy verification process (added after Foundation retro):** The Foundation retro identified missing deploy verification as a gap. By 010, deploy verification was part of the acceptance checklist and caught no issues — the process improvement was adopted.

### What was too heavy

- **Nothing in this group.** Unlike Foundation's 006 (which may not have needed a full spec), all three Content Organization features had genuine research questions, multiple approaches to evaluate, and architectural decisions to make. The full spec workflow was appropriate for each.

### What was missing

- **Performance baseline for Liquid-heavy features:** 010 noted that the tag-scoring algorithm is O(N² × T) but "negligible at current post count." There's no performance benchmark to detect when this stops being negligible. A build-time measurement would help future-proof the assessment.
- **Integration testing across the group:** Each feature was tested independently, but the three features interact — tags power both series discovery and related posts. Cross-feature integration was verified informally but not as a structured test step.

## Process Improvements for Next Group

1. **Add build-time measurement to Testing phase.** For features with Liquid loops over all posts (like 010's scoring algorithm), measure `jekyll build` time before and after to establish a performance baseline.
2. **Verify Liquid filter availability during Research.** Add a research checklist item: "List all Liquid filters used in this feature and verify each exists in Jekyll's Liquid implementation." This would have prevented the 004 `pluralize` surprise.
3. **Consider cross-feature integration testing for grouped features.** When features in the same natural grouping interact (e.g., tags feeding related posts), add a brief integration check to the final feature's Testing phase.
4. **Continue the "accessible defaults" approach.** The pattern of baking accessibility into foundational SCSS (established in Foundation) continued to pay dividends — 010's audits found zero issues because the design tokens already met WCAG standards.

## Updated Conventions

No new conventions to add to `CLAUDE.md` or `docs/code-guidelines.md`. The Liquid commenting conventions and BEM naming patterns are already documented. The lesson about verifying Liquid filter availability is captured in this retro and in 004's spec notes.
