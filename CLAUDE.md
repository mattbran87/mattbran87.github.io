# CLAUDE.md - Development Guidelines

## Project Overview

Jekyll 4.4.1 blog using the Minima 2.5 theme. Static site hosted as HTML — no backend, no database.

## Commands

```bash
# Install dependencies
bundle install

# Run local dev server (http://localhost:4000) with live reload
bundle exec jekyll serve --livereload

# Build for production (output to _site/)
bundle exec jekyll build

# Build with drafts visible
bundle exec jekyll serve --drafts
```

**Important:** Changes to `_config.yml` require a server restart — they are not picked up by live reload.

## Project Structure

```
.github/
  workflows/
    deploy.yml   # GitHub Actions: build and deploy to GitHub Pages
_posts/          # Published blog posts (YYYY-MM-DD-title.md)
_drafts/         # Unpublished drafts (no date prefix needed)
_site/           # Generated output (gitignored, do not edit)
docs/            # Project documentation (code guidelines, etc.)
specs/           # Feature specs and development workflow documents
  _template/     # Copy to start a new feature spec
_config.yml      # Site-wide configuration
index.markdown   # Homepage
about.markdown   # About page
404.html         # Custom 404 page
Gemfile          # Ruby dependencies
```

## Content Conventions

### Blog Posts

