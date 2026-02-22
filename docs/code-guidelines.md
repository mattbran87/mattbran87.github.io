# Code Guidelines

## General

- 4 spaces for indentation across all file types
- Filenames: lowercase with hyphens (no spaces or underscores, except SCSS partial `_` prefix)

## JavaScript

### Comments

**JSDoc for all functions and file headers — be verbose:**

```javascript
/**
 * @file theme-toggle.js
 * @description Handles toggling between light and dark themes by updating
 * the data-theme attribute on the document root and persisting the user's
 * preference to localStorage. Listens for system preference changes via
 * the prefers-color-scheme media query and syncs accordingly.
 */

/**
 * Retrieves the user's stored theme preference from localStorage and
 * falls back to the system preference if no stored value exists. Checks
 * the prefers-color-scheme media query to determine the system default.
 *
 * @returns {string} The theme name — either "light" or "dark"
 */
function getPreferredTheme() {
    // Check localStorage first
    const stored = localStorage.getItem('theme');
    if (stored) {
        return stored;
    }

    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}
```

**Inline comments — short, single-line descriptions:**

```javascript
// Check localStorage first
const stored = localStorage.getItem('theme');
```

### File Organization

```
assets/js/
├── main.js              # Entry point
└── modules/
    └── feature-name.js  # One file per feature
```

## CSS/SCSS

### Methodology

Use **BEM naming**: `.block__element--modifier`

```scss
.post-card {
    // Block
}

.post-card__title {
    // Element
}

.post-card__title--featured {
    // Modifier
}
```

### Variables

Use **CSS custom properties** as the primary variable system. Define them in `_variables.scss` and reference throughout. Use SCSS only for organizational features (nesting, partials, mixins) — not for variables.

```scss
// _variables.scss
:root {
    --color-primary: #2a7ae2;
    --color-text: #111;
    --color-background: #fff;
    --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --spacing-unit: 1rem;
}
```

```scss
// Usage in component partials
.post-card__title {
    color: var(--color-primary);
    font-family: var(--font-family-base);
    margin-bottom: var(--spacing-unit);
}
```

### File Organization

Split into partials by component/page:

```
assets/css/
├── main.scss              # Entry point, imports all partials
└── _partials/
    ├── _variables.scss    # CSS custom properties
    ├── _base.scss         # Reset, typography, global defaults
    ├── _header.scss       # Site header
    ├── _footer.scss       # Site footer
    ├── _nav.scss          # Navigation
    └── _post.scss         # Post layout
```

The `main.scss` entry point imports partials in order:

```scss
---
# Front matter required for Jekyll to process SCSS
---

@import "partials/variables";
@import "partials/base";
@import "partials/header";
@import "partials/nav";
@import "partials/footer";
@import "partials/post";
```

## HTML / Liquid Templates

### Indentation

4 spaces for all HTML and Liquid blocks.

### Semantic HTML

Use semantic elements over generic `<div>`s:

| Use | Instead of |
|-----|------------|
| `<article>` | `<div class="post">` |
| `<nav>` | `<div class="navigation">` |
| `<section>` | `<div class="section">` |
| `<header>` | `<div class="header">` |
| `<footer>` | `<div class="footer">` |
| `<main>` | `<div class="content">` |
| `<aside>` | `<div class="sidebar">` |
| `<figure>` / `<figcaption>` | `<div class="image">` |

### Liquid Comments

All `{% if %}`, `{% for %}`, and `{% unless %}` blocks must have a comment explaining their purpose:

```liquid
{% comment %} Show featured image only if provided in front matter {% endcomment %}
{% if page.image %}
    <figure class="post__image">
        <img src="{{ page.image }}" alt="{{ page.image_alt | default: page.title }}">
    </figure>
{% endif %}

{% comment %} List the 5 most recent posts {% endcomment %}
{% for post in site.posts limit:5 %}
    <article class="post-card">
        <h2 class="post-card__title">{{ post.title }}</h2>
    </article>
{% endfor %}
```

### Error Handling

Guard against nil and empty values in layouts and includes. Content pages (posts, standalone pages) do not need guards since they control their own data.

**Use `default` filter for fallback values:**

```liquid
<meta name="description" content="{{ page.description | default: site.description }}">
```

**Guard optional front matter fields:**

```liquid
{% comment %} Only render author bio if author data exists {% endcomment %}
{% if page.author %}
    <span class="post__author">{{ page.author }}</span>
{% endif %}
```

**Handle empty collections:**

```liquid
{% comment %} Show posts or a fallback message {% endcomment %}
{% assign filtered = site.posts | where: "category", "tutorial" %}
{% if filtered.size > 0 %}
    {% for post in filtered %}
        <article class="post-card">
            <h2 class="post-card__title">{{ post.title }}</h2>
        </article>
    {% endfor %}
{% else %}
    <p>No posts yet.</p>
{% endif %}
```

## Markdown Content

### Line Length

No wrapping. One paragraph per line. Let editors handle soft wrapping.

### Heading Hierarchy

- Single `#` per file — reserved for the page/post title (set via front matter, not in body content)
- Body content starts at `##`
- Never skip levels (e.g., no `####` after `##`)

```markdown
## Section Title

Content here.

### Subsection

More content.

### Another Subsection

#### Detail Under Subsection
```

### Link Style

Use inline links for most content:

```markdown
Check out the [Jekyll documentation](https://jekyllrb.com/docs/) for details.
```

Use reference-style links when a post has many links or the same URL appears multiple times:

```markdown
Read the [installation guide][install] and the [configuration reference][config].

[install]: https://jekyllrb.com/docs/installation/
[config]: https://jekyllrb.com/docs/configuration/
```

## Accessibility

- All `<img>` tags must have an `alt` attribute — use descriptive text, not filenames
- Interactive elements (buttons, toggles, menus) must have ARIA labels when the purpose isn't clear from visible text
- Maintain sufficient color contrast (WCAG AA minimum)
- Ensure keyboard navigability for all interactive elements

## Image Assets

```
assets/images/
├── site/                          # Site-wide (logo, favicon, default og-image)
└── posts/
    └── YYYY-MM-DD-post-slug/      # Post-specific images grouped by post
```
