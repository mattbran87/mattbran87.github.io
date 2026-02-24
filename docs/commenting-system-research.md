# Commenting System — Research Findings

> **Date:** 2026-02-24
> **Related roadmap item:** #021 Comments

## Goal

Add a commenting system to blog posts so readers can engage in discussion. Each post gets its own comment thread. The solution must work with a static Jekyll site hosted on GitHub Pages.

## Provider Evaluation

### Giscus (Recommended)

Uses GitHub Discussions as the comment backend. Each post maps to a Discussion thread in the repository.

| Aspect | Details |
|--------|---------|
| Cost | Free, open source |
| Backend | GitHub Discussions (stored in your repo) |
| Authentication | GitHub account required to comment |
| Privacy | No tracking, no cookies, no ads |
| Integration | Single `<script>` tag |
| Per-post comments | Yes — each post maps to its own Discussion thread |
| Moderation | GitHub's built-in Discussion moderation tools |
| Reactions | Supported (GitHub emoji reactions) |
| Replies | Threaded replies supported |
| Theming | Multiple built-in themes; supports custom CSS and dark mode |
| Data ownership | Full — all comments live in your GitHub repo's Discussions tab |

**Why Giscus is the best fit:**
- Developer audience already has GitHub accounts
- No external service to manage or pay for
- Data stays in your repository
- Clean, lightweight widget
- Active maintenance and community

### Alternatives Considered

**Utterances**
- Same concept as Giscus but uses GitHub Issues instead of Discussions
- Issues are not designed for conversations (no threading, clutters the Issues tab)
- Giscus is the direct successor; no reason to choose Utterances for a new setup

**Disqus**
- Minima 2.5 has built-in support (`disqus.shortname` in `_config.yml`)
- Free tier injects third-party ads into comments
- Heavy JavaScript payload (~600KB+), significant performance impact
- Extensive user tracking and cookies
- Not recommended for a privacy-conscious developer blog

**Staticman**
- Comments submitted as pull requests, stored as data files in the repo
- Truly static — comments baked into the build at compile time
- Complex setup: requires a Staticman instance (self-hosted or their hosted service)
- No real-time interaction; comments appear after PR merge and site rebuild
- Interesting approach but high maintenance overhead

**Commento / Hyvor Talk**
- Privacy-focused paid services ($5–10/month)
- Clean UI, good moderation tools
- Unnecessary cost when Giscus provides equivalent functionality for free

**Remark42 / Isso**
- Self-hosted solutions requiring a server
- Not compatible with GitHub Pages static hosting without separate infrastructure

## How Giscus Works

### Setup Process

1. **Enable Discussions** on the GitHub repository (Settings > General > Features > Discussions)
2. **Install the Giscus GitHub App** at [github.com/apps/giscus](https://github.com/apps/giscus) and grant it access to the repo
3. **Configure** at [giscus.app](https://giscus.app) — select repo, Discussion category, mapping strategy, and theme
4. **Copy the generated `<script>` tag** into the Jekyll post layout

### Discussion Mapping

Giscus maps each page to a Discussion using one of these strategies:

| Strategy | How it works | Recommendation |
|----------|-------------|----------------|
| `pathname` | Maps by URL path (e.g., `/2026/02/22/post-title.html`) | Recommended — stable and unique |
| `url` | Maps by full URL | Breaks if domain changes |
| `title` | Maps by page title | Breaks if title is edited |
| `og:title` | Maps by Open Graph title | Depends on #008 SEO Foundation |
| `specific` | Maps to a manually specified Discussion | For special cases only |

**Recommendation:** Use `pathname` — it's the most stable identifier and won't break if you change the site title or domain.

### Per-Post Control

Comments can be enabled/disabled per post via front matter:

```yaml
---
layout: post
title: "My Post"
comments: true    # default, can be omitted
---
```

```yaml
---
layout: post
title: "Announcement"
comments: false   # disables comments for this post
---
```

The include template checks `page.comments` and only renders Giscus when enabled.

### Generated Script Example

```html
<script src="https://giscus.app/client.js"
  data-repo="username/repo"
  data-repo-id="R_..."
  data-category="Blog Comments"
  data-category-id="DIC_..."
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="top"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async>
</script>
```

## Implementation Plan

### Component Structure

- Create `_includes/comments.html` — contains the Giscus script with Liquid variables for configuration
- Store Giscus settings in `_config.yml` under a `comments` or `giscus` key
- Add the include to `_layouts/post.html` after the post content
- Conditionally render based on `page.comments` front matter (default: enabled)

### Configuration in `_config.yml`

```yaml
comments:
  provider: giscus
  giscus:
    repo: "username/repo"
    repo_id: "R_..."
    category: "Blog Comments"
    category_id: "DIC_..."
    mapping: "pathname"
    reactions_enabled: true
    input_position: "top"
    theme: "preferred_color_scheme"
    lang: "en"
```

### Production Only

Like analytics and ads, comments could be loaded only in production (`JEKYLL_ENV=production`). However, unlike tracking scripts, comments are user-facing content — readers expect to see them. **Recommendation:** Load Giscus in all environments but consider a development flag if the script slows local builds.

## Relationship to Other Features

| Feature | Relationship |
|---------|-------------|
| #008 SEO Foundation | If using `og:title` mapping (not recommended); otherwise no dependency |
| #012 Analytics | Can track comment interactions as GA4 events (optional) |
| #013 Dark Mode | Giscus supports `preferred_color_scheme` theme that auto-matches; also supports explicit light/dark themes |
| #020 Social Sharing | Both appear below post content — coordinate placement order |

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Provider | Giscus | Free, privacy-friendly, GitHub-native, lightweight, per-post threading |
| Mapping strategy | `pathname` | Stable, unique, doesn't break on title/domain changes |
| Default state | Comments enabled | Opt-out per post via `comments: false` in front matter |
| Placement | Below post content | Standard blog convention; after share buttons if #020 is implemented |
| Authentication | GitHub only | Acceptable trade-off for a developer blog audience |

## Moderation

- GitHub repo maintainers can moderate Discussions directly (edit, delete, lock, pin)
- Giscus respects GitHub's built-in spam filtering
- Individual Discussions can be locked to prevent further comments
- No separate moderation dashboard needed — it's all in the GitHub UI

## Out of Scope

- Anonymous commenting (Giscus requires GitHub auth — this is a feature, not a limitation)
- Comment migration from other systems (no existing comments to migrate)
- Email notifications for new comments (GitHub handles this via Discussion notifications)
- Comment counts displayed in post listings

## References

- [Giscus](https://giscus.app/)
- [Giscus GitHub Repository](https://github.com/giscus/giscus)
- [GitHub Discussions Documentation](https://docs.github.com/en/discussions)
- [Setting Up Giscus on Jekyll](https://pabloaizpiri.com/blog/2023/setting-up-giscus-on-jekyll/)
- [Migrating from Disqus to Giscus](https://remarkablemark.org/blog/2026/02/20/migrate-from-disqus-to-giscus/)
