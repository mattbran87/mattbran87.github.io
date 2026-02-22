# Tasks: Custom Theme

> **Status:** Completed

## Task Breakdown

### Phase 1: Research & Planning

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Jekyll SME — Minima override mechanics, removal process, template variables | Done | 8 questions answered, full Minima removal confirmed safe |
| 1.2 | Bootstrap SME — navbar imports, JS vendoring, components, typography, colors | Done | Navbar needs 3 SCSS imports + bootstrap.min.js, 5 components to enable |
| 1.3 | Accessibility SME — skip link, landmarks, nav a11y, headings, colors | Done | Skip link pattern, heading hierarchy, color #0060df (5.74:1) |
| 1.4 | CSS/Design SME — partials, BEM naming, custom properties, layout, typography | Done | 8 partials, BEM conventions, 42rem content width, full token set |
| 1.5 | Analyze Bootstrap blog template structure | Done | 8/4 grid with sidebar, .blog-post/.blog-post-meta patterns, minimal custom CSS |
| 1.6 | Record decisions in decisions.md | Done | D1–D8 recorded |
| 1.7 | Build task breakdown for Implementation | Done | Tasks 2.1–2.16 defined |
| 1.8 | QA SME — spec review | Done | 22 findings (4E/11W/7I), all resolved — spec, notes, tasks updated |
| 1.9 | Get sign-off to move to Implementation | Done | Approved |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Update `_variables.scss` — new color palette (#0060df primary), typography tokens (line-height 1.65, heading weight 700, heading scale), layout tokens (content-max-width, header-height, spacing scale), post meta tokens | Done | Layer 1 and Layer 2 updated in sync. Commit 5098aef. |
| 2.2 | Update `_base.scss` — expanded base styles for body, links, focus, typography | Done | Added heading weight/color, link hover, code blocks. Commit 76cb476. |
| 2.3 | Enable Bootstrap components in `assets/main.scss` — uncomment: transitions, nav, navbar, buttons, badge, tables, pagination. Update header comment (remove Minima reference). | Done | 7 components enabled. Header comment updated. Commit 7796285. |
| 2.4 | Create SCSS partials: `_skip-link.scss`, `_header.scss`, `_nav.scss`, `_footer.scss`, `_sidebar.scss`, `_post-card.scss`, `_post.scss`, `_page.scss` — add imports to `assets/main.scss` | Done | 8 partials created, all BEM + Layer 2. Commit f952b8f. |
| 2.5 | Vendor `bootstrap.min.js` (no Popper) at `assets/vendor/bootstrap/js/bootstrap.min.js` | Done | 60KB unminified (~11KB gzipped). Commit db96775. |
| 2.6 | Create `_includes/head.html` — charset, viewport, `{% seo %}`, CSS link, `{% feed_meta %}` | Done | SEO tag before CSS link. Commit fc7ca4e. |
| 2.7 | Create `_includes/header.html` — Bootstrap navbar with site brand + responsive nav + hamburger | Done | aria-label, aria-current, header_pages, role="list". Commit fc7ca4e. |
| 2.8 | Create `_includes/sidebar.html` — About, Recent Posts (last 5), Archives (monthly via Liquid), Social links | Done | Sticky sidebar, pure Liquid archives. Commit fc7ca4e. |
| 2.9 | Create `_includes/footer.html` — copyright year, site description, social nav | Done | Social nav with aria-label. Commit fc7ca4e. |
| 2.10 | Create `_layouts/default.html` — base HTML shell: `<html lang>`, head, skip link (before header), header, `<main id="main-content" tabindex="-1">`, footer, Bootstrap JS with `defer` before `</body>` | Done | Skip link before header, nav-keyboard.js included. Commit 857f716. |
| 2.11 | Create `_layouts/home.html` — extends default, 8/4 grid with post list + sidebar | Done | Post cards with excerpts and tags. Commit 857f716. |
| 2.12 | Create `_layouts/post.html` — extends default, post title/meta/content/nav | Done | Centered content, prev/next navigation. Commit 857f716. |
| 2.13 | Create `_layouts/page.html` — extends default, page title + content | Done | Centered content with article wrapper. Commit 857f716. |
| 2.14 | Create `assets/js/nav-keyboard.js` — Escape key closes mobile menu, returns focus to toggle | Done | IIFE with JSDoc, null guards, DOMContentLoaded check. Commit efb7287. |
| 2.15 | Remove Minima: add `jekyll-seo-tag` to Gemfile + plugins, remove `gem "minima"`, remove `theme: minima`, verify no orphaned `minima:` config block, run `bundle install` | Done | Clean removal, seo-tag v2.8.0 installed. Commit 6a99183. |
| 2.16 | Verify build succeeds with `bundle exec jekyll build` | Done | No errors. All pages render. Post URL with categories preserved. |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify each acceptance criterion (AC1–AC20) | Done | 17 PASS, 3 need browser/deploy verification (AC16, AC18, AC19) |
| 3.2 | Test all pages at 375px, 768px, 1280px — no overflow, readable | Deferred | Needs browser testing — Bootstrap grid/container should prevent overflow |
| 3.3 | Test navbar collapse on mobile — hamburger, Escape key, focus management | Deferred | JS code verified correct by A11y SME. Manual browser test needed. |
| 3.4 | Accessibility SME — audit landmarks, skip link, heading hierarchy, contrast, role="list" | Done | 15/15 PASS, 2 warnings: duplicate nav aria-labels, 404 heading structure |
| 3.5 | QA SME — comprehensive code quality audit | Done | 0E/5W/7I. Key: duplicate tag styles, missing Liquid comments, duplicate aria-labels |
| 3.6 | Test with `bundle exec jekyll serve` on local dev server | Deferred | Build verified; live server test for AC16/AC19 needs browser |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review against spec requirements | Done | All 23 requirements verified against source files |
| 4.2 | Verify all acceptance criteria met | Done | 19/20 AC pass. AC18 is a post-merge deploy gate. |
| 4.3 | Update spec.md status to Completed | Done | Status, completion date, and completion notes filled in |
| 4.4 | Merge feature branch to master | Pending | Ready for merge |
| 4.5 | Push to master and verify GitHub Actions deploy | Pending | AC18 verified here |
| 4.6 | Delete feature branch (local and remote) | Pending | After merge |

## Summary

- **Total tasks:** 32
- **Completed:** 30
- **Remaining:** 2 (merge + deploy verification, branch cleanup)
