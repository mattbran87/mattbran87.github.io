# Checklist: [Feature Name]

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

- [ ] Create feature branch (e.g., `feature/NNN-feature-name`)
- [ ] Implement changes per tasks.md — commit after each completed task
- [ ] Update affected files list in spec.md
- [ ] Self-review code for quality and conventions
- [ ] Get sign-off to move to Testing

## Phase 3: Testing

- [ ] Verify each acceptance criterion in spec.md
- [ ] Test edge cases and error scenarios
- [ ] Test on local dev server (`bundle exec jekyll serve`)
- [ ] Validate HTML output in `_site/`
- [ ] Provide user testing plan (if manual/visual testing needed)
- [ ] Complete user testing plan together with user
- [ ] Document any issues found in notes.md
- [ ] Get sign-off to move to Acceptance

## Phase 4: Acceptance

- [ ] Final review against spec requirements
- [ ] Confirm all acceptance criteria are met
- [ ] Update spec.md status to Completed
- [ ] Update tasks.md — mark all tasks done
- [ ] Fill in completion notes in spec.md
- [ ] Merge feature branch to master
- [ ] Delete feature branch (local and remote)
