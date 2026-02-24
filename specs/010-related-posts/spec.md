# Feature: Related Posts

> **Spec ID:** 010
> **Status:** Completed
> **Created:** 2026-02-24
> **Completed:** 2026-02-24

## Goal

Display related content at the bottom of each blog post so readers can discover more articles on similar topics. Determine relatedness by shared tags, and show up to 3 related posts with title, date, and excerpt.

## Background

The site has a working tag taxonomy (spec 003) and series support (spec 004). Readers currently navigate between posts via previous/next links (chronological) or by browsing tag archive pages. Related posts would surface contextually relevant content directly on the post page, improving discoverability and keeping readers engaged longer.

Jekyll has a built-in `site.related_posts` variable, but by default it returns the 10 most recent posts (not actually related). The LSI (latent semantic indexing) option exists but requires the `classifier-reborn` gem and is slow. A tag-based approach is simpler, faster, and aligns with the existing taxonomy system.

## Requirements

- [x]Display a "Related Posts" section at the bottom of each blog post
- [x]Determine relatedness by counting shared tags between posts
- [x]Show up to 3 related posts (or fewer if not enough matches exist)
- [x]Each related post displays: linked title, date, and excerpt
- [x]Exclude the current post from related results
- [x]Handle edge cases: posts with no tags, posts with no matches, only 1-2 matches
- [x]Style consistently with the existing theme using Bootstrap components
- [x]Create a reusable Liquid include for the related posts component
- [x]Follow BEM naming conventions for CSS classes
- [x]Full keyboard accessibility and semantic HTML
- [x]Do not degrade build performance significantly

## Constraints

- Pure Liquid implementation — no plugins, no Ruby, no external services
- Tag-based relatedness only (no content analysis, no LSI)
- Must work with Jekyll's build pipeline (computed at build time)
- Follow existing code conventions (BEM CSS, CSS custom properties, semantic HTML, Liquid comments)
- Must be accessible (WCAG 2.2 AA)
- Reusable include — the component should be embeddable in any layout

## Acceptance Criteria

- [x]AC1: Related posts section appears below post content on post pages
- [x]AC2: Related posts are determined by shared tag count (most shared tags = most related)
- [x]AC3: Up to 3 related posts are displayed
- [x]AC4: Each related post shows a linked title, date, and excerpt
- [x]AC5: Current post is never shown in its own related posts
- [x]AC6: Posts with no tags show no related posts section (or graceful empty state)
- [x]AC7: Posts with fewer than 3 matches show only the available matches
- [x]AC8: Component is a reusable `_includes/related-posts.html`
- [x]AC9: Styles follow BEM conventions and use CSS custom properties
- [x]AC10: Section is fully keyboard accessible with semantic HTML
- [x]AC11: `bundle exec jekyll build` completes without errors
- [x]AC12: Styles are consistent with the existing theme

## Affected Files

- `_includes/related-posts.html` — new; reusable related posts component
- `_layouts/post.html` — modified; include related posts section
- `assets/css/_partials/_related-posts.scss` — new; component styles
- `assets/main.scss` — modified; import related posts partial

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-24 | 2026-02-24 | 4 SMEs consulted, 8 decisions documented, 4 implementation tasks defined |
| Implementation | 2026-02-24 | 2026-02-24 | 3 commits, 4 tasks done, D8 tiebreaker updated |
| Testing | 2026-02-24 | 2026-02-24 | All 12 AC pass, A11y audit 0 issues, QA audit 0 issues, user testing 9/9 pass |
| Acceptance | 2026-02-24 | 2026-02-24 | All requirements and acceptance criteria met |

## Completion Notes

Feature delivered as specified with one minor deviation.

**Delivered:** Pure Liquid related posts component that scores all posts by shared tag count, sorts descending, and renders the top 3 as compact cards in an `<aside>` landmark. Fully accessible (WCAG 2.2 AA), styled with existing design tokens, and reusable across layouts.

**Deviations from original spec:**
- D8 tiebreaker: originally planned as recency-based, but the string-scoring approach naturally produces reverse-alphabetical-by-URL tiebreaking for equally-scored posts. The primary sort by tag count is correct. Accepted as-is — encoding dates in the sort key would add complexity for negligible user benefit.

**Lessons learned:**
- Liquid's `sort` operates on the full string, not a key prefix. When building composite sort keys (score + URL), the non-key portion affects ordering of equal-keyed items. For true key-based sorting, the date would need to be encoded in the sort string.
- The string-scoring pattern (collect → split → sort → reverse → lookup) is verbose but reliable. It's the most complex Liquid template in the project — thorough comments on every control flow block were essential for readability.
- With only 4 posts, edge cases are naturally exercised (1, 2, and 3 related posts all appear). No test fixtures were needed.
