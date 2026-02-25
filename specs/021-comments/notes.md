# Notes: Comments

## SME Finding Tracker

All SME findings across every phase, with disposition. Add rows as findings come in.

| # | Phase | SME | Finding | Recommendation | Disposition |
|---|-------|-----|---------|----------------|-------------|
| S1 | Research | Jekyll | Nested config under site.comments.giscus.* with provider field | Use nested structure matching jekyll-archives pattern | Adopted → D4 |
| S2 | Research | Jekyll | Place after </article> before related-posts, inside .container | Semantically correct — comments are not part of the article | Adopted → D9 |
| S3 | Research | Jekyll | No build issues with async script in includes | Liquid outputs script tag verbatim, no special handling | N/A |
| S4 | Research | Jekyll | page.comments works in post layout (not a loop context) | Use `unless page.comments == false` guard | Adopted → D8 |
| S5 | Research | Jekyll | No config exclusion needed for comments block | Config keys are data, not files — always available via site.* | N/A |
| S6 | Research | A11y | Use <section> with <h2> and aria-labelledby | Matches related-posts pattern, creates named landmark | Overridden by D5 — offcanvas panel has its own heading via Bootstrap |
| S7 | Research | A11y | No ARIA attributes needed on iframe — Giscus handles it | Giscus sets title="Comments" on its iframe internally | N/A |
| S8 | Research | A11y | Standard browser iframe keyboard nav applies | h2 headings provide skip-past landmarks for screen readers | N/A |
| S9 | Research | A11y | Omit section entirely when comments: false | No "comments disabled" message — silent omission like social-share | Adopted → D8 |
| S10 | Research | A11y | No action needed for GitHub sign-in prompt | Auth UX is Giscus/GitHub responsibility inside iframe | N/A |
| S11 | Research | QA | "Theme updates dynamically" criterion not verifiable as written | Rewrite with observable behavior and mechanism | Adopted → spec AC updated |
| S12 | Research | QA | Missing graceful degradation constraint for script failure | Add explicit criterion: no layout breakage or console errors | Adopted → spec AC updated |
| S13 | Research | QA | data-strict attribute choice not documented | Use data-strict="1" for new site; record as decision | Adopted → D3 |
| S14 | Research | QA | Affected files list incomplete — main.js clarification needed | New comments.js module + theme-toggle.js sync | Adopted → spec updated |
| S15 | Research | QA | Placement description inconsistent with Jekyll SME | Update requirement to match after </article> placement | Adopted → D9 |
| S16 | Research | QA | data-emit-metadata not mentioned | Include in config with default "0" for documentation | Adopted → spec updated |
| S17 | Research | QA | crossorigin="anonymous" should be included | Standard security practice for third-party scripts | Adopted → spec updated |
| S18 | Testing | A11y | Implementation passes all WCAG checks | No errors or warnings; 1 info (no loading announcement) | N/A |
| S19 | Testing | QA | Missing Liquid comment on provider guard | Add comment before `if site.comments.provider` block | Fixed in 08cfd56 |

**Disposition values:** Adopted → D# (decision), Adopted → Task #, Deferred, Overridden by D#, Fixed in [commit], N/A

---

## Research & Planning

### Findings

#### Jekyll SME — Research
- **Finding:** Nested config under `site.comments.giscus.*` with a `provider` field is the best structure — matches the `jekyll-archives` pattern and allows future provider swaps.
- **Recommendation:** Access as `site.comments.giscus.repo`, etc. Guard include with `site.comments.provider == "giscus"`.

- **Finding:** Comments should go after `</article>` but before related-posts, inside `.container`. Comments are reader-generated content about the article — not part of the article itself.
- **Recommendation:** Place `{% include comments.html %}` between `</article>` and `{% include related-posts.html %}`.

- **Finding:** No build issues with `<script async>` in includes. Jekyll passes script tags through verbatim. No special escaping needed for config values since they're site-owner-controlled.
- **Recommendation:** Use Liquid output tags directly in data attributes. Optional `| escape` on category name as defensive measure.

