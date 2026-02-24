# SME Orchestration Rules

## Overview

The main Claude agent orchestrates SME (Subject Matter Expert) consultations during the spec engineering workflow. Each SME is a custom slash command in `.claude/commands/`, invoked via the **Skill tool** (e.g., `/jekyll-sme`). Do **not** use the Task tool to invoke SMEs — the Task tool only supports built-in agent types. This document defines when each SME is required, when they are optional, and how conflicts are resolved.

## Available SMEs

| Command | Domain |
|---------|--------|
| `/jekyll-sme` | Jekyll architecture, Minima theme, plugins, build pipeline |
| `/bootstrap-sme` | Bootstrap 5 grid, components, utilities, customization |
| `/css-design-sme` | CSS/SCSS, BEM, visual design, responsive patterns |
| `/accessibility-sme` | WCAG 2.2, ARIA, keyboard navigation, screen readers |
| `/seo-sme` | Technical SEO, structured data, content strategy |
| `/qa-sme` | Code quality, convention enforcement, audits |

## Required SMEs by Phase

These SMEs must be invoked in every feature, regardless of scope.

### Phase 1: Research & Planning

| SME | Required | Purpose |
|-----|----------|---------|
| Jekyll | Yes | Assess architectural impact, recommend Jekyll patterns |
| Accessibility | Yes | Identify WCAG requirements and accessible patterns early |
| QA | Yes | Review the spec for completeness, clarity, and testable acceptance criteria |
| Bootstrap | Optional | |
| CSS/Design | Optional | |
| SEO | Optional | |

### Phase 2: Implementation

| SME | Required | Purpose |
|-----|----------|---------|
| Jekyll | Yes | Build templates, configure collections, ensure correct build pipeline usage |
| Accessibility | Yes | Verify accessibility is built into markup as it is written |
| Bootstrap | Optional | |
| CSS/Design | Optional | |
| SEO | Optional | |
| QA | Optional | |

### Phase 3: Testing

| SME | Required | Purpose |
|-----|----------|---------|
| Accessibility | Yes | Full WCAG AA compliance audit of the feature |
| QA | Yes | Comprehensive code quality audit against all project conventions |
| Jekyll | Optional | |
| Bootstrap | Optional | |
| CSS/Design | Optional | |
| SEO | Optional | |

### Phase 4: Acceptance

| SME | Required | Purpose |
|-----|----------|---------|
| QA | Yes | Final quality gate — pass/fail determination |
| Jekyll | Optional | |
| Bootstrap | Optional | |
| CSS/Design | Optional | |
| Accessibility | Optional | |
| SEO | Optional | |

## Optional SME Trigger Rules

The main Claude agent invokes optional SMEs when the feature meets any of the following conditions.

### Bootstrap SME — Invoke when:

- The feature involves page layout or responsive grid structure
- The feature adds or modifies UI components (navbars, cards, modals, etc.)
- The feature requires responsive behavior beyond basic CSS

### CSS/Design SME — Invoke when:

- The feature has visual styling requirements (colors, typography, spacing)
- The feature introduces new SCSS partials or modifies existing styles
- The feature involves theming or visual consistency across pages

### SEO SME — Invoke when:

- The feature adds new pages, changes URLs, or modifies permalink structure
- The feature affects `<head>` content (meta tags, title, canonical)
- The feature adds or changes content types (collections, taxonomy pages)
- The feature modifies structured data or front matter fields used by jekyll-seo-tag

### QA SME (when optional) — Invoke when:

- A spot-check is needed during Implementation for convention compliance
- Complex Liquid logic is being written and needs review
- Multiple files are being modified and consistency is a concern

### Jekyll SME (when optional) — Invoke when:

- Build issues arise during Testing
- Generated HTML output needs validation
- Unexpected rendering behavior needs diagnosis

### Accessibility SME (when optional) — Invoke when:

- Acceptance criteria specifically include accessibility requirements
- A previous phase flagged accessibility issues that need re-verification

## Invocation Order

SMEs are invoked **sequentially**, not in parallel. Within a phase, follow this order:

### Phase 1: Research & Planning

**Stage 1: Research**
1. Jekyll SME — architectural assessment
2. Accessibility SME — identify a11y requirements
3. Optional SMEs (Bootstrap, CSS/Design, SEO) — as triggered by rules above
4. QA SME — review spec completeness (always last in research)

**Mandatory Research Discussion** — Present all SME findings to user and get approval before planning.

**Stage 2: Planning** — Break down tasks per the approved direction. No additional SME invocations unless the discussion changed scope.

### Phase 2: Implementation
1. Jekyll SME — template and configuration work
2. Optional SMEs (Bootstrap, CSS/Design, SEO) — as triggered by rules above
3. Accessibility SME — review markup as it is built (always last in this phase)

### Phase 3: Testing
1. Optional SMEs (Jekyll, Bootstrap, CSS/Design, SEO) — as triggered by rules above
2. Accessibility SME — full a11y audit
3. QA SME — comprehensive quality audit (always last in this phase)

### Phase 4: Acceptance
1. Optional SMEs — only if acceptance criteria require their domain
2. QA SME — final quality gate (always last)

## SME Finding Documentation

All SME findings must be documented using a standard format for traceability across phases.

### Standard Finding Format

Each SME's findings go in `notes.md` under a labeled subsection using this structure:

```markdown
#### [SME Name] — [Phase Name]
- **Finding:** [what was found]
- **Recommendation:** [what they suggest]
```

Use the exact SME names: `Jekyll SME`, `Accessibility SME`, `Bootstrap SME`, `CSS/Design SME`, `SEO SME`, `QA SME`.

### SME Finding Tracker

Every finding must also be added to the **SME Finding Tracker** table at the top of `notes.md`:

```markdown
| # | Phase | SME | Finding | Recommendation | Disposition |
|---|-------|-----|---------|----------------|-------------|
| S1 | Research | Jekyll | Use Liquid JSON, no plugin | Build-time index | Adopted → D1 |
| S2 | Research | A11y | Needs focus-visible on input | 3px outline | Adopted → Task 2.4 |
| S3 | Testing | QA | Missing BEM modifier | Add --active class | Fixed in abc123 |
```

**Disposition values:**
- `Adopted → D#` — became a formal decision
- `Adopted → Task #` — incorporated into a task
- `Deferred` — acknowledged but not addressed in this feature
- `Overridden by D#` — a decision chose a different direction
- `Fixed in [commit]` — resolved during testing
- `N/A` — informational only, no action needed

### Cross-Phase Comparison

During Testing, SME audits should explicitly compare against Research findings. The tracker table makes this possible — any finding from Research that was `Adopted` should be verifiable in the implementation. Testing SMEs should flag if a Research finding was not implemented as expected.

## Conflict Resolution

When two or more SMEs provide conflicting recommendations:

1. **Pause** — The main Claude agent stops implementation immediately
2. **Present** — Both positions are presented to the user with:
   - Each SME's recommendation
   - The tradeoffs from each perspective
   - Which project goals are in tension
3. **User decides** — The user chooses the direction
4. **Document** — The decision is recorded in the feature's `decisions.md` with:
   - The conflicting recommendations
   - The user's decision
   - The rationale

The main Claude agent must never resolve SME conflicts autonomously. The user is always the tiebreaker.
