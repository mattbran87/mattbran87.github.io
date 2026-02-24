# Checklist: Series Support

## Phase 1: Research & Planning

- [x] Read and understand the spec
- [x] Research approaches and document findings in notes.md
- [x] Resolve open questions
- [x] Record key decisions in decisions.md
- [x] Break down work into tasks in tasks.md
- [x] Get sign-off to move to Implementation

## Phase 2: Implementation

- [x] Create feature branch (e.g., `feature/004-series-support`)
- [x] Implement changes per tasks.md — commit after each completed task
- [x] Update affected files list in spec.md
- [x] Self-review code for quality and conventions
- [x] Get sign-off to move to Testing

## Phase 3: Testing

- [x] Verify each acceptance criterion in spec.md
- [x] Test edge cases and error scenarios
- [x] Test on local dev server (`bundle exec jekyll serve`)
- [x] Validate HTML output in `_site/`
- [x] Document any issues found in notes.md
- [x] Get sign-off to move to Acceptance

## Phase 4: Acceptance

- [x] Final review against spec requirements
- [x] Confirm all acceptance criteria are met
- [x] Update spec.md status to Completed
- [x] Update tasks.md — mark all tasks done
- [x] Fill in completion notes in spec.md
- [x] Merge feature branch to master
- [x] Delete feature branch (local and remote)
