# Notes: SEO Foundation

## Research & Planning

### Findings

- Prior research documented in [`docs/schema-markup-research.md`](../../docs/schema-markup-research.md)
- jekyll-seo-tag v2.8.0 already generates basic WebSite and BlogPosting JSON-LD
- Plugin supports `site.logo`, `site.social.links`, and post `image` but none are configured
- Custom `_includes/schema/` templates recommended for BreadcrumbList, enhanced BlogPosting, and Person
- jekyll-sitemap is the standard plugin for XML sitemap generation
- WebSite SearchAction deferred until #009 Search

### SME Consultation Summary

#### Jekyll SME — Architectural Assessment

- **Schema placement:** Include in individual layouts (`post.html`, `page.html`), not in `default.html` or `head.html`. Each layout knows its own context — cleanest separation of concerns.
- **JSON-LD position:** Place `<script type="application/ld+json">` blocks at the end of layout content. Valid anywhere in HTML per Schema.org spec; invisible to users.
- **Logo:** SVG at `assets/images/site/logo.svg` per code guidelines directory structure. jekyll-seo-tag reads `site.logo` and combines with `site.url` for absolute URLs.
- **Default image fallback:** Use `_config.yml` `defaults` with `scope.type: posts` to set a fallback `image` for all posts. Individual posts override with their own `image`.
- **jekyll-sitemap:** No conflicts with jekyll-seo-tag. Both are Jekyll core team plugins designed to coexist. Sitemap respects `exclude` list and `sitemap: false` front matter.
- **Build impact:** Negligible. Three small Liquid includes with variable interpolation add virtually zero build time.
- **`about.markdown`:** Missing `description` front matter — should be added.

#### Accessibility SME — Assessment

- **Verdict: Feature is accessibility-safe.** All changes operate in the machine-readable layer (JSON-LD, meta tags, XML).
- JSON-LD `<script>` tags are invisible to screen readers, not in the accessibility tree, not keyboard-focusable. No WCAG success criteria implicated.
- Logo in structured data is a URL string, not rendered as `<img>` — no alt text needed.
- `og:image` is a `<meta>` tag in `<head>` — not rendered, no screen reader impact.
- `sitemap.xml` is machine-readable, not user-facing content.
- Testing note: Confirm JSON-LD script tags don't accidentally break DOM structure (run Lighthouse a11y audit after implementation).

#### SEO SME — Strategy Review

- **Supplement, don't replace:** Keep jekyll-seo-tag's JSON-LD output and add supplementary JSON-LD blocks. Google supports multiple blocks per page and merges them. See D1.
- **BreadcrumbList:** 2 levels (Home → Post Title). 3-level with tags would misrepresent flat URL structure. See D3.
- **Default og:image:** Use PNG (not WebP) for social platform compatibility. 1200x630px, under 200KB. Content: site name + tagline on brand background. See D2.
- **Person schema:** Full Person on about page (E-E-A-T anchor). Enhanced author URL in every BlogPosting via `author` object config. See D4.
- **Additional config items:**
  - `robots.txt` — allows all crawlers, includes `Sitemap:` directive
  - `twitter.card: summary_large_image` — controls card format when shared, even without a Twitter account
  - `lang: en` — ensures jekyll-seo-tag emits `og:locale`
  - 404 page: `sitemap: false` + `seo.robots: noindex, nofollow`
- **Priority order for incremental shipping:** (1) config quick wins, (2) image + defaults, (3) sitemap + robots.txt, (4) BreadcrumbList, (5) enhanced BlogPosting, (6) Person schema, (7) polish items
- **Future convention:** `last_modified_at` front matter on posts for `dateModified` signals. Not in scope for this feature but adopt going forward.

#### QA SME — Spec Review

