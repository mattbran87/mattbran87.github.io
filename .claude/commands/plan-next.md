---
allowed-tools: Read, Glob, Grep
description: Reviews the project roadmap and recommends what feature to work on next
---

# Planning Session: What to Work on Next

Read the feature roadmap at `specs/roadmap.md` and all active feature specs in the `specs/` directory.

## Objectives

1. Review the current state of the roadmap:
   - Which features are completed?
   - Which features are in progress? What phase are they in?
   - Which features are not started?
2. Identify the next feature(s) to work on based on:
   - Priority order from the Feature Queue
   - Dependency requirements (check the Dependencies section)
   - Natural groupings that could be worked on together
3. Check for any blockers or open issues from in-progress features that need resolution before new work begins
4. Present a recommendation to the user:
   - Which feature to start next and why
   - Any features that could be combined or done in sequence for efficiency
   - Any dependencies that need to be completed first
   - Any decisions needed from the user before work can begin

## Process

1. Read `specs/roadmap.md` for the full feature list, priorities, groupings, and dependencies
2. Scan `specs/` for any existing feature directories and check their `spec.md` for current status and phase
3. **Check for missing retrospectives:** Compare completed natural groupings in the roadmap against `docs/retrospectives/`. If a group is fully completed but has no retrospective file, flag it as a blocker before recommending new work.
4. Summarize the project state
5. Recommend next steps

## Output

Provide a clear summary:
- **Retrospective Check** — flag any completed roadmap groups missing a milestone retrospective in `docs/retrospectives/`. Recommend completing the retro before starting new features.
- **Lessons Learned Check** — confirm `docs/lessons-learned.md` is up to date. If a retrospective was recently completed, verify its actionable items have been added to the lessons-learned document.
- **Project Status** — completed, in progress, and upcoming features
- **Recommendation** — which feature to start next with rationale
- **Prep Needed** — any decisions or setup required before kicking off the spec
- **Suggested Action** — create the spec directory and begin Research & Planning, or resolve blockers first

$ARGUMENTS
