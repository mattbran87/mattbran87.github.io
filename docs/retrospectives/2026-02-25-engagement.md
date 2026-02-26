# Milestone Retrospective: Engagement

> **Group:** Engagement (020 Social Sharing, 021 Comments, 028 Newsletter Subscribe CTA)
> **Completed:** 2026-02-25
> **Review Date:** 2026-02-25

## Summary of Features

| # | Feature | Scope | Duration |
|---|---------|-------|----------|
| 020 | Social Sharing | Share buttons (Twitter/X, LinkedIn, Reddit, Email, Copy Link, Web Share) on post pages + compact on post cards, inline SVG icons, 10 files | 1 session (full spec, all 4 phases) |
| 021 | Comments | Giscus commenting via Bootstrap offcanvas panel, lazy-loaded iframe, dark mode sync, per-post opt-out, 8 files | 1 session (full spec, all 4 phases) |
| 028 | Newsletter Subscribe CTA | Buttondown email subscribe form (sidebar + post footer), RSS link in sidebar, per-post opt-out, 7 files | 1 session (full spec, all 4 phases) |

The Engagement group adds three ways for readers to interact with the blog beyond reading: sharing posts on social media or via direct link, commenting on posts through GitHub Discussions, and subscribing for email notifications about new posts. Together with the existing RSS feed (now discoverable via the sidebar link), readers have a complete set of engagement options.

## Cross-Feature Patterns

### Recurring issues

- **Dark mode contrast failures caught during Testing:** 020 needed share button border/icon adjustments for dark mode, and 028's button had a WCAG AA contrast failure (#ffffff on #4dabf7 ≈ 2.5:1). Both were caught by SME audits before user testing. Dark mode contrast should be verified proactively during Implementation for any new interactive element with custom colors.
- **Bootstrap selective imports require dependency audits:** 021's offcanvas component needed the `close` partial for the dismiss button, which wasn't caught until user testing. When importing a Bootstrap component partial, audit the rendered HTML for classes that depend on other partials.

### Common decisions

- **Per-post opt-out via front matter flags:** All three features support disabling on individual posts (`share: false`, `comments: false`, `newsletter: false`). The pattern is consistent: check the flag in Liquid, pass it as an explicit include parameter in post loops (not via `page` which refers to the list page).
- **No third-party JavaScript:** 020 uses inline SVG icons and the Web Share API (browser-native). 021 lazy-loads Giscus only on user interaction. 028 uses a plain HTML form with no JS at all. The project maintains its zero-dependency JavaScript philosophy for engagement features.
- **BEM naming for all new components:** `.social-share__*`, `.comments-trigger`, `.newsletter-cta__*` — consistent naming across all three features following the established convention.
- **External services with minimal coupling:** Giscus (021) and Buttondown (028) are integrated via standard web APIs (iframe postMessage, HTML form POST) with no vendor SDKs or libraries. Configuration lives in `_config.yml` with a consistent nested structure (`comments.giscus.*`, `newsletter.buttondown.*`).
- **`target="_blank"` for external interactions:** Both 021 (Giscus GitHub link) and 028 (form submission) open external pages in new tabs so readers stay on the blog.

### Repeated blockers

- **Dev server restart after `_config.yml` changes:** Both 021 and 028 added config blocks that required server restarts. In both cases, the CTA/component "disappeared" until the server was restarted. This is a known pitfall already documented in lessons-learned, but it recurred because the config change happened mid-implementation rather than as a first step.

## Workflow Effectiveness

### What worked

- **Full spec for all three features was correct.** Each feature had genuine research questions: 020 needed to evaluate share mechanisms and icon approaches, 021 required choosing a comment provider and integration pattern, 028 involved evaluating 8 notification methods and discovering pricing tier limitations. All three benefited from structured Research & Planning.
- **Interactive research for 028 was fast and effective.** Rather than documenting all research findings before discussion, the provider evaluation was conducted conversationally with the user. This sped up the decision (Buttondown selected quickly) and surfaced the RSS-to-email pricing issue early.
- **Decision documentation prevented mid-implementation churn.** 020 had 13 decisions, 021 had 10 decisions, 028 had 5 decisions — all settled during Research & Planning. Zero scope changes during Implementation across all three features.
- **SME audits consistently caught real issues before user testing.** A11y SME found contrast issues in 020 and 028; QA SME confirmed convention compliance in all three. The two-stage Testing approach (SME audit → user testing) is well-validated.
- **Include parameter passing lesson from 020 applied cleanly in 021 and 028.** The `page` vs post variable lesson (pass front matter flags explicitly as include parameters) was learned in 020 and correctly applied in both subsequent features without repeating the mistake.

### What was too heavy

- Nothing. Three full specs over three sessions was appropriate for the complexity of each feature.

### What was missing

- **No proactive dark mode contrast check during Implementation.** Both 020 and 028 had dark mode contrast issues found during Testing. A quick contrast check on custom-colored interactive elements should happen during Implementation, before the Testing phase.

## Process Improvements for Next Group

1. **Check dark mode contrast during Implementation for custom-colored elements.** When adding buttons, links, or icons with colors that differ from the theme defaults, verify WCAG AA contrast ratios in both light and dark mode before committing. Don't wait for the A11y SME audit.
2. **Add `_config.yml` changes as the first implementation task.** When a feature requires new config blocks, add them first and restart the dev server before building components that depend on the config. This avoids the "it disappeared" debugging cycle.
3. **Continue the interactive research pattern for provider evaluations.** The conversational approach used in 028 (evaluating options with the user in real-time) was faster and more collaborative than the document-first approach. Use it when the research involves comparing external services.

## Updated Conventions

- **Lesson added to `docs/lessons-learned.md`:** "Verify feature availability per pricing tier" under Roadmap section. (Source: spec 028)
- **Lesson added to `docs/lessons-learned.md`:** "Audit Bootstrap component HTML for cross-partial CSS dependencies" under Sass/CSS section. (Source: spec 021)
- **Lesson added to `docs/lessons-learned.md`:** "Do a visual review with the user before committing styling" under Visual Design section. (Source: spec 020)
- The per-post front matter opt-out pattern (`feature: false` → passed as include parameter) is now established across three features and is a firm convention for any future per-post toggles.
- The `_config.yml` nested structure for external services (`service_category.provider_name.setting`) is established across comments and newsletter configs.
