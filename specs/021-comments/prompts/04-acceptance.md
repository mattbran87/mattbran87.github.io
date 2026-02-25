# Prompt: Acceptance

Read the feature spec at `specs/NNN-feature-name/spec.md` and all supporting documents in that directory.

## Objectives

1. Final review of the feature against all spec requirements
2. Confirm every acceptance criterion in `spec.md` is met
3. Review all decisions in `decisions.md` to ensure they were followed
4. Verify the tasks summary in `tasks.md` reflects the completed work
5. Fill in the structured Completion Notes in `spec.md`
6. Merge to master and verify deployment
7. Update `checklist.md` as items are completed

## Constraints

- This is a review phase — only make changes to documentation files, not code
- If any acceptance criterion is NOT met, document what's missing and recommend returning to Implementation or Testing
- Be thorough — this is the final gate before marking the feature complete

## Completion Notes (mandatory)

Fill in the Completion Notes section in `spec.md` using the structured template. Every section must be addressed:

- **Delivered** — what was built (brief summary of the final implementation)
- **Deviations** — anything that changed from the original spec and why (or "None")
- **What Went Well** — process, tools, or decisions that worked effectively
- **What Didn't Go Well** — friction points, rework, surprises, or time sinks
- **Lessons Learned** — specific takeaways to carry forward to future features

## Knowledge Base Update Check

After filling in Completion Notes, review the Lessons Learned section and ask:

1. **Does any lesson apply to future features?** If yes, add it to `docs/lessons-learned.md` under the appropriate category with the spec number as source.
2. **Does any lesson require a rule or convention change?** If yes, flag it to the user and propose updates to `CLAUDE.md`, `docs/code-guidelines.md`, or other process docs.

If no reusable lessons emerged, note "No updates needed" and move on.

## Deploy Verification (mandatory)

After merging the feature branch to master:

1. Wait for the GitHub Actions deploy to complete (`gh run list --workflow=deploy.yml` or check the Actions tab)
2. Verify the live site at the production URL — spot-check the feature's key pages
3. If the deploy fails, document the failure and return to Implementation

**Acceptance is not complete until the deploy is verified.** The feature is not shipped until it's live.

## Deliverables

- [ ] All requirements verified against spec
- [ ] All acceptance criteria confirmed as met
- [ ] `spec.md` status updated to **Completed**
- [ ] `spec.md` completion date filled in
- [ ] `spec.md` Completion Notes filled in (all 5 sections)
- [ ] `tasks.md` status updated to **Completed** with final summary
- [ ] Phase History fully updated in `spec.md`
- [ ] Acceptance items checked off in `checklist.md`
- [ ] Feature branch merged to master
- [ ] Feature branch deleted (local and remote)
- [ ] GitHub Actions deploy verified
- [ ] Live site spot-checked

## When Done

Declare the feature complete with deploy verification confirmed, or identify what remains.