- **4 Errors identified and resolved:** Missing requirements from SME findings added to spec; acceptance criteria refined for specificity and local testability; image format conflict documented as D2; JSON-LD validation criterion rewritten to be locally verifiable.
- **3 Warnings identified and resolved:** Affected files list updated; BreadcrumbList page scope clarified as D5; Liquid template convention compliance noted for implementation tasks.
- **2 Info items noted:** Logo and og:image are user-provided assets (implementation dependency); `last_modified_at` is a future convention, not in scope.
- **JSON-LD validation approach for Testing:** (1) Extract JSON-LD from `_site/` HTML and verify valid JSON syntax, (2) verify expected `@type` and properties, (3) spot-check with Google Rich Results Test or Schema Markup Validator, (4) compare before/after for regression on existing JSON-LD.

### Open Questions

All open questions resolved during SME consultations. No blockers remaining.

### References

- [`docs/schema-markup-research.md`](../../docs/schema-markup-research.md) — detailed schema research findings
- [jekyll-seo-tag docs](https://github.com/jekyll/jekyll-seo-tag)
- [jekyll-sitemap docs](https://github.com/jekyll/jekyll-sitemap)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

---

## Implementation

- jekyll-seo-tag v2.8.0 does NOT support `seo.robots` front matter — the template has no robots handling at all. Added a custom `noindex` front matter key with a conditional in `_includes/head.html` instead.
- The `twitter` config block (`twitter.card: summary_large_image`) caused broken meta tags: `twitter:site` rendered as `@` (empty username) and `twitter:creator` rendered as `@Matthew Brandenburg` (not a Twitter handle). Since there's no Twitter account, removed the entire `twitter` config block. The `summary_large_image` card type is already the default in jekyll-seo-tag's template when `seo_tag.image` is present — no config needed.
- Discovered 4 posts (not 3) — `welcome-to-jekyll.markdown` was missed in the initial scan. All 4 already had `description` in front matter. The `_config.yml` defaults provide `image` to all posts automatically, so no individual post front matter changes were needed.
- The `jsonify` Liquid filter is essential for safely encoding strings in JSON-LD (handles quotes, special characters). Used it for `page.title`, `page.tags`, `site.author.name`, `page.description`, etc.

---

## Testing

### Test Results: 23/23 acceptance criteria PASS

**Build:** `bundle exec jekyll build` completes without errors.

**Configuration (6/6):** site.logo, social.links, author object, lang, twitter card (summary_large_image on posts with images), defaults for post image — all verified in config and output.

**Front matter (3/3):** All 4 posts have `description` (explicit) and `image` (via defaults). About page has page-specific `description`. 404 page has `sitemap: false` + `noindex: true`, renders `<meta name="robots" content="noindex, nofollow">`.

**Structured data (7/7):** 17 JSON-LD blocks across 7 pages, all syntactically valid. BreadcrumbList on 4 posts + about (2 levels). Enhanced BlogPosting on 4 posts (wordCount, keywords, articleSection, inLanguage, isAccessibleForFree). Person on about page (name, url, sameAs, jobTitle, description). sameAs on homepage WebSite JSON-LD. Custom blocks supplement jekyll-seo-tag output.

**Sitemap/crawlability (4/4):** sitemap.xml has 16 URLs, 404 excluded. robots.txt has Sitemap directive. All 17 canonical URLs correct.

**Build/regression (3/3):** No regressions. Logo SVG 394 bytes, OG PNG 19,099 bytes (1200x630). All page structures intact.

### Observations
- No issues found during testing. Zero errors, zero warnings.
- The `twitter:card` defaults to `summary` on pages without images and `summary_large_image` on posts (which have image via defaults). This is correct behavior from jekyll-seo-tag.
- The about page gets `WebSite` type JSON-LD from jekyll-seo-tag (not `WebPage`). This is expected — jekyll-seo-tag uses WebSite for pages that aren't posts. The custom Person and BreadcrumbList schemas supplement this.

---

## Acceptance

- Final review completed 2026-02-24. All 23 acceptance criteria pass with zero issues.
- User signed off on Testing results and approved move to Acceptance.
- Feature branch merged to master, branch deleted.
- 8 feature commits + 2 unrelated commits (research docs) included in merge.