- Location: `_posts/`
- Filename format: `YYYY-MM-DD-title-with-dashes.md`
- Must include front matter (tags and description are **required**):

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS -0600
tags: [tag1, tag2]
description: "Meta description for SEO (150-160 characters)"
---
```

### Drafts

- Location: `_drafts/`
- Filename format: `title-with-dashes.md` (no date prefix)
- Preview locally with `bundle exec jekyll serve --drafts`
- To publish: move to `_posts/` and add date prefix to filename

### Pages

- Place in project root (e.g., `about.markdown`)
- Include `layout: page` and a `permalink` in front matter

## Theme

Using **Minima 2.5** (gem-based theme). To customize:

- Override layouts by creating files in `_layouts/` (e.g., `_layouts/post.html`)
- Override includes by creating files in `_includes/`
- Override styles by creating `assets/main.scss` with `@import "minima";`
- Run `bundle info minima` to find the theme's source files for reference

Do not edit files inside the gem directly.

## Code Guidelines

See [`docs/code-guidelines.md`](docs/code-guidelines.md) for full details covering JavaScript (JSDoc), CSS/SCSS (BEM, custom properties), HTML/Liquid (semantic markup, error handling), Markdown, accessibility, and file organization conventions.

## Lessons Learned

See [`docs/lessons-learned.md`](docs/lessons-learned.md) for known pitfalls, validated patterns, and reusable lessons extracted from feature retrospectives. Consult during Research & Planning and Testing phases.

## Change Tiers

Not all changes require the full spec workflow. Choose the tier that matches the scope.

### Minor Changes

For small fixes, config tweaks, content edits, and other minor work:

- **Do not** create a spec directory — just make the change directly
- **Do** log the change in [`docs/changelog.md`](docs/changelog.md) with date, type, description, and affected files
- **Types:** Fix, Tweak, Config, Content, Docs, Chore
- This applies only to sessions that do not use the spec engineering workflow — if a spec is active, changes are tracked in that spec's documents instead

### Mini-Spec Changes

For work that touches 3+ files or modifies workflow/process/shared infrastructure — but does not add a user-facing feature and does not require research into multiple approaches.

- **Do not** create a spec directory or go through the 4-phase workflow
- **Do** discuss the change with the user before implementing (what, why, which files)
- **Do** log in [`docs/changelog.md`](docs/changelog.md) with an expanded entry: rationale, summary of what changed, and files affected
- **Types:** Process, Workflow, Infrastructure
- **Use full spec instead when:** the change affects site output, requires evaluating multiple approaches, or has acceptance criteria that need testing

### Full Spec

For user-facing features, significant architectural changes, and anything that requires research, SME consultation, and structured testing. See [Spec Engineering Workflow](#spec-engineering-workflow) below.

## Custom Commands

Available in `.claude/commands/`. Start a new session to pick up new or changed commands.

### SME Commands

See [`docs/sme-orchestration.md`](docs/sme-orchestration.md) for required/optional rules per phase, invocation order, and conflict resolution.

**Important:** SMEs are custom slash commands invoked via the **Skill tool** (e.g., `/jekyll-sme`). They are **not** Task subagents — do not use the Task tool to invoke them. The Task tool only supports built-in agent types (`Bash`, `general-purpose`, `Explore`, `Plan`, etc.).

| Command | Domain |
|---------|--------|
| `/jekyll-sme` | Jekyll architecture, Minima theme, plugins, build pipeline |
| `/bootstrap-sme` | Bootstrap 5 grid, components, utilities, customization |
| `/css-design-sme` | CSS/SCSS, BEM, visual design, responsive patterns |
| `/accessibility-sme` | WCAG 2.2, ARIA, keyboard navigation, screen readers |
| `/seo-sme` | Technical SEO, structured data, content strategy |
| `/qa-sme` | Code quality, convention enforcement, audits |

### Utility Commands

| Command | Purpose |
|---------|---------|
| `/plan-next` | Review roadmap and recommend what to work on next |
| `/content-creator` | Draft, review, and optimize blog posts (SEO, spelling, coherence) |

## Spec Engineering Workflow

Features are developed using a spec-driven workflow. Each feature gets its own directory under `specs/` with structured documents and phase-specific prompts.

### Directory Structure

```
specs/
├── _template/                  # Copy this to start a new feature
│   ├── spec.md                 # Requirements, acceptance criteria, status
│   ├── notes.md                # Research findings, implementation notes
│   ├── decisions.md            # Decision log with rationale
│   ├── checklist.md            # Phase-gated checklist
│   ├── tasks.md                # Task breakdown by phase
│   └── prompts/
│       ├── 01-research-planning.md
│       ├── 02-implementation.md
│       ├── 03-testing.md
│       └── 04-acceptance.md
├── 001-feature-name/           # Numbered feature directories
├── 002-feature-name/
└── ...
```

### Starting a New Feature

1. Copy `specs/_template/` to `specs/NNN-feature-name/`
2. Fill in `spec.md` with the feature goal, requirements, constraints, and acceptance criteria
3. Replace `[Feature Name]` and `NNN` placeholders across all files
4. Begin with Phase 1 by feeding the research & planning prompt to Claude Code

### Phases

Each feature progresses through four phases in order. A phase must be completed and signed off before moving to the next.

| Phase | Purpose | Code Changes? |
|-------|---------|---------------|
| **1. Research & Planning** | Investigate approaches, discuss with user, then break down tasks | No |
| **2. Implementation** | Build the feature per the task breakdown | Yes |
| **3. Testing** | Verify acceptance criteria, document issues | No (document only) |
| **4. Acceptance** | Final review, mark complete or send back | No (documentation only) |

**Phase 1 has a mandatory conversation checkpoint.** Research is completed first (findings, approaches, tradeoffs documented). Then Claude must stop and present: what was found, what is recommended, and how to build it. Planning and task breakdown only begin after the user discusses and approves the direction.

**Phase 2 has an implicit checkpoint rule.** Claude must pause and check in with the user whenever: a task uncovers an unanticipated problem, the implementation deviates from the plan in `tasks.md`, a decision is needed that isn't covered in `decisions.md`, or a task is significantly more complex than expected. Never guess — always surface issues before continuing.

**Phase 3 has two internal stages.** Stage 1: Claude verification and SME audits (automated checks, acceptance criteria, HTML validation, SME reviews). Stage 2: User testing plan — a detailed checklist walked through together with the user, items checked off only with user confirmation.

**Phase 3 bug fix flow.** When a bug is found during Testing, Claude documents it in `notes.md`, presents it to the user with a severity assessment, and asks: fix now or continue testing? If "fix now," the phase returns to Implementation, Claude fixes and commits, then Testing resumes where it left off. The round-trip is logged in the Phase History. If "continue testing," all issues are batched and fixed in a single return to Implementation.

**Phase 4 requires deploy verification.** Acceptance is not complete until the GitHub Actions deploy succeeds and the live site is spot-checked. If the deploy fails, return to Implementation.

**Session handoff is mandatory.** The Last Session block in `tasks.md` must be updated when starting each task and when ending a session. This ensures the next session can pick up exactly where the previous one left off, even after an unexpected end.

**Template check on resume.** When resuming an in-progress spec, compare the spec's files against `specs/_template/` for process-critical changes (e.g., new required sections). Adopt process-critical changes; structural improvements are optional.

### Using Phase Prompts

Each `prompts/0N-phase.md` file is a self-contained prompt designed to be fed to Claude Code to initiate that phase. The prompt instructs Claude to:

- Read the spec and all supporting documents
- Work within the phase's boundaries (e.g., no code during research)
- Update the relevant tracking files (`tasks.md`, `checklist.md`, `notes.md`)
- Summarize results and request sign-off before advancing

### Completing a Feature

When a feature passes Acceptance:

- `spec.md` status is set to **Completed** with a completion date and notes
- `tasks.md` status is set to **Completed** with a final summary
- All checklist items in `checklist.md` are checked off
- The feature directory remains in `specs/` as documentation

### Commit Strategy

- Create a feature branch at the start of Implementation (e.g., `feature/001-bootstrap-integration`)
- Commit after completing each task in `tasks.md` — each commit is one logical unit of work
- No commits during Testing phase unless issues are sent back to Implementation for fixes
- Merge the feature branch to `master` after Acceptance is complete
- Delete the feature branch after merge (local and remote)

### Multi-Session Coordination

When multiple Claude sessions are running simultaneously:

- **The implementation session owns the feature branch.** It has priority for all commits and file changes on that branch.
- **Other sessions** (process improvements, minor fixes, documentation) should commit to `master` directly. The feature branch picks up those changes on merge.
- **If a non-primary session must commit to the feature branch**, it should only touch files outside the feature's affected files list in `spec.md`.
- **Shared files** (`_config.yml`, layouts, includes) are owned by the implementation session during an active feature. Other sessions flag needed changes but do not make them.

### Conventions

- Feature directories use numbered prefixes: `001-`, `002-`, etc.
- Always check `specs/` for active specs before starting work on a feature
- Never skip phases — if a feature is simple, the phases will be short, not skipped
- If Acceptance fails, return to Implementation or Testing as needed

## Additional Workflows

See [`docs/workflows.md`](docs/workflows.md) for full details on:

- **Content Workflow** — lightweight draft → review → publish process using `/content-creator`
- **Incident/Hotfix** — use the spec workflow to document what broke and how it was fixed
- **Dependency Updates** — monthly `bundle update` checklist, security advisory process
- **Spec Revision** — return to Research & Planning when requirements change mid-feature
- **Retrospectives** — per-feature mini-retro in completion notes, milestone review after each roadmap group
- **Branch Cleanup** — delete feature branches after merge to master

## Git Workflow

- `master` is the production branch
- Create feature branches for non-trivial changes (new layouts, plugin additions, config changes)
- Delete feature branches after merge to master (local and remote)
- Content-only changes (new posts, edits) can go directly to `master`
- The `_site/` directory is gitignored — never commit build output

## Dependencies

- Add Jekyll plugins to both `_config.yml` (under `plugins:`) and `Gemfile` (in the `:jekyll_plugins` group)
- Run `bundle install` after any Gemfile change
- Run `bundle update` monthly — see [`docs/workflows.md`](docs/workflows.md) for the full checklist
- Commit `Gemfile.lock` to version control

## Deployment

Hosted on **GitHub Pages** via **GitHub Actions** (custom build).

### How It Works

- Push to `master` triggers `.github/workflows/deploy.yml`
- The workflow installs Ruby 3.3, runs `bundle exec jekyll build` with `JEKYLL_ENV=production`, and deploys the `_site/` output to GitHub Pages
- Concurrent deploys are queued (not cancelled) to prevent partial deployments

### Repository Setup (One-Time)

1. Create the repo as `<username>.github.io` on GitHub
2. Go to **Settings > Pages > Build and deployment** and set Source to **GitHub Actions**
3. Push to `master` — the workflow handles the rest

### Custom Domain (Future)

When a domain is purchased:

1. Add a `CNAME` file to the project root containing the domain (e.g., `example.com`)
2. Update `url` in `_config.yml` to `https://example.com`
3. Configure DNS with your registrar (A records or CNAME pointing to GitHub Pages)
4. Enable **Enforce HTTPS** in repo Settings > Pages

### Excluded from Build

The following are excluded in `_config.yml` so they don't end up in the published site:

- `specs/`, `docs/`, `CLAUDE.md`
