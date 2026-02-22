# Decisions: Personalize Site

## Decision Log

### D1: Remove Twitter support from templates

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** The footer and sidebar templates include a Twitter link conditional. The site owner does not have a Twitter account.
- **Options Considered:**
  1. Remove Twitter conditional entirely — cleaner templates, less dead code
  2. Leave conditional in place — it won't render, but easy to re-enable later
- **Decision:** Remove Twitter conditional entirely
- **Rationale:** User preference. Keeps templates clean. If Twitter/X is needed later, adding a conditional back is trivial.

---

### D2: Add LinkedIn via username config pattern

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** Need to add LinkedIn social link. The existing pattern uses `site.github_username` to build URLs in templates.
- **Options Considered:**
  1. Follow the same pattern — add `linkedin_username` to `_config.yml`, build URL in templates
  2. Store full LinkedIn URL in config
- **Decision:** Follow the username pattern (`linkedin_username: mattbran87`)
- **Rationale:** Consistent with existing `github_username` convention. Templates construct the full URL, keeping config values simple.

---

### D3: Add author field to _config.yml

- **Date:** 2026-02-22
- **Phase:** Research & Planning
- **Context:** `_config.yml` has no `author` field. Jekyll and jekyll-seo-tag use `site.author` for meta tags and feed attribution.
- **Options Considered:**
  1. Add simple string: `author: "Matthew Brandenburg"`
  2. Add structured hash with name and email
- **Decision:** Add simple string for now
- **Rationale:** Sufficient for current needs. jekyll-seo-tag supports both formats, but a string is simpler and can be expanded later if needed (e.g., for structured data in spec 008).
