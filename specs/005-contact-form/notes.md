# Notes: Contact Form

## Research & Planning

### Findings

- **Page pattern is well-established.** The about page (`about.markdown`) demonstrates the exact pattern: `layout: page`, a `title`, a `permalink`, and plain Markdown content. The contact page follows this identically.
- **`layout: page` rendering chain:** `page.html` wraps content in `<div class="container"><article class="page">` with `<h1 class="page__title">` and `<div class="page__content">`. This extends `default.html` which provides the header, footer, `<main>`, and Bootstrap/JS includes.
- **Navigation is config-driven.** `header_pages` in `_config.yml` controls which pages appear in the nav and in what order. Currently: `about.markdown`, `series.html`, `tags.html`. Adding `contact.markdown` to this list is all that's needed.
- **Email is already templated.** `site.email` is `matt@aicodeblog.com`. Mailto links already exist in `footer.html` and `sidebar.html` using `<a href="mailto:{{ site.email }}">` with `aria-label="Email"`.
- **No custom CSS needed.** The page layout, spacing, and typography are handled by the existing `page` layout and Bootstrap utilities. The mailto link is just a standard `<a>` tag in Markdown content.
- **Accessibility conventions in place.** Existing mailto links use `aria-label`. For the contact page, a visible link with descriptive text (e.g., "matt@aicodeblog.com") is sufficient — the link text itself describes the destination, so no extra ARIA is needed.

### Open Questions

- [x] Should the contact page include social links (GitHub, LinkedIn) in addition to email? **Decision: No — keep it focused on email per the spec. Social links are already in the footer/sidebar.**
- [x] Where should Contact appear in the nav order? **Decision: Last, after Tags (see D2).**

### References

- Existing page example: `about.markdown`
- Layout chain: `_layouts/page.html` → `_layouts/default.html`
- Nav logic: `_includes/header.html` (loops through `site.header_pages`)
- Existing mailto usage: `_includes/footer.html`, `_includes/sidebar.html`

---

## Implementation

- No gotchas — straightforward two-file change with no surprises
- 2 commits on `feature/005-contact-form`

---

## Testing

- Jekyll build succeeded with no warnings or errors
- **AC1 — Page renders:** `/contact/index.html` generated with intro text and mailto link ✅
- **AC2 — Mailto link:** `<a href="mailto:matt@aicodeblog.com">matt@aicodeblog.com</a>` — correct address from `site.email` ✅
- **AC3 — Header navigation:** Contact appears as 4th nav item (last position per D2), with `site-nav__link--active` and `aria-current="page"` when on the page ✅
- **AC4 — Layout consistency:** Identical structure to about page — same `<div class="container"><article class="page"><h1 class="page__title">` wrapping ✅
- **AC5 — Responsive:** Uses Bootstrap `.container` and responsive navbar — same as all other pages ✅
- **AC6 — Accessibility:** Link text is the email address (descriptive), keyboard navigable as standard `<a>`, skip link present, heading hierarchy correct (`<h1>` only), `aria-current="page"` on active nav link ✅
- **AC7 — HTML validation:** Valid HTML5 structure confirmed — DOCTYPE, `lang="en"`, proper nesting, all tags closed, semantic elements throughout ✅
- **Edge cases:** Verified active link detection only applies on the contact page (not on about page). No regressions to nav or footer.
- **No issues found.**

---

## Acceptance

- **Requirements:** 6/6 verified
- **Acceptance criteria:** 7/7 confirmed met
- **Constraints:** 6/6 followed (static only, `layout: page`, code conventions, WCAG AA, Bootstrap utilities, `site.email` templated)
- **Decisions:** 2/2 implemented as specified (D1: plain Markdown, D2: last nav position)
- **Tasks:** 8/8 complete
- No deviations from spec
