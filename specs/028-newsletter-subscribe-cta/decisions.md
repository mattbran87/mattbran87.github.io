# Decisions: Newsletter Subscribe CTA

## Decision Log

### D1: Newsletter Provider

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Need a way to notify readers about new posts. Evaluated RSS-only, follow.it, Buttondown, Mailchimp, ConvertKit, Listmonk, and others.
- **Options Considered:**
  1. RSS feed only — free, already exists, but limited to RSS reader users
  2. follow.it — free, auto-sends from RSS, but third-party branding and uncertain long-term viability
  3. Buttondown — free up to 100 subscribers, developer-friendly, Markdown-native, clean embed
  4. Mailchimp — free up to 500 contacts, bloated interface, overkill for a small blog
  5. Listmonk (self-hosted) — free, full control, but requires a server (not yet available)
- **Decision:** Buttondown (free tier)
- **Rationale:** Developer-friendly, minimal, clean HTML embed form, no third-party JavaScript. Free tier supports up to 100 subscribers which is sufficient for a growing blog. Listmonk can be reconsidered after server migration.

---

### D2: Notification Send Method

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Buttondown's RSS-to-email automation is a paid add-on (+$9/month). Need to decide between manual sending (free) and automated RSS-to-email (paid).
- **Options Considered:**
  1. Manual send (free) — log into Buttondown and compose/send an email when publishing a new post
  2. RSS automation (+$9/month) — Buttondown watches the RSS feed and auto-sends
  3. Decide later — build the form now, choose automation later
- **Decision:** Manual send (free tier)
- **Rationale:** User preference for free/low-cost solution. Publishing frequency is low enough that manual sending is manageable. Can upgrade to automation later if the effort becomes a burden.

---

### D3: CTA Placement

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** Where to place the subscribe CTA on the site for maximum visibility without being intrusive.
- **Options Considered:**
  1. Sidebar only — visible on all pages with a sidebar
  2. Post footer only — catches engaged readers who finished an article
  3. Sidebar + post footer — maximum visibility, two touchpoints
- **Decision:** Sidebar + post footer
- **Rationale:** Sidebar provides persistent visibility across all pages. Post footer catches engaged readers at the moment they're most likely to subscribe. Two placements without being aggressive.

---

### D4: Integration Style

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** How to present the Buttondown signup — inline form vs. external link.
- **Options Considered:**
  1. Embedded form — inline email input + submit button directly on the site
  2. Link to Buttondown page — styled button that opens Buttondown's subscribe page in a new tab
- **Decision:** Embedded form
- **Rationale:** Readers never leave the site. Lower friction for signup. Buttondown provides a simple HTML form that requires no JavaScript.

---

### D5: RSS Feed Discoverability

- **Date:** 2026-02-25
- **Phase:** Research & Planning
- **Context:** The RSS feed exists (`/feed.xml` via `jekyll-feed`) but has no visible link anywhere on the site.
- **Options Considered:**
  1. Add RSS link to sidebar — alongside the newsletter subscribe section
  2. Add RSS link to footer — subtle but always visible
  3. Add RSS link to Site Author Links section — alongside email, GitHub, LinkedIn icons
- **Decision:** Add RSS link to sidebar
- **Rationale:** Natural grouping with the subscribe form — both are "follow this blog" mechanisms. Keeps the Site Author Links section focused on the author, not the blog's feed.
