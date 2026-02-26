# Decisions: Pagination

## Decision Log

### D1: Plugin Choice — jekyll-paginate v1

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Need to paginate the homepage post list. Two viable plugins exist.
- **Options Considered:**
  1. **jekyll-paginate v1.1.0** — Simple, 2-line config, homepage-only, frozen/stable code, no conflicts with jekyll-archives. Requires renaming `index.markdown` to `index.html`.
  2. **jekyll-paginate-v2 v3.0.0** — Multi-page, filtering, autopages. More complex config (config block + front matter). AutoPages overlaps with jekyll-archives. Reports of empty `paginator.posts` on Jekyll 4.2+. Unmaintained since 2020.
- **Decision:** jekyll-paginate v1
- **Rationale:** Homepage-only pagination is the requirement — v1 covers this exactly with minimal config. v2's extra capabilities are unused and add unnecessary complexity and compatibility risk. The `index.html` rename is trivial (file has no Markdown content).

---

### D2: Posts Per Page — 5

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** User wants to keep the homepage clean and focused.
- **Decision:** 5 posts per page
- **Rationale:** User-specified preference.

---

### D3: Pagination Scope — Homepage Only

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Tag archives and series archives also show post lists.
- **Decision:** Paginate homepage only; tag archives and series archives remain unpaginated.
- **Rationale:** Content volume is low (~4 posts). Tag and series archives are unlikely to exceed 5-10 posts per page for the foreseeable future. jekyll-paginate v1 only supports homepage pagination anyway.

---

### D4: Page URL Pattern — `/page:num/`

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Need a URL scheme for paginated pages.
- **Options Considered:**
  1. `/page2/`, `/page3/` (compact, `paginate_path: "/page:num/"`)
  2. `/page/2/`, `/page/3/` (directory-style, `paginate_path: "/page/:num/"`)
- **Decision:** `/page:num/` → produces `/page2/`, `/page3/`
- **Rationale:** Standard Jekyll convention. Shorter URLs. Page 1 remains at `/` (root).

---

### D5: Pagination Navigation Component

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Need to display previous/next links below the post list.
- **Decision:** Reusable `_includes/pagination.html` component with previous/next links and page indicator.
- **Rationale:** Keeps the home layout clean. Follows the project's convention of extracting shared components into includes.
