# Milestone Retrospective: Navigation

> **Group:** Navigation (029 Pagination, 030 Visible Breadcrumbs)
> **Completed:** 2026-02-26
> **Review Date:** 2026-02-26

## Summary of Features

| # | Feature | Scope | Duration | Outcome |
|---|---------|-------|----------|---------|
| 029 | Pagination | jekyll-paginate v1, 5 posts/page, Bootstrap pagination component, 7 files | 1 session (full spec, all 4 phases) | Completed |
| 030 | Visible Breadcrumbs | — | — | Deferred (flat site hierarchy — Home → Post; no navigational value) |

The Navigation group aimed to help readers navigate the site as content volume grows. Pagination was built to cap the homepage at 5 posts per page. Visible breadcrumbs were deferred because the site's flat hierarchy (Home → Post) makes them redundant — the BreadcrumbList structured data from 008 SEO Foundation still serves search engines.

## Cross-Feature Patterns

### Recurring issues

- None. Only one feature was implemented.

### Common decisions

- **Deferral with documented rationale:** 030 was deferred with a one-line explanation in the roadmap and a changelog entry, following the convention established in the Page Builds retro. The deferral trigger is documented ("reconsider if site structure deepens").

### Repeated blockers

- None.

## Workflow Effectiveness

### What worked

- **Full spec was correct for 029.** The plugin evaluation (v1 vs v2) had genuine research value — v2 had compatibility concerns on Jekyll 4.2+ and conflicts with jekyll-archives that wouldn't have been caught without structured research.
- **Bootstrap's existing pagination import eliminated CSS work.** The `bootstrap/scss/pagination` partial was already imported in `main.scss` (from an earlier feature). The project SCSS partial needed only 4 lines for spacing. This validates the selective-import approach — components are available when needed without importing the full Bootstrap bundle.
- **Single-session completion for a full spec.** Research, implementation, testing (including both SME audits and user testing with draft posts), and acceptance all completed in one session. The feature was well-scoped and had no surprises.
- **Deferring 030 early was the right call.** Evaluating and deferring 030 before starting 029 avoided wasted research time on a feature that didn't fit the site's structure.

### What was too heavy

- Nothing. Full spec for 029 and immediate deferral for 030 were the right tiers.

### What was missing

- Nothing. Clean execution with no gaps.

## Process Improvements for Next Group

1. **Check existing Bootstrap imports before adding new component partials.** The pagination component was already available — this saved work. Future features should audit the import list during Research.
2. **The two lessons from 029's completion notes are minor and project-specific** (Bootstrap import reuse, jekyll-paginate v1's index.html requirement). Neither warrants a general entry in lessons-learned.md.

## Updated Conventions

- No changes needed to `CLAUDE.md`, `docs/code-guidelines.md`, or `docs/lessons-learned.md`.
- The jekyll-paginate configuration pattern (`paginate` + `paginate_path` in `_config.yml`) is documented in the spec for reference if pagination settings need adjustment later.
