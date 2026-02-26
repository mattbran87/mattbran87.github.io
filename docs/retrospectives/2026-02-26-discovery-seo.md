# Milestone Retrospective: Discovery & SEO

> **Group:** Discovery & SEO (008 SEO Foundation, 009 Search, 012 Analytics, 019 Featured Posts)
> **Completed:** 2026-02-26
> **Review Date:** 2026-02-26

## Summary of Features

| # | Feature | Scope | Duration | Outcome |
|---|---------|-------|----------|---------|
| 008 | SEO Foundation | JSON-LD schemas (BreadcrumbList, BlogPosting, Person), jekyll-sitemap, robots.txt, OG images, site.logo, 15 files | 1 session (full spec, all 4 phases) | Completed |
| 009 | Search | Lunr.js client-side search, navbar inline form with smart navigation, `/search/` page, SearchAction schema, 9 files | 1 session (full spec, all 4 phases) | Completed |
| 012 | Analytics | GA4, cookie consent banner, privacy policy page, Consent Mode v2 | 1 session (research only — Stage 1 of Phase 1) | Deferred |
| 019 | Featured Posts | Manual curation via `_data/featured_posts.yml`, sidebar widget, 3 files | 1 session (full spec, all 4 phases) | Completed (Phase 1) |

The Discovery & SEO group improves how readers and search engines find and navigate the site's content. SEO Foundation (008) established structured data, meta tags, and a sitemap. Search (009) gave readers client-side full-text search with an inline navbar form and smart navigation. Analytics (012) completed research but was deferred pending a private repository and server migration. Featured Posts (019) added a manually curated sidebar widget, decoupling Phase 1 from the deferred analytics dependency.

## Cross-Feature Patterns

### Recurring issues

- **Plugin documentation diverges from reality.** 008 discovered two bugs during Implementation: `seo.robots` front matter is not supported by jekyll-seo-tag v2.8.0 (despite documentation suggesting it), and the `twitter` config block produced broken `@` meta tags. Both required workarounds (custom `noindex` key, removing the config block). The fix: read the plugin's actual template source during Research, not just its docs.
- **Accessibility issues found in Testing, not Implementation.** 009 had 5 accessibility findings from the A11y SME audit (duplicate search landmarks, redundant labels, missing progressive enhancement, High Contrast Mode focus styles, missing `datetime` attributes). All were fixable, but catching them during Implementation would have avoided the test-fix-retest cycle.

### Common decisions

- **Supplement, don't replace.** 008 supplements jekyll-seo-tag's JSON-LD with additional `<script>` blocks rather than replacing the plugin's output. 009 adds a SearchAction schema block that builds on 008's foundation. This pattern — layer custom structured data on top of plugin output — minimizes maintenance and lets plugin updates improve the baseline automatically.
- **Config-driven data management.** 008 uses `_config.yml` defaults for fallback front matter values (post images). 012 planned a flat `google_analytics` config key. 019 uses a `_data/` YAML file for curated content. The project consistently prefers declarative config over code-level logic.
- **Decouple phases from blocked dependencies.** 019's two-phase design allowed Phase 1 (manual curation) to ship without waiting for 012 (Analytics/GA4 API). Phase 2 remains available when 012 is unblocked. This pattern is worth repeating for any feature with an optional automation layer.
- **Pattern reuse for sidebar components.** 019 reused existing `sidebar__*` BEM classes with zero new SCSS, validating the sidebar design system established in the Sidebar Redesign group.

### Repeated blockers

- None that recurred across features. 008's plugin issues and 009's a11y findings were one-time discoveries.

## Workflow Effectiveness

### What worked

- **Single-session completion for all implemented features.** 008, 009, and 019 each completed all four phases in one session. Research docs pre-existing for all three features (schema-markup-research.md, no prior doc needed for 009, featured-posts-research.md) accelerated Research & Planning significantly.
- **Thorough research on 012 before deferral.** Four SME consultations (Jekyll, A11y, SEO, QA) produced 27 tracked findings, 10 decisions, and a fully specified implementation plan. When the external blockers clear, Implementation can start immediately with no additional research.
- **Feature sequencing created compounding value.** 008's structured data foundation enabled 009's SearchAction schema, which enhanced Google search results. 019's sidebar placement leveraged the sidebar infrastructure from the Sidebar Redesign group. Each feature built on prior work.
- **SME audits consistently caught real issues.** 009's A11y audit found 5 actionable issues (all fixed). 012's QA audit caught 7 spec inconsistencies and gaps (all resolved before deferral). 019's audits returned clean (0 issues), validating the pattern-reuse approach.
- **Progressive enhancement was effective in 009.** The navbar search form falls back to a standard GET request (`action="/search/"`, `name="q"`) when JavaScript is disabled. This was added during Testing after the A11y SME flagged it — the pattern should be a default consideration for any interactive component.

### What was too heavy

- Nothing. Full specs for 008, 009, and 012 were warranted by their research complexity. 019 was lightweight but still benefited from structured SME review.

### What was missing

- **No proactive plugin source code review during Research.** 008's two Implementation surprises (seo.robots, twitter config) could have been caught by reading jekyll-seo-tag's templates during Research instead of trusting its documentation. This is now a general lesson.
- **No proactive accessibility check during Implementation for 009.** Five issues found in Testing could have been caught with a self-review before the A11y SME audit, particularly the duplicate landmarks and missing progressive enhancement.

## Process Improvements for Next Group

1. **Read plugin/library source code during Research, not just documentation.** When a feature depends on a plugin's specific behavior (e.g., front matter key support, config block handling), verify by reading the plugin's template or source code. Documentation may be outdated or aspirational.
2. **Self-review for accessibility before SME audit.** Before requesting an A11y SME audit in Testing, do a quick self-check: unique landmark labels, progressive enhancement for forms, focus visibility in High Contrast Mode, and `datetime` attributes on `<time>` elements. This reduces the number of test-fix-retest cycles.
3. **Continue the decouple-and-defer pattern.** 019's Phase 1/Phase 2 split worked well. When a feature has an optional automation layer that depends on a blocked feature, ship the manual version first and queue the automation for later.

## Updated Conventions

- **Lesson added to `docs/lessons-learned.md`:** "Read plugin template source during Research, not just documentation" under Build & CI section. (Source: spec 008, Discovery & SEO retro)
- **Lesson added to `docs/lessons-learned.md`:** "Decouple manual-first phases from blocked automation dependencies" under Spec Workflow section. (Source: spec 019, Discovery & SEO retro)
- The supplement-not-replace pattern for structured data (layer custom JSON-LD on plugin output) is an established convention for any future schema additions.
- The `_data/` YAML file pattern for curated content (019) joins `_data/series.yml` as a validated approach for editorial data.
