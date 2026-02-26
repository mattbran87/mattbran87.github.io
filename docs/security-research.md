# Security Research: Analytics & Ad Integration on Public GitHub Pages

> **Date:** 2026-02-26
> **Context:** The site is hosted on GitHub Pages from a public repository. This document covers security best practices for Google Analytics 4 (spec 012) and ad integration (spec 018).

## Key Finding: Public Repo Is Not a Blocker

The original deferral of spec 012 cited "awaiting private repository and server migration." This research confirms that a public repository does not create meaningful security risks for analytics or ad integration. All client-side identifiers (measurement IDs, publisher IDs) are inherently public — they are visible in every page's HTML source on every website that uses them. A public GitHub repo does not change the threat model.

## What Is Inherently Public (Safe to Commit)

These values are embedded in client-side JavaScript/HTML and visible to every site visitor regardless of repo visibility:

| Value | Format | Why It's Safe |
|-------|--------|---------------|
| GA4 Measurement ID | `G-XXXXXXXXXX` | Identifier, not a credential. Routes tracking data to your property but grants no read access to analytics data. |
| AdSense Publisher ID | `pub-XXXXXXXXXX` | Identifies which account to credit. Visible on every AdSense-powered site. |
| Carbon Ads placement ID | Alphanumeric string | Identifies ad placement. Part of the public `<script>` tag. |
| EthicalAds publisher slug | String identifier | Part of the public `<div>` data attributes. |
| Ad slot IDs | Various formats | Identify specific ad units on a page. |
| `ads.txt` contents | Plaintext | Intentionally public — declares authorized ad sellers for your domain. |

## What Is Actually Sensitive (Never Commit)

These values grant access to data or account controls and must never appear in source code:

| Value | Risk If Exposed | Storage |
|-------|-----------------|---------|
| GA4 Measurement Protocol API Secret | Anyone can send fabricated events to your GA4 property, polluting analytics data | GitHub Actions secret |
| GA4 Data API service account key (JSON) | Full read access to analytics reports — traffic, behavior, revenue | GitHub Actions secret |
| OAuth client secrets / refresh tokens | Read/write access to GA4 property depending on scopes | GitHub Actions secret |
| AdSense Management API keys | Access to earnings data, ad unit management | GitHub Actions secret |
| Payment information (bank, tax IDs) | Financial/identity data | Never in code — managed in provider dashboards |

### GitHub Actions Secrets for Public Repos

GitHub Actions secrets are the correct mechanism for sensitive values on public repos:

- Encrypted using Libsodium sealed boxes before reaching GitHub's servers
- Decrypted only at workflow runtime; automatically redacted from logs
- Accessed via `${{ secrets.SECRET_NAME }}` in workflow YAML
- **Critical:** workflows from forked pull requests cannot access secrets — prevents exfiltration via malicious PRs
- Only workflows running on the base repository's branches (e.g., `push to master`) have access

