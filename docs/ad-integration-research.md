# Ad Integration — Research Findings

> **Date:** 2026-02-22

## Goal

Add advertising to the site to generate revenue. Static site on GitHub Pages, so all ad solutions must be client-side JavaScript.

## Ad Provider Strategy

A phased approach based on site maturity and traffic growth:

### Phase 1 — Google AdSense (Starting Point)

- Lowest barrier to entry, largest ad network
- Requires site approval (needs some existing content)
- Integration: `<script>` tag + ad unit `<div>` elements
- Supports both automatic placement and manual ad unit control
- Revenue: lower CPM but broad advertiser pool
- Tracking/cookies: yes (privacy policy disclosure required)

### Phase 2 — Carbon Ads or EthicalAds (Graduation Target)

Transition to a developer-audience-focused provider once traffic and content support it.

**Carbon Ads**
- Single, non-intrusive ad per page
- Designed for developer/tech audiences
- Higher CPM for tech content than general networks
- Requires application and approval
- Used by CodePen, CSS-Tricks, and similar dev sites

**EthicalAds**
- Privacy-focused, no tracking, no cookies
- Targeted at developer audiences
- Open source friendly
- Lower revenue but no privacy trade-offs

### Out of Scope

- **Affiliate revenue** (Amazon Associates, etc.) — separate initiative, not part of this feature
- **Premium networks** (Mediavine, Raptive) — require 50k–100k+ monthly sessions; not expected to reach this threshold
- **Direct sponsorships** — may be explored independently in the future

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Starting provider | Google AdSense | Low barrier, broad network, easy static site integration |
| Target provider | Carbon Ads or EthicalAds | Better audience fit for a tech/developer blog |
| Integration method | Client-side JavaScript | Only option for static GitHub Pages hosting |
| Ad placement | TBD | To be determined during spec implementation phase |

## Implementation Considerations

- **Privacy policy:** AdSense requires disclosure of cookies/tracking; add or update a privacy policy page
- **GDPR/consent:** May need a cookie consent banner for EU visitors when running AdSense
- **Performance:** Ad scripts add page weight; load asynchronously and consider lazy loading for below-fold units
- **Ad placement:** Decide during implementation — common locations are sidebar, in-content, and post footer
- **Production only:** Load ad scripts only when `JEKYLL_ENV=production` (same pattern as analytics)
- **Ad blockers:** Degrade gracefully; do not break the site if ads are blocked

## References

- [Google AdSense](https://adsense.google.com/)
- [Carbon Ads](https://www.carbonads.net/)
- [EthicalAds](https://www.ethicalads.io/)
