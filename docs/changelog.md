# Changelog

Minor changes that do not go through the spec engineering workflow. For feature-level work, see `specs/` directories.

## Format

```
### YYYY-MM-DD

- **[Type]** Brief description of the change
  - Files affected: `path/to/file`
```

**Types:** Fix, Tweak, Config, Content, Docs, Chore

---

### 2026-02-24

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
