# Checklist: Social Sharing

## Phase 1: Research & Planning

### Stage 1: Research
- [ ] Read and understand the spec
- [ ] Research approaches and document findings in notes.md
- [ ] Identify open questions
- [ ] Document approaches and tradeoffs in decisions.md

### Research Discussion (mandatory)
- [ ] Present findings, recommendation, and implementation strategy to user
- [ ] Discuss and resolve open questions with user
- [ ] Get user approval to proceed to planning

### Stage 2: Planning
- [ ] Record decisions from discussion in decisions.md
- [ ] Break down work into tasks in tasks.md
- [ ] Get sign-off to move to Implementation

## Phase 2: Implementation

- [ ] Create feature branch (e.g., `feature/020-social-sharing`)
- [ ] Implement changes per tasks.md — commit after each completed task
- [ ] Pause and check in with user on any unanticipated problems or deviations
- [ ] Update affected files list in spec.md
- [ ] Self-review code for quality and conventions
- [ ] Get sign-off to move to Testing

## Phase 3: Testing

### Stage 1: Claude Verification & SME Audits
- [ ] Verify each acceptance criterion in spec.md
- [ ] Test edge cases and error scenarios
- [ ] Test on local dev server (`bundle exec jekyll serve`)
- [ ] Validate HTML output in `_site/`
- [ ] Run required SME audits (Accessibility, QA)
- [ ] Follow bug fix flow for any issues (document → ask user → fix or batch)

### Stage 2: User Testing
- [ ] Provide user testing plan (if manual/visual testing needed)
- [ ] Complete user testing plan together with user
- [ ] Document any issues found in notes.md
- [ ] Get sign-off to move to Acceptance

## Phase 4: Acceptance

- [ ] Final review against spec requirements
- [ ] Confirm all acceptance criteria are met
- [ ] Update spec.md status to Completed
- [ ] Update tasks.md — mark all tasks done
- [ ] Fill in structured completion notes in spec.md (all 5 sections)
- [ ] Update docs/lessons-learned.md if any reusable lessons emerged
- [ ] Flag any lessons that require rule/convention changes to user
- [ ] Merge feature branch to master
- [ ] Delete feature branch (local and remote)
- [ ] Verify GitHub Actions deploy succeeded
- [ ] Spot-check live site at production URL