- **Finding:** `page.comments` works correctly in the post layout context. `page` refers to the current post being rendered. This is the same mechanism used for `page.toc`, `page.share`, `page.series`.
- **Recommendation:** Use `{% unless page.comments == false %}` — comments enabled by default when key is absent (nil != false).

- **Finding:** No config exclusion needed. The `exclude` list applies to files/directories, not config keys. Giscus config values (repo ID, category ID) are public.
- **Recommendation:** No changes to exclude list. Place config after `social` block in `_config.yml`.

#### Accessibility SME — Research
- **Finding:** Use `<section>` with `<h2>` heading and `aria-labelledby`. The heading hierarchy on post pages is h1 (title) → h2 (content headings, related posts). Comments is a peer section at the h2 level.
- **Recommendation:** `<section class="post-comments" aria-labelledby="comments-heading">` with `<h2 id="comments-heading">Comments</h2>`.

- **Finding:** No ARIA attributes needed from our side. Giscus creates its iframe dynamically and sets `title="Comments"` internally. The iframe's internal content follows GitHub's accessibility standards.
- **Recommendation:** Focus on the wrapper section and heading — that's our accessibility responsibility.

- **Finding:** Standard browser iframe keyboard navigation applies. Users Tab into the iframe and interact with Giscus contents. The h2 headings (Comments, Related Posts) provide landmarks for screen reader users to skip past the iframe.
- **Recommendation:** No custom keyboard handling needed.

- **Finding:** When comments are disabled via `comments: false`, omit the entire section. No "comments are disabled" message — silent omission matches social-share pattern and avoids noise for screen readers.
- **Recommendation:** Render nothing when `page.comments == false`.

- **Finding:** No accessibility action needed for the "Sign in with GitHub" prompt. It's inside the iframe and is Giscus/GitHub's responsibility. GitHub-only auth is a product decision, not an accessibility gap.
- **Recommendation:** No action needed.

#### QA SME — Research
- **Finding:** The acceptance criterion "Theme updates dynamically when the user toggles dark/light mode" is not verifiable as written — the mechanism (postMessage to iframe) is unspecified.
- **Recommendation:** Rewrite as observable behavior: "When the user toggles dark/light mode, the Giscus iframe updates its theme within 1 second without a page reload." Add requirement for postMessage in theme-toggle.js.

- **Finding:** No requirement or acceptance criterion for graceful degradation when Giscus script fails to load (network error, ad blocker).
- **Recommendation:** Add constraint and acceptance criterion: "When Giscus script is blocked or fails to load, no layout breakage or console errors occur."

- **Finding:** `data-strict` attribute choice not documented. For a new site with no existing Discussions, `data-strict="1"` prevents accidental cross-matching.
- **Recommendation:** Use `data-strict="1"` and record as a decision.

- **Finding:** Affected files list potentially incomplete — unclear if `main.js` needs changes depending on where Giscus theme sync lives.
- **Recommendation:** Adding sync directly to `theme-toggle.js` click handler is simplest — no new module, no main.js change needed.

- **Finding:** Placement description in spec ("after post navigation") is ambiguous — reads as inside `<article>`. Jekyll SME recommends after `</article>`.
- **Recommendation:** Update requirement to specify after `</article>` and before related posts.

- **Finding:** `data-emit-metadata="0"` from research doc not mentioned in spec. Controls metadata postMessage events.
- **Recommendation:** Include in config with default "0" for documentation purposes.

- **Finding:** `crossorigin="anonymous"` should be included on the Giscus script tag — standard security practice for third-party scripts.
- **Recommendation:** Include in the template implementation.

### Open Questions

- [x] Config structure — resolved (S1: nested under site.comments.giscus.*)
- [x] Placement — resolved (S2: after </article>, before related-posts)
- [x] Semantic wrapper — resolved (S6: <section> with <h2> and aria-labelledby)
- [x] Front matter check — resolved (S4: page.comments works in post layout)
- [x] Dark mode sync mechanism — resolved (D10: explicit theme on injection + postMessage on toggle)
- [x] Actual Giscus config values — resolved (user provided repo_id and category_id from giscus.app)

