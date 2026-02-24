# Decisions: Contact Form

## Decision Log

### D1: Page Content Approach

- **Date:** 2026-02-23
- **Phase:** Research & Planning
- **Context:** The contact page needs introductory text and a mailto link. Could range from a plain Markdown page to a more elaborate layout with Bootstrap cards or additional contact methods.
- **Options Considered:**
  1. Plain Markdown with mailto link — matches about page simplicity, zero custom markup needed
  2. Bootstrap card component wrapping the email link — more visually distinct but adds complexity for minimal gain
  3. Multiple contact methods (email, social links, form service) — broader but exceeds the spec scope
- **Decision:** Option 1 — plain Markdown with mailto link
- **Rationale:** The spec explicitly calls for a mailto link styled consistently with the theme. The about page sets the precedent: simple Markdown content rendered through `layout: page`. Social links already live in the footer and sidebar. Adding visual complexity to a page with one link would be over-engineering.

---

### D2: Navigation Placement

- **Date:** 2026-02-23
- **Phase:** Research & Planning
- **Context:** The contact page needs to appear in the header nav. The current order is: About, Series, Tags. Need to decide where Contact fits.
- **Options Considered:**
  1. After Tags (last position) — contact is a utility page, not a content page
  2. After About (second position) — groups "about the author" pages together
  3. First position — maximizes visibility for reader outreach
- **Decision:** Option 1 — after Tags (last position)
- **Rationale:** Content discovery pages (Series, Tags) are more frequently used than a contact page. Contact is a utility action — readers who want it will find it in the nav regardless of position. Placing it last keeps the nav focused on content-first ordering.
