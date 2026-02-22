# Feature: Personalize Site

> **Spec ID:** 006
> **Status:** Completed
> **Created:** 2026-02-22
> **Completed:** 2026-02-22

## Goal

Replace all placeholder values in `_config.yml`, the about page, and social link templates with real site identity — title, description, author bio, and social links — so the site presents as a real blog rather than a Jekyll default.

## Background

The site has a working Bootstrap 5 custom theme (specs 001 and 002) but still uses placeholder content from Jekyll's scaffolding: "Your awesome title", dummy description, and links to the Jekyll GitHub organization. The about page contains boilerplate text about the Minima theme. The footer and sidebar show GitHub and Twitter links pointing to `jekyll` and `jekyllrb` usernames.

Personalizing the site now (before building content organization, SEO, or additional pages) ensures all subsequent features are developed and tested against real data.

## Requirements

- [ ] Update `_config.yml` `title` to "AI Code Blog"
- [x] Update `_config.yml` `description` to "Documenting AI-assisted coding experiences, tools, and development processes."
- [x] Update `_config.yml` `github_username` to `mattbran87`
- [x] Remove `twitter_username` from `_config.yml`
- [x] Add `linkedin_username: mattbran87` to `_config.yml`
- [x] Add `author` field to `_config.yml` with name "Matthew Brandenburg"
- [x] Rewrite `about.markdown` with real author bio
- [x] Add LinkedIn link support to `_includes/footer.html`
- [x] Add LinkedIn link support to `_includes/sidebar.html`
- [x] Remove Twitter link conditional from `_includes/footer.html`
- [x] Remove Twitter link conditional from `_includes/sidebar.html`
- [x] Keep the default welcome post (will be removed after first real article)

## Constraints

- No structural changes to layouts — this is content and config only (plus minor template edits for social links)
- Do not remove the default welcome post
- LinkedIn URLs use the format `https://www.linkedin.com/in/{username}/`
- All social link changes must maintain existing accessibility patterns (aria-labels, semantic nav)

## Acceptance Criteria

- [x] AC1: Site title displays as "AI Code Blog" in the header and browser tab
- [x] AC2: Site description appears in the footer, sidebar, and HTML meta tags
- [x] AC3: GitHub link in footer and sidebar points to `https://github.com/mattbran87`
- [x] AC4: LinkedIn link appears in footer and sidebar pointing to `https://www.linkedin.com/in/mattbran87/`
- [x] AC5: No Twitter link appears anywhere on the site
- [x] AC6: About page displays the real author bio
- [x] AC7: The default welcome post is still present and renders correctly
- [x] AC8: `jekyll build` completes without errors or warnings
- [x] AC9: All social links have appropriate `aria-label` attributes

## Affected Files

- `_config.yml` — update title, description, usernames; add author and linkedin_username; remove twitter_username
- `about.markdown` — replace placeholder content with real bio
- `_includes/footer.html` — add LinkedIn link, remove Twitter conditional
- `_includes/sidebar.html` — add LinkedIn link, remove Twitter conditional

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-22 | 2026-02-22 | Straightforward scope, all inputs provided by user |
| Implementation | 2026-02-22 | 2026-02-22 | 4 commits, clean build |
| Testing | 2026-02-22 | 2026-02-22 | All 9 AC pass, no issues |
| Acceptance | 2026-02-22 | 2026-02-22 | Complete, merged to master |

## Completion Notes

All 12 requirements met, all 9 acceptance criteria verified. Four files changed across 4 commits:

1. `_config.yml` — title, description, author, github_username, linkedin_username updated; twitter_username removed
2. `about.markdown` — placeholder replaced with real author bio
3. `_includes/footer.html` — Twitter conditional removed, LinkedIn conditional added
4. `_includes/sidebar.html` — Twitter conditional removed, LinkedIn conditional added

No deviations from the spec. The default welcome post was kept as requested. The `twitter:card` and `twitter:title` Open Graph meta tags from jekyll-seo-tag remain — these are standard OG tags, not social profile links.

This completes the Foundation group (001 + 002 + 006). All subsequent features will build on real site identity data.
