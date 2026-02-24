# Decisions: SEO Foundation

## Decision Log

### D1: Supplement vs. replace jekyll-seo-tag JSON-LD

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** The spec requires enhanced BlogPosting properties (wordCount, keywords, etc.) that jekyll-seo-tag cannot generate. Two approaches: replace the plugin's JSON-LD entirely with custom templates, or supplement it with additional JSON-LD blocks.
- **Options Considered:**
  1. Replace — Build complete BlogPosting JSON-LD in custom templates, disable plugin's JSON-LD output. Full control, but must maintain all core properties manually and keep pace with plugin updates.
  2. Supplement — Keep jekyll-seo-tag's output and add a second `<script type="application/ld+json">` block with only the additional properties. Google supports multiple JSON-LD blocks per page and merges them.
- **Decision:** Supplement with a second JSON-LD block
- **Rationale:** Lower maintenance burden. The plugin auto-generates core properties (headline, author, datePublished, dateModified, url, mainEntityOfPage, description, image, publisher). Custom templates add only what the plugin cannot (wordCount, keywords, articleSection, inLanguage, isAccessibleForFree). No duplication of properties between the two blocks. If the plugin updates, the baseline improves automatically.

---

### D2: Image formats for logo and default OG image

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Code guidelines specify SVG for logos and WebP for photos/content images. The SEO SME recommended PNG for the default OG image due to inconsistent WebP support on social platforms (LinkedIn, some Twitter/X cards). Need to reconcile.
- **Options Considered:**
  1. SVG logo + WebP og:image — follows code guidelines strictly, but social platform previews may break
  2. SVG logo + PNG og:image — logo follows guidelines; og:image uses PNG as a justified exception for compatibility
  3. PNG for both — safe but unnecessary for the logo (SVG is better for logos)
- **Decision:** SVG for logo (`assets/images/site/logo.svg`), PNG for default og:image (`assets/images/site/default-og.png`)
- **Rationale:** The logo is consumed only by jekyll-seo-tag for JSON-LD (a URL string, not rendered as `<img>`), so SVG's scalability is ideal and format compatibility doesn't matter. The og:image is consumed by social platforms that render it visually in card previews — PNG ensures maximum compatibility. This is a documented exception to the WebP preference in code guidelines, justified by the SEO SME's finding that social platforms still have inconsistent WebP support.

---

### D3: BreadcrumbList depth — 2 levels vs. 3 levels

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** BreadcrumbList schema can represent different levels of site hierarchy. The site's URL structure is flat (`/YYYY/MM/DD/post-title.html`) with no intermediate category paths.
- **Options Considered:**
  1. 2 levels (Home → Post Title) — matches the actual URL structure and site hierarchy
  2. 3 levels (Home → Tag → Post Title) — adds a tag as an intermediate level, richer breadcrumb display
- **Decision:** 2 levels (Home → Post Title)
- **Rationale:** Google can penalize schema that doesn't match the real URL structure. Posts don't live under tag paths — tag archive pages are aggregation pages, not hierarchical parents. A 2-level breadcrumb accurately represents the flat site hierarchy. Can revisit if category-based URL paths are introduced later.

---

### D4: Author config format in _config.yml

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** The current `author` config is a simple string (`"Matthew Brandenburg"`). The SEO SME recommended changing to an object format so jekyll-seo-tag emits `author.url` in BlogPosting JSON-LD, linking post authorship to the about page for E-E-A-T.
- **Options Considered:**
  1. Keep as string — no change, author URL only appears in Person schema on about page
  2. Change to object (`name` + `url`) — jekyll-seo-tag emits author URL in every BlogPosting, connecting posts to the author's about page
- **Decision:** Change to object format
- **Rationale:** Strengthens the E-E-A-T signal by linking every post's author to a central Person entity on the about page. Low effort (config change only), high SEO value. jekyll-seo-tag v2.8.0 supports this format natively.

---

### D5: BreadcrumbList page scope

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** The original spec said "post and page layouts" but didn't specify which pages get breadcrumbs. The site has multiple page types: posts, about, tags index, series index, tag archives (generated).
- **Options Considered:**
  1. All pages — breadcrumbs everywhere, including tag/series index pages
  2. Posts and about page only — focus on content pages that benefit from breadcrumb rich results
  3. Posts only — minimal scope
- **Decision:** Posts and about page only
- **Rationale:** Tag and series index pages are navigational — they don't benefit meaningfully from breadcrumb rich results. Posts are the primary content that appears in search results. The about page is the author's E-E-A-T anchor page and benefits from breadcrumb display. This keeps the implementation focused and avoids breadcrumbs on pages where they add no SEO value.

---

### D6: Schema template placement in layouts

- **Date:** 2026-02-24
- **Phase:** Research & Planning
- **Context:** Custom JSON-LD `<script>` blocks need to be included somewhere in the HTML output. Three possible locations: `_includes/head.html`, `_layouts/default.html` (with conditionals), or individual layouts.
- **Options Considered:**
  1. `_includes/head.html` — shared include, would need conditionals per page type
  2. `_layouts/default.html` — base layout, same conditional problem
  3. Individual layouts (`post.html`, `page.html`) — each layout knows its own context
- **Decision:** Individual layouts
- **Rationale:** Cleanest separation of concerns. `post.html` knows it's a blog post and includes breadcrumbs + enhanced BlogPosting. `page.html` conditionally includes breadcrumbs + Person for the about page. No conditionals in shared templates. JSON-LD script blocks placed at the end of layout content, before the closing tag.
