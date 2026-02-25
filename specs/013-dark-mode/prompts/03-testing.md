# Prompt: Testing

Read the feature spec at `specs/013-dark-mode/spec.md` and all supporting documents in that directory. Also read `docs/lessons-learned.md` for known pitfalls to check during testing.

This phase has two stages. Complete Stage 1 (Claude verification + SME audits) before moving to Stage 2 (user testing).

---

## Stage 1: Claude Verification & SME Audits

### Objectives

1. Verify each acceptance criterion listed in `spec.md`
2. Test the feature on the local dev server (`bundle exec jekyll serve`)
3. Check for edge cases, broken links, layout issues, and regressions
4. Validate the generated HTML in `_site/`
5. Run required SME audits (Accessibility, QA, and any optional SMEs per `docs/sme-orchestration.md`)
6. Document any issues found in `notes.md` under the Testing section

### Constraints

- Test against the acceptance criteria exactly as written
- If an acceptance criterion is ambiguous, flag it for clarification

### Bug Fix Flow

When a bug or issue is found:

1. **Document it** in `notes.md` with steps to reproduce (always, regardless of severity)
2. **Present it** to the user with a severity assessment (trivial fix vs. significant rework)
3. **Ask the user:** fix now or continue testing?

**If the user says fix now:**
- Phase formally returns to Implementation
- Fix the issue and commit
- Log the round-trip in the Phase History table in `spec.md`
- Resume Testing where you left off (do not restart from the beginning)

**If the user says continue testing:**
- Finish all testing, then return to Implementation to batch-fix all issues
- Resume Testing after fixes are committed

---

## Stage 2: User Testing Plan (mandatory)

Only begin after Stage 1 is complete.

If any testing requires the user (e.g., visual checks, browser interaction, device testing, or anything Claude cannot verify autonomously), you **must** provide a detailed testing plan before proceeding. The plan should include:

1. **What to test** — specific pages, components, or interactions
2. **How to test it** — step-by-step instructions (what to click, type, navigate to)
3. **What to look for** — expected behavior and what constitutes a pass or fail
4. **Environments** — browsers, screen sizes, or devices to check

Present this plan as a checklist. Walk through each item together with the user, checking them off as you go. Do not skip ahead or mark user-testing items complete without the user's confirmation.

## Session Handoff (mandatory)

Update the **Last Session** block at the top of `tasks.md`:
- **When starting each task** — record the date, task number, and what you're about to do
- **When ending a session** — record where you stopped, relevant context, and what the next session should do first

## Template Check (on resume)

If resuming an in-progress spec, compare the spec's files against `specs/_template/` for any process-critical template changes. Adopt process-critical changes; structural improvements are optional. Flag any differences to the user.

## Deliverables

- [ ] Each acceptance criterion verified and documented
- [ ] Edge cases tested
- [ ] SME audits completed
- [ ] Bug fix flow followed for any issues found
- [ ] User testing plan provided (if applicable) and completed with user
- [ ] Issues documented in `notes.md` with steps to reproduce
- [ ] Testing tasks in `tasks.md` marked complete
- [ ] Testing items checked off in `checklist.md`
- [ ] Last Session block updated in `tasks.md`
- [ ] Phase History updated in `spec.md`

## When Done

Update the Last Session block with final status. Provide a test report: what passed, what failed, and what needs to be fixed before Acceptance.
