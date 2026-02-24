---
description: Bootstrap a new project with CLAUDE.md, docs, specs, and custom commands
allowed-tools: Read, Write, Edit, Glob, Grep, WebFetch, WebSearch
---

# Project Init

Set up the spec-driven development framework for a project. This creates the full infrastructure — project context, coding conventions, workflow rules, spec templates, and custom commands.

Works for both new and existing projects. The analysis step adapts all subsequent discussions to what already exists.

---

## Step 0: Project Analysis

Analyze the project before asking the user anything. This step is silent — gather information, then present findings.

### 0a. Project Detection

Scan the repository to understand what exists:

**Project fundamentals:**
- Git status — is this a repo? What branch? Any remotes configured?
- Language and framework detection — look for manifest files:
  - `package.json` (Node/JS/TS — check for framework: Next.js, React, Vue, Svelte, etc.)
  - `Gemfile` (Ruby — check for Rails, Jekyll, Sinatra, etc.)
  - `requirements.txt` / `pyproject.toml` / `setup.py` (Python — check for Django, Flask, FastAPI, etc.)
  - `go.mod` (Go), `Cargo.toml` (Rust), `pom.xml` / `build.gradle` (Java/Kotlin), `composer.json` (PHP)
  - `*.sln` / `*.csproj` (.NET)
- Project structure — map the top-level directories (`src/`, `lib/`, `app/`, `tests/`, `docs/`, `public/`, etc.)
- Existing documentation — `README.md`, `CONTRIBUTING.md`, `docs/` directory, inline doc patterns

