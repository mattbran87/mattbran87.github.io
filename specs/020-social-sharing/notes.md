# Notes: Social Sharing

## SME Finding Tracker

All SME findings across every phase, with disposition. Add rows as findings come in.

| # | Phase | SME | Finding | Recommendation | Disposition |
|---|-------|-----|---------|----------------|-------------|
| S1 | Research | Jekyll | Use `page.url \| absolute_url` for share URL, `page.title \| url_encode` for title | Standard Jekyll pattern, already used in schema includes | Adopted → D1 |
| S2 | Research | Jekyll | Place include inside `<article>` after `.post__content`, before `.post__nav` | Natural "just finished reading" position | Adopted → D2 |
| S3 | Research | Jekyll | `url_encode` encodes spaces as `+` not `%20`; all platforms accept both | No workaround needed | N/A |
| S4 | Research | Jekyll | `absolute_url` uses localhost during dev; production URLs correct | Document for Testing to avoid false bug reports | N/A |
| S5 | Research | Jekyll | Read from `page` directly, no include parameters | Matches existing includes (related-posts, series-toc) | Adopted → D3 |
| S6 | Research | Jekyll | Add `share: false` front matter opt-out flag | Lightweight guard, one line of Liquid | Adopted → D4 |
| S7 | Research | A11y | Use `<nav aria-label="Share this post">` wrapper | Correct landmark, distinguishes from other navs | Adopted → D5 |
| S8 | Research | A11y | Icon + visible text labels, not icon-only | WCAG 2.5.3 Label in Name, matches project convention | Adopted → D6 |
| S9 | Research | A11y | Visible text as accessible name for Copy button, aria-live region for state | Matches validated code-copy.js pattern | Adopted → D7 |
| S10 | Research | A11y | Web Share show/hide via feature detection is fine for a11y | Progressive enhancement, not content hiding | N/A |
| S11 | Research | A11y | Add visually-hidden "(opens in new tab)" on external share links | Helps screen reader users, minimal cost | Adopted → D8 |
| S12 | Research | CSS/Design | Flexbox row with gap and wrap, not Bootstrap button group | btn-group is for toggle actions, not independent links | Adopted → D9 |
| S13 | Research | CSS/Design | BEM: `.social-share` block with `__list`, `__item`, `__link`, `__button`, `__icon` | Shared styles for link/button via grouped selector | Adopted → D10 |
| S14 | Research | CSS/Design | Ghost-style: transparent bg, border, muted text, pill radius, top border separator | Subtle, doesn't compete with content | Adopted → D11 |
| S15 | Research | CSS/Design | Existing dark mode tokens sufficient, no new overrides | All tokens already have dark mode values | N/A |
| S16 | Research | CSS/Design | Follow existing hover/focus/reduced-motion patterns | transition-fast, focus-visible outline, prefers-reduced-motion | Adopted → D12 |
| S17 | Research | CSS/Design | Mirror code-copy `--copied` modifier for Copy button success state | Same tokens, same approach | Adopted → D7 |
| S18 | Research | CSS/Design | Keep icon + text at all widths, flex-wrap handles mobile | No breakpoint logic needed | Adopted → D6 |
| S19 | Research | QA | Add `share: false` opt-out to requirements and acceptance criteria | Missing from spec, won't be tested otherwise | Adopted → D4 |
| S20 | Research | QA | Document exact URL pattern per platform for testability | "Correct" is subjective without reference table | Adopted → spec update |
| S21 | Research | QA | Add JS module to requirements explicitly | Copy + Web Share need `social-share.js` + `main.js` import | Adopted → spec update |
| S22 | Research | QA | Fill affected files during Planning | Placeholder still present | Adopted → Planning |
| S23 | Research | QA | Liquid filters verified: `url_encode`, `absolute_url`, `escape` all available | Per lessons-learned checklist | N/A |
| S24 | Testing | A11y | VoiceOver may strip list semantics when `list-style: none` is applied to `<ul>` | Add `role="list"` to the `<ul>` element | Fixed in cc7b0bf |
| S25 | Testing | QA | `var` used instead of `const` in social-share.js; code-copy.js uses `const` | Change `var` to `const` for consistency | Fixed in cc7b0bf |
| S26 | Testing | QA | `share: false` guard absent in compact variant; post-card buttons render for opted-out posts | Add share parameter to compact variant | Fixed in cc7b0bf |
| S27 | Testing | QA | External share links use `rel="noopener"` but not `rel="noreferrer"` | Add `noreferrer` for privacy consistency | Fixed in cc7b0bf |

