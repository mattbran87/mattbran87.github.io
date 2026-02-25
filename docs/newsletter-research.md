# Newsletter Subscribe — Research

> **Status:** Not Started
> **Feature:** 028 — Newsletter Subscribe CTA
> **Created:** 2026-02-25

## Purpose

Evaluate email newsletter options for the blog. The CTA component (visual element, placement, copy) can be built independently — this research informs the provider/backend integration that powers it.

## Key Questions

1. **Self-hosted vs. third-party** — What does a self-hosted email backend look like once the server migration is complete? What are the tradeoffs vs. a managed service?
2. **Third-party service comparison** — Buttondown, Mailchimp, ConvertKit, and alternatives. What are the free tiers, pricing at scale, and feature differences?
3. **Integration complexity** — Embedded form vs. API-based subscription. What works on a static site now, and what becomes possible with a backend?
4. **Privacy and data ownership** — Who owns the subscriber list? How portable is the data? GDPR/CAN-SPAM considerations.
5. **Cost** — Free tier limits, cost per subscriber at 100/500/1000/5000, hidden costs (transactional email, templates, etc.)

## Context

- The site is currently static (Jekyll on GitHub Pages) with no backend
- A server migration is planned, which would enable self-hosted solutions
- The CTA component itself has no dependency on the provider choice — it can ship with a placeholder

## Services to Evaluate

### Buttondown
- **Type:** Managed service
- **Free tier:** TBD
- **Pros:** TBD
- **Cons:** TBD

### Mailchimp
- **Type:** Managed service
- **Free tier:** TBD
- **Pros:** TBD
- **Cons:** TBD

### ConvertKit (Kit)
- **Type:** Managed service
- **Free tier:** TBD
- **Pros:** TBD
- **Cons:** TBD

### Listmonk
- **Type:** Self-hosted (open source)
- **Free tier:** Free (self-hosted)
- **Pros:** TBD
- **Cons:** TBD

### Custom Backend
- **Type:** Self-hosted
- **Pros:** TBD
- **Cons:** TBD

## Recommendation

TBD — to be completed during research phase.
