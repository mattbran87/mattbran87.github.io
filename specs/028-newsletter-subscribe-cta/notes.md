# Notes: Newsletter Subscribe CTA

## SME Finding Tracker

All SME findings across every phase, with disposition. Add rows as findings come in.

| # | Phase | SME | Finding | Recommendation | Disposition |
|---|-------|-----|---------|----------------|-------------|
| S1 | Testing | A11y | Dark mode button contrast fails (#ffffff on #4dabf7 ≈ 2.5:1) | Override button background to #1971c2 in dark mode (5.1:1) | Fixed in 30bb404 |
| S2 | Testing | A11y | Redundant aria-label on RSS link (visible text suffices) | Remove aria-label, keep visible text as accessible name | Fixed in 1d48b54 |
| S3 | Testing | QA | Empty .newsletter-cta {} block outputs empty CSS rule | Info — cosmetic only, comment explains intentionality | N/A |
| S4 | Testing | QA | referrerpolicy="unsafe-url" on form | Info — intentional per Buttondown's integration, no security risk | N/A |

**Disposition values:** Adopted → D# (decision), Adopted → Task #, Deferred, Overridden by D#, Fixed in [commit], N/A

---

## Research & Planning

### Findings

#### Provider Evaluation

Evaluated 8 notification methods for a static Jekyll site:

1. **RSS/Atom feed** — already exists via `jekyll-feed`, zero cost, but not discoverable on the site and limited to RSS reader users
2. **GitHub Watch** — free, developer-only audience, too narrow
3. **follow.it** — free RSS-to-email, auto-sends, but third-party branding and uncertain viability
4. **Buttondown** — free up to 100 subscribers, developer-friendly, HTML embed form, no JS required
5. **Mailchimp** — free up to 500 contacts, bloated for this use case
6. **ConvertKit (Kit)** — RSS automation requires $25/month paid plan
7. **Web Push (OneSignal)** — free tier generous, but push notifications have perception issues
8. **Listmonk (self-hosted)** — best long-term option, but requires server (not yet available)

**Selected:** Buttondown (free tier) — see D1.

#### Buttondown Integration Details

**Embed form HTML (provided by Buttondown):**
```html
<form
  action="https://buttondown.com/api/emails/embed-subscribe/aicodeblog"
  method="post"
  class="embeddable-buttondown-form"
  referrerpolicy="unsafe-url"
>
  <label for="bd-email">Enter your email</label>
  <input type="email" name="email" id="bd-email" />
  <input type="submit" value="Subscribe" />
  <p>
    <a href="https://buttondown.com/refer/aicodeblog" target="_blank">
      Powered by Buttondown.
    </a>
  </p>
</form>
```

- Form submits via POST to Buttondown's API
- `referrerpolicy="unsafe-url"` passes the referring page URL to Buttondown
- Includes a "Powered by Buttondown" referral link (free tier branding)
- Redirects to Buttondown's confirmation page after submit
- No JavaScript required — pure HTML form
- We will restyle with BEM classes and integrate the form action URL from `_config.yml`

**RSS-to-email:** Available as a paid add-on (+$9/month). Supports immediate (checked every 30 minutes), weekly, or monthly cadences. Can auto-send or create drafts. Not used — manual send chosen per D2.

**Free tier limits:** 100 active subscribers, no time limit, Buttondown branding in emails.

#### Current Site State

- RSS feed exists at `/feed.xml` via `jekyll-feed` plugin — no visible link on site
- Sidebar has 5 sections: About, Recent Posts, Popular Tags, Series, Site Author Links
- Post layout after content: prev/next nav → comments → related posts
- Social share component (`_includes/social-share.html`) uses inline SVG icons with BEM naming — good pattern reference
- Site uses CSS custom properties for theming (dark mode support)

### Open Questions

- [x] Which provider? → Buttondown (D1)
- [x] Manual or automated sending? → Manual (D2)
- [x] Where to place the CTA? → Sidebar + post footer (D3)
- [x] Embed form or external link? → Embed form (D4)
- [x] Where to put the RSS link? → Sidebar (D5)
- [x] User's Buttondown username — `aicodeblog`

### References

- [Buttondown docs — Embedding](https://docs.buttondown.com/building-your-subscriber-base)
- [Buttondown docs — RSS-to-email](https://docs.buttondown.com/rss-to-email)
- [Buttondown pricing](https://buttondown.com/pricing)

---

## Implementation

- [Notes captured during implementation — gotchas, surprises, workarounds]

---

## Testing

### Stage 1: Claude Verification & SME Audits

#### Accessibility SME — Testing Audit
- **Finding:** Dark mode button contrast fails WCAG AA — #ffffff on #4dabf7 is ~2.5:1 (needs 4.5:1)
- **Recommendation:** Override button background to #1971c2 in dark mode (5.1:1 ratio)
- **Status:** Fixed in commit 30bb404

- **Finding:** Redundant `aria-label="RSS feed"` on RSS link — visible text already provides accessible name
- **Recommendation:** Remove aria-label to avoid WCAG 2.5.3 Label in Name risk if visible text changes
- **Status:** Fixed in commit 1d48b54

- **Finding:** All other checks passed — form labels, focus styles, heading hierarchy, button element, required field, submission feedback

#### QA SME — Testing Audit
- **Finding:** All conventions pass — BEM naming, CSS custom properties, Liquid comments, include parameter passing, config structure, HTML output
- **Recommendation:** Two info-level observations: (1) empty `.newsletter-cta {}` block outputs empty CSS rule, (2) `referrerpolicy="unsafe-url"` is intentional per Buttondown
- **Status:** No action needed

### Stage 2: User Testing

- [User testing observations, pass/fail results]

### Issues Found

- [Issues documented with steps to reproduce, severity, and fix status]

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