**Disposition values:** Adopted → D# (decision), Adopted → Task #, Deferred, Overridden by D#, Fixed in [commit], N/A

---

## Research & Planning

### Findings

#### Jekyll SME — Research
- **Finding:** Share URLs should use `page.url | absolute_url` for the full URL and `page.title | url_encode` for the title. This is the standard Jekyll pattern already used in schema includes.
- **Recommendation:** Use these filters directly. No special handling needed.

- **Finding:** The include should be placed inside `<article class="post">` after the `.post__content` div and before the `.post__nav` block. This keeps it within the semantic article boundary at the natural "just finished reading" position.
- **Recommendation:** Place `{% include social-share.html %}` between `.post__content` and `.post__nav` in `post.html`.

- **Finding:** `url_encode` encodes spaces as `+` not `%20`. All target platforms (Twitter, LinkedIn, Reddit, HN) accept both. `absolute_url` produces localhost URLs during development — production URLs are correct.
- **Recommendation:** No workarounds needed. Note the localhost behavior for Testing phase.

- **Finding:** The include should read from `page` directly (no parameters), matching the existing pattern used by `related-posts.html` and `series-toc.html`. Add a `share: false` front matter opt-out flag.
- **Recommendation:** No parameters. Guard with `{% unless page.share == false %}`.

#### Accessibility SME — Research
- **Finding:** The wrapper should be `<nav aria-label="Share this post">` — correct landmark element, distinguishes from primary nav and post nav via label.
- **Recommendation:** Use `<nav>` with descriptive `aria-label`.

- **Finding:** Buttons should use icon + visible text labels (not icon-only). This satisfies WCAG 2.5.3 (Label in Name) and matches the project's "prefer visible text over aria-label" convention. SVGs get `aria-hidden="true"`.
- **Recommendation:** Every link/button shows both an SVG icon and visible text.

- **Finding:** Copy Link button should follow the validated code-copy.js pattern: visible text as accessible name ("Copy link" → "Copied!"), separate `aria-live` region for state announcements, no `aria-label`.
- **Recommendation:** Mirror code-copy.js pattern exactly.

- **Finding:** Web Share API show/hide via feature detection is acceptable — progressive enhancement, not content hiding. The other share options provide full capability.
- **Recommendation:** Render hidden by default, reveal via JS when `navigator.share` is available.

- **Finding:** External share links should include `<span class="visually-hidden">(opens in new tab)</span>` for screen reader users.
- **Recommendation:** Add visually-hidden new-tab indicator on all external share links.

#### CSS/Design SME — Research
- **Finding:** Flexbox with `gap` and `flex-wrap: wrap` is correct. Bootstrap `.btn-group` is wrong for independent share links. Use a `<ul>` inside the nav for screen reader item count.
- **Recommendation:** Flexbox layout with `<ul>` list structure.

- **Finding:** BEM structure: `.social-share` block with `__list`, `__item`, `__link`, `__button`, `__icon`, `__button--copied`, `__button--native`. Shared styles for `__link` and `__button` via grouped selector.
- **Recommendation:** Use proposed BEM naming.

- **Finding:** Ghost-style buttons: transparent background, `1px solid var(--color-border)`, `var(--color-muted)` text, `var(--border-radius-pill)` radius, `var(--font-size-sm)`. Top border separator matching `post__nav` pattern.
- **Recommendation:** Subtle, muted design that doesn't compete with content.

- **Finding:** Existing dark mode CSS custom properties handle everything. No new tokens or dark mode overrides needed.
- **Recommendation:** Use existing tokens exclusively.

- **Finding:** Follow existing hover/focus/reduced-motion patterns: `transition-fast`, `focus-visible` outline, `prefers-reduced-motion: reduce` override.
- **Recommendation:** Match established project patterns.

- **Finding:** Keep icon + text at all widths. `flex-wrap` handles mobile naturally. No breakpoint-based text hiding.
- **Recommendation:** No responsive media queries for layout. Flex wrap is sufficient.

