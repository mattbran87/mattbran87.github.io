# Schema Markup — Research Findings

> **Date:** 2026-02-23
> **Related roadmap item:** #008 SEO Foundation

## Current State (jekyll-seo-tag v2.8.0)

The plugin already generates basic JSON-LD automatically:

### Homepage / About Page

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "author": { "@type": "Person", "name": "Matthew Brandenburg" },
  "description": "Documenting AI-assisted coding experiences...",
  "headline": "AI Code Blog",
  "name": "AI Code Blog",
  "url": "https://aicodeblog.com/"
}
```

### Blog Posts

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "author": { "@type": "Person", "name": "Matthew Brandenburg" },
  "dateModified": "2026-02-22T10:42:21-05:00",
  "datePublished": "2026-02-22T10:42:21-05:00",
  "description": "...",
  "headline": "...",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "..." },
  "url": "..."
}
```

### What the Plugin Supports but Is Not Configured

| Feature | Trigger | Current Status |
|---------|---------|----------------|
| `image` in JSON-LD | `image` in post front matter | Not set on any posts |
| `publisher` with logo | `site.logo` in `_config.yml` | Not configured |
| `sameAs` social links | `site.social.links` in `_config.yml` | Not configured |
| Custom `@type` | `seo.type` in post front matter | Not used |

### What the Plugin Cannot Do

- BreadcrumbList schema
- Person schema on the about page
- WebSite SearchAction (sitelinks search box)
- `wordCount`, `keywords`, `articleSection`, `inLanguage` properties
- `TechArticle` type (can be set via front matter override but no enriched properties)

## Recommended Schema Enhancements

### Priority 1 — Quick Wins (Plugin Configuration)

These require only config/front matter changes, no custom templates:

1. **Set `site.logo`** in `_config.yml` — enables `publisher` in BlogPosting JSON-LD
2. **Set `site.social.links`** in `_config.yml` — enables `sameAs` on homepage
3. **Add `image` to post front matter** — required for Article rich results in Google

### Priority 2 — Custom JSON-LD Includes (High Impact)

Build as `_includes/schema/*.html` templates using Liquid:

#### Enhanced BlogPosting

Supplement jekyll-seo-tag output with additional properties:

| Property | Source | Impact |
|----------|--------|--------|
| `wordCount` | `content | number_of_words` | Signals content depth |
| `keywords` | Post `tags` array | Categorization |
| `articleSection` | Primary tag | Content classification |
| `inLanguage` | `page.lang` or `"en"` | Critical for multi-language (future) |
| `isAccessibleForFree` | `true` | Signals non-paywalled content |

#### BreadcrumbList (New)

Enables breadcrumb rich results in Google SERPs.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aicodeblog.com/" },
    { "@type": "ListItem", "position": 2, "name": "Post Title", "item": "https://aicodeblog.com/2026/02/22/post-title.html" }
  ]
}
```

#### Person (About Page)

Strengthens E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Matthew Brandenburg",
  "url": "https://aicodeblog.com/about/",
  "sameAs": ["https://github.com/mattbran87", "https://linkedin.com/in/mattbran87"],
  "jobTitle": "...",
  "description": "..."
}
```

#### WebSite with SearchAction (After #009 Search)

Enables sitelinks search box in Google. Only implement after search feature is built.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://aicodeblog.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://aicodeblog.com/search/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Priority 3 — Optional Enrichments

- **TechArticle** — use `seo.type: TechArticle` in front matter for code-heavy posts; minor benefit since Google treats it similarly to BlogPosting
- **`translationOfWork` / `workTranslation`** — link translated versions in schema (future multi-language support)

## Realistic Rich Results Targets

| Rich Result | Requirements | Feasibility |
|-------------|-------------|-------------|
| Article enhanced listing (image, date, author) | BlogPosting + `image` + `author` + `publisher` + `datePublished` | High — needs `image` and `site.logo` |
| Breadcrumbs in SERPs | BreadcrumbList | High — straightforward |
| Sitelinks search box | WebSite + SearchAction | Medium — depends on #009 Search |
| Author knowledge panel | Person + consistent sameAs | Low — Google decides independently |

## Implementation Approach

**Recommended: Custom `_includes/` templates with Liquid** (Jekyll SME recommendation)

- No additional plugins needed
- Create includes like `_includes/schema/blog-posting.html`, `_includes/schema/breadcrumbs.html`, `_includes/schema/person.html`
- Each outputs a `<script type="application/ld+json">` block using page/site Liquid variables
- Can either supplement or replace jekyll-seo-tag's JSON-LD output

**Not recommended: Additional plugins**

- No actively maintained Jekyll 4 plugins specifically for structured data beyond jekyll-seo-tag
- Custom Liquid templates provide full control and no dependency risk

## Multi-Language Considerations (Future — #017)

- Add `inLanguage` property to all schema types now (defaults to `"en"`)
- Each translated page should have its own JSON-LD with the correct language code
- `translationOfWork` / `workTranslation` can link translations (not widely used by Google yet but future-proofs)

## Ad Integration Considerations (Future — #018)

- No direct Schema.org interaction with ads
- Ensure ad scripts don't interfere with JSON-LD parsing (load order)
- `isAccessibleForFree: true` signals content is not paywalled

## Validation Approach

1. **Google Rich Results Test** — test individual pages for eligible rich results
2. **Schema Markup Validator** (schema.org) — validate against full vocabulary
3. **Google Search Console** — monitor rich result status and errors post-deployment
4. **Lighthouse SEO audit** — catches missing structured data basics

## Common Mistakes to Avoid

- Missing `image` — the #1 reason BlogPosting doesn't qualify for rich results
- Mismatched data between visible page content and schema (Google penalizes this)
- Using `Organization` as author type for a personal blog (use `Person`)
- Overly nested or complex schema that's hard to maintain in Liquid templates
- Not updating `dateModified` when posts are edited
