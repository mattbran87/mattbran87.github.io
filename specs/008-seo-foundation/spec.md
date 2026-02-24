# Feature: SEO Foundation

> **Spec ID:** 008
> **Status:** Completed
> **Created:** 2026-02-24
> **Completed:** 2026-02-24

## Goal

Implement comprehensive structured data and meta tag strategy to maximize search visibility and enable rich results in Google. Build on the existing jekyll-seo-tag plugin with custom schema templates and configuration improvements.

## Background

The site uses jekyll-seo-tag v2.8.0, which generates basic JSON-LD (WebSite, BlogPosting) and Open Graph tags automatically. However, several plugin features are not configured (site.logo, site.social.links, post images), and the plugin cannot generate BreadcrumbList, enhanced BlogPosting properties, or Person schema. Prior research is documented in [`docs/schema-markup-research.md`](../../docs/schema-markup-research.md).

## Requirements

### Plugin configuration
- [ ] Configure `site.logo` in `_config.yml` to enable `publisher` in BlogPosting JSON-LD
- [ ] Configure `site.social.links` in `_config.yml` to enable `sameAs` on homepage
- [ ] Change `author` in `_config.yml` to object format with `name` and `url` fields
- [ ] Add `lang: en` to `_config.yml`
- [ ] Verify twitter card renders correctly (summary_large_image is default when image present)
- [ ] Add `image` front matter to existing blog posts for Article rich results
- [ ] Add default `image` fallback via `_config.yml` `defaults` for posts without explicit image
- [ ] Add `description` front matter to any pages/posts missing it

### Custom structured data
- [ ] Create custom `_includes/schema/` templates for enhanced structured data
- [ ] Add BreadcrumbList schema to post layout and about page (2 levels: Home → Page Title)
- [ ] Add enhanced BlogPosting schema (wordCount, keywords, articleSection, inLanguage, isAccessibleForFree)
- [ ] Add Person schema to the about page

### Sitemap and crawlability
- [ ] Install and configure jekyll-sitemap for XML sitemap generation
- [ ] Add `robots.txt` with sitemap reference
- [ ] Add `sitemap: false` and `seo.robots: noindex, nofollow` to 404 page front matter
- [ ] Verify canonical URLs are correct across all pages

### Image assets
- [ ] Create or provide site logo as SVG at `assets/images/site/logo.svg`
- [ ] Create or provide default OG image as PNG at `assets/images/site/default-og.png` (1200x630px)

## Constraints

- Static site only — no server-side processing
- Must not break existing jekyll-seo-tag output; custom schemas supplement it (see D1)
- WebSite SearchAction deferred until #009 Search is built
- No additional Jekyll plugins beyond jekyll-sitemap
- Site logo must be a real asset, not a placeholder
- Schema data must match visible page content (Google penalizes mismatches)
- Default og:image uses PNG format for social platform compatibility (see D2)

## Acceptance Criteria

### Configuration
- [ ] `site.logo` is set to `/assets/images/site/logo.svg` and the file exists
- [ ] `site.social.links` is populated with GitHub and LinkedIn profile URLs
- [ ] `site.author` is an object with `name` and `url` fields; `author.url` appears in BlogPosting JSON-LD author output
- [ ] `lang: en` is set in `_config.yml`
- [ ] Twitter card renders as `summary_large_image` on posts with images (default behavior, no config needed)
- [ ] `_config.yml` `defaults` section sets fallback `image` for posts

### Front matter
- [ ] All existing blog posts have `image` and `description` in front matter
- [ ] `about.markdown` has a page-specific `description` in front matter
- [ ] `404.html` has `sitemap: false` and `noindex: true` in front matter; robots noindex meta tag renders in output