#### QA SME — Spec Review
- **Finding:** Missing acceptance criterion for `share: false` opt-out flag. Without an AC, it won't be tested.
- **Recommendation:** Add to both Requirements and Acceptance Criteria.

- **Finding:** "Correct sharing URL" AC is subjective without reference. Each platform has different URL patterns and parameter names.
- **Recommendation:** Reference the URL pattern table from the research doc for testability.

- **Finding:** JS module (`social-share.js`) not mentioned in requirements despite being needed for Copy Link and Web Share.
- **Recommendation:** Add explicit requirement for the JS module and `main.js` import.

- **Finding:** Liquid filters verified: `url_encode`, `absolute_url`, `escape` all available in Jekyll. No risk per lessons-learned checklist.
- **Recommendation:** No action needed.

### Open Questions

All open questions resolved during SME consultations. No remaining questions for user discussion.

### References

- [Social Sharing Research](../../docs/social-sharing-research.md)
- [Twitter Web Intents](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent)
- [LinkedIn Share URL](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin)
- [Web Share API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- [Clipboard API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)

---

## Implementation

- No deviations from the planned approach. All 13 decisions held up.
- Tasks 2.2 and 2.3 were implemented in a single commit since both variants live in the same include file (per D13).
- Full variant: platform share links (Twitter/X, LinkedIn, Reddit, Email) work without JS. Copy Link and Web Share buttons use `hidden` attribute, revealed by JS.
- Compact variant: entire container uses `hidden` attribute. JS reveals the container, then reveals Web Share only if `navigator.share` is available.
- Email `mailto:` body text is pre-encoded ("Check%20out%20this%20article%3A%20") rather than using `url_encode` to avoid double-encoding.
- Build verified: production URLs correct in output HTML, both variants rendering on appropriate pages.
- **Deviation from D2:** User requested share buttons move from after `.post__content` to inside `<header>` below `.post__meta`. Decision D2 revised.
- Added `padding-bottom: var(--spacing-xl)` to `.social-share` per user feedback.

---

## Testing

### Stage 1: Claude Verification & SME Audits

#### Accessibility SME — Testing Audit

12 checks performed. **11 Pass, 1 Minor.**

- **Finding (A2):** VoiceOver may strip list semantics when `list-style: none` is applied to `<ul>`. Low impact since `<nav>` landmark provides context.
- **Recommendation:** Consider adding `role="list"` to the `<ul>`. One-line fix if desired.

All other checks passed: nav landmark with aria-label, icon + visible text (WCAG 2.5.3), new tab indication, hidden attribute progressive enhancement, keyboard accessibility, aria-live region, copy button label change, compact JS-only acceptable, compact uses div to avoid landmark pollution, reduced motion.

#### QA SME — Testing Audit

20 checks performed. **0 Errors, 2 Warnings, 3 Info.**

- **Warning (Q7/Q19):** `var` used in social-share.js where code-copy.js uses `const`. Change to `const` for consistency.
- **Info (Q11):** `share: false` guard absent in compact variant — post-card buttons render for opted-out posts. Confirm if intended.
- **Info (Q20):** External share links lack `rel="noreferrer"`. Consider adding for privacy consistency.
- **Info (Q16):** Hard-coded padding values (0.375rem) — acceptable, matches code-copy pattern.

All other checks passed: file naming, SCSS import, JS import, BEM naming, CSS tokens, JSDoc, URL patterns match research doc, Liquid filters, Liquid comments, no third-party scripts, progressive enhancement, target/rel on links, filter chain order, build verification, layout consistency.

### Stage 2: User Testing

All 12 items passed:
- Visual: full variant, compact variant (homepage + tag archive), dark mode, mobile width — all pass
- Interaction: Copy Link (full + compact with multiple cards), platform links, email, Web Share — all pass
- Keyboard: tab navigation with visible focus rings — pass
- Edge case: JS disabled graceful degradation — pass

### Issues Found

- **S25 (Warning):** `var` vs `const` in social-share.js — style inconsistency with code-copy.js
- **S24 (Minor):** VoiceOver list semantics with `list-style: none`
- **S26 (Info):** `share: false` not enforced on compact variant
- **S27 (Info):** Missing `rel="noreferrer"` on external share links

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
