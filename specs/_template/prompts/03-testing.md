# Prompt: Testing

Read the feature spec at `specs/NNN-feature-name/spec.md` and all supporting documents in that directory.

## Objectives

1. Verify each acceptance criterion listed in `spec.md`
2. Test the feature on the local dev server (`bundle exec jekyll serve`)
3. Check for edge cases, broken links, layout issues, and regressions
4. Validate the generated HTML in `_site/`
5. Document any issues found in `notes.md` under the Testing section
6. Update `checklist.md` as items are completed

## Constraints

- Do NOT fix issues directly — document them first and confirm the fix approach
- Test against the acceptance criteria exactly as written
- If an acceptance criterion is ambiguous, flag it for clarification

## User Testing Plan (mandatory)

If any testing requires the user (e.g., visual checks, browser interaction, device testing, or anything Claude cannot verify autonomously), you **must** provide a detailed testing plan before proceeding. The plan should include:

1. **What to test** — specific pages, components, or interactions
2. **How to test it** — step-by-step instructions (what to click, type, navigate to)
3. **What to look for** — expected behavior and what constitutes a pass or fail
4. **Environments** — browsers, screen sizes, or devices to check

Present this plan as a checklist. Walk through each item together with the user, checking them off as you go. Do not skip ahead or mark user-testing items complete without the user's confirmation.

## Deliverables

- [ ] Each acceptance criterion verified and documented
- [ ] Edge cases tested
- [ ] User testing plan provided (if applicable) and completed with user
- [ ] Issues documented in `notes.md` with steps to reproduce
- [ ] Testing tasks in `tasks.md` marked complete
- [ ] Testing items checked off in `checklist.md`
- [ ] Phase History updated in `spec.md`

## When Done

Provide a test report: what passed, what failed, and what needs to be fixed before Acceptance.
