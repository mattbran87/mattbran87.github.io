# Changelog

Minor changes that do not go through the spec engineering workflow. For feature-level work, see `specs/` directories.

## Format

```
### YYYY-MM-DD

- **[Type]** Brief description of the change
  - Files affected: `path/to/file`
```

**Types:** Fix, Tweak, Config, Content, Docs, Chore, Process, Workflow, Infrastructure

---

### 2026-02-25

- **[Tweak]** Add sidebar tags widget, replace post-card tags (#032)
  - Summary: Removed tag pills from post cards on homepage, tag archive, and series archive. Added "Popular Tags" section to sidebar with top 10 tags (alphabetical) and "View all tags" link.
  - Files affected: `_layouts/home.html`, `_layouts/tag-archive.html`, `_layouts/series-archive.html`, `_includes/sidebar.html`, `assets/css/_partials/_sidebar.scss`

- **[Tweak]** Replace Archives with Series widget in sidebar (#033)
  - Summary: Removed month-based Archives section. Added "Series" section listing series from `_data/series.yml` with links to archive pages and "View all series" link.
  - Files affected: `_includes/sidebar.html`

- **[Tweak]** Redesign sidebar author links with icons (#034)
  - Summary: Renamed "Elsewhere" to "Site Author Links". Replaced text labels with inline SVG icons (email, GitHub, LinkedIn). Added `title` attributes for hover text.
  - Files affected: `_includes/sidebar.html`, `assets/css/_partials/_sidebar.scss`

- **[Tweak]** Add "Read more" link to post cards (#023)
  - Summary: Added explicit "Read more" call-to-action link below the excerpt on post cards. Accessible `aria-label` includes post title to differentiate links for screen readers.
  - Files affected: `_layouts/home.html`, `_layouts/tag-archive.html`, `_layouts/series-archive.html`, `assets/css/_partials/_post-card.scss`

- **[Tweak]** Add estimated reading time to post cards and post pages (#024)
  - Summary: Displays "N min read" alongside the date in post meta. Calculated from word count at ~200 wpm with 1-min minimum. Pure Liquid via reusable `_includes/reading-time.html`.
  - Files affected: `_includes/reading-time.html` (new), `_layouts/home.html`, `_layouts/tag-archive.html`, `_layouts/series-archive.html`, `_layouts/post.html`, `assets/css/_partials/_post-card.scss`, `assets/css/_partials/_post.scss`

- **[Tweak]** Redesign series badge on post cards (#031)
  - Summary: Replaced pill-shaped series badge with a simpler h3 link ("Part N · Series Title"). Moved above the excerpt for more visual prominence. Removed old `.series-badge` pill styles.
  - Files affected: `_includes/series-badge.html`, `_layouts/home.html`, `assets/css/_partials/_series.scss`

- **[Content]** Add stub Uses page (#015)
  - Summary: Created `/uses/` page with placeholder sections (Hardware, Development Tools, Software, Tech Stack). Uses the `page` layout. Linked from the About page. Not added to navbar.
  - Files affected: `uses.markdown` (new), `about.markdown`

- **[Content]** Remove Resume page (#016) — LinkedIn preferred to avoid data scraping
  - Summary: Removed `/resume/` page. Resume content lives on LinkedIn, which is already linked in the site footer and landing page.
  - Files affected: `resume.markdown` (deleted), `about.markdown`, `specs/roadmap.md`

### 2026-02-24

- **[Infrastructure]** Migrate JavaScript from IIFE pattern to ES modules (#022)
  - Rationale: Code guidelines specify ES modules with a single entry point; three of four scripts were still using the IIFE pattern with individual `<script defer>` tags
  - Summary: Converted `nav-keyboard.js`, `code-copy.js`, and `search.js` from IIFEs to ES modules with exported init functions. Moved files to `assets/js/modules/`. Created `assets/js/main.js` entry point that imports all modules. Updated `_layouts/default.html` to use a single `<script type="module">` instead of four individual script tags. `theme-toggle.js` was already an ES module — unchanged. Bootstrap and Lunr remain as deferred classic scripts (no ES module builds available).
  - Files affected: `assets/js/modules/nav-keyboard.js` (new), `assets/js/modules/code-copy.js` (new), `assets/js/modules/search.js` (rewritten), `assets/js/main.js` (new), `_layouts/default.html`, `assets/js/nav-keyboard.js` (deleted), `assets/js/code-copy.js` (deleted)

- **[Docs]** Spec 012 Analytics — Research phase completed and deferred
  - Rationale: Full research completed (4 SMEs consulted, 27 findings, 10 decisions). Deferred pending private repository and server migration.
  - Summary: GA4 with cookie consent banner and privacy policy page. Research covers: production-only loading, Consent Mode v2, accessible non-modal banner (role="region"), privacy policy SEO (no noindex), script loading strategy, JS file organization. QA corrections applied to spec (acceptance criteria, SCSS path, edge cases).
  - Files affected: `specs/012-analytics/` (all files), `specs/roadmap.md`

- **[Docs]** Content Organization milestone retrospective (003, 004, 010)
  - Covers cross-feature patterns (Liquid complexity, BEM consistency, tags as universal connector), workflow observations, and process improvements for the next group
  - Files affected: `docs/retrospectives/2026-02-24-content-organization.md`

- **[Process]** Add mandatory research discussion checkpoint to Phase 1
  - Rationale: Research findings need user review and discussion before planning begins
  - Summary: Split Phase 1 into Research and Planning stages with a mandatory conversation gate between them
  - Files affected: `CLAUDE.md`, `specs/_template/prompts/01-research-planning.md`, `specs/_template/checklist.md`, `specs/_template/tasks.md`, `docs/sme-orchestration.md`

- **[Process]** Add mandatory user testing plan to Phase 3
  - Rationale: User needs a detailed checklist for manual/visual testing rather than ad-hoc verification
  - Summary: When testing requires user involvement, Claude must provide a step-by-step testing plan walked through together
  - Files affected: `CLAUDE.md`, `specs/_template/prompts/03-testing.md`, `specs/_template/checklist.md`

- **[Workflow]** Add 6 workflow improvements from process review
  - Rationale: Process review identified gaps in multi-session coordination, implementation oversight, testing structure, change tiers, retrospective tracking, and bug fix flow
  - Summary: (1) Multi-session coordination rules — implementation session owns feature branch. (2) Implementation checkpoint rule — pause on problems/deviations. (3) Testing internal stages — Stage 1 Claude+SME, Stage 2 user testing. (4) Mini-spec tier for medium changes. (5) Retrospective check in `/plan-next`. (6) Bug fix flow during testing — document, ask user, fix now or batch.
  - Files affected: `CLAUDE.md`, `specs/_template/prompts/02-implementation.md`, `specs/_template/prompts/03-testing.md`, `specs/_template/checklist.md`, `docs/workflows.md`, `.claude/commands/plan-next.md`

- **[Process]** Clarify SMEs are Skills, not Task subagents
  - Rationale: Claude instances were attempting to invoke SME commands via the Task tool instead of the Skill tool
  - Summary: Added explicit notes that SME commands must be invoked via the Skill tool
  - Files affected: `CLAUDE.md`, `docs/sme-orchestration.md`

- **[Process]** Standardize SME finding documentation and add tracker table
  - Rationale: SME findings were documented inconsistently across specs with no structured way to compare findings across phases
  - Summary: Added SME Finding Tracker table to notes.md template, standardized finding format (SME Name — Phase with Finding/Recommendation), added Documentation Requirements to all 6 SME command files, added documentation standard to sme-orchestration.md
  - Files affected: `specs/_template/notes.md`, `docs/sme-orchestration.md`, `.claude/commands/jekyll-sme.md`, `.claude/commands/accessibility-sme.md`, `.claude/commands/qa-sme.md`, `.claude/commands/bootstrap-sme.md`, `.claude/commands/css-design-sme.md`, `.claude/commands/seo-sme.md`

- **[Process]** Add session handoff protocol to all phase prompts
  - Rationale: New sessions had no structured way to know where the previous session stopped, especially after unexpected ends
  - Summary: Added Last Session block to tasks.md template (updated when starting each task and ending a session). Added Session Handoff section to all 4 phase prompts as a mandatory deliverable.
  - Files affected: `CLAUDE.md`, `specs/_template/tasks.md`, `specs/_template/prompts/01-research-planning.md`, `specs/_template/prompts/02-implementation.md`, `specs/_template/prompts/03-testing.md`, `specs/_template/prompts/04-acceptance.md`

- **[Process]** Add deploy verification to Acceptance phase
  - Rationale: Features were marked complete at merge but deploy success was not verified — a failed deploy meant the feature wasn't actually shipped
  - Summary: Acceptance checklist and prompt now require waiting for GitHub Actions deploy, spot-checking the live site, and returning to Implementation if deploy fails
  - Files affected: `CLAUDE.md`, `specs/_template/prompts/04-acceptance.md`, `specs/_template/checklist.md`

- **[Process]** Add structured completion notes template
  - Rationale: Completion notes were freeform, making it hard to compare retros across features or extract patterns during milestone reviews
  - Summary: Replaced placeholder with 5-section template: Delivered, Deviations, What Went Well, What Didn't Go Well, Lessons Learned
  - Files affected: `specs/_template/spec.md`, `specs/_template/prompts/04-acceptance.md`

- **[Process]** Add template check rule for in-progress specs
  - Rationale: Template updates don't propagate to specs already in progress, causing process-critical changes (like the SME tracker table) to be missed
  - Summary: When resuming an in-progress spec, sessions must compare against specs/_template/ and adopt process-critical changes. Added to Implementation and Testing prompts.
  - Files affected: `CLAUDE.md`, `specs/_template/prompts/02-implementation.md`, `specs/_template/prompts/03-testing.md`

- **[Config]** Remove Contact page from header navigation
  - Files affected: `_config.yml`

### 2026-02-23

- **[Docs]** Add Schema markup research and update #008 SEO Foundation description
  - Files affected: `docs/schema-markup-research.md`, `specs/roadmap.md`

### 2026-02-22

- **[Docs]** Add ad integration research findings and roadmap entry (#018)
  - Files affected: `docs/ad-integration-research.md`, `specs/roadmap.md`
- **[Docs]** Add multi-language support research findings and roadmap entry (#017)
  - Files affected: `docs/multi-language-research.md`, `specs/roadmap.md`

- **[Tweak]** Add email mailto link to footer and sidebar social links
  - Files affected: `_includes/footer.html`, `_includes/sidebar.html`
- **[Config]** Add frontmatter to custom commands for Claude Code discovery
  - Files affected: `.claude/commands/*.md`
- **[Config]** Add Linux platform to Gemfile.lock for GitHub Actions compatibility
  - Files affected: `Gemfile.lock`
- **[Config]** Activate `exclude` list in `_config.yml` to prevent `specs/`, `docs/`, and `CLAUDE.md` from being published
  - Files affected: `_config.yml`
- **[Config]** Set up custom domain `aicodeblog.com` — added CNAME file and updated `url` in `_config.yml`
  - Files affected: `CNAME`, `_config.yml`
- **[Config]** Set primary contact email to `matt@aicodeblog.com` (Fastmail)
  - Files affected: `_config.yml`