**Practical pattern for this project:** The GA4 Measurement ID can live in `_config.yml` (it's already public in rendered HTML). The only secret needed currently is the GA4 Data API service account key for Featured Posts Phase 2 (spec 019), which would be a GitHub Actions secret injected at build time.

## Abuse Vectors and Mitigations

### GA4 Measurement ID Abuse

**Risk:** Ghost spam / Measurement Protocol spam. Attackers harvest measurement IDs and send fabricated events directly to Google's servers — no browser or page visit required. This pollutes analytics data (inflated traffic, broken A/B tests, distorted engagement metrics).

**Mitigations (in order of effort):**

| Mitigation | Effectiveness | Effort |
|------------|---------------|--------|
| GA4's built-in bot filtering (enabled by default) | Catches known bots | None |
| Hostname-based data filters in GA4 | Filters hits not matching your domain | Low |
| Measurement Protocol API Secret (for server-sent events) | Prevents unauthorized server-side submissions | Low |
| Referral exclusion list in GA4 | Blocks known spam referrers | Low |
| Server-side Google Tag Manager | Hides real measurement ID entirely | High — requires server container |

**Assessment for this project:** Low risk. Ghost spam is a data quality nuisance for small blogs, not a security breach. Built-in bot filtering + hostname data filters are sufficient. Server-side GTM is overkill.

### Ad Publisher ID Abuse

**Risk:** Ad code hijacking / domain spoofing. Someone copies your publisher ID onto a policy-violating site. If that site generates invalid traffic, Google could penalize your account.

**Primary mitigation:** `ads.txt` — a plaintext file at your domain root declaring which accounts are authorized to sell your ad inventory. Ad buyers verify this file before bidding, making unauthorized use of your publisher ID ineffective. For Jekyll, place an `ads.txt` file in the project root (no front matter needed).

## Privacy & GDPR Comparison by Ad Network

| Factor | Google AdSense | Carbon Ads | EthicalAds |
|--------|---------------|------------|------------|
| Cookies / tracking | Yes (extensive) | Yes (some) | None |
| GDPR compliance burden | High — certified CMP, Consent Mode v2, TCF v2.3 | Medium — cookie disclosure, basic consent | Minimal — no personal data collected |
| Cookie banner required | Yes (EEA/UK), recommended globally | Yes (EEA/UK) | No |
| Third-party scripts | Multiple | Some | Single script |
| Privacy policy required | Yes (mandatory, specific sections) | Yes | Recommended but not strictly required |
| Implementation complexity on static site | Moderate — consent infrastructure needed | Easy | Easiest |

**Notable finding:** AdSense now requires a Google-certified TCF v2.3 Consent Management Platform for EEA/UK visitors. A self-built cookie banner may be insufficient for AdSense compliance, though it works for GA4 alone. This is relevant when 018 (Ad Integration) begins — the consent banner built for 012 may need upgrading.

## Google's Recommendations for Securing GA4 Properties

- **Least privilege access:** GA4 has five roles (Administrator, Editor, Marketer, Analyst, Viewer). Assign minimum needed.
- **Two administrators minimum:** Prevents lockout if one person loses access.
- **Two-factor authentication:** On all accounts with GA4 access.
- **Data sharing settings review:** Admin > Account Settings > Data Sharing Settings — only enable what you need.
- **Service account security:** Use Viewer role for read-only API access. Rotate keys periodically. Prefer Workload Identity Federation over key files where possible.
- **Never send PII to GA4:** Violates Google's Terms of Service.

## Recommendations for This Project

### For Spec 012 (Analytics)

1. **GA4 Measurement ID in `_config.yml` is safe.** It's already public in rendered HTML. No need for environment variable injection.
2. **Production-only loading via `jekyll.environment == 'production'` guard** is the correct pattern (already planned in spec).
3. **Self-built cookie consent banner is sufficient for GA4.** No certified CMP required for analytics-only consent.
4. **Configure hostname-based data filters in GA4** after setup to reduce spam.
5. **No secrets needed for the initial implementation.** The Measurement Protocol API Secret is only relevant if server-side event submission is added later.

### For Spec 018 (Ad Integration)

1. **Publisher IDs are safe to commit.** Standard practice across all ad networks.
2. **Implement `ads.txt`** immediately when ads go live — primary defense against ad code hijacking.
3. **EthicalAds eliminates the consent banner complexity.** No cookies, no GDPR consent needed, GDPR-compliant by default. Worth reconsidering the AdSense-first strategy given the consent infrastructure burden.
4. **If AdSense is chosen:** the self-built consent banner from 012 will need upgrading to a certified TCF v2.3 CMP for EEA/UK compliance. This is significant additional work.
5. **Content Security Policy (CSP):** When adding ad scripts, whitelist specific domains (`*.google-analytics.com`, `*.googletagmanager.com`, ad network domains) rather than using overly broad CSP rules.

### For Spec 019 Phase 2 (Featured Posts Automation)

1. **GA4 Data API service account key** must be stored as a GitHub Actions secret (`GA4_SERVICE_ACCOUNT_KEY` or similar).
2. **Use Viewer role** for the service account — read-only access to reporting data.
3. **Rotate the key periodically** or use Workload Identity Federation if supported by the GitHub Actions workflow.

## Sources

- [GA4 Measurement ID Guide (MeasureSchool)](https://measureschool.com/ga4-measurement-id/)
- [Measurement Protocol Reference (Google Developers)](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference)
- [Securing GA4: Mitigating Spam (thyngster.com)](https://www.thyngster.com/securing-google-analytics-4-ga4-mitigating-spam-and-protecting-measurement-ids-with-server-side-strategies)
- [GitHub Actions Secrets Best Practices (Blacksmith)](https://www.blacksmith.sh/blog/best-practices-for-managing-secrets-in-github-actions)
- [Ads.txt Guide (IAB Tech Lab)](https://iabtechlab.com/ads-txt/)
- [Pay Up, Or We'll Make Google Ban Your Ads (Krebs on Security)](https://krebsonsecurity.com/2020/02/pay-up-or-well-make-google-ban-your-ads/)
- [Privacy Policy for Google AdSense (Termly)](https://termly.io/resources/articles/privacy-policy-for-google-adsense/)
- [EthicalAds Privacy](https://www.ethicalads.io/blog/2021/10/do-the-ads-on-your-site-respect-privacy/)
- [Google Consent Mode v2 (CookieYes)](https://www.cookieyes.com/blog/google-consent-mode-v2/)
- [GA4 Access and Data-Restriction Management (Google)](https://support.google.com/analytics/answer/9305587)
