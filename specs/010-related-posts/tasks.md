# Tasks: Related Posts

> **Status:** Completed

## Task Breakdown

### Phase 1: Research & Planning

**Stage 1: Research**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Research relatedness approaches (LSI, tag-scoring, plugins) | Done | Pure Liquid tag-scoring confirmed |
| 1.2 | Consult required SMEs (Jekyll, A11y, QA) and optional SMEs (CSS/Design) | Done | 4 SMEs consulted, 8 decisions documented |

**Research Discussion** — Present findings to user and get approval before planning.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.R | Research discussion with user | Done | User approved direction |

**Stage 2: Planning**

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.3 | Record decisions in decisions.md | Done | D1–D8 documented |
| 1.4 | Break down implementation tasks | Done | 4 implementation tasks defined |

### Phase 2: Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Create `_related-posts.scss` partial and import in `main.scss` | Done | BEM block with design tokens |
| 2.2 | Create `_includes/related-posts.html` with tag-scoring algorithm | Done | Core feature — nested loops, string scoring, sort, post lookup, HTML output |
| 2.3 | Integrate include into `_layouts/post.html` | Done | After `</article>`, before schema includes |
| 2.4 | Build verification and self-review | Done | Build clean, all conventions verified. D8 tiebreaker updated (URL-based, not recency) |

### Phase 3: Testing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Verify all 12 acceptance criteria | Done | All 12 AC pass |
| 3.2 | Run Accessibility SME audit | Done | 0 errors, 0 warnings — full pass |
| 3.3 | Run QA SME audit | Done | 0 errors, 0 warnings, 0 info — full pass |
| 3.4 | User testing plan | Done | 9/9 items confirmed by user |

### Phase 4: Acceptance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Final review against spec | Done | All requirements and AC met |
| 4.2 | Update spec status and completion notes | Done | Mark completed, document deviations/lessons |
| 4.3 | Merge feature branch to master | Done | Delete branch after merge |

## Summary

- **Total tasks:** 13
- **Completed:** 13
- **Remaining:** 0
