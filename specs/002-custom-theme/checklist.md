# Checklist: Custom Theme

## Phase 1: Research & Planning

- [x] Read and understand the spec
- [x] Research approaches and document findings in notes.md
- [x] Resolve open questions
- [x] Record key decisions in decisions.md
- [x] Break down work into tasks in tasks.md
- [x] Get sign-off to move to Implementation

## Phase 2: Implementation

- [x] Create feature branch (e.g., `feature/002-custom-theme`)
- [x] Implement changes per tasks.md — commit after each completed task
- [x] Update affected files list in spec.md
- [x] Self-review code for quality and conventions
- [x] Get sign-off to move to Testing

## Phase 3: Testing

- [x] Verify each acceptance criterion in spec.md
- [x] Test edge cases and error scenarios
- [ ] Test on local dev server (`bundle exec jekyll serve`) — deferred: needs browser for AC16/AC19
- [x] Validate HTML output in `_site/`
- [x] Document any issues found in notes.md
- [ ] Get sign-off to move to Acceptance

## Phase 4: Acceptance

- [ ] Final review against spec requirements
- [ ] Confirm all acceptance criteria are met
- [ ] Update spec.md status to Completed
- [ ] Update tasks.md — mark all tasks done
- [ ] Fill in completion notes in spec.md
- [ ] Merge feature branch to master
- [ ] Delete feature branch (local and remote)
