---
description: Bootstrap a new project with CLAUDE.md, docs, specs, and custom commands
allowed-tools: Read, Write, Edit, Glob, Grep, WebFetch, WebSearch
---

# Project Init

A one-time scaffolding session for new projects. This creates the full project skeleton — product planning, coding conventions, workflow rules, and development infrastructure.

---

## Step 0: Existing Project Detection

Before starting, check for existing project infrastructure:

1. **Scan for existing files:**
   - `CLAUDE.md`
   - `docs/` directory (and its contents: `code-guidelines.md`, `workflows.md`, `changelog.md`, `lessons-learned.md`, `sme-orchestration.md`)
   - `specs/` directory (and its contents: `roadmap.md`, `_template/`, any numbered spec directories)
   - `.claude/commands/` directory (and its contents)

2. **If nothing exists** → proceed to Step 1 (fresh project).

3. **If any exist**, report what was found and present the user with three options:

   - **Fresh start** — Overwrite everything. All existing files in `CLAUDE.md`, `docs/`, `specs/_template/`, and `.claude/commands/` will be replaced. Warn the user that this is destructive — completed spec directories and `docs/changelog.md` / `docs/lessons-learned.md` contain project history that cannot be regenerated.
   - **Update** — Keep project history and accumulated knowledge intact. Preserve: `docs/changelog.md`, `docs/lessons-learned.md`, `docs/retrospectives/`, completed spec directories, `specs/roadmap.md` (existing entries). Rebuild through discussion: `CLAUDE.md`, `docs/code-guidelines.md`, `docs/workflows.md`, `docs/sme-orchestration.md`, `specs/_template/`, `.claude/commands/`. During Steps 1-4, reference the existing files to carry forward what still applies. During Step 5, merge rather than replace — update preserved files only if the discussions produced changes.
   - **Abort** — Stop and suggest `/brainstorm` if they want to add features, or explain they can re-run `/project-init` later.

4. **Wait for the user's choice** before proceeding. Do not start Step 1 until they've decided.

---

## Step 1: Project Discussion

Start a conversation with the user to understand the project:

- What is this project? What are you building?
- What's the tech stack? (languages, frameworks, hosting)
- Who is the audience?
- What's the long-term vision?
- Is this a solo project or a team? (affects workflow complexity)

## Step 2: Convention Discussion

Discuss and establish coding standards:

- Code style — indentation, naming conventions, file organization
- Language-specific conventions — comments, documentation, error handling
- Asset management — images, CSS methodology, JavaScript patterns
- Version control — branching strategy, commit conventions
- What matters most to the user? What do they want enforced?

## Step 3: Workflow Discussion

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

## Step 4: Roadmap Discussion

Brainstorm initial features:

- What are the most important things to build first?
- What's the minimum viable version?
- What can wait for later?
- For each feature: short name, 1-3 sentence description, dependencies
- Prioritize together, group into natural clusters

## Step 5: Scaffold

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

## Output

A fully scaffolded project ready to start development. The user should be able to run `/plan-next` and begin work on the first feature immediately.

---

## Conversation Guidelines

- **Let the user lead.** This is their product — suggest and advise, don't dictate.
- **Ask questions, don't assume.** If something is vague, ask clarifying questions before making decisions.
- **Scale to the project.** A personal project needs less ceremony than a production application. Match the workflow complexity to the project's needs.
- **Don't rush to scaffold.** All four discussion steps should happen before any files are created.

$ARGUMENTS
