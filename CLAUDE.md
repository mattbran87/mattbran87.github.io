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
- Must include front matter:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS -0600
categories: category1 category2
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

## SME Subagents

Six subject matter expert commands are available in `.claude/commands/`. See [`docs/sme-orchestration.md`](docs/sme-orchestration.md) for required/optional rules per phase, invocation order, and conflict resolution.

| Command | Domain |
|---------|--------|
| `/jekyll-sme` | Jekyll architecture, Minima theme, plugins, build pipeline |
| `/bootstrap-sme` | Bootstrap 5 grid, components, utilities, customization |
| `/css-design-sme` | CSS/SCSS, BEM, visual design, responsive patterns |
| `/accessibility-sme` | WCAG 2.2, ARIA, keyboard navigation, screen readers |
| `/seo-sme` | Technical SEO, structured data, content strategy |
| `/qa-sme` | Code quality, convention enforcement, audits |

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
| **1. Research & Planning** | Investigate approaches, document decisions, break down tasks | No |
| **2. Implementation** | Build the feature per the task breakdown | Yes |
| **3. Testing** | Verify acceptance criteria, document issues | No (document only) |
| **4. Acceptance** | Final review, mark complete or send back | No (documentation only) |

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

### Conventions

- Feature directories use numbered prefixes: `001-`, `002-`, etc.
- Always check `specs/` for active specs before starting work on a feature
- Never skip phases — if a feature is simple, the phases will be short, not skipped
- If Acceptance fails, return to Implementation or Testing as needed

## Git Workflow

- `master` is the production branch
- Create feature branches for non-trivial changes (new layouts, plugin additions, config changes)
- Content-only changes (new posts, edits) can go directly to `master`
- The `_site/` directory is gitignored — never commit build output

## Dependencies

- Add Jekyll plugins to both `_config.yml` (under `plugins:`) and `Gemfile` (in the `:jekyll_plugins` group)
- Run `bundle install` after any Gemfile change
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
