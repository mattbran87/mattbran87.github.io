# Notes: Related Posts

## Research & Planning

### Findings

#### Jekyll SME Assessment

1. **`site.related_posts` is useless.** Default behavior returns 10 most recent posts with no relatedness calculation. LSI option requires `classifier-reborn` gem and is slow. Confirmed: do not use.

2. **Pure Liquid string-scoring is the standard pattern.** For each candidate post, count shared tags, build a sortable string (`"03|/post-url/"`), split/sort/reverse, take first 3, then look up post objects by URL. This is the established Jekyll community approach.

3. **Lexicographic sort gotcha.** Liquid's `sort` is string-based — `"9"` sorts after `"10"`. Mitigation: pad scores with leading zeros (2-digit format). With typical tag counts (3-5 per post), scores never exceed 2 digits.

4. **Tiebreaker is automatic.** `site.posts` iterates most-recent-first. Liquid's `sort` is stable in Jekyll 4.x (Ruby's `sort_by`). So when two posts share the same tag count, the most recent one appears first without extra encoding.

5. **Build performance is a non-issue.** O(N² × T) total build cost. At 100 posts with 3 tags each = 30,000 comparisons — negligible. Practical ceiling before noticeable slowdown: 500-1,000 posts.

6. **Placement: outside `<article>`, inside `.container`.** Related posts are supplementary navigation, not part of the article content. Place after `</article>` but before closing `</div class="container">` and before schema includes.

7. **Excerpt handling: `strip_html | truncatewords: 20`.** Raw `post.excerpt` can contain HTML that creates nested link issues. Strip to plain text and truncate for compact card format. Add nil guard: `post.excerpt | default: "" | strip_html | truncatewords: 20`.

8. **No draft post issues.** `site.posts` excludes drafts unless `--drafts` flag is used. No special handling needed.

9. **Nil tag guard required.** If `tags:` is absent from front matter and no default is set, `page.tags` could be nil. Guard with `{% if page.tags and page.tags.size > 0 %}`.

10. **Include should be self-contained.** Read `page.tags` and `site.posts` directly rather than requiring parameters. Matches the `series-toc.html` pattern.

#### Accessibility SME Assessment

1. **Use `<aside>` with `aria-labelledby`.** Related posts are complementary content — the exact semantic purpose of `<aside>`. Not `<nav>` (reserved for major navigation blocks — already 2 on the page). Not `<section>` (less precise).

2. **Heading level: `<h2>`.** Section is outside `<article>`, so it's a sibling at the page level. `<h2>` is the correct level in the document outline.

3. **Use `<ul>` with `role="list"`.** Matches the Safari VoiceOver fix pattern already established on the site. Unordered, not ordered — the ranking distinction is not meaningful semantic information.

4. **Link only the title.** Do not make the entire card clickable. Linked title provides clear, descriptive link target. No `aria-label` needed — visible text is already descriptive (WCAG 2.5.3 Label in Name).

5. **Empty state: render nothing.** No "No related posts" message. Empty `<aside>` would pollute the landmark map. Matches the existing prev/next nav pattern (conditionally rendered).

6. **Use `<time datetime="...">` for dates.** Matches existing pattern throughout the site.

7. **No new a11y infrastructure needed.** Focus styles, contrast, and reflow all carry over from existing design tokens.

#### CSS/Design SME Assessment

1. **BEM block: `.related-posts` (standalone).** Not `.post__related` — component lives outside `<article class="post">` and must be reusable. Same pattern as `.post-card`.

2. **Stacked vertical layout.** Not side-by-side columns. At 42rem max-width, 3 columns would be too narrow. Matches homepage post list and sidebar patterns. No breakpoint logic needed.

3. **Visual separation: `border-top` with spacing.** Matches `.post__nav` separator pattern. No background color change — keeps it feeling like organic content rather than a callout.

4. **Typography scale:**
   - Section heading: `1.25rem` (h3 scale — visually subordinate despite being `<h2>`)
   - Item title: `1.125rem` (h4 scale)
   - Date: `var(--meta-font-size)` (0.875rem)
   - Excerpt: `var(--font-size-sm)` (0.875rem), `var(--color-muted)`

5. **New BEM block, shared design tokens.** Do not reuse `.post-card` classes. Different scale, no tags, truncated excerpts. Visual consistency via shared custom properties, not shared CSS classes.

6. **Item separation:** `border-bottom` with `:last-child` removal. Spacing: `--spacing-lg` (1.5rem) — more compact than homepage post cards (`--spacing-xxl`).

7. **`max-width: var(--content-max-width)` + `margin: auto`.** Matches `.post` centering so the section aligns with the article above.

#### QA SME Assessment

1. **W1: Tiebreaker behavior unspecified in AC2.** Need to document that recency is the tiebreaker when tag counts are equal. (Resolved: natural `site.posts` order + stable sort provides this automatically.)

2. **I1: Excerpt format should be documented.** Plain text, truncated to ~20 words.

3. **I2: Liquid comment compliance.** Nested loops and multiple conditionals require comments on every `{% if %}`, `{% for %}`, `{% unless %}` block per code guidelines. Budget for this.

4. **I3: Whitespace control.** Use `{%- -%}` trim-mode tags consistently, matching `post.html`.

5. **I4: `| escape` on post titles.** Project convention — apply to all rendered post titles in the include.

6. **Quality risk: most complex Liquid template in the project.** Nested loops, string manipulation, split/sort. Self-review before Testing is critical.

7. **Edge case risk with only 4 posts.** May need a temporary test post to verify AC6 (no tags). The AI series posts share `ai, tools` — good for testing overlap scoring.

### Open Questions

All resolved during SME consultations. No remaining open questions.

### References

- Jekyll `site.related_posts` docs: returns 10 most recent by default, LSI requires classifier-reborn
- Liquid `sort` filter: lexicographic (string-based), stable in Jekyll 4.x
- WCAG 2.2 success criteria referenced: 1.3.1 (Info and Relationships), 2.4.4 (Link Purpose), 2.4.6 (Headings and Labels), 2.5.3 (Label in Name), 1.4.3 (Contrast)
- Existing site patterns: `post-tags.html`, `series-toc.html`, `post-card` SCSS, `post__nav` SCSS
