# Notes: Personalize Site

## Research & Planning

### Findings

- `_config.yml` currently has placeholder values: title ("Your awesome title"), description (Jekyll default), `twitter_username: jekyllrb`, `github_username: jekyll`
- Email is already set correctly: `matt@aicodeblog.com`
- URL is already set: `https://aicodeblog.com`
- `about.markdown` contains Jekyll/Minima boilerplate text
- Social links appear in two templates: `_includes/footer.html` and `_includes/sidebar.html`
- Both templates use the same pattern: check `site.github_username` / `site.twitter_username`, build URL, render link with aria-label
- No `author` field exists in `_config.yml` — adding one enables jekyll-seo-tag and jekyll-feed to attribute content correctly
- The default welcome post stays for now — user will remove after first real article

### Open Questions

- [x] Site description — confirmed: "Documenting AI-assisted coding experiences, tools, and development processes."
- [x] Twitter handling — confirmed: remove entirely from templates

### References

- Jekyll configuration docs: https://jekyllrb.com/docs/configuration/
- jekyll-seo-tag usage of `site.author`: https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/usage.md

---

## Implementation

- [Notes captured during implementation]

---

## Testing

### AC1: Site title displays as "AI Code Blog" in the header and browser tab — PASS
- Header: `AI Code Blog` in `site-header__brand` link (index.html:28)
- Browser tab: `<title>AI Code Blog | Documenting...</title>` (index.html:5)
- About page: `<title>About | AI Code Blog</title>` (about/index.html:5)

### AC2: Site description appears in footer, sidebar, and HTML meta tags — PASS
- Footer: `site-footer__description` contains full description (index.html:108)
- Sidebar: `sidebar__about` contains full description (index.html:75)
- Meta: `<meta name="description">` and `og:description` present (index.html:10-11)

### AC3: GitHub link points to https://github.com/mattbran87 — PASS
- Footer: `href="https://github.com/mattbran87"` with `aria-label="GitHub"` (index.html:109)
- Sidebar: `href="https://github.com/mattbran87"` with `aria-label="GitHub"` (index.html:93)

### AC4: LinkedIn link points to https://www.linkedin.com/in/mattbran87/ — PASS
- Footer: `href="https://www.linkedin.com/in/mattbran87/"` with `aria-label="LinkedIn"` (index.html:111)
- Sidebar: `href="https://www.linkedin.com/in/mattbran87/"` with `aria-label="LinkedIn"` (index.html:95)

### AC5: No Twitter link appears anywhere on the site — PASS
- Searched all HTML files in `_site/` for "twitter" — only matches are standard `twitter:card` and `twitter:title` Open Graph meta tags from jekyll-seo-tag. No social profile links to Twitter exist.

### AC6: About page displays real author bio — PASS
- `about/index.html:56-58` contains full bio text across two paragraphs

### AC7: Default welcome post is still present and renders correctly — PASS
- `_site/jekyll/update/2026/02/22/welcome-to-jekyll.html` exists
- Post appears in the homepage post list with title, date, and excerpt

### AC8: `jekyll build` completes without errors or warnings — PASS
- Clean build in 1.26 seconds, no errors or warnings

### AC9: All social links have appropriate aria-label attributes — PASS
- Footer GitHub: `aria-label="GitHub"`
- Footer LinkedIn: `aria-label="LinkedIn"`
- Sidebar GitHub: `aria-label="GitHub"`
- Sidebar LinkedIn: `aria-label="LinkedIn"`
- Both `<nav>` wrappers have aria-labels ("Social media links" in footer, "Social links" in sidebar)

### Issues Found
- None

---

## Acceptance

- All 12 requirements verified as complete
- All 9 acceptance criteria pass — see Testing section for details
- All 3 decisions (D1-D3) from decisions.md were followed correctly
- Feature merged to master, branch deleted