**Existing tooling:**
- CI/CD — `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, `.circleci/`, etc.
- Linters and formatters — `.eslintrc`, `.prettierrc`, `rubocop.yml`, `ruff.toml`, `.editorconfig`, etc.
- Test runners — detect from config files or manifest scripts (`jest`, `pytest`, `rspec`, `vitest`, etc.)
- Package manager — `npm`, `yarn`, `pnpm`, `bun`, `bundler`, `pip`, `poetry`, `cargo`, etc.

**Framework files:**
- `CLAUDE.md`
- `docs/` contents — `code-guidelines.md`, `workflows.md`, `changelog.md`, `lessons-learned.md`, `sme-orchestration.md`
- `specs/` contents — `roadmap.md`, `_template/`, any numbered spec directories (count completed vs. in-progress)
- `.claude/commands/` contents — list all custom commands found

### 0b. Present Findings

Summarize what was found in a clear report to the user. Group into:

1. **Project profile** — language, framework, structure, team size indicators
2. **Existing tooling** — CI/CD, linting, testing, formatting already in place
3. **Existing documentation** — what's already documented and where
4. **Framework status** — which framework files exist, if any

### 0c. Determine Path

Based on the findings, take one of three paths:

**Path A: Fresh project** (no framework files, little or no existing code)
- Tell the user: "This looks like a fresh project. I'll walk you through full setup."
- Proceed to Step 1.

**Path B: Existing project, no framework** (codebase exists but no `CLAUDE.md`, `specs/`, etc.)
- Tell the user: "I see an existing project. I'll set up the spec-driven framework around what's already here."
- Pre-fill context from the analysis — don't re-ask what's already obvious (tech stack, project structure).
- Proceed to Step 1, skipping questions the analysis already answered.

**Path C: Framework already installed** (some or all framework files exist)
- Report which framework files were found and their state (e.g., "5 completed specs, roadmap with 12 features, 3 SME commands").
- Present options:
  - **Fresh start** — Overwrite everything. Warn that completed spec directories and accumulated knowledge (`changelog.md`, `lessons-learned.md`) contain project history that cannot be regenerated.
  - **Update** — Preserve project history and accumulated knowledge (`changelog.md`, `lessons-learned.md`, `retrospectives/`, completed spec directories, existing roadmap entries). Rebuild through discussion: `CLAUDE.md`, `docs/code-guidelines.md`, `docs/workflows.md`, `docs/sme-orchestration.md`, `specs/_template/`, `.claude/commands/`. During Steps 1-4, reference existing files to carry forward what still applies. During Step 5, merge rather than replace.
  - **Abort** — Stop. Suggest `/brainstorm` if they want to add features, or explain they can re-run `/project-init` later.
- **Wait for the user's choice** before proceeding. Do not start Step 1 until they've decided.

---

## Step 1: Project Discussion

Build on what Step 0 discovered. Don't re-ask what the analysis already answered — confirm it and fill gaps.

### For Path A (fresh project) — ask everything:

- What is this project? What are you building?
- What's the tech stack? (languages, frameworks, hosting)
- Who is the audience?
- What's the long-term vision?
- Is this a solo project or a team? (affects workflow complexity)
- What does deployment look like? (hosting provider, CI/CD, manual vs. automated)

### For Path B (existing project) — confirm and extend:

- Present what the analysis detected: "This looks like a [framework] project using [language] with [tooling]. Is that right?"
- Let the user correct anything that's wrong
- Then ask only what the analysis couldn't determine:
  - Who is the audience?
  - What's the long-term vision?
  - Solo or team?
  - Is the current project structure intentional, or would you reorganize if starting fresh?
  - Are there areas of the codebase that are messy, outdated, or need attention?
  - Any existing conventions that aren't documented but should be preserved?

### For Path C (framework update) — focus on what's changing:

- Summarize the existing project profile from the current `CLAUDE.md`
- Ask: "What's changed? What's not working about the current setup?"
- Focus the discussion on gaps and pain points rather than re-establishing basics

## Step 2: Convention Discussion

Establish coding standards for the project. For existing projects, detect conventions already in use before asking — document reality, then refine.

### 2a. Detect Existing Conventions (Path B and C)

Before asking questions, analyze the codebase for conventions already in practice:

- **Indentation** — tabs vs. spaces, width (read a sample of files)
- **Naming patterns** — camelCase, snake_case, kebab-case for files, variables, functions, classes
- **File organization** — how are files grouped? By type, feature, domain?
- **Import/require style** — absolute vs. relative paths, ordering conventions
- **Comment patterns** — JSDoc, docstrings, inline comments, or minimal commenting
- **Error handling** — try/catch patterns, error boundaries, result types
- **Linter/formatter config** — read `.eslintrc`, `.prettierrc`, `rubocop.yml`, `ruff.toml`, `.editorconfig`, etc. — these are explicit convention decisions already made
- **Test patterns** — file naming (`*.test.js`, `*_spec.rb`), structure, assertion style
- **Git conventions** — read recent commit messages for style (conventional commits, imperative, etc.)

Present findings: "Here are the conventions I see in the codebase." Let the user confirm, correct, or add to them.

### 2b. Discuss and Fill Gaps

Walk through each area. For Path A, discuss everything. For Path B/C, focus on what the analysis didn't cover or where the codebase is inconsistent.

**Code style:**
- Indentation, line length, trailing commas, semicolons, quote style
- Naming conventions for files, directories, variables, functions, classes, constants
- File organization principles

**Language-specific conventions:**
- Documentation style (JSDoc, docstrings, RDoc, GoDoc, etc.)
- Error handling approach
- Type usage (TypeScript strictness, type hints, etc.)
- Import ordering and grouping

**Asset conventions** (if applicable):
- CSS methodology (BEM, utility-first, CSS modules, styled-components, etc.)
- Image handling (optimization, naming, directory structure)
- JavaScript patterns (module style, state management, etc.)

**Version control:**
- Branching strategy (feature branches, trunk-based, gitflow)
- Commit message format (conventional commits, imperative mood, etc.)
- What gets committed vs. gitignored

**Priorities:**
- Ask: "Which conventions matter most to you? What should Claude enforce strictly vs. follow loosely?"
- This determines what goes into `code-guidelines.md` as rules vs. preferences

## Step 3: Workflow Discussion

Configure the spec-driven development workflow. The spec system is the core of this framework — every project gets it. What varies is the weight of the process around it.

### 3a. Propose a Starting Point

Based on what you know from Steps 0-1 (project type, team size, complexity), propose one of three workflow tiers as a starting point. Present all three so the user can choose, but highlight the recommended one.

**Lightweight** — best for: solo side projects, small tools, content sites
- 2 phases: Planning → Implementation
- Planning: brief research, task breakdown in `tasks.md`, user sign-off before building
- Implementation: build, test inline, commit per task
- No formal testing phase — verification happens during implementation
- Change tiers: minor (direct change + changelog) and full spec only
- No SME commands
- Spec documents: `spec.md`, `tasks.md`, `notes.md`

**Standard** — best for: solo production apps, personal projects with longevity, small teams
- 3 phases: Research & Planning → Implementation → Testing & Acceptance
- Research & Planning: investigate approaches, document findings, conversation checkpoint with user, then task breakdown
- Implementation: build per task breakdown, commit per task, pause-and-check-in rule for deviations
- Testing & Acceptance: verify acceptance criteria, user walkthrough, deploy verification
- Change tiers: minor (direct + changelog), mini-spec (discuss then build), full spec
- Optional SME commands for relevant domains
- Spec documents: `spec.md`, `tasks.md`, `checklist.md`, `notes.md`, `decisions.md`

**Full** — best for: team projects, production applications, complex domains
- 4 phases: Research & Planning → Implementation → Testing → Acceptance
- Research & Planning: deep investigation, SME consultations, conversation checkpoint, detailed task breakdown
- Implementation: build per task breakdown, commit per task, pause-and-check-in rule, session handoff tracking
- Testing: separate phase — Claude verification, SME audits, then user testing plan walked through together
- Acceptance: final review, deploy verification, retrospective
- Change tiers: minor, mini-spec, full spec (with strict boundaries)
- SME commands for all relevant domains, with orchestration rules
- Spec documents: full set with phase prompts — `spec.md`, `tasks.md`, `checklist.md`, `notes.md`, `decisions.md`, `prompts/01-04`
- Additional: lessons learned pipeline, session handoff protocol, retrospectives

### 3b. Customize the Details

Once the user picks a tier (or asks to mix and match), walk through each aspect:

**Spec phases and checkpoints:**
- Which phases does the project need? (minimum: planning + implementation)
- Where should Claude pause for user sign-off? (at minimum: before implementation starts)
- Should there be a conversation checkpoint in planning where Claude presents findings and waits for discussion before writing the task breakdown?

**Change tiers:**
- How should small changes be handled? (direct change + changelog entry, or always a spec?)
- Is there a middle tier needed for multi-file changes that aren't full features?
- What's the boundary between tiers? (number of files? user-facing impact? architectural change?)

**Quality gates:**
- What checks happen between phases? Options:
  - User sign-off only
  - Automated checks (linting, tests, build verification)
  - SME consultations (which domains, which phases?)
  - Deploy verification before acceptance is complete

**Testing approach:**
- Does the project have automated tests? Should specs include writing tests?
- Manual testing — user walkthrough checklists?
- What does "done" look like for verification?

**Bug fix flow during testing:**
- When a bug is found during testing: fix immediately, or batch all issues and fix together?
- How are bug fixes tracked? (notes.md, separate issues, inline in checklist?)

**Documentation:**
- What gets documented per spec? (decisions, research notes, both?)
- Changelog — what format, what change types?
- Lessons learned — per-feature retrospective, or only for notable learnings?
- Retrospectives — after every feature, after milestone groups, or never?

**Session management:**
- Does the project need session handoff tracking in `tasks.md`? (recommended for complex features or multi-session work)
- Template check on resume — should Claude compare active specs against `_template/` for process changes?

### 3c. SME Commands

Domain expert commands that act as specialists during the spec workflow. The framework includes default SMEs and recommends additional ones based on the project.

**What SMEs do:** Custom slash commands invoked via the Skill tool. They provide expert review at specific phases — architectural guidance during planning, convention enforcement during implementation, audits during testing. Each SME has a focused domain and knows when to participate.

**Default SMEs (included in every project):**

| SME | Domain | Why it's default |
|-----|--------|-----------------|
| `/qa-sme` | Code quality, convention enforcement, audits | Every project benefits from consistent quality checks against its own documented conventions |

**Recommended SMEs — propose based on project analysis:**

Recommend SMEs based on what Steps 0-1 revealed. Present recommendations with reasoning. Examples:

| If the project has... | Recommend | Reason |
|----------------------|-----------|--------|
| A web frontend (HTML output) | `/accessibility-sme` | WCAG compliance, keyboard navigation, screen readers |
| A public-facing website | `/seo-sme` | Technical SEO, structured data, content strategy |
| CSS/SCSS files | `/css-design-sme` | CSS methodology, responsive patterns, visual consistency |
| A specific framework (Jekyll, React, Rails, etc.) | `/[framework]-sme` | Framework-specific best practices, architecture, gotchas |
| An API (REST, GraphQL) | `/api-sme` | API design, versioning, error handling, documentation |
| A database | `/database-sme` | Schema design, query optimization, migrations |
| Auth or sensitive data | `/security-sme` | OWASP, auth patterns, data protection, input validation |
| Performance-sensitive workloads | `/performance-sme` | Profiling, optimization, caching, load patterns |

**Discussion flow:**
1. Present the default (`/qa-sme`) as included
2. List your recommendations with reasoning: "Based on what I see, I'd recommend these SMEs..."
3. Ask if the user wants to add, remove, or skip any
4. For each accepted SME, briefly confirm its scope — what it reviews, during which phases
5. Ask if there are other domains not listed that the user wants covered

**If SMEs are accepted (more than just `/qa-sme`):**
- Discuss whether to create an orchestration doc (`docs/sme-orchestration.md`) defining:
  - Which SMEs are required vs. optional per phase
  - Invocation order (e.g., framework SME before accessibility SME)
  - Conflict resolution when SMEs disagree
- For lightweight/standard tiers with few SMEs, orchestration may be overkill — a simple list in `CLAUDE.md` may suffice

## Step 4: Roadmap Discussion

Build the initial feature roadmap. Adapt the discussion based on the project path.

### For Path A (fresh project):

1. Start with the big picture:
   - What's the minimum viable version? What does "usable" look like?
   - What are the most important things to build first?
   - What can wait until later?
2. Brainstorm features together. For each feature:
   - Short name (becomes the spec directory name, e.g., `001-user-auth`)
   - 1-3 sentence description — what it does and why it matters
   - Dependencies on other features
   - Rough size estimate: small (1-8 tasks), medium (8-25 tasks), large (needs breakdown into sub-specs)
3. Group features into natural clusters (e.g., "Foundation", "Core Features", "Polish & UX")
4. Prioritize within and across groups — what's the build order?
5. Flag any features that sound large enough to need a `/brainstorm feature` session before work begins

### For Path B (existing project):

1. Understand the current state:
   - What's already built and working?
   - What's partially built or broken?
   - What's the most painful gap right now?
2. Ask about the user's goals:
   - Are you adding new features, improving what exists, or both?
   - What would have the most impact for users right now?
   - Is there tech debt that should be addressed before new features?
3. Build the roadmap with a "foundation first" mindset:
   - If the codebase needs cleanup or structure before new features, those specs come first
   - Group into: "Stabilize" (fix/improve existing), "Build" (new features), "Polish" (UX, performance, etc.)
4. For each feature: same format as Path A (name, description, dependencies, size estimate)

### For Path C (framework update):

1. Read the existing `specs/roadmap.md`
2. Ask what's prompting the update:
   - Priorities shifted?
   - New features needed?
   - Existing features need rescoping?
3. Update the roadmap with changes — add, reprioritize, regroup, or remove features
4. This is lighter than Path A/B — the roadmap already exists, we're refining it

### Roadmap format

Each feature in the roadmap should include:
- **Spec number** — next available (`001-`, `002-`, etc.)
- **Name** — short, descriptive, kebab-case
- **Description** — 1-3 sentences
- **Dependencies** — which spec numbers must complete first (if any)
- **Group** — which cluster it belongs to
- **Status** — Not Started, In Progress, Completed

## Step 5: Scaffold

After all discussions are complete, create the project infrastructure. Everything generated must reflect the decisions made in Steps 1-4 — the chosen workflow tier, the conventions discussed, the SMEs selected, and the roadmap built.

**Before writing any files**, present the user with a summary of what will be created. List every file and a one-line description of its purpose. Wait for confirmation before writing.

### 5a. Core Files (always created)

These files form the foundation of the framework. Every project gets them.

**`CLAUDE.md`** — The project's instruction file for Claude. Must include:
- Project overview (from Step 1)
- Commands reference (build, serve, test, deploy — from Step 0 analysis and Step 1)
- Project structure (directory map with descriptions)
- Content/file conventions (naming, front matter, placement rules)
- Theme/framework specifics (if applicable)
- Code guidelines summary (reference to `docs/code-guidelines.md`)
- Lessons learned reference (reference to `docs/lessons-learned.md`)
- Change tiers with clear boundaries (from Step 3)
- Custom commands table — utility commands and SME commands (from Step 3c)
- Spec engineering workflow — phases, checkpoints, rules, conventions (from Step 3)
- Git workflow — branching strategy, commit conventions (from Step 2)
- Dependencies — how to add/update them (from Step 0 analysis)
- Deployment — how it works, how to verify (from Step 1)
- Build exclusions — what doesn't ship to production

**`docs/code-guidelines.md`** — Full coding standards from Step 2. Organized by language/domain. Clearly marks rules (must follow) vs. preferences (should follow).

**`docs/workflows.md`** — All workflow processes from Step 3. Includes: content workflow (if applicable), incident/hotfix process, dependency update checklist, spec revision process, retrospective process, branch cleanup.

**`docs/changelog.md`** — Starter changelog. Include the project's change types (from Step 3 change tier discussion), date format, and an initial entry for the project init.

**`docs/lessons-learned.md`** — Empty starter with category headings relevant to the project's domain (e.g., "Build & Deploy", "Framework Gotchas", "Performance", "Testing").

**`specs/roadmap.md`** — Populated with features from Step 4. Includes groupings, dependencies, and status for each feature.

### 5b. Spec Template (always created, adapted to workflow tier)

The spec template must match the workflow tier chosen in Step 3. Only include documents and sections relevant to the chosen phases.

**Lightweight tier** (`specs/_template/`):
- `spec.md` — requirements, acceptance criteria, status
- `tasks.md` — task breakdown, session tracking
- `notes.md` — research findings, implementation notes
- `prompts/01-planning.md`
- `prompts/02-implementation.md`

**Standard tier** (`specs/_template/`):
- `spec.md` — requirements, acceptance criteria, status
- `tasks.md` — task breakdown, session tracking
- `checklist.md` — phase-gated checklist (3 phases)
- `notes.md` — research findings, implementation notes
- `decisions.md` — decision log with rationale
- `prompts/01-research-planning.md`
- `prompts/02-implementation.md`
- `prompts/03-testing-acceptance.md`

**Full tier** (`specs/_template/`):
- `spec.md` — requirements, acceptance criteria, status
- `tasks.md` — task breakdown, session handoff tracking
- `checklist.md` — phase-gated checklist (4 phases)
- `notes.md` — research findings, implementation notes
- `decisions.md` — decision log with rationale
- `prompts/01-research-planning.md`
- `prompts/02-implementation.md`
- `prompts/03-testing.md`
- `prompts/04-acceptance.md`

**Phase prompt content:** Each prompt file must be a self-contained instruction that tells Claude to read the spec, work within that phase's boundaries, update tracking files, and request sign-off before advancing. Include SME invocation instructions in the relevant phase prompts if SMEs were configured.

### 5c. Custom Commands (always created, adapted to project)

**Always include:**
- `.claude/commands/project-init.md` — this command (copy from the framework)
- `.claude/commands/brainstorm.md` — roadmap planning and feature deep dives
- `.claude/commands/plan-next.md` — review roadmap, recommend next feature to work on
- `.claude/commands/qa-sme.md` — code quality and convention enforcement (default SME)

**Include if applicable:**
- `.claude/commands/content-creator.md` — if the project involves written content (blogs, docs sites, CMS)
- `.claude/commands/<sme>.md` — one command per SME accepted in Step 3c
- `docs/sme-orchestration.md` — if multiple SMEs were configured and orchestration was discussed

### 5d. Path-Specific Behavior

**Path A (fresh project):**
- Create all files from scratch
- Content is generated entirely from the Step 1-4 discussions

**Path B (existing project):**
- Create all framework files, but tailor `CLAUDE.md` to reference the existing project structure, existing tooling, and existing conventions detected in Step 0
- Do not reorganize or modify existing project files — the framework wraps around what exists
- Add framework directories (`docs/`, `specs/`, `.claude/commands/`) alongside existing structure

**Path C — Fresh start:**
- Same as Path A, but warn before overwriting each existing file
- Delete framework files that are no longer relevant (e.g., SME commands that were removed)

**Path C — Update:**
- Preserve: `docs/changelog.md`, `docs/lessons-learned.md`, `docs/retrospectives/`, completed spec directories, existing roadmap entries in `specs/roadmap.md`
- Rebuild: `CLAUDE.md`, `docs/code-guidelines.md`, `docs/workflows.md`, `specs/_template/`, `.claude/commands/`
- Merge: update preserved files only where the discussions produced changes (e.g., new change types in changelog, new features in roadmap)

### 5e. Verification

After all files are written:
1. List every file created or modified
2. Confirm the spec template matches the chosen workflow tier
3. Confirm `CLAUDE.md` references all custom commands and workflows correctly
4. Confirm `specs/roadmap.md` has all features from Step 4
5. Tell the user: "Run `/plan-next` to start working on the first feature."

## Output

A fully scaffolded project ready for spec-driven development. The user should be able to run `/plan-next` and begin work on the first feature immediately.

---

## Conversation Guidelines

**Pacing:**
- Step 0 is silent — gather information, then present. No questions until the findings are ready.
- Steps 1-4 are conversational — one topic area at a time. Don't dump all questions at once.
- Step 5 is execution — present the plan, get confirmation, then write files.
- Don't rush to scaffold. All discussion steps must complete before any files are created.
- Each step should end with a clear summary of what was decided before moving to the next.

**Tone:**
- Let the user lead. This is their project — suggest and advise, don't dictate.
- Ask questions, don't assume. If something is vague, ask clarifying questions before making decisions.
- When recommending (workflow tier, SMEs, roadmap priorities), explain your reasoning. Let the user override.
- Be honest about tradeoffs. If the user wants a lightweight workflow but the project is complex, say so — but respect their choice.

**Adaptiveness:**
- Scale to the project. A personal side project doesn't need the same ceremony as a production application.
- Build on what exists. For Path B/C, never re-ask what the analysis already answered.
- If the user gives short answers, don't push for more detail than they want to provide. Work with what you have.
- If the user wants to skip a step or combine steps, accommodate it. The steps are a guide, not a rigid sequence.

**Quality:**
- Every file written in Step 5 must contain real, project-specific content — not placeholder text or TODOs.
- `CLAUDE.md` is the most important output. It must be thorough enough that a new Claude session can work on the project with no additional context.
- Spec templates must be self-contained. A user should be able to copy the template, fill in the spec, and feed a phase prompt to Claude without needing to reference other documentation.
- Custom commands must be functional immediately — correct `allowed-tools`, accurate descriptions, working instructions.

$ARGUMENTS
