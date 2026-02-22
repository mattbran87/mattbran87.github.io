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

### Variables — Two-Layer Model

Bootstrap requires SCSS `$variables` at compile time, but the project uses CSS custom properties for runtime theming. These coexist as two layers:

**Layer 1 — SCSS variables (Bootstrap overrides only)**

SCSS variables are permitted **only** for overriding Bootstrap's Sass defaults. They must resolve to concrete values (hex, px, unitless numbers). Define them in `_variables.scss` before the `:root {}` block.

```scss
// Layer 1: Bootstrap Sass overrides (compile-time)
$primary: #2a7ae2;
$body-color: #111111;
$body-bg: #ffffff;
$font-size-base: 1rem;
```

**Layer 2 — CSS custom properties (project component styles)**

CSS custom properties are the primary variable system for all project-authored component styles. Define them in `_variables.scss` inside `:root {}`. Reference `var(--*)` in all component partials — never `$sass-variables`.

```scss
// Layer 2: Project design tokens (runtime)
:root {
    --color-primary: #2a7ae2;
    --color-text: #111111;
    --color-background: #ffffff;
    --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --spacing-unit: 1rem;
}
```

```scss
// Usage in component partials — always var(--*), never $variables
.post-card__title {
    color: var(--color-primary);
    font-family: var(--font-family-base);
    margin-bottom: var(--spacing-unit);
}
```

**Note:** `$primary` and `--color-primary` share the same value, maintained in sync manually. Breakpoints cannot be CSS custom properties (`@media` queries don't support `var()`).

### File Organization

The SCSS entry point lives at `assets/main.scss` (overrides Minima's gem-level file). Partials live in `assets/css/_partials/` and are imported via the Sass load path. Vendored libraries live in `assets/vendor/`.

```
assets/
├── main.scss                          # Entry point (Jekyll front matter required)
├── vendor/
│   └── bootstrap/scss/                # Vendored Bootstrap Sass source
├── css/
│   └── _partials/
│       ├── _variables.scss            # Layer 1 (SCSS) + Layer 2 (CSS custom properties)
│       ├── _base.scss                 # Reset, typography, global defaults
│       ├── _header.scss               # Site header
│       ├── _footer.scss               # Site footer
│       ├── _nav.scss                  # Navigation
│       └── _post.scss                 # Post layout
└── images/
    ├── site/                          # Site-wide (logo, favicon, default og-image)
    └── posts/
        └── YYYY-MM-DD-post-slug/      # Post-specific images grouped by post
```

The `main.scss` entry point imports Bootstrap selectively and project partials:

```scss
---
# Front matter required for Jekyll to process SCSS
---

// 1. Project variables (Layer 1 SCSS overrides + Layer 2 CSS custom properties)
@import "partials/variables";

// 2. Bootstrap infrastructure (required, in this exact order)
@import "bootstrap/scss/functions";
// Bootstrap $variable overrides go between functions and variables
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/root";

// 3. Bootstrap components (uncomment as needed per feature)
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/type";
@import "bootstrap/scss/images";
@import "bootstrap/scss/containers";
@import "bootstrap/scss/grid";
@import "bootstrap/scss/helpers";
@import "bootstrap/scss/utilities/api";

// 4. Project partials (use var(--*) only)
@import "partials/base";
```

### BEM + Bootstrap Coexistence

- **BEM classes** own component identity and carry project styles. Target only BEM selectors in SCSS partials.
- **Bootstrap utility classes** (`d-flex`, `mb-3`, `text-center`) are additive helpers in markup alongside BEM classes, not replacements.
- **Bootstrap grid classes** (`.container`, `.row`, `.col-*`) are structural scaffolding — do not wrap them in BEM element names.
- **Bootstrap component classes** (`.btn`, `.alert`, `.badge`) used without modification need no BEM wrapper. Add a BEM class only if project-specific overrides are needed.
- Never write CSS rules that target Bootstrap utility or grid classes directly.

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

## Performance Budget

These are guardrails checked during the Testing phase. The QA SME flags violations.

- **Max image size:** 200KB per image — compress before adding to the repo
- **Total page weight:** Under 1MB per page (HTML + CSS + JS + images)
- **Lighthouse performance score:** 90+ target
- **No render-blocking JavaScript** unless absolutely necessary

## Browser Support

Target the **last 2 versions** of:

- Chrome
- Safari
- Edge
- Firefox

No Internet Explorer support. All modern CSS features used in this project (Flexbox, Grid, custom properties) are fully supported across these browsers.

## Dependency Management

- Run `bundle update` **once per month** to keep gems current
- If a security advisory is reported for a dependency:
  1. Document the advisory in a note (feature spec or standalone)
  2. Plan and execute the update — do not ignore advisories
- Always commit `Gemfile.lock` after updates

## Backup and Recovery

The Git repository on GitHub is the primary backup. The entire site can be rebuilt from the repo at any time (no database, no server state).

- **Push frequently** — unpushed local work is the only vulnerability
- **Commit drafts** — files in `_drafts/` should be committed even if not published, so they are backed up to the remote
