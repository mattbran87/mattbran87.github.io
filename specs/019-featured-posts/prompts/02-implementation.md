# Prompt: Implementation

Read the feature spec at `specs/019-featured-posts/spec.md` and all supporting documents in that directory — especially `tasks.md` and `decisions.md`.

## Objectives

1. Create a feature branch (e.g., `feature/019-featured-posts`)
2. Implement the feature according to the task breakdown in `tasks.md`
3. Follow decisions recorded in `decisions.md`
4. Commit after completing each task — each commit is one logical unit of work
5. Update task statuses in `tasks.md` as you complete each one
6. Record any implementation notes or surprises in `notes.md`
7. Update `checklist.md` as items are completed

## Constraints

- Follow the project conventions in `CLAUDE.md`
- Only implement what is defined in the spec — do not add unrequested features
- Do not merge to master — the feature branch is merged after Acceptance

## Checkpoint Rule (mandatory)

**Never guess — always surface.** You must pause and check in with the user whenever:

- A task uncovers a problem not anticipated during planning (unexpected dependency, missing data, conflicting requirements)
- The implementation is deviating from the planned approach in `tasks.md`
- A decision needs to be made that isn't covered in `decisions.md`
- A task is significantly more complex than expected

When pausing, explain what you found, what the options are, and what you recommend. Wait for the user's direction before continuing. If a task needs to be split into subtasks, update `tasks.md` and confirm with the user.

## Session Handoff (mandatory)

Update the **Last Session** block at the top of `tasks.md`:
- **When starting each task** — record the date, task number, and what you're about to do
- **When ending a session** — record where you stopped, relevant context, and what the next session should do first

This ensures the next session can pick up exactly where you left off, even if this session ends unexpectedly. The block is overwritten each time, not appended.

## Template Check (on resume)

If resuming an in-progress spec, compare the spec's files against `specs/_template/` for any process-critical template changes (e.g., new required sections like the SME Finding Tracker in `notes.md`). Adopt process-critical changes; structural improvements are optional. Flag any differences to the user.

## Deliverables

- [ ] Feature branch created
- [ ] All Implementation tasks in `tasks.md` marked complete
- [ ] One commit per completed task on the feature branch
- [ ] Affected files list updated in `spec.md`
- [ ] Implementation notes captured in `notes.md`
- [ ] Any new decisions recorded in `decisions.md`
- [ ] Implementation items checked off in `checklist.md`
- [ ] Last Session block updated in `tasks.md`
- [ ] Phase History updated in `spec.md`

## When Done

Update the Last Session block with final status. Summarize what was implemented and flag anything that needs attention during Testing.
