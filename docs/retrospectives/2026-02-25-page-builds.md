# Milestone Retrospective: Page Builds

> **Group:** Page Builds (005 Contact Form, 007 Custom Homepage, 014 Custom 404, 015 Uses Page, 016 Resume/CV Page)
> **Completed:** 2026-02-25
> **Review Date:** 2026-02-25

## Summary of Features

| # | Feature | Scope | Duration | Outcome |
|---|---------|-------|----------|---------|
| 005 | Contact Form | `/contact/` page with mailto link, nav update, 2 files | 1 day (full spec, all 4 phases) | Completed |
| 007 | Custom Homepage | Designed landing page with hero, featured posts, about blurb | — | Deferred (no spec created) |
| 014 | Custom 404 | Redesigned 404 with BEM component, SCSS partial, dark mode support, 3 files | 1 day (full spec, all 4 phases) | Completed |
| 015 | Uses Page | `/uses/` stub page with placeholder sections, linked from About, 2 files | Minor change (no spec) | Completed (stub) |
| 016 | Resume/CV Page | `/resume/` page | — | Removed (LinkedIn preferred) |

The Page Builds group covers standalone pages added to the site. Of five planned features, two were fully built (005, 014), one was stubbed for future content (015), one was deferred (007), and one was removed (016). This is the first roadmap group where not all features were implemented — the group closed through a mix of completion, deferral, and deliberate removal.

## Cross-Feature Patterns

### Recurring issues

- None. The completed features (005, 014) were straightforward single-page builds with no shared technical challenges.

### Common decisions

- **`layout: page` as the universal page template:** Both 005 and 014 used the existing `page` layout rather than creating dedicated layouts. 005 needed zero customization. 014 added a BEM content block within `.page__content` and scoped its title centering with `:has()` to avoid modifying the shared layout. The Uses page (015) also uses `layout: page`. This validates `page` as the go-to layout for standalone pages.
- **Minimal markup, no over-engineering:** 005 used plain Markdown with a mailto link — no Bootstrap cards, no custom CSS. 014 used standard text links instead of buttons. Both specs explicitly rejected more elaborate options during Research. The simplest approach was the right one each time.
- **Existing design tokens cover standalone pages:** Neither 005 nor 014 needed new CSS custom properties. The Foundation group's two-layer variable model (SCSS for Bootstrap, custom properties for components) provided everything — colors, spacing, typography, dark mode support.
- **Config-driven navigation:** 005 added the contact page to `header_pages` in `_config.yml`. 015 deliberately stayed out of the navbar. Navigation placement is a simple config decision, not an architectural one.

### Repeated blockers

- None.

## Workflow Effectiveness

### What worked

- **Right-sized workflow per feature:** 005 and 014 used full specs and completed all four phases in a single day each. 015 used the minor change tier (changelog entry only). 016 was a simple removal logged in the changelog. The tier system worked as intended — no feature was over- or under-documented for its scope.
- **005 was the fastest full-spec feature in the project:** Two files, two decisions, two commits, zero issues across all four phases. The established `layout: page` pattern and existing mailto conventions meant research confirmed the approach rather than discovering it.
- **014 benefited from strong SME input:** 3 SMEs produced 13 findings and 5 decisions during Research. The Accessibility SME's guidance on `aria-hidden` for the decorative "404" and using "Page not found" as the `<h1>` were directly adopted. Both Testing audits (A11y and QA) returned zero issues — the research investment paid off in clean implementation.
- **`:has()` selector proved its value:** 014's approach of using `.page:has(.error-page) .page__title` to center the title only on the 404 page avoided modifying the shared `page` layout or adding front matter flags. This pattern is now documented in lessons-learned for future page-specific styling.
- **Deferral and removal decisions were clean:** 007 was deferred without creating a spec directory — no wasted work. 016 was removed with a clear rationale (LinkedIn preferred, avoid data scraping). Both were logged in the changelog and roadmap.

### What was too heavy

- **005 arguably didn't need a full spec.** Two files, no research unknowns, no architectural decisions beyond "plain Markdown" and "nav position." A mini-spec or minor change would have been sufficient. However, the spec completed quickly and the documentation is clean, so the overhead was minimal.

### What was missing

- **No content plan for the Uses page.** 015 was created as a stub with "Coming soon" placeholders. There's no timeline or content plan for filling it in. This is a content task, not a feature task, but it should be tracked somewhere.
- **No formal deferral criteria for 007.** The Custom Homepage was deferred without documenting why or what conditions would trigger picking it back up. Future deferrals should include a brief rationale and re-evaluation trigger.

## Process Improvements for Next Group

1. **Document deferral rationale in the roadmap.** When a feature is deferred, add a one-line note to the roadmap entry explaining why and under what conditions it would be reconsidered.
2. **Use minor change tier for simple pages.** A page with no custom CSS, no JavaScript, and no architectural decisions (like 005) should default to the minor change tier unless there are genuine unknowns to resolve.
3. **Track content stubs separately.** Stub pages like 015 need a content task tracked in the changelog or a content backlog — they shouldn't sit as "Coming soon" indefinitely without a plan.

## Updated Conventions

No new conventions to add to `CLAUDE.md` or `docs/code-guidelines.md`. The `:has()` pattern for page-specific styling is already captured in `docs/lessons-learned.md` from the 014 completion notes.
