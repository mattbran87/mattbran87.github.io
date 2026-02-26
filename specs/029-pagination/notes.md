# Notes: Pagination

## SME Finding Tracker

All SME findings across every phase, with disposition. Add rows as findings come in.

| # | Phase | SME | Finding | Recommendation | Disposition |
|---|-------|-----|---------|----------------|-------------|
| S1 | Testing | A11y | Nav landmark with unique aria-label, disabled states not focusable, focus indicators visible, page indicator accessible | Pass — no violations | N/A |
| S2 | Testing | A11y | Chevron entities (« ») read aloud by screen readers as verbose character names | Wrap in `aria-hidden="true"` spans | Fixed in f15b187 |
| S3 | Testing | QA | All conventions pass — BEM, indentation, Liquid comments, SCSS tokens, file naming | No issues found | N/A |

**Disposition values:** Adopted → D# (decision), Adopted → Task #, Deferred, Overridden by D#, Fixed in [commit], N/A

---

## Research & Planning

### Findings

#### Plugin Comparison

Two viable Jekyll pagination plugins were evaluated:

**jekyll-paginate (v1) — v1.1.0 (Oct 2014)**
- Built-in Jekyll pagination plugin, gemspec allows Jekyll `>= 2.0, < 5.0` (compatible with 4.4.1)
- Homepage-only: paginates a single `index.html` file
- Simple config: 2 lines in `_config.yml` (`paginate: 5`, `paginate_path: "/page:num/"`)
- `paginator` object provides: `posts`, `page`, `per_page`, `total_posts`, `total_pages`, `previous_page`, `previous_page_path`, `next_page`, `next_page_path`
- No active development, but code is frozen and stable across Jekyll 2–4
- No conflicts with `jekyll-archives`
- **Requires `index.html`** — will not work with `index.markdown`

**jekyll-paginate-v2 — v3.0.0 (Feb 2020)**
- Third-party plugin, runtime dependency `>= 3.0, < 5.0`
- Multi-page pagination, filtering, autopages for tags/categories
- More complex config: block in `_config.yml` + front matter on each paginated page
- AutoPages feature overlaps with `jekyll-archives` if enabled (must disable to avoid duplicates)
- Some reports of empty `paginator.posts` on Jekyll 4.2+
- No active maintenance (open issues unanswered since 2023)
- Works with `index.md` (no rename required)

#### Key Consideration: index.html Rename

`jekyll-paginate` requires the paginated page to be `index.html`, not `index.markdown`. The current `index.markdown` contains only front matter (`layout: home`) with no Markdown body content, so renaming to `index.html` is trivial and has zero functional impact.

#### Paginator Object Properties

Available in `index.html` when pagination is active:

| Property | Description |
|---|---|
| `paginator.posts` | Array of posts for the current page |
| `paginator.page` | Current page number |
| `paginator.per_page` | Number of posts per page |
| `paginator.total_posts` | Total number of posts |
| `paginator.total_pages` | Total number of pages |
| `paginator.previous_page` | Previous page number (nil if on first) |
| `paginator.previous_page_path` | Path to previous page |
| `paginator.next_page` | Next page number (nil if on last) |
| `paginator.next_page_path` | Path to next page |

#### Page 1 Edge Case

Jekyll does not generate a `/page1/` directory. The first page is always `/index.html` at the root. Navigation logic must handle this — `paginator.previous_page_path` returns nil on page 1.

### Lessons Learned Review

Relevant entries from `docs/lessons-learned.md`:
- "Restart the dev server after `_config.yml` changes" — pagination config goes in `_config.yml`, so server restart is required
- "Verify CI build passes on the feature branch before merging" — new plugin could affect CI
- "Selective Bootstrap imports scale well" — pagination styling should use existing Bootstrap utilities where possible

### Open Questions

- [x] Which plugin to use? → D1: jekyll-paginate v1
- [x] How many posts per page? → D2: 5 (user-specified)
- [x] Which pages to paginate? → D3: Homepage only

### References

- [Jekyll Pagination Documentation](https://jekyllrb.com/docs/pagination/)
- [jekyll-paginate GitHub](https://github.com/jekyll/jekyll-paginate)
- [jekyll-paginate-v2 GitHub](https://github.com/sverrirs/jekyll-paginate-v2)

---

## Implementation

- [Notes captured during implementation — gotchas, surprises, workarounds]

---

## Testing

### Stage 1: Claude Verification & SME Audits

#### Accessibility SME — Testing Audit
- **Finding:** Nav landmark, disabled states, focus indicators, and page indicator all pass. Chevron entities (« ») read aloud verbosely by screen readers.
- **Recommendation:** Wrap chevrons in `aria-hidden="true"` spans. Fixed in commit f15b187.

#### QA SME — Testing Audit
- **Finding:** All conventions pass — BEM naming, 4-space indentation, Liquid comments, CSS custom properties, file naming/location, SCSS header, Gemfile version pin, config structure, build output.
- **Recommendation:** No action needed. Two informational notes (file-level Liquid comment coverage, import placement) — both acceptable.

### Stage 2: User Testing

- [User testing observations, pass/fail results]

### Issues Found

- [Issues documented with steps to reproduce, severity, and fix status]

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