### Structured data
- [ ] BreadcrumbList JSON-LD is present on all post pages and the about page (2 levels: Home → Page Title)
- [ ] Enhanced BlogPosting JSON-LD includes wordCount, keywords, articleSection, inLanguage, and isAccessibleForFree
- [ ] Person JSON-LD is present on the about page with name, url, sameAs, jobTitle, and description
- [ ] `sameAs` array appears in homepage WebSite JSON-LD output
- [ ] Custom schema blocks supplement (not replace) jekyll-seo-tag's existing JSON-LD
- [ ] All JSON-LD in `_site/` output is syntactically valid JSON and contains expected `@type` and required properties (verified by inspecting generated HTML)
- [ ] Posts without explicit `image` front matter use the default og:image fallback

### Sitemap and crawlability
- [ ] XML sitemap is generated at `/sitemap.xml`
- [ ] `robots.txt` exists at site root with `Sitemap:` directive pointing to `https://aicodeblog.com/sitemap.xml`
- [ ] 404 page does not appear in `/sitemap.xml`
- [ ] Canonical URLs are correct on all pages

### Build and regression
- [ ] `bundle exec jekyll build` completes without errors
- [ ] No regressions to existing page output or styling
- [ ] Logo SVG is under 200KB; default og:image PNG is under 200KB

## Affected Files

- `_config.yml` — logo, social links, author object, lang, defaults, jekyll-sitemap plugin
- `Gemfile` — jekyll-sitemap gem
- `Gemfile.lock` — updated after `bundle install`
- `robots.txt` — new file
- `assets/images/site/logo.svg` — site logo (new)
- `assets/images/site/default-og.png` — default OG image (new)
- `_includes/schema/breadcrumbs.html` — BreadcrumbList JSON-LD (new)
- `_includes/schema/blog-posting.html` — enhanced BlogPosting JSON-LD (new)
- `_includes/schema/person.html` — Person JSON-LD (new)
- `_includes/head.html` — noindex meta tag conditional
- `_layouts/post.html` — include breadcrumbs and blog-posting schema templates
- `_layouts/page.html` — conditional breadcrumbs and Person schema for about page
- `about.markdown` — add `description` front matter
- `404.html` — add `sitemap: false` and `seo.robots` front matter
- `_posts/*.md` — add `image` front matter to all existing posts

## Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Research & Planning | 2026-02-24 | 2026-02-24 | SME consultations complete; spec updated with findings |
| Implementation | 2026-02-24 | 2026-02-24 | 8 commits; found/fixed noindex and twitter config issues |
| Testing | 2026-02-24 | 2026-02-24 | 23/23 acceptance criteria pass; zero issues |
| Acceptance | 2026-02-24 | 2026-02-24 | All 23 acceptance criteria pass; merged to master |

## Completion Notes

**Delivered:** Comprehensive SEO foundation with structured data, meta tags, XML sitemap, and crawlability improvements. All 23 acceptance criteria verified.

**What was built:**
- Plugin configuration: site.logo, social.links, author object with URL, lang, image defaults
- Custom JSON-LD templates: BreadcrumbList (posts + about), enhanced BlogPosting (wordCount, keywords, articleSection, inLanguage, isAccessibleForFree), Person (about page)
- Sitemap: jekyll-sitemap generating 16-URL sitemap.xml
- Crawlability: robots.txt with Sitemap directive, 404 excluded from sitemap with noindex
- Image assets: text-based logo SVG (394 bytes), default OG PNG 1200x630 (19KB)

**Deviations from original spec:**
- `seo.robots` front matter doesn't work in jekyll-seo-tag v2.8.0 — implemented custom `noindex` front matter key with conditional in `_includes/head.html` instead
- `twitter` config block removed (caused broken `@` meta tags) — `summary_large_image` is already the default when image is present, no config needed
- 4 posts discovered (not 3) — `welcome-to-jekyll.markdown` was missed in initial scan

**Lessons learned:**
- Always check jekyll-seo-tag's actual template source for feature support — docs and reality diverge
- The `jsonify` Liquid filter is essential for safe JSON string encoding in templates
- `_config.yml` defaults are the cleanest way to provide fallback front matter values
