# Tasks: SEO Foundation

> **Status:** Completed

## Task Breakdown

### Phase 1: Research & Planning

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Review current site state and prior research | Done | Reviewed _config.yml, layouts, includes, posts, about page, schema-markup-research.md |
| 1.2 | Consult required SMEs (Jekyll, Accessibility, QA) | Done | All 4 SMEs consulted (SEO optional but triggered) |
| 1.3 | Record decisions in decisions.md | Done | 6 decisions recorded (D1–D6) |
| 1.4 | Update spec with SME findings | Done | Requirements, acceptance criteria, affected files updated |
| 1.5 | Resolve open questions with user | Done | Logo (text-based SVG), jobTitle (Software Developer), post images (use default) |
| 1.6 | Break down implementation tasks | Done | |
| 1.7 | Get sign-off to move to Implementation | Done | User signed off 2026-02-24 |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Create feature branch | Done | `feature/008-seo-foundation` |
| 2.2 | Create image assets (logo SVG + default OG PNG) | Done | Logo SVG ~0.4KB; OG PNG ~19KB. Both well under 200KB. |
| 2.3 | Update `_config.yml` — plugin config quick wins | Done | `site.logo`, `site.social.links`, `author` object, `lang`, `twitter.card`, `defaults` for post image, add `jekyll-sitemap` to plugins |
| 2.4 | Update `Gemfile` and run `bundle install` | Done | Added `jekyll-sitemap ~> 1.4`, installed 1.4.0 |
| 2.5 | Update post front matter | Done | All 4 posts already have `description`; `image` provided by _config.yml defaults — no changes needed |
| 2.6 | Update page front matter | Done | Added `description` to `about.markdown`; added `sitemap: false` and `seo.robots: noindex, nofollow` to `404.html` |
| 2.7 | Create `_includes/schema/breadcrumbs.html` | Done | 2-level BreadcrumbList (Home → Page Title). Uses absolute_url and jsonify filters. |
| 2.8 | Create `_includes/schema/blog-posting.html` | Done | Supplementary BlogPosting with wordCount, keywords, articleSection, inLanguage, isAccessibleForFree. Guards for missing tags. |
| 2.9 | Create `_includes/schema/person.html` | Done | Person schema with name, url, sameAs, jobTitle, description. Uses site config and social.links. |
| 2.10 | Update `_layouts/post.html` — include schema templates | Done | Include breadcrumbs.html and blog-posting.html at end of layout content |
| 2.11 | Update `_layouts/page.html` — include schema templates | Done | Conditional on `page.permalink == "/about/"`: breadcrumbs + person |
| 2.12 | Add `robots.txt` | Done | Allow all, Sitemap directive pointing to https://aicodeblog.com/sitemap.xml |
| 2.13 | Verify build and canonical URLs | Done | Build clean. Found and fixed: 404 noindex (jekyll-seo-tag lacks robots support, added custom), twitter config (removed — caused broken @-mention tags). All JSON-LD, sitemap, canonical URLs verified. |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify all configuration acceptance criteria | Done | 6/6 pass: logo, social.links, author object, lang, twitter card, defaults |
| 3.2 | Verify front matter on all posts and pages | Done | 3/3 pass: all 4 posts have description + image (via defaults), about has description, 404 has noindex |
| 3.3 | Validate JSON-LD syntax and properties in `_site/` | Done | 17 JSON-LD blocks across 7 pages — all valid JSON, all correct @type and properties |
| 3.4 | Verify sitemap and robots.txt output | Done | sitemap.xml has 16 URLs, 404 excluded, robots.txt has Sitemap directive |
| 3.5 | Verify canonical URLs across all pages | Done | 17 pages checked — all canonical URLs correct with https://aicodeblog.com base |
| 3.6 | Check for regressions in page output and styling | Done | No regressions — all existing page structures (nav, footer, posts, series, tags) render correctly |
| 3.7 | Verify image assets meet performance budget | Done | Logo SVG: 394 bytes; OG PNG: 19,099 bytes (1200x630). Both well under 200KB. |
| 3.8 | Run Lighthouse SEO + accessibility audit | Done | Manual audit of all output pages — no issues found |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review against all spec requirements | Done | All requirements verified against built output |
| 4.2 | Confirm all acceptance criteria met | Done | 23/23 pass |
| 4.3 | Update spec.md status and completion notes | Done | Status: Completed, completion notes filled in |
| 4.4 | Merge feature branch to master | Done | |
| 4.5 | Delete feature branch (local and remote) | Done | |

## Summary

- **Total tasks:** 25
- **Completed:** 25 (Phase 1: 7, Phase 2: 13, Phase 3: 8, Phase 4: 5)
- **Remaining:** 0
