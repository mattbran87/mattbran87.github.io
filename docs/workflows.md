# Workflows

## Content Workflow

A lightweight process for blog post creation that does not require the spec engineering workflow.

### Target Audience

Intellectual workers and educated professionals. All content must be written at a **12th grade reading level minimum**.

### Drafting Modes

**Assisted Drafting** — use `/content-creator` to help outline and draft a post from a topic or rough notes.

**Self-Written Review** — write the draft yourself, then use `/content-creator` to review for quality, SEO, and grade level.

### Required Front Matter

Every post must include `tags` and `description`:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS -0600
tags: [tag1, tag2]
description: "Meta description for SEO (150-160 characters)"
---
```

`image` and `image_alt` are optional — use hero/featured images only when they add value to the post.

### Content Categories

Posts are organized **by topic**. Tags reflect the subject matter.

### Publishing Cadence

Publish when ready — no fixed schedule.

### Process

1. **Draft** — create the post in `_drafts/title-with-dashes.md` (either mode)
2. **Review** — use `/content-creator` to run the review checklist (13 items including grade level rating)
3. **Preview** — run `bundle exec jekyll serve --drafts` to review locally
4. **Publish** — move to `_posts/YYYY-MM-DD-title-with-dashes.md` with date prefix
5. **Commit and push** — post goes live via GitHub Actions

No changelog entry needed for new posts or content edits — these are the site's primary purpose.

## Mini-Spec Workflow

For changes that are bigger than a minor fix but don't warrant the full spec engineering workflow. Typically: process changes, workflow updates, shared infrastructure modifications, or documentation overhauls that touch 3+ files.

### When to Use

- The change touches 3 or more files
- The change modifies workflow, process, or shared infrastructure
- The change does NOT add a user-facing feature
- The change does NOT require researching multiple approaches

If the change affects site output, requires evaluating alternatives, or has acceptance criteria that need testing — use the full spec workflow instead.

### Process

1. **Discuss** — Claude presents the proposed change to the user: what, why, and which files
2. **Implement** — after user approval, make the changes
3. **Log** — add an expanded changelog entry in `docs/changelog.md` with:
   - **Type:** Process, Workflow, or Infrastructure
   - **Rationale:** why the change was made
   - **Summary:** what changed
   - **Files affected:** list of modified files

### Changelog Entry Format

```markdown
- **[Process]** Add mandatory research discussion checkpoint to Phase 1
  - Rationale: Research findings need user review before planning begins
  - Summary: Split Phase 1 into Research and Planning stages with a mandatory conversation gate
  - Files affected: `CLAUDE.md`, `specs/_template/prompts/01-research-planning.md`, `specs/_template/checklist.md`, `specs/_template/tasks.md`, `docs/sme-orchestration.md`
```

## Incident/Hotfix Workflow

When the live site is broken or has a critical issue, use the **spec engineering workflow** to document what happened and how it was fixed. This ensures incidents are thoroughly recorded for future reference.

### Process

1. Create a spec directory: `specs/NNN-hotfix-description/`
2. Fill in `spec.md` with:
   - **Goal:** what's broken and the immediate fix needed
   - **Background:** how the issue was discovered, impact, and urgency
   - **Requirements:** the specific fix
   - **Acceptance Criteria:** how to verify the fix works
3. Progress through all four phases (Research & Planning may be very short for obvious fixes)
4. The completed spec serves as a permanent incident record

### Naming Convention

Use the standard numbered prefix: `specs/NNN-hotfix-description/`

## Dependency Update Workflow

Run monthly to keep gems current. For security advisories, run immediately.

### Monthly Update Checklist

1. Create a branch: `deps/YYYY-MM-update`
2. Check current state: `bundle outdated`
3. Run update: `bundle update`
4. Review changes: `git diff Gemfile.lock`
5. Build locally: `bundle exec jekyll build` — check for errors or new warnings
6. Test locally: `bundle exec jekyll serve` — verify homepage, a post, and about page render correctly
7. Commit `Gemfile.lock` to the branch
8. Merge to `master`
9. Verify GitHub Actions deploy succeeds
10. Log in `docs/changelog.md` with type **Chore** and list of updated gems

### Security Advisory Process

Same checklist as monthly update but:

- Run immediately, do not wait for the monthly cycle
- Document the advisory details in the changelog entry (CVE number, affected gem, severity)
- If the fix requires code changes beyond `Gemfile.lock`, use the spec workflow instead

## Spec Revision/Amendment

When requirements change during an active feature:

1. **Pause** current phase work
2. **Return to Research & Planning** — update `spec.md` with revised requirements
3. Record the revision as a decision in `decisions.md` with context on what changed and why
4. Re-evaluate the task breakdown in `tasks.md` — add, remove, or modify tasks as needed
5. Get sign-off before resuming the phase that was paused

Do not amend a spec during Implementation, Testing, or Acceptance without going through this process. This prevents scope drift and ensures changes are deliberate and documented.

## Archival/Retrospective

### Per-Feature Mini-Retro

Completed as part of the Acceptance phase for every feature. Captured in `spec.md` under **Completion Notes**:

- What was delivered vs. what was planned
- What went well
- What didn't go well
- Lessons learned or process improvements to carry forward

### Milestone Review

Conducted when a **natural grouping** from the roadmap is completed (e.g., after all Foundation features, after all Content Organization features). Documented in a dedicated file: `docs/retrospectives/YYYY-MM-DD-group-name.md`.

A milestone review covers:

- Summary of features completed in the group
- Cross-feature patterns (recurring issues, common decisions, repeated blockers)
- Workflow effectiveness — what worked, what was too heavy, what was missing
- Process improvements to adopt for the next group
- Updated conventions to add to `CLAUDE.md` or `docs/code-guidelines.md`

**After completing a milestone review (mandatory):**

1. Extract reusable lessons and add them to [`docs/lessons-learned.md`](lessons-learned.md) under the appropriate categories with the retro as source. This is the living reference that phase prompts consult — retro insights only reach future features if they're captured there.
2. Review the "Process Improvements for Next Group" section. If any improvement requires a rule or convention change, update `CLAUDE.md`, `docs/code-guidelines.md`, or other process docs. Document what was updated.
3. If no lessons or rule changes are needed, note that explicitly in the retro.

## Branch Cleanup

After a feature branch has been merged into `master`:

- Delete the local branch: `git branch -d branch-name`
- Delete the remote branch: `git push origin --delete branch-name`
- Verify the branch no longer appears in `git branch -a`