### References

- [Giscus](https://giscus.app/)
- [Giscus GitHub Repository](https://github.com/giscus/giscus)
- [GitHub Discussions Documentation](https://docs.github.com/en/discussions)
- [Giscus set-config message API](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md)
- [`docs/commenting-system-research.md`](../../docs/commenting-system-research.md)

---

## Implementation

- No significant gotchas or surprises during implementation.

---

## Testing

### Stage 1: Claude Verification & SME Audits

#### Acceptance Criteria Verification

| # | Criterion | Result | Notes |
|---|-----------|--------|-------|
| AC1 | Comments pill button in social-share row | PASS | Renders as last `<li>` in list |
| AC2 | Clicking button opens offcanvas panel | PASS (code) | Bootstrap data attributes wired correctly; needs user visual confirmation |
| AC3 | Giscus loads on first open (lazy load) | PASS (code) | `show.bs.offcanvas` event triggers injection |
| AC4 | Subsequent opens reuse widget | PASS (code) | `loaded` flag prevents re-injection |
| AC5 | Pathname mapping with strict matching | PASS | Verified in `_site/` output |
| AC6 | `comments: false` hides button and panel | NEEDS TEST | No post currently uses this flag; logic correct in source |
| AC7 | Giscus theme matches site on first load | PASS (code) | `getGiscusTheme()` reads `data-bs-theme` at injection |
| AC8 | Theme toggle syncs Giscus iframe | PASS (code) | `postMessage` called on toggle click and OS change |
| AC9 | Accessible heading, focus trapping, ESC | PASS | `aria-labelledby`, `aria-label`, Bootstrap handles focus |
| AC10 | No layout regressions | NEEDS USER | DOM order correct; visual check needed |
| AC11 | Mobile viewports | NEEDS USER | Panel uses `min(28rem, 85vw)` |
| AC12 | Script failure = no breakage | PASS (code) | No layout dependency; `if (iframe)` guard |
| AC13 | Jekyll build passes | PASS | Clean build, no warnings |
| AC14 | Config in `_config.yml` | PASS | All values from config, not hardcoded |

#### Accessibility SME — Testing Audit
- **Finding:** Implementation is clean. Native HTML semantics used correctly (`<button>`, `<h2>`), Bootstrap handles focus trapping/ESC/focus restoration, disabled state omits elements entirely. No WCAG violations found.
- **Summary:** 0 errors, 0 warnings, 1 info (no loading state announcement — informational only, Giscus handles its own loading UI).

#### QA SME — Testing Audit
- **Finding (W1):** Missing Liquid comment on `if site.comments.provider == "giscus"` block in `_includes/comments.html`. All `if` blocks require explanatory comments per code guidelines.
- **Recommendation:** Add comment before the `if` block.
- **Disposition:** Fixed in commit 08cfd56.
- **Summary:** 0 errors, 1 warning (fixed), 0 info.

### Stage 2: User Testing

| # | Test | Result |
|---|------|--------|
| T1 | Comments button visible in social-share row | PASS |
| T2 | Offcanvas panel opens on click | PASS |
| T3 | Giscus widget loads inside panel | PASS |
| T4 | Close and reopen — no reload | PASS |
| T5 | Keyboard navigation | PASS |
| T6 | Dark mode sync — initial load | PASS |
| T7 | Dark mode sync — live toggle | PASS |
| T8 | No layout regressions | PASS |
| T9 | Mobile viewport | PASS |
| T10 | `comments: false` opt-out (Welcome to Jekyll) | PASS |

### Issues Found

- **W1 (QA):** Missing Liquid comment — fixed in 08cfd56
- **B1 (User):** `.btn-close` renders as checkbox — Bootstrap `close-button` partial not imported. Fixed in d90b56b.

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
