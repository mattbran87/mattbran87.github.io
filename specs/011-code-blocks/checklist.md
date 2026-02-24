# Checklist: Code Block Enhancements

## Phase 1: Research & Planning

### Stage 1: Research
- [x] Read and understand the spec
- [x] Research approaches and document findings in notes.md
- [x] Identify open questions
- [x] Document approaches and tradeoffs in decisions.md

### Research Discussion (mandatory)
- [x] Present findings, recommendation, and implementation strategy to user
- [x] Discuss and resolve open questions with user
- [x] Get user approval to proceed to planning

### Stage 2: Planning
- [x] Record decisions from discussion in decisions.md
- [x] Break down work into tasks in tasks.md
- [x] Get sign-off to move to Implementation

## Phase 2: Implementation

- [x] Create feature branch (e.g., `feature/011-code-blocks`)
- [x] Implement changes per tasks.md — commit after each completed task
- [x] Pause and check in with user on any unanticipated problems or deviations
- [x] Update affected files list in spec.md
- [x] Self-review code for quality and conventions
- [x] Get sign-off to move to Testing

## Phase 3: Testing

### Stage 1: Claude Verification & SME Audits
- [x] Verify each acceptance criterion in spec.md
- [x] Test edge cases and error scenarios
- [x] Test on local dev server (`bundle exec jekyll serve`)
- [x] Validate HTML output in `_site/`
- [x] Run required SME audits (Accessibility, QA)
- [x] Follow bug fix flow for any issues (document → ask user → fix or batch)

### Stage 2: User Testing
- [x] Provide user testing plan (if manual/visual testing needed)
- [x] Complete user testing plan together with user
- [x] Document any issues found in notes.md
- [x] Get sign-off to move to Acceptance

## Phase 4: Acceptance

- [x] Final review against spec requirements
- [x] Confirm all acceptance criteria are met
- [x] Update spec.md status to Completed
- [x] Update tasks.md — mark all tasks done
- [x] Fill in structured completion notes in spec.md (all 5 sections)
- [x] Update docs/lessons-learned.md if any reusable lessons emerged
- [x] Flag any lessons that require rule/convention changes to user
- [x] Merge feature branch to master
- [x] Delete feature branch (local and remote)
- [x] Verify GitHub Actions deploy succeeded — user verified manually (gh CLI not available)
- [x] Spot-check live site at production URL — user verified manually
