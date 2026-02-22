# Multi-Language Support — Research Findings

> **Date:** 2026-02-22

## Plugin Evaluation

### Recommendation: jekyll-polyglot

**jekyll-polyglot** (v1.12.0, January 2026) is the only actively maintained multilingual plugin for Jekyll 4.x.

| Plugin | Status | Jekyll 4 | hreflang | Fallback | Notes |
|--------|--------|----------|----------|----------|-------|
| **jekyll-polyglot** | Active (Jan 2026) | Yes | Built-in | Automatic | Recommended |
| jekyll-multiple-languages-plugin | **Archived** (Jan 2024) | Yes | No | No | Do not use |
| jekyll-language-plugin | Abandoned (~2015) | No | No | No | Not viable |

### How Polyglot Works

- Posts stay in `_posts/` with a `lang` front matter field to indicate language
- Default language content serves from the root URL; other languages get an automatic prefix (`/es/`, `/fr/`, `/de/`)
- Missing translations fall back to the default language automatically
- UI strings are localized via `_data/:lang/` files (e.g., `_data/en.yml`, `_data/es.yml`)
- Relative links within content are automatically rewritten to stay within the current language context
- Provides `{% I18n_Headers %}` include for hreflang `<link>` tags and canonical URLs

### Compatibility with Our Stack

| Concern | Status | Resolution |
|---------|--------|------------|
| Jekyll 4.4.1 | Compatible | Requires `jekyll >= 3.1.0` |
| Windows development | Compatible | Set `parallel_localization: false` (builds are sequential but correct) |
| GitHub Actions deploy | Compatible | Custom workflow already in place; not limited to GitHub Pages whitelist |
| jekyll-feed | **Open issue (#190)** | Needs testing; may need to add feed files to `exclude_from_localization` |
| Minima 2.5 theme | Compatible | Requires overriding includes for language switcher |
| SCSS sourcemaps | Minor issue | Add `sass: sourcemap: never` to `_config.yml` |

### Configuration Shape

```yaml
# _config.yml additions
languages: ["en", "es", "fr", "de"]
default_lang: "en"
exclude_from_localization: ["assets/css", "assets/img", "assets/vendor", "sitemap.xml"]
parallel_localization: false  # Required on Windows
```

## Decisions

### Target Languages

| Language | Code | Rationale |
|----------|------|-----------|
| English (default) | `en` | Existing content, primary audience |
| Spanish | `es` | ~500M+ speakers, largest non-English Western language |
| French | `fr` | ~280M+ speakers, widely used across Europe and Africa |
| German | `de` | ~130M+ speakers, strong tech/developer community |

Additional languages (Portuguese, Italian, Dutch) can be added later — Polyglot supports incremental adoption since untranslated content falls back to English.

### URL Structure

**Root for English, prefix for others** (Polyglot's default behavior):

| Language | URL Example |
|----------|-------------|
| English | `/2026/02/22/post-title/` |
| Spanish | `/es/2026/02/22/post-title/` |
| French | `/fr/2026/02/22/post-title/` |
| German | `/de/2026/02/22/post-title/` |

Rationale: Preserves existing English URLs (no redirects needed), keeps clean paths for the primary audience, and is zero-config with Polyglot.

### Translation Approach

- AI-assisted translation of posts and pages (not automated by the plugin)
- A custom `/translator` subagent command will be created to streamline the process
- Translated posts must include translated `title` and `description` front matter, not just body content
- Translations are added incrementally — untranslated content falls back to English

### Language Detection Banner

- Use `navigator.language` JavaScript API to detect visitor's browser language preference
- If it matches a translated language (es, fr, de), show a dismissible banner: "This page is available in Español / Français / Deutsch"
- Persist dismissal in localStorage so returning visitors are not re-prompted
- No geo-IP or external service dependencies

### SEO Strategy

- **hreflang tags:** Generated automatically by Polyglot's `{% I18n_Headers %}` include
- **Canonical URLs:** Each language version gets its own canonical URL
- **Meta descriptions:** Translated posts must include translated `description` in front matter
- **Sitemaps:** Exclude `sitemap.xml` from localization; generate a multilingual sitemap
- **RSS feeds:** Investigate per-language feeds or a single multilingual feed (depends on jekyll-feed compatibility testing)

## Scope Summary

1. Install and configure jekyll-polyglot
2. Set up `_data/` language files for UI strings (nav, footer, common labels)
3. Override Minima includes to add a language switcher in the header/nav
4. Implement JavaScript language detection banner with localStorage dismiss
5. Integrate hreflang headers and translated meta descriptions
6. Test and resolve jekyll-feed compatibility
7. Create `/translator` subagent command for AI-assisted translation
8. Translate existing posts and pages into es, fr, de

## References

- [jekyll-polyglot GitHub](https://github.com/untra/polyglot)
- [Polyglot documentation](https://polyglot.untra.io/)
- [jekyll-polyglot on RubyGems](https://rubygems.org/gems/jekyll-polyglot)
- [jekyll-feed compatibility issue #190](https://github.com/untra/polyglot/issues/190)
- [Windows parallelization issue #11](https://github.com/untra/polyglot/issues/11)
