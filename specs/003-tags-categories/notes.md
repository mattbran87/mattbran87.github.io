# Notes: Tags & Categories

## Research & Planning

### Findings

- **jekyll-archives v2.3.0** supports Jekyll >= 3.6, < 5.0 — fully compatible with Jekyll 4.4.1
- Works with custom GitHub Actions builds (our setup) — not on the default gh-pages whitelist, but that doesn't apply since we use a custom workflow
- Config key is `jekyll-archives` (hyphen, not underscore)
- Plugin generates per-tag archive pages but does NOT generate a tags index page — that must be hand-built
- Layout receives `page.title` (tag name) and `page.posts` (array of post objects)
- Default permalink is `/tag/:name/` (singular) — must override to `/tags/:name/` (plural)
- If the specified layout file doesn't exist, the plugin silently generates nothing — no error
- Tags in front matter must be arrays, not strings

#### Current Codebase State

- **Templates already render tags** — both `home.html` and `post.html` iterate `post.tags`/`page.tags` and output `<span class="tag">` elements
- **Tag SCSS exists** — `_partials/_tag.scss` defines `.tag` class with design tokens, includes a comment noting conversion to `<a>` links when archives are added
- **Design tokens defined** — `--color-tag-bg`, `--color-tag-text`, `--color-tag-border` in `_variables.scss`
- **Existing post** (`welcome-to-jekyll.markdown`) uses `categories: jekyll update` but no `tags` — needs updating
- **Sidebar** has Archives and Recent Posts sections — could optionally add a Tags section

### Open Questions

- [x] Tags only or both tags and categories? — **Tags only** (decided with user)
- [x] Use plugin or hand-roll? — **Use jekyll-archives plugin** (decided with user)
- [x] Archive page style? — **Follow standards: per-tag pages + tags index** (decided with user)

### References

- [jekyll-archives documentation](https://jekyll.github.io/jekyll-archives/)
- [jekyll-archives configuration](https://jekyll.github.io/jekyll-archives/configuration/)
- [jekyll-archives layouts](https://jekyll.github.io/jekyll-archives/layouts/)
- [GitHub repo](https://github.com/jekyll/jekyll-archives)

---

## Implementation

- Liquid `slugify` filter must be applied to the tag name before appending to the URL path — applying it to the full string (e.g., `/tags/jekyll`) slugifies the slashes too
- `jekyll-archives` generates pages with a `title` attribute, which causes them to appear in the navbar when `header_pages` is not configured — fixed by adding explicit `header_pages` list to `_config.yml`
- QA review caught 7 issues in new code (3 high, 3 medium, 1 low) — all fixed before moving to testing

---

## Testing

### Acceptance Criteria Results

| # | Criterion | Result | Notes |
|---|-----------|--------|-------|
| AC1 | jekyll-archives installed and configured | PASS | In Gemfile (`:jekyll_plugins` group) and `_config.yml` (plugin + config block) |
| AC2 | /tags/ page lists all tags with post counts | PASS | Both tags shown with count badges |
| AC3 | Per-tag archive pages at /tags/:tag/ | PASS | `/tags/jekyll/` and `/tags/getting-started/` both exist |
| AC4 | Post detail pages display linked tags | PASS | `<a class="tag">` elements with correct hrefs |
| AC5 | Homepage post list displays linked tags | PASS | Same linked pills as post detail |
| AC6 | Tag styling consistent with theme | PASS | Design tokens, BEM classes, Bootstrap grid |
| AC7 | All tag links navigate correctly | PASS | All 3 target pages exist, links verified across all 5 page types |
| AC8 | Site builds without errors | PASS | Clean build, no warnings |
| AC9 | Tags accessible | PASS | aria-labels, focus-visible, skip-link, semantic HTML |

### Edge Cases Tested

- **Post with no tags:** Tags div does not render (guard works correctly)
- **Nav filtering:** Only About and Tags in navbar — per-tag archives excluded via `header_pages`
- **RSS feed:** Tags correctly appear as `<category>` elements in feed.xml
- **SEO meta:** Description from front matter appears in feed summary

### Issues Found

None — all acceptance criteria pass.

---

## Acceptance

- All 8 requirements verified as complete
- All 9 acceptance criteria pass
- All 5 constraints verified (tags only, plugin used, BEM/Bootstrap, WCAG AA, URLs unchanged)
- No categories in config or post front matter
- Post URL structure unchanged (`/2026/02/22/welcome-to-jekyll.html`)
- RSS feed correctly includes tags as `<category>` elements
