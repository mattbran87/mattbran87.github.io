---
description: Brainstorm features, build the project roadmap, or break down large features
allowed-tools: Read, Glob, Grep, WebFetch, WebSearch
---

# Brainstorm Session

A conversational planning session for shaping what gets built and how. This is for generating and refining ideas — not for picking the next task from the queue (use `/plan-next` for that).

## Determine the Mode

**Commands:**
- `/brainstorm init` → Project Bootstrap (first-time setup)
- `/brainstorm project` or `/brainstorm` (no args) → Project-Level Planning (default)
- `/brainstorm feature <name>` → Feature Deep Dive

**Auto-detection (when no keyword matches):**
1. If `CLAUDE.md` and `specs/roadmap.md` do not exist → `init`
2. If arguments name a specific feature → `feature`
3. Otherwise → `project`

If still unclear, ask the user which mode they want.

---

## Mode: Init — Project Bootstrap

Use for first-time project setup. This is the full bootstrap — product planning AND development rules. Only used once per project.

### Step 1: Project Discussion

Start a conversation with the user to understand the project:

- What is this project? What are you building?
- What's the tech stack? (languages, frameworks, hosting)
- Who is the audience?
- What's the long-term vision?
- Is this a solo project or a team? (affects workflow complexity)

### Step 2: Convention Discussion

Discuss and establish coding standards:

- Code style — indentation, naming conventions, file organization
- Language-specific conventions — comments, documentation, error handling
- Asset management — images, CSS methodology, JavaScript patterns
- Version control — branching strategy, commit conventions
- What matters most to the user? What do they want enforced?

### Step 3: Workflow Discussion

Discuss and configure the development workflow:

- **Phases:** How structured should the process be? Options range from:
  - Lightweight: plan → build → review
  - Standard: research & planning → implementation → testing → acceptance (this project's model)
  - Custom: user-defined phases
- **Quality gates:** What checks happen between phases? (SME consultations, user sign-offs, automated checks)
- **Change tiers:** Does the project need multiple tiers? (minor changes, mini-specs, full specs)
- **Testing:** What testing approach? (manual, automated, user testing plans)
- **Documentation:** What gets documented? (decisions, notes, changelogs, retrospectives)
- **SME subagents:** Does the project benefit from domain expert consultations? Which domains? (accessibility, SEO, code quality, framework-specific, etc.)

Scale the workflow to the project — a personal blog doesn't need the same rigor as a production application.

### Step 4: Roadmap Discussion

Brainstorm initial features:

- What are the most important things to build first?
- What's the minimum viable version?
- What can wait for later?
- For each feature: short name, 1-3 sentence description, dependencies
- Prioritize together, group into natural clusters

### Step 5: Scaffold

After all discussions are complete, create the full project structure. Tailor the content of each file to the decisions made in Steps 1-4.

**Always create:**
- `CLAUDE.md` — project overview, commands, conventions, workflow rules
- `docs/code-guidelines.md` — coding standards from Step 2
- `docs/workflows.md` — workflow processes from Step 3
- `docs/changelog.md` — starter changelog with format and types
- `docs/lessons-learned.md` — empty starter with category headings
- `docs/retrospectives/` — empty directory
- `specs/roadmap.md` — populated with features from Step 4
- `specs/_template/` — full template set:
  - `spec.md`, `tasks.md`, `checklist.md`, `notes.md`, `decisions.md`
  - `prompts/01-research-planning.md`, `prompts/02-implementation.md`, `prompts/03-testing.md`, `prompts/04-acceptance.md`

**Create if applicable (based on Step 3 decisions):**
- `.claude/commands/` — utility commands (`plan-next.md`, `brainstorm.md`, `content-creator.md`)
- `.claude/commands/<sme>.md` — SME commands for each domain the user wants
- `docs/sme-orchestration.md` — if SMEs are configured

All template content should reflect the workflow decisions — if the user chose 3 phases instead of 4, the templates should have 3 phases. If no SMEs, omit SME sections from prompts and checklists.

### Output

A fully scaffolded project ready to start development. The user should be able to run `/plan-next` and begin work on the first feature immediately.

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
