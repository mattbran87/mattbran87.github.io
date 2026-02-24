---
description: Brainstorm new features for the roadmap or deep dive into a specific feature
allowed-tools: Read, Glob, Grep, WebFetch, WebSearch
---

# Brainstorm Session

A conversational planning session for shaping what gets built and how. This is for generating and refining ideas — not for picking the next task from the queue (use `/plan-next` for that).

## Determine the Mode

**Commands:**
- `/brainstorm` or `/brainstorm project` → Project-Level Planning (default)
- `/brainstorm feature <name>` → Feature Deep Dive

**Auto-detection (when no keyword matches):**
1. If arguments name a specific feature → `feature`
2. Otherwise → `project`

If still unclear, ask the user which mode they want.

---

## Mode: Project — Project-Level Planning

Use when a roadmap exists and the user wants to brainstorm new features, reprioritize, or reorganize the roadmap. This works at the queue level — what are we building and in what order.

### Process

1. Read `specs/roadmap.md` for the current feature list, groupings, and dependencies
2. Read `docs/lessons-learned.md` for context on what's been learned
3. Scan `specs/` for completed and in-progress features to understand what's built
4. Start a conversation with the user:
   - What problems are you seeing? What's missing?
   - What feedback have you received?
   - What ideas are you considering?
   - Do any existing features need reprioritizing?
5. For each new feature idea, discuss:
   - What it does and why it matters
   - Where it fits in the priority order
   - Dependencies on existing features
   - Which natural grouping it belongs to (or if it starts a new group)
   - Whether it's small enough for a single spec — if it sounds large, recommend a `/brainstorm feature` session to scope it
6. If the user wants research before committing a feature to the roadmap, suggest creating a research doc in `docs/` (e.g., `docs/feature-name-research.md`) and linking it from the roadmap
7. Update `specs/roadmap.md` with approved changes

### Output

Updated `specs/roadmap.md` with new features, revised priorities, or reorganized groupings. New features get the next available spec number.

---

## Mode: Feature — Feature Deep Dive

Use to deeply explore a single feature. This could be an existing roadmap entry that needs scoping, a large feature that needs breakdown into sub-specs, or a brand new idea that needs definition before it goes on the roadmap.

### Process

1. Read `specs/roadmap.md` to check if the feature already exists
2. Read any existing research doc for the feature (check `docs/` for a research file)
3. Read `docs/lessons-learned.md` for relevant patterns
4. Start a conversation with the user:
   - What's the full scope of this feature?
   - What problem does it solve?
   - What does success look like?
   - What are the unknowns?

**If the feature needs scoping (new or underspecified):**
5. Define the feature together:
   - Core requirements vs. nice-to-haves
   - Technical approach (high level)
   - Dependencies on other features
   - Expected complexity (small/medium/large)
6. Write a clear description for the roadmap
7. If research is needed, create a research doc in `docs/`
8. Add or update the feature in `specs/roadmap.md`

**If the feature needs breakdown (too large for one spec):**
5. Identify the distinct pieces that could be built and shipped independently
6. For each sub-feature:
   - It should be independently valuable (ships something usable)
   - It should be small enough for the standard spec workflow (typically 8-25 tasks)
   - The first sub-feature should be the foundation everything else builds on
7. Define each sub-feature: clear name, focused description, dependencies
8. Discuss phasing — all in sequence, or can some be deferred?
9. Update `specs/roadmap.md`:
   - Replace the original feature with the sub-features (or keep the original as a grouping label)
   - Each sub-feature gets its own spec number
   - Add a natural grouping for the sub-features
   - Update dependencies

### Output

Either a well-defined feature added/updated in the roadmap, or a large feature decomposed into multiple specs with their own numbers, grouping, and dependency chain.

---

## Conversation Guidelines

- **Let the user lead.** This is their product — suggest and advise, don't dictate.
- **Ask questions, don't assume.** If a feature idea is vague, ask clarifying questions before adding it.
- **Think about dependencies.** When a new feature is proposed, consider what it needs to exist first.
- **Consider scope.** If a feature sounds large during `project` mode, recommend a `feature` session.
- **Reference what exists.** When brainstorming, reference completed features and lessons learned to ground suggestions in the project's reality.
- **Don't create spec directories.** This session updates the roadmap and creates research docs only. Spec directories are created when work begins (via `/plan-next` or manually).
- **Scale to the project.** A personal project needs less ceremony than a production application. Match the workflow complexity to the project's needs.

$ARGUMENTS
