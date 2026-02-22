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

### 2026-02-22

- **[Config]** Add frontmatter to custom commands for Claude Code discovery
  - Files affected: `.claude/commands/*.md`
- **[Config]** Add Linux platform to Gemfile.lock for GitHub Actions compatibility
  - Files affected: `Gemfile.lock`
- **[Config]** Activate `exclude` list in `_config.yml` to prevent `specs/`, `docs/`, and `CLAUDE.md` from being published
  - Files affected: `_config.yml`
