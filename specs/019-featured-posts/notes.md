# Notes: Featured Posts

## SME Finding Tracker

All SME findings across every phase, with disposition. Add rows as findings come in.

| # | Phase | SME | Finding | Recommendation | Disposition |
|---|-------|-----|---------|----------------|-------------|
| S1 | Research | Jekyll | `post.slug` is title-only (no date). `where` filter is the correct matching approach. | Use slug field with `where` filter; wrap in `size > 0` guard | Adopted → D5 |
| S2 | Research | Jekyll | Empty/missing data file returns nil — `for` loop over nil is safe, no build error | Wrap in `size > 0` guard matching existing sidebar pattern | Adopted → Task |
| S3 | Research | Jekyll | No performance concern — 3 × N comparisons per page render, negligible at current scale | No action needed for Phase 1 | N/A |
| S4 | Research | A11y | h2 heading is correct — consistent with sidebar section pattern | Use h2 for Featured Posts heading | Adopted → Task |
| S5 | Research | A11y | Date should be outside the link to keep link text concise | Keep date outside link in `<time>` element | Overridden by D4 (no date) |
| S6 | Research | A11y | `<ul role="list">` is correct — matches existing sidebar pattern | Use `<ul role="list">` for the post list | Adopted → Task |
| S7 | Research | A11y | No additional ARIA needed — h2 headings distinguish sidebar sections | No extra ARIA attributes | Adopted → Task |
| S8 | Research | QA | AC #2 placement wording inconsistent — "above Tags" vs. "above Recent Posts" | Clarify to "below About, above Recent Posts" | Fixed in spec.md |
| S9 | Research | QA | No AC for invalid slug handling | Add AC for silently skipping unmatched slugs | Fixed in spec.md |
| S10 | Research | QA | Duplicate slugs in data file would render duplicate entries | Low risk for 3 manual entries; document as edge case | N/A |
| S11 | Testing | A11y | All checks pass — heading, links, semantics, keyboard, ARIA, contrast, degradation | None — WCAG AA compliant | N/A |
| S12 | Testing | QA | All checks pass — 0 errors, 0 warnings, 0 info across all files | None — clean pass | N/A |

**Disposition values:** Adopted → D# (decision), Adopted → Task #, Deferred, Overridden by D#, Fixed in [commit], N/A

---

## Research & Planning

### Findings

#### Jekyll SME — Research
- **Finding:** `post.slug` is the title portion of the filename only (no date prefix). The `where` filter on `site.posts` is the correct Liquid pattern for matching. Empty/missing data files return nil — safe to loop over with no build error.
- **Recommendation:** Use `slug` field in data file. Wrap include in `size > 0` guard. No performance concern at current scale.

#### Accessibility SME — Research
- **Finding:** h2 heading is correct for sidebar sections. No additional ARIA needed — headings alone distinguish sections. `<ul role="list">` matches existing pattern. Date recommendation (outside link in `<time>`) superseded by user decision to omit dates entirely.
- **Recommendation:** Follow existing sidebar markup pattern. Title-only links are accessible as-is.

#### QA SME — Spec Review
- **Finding:** AC #2 had inconsistent placement wording ("above Tags" vs. "above Recent Posts"). No AC for invalid slug handling. Duplicate slugs would render duplicates but low risk for 3 manual entries.
- **Recommendation:** Fixed placement wording. Added AC for slug validation. Duplicate slug edge case accepted as low risk.

### Open Questions

- None — all questions resolved.

### References

- [Prior research: `docs/featured-posts-research.md`](../../docs/featured-posts-research.md)

---

## Implementation

- [Notes captured during implementation — gotchas, surprises, workarounds]

---

## Testing

### Stage 1: Claude Verification & SME Audits

#### Accessibility SME — Testing Audit
- **Finding:** All checks pass — heading hierarchy, link text, semantic markup, keyboard accessibility, ARIA usage, focus indicators, color contrast, graceful degradation. 0 issues.
- **Recommendation:** None — WCAG AA compliant.

#### QA SME — Testing Audit
- **Finding:** All checks pass across all 3 files — file naming, indentation, Liquid comments, whitespace control, BEM compliance, escaping, HTML output quality, build. 0 errors, 0 warnings, 0 info.
- **Recommendation:** None — clean pass.

### Stage 2: User Testing

- All 5 user testing items pass: sidebar visibility, link navigation, section order, dark mode, responsive layout

### Issues Found

- None found during Stage 1.

---

## Acceptance

- [Final review notes, user feedback, sign-off details]
