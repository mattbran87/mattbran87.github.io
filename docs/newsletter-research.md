# Newsletter Subscribe — Research

> **Status:** Complete
> **Feature:** 028 — Newsletter Subscribe CTA
> **Created:** 2026-02-25
> **Completed:** 2026-02-25

## Purpose

Evaluate email newsletter options for the blog. The CTA component (visual element, placement, copy) can be built independently — this research informs the provider/backend integration that powers it.

## Key Questions

1. **Self-hosted vs. third-party** — Self-hosted (Listmonk) is the best long-term option for full control and minimal cost, but requires a server. Third-party (Buttondown) works today on a static site.
2. **Third-party service comparison** — Buttondown wins for developer blogs: minimal, Markdown-native, clean HTML embed, no JS required. Mailchimp is bloated. ConvertKit is too expensive. follow.it is viable but uncertain long-term.
3. **Integration complexity** — Embedded HTML form (no JS) is the simplest approach. Buttondown's form submits via POST and redirects to their confirmation page.
4. **Privacy and data ownership** — Buttondown subscriber data is exportable. Free tier includes Buttondown branding in emails.
5. **Cost** — Buttondown free tier: 100 subscribers, no time limit. RSS-to-email automation is a paid add-on (+$9/month). Manual send is free.

## Context

- The site is currently static (Jekyll on GitHub Pages) with no backend
- A server migration is planned, which would enable self-hosted solutions
- The CTA component itself has no dependency on the provider choice — it can ship with a placeholder

## Services Evaluated

### Buttondown (Selected)
- **Type:** Managed service
- **Free tier:** 100 active subscribers, manual send, Buttondown branding in emails
- **Pros:** Developer-friendly, Markdown-native, clean HTML embed form, no third-party JS, good email deliverability, API available
- **Cons:** 100 subscriber limit on free tier, RSS-to-email is paid add-on (+$9/month), small company (one developer)

### Mailchimp
- **Type:** Managed service
- **Free tier:** 500 contacts, 1,000 sends/month
- **Pros:** Industry-standard deliverability, robust analytics, built-in RSS campaign feature
- **Cons:** Bloated interface for a small blog, free tier has shrunk significantly, overkill for this use case

### ConvertKit (Kit)
- **Type:** Managed service
- **Free tier:** 10,000 subscribers but limited features
- **Pros:** Generous free subscriber limit, good deliverability, landing page builder
- **Cons:** RSS automation requires Creator plan ($25/month), more complex than needed

### Listmonk
- **Type:** Self-hosted (open source)
- **Free tier:** Free (self-hosted, pay only for hosting + email delivery via SES ~$0.10/1000)
- **Pros:** Full control, no subscriber limits, no branding, RSS campaign support, lightweight Docker setup
- **Cons:** Requires a server (not available today), setup complexity, ongoing maintenance

### follow.it
- **Type:** Managed service (FeedBurner replacement)
- **Free tier:** Yes, with follow.it branding
- **Pros:** Set-and-forget RSS-to-email, multiple subscription channels, near-zero maintenance
- **Cons:** Third-party branding, uncertain long-term viability, less feature-rich than full newsletter platforms

## Recommendation

**Now:** Buttondown (free tier) with manual send. Embedded HTML form for subscriber collection, manual email composition via Buttondown dashboard when publishing new posts.

**Future:** Migrate to Listmonk after server migration for full control, no subscriber limits, and minimal ongoing cost (~$0.10/1000 emails via Amazon SES).
